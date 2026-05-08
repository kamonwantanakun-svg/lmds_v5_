Summary

ผมตรวจโครงสร้างโปรเจกต์และจัดทำเอกสารสรุปแบบเป็น “นิยามกลาง” ให้ครบตามที่ขอแล้วใน SYSTEM_AUDIT.md โดยมีทั้งจำนวนโมดูลทั้งหมด (17 โมดูล), รายชื่อฟังก์ชันทุกโมดูล, รายชื่อชีตทั้งหมด, คอลัมน์สำคัญของชีตดิบ, โครงสร้าง SYS_TH_GEO (A-E/F-N), แนวทางใช้คอลัมน์หมายเหตุ, mapping ปัญหา 8 ข้อ และข้อเสนอฟังก์ชันที่ควรเพิ่มต่อครับ.

เพิ่มฟังก์ชัน runNightlyMaintenance() ให้ตรงกับเมนูที่มีอยู่แล้ว เพื่อแก้จุดที่เมนูเรียกฟังก์ชันแต่ยังไม่มี implementation เดิม พร้อมอัปเดตรายงาน/Dropdown/สถานะรันและ logging ข้อผิดพลาดครับ.

เพิ่ม SYS_TH_GEO เข้า getSheetNames() เพื่อให้เป็นชีตระบบแบบ first-class ที่อ้างอิงจาก config กลางได้ครับ.

เพิ่ม schema ของชีต SYS_TH_GEO ตอน setup ครั้งแรก โดยกำหนดคอลัมน์ A-E ตามที่คุณต้องการ (รหัสไปรษณีย์, แขวง/ตำบล, เขต/อำเภอ, จังหวัด, หมายเหตุ) ครับ.

แก้บั๊ก getPendingReviews() ให้เช็คคอลัมน์ status ถูกตำแหน่ง (index 17) ทำให้ดึงรายการ PENDING ได้ถูกต้องตาม schema จริงครับ.

Testing

✅ rg -n "runNightlyMaintenance|SYS_TH_GEO|getPendingReviews\\(|data\\[i\\]\\[17\\]" 00_App.gs 01_Config.gs 03_SetupSheets.gs 12_ReviewService.gs SYSTEM_AUDIT.md && git diff --stat

✅ git status --short

✅ git add 00_App.gs 01_Config.gs 03_SetupSheets.gs 12_ReviewService.gs SYSTEM_AUDIT.md && git commit -m "Add system audit doc and fix maintenance/review/sheet setup gaps"

เสร็จครบตามเงื่อนไขแล้วครับ: มีการ commit บน branch ปัจจุบัน และเรียก make_pr เรียบร้อยแล้ว.

Summary

ผมตรวจโครงสร้างโปรเจกต์และจัดทำเอกสารสรุปแบบเป็น “นิยามกลาง” ให้ครบตามที่ขอแล้วใน SYSTEM_AUDIT.md โดยมีทั้งจำนวนโมดูลทั้งหมด (17 โมดูล), รายชื่อฟังก์ชันทุกโมดูล, รายชื่อชีตทั้งหมด, คอลัมน์สำคัญของชีตดิบ, โครงสร้าง SYS_TH_GEO (A-E/F-N), แนวทางใช้คอลัมน์หมายเหตุ, mapping ปัญหา 8 ข้อ และข้อเสนอฟังก์ชันที่ควรเพิ่มต่อครับ.

เพิ่มฟังก์ชัน runNightlyMaintenance() ให้ตรงกับเมนูที่มีอยู่แล้ว เพื่อแก้จุดที่เมนูเรียกฟังก์ชันแต่ยังไม่มี implementation เดิม พร้อมอัปเดตรายงาน/Dropdown/สถานะรันและ logging ข้อผิดพลาดครับ.

เพิ่ม SYS_TH_GEO เข้า getSheetNames() เพื่อให้เป็นชีตระบบแบบ first-class ที่อ้างอิงจาก config กลางได้ครับ.

เพิ่ม schema ของชีต SYS_TH_GEO ตอน setup ครั้งแรก โดยกำหนดคอลัมน์ A-E ตามที่คุณต้องการ (รหัสไปรษณีย์, แขวง/ตำบล, เขต/อำเภอ, จังหวัด, หมายเหตุ) ครับ.

แก้บั๊ก getPendingReviews() ให้เช็คคอลัมน์ status ถูกตำแหน่ง (index 17) ทำให้ดึงรายการ PENDING ได้ถูกต้องตาม schema จริงครับ.

Testing

✅ rg -n "runNightlyMaintenance|SYS_TH_GEO|getPendingReviews\\(|data\\[i\\]\\[17\\]" 00_App.gs 01_Config.gs 03_SetupSheets.gs 12_ReviewService.gs SYSTEM_AUDIT.md && git diff --stat

✅ git status --short

✅ git add 00_App.gs 01_Config.gs 03_SetupSheets.gs 12_ReviewService.gs SYSTEM_AUDIT.md && git commit -m "Add system audit doc and fix maintenance/review/sheet setup gaps"

เสร็จครบตามเงื่อนไขแล้วครับ: มีการ commit บน branch ปัจจุบัน และเรียก make_pr เรียบร้อยแล้ว.

00_App.gs

   }
 }
 
 function onEdit(e) {
   if (!e || !e.range) return;
   const sheet = e.range.getSheet();
   
   if (sheet.getName() === 'Q_REVIEW' && e.range.getColumn() === 21) {
     const row = e.range.getRow();
     if (row <= 1) return;
     
     const decision = e.value;
     if (decision === 'CREATE_NEW' || decision === 'MERGE_TO_CANDIDATE' || decision === 'IGNORE') {
       const reviewId = sheet.getRange(row, 1).getValue();
       try {
         e.range.setBackground('#FFF2CC');
         applyReviewDecision(reviewId, decision, null);
         e.range.setBackground('#D9EAD3');
       } catch (err) {
         e.range.setBackground('#F4CCCC');
         SpreadsheetApp.getActiveSpreadsheet().toast(err.message, '❌ เกิดข้อผิดพลาด', 10);
       }
     }
   }
 }
+
+/**
+ * งานบำรุงรักษารายวัน/รายสัปดาห์
+ * - รีเฟรชรายงานคุณภาพข้อมูล
+ * - ตั้งค่า Dropdown คิวรีวิวเผื่อมีการเพิ่มแถวใหม่
+ * - อัปเดตสถานะล่าสุดไว้ใน SYS_CONFIG
+ */
+function runNightlyMaintenance() {
+  const ss = SpreadsheetApp.getActiveSpreadsheet();
+  try {
+    refreshQualityReport();
+    setupReviewDropdown();
+    updateRunStatus('MAINTENANCE_OK', 'อัปเดต Report และ Review Dropdown เรียบร้อย');
+    ss.toast('อัปเดตสถิติและตั้งค่าระบบเรียบร้อย', '✅ Maintenance เสร็จสิ้น', 8);
+  } catch (e) {
+    updateRunStatus('MAINTENANCE_ERROR', e.message);
+    writeLog('ERROR', '00_App', 'runNightlyMaintenance', '', e.message, e.stack);
+    ss.toast('Maintenance ล้มเหลว: ' + e.message, '❌ เกิดข้อผิดพลาด', 10);
+  }
+}

01_Config.gs

 function getThresholds() {
   return {
     autoMatchScore: parseInt(getConfig('AUTO_MATCH_SCORE'), 10) || 90,
     reviewScoreMin: parseInt(getConfig('REVIEW_SCORE_MIN'), 10) || 75,
     geoRadiusMeter: parseInt(getConfig('GEO_RADIUS_METER'), 10) || 50
   };
 }
 
 /**
  * ชื่อชีตระบบทั้งหมด
  */
 function getSheetNames() {
   return {
     SOURCE: getConfig('SOURCE_SHEET_NAME') || 'SCGนครหลวงJWDภูมิภาค',
     M_PERSON: 'M_PERSON',
     M_PERSON_ALIAS: 'M_PERSON_ALIAS',
     M_PLACE: 'M_PLACE',
     M_PLACE_ALIAS: 'M_PLACE_ALIAS',
     M_GEO_POINT: 'M_GEO_POINT',
     M_DESTINATION: 'M_DESTINATION',
     FACT_DELIVERY: 'FACT_DELIVERY',
     Q_REVIEW: 'Q_REVIEW',
     SYS_CONFIG: 'SYS_CONFIG',
     SYS_LOG: 'SYS_LOG',
     RPT_DATA_QUALITY: 'RPT_DATA_QUALITY',
-    MAPS_CACHE: 'MAPS_CACHE'
+    MAPS_CACHE: 'MAPS_CACHE',
+    SYS_TH_GEO: 'SYS_TH_GEO'
   };
 }

03_SetupSheets.gs

 /**
  * 03_SetupSheets.gs
  * จัดการการสร้างชีตระบบและตั้งค่าเริ่มต้น
  */
 
 function createSystemSheets() {
   const ss = SpreadsheetApp.getActiveSpreadsheet();
   const names = getSheetNames();
   
   const schemas = {
     [names.M_PERSON]: ['person_id', 'person_name_canonical', 'person_name_normalized', 'phone', 'first_seen_date', 'last_seen_date', 'usage_count', 'status', 'note'],
     [names.M_PERSON_ALIAS]: ['person_alias_id', 'person_id', 'alias_raw', 'alias_normalized', 'source_field', 'first_seen_date', 'last_seen_date', 'usage_count', 'active_flag'],
     [names.M_PLACE]: ['place_id', 'place_name_canonical', 'place_name_normalized', 'address_best', 'address_normalized', 'warehouse_default', 'first_seen_date', 'last_seen_date', 'usage_count', 'status', 'note'],
     [names.M_PLACE_ALIAS]: ['place_alias_id', 'place_id', 'alias_raw', 'alias_normalized', 'source_field', 'first_seen_date', 'last_seen_date', 'usage_count', 'active_flag'],
     [names.M_GEO_POINT]: ['geo_id', 'lat_raw', 'long_raw', 'lat_norm', 'long_norm', 'geo_key_6', 'geo_key_5', 'geo_key_4', 'address_from_latlong_best', 'first_seen_date', 'last_seen_date', 'usage_count', 'note'],
     [names.M_DESTINATION]: ['destination_id', 'person_id', 'place_id', 'geo_id', 'destination_label_canonical', 'destination_key', 'confidence_status', 'first_seen_date', 'last_seen_date', 'usage_count', 'note'],
     [names.FACT_DELIVERY]: ['tx_id', 'source_sheet', 'source_row_number', 'source_record_id', 'delivery_date', 'delivery_time', 'shipment_no', 'invoice_no', 'raw_owner_name', 'raw_person_name', 'raw_system_address', 'raw_geo_resolved_address', 'raw_geo_text', 'lat', 'lng', 'person_id', 'place_id', 'geo_id', 'destination_id', 'warehouse', 'distance_km', 'driver_name', 'employee_id', 'employee_email', 'license_plate', 'validation_result', 'anomaly_reason', 'review_status', 'sync_status', 'created_at', 'updated_at'],
     [names.Q_REVIEW]: ['review_id', 'issue_type', 'source_record_id', 'source_row_number', 'invoice_no', 'raw_person_name', 'raw_place_name', 'raw_system_address', 'raw_geo_resolved_address', 'raw_lat', 'raw_long', 'candidate_person_ids', 'candidate_place_ids', 'candidate_geo_ids', 'candidate_destination_ids', 'score', 'recommended_action', 'status', 'reviewer', 'reviewed_at', 'decision', 'note'],
     [names.SYS_CONFIG]: ['config_key', 'config_value', 'config_group', 'description', 'updated_at'],
     [names.SYS_LOG]: ['log_id', 'run_id', 'created_at', 'level', 'module_name', 'function_name', 'ref_id', 'message', 'payload_json'],
     [names.RPT_DATA_QUALITY]: ['report_date', 'total_source_rows', 'processed_rows', 'new_person_count', 'new_place_count', 'new_geo_count', 'new_destination_count', 'auto_match_count', 'review_count', 'duplicate_alert_count', 'error_count', 'last_refresh_at'],
-    [names.MAPS_CACHE]: ['cache_key', 'cache_value', 'cache_type', 'raw_input', 'updated_at']
+    [names.MAPS_CACHE]: ['cache_key', 'cache_value', 'cache_type', 'raw_input', 'updated_at'],
+    [names.SYS_TH_GEO]: ['รหัสไปรษณีย์', 'แขวง/ตำบล', 'เขต/อำเภอ', 'จังหวัด', 'หมายเหตุ']
   };
 
   Object.keys(schemas).forEach(sheetName => {
     let sheet = ss.getSheetByName(sheetName);
     if (!sheet) {
       sheet = ss.insertSheet(sheetName);
     }
     
     const headers = schemas[sheetName];
     sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
     sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold").setBackground("#f3f3f3");
     sheet.setFrozenRows(1);
   });
 }
 
 /**
  * กำหนดค่า Config เบื้องต้น
  */
 function seedInitialConfig() {
   const ss = SpreadsheetApp.getActiveSpreadsheet();
   const sheet = ss.getSheetByName(getSheetNames().SYS_CONFIG);
   if (!sheet) return;
   
   const initialConfigs = [
     ['AUTO_MATCH_SCORE', '90', 'Engine', 'คะแนนขั้นต่ำในการจับคู่อัตโนมัติ', new Date()],

12_ReviewService.gs

   const sheet = ss.getSheetByName('Q_REVIEW');
   if (!sheet) return;
   
   // สร้างกฎ Data Validation 3 ตัวเลือก
   const rule = SpreadsheetApp.newDataValidation()
     .requireValueInList(['CREATE_NEW', 'MERGE_TO_CANDIDATE', 'IGNORE'], true)
     .setAllowInvalid(false)
     .build();
     
   // นำไปใส่ในคอลัมน์ U (คอลัมน์ที่ 21) ตั้งแต่แถวที่ 2 ลงไป
   const lastRow = Math.max(sheet.getMaxRows(), 100);
   sheet.getRange(2, 21, lastRow - 1, 1).setDataValidation(rule);
 }
 
 /**
  * ผู้ดูแลระบบ (Admin) สามารถเขียน Script หรือสร้าง UI เพื่อดึง Pending Reviews ไปจัดการได้
  */
 function getPendingReviews() {
   const ss = SpreadsheetApp.getActiveSpreadsheet();
   const sheet = ss.getSheetByName('Q_REVIEW');
   const data = sheet.getDataRange().getValues();
   const headers = data[0];
   const pending = [];
   
   for (let i = 1; i < data.length; i++) {
-    if (data[i][15] === 'PENDING') { // status column
+    if (data[i][17] === 'PENDING') { // status column (index 17)
       let item = {};
       headers.forEach((h, idx) => item[h] = data[i][idx]);
       item.rowIndex = i + 1;
       pending.push(item);
     }
   }
   
   return pending;
 }
 
 /**
  * ฟังก์ชันสำหรับ Admin เพื่อกดปิด Review
  * decision สามารถเป็น: CREATE_NEW, MERGE_TO_CANDIDATE_1, IGNORE
  */
 function applyReviewDecision(reviewId, decision, selectedPersonId) {
   const ss = SpreadsheetApp.getActiveSpreadsheet();
   const sheet = ss.getSheetByName('Q_REVIEW');
   const data = sheet.getDataRange().getValues();
   
   let rowIndex = -1;
   let reviewRow = null;
   
   for (let i = 1; i < data.length; i++) {
     if (data[i][0] === reviewId) {
       rowIndex = i + 1;

SYSTEM_AUDIT.md

+# SYSTEM AUDIT — LMDS-Synergy-V4.3 (Google Apps Script)
+
+## 1) จำนวนโมดูลโค้ดทั้งหมด
+ระบบมี **17 โมดูล** (00 ถึง 16):
+
+1. `00_App.gs`
+2. `01_Config.gs`
+3. `02_Schema.gs`
+4. `03_SetupSheets.gs`
+5. `04_SourceRepository.gs`
+6. `05_NormalizeService.gs`
+7. `06_PersonService.gs`
+8. `07_PlaceService.gs`
+9. `08_GeoService.gs`
+10. `09_DestinationService.gs`
+11. `10_MatchEngine.gs`
+12. `11_TransactionService.gs`
+13. `12_ReviewService.gs`
+14. `13_ReportService.gs`
+15. `14_Utils.gs`
+16. `15_GoogleMapsAPI.gs`
+17. `16_GeoDictionaryBuilder.gs`
+
+---
+
+## 2) ฟังก์ชันในแต่ละโมดูล
+
+### `00_App.gs`
+- `onOpen`
+- `runInitialSetup`
+- `runDailyProcess`
+- `reprocessSelectedRows`
+- `onEdit`
+- `runNightlyMaintenance` ✅ (เพิ่มแล้ว)
+
+### `01_Config.gs`
+- `getConfig`
+- `getAllConfigs`
+- `setConfig`
+- `getThresholds`
+- `getSheetNames`
+
+### `02_Schema.gs`
+- `validateSourceSchema`
+- `ensureSystemSheets`
+- `getSourceColumnMap`
+- `assertRequiredColumns`
+
+### `03_SetupSheets.gs`
+- `createSystemSheets`
+- `seedInitialConfig`
+
+### `04_SourceRepository.gs`
+- `getSourceRows`
+- `getUnprocessedSourceRows`
+- `mapRowToSourceObject`
+- `markSourceRowProcessed`
+- `updateSourceSyncStatus`
+
+### `05_NormalizeService.gs`
+- `normalizeThaiText`
+- `normalizePersonName`
+- `normalizePlaceName`
+- `loadThGeo`
+- `normalizeAddress`
+- `analyzeGeoWarning`
+- `extractPhoneNumbers`
+- `smartMergeAddress`
+- `cleanAddressRedundancy`
+- `validatePostcodeOverride`
+- `normalizeLatLong`
+- `buildGeoKeys`
+- `buildFingerprint`
+
+### `06_PersonService.gs`
+- `resolvePerson`
+- `findPersonCandidates`
+- `scorePersonCandidate`
+- `createPerson`
+- `createPersonAlias`
+- `updatePersonStats` (stub)
+
+### `07_PlaceService.gs`
+- `resolvePlace`
+- `findBestMatch`
+- `findPlaceCandidates`
+- `scorePlaceCandidate`
+- `createPlace`
+- `createPlaceAlias`
+
+### `08_GeoService.gs`
+- `resolveGeo`
+- `findGeoCandidates`
+- `createGeoPoint`
+
+### `09_DestinationService.gs`
+- `buildDestinationKey`
+- `resolveDestination`
+- `createDestination`
+- `updateDestinationStats` (stub)
+
+### `10_MatchEngine.gs`
+- `matchAllEntities`
+- `calculateCompositeScore`
+- `decideAutoMatchOrReview`
+- `buildReviewPayload`
+- `detectConflictType`
+- `evaluateThaiGeoBonus`
+
+### `11_TransactionService.gs`
+- `buildFactRow`
+- `upsertFactDelivery`
+- `preventDuplicateTransaction`
+
+### `12_ReviewService.gs`
+- `enqueueReview`
+- `setupReviewDropdown`
+- `getPendingReviews` ✅ (แก้ index สถานะแล้ว)
+- `applyReviewDecision`
+
+### `13_ReportService.gs`
+- `refreshQualityReport`
+- `buildDailySummary`
+
+### `14_Utils.gs`
+- `uuid`
+- `safeTrim`
+- `safeString`
+- `safeNumber`
+- `safeDate`
+- `formatTime`
+- `writeLog`
+- `haversineDistanceMeters`
+- `diceCoefficient`
+- `lengthRatio`
+- `saveCheckpoint`
+- `getCheckpoint`
+- `clearCheckpoint`
+- `isTimeNearLimit`
+- `updateRunStatus`
+- `showAutoCloseAlert`
+
+### `15_GoogleMapsAPI.gs`
+- `md5`
+- `getAdvancedCache`
+- `setAdvancedCache`
+- `GOOGLEMAPS_DISTANCE`
+- `GOOGLEMAPS_REVERSEGEOCODE`
+- `GOOGLEMAPS_LATLONG`
+- `GOOGLEMAPS_DURATION`
+
+### `16_GeoDictionaryBuilder.gs`
+- `buildGeoIndex`
+- `parseRemarkLogic`
+
+---
+
+## 3) จำนวนชีตที่ระบบใช้ + ชื่อคอลัมน์
+
+## 3.1 ชีตดิบต้นทาง (Source)
+- ชื่อชีต: ตั้งจาก Config (`SOURCE_SHEET_NAME`) ค่า default คือ `SCGนครหลวงJWDภูมิภาค`
+- อ่านคอลัมน์สำคัญผ่าน `mapRowToSourceObject` เช่น:
+  - `ID_SCGนครหลวงJWDภูมิภาค`
+  - `วันที่ส่งสินค้า`
+  - `เวลาที่ส่งสินค้า`
+  - `จุดส่งสินค้าปลายทาง`
+  - `ชื่อ - นามสกุล`
+  - `ทะเบียนรถ`
+  - `Shipment No`
+  - `Invoice No`
+  - `รหัสลูกค้า`
+  - `ชื่อเจ้าของสินค้า`
+  - `ชื่อปลายทาง`
+  - `Email พนักงาน`
+  - `LAT`
+  - `LONG`
+  - `คลังสินค้า`
+  - `ที่อยู่ปลายทาง`
+  - `เหตุผิดปกติที่ตรวจพบ`
+  - `ระยะทางจากคลัง_Km`
+  - `ชื่อที่อยู่จาก_LatLong`
+  - `ID_พนักงาน`
+  - `ผลการตรวจสอบงานส่ง`
+  - `SYNC_STATUS`
+
+## 3.2 ชีตระบบ (System Sheets)
+1. `M_PERSON`
+2. `M_PERSON_ALIAS`
+3. `M_PLACE`
+4. `M_PLACE_ALIAS`
+5. `M_GEO_POINT`
+6. `M_DESTINATION`
+7. `FACT_DELIVERY`
+8. `Q_REVIEW`
+9. `SYS_CONFIG`
+10. `SYS_LOG`
+11. `RPT_DATA_QUALITY`
+12. `MAPS_CACHE`
+13. `SYS_TH_GEO`
+
+> รวมชีตระบบ 13 ชีต + ชีตต้นทาง 1 ชีต = ใช้งานรวมอย่างน้อย 14 ชีต
+
+## 3.3 โครงสร้าง `SYS_TH_GEO` (รองรับตามที่ผู้ใช้กำหนด)
+### คอลัมน์หลักที่กรอกเอง (A-E)
+- A: `รหัสไปรษณีย์`
+- B: `แขวง/ตำบล`
+- C: `เขต/อำเภอ`
+- D: `จังหวัด`
+- E: `หมายเหตุ`
+
+### คอลัมน์ที่ระบบ build เพิ่ม (F-N)
+- F: `postcode_text`
+- G: `subdistrict_norm`
+- H: `district_norm`
+- I: `province_norm`
+- J: `note_type`
+- K: `note_keywords`
+- L: `postcode_override`
+- M: `geo_key`
+- N: `active_flag`
+
+---
+
+## 4) คำตอบตรงคำถามเรื่อง “ช่องหมายเหตุต้องแปลงอะไรไหม”
+โดยดีไซน์ปัจจุบัน **ไม่จำเป็นต้องแปลงเอง** ให้พิมพ์หมายเหตุแบบมนุษย์อ่านได้ แล้วใช้ `buildGeoIndex()` ช่วย parse ให้อัตโนมัติผ่าน `parseRemarkLogic()`.
+
+ระบบจะพยายามจัดประเภทจากข้อความ เช่น:
+- `ONLY_BUILDING` (เช่น “เฉพาะ อาคาร... เท่านั้น”)
+- `ONLY_MOO` (เช่น “เฉพาะ หมู่... เท่านั้น”)
+- `EXCEPT_RULE` (มี pattern “ยกเว้น ... ใช้รหัส xxxxx”)
+- `COMPLEX_HOUSE_NO` (กรณีเลขคี่/เลขคู่/บ้านเลขที่)
+- `OTHER_WARNING` (เข้า pattern ข้างบนไม่ได้)
+- `NONE` (ไม่มีหมายเหตุ)
+
+**ข้อแนะนำเพื่อ parse แม่นขึ้น**
+- ให้มีคำว่า `ยกเว้น` และ `ใช้รหัส 12345` ชัดเจนในบรรทัดเดียวกัน
+- ถ้าเป็นกรณีอาคาร ให้ขึ้นต้นด้วย `เฉพาะ อาคาร...`
+- ถ้าเป็นเงื่อนไขหลายบรรทัด ให้แยกเป็นหลายเรคคอร์ดในชีต จะควบคุมง่ายกว่า
+
+---
+
+## 5) จุดที่ตรวจพบว่า “ส่งโค้ดไม่ครบ/ควรแก้” และสถานะ
+
+### 5.1 เมนูเรียกฟังก์ชันที่ยังไม่มี
+- เดิมมีเมนู `runNightlyMaintenance` แต่ไม่มี implementation
+- สถานะ: ✅ เพิ่มฟังก์ชันแล้ว
+
+### 5.2 ดึงรายการรีวิวค้างผิดคอลัมน์
+- `getPendingReviews()` เดิมเช็ค `status` ผิด index
+- สถานะ: ✅ แก้เป็น index 17 (คอลัมน์ status ใน schema)
+
+### 5.3 การตั้งค่า `SYS_TH_GEO` ยังไม่อยู่ในระบบ setup กลาง
+- เดิมระบบมีการใช้งานชีตนี้ แต่ไม่ได้อยู่ใน `getSheetNames()` และ setup schema กลาง
+- สถานะ: ✅ เพิ่มชื่อชีตใน config และเพิ่ม schema A-E ใน setup แล้ว
+
+---
+
+## 6) ข้อเสนอฟังก์ชันใหม่ที่ควรเพิ่มต่อ (เพื่อให้ “แข็งแกร่ง สะอาด ใช้งานจริง”)
+
+1. `validateSourceRowCompleteness(sourceObj)`
+   - ให้คะแนนความครบถ้วนของแถว (ชื่อ, ที่อยู่, lat/long)
+   - แถวที่ข้อมูลน้อยเกินไปส่งเข้า Q_REVIEW พร้อม reason ชัดเจน
+
+2. `resolvePersonByGeoHistory(personNameNorm, lat, lng)`
+   - ถ้าชื่อมั่ว แต่คนเดิมชอบส่งที่พิกัดเดิม ให้ช่วยยืนยันบุคคลจากประวัติ geo
+
+3. `resolvePlaceByGeoCluster(lat, lng)`
+   - สร้างคลัสเตอร์จุดส่ง (เช่น 20–30 เมตร) แล้ว map เข้าสถานที่ canonical
+
+4. `parseThaiAddressComponents(address)`
+   - แตกบ้านเลขที่/หมู่/ซอย/ถนน/ตำบล/อำเภอ/จังหวัดเป็นโครงสร้าง
+   - ใช้เพิ่มความแม่นของ place matching และ postcode override
+
+5. `upsertAliasWithUsageStats(entityType, id, alias)`
+   - เพิ่มสถิติการใช้งาน alias และ last_seen อัตโนมัติ
+
+6. `detectOverMergeRisk(matchResult)`
+   - กันระบบรวมคนผิดจากชื่อสั้นมาก เช่น “สมชาย”, “ช่างเอก”
+
+7. `buildConflictDashboard()`
+   - รายงาน 8 ปัญหาที่คุณระบุแบบแยกหมวดรายวัน เพื่อให้รีวิวเร็วขึ้น
+
+---
+
+## 7) Mapping ปัญหา 8 ข้อ ↔ โมดูลที่รับผิดชอบ
+
+1) ชื่อบุคคลซ้ำกัน  → `06_PersonService.gs`, `10_MatchEngine.gs`  
+2) ชื่อสถานที่ซ้ำกัน → `07_PlaceService.gs`, `10_MatchEngine.gs`  
+3) LatLong ซ้ำกัน     → `08_GeoService.gs`  
+4) คนเดียวกันชื่อหลายแบบ → `05_NormalizeService.gs`, `06_PersonService.gs`  
+5) คนละชื่อแต่ที่อยู่เดียวกัน → `07_PlaceService.gs`, `10_MatchEngine.gs`  
+6) ชื่อเดียวกันแต่ที่อยู่ต่างกัน → `10_MatchEngine.gs` (conflict type)  
+7) ชื่อเดียวกันแต่ geo ต่างกัน → `10_MatchEngine.gs` (conflict type)  
+8) คนละชื่อแต่ geo เดียวกัน → `10_MatchEngine.gs` (conflict type)
+
+---
+
+## 8) นิยามความน่าเชื่อถือ (Operational Priority)
+
+ลำดับเชิงตำแหน่งที่ควรใช้ในระบบ:
+1. `LAT` + `LONG`
+2. `จุดส่งสินค้าปลายทาง`
+3. `ชื่อที่อยู่จาก_LatLong`
+4. `ที่อยู่ปลายทาง`
+
+ลำดับเชิงบุคคล:
+1. `ชื่อปลายทาง` (ต้อง normalize + alias + review)
+
+ลำดับเชิงธุรกิจประกอบ:
+1. `ชื่อเจ้าของสินค้า`
+2. `Invoice No`
+3. `รหัสลูกค้า`
+4. `ระยะทางจากคลัง_Km`
+


Summary

ขอบคุณที่ย้ำเรื่อง “ข้อมูลมั่ว” ครับ รอบนี้ผมแก้เชิงระบบให้ กันความเสี่ยง merge ผิด ตั้งแต่ต้นทางเลย โดยเพิ่ม Data Quality Gate ใน runDailyProcess() เพื่อคัดแถวที่ข้อมูลไม่ครบ/น่าสงสัยเข้า Q_REVIEW ก่อน ไม่ปล่อยไป auto-match ทันทีครับ.

เพิ่มการแปลงตัวเลขแบบปลอดภัยใน source mapper (toNumberOrNull) เพื่อไม่บังคับค่าว่างให้กลายเป็น 0 อีกต่อไป โดยเฉพาะ LAT/LONG จะเป็น null เมื่อข้อมูลหายหรือผิดรูป ทำให้ตรวจแถวเสียได้แม่นขึ้นครับ.

เสริม normalization สำหรับชื่อบุคคลและชื่อสถานที่ให้ทนข้อมูลสกปรกมากขึ้น เช่นตัดคำปนงาน (รับของ, ส่งของ, หน้าร้าน, ฯลฯ), ลบสัญลักษณ์รบกวน, จัดช่องว่างซ้ำ เพื่อช่วยลด false match จากข้อมูลที่ตัดคำมั่วครับ.

เพิ่มฟังก์ชัน evaluateSourceCompleteness(sourceObj) สำหรับประเมินความครบถ้วน (ชื่อ, ที่อยู่, พิกัด, เลขเอกสาร) และกำหนด critical rules เพื่อส่งรีวิวแบบมีเหตุผลชัดเจนครับ.

เพิ่ม payload รีวิวเฉพาะกรณีข้อมูลไม่ครบ buildDataQualityReviewPayload() (issueType: INCOMPLETE_SOURCE_DATA) และเพิ่ม conflict tag LOW_QUALITY_PERSON_NAME เพื่อช่วยแอดมินคัดเคสคุณภาพต่ำได้เร็วขึ้นครับ.

อัปเดตเอกสาร inventory ให้สะท้อนฟังก์ชันใหม่ที่เพิ่มเข้ามาแล้วในโมดูล 05 และ 10 ครับ.

Testing

✅ git status --short && rg -n "evaluateSourceCompleteness|buildDataQualityReviewPayload|INCOMPLETE_SOURCE_DATA|toNumberOrNull|LOW_QUALITY_PERSON_NAME" 00_App.gs 04_SourceRepository.gs 05_NormalizeService.gs 10_MatchEngine.gs

✅ git diff -- 00_App.gs 04_SourceRepository.gs 05_NormalizeService.gs 10_MatchEngine.gs | sed -n '1,260p'

✅ git add 00_App.gs 04_SourceRepository.gs 05_NormalizeService.gs 10_MatchEngine.gs SYSTEM_AUDIT.md && git commit -m "Harden dirty-data handling with completeness gate and safer normalization"

ผม commit และสร้าง PR message ให้แล้วเรียบร้อยครับ.

Summary

ขอบคุณที่ย้ำเรื่อง “ข้อมูลมั่ว” ครับ รอบนี้ผมแก้เชิงระบบให้ กันความเสี่ยง merge ผิด ตั้งแต่ต้นทางเลย โดยเพิ่ม Data Quality Gate ใน runDailyProcess() เพื่อคัดแถวที่ข้อมูลไม่ครบ/น่าสงสัยเข้า Q_REVIEW ก่อน ไม่ปล่อยไป auto-match ทันทีครับ.

เพิ่มการแปลงตัวเลขแบบปลอดภัยใน source mapper (toNumberOrNull) เพื่อไม่บังคับค่าว่างให้กลายเป็น 0 อีกต่อไป โดยเฉพาะ LAT/LONG จะเป็น null เมื่อข้อมูลหายหรือผิดรูป ทำให้ตรวจแถวเสียได้แม่นขึ้นครับ.

เสริม normalization สำหรับชื่อบุคคลและชื่อสถานที่ให้ทนข้อมูลสกปรกมากขึ้น เช่นตัดคำปนงาน (รับของ, ส่งของ, หน้าร้าน, ฯลฯ), ลบสัญลักษณ์รบกวน, จัดช่องว่างซ้ำ เพื่อช่วยลด false match จากข้อมูลที่ตัดคำมั่วครับ.

เพิ่มฟังก์ชัน evaluateSourceCompleteness(sourceObj) สำหรับประเมินความครบถ้วน (ชื่อ, ที่อยู่, พิกัด, เลขเอกสาร) และกำหนด critical rules เพื่อส่งรีวิวแบบมีเหตุผลชัดเจนครับ.

เพิ่ม payload รีวิวเฉพาะกรณีข้อมูลไม่ครบ buildDataQualityReviewPayload() (issueType: INCOMPLETE_SOURCE_DATA) และเพิ่ม conflict tag LOW_QUALITY_PERSON_NAME เพื่อช่วยแอดมินคัดเคสคุณภาพต่ำได้เร็วขึ้นครับ.

อัปเดตเอกสาร inventory ให้สะท้อนฟังก์ชันใหม่ที่เพิ่มเข้ามาแล้วในโมดูล 05 และ 10 ครับ.

Testing

✅ git status --short && rg -n "evaluateSourceCompleteness|buildDataQualityReviewPayload|INCOMPLETE_SOURCE_DATA|toNumberOrNull|LOW_QUALITY_PERSON_NAME" 00_App.gs 04_SourceRepository.gs 05_NormalizeService.gs 10_MatchEngine.gs

✅ git diff -- 00_App.gs 04_SourceRepository.gs 05_NormalizeService.gs 10_MatchEngine.gs | sed -n '1,260p'

✅ git add 00_App.gs 04_SourceRepository.gs 05_NormalizeService.gs 10_MatchEngine.gs SYSTEM_AUDIT.md && git commit -m "Harden dirty-data handling with completeness gate and safer normalization"

ผม commit และสร้าง PR message ให้แล้วเรียบร้อยครับ.

diff --git a/00_App.gs b/00_App.gs
00_App.gs

         startIdx = resumeIdx + 1;
         updateRunStatus('RESUMING', `กำลังรันต่อจากแถวที่ ${lastCheckpoint}...`);
       }
     } else {
       updateRunStatus('RUNNING', `เริ่มประมวลผล ${rowsToProcess.length} รายการ...`);
     }
 
     let successCount = 0;
     let reviewCount = 0;
     let errorCount = 0;
 
     for (let i = startIdx; i < rowsToProcess.length; i++) {
       // ตรวจสอบเวลา (Safety Watch) - ป้องกัน Error 6 นาทีของ Google
       if (isTimeNearLimit(startTime, MAX_TIME_MS)) {
         const lastRow = rowsToProcess[i - 1] ? rowsToProcess[i - 1].sourceIndex : (lastCheckpoint || 0);
         if (lastRow) saveCheckpoint(lastRow);
         
         updateRunStatus('PAUSED', `หยุดพักที่แถว ${lastRow} (ใกล้ครบ 6 นาที)`);
         showAutoCloseAlert(`<b>ใกล้ครบลิมิต 6 นาทีของ Google แล้วครับ</b><br>ระบบบันทึกงานถึงแถวที่ ${lastRow} เรียบร้อย<br><br><b>กรุณากดปุ่มรันใหม่อีกครั้งเพื่อทำงานต่อครับ</b>`, 15);
         return; // หยุดการทำงาน (แอดมินต้องกดรันใหม่เอง)
       }
 
       const rowItem = rowsToProcess[i];
       try {
         const sourceObj = mapRowToSourceObject(rowItem.rowData, rowItem.sourceIndex);
+        const quality = evaluateSourceCompleteness(sourceObj);
+
+        // ถ้าข้อมูลดิบไม่ผ่านขั้นต่ำ ให้เข้า Review ก่อนเพื่อกัน merge ผิด
+        if (quality.isCritical) {
+          const qualityPayload = buildDataQualityReviewPayload(sourceObj, quality);
+          enqueueReview(qualityPayload);
+          markSourceRowProcessed(rowItem.sourceIndex, 'REVIEW');
+          reviewCount++;
+          continue;
+        }
+
         const result = matchAllEntities(sourceObj);
         const decision = decideAutoMatchOrReview(result);
         
         if (decision === 'AUTO_MATCH') {
           const factRow = buildFactRow(sourceObj, result);
           upsertFactDelivery(factRow);
           markSourceRowProcessed(rowItem.sourceIndex, 'SUCCESS');
           successCount++;
         } else {
           const reviewPayload = buildReviewPayload(sourceObj, result);
           enqueueReview(reviewPayload);
           markSourceRowProcessed(rowItem.sourceIndex, 'REVIEW');
           reviewCount++;
         }
 
       } catch (e) {
         markSourceRowProcessed(rowItem.sourceIndex, 'ERROR');
         writeLog('ERROR', '00_App', 'runDailyProcess', `Row_${rowItem.sourceIndex}`, e.message, e.stack);
         errorCount++;
       }
     }
 
     // เมื่อประมวลผลเสร็จสิ้นทั้งหมด
     clearCheckpoint();
     refreshQualityReport();


04_SourceRepository.gs

  * (SYNC_STATUS ว่าง หรือไม่มีคำว่า SUCCESS/REVIEW/ERROR)
  */
 function getUnprocessedSourceRows() {
   const data = getSourceRows();
   const map = getSourceColumnMap();
   const syncColIdx = map['SYNC_STATUS'];
   
   const unprocessed = [];
   const maxRows = parseInt(getConfig('MAX_PROCESS_ROWS_PER_RUN'), 10) || 500;
   
   for (let i = 1; i < data.length; i++) { // ข้าม header
     const status = safeString(data[i][syncColIdx]).toUpperCase();
     if (status !== 'SUCCESS' && status !== 'REVIEW' && status !== 'ERROR' && status !== 'IGNORE') {
       unprocessed.push({
         sourceIndex: i + 1, // แถวจริงในชีต (1-indexed)
         rowData: data[i]
       });
       if (unprocessed.length >= maxRows) break;
     }
   }
   return unprocessed;
 }
 
 function mapRowToSourceObject(rowArr, rowNumber) {
   const map = getSourceColumnMap();
+  const toNumberOrNull = (value) => {
+    if (value === null || value === undefined || value === '') return null;
+    const num = Number(value);
+    return isNaN(num) ? null : num;
+  };
   
   // ฟังก์ชันช่วยหา Index แบบยืดหยุ่น (เผื่อมีเว้นวรรคไม่ตรงกัน)
   const getIdx = (name, alternates = []) => {
     if (map[name] !== undefined) return map[name];
     for (let alt of alternates) {
       if (map[alt] !== undefined) return map[alt];
     }
     // ค้นหาแบบไม่สนใจเว้นวรรค, Underscore และ Case
     const cleanSearch = name.replace(/[\s_]+/g, '').toLowerCase();
     for (let key in map) {
       if (key.replace(/[\s_]+/g, '').toLowerCase() === cleanSearch) return map[key];
     }
     return undefined;
   };
 
   return {
     rowNumber: rowNumber,
     idScg: safeString(rowArr[getIdx('ID_SCGนครหลวงJWDภูมิภาค')]),
     invoiceNo: safeString(rowArr[getIdx('Invoice No')]),
     shipmentNo: safeString(rowArr[getIdx('Shipment No')]),
     deliveryDate: safeDate(rowArr[getIdx('วันที่ส่งสินค้า')]),
     deliveryTime: formatTime(rowArr[getIdx('เวลาที่ส่งสินค้า')]),
     driverName: safeString(rowArr[getIdx('ชื่อ - นามสกุล')]),
     licensePlate: safeString(rowArr[getIdx('ทะเบียนรถ')]),
     customerCode: safeString(rowArr[getIdx('รหัสลูกค้า')]),
     ownerName: safeString(rowArr[getIdx('ชื่อเจ้าของสินค้า')]),
     destinationNameRaw: safeString(rowArr[getIdx('ชื่อปลายทาง')]),
     addressRaw: safeString(rowArr[getIdx('ที่อยู่ปลายทาง')]),
-    latRaw: safeNumber(rowArr[getIdx('LAT')]),
-    longRaw: safeNumber(rowArr[getIdx('LONG')]),
+    latRaw: toNumberOrNull(rowArr[getIdx('LAT')]),
+    longRaw: toNumberOrNull(rowArr[getIdx('LONG')]),
     latLongText: safeString(rowArr[getIdx('จุดส่งสินค้าปลายทาง')]),
     warehouse: safeString(rowArr[getIdx('คลังสินค้า เอสซีจี เจดับเบิ้ลยูดี วังน้อย', ['คลังสินค้า'])]),
-    distanceKm: safeNumber(rowArr[getIdx('ระยะทางจากคลัง_Km')]),
+    distanceKm: toNumberOrNull(rowArr[getIdx('ระยะทางจากคลัง_Km')]) || 0,
     addressFromLatLong: safeString(rowArr[getIdx('ชื่อที่อยู่จาก_LatLong', ['ชื่อที่อยู่จาก LatLong'])]), 
     employeeEmail: safeString(rowArr[getIdx('Email พนักงาน')]),
     employeeId: safeString(rowArr[getIdx('ID_พนักงาน')]),
     anomalyDetected: safeString(rowArr[getIdx('เหตุผิดปกติที่ตรวจพบ')]),
     validationResult: safeString(rowArr[getIdx('ผลการตรวจสอบงานส่ง')])
   };
 }
 
 /**
  * อัปเดตสถานะของแถว
  */
 function markSourceRowProcessed(rowNumber, status) {
   updateSourceSyncStatus(rowNumber, status);
 }
 
 function updateSourceSyncStatus(rowNumber, status) {
   const ss = SpreadsheetApp.getActiveSpreadsheet();
   const sheet = ss.getSheetByName(getSheetNames().SOURCE);
   const col = getSourceColumnMap()['SYNC_STATUS'] + 1;
   sheet.getRange(rowNumber, col).setValue(status);
 }


05_NormalizeService.gs

   // 1. สกัดและลบเบอร์โทรศัพท์ออกไปก่อน (ถ้ามี)
   const phones = extractPhoneNumbers(n);
   if (phones) {
     const phoneList = phones.split(', ');
     phoneList.forEach(p => {
       const pPattern = new RegExp(p.split('').join('[-.\\s]?'), 'g');
       n = n.replace(pPattern, '');
     });
   }
 
   // 2. Array ของ Prefix ที่ต้องการตัดออก
   const prefixes = [
     '^นาย\\s*', '^นางสาว\\s*', '^น\\.ส\\.\\s*', '^นาง\\s*', 
     '^คุณ\\s*', '^พี่\\s*', '^ช่าง\\s*', '^บจก\\.\\s*', 
     '^บริษัท\\s*', '^หจก\\.\\s*', '^ห้างหุ้นส่วนจำกัด\\s*',
     '^ดร\\.?\\s*', '^นพ\\.?\\s*', '^พญ\\.?\\s*', '^ผศ\\.?\\s*', '^รศ\\.?\\s*', '^ศ\\.?\\s*', // คำนำหน้าวิชาชีพ
     'โทร\\.?\\s*$', 'เบอร์\\s*$', 'ติดต่อ\\s*$', // ลบคำว่า โทร. ที่ติดอยู่ท้ายชื่อ
     'โทร\\.?\\s*\\d+', 'เบอร์\\s*\\d+', 'ติดต่อ\\s*\\d+' 
   ];
   
   // ลบ Prefix
   for (let i = 0; i < prefixes.length; i++) {
     const regex = new RegExp(prefixes[i], 'gi');
     n = n.replace(regex, '');
   }
+
+  // 3. ลบคำประกอบที่ไม่ใช่ชื่อบุคคลจริง
+  const noisyTokens = [
+    'รับของ', 'ส่งของ', 'หน้าร้าน', 'หน้าบ้าน', 'ลูกค้า', 'ปลายทาง', 'บ้าน', 'ร้าน', 'โกดัง', 'คลัง'
+  ];
+  noisyTokens.forEach(t => {
+    const regex = new RegExp(t, 'gi');
+    n = n.replace(regex, ' ');
+  });
+
+  // 4. ลบอักขระพิเศษที่รบกวนการ match ชื่อ
+  n = n.replace(/[^\u0E00-\u0E7Fa-zA-Z0-9\s]/g, ' ');
+  n = n.replace(/\s+/g, ' ');
   
   return safeTrim(n);
 }
 
 /**
  * มาตรฐานชื่อสถานที่
  */
 function normalizePlaceName(name) {
   if (!name) return '';
   let n = normalizeThaiText(name);
   
   // ลบคำที่มักจะซ้ำซ้อน
   n = n.replace(/^ร้าน\s*/i, '');
   n = n.replace(/สาขา\s*\d+/i, ''); // ตัดคำว่าสาขาออกไปก่อนเพื่อหาตัวร้านหลัก
+  n = n.replace(/^\-+|\-+$/g, '');
+  n = n.replace(/[|]+/g, ' ');
+  n = n.replace(/\s+/g, ' ');
   
   return safeTrim(n);
 }
 
+/**
+ * ประเมินความครบถ้วนขั้นต่ำของข้อมูลต้นทาง
+ * ใช้กันงานที่ข้อมูลสั้น/มั่วมากไม่ให้ Auto-Merge ผิดคนผิดที่
+ */
+function evaluateSourceCompleteness(sourceObj) {
+  const issues = [];
+  const rawPerson = safeString(sourceObj.destinationNameRaw);
+  const normPerson = normalizePersonName(rawPerson);
+  const rawAddress = safeString(sourceObj.addressRaw);
+  const geoAddress = safeString(sourceObj.addressFromLatLong);
+  const hasGeoPoint = sourceObj.latRaw !== null && sourceObj.longRaw !== null;
+  const hasLatLongText = !!safeTrim(sourceObj.latLongText);
+
+  if (!rawPerson) issues.push('MISSING_PERSON_NAME');
+  if (rawPerson && normPerson.length < 2) issues.push('PERSON_NAME_TOO_SHORT');
+  if (!rawAddress && !geoAddress) issues.push('MISSING_ADDRESS_TEXT');
+  if (!hasGeoPoint && !hasLatLongText) issues.push('MISSING_GEO_POINT');
+  if (!sourceObj.invoiceNo && !sourceObj.shipmentNo) issues.push('MISSING_DOC_REF');
+
+  // คะแนนความครบถ้วนแบบง่าย (100 = ครบดี)
+  let score = 100;
+  score -= issues.length * 20;
+  score = Math.max(0, score);
+
+  const isCritical = issues.includes('MISSING_GEO_POINT') ||
+                     issues.includes('MISSING_PERSON_NAME') ||
+                     issues.includes('PERSON_NAME_TOO_SHORT');
+
+  return {
+    score: score,
+    issues: issues,
+    isCritical: isCritical
+  };
+}
+
 /**
  * โหลดข้อมูลพจนานุกรมตำบล/อำเภอ/จังหวัด
  */
 let TH_GEO_CACHE = null;
 
 function loadThGeo() {
   if (TH_GEO_CACHE) return TH_GEO_CACHE;
   
   const ss = SpreadsheetApp.getActiveSpreadsheet();
   const sheet = ss.getSheetByName('SYS_TH_GEO');
   if (!sheet) return null;
   
   const data = sheet.getDataRange().getValues();
   TH_GEO_CACHE = {
     subdistricts: {}
   };
   
   for (let i = 1; i < data.length; i++) {
     const zipcode = data[i][0];
     // อ่านจากคอลัมน์ F ถึง L ที่ถูก Parse แล้ว (index 5-11)
     const subdistrictNorm = data[i][6] ? String(data[i][6]) : '';
     const districtNorm = data[i][7] ? String(data[i][7]) : '';
     const provinceNorm = data[i][8] ? String(data[i][8]) : '';
     const noteType = data[i][9] ? String(data[i][9]) : 'NONE';
     const noteKeywords = data[i][10] ? String(data[i][10]) : '';


10_MatchEngine.gs

   // น้ำหนัก V4.4: Geo 45%, Person 30%, Place 25%
   let score = (pScore * 0.30) + (plScore * 0.25) + (gScore * 0.45);
   
   // บวกโบนัสความแม่นยำทางภูมิศาสตร์ (ถ้ามี)
   score += bonusScore;
   
   return Math.min(100, Math.round(score));
 }
 
 function decideAutoMatchOrReview(matchResult) {
   const thresholds = getThresholds();
   
   // ถ้ามีบาง entity ที่หาไม่เจอและไม่ถูกสิทธิ์สร้างใหม่
   if (!matchResult.person.finalId || !matchResult.place.finalId || !matchResult.geo.finalId) {
     return 'REVIEW';
   }
   
   // ถ้าคะแนนรวมผ่านเกณฑ์ หรือ มีการสร้างใหม่ร้อยเปอร์เซ็นต์ (คะแนนจะได้ 100)
   if (matchResult.compositeScore >= thresholds.autoMatchScore) {
     return 'AUTO_MATCH';
   }
   
   return 'REVIEW';
 }
 
+function buildDataQualityReviewPayload(sourceObj, qualityResult) {
+  const issues = (qualityResult && qualityResult.issues) ? qualityResult.issues.join(', ') : 'UNKNOWN';
+  return {
+    issueType: 'INCOMPLETE_SOURCE_DATA',
+    sourceRecordId: sourceObj.idScg,
+    sourceRowNumber: sourceObj.rowNumber,
+    invoiceNo: sourceObj.invoiceNo,
+    rawPersonName: sourceObj.destinationNameRaw,
+    rawPlaceName: sourceObj.addressRaw,
+    rawSystemAddress: sourceObj.addressRaw,
+    rawGeoResolvedAddress: sourceObj.addressFromLatLong,
+    rawLat: sourceObj.latRaw,
+    rawLong: sourceObj.longRaw,
+    candidatePersonIds: '',
+    candidatePlaceIds: '',
+    candidateGeoIds: '',
+    score: qualityResult ? qualityResult.score : 0,
+    recommendedAction: 'MANUAL_REVIEW',
+    note: `🚩 ข้อมูลไม่ครบ/น่าสงสัย: ${issues}`
+  };
+}
+
 function buildReviewPayload(sourceObj, matchResult) {
   const cPersonIds = matchResult.person.candidates.map(c => c.personId || c.id).join(',');
   const cPlaceIds = matchResult.place.candidates.map(c => c.placeId || c.id).join(',');
   const cGeoIds = matchResult.geo.candidates.map(c => c.geoId || c.id).join(',');
   
   return {
     issueType: detectConflictType(matchResult),
     sourceRecordId: sourceObj.idScg,
     sourceRowNumber: sourceObj.rowNumber,
     invoiceNo: sourceObj.invoiceNo,
     rawPersonName: sourceObj.destinationNameRaw,
     rawPlaceName: sourceObj.addressRaw, // เก็บไว้แสดงผล (อาจจะยุบรวมในอนาคต)
     rawSystemAddress: sourceObj.addressRaw, // ที่อยู่จากระบบ
     rawGeoResolvedAddress: sourceObj.addressFromLatLong, // ที่อยู่จากพิกัด
     rawLat: sourceObj.latRaw,
     rawLong: sourceObj.longRaw,
     candidatePersonIds: cPersonIds,
     candidatePlaceIds: cPlaceIds,
     candidateGeoIds: cGeoIds,
     score: matchResult.compositeScore,
     recommendedAction: 'MANUAL_REVIEW',
     note: (analyzeGeoWarning(sourceObj.addressRaw) || '') + 
           '\n💡 ที่อยู่แนะนำ: ' + smartMergeAddress(sourceObj.addressRaw, sourceObj.addressFromLatLong)
   };
 }
 
 function detectConflictType(matchResult) {
+  if ((matchResult.person.normalized || '').length < 2) return 'LOW_QUALITY_PERSON_NAME';
   if (matchResult.geo.score >= 90 && matchResult.person.score < 50) return 'SAME_GEO_DIFF_PERSON'; // ปัญหา 8
   if (matchResult.person.score >= 90 && matchResult.geo.score < 50) return 'SAME_PERSON_DIFF_GEO'; // ปัญหา 7
   if (matchResult.person.score >= 90 && matchResult.place.score < 50) return 'SAME_PERSON_DIFF_PLACE'; // ปัญหา 6
   if (matchResult.place.score >= 90 && matchResult.person.score < 50) return 'SAME_PLACE_DIFF_PERSON'; // ปัญหา 5
   return 'AMBIGUOUS_DATA'; // ครุมเครือ
 }
 
 /**
  * คำนวณคะแนนโบนัสถ้าข้อมูลภูมิศาสตร์ในที่อยู่ดิบตรงกับพิกัดจริง
  */
 function evaluateThaiGeoBonus(sourceObj) {
   let bonus = 0;
   const rawAddr = sourceObj.addressRaw || '';
   const geoAddr = sourceObj.addressFromLatLong || '';
   
   if (!rawAddr || !geoAddr) return 0;
   
   // ดึงตำบลจากที่อยู่ดิบ (รองรับ ต. หรือ ตำบล หรือ แขวง)
   const subMatch = rawAddr.match(/(?:ต\.|ตำบล|แขวง)\s*([ก-๙]+)/);
   if (subMatch) {
     const subName = subMatch[1];
     // ถ้าพิกัดที่ได้จาก Google (geoAddr) มีชื่อตำบลตรงกับที่พิมพ์มา
     if (geoAddr.indexOf(subName) > -1) {
       bonus += 15; // โบนัสความแม่นยำ
     }


SYSTEM_AUDIT.md

 ### `03_SetupSheets.gs`
 - `createSystemSheets`
 - `seedInitialConfig`
 
 ### `04_SourceRepository.gs`
 - `getSourceRows`
 - `getUnprocessedSourceRows`
 - `mapRowToSourceObject`
 - `markSourceRowProcessed`
 - `updateSourceSyncStatus`
 
 ### `05_NormalizeService.gs`
 - `normalizeThaiText`
 - `normalizePersonName`
 - `normalizePlaceName`
 - `loadThGeo`
 - `normalizeAddress`
 - `analyzeGeoWarning`
 - `extractPhoneNumbers`
 - `smartMergeAddress`
 - `cleanAddressRedundancy`
 - `validatePostcodeOverride`
 - `normalizeLatLong`
 - `buildGeoKeys`
 - `buildFingerprint`
+- `evaluateSourceCompleteness`
 
 ### `06_PersonService.gs`
 - `resolvePerson`
 - `findPersonCandidates`
 - `scorePersonCandidate`
 - `createPerson`
 - `createPersonAlias`
 - `updatePersonStats` (stub)
 
 ### `07_PlaceService.gs`
 - `resolvePlace`
 - `findBestMatch`
 - `findPlaceCandidates`
 - `scorePlaceCandidate`
 - `createPlace`
 - `createPlaceAlias`
 
 ### `08_GeoService.gs`
 - `resolveGeo`
 - `findGeoCandidates`
 - `createGeoPoint`
 
 ### `09_DestinationService.gs`
 - `buildDestinationKey`
 - `resolveDestination`
 - `createDestination`
 - `updateDestinationStats` (stub)
 
 ### `10_MatchEngine.gs`
 - `matchAllEntities`
 - `calculateCompositeScore`
 - `decideAutoMatchOrReview`
+- `buildDataQualityReviewPayload`
 - `buildReviewPayload`
 - `detectConflictType`
 - `evaluateThaiGeoBonus`
 
 ### `11_TransactionService.gs`
 - `buildFactRow`
 - `upsertFactDelivery`
 - `preventDuplicateTransaction`
 
 ### `12_ReviewService.gs`
 - `enqueueReview`
 - `setupReviewDropdown`
 - `getPendingReviews` ✅ (แก้ index สถานะแล้ว)
 - `applyReviewDecision`
 
 ### `13_ReportService.gs`
 - `refreshQualityReport`
 - `buildDailySummary`
 
 ### `14_Utils.gs`
 - `uuid`
 - `safeTrim`
 - `safeString`
 - `safeNumber`
 - `safeDate`
@@ -289,26 +291,25 @@
 3) LatLong ซ้ำกัน     → `08_GeoService.gs`  
 4) คนเดียวกันชื่อหลายแบบ → `05_NormalizeService.gs`, `06_PersonService.gs`  
 5) คนละชื่อแต่ที่อยู่เดียวกัน → `07_PlaceService.gs`, `10_MatchEngine.gs`  
 6) ชื่อเดียวกันแต่ที่อยู่ต่างกัน → `10_MatchEngine.gs` (conflict type)  
 7) ชื่อเดียวกันแต่ geo ต่างกัน → `10_MatchEngine.gs` (conflict type)  
 8) คนละชื่อแต่ geo เดียวกัน → `10_MatchEngine.gs` (conflict type)
 
 ---
 
 ## 8) นิยามความน่าเชื่อถือ (Operational Priority)
 
 ลำดับเชิงตำแหน่งที่ควรใช้ในระบบ:
 1. `LAT` + `LONG`
 2. `จุดส่งสินค้าปลายทาง`
 3. `ชื่อที่อยู่จาก_LatLong`
 4. `ที่อยู่ปลายทาง`
 
 ลำดับเชิงบุคคล:
 1. `ชื่อปลายทาง` (ต้อง normalize + alias + review)
 
 ลำดับเชิงธุรกิจประกอบ:
 1. `ชื่อเจ้าของสินค้า`
 2. `Invoice No`
 3. `รหัสลูกค้า`
 4. `ระยะทางจากคลัง_Km`
-
Summary

มีครับ — ผมทำ “ส่วนที่ควรเพิ่ม” ต่อให้แล้ว โดยเน้นลดข้อมูลซ้ำที่เกิดจากข้อมูลดิบมั่วและการรันซ้ำ:

กัน person alias ซ้ำใน M_PERSON_ALIAS (ถ้าซ้ำจะไม่ append ใหม่ แต่เพิ่ม usage_count + อัปเดต last_seen_date).

กัน place alias ซ้ำใน M_PLACE_ALIAS ด้วย logic เดียวกัน.

กันรายการ Q_REVIEW ซ้ำ (แถวเดิม + issue เดิม + source เดิม) โดยเปลี่ยนเป็น update แถว PENDING เดิมแทน append ใหม่.

ผลคือระบบจะ “สะอาดขึ้นจริง” เวลาข้อมูลต้นทางเละ/สั้น/ตัดคำผิด และเวลารันซ้ำจะไม่พอง alias/review โดยไม่จำเป็นครับ.

Testing

✅ rg -n "createPersonAlias\\(|createPlaceAlias\\(|enqueueReview\\(|กัน alias ซ้ำ|กันรายการ Review ซ้ำ" 06_PersonService.gs 07_PlaceService.gs 12_ReviewService.gs && git status --short

✅ git add 06_PersonService.gs 07_PlaceService.gs 12_ReviewService.gs && git commit -m "Prevent duplicate aliases and duplicate pending reviews"

✅ git status --short

ถ้าจะทำต่อ “รอบถัดไป” ที่คุ้มที่สุด ผมแนะนำเพิ่ม Conflict Dashboard (8 ปัญหาที่คุณระบุ) และ Rule-based reviewer assist เพื่อให้ทีมตัดสินใจใน Q_REVIEW ได้ไวขึ้นครับ.
Summary

มีครับ — ผมทำ “ส่วนที่ควรเพิ่ม” ต่อให้แล้ว โดยเน้นลดข้อมูลซ้ำที่เกิดจากข้อมูลดิบมั่วและการรันซ้ำ:

กัน person alias ซ้ำใน M_PERSON_ALIAS (ถ้าซ้ำจะไม่ append ใหม่ แต่เพิ่ม usage_count + อัปเดต last_seen_date).

กัน place alias ซ้ำใน M_PLACE_ALIAS ด้วย logic เดียวกัน.

กันรายการ Q_REVIEW ซ้ำ (แถวเดิม + issue เดิม + source เดิม) โดยเปลี่ยนเป็น update แถว PENDING เดิมแทน append ใหม่.

ผลคือระบบจะ “สะอาดขึ้นจริง” เวลาข้อมูลต้นทางเละ/สั้น/ตัดคำผิด และเวลารันซ้ำจะไม่พอง alias/review โดยไม่จำเป็นครับ.

Testing

✅ rg -n "createPersonAlias\\(|createPlaceAlias\\(|enqueueReview\\(|กัน alias ซ้ำ|กันรายการ Review ซ้ำ" 06_PersonService.gs 07_PlaceService.gs 12_ReviewService.gs && git status --short

✅ git add 06_PersonService.gs 07_PlaceService.gs 12_ReviewService.gs && git commit -m "Prevent duplicate aliases and duplicate pending reviews"

✅ git status --short

ถ้าจะทำต่อ “รอบถัดไป” ที่คุ้มที่สุด ผมแนะนำเพิ่ม Conflict Dashboard (8 ปัญหาที่คุณระบุ) และ Rule-based reviewer assist เพื่อให้ทีมตัดสินใจใน Q_REVIEW ได้ไวขึ้นครับ.

06_PersonService.gs
 
 function createPerson(canonicalName, normName, phone) {
   const ss = SpreadsheetApp.getActiveSpreadsheet();
   const sheet = ss.getSheetByName('M_PERSON');
   const personId = 'PER-' + uuid().split('-')[0].toUpperCase(); 
   
   sheet.appendRow([
     personId,
     canonicalName,
     normName,
     phone ? "'" + phone : '', // ใส่ ' นำหน้าเพื่อป้องกันเลข 0 หายใน Sheets
     new Date(),
     new Date(),
     1,
     'ACTIVE',
     ''
   ]);
   
   // สร้าง Alias อัตโนมัติให้ตัวเอง
   createPersonAlias(personId, canonicalName, normName);
   
   return personId;
 }
 
 function createPersonAlias(personId, aliasRaw, aliasNormalized) {
+  if (!personId) return '';
+  const normalized = safeTrim(aliasNormalized);
+  if (!normalized) return '';
+
   const ss = SpreadsheetApp.getActiveSpreadsheet();
   const sheet = ss.getSheetByName('M_PERSON_ALIAS');
+  const data = sheet.getDataRange().getValues();
+
+  // กัน alias ซ้ำ: ถ้ามี person_id + alias_normalized อยู่แล้วให้ bump usage แทน
+  for (let i = 1; i < data.length; i++) {
+    if (data[i][1] === personId && safeTrim(data[i][3]) === normalized) {
+      const row = i + 1;
+      const usage = Number(data[i][7]) || 0;
+      sheet.getRange(row, 7).setValue(new Date()); // last_seen_date
+      sheet.getRange(row, 8).setValue(usage + 1);  // usage_count
+      sheet.getRange(row, 9).setValue('Y');        // active_flag
+      return data[i][0];
+    }
+  }
   
+  const aliasId = 'P_AL-' + uuid().split('-')[0].toUpperCase();
   sheet.appendRow([
-    'P_AL-' + uuid().split('-')[0].toUpperCase(),
+    aliasId,
     personId,
     aliasRaw,
-    aliasNormalized,
+    normalized,
     'SYSTEM',
     new Date(),
     new Date(),
     1,
     'Y'
   ]);
+
+  return aliasId;
 }
 
 function updatePersonStats(personId) {
   // สำหรับการใช้งานจริง ควรใช้วิธีรวบยอดอัปเดตเพื่อไม่ให้ช้า
 }


07_PlaceService.gs
   
   sheet.appendRow([
     placeId,
     mergedAddress, // ใช้ที่อยู่ที่ผสมแล้วเป็นชื่อทางการ
     normPlace,
     addressRaw, // เก็บที่อยู่ดิบไว้เป็นประวัติ (M_PLACE Column D คือ address_best -> ตอนนี้เป็น mergedAddress แทน?)
     normalizeAddress(mergedAddress),
     '', // warehouse
     new Date(),
     new Date(),
     1,
     'ACTIVE',
     ''
   ]);
   
   createPlaceAlias(placeId, mergedAddress, normPlace);
   // เก็บ Alias ของที่อยู่ดิบไว้ด้วยเพื่อให้ค้นหาเจอในครั้งหน้า
   if (addressRaw && addressRaw !== mergedAddress) {
     createPlaceAlias(placeId, addressRaw, normalizePlaceName(addressRaw));
   }
   
   return placeId;
 }
 
 function createPlaceAlias(placeId, aliasRaw, aliasNormalized) {
+  if (!placeId) return '';
+  const normalized = safeTrim(aliasNormalized);
+  if (!normalized) return '';
+
   const ss = SpreadsheetApp.getActiveSpreadsheet();
   const sheet = ss.getSheetByName('M_PLACE_ALIAS');
+  const data = sheet.getDataRange().getValues();
+
+  // กัน alias ซ้ำ: ถ้ามี place_id + alias_normalized อยู่แล้วให้ bump usage แทน
+  for (let i = 1; i < data.length; i++) {
+    if (data[i][1] === placeId && safeTrim(data[i][3]) === normalized) {
+      const row = i + 1;
+      const usage = Number(data[i][7]) || 0;
+      sheet.getRange(row, 7).setValue(new Date()); // last_seen_date
+      sheet.getRange(row, 8).setValue(usage + 1);  // usage_count
+      sheet.getRange(row, 9).setValue('Y');        // active_flag
+      return data[i][0];
+    }
+  }
   
+  const aliasId = 'L_AL-' + uuid().split('-')[0].toUpperCase();
   sheet.appendRow([
-    'L_AL-' + uuid().split('-')[0].toUpperCase(),
+    aliasId,
     placeId,
     aliasRaw,
-    aliasNormalized,
+    normalized,
     'SYSTEM',
     new Date(),
     new Date(),
     1,
     'Y'
   ]);
+
+  return aliasId;
 }


12_ReviewService.gs

 /**
  * 12_ReviewService.gs
  * ระบบจัดการคิวงานที่ต้องใช้ "คน" เข้ามาตัดสินใจ (Human-in-the-loop)
  */
 
 function enqueueReview(payload) {
   const ss = SpreadsheetApp.getActiveSpreadsheet();
   const sheet = ss.getSheetByName('Q_REVIEW');
+  const data = sheet.getDataRange().getValues();
+  const sourceRecordId = safeString(payload.sourceRecordId);
+  const sourceRowNumber = Number(payload.sourceRowNumber) || 0;
+  const issueType = safeString(payload.issueType);
+
+  // กันรายการ Review ซ้ำ: ถ้ามี PENDING ของแถวเดิม+issue เดิม ให้ update แถวเดิมแทน
+  for (let i = 1; i < data.length; i++) {
+    const row = data[i];
+    if (
+      safeString(row[17]) === 'PENDING' &&
+      safeString(row[1]) === issueType &&
+      safeString(row[2]) === sourceRecordId &&
+      (Number(row[3]) || 0) === sourceRowNumber
+    ) {
+      const rowIndex = i + 1;
+      sheet.getRange(rowIndex, 6).setValue(payload.rawPersonName || '');
+      sheet.getRange(rowIndex, 7).setValue(payload.rawPlaceName || '');
+      sheet.getRange(rowIndex, 8).setValue(payload.rawSystemAddress || '');
+      sheet.getRange(rowIndex, 9).setValue(payload.rawGeoResolvedAddress || '');
+      sheet.getRange(rowIndex, 10).setValue(payload.rawLat || '');
+      sheet.getRange(rowIndex, 11).setValue(payload.rawLong || '');
+      sheet.getRange(rowIndex, 12).setValue(payload.candidatePersonIds || '');
+      sheet.getRange(rowIndex, 13).setValue(payload.candidatePlaceIds || '');
+      sheet.getRange(rowIndex, 14).setValue(payload.candidateGeoIds || '');
+      sheet.getRange(rowIndex, 16).setValue(payload.score || 0);
+      sheet.getRange(rowIndex, 22).setValue(payload.note || '');
+      return row[0]; // คืน review_id เดิม
+    }
+  }
+
   const reviewId = 'REV-' + uuid().split('-')[0].toUpperCase();
   
   sheet.appendRow([
     reviewId,
     payload.issueType,
     payload.sourceRecordId,
     payload.sourceRowNumber,
     payload.invoiceNo,
     payload.rawPersonName,
     payload.rawPlaceName,
     payload.rawSystemAddress,      // เพิ่มที่อยู่ดิบจากระบบ
     payload.rawGeoResolvedAddress, // เพิ่มที่อยู่ที่แปลงจาก LatLong
     payload.rawLat,
     payload.rawLong,
     payload.candidatePersonIds,
     payload.candidatePlaceIds,
     payload.candidateGeoIds,
     '', // candidate_destination_ids
     payload.score,
     payload.recommendedAction,
     'PENDING', // status
     '', // reviewer
     '', // reviewed_at
     '', // decision
     payload.note || ''  // note


Summary

เพิ่ม Conflict Dashboard ตามที่ขอเรียบร้อยแล้ว โดยเพิ่มชีตระบบใหม่ RPT_CONFLICT_DASHBOARD ทั้งใน config และ setup schema เพื่อรองรับรายงานปัญหา 8 กลุ่มแบบรวมศูนย์ครับ.

เพิ่มเมนูใช้งานใหม่ใน UI:
6. อัปเดต Conflict Dashboard และ 7. Reviewer Assist (Q_REVIEW) เพื่อให้ทีมเรียกใช้งานได้ทันทีจากเมนูหลักครับ.

ปรับ runNightlyMaintenance() ให้รันทั้ง refreshConflictDashboard() และ runReviewerAssist() อัตโนมัติทุกครั้งที่เรียก maintenance ครับ.

เพิ่มฟังก์ชัน refreshConflictDashboard() ใน 13_ReportService.gs เพื่อสรุปสถิติจาก Q_REVIEW ได้แก่ pending/resolved/total, avg score, สัดส่วนคำแนะนำ assist, และ last 7 days พร้อม classify เป็นรหัสปัญหา P1..P8 ผ่าน classifyConflictProblem() ครับ.

เพิ่ม Rule-based Reviewer Assist ใน 12_ReviewService.gs:

runReviewerAssist() จะวิ่งเฉพาะแถว PENDING

deriveAssistDecision() ให้คำแนะนำ ASSIST_MERGE_TO_CANDIDATE, ASSIST_CREATE_NEW, ASSIST_IGNORE พร้อม confidence + reason

เขียนผลลง recommended_action และแนบเหตุผลใน note โดย ไม่เขียนทับ decision ของคนรีวิว ครับ.

อัปเดตเอกสาร SYSTEM_AUDIT.md ให้สะท้อนฟังก์ชันและชีตใหม่ครบแล้วครับ.

Testing

✅ rg -n "refreshConflictDashboard|runReviewerAssist|deriveAssistDecision|RPT_CONFLICT_DASHBOARD|classifyConflictProblem" 00_App.gs 01_Config.gs 03_SetupSheets.gs 12_ReviewService.gs 13_ReportService.gs SYSTEM_AUDIT.md && git status --short

✅ git add 00_App.gs 01_Config.gs 03_SetupSheets.gs 12_ReviewService.gs 13_ReportService.gs SYSTEM_AUDIT.md && git commit -m "Add conflict dashboard and rule-based reviewer assist"

✅ git status --short

หากต้องการ รอบถัดไปผมสามารถเพิ่ม “สีไฮไลต์ตามความมั่นใจ” ใน Q_REVIEW (เช่นแดง=IGNORE เสนอ, เหลือง=CREATE_NEW, เขียว=MERGE) เพื่อให้ทีมตัดสินใจเร็วขึ้นอีกขั้นครับ.
Summary

เพิ่ม Conflict Dashboard ตามที่ขอเรียบร้อยแล้ว โดยเพิ่มชีตระบบใหม่ RPT_CONFLICT_DASHBOARD ทั้งใน config และ setup schema เพื่อรองรับรายงานปัญหา 8 กลุ่มแบบรวมศูนย์ครับ.

เพิ่มเมนูใช้งานใหม่ใน UI:
6. อัปเดต Conflict Dashboard และ 7. Reviewer Assist (Q_REVIEW) เพื่อให้ทีมเรียกใช้งานได้ทันทีจากเมนูหลักครับ.

ปรับ runNightlyMaintenance() ให้รันทั้ง refreshConflictDashboard() และ runReviewerAssist() อัตโนมัติทุกครั้งที่เรียก maintenance ครับ.

เพิ่มฟังก์ชัน refreshConflictDashboard() ใน 13_ReportService.gs เพื่อสรุปสถิติจาก Q_REVIEW ได้แก่ pending/resolved/total, avg score, สัดส่วนคำแนะนำ assist, และ last 7 days พร้อม classify เป็นรหัสปัญหา P1..P8 ผ่าน classifyConflictProblem() ครับ.

เพิ่ม Rule-based Reviewer Assist ใน 12_ReviewService.gs:

runReviewerAssist() จะวิ่งเฉพาะแถว PENDING

deriveAssistDecision() ให้คำแนะนำ ASSIST_MERGE_TO_CANDIDATE, ASSIST_CREATE_NEW, ASSIST_IGNORE พร้อม confidence + reason

เขียนผลลง recommended_action และแนบเหตุผลใน note โดย ไม่เขียนทับ decision ของคนรีวิว ครับ.

อัปเดตเอกสาร SYSTEM_AUDIT.md ให้สะท้อนฟังก์ชันและชีตใหม่ครบแล้วครับ.

Testing

✅ rg -n "refreshConflictDashboard|runReviewerAssist|deriveAssistDecision|RPT_CONFLICT_DASHBOARD|classifyConflictProblem" 00_App.gs 01_Config.gs 03_SetupSheets.gs 12_ReviewService.gs 13_ReportService.gs SYSTEM_AUDIT.md && git status --short

✅ git add 00_App.gs 01_Config.gs 03_SetupSheets.gs 12_ReviewService.gs 13_ReportService.gs SYSTEM_AUDIT.md && git commit -m "Add conflict dashboard and rule-based reviewer assist"

✅ git status --short

หากต้องการ รอบถัดไปผมสามารถเพิ่ม “สีไฮไลต์ตามความมั่นใจ” ใน Q_REVIEW (เช่นแดง=IGNORE เสนอ, เหลือง=CREATE_NEW, เขียว=MERGE) เพื่อให้ทีมตัดสินใจเร็วขึ้นอีกขั้นครับ.

00_App.gs

 /**
  * 00_App.gs
  * Entry point ของระบบ LMDS (Logistics Master Data System)
  */
 
 function onOpen() {
   const ui = SpreadsheetApp.getUi();
   ui.createMenu('📦 LMDS System')
     .addItem('1. ติดตั้งระบบครั้งแรก (Setup)', 'runInitialSetup')
     .addSeparator()
     .addItem('2. ประมวลผลข้อมูลประจำวัน', 'runDailyProcess')
     .addItem('3. อัปเดตพจนานุกรมสถานที่ (SYS_TH_GEO)', 'buildGeoIndex')
     .addItem('4. รีเซ็ตแถวที่เลือกเพื่อรันใหม่', 'reprocessSelectedRows')
     .addSeparator()
     .addItem('5. อัปเดตสถิติและ Report', 'runNightlyMaintenance')
+    .addItem('6. อัปเดต Conflict Dashboard', 'refreshConflictDashboard')
+    .addItem('7. Reviewer Assist (Q_REVIEW)', 'runReviewerAssist')
     .addToUi();
 }
 
 function runInitialSetup() {
   const ss = SpreadsheetApp.getActiveSpreadsheet();
   ss.toast('กำลังเริ่มสร้างชีตระบบและกำหนดค่าเริ่มต้น...', '⚙️ เริ่มต้นการติดตั้ง', 5);
   
   try {
     createSystemSheets(); 
     seedInitialConfig();  
     
     if (typeof setupReviewDropdown === 'function') {
       setupReviewDropdown();
     }
     
     ss.toast('ติดตั้งระบบและเตรียมความพร้อมเรียบร้อยแล้ว', '✅ สำเร็จ', 10);
   } catch (e) {
     ss.toast('เกิดข้อผิดพลาด: ' + e.message, '❌ ล้มเหลว', 15);
     writeLog('ERROR', '00_App', 'runInitialSetup', '', e.message, e.stack);
   }
 }
 
 /**
  * ประมวลผลข้อมูลประจำวัน
  */
@@ -175,34 +177,36 @@ function onEdit(e) {
     const decision = e.value;
     if (decision === 'CREATE_NEW' || decision === 'MERGE_TO_CANDIDATE' || decision === 'IGNORE') {
       const reviewId = sheet.getRange(row, 1).getValue();
       try {
         e.range.setBackground('#FFF2CC');
         applyReviewDecision(reviewId, decision, null);
         e.range.setBackground('#D9EAD3');
       } catch (err) {
         e.range.setBackground('#F4CCCC');
         SpreadsheetApp.getActiveSpreadsheet().toast(err.message, '❌ เกิดข้อผิดพลาด', 10);
       }
     }
   }
 }
 
 /**
  * งานบำรุงรักษารายวัน/รายสัปดาห์
  * - รีเฟรชรายงานคุณภาพข้อมูล
  * - ตั้งค่า Dropdown คิวรีวิวเผื่อมีการเพิ่มแถวใหม่
  * - อัปเดตสถานะล่าสุดไว้ใน SYS_CONFIG
  */
 function runNightlyMaintenance() {
   const ss = SpreadsheetApp.getActiveSpreadsheet();
   try {
     refreshQualityReport();
+    refreshConflictDashboard();
+    runReviewerAssist();
     setupReviewDropdown();
     updateRunStatus('MAINTENANCE_OK', 'อัปเดต Report และ Review Dropdown เรียบร้อย');
     ss.toast('อัปเดตสถิติและตั้งค่าระบบเรียบร้อย', '✅ Maintenance เสร็จสิ้น', 8);
   } catch (e) {
     updateRunStatus('MAINTENANCE_ERROR', e.message);
     writeLog('ERROR', '00_App', 'runNightlyMaintenance', '', e.message, e.stack);
     ss.toast('Maintenance ล้มเหลว: ' + e.message, '❌ เกิดข้อผิดพลาด', 10);
   }
 }

01_Config.gs

 function getThresholds() {
   return {
     autoMatchScore: parseInt(getConfig('AUTO_MATCH_SCORE'), 10) || 90,
     reviewScoreMin: parseInt(getConfig('REVIEW_SCORE_MIN'), 10) || 75,
     geoRadiusMeter: parseInt(getConfig('GEO_RADIUS_METER'), 10) || 50
   };
 }
 
 /**
  * ชื่อชีตระบบทั้งหมด
  */
 function getSheetNames() {
   return {
     SOURCE: getConfig('SOURCE_SHEET_NAME') || 'SCGนครหลวงJWDภูมิภาค',
     M_PERSON: 'M_PERSON',
     M_PERSON_ALIAS: 'M_PERSON_ALIAS',
     M_PLACE: 'M_PLACE',
     M_PLACE_ALIAS: 'M_PLACE_ALIAS',
     M_GEO_POINT: 'M_GEO_POINT',
     M_DESTINATION: 'M_DESTINATION',
     FACT_DELIVERY: 'FACT_DELIVERY',
     Q_REVIEW: 'Q_REVIEW',
     SYS_CONFIG: 'SYS_CONFIG',
     SYS_LOG: 'SYS_LOG',
     RPT_DATA_QUALITY: 'RPT_DATA_QUALITY',
+    RPT_CONFLICT_DASHBOARD: 'RPT_CONFLICT_DASHBOARD',
     MAPS_CACHE: 'MAPS_CACHE',
     SYS_TH_GEO: 'SYS_TH_GEO'
   };
 }


03_SetupSheets.gs

 /**
  * 03_SetupSheets.gs
  * จัดการการสร้างชีตระบบและตั้งค่าเริ่มต้น
  */
 
 function createSystemSheets() {
   const ss = SpreadsheetApp.getActiveSpreadsheet();
   const names = getSheetNames();
   
   const schemas = {
     [names.M_PERSON]: ['person_id', 'person_name_canonical', 'person_name_normalized', 'phone', 'first_seen_date', 'last_seen_date', 'usage_count', 'status', 'note'],
     [names.M_PERSON_ALIAS]: ['person_alias_id', 'person_id', 'alias_raw', 'alias_normalized', 'source_field', 'first_seen_date', 'last_seen_date', 'usage_count', 'active_flag'],
     [names.M_PLACE]: ['place_id', 'place_name_canonical', 'place_name_normalized', 'address_best', 'address_normalized', 'warehouse_default', 'first_seen_date', 'last_seen_date', 'usage_count', 'status', 'note'],
     [names.M_PLACE_ALIAS]: ['place_alias_id', 'place_id', 'alias_raw', 'alias_normalized', 'source_field', 'first_seen_date', 'last_seen_date', 'usage_count', 'active_flag'],
     [names.M_GEO_POINT]: ['geo_id', 'lat_raw', 'long_raw', 'lat_norm', 'long_norm', 'geo_key_6', 'geo_key_5', 'geo_key_4', 'address_from_latlong_best', 'first_seen_date', 'last_seen_date', 'usage_count', 'note'],
     [names.M_DESTINATION]: ['destination_id', 'person_id', 'place_id', 'geo_id', 'destination_label_canonical', 'destination_key', 'confidence_status', 'first_seen_date', 'last_seen_date', 'usage_count', 'note'],
     [names.FACT_DELIVERY]: ['tx_id', 'source_sheet', 'source_row_number', 'source_record_id', 'delivery_date', 'delivery_time', 'shipment_no', 'invoice_no', 'raw_owner_name', 'raw_person_name', 'raw_system_address', 'raw_geo_resolved_address', 'raw_geo_text', 'lat', 'lng', 'person_id', 'place_id', 'geo_id', 'destination_id', 'warehouse', 'distance_km', 'driver_name', 'employee_id', 'employee_email', 'license_plate', 'validation_result', 'anomaly_reason', 'review_status', 'sync_status', 'created_at', 'updated_at'],
     [names.Q_REVIEW]: ['review_id', 'issue_type', 'source_record_id', 'source_row_number', 'invoice_no', 'raw_person_name', 'raw_place_name', 'raw_system_address', 'raw_geo_resolved_address', 'raw_lat', 'raw_long', 'candidate_person_ids', 'candidate_place_ids', 'candidate_geo_ids', 'candidate_destination_ids', 'score', 'recommended_action', 'status', 'reviewer', 'reviewed_at', 'decision', 'note'],
     [names.SYS_CONFIG]: ['config_key', 'config_value', 'config_group', 'description', 'updated_at'],
     [names.SYS_LOG]: ['log_id', 'run_id', 'created_at', 'level', 'module_name', 'function_name', 'ref_id', 'message', 'payload_json'],
     [names.RPT_DATA_QUALITY]: ['report_date', 'total_source_rows', 'processed_rows', 'new_person_count', 'new_place_count', 'new_geo_count', 'new_destination_count', 'auto_match_count', 'review_count', 'duplicate_alert_count', 'error_count', 'last_refresh_at'],
+    [names.RPT_CONFLICT_DASHBOARD]: ['report_time', 'problem_code', 'problem_title', 'issue_type', 'pending_count', 'resolved_count', 'total_count', 'avg_score', 'assist_merge_count', 'assist_create_new_count', 'assist_ignore_count', 'last_7d_count'],
     [names.MAPS_CACHE]: ['cache_key', 'cache_value', 'cache_type', 'raw_input', 'updated_at'],
     [names.SYS_TH_GEO]: ['รหัสไปรษณีย์', 'แขวง/ตำบล', 'เขต/อำเภอ', 'จังหวัด', 'หมายเหตุ']
   };
 
   Object.keys(schemas).forEach(sheetName => {
     let sheet = ss.getSheetByName(sheetName);
     if (!sheet) {
       sheet = ss.insertSheet(sheetName);
     }
     
     const headers = schemas[sheetName];
     sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
     sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold").setBackground("#f3f3f3");
     sheet.setFrozenRows(1);
   });
 }
 
 /**
  * กำหนดค่า Config เบื้องต้น
  */
 function seedInitialConfig() {
   const ss = SpreadsheetApp.getActiveSpreadsheet();
   const sheet = ss.getSheetByName(getSheetNames().SYS_CONFIG);
   if (!sheet) return;
   
12_ReviewService.gs

   // ถ้าแอดมินเลือก MERGE_TO_CANDIDATE
   if (decision === 'MERGE_TO_CANDIDATE') {
     const rawName = reviewRow[5]; // raw_person_name (Index 5)
     const candidatePersonIdsStr = reviewRow[11]; // candidate_person_ids (Index 11)
     
     // ดึงไอดีแรกมาใช้ (สมมติฐานเบื้องต้น)
     if (candidatePersonIdsStr) {
       const candidateIds = String(candidatePersonIdsStr).split(',');
       const selectedId = candidateIds[0].trim();
       if (selectedId) {
         createPersonAlias(selectedId, rawName, normalizePersonName(rawName));
       }
     }
   }
 
   // หลังจากตัดสินใจแล้ว ให้นำข้อมูลกลับไปเตรียมรันใหม่
   if (decision !== 'IGNORE') {
     const sourceRowIdx = reviewRow[3];
     updateSourceSyncStatus(sourceRowIdx, 'WAIT_REPROCESS');
   } else {
     // ถ้า IGNORE คือข้ามไปเลย เปลี่ยนเป็น IGNORE ในชีตต้นทาง
     const sourceRowIdx = reviewRow[3];
     updateSourceSyncStatus(sourceRowIdx, 'IGNORE');
   }
 }
+
+/**
+ * ช่วยแนะนำการตัดสินใจให้ทีมรีวิวแบบ rule-based
+ * หมายเหตุ: เป็น "คำแนะนำ" เท่านั้น ไม่เขียนทับคอลัมน์ decision ของคน
+ */
+function runReviewerAssist() {
+  const ss = SpreadsheetApp.getActiveSpreadsheet();
+  const sheet = ss.getSheetByName('Q_REVIEW');
+  const data = sheet.getDataRange().getValues();
+  if (data.length <= 1) return;
+
+  for (let i = 1; i < data.length; i++) {
+    const row = data[i];
+    if (safeString(row[17]) !== 'PENDING') continue; // status
+
+    const rowObj = {
+      issueType: safeString(row[1]),
+      rawPersonName: safeString(row[5]),
+      rawSystemAddress: safeString(row[7]),
+      rawGeoResolvedAddress: safeString(row[8]),
+      candidatePersonIds: safeString(row[11]),
+      candidatePlaceIds: safeString(row[12]),
+      candidateGeoIds: safeString(row[13]),
+      score: Number(row[15]) || 0,
+      note: safeString(row[21])
+    };
+
+    const assist = deriveAssistDecision(rowObj);
+    const rowIndex = i + 1;
+
+    // recommended_action (คอลัมน์ 17)
+    sheet.getRange(rowIndex, 17).setValue(assist.recommendedAction);
+
+    // เขียน note แนะนำไว้ท้ายสุด
+    const baseNote = rowObj.note ? (rowObj.note + '\n') : '';
+    const assistText = `🤖 ASSIST: ${assist.decision} | confidence=${assist.confidence} | reason=${assist.reason}`;
+    sheet.getRange(rowIndex, 22).setValue(baseNote + assistText);
+  }
+}
+
+function deriveAssistDecision(rowObj) {
+  const issue = rowObj.issueType;
+  const personCandCount = (rowObj.candidatePersonIds || '').split(',').filter(Boolean).length;
+  const placeCandCount = (rowObj.candidatePlaceIds || '').split(',').filter(Boolean).length;
+  const geoCandCount = (rowObj.candidateGeoIds || '').split(',').filter(Boolean).length;
+  const hasAddr = !!(rowObj.rawSystemAddress || rowObj.rawGeoResolvedAddress);
+  const personLen = normalizePersonName(rowObj.rawPersonName || '').length;
+
+  if (issue === 'INCOMPLETE_SOURCE_DATA') {
+    if (personLen < 2 || !hasAddr) {
+      return {
+        decision: 'IGNORE',
+        recommendedAction: 'ASSIST_IGNORE',
+        confidence: 0.95,
+        reason: 'ข้อมูลสำคัญไม่พอ (ชื่อสั้น/ไม่มีที่อยู่) เสี่ยง merge ผิด'
+      };
+    }
+    return {
+      decision: 'CREATE_NEW',
+      recommendedAction: 'ASSIST_CREATE_NEW',
+      confidence: 0.70,
+      reason: 'ข้อมูลยังไม่ชัดเจนพอในการ merge แนะนำแยกใหม่ก่อน'
+    };
+  }
+
+  if (issue === 'SAME_GEO_DIFF_PERSON' && personCandCount > 0) {
+    return {
+      decision: 'MERGE_TO_CANDIDATE',
+      recommendedAction: 'ASSIST_MERGE_TO_CANDIDATE',
+      confidence: 0.82,
+      reason: 'พิกัดตรงกันสูง มี candidate คนให้ merge'
+    };
+  }
+
+  if (issue === 'SAME_PERSON_DIFF_GEO') {
+    return {
+      decision: 'CREATE_NEW',
+      recommendedAction: 'ASSIST_CREATE_NEW',
+      confidence: 0.80,
+      reason: 'ชื่อใกล้กันแต่จุดส่งต่างกัน ควรสร้างปลายทางใหม่'
+    };
+  }
+
+  if (issue === 'SAME_PLACE_DIFF_PERSON' && personCandCount > 0) {
+    return {
+      decision: 'MERGE_TO_CANDIDATE',
+      recommendedAction: 'ASSIST_MERGE_TO_CANDIDATE',
+      confidence: 0.72,
+      reason: 'สถานที่เดียวกัน มี candidate คนที่พอจะ merge ได้'
+    };
+  }
+
+  if (issue === 'SAME_PERSON_DIFF_PLACE' && placeCandCount > 0) {
+    return {
+      decision: 'CREATE_NEW',
+      recommendedAction: 'ASSIST_CREATE_NEW',
+      confidence: 0.74,
+      reason: 'คนเดิมแต่สถานที่ต่างกัน แนะนำแยก destination'
+    };
+  }
+
+  if (rowObj.score >= 90 && (personCandCount + placeCandCount + geoCandCount) > 0) {
+    return {
+      decision: 'MERGE_TO_CANDIDATE',
+      recommendedAction: 'ASSIST_MERGE_TO_CANDIDATE',
+      confidence: 0.68,
+      reason: 'คะแนนสูงและมี candidate รองรับ'
+    };
+  }
+
+  if (rowObj.score < 50) {
+    return {
+      decision: 'CREATE_NEW',
+      recommendedAction: 'ASSIST_CREATE_NEW',
+      confidence: 0.66,
+      reason: 'คะแนนต่ำ ความเสี่ยง merge ผิดสูง'
+    };
+  }
+
+  return {
+    decision: 'CREATE_NEW',
+    recommendedAction: 'ASSIST_CREATE_NEW',
+    confidence: 0.55,
+    reason: 'ยังไม่ชัดเจน เลือกทางปลอดภัยไว้ก่อน'
+  };
+}

13_ReportService.gs

   rptSheet.appendRow([
     new Date(),
     sourceCount,
     factCount,
     personCount,
     placeCount,
     geoCount,
     destCount,
     factCount, // auto_match (ใช้ยอดทั้งหมดไปก่อน)
     pendingReviewCount,
     0, // duplicate_alert_count
     0, // error_count
     new Date()
   ]);
   
   // ล้างแถวเก่าๆ ถ้ารายงานมีเกิน 100 วัน
   if (rptSheet.getLastRow() > 101) {
     rptSheet.deleteRows(2, rptSheet.getLastRow() - 100);
   }
 }
 
 function buildDailySummary() {
   // ฟังก์ชันเผื่อใช้ส่ง LINE Notify หรือ Email สรุปรายวันให้แอดมิน
   refreshQualityReport();
 }
+
+/**
+ * สร้าง Conflict Dashboard สำหรับ 8 ปัญหาหลัก
+ * ข้อมูลต้นทางจาก Q_REVIEW ที่ถูก classify ด้วย issue_type + candidate ids
+ */
+function refreshConflictDashboard() {
+  const ss = SpreadsheetApp.getActiveSpreadsheet();
+  const sheet = ss.getSheetByName(getSheetNames().RPT_CONFLICT_DASHBOARD);
+  const reviewSheet = ss.getSheetByName(getSheetNames().Q_REVIEW);
+  if (!sheet || !reviewSheet) return;
+
+  const data = reviewSheet.getDataRange().getValues();
+  if (data.length <= 1) return;
+
+  const rows = data.slice(1);
+  const stats = {};
+  const now = new Date();
+  const last7d = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
+
+  rows.forEach(r => {
+    const rowObj = {
+      issueType: safeString(r[1]),
+      score: Number(r[15]) || 0,
+      status: safeString(r[17]),
+      reviewedAt: r[19] instanceof Date ? r[19] : null,
+      recommendedAction: safeString(r[16]),
+      candidatePersonIds: safeString(r[11]),
+      candidatePlaceIds: safeString(r[12]),
+      candidateGeoIds: safeString(r[13])
+    };
+
+    const problem = classifyConflictProblem(rowObj);
+    const key = problem.code + '|' + rowObj.issueType;
+    if (!stats[key]) {
+      stats[key] = {
+        problemCode: problem.code,
+        problemTitle: problem.title,
+        issueType: rowObj.issueType || 'UNKNOWN',
+        pending: 0,
+        resolved: 0,
+        total: 0,
+        scoreSum: 0,
+        scoreCount: 0,
+        assistMerge: 0,
+        assistCreateNew: 0,
+        assistIgnore: 0,
+        last7dCount: 0
+      };
+    }
+
+    const s = stats[key];
+    s.total++;
+    if (rowObj.status === 'PENDING') s.pending++;
+    if (rowObj.status === 'RESOLVED') s.resolved++;
+    s.scoreSum += rowObj.score;
+    s.scoreCount++;
+    if (rowObj.recommendedAction.indexOf('ASSIST_MERGE_TO_CANDIDATE') > -1) s.assistMerge++;
+    if (rowObj.recommendedAction.indexOf('ASSIST_CREATE_NEW') > -1) s.assistCreateNew++;
+    if (rowObj.recommendedAction.indexOf('ASSIST_IGNORE') > -1) s.assistIgnore++;
+    if (rowObj.reviewedAt && rowObj.reviewedAt >= last7d) s.last7dCount++;
+  });
+
+  const output = Object.keys(stats).map(k => {
+    const s = stats[k];
+    return [
+      now,
+      s.problemCode,
+      s.problemTitle,
+      s.issueType,
+      s.pending,
+      s.resolved,
+      s.total,
+      s.scoreCount ? Math.round((s.scoreSum / s.scoreCount) * 100) / 100 : 0,
+      s.assistMerge,
+      s.assistCreateNew,
+      s.assistIgnore,
+      s.last7dCount
+    ];
+  });
+
+  // clear old body and write latest snapshot
+  const lastRow = sheet.getLastRow();
+  if (lastRow > 1) {
+    sheet.getRange(2, 1, lastRow - 1, sheet.getLastColumn()).clearContent();
+  }
+  if (output.length > 0) {
+    sheet.getRange(2, 1, output.length, output[0].length).setValues(output);
+  }
+}
+
+/**
+ * map ข้อมูลรีวิวให้เข้ากับ 8 ปัญหาหลัก
+ */
+function classifyConflictProblem(reviewRow) {
+  const issue = reviewRow.issueType || '';
+  const personCand = (reviewRow.candidatePersonIds || '').split(',').filter(Boolean).length;
+  const placeCand = (reviewRow.candidatePlaceIds || '').split(',').filter(Boolean).length;
+  const geoCand = (reviewRow.candidateGeoIds || '').split(',').filter(Boolean).length;
+
+  if (issue === 'SAME_GEO_DIFF_PERSON') return { code: 'P8', title: 'บุคคลคนละชื่อ แต่ LatLong เดียวกัน' };
+  if (issue === 'SAME_PERSON_DIFF_GEO') return { code: 'P7', title: 'บุคคลชื่อเดียวกัน แต่ LatLong คนละที่' };
+  if (issue === 'SAME_PERSON_DIFF_PLACE') return { code: 'P6', title: 'บุคคลชื่อเดียวกัน แต่สถานที่ไม่เหมือนกัน' };
+  if (issue === 'SAME_PLACE_DIFF_PERSON') return { code: 'P5', title: 'บุคคลคนละชื่อ แต่สถานที่เดียวกัน' };
+  if (issue === 'INCOMPLETE_SOURCE_DATA') return { code: 'P4', title: 'บุคคลเดียวกันแต่ชื่อเขียนไม่เหมือนกัน/ข้อมูลสกปรก' };
+  if (personCand > 1) return { code: 'P1', title: 'ชื่อบุคคลซ้ำกัน' };
+  if (placeCand > 1) return { code: 'P2', title: 'ชื่อสถานที่ซ้ำกัน' };
+  if (geoCand > 1) return { code: 'P3', title: 'LatLong ซ้ำกัน/ใกล้กันมาก' };
+  return { code: 'P4', title: 'บุคคลเดียวกันแต่ชื่อเขียนไม่เหมือนกัน/ข้อมูลสกปรก' };
+}

SYSTEM_AUDIT.md

 ### `09_DestinationService.gs`
 - `buildDestinationKey`
 - `resolveDestination`
 - `createDestination`
 - `updateDestinationStats` (stub)
 
 ### `10_MatchEngine.gs`
 - `matchAllEntities`
 - `calculateCompositeScore`
 - `decideAutoMatchOrReview`
 - `buildDataQualityReviewPayload`
 - `buildReviewPayload`
 - `detectConflictType`
 - `evaluateThaiGeoBonus`
 
 ### `11_TransactionService.gs`
 - `buildFactRow`
 - `upsertFactDelivery`
 - `preventDuplicateTransaction`
 
 ### `12_ReviewService.gs`
 - `enqueueReview`
 - `setupReviewDropdown`
 - `getPendingReviews` ✅ (แก้ index สถานะแล้ว)
 - `applyReviewDecision`
+- `runReviewerAssist`
+- `deriveAssistDecision`
 
 ### `13_ReportService.gs`
 - `refreshQualityReport`
 - `buildDailySummary`
+- `refreshConflictDashboard`
+- `classifyConflictProblem`
 
 ### `14_Utils.gs`
 - `uuid`
 - `safeTrim`
 - `safeString`
 - `safeNumber`
 - `safeDate`
 - `formatTime`
 - `writeLog`
 - `haversineDistanceMeters`
 - `diceCoefficient`
 - `lengthRatio`
 - `saveCheckpoint`
 - `getCheckpoint`
 - `clearCheckpoint`
 - `isTimeNearLimit`
 - `updateRunStatus`
 - `showAutoCloseAlert`
 
 ### `15_GoogleMapsAPI.gs`
 - `md5`
 - `getAdvancedCache`
 - `setAdvancedCache`
 - `GOOGLEMAPS_DISTANCE`
 - `GOOGLEMAPS_REVERSEGEOCODE`
@@ -175,52 +179,53 @@
   - `ชื่อปลายทาง`
   - `Email พนักงาน`
   - `LAT`
   - `LONG`
   - `คลังสินค้า`
   - `ที่อยู่ปลายทาง`
   - `เหตุผิดปกติที่ตรวจพบ`
   - `ระยะทางจากคลัง_Km`
   - `ชื่อที่อยู่จาก_LatLong`
   - `ID_พนักงาน`
   - `ผลการตรวจสอบงานส่ง`
   - `SYNC_STATUS`
 
 ## 3.2 ชีตระบบ (System Sheets)
 1. `M_PERSON`
 2. `M_PERSON_ALIAS`
 3. `M_PLACE`
 4. `M_PLACE_ALIAS`
 5. `M_GEO_POINT`
 6. `M_DESTINATION`
 7. `FACT_DELIVERY`
 8. `Q_REVIEW`
 9. `SYS_CONFIG`
 10. `SYS_LOG`
 11. `RPT_DATA_QUALITY`
-12. `MAPS_CACHE`
-13. `SYS_TH_GEO`
+12. `RPT_CONFLICT_DASHBOARD`
+13. `MAPS_CACHE`
+14. `SYS_TH_GEO`
 
 > รวมชีตระบบ 13 ชีต + ชีตต้นทาง 1 ชีต = ใช้งานรวมอย่างน้อย 14 ชีต
 
 ## 3.3 โครงสร้าง `SYS_TH_GEO` (รองรับตามที่ผู้ใช้กำหนด)
 ### คอลัมน์หลักที่กรอกเอง (A-E)
 - A: `รหัสไปรษณีย์`
 - B: `แขวง/ตำบล`
 - C: `เขต/อำเภอ`
 - D: `จังหวัด`
 - E: `หมายเหตุ`
 
 ### คอลัมน์ที่ระบบ build เพิ่ม (F-N)
 - F: `postcode_text`
 - G: `subdistrict_norm`
 - H: `district_norm`
 - I: `province_norm`
 - J: `note_type`
 - K: `note_keywords`
 - L: `postcode_override`
 - M: `geo_key`
 - N: `active_flag`
 
 ---
 
 ## 4) คำตอบตรงคำถามเรื่อง “ช่องหมายเหตุต้องแปลงอะไรไหม”

Summary

เข้าใจโจทย์หลักของคุณชัดเจนครับ: ต้อง “ค้นหาจากชื่อบุคคล + ชื่อสถานที่ แล้วได้ LatLong ที่ใช้งานจริงได้” รอบนี้ผมเพิ่มเส้นทางใช้งานจริงให้ครบแล้ว โดยเพิ่มโมดูลใหม่ 17_LookupService.gs สำหรับสร้างดัชนีค้นหาและค้นคืนพิกัดโดยตรงครับ.

เพิ่ม refreshLookupIndex() เพื่อสร้าง index จากข้อมูลจริงใน FACT_DELIVERY แบบ (person_id, place_id, geo_id) พร้อม usage_count และรายการล่าสุด ทำให้ค้นหาเร็วและเสถียรกว่าไล่ raw ตรง ๆ ครับ.

เพิ่ม API ค้นหาหลัก lookupLatLongByPersonAndPlace(personName, placeName) ที่ normalize ชื่อ, หา candidate จาก Master/Alias, แล้วให้คะแนน match เพื่อคืน lat/lng + confidence ที่ดีที่สุดครับ.

เพิ่มฟังก์ชันใช้งานใน Google Sheets โดยตรง:

=LMDS_LOOKUP_LATLONG(person, place) → ได้ lat,lng

=LMDS_LOOKUP_DETAIL(person, place) → ได้รายละเอียด [lat,lng,confidence,reason]
ทำให้ทีมใช้งานค้นหาได้ทันทีในชีตครับ.

ผูกระบบเข้ากับงานประจำวันแล้ว:

เมนูใหม่ 8. อัปเดต Lookup Index (Person+Place->LatLong)

runNightlyMaintenance() เรียก refreshLookupIndex() อัตโนมัติ
เพื่อให้ดัชนีสดอยู่เสมอครับ.

เพิ่ม schema และ config รองรับ index sheet ใหม่ IDX_PERSON_PLACE_GEO ใน setup กลางเรียบร้อยครับ.

อัปเดตเอกสารระบบให้สะท้อนโครงสร้างใหม่ครบ (18 โมดูล / 15 system sheets) แล้วครับ.

Testing

✅ rg -n "IDX_PERSON_PLACE_GEO|refreshLookupIndex|LMDS_LOOKUP_LATLONG|lookupLatLongByPersonAndPlace" 00_App.gs 01_Config.gs 03_SetupSheets.gs 17_LookupService.gs SYSTEM_AUDIT.md && git status --short

✅ git add 00_App.gs 01_Config.gs 03_SetupSheets.gs 17_LookupService.gs SYSTEM_AUDIT.md && git commit -m "Add person+place to latlong lookup index and query functions"

✅ git status --short

ถ้าต้องการ ผมทำต่อให้ได้ทันทีในรอบถัดไป: เพิ่ม threshold policy สำหรับผลค้นหา (เช่น confidence < 70 ให้ส่งเข้า Q_REVIEW อัตโนมัติ) เพื่อให้ “ใช้ LatLong กลับไปงานจริง” ได้ปลอดภัยยิ่งขึ้นครับ.
Summary

เข้าใจโจทย์หลักของคุณชัดเจนครับ: ต้อง “ค้นหาจากชื่อบุคคล + ชื่อสถานที่ แล้วได้ LatLong ที่ใช้งานจริงได้” รอบนี้ผมเพิ่มเส้นทางใช้งานจริงให้ครบแล้ว โดยเพิ่มโมดูลใหม่ 17_LookupService.gs สำหรับสร้างดัชนีค้นหาและค้นคืนพิกัดโดยตรงครับ.

เพิ่ม refreshLookupIndex() เพื่อสร้าง index จากข้อมูลจริงใน FACT_DELIVERY แบบ (person_id, place_id, geo_id) พร้อม usage_count และรายการล่าสุด ทำให้ค้นหาเร็วและเสถียรกว่าไล่ raw ตรง ๆ ครับ.

เพิ่ม API ค้นหาหลัก lookupLatLongByPersonAndPlace(personName, placeName) ที่ normalize ชื่อ, หา candidate จาก Master/Alias, แล้วให้คะแนน match เพื่อคืน lat/lng + confidence ที่ดีที่สุดครับ.

เพิ่มฟังก์ชันใช้งานใน Google Sheets โดยตรง:

=LMDS_LOOKUP_LATLONG(person, place) → ได้ lat,lng

=LMDS_LOOKUP_DETAIL(person, place) → ได้รายละเอียด [lat,lng,confidence,reason]
ทำให้ทีมใช้งานค้นหาได้ทันทีในชีตครับ.

ผูกระบบเข้ากับงานประจำวันแล้ว:

เมนูใหม่ 8. อัปเดต Lookup Index (Person+Place->LatLong)

runNightlyMaintenance() เรียก refreshLookupIndex() อัตโนมัติ
เพื่อให้ดัชนีสดอยู่เสมอครับ.

เพิ่ม schema และ config รองรับ index sheet ใหม่ IDX_PERSON_PLACE_GEO ใน setup กลางเรียบร้อยครับ.

อัปเดตเอกสารระบบให้สะท้อนโครงสร้างใหม่ครบ (18 โมดูล / 15 system sheets) แล้วครับ.

Testing

✅ rg -n "IDX_PERSON_PLACE_GEO|refreshLookupIndex|LMDS_LOOKUP_LATLONG|lookupLatLongByPersonAndPlace" 00_App.gs 01_Config.gs 03_SetupSheets.gs 17_LookupService.gs SYSTEM_AUDIT.md && git status --short

✅ git add 00_App.gs 01_Config.gs 03_SetupSheets.gs 17_LookupService.gs SYSTEM_AUDIT.md && git commit -m "Add person+place to latlong lookup index and query functions"

✅ git status --short

ถ้าต้องการ ผมทำต่อให้ได้ทันทีในรอบถัดไป: เพิ่ม threshold policy สำหรับผลค้นหา (เช่น confidence < 70 ให้ส่งเข้า Q_REVIEW อัตโนมัติ) เพื่อให้ “ใช้ LatLong กลับไปงานจริง” ได้ปลอดภัยยิ่งขึ้นครับ.

00_App.gs

 /**
  * 00_App.gs
  * Entry point ของระบบ LMDS (Logistics Master Data System)
  */
 
 function onOpen() {
   const ui = SpreadsheetApp.getUi();
   ui.createMenu('📦 LMDS System')
     .addItem('1. ติดตั้งระบบครั้งแรก (Setup)', 'runInitialSetup')
     .addSeparator()
     .addItem('2. ประมวลผลข้อมูลประจำวัน', 'runDailyProcess')
     .addItem('3. อัปเดตพจนานุกรมสถานที่ (SYS_TH_GEO)', 'buildGeoIndex')
     .addItem('4. รีเซ็ตแถวที่เลือกเพื่อรันใหม่', 'reprocessSelectedRows')
     .addSeparator()
     .addItem('5. อัปเดตสถิติและ Report', 'runNightlyMaintenance')
     .addItem('6. อัปเดต Conflict Dashboard', 'refreshConflictDashboard')
     .addItem('7. Reviewer Assist (Q_REVIEW)', 'runReviewerAssist')
+    .addItem('8. อัปเดต Lookup Index (Person+Place->LatLong)', 'refreshLookupIndex')
     .addToUi();
 }
 
 function runInitialSetup() {
   const ss = SpreadsheetApp.getActiveSpreadsheet();
   ss.toast('กำลังเริ่มสร้างชีตระบบและกำหนดค่าเริ่มต้น...', '⚙️ เริ่มต้นการติดตั้ง', 5);
   
   try {
     createSystemSheets(); 
     seedInitialConfig();  
     
     if (typeof setupReviewDropdown === 'function') {
       setupReviewDropdown();
     }
     
     ss.toast('ติดตั้งระบบและเตรียมความพร้อมเรียบร้อยแล้ว', '✅ สำเร็จ', 10);
   } catch (e) {
     ss.toast('เกิดข้อผิดพลาด: ' + e.message, '❌ ล้มเหลว', 15);
     writeLog('ERROR', '00_App', 'runInitialSetup', '', e.message, e.stack);
   }
 }
 
 /**
  * ประมวลผลข้อมูลประจำวัน
  */
@@ -178,35 +179,36 @@ function onEdit(e) {
     if (decision === 'CREATE_NEW' || decision === 'MERGE_TO_CANDIDATE' || decision === 'IGNORE') {
       const reviewId = sheet.getRange(row, 1).getValue();
       try {
         e.range.setBackground('#FFF2CC');
         applyReviewDecision(reviewId, decision, null);
         e.range.setBackground('#D9EAD3');
       } catch (err) {
         e.range.setBackground('#F4CCCC');
         SpreadsheetApp.getActiveSpreadsheet().toast(err.message, '❌ เกิดข้อผิดพลาด', 10);
       }
     }
   }
 }
 
 /**
  * งานบำรุงรักษารายวัน/รายสัปดาห์
  * - รีเฟรชรายงานคุณภาพข้อมูล
  * - ตั้งค่า Dropdown คิวรีวิวเผื่อมีการเพิ่มแถวใหม่
  * - อัปเดตสถานะล่าสุดไว้ใน SYS_CONFIG
  */
 function runNightlyMaintenance() {
   const ss = SpreadsheetApp.getActiveSpreadsheet();
   try {
     refreshQualityReport();
     refreshConflictDashboard();
+    refreshLookupIndex();
     runReviewerAssist();
     setupReviewDropdown();
     updateRunStatus('MAINTENANCE_OK', 'อัปเดต Report และ Review Dropdown เรียบร้อย');
     ss.toast('อัปเดตสถิติและตั้งค่าระบบเรียบร้อย', '✅ Maintenance เสร็จสิ้น', 8);
   } catch (e) {
     updateRunStatus('MAINTENANCE_ERROR', e.message);
     writeLog('ERROR', '00_App', 'runNightlyMaintenance', '', e.message, e.stack);
     ss.toast('Maintenance ล้มเหลว: ' + e.message, '❌ เกิดข้อผิดพลาด', 10);
   }
 }


01_Config.gs

   return {
     autoMatchScore: parseInt(getConfig('AUTO_MATCH_SCORE'), 10) || 90,
     reviewScoreMin: parseInt(getConfig('REVIEW_SCORE_MIN'), 10) || 75,
     geoRadiusMeter: parseInt(getConfig('GEO_RADIUS_METER'), 10) || 50
   };
 }
 
 /**
  * ชื่อชีตระบบทั้งหมด
  */
 function getSheetNames() {
   return {
     SOURCE: getConfig('SOURCE_SHEET_NAME') || 'SCGนครหลวงJWDภูมิภาค',
     M_PERSON: 'M_PERSON',
     M_PERSON_ALIAS: 'M_PERSON_ALIAS',
     M_PLACE: 'M_PLACE',
     M_PLACE_ALIAS: 'M_PLACE_ALIAS',
     M_GEO_POINT: 'M_GEO_POINT',
     M_DESTINATION: 'M_DESTINATION',
     FACT_DELIVERY: 'FACT_DELIVERY',
     Q_REVIEW: 'Q_REVIEW',
     SYS_CONFIG: 'SYS_CONFIG',
     SYS_LOG: 'SYS_LOG',
     RPT_DATA_QUALITY: 'RPT_DATA_QUALITY',
     RPT_CONFLICT_DASHBOARD: 'RPT_CONFLICT_DASHBOARD',
+    IDX_PERSON_PLACE_GEO: 'IDX_PERSON_PLACE_GEO',
     MAPS_CACHE: 'MAPS_CACHE',
     SYS_TH_GEO: 'SYS_TH_GEO'
   };
 }


03_SetupSheets.gs

 /**
  * 03_SetupSheets.gs
  * จัดการการสร้างชีตระบบและตั้งค่าเริ่มต้น
  */
 
 function createSystemSheets() {
   const ss = SpreadsheetApp.getActiveSpreadsheet();
   const names = getSheetNames();
   
   const schemas = {
     [names.M_PERSON]: ['person_id', 'person_name_canonical', 'person_name_normalized', 'phone', 'first_seen_date', 'last_seen_date', 'usage_count', 'status', 'note'],
     [names.M_PERSON_ALIAS]: ['person_alias_id', 'person_id', 'alias_raw', 'alias_normalized', 'source_field', 'first_seen_date', 'last_seen_date', 'usage_count', 'active_flag'],
     [names.M_PLACE]: ['place_id', 'place_name_canonical', 'place_name_normalized', 'address_best', 'address_normalized', 'warehouse_default', 'first_seen_date', 'last_seen_date', 'usage_count', 'status', 'note'],
     [names.M_PLACE_ALIAS]: ['place_alias_id', 'place_id', 'alias_raw', 'alias_normalized', 'source_field', 'first_seen_date', 'last_seen_date', 'usage_count', 'active_flag'],
     [names.M_GEO_POINT]: ['geo_id', 'lat_raw', 'long_raw', 'lat_norm', 'long_norm', 'geo_key_6', 'geo_key_5', 'geo_key_4', 'address_from_latlong_best', 'first_seen_date', 'last_seen_date', 'usage_count', 'note'],
     [names.M_DESTINATION]: ['destination_id', 'person_id', 'place_id', 'geo_id', 'destination_label_canonical', 'destination_key', 'confidence_status', 'first_seen_date', 'last_seen_date', 'usage_count', 'note'],
     [names.FACT_DELIVERY]: ['tx_id', 'source_sheet', 'source_row_number', 'source_record_id', 'delivery_date', 'delivery_time', 'shipment_no', 'invoice_no', 'raw_owner_name', 'raw_person_name', 'raw_system_address', 'raw_geo_resolved_address', 'raw_geo_text', 'lat', 'lng', 'person_id', 'place_id', 'geo_id', 'destination_id', 'warehouse', 'distance_km', 'driver_name', 'employee_id', 'employee_email', 'license_plate', 'validation_result', 'anomaly_reason', 'review_status', 'sync_status', 'created_at', 'updated_at'],
     [names.Q_REVIEW]: ['review_id', 'issue_type', 'source_record_id', 'source_row_number', 'invoice_no', 'raw_person_name', 'raw_place_name', 'raw_system_address', 'raw_geo_resolved_address', 'raw_lat', 'raw_long', 'candidate_person_ids', 'candidate_place_ids', 'candidate_geo_ids', 'candidate_destination_ids', 'score', 'recommended_action', 'status', 'reviewer', 'reviewed_at', 'decision', 'note'],
     [names.SYS_CONFIG]: ['config_key', 'config_value', 'config_group', 'description', 'updated_at'],
     [names.SYS_LOG]: ['log_id', 'run_id', 'created_at', 'level', 'module_name', 'function_name', 'ref_id', 'message', 'payload_json'],
     [names.RPT_DATA_QUALITY]: ['report_date', 'total_source_rows', 'processed_rows', 'new_person_count', 'new_place_count', 'new_geo_count', 'new_destination_count', 'auto_match_count', 'review_count', 'duplicate_alert_count', 'error_count', 'last_refresh_at'],
     [names.RPT_CONFLICT_DASHBOARD]: ['report_time', 'problem_code', 'problem_title', 'issue_type', 'pending_count', 'resolved_count', 'total_count', 'avg_score', 'assist_merge_count', 'assist_create_new_count', 'assist_ignore_count', 'last_7d_count'],
+    [names.IDX_PERSON_PLACE_GEO]: ['index_key', 'person_id', 'place_id', 'geo_id', 'lat', 'lng', 'usage_count', 'last_delivery_date', 'last_source_record_id'],
     [names.MAPS_CACHE]: ['cache_key', 'cache_value', 'cache_type', 'raw_input', 'updated_at'],
     [names.SYS_TH_GEO]: ['รหัสไปรษณีย์', 'แขวง/ตำบล', 'เขต/อำเภอ', 'จังหวัด', 'หมายเหตุ']
   };
 
   Object.keys(schemas).forEach(sheetName => {
     let sheet = ss.getSheetByName(sheetName);
     if (!sheet) {
       sheet = ss.insertSheet(sheetName);
     }
     
     const headers = schemas[sheetName];
     sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
     sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold").setBackground("#f3f3f3");
     sheet.setFrozenRows(1);
   });
 }
 
 /**
  * กำหนดค่า Config เบื้องต้น
  */
 function seedInitialConfig() {
   const ss = SpreadsheetApp.getActiveSpreadsheet();
   const sheet = ss.getSheetByName(getSheetNames().SYS_CONFIG);
   if (!sheet) return;
   

17_LookupService.gs

+/**
+ * 17_LookupService.gs
+ * บริการค้นหา LatLong จาก "ชื่อปลายทาง (บุคคล) + ที่อยู่ปลายทาง (สถานที่)"
+ * เพื่อให้ข้อมูลสะอาดและนำไปใช้งานจริงได้
+ */
+
+/**
+ * สร้าง Lookup Index จาก FACT_DELIVERY
+ * key หลัก = person_id + place_id + geo_id
+ */
+function refreshLookupIndex() {
+  const ss = SpreadsheetApp.getActiveSpreadsheet();
+  const factSheet = ss.getSheetByName(getSheetNames().FACT_DELIVERY);
+  const idxSheet = ss.getSheetByName(getSheetNames().IDX_PERSON_PLACE_GEO);
+  if (!factSheet || !idxSheet) return;
+
+  const data = factSheet.getDataRange().getValues();
+  if (data.length <= 1) return;
+
+  const stats = {};
+  for (let i = 1; i < data.length; i++) {
+    const row = data[i];
+    const personId = safeString(row[15]);
+    const placeId = safeString(row[16]);
+    const geoId = safeString(row[17]);
+    const lat = Number(row[13]) || 0;
+    const lng = Number(row[14]) || 0;
+    const date = row[4] instanceof Date ? row[4] : null;
+    const sourceRecordId = safeString(row[3]);
+    if (!personId || !placeId || !geoId || !lat || !lng) continue;
+
+    const key = `${personId}|${placeId}|${geoId}`;
+    if (!stats[key]) {
+      stats[key] = {
+        key: key,
+        personId: personId,
+        placeId: placeId,
+        geoId: geoId,
+        lat: lat,
+        lng: lng,
+        usageCount: 0,
+        lastDeliveryDate: null,
+        lastSourceRecordId: ''
+      };
+    }
+
+    const s = stats[key];
+    s.usageCount++;
+    if (date && (!s.lastDeliveryDate || date > s.lastDeliveryDate)) {
+      s.lastDeliveryDate = date;
+      s.lastSourceRecordId = sourceRecordId;
+    }
+  }
+
+  const output = Object.keys(stats).map(k => {
+    const s = stats[k];
+    return [
+      s.key,
+      s.personId,
+      s.placeId,
+      s.geoId,
+      s.lat,
+      s.lng,
+      s.usageCount,
+      s.lastDeliveryDate || '',
+      s.lastSourceRecordId
+    ];
+  });
+
+  // clear old body
+  const lastRow = idxSheet.getLastRow();
+  if (lastRow > 1) {
+    idxSheet.getRange(2, 1, lastRow - 1, idxSheet.getLastColumn()).clearContent();
+  }
+  if (output.length > 0) {
+    idxSheet.getRange(2, 1, output.length, output[0].length).setValues(output);
+  }
+}
+
+/**
+ * API หลัก: ค้นหา LatLong จากชื่อบุคคล + ชื่อสถานที่
+ * คืน object ที่มี lat/lng + confidence + เหตุผล
+ */
+function lookupLatLongByPersonAndPlace(personName, placeName) {
+  const normPerson = normalizePersonName(personName || '');
+  const normPlace = normalizePlaceName(placeName || '');
+  if (!normPerson && !normPlace) {
+    return { found: false, lat: '', lng: '', confidence: 0, reason: 'EMPTY_INPUT' };
+  }
+
+  const personCandidates = findPersonLookupCandidates(normPerson);
+  const placeCandidates = findPlaceLookupCandidates(normPlace);
+
+  const ss = SpreadsheetApp.getActiveSpreadsheet();
+  const idxSheet = ss.getSheetByName(getSheetNames().IDX_PERSON_PLACE_GEO);
+  if (!idxSheet) {
+    return { found: false, lat: '', lng: '', confidence: 0, reason: 'MISSING_INDEX_SHEET' };
+  }
+
+  const idxData = idxSheet.getDataRange().getValues();
+  if (idxData.length <= 1) {
+    return { found: false, lat: '', lng: '', confidence: 0, reason: 'EMPTY_INDEX' };
+  }
+
+  const personScoreMap = {};
+  personCandidates.forEach(c => {
+    personScoreMap[c.id] = Math.max(personScoreMap[c.id] || 0, c.score);
+  });
+  const placeScoreMap = {};
+  placeCandidates.forEach(c => {
+    placeScoreMap[c.id] = Math.max(placeScoreMap[c.id] || 0, c.score);
+  });
+
+  let best = null;
+
+  for (let i = 1; i < idxData.length; i++) {
+    const row = idxData[i];
+    const personId = safeString(row[1]);
+    const placeId = safeString(row[2]);
+    const lat = Number(row[4]) || 0;
+    const lng = Number(row[5]) || 0;
+    const usageCount = Number(row[6]) || 0;
+    const lastDate = row[7] instanceof Date ? row[7] : null;
+    if (!lat || !lng) continue;
+
+    const pScore = personScoreMap[personId] || 0;
+    const plScore = placeScoreMap[placeId] || 0;
+    if (pScore === 0 && plScore === 0) continue;
+
+    // สูตรคะแนนค้นหา: คน 55% + สถานที่ 45% + usage bonus + recency bonus
+    let score = (pScore * 0.55) + (plScore * 0.45);
+    score += Math.min(10, Math.log10(usageCount + 1) * 4); // สูงสุด +10
+    if (lastDate) {
+      const days = (Date.now() - lastDate.getTime()) / (1000 * 60 * 60 * 24);
+      if (days <= 30) score += 5;
+      else if (days <= 90) score += 2;
+    }
+    score = Math.min(100, Math.round(score));
+
+    if (!best || score > best.confidence) {
+      best = {
+        found: true,
+        lat: lat,
+        lng: lng,
+        confidence: score,
+        personId: personId,
+        placeId: placeId,
+        usageCount: usageCount,
+        reason: 'MATCHED_FROM_INDEX'
+      };
+    }
+  }
+
+  if (!best) {
+    return { found: false, lat: '', lng: '', confidence: 0, reason: 'NO_MATCH' };
+  }
+
+  return best;
+}
+
+/**
+ * ใช้ใน Google Sheets โดยตรง:
+ * =LMDS_LOOKUP_LATLONG(A2,B2)
+ */
+function LMDS_LOOKUP_LATLONG(personName, placeName) {
+  const res = lookupLatLongByPersonAndPlace(personName, placeName);
+  if (!res.found) return '';
+  return `${res.lat},${res.lng}`;
+}
+
+/**
+ * ใช้ใน Google Sheets โดยตรง:
+ * =LMDS_LOOKUP_DETAIL(A2,B2)
+ * คืน [lat,lng,confidence,reason]
+ */
+function LMDS_LOOKUP_DETAIL(personName, placeName) {
+  const res = lookupLatLongByPersonAndPlace(personName, placeName);
+  return [[res.lat || '', res.lng || '', res.confidence || 0, res.reason || '']];
+}
+
+function findPersonLookupCandidates(normPerson) {
+  if (!normPerson) return [];
+  const ss = SpreadsheetApp.getActiveSpreadsheet();
+  const out = [];
+
+  const mPerson = ss.getSheetByName(getSheetNames().M_PERSON);
+  if (mPerson) {
+    const data = mPerson.getDataRange().getValues();
+    for (let i = 1; i < data.length; i++) {
+      const personId = safeString(data[i][0]);
+      const candidateNorm = safeString(data[i][2]);
+      if (!personId || !candidateNorm) continue;
+      const score = scorePersonCandidate(normPerson, candidateNorm);
+      if (score >= 60) out.push({ id: personId, score: score, source: 'M_PERSON' });
+    }
+  }
+
+  const mAlias = ss.getSheetByName(getSheetNames().M_PERSON_ALIAS);
+  if (mAlias) {
+    const data = mAlias.getDataRange().getValues();
+    for (let i = 1; i < data.length; i++) {
+      const personId = safeString(data[i][1]);
+      const aliasNorm = safeString(data[i][3]);
+      if (!personId || !aliasNorm) continue;
+      const score = scorePersonCandidate(normPerson, aliasNorm);
+      if (score >= 60) out.push({ id: personId, score: score, source: 'M_PERSON_ALIAS' });
+    }
+  }
+
+  return out;
+}
+
+function findPlaceLookupCandidates(normPlace) {
+  if (!normPlace) return [];
+  const ss = SpreadsheetApp.getActiveSpreadsheet();
+  const out = [];
+
+  const mPlace = ss.getSheetByName(getSheetNames().M_PLACE);
+  if (mPlace) {
+    const data = mPlace.getDataRange().getValues();
+    for (let i = 1; i < data.length; i++) {
+      const placeId = safeString(data[i][0]);
+      const candidateNorm = safeString(data[i][2]);
+      if (!placeId || !candidateNorm) continue;
+      const score = scorePlaceCandidate(normPlace, candidateNorm);
+      if (score >= 60) out.push({ id: placeId, score: score, source: 'M_PLACE' });
+    }
+  }
+
+  const mAlias = ss.getSheetByName(getSheetNames().M_PLACE_ALIAS);
+  if (mAlias) {
+    const data = mAlias.getDataRange().getValues();
+    for (let i = 1; i < data.length; i++) {
+      const placeId = safeString(data[i][1]);
+      const aliasNorm = safeString(data[i][3]);
+      if (!placeId || !aliasNorm) continue;
+      const score = scorePlaceCandidate(normPlace, aliasNorm);
+      if (score >= 60) out.push({ id: placeId, score: score, source: 'M_PLACE_ALIAS' });
+    }
+  }
+
+  return out;
+}


SYSTEM_AUDIT.md

 # SYSTEM AUDIT — LMDS-Synergy-V4.3 (Google Apps Script)
 
 ## 1) จำนวนโมดูลโค้ดทั้งหมด
-ระบบมี **17 โมดูล** (00 ถึง 16):
+ระบบมี **18 โมดูล** (00 ถึง 17):
 
 1. `00_App.gs`
 2. `01_Config.gs`
 3. `02_Schema.gs`
 4. `03_SetupSheets.gs`
 5. `04_SourceRepository.gs`
 6. `05_NormalizeService.gs`
 7. `06_PersonService.gs`
 8. `07_PlaceService.gs`
 9. `08_GeoService.gs`
 10. `09_DestinationService.gs`
 11. `10_MatchEngine.gs`
 12. `11_TransactionService.gs`
 13. `12_ReviewService.gs`
 14. `13_ReportService.gs`
 15. `14_Utils.gs`
 16. `15_GoogleMapsAPI.gs`
 17. `16_GeoDictionaryBuilder.gs`
+18. `17_LookupService.gs`
 
 ---
 
 ## 2) ฟังก์ชันในแต่ละโมดูล
 
 ### `00_App.gs`
 - `onOpen`
 - `runInitialSetup`
 - `runDailyProcess`
 - `reprocessSelectedRows`
 - `onEdit`
 - `runNightlyMaintenance` ✅ (เพิ่มแล้ว)
 
 ### `01_Config.gs`
 - `getConfig`
 - `getAllConfigs`
 - `setConfig`
 - `getThresholds`
 - `getSheetNames`
 
 ### `02_Schema.gs`
 - `validateSourceSchema`
 - `ensureSystemSheets`
 - `getSourceColumnMap`
 - `assertRequiredColumns`
@@ -137,97 +138,106 @@
 - `formatTime`
 - `writeLog`
 - `haversineDistanceMeters`
 - `diceCoefficient`
 - `lengthRatio`
 - `saveCheckpoint`
 - `getCheckpoint`
 - `clearCheckpoint`
 - `isTimeNearLimit`
 - `updateRunStatus`
 - `showAutoCloseAlert`
 
 ### `15_GoogleMapsAPI.gs`
 - `md5`
 - `getAdvancedCache`
 - `setAdvancedCache`
 - `GOOGLEMAPS_DISTANCE`
 - `GOOGLEMAPS_REVERSEGEOCODE`
 - `GOOGLEMAPS_LATLONG`
 - `GOOGLEMAPS_DURATION`
 
 ### `16_GeoDictionaryBuilder.gs`
 - `buildGeoIndex`
 - `parseRemarkLogic`
 
+### `17_LookupService.gs`
+- `refreshLookupIndex`
+- `lookupLatLongByPersonAndPlace`
+- `LMDS_LOOKUP_LATLONG`
+- `LMDS_LOOKUP_DETAIL`
+- `findPersonLookupCandidates`
+- `findPlaceLookupCandidates`
+
 ---
 
 ## 3) จำนวนชีตที่ระบบใช้ + ชื่อคอลัมน์
 
 ## 3.1 ชีตดิบต้นทาง (Source)
 - ชื่อชีต: ตั้งจาก Config (`SOURCE_SHEET_NAME`) ค่า default คือ `SCGนครหลวงJWDภูมิภาค`
 - อ่านคอลัมน์สำคัญผ่าน `mapRowToSourceObject` เช่น:
   - `ID_SCGนครหลวงJWDภูมิภาค`
   - `วันที่ส่งสินค้า`
   - `เวลาที่ส่งสินค้า`
   - `จุดส่งสินค้าปลายทาง`
   - `ชื่อ - นามสกุล`
   - `ทะเบียนรถ`
   - `Shipment No`
   - `Invoice No`
   - `รหัสลูกค้า`
   - `ชื่อเจ้าของสินค้า`
   - `ชื่อปลายทาง`
   - `Email พนักงาน`
   - `LAT`
   - `LONG`
   - `คลังสินค้า`
   - `ที่อยู่ปลายทาง`
   - `เหตุผิดปกติที่ตรวจพบ`
   - `ระยะทางจากคลัง_Km`
   - `ชื่อที่อยู่จาก_LatLong`
   - `ID_พนักงาน`
   - `ผลการตรวจสอบงานส่ง`
   - `SYNC_STATUS`
 
 ## 3.2 ชีตระบบ (System Sheets)
 1. `M_PERSON`
 2. `M_PERSON_ALIAS`
 3. `M_PLACE`
 4. `M_PLACE_ALIAS`
 5. `M_GEO_POINT`
 6. `M_DESTINATION`
 7. `FACT_DELIVERY`
 8. `Q_REVIEW`
 9. `SYS_CONFIG`
 10. `SYS_LOG`
 11. `RPT_DATA_QUALITY`
 12. `RPT_CONFLICT_DASHBOARD`
-13. `MAPS_CACHE`
-14. `SYS_TH_GEO`
+13. `IDX_PERSON_PLACE_GEO`
+14. `MAPS_CACHE`
+15. `SYS_TH_GEO`
 
-> รวมชีตระบบ 13 ชีต + ชีตต้นทาง 1 ชีต = ใช้งานรวมอย่างน้อย 14 ชีต
+> รวมชีตระบบ 15 ชีต + ชีตต้นทาง 1 ชีต = ใช้งานรวมอย่างน้อย 16 ชีต
 
 ## 3.3 โครงสร้าง `SYS_TH_GEO` (รองรับตามที่ผู้ใช้กำหนด)
 ### คอลัมน์หลักที่กรอกเอง (A-E)
 - A: `รหัสไปรษณีย์`
 - B: `แขวง/ตำบล`
 - C: `เขต/อำเภอ`
 - D: `จังหวัด`
 - E: `หมายเหตุ`
 
 ### คอลัมน์ที่ระบบ build เพิ่ม (F-N)
 - F: `postcode_text`
 - G: `subdistrict_norm`
 - H: `district_norm`
 - I: `province_norm`
 - J: `note_type`
 - K: `note_keywords`
 - L: `postcode_override`
 - M: `geo_key`
 - N: `active_flag`
 
 ---
 
 ## 4) คำตอบตรงคำถามเรื่อง “ช่องหมายเหตุต้องแปลงอะไรไหม”
 โดยดีไซน์ปัจจุบัน **ไม่จำเป็นต้องแปลงเอง** ให้พิมพ์หมายเหตุแบบมนุษย์อ่านได้ แล้วใช้ `buildGeoIndex()` ช่วย parse ให้อัตโนมัติผ่าน `parseRemarkLogic()`.
 
Summary

รับทราบตรงกันครับ — คุณต้องการ “ระบบทำความสะอาดข้อมูลจริง” และ “เอาไปใช้งานจริงกับชีตดิบใหม่” ไม่ใช่แค่ระบบค้นหาแยก ผมเลยเพิ่ม flow ใหม่ที่ทำงานกับ ชีตดิบที่คุณเปิดอยู่ โดยตรงครับ.

เพิ่มเมนูใหม่ 9. เติม LatLong ให้ชีตดิบที่เปิดอยู่ เพื่อให้ทีมกดใช้งานได้ทันทีเมื่อโหลดชีตดิบใหม่เข้ามา (โครงสร้างคล้ายชีตเดิม).

เพิ่มฟังก์ชัน enrichActiveSheetLatLongFromMaster():

อ่านคอลัมน์ ชื่อปลายทาง + ที่อยู่ปลายทาง

สร้างคอลัมน์ช่วยให้อัตโนมัติถ้ายังไม่มี (LAT_LNG_SUGGESTED, LOOKUP_CONFIDENCE, LOOKUP_REASON, LOOKUP_STATUS)

ถ้าความมั่นใจถึงเกณฑ์ → เติม LAT/LONG จริงให้เลย

ถ้าต่ำกว่าเกณฑ์ → ติดสถานะ REVIEW_REQUIRED
ตรงนี้คือใช้งานกับข้อมูลดิบที่คุณเพิ่มเข้ามาได้จริงครับ.

เพิ่ม config LOOKUP_MIN_CONFIDENCE (default = 75) เพื่อคุมคุณภาพก่อนเติมพิกัดจริง ไม่ให้ข้อมูลไม่ชัวร์หลุดไปใช้งานครับ.

อัปเดตเอกสารระบบให้สะท้อนฟังก์ชันใหม่ในโมดูล 17_LookupService.gs แล้วครับ.

Testing

✅ rg -n "LOOKUP_MIN_CONFIDENCE|enrichActiveSheetLatLongFromMaster|LOOKUP_STATUS|ensureColumn\\(|เติม LatLong" 00_App.gs 01_Config.gs 03_SetupSheets.gs 17_LookupService.gs SYSTEM_AUDIT.md && git status --short

✅ git add 00_App.gs 01_Config.gs 03_SetupSheets.gs 17_LookupService.gs SYSTEM_AUDIT.md && git commit -m "Add active-sheet raw enrichment flow for person+place to latlong"

✅ git status --short

ถ้าคุณโอเค รอบถัดไปผมจะต่อให้ครบแบบ production อีก 1 ขั้น:
บังคับส่ง REVIEW_REQUIRED เข้า Q_REVIEW อัตโนมัติ พร้อมเหตุผล เพื่อปิดลูปแก้ 8 ปัญหาให้เนียนยิ่งขึ้นครับ.
Summary

รับทราบตรงกันครับ — คุณต้องการ “ระบบทำความสะอาดข้อมูลจริง” และ “เอาไปใช้งานจริงกับชีตดิบใหม่” ไม่ใช่แค่ระบบค้นหาแยก ผมเลยเพิ่ม flow ใหม่ที่ทำงานกับ ชีตดิบที่คุณเปิดอยู่ โดยตรงครับ.

เพิ่มเมนูใหม่ 9. เติม LatLong ให้ชีตดิบที่เปิดอยู่ เพื่อให้ทีมกดใช้งานได้ทันทีเมื่อโหลดชีตดิบใหม่เข้ามา (โครงสร้างคล้ายชีตเดิม).

เพิ่มฟังก์ชัน enrichActiveSheetLatLongFromMaster():

อ่านคอลัมน์ ชื่อปลายทาง + ที่อยู่ปลายทาง

สร้างคอลัมน์ช่วยให้อัตโนมัติถ้ายังไม่มี (LAT_LNG_SUGGESTED, LOOKUP_CONFIDENCE, LOOKUP_REASON, LOOKUP_STATUS)

ถ้าความมั่นใจถึงเกณฑ์ → เติม LAT/LONG จริงให้เลย

ถ้าต่ำกว่าเกณฑ์ → ติดสถานะ REVIEW_REQUIRED
ตรงนี้คือใช้งานกับข้อมูลดิบที่คุณเพิ่มเข้ามาได้จริงครับ.

เพิ่ม config LOOKUP_MIN_CONFIDENCE (default = 75) เพื่อคุมคุณภาพก่อนเติมพิกัดจริง ไม่ให้ข้อมูลไม่ชัวร์หลุดไปใช้งานครับ.

อัปเดตเอกสารระบบให้สะท้อนฟังก์ชันใหม่ในโมดูล 17_LookupService.gs แล้วครับ.

Testing

✅ rg -n "LOOKUP_MIN_CONFIDENCE|enrichActiveSheetLatLongFromMaster|LOOKUP_STATUS|ensureColumn\\(|เติม LatLong" 00_App.gs 01_Config.gs 03_SetupSheets.gs 17_LookupService.gs SYSTEM_AUDIT.md && git status --short

✅ git add 00_App.gs 01_Config.gs 03_SetupSheets.gs 17_LookupService.gs SYSTEM_AUDIT.md && git commit -m "Add active-sheet raw enrichment flow for person+place to latlong"

✅ git status --short

ถ้าคุณโอเค รอบถัดไปผมจะต่อให้ครบแบบ production อีก 1 ขั้น:
บังคับส่ง REVIEW_REQUIRED เข้า Q_REVIEW อัตโนมัติ พร้อมเหตุผล เพื่อปิดลูปแก้ 8 ปัญหาให้เนียนยิ่งขึ้นครับ.

00_App.gs

 /**
  * 00_App.gs
  * Entry point ของระบบ LMDS (Logistics Master Data System)
  */
 
 function onOpen() {
   const ui = SpreadsheetApp.getUi();
   ui.createMenu('📦 LMDS System')
     .addItem('1. ติดตั้งระบบครั้งแรก (Setup)', 'runInitialSetup')
     .addSeparator()
     .addItem('2. ประมวลผลข้อมูลประจำวัน', 'runDailyProcess')
     .addItem('3. อัปเดตพจนานุกรมสถานที่ (SYS_TH_GEO)', 'buildGeoIndex')
     .addItem('4. รีเซ็ตแถวที่เลือกเพื่อรันใหม่', 'reprocessSelectedRows')
     .addSeparator()
     .addItem('5. อัปเดตสถิติและ Report', 'runNightlyMaintenance')
     .addItem('6. อัปเดต Conflict Dashboard', 'refreshConflictDashboard')
     .addItem('7. Reviewer Assist (Q_REVIEW)', 'runReviewerAssist')
     .addItem('8. อัปเดต Lookup Index (Person+Place->LatLong)', 'refreshLookupIndex')
+    .addItem('9. เติม LatLong ให้ชีตดิบที่เปิดอยู่', 'enrichActiveSheetLatLongFromMaster')
     .addToUi();
 }
 
 function runInitialSetup() {
   const ss = SpreadsheetApp.getActiveSpreadsheet();
   ss.toast('กำลังเริ่มสร้างชีตระบบและกำหนดค่าเริ่มต้น...', '⚙️ เริ่มต้นการติดตั้ง', 5);
   
   try {
     createSystemSheets(); 
     seedInitialConfig();  
     
     if (typeof setupReviewDropdown === 'function') {
       setupReviewDropdown();
     }
     
     ss.toast('ติดตั้งระบบและเตรียมความพร้อมเรียบร้อยแล้ว', '✅ สำเร็จ', 10);
   } catch (e) {
     ss.toast('เกิดข้อผิดพลาด: ' + e.message, '❌ ล้มเหลว', 15);
     writeLog('ERROR', '00_App', 'runInitialSetup', '', e.message, e.stack);
   }
 }
 
 /**
  * ประมวลผลข้อมูลประจำวัน
  */


01_Config.gs

  * 01_Config.gs
  * จัดการค่าคงที่และ Configuration ของระบบ
  */
 
 const CONFIG_CACHE = {};
 
 /**
  * ดึงค่า Config จากชีต SYS_CONFIG
  */
 function getConfig(key) {
   if (CONFIG_CACHE[key] !== undefined) {
     return CONFIG_CACHE[key];
   }
   
   const allConfigs = getAllConfigs();
   if (allConfigs[key] !== undefined) {
     return allConfigs[key];
   }
   
   // Default fallbacks ถ้าหาในชีตไม่เจอ
   const defaults = {
     'SOURCE_SHEET_NAME': 'SCGนครหลวงJWDภูมิภาค',
     'AUTO_MATCH_SCORE': '90',
     'REVIEW_SCORE_MIN': '75',
     'GEO_RADIUS_METER': '50',
-    'MAX_PROCESS_ROWS_PER_RUN': '500'
+    'MAX_PROCESS_ROWS_PER_RUN': '500',
+    'LOOKUP_MIN_CONFIDENCE': '75'
   };
   
   return defaults[key] || null;
 }
 
 /**
  * โหลด Config ทั้งหมดแบบรวดเดียว
  */
 function getAllConfigs() {
   if (Object.keys(CONFIG_CACHE).length > 0) return CONFIG_CACHE;
   
   const ss = SpreadsheetApp.getActiveSpreadsheet();
   const sheet = ss.getSheetByName('SYS_CONFIG');
   if (!sheet) return {};
   
   const data = sheet.getDataRange().getValues();
   for (let i = 1; i < data.length; i++) { // ข้าม header
     const key = data[i][0];
     const value = data[i][1];
     if (key) {
       CONFIG_CACHE[key] = value;
     }
   }
   return CONFIG_CACHE;
 }

03_SetupSheets.gs

   Object.keys(schemas).forEach(sheetName => {
     let sheet = ss.getSheetByName(sheetName);
     if (!sheet) {
       sheet = ss.insertSheet(sheetName);
     }
     
     const headers = schemas[sheetName];
     sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
     sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold").setBackground("#f3f3f3");
     sheet.setFrozenRows(1);
   });
 }
 
 /**
  * กำหนดค่า Config เบื้องต้น
  */
 function seedInitialConfig() {
   const ss = SpreadsheetApp.getActiveSpreadsheet();
   const sheet = ss.getSheetByName(getSheetNames().SYS_CONFIG);
   if (!sheet) return;
   
   const initialConfigs = [
     ['AUTO_MATCH_SCORE', '90', 'Engine', 'คะแนนขั้นต่ำในการจับคู่อัตโนมัติ', new Date()],
     ['REVIEW_SCORE_MIN', '75', 'Engine', 'คะแนนขั้นต่ำที่ต้องส่งคนรีวิว', new Date()],
     ['GEO_RADIUS_METER', '50', 'Engine', 'รัศมีความคลาดเคลื่อนพิกัด (เมตร)', new Date()],
-    ['MAX_PROCESS_ROWS_PER_RUN', '500', 'System', 'จำนวนแถวสูงสุดต่อการรัน 1 ครั้ง', new Date()]
+    ['MAX_PROCESS_ROWS_PER_RUN', '500', 'System', 'จำนวนแถวสูงสุดต่อการรัน 1 ครั้ง', new Date()],
+    ['LOOKUP_MIN_CONFIDENCE', '75', 'Lookup', 'คะแนนขั้นต่ำสำหรับเติม LatLong อัตโนมัติในชีตดิบที่นำเข้า', new Date()]
   ];
   
   const existingData = sheet.getDataRange().getValues();
   if (existingData.length <= 1) { // ถ้ายังไม่มีข้อมูล
     sheet.getRange(2, 1, initialConfigs.length, 5).setValues(initialConfigs);
   }
 }


17_LookupService.gs

   if (mPlace) {
     const data = mPlace.getDataRange().getValues();
     for (let i = 1; i < data.length; i++) {
       const placeId = safeString(data[i][0]);
       const candidateNorm = safeString(data[i][2]);
       if (!placeId || !candidateNorm) continue;
       const score = scorePlaceCandidate(normPlace, candidateNorm);
       if (score >= 60) out.push({ id: placeId, score: score, source: 'M_PLACE' });
     }
   }
 
   const mAlias = ss.getSheetByName(getSheetNames().M_PLACE_ALIAS);
   if (mAlias) {
     const data = mAlias.getDataRange().getValues();
     for (let i = 1; i < data.length; i++) {
       const placeId = safeString(data[i][1]);
       const aliasNorm = safeString(data[i][3]);
       if (!placeId || !aliasNorm) continue;
       const score = scorePlaceCandidate(normPlace, aliasNorm);
       if (score >= 60) out.push({ id: placeId, score: score, source: 'M_PLACE_ALIAS' });
     }
   }
 
   return out;
 }
+
+/**
+ * สำหรับกรณีที่ผู้ใช้เพิ่มชีตดิบใหม่ (โครงสร้างคล้าย SOURCE เดิม)
+ * ระบบจะเติม LatLong จากฐานที่ clean แล้ว ให้กับแถวที่ยังไม่มีพิกัด
+ */
+function enrichActiveSheetLatLongFromMaster() {
+  const ss = SpreadsheetApp.getActiveSpreadsheet();
+  const sheet = ss.getActiveSheet();
+  if (!sheet) return;
+
+  const data = sheet.getDataRange().getValues();
+  if (data.length <= 1) {
+    ss.toast('ชีตนี้ไม่มีข้อมูลให้ประมวลผล', 'ℹ️ ไม่มีข้อมูล', 5);
+    return;
+  }
+
+  const headers = data[0].map(h => safeTrim(h));
+  const colMap = {};
+  headers.forEach((h, i) => { colMap[h] = i; });
+
+  const personIdx = colMap['ชื่อปลายทาง'];
+  const placeIdx = colMap['ที่อยู่ปลายทาง'];
+  if (personIdx === undefined || placeIdx === undefined) {
+    ss.toast('ไม่พบคอลัมน์ชื่อปลายทาง/ที่อยู่ปลายทาง ในชีตที่เปิดอยู่', '❌ โครงสร้างไม่ถูกต้อง', 8);
+    return;
+  }
+
+  const latIdx = ensureColumn(sheet, headers, 'LAT');
+  const lngIdx = ensureColumn(sheet, headers, 'LONG');
+  const suggestIdx = ensureColumn(sheet, headers, 'LAT_LNG_SUGGESTED');
+  const confIdx = ensureColumn(sheet, headers, 'LOOKUP_CONFIDENCE');
+  const reasonIdx = ensureColumn(sheet, headers, 'LOOKUP_REASON');
+  const statusIdx = ensureColumn(sheet, headers, 'LOOKUP_STATUS');
+
+  const minConfidence = parseInt(getConfig('LOOKUP_MIN_CONFIDENCE'), 10) || 75;
+  let matched = 0;
+  let reviewNeeded = 0;
+  let notFound = 0;
+
+  for (let r = 1; r < data.length; r++) {
+    const row = data[r];
+    const person = safeString(row[personIdx]);
+    const place = safeString(row[placeIdx]);
+    const currentLat = safeString(row[latIdx]);
+    const currentLng = safeString(row[lngIdx]);
+    if (!person && !place) continue;
+
+    // ถ้ามีพิกัดอยู่แล้ว ถือว่าผ่าน
+    if (currentLat && currentLng) {
+      sheet.getRange(r + 1, statusIdx + 1).setValue('SKIP_HAS_LATLONG');
+      continue;
+    }
+
+    const res = lookupLatLongByPersonAndPlace(person, place);
+    if (!res.found) {
+      sheet.getRange(r + 1, statusIdx + 1).setValue('NOT_FOUND');
+      sheet.getRange(r + 1, reasonIdx + 1).setValue(res.reason || 'NO_MATCH');
+      notFound++;
+      continue;
+    }
+
+    sheet.getRange(r + 1, suggestIdx + 1).setValue(`${res.lat},${res.lng}`);
+    sheet.getRange(r + 1, confIdx + 1).setValue(res.confidence);
+    sheet.getRange(r + 1, reasonIdx + 1).setValue(res.reason || 'MATCHED_FROM_INDEX');
+
+    if (res.confidence >= minConfidence) {
+      sheet.getRange(r + 1, latIdx + 1).setValue(res.lat);
+      sheet.getRange(r + 1, lngIdx + 1).setValue(res.lng);
+      sheet.getRange(r + 1, statusIdx + 1).setValue('MATCHED');
+      matched++;
+    } else {
+      sheet.getRange(r + 1, statusIdx + 1).setValue('REVIEW_REQUIRED');
+      reviewNeeded++;
+    }
+  }
+
+  ss.toast(`เติมพิกัดเสร็จ: MATCHED=${matched}, REVIEW_REQUIRED=${reviewNeeded}, NOT_FOUND=${notFound}`, '✅ Lookup Complete', 10);
+}
+
+function ensureColumn(sheet, headers, colName) {
+  const idx = headers.indexOf(colName);
+  if (idx !== -1) return idx;
+  const newCol = sheet.getLastColumn() + 1;
+  sheet.getRange(1, newCol).setValue(colName);
+  headers.push(colName);
+  return headers.length - 1;
+}

SYSTEM_AUDIT.md

 - `clearCheckpoint`
 - `isTimeNearLimit`
 - `updateRunStatus`
 - `showAutoCloseAlert`
 
 ### `15_GoogleMapsAPI.gs`
 - `md5`
 - `getAdvancedCache`
 - `setAdvancedCache`
 - `GOOGLEMAPS_DISTANCE`
 - `GOOGLEMAPS_REVERSEGEOCODE`
 - `GOOGLEMAPS_LATLONG`
 - `GOOGLEMAPS_DURATION`
 
 ### `16_GeoDictionaryBuilder.gs`
 - `buildGeoIndex`
 - `parseRemarkLogic`
 
 ### `17_LookupService.gs`
 - `refreshLookupIndex`
 - `lookupLatLongByPersonAndPlace`
 - `LMDS_LOOKUP_LATLONG`
 - `LMDS_LOOKUP_DETAIL`
 - `findPersonLookupCandidates`
 - `findPlaceLookupCandidates`
+- `enrichActiveSheetLatLongFromMaster`
+- `ensureColumn`
 
 ---
 
 ## 3) จำนวนชีตที่ระบบใช้ + ชื่อคอลัมน์
 
 ## 3.1 ชีตดิบต้นทาง (Source)
 - ชื่อชีต: ตั้งจาก Config (`SOURCE_SHEET_NAME`) ค่า default คือ `SCGนครหลวงJWDภูมิภาค`
 - อ่านคอลัมน์สำคัญผ่าน `mapRowToSourceObject` เช่น:
   - `ID_SCGนครหลวงJWDภูมิภาค`
   - `วันที่ส่งสินค้า`
   - `เวลาที่ส่งสินค้า`
   - `จุดส่งสินค้าปลายทาง`
   - `ชื่อ - นามสกุล`
   - `ทะเบียนรถ`
   - `Shipment No`
   - `Invoice No`
   - `รหัสลูกค้า`
   - `ชื่อเจ้าของสินค้า`
   - `ชื่อปลายทาง`
   - `Email พนักงาน`
   - `LAT`
   - `LONG`
   - `คลังสินค้า`
   - `ที่อยู่ปลายทาง`
   - `เหตุผิดปกติที่ตรวจพบ`

Summary

เข้าใจตรงกันแล้วครับ รอบนี้ผมแก้เป็น workflow ตามชีตจริงของคุณ เลย: เพิ่มโมดูล 18_DailyJobIngestService.gs สำหรับซิงก์จากชีต ตารางงานประจำวัน ไปชีต SCGนครหลวงJWDภูมิภาค โดยตรง ไม่ใช่ระบบค้นหาแยกครับ.

เพิ่มฟังก์ชัน syncDailyJobsToSource() ที่ทำงานแบบ production flow:

อ่านชีตรายวันจาก config DAILY_SHEET_NAME

บังคับมีคอลัมน์ ชื่อปลายทาง + ที่อยู่ปลายทาง

เติมสถานะซิงก์ (LMDS_SYNC_STATUS, LMDS_SYNC_NOTE)

copy คอลัมน์ชื่อเดียวกันเข้าชีต SCG

lookup LatLong จากฐาน clean แล้วเติม LAT/LONG/จุดส่งสินค้าปลายทาง

append เข้า SCG พร้อม SYNC_STATUS ว่าง เพื่อให้ระบบ clean หลักทำงานต่อได้ทันทีครับ.

เพิ่มสถานะผลลัพธ์ที่ชัดเจนในชีตรายวัน (SYNCED, SYNCED_REVIEW_REQUIRED, SYNCED_NO_MATCH, SKIP_INCOMPLETE) เพื่อกันข้อมูลสกปรกและแยกแถวที่ต้องรีวิวได้จริงครับ.

เพิ่มเมนูใหม่ 10. ซิงก์ตารางงานประจำวัน -> SCG ให้ทีมใช้งานได้ทันทีจากเมนู LMDS ครับ.

เพิ่ม config รองรับ workflow ใหม่:

DAILY_SHEET_NAME = ตารางงานประจำวัน

seed ค่า config ตอน setup ครั้งแรกแล้วครับ.

อัปเดตเอกสารระบบให้รวมโมดูลใหม่ (รวมเป็น 19 โมดูล) แล้วครับ.

Testing

✅ rg -n "DAILY_SHEET_NAME|syncDailyJobsToSource|ตารางงานประจำวัน|ensureDailyColumn" 00_App.gs 01_Config.gs 03_SetupSheets.gs 18_DailyJobIngestService.gs SYSTEM_AUDIT.md && git status --short

✅ git add 00_App.gs 01_Config.gs 03_SetupSheets.gs 18_DailyJobIngestService.gs SYSTEM_AUDIT.md && git commit -m "Add daily raw sheet sync flow into SCG source pipeline"

✅ git status --short

ถัดไปเมื่อคุณพร้อมส่ง “คอลัมน์ที่ต่างจากชีต SCG” มา ผมจะทำ mapping แบบละเอียดรายคอลัมน์ ให้ ตารางงานประจำวัน เข้าระบบ clean ได้ครบทุกช่องครับ.
Summary

เข้าใจตรงกันแล้วครับ รอบนี้ผมแก้เป็น workflow ตามชีตจริงของคุณ เลย: เพิ่มโมดูล 18_DailyJobIngestService.gs สำหรับซิงก์จากชีต ตารางงานประจำวัน ไปชีต SCGนครหลวงJWDภูมิภาค โดยตรง ไม่ใช่ระบบค้นหาแยกครับ.

เพิ่มฟังก์ชัน syncDailyJobsToSource() ที่ทำงานแบบ production flow:

อ่านชีตรายวันจาก config DAILY_SHEET_NAME

บังคับมีคอลัมน์ ชื่อปลายทาง + ที่อยู่ปลายทาง

เติมสถานะซิงก์ (LMDS_SYNC_STATUS, LMDS_SYNC_NOTE)

copy คอลัมน์ชื่อเดียวกันเข้าชีต SCG

lookup LatLong จากฐาน clean แล้วเติม LAT/LONG/จุดส่งสินค้าปลายทาง

append เข้า SCG พร้อม SYNC_STATUS ว่าง เพื่อให้ระบบ clean หลักทำงานต่อได้ทันทีครับ.

เพิ่มสถานะผลลัพธ์ที่ชัดเจนในชีตรายวัน (SYNCED, SYNCED_REVIEW_REQUIRED, SYNCED_NO_MATCH, SKIP_INCOMPLETE) เพื่อกันข้อมูลสกปรกและแยกแถวที่ต้องรีวิวได้จริงครับ.

เพิ่มเมนูใหม่ 10. ซิงก์ตารางงานประจำวัน -> SCG ให้ทีมใช้งานได้ทันทีจากเมนู LMDS ครับ.

เพิ่ม config รองรับ workflow ใหม่:

DAILY_SHEET_NAME = ตารางงานประจำวัน

seed ค่า config ตอน setup ครั้งแรกแล้วครับ.

อัปเดตเอกสารระบบให้รวมโมดูลใหม่ (รวมเป็น 19 โมดูล) แล้วครับ.

Testing

✅ rg -n "DAILY_SHEET_NAME|syncDailyJobsToSource|ตารางงานประจำวัน|ensureDailyColumn" 00_App.gs 01_Config.gs 03_SetupSheets.gs 18_DailyJobIngestService.gs SYSTEM_AUDIT.md && git status --short

✅ git add 00_App.gs 01_Config.gs 03_SetupSheets.gs 18_DailyJobIngestService.gs SYSTEM_AUDIT.md && git commit -m "Add daily raw sheet sync flow into SCG source pipeline"

✅ git status --short

ถัดไปเมื่อคุณพร้อมส่ง “คอลัมน์ที่ต่างจากชีต SCG” มา ผมจะทำ mapping แบบละเอียดรายคอลัมน์ ให้ ตารางงานประจำวัน เข้าระบบ clean ได้ครบทุกช่องครับ.

00_App.gs

 /**
  * 00_App.gs
  * Entry point ของระบบ LMDS (Logistics Master Data System)
  */
 
 function onOpen() {
   const ui = SpreadsheetApp.getUi();
   ui.createMenu('📦 LMDS System')
     .addItem('1. ติดตั้งระบบครั้งแรก (Setup)', 'runInitialSetup')
     .addSeparator()
     .addItem('2. ประมวลผลข้อมูลประจำวัน', 'runDailyProcess')
     .addItem('3. อัปเดตพจนานุกรมสถานที่ (SYS_TH_GEO)', 'buildGeoIndex')
     .addItem('4. รีเซ็ตแถวที่เลือกเพื่อรันใหม่', 'reprocessSelectedRows')
     .addSeparator()
     .addItem('5. อัปเดตสถิติและ Report', 'runNightlyMaintenance')
     .addItem('6. อัปเดต Conflict Dashboard', 'refreshConflictDashboard')
     .addItem('7. Reviewer Assist (Q_REVIEW)', 'runReviewerAssist')
     .addItem('8. อัปเดต Lookup Index (Person+Place->LatLong)', 'refreshLookupIndex')
     .addItem('9. เติม LatLong ให้ชีตดิบที่เปิดอยู่', 'enrichActiveSheetLatLongFromMaster')
+    .addItem('10. ซิงก์ตารางงานประจำวัน -> SCG', 'syncDailyJobsToSource')
     .addToUi();
 }
 
 function runInitialSetup() {
   const ss = SpreadsheetApp.getActiveSpreadsheet();
   ss.toast('กำลังเริ่มสร้างชีตระบบและกำหนดค่าเริ่มต้น...', '⚙️ เริ่มต้นการติดตั้ง', 5);
   
   try {
     createSystemSheets(); 
     seedInitialConfig();  
     
     if (typeof setupReviewDropdown === 'function') {
       setupReviewDropdown();
     }
     
     ss.toast('ติดตั้งระบบและเตรียมความพร้อมเรียบร้อยแล้ว', '✅ สำเร็จ', 10);
   } catch (e) {
     ss.toast('เกิดข้อผิดพลาด: ' + e.message, '❌ ล้มเหลว', 15);
     writeLog('ERROR', '00_App', 'runInitialSetup', '', e.message, e.stack);
   }
 }
 
 /**
  * ประมวลผลข้อมูลประจำวัน
  */


01_Config.gs

 /**
  * 01_Config.gs
  * จัดการค่าคงที่และ Configuration ของระบบ
  */
 
 const CONFIG_CACHE = {};
 
 /**
  * ดึงค่า Config จากชีต SYS_CONFIG
  */
 function getConfig(key) {
   if (CONFIG_CACHE[key] !== undefined) {
     return CONFIG_CACHE[key];
   }
   
   const allConfigs = getAllConfigs();
   if (allConfigs[key] !== undefined) {
     return allConfigs[key];
   }
   
   // Default fallbacks ถ้าหาในชีตไม่เจอ
   const defaults = {
     'SOURCE_SHEET_NAME': 'SCGนครหลวงJWDภูมิภาค',
+    'DAILY_SHEET_NAME': 'ตารางงานประจำวัน',
     'AUTO_MATCH_SCORE': '90',
     'REVIEW_SCORE_MIN': '75',
     'GEO_RADIUS_METER': '50',
     'MAX_PROCESS_ROWS_PER_RUN': '500',
     'LOOKUP_MIN_CONFIDENCE': '75'
   };
   
   return defaults[key] || null;
 }
 
 /**
  * โหลด Config ทั้งหมดแบบรวดเดียว
  */
 function getAllConfigs() {
   if (Object.keys(CONFIG_CACHE).length > 0) return CONFIG_CACHE;
   
   const ss = SpreadsheetApp.getActiveSpreadsheet();
   const sheet = ss.getSheetByName('SYS_CONFIG');
   if (!sheet) return {};
   
   const data = sheet.getDataRange().getValues();
   for (let i = 1; i < data.length; i++) { // ข้าม header
     const key = data[i][0];
     const value = data[i][1];
     if (key) {

03_SetupSheets.gs

     [names.SYS_TH_GEO]: ['รหัสไปรษณีย์', 'แขวง/ตำบล', 'เขต/อำเภอ', 'จังหวัด', 'หมายเหตุ']
   };
 
   Object.keys(schemas).forEach(sheetName => {
     let sheet = ss.getSheetByName(sheetName);
     if (!sheet) {
       sheet = ss.insertSheet(sheetName);
     }
     
     const headers = schemas[sheetName];
     sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
     sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold").setBackground("#f3f3f3");
     sheet.setFrozenRows(1);
   });
 }
 
 /**
  * กำหนดค่า Config เบื้องต้น
  */
 function seedInitialConfig() {
   const ss = SpreadsheetApp.getActiveSpreadsheet();
   const sheet = ss.getSheetByName(getSheetNames().SYS_CONFIG);
   if (!sheet) return;
   
   const initialConfigs = [
+    ['DAILY_SHEET_NAME', 'ตารางงานประจำวัน', 'Source', 'ชื่อชีตข้อมูลใหม่รายวันที่ดึงมาจากระบบต้นทาง', new Date()],
     ['AUTO_MATCH_SCORE', '90', 'Engine', 'คะแนนขั้นต่ำในการจับคู่อัตโนมัติ', new Date()],
     ['REVIEW_SCORE_MIN', '75', 'Engine', 'คะแนนขั้นต่ำที่ต้องส่งคนรีวิว', new Date()],
     ['GEO_RADIUS_METER', '50', 'Engine', 'รัศมีความคลาดเคลื่อนพิกัด (เมตร)', new Date()],
     ['MAX_PROCESS_ROWS_PER_RUN', '500', 'System', 'จำนวนแถวสูงสุดต่อการรัน 1 ครั้ง', new Date()],
     ['LOOKUP_MIN_CONFIDENCE', '75', 'Lookup', 'คะแนนขั้นต่ำสำหรับเติม LatLong อัตโนมัติในชีตดิบที่นำเข้า', new Date()]
   ];
   
   const existingData = sheet.getDataRange().getValues();
   if (existingData.length <= 1) { // ถ้ายังไม่มีข้อมูล
     sheet.getRange(2, 1, initialConfigs.length, 5).setValues(initialConfigs);
   }
 }


18_DailyJobIngestService.gs

+/**
+ * 18_DailyJobIngestService.gs
+ * ซิงก์ข้อมูลจากชีต "ตารางงานประจำวัน" -> "SCGนครหลวงJWDภูมิภาค"
+ * โดยใช้ Person+Place lookup หา LatLong ก่อนส่งเข้าระบบ clean หลัก
+ */
+
+function syncDailyJobsToSource() {
+  const ss = SpreadsheetApp.getActiveSpreadsheet();
+  const sourceSheet = ss.getSheetByName(getSheetNames().SOURCE);
+  const dailySheetName = getConfig('DAILY_SHEET_NAME') || 'ตารางงานประจำวัน';
+  const dailySheet = ss.getSheetByName(dailySheetName);
+
+  if (!sourceSheet) throw new Error(`ไม่พบชีตปลายทาง ${getSheetNames().SOURCE}`);
+  if (!dailySheet) throw new Error(`ไม่พบชีตข้อมูลรายวัน ${dailySheetName}`);
+
+  const dailyData = dailySheet.getDataRange().getValues();
+  if (dailyData.length <= 1) {
+    ss.toast('ไม่มีข้อมูลในตารางงานประจำวัน', 'ℹ️ ไม่มีข้อมูล', 5);
+    return;
+  }
+
+  const dailyHeaders = dailyData[0].map(h => safeTrim(h));
+  const personIdx = dailyHeaders.indexOf('ชื่อปลายทาง');
+  const placeIdx = dailyHeaders.indexOf('ที่อยู่ปลายทาง');
+  if (personIdx === -1 || placeIdx === -1) {
+    throw new Error('ชีตตารางงานประจำวันต้องมีคอลัมน์ "ชื่อปลายทาง" และ "ที่อยู่ปลายทาง"');
+  }
+
+  const dailyStatusIdx = ensureDailyColumn(dailySheet, dailyHeaders, 'LMDS_SYNC_STATUS');
+  const dailyNoteIdx = ensureDailyColumn(dailySheet, dailyHeaders, 'LMDS_SYNC_NOTE');
+
+  const sourceHeaders = sourceSheet.getRange(1, 1, 1, sourceSheet.getLastColumn()).getValues()[0].map(h => safeTrim(h));
+  const sourceMap = {};
+  sourceHeaders.forEach((h, i) => { sourceMap[h] = i; });
+
+  const minConfidence = parseInt(getConfig('LOOKUP_MIN_CONFIDENCE'), 10) || 75;
+  let syncedCount = 0;
+  let reviewCount = 0;
+  let skippedCount = 0;
+
+  for (let r = 1; r < dailyData.length; r++) {
+    const row = dailyData[r];
+    const status = safeString(row[dailyStatusIdx]).toUpperCase();
+    if (status === 'SYNCED') continue;
+
+    const person = safeString(row[personIdx]);
+    const place = safeString(row[placeIdx]);
+    if (!person || !place) {
+      dailySheet.getRange(r + 1, dailyStatusIdx + 1).setValue('SKIP_INCOMPLETE');
+      dailySheet.getRange(r + 1, dailyNoteIdx + 1).setValue('ขาดชื่อปลายทางหรือที่อยู่ปลายทาง');
+      skippedCount++;
+      continue;
+    }
+
+    const lookup = lookupLatLongByPersonAndPlace(person, place);
+    const sourceRow = new Array(sourceHeaders.length).fill('');
+
+    // copy คอลัมน์ที่ชื่อเหมือนกัน (ถ้ามี)
+    for (let c = 0; c < dailyHeaders.length; c++) {
+      const h = dailyHeaders[c];
+      if (sourceMap[h] !== undefined) {
+        sourceRow[sourceMap[h]] = row[c];
+      }
+    }
+
+    // บังคับ field หลักที่ระบบต้องใช้
+    if (sourceMap['ชื่อปลายทาง'] !== undefined) sourceRow[sourceMap['ชื่อปลายทาง']] = person;
+    if (sourceMap['ที่อยู่ปลายทาง'] !== undefined) sourceRow[sourceMap['ที่อยู่ปลายทาง']] = place;
+
+    // ถ้าไม่มี ID ต้นทาง สร้างให้
+    if (sourceMap['ID_SCGนครหลวงJWDภูมิภาค'] !== undefined && !sourceRow[sourceMap['ID_SCGนครหลวงJWDภูมิภาค']]) {
+      sourceRow[sourceMap['ID_SCGนครหลวงJWDภูมิภาค']] = 'DJ-' + uuid().split('-')[0].toUpperCase();
+    }
+
+    if (lookup.found) {
+      if (sourceMap['LAT'] !== undefined) sourceRow[sourceMap['LAT']] = lookup.lat;
+      if (sourceMap['LONG'] !== undefined) sourceRow[sourceMap['LONG']] = lookup.lng;
+      if (sourceMap['จุดส่งสินค้าปลายทาง'] !== undefined) sourceRow[sourceMap['จุดส่งสินค้าปลายทาง']] = `${lookup.lat},${lookup.lng}`;
+      if (sourceMap['ชื่อที่อยู่จาก_LatLong'] !== undefined && !sourceRow[sourceMap['ชื่อที่อยู่จาก_LatLong']]) {
+        sourceRow[sourceMap['ชื่อที่อยู่จาก_LatLong']] = place;
+      }
+    }
+
+    // ตั้งสถานะให้ระบบ clean หลักดึงไปประมวลผลต่อ
+    if (sourceMap['SYNC_STATUS'] !== undefined) sourceRow[sourceMap['SYNC_STATUS']] = '';
+    sourceSheet.appendRow(sourceRow);
+
+    if (lookup.found && lookup.confidence >= minConfidence) {
+      dailySheet.getRange(r + 1, dailyStatusIdx + 1).setValue('SYNCED');
+      dailySheet.getRange(r + 1, dailyNoteIdx + 1).setValue(`MATCHED (${lookup.confidence})`);
+      syncedCount++;
+    } else if (lookup.found) {
+      dailySheet.getRange(r + 1, dailyStatusIdx + 1).setValue('SYNCED_REVIEW_REQUIRED');
+      dailySheet.getRange(r + 1, dailyNoteIdx + 1).setValue(`LOW_CONFIDENCE (${lookup.confidence})`);
+      reviewCount++;
+    } else {
+      dailySheet.getRange(r + 1, dailyStatusIdx + 1).setValue('SYNCED_NO_MATCH');
+      dailySheet.getRange(r + 1, dailyNoteIdx + 1).setValue('NO_MATCH');
+      reviewCount++;
+    }
+  }
+
+  ss.toast(`ซิงก์เสร็จ: SYNCED=${syncedCount}, NEED_REVIEW=${reviewCount}, SKIP=${skippedCount}`, '✅ Daily Sync Complete', 10);
+}
+
+function ensureDailyColumn(sheet, headers, colName) {
+  const idx = headers.indexOf(colName);
+  if (idx !== -1) return idx;
+  const newCol = sheet.getLastColumn() + 1;
+  sheet.getRange(1, newCol).setValue(colName);
+  headers.push(colName);
+  return headers.length - 1;
+}

SYSTEM_AUDIT.md

 # SYSTEM AUDIT — LMDS-Synergy-V4.3 (Google Apps Script)
 
 ## 1) จำนวนโมดูลโค้ดทั้งหมด
-ระบบมี **18 โมดูล** (00 ถึง 17):
+ระบบมี **19 โมดูล** (00 ถึง 18):
 
 1. `00_App.gs`
 2. `01_Config.gs`
 3. `02_Schema.gs`
 4. `03_SetupSheets.gs`
 5. `04_SourceRepository.gs`
 6. `05_NormalizeService.gs`
 7. `06_PersonService.gs`
 8. `07_PlaceService.gs`
 9. `08_GeoService.gs`
 10. `09_DestinationService.gs`
 11. `10_MatchEngine.gs`
 12. `11_TransactionService.gs`
 13. `12_ReviewService.gs`
 14. `13_ReportService.gs`
 15. `14_Utils.gs`
 16. `15_GoogleMapsAPI.gs`
 17. `16_GeoDictionaryBuilder.gs`
 18. `17_LookupService.gs`
+19. `18_DailyJobIngestService.gs`
 
 ---
 
 ## 2) ฟังก์ชันในแต่ละโมดูล
 
 ### `00_App.gs`
 - `onOpen`
 - `runInitialSetup`
 - `runDailyProcess`
 - `reprocessSelectedRows`
 - `onEdit`
 - `runNightlyMaintenance` ✅ (เพิ่มแล้ว)
 
 ### `01_Config.gs`
 - `getConfig`
 - `getAllConfigs`
 - `setConfig`
 - `getThresholds`
 - `getSheetNames`
 
 ### `02_Schema.gs`
 - `validateSourceSchema`
 - `ensureSystemSheets`
 - `getSourceColumnMap`
 - `assertRequiredColumns`
@@ -148,50 +149,54 @@
 - `showAutoCloseAlert`
 
 ### `15_GoogleMapsAPI.gs`
 - `md5`
 - `getAdvancedCache`
 - `setAdvancedCache`
 - `GOOGLEMAPS_DISTANCE`
 - `GOOGLEMAPS_REVERSEGEOCODE`
 - `GOOGLEMAPS_LATLONG`
 - `GOOGLEMAPS_DURATION`
 
 ### `16_GeoDictionaryBuilder.gs`
 - `buildGeoIndex`
 - `parseRemarkLogic`
 
 ### `17_LookupService.gs`
 - `refreshLookupIndex`
 - `lookupLatLongByPersonAndPlace`
 - `LMDS_LOOKUP_LATLONG`
 - `LMDS_LOOKUP_DETAIL`
 - `findPersonLookupCandidates`
 - `findPlaceLookupCandidates`
 - `enrichActiveSheetLatLongFromMaster`
 - `ensureColumn`
 
+### `18_DailyJobIngestService.gs`
+- `syncDailyJobsToSource`
+- `ensureDailyColumn`
+
 ---
 
 ## 3) จำนวนชีตที่ระบบใช้ + ชื่อคอลัมน์
 
 ## 3.1 ชีตดิบต้นทาง (Source)
 - ชื่อชีต: ตั้งจาก Config (`SOURCE_SHEET_NAME`) ค่า default คือ `SCGนครหลวงJWDภูมิภาค`
 - อ่านคอลัมน์สำคัญผ่าน `mapRowToSourceObject` เช่น:
   - `ID_SCGนครหลวงJWDภูมิภาค`
   - `วันที่ส่งสินค้า`
   - `เวลาที่ส่งสินค้า`
   - `จุดส่งสินค้าปลายทาง`
   - `ชื่อ - นามสกุล`
   - `ทะเบียนรถ`
   - `Shipment No`
   - `Invoice No`
   - `รหัสลูกค้า`
   - `ชื่อเจ้าของสินค้า`
   - `ชื่อปลายทาง`
   - `Email พนักงาน`
   - `LAT`
   - `LONG`
   - `คลังสินค้า`
   - `ที่อยู่ปลายทาง`
   - `เหตุผิดปกติที่ตรวจพบ`
   - `ระยะทางจากคลัง_Km`
