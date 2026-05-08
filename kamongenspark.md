📋 แผนโปรเจกต์ระบบจัดการข้อมูลส่งสินค้า SCG — Google Apps Script
ผมจะอธิบายแบบละเอียดทุกขั้นตอนครับ ครอบคลุม: โมดูลโค้ด, ฟังก์ชัน, ชีต, และคอลัมน์ทั้งหมด

🗂️ ชีตทั้งหมดในระบบ (Sheets Architecture)
รวม 9 ชีต แบ่งเป็น 3 กลุ่ม
🟦 กลุ่มที่ 1 — ชีตข้อมูลดิบ (Source)
ชีต	คำอธิบาย
SCGนครหลวงJWDภูมิภาค	ข้อมูลดิบจากระบบเดิม บันทึกเข้ามาทุกวัน
SYS_TH_GEO	ข้อมูลอ้างอิงภูมิศาสตร์ไทย (รหัสไปรษณีย์, ตำบล, อำเภอ, จังหวัด)
🟨 กลุ่มที่ 2 — ชีต Master / Clean Data (ฐานข้อมูลหลัก)
ชีต	คำอธิบาย
MST_PERSON	Master บุคคล/ลูกค้า (normalized)
MST_PLACE	Master สถานที่/ปลายทาง (normalized)
MST_ALIAS_PERSON	Alias ชื่อบุคคลทั้งหมด → ชี้กลับ MST_PERSON
MST_ALIAS_PLACE	Alias ชื่อสถานที่ทั้งหมด → ชี้กลับ MST_PLACE
🟥 กลุ่มที่ 3 — ชีตระบบ / Review / Log
ชีต	คำอธิบาย
REVIEW_QUEUE	รายการที่ระบบตัดสินไม่ได้ ต้องรอ Admin ยืนยัน
PROCESS_LOG	บันทึกทุกการประมวลผลของระบบ
CONFIG	ตั้งค่าระบบ เช่น threshold, คลัง LatLong
📐 โครงสร้างคอลัมน์ทุกชีต
ชีต SYS_TH_GEO (ข้อมูลอ้างอิงภูมิศาสตร์ไทย)
คอลัมน์	ชื่อ	คำอธิบาย
A	รหัสไปรษณีย์	5 หลัก
B	แขวง/ตำบล	ชื่อตำบลหรือแขวง
C	เขต/อำเภอ	ชื่ออำเภอหรือเขต
D	จังหวัด	ชื่อจังหวัด
E	หมายเหตุ	ข้อความอธิบายพิเศษ เช่น ข้อยกเว้น, เงื่อนไข
หมายเหตุเรื่องคอลัมน์ E: ข้อความในช่องนี้ ไม่ต้องแปลงใหม่ ครับ ให้เก็บเป็นข้อความธรรมดา (plain text) แล้วระบบจะอ่านเป็น "เงื่อนไขเพิ่มเติม" ใช้สำหรับ แจ้งเตือน/flag ว่า รหัสนี้มีกรณีพิเศษ ไม่ใช่ใช้ตัดสินอัตโนมัติ

ชีต MST_PERSON (บุคคลหลัก)
คอลัมน์	ชื่อ	คำอธิบาย
A	PERSON_ID	รหัสอ้างอิงหลัก เช่น PSN-00001
B	PERSON_NAME_CLEAN	ชื่อที่ normalize แล้ว เป็นชื่อ canonical
C	PERSON_NAME_RAW_FIRST	ชื่อดิบแรกที่พบ
D	PLACE_ID_REF	รหัสสถานที่หลักที่บุคคลนี้ใช้บ่อยสุด
E	LAT_REF	ละติจูดอ้างอิง
F	LONG_REF	ลองจิจูดอ้างอิง
G	OWNER_LIST	รายชื่อ ชื่อเจ้าของสินค้า ที่เคยส่งให้คนนี้ (คั่น,)
H	TOTAL_JOBS	จำนวนงานรวม
I	LAST_SEEN_DATE	วันที่งานล่าสุด
J	STATUS	ACTIVE / MERGED / REVIEW
K	MERGED_INTO	ถ้า MERGED → ชี้ไป PERSON_ID ที่ถูกรวมไว้
L	NOTE	หมายเหตุ Admin
M	CREATED_AT	วันที่สร้าง record
N	UPDATED_AT	วันที่อัปเดตล่าสุด
ชีต MST_PLACE (สถานที่หลัก)
คอลัมน์	ชื่อ	คำอธิบาย
A	PLACE_ID	รหัสอ้างอิงหลัก เช่น PLC-00001
B	PLACE_NAME_CLEAN	ชื่อสถานที่ canonical
C	PLACE_NAME_RAW_FIRST	ชื่อดิบแรกที่พบ
D	ADDRESS_FROM_LATLONG	ที่อยู่จาก reverse geocode
E	ADDRESS_RAW	ที่อยู่ดิบจากระบบเดิม
F	LAT	ละติจูดหลัก
G	LONG	ลองจิจูดหลัก
H	TAMBON	แขวง/ตำบล (จาก SYS_TH_GEO)
I	AMPHOE	เขต/อำเภอ (จาก SYS_TH_GEO)
J	PROVINCE	จังหวัด (จาก SYS_TH_GEO)
K	POSTCODE	รหัสไปรษณีย์
L	GEO_NOTE	หมายเหตุจาก SYS_TH_GEO (ถ้ามี)
M	RADIUS_M	รัศมีที่ครอบคลุม (เมตร) สำหรับ geo-cluster
N	TOTAL_JOBS	จำนวนงานรวม
O	STATUS	ACTIVE / MERGED / REVIEW
P	MERGED_INTO	ชี้ไป PLACE_ID ที่ถูกรวมไว้
Q	NOTE	หมายเหตุ Admin
R	CREATED_AT	วันที่สร้าง
S	UPDATED_AT	วันที่อัปเดต
ชีต MST_ALIAS_PERSON (ชื่อเล่น/ชื่อแฝงบุคคล)
คอลัมน์	ชื่อ	คำอธิบาย
A	ALIAS_ID	รหัส Alias เช่น AP-00001
B	ALIAS_NAME	ชื่อดิบที่พบ
C	PERSON_ID_REF	ชี้กลับไป MST_PERSON
D	MATCH_METHOD	วิธีที่ match ได้ เช่น EXACT, FUZZY, GEO, MANUAL
E	CONFIDENCE	คะแนนความเชื่อมั่น 0–100
F	SOURCE_SHEET	ชีตต้นทาง
G	CONFIRMED_BY	SYSTEM / ADMIN
H	CREATED_AT	วันที่สร้าง
ชีต MST_ALIAS_PLACE (ชื่อสถานที่แฝง)
คอลัมน์	ชื่อ	คำอธิบาย
A	ALIAS_ID	รหัส Alias เช่น APL-00001
B	ALIAS_NAME	ชื่อดิบที่พบ
C	PLACE_ID_REF	ชี้กลับไป MST_PLACE
D	MATCH_METHOD	EXACT, FUZZY, GEO, MANUAL
E	CONFIDENCE	คะแนน 0–100
F	SOURCE_SHEET	ชีตต้นทาง
G	CONFIRMED_BY	SYSTEM / ADMIN
H	CREATED_AT	วันที่สร้าง
ชีต REVIEW_QUEUE (คิวรอ Admin)
คอลัมน์	ชื่อ	คำอธิบาย
A	REVIEW_ID	รหัส Review เช่น RV-00001
B	REVIEW_TYPE	ประเภท: PERSON_DUP, PLACE_DUP, GEO_CONFLICT, NAME_CONFLICT, ALIAS_UNSURE
C	RAW_NAME	ชื่อดิบที่ทำให้เกิดปัญหา
D	RAW_ADDRESS	ที่อยู่ดิบ
E	LAT	ละติจูด
F	LONG	ลองจิจูด
G	CANDIDATE_1	ตัวเลือกที่ 1 (PERSON_ID หรือ PLACE_ID)
H	CANDIDATE_2	ตัวเลือกที่ 2
I	CONFIDENCE_1	คะแนน candidate 1
J	CONFIDENCE_2	คะแนน candidate 2
K	DESCRIPTION	คำอธิบายปัญหา
L	ADMIN_DECISION	Admin เลือก: USE_1, USE_2, NEW, MERGE
M	ADMIN_NOTE	หมายเหตุจาก Admin
N	STATUS	PENDING / RESOLVED / SKIPPED
O	SOURCE_ROW	แถวต้นทางจากชีตดิบ
P	CREATED_AT	วันที่สร้าง
Q	RESOLVED_AT	วันที่ resolve
ชีต PROCESS_LOG
คอลัมน์	ชื่อ	คำอธิบาย
A	LOG_ID	รหัส Log
B	TIMESTAMP	เวลา
C	MODULE	โมดูลที่ทำงาน
D	FUNCTION	ฟังก์ชันที่รัน
E	STATUS	SUCCESS / ERROR / WARNING
F	ROWS_PROCESSED	จำนวนแถวที่ประมวลผล
G	ROWS_NEW	แถวใหม่ที่เพิ่ม
H	ROWS_UPDATED	แถวที่อัปเดต
I	ROWS_QUEUED	แถวที่ส่งไป Review
J	MESSAGE	ข้อความรายละเอียด
ชีต CONFIG
คอลัมน์	ชื่อ	ค่าตัวอย่าง
A	KEY	ชื่อ config
B	VALUE	ค่า
C	DESCRIPTION	คำอธิบาย
ตัวอย่าง config rows:

KEY	VALUE	DESCRIPTION
WAREHOUSE_LAT	14.1234	ละติจูดคลัง SCG วังน้อย
WAREHOUSE_LONG	100.5678	ลองจิจูดคลัง SCG วังน้อย
GEO_CLUSTER_RADIUS_M	50	รัศมีจัดกลุ่มพิกัด (เมตร)
FUZZY_THRESHOLD	70	คะแนนต่ำสุดของ fuzzy match
AUTO_CONFIRM_THRESHOLD	90	คะแนนที่ระบบ confirm อัตโนมัติ
REVIEW_THRESHOLD	60	คะแนนต่ำกว่านี้ส่ง Review queue
PROCESS_BATCH_SIZE	100	จำนวนแถวต่อรอบ
🧩 โมดูลโค้ดทั้งหมด — รวม 8 โมดูล
MODULE 1: MOD_CONFIG.gs — ระบบ Config กลาง
จุดประสงค์: เป็นตัวกลางดึงค่า config ให้โมดูลอื่นใช้งาน

ฟังก์ชัน	หน้าที่
getConfig(key)	ดึงค่า config จากชีต CONFIG ตาม key
setConfig(key, value)	เขียนค่า config
getWarehouseLatLong()	คืนค่า {lat, lng} ของคลัง
getGeoClusterRadius()	คืนค่า radius (เมตร)
getFuzzyThreshold()	คืนค่า threshold ของ fuzzy match
getAutoConfirmThreshold()	คืนค่า threshold ที่ระบบ confirm อัตโนมัติ
getReviewThreshold()	คืนค่า threshold ที่ส่ง Review
getBatchSize()	คืนจำนวน batch size
initConfigSheet()	สร้างชีต CONFIG + ค่าเริ่มต้น ถ้ายังไม่มี
MODULE 2: MOD_GEO.gs — ระบบจัดการพิกัด & ภูมิศาสตร์
จุดประสงค์: จัดการทุกเรื่องที่เกี่ยวกับ LatLong, reverse geocode, และ SYS_TH_GEO

ฟังก์ชัน	หน้าที่
parseLatLong(rawStr)	แยก "13.123,100.456" → {lat, lng}
isValidLatLong(lat, lng)	ตรวจสอบว่าอยู่ในพื้นที่ไทยหรือไม่
calcDistanceMeters(lat1, lng1, lat2, lng2)	คำนวณระยะทาง 2 จุด (Haversine)
isSameGeoPoint(lat1, lng1, lat2, lng2, radiusM)	ตรวจว่าพิกัด 2 จุดอยู่ใน radius เดียวกันหรือไม่
lookupTHGeo(lat, lng)	ค้นหาข้อมูล SYS_TH_GEO จากพิกัด → คืน {tambon, amphoe, province, postcode, note}
lookupTHGeoByText(text)	ค้นหา SYS_TH_GEO จากข้อความที่อยู่
reverseGeocode(lat, lng)	เรียก Google Maps API เพื่อแปลงพิกัด → ที่อยู่ข้อความ
clusterGeoPoints(rows, radiusM)	จัดกลุ่มแถวที่มีพิกัดใกล้กัน
loadTHGeoCache()	โหลด SYS_TH_GEO ลง cache (memory) เพื่อความเร็ว
matchAddressToTHGeo(addressText)	เทียบข้อความที่อยู่กับ SYS_TH_GEO แบบ fuzzy
extractProvinceFromText(text)	ดึงชื่อจังหวัดออกจากข้อความ
extractAmphoeFromText(text)	ดึงชื่ออำเภอออกจากข้อความ
initTHGeoSheet()	สร้างชีต SYS_TH_GEO + header ถ้ายังไม่มี
MODULE 3: MOD_NORMALIZE.gs — ระบบทำความสะอาดข้อความ
จุดประสงค์: normalize ชื่อบุคคล และชื่อสถานที่ให้เป็นมาตรฐาน

ฟังก์ชัน	หน้าที่
normalizeName(rawName)	ลบคำนำหน้า (คุณ/นาย/นาง/ช่าง/ร้าน/พี่ ฯลฯ), trim, lower
normalizeAddress(rawAddress)	ตัดคำฟุ่มเฟือย, ทำให้สม่ำเสมอ
removePrefixTitle(name)	ลบคำนำหน้าชื่อคน
removeSuffixNoise(name)	ลบ suffix ที่ไม่ใช่ชื่อ เช่น "รับของ", "สาขา"
extractPersonName(rawText)	พยายามดึงชื่อบุคคลออกจากข้อความปน
extractBranchInfo(text)	ดึงข้อมูลสาขาออกจากชื่อสถานที่
tokenizeThai(text)	ตัดคำภาษาไทยแบบเบสิก
calcFuzzyScore(str1, str2)	คำนวณความคล้ายของ 2 ข้อความ (Levenshtein + Thai-aware)
calcNameSimilarity(name1, name2)	คะแนนความคล้ายชื่อบุคคล (น้ำหนักพิเศษสำหรับชื่อไทย)
calcAddressSimilarity(addr1, addr2)	คะแนนความคล้ายที่อยู่
stripAllNoise(text)	ลบทุกอย่างที่เป็น noise ออก
MODULE 4: MOD_PERSON.gs — ระบบจัดการข้อมูลบุคคล
จุดประสงค์: สร้าง/อัปเดต/ค้นหา/รวม Master Person

ฟังก์ชัน	หน้าที่
findPersonByName(cleanName)	ค้นหา PERSON_ID จาก normalized name
findPersonByAlias(rawName)	ค้นหา PERSON_ID จาก alias table
findPersonByGeo(lat, lng, radiusM)	ค้นหาบุคคลที่มีพิกัดใกล้เคียง
findPersonCandidates(rawName, lat, lng)	ค้นหาตัวเลือกบุคคลพร้อมคะแนน
createPerson(data)	สร้าง record ใหม่ใน MST_PERSON
updatePerson(personId, data)	อัปเดตข้อมูลบุคคล
mergePersons(sourceId, targetId)	รวม 2 record เป็นหนึ่ง
addPersonAlias(rawName, personId, method, confidence)	เพิ่ม alias ใน MST_ALIAS_PERSON
getPersonById(personId)	ดึงข้อมูลบุคคลจาก ID
loadPersonCache()	โหลด MST_PERSON ลง memory cache
loadAliasPersonCache()	โหลด MST_ALIAS_PERSON ลง memory cache
generatePersonId()	สร้าง ID อัตโนมัติ เช่น PSN-00001
scorePersonMatch(rawName, lat, lng, candidate)	คำนวณคะแนน matching บุคคล รวม name + geo
detectPersonDuplicate(personId)	ตรวจหา duplicate ของบุคคลนี้
reconcilePersonGeo(personId)	อัปเดตพิกัดอ้างอิงของบุคคลจากงานล่าสุด
MODULE 5: MOD_PLACE.gs — ระบบจัดการข้อมูลสถานที่
จุดประสงค์: สร้าง/อัปเดต/ค้นหา/รวม Master Place

ฟังก์ชัน	หน้าที่
findPlaceByLatLng(lat, lng, radiusM)	ค้นหา Place จากพิกัด
findPlaceByName(cleanName)	ค้นหา Place จากชื่อ
findPlaceByAlias(rawName)	ค้นหา Place จาก alias table
findPlaceCandidates(rawAddress, lat, lng)	ค้นหาตัวเลือกสถานที่พร้อมคะแนน
createPlace(data)	สร้าง record ใหม่ใน MST_PLACE
updatePlace(placeId, data)	อัปเดตข้อมูลสถานที่
mergePlaces(sourceId, targetId)	รวม 2 Place เป็นหนึ่ง
addPlaceAlias(rawName, placeId, method, confidence)	เพิ่ม alias ใน MST_ALIAS_PLACE
getPlaceById(placeId)	ดึงข้อมูลสถานที่จาก ID
loadPlaceCache()	โหลด MST_PLACE ลง memory
loadAliasPlaceCache()	โหลด MST_ALIAS_PLACE ลง memory
generatePlaceId()	สร้าง ID อัตโนมัติ เช่น PLC-00001
scorePlaceMatch(rawAddr, lat, lng, candidate)	คะแนน matching สถานที่ รวม name + geo + geo_text
enrichPlaceFromTHGeo(placeId)	เติมข้อมูล tambon/amphoe/province/postcode จาก SYS_TH_GEO
detectPlaceDuplicate(placeId)	ตรวจหา duplicate ของสถานที่นี้
clusterAndMergePlaces(radiusM)	จัดกลุ่มสถานที่ที่พิกัดใกล้กันและ merge อัตโนมัติ (ถ้าคะแนนสูง)
MODULE 6: MOD_CONFLICT.gs — ระบบตรวจจับและจัดการความขัดแย้ง 8 ข้อ
จุดประสงค์: ตรวจจับปัญหาทั้ง 8 กรณี และสร้าง Review Queue

ฟังก์ชัน	กรณีที่รองรับ	หน้าที่
detectDuplicatePersonName(rows)	ปัญหา #1	ตรวจชื่อบุคคลซ้ำ
detectDuplicatePlaceName(rows)	ปัญหา #2	ตรวจชื่อสถานที่ซ้ำ
detectDuplicateLatLong(rows)	ปัญหา #3	ตรวจพิกัดซ้ำ
detectSamePersonDiffName(rows)	ปัญหา #4	คนเดียวกัน ชื่อต่างกัน
detectDiffPersonSamePlace(rows)	ปัญหา #5	คนต่างกัน สถานที่เดียวกัน
detectSamePersonDiffPlace(rows)	ปัญหา #6	คนเดียวกัน สถานที่ต่างกัน
detectSamePersonDiffLatLong(rows)	ปัญหา #7	ชื่อเดียวกัน พิกัดต่างกัน
detectDiffPersonSameLatLong(rows)	ปัญหา #8	ชื่อต่างกัน พิกัดเดียวกัน
runAllConflictDetection(rows)	ทุกปัญหา	รันตรวจทุกกรณีพร้อมกัน
buildConflictReport(conflicts)	-	สร้างรายงานสรุป
addToReviewQueue(conflictData)	-	ส่งรายการไปยัง REVIEW_QUEUE
scoreConflictSeverity(conflictType, data)	-	ให้คะแนนความรุนแรงของ conflict
MODULE 7: MOD_PROCESS.gs — ระบบประมวลผลหลัก (Orchestrator)
จุดประสงค์: ควบคุมการทำงานทั้งหมด เรียกโมดูลอื่นตามลำดับ

ฟังก์ชัน	หน้าที่
processNewRows()	ฟังก์ชันหลัก: ดึงแถวใหม่จากชีตดิบ → ประมวลผลทั้งหมด
processSingleRow(row)	ประมวลผลแถวเดียว → match person + place + detect conflict
matchRow(row)	ทำ matching บุคคลและสถานที่ของแถวนี้
decideAndWrite(row, matchResult)	ตัดสินใจตาม score → write to master / queue
runDailySync()	รันทุกวัน: process + conflict detection + enrich
runFullRebuild()	ล้างและสร้าง master ใหม่ทั้งหมด (ใช้ตอน init)
markRowAsProcessed(sheet, rowIndex, personId, placeId)	เขียน result กลับไปในชีตดิบ
getUnprocessedRows()	ดึงแถวที่ยังไม่ได้ประมวลผล
batchProcess(rows)	ประมวลผลแบบ batch เพื่อหลีกเลี่ยง timeout
resumeFromLastBatch()	ต่อจาก batch ที่ค้างไว้
runPostProcessEnrich()	เติมข้อมูลเสริมหลัง process (geo, THGEO, distance)
MODULE 8: MOD_ADMIN.gs — ระบบ Admin / UI / Manual Tools
จุดประสงค์: เครื่องมือสำหรับ Admin จัดการ review, merge, และดู dashboard

ฟังก์ชัน	หน้าที่
resolveReview(reviewId, decision, note)	Admin ยืนยัน review item
resolveAllPendingReviews()	ประมวลผล review ที่ Admin ตัดสินใจแล้วทั้งหมด
manualMergePerson(personId1, personId2)	Admin รวม 2 คนด้วยตนเอง
manualMergePlace(placeId1, placeId2)	Admin รวม 2 สถานที่ด้วยตนเอง
showDashboard()	แสดงสถิติระบบ: จำนวน person, place, review pending, error
exportCleanData()	Export ข้อมูลสะอาดออกมาเป็นชีตใหม่
buildMenuUI()	สร้าง custom menu ใน Google Sheets
onOpen()	trigger เมื่อเปิด spreadsheet → สร้าง menu
triggerDailyProcess()	ตั้ง time-based trigger รันทุกวัน
removeTriggers()	ลบ trigger ทั้งหมด
showProcessLog(limit)	แสดง log ล่าสุด N รายการ
clearResolvedReviews()	ลบ review ที่ resolve แล้วออก
initAllSheets()	สร้างทุกชีตพร้อม header ครั้งแรก
validateSystemIntegrity()	ตรวจสอบความสมบูรณ์ของ master data
🔄 Logic Flow ภาพรวม
Copyชีตดิบ (SCGนครหลวงJWDภูมิภาค)
         ↓
MOD_PROCESS: getUnprocessedRows()
         ↓
MOD_NORMALIZE: normalizeName() + normalizeAddress()
         ↓
MOD_GEO: parseLatLong() + lookupTHGeo() + reverseGeocode()
         ↓
MOD_PERSON: findPersonCandidates() → scorePersonMatch()
MOD_PLACE:  findPlaceCandidates()  → scorePlaceMatch()
         ↓
         คะแนน ≥ AUTO_CONFIRM_THRESHOLD?
         ├── YES → เขียน Master โดยตรง + เพิ่ม Alias
         ├── MIDDLE (≥ REVIEW_THRESHOLD) → ส่ง REVIEW_QUEUE
         └── LOW → สร้าง record ใหม่ใน Master
         ↓
MOD_CONFLICT: runAllConflictDetection()
         ↓
REVIEW_QUEUE ← รอ Admin ตัดสิน
         ↓
MOD_ADMIN: resolveReview() → ดำเนินการตาม decision
         ↓
MST_PERSON / MST_PLACE (สะอาด พร้อมใช้งาน)
📊 สรุปภาพรวม
รายการ	จำนวน
ชีตทั้งหมด	9 ชีต
โมดูลโค้ด	8 โมดูล
ฟังก์ชันรวม	~100 ฟังก์ชัน
โมดูล	จำนวนฟังก์ชัน
MOD_CONFIG	9
MOD_GEO	13
MOD_NORMALIZE	11
MOD_PERSON	15
MOD_PLACE	16
MOD_CONFLICT	12
MOD_PROCESS	11
MOD_ADMIN	14
❓ คำถามก่อนเริ่มเขียนโค้ด
Google Maps API — มีหรือยัง? (ใช้ใน reverseGeocode() และ lookupTHGeo())
คอลัมน์สถานะ — ต้องการให้เพิ่มคอลัมน์ PERSON_ID_MATCHED และ PLACE_ID_MATCHED กลับไปในชีตดิบด้วยไหม?
ชีต SYS_TH_GEO — ข้อมูลมีกี่แถวโดยประมาณ? (กระทบ performance ของ cache)
Trigger — ต้องการให้ระบบรันอัตโนมัติกี่โมงทุกวัน?
ข้อมูลที่ได้มา ทั้งชื่อบุคคล ทั้งชื่อสถานที่ มันมาแบบมั่วๆ ครบบ้าง ไม่ครบบ้าง ตัดคำมามั่วๆครับ ทำมาแบบไม่ใส่ใจ ให้สูตรตัดคำแต่ไม่ตรวจสอบ ผมจึงอยากจะพัฒนาระบบเอง แค่ข้อมูลที่ได้มามัน ไม่ดีเท่าไหร่ครับ  จึงอยากจะเน้นย้ำเรื่องตรงนี้แหละ
🎯 เน้นย้ำเรื่องข้อมูลสกปรก — Deep Dive การออกแบบระบบ Normalize & Match
ผมเข้าใจครับ นี่คือหัวใจของโปรเจกต์เลย ขอออกแบบให้ละเอียดเป็นพิเศษ

🔴 ปัญหาจริงที่เจอในข้อมูล — จัดหมวดหมู่ใหม่
หมวด A: ปัญหาชื่อบุคคล (ชื่อปลายทาง)
Copyข้อมูลดิบที่อาจเจอ          ความหมายจริง
─────────────────────────────────────────────────────
"สมชาย"                    → คนเดียวกัน
"คุณสมชาย"                 → คนเดียวกัน
"ช่างสมชาย"                → คนเดียวกัน
"นายสมชาย วัสดุ"           → คนเดียวกัน (ตัดคำผิด)
"สมชาย รับของ"             → คนเดียวกัน (มี noise)
"ร้านสมชาย"                → คนเดียวกัน หรือ คนละคน?
"สมชาย (บ้าน)"             → อาจคนละที่กับ "สมชาย (ออฟฟิศ)"
"สมชาย1"                   → ระบบเก่าเพิ่มเลขต่อท้าย
""  (ว่างเปล่า)             → ไม่มีชื่อเลย
"ส"  (ตัวอักษรเดียว)       → ตัดคำผิดพลาด
"สมชาย สมหญิง"             → 2 คนในช่องเดียว?
หมวด B: ปัญหาชื่อสถานที่ (ที่อยู่ปลายทาง + ชื่อที่อยู่จาก_LatLong)
Copyข้อมูลดิบ                               ปัญหา
──────────────────────────────────────────────────────────────
"123 ถนนสุขุมวิท"                     → ไม่มีแขวง/อำเภอ
"สุขุมวิท 71 คลองเตย"                 → ไม่ครบ
"บ้านคุณสมชาย แถวๆ ลาดกระบัง"       → ข้อความทั่วไป ไม่ใช่ที่อยู่
"ตลาดมีนบุรี"                          → ชื่อย่าน ไม่มีเลขที่
"SCG โรงงาน A"                        → ชื่อสถานที่ภายใน
"ร้านค้า"                              → สั้นเกินไป
"."  หรือ  "-"                         → placeholder ว่างเปล่า
"13.7563,100.5018"                     → พิกัดหลุดมาในช่องที่อยู่
"อยู่ใกล้ๆ 7-11 สาขา..."             → คำบอกทิศ ไม่ใช่ที่อยู่
หมวด C: ปัญหาพิกัด (LAT/LONG)
Copyสถานการณ์                              ความหมาย
──────────────────────────────────────────────────────────────
พิกัดเดียวกัน ≤ 50 เมตร             → น่าจะที่เดียวกัน
พิกัดต่างกัน 50–200 เมตร            → อาจเป็นที่เดียวกัน (ต้องตรวจ)
พิกัดต่างกัน > 500 เมตร             → คนละที่แน่นอน
พิกัด 0,0                            → ไม่ได้กด GPS (default ผิด)
พิกัดนอกประเทศไทย                   → ข้อมูลผิดพลาด
พิกัดอยู่ในทะเล                      → GPS เพี้ยน
🧠 การออกแบบ MOD_NORMALIZE.gs ฉบับละเอียด
ฟังก์ชันที่ต้องเพิ่ม/ปรับปรุงพิเศษ
normalizeName(rawName) — หัวใจสำคัญที่สุด
Copy// ลำดับการทำงานข้างใน:
// 1. ตรวจว่าว่างเปล่า หรือ noise ล้วนๆ → return null
// 2. trim + ลบ whitespace ซ้ำ
// 3. ลบ prefix: คุณ, นาย, นาง, นางสาว, ดร., อ., ช่าง, 
//              พี่, น้อง, ลุง, ป้า, ร้าน, บ้าน, หจก., บจก.
// 4. ลบ suffix noise: รับของ, สั่งของ, ออฟฟิศ, สำนักงาน,
//                     บ้าน, 1, 2, (1), (2), _1, _2
// 5. ลบอักขระพิเศษ: (, ), [, ], ., -, /  ที่ไม่จำเป็น
// 6. ถ้าผลลัพธ์สั้นกว่า 2 ตัวอักษร → flag เป็น TOO_SHORT
// 7. return { clean: "สมชาย", original: "ช่างสมชาย รับของ", 
//             flags: [], confidence: 0.9 }
detectNameQuality(rawName) ← ฟังก์ชันใหม่ที่สำคัญมาก
Copy// วัดคุณภาพของชื่อก่อนนำไปใช้
// return {
//   score: 0-100,
//   issues: [
//     "TOO_SHORT",        // น้อยกว่า 2 ตัวอักษร
//     "ONLY_PREFIX",      // มีแต่คำนำหน้า เช่น "คุณ"
//     "CONTAINS_NUMBER",  // มีตัวเลขปน เช่น "สมชาย1"
//     "CONTAINS_LATLONG", // พิกัดหลุดมาในชื่อ
//     "PLACEHOLDER",      // "-", ".", "N/A", "ไม่ระบุ"
//     "MULTIPLE_NAMES",   // อาจมี 2 คนในช่องเดียว
//     "TOO_GENERIC",      // "ร้านค้า", "ลูกค้า", "ปลายทาง"
//     "ALL_NOISE",        // ล้วนเป็น noise
//   ],
//   usable: true/false   // ใช้งานได้หรือไม่
// }
detectAddressQuality(rawAddress) ← ฟังก์ชันใหม่
Copy// วัดคุณภาพของที่อยู่
// return {
//   score: 0-100,
//   hasStreetNumber: true/false,  // มีเลขที่บ้าน
//   hasSubdistrict: true/false,   // มีแขวง/ตำบล
//   hasDistrict: true/false,      // มีเขต/อำเภอ
//   hasProvince: true/false,      // มีจังหวัด
//   hasPostcode: true/false,      // มีรหัสไปรษณีย์
//   issues: [...],
//   completenessScore: 0-100      // ความครบถ้วน
// }
calcFuzzyScore(str1, str2) — ต้องออกแบบพิเศษสำหรับภาษาไทย
Copyอัลกอริทึมที่ใช้รวมกัน:

1. Exact Match          → score = 100
2. Normalized Match     → score = 95  (หลัง normalize แล้วเหมือนกัน)
3. Contains Match       → score = 80  (str1 อยู่ใน str2 หรือกลับกัน)
4. Levenshtein Distance → score ตามความห่าง
5. Token Sort Ratio     → เรียงคำใหม่แล้วเปรียบ (สมชาย วงษ์ = วงษ์ สมชาย)
6. Token Set Ratio      → เปรียบเฉพาะคำที่มีร่วมกัน

สุดท้าย → weighted average ของทั้งหมด
calcNameSimilarity(name1, name2) — น้ำหนักพิเศษไทย
Copyน้ำหนักที่ใช้:
- ชื่อแรกตรงกัน (first token)    : +40 คะแนน
- ชื่อหลังตรงกัน (last token)   : +30 คะแนน  
- fuzzy score รวม                : +30 คะแนน

กรณีพิเศษ:
- ชื่อสั้นมาก (< 3 ตัว) → penalty -20
- มีตัวเลขปน → penalty -10
- เป็น common word เช่น "ช่าง" → penalty -30
🎯 การออกแบบ Scoring System — ใช้กับปัญหาทั้ง 8 ข้อ
แผนภาพการตัดสินใจ
Copyแถวใหม่เข้ามา
     ↓
[STEP 1] ตรวจคุณภาพข้อมูล
     ├── ชื่อคน: detectNameQuality()    → score_name_quality
     ├── ที่อยู่: detectAddressQuality() → score_addr_quality
     └── พิกัด:  isValidLatLong()       → geo_valid (true/false)
     ↓
[STEP 2] ค้นหา Candidates
     ├── ค้นจากชื่อ:  findPersonCandidates()  → candidates_by_name[]
     ├── ค้นจากพิกัด: findPersonByGeo()        → candidates_by_geo[]
     └── รวมและ deduplicate candidates
     ↓
[STEP 3] Scoring แต่ละ Candidate
     สำหรับแต่ละ candidate:
     ├── name_score     = calcNameSimilarity(rawName, candidate.name)
     ├── geo_score      = geoDistance < 50m ? 100 : (< 200m ? 70 : 0)
     ├── addr_score     = calcAddressSimilarity(rawAddr, candidate.addr)
     ├── alias_bonus    = มีใน alias table ? +20 : 0
     └── TOTAL_SCORE    = (name_score × 0.40) 
                        + (geo_score  × 0.40)
                        + (addr_score × 0.15)
                        + (alias_bonus× 0.05)
     ↓
[STEP 4] ตัดสินใจ
     ├── TOTAL ≥ 90  → AUTO CONFIRM → เขียน Master ทันที
     ├── TOTAL 60–89 → REVIEW QUEUE → รอ Admin
     ├── TOTAL < 60  → CREATE NEW  → สร้าง record ใหม่
     └── ไม่มี candidates → CREATE NEW
📋 ตาราง Conflict Detection ทั้ง 8 กรณี — Logic โดยละเอียด
#	ปัญหา	Signal ที่ใช้ตรวจ	วิธีตัดสิน	Action
1	ชื่อบุคคลซ้ำ	name_score ≥ 90 + geo_score < 50	อาจเป็นคนเดียวกัน แต่คนละที่	→ Review: PERSON_DUP
2	ชื่อสถานที่ซ้ำ	addr_score ≥ 90 + geo_score < 50	อาจเป็นที่เดียวกัน แต่พิกัดไม่ตรง	→ Review: PLACE_DUP
3	LatLong ซ้ำ	geo_score = 100 (< 50 เมตร)	ที่เดียวกันแน่	→ Auto Merge Place
4	คนเดียว ชื่อต่าง	geo_score ≥ 90 + name_score 60–89	พิกัดใกล้ แต่ชื่อเพี้ยน	→ Review: SAME_PERSON_DIFF_NAME
5	คนต่าง สถานที่เดียว	geo_score ≥ 90 + name_score < 60	พิกัดใกล้ แต่ชื่อต่างกันมาก	→ Review: DIFF_PERSON_SAME_PLACE
6	คนเดียว สถานที่ต่าง	name_score ≥ 90 + geo_score < 50	ชื่อเหมือน แต่พิกัดต่างกันมาก	→ Review: SAME_PERSON_DIFF_PLACE
7	ชื่อเดียว พิกัดต่าง	name_score ≥ 90 + geo_score = 0	ชื่อเหมือน พิกัดห่างกัน > 500m	→ Review: SAME_NAME_DIFF_GEO
8	ชื่อต่าง พิกัดเดียว	geo_score = 100 + name_score < 60	พิกัดซ้อน แต่ชื่อต่างกันมาก	→ Review: DIFF_NAME_SAME_GEO
🆕 ฟังก์ชันเพิ่มเติมที่ควรเพิ่มในแต่ละโมดูล
MOD_GEO.gs — เพิ่ม
ฟังก์ชันใหม่	หน้าที่
isLatLongInThailand(lat, lng)	ตรวจว่าอยู่ในกรอบ bbox ประเทศไทย (ไม่เรียก API)
isLatLongInSea(lat, lng)	ตรวจว่าพิกัดอยู่ในทะเลหรือเปล่า (ใช้ polygon เบสิก)
isDefaultZeroLatLong(lat, lng)	ตรวจว่าเป็น 0,0 หรือค่า default ผิด
snapToNearestRoad(lat, lng)	snap พิกัดไปถนนใกล้สุด (ถ้ามี Maps API)
getGeoQualityScore(lat, lng)	คะแนนคุณภาพพิกัด 0–100 รวมทุกการตรวจ
buildGeoIndex()	สร้าง spatial index ของ MST_PLACE เพื่อค้นเร็ว
MOD_NORMALIZE.gs — เพิ่ม
ฟังก์ชันใหม่	หน้าที่
detectNameQuality(rawName)	วัดคุณภาพชื่อ → score + issues[]
detectAddressQuality(rawAddress)	วัดคุณภาพที่อยู่ → score + completeness
isPlaceholderText(text)	ตรวจว่าเป็น "-", ".", "N/A", "ไม่ระบุ" ฯลฯ
isGenericName(text)	ตรวจว่าเป็นชื่อทั่วไปที่ใช้ match ไม่ได้ เช่น "ร้านค้า"
splitPossibleMultipleNames(text)	พยายามแยกถ้ามี 2 ชื่อในช่องเดียว
detectLatLongInText(text)	ตรวจว่ามีพิกัดปนมาในข้อความหรือไม่
standardizeThaiAddress(text)	แปลง "ต.", "อ.", "จ." ให้เป็นรูปแบบมาตรฐาน
extractPostcodeFromText(text)	ดึงรหัสไปรษณีย์ออกจากข้อความ
MOD_PERSON.gs — เพิ่ม
ฟังก์ชันใหม่	หน้าที่
flagPersonForReview(personId, reason)	flag บุคคลให้ Admin ตรวจ
getPersonHistory(personId)	ดึงประวัติงานทั้งหมดของบุคคล
findPersonsByOwner(ownerName)	หาบุคคลทั้งหมดที่รับของจาก owner นี้
calcPersonGeoConsistency(personId)	ตรวจว่าพิกัดของคนนี้สม่ำเสมอแค่ไหน
suggestPersonMerge()	สแกน Master แล้วเสนอ merge candidates ทั้งหมด
MOD_PLACE.gs — เพิ่ม
ฟังก์ชันใหม่	หน้าที่
flagPlaceForReview(placeId, reason)	flag สถานที่ให้ Admin ตรวจ
getPlaceHistory(placeId)	ดึงประวัติงานทั้งหมดของสถานที่
calcPlaceGeoCentroid(placeId)	คำนวณพิกัดศูนย์กลางจากงานทั้งหมด
detectPlaceGeoOutlier(placeId)	ตรวจพิกัดที่ผิดปกติจากค่าเฉลี่ย
suggestPlaceMerge()	สแกน Master แล้วเสนอ merge candidates
validatePlaceAgainstTHGeo(placeId)	ตรวจว่า tambon/amphoe ตรงกับ SYS_TH_GEO ไหม
MOD_PROCESS.gs — เพิ่ม
ฟังก์ชันใหม่	หน้าที่
preScreenRow(row)	กรองเบื้องต้นก่อน process (ตรวจ null, placeholder)
logSkippedRow(row, reason)	บันทึกแถวที่ข้ามไป พร้อมเหตุผล
handleLowQualityRow(row)	จัดการแถวคุณภาพต่ำ → ส่ง REVIEW หรือ flag
enrichRowWithGeo(row)	เติมข้อมูล GEO ให้แถวก่อน process
validateProcessResult(result)	ตรวจสอบผลลัพธ์ก่อน write
📌 สรุปโมดูลและจำนวนฟังก์ชันฉบับอัปเดต
โมดูล	ฟังก์ชันเดิม	ฟังก์ชันเพิ่ม	รวม
MOD_CONFIG	9	0	9
MOD_GEO	13	6	19
MOD_NORMALIZE	11	8	19
MOD_PERSON	15	5	20
MOD_PLACE	16	6	22
MOD_CONFLICT	12	0	12
MOD_PROCESS	11	5	16
MOD_ADMIN	14	0	14
รวม	101	30	131
❓ คำถามที่ต้องตอบก่อนเขียนโค้ด
เรื่อง Google Maps API:

มีหรือยัง? ถ้าไม่มี reverseGeocode() จะใช้ข้อมูลจาก ชื่อที่อยู่จาก_LatLong ที่มีอยู่แล้วแทนได้เลยครับ

เรื่องคอลัมน์ในชีตดิบ:

ต้องการให้เขียนผลลัพธ์ PERSON_ID_MATCHED และ PLACE_ID_MATCHED กลับไปในชีต SCGนครหลวงJWDภูมิภาค ด้วยไหม?

เรื่อง SYS_TH_GEO:

ข้อมูลมีกี่แถว? และจะ import เองหรือต้องการให้ระบบช่วยดึงจากแหล่งอ้างอิง?

พร้อมเริ่มเขียนโค้ดจริงโมดูลไหนก่อนครับ?

ผมแนะนำ: MOD_CONFIG → MOD_GEO → MOD_NORMALIZE เพราะสามเป็นรากฐานของทุกโมดูล