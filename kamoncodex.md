Summary

ผมตรวจโค้ดทั้งโปรเจกต์และสรุปโครงสร้างให้แล้ว โดยโปรเจกต์นี้มี 17 โมดูล (.gs) ตามลำดับ 00–16 และตอนนี้ README ถูกแก้ให้แสดงครบ (รวม 13_ReportService.gs) แล้วครับ.

ผมเพิ่ม SYS_TH_GEO เข้า getSheetNames() เพื่อให้ถูกนับเป็นชีตระบบแบบเป็นทางการ และถูกตรวจโดย ensureSystemSheets() ด้วย (ลดโอกาสลืมสร้างชีตนี้).

ผมเพิ่ม schema ตั้งต้นของชีต SYS_TH_GEO เป็นคอลัมน์ตามที่คุณต้องการ:
รหัสไปรษณีย์, แขวง/ตำบล, เขต/อำเภอ, จังหวัด, หมายเหตุ ตอนรัน Setup ระบบจะสร้างหัวคอลัมน์นี้ให้ทันที.

ผมแก้จุดโค้ด “เรียกเมนูแต่ไม่มีฟังก์ชันจริง” โดยเพิ่ม runNightlyMaintenance() ใน 13_ReportService.gs ให้ตรงกับเมนูข้อ 5 ใน onOpen() (เดิมเสี่ยงกดแล้ว error).

เรื่องช่อง หมายเหตุ ใน SYS_TH_GEO: ตอนนี้ระบบมี parser อยู่แล้ว (parseRemarkLogic) รองรับเคสสำคัญที่คุณยกตัวอย่าง เช่น “เฉพาะอาคาร…”, “ยกเว้น…ใช้รหัส…”, และเคสเลขบ้านซับซ้อน โดยแปลงเป็น note_type / note_keywords / postcode_override ให้อัตโนมัติเมื่อรัน buildGeoIndex().

รายละเอียดที่คุณถาม: โมดูล + ฟังก์ชัน + ชีต + คอลัมน์
1) โมดูลโค้ดและฟังก์ชัน (ภาพรวมครบทั้งระบบ)
(อ้างอิงจากการไล่ function ทุกไฟล์ด้วย rg '^function ' *.gs)

00_App.gs: จุดเริ่มระบบ/เมนู/run รายวัน/รีโปรเซส/onEdit.

01_Config.gs: config + thresholds + sheet registry.

02_Schema.gs: validate schema ต้นทาง + ensure system sheets + map column.

03_SetupSheets.gs: สร้างชีต + seed config.

04_SourceRepository.gs: อ่าน/แม็พ/อัปเดตสถานะแถวต้นทาง.

05_NormalizeService.gs: normalize คน/ที่อยู่/geo key/fingerprint + เตือนเงื่อนไขพื้นที่พิเศษ.

06_PersonService.gs: resolve/create person + alias + stats.

07_PlaceService.gs: resolve/create place + alias + scoring.

08_GeoService.gs: resolve/create geo point + candidate search.

09_DestinationService.gs: destination key + resolve/create + stats.

10_MatchEngine.gs: composite score + auto/review decision + conflict type + geo bonus.

11_TransactionService.gs: build fact + upsert + duplicate guard.

12_ReviewService.gs: enqueue/review dropdown/get pending/apply decision.

13_ReportService.gs: refresh report + daily summary + nightly maintenance (ที่เพิ่ม).

14_Utils.gs: helper กลาง (UUID, trim, number, log, distance, similarity, checkpoint, status, alert).

15_GoogleMapsAPI.gs: distance/reverse geocode/latlong/duration + cache.

16_GeoDictionaryBuilder.gs: build index จาก SYS_TH_GEO + parse หมายเหตุ.

2) ชีตระบบและคอลัมน์
ชีตระบบถูกประกาศกลางที่ getSheetNames() และตอนนี้รวม SYS_TH_GEO แล้ว.

คอลัมน์ของแต่ละชีตระบบถูกนิยามใน createSystemSheets() ทั้งหมด (M_PERSON, M_PLACE, M_GEO_POINT, FACT_DELIVERY, Q_REVIEW, SYS_CONFIG, SYS_LOG, RPT_DATA_QUALITY, MAPS_CACHE, และ SYS_TH_GEO).

ชีตต้นทาง SCGนครหลวงJWDภูมิภาค ปัจจุบันระบบบังคับตรวจ required columns หลัก 9 ตัว (เช่น ชื่อปลายทาง, ที่อยู่ปลายทาง, จุดส่งสินค้าปลายทาง, LAT, LONG, SYNC_STATUS, Invoice No, Shipment No).

คำตอบตรงประเด็นสำคัญจากคุณ
ตั้งชื่อชีต SYS_TH_GEO ได้เลย ✅
ตอนนี้ระบบรองรับแบบเป็นทางการแล้ว.

ชื่อคอลัมน์ A-E ที่คุณเสนอ ใช้ได้เลย ✅
และผมใส่ให้ใน Setup แล้ว.

ข้อมูลใน “หมายเหตุ” ต้องแปลงเองไหม?
ไม่ต้องแปลงมือทั้งหมดครับ — ให้ใส่ข้อความธรรมชาติได้ แล้ว buildGeoIndex() จะ parse ให้เป็นโครงสร้างใช้ในระบบ (note_type, keywords, postcode_override) อัตโนมัติครับ.

จุดที่ผมตรวจแล้วว่า “เดิมเสี่ยง/ไม่ครบ”
เมนูเรียก runNightlyMaintenance แต่ไม่มีฟังก์ชันจริง → แก้แล้ว.

SYS_TH_GEO ถูกใช้งานจริงหลายที่ แต่ไม่อยู่ใน registry ชีตระบบ → แก้แล้ว.

Testing

✅ python - <<'PY' ... (list functions per module) ... PY

✅ rg -n '^function ' *.gs

✅ rg 'runNightlyMaintenance' -n 00_App.gs 13_ReportService.gs && rg '^function ' *.gs | wc -l

✅ git status --short && git diff -- 01_Config.gs 03_SetupSheets.gs README.md

✅ git add 01_Config.gs 03_SetupSheets.gs 13_ReportService.gs README.md && git commit -m "Add SYS_TH_GEO sheet setup and nightly maintenance handler"

หากต้องการ รอบถัดไปผมจะทำต่อให้เป็น “แผนลงมือจริง” เลย:
(1) Data cleaning pipeline สำหรับชื่อบุคคล/สถานที่, (2) กฎ dedupe 8 กรณีแบบ scoring + review queue, (3) dashboard ตรวจคุณภาพรายวันครับ

01_Config.gs

   if (!found) {
     sheet.appendRow([key, value, 'SYSTEM', 'Added by script', new Date()]);
   }
   
   // Update Cache
   CONFIG_CACHE[key] = value;
 }
 
 /**
  * ดึงค่าเกณฑ์เป็นตัวเลข
  */
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
+    SYS_TH_GEO: 'SYS_TH_GEO',
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
     MAPS_CACHE: 'MAPS_CACHE'
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
+    [names.SYS_TH_GEO]: ['รหัสไปรษณีย์', 'แขวง/ตำบล', 'เขต/อำเภอ', 'จังหวัด', 'หมายเหตุ'],
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
     [names.MAPS_CACHE]: ['cache_key', 'cache_value', 'cache_type', 'raw_input', 'updated_at']
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
+ * เมนูงานบำรุงรักษาระบบช่วงท้ายวัน
+ * ปัจจุบันสรุปรายงานคุณภาพข้อมูล และสามารถขยายงานอื่นเพิ่มในอนาคต
+ */
+function runNightlyMaintenance() {
+  const ss = SpreadsheetApp.getActiveSpreadsheet();
+  try {
+    buildDailySummary();
+    ss.toast('อัปเดตสถิติและรายงานเรียบร้อยแล้ว', '✅ Maintenance สำเร็จ', 5);
+  } catch (e) {
+    ss.toast('อัปเดตสถิติไม่สำเร็จ: ' + e.message, '❌ Maintenance ล้มเหลว', 10);
+    writeLog('ERROR', '13_ReportService', 'runNightlyMaintenance', '', e.message, e.stack);
+    throw e;
+  }
+}


README.md

 - **Relational Database Model:** แยกข้อมูลเป็น 3 ชั้น (Raw Data -> Master Data -> Fact Delivery) เพื่อความสะอาดและไม่ซ้ำซ้อน
 - **AI Synthesis Engine:** รวมเทคนิคที่ดีที่สุดจาก AI 8 ค่าย (เช่น Unicode NFC, Advanced Thai Regex)
 - **Manual Safety Watch:** ระบบเฝ้าระวังขีดจำกัด 6 นาทีของ Google โดยจะหยุดพักและบันทึก Checkpoint ให้โดยอัตโนมัติ เพื่อให้แอดมินกดรันต่อเองได้อย่างปลอดภัย
 - **Google Maps Cache:** ระบบจำพิกัดและระยะทางลงในชีต `MAPS_CACHE` ถาวร ช่วยประหยัด Quota และเพิ่มความเร็วในการรัน
 - **Thai Geo Bonus Scoring:** ใช้ฐานข้อมูล `SYS_TH_GEO` มาช่วยเพิ่มคะแนนความแม่นยำ (Bonus) หากที่อยู่ดิบตรงกับพิกัดจริง
 - **Timed Auto-Close Alerts:** หน้าต่างแจ้งเตือนนับถอยหลัง 10 วินาที และปิดตัวเองอัตโนมัติ ไม่กวนใจตอนทำงาน
 
 ---
 
 ## 📂 โครงสร้างไฟล์ (File Structure)
 
 ระบบประกอบด้วย 17 โมดูลหลัก:
 1.  **00_App.gs**: จุดเริ่มต้นระบบ, เมนูหลัก และการประมวลผลประจำวัน
 2.  **01_Config.gs**: ตั้งค่าชื่อชีตและเกณฑ์คะแนน (Thresholds)
 3.  **02_Schema.gs**: คำนิยามโครงสร้างคอลัมน์ของทุกตาราง
 4.  **03_SetupSheets.gs**: ระบบติดตั้งและสร้างชีตอัตโนมัติ
 5.  **04_SourceRepository.gs**: จัดการการอ่านข้อมูลจากชีตดิบ (SCG)
 6.  **05_NormalizeService.gs**: เอนจินล้างข้อมูล (NFC, Regex, Auto-Fill)
 7.  **06_PersonService.gs**: จัดการข้อมูล Master บุคคล
 8.  **07_PlaceService.gs**: จัดการข้อมูล Master สถานที่
 9.  **08_GeoService.gs**: จัดการข้อมูล Master พิกัดพิกัด (Lat/Long)
 10. **09_DestinationService.gs**: จัดการข้อมูลจุดหมายปลายทาง (Unique Points)
 11. **10_MatchEngine.gs**: สมองกลตัดสินใจ (Scoring & Conflict Detection)
 12. **11_TransactionService.gs**: บันทึกข้อมูลลงตาราง Fact
 13. **12_ReviewService.gs**: ระบบจัดการคิวรอรีวิว (Q_REVIEW) และระบบ Dropdown
-14. **14_Utils.gs**: เครื่องมือเสริม (UUID, Dice, Haversine, Timed Alerts)
-15. **15_GoogleMapsAPI.gs**: ฟังก์ชัน Google Maps และระบบ Cache 2 ชั้น
-16. **16_GeoDictionaryBuilder.gs**: ระบบสร้างพจนานุกรมจากชีต `SYS_TH_GEO`
+14. **13_ReportService.gs**: สรุปรายงานคุณภาพข้อมูลและสรุปประจำวัน
+15. **14_Utils.gs**: เครื่องมือเสริม (UUID, Dice, Haversine, Timed Alerts)
+16. **15_GoogleMapsAPI.gs**: ฟังก์ชัน Google Maps และระบบ Cache 2 ชั้น
+17. **16_GeoDictionaryBuilder.gs**: ระบบสร้างพจนานุกรมจากชีต `SYS_TH_GEO`
 
 ---
 
 ## 🚀 วิธีการใช้งาน (How to Use)
 
 ### 1. การติดตั้งครั้งแรก
 1. เปิด Google Sheets ของคุณ
 2. ไปที่เมนู **📦 LMDS System** > **1. ติดตั้งระบบครั้งแรก (Setup)**
 3. ระบบจะสร้างชีตที่จำเป็นทั้งหมดและตั้งค่าเริ่มต้นให้
 
 ### 2. การประมวลผลประจำวัน
 1. นำข้อมูลดิบมาวางในชีตต้นทาง (SCG...)
 2. ไปที่เมนู **📦 LMDS System** > **2. ประมวลผลข้อมูลประจำวัน**
 3. ระบบจะรันไปเรื่อยๆ หากข้อมูลมีปริมาณมากและครบ 5 นาที ระบบจะโชว์ Popup นับถอยหลังแจ้งให้คุณกดรันต่อเองเพื่อความปลอดภัย
 
 ### 3. การตัดสินใจในคิวรีวิว (Q_REVIEW)
 1. เมื่อระบบไม่มั่นใจ ข้อมูลจะเด้งมาที่ชีต `Q_REVIEW`
 2. เลือกคำสั่งในคอลัมน์ **Decision** (Dropdown):
     - `CREATE_NEW`: สร้างข้อมูลใหม่
     - `MERGE_TO_CANDIDATE`: รวมเข้ากับข้อมูลเดิมที่มีอยู่
     - `IGNORE`: ข้ามรายการนี้
 3. ระบบจะจัดการอัปเดต Master Data ให้ทันทีหลังเลือก
 
 ---
 
Summary
รอบนี้ผมแก้ “ตรงจุดที่คุณกังวล” คือข้อมูลชื่อบุคคล/ชื่อสถานที่ที่มั่ว สั้น ไม่ครบ โดยเพิ่มการทำความสะอาดข้อความให้เข้มขึ้นใน normalizePersonName() และ normalizePlaceName() (ลบคำรบกวน, ลบอักขระแปลก, บีบช่องว่าง, normalize เพิ่มก่อนจับคู่).

เพิ่มฟังก์ชันตรวจคุณภาพข้อมูลดิบโดยตรง:

isLowQualityPersonName()

isLowQualityPlaceText()

buildDataQualityFlags()
เพื่อคัดแถวที่เสี่ยงรวมผิดคน/ผิดสถานที่เข้าสู่รีวิวก่อน.

ปรับ resolvePerson() ให้หยุด auto-create เมื่อชื่อคนคุณภาพต่ำและไม่มีเบอร์โทร (เช่นข้อมูลสั้น/กำกวม) แล้วส่งไปรีวิวแทน.

ปรับ resolvePlace() ให้หยุด auto-create เมื่อที่อยู่ทั้งจากระบบเดิมและจาก LatLong มีคุณภาพต่ำพร้อมกัน (ลดการสร้าง place เพี้ยน).

ปรับ Match Engine ให้ใช้ qualityFlags เป็น guardrail:

เก็บธงคุณภาพไว้ในผล match

ถ้ามีธงคุณภาพ => บังคับ REVIEW

ใส่ธงลงใน Q_REVIEW.note เพื่อให้แอดมินเห็นสาเหตุชัดเจนตอนตัดสินใจ.

อัปเดต README ให้บอกความสามารถใหม่ Data Quality Guardrails อย่างเป็นทางการ.

ผลลัพธ์เชิงระบบที่ได้ทันที

ลดการ merge ผิดจากข้อความสั้น/มั่ว

ลดการสร้าง master ใหม่แบบผิดๆ จากข้อมูลไม่ครบ

เพิ่มความโปร่งใสในคิว Q_REVIEW เพราะเห็น reason flags ชัดเจน

Testing

✅ rg -n 'buildDataQualityFlags|isLowQualityPersonName|isLowQualityPlaceText|qualityFlags' 05_NormalizeService.gs 06_PersonService.gs 07_PlaceService.gs 10_MatchEngine.gs && git status --short

✅ git add 05_NormalizeService.gs 06_PersonService.gs 07_PlaceService.gs 10_MatchEngine.gs README.md && git commit -m "Add data-quality guardrails for messy name/address inputs"

ถ้าคุณโอเค ผมจะทำเฟสถัดไปให้เลย: “กฎตัดสิน 8 ปัญหา” แบบ scoring table + reason code รายเคส (เช่น SAME_GEO_DIFF_PERSON, SAME_PERSON_DIFF_GEO) ให้ละเอียดระดับใช้งาน production ได้ครับ.


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
+  // 3. ลบคำรบกวนที่ไม่ใช่ชื่อบุคคลจริง
+  n = n
+    .replace(/\b(รับของ|ลูกค้า|หน้างาน|ติดต่อ|ส่งของ|ร้าน|บ้าน)\b/gi, ' ')
+    .replace(/[^\u0E00-\u0E7Fa-zA-Z0-9\s]/g, ' ')
+    .replace(/\s+/g, ' ');
   
   return safeTrim(n);
 }
 
 /**
  * มาตรฐานชื่อสถานที่
  */
 function normalizePlaceName(name) {
   if (!name) return '';
-  let n = normalizeThaiText(name);
+  let n = normalizeAddress(name);
   
   // ลบคำที่มักจะซ้ำซ้อน
   n = n.replace(/^ร้าน\s*/i, '');
   n = n.replace(/สาขา\s*\d+/i, ''); // ตัดคำว่าสาขาออกไปก่อนเพื่อหาตัวร้านหลัก
+  n = n.replace(/[^\u0E00-\u0E7Fa-zA-Z0-9\s./\-]/g, ' ');
+  n = n.replace(/\s+/g, ' ');
   
   return safeTrim(n);
 }
 
+/**
+ * ประเมินว่าชื่อบุคคล "สั้น/มั่ว/ไม่พอใช้" หรือไม่
+ */
+function isLowQualityPersonName(name) {
+  const n = normalizePersonName(name || '');
+  if (!n) return true;
+  if (/^\d+$/.test(n)) return true;
+  if (n.length < 2) return true;
+  if (/^(ลูกค้า|ไม่ระบุ|ไม่มีชื่อ|n\/a|na)$/i.test(n)) return true;
+  return false;
+}
+
+/**
+ * ประเมินว่าที่อยู่/สถานที่ "สั้นเกินไปหรือกำกวม" หรือไม่
+ */
+function isLowQualityPlaceText(text) {
+  const n = normalizePlaceName(text || '');
+  if (!n) return true;
+  if (n.length < 6) return true;
+  if (/^(ไม่ระบุ|ไม่มีที่อยู่|n\/a|na)$/i.test(n)) return true;
+  return false;
+}
+
+/**
+ * รวมธงคุณภาพข้อมูลดิบ เพื่อช่วยตัดสินใจส่ง Review
+ */
+function buildDataQualityFlags(sourceObj) {
+  const flags = [];
+  if (isLowQualityPersonName(sourceObj.destinationNameRaw)) flags.push('LOW_QUALITY_PERSON_NAME');
+  if (isLowQualityPlaceText(sourceObj.addressRaw) && isLowQualityPlaceText(sourceObj.addressFromLatLong)) {
+    flags.push('LOW_QUALITY_PLACE_TEXT');
+  }
+  if (!sourceObj.latRaw || !sourceObj.longRaw) flags.push('MISSING_LAT_LONG');
+  return flags;
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

06_PersonService.gs

 /**
  * 06_PersonService.gs
  * บริหารจัดการข้อมูลบุคคล
  */
 
 /**
  * ค้นหาชื่อคนและให้คะแนนว่าตรงกับ Master ตัวไหน
  */
 function resolvePerson(sourceObj) {
   const rawName = sourceObj.destinationNameRaw;
   if (!rawName) return { id: null, isNew: false, score: 0, phone: '', candidates: [] };
   
   // สกัดเบอร์โทรศัพท์
   const phone = extractPhoneNumbers(rawName) || extractPhoneNumbers(sourceObj.addressRaw);
   
   const normName = normalizePersonName(rawName);
+  if (isLowQualityPersonName(normName) && !phone) {
+    return { id: null, isNew: false, score: 0, normalized: normName, raw: rawName, phone: '', candidates: [], qualityIssue: 'LOW_QUALITY_PERSON_NAME' };
+  }
+
   const candidates = findPersonCandidates(normName, phone);
   
   // ไม่มีเลย แปลว่าใหม่ 100%
   if (candidates.length === 0) {
     return { id: null, isNew: true, score: 0, normalized: normName, raw: rawName, phone: phone, candidates: [] };
   }
   
   // ถ้ามี Candidate ให้หาตัวที่คะแนนสูงสุด
   let bestCandidate = null;
   let bestScore = 0;
   
   for (let i = 0; i < candidates.length; i++) {
     const c = candidates[i];
     const score = scorePersonCandidate(normName, c.normalized);
     if (score > bestScore) {
       bestScore = score;
       bestCandidate = c;
     }
   }
   
   // ถ้าเกิน Threshold (เช่น >= 90) ถือว่าชัวร์
   const threshold = getThresholds().autoMatchScore;
   const reviewMin = getThresholds().reviewScoreMin;
   
   if (bestScore >= threshold) {


07_PlaceService.gs

 /**
  * 07_PlaceService.gs
  * บริหารจัดการข้อมูลสถานที่
  */
 
 function resolvePlace(sourceObj) {
   const addr1 = sourceObj.addressRaw;
   const addr2 = sourceObj.addressFromLatLong;
   
   if (!addr1 && !addr2) return { id: null, isNew: false, score: 0, candidates: [] };
+  if (isLowQualityPlaceText(addr1) && isLowQualityPlaceText(addr2)) {
+    return { id: null, isNew: false, score: 0, candidates: [], raw: addr2 || addr1 || '', qualityIssue: 'LOW_QUALITY_PLACE_TEXT' };
+  }
   
   // 1. ค้นหาจากที่อยู่หลัก (ที่อยู่ปลายทาง)
   let res1 = findBestMatch(addr1);
   
   // 2. ถ้าที่อยู่หลักคะแนนไม่สูงพอ ลองค้นหาจากที่อยู่ที่สกัดจาก LatLong
   let res2 = { score: 0 };
   if (addr2 && res1.score < 90) {
     res2 = findBestMatch(addr2);
   }
   
   // 3. เลือกผลลัพธ์ที่ดีที่สุด
   let finalMatch = res1.score >= res2.score ? res1 : res2;
   
   const threshold = getThresholds().autoMatchScore;
   const reviewMin = getThresholds().reviewScoreMin;
   
   if (finalMatch.score >= threshold) {
     return { ...finalMatch, isNew: false };
   } else if (finalMatch.score >= reviewMin) {
     // คะแนนก้ำกึ่ง ส่งเข้า Review
     return { ...finalMatch, id: null, isNew: false };
   } else {
     // คะแนนต่ำเกินไป ถือว่าเป็นที่ใหม่
     // เลือกที่อยู่ที่ "ยาวและสมบูรณ์กว่า" มาเป็นชื่อหลักสำหรับสร้างใหม่
     const betterRaw = (addr2 && addr2.length > (addr1 ? addr1.length : 0)) ? addr2 : addr1;

10_MatchEngine.gs

 /**
  * 10_MatchEngine.gs
  * สมองกลของระบบ ทำหน้าที่ประสานงานและตัดสินใจว่า Data ชุดนี้คืออะไร
  */
 
 function matchAllEntities(sourceObj) {
+  const qualityFlags = buildDataQualityFlags(sourceObj);
+
   // 1. แยกแก้แต่ละเอนทิตี
   const personResult = resolvePerson(sourceObj);
   const placeResult = resolvePlace(sourceObj);
   const geoResult = resolveGeo(sourceObj);
   
   // 2. ถ้าเอนทิตีไหนมั่นใจว่าใหม่ (isNew = true) ก็ให้สิทธิ์ในการสร้างเลย
   let finalPersonId = personResult.id;
   let finalPlaceId = placeResult.id;
   let finalGeoId = geoResult.id;
   
   let autoCreatedCount = 0;
   
   // สร้าง Person ถ้าเป็นคนใหม่ชัวร์ (ไม่มี Candidate คล้ายเลย)
   if (personResult.isNew) {
     finalPersonId = createPerson(personResult.raw, personResult.normalized, personResult.phone);
     autoCreatedCount++;
   }
   
   // สร้าง Place ถ้าที่อยู่ใหม่ชัวร์
   if (placeResult.isNew) {
     finalPlaceId = createPlace(placeResult.raw, sourceObj.addressRaw, sourceObj.addressFromLatLong);
     autoCreatedCount++;
   }
   
   // สร้าง Geo ถ้าพิกัดห่างไกลจากจุดเดิมทั้งหมด
   if (geoResult.isNew) {
     finalGeoId = createGeoPoint(geoResult.lat, geoResult.lng, geoResult.keys, sourceObj.latLongText);
     autoCreatedCount++;
   }
   
   // 3. รวมคะแนน
   const bonusScore = evaluateThaiGeoBonus(sourceObj);
   const compositeScore = calculateCompositeScore(personResult.score, placeResult.score, geoResult.score, autoCreatedCount, bonusScore);
   
   // 4. สร้างหรือค้นหา Destination
   // (ถ้ายังขาด ID อันใดอันหนึ่ง แสดงว่าคะแนนไม่ถึงเกณฑ์ auto match และมันไม่ใช่ของใหม่ร้อยเปอร์เซ็นต์ -> รอ Review)
   let destResult = { id: null, isNew: false, key: '' };
   if (finalPersonId && finalPlaceId && finalGeoId) {
     destResult = resolveDestination(finalPersonId, finalPlaceId, finalGeoId, sourceObj);
   }
   
   return {
     person: { ...personResult, finalId: finalPersonId },
     place: { ...placeResult, finalId: finalPlaceId },
     geo: { ...geoResult, finalId: finalGeoId },
     dest: destResult,
-    compositeScore: compositeScore
+    compositeScore: compositeScore,
+    qualityFlags: qualityFlags
   };
 }
 
 function calculateCompositeScore(pScore, plScore, gScore, autoCreatedCount, bonusScore = 0) {
   // ถ้าเพิ่งถูกสร้างใหม่หมด แปลว่าเป็น Master ใหม่ชัวร์ ให้คะแนนเต็ม 100
   if (autoCreatedCount >= 3) return 100;
   
   // น้ำหนัก V4.4: Geo 45%, Person 30%, Place 25%
   let score = (pScore * 0.30) + (plScore * 0.25) + (gScore * 0.45);
   
   // บวกโบนัสความแม่นยำทางภูมิศาสตร์ (ถ้ามี)
   score += bonusScore;
   
   return Math.min(100, Math.round(score));
 }
 
 function decideAutoMatchOrReview(matchResult) {
   const thresholds = getThresholds();
+  if (matchResult.qualityFlags && matchResult.qualityFlags.length > 0) return 'REVIEW';
   
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
 
 function buildReviewPayload(sourceObj, matchResult) {
   const cPersonIds = matchResult.person.candidates.map(c => c.personId || c.id).join(',');
   const cPlaceIds = matchResult.place.candidates.map(c => c.placeId || c.id).join(',');
   const cGeoIds = matchResult.geo.candidates.map(c => c.geoId || c.id).join(',');
   
+  const qualityNote = (matchResult.qualityFlags && matchResult.qualityFlags.length > 0)
+    ? '\n⚠️ Data quality flags: ' + matchResult.qualityFlags.join(', ')
+    : '';
+
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
-          '\n💡 ที่อยู่แนะนำ: ' + smartMergeAddress(sourceObj.addressRaw, sourceObj.addressFromLatLong)
+          '\n💡 ที่อยู่แนะนำ: ' + smartMergeAddress(sourceObj.addressRaw, sourceObj.addressFromLatLong) +
+          qualityNote
   };
 }
 
 function detectConflictType(matchResult) {
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

README.md

 # 📦 Logistics Master Data System (LMDS) V4.4
 ### เวอร์ชัน: Standard Edition (Full AI Synthesis) - Manual Safety Mode
 
 ระบบจัดการฐานข้อมูลหลัก (Master Data Management) สำหรับงานขนส่งสินค้า พัฒนาบน Google Apps Script เพื่อแก้ปัญหาความซ้ำซ้อนของข้อมูลและเพิ่มความแม่นยำของพิกัดจัดส่ง
 
 ---
 
 ## 🌟 ฟีเจอร์เด่น (Key Features)
 
 - **Relational Database Model:** แยกข้อมูลเป็น 3 ชั้น (Raw Data -> Master Data -> Fact Delivery) เพื่อความสะอาดและไม่ซ้ำซ้อน
 - **AI Synthesis Engine:** รวมเทคนิคที่ดีที่สุดจาก AI 8 ค่าย (เช่น Unicode NFC, Advanced Thai Regex)
 - **Manual Safety Watch:** ระบบเฝ้าระวังขีดจำกัด 6 นาทีของ Google โดยจะหยุดพักและบันทึก Checkpoint ให้โดยอัตโนมัติ เพื่อให้แอดมินกดรันต่อเองได้อย่างปลอดภัย
 - **Google Maps Cache:** ระบบจำพิกัดและระยะทางลงในชีต `MAPS_CACHE` ถาวร ช่วยประหยัด Quota และเพิ่มความเร็วในการรัน
 - **Thai Geo Bonus Scoring:** ใช้ฐานข้อมูล `SYS_TH_GEO` มาช่วยเพิ่มคะแนนความแม่นยำ (Bonus) หากที่อยู่ดิบตรงกับพิกัดจริง
+- **Data Quality Guardrails:** ตรวจจับข้อมูลชื่อ/ที่อยู่ที่สั้นหรือกำกวม (`LOW_QUALITY_*`) และบังคับส่งเข้า `Q_REVIEW` เพื่อลดการ merge ผิดคน/ผิดที่
 - **Timed Auto-Close Alerts:** หน้าต่างแจ้งเตือนนับถอยหลัง 10 วินาที และปิดตัวเองอัตโนมัติ ไม่กวนใจตอนทำงาน
 
 ---
 
 ## 📂 โครงสร้างไฟล์ (File Structure)
 
 ระบบประกอบด้วย 17 โมดูลหลัก:
 1.  **00_App.gs**: จุดเริ่มต้นระบบ, เมนูหลัก และการประมวลผลประจำวัน
 2.  **01_Config.gs**: ตั้งค่าชื่อชีตและเกณฑ์คะแนน (Thresholds)
 3.  **02_Schema.gs**: คำนิยามโครงสร้างคอลัมน์ของทุกตาราง
 4.  **03_SetupSheets.gs**: ระบบติดตั้งและสร้างชีตอัตโนมัติ
 5.  **04_SourceRepository.gs**: จัดการการอ่านข้อมูลจากชีตดิบ (SCG)
 6.  **05_NormalizeService.gs**: เอนจินล้างข้อมูล (NFC, Regex, Auto-Fill)
 7.  **06_PersonService.gs**: จัดการข้อมูล Master บุคคล
 8.  **07_PlaceService.gs**: จัดการข้อมูล Master สถานที่
 9.  **08_GeoService.gs**: จัดการข้อมูล Master พิกัดพิกัด (Lat/Long)
 10. **09_DestinationService.gs**: จัดการข้อมูลจุดหมายปลายทาง (Unique Points)
 11. **10_MatchEngine.gs**: สมองกลตัดสินใจ (Scoring & Conflict Detection)
 12. **11_TransactionService.gs**: บันทึกข้อมูลลงตาราง Fact
 13. **12_ReviewService.gs**: ระบบจัดการคิวรอรีวิว (Q_REVIEW) และระบบ Dropdown
 14. **13_ReportService.gs**: สรุปรายงานคุณภาพข้อมูลและสรุปประจำวัน
 15. **14_Utils.gs**: เครื่องมือเสริม (UUID, Dice, Haversine, Timed Alerts)
 16. **15_GoogleMapsAPI.gs**: ฟังก์ชัน Google Maps และระบบ Cache 2 ชั้น
 17. **16_GeoDictionaryBuilder.gs**: ระบบสร้างพจนานุกรมจากชีต `SYS_TH_GEO`
 

Summary
ดำเนิน “เฟสถัดไป” ให้แล้ว: ผมเพิ่ม Rule Table สำหรับ 8 ปัญหา (R01–R08) ใน MatchEngine โดยแต่ละกฎมี severity, penalty, description ชัดเจน เพื่อใช้เป็นเหตุผลเชิงระบบระดับ production.

เพิ่มฟังก์ชันประเมินกฎ evaluateConflictRules() ที่อ่านผลคะแนน person/place/geo และจำนวน candidate แล้วยิง reason code ตามเงื่อนไขของทั้ง 8 เคส เช่น R08_DIFF_PERSON_SAME_GEO, R07_SAME_PERSON_DIFF_GEO ฯลฯ.

ปรับ pipeline การให้คะแนนเป็น 3 ชั้น:

compositeScoreRaw

rulePenalty (รวมโทษจากกฎ, cap ที่ 30)

compositeScore (คะแนนสุดท้ายหลังหักโทษ)
ทำให้ผลตัดสินโปร่งใสและปรับแต่งได้ง่าย.

เพิ่มเงื่อนไขตัดสิน AUTO_MATCH/REVIEW ให้ปลอดภัยขึ้น: ถ้ามี HIGH severity rule จะบังคับเข้า REVIEW ทันที ลดความเสี่ยง merge ผิดคน/ผิดที่.

อัปเกรด payload สำหรับ Q_REVIEW: ใส่ Reason codes และ score breakdown (raw/penalty/final) ลงใน note เพื่อให้ทีมรีวิวเห็นเหตุผลเชิงตรรกะครบถ้วนในแถวเดียว.

ปรับ detectConflictType() ให้ map จาก rule code โดยตรง แทนการพึ่ง threshold แบบหยาบอย่างเดียว ทำให้ issue type ตรงกับเคส 1–8 ชัดเจนกว่าเดิม.

อัปเดต README เพิ่ม capability ใหม่ “8-Case Conflict Rules” ให้ตรงกับโค้ดปัจจุบัน.

ตาราง Reason Code ที่ใส่ในระบบ (ตาม 8 ปัญหา)
R01_DUP_PERSON_NAME → ชื่อบุคคลซ้ำ/ใกล้กันหลายรายการ

R02_DUP_PLACE_NAME → ชื่อสถานที่ซ้ำ/ใกล้กันหลายรายการ

R03_DUP_GEO_POINT → LatLong ซ้ำ/ใกล้กับจุดเดิมหลายรายการ

R04_SAME_PERSON_ALIAS_VARIANT → บุคคลเดียวกันแต่ alias ไม่ตรง ต้อง review

R05_DIFF_PERSON_SAME_PLACE → คนละชื่อแต่สถานที่เดียวกัน

R06_SAME_PERSON_DIFF_PLACE → ชื่อเดียวกันแต่สถานที่ต่างกัน

R07_SAME_PERSON_DIFF_GEO → ชื่อเดียวกันแต่ LatLong ต่างกัน

R08_DIFF_PERSON_SAME_GEO → คนละชื่อแต่ LatLong เดียวกัน

Testing

✅ rg -n 'getConflictRuleTable|evaluateConflictRules|dedupeRuleHits|calculateRulePenalty|R0[1-8]_' 10_MatchEngine.gs && git status --short

✅ git add 10_MatchEngine.gs README.md && git commit -m "Add production rule table for 8 conflict scenarios"

10_MatchEngine.gs

   let finalPlaceId = placeResult.id;
   let finalGeoId = geoResult.id;
   
   let autoCreatedCount = 0;
   
   // สร้าง Person ถ้าเป็นคนใหม่ชัวร์ (ไม่มี Candidate คล้ายเลย)
   if (personResult.isNew) {
     finalPersonId = createPerson(personResult.raw, personResult.normalized, personResult.phone);
     autoCreatedCount++;
   }
   
   // สร้าง Place ถ้าที่อยู่ใหม่ชัวร์
   if (placeResult.isNew) {
     finalPlaceId = createPlace(placeResult.raw, sourceObj.addressRaw, sourceObj.addressFromLatLong);
     autoCreatedCount++;
   }
   
   // สร้าง Geo ถ้าพิกัดห่างไกลจากจุดเดิมทั้งหมด
   if (geoResult.isNew) {
     finalGeoId = createGeoPoint(geoResult.lat, geoResult.lng, geoResult.keys, sourceObj.latLongText);
     autoCreatedCount++;
   }
   
   // 3. รวมคะแนน
   const bonusScore = evaluateThaiGeoBonus(sourceObj);
-  const compositeScore = calculateCompositeScore(personResult.score, placeResult.score, geoResult.score, autoCreatedCount, bonusScore);
+  const compositeScoreRaw = calculateCompositeScore(personResult.score, placeResult.score, geoResult.score, autoCreatedCount, bonusScore);
+  const ruleEvaluation = evaluateConflictRules(personResult, placeResult, geoResult);
+  const penalty = calculateRulePenalty(ruleEvaluation.hits);
+  const compositeScore = Math.max(0, compositeScoreRaw - penalty);
   
   // 4. สร้างหรือค้นหา Destination
   // (ถ้ายังขาด ID อันใดอันหนึ่ง แสดงว่าคะแนนไม่ถึงเกณฑ์ auto match และมันไม่ใช่ของใหม่ร้อยเปอร์เซ็นต์ -> รอ Review)
   let destResult = { id: null, isNew: false, key: '' };
   if (finalPersonId && finalPlaceId && finalGeoId) {
     destResult = resolveDestination(finalPersonId, finalPlaceId, finalGeoId, sourceObj);
   }
   
   return {
     person: { ...personResult, finalId: finalPersonId },
     place: { ...placeResult, finalId: finalPlaceId },
     geo: { ...geoResult, finalId: finalGeoId },
     dest: destResult,
     compositeScore: compositeScore,
-    qualityFlags: qualityFlags
+    compositeScoreRaw: compositeScoreRaw,
+    qualityFlags: qualityFlags,
+    ruleHits: ruleEvaluation.hits,
+    rulePenalty: penalty
   };
 }
 
 function calculateCompositeScore(pScore, plScore, gScore, autoCreatedCount, bonusScore = 0) {
   // ถ้าเพิ่งถูกสร้างใหม่หมด แปลว่าเป็น Master ใหม่ชัวร์ ให้คะแนนเต็ม 100
   if (autoCreatedCount >= 3) return 100;
   
   // น้ำหนัก V4.4: Geo 45%, Person 30%, Place 25%
   let score = (pScore * 0.30) + (plScore * 0.25) + (gScore * 0.45);
   
   // บวกโบนัสความแม่นยำทางภูมิศาสตร์ (ถ้ามี)
   score += bonusScore;
   
   return Math.min(100, Math.round(score));
 }
 
 function decideAutoMatchOrReview(matchResult) {
   const thresholds = getThresholds();
   if (matchResult.qualityFlags && matchResult.qualityFlags.length > 0) return 'REVIEW';
+  if (matchResult.ruleHits && matchResult.ruleHits.some(r => r.severity === 'HIGH')) return 'REVIEW';
   
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
 
 function buildReviewPayload(sourceObj, matchResult) {
   const cPersonIds = matchResult.person.candidates.map(c => c.personId || c.id).join(',');
   const cPlaceIds = matchResult.place.candidates.map(c => c.placeId || c.id).join(',');
   const cGeoIds = matchResult.geo.candidates.map(c => c.geoId || c.id).join(',');
   
   const qualityNote = (matchResult.qualityFlags && matchResult.qualityFlags.length > 0)
     ? '\n⚠️ Data quality flags: ' + matchResult.qualityFlags.join(', ')
     : '';
+  const ruleNote = (matchResult.ruleHits && matchResult.ruleHits.length > 0)
+    ? '\n🧭 Reason codes: ' + matchResult.ruleHits.map(r => r.code).join(', ')
+    : '';
+  const scoreNote = `\n📊 Score(raw/penalty/final): ${matchResult.compositeScoreRaw || matchResult.compositeScore}/${matchResult.rulePenalty || 0}/${matchResult.compositeScore}`;
 
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
           '\n💡 ที่อยู่แนะนำ: ' + smartMergeAddress(sourceObj.addressRaw, sourceObj.addressFromLatLong) +
-          qualityNote
+          qualityNote +
+          ruleNote +
+          scoreNote
   };
 }
 
 function detectConflictType(matchResult) {
-  if (matchResult.geo.score >= 90 && matchResult.person.score < 50) return 'SAME_GEO_DIFF_PERSON'; // ปัญหา 8
-  if (matchResult.person.score >= 90 && matchResult.geo.score < 50) return 'SAME_PERSON_DIFF_GEO'; // ปัญหา 7
-  if (matchResult.person.score >= 90 && matchResult.place.score < 50) return 'SAME_PERSON_DIFF_PLACE'; // ปัญหา 6
-  if (matchResult.place.score >= 90 && matchResult.person.score < 50) return 'SAME_PLACE_DIFF_PERSON'; // ปัญหา 5
+  const hits = matchResult.ruleHits || [];
+  if (hits.some(r => r.code === 'R08_DIFF_PERSON_SAME_GEO')) return 'SAME_GEO_DIFF_PERSON'; // ปัญหา 8
+  if (hits.some(r => r.code === 'R07_SAME_PERSON_DIFF_GEO')) return 'SAME_PERSON_DIFF_GEO'; // ปัญหา 7
+  if (hits.some(r => r.code === 'R06_SAME_PERSON_DIFF_PLACE')) return 'SAME_PERSON_DIFF_PLACE'; // ปัญหา 6
+  if (hits.some(r => r.code === 'R05_DIFF_PERSON_SAME_PLACE')) return 'SAME_PLACE_DIFF_PERSON'; // ปัญหา 5
+  if (hits.some(r => r.code === 'R04_SAME_PERSON_ALIAS_VARIANT')) return 'PERSON_ALIAS_REVIEW'; // ปัญหา 4
+  if (hits.some(r => r.code === 'R03_DUP_GEO_POINT')) return 'DUPLICATE_GEO'; // ปัญหา 3
+  if (hits.some(r => r.code === 'R02_DUP_PLACE_NAME')) return 'DUPLICATE_PLACE'; // ปัญหา 2
+  if (hits.some(r => r.code === 'R01_DUP_PERSON_NAME')) return 'DUPLICATE_PERSON'; // ปัญหา 1
   return 'AMBIGUOUS_DATA'; // ครุมเครือ
 }
 
+/**
+ * Rule table สำหรับ 8 ปัญหาหลัก (Production-ready reason codes)
+ */
+function getConflictRuleTable() {
+  return [
+    { code: 'R01_DUP_PERSON_NAME', severity: 'MEDIUM', penalty: 10, description: 'ชื่อบุคคลซ้ำกัน/ใกล้กันหลายรายการ' },
+    { code: 'R02_DUP_PLACE_NAME', severity: 'MEDIUM', penalty: 10, description: 'ชื่อสถานที่ซ้ำกัน/ใกล้กันหลายรายการ' },
+    { code: 'R03_DUP_GEO_POINT', severity: 'LOW', penalty: 5, description: 'LatLong ซ้ำหรือใกล้มากกับหลายจุดเดิม' },
+    { code: 'R04_SAME_PERSON_ALIAS_VARIANT', severity: 'MEDIUM', penalty: 8, description: 'บุคคลเดียวกันแต่ alias ไม่ตรงกัน ต้องให้คนรีวิว' },
+    { code: 'R05_DIFF_PERSON_SAME_PLACE', severity: 'HIGH', penalty: 15, description: 'คนละชื่อแต่สถานที่เดียวกัน' },
+    { code: 'R06_SAME_PERSON_DIFF_PLACE', severity: 'HIGH', penalty: 15, description: 'ชื่อเดียวกันแต่สถานที่ต่างกัน' },
+    { code: 'R07_SAME_PERSON_DIFF_GEO', severity: 'HIGH', penalty: 20, description: 'ชื่อเดียวกันแต่ LatLong ต่างกันชัดเจน' },
+    { code: 'R08_DIFF_PERSON_SAME_GEO', severity: 'HIGH', penalty: 20, description: 'คนละชื่อแต่ LatLong เดียวกัน' }
+  ];
+}
+
+function evaluateConflictRules(personResult, placeResult, geoResult) {
+  const thresholds = getThresholds();
+  const hits = [];
+  const personCandidates = (personResult.candidates || []).length;
+  const placeCandidates = (placeResult.candidates || []).length;
+  const geoCandidates = (geoResult.candidates || []).length;
+  const p = personResult.score || 0;
+  const pl = placeResult.score || 0;
+  const g = geoResult.score || 0;
+  const reviewMin = thresholds.reviewScoreMin || 75;
+  const autoMin = thresholds.autoMatchScore || 90;
+  const ruleMap = {};
+  getConflictRuleTable().forEach(r => (ruleMap[r.code] = r));
+
+  if (personCandidates >= 2 && p >= reviewMin && p < autoMin) hits.push(ruleMap['R01_DUP_PERSON_NAME']);
+  if (placeCandidates >= 2 && pl >= reviewMin && pl < autoMin) hits.push(ruleMap['R02_DUP_PLACE_NAME']);
+  if (geoCandidates >= 2 && g >= autoMin) hits.push(ruleMap['R03_DUP_GEO_POINT']);
+  if (p >= reviewMin && p < autoMin && (pl >= autoMin || g >= autoMin)) hits.push(ruleMap['R04_SAME_PERSON_ALIAS_VARIANT']);
+  if (pl >= autoMin && p < 60) hits.push(ruleMap['R05_DIFF_PERSON_SAME_PLACE']);
+  if (p >= autoMin && pl < 60) hits.push(ruleMap['R06_SAME_PERSON_DIFF_PLACE']);
+  if (p >= autoMin && g < 60) hits.push(ruleMap['R07_SAME_PERSON_DIFF_GEO']);
+  if (g >= autoMin && p < 60) hits.push(ruleMap['R08_DIFF_PERSON_SAME_GEO']);
+
+  return { hits: dedupeRuleHits(hits) };
+}
+
+function dedupeRuleHits(hits) {
+  const map = {};
+  (hits || []).forEach(h => {
+    if (h && h.code) map[h.code] = h;
+  });
+  return Object.keys(map).map(k => map[k]);
+}
+
+function calculateRulePenalty(ruleHits) {
+  if (!ruleHits || ruleHits.length === 0) return 0;
+  const total = ruleHits.reduce((sum, r) => sum + (r.penalty || 0), 0);
+  return Math.min(30, total); // cap โทษคะแนน ไม่ให้รุนแรงเกินไป
+}
+
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
   }
   
   return bonus;
 }

README.md

 # 📦 Logistics Master Data System (LMDS) V4.4
 ### เวอร์ชัน: Standard Edition (Full AI Synthesis) - Manual Safety Mode
 
 ระบบจัดการฐานข้อมูลหลัก (Master Data Management) สำหรับงานขนส่งสินค้า พัฒนาบน Google Apps Script เพื่อแก้ปัญหาความซ้ำซ้อนของข้อมูลและเพิ่มความแม่นยำของพิกัดจัดส่ง
 
 ---
 
 ## 🌟 ฟีเจอร์เด่น (Key Features)
 
 - **Relational Database Model:** แยกข้อมูลเป็น 3 ชั้น (Raw Data -> Master Data -> Fact Delivery) เพื่อความสะอาดและไม่ซ้ำซ้อน
 - **AI Synthesis Engine:** รวมเทคนิคที่ดีที่สุดจาก AI 8 ค่าย (เช่น Unicode NFC, Advanced Thai Regex)
 - **Manual Safety Watch:** ระบบเฝ้าระวังขีดจำกัด 6 นาทีของ Google โดยจะหยุดพักและบันทึก Checkpoint ให้โดยอัตโนมัติ เพื่อให้แอดมินกดรันต่อเองได้อย่างปลอดภัย
 - **Google Maps Cache:** ระบบจำพิกัดและระยะทางลงในชีต `MAPS_CACHE` ถาวร ช่วยประหยัด Quota และเพิ่มความเร็วในการรัน
 - **Thai Geo Bonus Scoring:** ใช้ฐานข้อมูล `SYS_TH_GEO` มาช่วยเพิ่มคะแนนความแม่นยำ (Bonus) หากที่อยู่ดิบตรงกับพิกัดจริง
 - **Data Quality Guardrails:** ตรวจจับข้อมูลชื่อ/ที่อยู่ที่สั้นหรือกำกวม (`LOW_QUALITY_*`) และบังคับส่งเข้า `Q_REVIEW` เพื่อลดการ merge ผิดคน/ผิดที่
+- **8-Case Conflict Rules:** มีกติกา Reason Code (`R01`-`R08`) สำหรับปัญหาซ้ำหลัก 8 แบบ พร้อม penalty score และ priority เพื่อคุมการ AUTO_MATCH ในระดับ production
 - **Timed Auto-Close Alerts:** หน้าต่างแจ้งเตือนนับถอยหลัง 10 วินาที และปิดตัวเองอัตโนมัติ ไม่กวนใจตอนทำงาน
 
 ---
 
 ## 📂 โครงสร้างไฟล์ (File Structure)
 
 ระบบประกอบด้วย 17 โมดูลหลัก:
 1.  **00_App.gs**: จุดเริ่มต้นระบบ, เมนูหลัก และการประมวลผลประจำวัน
 2.  **01_Config.gs**: ตั้งค่าชื่อชีตและเกณฑ์คะแนน (Thresholds)
 3.  **02_Schema.gs**: คำนิยามโครงสร้างคอลัมน์ของทุกตาราง
 4.  **03_SetupSheets.gs**: ระบบติดตั้งและสร้างชีตอัตโนมัติ
 5.  **04_SourceRepository.gs**: จัดการการอ่านข้อมูลจากชีตดิบ (SCG)
 6.  **05_NormalizeService.gs**: เอนจินล้างข้อมูล (NFC, Regex, Auto-Fill)
 7.  **06_PersonService.gs**: จัดการข้อมูล Master บุคคล
 8.  **07_PlaceService.gs**: จัดการข้อมูล Master สถานที่
 9.  **08_GeoService.gs**: จัดการข้อมูล Master พิกัดพิกัด (Lat/Long)
 10. **09_DestinationService.gs**: จัดการข้อมูลจุดหมายปลายทาง (Unique Points)
 11. **10_MatchEngine.gs**: สมองกลตัดสินใจ (Scoring & Conflict Detection)
 12. **11_TransactionService.gs**: บันทึกข้อมูลลงตาราง Fact
 13. **12_ReviewService.gs**: ระบบจัดการคิวรอรีวิว (Q_REVIEW) และระบบ Dropdown
 14. **13_ReportService.gs**: สรุปรายงานคุณภาพข้อมูลและสรุปประจำวัน
 15. **14_Utils.gs**: เครื่องมือเสริม (UUID, Dice, Haversine, Timed Alerts)
 16. **15_GoogleMapsAPI.gs**: ฟังก์ชัน Google Maps และระบบ Cache 2 ชั้น
 17. **16_GeoDictionaryBuilder.gs**: ระบบสร้างพจนานุกรมจากชีต `SYS_TH_GEO`
 

Summary
มีครับ — ผมเพิ่มส่วนที่ “ควรมีต่อจาก rule engine production” ให้แล้ว คือ Self-test สำหรับกฎทั้ง 8 เคส เพื่อให้ทีมตรวจสุขภาพระบบหลัง deploy ได้ทันที ไม่ต้องเดาเองว่ากฎยังทำงานถูกหรือไม่.

ผมผูกเมนูใหม่ใน Apps Script UI:
📦 LMDS System > 6. ตรวจสอบ Rule Engine (Self-test) เพื่อให้กดรันได้จากหน้า Sheet เลย.

ฟังก์ชัน runConflictRuleSelfTest() จะจำลองครบทั้ง R01–R08, ตรวจว่าแต่ละเคสยิง reason code ที่คาดหวังหรือไม่, และ:

ถ้าพัง: alert + log error + throw error

ถ้าผ่าน: toast + log info

ผมอัปเดต README ให้ทีมใช้งานได้ทันทีว่าต้องกดเมนูไหน และผล pass/fail หน้าตาเป็นอย่างไร.

ตอบคำถามตรงๆ: มีส่วนที่ต้องเพิ่ม และผมเพิ่มให้แล้วครับ คือ “diagnostics/self-test” ซึ่งเป็นช่องว่างสำคัญก่อนใช้งาน production จริง

Testing

✅ rg -n 'runConflictRuleSelfTest|Case8 diff person same geo|ตรวจสอบ Rule Engine' 00_App.gs 10_MatchEngine.gs README.md && git status --short

✅ git add 00_App.gs 10_MatchEngine.gs README.md && git commit -m "Add rule-engine self-test menu for 8 conflict cases"

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
+    .addItem('6. ตรวจสอบ Rule Engine (Self-test)', 'runConflictRuleSelfTest')
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

10_MatchEngine.gs

   if (placeCandidates >= 2 && pl >= reviewMin && pl < autoMin) hits.push(ruleMap['R02_DUP_PLACE_NAME']);
   if (geoCandidates >= 2 && g >= autoMin) hits.push(ruleMap['R03_DUP_GEO_POINT']);
   if (p >= reviewMin && p < autoMin && (pl >= autoMin || g >= autoMin)) hits.push(ruleMap['R04_SAME_PERSON_ALIAS_VARIANT']);
   if (pl >= autoMin && p < 60) hits.push(ruleMap['R05_DIFF_PERSON_SAME_PLACE']);
   if (p >= autoMin && pl < 60) hits.push(ruleMap['R06_SAME_PERSON_DIFF_PLACE']);
   if (p >= autoMin && g < 60) hits.push(ruleMap['R07_SAME_PERSON_DIFF_GEO']);
   if (g >= autoMin && p < 60) hits.push(ruleMap['R08_DIFF_PERSON_SAME_GEO']);
 
   return { hits: dedupeRuleHits(hits) };
 }
 
 function dedupeRuleHits(hits) {
   const map = {};
   (hits || []).forEach(h => {
     if (h && h.code) map[h.code] = h;
   });
   return Object.keys(map).map(k => map[k]);
 }
 
 function calculateRulePenalty(ruleHits) {
   if (!ruleHits || ruleHits.length === 0) return 0;
   const total = ruleHits.reduce((sum, r) => sum + (r.penalty || 0), 0);
   return Math.min(30, total); // cap โทษคะแนน ไม่ให้รุนแรงเกินไป
 }
 
+/**
+ * Self-test สำหรับ Rule Engine (ใช้ตรวจสุขภาพหลัง deploy)
+ * เมนู: LMDS System > 6. ตรวจสอบ Rule Engine (Self-test)
+ */
+function runConflictRuleSelfTest() {
+  const cases = [
+    { name: 'Case1 duplicate person', p: { score: 82, candidates: [{}, {}] }, pl: { score: 30, candidates: [] }, g: { score: 30, candidates: [] }, expect: 'R01_DUP_PERSON_NAME' },
+    { name: 'Case2 duplicate place', p: { score: 30, candidates: [] }, pl: { score: 85, candidates: [{}, {}] }, g: { score: 30, candidates: [] }, expect: 'R02_DUP_PLACE_NAME' },
+    { name: 'Case3 duplicate geo', p: { score: 30, candidates: [] }, pl: { score: 30, candidates: [] }, g: { score: 95, candidates: [{}, {}] }, expect: 'R03_DUP_GEO_POINT' },
+    { name: 'Case4 alias variant', p: { score: 78, candidates: [{}] }, pl: { score: 92, candidates: [{}] }, g: { score: 80, candidates: [{}] }, expect: 'R04_SAME_PERSON_ALIAS_VARIANT' },
+    { name: 'Case5 diff person same place', p: { score: 40, candidates: [{}] }, pl: { score: 92, candidates: [{}] }, g: { score: 55, candidates: [{}] }, expect: 'R05_DIFF_PERSON_SAME_PLACE' },
+    { name: 'Case6 same person diff place', p: { score: 92, candidates: [{}] }, pl: { score: 40, candidates: [{}] }, g: { score: 70, candidates: [{}] }, expect: 'R06_SAME_PERSON_DIFF_PLACE' },
+    { name: 'Case7 same person diff geo', p: { score: 94, candidates: [{}] }, pl: { score: 80, candidates: [{}] }, g: { score: 35, candidates: [{}] }, expect: 'R07_SAME_PERSON_DIFF_GEO' },
+    { name: 'Case8 diff person same geo', p: { score: 45, candidates: [{}] }, pl: { score: 75, candidates: [{}] }, g: { score: 93, candidates: [{}] }, expect: 'R08_DIFF_PERSON_SAME_GEO' }
+  ];
+  
+  const failed = [];
+  cases.forEach(tc => {
+    const hits = evaluateConflictRules(tc.p, tc.pl, tc.g).hits.map(h => h.code);
+    if (hits.indexOf(tc.expect) === -1) {
+      failed.push(`${tc.name} => expected ${tc.expect}, got [${hits.join(', ')}]`);
+    }
+  });
+  
+  if (failed.length > 0) {
+    const msg = '❌ Rule self-test failed:\n' + failed.join('\n');
+    writeLog('ERROR', '10_MatchEngine', 'runConflictRuleSelfTest', '', msg, '');
+    SpreadsheetApp.getUi().alert(msg);
+    throw new Error(msg);
+  }
+  
+  const passMsg = `✅ Rule self-test passed (${cases.length} cases)`;
+  writeLog('INFO', '10_MatchEngine', 'runConflictRuleSelfTest', '', passMsg, '');
+  SpreadsheetApp.getActiveSpreadsheet().toast(passMsg, 'Diagnostics', 5);
+}
+
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
   }
   
   return bonus;
 }

README.md

 8.  **07_PlaceService.gs**: จัดการข้อมูล Master สถานที่
 9.  **08_GeoService.gs**: จัดการข้อมูล Master พิกัดพิกัด (Lat/Long)
 10. **09_DestinationService.gs**: จัดการข้อมูลจุดหมายปลายทาง (Unique Points)
 11. **10_MatchEngine.gs**: สมองกลตัดสินใจ (Scoring & Conflict Detection)
 12. **11_TransactionService.gs**: บันทึกข้อมูลลงตาราง Fact
 13. **12_ReviewService.gs**: ระบบจัดการคิวรอรีวิว (Q_REVIEW) และระบบ Dropdown
 14. **13_ReportService.gs**: สรุปรายงานคุณภาพข้อมูลและสรุปประจำวัน
 15. **14_Utils.gs**: เครื่องมือเสริม (UUID, Dice, Haversine, Timed Alerts)
 16. **15_GoogleMapsAPI.gs**: ฟังก์ชัน Google Maps และระบบ Cache 2 ชั้น
 17. **16_GeoDictionaryBuilder.gs**: ระบบสร้างพจนานุกรมจากชีต `SYS_TH_GEO`
 
 ---
 
 ## 🚀 วิธีการใช้งาน (How to Use)
 
 ### 1. การติดตั้งครั้งแรก
 1. เปิด Google Sheets ของคุณ
 2. ไปที่เมนู **📦 LMDS System** > **1. ติดตั้งระบบครั้งแรก (Setup)**
 3. ระบบจะสร้างชีตที่จำเป็นทั้งหมดและตั้งค่าเริ่มต้นให้
 
 ### 2. การประมวลผลประจำวัน
 1. นำข้อมูลดิบมาวางในชีตต้นทาง (SCG...)
 2. ไปที่เมนู **📦 LMDS System** > **2. ประมวลผลข้อมูลประจำวัน**
 3. ระบบจะรันไปเรื่อยๆ หากข้อมูลมีปริมาณมากและครบ 5 นาที ระบบจะโชว์ Popup นับถอยหลังแจ้งให้คุณกดรันต่อเองเพื่อความปลอดภัย
 
+### 2.1 การตรวจสุขภาพ Rule Engine
+1. ไปที่เมนู **📦 LMDS System** > **6. ตรวจสอบ Rule Engine (Self-test)**
+2. ระบบจะทดสอบทั้ง 8 เคส (`R01`-`R08`) อัตโนมัติ
+3. ถ้าผ่าน จะขึ้น `✅ Rule self-test passed`; ถ้าไม่ผ่านจะ Alert พร้อมรายการเคสที่ผิด
+
 ### 3. การตัดสินใจในคิวรีวิว (Q_REVIEW)
 1. เมื่อระบบไม่มั่นใจ ข้อมูลจะเด้งมาที่ชีต `Q_REVIEW`
 2. เลือกคำสั่งในคอลัมน์ **Decision** (Dropdown):
     - `CREATE_NEW`: สร้างข้อมูลใหม่
     - `MERGE_TO_CANDIDATE`: รวมเข้ากับข้อมูลเดิมที่มีอยู่
     - `IGNORE`: ข้ามรายการนี้
 3. ระบบจะจัดการอัปเดต Master Data ให้ทันทีหลังเลือก
 
 ---
 
 ## 🛠 การบำรุงรักษา (Maintenance)
 
 - **MAPS_CACHE**: หากต้องการล้างแคชพิกัดทั้งหมด สามารถลบข้อมูลในชีตนี้ได้เลย
 - **SYS_TH_GEO**: สามารถอัปเดตข้อมูลตำบล/รหัสไปรษณีย์ใหม่ๆ ได้ตลอดเวลา แล้วกดเมนู **3. อัปเดตพจนานุกรมสถานที่** เพื่อให้ระบบจดจำค่าใหม่
 - **SYS_LOG**: ตรวจสอบย้อนหลังได้หากเกิด Error ในการประมวลผล
 
 ---
 
 ## ⚖️ License
 พัฒนาเพื่อใช้ในงานบริหารจัดการข้อมูลขนส่ง SCG Logistics โดยคุณ **Kamonwantanakun**

Summary
เข้าใจ requirement ชัดเจนครับ: ต้อง “ค้นหาด้วย ชื่อปลายทาง(บุคคล) + ที่อยู่ปลายทาง(สถานที่) แล้วได้ LatLong ที่นำไปใช้จริงได้” ผมเลยเพิ่มโมดูลใหม่ 17_SearchService.gs เพื่อทำ use case นี้ตรงๆ ใน production flow.

เพิ่มฟังก์ชันหลัก findBestGeoByPersonPlace(personName, placeName):

normalize + quality check ก่อน

หา candidate คน/สถานที่จาก master+alias ที่มีอยู่

จับคู่ใน M_DESTINATION

map ไป M_GEO_POINT เพื่อคืน lat/lng

คืนสถานะที่ใช้งานจริงได้: FOUND, FOUND_WITH_DOMINANT_HISTORY, AMBIGUOUS, NOT_FOUND, REVIEW_REQUIRED, ERROR.

เพิ่ม custom function สำหรับใช้งานใน Google Sheet โดยตรง:
=LMDS_FIND_LATLONG(ชื่อปลายทาง, ที่อยู่ปลายทาง)
คืน 6 ค่า: status | lat | lng | geoId | confidence | reason เพื่อเอาไปต่อระบบค้นหาได้ทันที.

อัปเดตเอกสารให้ครบ: ตอนนี้ระบบเป็น 18 โมดูล และระบุการใช้งาน lookup สูตรใหม่ไว้แล้ว.

Testing

✅ rg -n 'findBestGeoByPersonPlace|LMDS_FIND_LATLONG|ระบบประกอบด้วย 18 โมดูลหลัก' 17_SearchService.gs README.md && git status --short

✅ git add 17_SearchService.gs README.md && git commit -m "Add production lat/long lookup by person+place"

ถ้าคุณต้องการ ผมทำต่อเฟสถัดไปได้ทันที:
Batch Enrichment (เติม LatLong กลับเข้าแถวข้อมูลดิบอัตโนมัติทั้งชีต พร้อม mark confidence/reason ต่อแถว) เพื่อให้ทีมใช้งานรายวันเร็วขึ้นครับ.

17_SearchService.gs

+/**
+ * 17_SearchService.gs
+ * ค้นหา LatLong จาก (ชื่อปลายทาง + ชื่อสถานที่ปลายทาง) เพื่อใช้งานจริง
+ */
+
+/**
+ * ฟังก์ชันหลักสำหรับ Script/Automation
+ * @param {string} personName ชื่อปลายทาง (บุคคล)
+ * @param {string} placeName  ที่อยู่ปลายทาง (ชื่อสถานที่)
+ * @returns {{status:string,lat:string,lng:string,geoId:string,confidence:number,reason:string,candidates:Array}}
+ */
+function findBestGeoByPersonPlace(personName, placeName) {
+  const normPerson = normalizePersonName(personName || '');
+  const normPlace = normalizePlaceName(placeName || '');
+  
+  if (isLowQualityPersonName(normPerson) || isLowQualityPlaceText(normPlace)) {
+    return {
+      status: 'REVIEW_REQUIRED',
+      lat: '',
+      lng: '',
+      geoId: '',
+      confidence: 0,
+      reason: 'INPUT_LOW_QUALITY',
+      candidates: []
+    };
+  }
+  
+  const personCandidates = findPersonCandidates(normPerson, '');
+  const placeCandidates = findPlaceCandidates(normPlace);
+  if (personCandidates.length === 0 || placeCandidates.length === 0) {
+    return {
+      status: 'NOT_FOUND',
+      lat: '',
+      lng: '',
+      geoId: '',
+      confidence: 0,
+      reason: 'PERSON_OR_PLACE_NOT_FOUND',
+      candidates: []
+    };
+  }
+  
+  const personIdSet = {};
+  const placeIdSet = {};
+  personCandidates.forEach(c => { if (c.personId) personIdSet[c.personId] = true; });
+  placeCandidates.forEach(c => { if (c.placeId) placeIdSet[c.placeId] = true; });
+  
+  const ss = SpreadsheetApp.getActiveSpreadsheet();
+  const destSheet = ss.getSheetByName('M_DESTINATION');
+  const geoSheet = ss.getSheetByName('M_GEO_POINT');
+  if (!destSheet || !geoSheet) {
+    return {
+      status: 'ERROR',
+      lat: '',
+      lng: '',
+      geoId: '',
+      confidence: 0,
+      reason: 'MISSING_SYSTEM_SHEETS',
+      candidates: []
+    };
+  }
+  
+  const destData = destSheet.getDataRange().getValues();
+  const matchedDest = [];
+  
+  for (let i = 1; i < destData.length; i++) {
+    const row = destData[i];
+    const personId = row[1];
+    const placeId = row[2];
+    const geoId = row[3];
+    const usageCount = safeNumber(row[9]) || 0;
+    if (personIdSet[personId] && placeIdSet[placeId] && geoId) {
+      matchedDest.push({ personId, placeId, geoId, usageCount });
+    }
+  }
+  
+  if (matchedDest.length === 0) {
+    return {
+      status: 'NOT_FOUND',
+      lat: '',
+      lng: '',
+      geoId: '',
+      confidence: 0,
+      reason: 'NO_DESTINATION_MATCH',
+      candidates: []
+    };
+  }
+  
+  const geoData = geoSheet.getDataRange().getValues();
+  const geoMap = {};
+  for (let i = 1; i < geoData.length; i++) {
+    const row = geoData[i];
+    geoMap[row[0]] = { lat: safeString(row[3]), lng: safeString(row[4]) };
+  }
+  
+  // รวมซ้ำตาม geoId และสะสม usage
+  const aggByGeo = {};
+  matchedDest.forEach(m => {
+    if (!aggByGeo[m.geoId]) aggByGeo[m.geoId] = { geoId: m.geoId, usageCount: 0 };
+    aggByGeo[m.geoId].usageCount += (m.usageCount || 1);
+  });
+  
+  const ranked = Object.keys(aggByGeo)
+    .map(k => aggByGeo[k])
+    .sort((a, b) => b.usageCount - a.usageCount);
+  
+  if (ranked.length === 1) {
+    const top = ranked[0];
+    const geo = geoMap[top.geoId] || { lat: '', lng: '' };
+    return {
+      status: 'FOUND',
+      lat: geo.lat,
+      lng: geo.lng,
+      geoId: top.geoId,
+      confidence: 95,
+      reason: 'UNIQUE_DESTINATION_MATCH',
+      candidates: ranked
+    };
+  }
+  
+  // ถ้าหลาย geo ให้ตัดสินจาก usage หากห่างกันชัดเจน
+  const top1 = ranked[0];
+  const top2 = ranked[1];
+  const confident = top1.usageCount >= (top2.usageCount * 2) && top1.usageCount >= 3;
+  if (confident) {
+    const geo = geoMap[top1.geoId] || { lat: '', lng: '' };
+    return {
+      status: 'FOUND_WITH_DOMINANT_HISTORY',
+      lat: geo.lat,
+      lng: geo.lng,
+      geoId: top1.geoId,
+      confidence: 85,
+      reason: 'DOMINANT_GEO_BY_USAGE',
+      candidates: ranked
+    };
+  }
+  
+  return {
+    status: 'AMBIGUOUS',
+    lat: '',
+    lng: '',
+    geoId: '',
+    confidence: 0,
+    reason: 'MULTIPLE_GEO_MATCHES',
+    candidates: ranked
+  };
+}
+
+/**
+ * ฟังก์ชันสำหรับ Google Sheets (Custom Function)
+ * ตัวอย่าง: =LMDS_FIND_LATLONG(A2,B2)
+ */
+function LMDS_FIND_LATLONG(personName, placeName) {
+  const res = findBestGeoByPersonPlace(personName, placeName);
+  return [[res.status, res.lat, res.lng, res.geoId, res.confidence, res.reason]];
+}

README.md

 # 📦 Logistics Master Data System (LMDS) V4.4
 ### เวอร์ชัน: Standard Edition (Full AI Synthesis) - Manual Safety Mode
 
 ระบบจัดการฐานข้อมูลหลัก (Master Data Management) สำหรับงานขนส่งสินค้า พัฒนาบน Google Apps Script เพื่อแก้ปัญหาความซ้ำซ้อนของข้อมูลและเพิ่มความแม่นยำของพิกัดจัดส่ง
 
 ---
 
 ## 🌟 ฟีเจอร์เด่น (Key Features)
 
 - **Relational Database Model:** แยกข้อมูลเป็น 3 ชั้น (Raw Data -> Master Data -> Fact Delivery) เพื่อความสะอาดและไม่ซ้ำซ้อน
 - **AI Synthesis Engine:** รวมเทคนิคที่ดีที่สุดจาก AI 8 ค่าย (เช่น Unicode NFC, Advanced Thai Regex)
 - **Manual Safety Watch:** ระบบเฝ้าระวังขีดจำกัด 6 นาทีของ Google โดยจะหยุดพักและบันทึก Checkpoint ให้โดยอัตโนมัติ เพื่อให้แอดมินกดรันต่อเองได้อย่างปลอดภัย
 - **Google Maps Cache:** ระบบจำพิกัดและระยะทางลงในชีต `MAPS_CACHE` ถาวร ช่วยประหยัด Quota และเพิ่มความเร็วในการรัน
 - **Thai Geo Bonus Scoring:** ใช้ฐานข้อมูล `SYS_TH_GEO` มาช่วยเพิ่มคะแนนความแม่นยำ (Bonus) หากที่อยู่ดิบตรงกับพิกัดจริง
 - **Data Quality Guardrails:** ตรวจจับข้อมูลชื่อ/ที่อยู่ที่สั้นหรือกำกวม (`LOW_QUALITY_*`) และบังคับส่งเข้า `Q_REVIEW` เพื่อลดการ merge ผิดคน/ผิดที่
 - **8-Case Conflict Rules:** มีกติกา Reason Code (`R01`-`R08`) สำหรับปัญหาซ้ำหลัก 8 แบบ พร้อม penalty score และ priority เพื่อคุมการ AUTO_MATCH ในระดับ production
 - **Timed Auto-Close Alerts:** หน้าต่างแจ้งเตือนนับถอยหลัง 10 วินาที และปิดตัวเองอัตโนมัติ ไม่กวนใจตอนทำงาน
 
 ---
 
 ## 📂 โครงสร้างไฟล์ (File Structure)
 
-ระบบประกอบด้วย 17 โมดูลหลัก:
+ระบบประกอบด้วย 18 โมดูลหลัก:
 1.  **00_App.gs**: จุดเริ่มต้นระบบ, เมนูหลัก และการประมวลผลประจำวัน
 2.  **01_Config.gs**: ตั้งค่าชื่อชีตและเกณฑ์คะแนน (Thresholds)
 3.  **02_Schema.gs**: คำนิยามโครงสร้างคอลัมน์ของทุกตาราง
 4.  **03_SetupSheets.gs**: ระบบติดตั้งและสร้างชีตอัตโนมัติ
 5.  **04_SourceRepository.gs**: จัดการการอ่านข้อมูลจากชีตดิบ (SCG)
 6.  **05_NormalizeService.gs**: เอนจินล้างข้อมูล (NFC, Regex, Auto-Fill)
 7.  **06_PersonService.gs**: จัดการข้อมูล Master บุคคล
 8.  **07_PlaceService.gs**: จัดการข้อมูล Master สถานที่
 9.  **08_GeoService.gs**: จัดการข้อมูล Master พิกัดพิกัด (Lat/Long)
 10. **09_DestinationService.gs**: จัดการข้อมูลจุดหมายปลายทาง (Unique Points)
 11. **10_MatchEngine.gs**: สมองกลตัดสินใจ (Scoring & Conflict Detection)
 12. **11_TransactionService.gs**: บันทึกข้อมูลลงตาราง Fact
 13. **12_ReviewService.gs**: ระบบจัดการคิวรอรีวิว (Q_REVIEW) และระบบ Dropdown
 14. **13_ReportService.gs**: สรุปรายงานคุณภาพข้อมูลและสรุปประจำวัน
 15. **14_Utils.gs**: เครื่องมือเสริม (UUID, Dice, Haversine, Timed Alerts)
 16. **15_GoogleMapsAPI.gs**: ฟังก์ชัน Google Maps และระบบ Cache 2 ชั้น
 17. **16_GeoDictionaryBuilder.gs**: ระบบสร้างพจนานุกรมจากชีต `SYS_TH_GEO`
+18. **17_SearchService.gs**: บริการค้นหา LatLong จาก (ชื่อปลายทาง + ชื่อสถานที่) สำหรับงานใช้งานจริง
 
 ---
 
 ## 🚀 วิธีการใช้งาน (How to Use)
 
 ### 1. การติดตั้งครั้งแรก
 1. เปิด Google Sheets ของคุณ
 2. ไปที่เมนู **📦 LMDS System** > **1. ติดตั้งระบบครั้งแรก (Setup)**
 3. ระบบจะสร้างชีตที่จำเป็นทั้งหมดและตั้งค่าเริ่มต้นให้
 
 ### 2. การประมวลผลประจำวัน
 1. นำข้อมูลดิบมาวางในชีตต้นทาง (SCG...)
 2. ไปที่เมนู **📦 LMDS System** > **2. ประมวลผลข้อมูลประจำวัน**
 3. ระบบจะรันไปเรื่อยๆ หากข้อมูลมีปริมาณมากและครบ 5 นาที ระบบจะโชว์ Popup นับถอยหลังแจ้งให้คุณกดรันต่อเองเพื่อความปลอดภัย
 
 ### 2.1 การตรวจสุขภาพ Rule Engine
 1. ไปที่เมนู **📦 LMDS System** > **6. ตรวจสอบ Rule Engine (Self-test)**
 2. ระบบจะทดสอบทั้ง 8 เคส (`R01`-`R08`) อัตโนมัติ
 3. ถ้าผ่าน จะขึ้น `✅ Rule self-test passed`; ถ้าไม่ผ่านจะ Alert พร้อมรายการเคสที่ผิด
 
+### 2.2 การค้นหา LatLong จากชื่อ + สถานที่
+ใช้สูตรในชีต:
+
+```gs
+=LMDS_FIND_LATLONG(ชื่อปลายทาง, ที่อยู่ปลายทาง)
+```
+
+ผลลัพธ์ 6 ช่อง: `status | lat | lng | geoId | confidence | reason`
+
 ### 3. การตัดสินใจในคิวรีวิว (Q_REVIEW)
 1. เมื่อระบบไม่มั่นใจ ข้อมูลจะเด้งมาที่ชีต `Q_REVIEW`
 2. เลือกคำสั่งในคอลัมน์ **Decision** (Dropdown):
     - `CREATE_NEW`: สร้างข้อมูลใหม่
     - `MERGE_TO_CANDIDATE`: รวมเข้ากับข้อมูลเดิมที่มีอยู่
     - `IGNORE`: ข้ามรายการนี้
 3. ระบบจะจัดการอัปเดต Master Data ให้ทันทีหลังเลือก
 
 ---
 
 ## 🛠 การบำรุงรักษา (Maintenance)
 
 - **MAPS_CACHE**: หากต้องการล้างแคชพิกัดทั้งหมด สามารถลบข้อมูลในชีตนี้ได้เลย
 - **SYS_TH_GEO**: สามารถอัปเดตข้อมูลตำบล/รหัสไปรษณีย์ใหม่ๆ ได้ตลอดเวลา แล้วกดเมนู **3. อัปเดตพจนานุกรมสถานที่** เพื่อให้ระบบจดจำค่าใหม่
 - **SYS_LOG**: ตรวจสอบย้อนหลังได้หากเกิด Error ในการประมวลผล
 
 ---
 
 ## ⚖️ License
 พัฒนาเพื่อใช้ในงานบริหารจัดการข้อมูลขนส่ง SCG Logistics โดยคุณ **Kamonwantanakun**

Summary
รับ requirement ใหม่ถูกต้องแล้วครับ: คุณต้องการ “ชีตข้อมูลดิบเพิ่ม” ที่ระบบเอามาทำความสะอาด/จับคู่กับฐานที่เราสร้าง แล้วเติม LatLong กลับไปใช้งานจริง ไม่ใช่แค่ทำ search function เดี่ยว ๆ — ผมจึงเพิ่ม flow แบบ batch ลงชีตให้เรียบร้อยแล้ว.

เพิ่มเมนูใหม่ในระบบ:
📦 LMDS System > 7. ประมวลผลชีตค้นหา LatLong เพื่อรันงานเติมพิกัดจากชีตดิบโดยตรง.

เพิ่ม config ใหม่ LOOKUP_SOURCE_SHEET_NAME (ค่าเริ่มต้น SCGค้นหาLatLong) ทั้งใน default และใน initial seed เพื่อให้ตั้งชื่อชีตดิบเสริมได้อย่างเป็นระบบ.

ใน runLookupEnrichment():

อ่านชีตดิบตาม config

ต้องมีคอลัมน์ ชื่อปลายทาง + ที่อยู่ปลายทาง

ใช้ logic ที่ทำความสะอาด/จับคู่แล้ว (findBestGeoByPersonPlace) เพื่อหา LatLong

เขียนผลกลับเข้าแถวเดิมอัตโนมัติเป็นคอลัมน์ MATCH_*

คอลัมน์ผลลัพธ์ที่เติมกลับมีครบสำหรับใช้งานจริง:
MATCH_STATUS, MATCH_LAT, MATCH_LONG, MATCH_GEO_ID, MATCH_CONFIDENCE, MATCH_REASON, MATCH_UPDATED_AT.

README อัปเดตขั้นตอนใช้งานทั้งแบบสูตร (LMDS_FIND_LATLONG) และแบบ “ประมวลผลทั้งชีตดิบ” ตามที่คุณต้องการแล้ว.

Testing

✅ rg -n 'runLookupEnrichment|LOOKUP_SOURCE_SHEET_NAME|MATCH_STATUS|ประมวลผลชีตค้นหา LatLong' 00_App.gs 01_Config.gs 03_SetupSheets.gs 17_SearchService.gs README.md && git status --short

✅ git add 00_App.gs 01_Config.gs 03_SetupSheets.gs 17_SearchService.gs README.md && git commit -m "Add lookup-sheet enrichment flow for practical LatLong reuse"

หากคุณโอเค ผมทำต่อเฟสสุดท้ายให้ได้เลย:
เพิ่ม “batch review queue” เฉพาะแถว AMBIGUOUS/REVIEW_REQUIRED จากชีต lookup เพื่อให้ทีมเคลียร์เคสยาก แล้วระบบเรียนรู้ alias เพิ่มขึ้นต่อเนื่องครับ.

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
     .addItem('6. ตรวจสอบ Rule Engine (Self-test)', 'runConflictRuleSelfTest')
+    .addItem('7. ประมวลผลชีตค้นหา LatLong', 'runLookupEnrichment')
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
+    'LOOKUP_SOURCE_SHEET_NAME': 'SCGค้นหาLatLong',
     'AUTO_MATCH_SCORE': '90',
     'REVIEW_SCORE_MIN': '75',
     'GEO_RADIUS_METER': '50',
     'MAX_PROCESS_ROWS_PER_RUN': '500'
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
+    ['LOOKUP_SOURCE_SHEET_NAME', 'SCGค้นหาLatLong', 'System', 'ชีตข้อมูลดิบสำหรับค้นหา LatLong ย้อนกลับ', new Date()]
   ];
   
   const existingData = sheet.getDataRange().getValues();
   if (existingData.length <= 1) { // ถ้ายังไม่มีข้อมูล
     sheet.getRange(2, 1, initialConfigs.length, 5).setValues(initialConfigs);
   }
 }


17_SearchService.gs
       confidence: 85,
       reason: 'DOMINANT_GEO_BY_USAGE',
       candidates: ranked
     };
   }
   
   return {
     status: 'AMBIGUOUS',
     lat: '',
     lng: '',
     geoId: '',
     confidence: 0,
     reason: 'MULTIPLE_GEO_MATCHES',
     candidates: ranked
   };
 }
 
 /**
  * ฟังก์ชันสำหรับ Google Sheets (Custom Function)
  * ตัวอย่าง: =LMDS_FIND_LATLONG(A2,B2)
  */
 function LMDS_FIND_LATLONG(personName, placeName) {
   const res = findBestGeoByPersonPlace(personName, placeName);
   return [[res.status, res.lat, res.lng, res.geoId, res.confidence, res.reason]];
 }
+
+/**
+ * ประมวลผลชีตข้อมูลดิบสำหรับการค้นหา LatLong ย้อนกลับ
+ * ใช้กับชีตที่มีคอลัมน์อย่างน้อย: ชื่อปลายทาง, ที่อยู่ปลายทาง
+ */
+function runLookupEnrichment() {
+  const ss = SpreadsheetApp.getActiveSpreadsheet();
+  const sheetName = getConfig('LOOKUP_SOURCE_SHEET_NAME') || 'SCGค้นหาLatLong';
+  const sheet = ss.getSheetByName(sheetName);
+  
+  if (!sheet) {
+    SpreadsheetApp.getUi().alert(`ไม่พบชีตค้นหา: ${sheetName}`);
+    return;
+  }
+  
+  const lastCol = Math.max(sheet.getLastColumn(), 1);
+  const headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0].map(h => safeString(h));
+  const personIdx = findHeaderIndex(headers, ['ชื่อปลายทาง']);
+  const placeIdx = findHeaderIndex(headers, ['ที่อยู่ปลายทาง', 'ชื่อที่อยู่จาก_LatLong', 'ชื่อที่อยู่จาก LatLong']);
+  
+  if (personIdx === -1 || placeIdx === -1) {
+    throw new Error('ชีตค้นหาต้องมีคอลัมน์ "ชื่อปลายทาง" และ "ที่อยู่ปลายทาง"');
+  }
+  
+  const outputCols = ['MATCH_STATUS', 'MATCH_LAT', 'MATCH_LONG', 'MATCH_GEO_ID', 'MATCH_CONFIDENCE', 'MATCH_REASON', 'MATCH_UPDATED_AT'];
+  const outMap = {};
+  outputCols.forEach(col => {
+    let idx = headers.indexOf(col);
+    if (idx === -1) {
+      idx = headers.length;
+      headers.push(col);
+      sheet.getRange(1, idx + 1).setValue(col);
+    }
+    outMap[col] = idx;
+  });
+  
+  const rowCount = sheet.getLastRow() - 1;
+  if (rowCount <= 0) return;
+  
+  const data = sheet.getRange(2, 1, rowCount, headers.length).getValues();
+  const now = new Date();
+  
+  for (let i = 0; i < data.length; i++) {
+    const row = data[i];
+    const personName = safeString(row[personIdx]);
+    const placeName = safeString(row[placeIdx]);
+    if (!personName && !placeName) continue;
+    
+    const result = findBestGeoByPersonPlace(personName, placeName);
+    row[outMap.MATCH_STATUS] = result.status;
+    row[outMap.MATCH_LAT] = result.lat;
+    row[outMap.MATCH_LONG] = result.lng;
+    row[outMap.MATCH_GEO_ID] = result.geoId;
+    row[outMap.MATCH_CONFIDENCE] = result.confidence;
+    row[outMap.MATCH_REASON] = result.reason;
+    row[outMap.MATCH_UPDATED_AT] = now;
+    data[i] = row;
+  }
+  
+  sheet.getRange(2, 1, rowCount, headers.length).setValues(data);
+  ss.toast(`ประมวลผลชีตค้นหา ${sheetName} สำเร็จ (${rowCount} แถว)`, 'Lookup Done', 5);
+}
+
+function findHeaderIndex(headers, candidates) {
+  const clean = s => safeString(s).replace(/[\s_]+/g, '').toLowerCase();
+  const normalizedHeaders = headers.map(clean);
+  for (let c of candidates) {
+    const target = clean(c);
+    const idx = normalizedHeaders.indexOf(target);
+    if (idx !== -1) return idx;
+  }
+  return -1;
+}

README.md
 
 ### 1. การติดตั้งครั้งแรก
 1. เปิด Google Sheets ของคุณ
 2. ไปที่เมนู **📦 LMDS System** > **1. ติดตั้งระบบครั้งแรก (Setup)**
 3. ระบบจะสร้างชีตที่จำเป็นทั้งหมดและตั้งค่าเริ่มต้นให้
 
 ### 2. การประมวลผลประจำวัน
 1. นำข้อมูลดิบมาวางในชีตต้นทาง (SCG...)
 2. ไปที่เมนู **📦 LMDS System** > **2. ประมวลผลข้อมูลประจำวัน**
 3. ระบบจะรันไปเรื่อยๆ หากข้อมูลมีปริมาณมากและครบ 5 นาที ระบบจะโชว์ Popup นับถอยหลังแจ้งให้คุณกดรันต่อเองเพื่อความปลอดภัย
 
 ### 2.1 การตรวจสุขภาพ Rule Engine
 1. ไปที่เมนู **📦 LMDS System** > **6. ตรวจสอบ Rule Engine (Self-test)**
 2. ระบบจะทดสอบทั้ง 8 เคส (`R01`-`R08`) อัตโนมัติ
 3. ถ้าผ่าน จะขึ้น `✅ Rule self-test passed`; ถ้าไม่ผ่านจะ Alert พร้อมรายการเคสที่ผิด
 
 ### 2.2 การค้นหา LatLong จากชื่อ + สถานที่
 ใช้สูตรในชีต:
 
 ```gs
 =LMDS_FIND_LATLONG(ชื่อปลายทาง, ที่อยู่ปลายทาง)
 ```
 
 ผลลัพธ์ 6 ช่อง: `status | lat | lng | geoId | confidence | reason`
 
+### 2.3 การประมวลผลชีตดิบเพื่อเติม LatLong ย้อนกลับ
+1. สร้างชีตดิบใหม่ (ค่าเริ่มต้นชื่อ `SCGค้นหาLatLong`) และวางข้อมูลที่มีคอลัมน์ `ชื่อปลายทาง`, `ที่อยู่ปลายทาง`
+2. ไปที่เมนู **📦 LMDS System** > **7. ประมวลผลชีตค้นหา LatLong**
+3. ระบบจะเติมผลลัพธ์กลับเข้าแถวเดิมในคอลัมน์:
+   - `MATCH_STATUS`
+   - `MATCH_LAT`
+   - `MATCH_LONG`
+   - `MATCH_GEO_ID`
+   - `MATCH_CONFIDENCE`
+   - `MATCH_REASON`
+   - `MATCH_UPDATED_AT`
+
 ### 3. การตัดสินใจในคิวรีวิว (Q_REVIEW)
 1. เมื่อระบบไม่มั่นใจ ข้อมูลจะเด้งมาที่ชีต `Q_REVIEW`
 2. เลือกคำสั่งในคอลัมน์ **Decision** (Dropdown):
     - `CREATE_NEW`: สร้างข้อมูลใหม่
     - `MERGE_TO_CANDIDATE`: รวมเข้ากับข้อมูลเดิมที่มีอยู่
     - `IGNORE`: ข้ามรายการนี้
 3. ระบบจะจัดการอัปเดต Master Data ให้ทันทีหลังเลือก
 
 ---
 
 ## 🛠 การบำรุงรักษา (Maintenance)
 
 - **MAPS_CACHE**: หากต้องการล้างแคชพิกัดทั้งหมด สามารถลบข้อมูลในชีตนี้ได้เลย
 - **SYS_TH_GEO**: สามารถอัปเดตข้อมูลตำบล/รหัสไปรษณีย์ใหม่ๆ ได้ตลอดเวลา แล้วกดเมนู **3. อัปเดตพจนานุกรมสถานที่** เพื่อให้ระบบจดจำค่าใหม่
 - **SYS_LOG**: ตรวจสอบย้อนหลังได้หากเกิด Error ในการประมวลผล
 
 ---
 
 ## ⚖️ License
 พัฒนาเพื่อใช้ในงานบริหารจัดการข้อมูลขนส่ง SCG Logistics โดยคุณ **Kamonwantanakun**

Summary
ปรับเมนูให้ตรง workflow ที่คุณย้ำไว้แล้ว โดยเปลี่ยนเมนูข้อ 7 เป็น “เติม LatLong ให้ชีตตารางงานประจำวัน” เพื่อสื่อว่าเป็นงานเติมพิกัดกลับให้ชีตรายวันจริง ไม่ใช่ lookup แยกเดี่ยวครับ.

ปรับค่า default config ให้ระบบยึดชีต ตารางงานประจำวัน เป็นแหล่งข้อมูลเติม LatLong และเพิ่ม config สำหรับรองรับชื่อคอลัมน์ที่ไม่ตายตัวล่วงหน้า (LOOKUP_PERSON_COLUMNS, LOOKUP_PLACE_COLUMNS).

อัปเดต seedInitialConfig() ให้สร้าง config ชุดเดียวกันนี้ใน SYS_CONFIG ตั้งแต่รอบติดตั้งครั้งแรก เพื่อให้แอดมินปรับชื่อคอลัมน์ได้ทันทีเมื่อชีตรายวันเปลี่ยนรูปแบบครับ.

ปรับ runLookupEnrichment() ให้ทำงานกับชีต ตารางงานประจำวัน เป็นค่าเริ่มต้น และอ่าน “candidate header” จาก config (comma-separated) แทนการ hardcode เดิม ทำให้รองรับกรณีที่คอลัมน์รายวันเปลี่ยนชื่อได้ตามที่คุณแจ้งไว้; พร้อมปรับ error message ให้บอกค่าที่ระบบกำลังคาดหวังชัดเจน และเพิ่ม helper splitHeaderCandidates().

อัปเดต README ให้สอดคล้องกับกระบวนการใช้งานจริงแบบรายวัน (ตารางงานประจำวัน + config mapping คอลัมน์) และคงสูตรค้นหาเป็นเครื่องมือเสริมเท่านั้นครับ.

Testing

✅ git status --short && rg -n "LOOKUP_SOURCE_SHEET_NAME|LOOKUP_PERSON_COLUMNS|LOOKUP_PLACE_COLUMNS|เติม LatLong ให้ชีตตารางงานประจำวัน|splitHeaderCandidates|ตารางงานประจำวัน" 00_App.gs 01_Config.gs 03_SetupSheets.gs 17_SearchService.gs README.md

✅ git add 00_App.gs 01_Config.gs 03_SetupSheets.gs 17_SearchService.gs README.md && git commit -m "Align LatLong enrichment flow with ตารางงานประจำวัน"

✅ git add README.md && git commit --amend --no-edit

✅ git status --short

เรียบร้อยครับ: commit ล่าสุดคือ 2a45c60 และสร้าง PR message ผ่าน make_pr แล้วตามที่กำหนดครับ.

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
     .addItem('6. ตรวจสอบ Rule Engine (Self-test)', 'runConflictRuleSelfTest')
-    .addItem('7. ประมวลผลชีตค้นหา LatLong', 'runLookupEnrichment')
+    .addItem('7. เติม LatLong ให้ชีตตารางงานประจำวัน', 'runLookupEnrichment')
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
-    'LOOKUP_SOURCE_SHEET_NAME': 'SCGค้นหาLatLong',
+    'LOOKUP_SOURCE_SHEET_NAME': 'ตารางงานประจำวัน',
+    'LOOKUP_PERSON_COLUMNS': 'ชื่อปลายทาง',
+    'LOOKUP_PLACE_COLUMNS': 'ที่อยู่ปลายทาง,ชื่อที่อยู่จาก_LatLong,ชื่อที่อยู่จาก LatLong',
     'AUTO_MATCH_SCORE': '90',
     'REVIEW_SCORE_MIN': '75',
     'GEO_RADIUS_METER': '50',
     'MAX_PROCESS_ROWS_PER_RUN': '500'
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


03_SetupSheets.gs

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
     ['MAX_PROCESS_ROWS_PER_RUN', '500', 'System', 'จำนวนแถวสูงสุดต่อการรัน 1 ครั้ง', new Date()],
-    ['LOOKUP_SOURCE_SHEET_NAME', 'SCGค้นหาLatLong', 'System', 'ชีตข้อมูลดิบสำหรับค้นหา LatLong ย้อนกลับ', new Date()]
+    ['LOOKUP_SOURCE_SHEET_NAME', 'ตารางงานประจำวัน', 'System', 'ชีตข้อมูลดิบรายวันที่ต้องเติม LatLong กลับไปใช้งาน', new Date()],
+    ['LOOKUP_PERSON_COLUMNS', 'ชื่อปลายทาง', 'System', 'ชื่อคอลัมน์ผู้รับ (คั่นหลายชื่อด้วย comma)', new Date()],
+    ['LOOKUP_PLACE_COLUMNS', 'ที่อยู่ปลายทาง,ชื่อที่อยู่จาก_LatLong,ชื่อที่อยู่จาก LatLong', 'System', 'ชื่อคอลัมน์สถานที่ (คั่นหลายชื่อด้วย comma)', new Date()]
   ];
   
   const existingData = sheet.getDataRange().getValues();
   if (existingData.length <= 1) { // ถ้ายังไม่มีข้อมูล
     sheet.getRange(2, 1, initialConfigs.length, 5).setValues(initialConfigs);
   }
 }

17_SearchService.gs

       candidates: ranked
     };
   }
   
   return {
     status: 'AMBIGUOUS',
     lat: '',
     lng: '',
     geoId: '',
     confidence: 0,
     reason: 'MULTIPLE_GEO_MATCHES',
     candidates: ranked
   };
 }
 
 /**
  * ฟังก์ชันสำหรับ Google Sheets (Custom Function)
  * ตัวอย่าง: =LMDS_FIND_LATLONG(A2,B2)
  */
 function LMDS_FIND_LATLONG(personName, placeName) {
   const res = findBestGeoByPersonPlace(personName, placeName);
   return [[res.status, res.lat, res.lng, res.geoId, res.confidence, res.reason]];
 }
 
 /**
- * ประมวลผลชีตข้อมูลดิบสำหรับการค้นหา LatLong ย้อนกลับ
- * ใช้กับชีตที่มีคอลัมน์อย่างน้อย: ชื่อปลายทาง, ที่อยู่ปลายทาง
+ * ประมวลผลชีตข้อมูลดิบรายวันเพื่อเติม LatLong กลับไปใช้งานจริง
+ * ค่าเริ่มต้นใช้ชีต "ตารางงานประจำวัน" และปรับชื่อคอลัมน์ได้จาก SYS_CONFIG
  */
 function runLookupEnrichment() {
   const ss = SpreadsheetApp.getActiveSpreadsheet();
-  const sheetName = getConfig('LOOKUP_SOURCE_SHEET_NAME') || 'SCGค้นหาLatLong';
+  const sheetName = getConfig('LOOKUP_SOURCE_SHEET_NAME') || 'ตารางงานประจำวัน';
   const sheet = ss.getSheetByName(sheetName);
   
   if (!sheet) {
     SpreadsheetApp.getUi().alert(`ไม่พบชีตค้นหา: ${sheetName}`);
     return;
   }
   
   const lastCol = Math.max(sheet.getLastColumn(), 1);
   const headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0].map(h => safeString(h));
-  const personIdx = findHeaderIndex(headers, ['ชื่อปลายทาง']);
-  const placeIdx = findHeaderIndex(headers, ['ที่อยู่ปลายทาง', 'ชื่อที่อยู่จาก_LatLong', 'ชื่อที่อยู่จาก LatLong']);
+  const personCandidates = splitHeaderCandidates(getConfig('LOOKUP_PERSON_COLUMNS') || 'ชื่อปลายทาง');
+  const placeCandidates = splitHeaderCandidates(getConfig('LOOKUP_PLACE_COLUMNS') || 'ที่อยู่ปลายทาง,ชื่อที่อยู่จาก_LatLong,ชื่อที่อยู่จาก LatLong');
+  const personIdx = findHeaderIndex(headers, personCandidates);
+  const placeIdx = findHeaderIndex(headers, placeCandidates);
   
   if (personIdx === -1 || placeIdx === -1) {
-    throw new Error('ชีตค้นหาต้องมีคอลัมน์ "ชื่อปลายทาง" และ "ที่อยู่ปลายทาง"');
+    throw new Error(
+      `ชีต ${sheetName} ไม่พบคอลัมน์ที่จำเป็นสำหรับค้นหา LatLong\n` +
+      `LOOKUP_PERSON_COLUMNS = ${personCandidates.join(' | ')}\n` +
+      `LOOKUP_PLACE_COLUMNS = ${placeCandidates.join(' | ')}`
+    );
   }
   
   const outputCols = ['MATCH_STATUS', 'MATCH_LAT', 'MATCH_LONG', 'MATCH_GEO_ID', 'MATCH_CONFIDENCE', 'MATCH_REASON', 'MATCH_UPDATED_AT'];
   const outMap = {};
   outputCols.forEach(col => {
     let idx = headers.indexOf(col);
     if (idx === -1) {
       idx = headers.length;
       headers.push(col);
       sheet.getRange(1, idx + 1).setValue(col);
     }
     outMap[col] = idx;
   });
   
   const rowCount = sheet.getLastRow() - 1;
   if (rowCount <= 0) return;
   
   const data = sheet.getRange(2, 1, rowCount, headers.length).getValues();
   const now = new Date();
   
   for (let i = 0; i < data.length; i++) {
     const row = data[i];
     const personName = safeString(row[personIdx]);
     const placeName = safeString(row[placeIdx]);
     if (!personName && !placeName) continue;
     
     const result = findBestGeoByPersonPlace(personName, placeName);
     row[outMap.MATCH_STATUS] = result.status;
     row[outMap.MATCH_LAT] = result.lat;
     row[outMap.MATCH_LONG] = result.lng;
     row[outMap.MATCH_GEO_ID] = result.geoId;
     row[outMap.MATCH_CONFIDENCE] = result.confidence;
     row[outMap.MATCH_REASON] = result.reason;
     row[outMap.MATCH_UPDATED_AT] = now;
     data[i] = row;
   }
   
   sheet.getRange(2, 1, rowCount, headers.length).setValues(data);
-  ss.toast(`ประมวลผลชีตค้นหา ${sheetName} สำเร็จ (${rowCount} แถว)`, 'Lookup Done', 5);
+  ss.toast(`เติม LatLong ชีต ${sheetName} สำเร็จ (${rowCount} แถว)`, 'Lookup Done', 5);
 }
 
 function findHeaderIndex(headers, candidates) {
   const clean = s => safeString(s).replace(/[\s_]+/g, '').toLowerCase();
   const normalizedHeaders = headers.map(clean);
   for (let c of candidates) {
     const target = clean(c);
     const idx = normalizedHeaders.indexOf(target);
     if (idx !== -1) return idx;
   }
   return -1;
 }
+
+function splitHeaderCandidates(rawValue) {
+  return safeString(rawValue)
+    .split(',')
+    .map(s => safeString(s).trim())
+    .filter(Boolean);
+}


README.md

 - **8-Case Conflict Rules:** มีกติกา Reason Code (`R01`-`R08`) สำหรับปัญหาซ้ำหลัก 8 แบบ พร้อม penalty score และ priority เพื่อคุมการ AUTO_MATCH ในระดับ production
 - **Timed Auto-Close Alerts:** หน้าต่างแจ้งเตือนนับถอยหลัง 10 วินาที และปิดตัวเองอัตโนมัติ ไม่กวนใจตอนทำงาน
 
 ---
 
 ## 📂 โครงสร้างไฟล์ (File Structure)
 
 ระบบประกอบด้วย 18 โมดูลหลัก:
 1.  **00_App.gs**: จุดเริ่มต้นระบบ, เมนูหลัก และการประมวลผลประจำวัน
 2.  **01_Config.gs**: ตั้งค่าชื่อชีตและเกณฑ์คะแนน (Thresholds)
 3.  **02_Schema.gs**: คำนิยามโครงสร้างคอลัมน์ของทุกตาราง
 4.  **03_SetupSheets.gs**: ระบบติดตั้งและสร้างชีตอัตโนมัติ
 5.  **04_SourceRepository.gs**: จัดการการอ่านข้อมูลจากชีตดิบ (SCG)
 6.  **05_NormalizeService.gs**: เอนจินล้างข้อมูล (NFC, Regex, Auto-Fill)
 7.  **06_PersonService.gs**: จัดการข้อมูล Master บุคคล
 8.  **07_PlaceService.gs**: จัดการข้อมูล Master สถานที่
 9.  **08_GeoService.gs**: จัดการข้อมูล Master พิกัดพิกัด (Lat/Long)
 10. **09_DestinationService.gs**: จัดการข้อมูลจุดหมายปลายทาง (Unique Points)
 11. **10_MatchEngine.gs**: สมองกลตัดสินใจ (Scoring & Conflict Detection)
 12. **11_TransactionService.gs**: บันทึกข้อมูลลงตาราง Fact
 13. **12_ReviewService.gs**: ระบบจัดการคิวรอรีวิว (Q_REVIEW) และระบบ Dropdown
 14. **13_ReportService.gs**: สรุปรายงานคุณภาพข้อมูลและสรุปประจำวัน
 15. **14_Utils.gs**: เครื่องมือเสริม (UUID, Dice, Haversine, Timed Alerts)
 16. **15_GoogleMapsAPI.gs**: ฟังก์ชัน Google Maps และระบบ Cache 2 ชั้น
 17. **16_GeoDictionaryBuilder.gs**: ระบบสร้างพจนานุกรมจากชีต `SYS_TH_GEO`
-18. **17_SearchService.gs**: บริการค้นหา LatLong จาก (ชื่อปลายทาง + ชื่อสถานที่) สำหรับงานใช้งานจริง
+18. **17_SearchService.gs**: บริการเติม LatLong ให้ชีตข้อมูลรายวันจาก (ชื่อปลายทาง + ชื่อสถานที่) พร้อมฟังก์ชันค้นหาเสริม
 
 ---
 
 ## 🚀 วิธีการใช้งาน (How to Use)
 
 ### 1. การติดตั้งครั้งแรก
 1. เปิด Google Sheets ของคุณ
 2. ไปที่เมนู **📦 LMDS System** > **1. ติดตั้งระบบครั้งแรก (Setup)**
 3. ระบบจะสร้างชีตที่จำเป็นทั้งหมดและตั้งค่าเริ่มต้นให้
 
 ### 2. การประมวลผลประจำวัน
 1. นำข้อมูลดิบมาวางในชีตต้นทาง (SCG...)
 2. ไปที่เมนู **📦 LMDS System** > **2. ประมวลผลข้อมูลประจำวัน**
 3. ระบบจะรันไปเรื่อยๆ หากข้อมูลมีปริมาณมากและครบ 5 นาที ระบบจะโชว์ Popup นับถอยหลังแจ้งให้คุณกดรันต่อเองเพื่อความปลอดภัย
 
 ### 2.1 การตรวจสุขภาพ Rule Engine
 1. ไปที่เมนู **📦 LMDS System** > **6. ตรวจสอบ Rule Engine (Self-test)**
 2. ระบบจะทดสอบทั้ง 8 เคส (`R01`-`R08`) อัตโนมัติ
 3. ถ้าผ่าน จะขึ้น `✅ Rule self-test passed`; ถ้าไม่ผ่านจะ Alert พร้อมรายการเคสที่ผิด
 
-### 2.2 การค้นหา LatLong จากชื่อ + สถานที่
+### 2.2 การค้นหา LatLong จากชื่อ + สถานที่ (เสริม)
 ใช้สูตรในชีต:
 
 ```gs
 =LMDS_FIND_LATLONG(ชื่อปลายทาง, ที่อยู่ปลายทาง)
 ```
 
 ผลลัพธ์ 6 ช่อง: `status | lat | lng | geoId | confidence | reason`
 
-### 2.3 การประมวลผลชีตดิบเพื่อเติม LatLong ย้อนกลับ
-1. สร้างชีตดิบใหม่ (ค่าเริ่มต้นชื่อ `SCGค้นหาLatLong`) และวางข้อมูลที่มีคอลัมน์ `ชื่อปลายทาง`, `ที่อยู่ปลายทาง`
-2. ไปที่เมนู **📦 LMDS System** > **7. ประมวลผลชีตค้นหา LatLong**
-3. ระบบจะเติมผลลัพธ์กลับเข้าแถวเดิมในคอลัมน์:
+### 2.3 การประมวลผลชีตดิบรายวันเพื่อเติม LatLong กลับไปใช้งานจริง
+1. เตรียมชีต `ตารางงานประจำวัน` (หรือเปลี่ยนชื่อชีตผ่าน `SYS_CONFIG: LOOKUP_SOURCE_SHEET_NAME`)
+2. ใส่ข้อมูลดิบที่มีอย่างน้อยคอลัมน์ "ชื่อบุคคลปลายทาง" และ "ชื่อสถานที่ปลายทาง"  
+   - ค่าเริ่มต้นที่ระบบหาให้คือ `ชื่อปลายทาง` และ `ที่อยู่ปลายทาง`  
+   - ถ้าชื่อคอลัมน์ต่างจากนี้ ให้แก้ที่ `SYS_CONFIG`:
+     - `LOOKUP_PERSON_COLUMNS` (คั่นหลายชื่อด้วย comma)
+     - `LOOKUP_PLACE_COLUMNS` (คั่นหลายชื่อด้วย comma)
+3. ไปที่เมนู **📦 LMDS System** > **7. เติม LatLong ให้ชีตตารางงานประจำวัน**
+4. ระบบจะเติมผลลัพธ์กลับเข้าแถวเดิมในคอลัมน์:
    - `MATCH_STATUS`
    - `MATCH_LAT`
    - `MATCH_LONG`
    - `MATCH_GEO_ID`
    - `MATCH_CONFIDENCE`
    - `MATCH_REASON`
    - `MATCH_UPDATED_AT`
 
 ### 3. การตัดสินใจในคิวรีวิว (Q_REVIEW)
 1. เมื่อระบบไม่มั่นใจ ข้อมูลจะเด้งมาที่ชีต `Q_REVIEW`
 2. เลือกคำสั่งในคอลัมน์ **Decision** (Dropdown):
     - `CREATE_NEW`: สร้างข้อมูลใหม่
     - `MERGE_TO_CANDIDATE`: รวมเข้ากับข้อมูลเดิมที่มีอยู่
     - `IGNORE`: ข้ามรายการนี้
 3. ระบบจะจัดการอัปเดต Master Data ให้ทันทีหลังเลือก
 
 ---
 
 ## 🛠 การบำรุงรักษา (Maintenance)
 
 - **MAPS_CACHE**: หากต้องการล้างแคชพิกัดทั้งหมด สามารถลบข้อมูลในชีตนี้ได้เลย
 - **SYS_TH_GEO**: สามารถอัปเดตข้อมูลตำบล/รหัสไปรษณีย์ใหม่ๆ ได้ตลอดเวลา แล้วกดเมนู **3. อัปเดตพจนานุกรมสถานที่** เพื่อให้ระบบจดจำค่าใหม่
 - **SYS_LOG**: ตรวจสอบย้อนหลังได้หากเกิด Error ในการประมวลผล
 
 ---

