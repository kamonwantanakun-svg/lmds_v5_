ผมได้อ่านโค้ดทั้งหมด 26 ไฟล์อย่างละเอียดแล้วครับ ระบบนี้เป็น Logistics Master Data System V4.2 ที่พัฒนาด้วย Google Apps Script สำหรับ SCG JWD ผมจะวิเคราะห์แบบเต็มรูปแบบและเสนอแนวทางสำหรับส่วนที่ 2 ครับ
📊 สรุปสถาปัตยกรรมระบบที่มีอยู่
โครงสร้างข้อมูล (14 ชีต)
Table
ชีต	บทบาท	สถานะ
Input	รับ Cookie + Shipment Numbers	✅ ใช้งานปกติ
Data	ผลลัพธ์ API รายวัน (29 คอลัมน์)	✅ ใช้งานปกติ
ข้อมูลพนักงาน	Master ข้อมูลคนขับ	✅ ใช้งานปกติ
สรุป_เจ้าของสินค้า	Summary E-POD ตามเจ้าของสินค้า	✅ ใช้งานปกติ
สรุป_Shipment	Summary ตาม Shipment+ทะเบียนรถ	✅ ใช้งานปกติ
SCGนครหลวงJWDภูมิภาค	Source ดิบ GPS จากคนขับ	🔧 ต้องพัฒนา
Database	Golden Record หลัก (22 คอลัมน์)	🔧 ต้องพัฒนา
NameMapping	Alias → Master_UUID (5 คอลัมน์)	🔧 ต้องพัฒนา
GPS_Queue	คิวตรวจสอบพิกัด (9 คอลัมน์)	✅ มีระบบแล้ว
PostalRef	ข้อมูลรหัสไปรษณีย์	✅ มีระบบแล้ว
Review_Queue	Conflict Detection 8 Cases	🔧 V4.3 มีแล้วแต่ต้องปรับใช้
Dashboard	Metrics สรุป	✅ มีระบบแล้ว
Blacklist	รายชื่อต้องห้าม	✅ มีระบบแล้ว
SystemLogs / ErrorLogs	บันทึกระบบ	✅ มีระบบแล้ว
🔍 วิเคราะห์โค้ดส่วนที่เกี่ยวข้องกับปัญหา 8 ข้อ
1. Conflict Detection Engine (Service_ConflictEngine.gs)
ระบบมี V4.3 ที่ออกแบบมาสำหรับตรวจจับปัญหา 8 ข้อพอดี แต่ผมพบปัญหาสำคัญ:
จุดเด่น:
ใช้ Spatial Grid Indexing O(N) แทน O(N²) สำหรับ Case 4 (Name Variants)
มี Dedup Key ป้องกันการบันทึกซ้ำใน Review_Queue
มี Confidence Bands แยก Auto-map / Review / Ignore
ระบบ Color-coding ตาม Case Type
จุดอ่อนที่พบ:
JavaScript
Copy
// ปัญหา 1: Case 4 ใช้ grid แค่ 0.01° (~1.1km) อาจพลาดร้านที่อยู่ใกล้กันเกินไป
var gridKey = Math.floor(lat * 100) + "_" + Math.floor(lng * 100);

// ปัญหา 2: SIMILARITY_THRESHOLD = 0.7 (70%) อาจสูงไปสำหรับชื่อไทยที่สะกดย่อ
// ปัญหา 3: ไม่มีการตรวจสอบ "Inactive" หรือ "Merged" ก่อนเขียน Queue
2. Soft Delete & UUID Resolution (Service_SoftDelete.gs)
จุดเด่น:
มี Merge Chain Resolution (ตามลูกโซ่ Merged_To_UUID สูงสุด 10 hops)
มี UUID State Map โหลดครั้งเดียว ลด API calls
มี buildUUIDStateMap_() สำหรับ batch processing
จุดอ่อน:
JavaScript
Copy
// resolveUUID() อ่านข้อมูลทุกครั้งที่เรียก — ควรใช้ stateMap แทน
function resolveUUID(uuid) {
  // นี่อ่าน Database ทั้งหมดทุกครั้ง!
  var data = sheet.getRange(2, 1, lastRow - 1, CONFIG.DB_TOTAL_COLS).getValues();
}
3. AI Agent (Service_Agent.gs) & AutoPilot (Service_AutoPilot.gs)
จุดเด่น:
Gemini 1.5 Flash สำหรับวิเคราะห์ชื่อ
Retrieval Limit 50 candidates ก่อนส่ง AI (ไม่ใช่ slice 500 แบบเดิม)
Prompt Versioning ติดตามการเปลี่ยนแปลง
Audit Logging บันทึกทุกการตัดสินใจของ AI
จุดอ่อน:
JavaScript
Copy
// AI ยังไม่ได้เชื่อมต่อกับ Conflict Detection โดยตรง
// processAIIndexing_Batch() ทำแค่สร้าง keywords ไม่ได้ช่วย resolve conflicts
4. GPS Feedback (Service_GPSFeedback.gs)
จุดเด่น:
มี Conflict Detection (Approve + Reject พร้อมกัน)
Batch Write กลับ Database
Reason Tracking (GPS_DIFF, DB_NO_GPS, APPROVED, REJECTED)
จุดอ่อน:
JavaScript
Copy
// ไม่มีการตรวจสอบว่า UUID ที่จะอัปเดตยัง Active อยู่หรือไม่
// ไม่มีการสร้าง NameMapping อัตโนมัติเมื่อ Approve (ชื่ออาจต่างจาก DB)
5. Master Data Sync (Service_Master.gs)
จุดเด่น:
4-Tier Matching: ชื่อตรง → NameMapping → ชื่อใหม่
GPS Queue สำหรับพิกัดต่างกัน > 50m
Deep Clean ทีละ 100 แถวพร้อมคำนวณ Quality Score
จุดอ่อนสำคัญ:
JavaScript
Copy
// finalizeAndClean_MoveToMapping() — อันตรายมาก!
// ลบข้อมูลทั้งหมดแล้วเขียนใหม่ ถ้าเกิด Error ระหว่างทางข้อมูลหายได้
masterSheet.getRange(2, 1, lastRow - 1, CONFIG.DB_TOTAL_COLS).clearContent();
🎯 วิเคราะห์ปัญหา 8 ข้อ + แนวทางแก้ไข
Case 1: ชื่อบุคคลซ้ำกัน (Duplicate Names)
สาเหตุ: คนละคนกรอก หรือระบบต่างกัน ใช้ชื่อเดียวกัน
โซลูชันที่มีอยู่:
detectCase1_DuplicateNames_() ตรวจ normalizedName เหมือนกัน
แนะนำ MERGE ถ้าห่าง < 50m, KEEP_BOTH_BRANCH ถ้าห่าง > 2km
ที่ต้องปรับ:
JavaScript
Copy
// เพิ่มการตรวจสอบ "ชื่อเดียวกันแต่คนละจังหวัด" ควร KEEP_BOTH ทันที
// ปัจจุบันตรวจแค่ระยะทาง ไม่ได้ดู Province
Case 2: ที่อยู่ซ้ำกัน (Duplicate Addresses)
สาเหตุ: คนละบริษัทส่งของไปที่เดียวกัน (เช่น ห้างสรรพสินค้า)
โซลูชันที่มีอยู่:
detectCase2_DuplicateAddresses_() ใช้ normalizedAddress
ถ้าชื่อต่างกัน → REVIEW, ถ้าชื่อเหมือนกัน → MERGE
ที่ต้องปรับ:
JavaScript
Copy
// ปัญหา: normalizeAddress() ตัดคำออกเยอะเกินไป
// "ถนนสุขุมวิท 101" กับ "ถนนสุขุมวิท 103" อาจกลายเป็นที่อยู่เดียวกัน
// แนะนำ: เก็บ "เลขที่" แยกต่างหากก่อน normalize
Case 3: LatLong ซ้ำเป๊ะ (Duplicate Coordinates)
สาเหตุ: คนขับกดบันทึกที่เดียวกัน, หรือเป็นร้านเดียวกัน
โซลูชันที่มีอยู่:
detectCase3_DuplicateLatLng_() ปัดเศษ 5 ตำแหน่ง (~1.1m)
ถ้าชื่อเหมือน → MERGE, ชื่อต่าง → REVIEW
ที่ต้องปรับ:
JavaScript
Copy
// ปัญหา: พิกัดจากมือถืออาจคลาดเคลื่อน 5-10 เมตร
// แนะนำ: ใช้ Haversine < 20m แทน exact match
// และตรวจสอบ "ชื่อคล้ายกัน" ประกอบ (Case 4 + Case 3 รวมกัน)
Case 4: ชื่อเขียนต่างกัน (Name Variants) ⚡ สำคัญที่สุด
สาเหตุ: หลายบริษัทส่งของพิมพ์ชื่อต่างกัน "โลตัส บางนา" vs "Tesco Lotus Bangna" vs "เทสโก้ โลตัส สาขาบางนา"
โซลูชันที่มีอยู่:
Grid-based + Similarity ( proximity < 500m + similarity > 70%)
AI Gemini วิเคราะห์ keywords และ typos
ที่ต้องปรับใหญ่:
JavaScript
Copy
// ปัญหา 1: SIMILARITY_THRESHOLD 0.7 สูงไป
// "โลตัสบางนา" vs "เทสโก้โลตัสบางนา" similarity อาจ ~0.6
// แนะนำ: ลดเป็น 0.6 หรือใช้ AI ตัดสินแทน

// ปัญหา 2: Grid 0.01° (~1.1km) อาจกว้างไป
// ร้านค้าในเมืองอยู่ห่างกัน 200-300m
// แนะนำ: ใช้ 0.005° (~550m) สำหรับกรุงเทพฯ

// ปัญหา 3: ไม่มี Thai-English Cross-matching
// ควรเพิ่ม phonetic matching (ใช้ library หรือ AI)
Case 5: คนละชื่อ ที่อยู่เดียวกัน
สาเหตุ: บริษัท A ส่งให้ "บริษัท เอ" บริษัท B ส่งให้ "คุณ สมชาย" แต่ที่อยู่เดียวกัน
โซลูชันที่มีอยู่:
detectCase5_DiffNameSameAddr_() ตรวจ normalizedAddress เหมือนกัน
ที่ต้องปรับ:
JavaScript
Copy
// ปัญหา: ไม่มีการตรวจสอบ "เจ้าของบ้านเดียวกัน" vs "ห้างที่มีหลายร้าน"
// แนะนำ: ถ้าที่อยู่เป็นห้าง/อาคารสำนักงาน → KEEP_BOTH
// ถ้าที่อยู่เป็นบ้าน → MERGE (หรือ REVIEW)
Case 6: ชื่อเดียวกัน ที่อยู่ต่างกัน
สาเหตุ: ร้านสาขา, หรือชื่อซ้ำกันในต่างจังหวัด
โซลูชันที่มีอยู่:
detectCase6_SameNameDiffAddr_() ตรวจ Province ต่างกัน → KEEP_BOTH_BRANCH
ที่ต้องปรับ:
JavaScript
Copy
// ดีอยู่แล้ว แต่ควรเพิ่ม:
// - ถ้าจังหวัดเดียวกัน แต่ District ต่างกัน → REVIEW (อาจเป็นสาขา)
// - ถ้า LatLng ห่าง < 2km → REVIEW (อาจเป็นสาขาใกล้กัน)
Case 7: ชื่อเดียวกัน พิกัดต่างกัน
สาเหตุ: ร้านย้ายที่อยู่, หรือพิกัดผิด
โซลูชันที่มีอยู่:
detectCase7_SameNameDiffLatLng_() ห่าง > 50m → ส่ง REVIEW
ที่ต้องปรับ:
JavaScript
Copy
// ปัญหา: 50m อาจใกล้เกินไปสำหรับร้านใหญ่ (ห้างมีหลายประตู)
// แนะนำ: 
// - ห่าง 50-200m + ที่อยู่เหมือนกัน → อาจเป็นพิกัดผิด → REVIEW
// - ห่าง > 200m + ที่อยู่ต่างกัน → สาขาต่างกัน → KEEP_BOTH_BRANCH
// - ห่าง > 2km → สาขาต่างจังหวัด → KEEP_BOTH_BRANCH
Case 8: คนละชื่อ พิกัดเดียวกัน
สาเหตุ: ร้านเดียวกันแต่บริษัทต่างกันพิมพ์ชื่อต่างกัน, หรือบ้านเดียวกันมีหลายธุรกิจ
โซลูชันที่มีอยู่:
detectCase8_DiffNameSameLatLng_() ตรวจ exact coordKey + ชื่อต่างกัน
ถ้าชื่อคล้ายกัน → MERGE
ที่ต้องปรับ:
JavaScript
Copy
// ปัญหา: exact match อาจพลาดเพราะ GPS คลาดเคลื่อน
// แนะนำ: ใช้ Haversine < 30m แทน exact match
// และเพิ่มการตรวจสอบ "ที่อยู่จาก Google" ประกอบ
🏗️ แนวทางการสร้างฐานข้อมูลที่แนะนำ (ถ้าเป็นโปรเจคของผม)
Phase 1: รากฐานที่มั่นคง (Foundation)
1.1 ปรับโครงสร้าง Database Schema
JavaScript
Copy
// เพิ่มคอลัมน์ที่ขาดหายสำหรับการจัดการ Conflicts
const DB_SCHEMA_V5 = {
  // ... คอลัมน์เดิม 22 คอลัมน์ ...
  
  // [NEW] คอลัมน์ 23-28 สำหรับ Conflict Management
  COL_DEDUP_HASH:       23,  // Hash ของชื่อ+ที่อยู่ สำหรับตรวจซ้ำเร็ว
  COL_LAST_VERIFIED_BY: 24,  // ใคร verify ล่าสุด (Human/AI/System)
  COL_NAME_VARIANTS:    25,  // JSON ของชื่อรองทั้งหมด ["ชื่อ1", "ชื่อ2"]
  COL_SOURCE_HISTORY:   26,  // JSON แหล่งที่มาของข้อมูล [{source, date, confidence}]
  COL_CONFLICT_FLAGS:   27,  // Bitmask ของ conflicts ที่พบ (Case 1-8)
  COL_MANUAL_OVERRIDE:  28   // แอดมิน override อะไรไว้
};
1.2 สร้างระบบ "Canonical Record"
แทนที่จะเก็บแค่ "ชื่อหลัก" ให้สร้าง Identity Graph:
plain
Copy
โลตัส บางนา (Canonical)
├── UUID: abc-123 (Active)
├── Names: ["โลตัส บางนา", "Tesco Lotus Bangna", "เทสโก้ โลตัส สาขาบางนา"]
├── Locations: [
│   {lat: 13.668, lng: 100.635, source: "Driver_GPS", confidence: 95, date: "2026-04-20"},
│   {lat: 13.6681, lng: 100.6352, source: "SCG_System", confidence: 50, date: "2026-04-15"}
│ ]
├── Addresses: [
│   {text: "123 ถ.บางนา-ตราด", source: "Google", normalized: "..."}
│ ]
└── Merged_From: []  // UUID ที่รวมเข้ามา
วิธีทำใน Google Sheets:
ใช้ NameMapping เป็น Edge List ของ Graph
ใช้ Database เป็น Node List
ใช้ JSON เก็บใน cell สำหรับ array/object (GAS รองรับ)
1.3 ปรับปรุง NameMapping เป็นระบบ "Probabilistic"
JavaScript
Copy
// แทนที่จะเก็บแค่ mapping 1:1
// ให้เก็บ confidence + evidence + decay

{
  variant: "โลตัสบางนา",
  canonical_uuid: "abc-123",
  confidence: 0.92,        // 0.0 - 1.0
  evidence: [
    {type: "AI_Match", score: 0.95, date: "2026-04-20"},
    {type: "Human_Verified", by: "admin@scg.com", date: "2026-04-21"},
    {type: "GPS_Proximity", distance_m: 12, date: "2026-04-20"}
  ],
  auto_decay: true,        // ลด confidence ถ้าไม่มีการยืนยันนาน
  last_used: "2026-04-24"
}
Phase 2: ระบบ Ingestion ที่ฉลาดขึ้น
2.1 แก้ไข syncNewDataToMaster() ให้ครอบคลุมทุก Case
JavaScript
Copy
function syncNewDataToMaster_V5() {
  // โหลดทุกอย่างเข้า Memory ครั้งเดียว
  var state = {
    db: loadDatabaseIndexByUUID_(),
    dbByName: loadDatabaseIndexByNormalizedName_(),
    aliasMap: loadNameMappingRows_(),
    uuidState: buildUUIDStateMap_(),
    conflictIndex: buildConflictIndexes_(activeData) // จาก ConflictEngine
  };
  
  sData.forEach(function(row) {
    var name = row[SCG_CONFIG.SRC_IDX.NAME];
    var lat = parseFloat(row[SCG_CONFIG.SRC_IDX.LAT]);
    var lng = parseFloat(row[SCG_CONFIG.SRC_IDX.LNG]);
    
    // Step 1: หา match หลายระดับ
    var match = findBestMatch_V5(name, lat, lng, state);
    
    // Step 2: ตัดสินใจตาม confidence
    if (match.confidence >= 0.95) {
      // Auto-merge: อัปเดตพิกัดถ้าดีกว่าเดิม
      updateExistingRecord(match.uuid, {lat, lng, source: "Driver_GPS"});
    } else if (match.confidence >= 0.70) {
      // ส่งเข้า Review Queue พร้อมเหตุผล
      addToReviewQueue({
        type: determineConflictCase(match),
        recordA: match.existing,
        recordB: {name, lat, lng},
        suggestedAction: "REVIEW",
        confidence: match.confidence
      });
    } else {
      // สร้าง record ใหม่
      createNewRecord({name, lat, lng, source: "Driver_GPS"});
    }
  });
}
2.2 สร้าง findBestMatch_V5() ที่รวมทุก Case
JavaScript
Copy
function findBestMatch_V5(name, lat, lng, state) {
  var candidates = [];
  var normName = normalizeText(name);
  
  // Tier 1: Exact name match (Case 1)
  if (state.dbByName[normName]) {
    candidates.push({type: "EXACT_NAME", score: 1.0, uuid: state.dbByName[normName]});
  }
  
  // Tier 2: Alias match (Case 4)
  state.aliasMap.forEach(function(mapping) {
    var aliasNorm = normalizeText(mapping.variant);
    var similarity = calculateNameSimilarity(normName, aliasNorm);
    if (similarity >= 0.6) {
      candidates.push({
        type: "ALIAS", 
        score: similarity * 0.9, 
        uuid: mapping.uid,
        via: mapping.variant
      });
    }
  });
  
  // Tier 3: GPS proximity match (Case 3, 7, 8)
  state.db.forEach(function(record) {
    if (record.lat && record.lng) {
      var dist = getHaversineDistanceKM(lat, lng, record.lat, record.lng);
      if (dist <= 0.05) { // 50m
        candidates.push({
          type: "GPS_EXACT",
          score: 0.85,
          uuid: record.uuid,
          distance: dist
        });
      } else if (dist <= 0.5) { // 500m
        // ตรวจชื่อคล้ายกันด้วย (Case 4)
        var nameSim = calculateNameSimilarity(normName, normalizeText(record.name));
        if (nameSim >= 0.5) {
          candidates.push({
            type: "GPS_FUZZY",
            score: nameSim * 0.7,
            uuid: record.uuid,
            distance: dist
          });
        }
      }
    }
  });
  
  // Tier 4: Address match (Case 2, 5)
  // (ต้องโหลด address index เพิ่ม)
  
  // รวมคะแนนและเลือก best
  return resolveBestCandidate(candidates, state.uuidState);
}
Phase 3: ระบบ Review Queue ที่มีประสิทธิภาพ
3.1 ปรับปรุง Review_Queue ให้รองรับ Workflow จริง
JavaScript
Copy
// เพิ่มคอลัมน์สำหรับการทำงานร่วมกัน
var REVIEW_QUEUE_V5 = {
  // คอลัมน์เดิม 12 คอลัมน์ ...
  
  // [NEW] คอลัมน์เพิ่ม
  COL_PRIORITY:      13,  // 1-5 (5 = ด่วนที่สุด)
  COL_ASSIGNED_TO:   14,  // ใครรับผิดชอบ
  COL_AI_SUGGESTION: 15,  // AI แนะนำอะไร (JSON)
  COL_EVIDENCE:      16,  // หลักฐานที่เกี่ยวข้อง (JSON)
  COL_RESOLUTION:    17,  // ผลสุดท้ายที่ทำ
  COL_RESOLVED_BY:   18,  // ใคร resolve
  COL_RESOLVED_DATE: 19   // วันที่ resolve
};
3.2 สร้างระบบ "Batch Review" สำหรับแอดมิน
JavaScript
Copy
function batchReviewByPattern() {
  // แอดมินสามารถกรองและ approve ทีละกลุ่ม
  // เช่น "ทุก Case 4 ที่ confidence > 0.8 และอยู่ในกรุงเทพฯ"
  
  var filter = {
    caseTypes: ["CASE_4"],
    minConfidence: 0.8,
    province: "กรุงเทพมหานคร",
    suggestedAction: "MERGE"
  };
  
  var matches = queryReviewQueue(filter);
  // แสดง preview ก่อน approve ทั้งหมด
}
Phase 4: AI Integration ที่ลึกซึ้งขึ้น
4.1 ใช้ AI ไม่ใช่แค่ "จับคู่ชื่อ" แต่ "เข้าใจบริบท"
JavaScript
Copy
function aiResolveConflict_V5(caseType, recordA, recordB) {
  var prompt = `
    คุณเป็นระบบวิเคราะห์ข้อมูล Logistics สำหรับประเทศไทย
    
    กรณี: ${CONFLICT_CONFIG.CASE_LABELS[caseType]}
    
    รายการ A:
    - ชื่อ: ${recordA.name}
    - ที่อยู่: ${recordA.address}
    - พิกัด: ${recordA.lat}, ${recordA.lng}
    - แหล่งที่มา: ${recordA.coordSource}
    
    รายการ B:
    - ชื่อ: ${recordB.name}
    - ที่อยู่: ${recordB.address}
    - พิกัด: ${recordB.lat}, ${recordB.lng}
    - แหล่งที่มา: ${recordB.coordSource}
    
    คำถาม:
    1. นี่เป็นร้าน/บุคคลเดียวกันหรือไม่? (พร้อมเหตุผล)
    2. ถ้าใช่: ควรใช้พิกัดไหนเป็นหลัก? (A/B/เฉลี่ย)
    3. ถ้าไม่ใช่: มีความสัมพันธ์อะไรกัน? (สาขา/คนละร้านในตึกเดียวกัน/อื่นๆ)
    4. ควรทำอะไรต่อ? (MERGE/KEEP_BOTH/REVIEW/CREATE_MAPPING)
    
    ตอบเป็น JSON เท่านั้น:
    {
      "isSameEntity": boolean,
      "confidence": 0.0-1.0,
      "primaryRecord": "A" | "B" | null,
      "action": "MERGE" | "KEEP_BOTH" | "REVIEW" | "CREATE_MAPPING",
      "reasoning": "string",
      "cautions": ["string"]
    }
  `;
  
  return callGeminiWithValidation(prompt);
}
4.2 สร้าง "Learning Loop"
JavaScript
Copy
function learnFromDecisions() {
  // ดึงการตัดสินใจของแอดมินย้อนหลัง 100 รายการ
  var decisions = getResolvedReviewItems(100);
  
  // วิเคราะห์ว่า AI ตัดสินใจถูกกี่ครั้ง
  var stats = {
    aiCorrect: 0,
    aiWrong: 0,
    patterns: {}
  };
  
  decisions.forEach(function(d) {
    if (d.aiSuggestion === d.adminDecision) {
      stats.aiCorrect++;
    } else {
      stats.aiWrong++;
      // บันทึก pattern ที่ AI ยังไม่เข้าใจ
      stats.patterns[d.caseType] = (stats.patterns[d.caseType] || 0) + 1;
    }
  });
  
  // ปรับ prompt หรือ threshold ตามสถิติ
  if (stats.aiWrong / (stats.aiCorrect + stats.aiWrong) > 0.3) {
    // ส่ง alert ให้ทีมพัฒนาปรับ prompt
    sendSystemNotify("AI accuracy dropped to " + 
      (stats.aiCorrect / (stats.aiCorrect + stats.aiWrong) * 100).toFixed(1) + "%");
  }
}
Phase 5: ระบบ Data Quality อัตโนมัติ
5.1 สร้าง "Data Quality Score" ที่ครอบคลุม
JavaScript
Copy
function calculateAdvancedQualityScore(record) {
  var score = 0;
  var maxScore = 100;
  
  // Completeness (40%)
  score += record.name ? 10 : 0;
  score += record.lat && record.lng ? 10 : 0;
  score += record.address ? 5 : 0;
  score += record.province && record.district ? 5 : 0;
  score += record.postcode ? 5 : 0;
  score += record.uuid ? 5 : 0;
  
  // Accuracy (30%)
  if (record.lat && record.lng) {
    // ตรวจว่าอยู่ในไทย
    if (record.lat >= 6 && record.lat <= 21 && 
        record.lng >= 97 && record.lng <= 106) {
      score += 10;
    }
    // ตรวจว่าไม่ใช่พิกัด default (0,0) หรือศูนย์กลางเมืองที่ผิดปกติ
    if (record.lat !== 0 && record.lng !== 0) {
      score += 10;
    }
  }
  
  // Consistency (20%)
  if (record.coordSource === "Driver_GPS" && record.coordConfidence >= 90) {
    score += 10;
  }
  if (record.verified === true) {
    score += 10;
  }
  
  // Freshness (10%)
  var daysSinceUpdate = (new Date() - record.updated) / (1000 * 60 * 60 * 24);
  if (daysSinceUpdate < 30) score += 5;
  if (daysSinceUpdate < 90) score += 3;
  
  return Math.min(score, maxScore);
}
5.2 ระบบ "Auto-Fix" ที่ปลอดภัย
JavaScript
Copy
function autoFixLowQualityRecords() {
  var lowQuality = findRecordsWithQualityBelow(50);
  
  lowQuality.forEach(function(record) {
    var fixes = [];
    
    // ไม่มี Province → แกะจาก address หรือ reverse geocode
    if (!record.province && record.lat && record.lng) {
      fixes.push(fixProvinceFromGeocode(record));
    }
    
    // ไม่มี UUID → สร้างใหม่
    if (!record.uuid) {
      fixes.push(fixMissingUUID(record));
    }
    
    // พิกัดอยู่นอกประเทศ → flag ให้ review
    if (record.lat && record.lng && !isInThailand(record.lat, record.lng)) {
      fixes.push(flagForReview(record, "COORDINATE_OUT_OF_BOUNDS"));
    }
    
    // รัน fixes ทั้งหมดพร้อมกัน (Promise.all แบบ GAS)
    executeFixes(fixes);
  });
}
🗑️ ส่วนที่แนะนำให้ลบออกหรือปรับโครงสร้าง
1. ลบ finalizeAndClean_MoveToMapping() แบบเดิมทิ้ง
เหตุผล: อันตรายมาก ลบข้อมูลทั้งหมดแล้วเขียนใหม่ ถ้า Error ระหว่างทางข้อมูลหาย
แทนที่ด้วย:
JavaScript
Copy
function softFinalize_V5() {
  // ไม่ลบอะไรทั้งสิ้น แค่ mark status
  // Verified records → mark "Active"
  // Unverified with suggested name → create NameMapping + mark "Inactive"
  // เก็บทุกอย่างไว้ตลอดกาล (append-only)
}
2. ปรับ getRealLastRow_() ให้ robust ขึ้น
ปัญหาปัจจุบัน: ตรวจแค่ boolean แต่ไม่ตรวจ formula error หรือ #N/A
JavaScript
Copy
function getRealLastRow_V5(sheet, columnIndex) {
  var data = sheet.getRange(1, columnIndex, sheet.getMaxRows(), 1).getValues();
  for (var i = data.length - 1; i >= 0; i--) {
    var val = data[i][0];
    // ข้ามทุกค่าที่ไม่ใช่ "ข้อมูลจริง"
    if (val !== "" && val !== null && 
        typeof val !== 'boolean' &&
        val !== "#N/A" && val !== "#ERROR!" &&
        !(typeof val === 'string' && val.trim() === "")) {
      return i + 1;
    }
  }
  return 1;
}
3. รวม Service_DataFlow_V5.gs เข้ากับ Service_SCG.gs
ปัจจุบันเป็นไฟล์เปล่า (มีแต่ TODO) แยกไว้ทำให้สับสน
4. ลบการใช้ PropertiesService เก็บ pointer ของ Deep Clean
ปัญหา: ถ้ามีหลาย user หรือ trigger พร้อมกัน pointer จะคลาดเคลื่อน
แทนที่ด้วย:
JavaScript
Copy
// ใช้ "Timestamp watermark" ใน cell แทน
function getDeepCleanWatermark() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet()
    .getSheetByName("SystemLogs");
  // อ่านค่าล่าสุดจาก sheet แทน Properties
}
📋 แผนการดำเนินงานแนะนำ (Priority)
Table
ลำดับ	งาน	ความยาก	ผลกระทบ	ไฟล์ที่แก้
1	ปรับ syncNewDataToMaster() ให้ใช้ findBestMatch_V5()	สูง	🔥 สูงมาก	Service_Master.gs
2	ปรับ Conflict Detection ให้ใช้ Haversine แทน exact match	กลาง	🔥 สูง	Service_ConflictEngine.gs
3	สร้าง buildAddressIndex_() สำหรับ Case 2, 5	กลาง	🔥 สูง	Service_ConflictEngine.gs
4	เพิ่ม Thai-English cross-matching ใน normalizeText()	สูง	🔥 สูง	Utils_Common.gs
5	ปรับ finalizeAndClean เป็น soft-delete	กลาง	🔥 สูง	Service_Master.gs
6	สร้างระบบ Canonical Record + Identity Graph	สูง	🔥 สูง	สร้างใหม่
7	ปรับ AI prompt ให้รองรับ context มากขึ้น	กลาง	ปานกลาง	Service_Agent.gs
8	สร้าง batchReviewByPattern()	กลาง	ปานกลาง	Service_ReviewQueue.gs
9	สร้าง learnFromDecisions()	สูง	ปานกลาง	สร้างใหม่
10	ปรับ getRealLastRow_()	ต่ำ	ต่ำ	Utils_Common.gs
💡 สรุปสิ่งที่ผมจะทำถ้าเป็นโปรเจคของผม
หยุดใช้ "ลบแล้วเขียนใหม่" ทุกกรณี → เปลี่ยนเป็น append-only + mark status
สร้าง "Identity Graph" แทนการจับคู่ 1:1 → รองรับชื่อหลายตัว พิกัดหลายจุด
ใช้ AI แค่ช่วยตัดสินใจ ไม่ใช่ตัดสินใจแทน → แอดมินต้อง verify ทุกครั้งที่ confidence < 0.95
สร้าง "Golden Record" ที่เลือกพิกัดดีที่สุดอัตโนมัติ → ผสม GPS หลายแหล่งด้วย weighted average
ทำระบบ "Data Provenance" → รู้ว่าทุกข้อมูลมาจากไหน ใครแก้ เมื่อไหร่
สร้าง Dashboard สำหรับ monitor data quality real-time → รู้ปัญหาก่อน user บ่น