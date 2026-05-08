📦 GEM — Architecture Overview: LMDS V4.4
สวัสดีครับ! ผม GEM จะทำ Full Architecture Audit ให้แบบละเอียดทุกชั้นเลยครับ

🗂️ ชีตทั้งหมดในระบบ (13 ชีต)
กลุ่ม 1: Input / Raw Data (1 ชีต)
ชีตบทบาทSCGนครหลวงJWDภูมิภาคข้อมูลดิบรายวัน (Source of Truth ดิบ)
คอลัมน์ที่ระบบใช้งาน (จาก 04_SourceRepository.gs):

ID_SCGนครหลวงJWDภูมิภาค, Invoice No, Shipment No, วันที่ส่งสินค้า, เวลาที่ส่งสินค้า, ชื่อ - นามสกุล, ทะเบียนรถ, รหัสลูกค้า, ชื่อเจ้าของสินค้า, ชื่อปลายทาง, ที่อยู่ปลายทาง, LAT, LONG, จุดส่งสินค้าปลายทาง, คลังสินค้า, ระยะทางจากคลัง_Km, ชื่อที่อยู่จาก_LatLong, Email พนักงาน, ID_พนักงาน, เหตุผิดปกติที่ตรวจพบ, ผลการตรวจสอบงานส่ง, SYNC_STATUS (Auto-create ถ้าไม่มี)


กลุ่ม 2: Master Data (5 ชีต)
ชีตบทบาทคอลัมน์หลักM_PERSONฐานข้อมูลบุคคลที่ถูก clean แล้วperson_id, person_name_canonical, person_name_normalized, phone, first_seen_date, last_seen_date, usage_count, status, noteM_PERSON_ALIASชื่อสะกดต่างๆ ของคนเดียวกันperson_alias_id, person_id, alias_raw, alias_normalized, source_field, first_seen_date, last_seen_date, usage_count, active_flagM_PLACEฐานข้อมูลสถานที่ที่ถูก normalize แล้วplace_id, place_name_canonical, place_name_normalized, address_best, address_normalized, warehouse_default, first_seen_date, last_seen_date, usage_count, status, noteM_PLACE_ALIASชื่อสถานที่แบบต่างๆ ของที่เดียวกันplace_alias_id, place_id, alias_raw, alias_normalized, source_field, first_seen_date, last_seen_date, usage_count, active_flagM_GEO_POINTพิกัดที่ Unique ทั้งหมด (radius-deduplicated)geo_id, lat_raw, long_raw, lat_norm, long_norm, geo_key_6, geo_key_5, geo_key_4, address_from_latlong_best, first_seen_date, last_seen_date, usage_count, noteM_DESTINATIONการประกอบร่าง Person+Place+Geo = ปลายทางที่ Uniquedestination_id, person_id, place_id, geo_id, destination_label_canonical, destination_key, confidence_status, first_seen_date, last_seen_date, usage_count, note

กลุ่ม 3: Fact / Transaction (1 ชีต)
ชีตบทบาทคอลัมน์ (31 คอลัมน์)FACT_DELIVERYบันทึกธุรกรรมที่สะอาดแล้ว พร้อมใช้งานtx_id, source_sheet, source_row_number, source_record_id, delivery_date, delivery_time, shipment_no, invoice_no, raw_owner_name, raw_person_name, raw_system_address, raw_geo_resolved_address, raw_geo_text, lat, lng, person_id, place_id, geo_id, destination_id, warehouse, distance_km, driver_name, employee_id, employee_email, license_plate, validation_result, anomaly_reason, review_status, sync_status, created_at, updated_at

กลุ่ม 4: Queue / Review (1 ชีต)
ชีตบทบาทคอลัมน์ (22 คอลัมน์)Q_REVIEWคิวรอการตัดสินใจจากมนุษย์review_id, issue_type, source_record_id, source_row_number, invoice_no, raw_person_name, raw_place_name, raw_system_address, raw_geo_resolved_address, raw_lat, raw_long, candidate_person_ids, candidate_place_ids, candidate_geo_ids, candidate_destination_ids, score, recommended_action, status, reviewer, reviewed_at, decision, note

กลุ่ม 5: System / Config (4 ชีต)
ชีตบทบาทคอลัมน์SYS_CONFIGค่าตั้งค่าทั้งหมดของระบบconfig_key, config_value, config_group, description, updated_atSYS_LOGบันทึก Log ทุก Eventlog_id, run_id, created_at, level, module_name, function_name, ref_id, message, payload_jsonSYS_TH_GEOพจนานุกรมตำบล/อำเภอ/จังหวัดไทย(A)รหัสไปรษณีย์, (B)แขวง/ตำบล, (C)เขต/อำเภอ, (D)จังหวัด, (E)หมายเหตุ, (F)postcode_text, (G)subdistrict_norm, (H)district_norm, (I)province_norm, (J)note_type, (K)note_keywords, (L)postcode_override, (M)geo_key, (N)active_flagRPT_DATA_QUALITYรายงานสุขภาพข้อมูลรายวันreport_date, total_source_rows, processed_rows, new_person_count, new_place_count, new_geo_count, new_destination_count, auto_match_count, review_count, duplicate_alert_count, error_count, last_refresh_atMAPS_CACHECache Google Maps API (ประหยัด Quota)cache_key, cache_value, cache_type, raw_input, updated_at

📁 โมดูลโค้ดทั้งหมด (17 ไฟล์) พร้อมฟังก์ชันครบ
00_App.gs — Entry Point & Orchestrator
ฟังก์ชันหน้าที่onOpen()สร้างเมนู LMDS ใน Google SheetsrunInitialSetup()ติดตั้งระบบครั้งแรก (เรียก Setup + Config + Dropdown)runDailyProcess()Loop หลัก อ่าน → Match → Auto/Review → บันทึก พร้อม Safety Watch 5 นาทีreprocessSelectedRows()รีเซ็ต SYNC_STATUS ของแถวที่เลือก แล้วรันใหม่onEdit(e)Trigger: เมื่อ Admin เลือก Decision ใน Q_REVIEW → เรียก applyReviewDecision() ทันที

01_Config.gs — Configuration Manager
ฟังก์ชันหน้าที่getConfig(key)ดึงค่า Config 1 ค่า (มี Cache + Default fallback)getAllConfigs()โหลด Config ทั้งหมดจากชีตครั้งเดียว (RAM Cache)setConfig(key, value)อัปเดตค่า Config ลงชีต + update CachegetThresholds()คืนค่า {autoMatchScore, reviewScoreMin, geoRadiusMeter} เป็นตัวเลขgetSheetNames()คืนชื่อชีตทุกชีตในระบบ (Single Source of Truth)

02_Schema.gs — Schema Validator
ฟังก์ชันหน้าที่validateSourceSchema()ตรวจว่าชีตดิบมีคอลัมน์ครบ ≥35 คอลัมน์ และมี Required Columns ครบensureSystemSheets()ตรวจว่าชีตระบบทุกตัวมีอยู่จริงgetSourceColumnMap()สร้าง Map {ชื่อหัว: index} จากชีตดิบ (มี Cache) พร้อม Auto-create SYNC_STATUSassertRequiredColumns(headers, requiredCols)ตรวจว่า headers มีคอลัมน์ที่กำหนดครบ ไม่งั้น throw Error

03_SetupSheets.gs — Sheet Builder
ฟังก์ชันหน้าที่createSystemSheets()สร้างชีตระบบทั้งหมด 12 ชีต พร้อม Header และ FormatseedInitialConfig()เพิ่มค่า Config เริ่มต้น (Score Threshold, Radius, Max Rows)

04_SourceRepository.gs — Raw Data Reader
ฟังก์ชันหน้าที่getSourceRows()ดึงข้อมูลทั้งหมดจากชีตดิบgetUnprocessedSourceRows()กรองเฉพาะแถวที่ SYNC_STATUS ไม่ใช่ SUCCESS/REVIEW/ERROR/IGNOREmapRowToSourceObject(rowArr, rowNumber)แปลง array ของแถวเป็น Object ที่มีชื่อ field ชัดเจนmarkSourceRowProcessed(rowNumber, status)อัปเดต SYNC_STATUSupdateSourceSyncStatus(rowNumber, status)เขียนค่าลงชีตโดยตรง

05_NormalizeService.gs — Data Cleaning Engine
ฟังก์ชันหน้าที่normalizeThaiText(text)ล้างช่องว่าง + NFC UnicodenormalizePersonName(name)ตัด Prefix (นาย/นาง/คุณ/ช่าง ฯลฯ) + ลบเบอร์โทรออกnormalizePlaceName(name)ลบ "ร้าน", "สาขาXX" ออกnormalizeAddress(address)แปลง ตำบล→ต. อำเภอ→อ. + Auto-fill จาก SYS_TH_GEOanalyzeGeoWarning(address)ตรวจพิกัดพิเศษ (ONLY_BUILDING, EXCEPT_RULE ฯลฯ) → คืน Warning TextextractPhoneNumbers(text)Regex สกัดเบอร์โทร 9-10 หลักsmartMergeAddress(rawAddr, geoAddr)รวมข้อมูลจาก 2 แหล่ง เลือกส่วนดีที่สุดของแต่ละฝั่งcleanAddressRedundancy(addr)ลบคำซ้ำ (เขตเขต, ต.ตำบล, จ.จ. ฯลฯ)validatePostcodeOverride(address)เช็คว่าต้องเปลี่ยนรหัสไปรษณีย์ไหมnormalizeLatLong(lat, lng)ปัดทศนิยม 5 ตำแหน่งbuildGeoKeys(lat, lng)สร้าง key4/key3/key2 สำหรับ Geo lookupbuildFingerprint(dataObj)สร้าง Hash 32-bit จาก ObjectloadThGeo()โหลดพจนานุกรม SYS_TH_GEO ลง RAM Cache

06_PersonService.gs — Person MDM
ฟังก์ชันหน้าที่resolvePerson(sourceObj)หัวใจหลัก: ค้นหา Person → ให้คะแนน → ตัดสินใจ (Auto/Review/New)findPersonCandidates(normName, phone)ค้นหาจาก M_PERSON (Phone Match ก่อน) + M_PERSON_ALIASscorePersonCandidate(inputNorm, candidateNorm)คะแนน = Dice×80% + LengthRatio×20%createPerson(canonicalName, normName, phone)สร้าง Master Person ใหม่ + Auto AliascreatePersonAlias(personId, aliasRaw, aliasNormalized)เพิ่ม Alias ให้ Person ที่มีอยู่แล้วupdatePersonStats(personId)(Stub) สำหรับอัปเดตสถิติการใช้งาน

07_PlaceService.gs — Place MDM
ฟังก์ชันหน้าที่resolvePlace(sourceObj)หัวใจหลัก: ค้นหา Place จาก addr1 และ addr2 → เลือกผลที่ดีกว่าfindBestMatch(rawAddress)ห่อ normalize + findCandidates + score ให้สะดวกfindPlaceCandidates(normPlace)ค้นหาจาก M_PLACE_ALIAS (substring match)scorePlaceCandidate(inputNorm, candidateNorm)คะแนน = Dice×80% + LengthRatio×20%createPlace(canonicalPlaceName, addressRaw, geoAddr)สร้าง Master Place + Auto Alias (2 ตัว)createPlaceAlias(placeId, aliasRaw, aliasNormalized)เพิ่ม Alias ให้ Place

08_GeoService.gs — Geo MDM
ฟังก์ชันหน้าที่resolveGeo(sourceObj)หัวใจหลัก: ตรวจพิกัด → Haversine Distance → ถ้า ≤50m ถือว่าจุดเดิมfindGeoCandidates(lat, lng, keys)ค้นหาพิกัดใน M_GEO_POINT ที่อยู่ใน ±0.01° (กรองเบื้องต้น)createGeoPoint(lat, lng, keys, addressHint)สร้าง Geo Point ใหม่ใน M_GEO_POINT

09_DestinationService.gs — Destination Composer
ฟังก์ชันหน้าที่buildDestinationKey(personId, placeId, geoId)สร้าง Composite Key `PER-XXresolveDestination(personId, placeId, geoId, sourceObj)หา Destination ที่มีอยู่ หรือสร้างใหม่createDestination(personId, placeId, geoId, label, destKey)เขียน M_DESTINATIONupdateDestinationStats(destinationId)(Stub)

10_MatchEngine.gs — Decision Brain
ฟังก์ชันหน้าที่matchAllEntities(sourceObj)Orchestrator: เรียก resolve ทั้ง 3 → สร้างถ้าใหม่ → รวมคะแนน → resolve DestinationcalculateCompositeScore(pScore, plScore, gScore, autoCreatedCount, bonusScore)น้ำหนัก: Geo 45%, Person 30%, Place 25%decideAutoMatchOrReview(matchResult)ตัดสิน: AUTO_MATCH หรือ REVIEWbuildReviewPayload(sourceObj, matchResult)สร้าง Object สำหรับส่งเข้า Q_REVIEWdetectConflictType(matchResult)แยกประเภทปัญหา (8 ประเภท) เช่น SAME_GEO_DIFF_PERSONevaluateThaiGeoBonus(sourceObj)ให้ Bonus +15 ถ้าตำบลใน rawAddr ตรงกับ geoAddr

11_TransactionService.gs — Fact Writer
ฟังก์ชันหน้าที่buildFactRow(sourceObj, matchResult)สร้าง Array 31 คอลัมน์สำหรับ FACT_DELIVERYupsertFactDelivery(factRowArray)เขียนลง FACT_DELIVERY (ป้องกัน Duplicate)preventDuplicateTransaction(sourceRecordId)ตรวจว่า ID นี้เคย Sync แล้วหรือยัง

12_ReviewService.gs — Human-in-the-Loop
ฟังก์ชันหน้าที่enqueueReview(payload)เพิ่มรายการเข้า Q_REVIEWsetupReviewDropdown()สร้าง Data Validation Dropdown ใน Q_REVIEW คอลัมน์ UgetPendingReviews()ดึงรายการ PENDING ทั้งหมดapplyReviewDecision(reviewId, decision, selectedPersonId)ประมวลผล Decision (CREATE_NEW / MERGE / IGNORE) + อัปเดตกลับ

13_ReportService.gs — Data Quality Monitor
ฟังก์ชันหน้าที่refreshQualityReport()นับสถิติทุกชีต → บันทึกลง RPT_DATA_QUALITYbuildDailySummary()(Stub) เผื่อส่ง LINE Notify หรือ Email สรุป

14_Utils.gs — Toolkit
ฟังก์ชันหน้าที่uuid()สร้าง UUID v4safeTrim(value)Trim ปลอดภัยsafeString(value)แปลงเป็น String ปลอดภัยsafeNumber(value)แปลงเป็นตัวเลข ถ้า NaN คืน 0safeDate(value)แปลงเป็น Date ถ้าไม่ได้คืน nullformatTime(value)Format เวลาเป็น HH:mm:sswriteLog(level, module, fn, refId, msg, payload)บันทึก Log ลง SYS_LOGhaversineDistanceMeters(lat1,lon1,lat2,lon2)คำนวณระยะทาง GPS (เมตร)diceCoefficient(s1, s2)ความเหมือน 2 String (Bigram, 0-1)lengthRatio(s1, s2)สัดส่วนความยาว (0-1)saveCheckpoint(rowNumber)บันทึก Progress ลง ScriptPropertiesgetCheckpoint()ดึง Checkpoint ล่าสุดclearCheckpoint()ล้าง CheckpointisTimeNearLimit(startTime, limitMs)ตรวจเวลาป้องกัน TimeoutupdateRunStatus(status, message)อัปเดตสถานะลง SYS_CONFIGshowAutoCloseAlert(message, seconds)แสดง Popup นับถอยหลังแล้วปิดเอง

15_GoogleMapsAPI.gs — Maps Cache System
ฟังก์ชันหน้าที่md5(key)สร้าง MD5 Hash เป็น Cache KeygetAdvancedCache(key)อ่าน Cache (RAM → Sheet)setAdvancedCache(key, value, type)เขียน Cache (RAM + Sheet)GOOGLEMAPS_DISTANCE(origin, dest, mode)ดึงระยะทางจาก Google MapsGOOGLEMAPS_REVERSEGEOCODE(lat, lng)แปลงพิกัด → ที่อยู่ข้อความGOOGLEMAPS_LATLONG(address)แปลงที่อยู่ → พิกัดGOOGLEMAPS_DURATION(origin, dest, mode)ดึงเวลาเดินทาง

16_GeoDictionaryBuilder.gs — SYS_TH_GEO Builder
ฟังก์ชันหน้าที่buildGeoIndex()อ่าน A-E → Parse → เขียน F-N ของ SYS_TH_GEOparseRemarkLogic(remark)แปลง Text หมายเหตุ → {noteType, keywords, override} รองรับ 4 Pattern

🔴 จุดที่ระบบยังขาด / ควรเพิ่ม (Gap Analysis)
Gap ที่พบ:
1. runNightlyMaintenance() — อยู่ในเมนูแต่ไม่มีโค้ด
เมนูข้อ 5 เรียก runNightlyMaintenance() แต่ยังไม่ถูก implement
2. updatePersonStats() และ updateDestinationStats() — เป็น Stub ว่าง
ควร implement จริงเพื่ออัปเดต usage_count และ last_seen_date
3. ไม่มี M_GEO_POINT ใน createGeoPoint() — ตรวจโค้ดพบว่า keys ที่ส่งเข้า createGeoPoint() มี keys.lat และ keys.lng แต่ใน buildGeoKeys() คืนค่าเป็น key4, key3, key2 ไม่มี lat/lng โดยตรง → Bug ที่ต้องแก้
4. preventDuplicateTransaction() ใช้ source_record_id = idScg แต่ idScg มาจากคอลัมน์ ID_SCGนครหลวงJWDภูมิภาค ซึ่งอาจว่างเปล่าบางแถว → ควร fallback เป็น invoiceNo + deliveryDate
5. ไม่มี Batch Write — ทุก appendRow() เขียนทีละแถว ถ้าข้อมูลเยอะจะช้ามาก ควรสะสม rows แล้ว setValues() ครั้งเดียวตอนท้าย

ต้องการให้ผมเริ่มแก้ Bug หรือเพิ่ม Feature ไหนก่อนครับ? แนะนำให้เริ่มจาก Bug #3 (createGeoPoint keys mismatch) และ Gap #1 (runNightlyMaintenance) เพราะกระทบการทำงานโดยตรงครับ 🔧You said: ข้อมูลที่ได้มา ทั้งชื่อบุคคล ทั้งชื่อสถานที่ มันมาแบบมั่วๆ ครบบ้าง ไม่ครบบ้าง ตัดคำมามั่วๆครับ ทำมาแบบไม่ใส่ใจ ให้สูตรตัดคำแต่ไม่ตรวจสอบ ผมจึงอยากจะพัฒนาระบบเอ…ข้อมูลที่ได้มา ทั้งชื่อบุคคล ทั้งชื่อสถานที่ มันมาแบบมั่วๆ ครบบ้าง ไม่ครบบ้าง ตัดคำมามั่วๆครับ ทำมาแบบไม่ใส่ใจ ให้สูตรตัดคำแต่ไม่ตรวจสอบ ผมจึงอยากจะพัฒนาระบบเอง แค่ข้อมูลที่ได้มามัน ไม่ดีเท่าไหร่ครับ  จึงอยากจะเน้นย้ำเรื่องตรงนี้แหละ11:45Claude responded: 🔍 GEM — Data Quality Deep Dive Analysis🔍 GEM — Data Quality Deep Dive Analysis
เข้าใจปัญหาชัดเจนครับ นี่คือปัญหาคลาสสิก "Garbage In → Garbage Out" ขอวิเคราะห์ให้ละเอียดก่อนลงมือแก้โค้ดครับ

🧩 แผนที่ปัญหาจริงๆ ที่เกิดขึ้น
ปัญหากลุ่ม A: ชื่อบุคคล (ชื่อปลายทาง)
ข้อมูลจริงที่อาจเข้ามา → คนเดียวกันทั้งหมด

"สมชาย"
"คุณสมชาย"  
"ช่างสมชาย"
"นายสมชาย วงศ์ดี"
"สมชาย วงดี"          ← ตัวสะกดผิด
"สมชาย 0891234567"    ← มีเบอร์ติดมา
"ร้านสมชาย วัสดุ"     ← มีชื่อร้านปน
"สมชาย/วัสดุภัณฑ์"    ← มี slash คั่น
"smchai"               ← พิมพ์อังกฤษ (หายากแต่มี)
ปัญหากลุ่ม B: ที่อยู่ (ที่อยู่ปลายทาง)
ข้อมูลจริงที่อาจเข้ามา → ที่เดียวกันทั้งหมด

"123 ถ.สุขุมวิท"
"123 ถนนสุขุมวิท แขวงคลองเตย"
"ถ.สุขุมวิท 123 คลองเตย กรุงเทพ"
"สุขุมวิท เขตคลองเตย กทม 10110"
"คลองเตย กรุงเทพมหานคร"         ← ขาดเลขที่
"10110"                           ← มีแค่รหัสไปรษณีย์
"ใกล้ BTS อโศก"                  ← อธิบายสถานที่แบบปากเปล่า
ปัญหากลุ่ม C: ความขัดแย้งระหว่าง Field
กรณีที่ 1: ชื่อเหมือน แต่พิกัดต่าง
  ชื่อ = "ร้านสมชาย"  LAT/LONG = 13.7563, 100.5018  ← กรุงเทพ
  ชื่อ = "ร้านสมชาย"  LAT/LONG = 14.9965, 102.1147  ← โคราช
  → อาจเป็นคนละร้าน หรือพิกัดผิด → ต้องให้คนตัดสิน

กรณีที่ 2: พิกัดเหมือน แต่ชื่อต่าง
  ชื่อ = "บริษัท ABC"  LAT/LONG = 13.7234, 100.4125
  ชื่อ = "นายกวี"      LAT/LONG = 13.7235, 100.4126  ← ห่างกัน ~15 เมตร
  → อาจเป็นคนละคนที่อยู่บริษัทเดียวกัน หรือเป็นคนเดียวกัน

🏗️ Architecture ที่ต้องเสริม: "Data Trust Pipeline"
ปัญหาหลักคือ ระบบเดิมขาด Layer กรองก่อนเข้า Master ผมเสนอ Pipeline ใหม่แบบนี้:
Raw Input
    │
    ▼
┌─────────────────────────────┐
│  LAYER 1: SANITIZE          │  ← ล้างขยะออกก่อน
│  - ตัด/แทน Symbol พิเศษ    │    (ยังไม่มีใน V4.4)
│  - ตรวจ encoding ผิด        │
│  - ตรวจ length ผิดปกติ      │
└─────────────────────────────┘
    │
    ▼
┌─────────────────────────────┐
│  LAYER 2: NORMALIZE         │  ← ทำให้เป็นมาตรฐาน
│  - normalizePersonName()    │    (มีแล้ว แต่ไม่ครบ)
│  - normalizeAddress()       │
│  - normalizeLatLong()       │
└─────────────────────────────┘
    │
    ▼
┌─────────────────────────────┐
│  LAYER 3: ENRICH            │  ← เติมข้อมูลที่ขาด
│  - ดึง subdistrict จาก Geo  │    (มีบางส่วน)
│  - เติมจังหวัดจาก Postcode  │
│  - แยก Phone ออกจากชื่อ    │
└─────────────────────────────┘
    │
    ▼
┌─────────────────────────────┐
│  LAYER 4: VALIDATE          │  ← ตรวจสอบความสมเหตุสมผล
│  - LAT/LONG อยู่ในประเทศไทย│    (ยังไม่มีเลย!)
│  - ชื่อสั้นเกินไปไหม       │
│  - ที่อยู่กับพิกัดตรงกันไหม│
└─────────────────────────────┘
    │
    ▼
┌─────────────────────────────┐
│  LAYER 5: MATCH & DECIDE    │  ← ตัดสินใจ (มีแล้ว)
│  - resolvePerson()          │
│  - resolvePlace()           │
│  - resolveGeo()             │
└─────────────────────────────┘
    │
    ▼
  AUTO_MATCH / REVIEW / NEW

🚨 Gap ที่วิกฤตที่สุดที่ต้องเพิ่มใน 05_NormalizeService.gs
สิ่งที่ขาดอยู่ทั้งหมด:
javascript// ❌ ยังไม่มีใน V4.4 ทั้งหมดนี้

// 1. ตรวจ LAT/LONG อยู่ในประเทศไทยจริงไหม
function isValidThaiCoordinate(lat, lng) { ... }

// 2. ตรวจชื่อสั้นเกินไป / เป็นแค่ตัวเลข / เป็นสัญลักษณ์
function assessNameQuality(name) { ... }

// 3. แปลง Transliteration คร่าวๆ (smchai → สมชาย ยาก แต่ตรวจจับได้)
function detectNonThaiName(name) { ... }

// 4. ตรวจว่าที่อยู่กับพิกัดอยู่จังหวัดเดียวกันไหม
function crossValidateAddressAndGeo(address, lat, lng) { ... }

// 5. แยกชื่อร้านออกจากชื่อคน
function separateShopNameFromPersonName(rawName) { ... }

// 6. ตรวจ Pattern เบอร์โทรที่หลากหลายกว่าเดิม
function extractAllContactInfo(text) { ... }

// 7. คำนวณ "Data Completeness Score" ของแต่ละแถว
function calculateRowCompleteness(sourceObj) { ... }

// 8. Flag แถวที่น่าสงสัยก่อนเข้า Match Engine
function preValidateSourceRow(sourceObj) { ... }

📋 แผนการแก้ไขที่แนะนำ (Priority Order)
🔴 Priority 1 — แก้ทันที (Bug / Data Loss Risk)
#สิ่งที่ต้องทำไฟล์ที่แก้เหตุผล1Fix createGeoPoint() — keys.lat/lng ไม่มีจริง08_GeoService.gsBug ทำให้บันทึก Geo ผิด2เพิ่ม isValidThaiCoordinate()05_NormalizeService.gsป้องกัน LAT/LONG ขยะเข้า Master3เพิ่ม preValidateSourceRow()05_NormalizeService.gsกรองแถวขยะก่อนทุก Process
🟡 Priority 2 — เพิ่มภายใน 1 สัปดาห์
#สิ่งที่ต้องทำไฟล์ที่แก้เหตุผล4เพิ่ม assessNameQuality()05_NormalizeService.gsจับชื่อ 1 ตัวอักษร / ตัวเลขล้วน5เพิ่ม separateShopNameFromPersonName()05_NormalizeService.gsแยก "ร้านสมชาย" → person="สมชาย"6เพิ่ม calculateRowCompleteness()05_NormalizeService.gsคะแนนความสมบูรณ์ต่อแถว7Implement runNightlyMaintenance()00_App.gsเมนูมีแต่ไม่มีโค้ด
🟢 Priority 3 — เพิ่มระยะยาว
#สิ่งที่ต้องทำไฟล์ใหม่เหตุผล817_DataQualityService.gsไฟล์ใหม่รวม Validation Logic ทั้งหมด9Batch Write Buffer11_TransactionService.gsเพิ่มความเร็ว 10x10updatePersonStats() จริงๆ06_PersonService.gsStub ว่างอยู่

🎯 คำถามก่อนลงมือเขียนโค้ด
ขอให้คุณตอบ 3 ข้อนี้เพื่อให้โค้ดที่เขียนออกมาตรงกับข้อมูลจริงครับ:
ข้อ 1: ชื่อบุคคลในข้อมูลจริง มีภาษาอังกฤษปนไหมครับ? (เช่น "John", "Mr.Smith") หรือเป็นภาษาไทยล้วน?
ข้อ 2: ที่อยู่ที่ได้มา โดยส่วนใหญ่สั้นแค่ไหนครับ? เช่น มีแค่ชื่อตำบล/อำเภอ หรือมีเลขที่บ้านด้วย?
ข้อ 3: LAT/LONG ที่ได้มามีกรณีค่าผิดปกติบ้างไหมครับ? เช่น 0,0 หรือพิกัดต่างประเทศ หรือสลับ lat/lng กัน?
คำตอบเหล่านี้จะช่วยให้ผมเขียน Validation Logic ได้แม่นยำที่สุดครับ 🎯You said: ข้อ 1 ส่วนมากภาษาไทย 95%ข้อ 1 ส่วนมากภาษาไทย 95%
ข้อ 2 ตอบไม่ได้มั่วมาก
ข้อ 3 ไม่มี100% คอลัมน์ `ชื่อที่อยู่จาก_LatLong`
### ความหมาย
คือ **ชื่อสถานที่อยู่แบบข้อความ**  
ที่ถูกแปลงมาจากคอลัมน์ `จุดส่งสินค้าปลายทาง` โดยใช้ script

พูดให้ตรงคือ มันเป็นผลของ **reverse geocoding**

### ความแตกต่างจาก `ที่อยู่ปลายทาง`
สองคอลัมน์นี้คนชอบสับสนมาก จึงต้องแยกให้ชัด:

#### `ที่อยู่ปลายทาง`
- มาจากระบบเดิม
- เป็นข้อความที่ระบบต้นทางให้มา
- มั่วได้มาก

#### `ชื่อที่อยู่จาก_LatLong`
- มาจากพิกัดจริง
- ระบบแปลงจาก LatLong เป็นข้อความ
- โดยทั่วไปน่าเชื่อถือกว่าในเชิงตำแหน่ง
- แต่บางครั้ง wording อาจไม่ตรงภาษาคนใช้งานจริง

### สถานะความน่าเชื่อถือ
โดยทั่วไปถือว่า **น่าเชื่อถือมากกว่า `ที่อยู่ปลายทาง`**
ในฐานะ “ข้อความที่สะท้อนตำแหน่งจริง”

### บทบาทในระบบ
คอลัมน์นี้สำคัญมาก เพราะควรใช้เป็น:

- ตัวช่วย normalize สถานที่
- ตัวช่วยเทียบกับ `SYS_TH_GEO`
- ตัวช่วยเช็คอำเภอ/ตำบล/จังหวัด
- ตัวช่วยแยกสาขา
- ตัวช่วยตรวจว่าที่อยู่จากระบบเดิมเพี้ยนแค่ไหน

### สรุปสั้น
คอลัมน์นี้คือ **“ที่อยู่ข้อความที่สร้างจากพิกัดจริง”**Show more12:02Claude responded: 🔍 GEM — Pre-Code Analysis: Data Trust Strategy🔍 GEM — Pre-Code Analysis: Data Trust Strategy
เข้าใจครบแล้วครับ สรุปสิ่งที่รู้แน่ๆ ก่อนเขียนโค้ด:
✅ LAT/LONG = เชื่อถือได้ 100% (ไม่มีขยะ)
✅ ชื่อที่อยู่จาก_LatLong = น่าเชื่อถือสูง (reverse geocode จากพิกัดจริง)
⚠️  ที่อยู่ปลายทาง = มั่ว ใช้เสริมเท่านั้น
⚠️  ชื่อปลายทาง = มั่ว ต้อง normalize หนัก
ดังนั้น Strategy หลัก คือ:

ใช้ ชื่อที่อยู่จาก_LatLong เป็น Ground Truth ของที่อยู่ แล้วค่อยเทียบกับ ที่อยู่ปลายทาง ว่าเพี้ยนแค่ไหน


🏗️ สิ่งที่จะเพิ่มใน 05_NormalizeService.gs
ก่อนเขียน ขอให้คุณยืนยัน Scope ที่จะทำใน Version นี้ครับ:ได้รับคำตอบครับ — คุณเลือกทุกตัวเลย แสดงว่าต้องการระบบที่แน่นที่สุดครับ ผมจะเขียนโค้ดเต็มทั้ง 2 ไฟล์ให้เลยครับ

[1] 🔍 CHANGE LOG
ไฟล์ที่แก้ไข: 05_NormalizeService.gs (เพิ่มฟังก์ชันใหม่ 8 ตัว)
ไฟล์ที่ได้รับผลกระทบ: 10_MatchEngine.gs (เรียก preValidate ก่อน matchAllEntities), 00_App.gs (loop หลัก)
ฟังก์ชันที่เพิ่ม:

preValidateSourceRow() — ประตูด่านแรก ตรวจทุก field ก่อน process
assessNameQuality() — ตรวจชื่อแปลก/สั้น/ตัวเลขล้วน
separateShopNameFromPersonName() — แยกชื่อร้านออกจากชื่อคน
calculateRowCompleteness() — คะแนนความสมบูรณ์ 0-100
compareAddressVsGeoAddress() — เทียบ 2 แหล่งที่อยู่
extractProvinceFromGeoAddress() — ดึงจังหวัด/อำเภอจาก reverse geocode text
detectAddressProvinceMismatch() — แจ้งเตือนถ้า field ขัดแย้งกัน
scoreAddressReliability() — คะแนนน่าเชื่อถือของที่อยู่แต่ละแหล่ง


[2] 🔗 IMPACT ASSESSMENT
preValidateSourceRow()
  └── เรียกโดย: 00_App.gs → runDailyProcess() loop
  └── ถ้า SKIP → markSourceRowProcessed(row, 'ERROR') ทันที ไม่เข้า matchAllEntities

assessNameQuality()
  └── เรียกโดย: preValidateSourceRow()
  └── ส่งผลต่อ: คะแนน completeness, decision ว่า SKIP หรือ REVIEW

separateShopNameFromPersonName()
  └── เรียกโดย: 06_PersonService.gs → resolvePerson() (ต้องเพิ่ม call)
  └── Output: { personName, shopName, hasShop }

compareAddressVsGeoAddress()
  └── เรียกโดย: preValidateSourceRow()
  └── ส่งผลต่อ: note ใน Q_REVIEW payload

detectAddressProvinceMismatch()
  └── เรียกโดย: preValidateSourceRow()
  └── ถ้าเจอ mismatch → บังคับส่ง REVIEW + Warning ใน note

[3] 💻 FULL CODE
ไฟล์ที่ 1: 05_NormalizeService.gs (ส่วนที่เพิ่มใหม่ — ต่อท้ายไฟล์เดิม)Checking skillChecking skillโค้ดด้านล่างนี้เพิ่มต่อท้าย 05_NormalizeService.gs เดิมได้เลยครับ:
javascript// ============================================================
// 05_NormalizeService.gs — EXTENSION V4.5
// Data Trust & Validation Layer (เพิ่มใหม่)
// ============================================================

/**
 * [LAYER 1] ประตูด่านแรก — ตรวจสอบแถวทั้งหมดก่อนเข้าระบบ
 * เรียกจาก runDailyProcess() ก่อน matchAllEntities() ทุกครั้ง
 *
 * @param {Object} sourceObj - Object จาก mapRowToSourceObject()
 * @returns {Object} { isValid, skipReason, warnings[], completeness }
 */
function preValidateSourceRow(sourceObj) {
  const warnings = [];
  let skipReason = null;

  // --- ตรวจ 1: ข้อมูล Critical ต้องมีอย่างน้อย 1 ใน 3 ---
  const hasName = sourceObj.destinationNameRaw && sourceObj.destinationNameRaw.trim().length > 0;
  const hasLatLng = sourceObj.latRaw && sourceObj.longRaw &&
                    sourceObj.latRaw !== 0 && sourceObj.longRaw !== 0;
  const hasAddress = sourceObj.addressRaw && sourceObj.addressRaw.trim().length > 0;

  if (!hasName && !hasLatLng && !hasAddress) {
    skipReason = 'EMPTY_ROW: ไม่มีชื่อ, พิกัด, หรือที่อยู่เลย';
    return { isValid: false, skipReason, warnings, completeness: 0 };
  }

  // --- ตรวจ 2: คุณภาพชื่อบุคคล ---
  if (hasName) {
    const nameQuality = assessNameQuality(sourceObj.destinationNameRaw);
    if (nameQuality.level === 'JUNK') {
      skipReason = 'JUNK_NAME: ชื่อเป็นขยะ — ' + nameQuality.reason;
      return { isValid: false, skipReason, warnings, completeness: 0 };
    }
    if (nameQuality.level === 'POOR') {
      warnings.push('⚠️ ชื่อบุคคลคุณภาพต่ำ: ' + nameQuality.reason);
    }
  }

  // --- ตรวจ 3: ที่อยู่กับพิกัดขัดแย้งกันไหม ---
  if (hasAddress && hasLatLng && sourceObj.addressFromLatLong) {
    const mismatch = detectAddressProvinceMismatch(
      sourceObj.addressRaw,
      sourceObj.addressFromLatLong
    );
    if (mismatch.hasMismatch) {
      warnings.push('🚨 จังหวัดในที่อยู่ไม่ตรงกับพิกัด: ' + mismatch.detail);
    }
  }

  // --- ตรวจ 4: เปรียบเทียบ 2 แหล่งที่อยู่ ---
  if (hasAddress && sourceObj.addressFromLatLong) {
    const addrCompare = compareAddressVsGeoAddress(
      sourceObj.addressRaw,
      sourceObj.addressFromLatLong
    );
    if (addrCompare.divergenceLevel === 'HIGH') {
      warnings.push('📍 ที่อยู่จากระบบกับจาก LatLong แตกต่างกันมาก (score=' + addrCompare.similarityScore + ')');
    }
  }

  // --- ตรวจ 5: คำนวณ Completeness Score ---
  const completeness = calculateRowCompleteness(sourceObj);
  if (completeness < 30) {
    warnings.push('📋 ข้อมูลไม่ครบ (completeness=' + completeness + '%)');
  }

  return {
    isValid: true,
    skipReason: null,
    warnings: warnings,
    completeness: completeness
  };
}

// ============================================================

/**
 * [LAYER 1] ตรวจคุณภาพชื่อบุคคล — จับชื่อแปลก/ขยะ/สั้นเกิน
 *
 * @param {string} name - ชื่อดิบจากระบบ
 * @returns {Object} { level: 'OK'|'POOR'|'JUNK', reason, cleanedHint }
 */
function assessNameQuality(name) {
  if (!name || name.trim() === '') {
    return { level: 'JUNK', reason: 'ชื่อว่างเปล่า', cleanedHint: '' };
  }

  const n = name.trim();

  // -- JUNK: ตัวเลขล้วน (เช่น "0891234567", "12345") --
  if (/^\d+$/.test(n)) {
    return { level: 'JUNK', reason: 'เป็นตัวเลขล้วน: ' + n, cleanedHint: '' };
  }

  // -- JUNK: สัญลักษณ์ล้วน (เช่น "---", "???", "///") --
  if (/^[^\u0E00-\u0E7Fa-zA-Z0-9]+$/.test(n)) {
    return { level: 'JUNK', reason: 'เป็นสัญลักษณ์ล้วน: ' + n, cleanedHint: '' };
  }

  // -- JUNK: สั้นเกินไป (1 ตัวอักษร ไม่นับช่องว่าง) --
  const letters = n.replace(/\s/g, '');
  if (letters.length <= 1) {
    return { level: 'JUNK', reason: 'ชื่อสั้นเกินไป (1 ตัวอักษร): ' + n, cleanedHint: '' };
  }

  // -- JUNK: Placeholder คำว่า N/A, -, ไม่มี, none --
  const junkPatterns = [/^[-_\s]+$/, /^n\/a$/i, /^ไม่มี$/, /^none$/i, /^null$/i, /^test$/i, /^xxx+$/i];
  for (const pat of junkPatterns) {
    if (pat.test(n)) {
      return { level: 'JUNK', reason: 'เป็น Placeholder: ' + n, cleanedHint: '' };
    }
  }

  // -- POOR: มีเบอร์โทรปนมากกว่า 50% ของตัวอักษร --
  const digits = n.replace(/[^\d]/g, '').length;
  const total = n.replace(/\s/g, '').length;
  if (digits > 0 && digits / total > 0.5) {
    return { level: 'POOR', reason: 'มีตัวเลขมากผิดปกติ (อาจเป็นเบอร์โทรล้วน): ' + n, cleanedHint: '' };
  }

  // -- POOR: ภาษาอังกฤษ 100% (ในระบบที่ควรเป็นไทย 95%) --
  const thaiChars = n.match(/[\u0E00-\u0E7F]/g);
  const engChars = n.match(/[a-zA-Z]/g);
  if (!thaiChars && engChars && engChars.length > 3) {
    return { level: 'POOR', reason: 'ชื่อเป็นอังกฤษล้วน (ระบบส่วนใหญ่ไทย): ' + n, cleanedHint: '' };
  }

  // -- POOR: สั้นมาก (2-3 ตัวอักษร) แต่ยังไม่ JUNK --
  if (letters.length <= 3) {
    return { level: 'POOR', reason: 'ชื่อสั้นมาก (' + letters.length + ' ตัวอักษร): ' + n, cleanedHint: n };
  }

  return { level: 'OK', reason: '', cleanedHint: n };
}

// ============================================================

/**
 * [LAYER 2] แยกชื่อร้าน/บริษัทออกจากชื่อบุคคล
 * ตัวอย่าง: "ร้านสมชาย วัสดุก่อสร้าง" → { personName:"สมชาย", shopName:"ร้านสมชาย วัสดุก่อสร้าง", hasShop:true }
 *
 * @param {string} rawName - ชื่อดิบจากระบบ
 * @returns {Object} { personName, shopName, hasShop, extractedType }
 */
function separateShopNameFromPersonName(rawName) {
  if (!rawName) return { personName: '', shopName: '', hasShop: false, extractedType: 'EMPTY' };

  let n = rawName.trim();
  let shopName = '';
  let personName = '';
  let hasShop = false;
  let extractedType = 'PERSON_ONLY';

  // -- Pattern 1: นำหน้าด้วย ร้าน / บจก. / บริษัท / หจก. / ห้าง --
  const shopPrefixes = [
    /^(ร้าน)\s*/,
    /^(บจก\.?\s*)/,
    /^(บริษัท)\s*/,
    /^(หจก\.?\s*)/,
    /^(ห้างหุ้นส่วน)\s*/,
    /^(ห้าง)\s*/,
    /^(กิจการ)\s*/,
    /^(สหกรณ์)\s*/,
  ];

  for (const prefix of shopPrefixes) {
    if (prefix.test(n)) {
      shopName = n; // เก็บชื่อร้านเต็มๆ
      // พยายามดึงชื่อคน: ตัด prefix แล้วเอาคำแรก
      const withoutPrefix = n.replace(prefix, '').trim();
      // คำแรกที่ไม่ใช่ชื่อธุรกิจ มักจะเป็นชื่อคน
      const firstWord = withoutPrefix.split(/[\s\/,]+/)[0];
      personName = firstWord || withoutPrefix;
      hasShop = true;
      extractedType = 'SHOP_WITH_PERSON';
      break;
    }
  }

  // -- Pattern 2: ชื่อตามด้วยคำบ่งชี้ร้าน เช่น "สมชาย วัสดุ", "สมชาย ก่อสร้าง" --
  if (!hasShop) {
    const shopSuffixWords = ['วัสดุ', 'ก่อสร้าง', 'การค้า', 'พาณิชย์', 'อุตสาหกรรม',
                              'เซอร์วิส', 'เทรดดิ้ง', 'ซัพพลาย', 'มาร์เก็ต', 'เซ็นเตอร์',
                              'ฮาร์ดแวร์', 'อิเล็กทรอนิกส์', 'ออโต้', 'มอเตอร์', 'โลจิสติกส์'];
    const words = n.split(/\s+/);
    if (words.length >= 2) {
      const lastWord = words[words.length - 1];
      if (shopSuffixWords.some(sw => lastWord.indexOf(sw) > -1 || n.indexOf(sw) > -1)) {
        shopName = n;
        personName = words[0]; // คำแรกมักเป็นชื่อคน
        hasShop = true;
        extractedType = 'PERSON_WITH_SHOP_SUFFIX';
      }
    }
  }

  // -- Pattern 3: มี slash คั่น เช่น "สมชาย/วัสดุภัณฑ์" --
  if (!hasShop && n.indexOf('/') > -1) {
    const parts = n.split('/');
    personName = parts[0].trim();
    shopName = parts[1] ? parts[1].trim() : '';
    hasShop = !!shopName;
    extractedType = hasShop ? 'SLASH_SEPARATED' : 'PERSON_ONLY';
  }

  // -- ถ้าไม่เจอ Pattern ไหนเลย ถือว่าเป็นชื่อคนล้วน --
  if (!hasShop) {
    personName = n;
  }

  return {
    personName: personName.trim(),
    shopName: shopName.trim(),
    hasShop: hasShop,
    extractedType: extractedType
  };
}

// ============================================================

/**
 * [LAYER 1] คำนวณ Completeness Score ของแต่ละแถว (0-100)
 * ใช้เป็นสัญญาณบอกว่าข้อมูลสมบูรณ์แค่ไหน
 *
 * Weight:
 *   LAT/LONG         = 35 คะแนน (สำคัญสุด เพราะเชื่อถือได้ 100%)
 *   ชื่อบุคคล       = 25 คะแนน
 *   ที่อยู่จาก Geo  = 20 คะแนน (reverse geocode)
 *   ที่อยู่จากระบบ = 10 คะแนน (มั่ว แต่ยังนับ)
 *   Invoice/Date     = 10 คะแนน (บริบทธุรกิจ)
 *
 * @param {Object} sourceObj
 * @returns {number} 0-100
 */
function calculateRowCompleteness(sourceObj) {
  let score = 0;

  // [35] LAT/LONG
  const hasLat = sourceObj.latRaw && safeNumber(sourceObj.latRaw) !== 0;
  const hasLng = sourceObj.longRaw && safeNumber(sourceObj.longRaw) !== 0;
  if (hasLat && hasLng) score += 35;
  else if (hasLat || hasLng) score += 10; // มีแค่ข้างเดียว

  // [25] ชื่อบุคคล
  if (sourceObj.destinationNameRaw && sourceObj.destinationNameRaw.trim().length > 0) {
    const q = assessNameQuality(sourceObj.destinationNameRaw);
    if (q.level === 'OK') score += 25;
    else if (q.level === 'POOR') score += 10;
    // JUNK = +0
  }

  // [20] ที่อยู่จาก LatLong (reverse geocode — เชื่อถือได้)
  if (sourceObj.addressFromLatLong && sourceObj.addressFromLatLong.trim().length > 5) {
    score += 20;
  }

  // [10] ที่อยู่จากระบบเดิม (มั่วได้ แต่นับ)
  if (sourceObj.addressRaw && sourceObj.addressRaw.trim().length > 5) {
    score += 10;
  }

  // [10] Invoice + วันที่ (บริบทธุรกิจ)
  if (sourceObj.invoiceNo && sourceObj.invoiceNo.trim().length > 0) score += 5;
  if (sourceObj.deliveryDate) score += 5;

  return Math.min(100, score);
}

// ============================================================

/**
 * [LAYER 3] เทียบความแตกต่างระหว่าง 2 แหล่งที่อยู่
 * ใช้ตรวจว่าที่อยู่จากระบบเก่าเพี้ยนจากพิกัดจริงมากแค่ไหน
 *
 * @param {string} systemAddress - จาก `ที่อยู่ปลายทาง`
 * @param {string} geoAddress    - จาก `ชื่อที่อยู่จาก_LatLong`
 * @returns {Object} { similarityScore, divergenceLevel, recommendation }
 */
function compareAddressVsGeoAddress(systemAddress, geoAddress) {
  if (!systemAddress || !geoAddress) {
    return { similarityScore: 0, divergenceLevel: 'UNKNOWN', recommendation: 'ข้อมูลไม่ครบสำหรับเปรียบเทียบ' };
  }

  const normSystem = normalizePlaceName(systemAddress);
  const normGeo = normalizePlaceName(geoAddress);

  // ดึงเฉพาะส่วนภูมิศาสตร์มาเทียบ (ตำบล อำเภอ จังหวัด)
  const geoPartsSystem = extractAdminParts(normSystem);
  const geoPartsGeo = extractAdminParts(normGeo);

  // คะแนน Dice ของ String เต็ม
  const fullSimilarity = Math.round(diceCoefficient(normSystem, normGeo) * 100);

  // คะแนนจากส่วนภูมิศาสตร์ (น้ำหนักมากกว่า)
  let geoPartScore = 0;
  if (geoPartsSystem.province && geoPartsGeo.province) {
    if (geoPartsSystem.province === geoPartsGeo.province) geoPartScore += 50;
  }
  if (geoPartsSystem.district && geoPartsGeo.district) {
    if (geoPartsSystem.district === geoPartsGeo.district) geoPartScore += 30;
  }
  if (geoPartsSystem.subdistrict && geoPartsGeo.subdistrict) {
    if (geoPartsSystem.subdistrict === geoPartsGeo.subdistrict) geoPartScore += 20;
  }

  // รวมคะแนน: 40% จาก Dice เต็ม + 60% จากส่วนภูมิศาสตร์
  const finalScore = Math.round((fullSimilarity * 0.4) + (geoPartScore * 0.6));

  let divergenceLevel, recommendation;
  if (finalScore >= 70) {
    divergenceLevel = 'LOW';
    recommendation = 'ใช้ข้อมูลจาก LatLong เป็นหลัก ที่อยู่จากระบบสอดคล้อง';
  } else if (finalScore >= 40) {
    divergenceLevel = 'MEDIUM';
    recommendation = 'ที่อยู่ต่างกันพอสมควร ให้ใช้ LatLong เป็นหลัก แต่ดูรายละเอียดจากระบบประกอบ';
  } else {
    divergenceLevel = 'HIGH';
    recommendation = '⚠️ ที่อยู่จากระบบกับพิกัดจริงต่างกันมาก — ควรส่ง REVIEW';
  }

  return { similarityScore: finalScore, divergenceLevel, recommendation };
}

// ============================================================

/**
 * [LAYER 3] ดึงส่วนภูมิศาสตร์ (จังหวัด/อำเภอ/ตำบล) จากข้อความที่อยู่
 * ใช้ทั้งรูปแบบเต็มและย่อ
 *
 * @param {string} address
 * @returns {Object} { province, district, subdistrict, postcode }
 */
function extractProvinceFromGeoAddress(address) {
  return extractAdminParts(address);
}

function extractAdminParts(address) {
  if (!address) return { province: '', district: '', subdistrict: '', postcode: '' };

  const n = address;
  const result = { province: '', district: '', subdistrict: '', postcode: '' };

  // -- จังหวัด --
  const provMatch = n.match(/(?:จังหวัด|จ\.)\s*([\u0E00-\u0E7F]+)/);
  if (provMatch) result.province = provMatch[1];
  // กรณีพิเศษ: กรุงเทพมหานคร / กรุงเทพฯ
  if (!result.province && (n.indexOf('กรุงเทพ') > -1)) result.province = 'กรุงเทพมหานคร';

  // -- อำเภอ/เขต --
  const distMatch = n.match(/(?:อำเภอ|เขต|อ\.)\s*([\u0E00-\u0E7F]+)/);
  if (distMatch) result.district = distMatch[1];

  // -- ตำบล/แขวง --
  const subMatch = n.match(/(?:ตำบล|แขวง|ต\.)\s*([\u0E00-\u0E7F]+)/);
  if (subMatch) result.subdistrict = subMatch[1];

  // -- รหัสไปรษณีย์ --
  const postcodeMatch = n.match(/\b(\d{5})\b/);
  if (postcodeMatch) result.postcode = postcodeMatch[1];

  return result;
}

// ============================================================

/**
 * [LAYER 4] ตรวจจังหวัดใน 2 แหล่งตรงกันไหม
 * ถ้าไม่ตรงกัน = สัญญาณอันตราย ที่อยู่หรือพิกัดอาจผิด
 *
 * @param {string} systemAddress - จาก `ที่อยู่ปลายทาง`
 * @param {string} geoAddress    - จาก `ชื่อที่อยู่จาก_LatLong`
 * @returns {Object} { hasMismatch, detail, systemProvince, geoProvince }
 */
function detectAddressProvinceMismatch(systemAddress, geoAddress) {
  if (!systemAddress || !geoAddress) {
    return { hasMismatch: false, detail: 'ข้อมูลไม่ครบ', systemProvince: '', geoProvince: '' };
  }

  const sysParts = extractAdminParts(normalizeAddress(systemAddress));
  const geoParts = extractAdminParts(normalizeAddress(geoAddress));

  // ถ้าดึงจังหวัดไม่ได้จากฝั่งใดฝั่งหนึ่ง → ตัดสินไม่ได้
  if (!sysParts.province || !geoParts.province) {
    return { hasMismatch: false, detail: 'ไม่พบจังหวัดในข้อมูลบางส่วน', systemProvince: sysParts.province, geoProvince: geoParts.province };
  }

  // เทียบจังหวัด (ตัดคำย่อ/ตัวสะกดต่าง)
  const sysProvNorm = sysParts.province.replace(/มหานคร|ฯ/g, '').trim();
  const geoProvNorm = geoParts.province.replace(/มหานคร|ฯ/g, '').trim();
  const sysProvScore = diceCoefficient(sysProvNorm, geoProvNorm);

  if (sysProvScore < 0.5) {
    return {
      hasMismatch: true,
      detail: `จังหวัดต่างกัน: ระบบบอก "${sysParts.province}" แต่พิกัดบอก "${geoParts.province}"`,
      systemProvince: sysParts.province,
      geoProvince: geoParts.province
    };
  }

  return { hasMismatch: false, detail: 'จังหวัดตรงกัน', systemProvince: sysParts.province, geoProvince: geoParts.province };
}

// ============================================================

/**
 * [LAYER 3] ให้คะแนนความน่าเชื่อถือของที่อยู่แต่ละแหล่ง
 * ใช้ประกอบการตัดสินใจใน resolvePlace()
 *
 * @param {string} address - ข้อความที่อยู่
 * @param {string} source  - 'SYSTEM' | 'GEO_REVERSE'
 * @returns {Object} { score, reasons[] }
 */
function scoreAddressReliability(address, source) {
  if (!address) return { score: 0, reasons: ['ที่อยู่ว่างเปล่า'] };

  let score = 0;
  const reasons = [];
  const n = normalizeAddress(address);

  // [+30] มีจังหวัดอยู่ในข้อความ
  const parts = extractAdminParts(n);
  if (parts.province) { score += 30; reasons.push('✅ มีจังหวัด: ' + parts.province); }

  // [+25] มีอำเภอ/เขต
  if (parts.district) { score += 25; reasons.push('✅ มีอำเภอ/เขต: ' + parts.district); }

  // [+20] มีตำบล/แขวง
  if (parts.subdistrict) { score += 20; reasons.push('✅ มีตำบล/แขวง: ' + parts.subdistrict); }

  // [+15] มีรหัสไปรษณีย์
  if (parts.postcode) { score += 15; reasons.push('✅ มีรหัสไปรษณีย์: ' + parts.postcode); }

  // [+10] มีเลขที่บ้านหรือถนน
  if (/\d+\/?\d*\s*(?:ถ\.|ถนน|หมู่|ซอย|ม\.)/.test(n) || /(?:ถ\.|ถนน|ซอย)/.test(n)) {
    score += 10;
    reasons.push('✅ มีเลขที่/ถนน/ซอย');
  }

  // Bonus: GEO_REVERSE ได้โบนัส +10 เพราะมาจากพิกัดจริง
  if (source === 'GEO_REVERSE') {
    score = Math.min(100, score + 10);
    reasons.push('🛰️ โบนัส: มาจาก reverse geocode พิกัดจริง');
  }

  return { score: Math.min(100, score), reasons };
}

ไฟล์ที่ 2: แก้ 00_App.gs — เพิ่ม preValidate เข้า Loop หลัก
แก้เฉพาะส่วน try ใน for loop ของ runDailyProcess() ครับ:
javascript// ใน runDailyProcess() → for loop → try block
// แทนที่ try block เดิมทั้งหมดด้วยนี้:

try {
  const sourceObj = mapRowToSourceObject(rowItem.rowData, rowItem.sourceIndex);

  // ══════════════════════════════════════════
  // [NEW V4.5] PRE-VALIDATION GATE
  // ตรวจสอบคุณภาพข้อมูลก่อนเข้า Match Engine
  // ══════════════════════════════════════════
  const validation = preValidateSourceRow(sourceObj);

  if (!validation.isValid) {
    // แถวขยะ → ข้ามทันที บันทึก Log
    markSourceRowProcessed(rowItem.sourceIndex, 'ERROR');
    writeLog('WARN', '00_App', 'runDailyProcess',
      `Row_${rowItem.sourceIndex}`,
      'PRE_VALIDATE_FAILED: ' + validation.skipReason,
      { completeness: validation.completeness }
    );
    errorCount++;
    continue;
  }

  // มี Warning → ติด Note ไว้ใน sourceObj เพื่อให้ buildReviewPayload() หยิบใช้
  sourceObj._validationWarnings = validation.warnings;
  sourceObj._completeness = validation.completeness;

  // ══════════════════════════════════════════
  // Match Engine (เดิม ไม่เปลี่ยน)
  // ══════════════════════════════════════════
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
  writeLog('ERROR', '00_App', 'runDailyProcess',
    `Row_${rowItem.sourceIndex}`, e.message, e.stack);
  errorCount++;
}
แก้ 10_MatchEngine.gs — ให้ buildReviewPayload() ใช้ Warning
javascript// ใน buildReviewPayload() → แก้ note ท้ายสุด
note: (validation_warnings ? validation_warnings.join('\n') + '\n' : '') +
      (analyzeGeoWarning(sourceObj.addressRaw) || '') +
      '\n💡 ที่อยู่แนะนำ: ' + smartMergeAddress(sourceObj.addressRaw, sourceObj.addressFromLatLong) +
      '\n📊 Completeness: ' + (sourceObj._completeness || '?') + '%'

[4] ✅ TEST CHECKLIST
□ 1. ทดสอบแถวว่างเปล่า → ต้องได้ ERROR ไม่ crash
□ 2. ทดสอบชื่อเป็นตัวเลข "0891234567" → JUNK_NAME → ERROR
□ 3. ทดสอบ "ร้านสมชาย" → separateShopName → personName="สมชาย"
□ 4. ทดสอบที่อยู่จากระบบ=กรุงเทพ แต่พิกัดอยู่โคราช → MISMATCH warning
□ 5. ทดสอบแถวสมบูรณ์ 100% → completeness=100 ผ่าน Gate
□ 6. ตรวจ Q_REVIEW note มี Warning text ครบ
□ 7. ตรวจ SYS_LOG มี PRE_VALIDATE_FAILED พร้อม reason
□ 8. ตรวจ runDailyProcess ไม่หยุดเมื่อเจอแถวขยะ (มี continue ถูก)
ต้องการให้ผมเขียนส่วน 06_PersonService.gs ที่เรียก separateShopNameFromPersonName() เพิ่มใน resolvePerson() ต่อเลยไหมครับ? หรือต้องการ deploy ส่วนนี้ก่อนแล้วทดสอบครับ?You said: Q: Priority 1 — ฟังก์ชันป้องกันขยะเข้าระบบ ต้องการทั้งหมดนี้ไหมครับ?Q: Priority 1 — ฟังก์ชันป้องกันขยะเข้าระบบ ต้องการทั้งหมดนี้ไหมครับ? (Select all that apply)
A: [No preference]Q: Priority 2 — ฟังก์ชัน Cross-Validate ระหว่าง Field ต้องการไหมครับ? (Select all that apply)
A: [No preference]Q: ต้องการให้ผลการตรวจสอบเหล่านี้ไปแสดงที่ไหนครับ?
A: เพิ่มคอลัมน์ใหม่ใน FACT_DELIVERY ด้วย12:17Claude responded: เข้าใจครับ — คุณต้องการทุกฟังก์ชัน และให้ผลการตรวจสอบบันทึกลง ทั้ง 3 ที่ พร้อมกัน:เข้าใจครับ — คุณต้องการทุกฟังก์ชัน และให้ผลการตรวจสอบบันทึกลง ทั้ง 3 ที่ พร้อมกัน:

SYS_LOG
Q_REVIEW note
คอลัมน์ใหม่ใน FACT_DELIVERY

ก่อนเขียนโค้ด ขอยืนยัน Schema ที่จะเพิ่มก่อนครับ เพราะ [RULE 2] ห้ามขยับคอลัมน์เดิม — ต้องเพิ่มต่อท้ายเท่านั้น
FACT_DELIVERY ปัจจุบันมี 31 คอลัมน์ (col A–AE)
คอลัมน์ใหม่ที่จะเพิ่ม (col AF–AJ = index 31–35):
AF: data_completeness_score   → ตัวเลข 0-100
AG: validation_warnings       → ข้อความ Warning ทั้งหมด
AH: name_quality_level        → OK / POOR / JUNK
AI: address_divergence_level  → LOW / MEDIUM / HIGH / UNKNOWN  
AJ: province_mismatch_flag    → TRUE / FALSE
ยืนยัน Schema นี้ได้เลยไหมครับ แล้วผมจะเขียนโค้ดเต็มทั้ง 4 ไฟล์พร้อมกันเลย (03_SetupSheets.gs, 05_NormalizeService.gs, 11_TransactionService.gs, 00_App.gs) ครับYou said: ผมมีกฎอยู่แค่เรื่องเดียวครับ คือ ผมต้องการข้อมูลลที่สะอาด และ นำกลับใช้งานได้จริง แก้ปัญหาทั้ง8ข้อได้จริงผมมีกฎอยู่แค่เรื่องเดียวครับ คือ ผมต้องการข้อมูลลที่สะอาด และ นำกลับใช้งานได้จริง แก้ปัญหาทั้ง8ข้อได้จริง
เพราะต่อไปผมจะมีการค้นหาโดยเอา ชื่อปลายทาง(บุคคล) + ที่อยู่ปลายทาง (ชื่อสถานที่) ไปค้นหากับระบบที่เรากำลังทำนี้ เพื่อนำ LatLong มาใช้งานได้จริงๆ12:36Claude responded: 🎯 GEM — เข้าใจ Core Purpose แล้วครับ🎯 GEM — เข้าใจ Core Purpose แล้วครับ
นี่คือสิ่งที่ระบบต้องทำได้จริงๆ:
INPUT (สกปรก)                    OUTPUT (สะอาด)
─────────────────────            ──────────────────────
"ช่างสมชาย วัสดุ"          →    LAT: 13.72341
"ถ.สุขุมวิท คลองเตย"       →    LNG: 100.41256
                                 confidence: HIGH

🔍 ทบทวน Core Flow ให้ชัด
Use Case จริงที่คุณจะใช้:
ค้นหาด้วย:
  ชื่อปลายทาง  = "สมชาย"  (มั่ว)
  ที่อยู่ปลายทาง = "คลองเตย กทม"  (มั่ว)

ระบบต้องตอบ:
  → พบ M_DESTINATION id: DST-XXXX
  → LAT: 13.72341, LNG: 100.41256
  → confidence: HIGH
  → matched via: PERSON(score=92) + GEO(distance=23m)

🚨 ปัญหาที่ระบบเดิมแก้ไม่ได้จริง (ต้องออกแบบใหม่)
ขอถามตรงๆ 2 ข้อก่อนลงมือเขียนโค้ดเต็มครับ เพราะมันกระทบ Architecture ทั้งหมด:
ข้อ 1 — ตอนค้นหา คุณจะค้นจากไหน?
ข้อมูลใหม่ที่เข้ามาทุกวัน เวลาจะ "ค้นหา LatLong" คุณจะค้นจาก:

ชีต Source ที่มีข้อมูลใหม่เข้ามา (ระบบรันอัตโนมัติ)
หรือ มีหน้า Search แยกต่างหาก ที่พิมพ์ชื่อแล้วได้ LatLong กลับมา?

ข้อ 2 — Output ที่ต้องการจริงๆ คืออะไร?
เมื่อค้นหาเจอแล้ว ต้องการให้ระบบ:

คืนค่า LatLong กลับไปใส่ในชีต Source อัตโนมัติ
หรือ แสดงผลให้ดูแล้ว copy เอง
หรือ ส่งไปให้ระบบอื่น (API / Google Form)?

คำตอบ 2 ข้อนี้จะกำหนดว่าต้องเพิ่มโมดูลอะไรบ้างครับ 🎯You said: ผมมีกฎอยู่แค่เรื่องเดียวครับ คือ ผมต้องการข้อมูลลที่สะอาด และ นำกลับใช้งานได้จริง แก้ปัญหาทั้ง8ข้อได้จริงผมมีกฎอยู่แค่เรื่องเดียวครับ คือ ผมต้องการข้อมูลลที่สะอาด และ นำกลับใช้งานได้จริง แก้ปัญหาทั้ง8ข้อได้จริง **ผมจะเพิ่มชีต ที่จะมีข้อมูลดิบที่โหลดมาจากระบบ ชื่อที่ได้มา ก็เหมือนๆกับชีตข้อมูลดิบที่เรากำลังทำความสะอาดแหละครับ ไม่ใช่ทำระบบค้นหาแบบที่คุณคิด** เพราะต่อไปผมจะมีการค้นหาโดยเอา ชื่อปลายทาง(บุคคล) + ที่อยู่ปลายทาง (ชื่อสถานที่) ไปค้นหากับระบบที่เรากำลังทำนี้ เพื่อนำ LatLong มาใช้งานได้จริงๆ12:45Claude responded: 🎯 GEM — เข้าใจ Use Case จริงแล้วครับ🎯 GEM — เข้าใจ Use Case จริงแล้วครับ
ชีตใหม่ (ข้อมูลดิบจากระบบอื่น)
  ชื่อปลายทาง = "สมชาย"
  ที่อยู่ปลายทาง = "คลองเตย กทม"
         │
         ▼
  ระบบ LMDS (ที่เรากำลังสร้าง)
  M_PERSON + M_PLACE + M_GEO_POINT
         │
         ▼
  ได้ LAT/LONG กลับไปใส่ในชีตใหม่นั้น

สิ่งที่ต้องสร้างเพิ่ม 1 โมดูล
ระบบเดิม 17 โมดูล ทำหน้าที่ "สร้างและสะสม Master Data"
สิ่งที่ขาดคือโมดูลที่ 18 — "ค้นหา LatLong จาก Master ที่สะสมไว้"
17_LookupService.gs
  └── lookupLatLongByNameAndAddress()
        ├── Step 1: resolvePerson() → หา person_id
        ├── Step 2: resolvePlace()  → หา place_id  
        ├── Step 3: หา M_DESTINATION ที่ตรงกัน
        └── Step 4: ดึง LAT/LONG จาก M_GEO_POINT

ก่อนเขียนโค้ด ขอยืนยัน 1 ข้อครับ:
ชีตใหม่ที่จะโหลดข้อมูลดิบมา — ต้องการให้ระบบรัน Lookup แล้วเขียน LatLong กลับไปในชีตนั้นอัตโนมัติ หรือต้องการให้รันผ่านเมนูเดิม (📦 LMDS System) เหมือนกับ runDailyProcess() ครับ?You said: ผมมีกฎอยู่แค่เรื่องเดียวครับ คือ ผมต้องการข้อมูลลที่สะอาด และ นำกลับใช้งานได้จริง แก้ปัญหาทั้ง8ข้อได้จริงผมมีกฎอยู่แค่เรื่องเดียวครับ คือ ผมต้องการข้อมูลลที่สะอาด และ นำกลับใช้งานได้จริง แก้ปัญหาทั้ง8ข้อได้จริง
ชีต"SCGนครหลวงJWDภูมิภาค" = ชีตที่คนขับได้ทำการเข้าส่งสินค้า และ ได้ข้อมูลLatLongจริงๆที่ส่งสินค้าให้ลูกค้าปลายทาง
ชีต"ตารางงานประจำวัน" = ชีตนี้ผมจะโหลดข้อมูลมาจากระบบเเป็นข้อมูลใหม่ประจำวัน แต่บางคอลัมน์จะไม่เหมือนกันนะเดี๋ยวผมจะแจ้งอีกทีถ้าผมคิดว่าระบบเราพร้อมแล้ว ชีตSCGจะมาดึงข้อมูลจากชีตนี้ไปใช้ครับ
**ผมจะเพิ่มชีต"ตารางงานประจำวัน" ที่จะมีข้อมูลดิบที่โหลดมาจากระบบ ชื่อปลายทาง(บุคคลไม่สะอาด) + ที่อยู่ปลายทาง (ชื่อสถานที่ไม่สะอาด) ที่ได้มา ก็เหมือนๆกับชีต"SCGนครหลวงJWDภูมิภาค"ข้อมูลดิบที่เรากำลังทำความสะอาดแหละครับ ไม่ใช่ทำระบบค้นหาแบบที่คุณคิด** เพราะต่อไปผมจะมีการค้นหาโดยเอา ชื่อปลายทาง(บุคคล) + ที่อยู่ปลายทาง (ชื่อสถานที่) ไปค้นหากับระบบที่เรากำลังทำนี้ เพื่อนำ LatLong มาใช้งานได้จริงๆ12:55Claude responded: 🎯 GEM — เข้าใจ Architecture จริงแล้วครับ🎯 GEM — เข้าใจ Architecture จริงแล้วครับ
ชีต "ตารางงานประจำวัน"          ชีต "SCGนครหลวงJWDภูมิภาค"
─────────────────────────        ────────────────────────────
ข้อมูลใหม่จากระบบ (ดิบ)    →   คนขับส่งของจริง มี LatLong จริง
ชื่อปลายทาง (มั่ว)               LatLong น่าเชื่อถือ 100%
ที่อยู่ปลายทาง (มั่ว)            ผ่านการ clean แล้ว → M_PERSON
ยังไม่มี LatLong                 M_PLACE, M_GEO_POINT, M_DESTINATION
         │                                    │
         │         LMDS Lookup               │
         └──── ค้นหา LatLong ───────────────┘
                    จาก Master Data
                         │
                         ▼
              ได้ LatLong กลับไปใส่
              ใน "ตารางงานประจำวัน"

Flow จริงของระบบทั้งหมด
PHASE 1 — สะสม Master Data (ทำอยู่แล้ว)
  ชีต SCG → runDailyProcess() → M_PERSON + M_PLACE + M_GEO_POINT

PHASE 2 — Lookup (ต้องสร้างใหม่)
  ชีต ตารางงานประจำวัน
    → เอา "ชื่อปลายทาง" + "ที่อยู่ปลายทาง"
    → ค้นหาใน Master Data
    → ได้ LatLong กลับมา
    → เขียนลงในชีต ตารางงานประจำวัน

โมดูลที่ต้องสร้างเพิ่ม
17_LookupService.gs — ค้นหา LatLong จาก Master
  └── runLookupProcess()         ← เรียกจากเมนู
  └── lookupLatLongForRow()      ← ทำทีละแถว
  └── findBestGeoFromPerson()    ← ค้น M_DESTINATION
  └── writeLookupResultBack()    ← เขียนกลับชีต
และเพิ่มเมนูใน 00_App.gs:
📦 LMDS System
  ├── 1. ติดตั้งระบบครั้งแรก
  ├── 2. ประมวลผลข้อมูลประจำวัน (SCG)
  ├── 3. อัปเดตพจนานุกรมสถานที่
  ├── 4. รีเซ็ตแถวที่เลือก
  ├── 5. อัปเดตสถิติและ Report
  └── 6. Lookup LatLong (ตารางงานประจำวัน) ← ใหม่

ก่อนเขียนโค้ด ขอทราบ 2 เรื่องครับ
เรื่องที่ 1 — คอลัมน์ใน "ตารางงานประจำวัน"
ตอนนี้รู้ว่ามีอย่างน้อย:

คอลัมน์ชื่อปลายทาง (บุคคล)
คอลัมน์ที่อยู่ปลายทาง (สถานที่)

แต่คุณบอกว่า "บางคอลัมน์จะไม่เหมือนกัน" — ตอนนี้พอรู้คร่าวๆ ได้ไหมครับว่า คอลัมน์ที่จะใช้ค้นหา ชื่อว่าอะไร? เพื่อให้ระบบรู้ว่าต้องอ่านคอลัมน์ไหน
เรื่องที่ 2 — ผลลัพธ์ที่ต้องการ
เมื่อค้นหาเจอ LatLong แล้ว ต้องการให้เขียนกลับไปที่คอลัมน์ไหนในชีต "ตารางงานประจำวัน" ครับ? เช่น:

คอลัมน์ LAT_RESULT และ LNG_RESULT
หรือ คอลัมน์ LOOKUP_STATUS + LAT + LNG
หรือชื่ออื่น?
You said: ผมเข้าใจเรื่องที่คุณอยากจะทำให้จบนะผมเข้าใจเรื่องที่คุณอยากจะทำให้จบนะ
แต่ผมต้องการให้ระบบ ให้ดีกว่านี้ก่อน เรื่องการทำความสะอาดชื่อปลายทาง(บุคคล) เรื่องการทำความสะอาดที่อยู่ปลายทาง(ชื่อสถานที่) + ชื่อที่อยู่จาก_LatLong (ชื่อบุคคล ชื่อสถานที่ ทั้ง2 มั่วเหมือนกัน แต่ชื่อสถานที่ยังดีที่มี คอลัมน์ ชื่อที่อยู่จาก_LatLongที่แปลงข้อมูลมาให้เทียบ คอลัมน์ `ชื่อที่อยู่จาก_LatLong`
### ความหมาย
คือ **ชื่อสถานที่อยู่แบบข้อความ**  
ที่ถูกแปลงมาจากคอลัมน์ `จุดส่งสินค้าปลายทาง` โดยใช้ script

พูดให้ตรงคือ มันเป็นผลของ **reverse geocoding**

### ความแตกต่างจาก `ที่อยู่ปลายทาง`
สองคอลัมน์นี้คนชอบสับสนมาก จึงต้องแยกให้ชัด:

#### `ที่อยู่ปลายทาง`
- มาจากระบบเดิม
- เป็นข้อความที่ระบบต้นทางให้มา
- มั่วได้มาก

#### `ชื่อที่อยู่จาก_LatLong`
- มาจากพิกัดจริง
- ระบบแปลงจาก LatLong เป็นข้อความ
- โดยทั่วไปน่าเชื่อถือกว่าในเชิงตำแหน่ง
- แต่บางครั้ง wording อาจไม่ตรงภาษาคนใช้งานจริง

### สถานะความน่าเชื่อถือ
โดยทั่วไปถือว่า **น่าเชื่อถือมากกว่า `ที่อยู่ปลายทาง`**
ในฐานะ “ข้อความที่สะท้อนตำแหน่งจริง”

### บทบาทในระบบ
คอลัมน์นี้สำคัญมาก เพราะควรใช้เป็น:

- ตัวช่วย normalize สถานที่
- ตัวช่วยเทียบกับ `SYS_TH_GEO`
- ตัวช่วยเช็คอำเภอ/ตำบล/จังหวัด
- ตัวช่วยแยกสาขา
- ตัวช่วยตรวจว่าที่อยู่จากระบบเดิมเพี้ยนแค่ไหน

### สรุปสั้น
คอลัมน์นี้คือ **“ที่อยู่ข้อความที่สร้างจากพิกัดจริง”**)และเรื่องที่สามารถนำข้อมูลที่สะอาดแล้ว มาใช้เพื่่อทำการค้นหาได้ จะได้นำLattLongมาใช้ได้
ตอนนี้ผมยังไม่เห็้นว่าระบบไได้จับคู่บ้างเลยยShow more19:46Claude responded: 🎯 GEM — เข้าใจแล้วครับ ปัญหาหลักคือ "ยังไม่เห็นการจับคู่จริงๆ"🎯 GEM — เข้าใจแล้วครับ ปัญหาหลักคือ "ยังไม่เห็นการจับคู่จริงๆ"
ให้ผมวิเคราะห์ให้ตรงจุดก่อนครับ

🔍 Root Cause — ทำไมระบบยังจับคู่ไม่ได้จริง
ปัญหาที่ 1: normalizePersonName() ตัดได้แค่ Prefix นำหน้า
─────────────────────────────────────────────────────────
Input:  "ช่างสมชาย วัสดุก่อสร้าง 0891234567"
Output: "สมชาย วัสดุก่อสร้าง"  ← ยังไม่สะอาดพอ
ควรได้: "สมชาย"                 ← แก่นจริงๆ

ปัญหาที่ 2: findPlaceCandidates() ใช้ substring เท่านั้น
─────────────────────────────────────────────────────────
Input:  "คลองเตย กรุงเทพ"
M_PLACE มี: "แขวงคลองเตย เขตคลองเตย กรุงเทพมหานคร"
→ ไม่ match เพราะ substring ไม่ตรงเป๊ะ
→ สร้าง Place ใหม่ซ้ำทุกครั้ง ❌

ปัญหาที่ 3: ไม่ได้ใช้ ชื่อที่อยู่จาก_LatLong เป็น Ground Truth
─────────────────────────────────────────────────────────
resolvePlace() ใช้ addr1 (มั่ว) เป็นหลัก
addr2 (LatLong) แค่ fallback ถ้า score < 90
→ ข้อมูลดีสุดกลับถูกใช้น้อยที่สุด ❌

🏗️ สิ่งที่ต้องแก้จริงๆ 3 จุด
จุดที่ 1: 05_NormalizeService.gs
  normalizePersonName() → ต้องสกัด "แก่น" ของชื่อออกมาให้ได้
  
จุดที่ 2: 07_PlaceService.gs  
  resolvePlace() → ต้องใช้ LatLong address เป็น Primary
  findPlaceCandidates() → ต้องใช้ Dice ไม่ใช่แค่ substring

จุดที่ 3: 10_MatchEngine.gs
  evaluateThaiGeoBonus() → ต้องให้น้ำหนัก LatLong address มากขึ้น

[1] 🔍 CHANGE LOG
ไฟล์สิ่งที่แก้เหตุผล05_NormalizeService.gsnormalizePersonName() เพิ่ม deep cleanสกัดชื่อจริงออกจากขยะ07_PlaceService.gsresolvePlace() ใช้ GeoAddress เป็น PrimaryGround Truth ต้องมาก่อน07_PlaceService.gsfindPlaceCandidates() เปลี่ยนเป็น Dice Matchจับคู่แบบยืดหยุ่นได้จริง10_MatchEngine.gsevaluateThaiGeoBonus() เพิ่ม weightให้คะแนน LatLong address ถูกต้อง

[2] 🔗 IMPACT ASSESSMENT
normalizePersonName() → ส่งผลต่อ resolvePerson() ทุก call
resolvePlace() → ส่งผลต่อ matchAllEntities() โดยตรง
findPlaceCandidates() → ส่งผลต่อ M_PLACE match rate ทั้งหมด
evaluateThaiGeoBonus() → ส่งผลต่อ compositeScore และ AUTO/REVIEW decision

[3] 💻 FULL CODE
05_NormalizeService.gs — แก้ normalizePersonName()
javascript/**
 * normalizePersonName() V4.5
 * สกัด "แก่น" ของชื่อบุคคลออกจากขยะทุกประเภท
 * เป้าหมาย: "ช่างสมชาย วัสดุก่อสร้าง 089-123-4567" → "สมชาย"
 */
function normalizePersonName(name) {
  if (!name) return '';
  let n = normalizeThaiText(name);

  // STEP 1: ตัดเบอร์โทรออกก่อนทุกอย่าง
  const phones = extractPhoneNumbers(n);
  if (phones) {
    phones.split(', ').forEach(p => {
      n = n.replace(new RegExp(p.split('').join('[-.\\s]?'), 'g'), '');
    });
  }

  // STEP 2: ตัด Prefix คำนำหน้า (ขยายจากเดิม)
  const prefixPatterns = [
    '^นาย\\s*', '^นางสาว\\s*', '^น\\.ส\\.\\s*', '^นาง\\s*',
    '^คุณ\\s*', '^พี่\\s*', '^น้อง\\s*', '^ลุง\\s*', '^ป้า\\s*',
    '^ช่าง\\s*', '^หมอ\\s*', '^ครู\\s*', '^อาจารย์\\s*',
    '^บจก\\.?\\s*', '^บริษัท\\s*', '^หจก\\.?\\s*',
    '^ห้างหุ้นส่วน\\s*', '^ห้าง\\s*', '^ร้าน\\s*', '^กิจการ\\s*',
    '^ดร\\.?\\s*', '^นพ\\.?\\s*', '^พญ\\.?\\s*',
    '^ผศ\\.?\\s*', '^รศ\\.?\\s*', '^ศ\\.?\\s*',
  ];
  for (const p of prefixPatterns) {
    n = n.replace(new RegExp(p, 'gi'), '');
  }

  // STEP 3: ตัด Suffix ขยะท้ายชื่อ
  const suffixPatterns = [
    // คำบอกอาชีพ/ประเภทกิจการ
    '\\s*(วัสดุ|ก่อสร้าง|การค้า|พาณิชย์|อุตสาหกรรม|เซอร์วิส|' +
    'เทรดดิ้ง|ซัพพลาย|มาร์เก็ต|ฮาร์ดแวร์|ออโต้|มอเตอร์|' +
    'โลจิสติกส์|อิเล็กทรอนิกส์|เฟอร์นิเจอร์|อาหาร|เบเกอรี่).*$',
    // คำบอกการรับของ
    '\\s*(รับของ|รับสินค้า|ฝากไว้|ฝากได้).*$',
    // คำว่า โทร/เบอร์ ที่ยังเหลืออยู่
    '\\s*(โทร\\.?|เบอร์|ติดต่อ|Tel\\.?|Tel:).*$',
    // slash และทุกอย่างหลังจากนั้น
    '\\s*/.*$',
    // วงเล็บและข้อความในวงเล็บ
    '\\s*\\(.*\\)\\s*',
    // จุดและ space ท้าย
    '[.\\s]+$',
  ];
  for (const s of suffixPatterns) {
    n = n.replace(new RegExp(s, 'gi'), '');
  }

  // STEP 4: ถ้าชื่อยังยาวเกิน 3 คำ → เอาแค่ 2 คำแรก (ชื่อ + นามสกุล)
  // คนไทยปกติมีชื่อ 1-2 คำ ถ้าเกิน 2 คำมักมีขยะปน
  const words = safeTrim(n).split(/\s+/).filter(w => w.length > 0);
  if (words.length > 2) {
    // ตรวจว่าคำที่ 3 เป็นส่วนของนามสกุลจริงไหม (ตัวอักษรไทยล้วน ไม่มีตัวเลข)
    const word3IsName = words[2] && /^[\u0E00-\u0E7F]+$/.test(words[2]) && words[2].length >= 3;
    n = word3IsName ? words.slice(0, 3).join(' ') : words.slice(0, 2).join(' ');
  }

  return safeTrim(n);
}

07_PlaceService.gs — แก้ทั้งไฟล์
javascript/**
 * 07_PlaceService.gs V4.5
 * ใช้ ชื่อที่อยู่จาก_LatLong เป็น Ground Truth หลัก
 * เปลี่ยน findPlaceCandidates() เป็น Dice Match
 */

/**
 * resolvePlace() V4.5
 * Strategy ใหม่: GeoAddress (LatLong) = Primary Source
 *                SystemAddress = Secondary / Detail Supplement
 */
function resolvePlace(sourceObj) {
  const addrSystem = sourceObj.addressRaw;        // มั่ว — ใช้เสริม
  const addrGeo    = sourceObj.addressFromLatLong; // น่าเชื่อถือ — ใช้หลัก

  if (!addrSystem && !addrGeo) {
    return { id: null, isNew: false, score: 0, candidates: [] };
  }

  // ════════════════════════════════════════════════
  // STEP 1: ค้นหาด้วย GeoAddress ก่อน (Ground Truth)
  // ════════════════════════════════════════════════
  let resGeo = { score: 0, candidates: [] };
  if (addrGeo) {
    resGeo = findBestMatch(addrGeo, 'GEO_REVERSE');
  }

  // ════════════════════════════════════════════════
  // STEP 2: ค้นหาด้วย SystemAddress เพื่อเสริม
  // ════════════════════════════════════════════════
  let resSystem = { score: 0, candidates: [] };
  if (addrSystem) {
    resSystem = findBestMatch(addrSystem, 'SYSTEM');
  }

  // ════════════════════════════════════════════════
  // STEP 3: เลือกผลลัพธ์ — GeoAddress ได้ Priority
  // ════════════════════════════════════════════════
  // ถ้า GeoAddress match ได้ score ≥ 70 → เชื่อเลย
  // ถ้าไม่ถึง → ลองดู SystemAddress
  // ถ้า SystemAddress score สูงกว่า GeoAddress ≥ 15 คะแนน → ใช้ System
  let finalMatch;
  if (resGeo.score >= 70) {
    finalMatch = resGeo;
  } else if (resSystem.score > resGeo.score + 15) {
    finalMatch = resSystem;
  } else if (resGeo.score > 0) {
    finalMatch = resGeo;
  } else {
    finalMatch = resSystem;
  }

  const threshold = getThresholds().autoMatchScore;  // 90
  const reviewMin = getThresholds().reviewScoreMin;  // 75

  if (finalMatch.score >= threshold) {
    return { ...finalMatch, isNew: false };

  } else if (finalMatch.score >= reviewMin) {
    return { ...finalMatch, id: null, isNew: false };

  } else {
    // คะแนนต่ำ → สถานที่ใหม่
    // ใช้ GeoAddress เป็น canonical เพราะน่าเชื่อถือกว่า
    const canonicalAddr = addrGeo || addrSystem;
    return { ...finalMatch, id: null, isNew: true, raw: canonicalAddr };
  }
}

// ════════════════════════════════════════════════════════════

/**
 * findBestMatch() V4.5
 * เพิ่ม source parameter เพื่อให้ scoring รู้ว่ามาจากไหน
 */
function findBestMatch(rawAddress, source) {
  if (!rawAddress) return { id: null, score: 0, candidates: [] };

  const norm = normalizePlaceName(rawAddress);
  const candidates = findPlaceCandidates(norm, rawAddress);

  let bestCandidate = null;
  let bestScore = 0;

  for (const c of candidates) {
    let score = scorePlaceCandidate(norm, c.normalized);

    // GeoAddress ได้ Bonus เพราะมาจากพิกัดจริง
    if (source === 'GEO_REVERSE' && score > 0) {
      score = Math.min(100, score + 8);
    }

    if (score > bestScore) {
      bestScore = score;
      bestCandidate = c;
    }
  }

  return {
    id: bestCandidate ? bestCandidate.placeId : null,
    score: bestScore,
    normalized: norm,
    raw: rawAddress,
    source: source || 'UNKNOWN',
    candidates: candidates
  };
}

// ════════════════════════════════════════════════════════════

/**
 * findPlaceCandidates() V4.5
 * เปลี่ยนจาก substring → Dice Coefficient
 * + เพิ่มการค้นหาจากส่วนภูมิศาสตร์ (จังหวัด/อำเภอ)
 */
function findPlaceCandidates(normPlace, rawAddress) {
  if (!normPlace && !rawAddress) return [];

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const aliasSheet = ss.getSheetByName('M_PLACE_ALIAS');
  const aliasData = aliasSheet.getDataRange().getValues();

  // ดึงส่วนภูมิศาสตร์จาก rawAddress เพื่อช่วยกรอง
  const geoParts = rawAddress ? extractAdminParts(normalizeAddress(rawAddress)) : {};

  const candidates = [];
  const seenIds = new Set();

  for (let i = 1; i < aliasData.length; i++) {
    const aliasNorm = safeString(aliasData[i][3]);
    if (!aliasNorm) continue;

    const placeId = aliasData[i][1];
    if (seenIds.has(placeId)) continue;

    // วิธีที่ 1: Dice Coefficient ≥ 0.3 (ยืดหยุ่นกว่า substring มาก)
    const dice = diceCoefficient(normPlace, aliasNorm);
    if (dice >= 0.3) {
      candidates.push({
        placeId: placeId,
        normalized: aliasNorm,
        raw: aliasData[i][2],
        matchType: 'DICE',
        diceScore: dice
      });
      seenIds.add(placeId);
      continue;
    }

    // วิธีที่ 2: ถ้า normPlace สั้น (≤6 ตัวอักษร) ใช้ substring ช่วย
    if (normPlace.length <= 6 && aliasNorm.indexOf(normPlace) > -1) {
      candidates.push({
        placeId: placeId,
        normalized: aliasNorm,
        raw: aliasData[i][2],
        matchType: 'SUBSTRING_SHORT'
      });
      seenIds.add(placeId);
      continue;
    }

    // วิธีที่ 3: ค้นหาจากจังหวัด/อำเภอ ถ้าไม่มี match อื่นเลย
    if (geoParts.province && aliasNorm.indexOf(geoParts.province) > -1) {
      if (geoParts.district && aliasNorm.indexOf(geoParts.district) > -1) {
        candidates.push({
          placeId: placeId,
          normalized: aliasNorm,
          raw: aliasData[i][2],
          matchType: 'GEO_ADMIN'
        });
        seenIds.add(placeId);
      }
    }
  }

  // Sort: Dice สูงสุดขึ้นก่อน
  candidates.sort((a, b) => (b.diceScore || 0) - (a.diceScore || 0));

  // จำกัดไม่เกิน 10 candidates เพื่อ performance
  return candidates.slice(0, 10);
}

// ════════════════════════════════════════════════════════════

/**
 * scorePlaceCandidate() V4.5
 * เพิ่ม Geographic Part Score
 * ถ้าจังหวัด/อำเภอตรงกัน → โบนัสคะแนน
 */
function scorePlaceCandidate(inputNorm, candidateNorm) {
  if (!inputNorm || !candidateNorm) return 0;
  if (inputNorm === candidateNorm) return 100;

  const dice = diceCoefficient(inputNorm, candidateNorm);
  const ratio = lengthRatio(inputNorm, candidateNorm);

  // คะแนนหลัก: Dice 80% + Length 20%
  let score = Math.round(((dice * 0.8) + (ratio * 0.2)) * 100);

  // โบนัสถ้ามีส่วนภูมิศาสตร์ตรงกัน
  const inputParts = extractAdminParts(inputNorm);
  const candParts  = extractAdminParts(candidateNorm);

  if (inputParts.province && candParts.province &&
      inputParts.province === candParts.province) {
    score = Math.min(100, score + 10);
  }
  if (inputParts.district && candParts.district &&
      inputParts.district === candParts.district) {
    score = Math.min(100, score + 5);
  }

  return score > 55 ? score : 0;
}

// ════════════════════════════════════════════════════════════
// createPlace, createPlaceAlias — ไม่เปลี่ยน (คงเดิม V4.4)
// ════════════════════════════════════════════════════════════

function createPlace(canonicalPlaceName, addressRaw, geoAddr) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('M_PLACE');
  const placeId = 'PLA-' + uuid().split('-')[0].toUpperCase();

  const mergedAddress = smartMergeAddress(addressRaw, geoAddr);
  const normPlace = normalizePlaceName(mergedAddress);

  sheet.appendRow([
    placeId,
    mergedAddress,
    normPlace,
    addressRaw,
    normalizeAddress(mergedAddress),
    '',
    new Date(),
    new Date(),
    1,
    'ACTIVE',
    ''
  ]);

  createPlaceAlias(placeId, mergedAddress, normPlace);

  if (addressRaw && addressRaw !== mergedAddress) {
    createPlaceAlias(placeId, addressRaw, normalizePlaceName(addressRaw));
  }

  // V4.5: เพิ่ม Alias จาก GeoAddress ด้วย — ครั้งหน้าจะหาเจอ
  if (geoAddr && geoAddr !== mergedAddress && geoAddr !== addressRaw) {
    createPlaceAlias(placeId, geoAddr, normalizePlaceName(geoAddr));
  }

  return placeId;
}

function createPlaceAlias(placeId, aliasRaw, aliasNormalized) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('M_PLACE_ALIAS');

  sheet.appendRow([
    'L_AL-' + uuid().split('-')[0].toUpperCase(),
    placeId,
    aliasRaw,
    aliasNormalized,
    'SYSTEM',
    new Date(),
    new Date(),
    1,
    'Y'
  ]);
}

10_MatchEngine.gs — แก้ evaluateThaiGeoBonus()
javascript/**
 * evaluateThaiGeoBonus() V4.5
 * ให้น้ำหนัก LatLong Address มากขึ้น
 * เพราะมันคือ Ground Truth ของตำแหน่ง
 */
function evaluateThaiGeoBonus(sourceObj) {
  let bonus = 0;
  const rawAddr = sourceObj.addressRaw || '';
  const geoAddr = sourceObj.addressFromLatLong || '';

  if (!geoAddr) return 0;

  const geoParts = extractAdminParts(normalizeAddress(geoAddr));

  // +15: ตำบลใน rawAddr ตรงกับ geoAddr
  if (rawAddr) {
    const subMatch = rawAddr.match(/(?:ต\.|ตำบล|แขวง)\s*([\u0E00-\u0E7F]+)/);
    if (subMatch && geoAddr.indexOf(subMatch[1]) > -1) {
      bonus += 15;
    }
  }

  // +10: อำเภอตรงกัน
  if (geoParts.district && rawAddr.indexOf(geoParts.district) > -1) {
    bonus += 10;
  }

  // +10: จังหวัดตรงกัน
  if (geoParts.province && rawAddr.indexOf(geoParts.province) > -1) {
    bonus += 10;
  }

  // +5: มีรหัสไปรษณีย์ใน geoAddr (แสดงว่า reverse geocode ได้ข้อมูลครบ)
  if (geoParts.postcode) {
    bonus += 5;
  }

  return Math.min(35, bonus); // cap ที่ 35
}

[4] ✅ TEST CHECKLIST
ชื่อบุคคล:
□ "ช่างสมชาย วัสดุก่อสร้าง 089-123" → "สมชาย"
□ "นางสาวสมหญิง/ร้านค้า"           → "สมหญิง"
□ "บจก.ABC สาขาวังน้อย"             → ไม่ใช่บุคคล → isNew=true

ที่อยู่:
□ ข้อมูลใหม่มีที่อยู่เหมือนใน M_PLACE_ALIAS → score ≥ 90 → AUTO_MATCH
□ ที่อยู่ต่างคำแต่จังหวัดเดียวกัน → Dice match + GeoBonus → score ≥ 75
□ สร้าง Place ใหม่ → Alias มี 3 ตัว (merged, raw, geo)

การจับคู่:
□ รันครั้งที่ 2 กับข้อมูลเดิม → ต้องเจอใน M_PLACE_ALIAS ทันที
□ Q_REVIEW ลดลง เมื่อเทียบกับ V4.4
□ FACT_DELIVERY มี person_id + place_id + geo_id ครบทุกแถว
ขั้นตอนแนะนำครับ — deploy แล้วรันกับข้อมูลจริงสัก 20-30 แถวดูก่อน แล้วดูว่า Q_REVIEW ได้กี่แถว AUTO_MATCH ได้กี่แถว จะบอกได้ว่าระบบจับคู่ได้ดีแค่ไหนครับ 🎯