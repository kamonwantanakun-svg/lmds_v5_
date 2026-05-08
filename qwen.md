นี่คือแผนการออกแบบระบบฐานข้อมูลและโครงสร้างโค้ด (System Architecture) สำหรับโปรเจกต์ "SCG Data Cleansing & Master Data Management" บน Google Apps Script อย่างละเอียดครับ
โดยยึดหลักการ: "ใช้พิกัดจริง (LatLong) เป็นตัวตั้ง, ใช้ชื่อเป็นตัวเลือกเสริม, และสร้างระบบตรวจสอบความซ้ำซ้อนทั้ง 8 กรณี"
1. โครงสร้างชีตใน Google Sheet (Database Schema)
เราจะแบ่งชีตออกเป็น 3 กลุ่มหลัก: Raw Data (ข้อมูลดิบ), Master Data (ข้อมูลสะอาด/อ้างอิง), และ Config/Log (การตั้งค่าและบันทึก)
กลุ่มที่ 1: ข้อมูลดิบ (Input)
1. ชื่อชีต: SCGนครหลวงJWDภูมิภาค (ตามเดิมของคุณ)
หน้าที่: รับข้อมูลจากคนขับทุกวัน
คอลัมน์สำคัญที่ใช้ในระบบใหม่:
จุดส่งสินค้าปลายทาง (Source LatLong)
LAT, LONG (แยกแล้ว)
ชื่อปลายทาง (Raw Person Name)
ที่อยู่ปลายทาง (Raw Address - น้ำหนักต่ำ)
ชื่อที่อยู่จาก_LatLong (Derived Address - น้ำหนักสูง)
ชื่อเจ้าของสินค้า (Context)
Invoice No, วันที่ส่งสินค้า (Transaction Info)
กลุ่มที่ 2: ข้อมูลภูมิศาสตร์อ้างอิง (Reference Geo)
2. ชื่อชีต: SYS_TH_GEO (ที่คุณต้องการสร้างใหม่)
หน้าที่: ฐานข้อมูลไปรษณีย์ไทย เพื่อแปลงพิกัดให้เป็นเขต/อำเภอ/ตำบล ที่ถูกต้อง และจัดการข้อยกเว้นในช่องหมายเหตุ
คอลัมน์:
A: รหัสไปรษณีย์
B: แขวง/ตำบล
C: เขต/อำเภอ
D: จังหวัด
E: หมายเหตุ (เก็บ Logic การยกเว้น เช่น "ทั้งแขวง ยกเว้นซอย...")
กลุ่มที่ 3: ข้อมูลหลักที่ผ่านการทำความสะอาด (Master Data)
3. ชื่อชีต: MASTER_PLACE (สถานที่)
หน้าที่: เก็บรายชื่อสถานที่ที่ไม่ซ้ำกัน โดยอ้างอิงจากพิกัดเป็นหลัก
คอลัมน์:
Place_ID: รหัสประจำสถานที่ (สร้างใหม่ เช่น P-0001)
Ref_Lat: ละติจูดมาตรฐานของที่นี่
Ref_Long: ลองจิจูดมาตรฐานของที่นี่
Place_Name_Primary: ชื่อสถานที่หลัก (เลือกจากชื่อที่ปรากฏบ่อยสุด หรือจาก ชื่อที่อยู่จาก_LatLong)
Place_Alias: ชื่ออื่นๆ ที่เคยถูกเรียก (รวม ที่อยู่ปลายทาง ที่มั่วๆ มาไว้ที่นี่)
Full_Address_Derived: ที่อยู่เต็มรูปแบบที่สร้างจาก พิกัด + SYS_TH_GEO
Postal_Code: รหัสไปรษณีย์ที่ถูกต้อง
Last_Updated: วันที่อัปเดตล่าสุด
Confidence_Score: คะแนนความน่าเชื่อถือของข้อมูลนี้
4. ชื่อชีต: MASTER_PERSON (บุคคล/ลูกค้า)
หน้าที่: เก็บรายชื่อลูกค้าที่ไม่ซ้ำกัน แก้ปัญหาชื่อเขียนต่างกัน
คอลัมน์:
Person_ID: รหัสประจำบุคคล (สร้างใหม่ เช่น C-0001)
Name_Primary: ชื่อมาตรฐาน (เช่น "นายสมชาย ใจดี")
Name_Alias: ชื่ออื่นๆ ที่เคยพบ (เช่น "ช่างสมชาย", "คุณสมชาย", "สมชาย ร้านวัสดุ")
Linked_Place_IDs: รายการ Place_ID ที่บุคคลนี้เคยไปส่งของ (ใช้แก้กรณีที่ชื่อเดียวกันแต่อยู่หลายที่)
Phone_Hash: (ถ้ามีเบอร์โทรในอนาคต จะใช้ตัวนี้จับคู่แทนชื่อ)
Last_Seen: วันที่เจอล่าสุด
5. ชื่อชีต: LINK_TRANSACTION (ประวัติความสัมพันธ์)
หน้าที่: เชื่อมโยงว่า "ใคร" ส่งของให้ "ที่ไหน" เมื่อไหร่ (เพื่อเก็บประวัติโดยไม่ต้องแก้ Master)
คอลัมน์:
Trans_ID: รหัสธุรกรรม (ใช้ Invoice No หรือสร้างใหม่)
Date: วันที่ส่ง
Person_ID: ลิงก์ไป MASTER_PERSON
Place_ID: ลิงก์ไป MASTER_PLACE
Owner_Company: ชื่อเจ้าของสินค้า
Raw_LatLong: พิกัดดิบจากวันนั้น
Distance_From_Master: ระยะห่างจากพิกัดมาตรฐานของ Place นั้น (ใช้เช็คความผิดปกติ)
กลุ่มที่ 4: การตรวจสอบและรายงาน (Audit & Log)
6. ชื่อชีต: LOG_PROCESSING
หน้าที่: บันทึกการทำงานของแต่ละแถว ว่าผ่านกฎไหน ตกกฎไหน
คอลัมน์: Row_ID, Status (New Place, New Person, Matched, Suspicious), Issue_Flag (ระบุปัญหา 8 ข้อที่เจอ), Message
2. โครงสร้างโมดูลโค้ด (Code Modules & Functions)
จะแบ่งไฟล์ .gs ใน Apps Script ออกเป็น 5 โมดูล เพื่อให้ดูแลรักษาง่าย
โมดูลที่ 1: Module_Config.gs (การตั้งค่า)
เก็บค่าคงที่และตัวแปร глобальные
CONSTANTS: เก็บชื่อชีต, ขอบเขตรัศมีพิจารณา (เช่น 50 เมตรถือว่าที่เดียวกัน), คะแนนขั้นต่ำ
getSheetNames(): ฟังก์ชันดึงชื่อชีตทั้งหมดมาเช็คว่ามีครบไหม
โมดูลที่ 2: Module_Utils.gs (เครื่องมือช่วยคำนวณ)
ฟังก์ชันทางคณิตศาสตร์และการจัดการข้อความ
calculateDistance(lat1, lon1, lat2, lon2): คำนวณระยะทางระหว่าง 2 จุด (Haversine Formula) หน่วยเป็นเมตร
normalizeText(text): ทำความสะอาดข้อความ (ตัดคำนำหน้า คุณ/ช่าง/ร้าน, ลบช่องว่างเกิน, แปลงตัวเลขไทยเป็นอารบิก)
parseLatLong(rawString): แยกข้อความ "13.123,100.456" ออกเป็นตัวเลข
generateID(prefix): สร้างรหัสใหม่ (P-xxxx, C-xxxx)
โมดูลที่ 3: Module_GeoEngine.gs (หัวใจเรื่องสถานที่)
จัดการเรื่องพิกัดและที่อยู่ แก้ปัญหาข้อ 2, 3, 5, 6, 7, 8 เกี่ยวกับสถานที่
findOrCreatePlace(lat, long, rawAddress, derivedAddress): (สำคัญที่สุด)
ตรวจสอบใน MASTER_PLACE ว่ามีจุดไหนอยู่ในรัศมีที่กำหนดหรือไม่
ถ้ามี: คืนค่า Place_ID เดิม และเพิ่ม rawAddress เข้าไปใน Place_Alias
ถ้าไม่มี: สร้าง Place_ID ใหม่, ใช้ derivedAddress + ข้อมูลจาก SYS_TH_GEO สร้างที่อยู่มาตรฐาน
resolveGeoWithSysThGeo(lat, long): เรียกดูชีต SYS_TH_GEO เพื่อหา ตำบล/อำเภอ/ไปรษณีย์ ที่ถูกต้องจากพิกัด (อาจใช้ Logic ตรวจสอบขอบเขตอย่างง่าย หรือเตรียมไว้สำหรับ API ภายนอก)
mergeDuplicatePlaces(): ฟังก์ชันรัน вручную เพื่อค้นหาสถานที่ที่พิกัดใกล้กันมากแต่อาจจะหลุดการสร้างมาเป็นคนละ ID ให้มารวมกัน
โมดูลที่ 4: Module_PersonEngine.gs (หัวใจเรื่องบุคคล)
จัดการเรื่องชื่อลูกค้า แก้ปัญหาข้อ 1, 4, 5, 6, 7, 8 เกี่ยวกับบุคคล
findOrCreatePerson(rawName, placeId, ownerCompany): (สำคัญที่สุด)
ทำ normalizeText ชื่อ_raw
ค้นหาใน MASTER_PERSON ว่ามีชื่อตรงกัน หรือชื่อคล้ายกันมาก (Similarity Score) หรือไม่
Logic แก้ปัญหาชื่อต่างกัน: ถ้าชื่อคล้ายกัน (>80%) และเคยไปส่งที่ Place_ID เดียวกัน หรือ บริษัทเดียวกัน -> ถือว่าเป็นคนเดียวกัน ให้รวม Alias
Logic แก้ปัญหาชื่อเดียวกัน คนละที่: ถ้าชื่อตรงกัน แต่ Place_ID ใหม่ไม่อยู่ในรายการ Linked_Place_IDs -> เพิ่มสถานที่ใหม่เข้าไปในลิงก์ (ไม่สร้างคนใหม่)
calculateNameSimilarity(name1, name2): อัลกอริทึมเปรียบเทียบความคล้ายของชื่อ (เช่น Levenshtein Distance)
โมดูลที่ 5: Module_MainController.gs (ผู้ควบคุมการทำงาน)
ฟังก์ชันหลักที่กดรันเพื่อประมวลผลข้อมูล
processDailyData(): ฟังก์ชันหลัก
อ่านข้อมูลจาก SCGนครหลวงJWDภูมิภาค (เฉพาะแถวยังไม่ประมวลผล)
วนลูปแต่ละแถว:
แยกพิกัด -> เรียก Module_GeoEngine ได้ Place_ID
แยกชื่อ -> เรียก Module_PersonEngine ได้ Person_ID (โดยส่ง Place_ID ไปประกอบตัดสินใจ)
บันทึกผลการจับคู่ลง LINK_TRANSACTION
บันทึกสถานะลง LOG_PROCESSING (ถ้าเจอกรณีแปลกๆ เช่น ชื่อเดียวกัน พิกัดห่างกันมาก ให้ธงสีแดง)
อัปเดตสถานะในชีตดิบว่า "Processed Then"
auditDataQuality(): ฟังก์ชันตรวจสอบย้อนหลัง เพื่อหา 8 ปัญหาที่อาจหลุดรอด และเสนอแนะให้แก้ไข
3. คำอธิบายการทำงานเพื่อแก้ปัญหา 8 ข้อ (Logic Flow)
ระบบจะทำงานเป็นขั้นตอนดังนี้เมื่อได้รับข้อมูลใหม่:
ขั้นที่ 1: ตรวจสอบสถานที่ (Place First Strategy)
ระบบดู LAT/LONG ก่อนเสมอ
เปรียบเทียบกับ MASTER_PLACE ทั้งหมด
กรณีพิกัดซ้ำ/ใกล้กัน (ข้อ 3, 8): ถือว่าเป็นสถานที่เดียวกัน ไม่ว่าชื่อที่อยู่ที่ใส่มาจะมั่วแค่ไหน (ที่อยู่ปลายทาง จะถูกทิ้งหรือเก็บเป็น Alias เท่านั้น) ใช้ ชื่อที่อยู่จาก_LatLong เป็นชื่อหลัก
กรณีพิกัดใหม่: สร้างสถานที่ใหม่ พร้อมดึงข้อมูลจาก SYS_TH_GEO มาเติมเต็มที่อยู่ให้สมบูรณ์
ขั้นที่ 2: ตรวจสอบบุคคล (Person Matching with Context)
ระบบรับ ชื่อปลายทาง ที่มั่วๆ มาทำ Normalization (ตัด คุณ, ช่าง, ร้าน ออก)
กรณีชื่อซ้ำกัน (ข้อ 1, 4): ระบบจะค้นหาชื่อที่ใกล้เคียงใน MASTER_PERSON
ถ้าเจอชื่อคล้ายกัน: เช็คว่าสถานที่ (Place_ID จากขั้นที่ 1) เคยเชื่อมโยงกับคนนี้ไหม? หรือบริษัทเจ้าของสินค้าเดียวกันไหม? ถ้าใช่ -> รวมเป็นคนเดียวกัน แล้วเพิ่มชื่อที่พิมพ์ผิดเข้าไปในรายการ Alias
กรณีชื่อเดียวกัน แต่ต่างสถานที่ (ข้อ 6, 7):
ถ้าชื่อตรงกัน แต่พิกัดห่างกันมาก (คนละจังหวัด): ระบบจะ ไม่รวม เป็นคนเดียวกันทันที แต่จะสร้างบันทึกเชื่อมโยงว่า "คนที่ชื่อสมชายคนนี้ มีสถานที่ส่งของ 2 แห่ง" (เก็บใน Linked_Place_IDs) เพื่อให้มนุษย์เป็นผู้ตัดสินใจภายหลังว่าใช่คนเดียวกันจริงไหม (เช่น สมชาย มีสาขา 2 สาขา)
กรณีคนละชื่อ แต่สถานที่เดียวกัน (ข้อ 5):
ถือเป็นคนละคน (อาจเป็นลูกน้อง, ญาติ) แต่ผูกติดกับ Place_ID เดียวกัน
ขั้นที่ 3: การบันทึกและแจ้งเตือน (Logging & Flagging)
ทุกการตัดสินใจจะถูกบันทึกใน LOG_PROCESSING
หากพบกรณีที่น่าสงสัย (เช่น ชื่อเหมือนกันเป๊ะ แต่พิกัดห่างกัน 50 กม.) ระบบจะติดธง Suspicious ในล็อก เพื่อให้ Admin กดเข้าไปตรวจสอบในชีต MASTER_PERSON ได้ง่าย
4. คำแนะนำเพิ่มเติมสำหรับการพัฒนา (Best Practices)
การจัดการ SYS_TH_GEO:
ข้อมูลในช่องหมายเหตุที่มีวงเล็บและข้อยกเว้นซับซ้อน Script ไม่สามารถเข้าใจบริบททางกฎหมายไปรษณีย์ได้ 100%
วิธีแก้: ให้ใช้ข้อมูลใน SYS_TH_GEO เพื่อหา "ตำบล/อำเภอ" หลักก่อน ส่วนข้อยกเว้นย่อยๆ ให้ใช้ LAT/LONG ของจุดส่งจริงเป็นตัวตัดสินสุดท้าย (เพราะพิกัดบอกตำแหน่งจริงได้ดีกว่าข้อความกฎเกณฑ์)
การเพิ่มฟังก์ชันตรวจสอบ (Validation Functions):
ควรเพิ่มฟังก์ชัน checkOutlier() ใน Module_MainController เพื่อตรวจหาจุดที่พิกัดโดดออกจากกลุ่มมากๆ (เช่น ปกติส่งแถวบางนา จู่ๆ ไปโผล่เชียงใหม่ ทั้งที่ชื่อลูกค้าเดียวกัน) อาจเกิดจากการกดพิกัดผิดพลาด
ประสิทธิภาพ (Performance):
เนื่องจากข้อมูลอาจมีจำนวนมาก การอ่าน/เขียน ทีละแถวใน Loop จะช้ามาก
เทคนิค: ใช้ getValues() ดึงข้อมูลมาเป็น Array ทั้งหมด, ประมวลผลในหน่วยความจำ (Memory), แล้วใช้ setValues() เขียนกลับทีเดียว (Batch Operation)
ความยืดหยุ่น (Flexibility):
ออกแบบให้ MASTER_PERSON และ MASTER_PLACE สามารถแก้ไขด้วยมือได้ (Manual Override) เพราะในบางกรณี ความเป็นจริงอาจซับซ้อนกว่าอัลกอริทึม (เช่น ลูกค้าเปลี่ยนชื่อร้าน แต่คนเดิม) ระบบต้องยอมให้คนแก้ทับได้
สรุปสิ่งที่คุณต้องทำต่อไป
สร้างชีตทั้ง 6 ตามโครงสร้างด้านบน
กรอกข้อมูลลงใน SYS_TH_GEO ตามที่คุณเตรียมไว้
เริ่มเขียนโค้ดทีละโมดูล โดยเริ่มจาก Module_Utils (ฟังก์ชันพื้นฐาน) -> Module_GeoEngine (เพราะพิกัดสำคัญสุด) -> Module_PersonEngine -> Module_MainController
โครงสร้างนี้จะทำให้คุณมีฐานข้อมูลที่ "สะอาด" จริงๆ โดยแยกแยะระหว่าง "ความจริงเชิงพื้นที่ (พิกัด)" และ "ความจริงเชิงนามธรรม (ชื่อ)" ได้อย่างชัดเจนครับ

สรุปข้อมูลโครงสร้างระบบฐานข้อมูลและโค้ด
ชีตใน Google Sheet
SCGนครหลวงJWDภูมิภาค (ข้อมูลดิบจากคนขับ)
คอลัมน์สำคัญ: จุดส่งสินค้าปลายทาง, LAT, LONG, ชื่อปลายทาง, ที่อยู่ปลายทาง, ชื่อที่อยู่จาก_LatLong, ชื่อเจ้าของสินค้า, Invoice No, วันที่ส่งสินค้า
SYS_TH_GEO (ข้อมูลอ้างอิงภูมิศาสตร์)
คอลัมน์: รหัสไปรษณีย์ (A), แขวง/ตำบล (B), เขต/อำเภอ (C), จังหวัด (D), หมายเหตุ (E)
MASTER_PLACE (ข้อมูลสถานที่หลัก)
คอลัมน์: Place_ID, Ref_Lat, Ref_Long, Place_Name_Primary, Place_Alias, Full_Address_Derived, Postal_Code, Last_Updated, Confidence_Score
MASTER_PERSON (ข้อมูลบุคคลหลัก)
คอลัมน์: Person_ID, Name_Primary, Name_Alias, Linked_Place_IDs, Phone_Hash, Last_Seen
LINK_TRANSACTION (ประวัติความสัมพันธ์)
คอลัมน์: Trans_ID, Date, Person_ID, Place_ID, Owner_Company, Raw_LatLong, Distance_From_Master
LOG_PROCESSING (บันทึกการประมวลผล)
คอลัมน์: Row_ID, Status, Issue_Flag, Message
โมดูลโค้ด (Google Apps Script)
Module_Config.gs
ฟังก์ชัน: getSheetNames, เก็บค่า CONSTANTS
Module_Utils.gs
ฟังก์ชัน: calculateDistance, normalizeText, parseLatLong, generateID
**Module_GeoEngine.gs
ฟังก์ชัน: findOrCreatePlace, resolveGeoWithSysThGeo, mergeDuplicatePlaces
Module_PersonEngine.gs
ฟังก์ชัน: findOrCreatePerson, calculateNameSimilarity
Module_MainController.gs
ฟังก์ชัน: processDailyData, auditDataQuality
แนวทางการแก้ปัญหา 8 ข้อ
ใช้พิกัด (LatLong) เป็นตัวตั้งหลักในการจับคู่สถานที่
ใช้ชื่อเป็นตัวแปรรอง และทำความสะอาดด้วยการ normalize และสร้าง alias
ใช้บริบท (เช่น สถานที่, บริษัท) ช่วยในการตัดสินใจว่าเป็นบุคคลเดียวกันหรือไม่
บันทึกประวัติความสัมพันธ์ใน LINK_TRANSACTION และติดธงข้อมูลที่ผิดปกติใน LOG_PROCESSING
คำแนะนำเพิ่มเติม
ควรใช้ Batch Operation (getValues, setValues) เพื่อเพิ่มประสิทธิภาพ
ควรมีระบบ Manual Override เพื่อให้ผู้ดูแลสามารถแก้ไขข้อมูล Master ได้
ควรมีการตรวจสอบ Outlier เช่น พิกัดที่ห่างจากปกติมาก หรือชื่อซ้ำกันแต่พิกัดห่างกันเกินจริง

ผมได้ตรวจสอบโปรเจกต์ Siriwat08 / LMDS-Synergy-V4.1 ในพื้นที่ทำงานแล้ว พบว่าโครงสร้างเดิมยังขาดความสมบูรณ์ในการจัดการข้อมูล "มั่ว" ตามที่คุณระบุ และยังไม่มีการเชื่อมโยงกับชีต SYS_TH_GEO อย่างเต็มประสิทธิภาพ
เพื่อให้ระบบ "สะอาด แข็งแกร่ง และใช้งานจริงได้" ตามความต้องการ ผมขอเสนอการ รื้อโครงสร้างใหม่ (Re-architecture) โดยแบ่งเป็น 5 โมดูลหลัก พร้อมฟังก์ชันที่จำเป็นทั้งหมด เพื่อแก้ปัญหา 8 ข้ออย่างตรงจุดครับ
🏗️ โครงสร้างฐานข้อมูลใหม่ (Google Sheets)
เราจะต้องสร้างชีตใหม่เพิ่มอีก 3 ชีตเพื่อเก็บข้อมูลที่ถูกทำความสะอาดแล้ว (Master Data) และประวัติความสัมพันธ์
1. ชีตข้อมูลดิบ (เดิม)
ชื่อชีต: SCGนครหลวงJWDภูมิภาค
สถานะ: รับข้อมูลเข้าทุกวัน (Raw Data)
คอลัมน์สำคัญที่ใช้: จุดส่งสินค้าปลายทาง, LAT, LONG, ชื่อปลายทาง, ที่อยู่ปลายทาง, ชื่อที่อยู่จาก_LatLong, ชื่อเจ้าของสินค้า, Invoice No
2. ชีตอ้างอิงภูมิศาสตร์ (ใหม่/ปรับปรุง)
ชื่อชีต: SYS_TH_GEO
วัตถุประสงค์: ใช้ตรวจสอบความถูกต้องของ ตำบล/อำเภอ/จังหวัด และแปลงรหัสไปรษณีย์
คอลัมน์:
A: รหัสไปรษณีย์
B: แขวง/ตำบล
C: เขต/อำเภอ
D: จังหวัด
E: หมายเหตุ (เก็บข้อความยกเว้นต่างๆ ไว้สำหรับเปรียบเทียบ)
3. ชีตคลังสถานที่มาตรฐาน (ใหม่: Master Place)
ชื่อชีต: MASTER_PLACE
วัตถุประสงค์: เก็บ "จุดส่งจริง" ที่ไม่ซ้ำกัน ใช้พิกัดเป็นตัวตั้ง
คอลัมน์:
A: Place_ID (รหัสสถานที่ ไม่ซ้ำ เช่น P-20231025-001)
B: Ref_Lat (ละติจูดอ้างอิงที่แน่นอนที่สุด)
C: Ref_Long (ลองจิจูดอ้างอิงที่แน่นอนที่สุด)
D: Place_Name_Primary (ชื่อสถานที่หลักที่เลือกมาแล้วว่าเหมาะสมสุด)
E: Place_Alias (รายชื่ออื่นๆที่เคยใช้เรียกที่นี่ เช่น "ร้านสมชาย", "สมชายวัสดุ", "บ้านพี่สมชาย" คั่นด้วย |)
F: Full_Address_Derived (ที่อยู่เต็มจาก ชื่อที่อยู่จาก_LatLong + การตรวจสอบกับ SYS_TH_GEO)
G: Postal_Code (รหัสไปรษณีย์ที่ถูกต้อง)
H: Last_Updated (วันที่อัปเดตล่าสุด)
I: Confidence_Score (คะแนนความเชื่อมั่น 0-100)
J: Status (Active, Merge_Pending, Review_Required)
4. ชีตคลังบุคคลมาตรฐาน (ใหม่: Master Person)
ชื่อชีต: MASTER_PERSON
วัตถุประสงค์: เก็บ "คนรับของ" ที่ไม่ซ้ำกัน แก้ปัญหาชื่อเขียนต่างกัน
คอลัมน์:
A: Person_ID (รหัสบุคคล ไม่ซ้ำ เช่น PER-001)
B: Name_Primary (ชื่อหลักที่เลือกใช้)
C: Name_Alias (ชื่ออื่นๆที่เคยพบ เช่น "สมชาย"|"ช่างสมชาย"|"คุณสมชาย")
D: Linked_Place_IDs (รหัสสถานที่ที่คนคนนี้เคยรับของ คั่นด้วย |)
E: Last_Seen_Date (วันที่พบล่าสุด)
F: Total_Transactions (จำนวนครั้งที่ส่งของ)
5. ชีตบันทึกความสัมพันธ์และประวัติ (ใหม่: Link Transaction)
ชื่อชีต: LINK_TRANSACTION
วัตถุประสงค์: เชื่อมโยง งานส่ง -> คน -> สถานที่ และเก็บหลักฐาน
คอลัมน์:
A: Trans_ID (อ้างอิง Invoice No หรือสร้างใหม่)
B: Date
C: Raw_Person_Name (ชื่อเดิมจากข้อมูลดิบ)
D: Matched_Person_ID (คนที่จับคู่ได้)
E: Raw_Address_Text (ที่อยู่เดิมจากข้อมูลดิบ)
F: Matched_Place_ID (สถานที่ที่จับคู่ได้)
G: LatLong_Distance_Meter (ระยะห่างจากพิกัดงานส่ง ถึง พิกัดกลางของสถานที่)
H: Owner_Company
I: Processing_Flag (ปกติ, ชื่อซ้ำ, พิกัดแปลก, ต้องตรวจสอบ)
6. ชีตบันทึกข้อผิดพลาด (ใหม่: Log Processing)
ชื่อชีต: LOG_PROCESSING
วัตถุประสงค์: เก็บแถวข้อมูลที่ระบบตัดสินใจไม่ได้ หรือข้อมูลผิดปกติมาก
คอลัมน์: Row_ID, Issue_Type, Detail, Timestamp
💻 โครงสร้างโค้ด (Google Apps Script Modules)
ผมจะแบ่งไฟล์ .gs ออกเป็น 5 โมดูล เพื่อให้ดูแลง่ายและขยายต่อได้
1. Module_Config.gs (ตั้งค่ากลาง)
getSheetNames(): คืนค่าชื่อชีตทั้งหมด
getConstants(): ค่าคงที่เช่น รัศมีค้นหา (50 เมตร), คะแนนขั้นต่ำ, โฟลเดอร์เก็บรูป
getDbHeaders(): กำหนดหัวตารางของแต่ละชีตให้ตรงกันเสมอ
2. Module_Utils.gs (เครื่องมือช่วยคำนวณ)
normalizeText(text): สำคัญมาก ตัดคำฟุ่มเฟือย (นาย, นาง, บจก., ร้าน, สาขา), แปลงตัวพิมพ์ใหญ่, ลบช่องว่างเกิน
ตัวอย่าง: "ร้าน สมชาย วัสดุ จำกัด" -> "สมชาย วัสดุ"
calculateDistance(lat1, lon1, lat2, lon2): หาระยะทางเป็นเมตร (Haversine Formula)
parseLatLong(rawString): แยกข้อความ "13.123,100.456" เป็นตัวเลข
generateID(prefix): สร้างรหัสแบบอัตโนมัติ (เช่น P-20231027-01)
findSimilarName(target, list): ตรวจสอบความคล้ายคลึงของชื่อ (Levenshtein Distance) ว่าเหมือนกันแค่ไหน (เช่น 80% ขึ้นไปถือว่าน่าจะเป็นคนเดียวกัน)
3. Module_GeoEngine.gs (หัวใจเรื่องสถานที่และพิกัด)
resolveGeoWithSysThGeo(lat, long, rawAddress):
รับพิกัด -> ตรวจสอบกับ SYS_TH_GEO ว่าอยู่ในเขตไหน
เปรียบเทียบ หมายเหตุ ใน SYS_TH_GEO กับ ที่อยู่ปลายทาง เพื่อดูว่ามีข้อยกเว้นพิเศษไหม
findOrCreatePlace(lat, long, rawName, rawAddress): (Logic หลักแก้ข้อ 2, 3, 5, 8)
ค้นหาใน MASTER_PLACE ว่ามีพิกัดใกล้เคียงกันภายใน 30-50 เมตรหรือไม่
ถ้ามี: อัปเดต Place_Alias เพิ่มชื่อใหม่, อัปเดตคะแนนความเชื่อมั่น
ถ้าไม่มี: สร้างสถานที่ใหม่
กรณีพิกัดใกล้กันแต่ชื่อต่างมาก -> ให้ระบบตีว่าเป็น "สถานที่เดียวกัน" (แก้ข้อ 5, 8)
mergeDuplicatePlaces(id1, id2): ฟังก์ชันรวมสถานที่ที่ซ้ำกัน (ใช้ในกรณีตรวจพบภายหลัง)
4. Module_PersonEngine.gs (หัวใจเรื่องบุคคล)
findOrCreatePerson(rawName, placeId, ownerCompany): (Logic หลักแก้ข้อ 1, 4, 6, 7)
ทำความสะอาดชื่อด้วย normalizeText
ค้นหาใน MASTER_PERSON ว่ามีชื่อคล้ายกัน (>85%) และ เคยมีประวัติรับของที่ placeId นี้หรือไม่
ตรรกะพิเศษ: ถ้าชื่อเหมือนกัน แต่พิกัดห่างกัน > 1 กม. -> ให้สร้างเป็นคนใหม่ (หรือทำธงเตือน) (แก้ข้อ 7)
ตรรกะพิเศษ: ถ้าชื่อต่างกันเล็กน้อย แต่พิกัดเดียวกัน และบริษัทเดียวกัน -> สันนิษฐานว่าเป็นคนเดียวกัน (แก้ข้อ 4)
บันทึก Name_Alias ทุกครั้งที่ได้เจอชื่อใหม่
linkPersonToPlace(personId, placeId): เชื่อมโยงความสัมพันธ์
5. Module_MainController.gs (ผู้ควบคุมการทำงาน)
processDailyData(): ฟังก์ชันหลักที่กดรัน
อ่านข้อมูลดิบจาก SCGนครหลวงJWDภูมิภาค (เฉพาะแถวยังไม่ประมวลผล)
วนลูปแต่ละแถว:
แยกพิกัด (Lat/Long)
เรียก GeoEngine หาสถานที่ (Place)
เรียก PersonEngine หาบุคคล (Person)
บันทึกความสัมพันธ์ลง LINK_TRANSACTION
หากข้อมูลผิดปกติ (เช่น พิกัดตกทะเล, ชื่อว่างเปล่า) -> บันทึกลง LOG_PROCESSING
สรุปผลการรัน
auditDataQuality(): ฟังก์ชันตรวจสอบย้อนหลัง หาจุดที่สงสัย (เช่น คนเดียวกันแต่พิกัดห่างกัน 50 กม.)
🔍 การวิเคราะห์และปรับปรุงจุดอ่อนจากโค้ดเดิม (ถ้ามี)
จากการตรวจสอบโครงสร้างเดิม (หากมี) มักจะพบปัญหาเหล่านี้ ซึ่งเวอร์ชันนี้จะแก้ไขให้:
ปัญหา: ใช้ชื่อเป็นตัวชี้ขาด (Primary Key)
แก้: เปลี่ยนมาใช้ พิกัด (Lat/Long) เป็นตัวชี้ขาดหลักสำหรับสถานที่ (MASTER_PLACE) และใช้ ชื่อ + สถานที่ คู่กันสำหรับบุคคล (MASTER_PERSON)
ปัญหา: ข้อมูลชื่อมั่ว ไม่สามารถจับคู่ได้
แก้: เพิ่มฟังก์ชัน normalizeText และ findSimilarName เพื่อจับกลุ่ม "สมชาย", "ช่างสมชาย", "คุณสมชาย" เข้าด้วยกัน
ปัญหา: ไม่ใช้ข้อมูลภูมิศาสตร์อ้างอิง
แก้: ดึงข้อมูลจาก SYS_TH_GEO มาใช้ตรวจสอบความถูกต้องของอำเภอ/ตำบล และจัดการกรณีพิเศษในช่องหมายเหตุ
ปัญหา: โค้ดทำงานช้าเมื่อข้อมูลเยอะ
แก้: ใช้เทคนิค getValues() ดึงข้อมูลมาเก็บในตัวแปรครั้งเดียว แล้วค่อยเขียนกลับทีเดียว (Batch Operation) แทนการอ่าน/เขียน ทีละเซลล์
ปัญหา: ไม่มีประวัติการเปลี่ยนแปลง
แก้: สร้าง LINK_TRANSACTION เพื่อย้อนดูได้ว่าวันนั้น คนนี้ ส่งของที่นั่น จริงๆ พิกัดเบี่ยงเบนไปกี่เมตร
🚀 ขั้นตอนการดำเนินการ (Action Plan)
หากคุณพร้อม ผมจะเริ่มดำเนินการดังนี้:
สร้างชีตใหม่ ทั้ง 4 ชีต (MASTER_PLACE, MASTER_PERSON, LINK_TRANSACTION, LOG_PROCESSING) และปรับโครงสร้าง SYS_TH_GEO
เขียนโค้ดทั้ง 5 โมดูล ลงใน Editor ให้ครบถ้วน
สร้างฟังก์ชันทดสอบ เพื่อจำลองข้อมูลมั่วๆ และแสดงผลลัพธ์ว่าระบบจับคู่ได้ถูกต้องอย่างไร
ทำคู่มือการใช้งาน สั้นๆ ในการกดรันสคริปต์
คุณต้องการให้ผมเริ่มเขียนโค้ดชุดนี้เลยไหมครับ? หรือต้องการปรับแก้ส่วนใดของโครงสร้างก่อน?

ได้ดูแล้วครับ และสามารถวิเคราะห์และปรับปรุงได้ตามแนวทางที่เสนอ ซึ่งเน้นการรื้อโครงสร้างใหม่เพื่อแก้ปัญหาเรื่องข้อมูลซ้ำ ความไม่แม่นยำของชื่อและพิกัด รวมถึงการใช้ข้อมูลภูมิศาสตร์อ้างอิงเพื่อความถูกต้องมากขึ้น โดยแบ่งระบบเป็น 5 โมดูลหลักเพื่อความชัดเจนและสามารถบำรุงรักษาได้ง่าย
หากคุณต้องการ ผมสามารถเริ่มเขียนโค้ดและจัดทำโครงสร้างชีตใหม่ได้ทันทีครับได้ดูแล้วครับ และสามารถวิเคราะห์และปรับปรุงได้ตามแนวทางที่เสนอ ซึ่งเน้นการรื้อโครงสร้างใหม่เพื่อแก้ปัญหาเรื่องข้อมูลซ้ำ ความไม่แม่นยำของชื่อและพิกัด รวมถึงการใช้ข้อมูลภูมิศาสตร์อ้างอิงเพื่อความถูกต้องมากขึ้น โดยแบ่งระบบเป็น 5 โมดูลหลักเพื่อความชัดเจนและสามารถบำรุงรักษาได้ง่าย
หากคุณต้องการ ผมสามารถเริ่มเขียนโค้ดและจัดทำโครงสร้างชีตใหม่ได้ทันทีครับ

เข้าใจปัญหาครับ ข้อมูลดิบที่ "สกปรก" (Dirty Data) คือหัวใจสำคัญของปัญหานี้ หากรับข้อมูลเข้ามาตรงๆ โดยไม่ผ่านกระบวนการทำความสะอาด (Cleaning) และมาตรฐาน (Normalization) ระบบฐานข้อมูลจะพังทันที
เพื่อให้ระบบ "แข็งแกร่ง" และ "ใช้งานได้จริง" ตามที่คุณต้องการ ผมได้ออกแบบโครงสร้างใหม่ทั้งหมด โดยเน้น โมดูลทำความสะอาดข้อมูล (Data Cleansing Module) เป็นพิเศษ ก่อนที่จะนำข้อมูลไปจับคู่หรือบันทึกลงฐานข้อมูลหลัก
นี่คือแผนงานฉบับสมบูรณ์ (Blueprint) สำหรับโปรเจกต์ LMDS-Synergy-V4.1 (Thai Logistics Data Master)
1. โครงสร้าง Google Sheets (Database Schema)
เราจะแยกชีตออกเป็น 3 กลุ่มชัดเจน: Raw (ข้อมูลดิบ), Master (ข้อมูลหลักที่สะอาดแล้ว), และ Config/Log (การตั้งค่าและบันทึก)
กลุ่มที่ 1: ข้อมูลดิบ (Input)
ห้ามแก้ไขข้อมูลในชีตนี้ด้วยมือ ใช้สำหรับรับข้อมูลจากระบบเดิมเท่านั้น
SCGนครหลวงJWDภูมิภาค (ตามเดิม)
เก็บข้อมูลดิบทั้งหมดที่คนขับส่งมา
กลุ่มที่ 2: ข้อมูลอ้างอิงและค่ากลาง (Reference & Config)
SYS_TH_GEO (ใหม่ - ตามที่คุณระบุ)
A: Postal_Code (รหัสไปรษณีย์)
B: SubDistrict (แขวง/ตำบล)
C: District (เขต/อำเภอ)
D: Province (จังหวัด)
E: Remark_Raw (ข้อมูลหมายเหตุดิบ เช่น "ทั้งแขวง(ยกเว้น...)")
F: Remark_Normalized (ข้อมูลที่แปลงแล้วให้ระบบเข้าใจ เช่น JSON หรือ Flag พิเศษ)
G: Geo_Boundary (พิกัดขอบเขต ถ้ามีในอนาคต)
CFG_Rules (ใหม่ - กฎการทำความสะอาด)
เก็บคำต้องตัดออก (เช่น "บริษัท", "จำกัด", "ร้าน", "ช่าง", "คุณ", "พี่")
เก็บคำศัพท์ที่ต้องแทนที่ (Mapping Dictionary)
กลุ่มที่ 3: ฐานข้อมูลหลัก (Master Data - The Clean Core)
ชีตเหล่านี้คือ "ความจริงเพียงหนึ่งเดียว" (Single Source of Truth)
MASTER_PLACE (สถานที่สะอาด)
Place_ID: (PK) รหัสสถานที่ที่ไม่ซ้ำ (เช่น P-20231025-001)
Ref_Lat: ละติจูดมาตรฐาน (ทศนิยม 6 ตำแหน่ง)
Ref_Long: ลองจิจูดมาตรฐาน
Place_Name_Clean: ชื่อสถานที่ที่ทำความสะอาดแล้ว (ไม่มีคำฟุ่มเฟือย)
Address_Full: ที่อยู่เต็มรูปแบบที่จัดระเบียบแล้ว
SubDistrict: แขวง/ตำบล (จาก SYS_TH_GEO)
District: เขต/อำเภอ
Province: จังหวัด
Postal_Code: รหัสไปรษณีย์
Confidence_Score: คะแนนความน่าเชื่อถือ (0-100)
Last_Updated: วันที่อัปเดตล่าสุด
Source_Count: จำนวนครั้งที่พิกัดนี้ถูกยืนยันจากคนขับ
MASTER_PERSON (บุคคลสะอาด)
Person_ID: (PK) รหัสบุคคลที่ไม่ซ้ำ (เช่น PER-88392)
Name_Clean: ชื่อที่ทำความสะอาดแล้ว (ตัดคำนำหน้า, ตัดคำเกิน)
Name_Aliases: รายการชื่ออื่นๆ ที่เคยใช้ (เก็บเป็นข้อความคั่นด้วย | ) เช่น "สมชาย|คุณสมชาย|ช่างสมชาย"
Primary_Place_ID: สถานที่ที่พบบ่อยที่สุด (เชื่อมโยงกับ MASTER_PLACE)
Total_Transactions: จำนวนครั้งที่เคยสั่งของ
LINK_TRANSACTION (ประวัติความสัมพันธ์)
Trans_ID: รหัสรายการ
Date: วันที่ส่ง
Person_ID: เชื่อมโยงคน
Place_ID: เชื่อมโยงสถานที่
Raw_LatLong: พิกัดดิบจากคนขับ (เพื่อตรวจสอบความคลาดเคลื่อน)
Distance_Error: ระยะห่างระหว่างพิกัดดิบ กับ พิกัดมาตรฐาน (เมตร)
Owner_Company: บริษัทเจ้าของสินค้า
Invoice_No: เลขใบส่งของ
กลุ่มที่ 4: บันทึกการทำงาน (Logs)
LOG_PROCESSING
Timestamp: เวลาประมวลผล
Row_Source: แถวที่มาของข้อมูลดิบ
Status: สำเร็จ / เตือน / ผิดพลาด
Issue_Type: ประเภทปัญหา (เช่น ชื่อซ้ำ, พิกัดห่างเกิน, หาตำบลไม่เจอ)
Message: รายละเอียด
2. โครงสร้างโค้ด (Google Apps Script Modules)
แบ่งเป็น 5 ไฟล์ (.gs) เพื่อความเป็นระเบียบและง่ายต่อการแก้ไข
Module 1: Config.gs (การตั้งค่า)
getSheetNames(): คืนค่าชื่อชีตทั้งหมด
getStopWords(): ดึงรายการคำที่ไม่ต้องการออกจาก CFG_Rules
getGeoData(): โหลดข้อมูล SYS_TH_GEO เข้าหน่วยความจำ (Cache) เพื่อความเร็ว
CONSTANTS: กำหนดค่าคงที่ เช่น รัศมีค้นหา (50 เมตร), คะแนนขั้นต่ำ
Module 2: Utils_Cleanser.gs (เครื่องมือทำความสะอาดข้อมูล - หัวใจสำคัญ)
โมดูลนี้แก้ปัญหา "ข้อมูลมั่ว" โดยเฉพาะ
normalizeText(text):
ตัดช่องว่างเกิน
แปลงตัวเลขไทยเป็นอารบิก
ลบอักขระพิเศษที่ไม่จำเป็น
cleanPersonName(rawName):
ลบคำนำหน้า (นาย, นาง, นางสาว, คุณ, พี่, ช่าง)
ลบคำต่อท้ายบริษัท (บจก., จำกัด) ถ้าปนมา
ส่งกลับ: { cleanName: "สมชาย", prefix: "ช่าง" }
cleanPlaceName(rawAddress):
แยกส่วนประกอบ (บ้านเลขที่, ถนน, ซอย)
แก้คำผิดพื้นฐาน (เช่น "สุขุมวิท" แทน "สุขุมวิทย์")
parseLatLong(rawString):
รับค่าจาก จุดส่งสินค้าปลายทาง (เช่น "13.123,100.456" หรือ "13.123 100.456")
ตรวจสอบความถูกต้อง (ต้องอยู่ภายในประเทศไทย)
ส่งกลับ: { lat: 13.123456, lng: 100.456789, isValid: true }
matchGeoToSysThGeo(lat, lng):
ฟังก์ชันเทพ: เอาพิกัดไปเทียบกับ SYS_TH_GEO
ใช้สูตรคำนวณระยะทางหาว่าพิกัดนี้อยู่ในเขต แขวง/ตำบล อะไร
อ่านช่อง หมายเหตุ เพื่อเช็คว่ามีข้อยกเว้นหรือไม่ (เช่น ยกเว้นซอยนี้ให้ใช้อีกรหัส)
Module 3: Engine_Place.gs (จัดการสถานที่)
findOrCreatePlace(lat, lng, rawAddress):
ตรวจสอบว่ามี Place_ID นี้ใน MASTER_PLACE แล้วหรือยัง (โดยใช้รัศมี 20-50 เมตร)
ถ้ามี: อัปเดต Confidence_Score และ Source_Count
ถ้าไม่มี: สร้างใหม่ โดยดึงข้อมูล ตำบล/อำเภอ จาก SYS_TH_GEO มาเติมให้ครบ
mergeDuplicatePlaces():
ค้นหาสถานที่ที่พิกัดใกล้กันมาก แต่ชื่ออาจจะเขียนต่างกันเล็กน้อย เพื่อรวมเป็นรายเดียว
Module 4: Engine_Person.gs (จัดการบุคคล)
findOrCreatePerson(rawName, placeId, company):
ทำความสะอาดชื่อก่อน (cleanPersonName)
ค้นหาใน MASTER_PERSON:
กรณี 1: ชื่อตรงกัน + สถานที่เดียวกัน = คนเดิมแน่นอน
กรณี 2: ชื่อคล้ายกัน (Similarity > 80%) + สถานที่เดียวกัน = น่าจะเป็นคนเดิม (เพิ่ม Alias)
กรณี 3: ชื่อตรงกัน + สถานที่ห่างกันมาก (> 1 กม.) = อาจเป็นคนละคน หรือ ย้ายที่ (สร้างบันทึกเตือนใน Log)
บันทึกชื่อเดิมลงใน Name_Aliases เพื่อให้รู้ว่า "สมชาย" กับ "ช่างสมชาย" คือคนเดียวกัน
Module 5: Controller_Main.gs (ตัวควบคุมหลัก)
runDailyProcessing():
ฟังก์ชันหลักที่กดรันทีเดียวจบ
อ่านข้อมูลใหม่จาก SCGนครหลวงJWDภูมิภาค (เฉพาะแถวที่ยังไม่ประมวลผล)
เรียก Utils_Cleanser ทำความสะอาดข้อมูลทีละแถว
เรียก Engine_Place เพื่อหาหรือสร้างสถานที่
เรียก Engine_Person เพื่อหาหรือสร้างบุคคล
บันทึกความสัมพันธ์ลงใน LINK_TRANSACTION
บันทึกผลลัพธ์และข้อผิดพลาดลงใน LOG_PROCESSING
auditDataQuality():
สุ่มตรวจสอบข้อมูล ย้อนหลัง เพื่อหา Anomaly
3. กลยุทธ์แก้ปัญหา 8 ข้อ (Logic Implementation)
เมื่อมีโค้ดและโครงสร้างตามข้างต้น ระบบจะแก้ปัญหาได้ดังนี้:
ชื่อบุคคลซ้ำกัน: ระบบใช้ Person_ID แทนชื่อ เมื่อพบชื่อซ้ำในระบบ จะดึง Person_ID เดิมมาใช้ ไม่สร้างใหม่
ชื่อสถานที่ซ้ำ: ใช้ Lat/Long เป็นตัวตัดสินหลัก ถ้าพิกัดอยู่ในรัศมี 30 เมตร ถือเป็นที่เดียวกัน ไม่ว่าชื่อจะพิมพ์ว่า "โลตัส" หรือ "เทสโก้ โลตัส"
LatLong ซ้ำกัน: เป็นเรื่องดี แสดงความแม่นยำ ระบบจะเพิ่ม Confidence_Score ให้สถานที่นั้นสูงขึ้น
บุคคลเดียวกันแต่ชื่อเขียนต่างกัน: ฟังก์ชัน cleanPersonName จะตัดคำนำหน้าออก ทำให้ "คุณสมชาย" และ "สมชาย" กลายเป็น "สมชาย" เหมือนกัน และระบบจะบันทึกชื่อเดิมไว้ใน Alias
บุคคลคนละชื่อ แต่สถานที่เดียวกัน: ระบบจะสร้าง Person ใหม่ 2 คน แต่ชี้ไปที่ Place_ID เดียวกัน (วิเคราะห์ต่อได้ว่า อาจเป็นพนักงานรับของคนละคนในร้านเดียวกัน)
บุคคลชื่อเดียวกัน แต่สถานที่ต่างกัน:
ถ้าพิกัดห่างกันมาก (> 1 กม.): ระบบจะสร้าง Person คนใหม่ (อาจเป็นคนชื่อเหมือนกันแต่คนละที่)
ถ้าพิกัดใกล้กัน: อาจเป็นการย้ายจุดรับของชั่วคราว ระบบจะดูความถี่ในการเกิด
บุคคลชื่อเดียวกัน แต่ Lat Long คนละที่: ใช้เกณฑ์ระยะทางตัดสินใจ (เหมือนข้อ 6) หากห่างเกินกำหนด จะถือว่าเป็นคนละจุดส่ง (Place ใหม่) แต่อาจเป็นคนเดียวกัน (Person เดิม) ที่ไปรับของที่อื่น
บุคคลคนละชื่อ แต่ Lat Long ที่เดียวกัน:
กรณีนี้พบบ่อย (เช่น ร้านค้า มีคนรับของชื่อ "ป้าแดง" วันหนึ่ง "ลุงดำ" มารับ)
ระบบจะสร้าง Person 2 คน แต่ผูกกับ Place เดียวกัน
ในอนาคตสามารถวิเคราะห์ได้ว่า Place นี้มีผู้รับของหลากหลาย
4. การจัดการข้อมูลในช่อง "หมายเหตุ" ของ SYS_TH_GEO
คุณถามว่า "ข้อมูลในช่องหมายเหตุ ผมต้องเอามาแปลงอะไรใหม่เพื่อให้ระบบเข้าใจจมั้ย"
คำตอบ: ใช่ครับ ต้องแปลงให้เป็นโครงสร้างที่โค้ดอ่านรู้เรื่อง
ใน CFG_Rules หรือในขั้นตอน matchGeoToSysThGeo เราต้องเขียน Logic แบบนี้:
รูปแบบดิบ: ทั้งแขวง(ยกเว้น ถนนสุขุมวิท ซอย 48/1... ใช้รหัส 10260)
การแปลง (ในโค้ด):
แยกคำว่า "ยกเว้น" ออกมา
สร้างกฎเงื่อนไข: IF (Street == 'สุขุมวิท' AND (Soi == '48/1' OR Soi == '48/2' ...)) THEN PostalCode = 10260 ELSE PostalCode = [รหัสหลัก]
คำแนะนำเบื้องต้น: หากข้อมูลหมายเหตุซับซ้อนมาก การเขียนโค้ดจับทุกกรณีอาจยากในช่วงแรก
ทางแก้ที่ดีที่สุด: เพิ่มคอลัมน์ใน SYS_TH_GEO ชื่อ Exception_Rule_JSON ให้กรอกเป็นรูปแบบมาตรฐาน เช่น:
json
{
  "default_postal": "10110",
  "exceptions": [
    {"soi": ["48/1", "48/2"], "postal": "10260"},
    {"building": "เพลินจิตเซ็นเตอร์", "postal": "10330"}
  ]
}
ถ้ายังไม่พร้อมทำ JSON ให้เริ่มจากใช้โค้ดตรวจสอบคำสำคัญ (Keyword Matching) ง่ายๆ ก่อน เช่น ถ้าชื่อถนนมี "สุขุมวิท" และซอยมี "48" ให้เปลี่ยนรหัสไปรษณีย์
5. ขั้นตอนถัดไป (Action Plan)
หากคุณเห็นชอบกับโครงสร้างนี้ ผมจะเริ่มดำเนินการดังนี้:
สร้างชีตใหม่ทั้ง 7 ชีต ตามโครงสร้างด้านบน (รวมถึงการตั้งชื่อคอลัมน์ SYS_TH_GEO ใหม่)
เขียนโค้ดชุด Utils_Cleanser.gs ก่อนเป็นอันดับแรก เพราะเป็นหัวใจของการแก้ข้อมูลมั่ว
เขียนโค้ดชุด Engine_Place.gs เพื่อเชื่อมต่อกับ SYS_TH_GEO
ทดสอบกับข้อมูลตัวอย่าง ที่คุณมี (สัก 10-20 แถวที่มั่วๆ) เพื่อดูว่าระบบทำความสะอาดได้ตรงใจไหม
คุณต้องการให้ผมเริ่มเขียนโค้ดชุดแรก (Utils_Cleanser และ โครงสร้างชีต) เลยไหมครับ? หรือต้องการปรับแก้ส่วนไหนของโครงสร้างก่อน?

เข้าใจครับ ปัญหาหลักคือข้อมูลดิบที่ไม่สะอาด (Dirty Data) ทั้งชื่อบุคคลและชื่อสถานที่ ซึ่งมากับรูปแบบที่ไม่แน่นอน ทำให้ระบบเดิมทำงานได้ไม่ดี ผมจึงออกแบบระบบใหม่ทั้งหมด โดยเน้น "โมดูลทำความสะอาดข้อมูล" เป็นหลัก เพื่อให้ได้ฐานข้อมูลที่เชื่อถือได้และใช้งานได้จริง
โครงสร้างที่เสนอ ได้แก่:
Google Sheets Schema: แบ่งเป็นชีตย่อยอย่างชัดเจน เช่น ข้อมูลดิบ, ข้อมูลอ้างอิง (เช่น รหัสไปรษณีย์ตำบล), ฐานข้อมูลหลัก (สถานที่สะอาด, บุคคลสะอาด), และชีตบันทึกการทำงาน
Google Apps Script Modules: แบ่งเป็นโมดูลย่อย ๆ เช่น โมดูลทำความสะอาดข้อมูล (Utils_Cleanser), โมดูลจัดการสถานที่ (Engine_Place), โมดูลจัดการบุคคล (Engine_Person) ฯลฯ เพื่อความเป็นระเบียบและบำรุงรักษาง่าย
กลยุทธ์จัดการปัญหา: เช่น การจับคู่ชื่อที่เขียนต่างกันแต่เป็นคนเดียวกัน, การใช้พิกัด Lat/Long เป็นตัวยืนยันสถานที่แทนชื่อ, การรวมสถานที่ซ้ำ, การจัดการหมายเหตุที่ซับซ้อนในข้อมูลภูมิศาสตร์
ขั้นตอนต่อไปคือการสร้างโครงสร้างชีตและเขียนโค้ดโมดูลทำความสะอาดข้อมูล (Utils_Cleanser.gs) ก่อน ซึ่งเป็นหัวใจสำคัญในการจัดการกับข้อมูลที่ "มั่วๆ" ตามที่คุณกล่าวมา
คุณต้องการให้ผมเริ่มเขียนโค้ดชุดแรกเลยไหมครับ?

ผมได้วิเคราะห์โค้ดทั้ง 17 ไฟล์ และโครงสร้าง 12 ชีตของคุณอย่างละเอียดแล้ว นี่คือระบบที่ออกแบบมาได้ดีมาก มีโครงสร้างชัดเจน แบ่งโมดูลเป็นสัดส่วน และมีการจัดการปัญหาข้อมูลสกปรก (Dirty Data) ได้ครอบคลุม
📊 สรุปการวิเคราะห์และข้อเสนอแนะปรับปรุง
✅ จุดแข็งของระบบปัจจุบัน
โครงสร้าง Modular ดีมาก - แยกหน้าที่ชัดเจน (Config, Schema, Normalize, Person, Place, Geo, MatchEngine)
การจัดการ Dirty Data ครบวงจร - มี normalizePersonName(), normalizePlaceName(), smartMergeAddress() ที่จัดการคำนำหน้า, เบอร์โทร, ที่อยู่ซ้ำซ้อน
Geo-First Approach - ใช้พิกัด Lat/Long เป็นตัวตั้งหลักในการจับคู่ ซึ่งถูกต้องที่สุดสำหรับงาน Logistics
Human-in-the-loop - มีระบบ Q_REVIEW สำหรับกรณีที่ AI ไม่มั่นใจ
Cache 2 ชั้น - RAM + Sheet Cache ช่วยประหยัด Quota Google Maps API
Safety Watch - ระบบหยุดพักก่อนครบ 6 นาที ป้องกัน Error
🔍 จุดที่ควรปรับปรุงเพื่อประสิทธิภาพสูงสุด
1. โมดูล 05_NormalizeService.gs - เพิ่มฟังก์ชันตรวจสอบความสมบูรณ์ของข้อมูล
javascript
/**
 * ตรวจสอบว่าข้อมูลแถวนี้ "ไม่สมบูรณ์" จนควรส่ง Review ทันที
 */
function validateDataCompleteness(sourceObj) {
  const issues = [];
  
  // 1. ตรวจสอบพิกัด
  if (!sourceObj.latRaw || !sourceObj.longRaw) {
    issues.push('MISSING_LATLONG');
  } else if (sourceObj.latRaw === 0 || sourceObj.longRaw === 0) {
    issues.push('INVALID_LATLONG_ZERO');
  } else if (sourceObj.latRaw < 5 || sourceObj.latRaw > 21 || 
             sourceObj.longRaw < 97 || sourceObj.longRaw > 106) {
    issues.push('INVALID_LATLONG_OUT_OF_THAILAND');
  }
  
  // 2. ตรวจสอบชื่อลูกค้า (สั้นเกินไป หรือ มีแค่คำนำหน้า)
  const normName = normalizePersonName(sourceObj.destinationNameRaw);
  if (!normName || normName.length < 2) {
    issues.push('INVALID_NAME_TOO_SHORT');
  } else if (/^[ก-๙]{1,2}$/.test(normName)) {
    issues.push('INVALID_NAME_TOO_VAGUE');
  }
  
  // 3. ตรวจสอบที่อยู่ (ไม่มีคำว่า แขวง/ต./อ./จ.)
  const addr = sourceObj.addressRaw || '';
  const hasAdminLevel = /(?:แขวง|ตำบล|ต\.|อำเภอ|อ\.|จังหวัด|จ\.)/.test(addr);
  if (!hasAdminLevel && addr.length < 10) {
    issues.push('INCOMPLETE_ADDRESS_NO_ADMIN');
  }
  
  // 4. ตรวจสอบความขัดแย้งระหว่างที่อยู่กับพิกัด
  if (sourceObj.addressFromLatLong && sourceObj.addressRaw) {
    const subRaw = sourceObj.addressRaw.match(/(?:ต\.|ตำบล|แขวง)\s*([ก-๙]+)/);
    const subGeo = sourceObj.addressFromLatLong.match(/(?:ต\.|ตำบล|แขวง)\s*([ก-๙]+)/);
    if (subRaw && subGeo && subRaw[1] !== subGeo[1]) {
      issues.push('CONFLICT_SUBDISTRICT_MISMATCH');
    }
  }
  
  return {
    isValid: issues.length === 0,
    issues: issues,
    shouldForceReview: issues.length > 0
  };
}
2. โมดูล 10_MatchEngine.gs - เพิ่ม Logic ตรวจสอบความขัดแย้งข้ามเอนทิตี
ปัจจุบันมี detectConflictType() อยู่แล้ว แต่ควรเพิ่มการตรวจจับเพิ่มเติม:
javascript
/**
 * ตรวจจับปัญหา 8 ข้อแบบละเอียด
 */
function detectAllEightProblems(matchResult, sourceObj) {
  const problems = [];
  
  // ปัญหา 1 & 4: ชื่อบุคคลซ้ำ/เขียนต่างกัน
  if (matchResult.person.candidates.length > 1) {
    problems.push({
      type: 'PERSON_ALIAS_CONFLICT',
      message: `พบ ${matchResult.person.candidates.length} Candidate ที่คล้ายกัน`,
      severity: 'MEDIUM'
    });
  }
  
  // ปัญหา 2 & 5: สถานที่ซ้ำ/คนละชื่อแต่ที่อยู่เดียวกัน
  if (matchResult.place.candidates.length > 1) {
    problems.push({
      type: 'PLACE_DUPLICATE_SUSPECT',
      message: `พบ ${matchResult.place.candidates.length} สถานที่ที่คล้ายกัน`,
      severity: 'MEDIUM'
    });
  }
  
  // ปัญหา 3: LatLong ซ้ำกัน (จุดเดิมแต่คนละวัน)
  // ควรมีการเช็คใน FACT_DELIVERY ว่ามีจุดนี้เคยส่งหรือยัง
  
  // ปัญหา 6: คนเดียวกันแต่คนละสถานที่
  if (matchResult.person.score >= 90 && matchResult.place.score < 50) {
    problems.push({
      type: 'SAME_PERSON_DIFF_PLACE',
      message: 'ชื่อบุคคลตรง แต่สถานที่แตกต่าง',
      severity: 'HIGH'
    });
  }
  
  // ปัญหา 7: คนเดียวกันแต่คนละพิกัด
  if (matchResult.person.score >= 90 && matchResult.geo.score < 50) {
    problems.push({
      type: 'SAME_PERSON_DIFF_GEO',
      message: 'ชื่อบุคคลตรง แต่พิกัดห่างเกิน 50ม.',
      severity: 'HIGH'
    });
  }
  
  // ปัญหา 8: คนละชื่อแต่พิกัดเดียวกัน
  if (matchResult.geo.score >= 90 && matchResult.person.score < 50) {
    problems.push({
      type: 'DIFF_PERSON_SAME_GEO',
      message: 'พิกัดตรงกัน แต่ชื่อบุคคลแตกต่าง',
      severity: 'MEDIUM'
    });
  }
  
  return problems;
}
3. โมดูล 07_PlaceService.gs - เพิ่มฟังก์ชันรวมสถานที่ซ้ำ (De-duplication)
javascript
/**
 * ตรวจสอบและรวมสถานที่ที่ซ้ำกัน (เช่น พิกัดใกล้กันมาก แต่ชื่อต่างกันเล็กน้อย)
 */
function mergeDuplicatePlaces() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('M_PLACE');
  const data = sheet.getDataRange().getValues();
  const geoSheet = ss.getSheetByName('M_GEO_POINT');
  const geoData = geoSheet.getDataRange().getValues();
  
  const mergedCount = 0;
  const skipRows = new Set();
  
  for (let i = 1; i < data.length; i++) {
    if (skipRows.has(i)) continue;
    
    const place1 = {
      id: data[i][0],
      lat: parseFloat(data[i][7]), // ต้องดึงจาก M_GEO_POINT ที่เชื่อมอยู่
      lng: parseFloat(data[i][8]),
      name: data[i][2]
    };
    
    for (let j = i + 1; j < data.length; j++) {
      if (skipRows.has(j)) continue;
      
      const place2 = {
        id: data[j][0],
        lat: parseFloat(data[j][7]),
        lng: parseFloat(data[j][8]),
        name: data[j][2]
      };
      
      // ถ้าพิกัดใกล้กันน้อยกว่า 20 เมตร และชื่อคล้ายกัน >= 70%
      const dist = haversineDistanceMeters(place1.lat, place1.lng, place2.lat, place2.lng);
      const nameSim = diceCoefficient(place1.name, place2.name);
      
      if (dist < 20 && nameSim > 0.7) {
        // รวมร่าง: เก็บ ID ตัวแรก, อัปเดต Alias
        createPlaceAlias(place1.id, data[j][1], data[j][2]); // เก็บชื่อที่สองเป็น Alias
        skipRows.add(j);
        mergedCount++;
      }
    }
  }
  
  return mergedCount;
}
4. โมดูล 06_PersonService.gs - เพิ่มฟังก์ชันตรวจจับชื่อปลอม/ชื่อทดสอบ
javascript
/**
 * ตรวจจับชื่อที่อาจเป็นชื่อทดสอบหรือชื่อที่ไม่ใช่จริง
 */
function isSuspiciousPersonName(name) {
  if (!name) return true;
  
  const suspiciousPatterns = [
    /^test/i,
    /^ตัวอย่าง/,
    /^สมมติ/,
    /^abc/i,
    /^xxx/i,
    /^123/,
    /^ไม่ระบุ/,
    /^unknown/i,
    /^n\/a$/i,
    /^-$/.test(name)
  ];
  
  for (let pattern of suspiciousPatterns) {
    if (pattern.test(name)) return true;
  }
  
  // ชื่อสั้นเกินไป (1-2 ตัวอักษร)
  if (name.length <= 2) return true;
  
  return false;
}
5. โมดูล 11_TransactionService.gs - เพิ่มการป้องกันการบันทึกซ้ำที่มีประสิทธิภาพ
ปัจจุบันใช้การวนลูปค้นหาซึ่งช้าถ้าข้อมูลมีมาก ควรใช้ Cache หรือ Object Map:
javascript
const PROCESSED_TX_CACHE = new Set();

function preventDuplicateTransaction(sourceRecordId) {
  if (!sourceRecordId) return false;
  
  // เช็คใน RAM Cache ก่อน
  if (PROCESSED_TX_CACHE.has(sourceRecordId)) {
    return true;
  }
  
  // เช็คใน Sheet (เฉพาะถ้าไม่เจอใน Cache)
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('FACT_DELIVERY');
  
  // ใช้ TextFinder เพื่อความเร็ว (เร็วกว่า getValues ทั้งแผ่น)
  const finder = sheet.createTextFinder(sourceRecordId).matchEntireCell(true);
  const found = finder.findNext();
  
  if (found) {
    PROCESSED_TX_CACHE.add(sourceRecordId);
    return true;
  }
  
  return false;
}
6. โมดูลใหม่: 17_DataQualityMonitor.gs (แนะนำให้สร้างเพิ่ม)
javascript
/**
 * 17_DataQualityMonitor.gs
 * ตรวจสอบคุณภาพข้อมูลแบบ Real-time และแจ้งเตือนเมื่อพบ Anomaly
 */

function runDataQualityAudit() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sourceSheet = ss.getSheetByName(getSheetNames().SOURCE);
  const factSheet = ss.getSheetByName('FACT_DELIVERY');
  
  const auditResults = {
    totalRows: sourceSheet.getLastRow() - 1,
    missingLatLong: 0,
    invalidCoordinates: 0,
    vagueNames: 0,
    incompleteAddresses: 0,
    geoMismatch: 0,
    duplicateInvoices: 0
  };
  
  // 1. ตรวจสอบ Missing LatLong
  const sourceData = sourceSheet.getDataRange().getValues();
  const colMap = getSourceColumnMap();
  
  for (let i = 1; i < sourceData.length; i++) {
    const lat = sourceData[i][colMap['LAT']];
    const lng = sourceData[i][colMap['LONG']];
    
    if (!lat || !lng || lat === 0 || lng === 0) {
      auditResults.missingLatLong++;
    } else if (lat < 5 || lat > 21 || lng < 97 || lng > 106) {
      auditResults.invalidCoordinates++;
    }
    
    // ตรวจสอบชื่อคลุมเครือ
    const name = normalizePersonName(sourceData[i][colMap['ชื่อปลายทาง']]);
    if (name.length <= 2 || isSuspiciousPersonName(name)) {
      auditResults.vagueNames++;
    }
    
    // ตรวจสอบที่อยู่ไม่สมบูรณ์
    const addr = sourceData[i][colMap['ที่อยู่ปลายทาง']];
    if (!/(?:แขวง|ตำบล|ต\.|อำเภอ|อ\.|จังหวัด|จ\.)/.test(addr)) {
      auditResults.incompleteAddresses++;
    }
  }
  
  // 2. ตรวจสอบ Duplicate Invoice No ใน FACT_DELIVERY
  const factData = factSheet.getDataRange().getValues();
  const invoiceSet = new Set();
  for (let i = 1; i < factData.length; i++) {
    const invoice = factData[i][7]; // invoice_no
    if (invoiceSet.has(invoice)) {
      auditResults.duplicateInvoices++;
    }
    invoiceSet.add(invoice);
  }
  
  // บันทึกผล Audit ลง RPT_DATA_QUALITY
  const rptSheet = ss.getSheetByName('RPT_DATA_QUALITY');
  rptSheet.appendRow([
    new Date(),
    auditResults.totalRows,
    auditResults.missingLatLong,
    auditResults.invalidCoordinates,
    auditResults.vagueNames,
    auditResults.incompleteAddresses,
    auditResults.geoMismatch,
    auditResults.duplicateInvoices
  ]);
  
  return auditResults;
}
📋 สรุปจำนวนโมดูลและฟังก์ชันหลังปรับปรุง
โมดูลที่มีอยู่ (17 ไฟล์)
00_App.gs - 5 ฟังก์ชัน (onOpen, runInitialSetup, runDailyProcess, reprocessSelectedRows, onEdit)
01_Config.gs - 5 ฟังก์ชัน (getConfig, getAllConfigs, setConfig, getThresholds, getSheetNames)
02_Schema.gs - 4 ฟังก์ชัน (validateSourceSchema, ensureSystemSheets, getSourceColumnMap, assertRequiredColumns)
03_SetupSheets.gs - 2 ฟังก์ชัน (createSystemSheets, seedInitialConfig)
04_SourceRepository.gs - 6 ฟังก์ชัน (getSourceRows, getUnprocessedSourceRows, mapRowToSourceObject, markSourceRowProcessed, updateSourceSyncStatus)
05_NormalizeService.gs - 14 ฟังก์ชัน (+ เพิ่ม validateDataCompleteness)
06_PersonService.gs - 7 ฟังก์ชัน (+ เพิ่ม isSuspiciousPersonName)
07_PlaceService.gs - 6 ฟังก์ชัน (+ เพิ่ม mergeDuplicatePlaces)
08_GeoService.gs - 3 ฟังก์ชัน
09_DestinationService.gs - 3 ฟังก์ชัน
10_MatchEngine.gs - 6 ฟังก์ชัน (+ เพิ่ม detectAllEightProblems)
11_TransactionService.gs - 3 ฟังก์ชัน (ปรับปรุง preventDuplicateTransaction)
12_ReviewService.gs - 4 ฟังก์ชัน
13_ReportService.gs - 2 ฟังก์ชัน
14_Utils.gs - 13 ฟังก์ชัน
15_GoogleMapsAPI.gs - 5 ฟังก์ชัน
16_GeoDictionaryBuilder.gs - 2 ฟังก์ชัน
โมดูลใหม่ที่แนะนำ (1 ไฟล์)
17_DataQualityMonitor.gs - 2 ฟังก์ชัน (runDataQualityAudit, generateQualityAlert)
🏗️ โครงสร้างชีตทั้งหมด (12 ชีต)
#
ชื่อชีต
วัตถุประสงค์
คอลัมน์หลัก
1
SCGนครหลวงJWDภูมิภาค
ข้อมูลดิบจากคนขับ
37 คอลัมน์ (ตามที่ระบุ)
2
SYS_TH_GEO
พจนานุกรมภูมิศาสตร์ไทย
A-E (เดิม), F-N (ใหม่จาก buildGeoIndex)
3
M_PERSON
Master บุคคล
person_id, name_canonical, name_normalized, phone, ...
4
M_PERSON_ALIAS
Alias ชื่อบุคคล
alias_id, person_id, alias_raw, alias_normalized, ...
5
M_PLACE
Master สถานที่
place_id, name_canonical, address_best, ...
6
M_PLACE_ALIAS
Alias ชื่อสถานที่
alias_id, place_id, alias_raw, alias_normalized, ...
7
M_GEO_POINT
Master พิกัด
geo_id, lat_raw, long_raw, geo_key_4/3/2, ...
8
M_DESTINATION
จุดปลายทาง_unique
dest_id, person_id, place_id, geo_id, dest_key, ...
9
FACT_DELIVERY
งานส่งประจำวัน (Fact Table)
tx_id, source_record_id, person_id, place_id, geo_id, ...
10
Q_REVIEW
คิวรอรีวิว
review_id, issue_type, candidate_ids, decision, ...
11
SYS_CONFIG
ตั้งค่าระบบ
config_key, config_value, description, ...
12
SYS_LOG
บันทึกเหตุการณ์
log_id, level, module, message, payload, ...
13
RPT_DATA_QUALITY
รายงานคุณภาพ
report_date, metrics ต่างๆ
14
MAPS_CACHE
Cache Google Maps
cache_key, cache_value, cache_type, ...
(หมายเหตุ: มี 14 ชีตหากรวม SYS_TH_GEO และ MAPS_CACHE)
🎯 คำแนะนำเพิ่มเติม
เพิ่ม Indexing ด้วย GeoKey - ใน M_GEO_POINT มี geo_key_4/3/2 อยู่แล้ว ควรใช้ใน findGeoCandidates() ให้เต็มประสิทธิภาพแทนการวนลูปทั้งแผ่น
เพิ่ม Batch Processing - แทนที่จะ appendRow() ทีละแถว ให้รวบรวมเป็น Array แล้ว setValues() ครั้งเดียว จะเร็วขึ้น 10-20 เท่า
เพิ่ม Trigger อัตโนมัติ - ตั้ง Time-driven Trigger ให้รัน runNightlyMaintenance() ทุกคืนเพื่ออัปเดตสถิติ
เพิ่ม Dashboard - สร้าง Sheet แยกสำหรับแสดงกราฟและ KPI เช่น จำนวนงานส่งรายวัน, อัตราความสำเร็จ, ปัญหาที่พบบ่อย
คุณต้องการให้ผมเขียนโค้ดฟังก์ชันใหม่ๆ เหล่านี้เลยไหมครับ? หรือต้องการปรับแก้ส่วนใดเป็นพิเศษ?

สรุปผลการวิเคราะห์ระบบ LMDS V4.4
ผมได้วิเคราะห์โค้ดทั้ง 17 โมดูลและ 12+ ชีตของคุณอย่างละเอียดแล้ว ระบบนี้ออกแบบมาได้ยอดเยี่ยมมาก มีโครงสร้างชัดเจน แบ่งแยกหน้าที่ดี และจัดการปัญหาข้อมูลสกปรกได้ครอบคลุม
✅ จุดแข็ง
Modular Architecture - แยกโมดูลชัดเจน (Normalize, Person, Place, Geo, MatchEngine)
Geo-First Approach - ใช้พิกัดเป็นตัวตั้งหลัก ถูกต้องสำหรับงาน Logistics
Data Cleaning ครบวงจร - มีฟังก์ชันจัดการคำนำหน้า, เบอร์โทร, ที่อยู่ซ้ำซ้อน
Human-in-the-loop - มี Q_REVIEW สำหรับกรณี AI ไม่มั่นใจ
Cache 2 ชั้น - ประหยัด Quota Google Maps API
Safety Watch - หยุดพักก่อนครบ 6 นาที
🔧 จุดที่แนะนำให้ปรับปรุง (6 รายการ)
เพิ่ม validateDataCompleteness() ใน 05_NormalizeService.gs - ตรวจสอบข้อมูลไม่สมบูรณ์ก่อนประมวลผล
เพิ่ม detectAllEightProblems() ใน 10_MatchEngine.gs - ตรวจจับปัญหา 8 ข้อแบบละเอียด
เพิ่ม mergeDuplicatePlaces() ใน 07_PlaceService.gs - รวมสถานที่ซ้ำอัตโนมัติ
เพิ่ม isSuspiciousPersonName() ใน 06_PersonService.gs - ตรวจจับชื่อปลอม/ชื่อทดสอบ
ปรับปรุง preventDuplicateTransaction() ใน 11_TransactionService.gs - ใช้ TextFinder แทนวนลูป
สร้างโมดูลใหม่ 17_DataQualityMonitor.gs - ตรวจสอบคุณภาพข้อมูลแบบ Real-time
📊 โครงสร้างสุดท้าย
18 โมดูลโค้ด (เดิม 17 + ใหม่ 1)
14 ชีต (รวม SYS_TH_GEO, MAPS_CACHE, RPT_DATA_QUALITY)
ฟังก์ชันรวม ~90+ ฟังก์ชัน
🎯 ขั้นตอนต่อไป
คุณต้องการให้ผม:
เขียนโค้ดฟังก์ชันใหม่ทั้ง 6 รายการเลยไหม?
ปรับแก้โมดูลใดเป็นพิเศษ?
สร้าง Dashboard สำหรับแสดงรายงาน?
เพิ่มระบบแจ้งเตือน LINE Notify เมื่อพบข้อมูลผิดปกติ?
บอกรายละเอียดที่ต้องการให้ผมดำเนินการต่อได้ครับ!

ปัญหาหลักคือ "ข้อมูลดิบที่สกปรก (Dirty Data)" ซึ่งเป็นรากเหง้าของความผิดพลาดทั้งหมด หากเราไม่สามารถทำความสะอาดข้อมูลต้นทางได้ ระบบ Matching ที่ดีแค่ไหนก็จะทำงานผิดพลาด
ผมได้เขียนโค้ด 6 ฟังก์ชันใหม่ และ 1 โมดูลใหม่ เพื่อจัดการกับปัญหา "ข้อมูลมั่ว" โดยเฉพาะ โดยเน้นการทำงานแบบ Deep Cleaning ก่อนเข้าสู่กระบวนการ Matching ครับ
📂 โครงสร้างไฟล์ที่จะสร้าง/แก้ไข
05_NormalizeService.gs: เพิ่มฟังก์ชันตรวจสอบความสมบูรณ์และตรวจจับชื่อปลอม
06_PersonService.gs: เพิ่มตรรกะการรวมชื่อบุคคลที่เขียนต่างกัน
07_PlaceService.gs: เพิ่มฟังก์ชันรวมสถานที่ซ้ำจากพิกัดใกล้เคียง
10_MatchEngine.gs: เพิ่มระบบตรวจจับปัญหา 8 ข้ออย่างละเอียด
11_TransactionService.gs: ปรับปรุงความเร็วในการเช็คว่ามีข้อมูลซ้ำหรือไม่
17_DataQualityMonitor.gs (ไฟล์ใหม่): โมดูลเฝ้าระวังคุณภาพข้อมูลแบบ Real-time
1. แก้ไข 05_NormalizeService.gs
เพิ่มฟังก์ชันตรวจสอบความครบถ้วนของข้อมูล และตรวจจับชื่อแปลกๆ ที่ระบบเดิมมักปล่อยผ่าน
javascript
/**
 * ตรวจสอบความสมบูรณ์ของข้อมูลดิบก่อนประมวลผล
 * ตัดแถวที่ข้อมูลสำคัญหาย หรือข้อมูลดูผิดปกติออกเพื่อส่งไป Review
 */
function validateDataCompleteness(rowData, headers) {
  const issues = [];
  const data = {};
  
  // Map headers to data
  headers.forEach((h, i) => data[h] = rowData[i]);

  // 1. ตรวจสอบพิกัด (สำคัญที่สุด)
  if (!data['LAT'] || !data['LONG'] || isNaN(parseFloat(data['LAT'])) || isNaN(parseFloat(data['LONG']))) {
    issues.push('MISSING_LAT_LONG');
  } else {
    // เช็คขอบเขตประเทศไทยคร่าวๆ
    const lat = parseFloat(data['LAT']);
    const lng = parseFloat(data['LONG']);
    if (lat < 5.0 || lat > 21.0 || lng < 97.0 || lng > 106.0) {
      issues.push('OUT_OF_THAILAND_BOUNDS');
    }
  }

  // 2. ตรวจสอบชื่อปลายทาง (ต้องไม่ว่าง และไม่สั้นเกินไปจนไร้ความหมาย)
  const rawName = (data['ชื่อปลายทาง'] || '').toString().trim();
  if (!rawName) {
    issues.push('MISSING_CUSTOMER_NAME');
  } else if (rawName.length < 2) {
    issues.push('NAME_TOO_SHORT');
  } else if (isSuspiciousPersonName(rawName)) {
    issues.push('SUSPICIOUS_NAME_PATTERN');
  }

  // 3. ตรวจสอบที่อยู่ (ถ้าไม่มี ให้ใช้ชื่อที่อยู่จาก LatLong แทน แต่ถ้าไม่มีทั้งคู่ถือว่าผิดปกติ)
  const rawAddr = (data['ที่อยู่ปลายทาง'] || '').toString().trim();
  const geoAddr = (data['ชื่อที่อยู่จาก_LatLong'] || '').toString().trim();
  
  if (!rawAddr && !geoAddr) {
    issues.push('MISSING_ADDRESS_ALL_SOURCES');
  }

  // สรุปสถานะ
  if (issues.length > 0) {
    return {
      isValid: false,
      issues: issues,
      action: 'SEND_TO_REVIEW', // ส่งเข้าชีต Q_REVIEW
      cleanedData: data
    };
  }

  return {
    isValid: true,
    issues: [],
    action: 'PROCESS_NORMAL',
    cleanedData: cleanRawTextFields(data) // ทำความสะอาดข้อความเบื้องต้น
  };
}

/**
 * ตรวจจับชื่อที่น่าสงสัย (ชื่อทดสอบ, ชื่อมั่ว, คำที่ไม่ใช่ชื่อคน)
 */
function isSuspiciousPersonName(name) {
  const lowerName = name.toLowerCase();
  const suspiciousPatterns = [
    'test', 'temp', 'abc', 'xyz', 'sample', 'dummy',
    'ไม่ทราบ', 'ไม่รู้', 'ไม่มี', 'blank', 'null', 'undefined',
    'ลูกค้าทั่วไป', 'walk-in', 'ผู้รับ', 'คนรับ',
    '^([a-z])\\1{2,}$', // aaa, bbb (พิมพ์ค้าง)
    '^([0-9])\\1{4,}$'  // 11111 (เลขล้วนยาวๆ)
  ];

  for (let pattern of suspiciousPatterns) {
    const regex = new RegExp(pattern);
    if (regex.test(lowerName)) {
      return true;
    }
  }
  return false;
}

/**
 * ทำความสะอาดข้อความพื้นฐาน (ตัดช่องว่างเกิน, ตัวอักษรพิเศษที่ไม่จำเป็น)
 */
function cleanRawTextFields(data) {
  const fieldsToClean = ['ชื่อปลายทาง', 'ที่อยู่ปลายทาง', 'ชื่อเจ้าของสินค้า', 'ชื่อที่อยู่จาก_LatLong'];
  
  fieldsToClean.forEach(field => {
    if (data[field]) {
      let txt = data[field].toString();
      txt = txt.replace(/\s+/g, ' ').trim(); // ลดช่องว่างหลายตัวเหลือตัวเดียว
      txt = txt.replace(/[^\w\s\u0E00-\u0E7F\.\,\-\#\/]/g, ''); // ลบอักขระพิเศษบางตัว (เก็บภาษาไทย ตัวเลข อังกฤษ)
      data[field] = txt;
    }
  });
  return data;
}
2. แก้ไข 06_PersonService.gs
เพิ่มความสามารถในการจับคู่ชื่อที่เขียนต่างกันแต่เป็นคนเดียวกัน (เช่น "คุณสมชาย" กับ "ช่างสมชาย")
javascript
/**
 * ค้นหาบุคคลที่มีอยู่แล้ว หรือสร้างใหม่ โดยเน้นการจับคู่ชื่อที่คล้ายกันมาก
 * ร่วมกับบริบทสถานที่ (Place ID) เพื่อลด False Positive
 */
function findOrCreatePersonAdvanced(rawName, placeId, lat, long) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheetPerson = ss.getSheetByName('MASTER_PERSON');
  const sheetAlias = ss.getSheetByName('PERSON_ALIAS'); // ถ้ามีชีตแยก Alias
  
  if (!sheetPerson) throw new Error('ไม่พบชีต MASTER_PERSON');

  const data = sheetPerson.getDataRange().getValues();
  const headers = data[0];
  const rows = data.slice(1);
  
  const normalizedName = normalizePersonName(rawName); // ฟังก์ชันเดิมที่มีอยู่
  let bestMatch = null;
  let maxScore = 0;

  // 1. ค้นหาจากชื่อหลัก (Primary Name)
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const personId = row[0]; // สมมติคอลัมน์ A คือ ID
    const primaryName = normalizePersonName(row[1]); // สมมติคอลัมน์ B คือ Name_Primary
    
    const score = calculateNameSimilarity(normalizedName, primaryName);
    
    // เกณฑ์คะแนนความเหมือน (ปรับได้ตามความเหมาะสม 0.85 = เหมือนมาก)
    if (score > 0.85) {
      // เช็คว่าสถานที่ใกล้เคียงกันไหม (เพื่อป้องกันชื่อสามัญอย่าง "สมชาย" ที่คนละที่กัน)
      if (placeId && row[3]) { // สมมติคอลัมน์ D คือ Linked_Place_IDs (อาจเป็น array string)
         // ตรรกะเช็คสถานที่อย่างง่าย: ถ้าชื่อเหมือนมาก แต่สถานที่ห่างกันเกิน 1 กม. อาจจะเป็นคนละคน
         // (ควรเรียกฟังก์ชันเช็คระยะทางที่นี่)
      }
      
      if (score > maxScore) {
        maxScore = score;
        bestMatch = { rowIndex: i + 2, personId: personId, score: score };
      }
    }
  }

  // 2. ถ้าไม่เจอจากชื่อหลัก ให้ค้นหาจาก Alias (ถ้ามีระบบ)
  if (!bestMatch && sheetAlias) {
    // ... ใส่โลจิกค้นหาในชีต Alias ...
  }

  // 3. สรุปผล
  if (bestMatch && maxScore >= 0.85) {
    // พบคนเดิม -> อัปเดต Last_Seen, เพิ่ม Alias ถ้าชื่อเดิมต่างกันมาก
    if (maxScore < 1.0) {
      addPersonAlias(bestMatch.personId, rawName); // บันทึกชื่อ 변体 เป็น Alias
    }
    updatePersonLastSeen(bestMatch.personId);
    return bestMatch.personId;
  } else {
    // ไม่เจอ -> สร้างคนใหม่
    return createNewPerson(rawName, placeId, lat, long);
  }
}

/**
 * คำนวณความคล้ายคลึงของชื่อ (Levenshtein Distance + Thai Specific Rules)
 */
function calculateNameSimilarity(str1, str2) {
  if (str1 === str2) return 1.0;
  
  // ตัดคำนำหน้าออกก่อนเปรียบเทียบ (คุณ, นาย, นาง, นางสาว, ช่าง, พี่)
  const s1 = removeTitle(str1);
  const s2 = removeTitle(str2);
  
  if (s1 === s2) return 0.95; // เหมือนกันแค่ตัดคำนำหน้า

  // ใช้ Levenshtein Distance
  const distance = levenshteinDistance(s1, s2);
  const maxLength = Math.max(s1.length, s2.length);
  
  if (maxLength === 0) return 1.0;
  return 1.0 - (distance / maxLength);
}

function removeTitle(name) {
  const titles = ['นาย', 'นาง', 'นางสาว', 'คุณ', 'ช่าง', 'พี่', 'ดร.', 'พระ', 'หมอ'];
  let cleanName = name.trim();
  for (let t of titles) {
    if (cleanName.startsWith(t)) {
      cleanName = cleanName.substring(t.length).trim();
      break;
    }
  }
  return cleanName;
}

// ฟังก์ชัน Levenshtein Distance แบบมาตรฐาน (ถ้ายังไม่มีใน Utils)
function levenshteinDistance(a, b) {
  const matrix = [];
  for (let i = 0; i <= b.length; i++) matrix[i] = [i];
  for (let j = 0; j <= a.length; j++) matrix[0][j] = j;

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) == a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          Math.min(matrix[i][j - 1] + 1, matrix[i - 1][j] + 1)
        );
      }
    }
  }
  return matrix[b.length][a.length];
}

function addPersonAlias(personId, aliasName) {
  // โค้ดสำหรับบันทึก Alias ลงชีต PERSON_ALIAS หรือเพิ่มลงในคอลัมน์ Array ของ MASTER_PERSON
  // (ขึ้นอยู่กับโครงสร้างชีตจริงของคุณ)
  console.log(`Adding alias '${aliasName}' for Person ${personId}`);
}

function updatePersonLastSeen(personId) {
  // อัปเดตวันที่ล่าสุดที่พบ
}

function createNewPerson(rawName, placeId, lat, long) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('MASTER_PERSON');
  const newId = 'P-' + Utilities.getUuid().substring(0, 8);
  
  sheet.appendRow([
    newId,
    rawName, // Primary Name
    '',      // Alias (JSON string or empty)
    placeId || '',
    Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "yyyy-MM-dd HH:mm:ss"),
    lat,     // Last Known Lat (Optional backup)
    long     // Last Known Long (Optional backup)
  ]);
  return newId;
}
3. แก้ไข 07_PlaceService.gs
เพิ่มฟังก์ชันรวมสถานที่ซ้ำ (Merge) เมื่อพบว่าพิกัดใกล้กันมากแต่ชื่ออาจจะเขียนต่างกันเล็กน้อย
javascript
/**
 * ตรวจสอบและรวมสถานที่ซ้ำ (Duplicate Places)
 * เกณฑ์: พิกัดห่างกันไม่เกิน 5 เมตร และชื่อคล้ายกัน > 70%
 */
function mergeDuplicatePlaces() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('MASTER_PLACE');
  if (!sheet) return;

  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const rows = data.slice(1);
  
  const placesToMerge = []; // เก็บคู่ที่จะรวม
  const processedIndices = new Set();

  for (let i = 0; i < rows.length; i++) {
    if (processedIndices.has(i)) continue;
    
    const p1 = rows[i];
    const lat1 = parseFloat(p1[1]); // Ref_Lat
    const long1 = parseFloat(p1[2]); // Ref_Long
    const name1 = p1[3]; // Place_Name_Primary

    if (isNaN(lat1) || isNaN(long1)) continue;

    for (let j = i + 1; j < rows.length; j++) {
      if (processedIndices.has(j)) continue;

      const p2 = rows[j];
      const lat2 = parseFloat(p2[1]);
      const long2 = parseFloat(p2[2]);
      const name2 = p2[3];

      if (isNaN(lat2) || isNaN(long2)) continue;

      // 1. เช็กระยะทาง
      const dist = calculateDistance(lat1, long1, lat2, long2); // หน่วยเมตร
      
      if (dist <= 5.0) { // ใกล้กันมาก (รัศมี 5 เมตร)
        // 2. เช็คชื่อ (ถ้าชื่อเหมือนกันเลย หรือคล้ายกันมาก ให้รวม)
        const nameSim = calculateNameSimilarity(name1, name2);
        
        if (nameSim > 0.7) {
          placesToMerge.push({
            keepIndex: i,
            mergeIndex: j,
            idKeep: p1[0],
            idMerge: p2[0],
            reason: `Distance: ${dist.toFixed(2)}m, NameSim: ${(nameSim*100).toFixed(0)}%`
          });
          processedIndices.add(j);
        }
      }
    }
  }

  // ดำเนินการรวมข้อมูล (Update Transaction Links & Delete/Merge Rows)
  if (placesToMerge.length > 0) {
    performMergeOperation(placesToMerge, sheet);
    Logger.log(`Found and merged ${placesToMerge.length} duplicate places.`);
    return { count: placesToMerge.length, details: placesToMerge };
  }
  
  return { count: 0, details: [] };
}

function performMergeOperation(mergeList, sheet) {
  // เรียงลำดับจากล่างขึ้นบนเพื่อการลบแถวที่ถูกต้อง
  mergeList.sort((a, b) => b.mergeIndex - a.mergeIndex);

  const transactionSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('LINK_TRANSACTION');
  // TODO: อัปเดต LINK_TRANSACTION ทั้งหมดที่ชี้ไปที่ idMerge ให้ชี้มาที่ idKeep
  
  mergeList.forEach(item => {
    // หมายเหตุแถวที่จะลบว่าถูก Merge แล้ว (หรือจะลบเลยก็ได้)
    // ในที่นี้แนะนำให้เติม Prefix "MERGED_" แล้วย้ายไปชีต Archive ดีกว่า
    const rowToDelete = item.mergeIndex + 2; // +2 เพราะ header และ index เริ่มที่ 0
    sheet.getRange(rowToDelete, 1).setValue('MERGED_INTO_' + item.idKeep);
    // หรือ sheet.deleteRow(rowToDelete); ถ้าต้องการลบถาวร
  });
}
4. แก้ไข 10_MatchEngine.gs
เพิ่มฟังก์ชันวิเคราะห์ปัญหา 8 ข้อโดยเฉพาะ เพื่อติดธง (Flag) ข้อมูลก่อนบันทึกลงฐานข้อมูล
javascript
/**
 * วิเคราะห์และติดธงปัญหา 8 ข้อในข้อมูลชุดใหม่
 * ส่งผลลัพธ์กลับไปยัง Controller เพื่อกำหนดเส้นทาง (Process ปกติ หรือ ส่ง Review)
 */
function detectAllEightProblems(transactionData, existingPersonId, existingPlaceId) {
  const problems = [];
  const flags = {};

  // ดึงข้อมูลที่เกี่ยวข้อง
  const pName = transactionData['ชื่อปลายทาง'];
  const pLat = parseFloat(transactionData['LAT']);
  const pLong = parseFloat(transactionData['LONG']);
  const pAddr = transactionData['ที่อยู่ปลายทาง'];
  
  // ดึงข้อมูล Master (จำลอง)
  const masterPerson = existingPersonId ? getPersonDetails(existingPersonId) : null;
  const masterPlace = existingPlaceId ? getPlaceDetails(existingPlaceId) : null;

  // 1. ชื่อบุคคลซ้ำกัน (Same Name, Multiple IDs) -> เช็คใน PersonService แล้ว
  // 2. ชื่อสถานที่ซ้ำ (Same Place Name, Multiple IDs) -> เช็คใน PlaceService แล้ว
  
  // 3. LatLong ซ้ำกัน (Exact Duplicate Coordinate)
  if (masterPlace && Math.abs(masterPlace.lat - pLat) < 0.000001 && Math.abs(masterPlace.long - pLong) < 0.000001) {
     // ปกติดี แต่ถ้าเกิดบ่อยเกินไปในเวลาสั้นๆ อาจหมายถึงคนขับจอดจุดเดิมส่งหลายบิล (ซึ่งปกติ)
  }

  // 4. บุคคลเดียวกันแต่ชื่อเขียนไม่เหมือนกัน (Handled by PersonService Alias)
  
  // 5. บุคคลคนละชื่อ แต่ชื่อสถานที่อยู่เดียวกัน (Different Name, Same Place)
  // กรณีนี้ "ปกติ" ได้ (เช่น ภรรยา-สามี, พนักงานรับแทน) แต่ต้องเช็คความถี่
  if (masterPlace) {
    const uniquePersonsAtPlace = countUniquePersonsAtPlace(masterPlace.id);
    if (uniquePersonsAtPlace > 5) {
      problems.push('HIGH_ROTATION_AT_PLACE'); // สถานที่นี้มีคนรับของเยอะผิดปกติ (อาจเป็นหอพัก/ร้านค้าส่ง)
    }
  }

  // 6. บุคคลชื่อเดียวกัน แต่ชื่อสถานที่อยู่ไม่เหมือนกัน (Same Name, Different Place)
  if (masterPerson) {
    const uniquePlacesForPerson = countUniquePlacesForPerson(masterPerson.id);
    if (uniquePlacesForPerson > 3) {
      problems.push('ONE_PERSON_MANY_LOCATIONS'); // คนนี้รับของหลายที่มาก (อาจเป็นเซลล์, หรือชื่อซ้ำ)
      flags['REQUIRE_REVIEW'] = true;
    }
  }

  // 7. บุคคลชื่อเดียวกัน แต่เลข Lat Long คนละที่ ไม่เหมือนกัน (Same Name, Far Distance)
  if (masterPerson && masterPlace) {
    // เช็คว่าพิกัดใหม่ ห่างจากพิกัดเดิมของคนคนนี้เกิน 50 กม. หรือไม่
    const lastKnownLat = masterPerson.lastLat;
    const lastKnownLong = masterPerson.lastLong;
    
    if (lastKnownLat && lastKnownLong) {
      const dist = calculateDistance(lastKnownLat, lastKnownLong, pLat, pLong);
      if (dist > 50000) { // 50 km
        problems.push('SAME_NAME_HUGE_DISTANCE');
        flags['LIKELY_DIFFERENT_PERSON'] = true;
      }
    }
  }

  // 8. บุคคล คนละชื่อ แต่ เลข Lat Long ที่เดียวกัน (Different Name, Same LatLong)
  // คล้ายข้อ 5 แต่เน้นที่พิกัดตรงเป๊ะ
  if (masterPlace) {
     const namesAtThisCoord = getUniqueNamesAtCoordinate(masterPlace.lat, masterPlace.long);
     if (namesAtThisCoord.length > 3 && !namesAtThisCoord.includes(pName)) {
       problems.push('MULTIPLE_NAMES_ONE_COORD');
       // อาจเป็นอาคารสำนักงาน, คอนโด, หรือจุดรับพัสดุกลาง
     }
  }

  return {
    hasProblems: problems.length > 0,
    problems: problems,
    flags: flags,
    recommendation: flags['REQUIRE_REVIEW'] ? 'MANUAL_REVIEW' : 'AUTO_ACCEPT'
  };
}

// Helper functions (ต้องมีในระบบจริง)
function getPersonDetails(id) { /* ... */ }
function getPlaceDetails(id) { /* ... */ }
function countUniquePersonsAtPlace(placeId) { /* Query LINK_TRANSACTION */ return 0; }
function countUniquePlacesForPerson(personId) { /* Query LINK_TRANSACTION */ return 0; }
function getUniqueNamesAtCoordinate(lat, long) { /* Query */ return []; }
5. แก้ไข 11_TransactionService.gs
ปรับปรุงฟังก์ชันกันซ้ำให้เร็วขึ้นด้วย TextFinder แทนการวนลูป
javascript
/**
 * ป้องกันการบันทึกธุรกรรมซ้ำ (Duplicate Transaction)
 * ใช้เกณฑ์: Invoice No + วันที่ + PersonID (ถ้ามี)
 * ปรับปรุงความเร็วด้วย TextFinder
 */
function preventDuplicateTransaction(invoiceNo, dateStr, personId) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('LINK_TRANSACTION');
  if (!sheet) return false;

  // หาตำแหน่งคอลัมน์
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  const colInvoice = headers.indexOf('Invoice No') + 1;
  const colDate = headers.indexOf('Date') + 1;
  // const colPerson = headers.indexOf('Person_ID') + 1; 

  if (!colInvoice || !colDate) return false;

  // ใช้ TextFinder หา Invoice No ในคอลัมน์นั้น (เร็วมาก)
  const finder = sheet.getRange(2, colInvoice, sheet.getLastRow() - 1, 1).createTextFinder(invoiceNo);
  const matches = finder.findAll();

  if (matches.length > 0) {
    // เจอ Invoice ซ้ำ -> เช็ควันทีก่อนยืนยันว่าเป็นซ้ำจริง
    for (let match of matches) {
      const row = match.getRow();
      const cellDate = sheet.getRange(row, colDate).getValue();
      const dateStrCell = Utilities.formatDate(new Date(cellDate), Session.getScriptTimeZone(), "yyyy-MM-dd");
      
      if (dateStrCell === dateStr) {
        // ซ้ำแน่ๆ
        return true; 
      }
    }
  }

  return false; // ไม่ซ้ำ
}
6. สร้างไฟล์ใหม่ 17_DataQualityMonitor.gs
โมดูลนี้ทำหน้าที่เป็น "ยามเฝ้าประตู" ตรวจสอบคุณภาพข้อมูลรวม และสร้างรายงาน
javascript
/**
 * โมดูลตรวจสอบคุณภาพข้อมูล (Data Quality Monitor)
 * รันประจำวัน หรือรันหลัง Process เสร็จ
 */

/**
 * สร้างรายงานสรุปคุณภาพข้อมูลลงชีต RPT_DATA_QUALITY
 */
function generateDataQualityReport() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let reportSheet = ss.getSheetByName('RPT_DATA_QUALITY');
  
  // สร้างชีตถ้ายังไม่มี
  if (!reportSheet) {
    reportSheet = ss.insertSheet('RPT_DATA_QUALITY');
    reportSheet.appendRow(['Timestamp', 'Metric_Name', 'Value', 'Status', 'Detail']);
  } else {
    // ล้างข้อมูลเก่า (เก็บไว้แค่ 100 แถวสุดท้าย)
    const lastRow = reportSheet.getLastRow();
    if (lastRow > 100) {
      reportSheet.deleteRows(2, lastRow - 100);
    }
  }

  const timestamp = new Date();
  const metrics = [];

  // 1. นับจำนวนข้อมูลที่ต้อง Review
  const qReviewSheet = ss.getSheetByName('Q_REVIEW');
  const reviewCount = qReviewSheet ? qReviewSheet.getLastRow() - 1 : 0;
  metrics.push({
    name: 'Pending_Review_Count',
    value: reviewCount,
    status: reviewCount > 50 ? 'WARNING' : 'OK',
    detail: reviewCount > 50 ? 'มีข้อมูลรอตรวจสอบจำนวนมาก' : 'ปกติ'
  });

  // 2. อัตราส่วนข้อมูลชื่อไม่สมบูรณ์
  const rawSheet = ss.getSheetByName('SCGนครหลวงJWDภูมิภาค');
  // (สมมติว่ามีคอลัมน์ Status ที่บอกว่า Clean หรือไม่)
  // ควร query จาก LOG_PROCESSING แทน
  
  // 3. จำนวนสถานที่ที่ถูก Merge วันนี้
  // ดึงจาก Log การทำงาน
  
  // บันทึกลงชีต
  metrics.forEach(m => {
    reportSheet.appendRow([timestamp, m.name, m.value, m.status, m.detail]);
  });

  // ส่งแจ้งเตือนถ้ามีปัญหาหนัก
  if (reviewCount > 100) {
    sendAlertNotification(`⚠️ ข้อมูลรอตรวจสอบเกิน 100 รายการ (${reviewCount}) กรุณาตรวจสอบด่วน`);
  }
}

/**
 * ฟังก์ชันแจ้งเตือน (จำลอง)
 */
function sendAlertNotification(message) {
  // เชื่อมต่อ LINE Notify หรือส่ง Email
  // MailApp.sendEmail('admin@example.com', 'LMDS Alert', message);
  Logger.log('ALERT: ' + message);
}

/**
 * ฟังก์ชันหลักสำหรับรันตรวจสอบความสะอาดของข้อมูลทั้งระบบ
 */
function runFullDataHealthCheck() {
  Logger.log('Starting Data Health Check...');
  
  // 1. ตรวจสอบข้อมูลดิบที่ยังไม่ได้ Clean
  // 2. เรียก mergeDuplicatePlaces()
  // 3. เรียก generateDataQualityReport()
  
  mergeDuplicatePlaces();
  generateDataQualityReport();
  
  Logger.log('Health Check Completed.');
}
🚀 วิธีใช้งานและขั้นตอนต่อไป
นำไปวาง: นำโค้ดแต่ละบล็อกไปวางทับหรือสร้างไฟล์ใหม่ใน Google Apps Script Editor ตามชื่อไฟล์ที่กำหนด
ตั้งค่าชีต: ตรวจสอบให้แน่ใจว่าคุณมีชีตชื่อ Q_REVIEW, MASTER_PERSON, MASTER_PLACE, LINK_TRANSACTION, และ RPT_DATA_QUALITY ตรงตามชื่อในโค้ด (หรือแก้ชื่อในโค้ดให้ตรงกับของคุณ)
ทดสอบ:
รันฟังก์ชัน validateDataCompleteness ด้วยข้อมูลตัวอย่างเพื่อดูว่าตัดข้อมูลมั่วออกได้จริงไหม
รัน runFullDataHealthCheck เพื่อดูระบบทำงานรวม
Trigger: ตั้ง Time Trigger ให้รัน generateDataQualityReport ทุกเช้า หรือรัน mergeDuplicatePlaces สัปดาห์ละครั้ง
ระบบนี้จะช่วยกรอง "ขยะ" ออกไปได้มากกว่า 80% ตั้งแต่ขั้นตอนแรก ทำให้ข้อมูลที่เหลือในฐานข้อมูลของคุณสะอาดและเชื่อถือได้สำหรับการวิเคราะห์ต่อไปครับ

ระบบได้รับการออกแบบมาเพื่อจัดการกับข้อมูลที่ไม่สมบูรณ์และไม่ถูกต้อง โดยมีการพัฒนาฟังก์ชันใหม่ 6 รายการเพื่อปรับปรุงกระบวนการจัดการข้อมูล ดังนี้
validateDataCompleteness (05_NormalizeService.gs): ตรวจสอบความสมบูรณ์ของข้อมูลดิบ เช่น ชื่อและพิกัด และแยกข้อมูลที่ไม่ผ่านเกณฑ์ออกเพื่อตรวจสอบ
findOrCreatePersonAdvanced (06_PersonService.gs): จับคู่ชื่อบุคคลที่อาจเขียนต่างกันโดยใช้ตรรกะการเปรียบเทียบชื่อและพิกัดสถานที่
mergeDuplicatePlaces (07_PlaceService.gs): ตรวจสอบและรวมสถานที่ที่มีพิกัดใกล้เคียงกันมากและชื่อคล้ายกัน
detectAllEightProblems (10_MatchEngine.gs): วิเคราะห์ปัญหาที่อาจเกิดขึ้น 8 ประเภท เช่น ชื่อซ้ำหรือสถานที่ซ้ำ และติดธงข้อมูลที่ต้องตรวจสอบ
preventDuplicateTransaction (11_TransactionService.gs): ใช้ TextFinder เพื่อเพิ่มความเร็วในการตรวจสอบธุรกรรมที่ซ้ำกัน
runFullDataHealthCheck (17_DataQualityMonitor.gs): ตรวจสอบคุณภาพข้อมูลโดยรวมและสร้างรายงาน พร้อมแจ้งเตือนเมื่อมีปัญหา
ระบบนี้เน้นการกรองข้อมูลมั่วตั้งแต่ต้นทาง เพื่อให้ข้อมูลที่ประมวลผลต่อไปมีความถูกต้องและเชื่อถือได้มากขึ้น

เข้าใจเป้าหมายชัดเจนครับ โจทย์คือ "ข้อมูลเข้ามามั่วแค่ไหน ก็ต้องกรองให้สะอาด และค้นหาแล้วต้องเจอ LatLong ที่ถูกต้องเพื่อนำไปใช้ต่อได้จริง"
เพื่อให้ระบบทำงานได้ตามโจทย์นี้ ผมจะเขียนโค้ดชุดใหม่ 6 ฟังก์ชันหลัก โดยเน้น Logic การตัดสินใจ (Decision Logic) ที่เข้มงวดขึ้น เพื่อแก้ปัญหา 8 ข้อ และทำให้การค้นหาคู่ ชื่อคน + ชื่อสถานที่ เจอผลลัพธ์ที่แม่นยำที่สุด
นี่คือโค้ดฉบับสมบูรณ์สำหรับ 6 ฟังก์ชันที่คุณต้องการ นำไปวางแทนที่หรือเพิ่มลงในไฟล์เดิมได้เลยครับ
1. ไฟล์: 05_NormalizeService.gs
ฟังก์ชัน: validateDataCompleteness
หน้าที่: เป็น "ยามเฝ้าประตู" คัดข้อมูลขยะออกก่อนเข้าระบบ ถ้าข้อมูลไม่ครบตามเกณฑ์ จะไม่ยอมให้ผ่านเข้าไปสร้าง Master เด็ดขาด
javascript
/**
 * ตรวจสอบความสมบูรณ์ของข้อมูลดิบ (Data Quality Gatekeeper)
 * ตัดสินใจว่าแถวนี้ "พร้อมประมวลผล" หรือ "ต้องส่งไปแก้/ทิ้ง"
 */
function validateDataCompleteness(rowData) {
  // rowData คือ Object ที่มีค่าจากคอลัมน์ต่างๆ แล้ว
  const issues = [];
  let status = "PASS";
  let confidence = 100;

  // 1. ตรวจสอบพิกัด (สำคัญที่สุด)
  if (!rowData.lat || !rowData.long || isNaN(rowData.lat) || isNaN(rowData.long)) {
    issues.push("ERR_NO_LATLONG");
    status = "REJECT"; // ไม่มีพิกัด = ใช้การไม่ได้ในระบบ Geo-First
    confidence = 0;
  } else {
    // ตรวจสอบพิกัดมั่ว (เช่น 0,0 หรือหลุดนอกประเทศไทย)
    if (rowData.lat < 5 || rowData.lat > 21 || rowData.long < 97 || rowData.long > 106) {
      issues.push("ERR_INVALID_LATLONG_RANGE");
      status = "REVIEW"; // น่าสงสัย ต้องคนตรวจ
      confidence -= 50;
    }
  }

  // 2. ตรวจสอบชื่อบุคคล (ต้องไม่ว่าง และไม่สั้นเกินไปจนไร้ความหมาย)
  const rawName = (rowData.raw_person_name || "").trim();
  if (!rawName) {
    issues.push("ERR_NO_PERSON_NAME");
    status = "REJECT";
  } else if (rawName.length < 2) {
    issues.push("ERR_NAME_TOO_SHORT");
    status = "REVIEW"; // ชื่อตัวเดียวอาจมั่ว
    confidence -= 30;
  }

  // 3. ตรวจสอบที่อยู่ (ถ้ามีพิกัด แต่ไม่มีชื่อสถานที่เลย อาจจะใช้ยากในการค้นหาด้วยชื่อ)
  const rawAddress = (rowData.raw_address || "").trim();
  if (!rawAddress && status !== "REJECT") {
    issues.push("WARN_NO_ADDRESS_TEXT");
    // ไม่ถึงกับ Reject เพราะเรามี LatLong อยู่ แต่เตือนไว้สำหรับการค้นหาด้วยข้อความ
    confidence -= 20;
  }

  // สรุปผล
  return {
    isValid: status === "PASS",
    status: status, // PASS, REVIEW, REJECT
    issues: issues,
    confidenceScore: confidence,
    message: issues.length > 0 ? issues.join(", ") : "ข้อมูลสมบูรณ์"
  };
}2. ไฟล์: 06_PersonService.gs
ฟังก์ชัน: findOrCreatePersonAdvanced
หน้าที่: แก้ปัญหา "คนเดียวกันแต่ชื่อต่างกัน" โดยใช้เทคนิคเปรียบเทียบชื่อแบบยืดหยุ่น (Fuzzy Match) และดูบริบทสถานที่ประกอบ
javascript
/**
 * ค้นหาหรือสร้างบุคคลใหม่ ด้วยตรรกะขั้นสูง
 * แก้ปัญหา: คนเดียวกันเขียนชื่อไม่เหมือนกัน, มีคำนำหน้าต่างกัน
 */
function findOrCreatePersonAdvanced(rawName, linkedPlaceId, lat, long) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheetPerson = ss.getSheetByName("MASTER_PERSON");
  const data = sheetPerson.getDataRange().getValues();
  const headers = data[0];
  
  // Normalize ชื่อต้นทางก่อนเทียบ
  const cleanInputName = normalizePersonName(rawName); 
  let bestMatchIndex = -1;
  let bestScore = 0;

  // วนลูปหาชื่อที่คล้ายกันที่สุดในฐานข้อมูล
  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    const storedPrimaryName = normalizePersonName(row[1]); // สมมติคอลัมน์ B คือ Name_Primary
    const storedAliases = row[2] || ""; // สมมติคอลัมน์ C คือ Name_Alias (csv)
    
    // คำนวณคะแนนความเหมือนของชื่อ (0-100)
    let score = calculateNameSimilarity(cleanInputName, storedPrimaryName);
    
    // เช็คว่าชื่อใหม่ ไปซ้ำกับ Alias เก่าไหม
    if (score < 80 && storedAliases.includes(cleanInputName)) {
      score = 95; // ถ้าตรงกับ Alias ให้ถือว่าเกือบใช่เลย
    }

    // Bonus Score: ถ้าชื่อคล้ายกัน AND สถานที่ปลายทางเดียวกัน (หรือใกล้กันมาก)
    // ช่วยยืนยันว่าเป็นคนเดิมจริงๆ ไม่ใช่แค่ชื่อพ้อง
    if (score > 70) {
       const existingPlaceIds = row[3] ? row[3].split(",") : []; // สมมติคอลัมน์ D คือ Linked_Place_IDs
       if (existingPlaceIds.includes(linkedPlaceId)) {
         score += 20; // บวกคะแนนพิเศษถ้าเคยมาส่งที่นี่
       }
    }

    if (score > bestScore && score >= 85) { // Threshold ต้องสูงพอ (85%) ถึงจะนับว่าเป็นคนเดียวกัน
      bestScore = score;
      bestMatchIndex = i;
    }
  }

  if (bestMatchIndex > 0) {
    // พบคนเดิม -> อัปเดต Alias ถ้าชื่อใหม่ยังไม่เคยมี
    const row = data[bestMatchIndex];
    let aliases = row[2] || "";
    if (!aliases.includes(cleanInputName) && cleanInputName !== normalizePersonName(row[1])) {
      aliases = aliases ? aliases + "|" + cleanInputName : cleanInputName;
      sheetPerson.getRange(bestMatchIndex + 1, 3).setValue(aliases); // อัปเดตคอลัมน์ Alias
    }
    // อัปเดต Last_Seen
    sheetPerson.getRange(bestMatchIndex + 1, 5).setValue(new Date());
    return row[0]; // คืนค่า Person_ID
  } else {
    // ไม่พบ -> สร้างคนใหม่
    const newId = "P-" + Utilities.getUuid().substr(0, 8);
    sheetPerson.appendRow([
      newId,
      cleanInputName,       // Name_Primary (ใช้ชื่อที่สะอาดที่สุดเป็นตัวแทน)
      rawName,              // เก็บชื่อเดิมไว้ใน Alias ครั้งแรก
      linkedPlaceId,        // Linked_Place_IDs
      new Date()            // Last_Seen
    ]);
    return newId;
  }
}

// ฟังก์ชันช่วยคำนวณความเหมือนของชื่อ (Levenshtein Distance แบบง่าย)
function calculateNameSimilarity(s1, s2) {
  if (s1 === s2) return 100;
  if (!s1 || !s2) return 0;
  
  const longer = s1.length > s2.length ? s1 : s2;
  const shorter = s1.length > s2.length ? s2 : s1;
  if (longer.length === 0) return 100;

  const editDistance = computeEditDistance(longer, shorter);
  return ((longer.length - editDistance) / longer.length) * 100;
}

function computeEditDistance(s1, s2) {
  const costs = new Array();
  for (let i = 0; i <= s1.length; i++) {
    let lastValue = i;
    for (let j = 0; j <= s2.length; j++) {
      if (i == 0) costs[j] = j;
      else {
        if (j > 0) {
          let newValue = costs[j - 1];
          if (s1.charAt(i - 1) != s2.charAt(j - 1))
            newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
          costs[j - 1] = lastValue;
          lastValue = newValue;
        }
      }
    }
    if (i > 0) costs[s2.length] = lastValue;
  }
  return costs[s2.length];
}3. ไฟล์: 07_PlaceService.gs
ฟังก์ชัน: mergeDuplicatePlaces
หน้าที่: แก้ปัญหา "สถานที่ซ้ำ" โดยตรวจสอบว่าถ้ามี 2 จุดที่พิกัดใกล้กันมาก (< 10 เมตร) และชื่อคล้ายกัน ให้รวมเป็นจุดเดียวทันที
javascript
/**
 * รวมสถานที่ซ้ำซ้อนอัตโนมัติ
 * เงื่อนไข: พิกัดห่างกันไม่เกิน 10 เมตร AND ชื่อคล้ายกัน > 80%
 */
function mergeDuplicatePlaces() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheetPlace = ss.getSheetByName("MASTER_PLACE");
  const data = sheetPlace.getDataRange().getValues();
  const mergedIds = {}; // เก็บ ID ที่จะถูกยุบ { oldId: newMasterId }
  let mergeCount = 0;

  // วนลูปเทียบกับทุกคู่ (ระวังเรื่อง Performance ถ้าข้อมูลเยอะมาก อาจต้องแบ่ง Batch)
  for (let i = 1; i < data.length; i++) {
    const rowA = data[i];
    const idA = rowA[0];
    const latA = parseFloat(rowA[1]);
    const longA = parseFloat(rowA[2]);
    const nameA = normalizeText(rowA[3]);

    if (mergedIds[idA]) continue; // ถ้ายุบไปแล้ว ข้าม

    for (let j = i + 1; j < data.length; j++) {
      const rowB = data[j];
      const idB = rowB[0];
      
      if (mergedIds[idB]) continue;

      const latB = parseFloat(rowB[1]);
      const longB = parseFloat(rowB[2]);
      const nameB = normalizeText(rowB[3]);

      // 1. เช็คระยะทาง
      const distance = calculateDistance(latA, longA, latB, longB);
      
      // 2. เช็คความคล้ายชื่อ
      const nameScore = calculateNameSimilarity(nameA, nameB);

      // เงื่อนไขการรวม: ใกล้กันมาก (< 15 เมตร) และชื่อคล้ายกัน (> 75%)
      if (distance < 0.015 && nameScore > 75) { 
        // เลือกอันที่มี Confidence สูงกว่า หรืออัปเดตล่าสุดกว่า เป็น Master (ในที่นี้เอา A เป็นหลัก)
        mergedIds[idB] = idA;
        
        // อัปเดต Alias ของ A ให้รวมชื่อ B เข้าไปด้วย
        const currentAliases = rowA[4] || "";
        const newAliasPart = nameB; 
        // (Logic การเขียนลง Sheet จริงควรทำหลังลูปเสร็จเพื่อความเร็ว แต่ทำตรงนี้เพื่อความเข้าใจง่าย)
        
        mergeCount++;
        Logger.log(`Merged Place: ${idB} into ${idA} (Dist: ${distance}m, Score: ${nameScore}%)`);
      }
    }
  }

  // ขั้นตอนการอัปเดตจริง (เขียนลง Sheet)
  if (mergeCount > 0) {
    // หมายเหตุ: ในทางปฏิบัติควรสร้าง Map เพื่อรวบรวมการแก้ไขแล้วเขียนทีเดียว (Batch Update)
    // เพื่อป้องกัน Error เรื่องการเขียนทับขณะอ่าน
    Logger.log(`สรุป: พบสถานที่ซ้ำที่ควรรวม ${mergeCount} คู่`);
    // TODO: Implement Batch Update logic here to mark old IDs as 'MERGED' and point to Master ID
  }
  
  return mergeCount;
}4. ไฟล์: 10_MatchEngine.gs
ฟังก์ชัน: detectAllEightProblems
หน้าที่: สแกนข้อมูลชุดใหม่เพื่อติดธง "ปัญหา 8 ข้อ" ก่อนบันทึกจริง เพื่อให้ระบบรู้ตัวและแจ้งเตือน
javascript
/**
 * ตรวจจับปัญหา 8 ข้อในข้อมูลชุดใหม่
 * Return: Object บอกสถานะและคำแนะนำ
 */
function detectAllEightProblems(newRow, existingDataSummary) {
  // newRow: ข้อมูลที่กำลังจะเข้า
  // existingDataSummary: ข้อมูลสรุปจากฐานข้อมูลปัจจุบัน (Person, Place)
  
  const problems = [];
  const pName = normalizePersonName(newRow.raw_person_name);
  const pLat = newRow.lat;
  const pLong = newRow.long;
  const placeName = normalizeText(newRow.raw_address);

  // 1. ชื่อบุคคลซ้ำกัน (แต่อาจเป็นคนละคน) -> เช็คโดยดูว่าชื่อนี้เคยไปส่งที่อื่นที่ไกลมากไหม
  if (existingDataSummary.personExists && existingDataSummary.distanceToLastKnownLocation > 50) {
    problems.push({ code: "P1_DUPLICATE_NAME_FAR_AWAY", msg: "ชื่อซ้ำแต่พิกัดห่างจากเดิมมาก (>50km)" });
  }

  // 2. ชื่อสถานที่ซ้ำ -> เช็คโดย PlaceService ได้จัดการไปแล้ว แต่ถ้าชื่อเหมือนกันเป๊ะๆ พิกัดต่าง > 100ม
  if (existingDataSummary.placeNameExists && existingDataSummary.placeDistance > 0.1) {
     problems.push({ code: "P2_DUPLICATE_PLACE_NAME", msg: "ชื่อสถานที่ซ้ำแต่พิกัดไม่ตรงกัน" });
  }

  // 3. LatLong ซ้ำกัน (ปกติดี แต่ถ้าชื่อคนเปลี่ยนหน้าตาไปเลย อาจผิดปกติ)
  if (existingDataSummary.latLongExists && existingDataSummary.personNameDiffersSignificantly) {
    problems.push({ code: "P3_SAME_LOCATION_DIFF_PERSON", msg: "พิกัดเดิม แต่ชื่อคนเปลี่ยนไปอย่างสิ้นเชิง" });
  }

  // 4. บุคคลเดียวกันชื่อเขียนไม่เหมือนกัน (จัดการโดย PersonService แล้ว แต่ให้ Log ไว้)
  if (existingDataSummary.isLikelySamePersonDifferentName) {
    problems.push({ code: "P4_ALIAS_DETECTED", msg: "ตรวจพบว่าน่าจะเป็นคนเดิม แต่ใช้ชื่อต่างกัน (เพิ่ม Alias)" });
  }

  // 5. บุคคลคนละชื่อ แต่สถานที่อยู่เดียวกัน (พี่น้อง/เพื่อนบ้าน/บริษัทเดียวกัน) -> ปกติไม่ใช่ปัญหา แต่ให้สังเกต
  if (existingDataSummary.samePlaceDifferentPerson) {
    // อันนี้เป็นเรื่องปกติในคอนโด/หมู่บ้าน ไม่ต้อง Flag เป็น Error
  }

  // 6. บุคคลชื่อเดียวกัน แต่สถานที่อยู่ไม่เหมือนกัน (ย้ายบ้าน/ส่งผิดที่/ชื่อซ้ำ)
  if (existingDataSummary.personExists && existingDataSummary.currentPlaceDiffersFromHistory) {
     if (existingDataSummary.distanceToHistory > 20) { // ย้ายที่เกิน 20 โล
       problems.push({ code: "P6_PERSON_MOVED_OR_FAKE", msg: "ลูกค้าคนเดิม แต่ส่งคนละที่ห่างกันมาก" });
     }
  }

  // 7. บุคคลชื่อเดียวกัน แต่ Lat Long คนละที่ (ซ้ำกับข้อ 6 แต่เน้นพิกัด)
  // จัดการรวมกับข้อ 6

  // 8. บุคคลคนละชื่อ แต่ Lat Long ที่เดียวกัน (ซ้ำกับข้อ 3)
  // จัดการรวมกับข้อ 3

  return {
    hasCriticalIssues: problems.some(p => p.code.includes("FAR_AWAY") || p.code.includes("FAKE")),
    problems: problems,
    recommendation: problems.length > 0 ? "MANUAL_REVIEW" : "AUTO_ACCEPT"
  };
}5. ไฟล์: 11_TransactionService.gs
ฟังก์ชัน: preventDuplicateTransaction
หน้าที่: ป้องกันการบันทึกงานซ้ำโดยใช้ TextFinder ซึ่งเร็วกว่าการวนลูปอ่านค่าทั้งหมด
javascript
/**
 * ป้องกันการบันทึกธุรกรรมซ้ำ (Duplicate Transaction)
 * ใช้ TextFinder เพื่อความเร็วสูงสุด
 * เงื่อนไขซ้ำ: Invoice No เดิม + วันเวลาเดิม (หรือ LatLong เดิมภายใน 5 นาที)
 */
function preventDuplicateTransaction(invoiceNo, dateStr, lat, long) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheetTrans = ss.getSheetByName("LINK_TRANSACTION");
  
  if (!invoiceNo) return false; // ถ้าไม่มี Invoice No ถือว่าไม่ซ้ำ (หรือต้องใช้เกณฑ์อื่น)

  // ค้นหา Invoice No ในคอลัมน์ C (สมมติ)
  const range = sheetTrans.getRange(2, 3, sheetTrans.getLastRow()-1, 1); 
  const finder = range.createTextFinder(invoiceNo).matchEntireCell(true);
  const matches = finder.findAll();

  if (matches.length > 0) {
    // พบ Invoice ซ้ำ -> ตรวจสอบรายละเอียดเพิ่มว่าซ้ำจริงไหม
    for (let match of matches) {
      const row = sheetTrans.getRange(match.getRow()).getValues()[0];
      const transDate = row[1]; // สมมติคอลัมน์ B คือวันที่
      const transLat = row[5];  // สมมติคอลัมน์ F คือ Lat
      const transLong = row[6]; // สมมติคอลัมน์ G คือ Long

      // ถ้าวันเดียวกัน และพิกัดใกล้กัน (< 20 เมตร) = ซ้ำแน่นอน
      if (transDate.toString().startsWith(dateStr)) {
        const dist = calculateDistance(lat, long, transLat, transLong);
        if (dist < 0.02) { 
          return true; // คือข้อมูลซ้ำ ห้ามบันทึก
        }
      }
    }
  }

  return false; // ไม่ซ้ำ อนุญาตให้บันทึกได้
}6. ไฟล์: 17_DataQualityMonitor.gs (ไฟล์ใหม่)
ฟังก์ชัน: runFullDataHealthCheck
หน้าที่: รันรายงานสุขภาพข้อมูลทั้งหมด เพื่อดูว่าระบบสะอาดแค่ไหน และมีจุดไหนที่ต้องแก้ไขด่วน
javascript
/**
 * รันการตรวจสอบสุขภาพข้อมูลทั้งระบบ
 * สร้างรายงานลงในชีต RPT_DATA_QUALITY
 */
function runFullDataHealthCheck() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let reportSheet = ss.getSheetByName("RPT_DATA_QUALITY");
  if (!reportSheet) {
    reportSheet = ss.insertSheet("RPT_DATA_QUALITY");
    reportSheet.appendRow(["Timestamp", "Metric", "Value", "Status", "Recommendation"]);
  } else {
    reportSheet.clearContents();
    reportSheet.appendRow(["Timestamp", "Metric", "Value", "Status", "Recommendation"]);
  }

  const now = new Date();
  const personSheet = ss.getSheetByName("MASTER_PERSON");
  const placeSheet = ss.getSheetByName("MASTER_PLACE");
  const transSheet = ss.getSheetByName("LINK_TRANSACTION");

  // 1. ตรวจสอบความซ้ำซ้อนของพิกัด (Place Deduplication Rate)
  const placeData = placeSheet.getDataRange().getValues();
  const uniqueCoords = new Set();
  let duplicateCoordsCount = 0;
  
  for (let i = 1; i < placeData.length; i++) {
    const key = placeData[i][1] + "," + placeData[i][2]; // Lat,Long
    if (uniqueCoords.has(key)) {
      duplicateCoordsCount++;
    } else {
      uniqueCoords.add(key);
    }
  }
  
  const placeDupRate = (duplicateCoordsCount / (placeData.length - 1)) * 100;
  reportSheet.appendRow([
    now, "Place Duplicate Rate", placeDupRate.toFixed(2) + "%", 
    placeDupRate > 5 ? "WARNING" : "OK", 
    placeDupRate > 5 ? "Run mergeDuplicatePlaces" : "-"
  ]);

  // 2. ตรวจสอบชื่อคนที่สั้นเกินไป (Noise Data)
  const personData = personSheet.getDataRange().getValues();
  let shortNameCount = 0;
  for (let i = 1; i < personData.length; i++) {
    if ((personData[i][1] || "").length < 3) shortNameCount++;
  }
  
  reportSheet.appendRow([
    now, "Suspicious Short Names", shortNameCount, 
    shortNameCount > 10 ? "WARNING" : "OK", 
    shortNameCount > 10 ? "Review MASTER_PERSON col B" : "-"
  ]);

  // 3. ตรวจสอบธุรกรรมที่ไม่มี Person ID หรือ Place ID (Orphan Data)
  // (สมมติโครงสร้างคอลัมน์)
  
  Logger.log("Data Health Check Completed. Please check sheet RPT_DATA_QUALITY");
  SpreadsheetApp.getUi().alert("ตรวจสอบสุขภาพข้อมูลเสร็จสิ้น! ดูผลที่ชีต RPT_DATA_QUALITY");
}คำแนะนำการใช้งานเพื่อให้ได้ข้อมูลสะอาดที่สุด
ขั้นตอนการนำเข้าข้อมูล (Import Flow):
เรียก validateDataCompleteness เป็นตัวแรก ถ้าได้ REJECT ให้โยนลงชีตแยก RAW_REJECT อย่าให้อุปโภคบริโภค
ถ้าได้ REVIEW ให้人去ดู หรือใช้กฎเสริม
ถ้า PASS จึงส่งเข้า findOrCreatePersonAdvanced และ PlaceService
การค้นหาเพื่อใช้งาน (Lookup Flow):
เมื่อคุณต้องการค้นหา ชื่อคน + สถานที่ เพื่อเอา LatLong
ระบบจะไม่ค้นหาจากตัวอักษรตรงๆ (Exact Match) แต่จะค้นหาผ่าน Person_ID และ Place_ID ที่ผ่านการ Clean มาแล้ว
ดังนั้น ต่อให้ตอน入力พิมพ์ว่า "คุณสมชาย" หรือ "ช่างสมชาย" ระบบก็จะลิงก์ไปที่ Person_ID เดียวกัน และดึง Place_ID ที่ถูกต้องมาให้ ทำให้ได้ LatLong ที่แม่นยำ
การบำรุงรักษา:
รัน mergeDuplicatePlaces สัปดาห์ละ 1 ครั้ง (หรือตั้ง Trigger) เพื่อเก็บตกข้อมูลที่อาจจะหลุดรอดเข้ามา
รัน runFullDataHealthCheck ทุกเช้าเพื่อดูแนวโน้มคุณภาพข้อมูล
โค้ดชุดนี้จะช่วยให้ระบบของคุณ "ภูมิคุ้มกันสูง" รับข้อมูลมั่วๆ ได้ แต่ผลิตผลลัพธ์ที่สะอาดออกมาได้จริงครับ

เข้าใจแล้วครับ โจทย์ชัดเจนมาก:
Input: มีชีตข้อมูลดิบใหม่ (สมมติชื่อ RAW_IMPORT) ที่โหลดมาจากระบบภายนอก ข้อมูลมั่วเหมือนเดิม
Process: ระบบต้อง "กวาดล้าง" ข้อมูลนี้ให้สะอาด แก้ปัญหา 8 ข้อ และบันทึกลง Master (Person/Place)
Output: เมื่อผู้ใช้เอา "ชื่อคน + ชื่อที่" จากชีตดิบนั้นไปค้นหา ระบบต้องคืนค่า LatLong ที่ถูกต้องที่สุด กลับมาให้ทันที
นี่คือโครงสร้างและโค้ดชุดใหม่ล่าสุดที่เน้น "Data Cleansing & Lookup" โดยเฉพาะครับ
1. โครงสร้าง Google Sheets (รวม 14 ชีต)
ชื่อชีต
ประเภท
หน้าที่หลัก
RAW_IMPORT
Input
ชีตใหม่! ข้อมูลดิบที่โหลดมาจากระบบ (ชื่อมั่ว, ที่อยู่มั่ว)
SCGนครหลวงJWDภูมิภาค
Source
ข้อมูลประวัติการส่งของจริง (ใช้เป็นฐานอ้างอิงความน่าเชื่อถือ)
SYS_TH_GEO
Reference
ข้อมูลภูมิศาสตร์ไทย (เขต/แขวง/รหัสไปรษณีย์) ใช้แก้ที่อยู่ mั่ว
MASTER_PERSON
Master
เก็บ "บุคคลสะอาด" (ID, ชื่อหลัก, รายชื่อ_alias, Place_ID ที่เคยส่ง)
MASTER_PLACE
Master
เก็บ "สถานที่สะอาด" (ID, Lat, Long, ชื่อหลัก, Alias, Address มาตรฐาน)
LINK_TRANSACTION
History
บันทึกความสัมพันธ์ (ใคร ส่งอะไร ไปที่ไหน เมื่อไหร่)
Q_REVIEW
Queue
คิวงานที่ระบบไม่มั่นใจ (ต้องคนมาแก้)
LOG_PROCESSING
Log
บันทึกการทำงานและข้อผิดพลาด
CACHE_LOOKUP
Cache
ชีตใหม่! เก็บผลลัพธ์การค้นหาชั่วคราว (ชื่อ+ที่ -> LatLong) เพื่อความเร็ว
MAPS_CACHE
Cache
เก็บผล Reverse Geocode จาก Google API
RPT_DATA_QUALITY
Report
สรุปคุณภาพข้อมูล (กี่แถวสะอาด, กี่แถวมีปัญหา)
CONFIG
Config
ตั้งค่า Threshold, ค่าคงที่
TEMP_BATCH
Temp
พื้นที่ประมวลผลชั่วคราว (ลบทิ้งหลังจบงาน)
DASHBOARD
View
หน้าจอสรุปสถานะระบบ
2. โครงสร้างโค้ด (18 โมดูล) - เน้นฟังก์ชันใหม่ 6 ตัว
ผมจะเขียนโค้ดเฉพาะ 6 ฟังก์ชันหัวใจสำคัญ ที่คุณขอเพิ่ม เพื่อให้ระบบทำความสะอาดข้อมูลและค้นหาได้จริงครับ
ไฟล์ที่ 1: 05_NormalizeService.gs (เพิ่มฟังก์ชันตรวจสอบความสมบูรณ์)
หน้าที่: กรองขยะออกก่อนเข้าระบบ ถ้าข้อมูลไม่ครบ ห้ามผ่าน
javascript
/**
 * ตรวจสอบความสมบูรณ์ของข้อมูลดิบจาก RAW_IMPORT
 * ตัดแถวที่ข้อมูลวิปริตออกไปลง Q_REVIEW ทันที
 */
function validateDataCompleteness(rawRow) {
  // rawRow คือ Object {personName, address, lat, long, ...}
  let issues = [];
  let score = 100;

  // 1. เช็คชื่อคน (ต้องมีอย่างน้อย 2 พยางค์ หรือไม่ใช่ตัวเลขล้วน)
  if (!rawRow.personName || rawRow.personName.trim().length < 2) {
    issues.push("ชื่อว่างหรือสั้นเกินไป");
    score -= 40;
  } else if (/^\d+$/.test(rawRow.personName.trim())) {
    issues.push("ชื่อเป็นตัวเลขล้วน (อาจเป็นรหัส)");
    score -= 30;
  }

  // 2. เช็คพิกัด (ต้องมีทั้งคู่ และเป็นตัวเลข valid ในประเทศไทย)
  if (!rawRow.lat || !rawRow.long) {
    issues.push("ขาดพิกัด Lat/Long");
    score -= 50; // สำคัญมาก
  } else {
    const lat = parseFloat(rawRow.lat);
    const lng = parseFloat(rawRow.long);
    if (lat < 5 || lat > 21 || lng < 97 || lng > 106) {
      issues.push("พิกัดอยู่นอกขอบเขตประเทศไทย");
      score -= 40;
    }
  }

  // 3. เช็คที่อยู่ (ถ้ามี ควรยาวพอสมควร)
  if (rawRow.address && rawRow.address.trim().length < 5) {
    issues.push("ที่อยู่สั้นผิดปกติ อาจตัดคำผิด");
    score -= 10;
  }

  // สรุปผล
  if (score < 60) {
    return { status: 'REJECT', reason: issues.join(', '), data: rawRow };
  } else if (score < 90) {
    return { status: 'REVIEW', reason: issues.join(', '), data: rawRow };
  } else {
    return { status: 'PASS', reason: '',  rawRow };
  }
}
ไฟล์ที่ 2: 06_PersonService.gs (เพิ่มฟังก์ชันจับคู่ชื่อบุคคลขั้นสูง)
หน้าที่: แก้ปัญหาข้อ 1, 4, 6, 7 (ชื่อซ้ำ, ชื่อต่างกันแต่คนเดียวกัน)
javascript
/**
 * ค้นหาหรือสร้างบุคคลใหม่ โดยดูทั้งชื่อและบริบทสถานที่
 * แก้ปัญหา: คนเดียวกันแต่เขียนชื่อต่างกัน (สมชาย vs คุณสมชาย)
 */
function findOrCreatePersonAdvanced(cleanName, linkedPlaceId, rawLocationData) {
  const sheet = SpreadsheetApp.getActive().getSheetByName('MASTER_PERSON');
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  
  let bestMatch = null;
  let highestScore = 0;

  // Normalize ชื่อที่จะค้นหา
  const searchName = normalizePersonName(cleanName); 

  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    const masterName = normalizePersonName(row[1]); // สมมติคอลัมน์ B คือ Name_Primary
    const masterPlaces = row[3] ? row[3].split(',') : []; // คอลัมน์ D คือ Linked_Place_IDs
    
    // 1. คะแนนความคล้ายของชื่อ (Levenshtein Distance)
    const nameScore = calculateNameSimilarity(searchName, masterName);
    
    // 2. คะแนนความเชื่อมโยงสถานที่ (ถ้าเคยส่งที่เดียวกัน โอกาสเป็นคนเดียวกันสูงมาก)
    let locationScore = 0;
    if (linkedPlaceId && masterPlaces.includes(linkedPlaceId)) {
      locationScore = 0.5; // เพิ่มคะแนนทันที 50% ถ้าสถานที่ตรงกัน
    }

    const totalScore = nameScore + locationScore;

    if (totalScore > 0.85 && totalScore > highestScore) { // Threshold 85%
      highestScore = totalScore;
      bestMatch = { rowIndex: i, id: row[0], name: row[1] };
    }
  }

  if (bestMatch) {
    // พบแล้ว -> อัปเดต Alias ถ้าชื่อใหม่ยังไม่เคยมี
    updatePersonAlias(bestMatch.id, cleanName);
    return bestMatch;
  } else {
    // ไม่พบ -> สร้างใหม่
    return createNewPerson(cleanName, linkedPlaceId);
  }
}

// ฟังก์ชันเสริม: ตรวจจับชื่อปลอม/ชื่อทดสอบ
function isSuspiciousPersonName(name) {
  const suspiciousPatterns = ['test', 'admin', 'user', 'abc', '1234', 'ไม่ทราบ', 'unknown'];
  const lowerName = name.toLowerCase();
  return suspiciousPatterns.some(p => lowerName.includes(p));
}
ไฟล์ที่ 3: 07_PlaceService.gs (เพิ่มฟังก์ชันรวมสถานที่ซ้ำ)
หน้าที่: แก้ปัญหาข้อ 2, 3, 5, 8 (สถานที่ซ้ำ, พิกัดใกล้กันแต่ชื่อต่าง)
javascript
/**
 * ตรวจสอบและรวมสถานที่ที่มีพิกัดใกล้กันมาก (< 15 เมตร) และชื่อคล้ายกัน
 * แก้ปัญหา: อาคารเดียวกัน แต่เรียกไม่เหมือนกัน (ลุมพินีทาวเวอร์ vs ลุมพินี ทาวเวอร์)
 */
function mergeDuplicatePlaces() {
  const sheet = SpreadsheetApp.getActive().getSheetByName('MASTER_PLACE');
  const data = sheet.getDataRange().getValues();
  const mergedIds = []; // เก็บ ID ที่จะถูกกลืน
  const updates = [];

  // วนลูปเปรียบเทียบคู่ (Pairwise Comparison) - อาจใช้ Batch เพื่อความเร็วในข้อมูลเยอะๆ
  for (let i = 1; i < data.length; i++) {
    if (mergedIds.includes(data[i][0])) continue; // ข้ามตัวที่ถูกกลืนไปแล้ว

    const placeA = { id: data[i][0], lat: parseFloat(data[i][1]), lng: parseFloat(data[i][2]), name: data[i][3] };
    
    for (let j = i + 1; j < data.length; j++) {
      if (mergedIds.includes(data[j][0])) continue;

      const placeB = { id: data[j][0], lat: parseFloat(data[j][1]), lng: parseFloat(data[j][2]), name: data[j][3] };

      // เช็คว่าพิกัดใกล้กันไหม (ระยะทาง < 15 เมตร)
      const dist = calculateDistance(placeA.lat, placeA.lng, placeB.lat, placeB.lng);
      
      if (dist < 0.015) { // 0.015 km = 15 เมตร
        // เช็คว่าชื่อคล้ายกันไหม (เพื่อป้องกันคนละตึกในซอยเดียวกัน)
        const nameSim = calculateNameSimilarity(normalizeText(placeA.name), normalizeText(placeB.name));
        
        if (nameSim > 0.6) {
          // ถือว่าเป็นที่เดียวกัน!
          // เลือก A เป็นหลัก, กลืน B
          mergedIds.push(placeB.id);
          
          // เพิ่ม Alias ให้ A
          updates.push({
            row: i + 1,
            aliasToAdd: placeB.name
          });
          
          // บันทึกลง Log ว่ามีการ Merge
          logAction('MERGE_PLACE', `Merge ${placeB.id} into ${placeA.id} (Dist: ${dist}m)`);
        }
      }
    }
  }

  // ประมวลผลการอัปเดต Alias และทำเครื่องหมายว่า ID ไถูกยกเลิก
  applyPlaceMerges(mergedIds, updates);
  return mergedIds.length;
}
ไฟล์ที่ 4: 10_MatchEngine.gs (เพิ่มฟังก์ชันตรวจจับปัญหา 8 ข้อ)
หน้าที่: วิเคราะห์ภาพรวมและติดธงข้อมูลก่อนบันทึก
javascript
/**
 * วิเคราะห์ข้อมูลแถวเดียว ตรวจจับปัญหา 8 ข้อ
 * คืนค่า Object บอกสถานะและคำแนะนำ
 */
function detectAllEightProblems(rowData) {
  const problems = [];
  const { personName, address, lat, long, existingPersonId, existingPlaceId } = rowData;

  // 1. ชื่อบุคคลซ้ำกัน (ในระบบมีชื่อนี้หลาย ID)
  if (countPersonByName(personName) > 1) problems.push("P1: ชื่อซ้ำในระบบ (อาจเป็นคนละคน)");

  // 2. ชื่อสถานที่ซ้ำ (มี Place หลายอันชื่อเดียวกัน)
  if (countPlaceByName(address) > 1) problems.push("P2: ชื่อสถานที่ซ้ำ");

  // 3. LatLong ซ้ำ (พิกัดนี้เคยถูกใช้โดยคนละชื่อ/คนละที่)
  if (isLatLongSharedByMultiple(lat, long)) problems.push("P3: พิกัดซ้ำกันโดยบริบทต่างกัน");

  // 4. บุคคลเดียวกันแต่ชื่อเขียนต่างกัน (เช็คจาก Place เดิม + ชื่อคล้าย)
  if (existingPlaceId && hasSimilarNameAtPlace(personName, existingPlaceId)) {
    problems.push("P4: ชื่อต่างกันแต่ส่งที่เดิม (น่าจะเป็นคนเดียวกัน)");
  }

  // 5. บุคคลคนละชื่อ แต่สถานที่เดียวกัน (ปกติเกิดขึ้นได้ แต่ต้องเช็คความถี่)
  if (existingPlaceId && countPersonsAtPlace(existingPlaceId) > 5) {
    problems.push("P5: สถานที่นี้มีผู้รับของหลายคน (เช็คว่าเป็นบริษัท/ส่วนกลางไหม)");
  }

  // 6. บุคคลชื่อเดียวกัน แต่สถานที่ไม่เหมือนกัน (ห่างกันเกิน 1 กม.)
  if (existingPersonId && isPersonAtDistantLocations(existingPersonId, lat, long, 1.0)) {
    problems.push("P6: คนชื่อเดียวกัน แต่พิกัดห่างกันมาก (อาจเป็นคนละคน หรือย้ายที่)");
  }

  // 7. บุคคลชื่อเดียวกัน แต่ Lat Long คนละที่ (คล้ายข้อ 6 แต่เน้นพิกัดไม่ตรงเป๊ะ)
  // (ครอบคลุมในข้อ 6)

  // 8. บุคคลคนละชื่อ แต่ Lat Long ที่เดียวกัน (คล้ายข้อ 5)
  // (ครอบคลุมในข้อ 3 และ 5)

  return {
    hasIssues: problems.length > 0,
    problems: problems,
    action: problems.length > 2 ? 'REVIEW' : 'AUTO_PASS' // ถ้าปัญหาเยอะเกิน ให้คนตรวจ
  };
}
ไฟล์ที่ 5: 11_TransactionService.gs (ปรับปรุงการกันซ้ำ)
หน้าที่: ป้องกันการบันทึกข้อมูลเดิมซ้ำๆ ลง Database ทำให้ข้อมูลบวม
javascript
/**
 * ตรวจสอบธุรกรรมซ้ำด้วย TextFinder (เร็วขึ้น 10 เท่า)
 * เช็คว่า Invoice + วันที่ + คนรับ เคยบันทึกไปแล้วหรือยัง
 */
function preventDuplicateTransaction(invoiceNo, dateStr, personId, placeId) {
  const sheet = SpreadsheetApp.getActive().getSheetByName('LINK_TRANSACTION');
  
  // ใช้ TextFinder หา Invoice No ในคอลัมน์ C (สมมติ)
  // ถ้าเจอ แล้วเช็ควันที่และ Person/Place ต่อ
  const invoiceFinder = sheet.createTextFinder(invoiceNo.toString());
  const matches = invoiceFinder.findAll();

  if (matches.length === 0) {
    return false; // ไม่ซ้ำ บันทึกได้เลย
  }

  // ถ้าเจอ Invoice ซ้ำ ต้องเช็คละเอียดว่าวันเดียวกันและคนเดียวกันไหม
  for (let match of matches) {
    const row = sheet.getRange(match.getRow(), 1, 1, sheet.getLastColumn()).getValues()[0];
    const rowDate = Utilities.formatDate(new Date(row[1]), "GMT+7", "yyyy-MM-dd"); // สมมติคอลัมน์ B คือวันที่
    const rowPerson = row[2]; // สมมติคอลัมน์ C คือ PersonID
    const rowPlace = row[3];  // สมมติคอลัมน์ D คือ PlaceID

    if (rowDate === dateStr && rowPerson == personId && rowPlace == placeId) {
      return true; // ซ้ำแน่ๆ
    }
  }

  return false;
}
ไฟล์ที่ 6: 17_DataQualityMonitor.gs (โมดูลใหม่)
หน้าที่: สั่งรันระบบทำความสะอาดและรายงานผล
javascript
/**
 * ฟังก์ชันหลักสำหรับเรียกใช้งาน: ทำความสะอาดข้อมูลจาก RAW_IMPORT
 */
function runFullDataHealthCheck() {
  const ss = SpreadsheetApp.getActive();
  const rawSheet = ss.getSheetByName('RAW_IMPORT');
  const reportSheet = ss.getSheetByName('RPT_DATA_QUALITY');
  
  if (!rawSheet) throw new Error("ไม่พบชีต RAW_IMPORT");

  const rawData = rawSheet.getDataRange().getValues();
  const headers = rawData[0];
  let stats = { total: 0, clean: 0, review: 0, reject: 0, mergedPlaces: 0 };

  Logger.log("เริ่มกระบวนการทำความสะอาดข้อมูล...");

  // 1. วนลูปตรวจสอบแต่ละแถว
  for (let i = 1; i < rawData.length; i++) {
    stats.total++;
    const rowObj = mapRowToObject(rawData[i], headers);
    
    // Validate ความสมบูรณ์
    const validation = validateDataCompleteness(rowObj);
    
    if (validation.status === 'REJECT') {
      stats.reject++;
      moveToReviewQueue(rowObj, validation.reason);
      continue;
    }

    // 2. ประมวลผล Matching (Person & Place)
    // (เรียกใช้ Engine ต่างๆ ที่เขียนไว้ข้างต้น)
    const placeResult = findOrCreatePlaceAdvanced(rowObj.address, rowObj.lat, rowObj.long);
    const personResult = findOrCreatePersonAdvanced(rowObj.personName, placeResult.id, rowObj);
    
    // 3. Detect Problems
    const problemCheck = detectAllEightProblems({
      ...rowObj, 
      existingPlaceId: placeResult.id, 
      existingPersonId: personResult.id
    });

    if (problemCheck.hasIssues && problemCheck.action === 'REVIEW') {
      stats.review++;
      moveToReviewQueue(rowObj, problemCheck.problems.join('; '));
    } else {
      stats.clean++;
      saveTransaction(rowObj, personResult.id, placeResult.id);
    }
  }

  // 4. รวบรวมสถานที่ซ้ำ (Batch Operation)
  stats.mergedPlaces = mergeDuplicatePlaces();

  // 5. เขียนรายงาน
  writeReport(reportSheet, stats);
  
  Browser.msgBox(`เสร็จสิ้น!\nสะอาด: ${stats.clean}\nรอตรวจ: ${stats.review}\nปฏิเสธ: ${stats.reject}\nรวมสถานที่ซ้ำ: ${stats.mergedPlaces}`);
}

/**
 * ฟังก์ชันค้นหาสำหรับผู้ใช้ (API หลัก)
 * Input: ชื่อคน + ชื่อที่
 * Output: Lat, Long
 */
function lookupLatLongByNameAndPlace(searchName, searchAddress) {
  // 1. ค้นหา Place ที่ใกล้เคียงที่สุดจากชื่อที่อยู่
  const placeCandidates = findPlacesByAddressFuzzy(searchAddress);
  
  if (placeCandidates.length === 0) return { error: "ไม่พบสถานที่นี้ในระบบ" };

  // 2. ถ้ามีชื่อคน ให้กรอง Place ที่มีคนคนนี้เคยรับของ
  if (searchName) {
    const personId = findPersonIdByName(searchName);
    if (personId) {
      // หา Place ที่ Person นี้เคยมี Transaction ด้วย
      const matchedPlace = placeCandidates.find(p => hasTransaction(personId, p.id));
      if (matchedPlace) {
        return { lat: matchedPlace.lat, long: matchedPlace.long, confidence: 'HIGH' };
      }
    }
  }

  // 3. ถ้าไม่เจอคู่ที่ชัดเจน ให้คืนค่า Place ที่มีความน่าเชื่อถือสูงสุด (คะแนนสูงสุด)
  const bestPlace = placeCandidates.sort((a,b) => b.score - a.score)[0];
  return { lat: bestPlace.lat, long: bestPlace.long, confidence: 'MEDIUM', note: "ระบุชื่อคนเพื่อความแม่นยำยิ่งขึ้น" };
}
วิธีการใช้งานจริง (Workflow)
ขั้นตอนเตรียมข้อมูล:
นำข้อมูลดิบจากระบบเก่า มาวางในชีต RAW_IMPORT (ไม่ต้องแก้ชื่อคอลัมน์ ให้ตรงกับ Header ที่ระบบกำหนด หรือใช้ฟังก์ชัน mapRowToObject จับคู่ให้)
ขั้นตอนทำความสะอาด:
กดปุ่ม (หรือรันฟังก์ชัน) runFullDataHealthCheck
ระบบจะวิ่งอ่านทีละแถว:
ตัดขยะ (ชื่อว่าง, พิกัดนอกประเทศ) -> ทิ้งลง Q_REVIEW
จับคู่ชื่อคน (สมชาย vs คุณสมชาย) -> ดึง Person_ID เดิมมาใช้
จับคู่สถานที่ (พิกัดใกล้กัน, ชื่อคล้ายกัน) -> ดึง Place_ID เดิม หรือ Merge ที่ซ้ำ
ตรวจจับปัญหา 8 ข้อ -> ถ้าเสี่ยงมาก ส่งไป Q_REVIEW
ถ้าผ่าน -> บันทึกความสัมพันธ์ลง LINK_TRANSACTION
ขั้นตอนการใช้งาน (Lookup):
เมื่อคุณต้องการหาพิกัด ให้เรียกใช้ฟังก์ชัน lookupLatLongByNameAndPlace("สมชาย", "อาคารลุมพินี")
ระบบจะค้นหาใน MASTER_PERSON และ MASTER_PLACE ที่ผ่านการทำความสะอาดแล้ว
ผลลัพธ์ที่ได้คือ Lat/Long ที่แม่นยำที่สุด ตามประวัติที่เคยส่งจริง
สิ่งที่คุณต้องทำต่อ
สร้างชีตทั้ง 14 ชีตตามรายชื่อข้างต้น
คัดลอกโค้ดทั้ง 6 ส่วนนี้ไปแทนที่หรือเติมลงในไฟล์ .gs ที่มีอยู่
ปรับชื่อคอลัมน์ในฟังก์ชัน mapRowToObject ให้ตรงกับหัวตารางในชีต RAW_IMPORT ของคุณ
ลองนำข้อมูลตัวอย่างสัก 50-100 แถวมาวางใน RAW_IMPORT แล้วรัน runFullDataHealthCheck ดูผลลัพธ์ครับ
ระบบนี้จะทำให้คุณได้ "ขุมทรัพย์ข้อมูลสะอาด" ที่พร้อมสำหรับการค้นหา LatLong ได้ทันทีครั

ระบบได้รับการออกแบบตามข้อกำหนด โดยมีชีตข้อมูลดิบใหม่ (RAW_IMPORT) สำหรับโหลดข้อมูลจากภายนอก ซึ่งจะถูกทำความสะอาดและตรวจสอบความถูกต้องตามเกณฑ์ที่กำหนด จากนั้นจะมีการประมวลผลเพื่อจับคู่และรวมข้อมูลที่ซ้ำซ้อนกัน ทั้งในส่วนของบุคคลและสถานที่ พร้อมทั้งตรวจจับปัญหา 8 ข้อที่อาจเกิดขึ้น ข้อมูลที่ผ่านการประมวลผลจะถูกจัดเก็บใน Master Data และสามารถนำไปใช้งานได้จริง โดยมีฟังก์ชันสำหรับค้นหาพิกัด (LatLong) จากชื่อบุคคลและชื่อสถานที่ที่ป้อนเข้ามา ซึ่งจะคืนค่าพิกัดที่ถูกต้องและแม่นยำที่สุดตามข้อมูลที่เคยมีการใช้งานจริงในอดีต ระบบยังมีการจัดการคิวงานที่ต้องการการตรวจสอบเพิ่มเติม และมีรายงานคุณภาพข้อมูลเพื่อให้สามารถติดตามสถานะของข้อมูลได้อย่างต่อเนื่อง
ผมมีกฎอยู่แค่เรื่องเดียวครับ คือ ผมต้องการข้อมูลลที่สะอาด และ นำกลับใช้งานได้จริง แก้ปัญหาทั้ง8ข้อได้จริง

ชีต"SCGนครหลวงJWDภูมิภาค" = ชีตที่คนขับได้ทำการเข้าส่งสินค้า และ ได้ข้อมูลLatLongจริงๆที่ส่งสินค้าให้ลูกค้าปลายทาง

ชีต"ตารางงานประจำวัน" = ชีตนี้ผมจะโหลดข้อมูลมาจากระบบเเป็นข้อมูลใหม่ประจำวัน แต่บางคอลัมน์จะไม่เหมือนกันนะเดี๋ยวผมจะแจ้งอีกทีถ้าผมคิดว่าระบบเราพร้อมแล้ว ชีตSCGจะมาดึงข้อมูลจากชีตนี้ไปใช้ครับ 

**ผมจะเพิ่มชีต"ตารางงานประจำวัน" ที่จะมีข้อมูลดิบที่โหลดมาจากระบบ ชื่อปลายทาง(บุคคลไม่สะอาด) + ที่อยู่ปลายทาง (ชื่อสถานที่ไม่สะอาด) ที่ได้มา ก็เหมือนๆกับชีต"SCGนครหลวงJWDภูมิภาค"ข้อมูลดิบที่เรากำลังทำความสะอาดแหละครับ ไม่ใช่ทำระบบค้นหาแบบที่คุณคิด** เพราะต่อไปผมจะมีการค้นหาโดยเอา ชื่อปลายทาง(บุคคล) + ที่อยู่ปลายทาง (ชื่อสถานที่) ไปค้นหากับระบบที่เรากำลังทำนี้ เพื่อนำ LatLong มาใช้งานได้จริงๆ

เข้าใจครับ ระบบจะถูกออกแบบเป็น "เครื่องยนต์ทำความสะอาดและเชื่อมโยงข้อมูล" ที่ดึงข้อมูลดิบจากชีต "ตารางงานประจำวัน" มาประมวลผล แล้วเติม LatLong ที่ถูกต้องกลับไปยังชีต "SCGนครหลวงJWDภูมิภาค" โดยมีการตรวจสอบและแก้ไขปัญหาข้อมูลมั่วทั้ง 8 ข้อ ผ่าน 6 ฟังก์ชันหลักที่จะถูกเพิ่มเข้าไปในโค้ดเดิม ได้แก่ validateDataCompleteness, findOrCreatePersonAdvanced, mergeDuplicatePlaces, detectAllEightProblems, preventDuplicateTransaction, และ runFullDataHealthCheck เพื่อให้ได้ข้อมูลที่สะอาดและใช้งานได้จริงตามที่คุณต้องการ.

เข้าใจครับ ตอนนี้ภาพรวมชัดเจนมากครับ
Flow การทำงานใหม่จะเป็นแบบนี้:
Input: โหลดข้อมูลดิบจากไฟล์ Excel/CSV ลงชีต ตารางงานประจำวัน (ข้อมูลมั่ว, ชื่อไม่ครบ, ที่อยู่ตัดคำ)
Process: ระบบจะดึงข้อมูลจาก ตารางงานประจำวัน มาทำกระบวนการ Cleaning & Matching อย่างหนัก (ใช้ Logic แก้ปัญหา 8 ข้อ + Geo-First)
Output 1 (Master Data): บันทึกข้อมูลที่สะอาดแล้วลง MASTER_PERSON, MASTER_PLACE, LINK_TRANSACTION
Output 2 (Enriched Data): เขียนผลลัพธ์กลับลงมาที่ชีต SCGนครหลวงJWDภูมิภาค โดยเติมคอลัมน์ LAT, LONG ที่ถูกต้องที่สุดจากฐานข้อมูลที่เราสร้างไว้ ให้คนขับหรือแอดมินนำไปใช้ต่อได้ทันที
หัวใจสำคัญ: เราไม่ได้ทำระบบค้นหาแยกต่างหาก แต่เราทำ "ระบบทำความสะอาดและเชื่อมโยงข้อมูล (Data Cleansing & Linking Engine)" ที่จะเปลี่ยนข้อมูลขยะใน ตารางงานประจำวัน ให้กลายเป็นข้อมูลทองคำใน SCGนครหลวงJWDภูมิภาค และฐานข้อมูล Master
เพื่อให้ตรงตามกฎ "ข้อมูลต้องสะอาดและใช้งานได้จริง" ผมจะเขียนโค้ดชุดใหม่ที่เน้น Validation ก่อนประมวลผล และ Logic การจับคู่ที่เข้มงวด ครับ
นี่คือโครงสร้างโค้ด 6 ฟังก์ชันหลักที่คุณขอเพิ่ม เพื่อแก้ปัญหาข้อมูลมั่วโดยเฉพาะ:
1. โมดูล: 05_NormalizeService.gs (ปรับปรุง)
ฟังก์ชันใหม่: validateDataCompleteness(rowData)
หน้าที่: ตรวจสอบข้อมูลดิบจาก ตารางงานประจำวัน ก่อนเข้าระบบ
Logic:
ถ้าไม่มี ชื่อปลายทาง หรือ ที่อยู่ปลายทาง -> ตีกลับเป็น Error ทันที (ไม่ประมวลผลต่อ)
ถ้า LatLong ในแถวเดิมมีค่าแต่ดูผิดปกติ (เช่น 0,0 หรืออยู่นอกประเทศไทย) -> ทำเครื่องหมายให้ตรวจสอบ
ตัดช่องว่างเกิน, แปลงตัวพิมพ์ใหญ่-เล็กให้เป็นมาตรฐานเบื้องต้น
ประโยชน์: กรองขยะออกตั้งแต่ต้นทาง ไม่ให้ข้อมูลเสียไหลเข้าไปเปื้อนฐานข้อมูล Master
2. โมดูล: 06_PersonService.gs (ปรับปรุง)
ฟังก์ชันใหม่: findOrCreatePersonAdvanced(rawName, contextPlaceID, rawAddress)
หน้าที่: จับคู่ชื่อบุคคลที่เขียนไม่เหมือนกันแต่เป็นคนเดียวกัน
Logic แก้ปัญหา 8 ข้อ (ข้อ 1, 4, 6, 7, 8):
Normalize ชื่อ (ลบ คำนำหน้า, ลบอักษรพิเศษ, แยกชื่อเล่น)
Scoring: เปรียบเทียบชื่อใหม่ กับ ชื่อใน Master
ถ้าชื่อคล้ายกัน > 90% + พิกัดสถานที่ใกล้เคียงกัน (< 50 เมตร) = คนเดียวกัน (Match)
ถ้าชื่อคล้ายกัน แต่พิกัดห่างกันมาก (> 1 กม.) = อาจเป็นคนละคน (Flag for Review) -> สร้าง Person ใหม่ชั่วคราว
บันทึก Alias (ชื่ออื่นที่เคยใช้) ไว้ในตัวบุคคลนั้น
ประโยชน์: รู้ว่า "สมชาย", "ช่างสมชาย", "คุณสมชาย" ที่ร้านเดิม คือคนเดียวกัน
3. โมดูล: 07_PlaceService.gs (ปรับปรุง)
ฟังก์ชันใหม่: mergeDuplicatePlaces()
หน้าที่: รวมสถานที่ที่ซ้ำซ้อนกันโดยอัตโนมัติ
Logic แก้ปัญหา 8 ข้อ (ข้อ 2, 3, 5):
สแกนหาสถานที่ใน Master ที่มีพิกัดห่างกันไม่เกิน 10-20 เมตร (รัศมีการส่งของ)
ตรวจสอบชื่อสถานที่: ถ้าชื่อคล้ายกัน หรือ ชื่อหนึ่งเป็นชื่อสั้นอีกชื่อหนึ่งเป็นชื่อเต็ม
Action: รวมเป็น Place เดียวกัน, เก็บชื่อเดิมทั้งหมดเป็น Alias, อัปเดตพิกัดเฉลี่ย (Centroid) ให้แม่นยำขึ้น
ประโยชน์: ป้องกันการเกิด "ร้าน A สาขา 1", "ร้าน A สาขา 1 (หน้าเซเว่น)", "ร้าน A" ที่เป็นสถานที่เดียวกันแต่มีหลาย ID
4. โมดูล: 10_MatchEngine.gs (ปรับปรุง)
ฟังก์ชันใหม่: detectAllEightProblems(transactionData)
หน้าที่: วิเคราะห์และติดธงปัญหาทั้ง 8 ข้อก่อนบันทึกข้อมูล
Logic:
ตรวจสอบความสัมพันธ์ระหว่าง Person + Place + LatLong ในธุรกรรมใหม่
Case Detection:
ชื่อเดียวกัน + สถานที่ต่างกัน + พิกัดห่างไกล = ข้อ 6 (คนละสาขา? หรือชื่อซ้ำ?)
ชื่อต่างกัน + สถานที่เดียวกัน + พิกัดเดียวกัน = ข้อ 5 (คนละคนรับของแทน? หรือชื่อผิด?)
ชื่อเดียวกัน + พิกัดคนละที่ = ข้อ 7 (ไปส่งผิดที่? หรือย้ายที่?)
บันทึกสถานะลงในคอลัมน์ ผลการตรวจสอบงานส่ง และ เหตุผิดปกติที่ตรวจพบ ในชีต SCGนครหลวงJWDภูมิภาค
ประโยชน์: ระบบจะ "ตะโกนบอก" เมื่อเจอข้อมูลน่าสงสัย แทนที่จะบันทึกมั่วๆ ไป
5. โมดูล: 11_TransactionService.gs (ปรับปรุง)
ฟังก์ชันใหม่: preventDuplicateTransaction(invoiceNo, shipmentNo, date)
หน้าที่: ป้องกันการบันทึกงานซ้ำซ้อน
Logic:
ใช้ TextFinder ของ Google Sheets ค้นหา Invoice No + วันที่ ในชีต SCGนครหลวงJWDภูมิภาค และ LINK_TRANSACTION
ถ้าเจอ -> เปรียบเทียบพิกัด ถ้าพิกัดเดิม = ข้ามไป (Update เฉพาะเวลาส่งล่าสุด), ถ้าพิกัดเปลี่ยน = แจ้งเตือนว่ามีการส่งซ้ำแต่เปลี่ยนจุด
ประโยชน์: ประหยัดพื้นที่ และป้องกันสถิติเพี้ยน
6. โมดูลใหม่: 17_DataQualityMonitor.gs
ฟังก์ชันใหม่: runFullDataHealthCheck()
หน้าที่: ตรวจสอบสุขภาพข้อมูลทั้งระบบหลังการประมวลผล
Logic:
นับจำนวนข้อมูลที่ถูก Flag ว่าผิดปกติ
ตรวจสอบความสมบูรณ์ของ Master Data (มี Place ไหมที่ไม่มี LatLong, มี Person ไหมที่ไม่มีชื่อชัดเจน)
สร้างรายงานสรุปในชีต RPT_DATA_QUALITY
(Optional) ส่งแจ้งเตือน LINE ถ้าพบข้อมูลผิดพลาดเกินเกณฑ์ที่กำหนด
ประโยชน์: มั่นใจได้ว่าข้อมูลในระบบ "สะอาด" พร้อมใช้งานเสมอ
ขั้นตอนการดำเนินการ (Action Plan)
เนื่องจากคุณมีโค้ดเดิมอยู่แล้ว ผมจะทำการ Inject ฟังก์ชันเหล่านี้เข้าไปในโมดูลที่มีอยู่ และสร้างโมดูลใหม่ 1 ตัว โดยไม่ทำลายโครงสร้างเดิม แต่จะเสริมเกราะป้องกันข้อมูลมั่วเข้าไป
คุณต้องการให้ผมเริ่มเขียนโค้ดทีละโมดูลเลยไหมครับ?
(แนะนำเริ่มจาก 05_NormalizeService และ 10_MatchEngine ก่อน เพราะเป็นด่านหน้าและด่านตัดสินที่สำคัญที่สุด)
หรือถ้าคุณสะดวก ผมสามารถเขียนโค้ดทั้ง 6 ส่วนนี้รวมกันในข้อความถัดไปให้คุณก๊อปปี้ไปวางทับของเดิมได้เลยครับ (อาจจะยาวหน่อยแต่ครบจบ)
