/**
 * VERSION: 001
 * FILE: 17_SearchService.gs
 * LMDS V5.0 — Search Service (The Bridger)
 * ===================================================
 * หน้าที่: "นักสืบหาพิกัด" — รับชื่อดิบจาก Group 2
 *          ค้นหาใน Master Data (Group 1) แล้วคืนพิกัดแท้
 *
 * Flow:
 *   Group 2 ส่ง ShipToName + ShipToAddress (ดิบ)
 *   → findBestGeoByPersonPlace()
 *   → Normalize → Match Person → Match Place
 *   → ค้นหา M_DESTINATION
 *   → คืน { lat, lng, status, confidence }
 *
 * Status ที่คืน:
 *   FOUND           ≥95% เจอตรงใน M_DESTINATION
 *   FOUND_DOMINANT  มีหลายพิกัด เลือก usageCount สูงสุด
 *   FOUND_FALLBACK  เจอแค่บุคคล — ใช้พิกัดที่คนนั้นไปบ่อยสุด
 *   SCG_API_FALLBACK ไม่เจอเลย — แนะนำให้ใช้ LatLong_SCG แทน
 *   NOT_FOUND       ไม่มีข้อมูลในระบบเลย
 * ===================================================
 */

// ============================================================
// SECTION 1: findBestGeoByPersonPlace — ฟังก์ชันหลัก
// ============================================================

/**
 * findBestGeoByPersonPlace — ค้นหาพิกัดที่ดีที่สุดสำหรับคู่ Person+Place
 * เรียกจาก 18_ServiceSCG.gs ใน applyMasterCoordinatesToDailyJob
 *
 * @param {string} rawPerson  - ShipToName ดิบ เช่น "นาย สมชาย ใจดี"
 * @param {string} rawPlace   - ShipToAddress ดิบ เช่น "123 ถ.รัชดา ลาดยาว"
 * @param {string} scgLatLng  - LatLong_SCG จาก API (Fallback สุดท้าย)
 * @return {{
 *   lat:        number,
 *   lng:        number,
 *   status:     string,
 *   confidence: number,
 *   destId:     string,
 *   reason:     string
 * }}
 */
function findBestGeoByPersonPlace(rawPerson, rawPlace, scgLatLng) {
  // --- Step 1: Normalize ชื่อดิบ ---
  const normPerson = normalizePersonNameFull(rawPerson);
  const normPlace  = normalizePlaceName(rawPlace);
  const cleanName  = normPerson.cleanName;
  const cleanPlace = normPlace.cleanPlace;

  // --- Step 2: Match บุคคล ---
  const personResult = resolvePerson(rawPerson);
  const personId     = personResult.personId;

  // --- Step 3: Match สถานที่ ---
  const placeResult  = resolvePlace(rawPlace, rawPlace);
  const placeId      = placeResult.placeId;

  // --- Step 4: ค้นหา M_DESTINATION ตาม Tier ---

  // Tier A: มีทั้ง Person + Place → เจอตรงเป๊ะ
  if (personId && placeId) {
    const dests = getDestsByPersonAndPlace(personId, placeId);
    if (dests.length === 1) {
      return buildSearchResult_(
        dests[0].lat, dests[0].lng,
        'FOUND', 98, dests[0].destId,
        `Person+Place exact match`
      );
    }
    if (dests.length > 1) {
      // หลายพิกัด — เลือก usageCount สูงสุด
      const dominant = dests[0]; // loadAllDestinations_ เรียงตาม usageCount แล้ว
      return buildSearchResult_(
        dominant.lat, dominant.lng,
        'FOUND_DOMINANT', 92, dominant.destId,
        `Person+Place — ${dests.length} พิกัด เลือก usage#${dominant.usageCount}`
      );
    }
  }

  // Tier B: มีแค่ Place → เจอพิกัดที่ Place นี้
  if (placeId && !personId) {
    const dests = getDestsByPlaceId(placeId);
    if (dests.length > 0) {
      const dominant = dests[0];
      return buildSearchResult_(
        dominant.lat, dominant.lng,
        'FOUND_DOMINANT', 85, dominant.destId,
        `Place-only match — ${dests.length} พิกัด`
      );
    }
  }

  // Tier C: มีแค่ Person → ใช้พิกัดที่คนนั้นไปบ่อยสุด (Fallback)
  if (personId && !placeId) {
    const dests = getDestsByPersonId(personId);
    if (dests.length > 0) {
      const frequent = dests[0]; // usageCount สูงสุดคือที่แรก
      return buildSearchResult_(
        frequent.lat, frequent.lng,
        'FOUND_FALLBACK', 70, frequent.destId,
        `Person-only fallback — ไปบ่อยสุด ${frequent.usageCount} ครั้ง`
      );
    }
  }

  // Tier D: ใช้ LatLong_SCG จาก API เป็น Fallback
  if (scgLatLng) {
    const parsed = parseLatLng(scgLatLng);
    if (parsed && isValidLatLng(parsed.lat, parsed.lng)) {
      return buildSearchResult_(
        parsed.lat, parsed.lng,
        'SCG_API_FALLBACK', 50, '',
        'ใช้พิกัดจาก SCG API (ยังไม่ verified)'
      );
    }
  }

  // Tier E: ไม่พบเลย
  return buildSearchResult_(
    0, 0, 'NOT_FOUND', 0, '',
    `ไม่พบข้อมูล — Person:${cleanName || '?'} Place:${cleanPlace || '?'}`
  );
}

/**
 * buildSearchResult_ — สร้าง Object ผลลัพธ์มาตรฐาน
 */
function buildSearchResult_(lat, lng, status, confidence, destId, reason) {
  return {
    lat:        lat,
    lng:        lng,
    status:     status,
    confidence: confidence,
    destId:     destId,
    reason:     reason,
  };
}

// ============================================================
// SECTION 2: runLookupEnrichment — Batch Process ทั้งชีต
// ============================================================

/**
 * runLookupEnrichment — วนทุกแถวใน ตารางงานประจำวัน
 * ค้นหาพิกัดและเติมลง LatLong_Actual (col index 26)
 * เรียกจาก 18_ServiceSCG หรือ Menu โดยตรง
 */
function runLookupEnrichment() {
  const ss        = SpreadsheetApp.getActiveSpreadsheet();
  const sheet     = ss.getSheetByName(SHEET.DAILY_JOB);

  if (!sheet || sheet.getLastRow() < 2) {
    logWarn('SearchService', 'ตารางงานประจำวัน ว่างอยู่');
    return;
  }

  const totalRows = sheet.getLastRow() - 1;
  const allData   = sheet.getRange(2, 1, totalRows,
                     SCHEMA.DAILY_JOB.length).getValues();

  // เตรียม Array สำหรับ Batch Write
  const latActualArr  = [];  // คอลัมน์ LatLong_Actual (index 26)
  const bgColorArr    = [];  // สีพื้นหลังตาม Status

  let countFound     = 0;
  let countFallback  = 0;
  let countScg       = 0;
  let countNotFound  = 0;

  allData.forEach(row => {
    const rawPerson  = String(row[DATA_IDX.SHIP_TO_NAME]  || '').trim();
    const rawPlace   = String(row[DATA_IDX.SHIP_TO_ADDR]  || '').trim();
    const scgLatLng  = String(row[DATA_IDX.LATLNG_SCG]    || '').trim();
    const existingLL = String(row[DATA_IDX.LATLNG_ACTUAL] || '').trim();

    // ข้ามแถวที่มีพิกัดแล้ว
    if (existingLL && existingLL.includes(',')) {
      latActualArr.push([existingLL]);
      bgColorArr.push(['#ffffff']);
      return;
    }

    // ค้นหาพิกัด
    const result = findBestGeoByPersonPlace(rawPerson, rawPlace, scgLatLng);

    let outputLatLng = '';
    let bgColor      = APP_CONST.COLOR_NOT_FOUND;

    switch (result.status) {
      case 'FOUND':
        outputLatLng = `${result.lat},${result.lng}`;
        bgColor      = APP_CONST.COLOR_FOUND;
        countFound++;
        break;

      case 'FOUND_DOMINANT':
        outputLatLng = `${result.lat},${result.lng}`;
        bgColor      = APP_CONST.COLOR_FOUND;
        countFound++;
        break;

      case 'FOUND_FALLBACK':
        outputLatLng = `${result.lat},${result.lng}`;
        bgColor      = APP_CONST.COLOR_FALLBACK;
        countFallback++;
        break;

      case 'SCG_API_FALLBACK':
        outputLatLng = `${result.lat},${result.lng}`;
        bgColor      = APP_CONST.COLOR_BRANCH;
        countScg++;
        break;

      case 'NOT_FOUND':
      default:
        outputLatLng = '';
        bgColor      = APP_CONST.COLOR_NOT_FOUND;
        countNotFound++;
        break;
    }

    latActualArr.push([outputLatLng]);
    bgColorArr.push([bgColor]);
  });

  // [RULE 6] Batch Write ทีเดียว
  const latActualCol = DATA_IDX.LATLNG_ACTUAL + 1; // col 27 (1-based)
  const writeRange   = sheet.getRange(2, latActualCol, totalRows, 1);
  writeRange.setValues(latActualArr);

  // Batch ทาสีพื้นหลัง (เขียนทีละแถวแต่จำกัดเฉพาะช่วงข้อมูลจริง)
  const bgMatrix = bgColorArr.map(colorRow => new Array(SCHEMA.DAILY_JOB.length).fill(colorRow[0]));
  sheet.getRange(2, 1, totalRows, SCHEMA.DAILY_JOB.length).setBackgrounds(bgMatrix);

  logInfo('SearchService',
    `runLookupEnrichment เสร็จ — ` +
    `Found:${countFound} Fallback:${countFallback} ` +
    `SCG:${countScg} NotFound:${countNotFound}`
  );

  SpreadsheetApp.getActiveSpreadsheet().toast(
    `✅ จับคู่พิกัดเสร็จ\n` +
    `เจอ: ${countFound} | Fallback: ${countFallback} | ` +
    `SCG: ${countScg} | ไม่พบ: ${countNotFound}`,
    APP_NAME, 8
  );
}

// ============================================================
// SECTION 3: Single Row Lookup (ใช้ทดสอบ / Debug)
// ============================================================

/**
 * lookupSingleRow — ค้นหาพิกัดสำหรับ 1 แถวที่ระบุ (ทดสอบ)
 * @param {number} rowNumber - หมายเลขแถวใน ตารางงานประจำวัน (เริ่มจาก 2)
 * @return {Object} ผลลัพธ์การค้นหา
 */
function lookupSingleRow(rowNumber) {
  const ss      = SpreadsheetApp.getActiveSpreadsheet();
  const sheet   = ss.getSheetByName(SHEET.DAILY_JOB);
  if (!sheet || rowNumber < 2) return null;

  const rowData    = sheet.getRange(rowNumber, 1, 1,
                      SCHEMA.DAILY_JOB.length).getValues()[0];
  const rawPerson  = String(rowData[DATA_IDX.SHIP_TO_NAME]  || '').trim();
  const rawPlace   = String(rowData[DATA_IDX.SHIP_TO_ADDR]  || '').trim();
  const scgLatLng  = String(rowData[DATA_IDX.LATLNG_SCG]    || '').trim();

  const result = findBestGeoByPersonPlace(rawPerson, rawPlace, scgLatLng);

  console.log(`[SearchService] Row ${rowNumber} → Status:${result.status} ` +
    `(${result.confidence}%) ${result.lat},${result.lng}`);
  console.log(`  Reason: ${result.reason}`);

  return result;
}
