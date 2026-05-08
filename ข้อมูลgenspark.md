ชื่อชีตและคอลัมน์ทั้งหมด
ชีต"SCGนครหลวงJWDภูมิภาค"
คอลัมน์"head"
คอลัมน์"ID_SCGนครหลวงJWDภูมิภาค"
คอลัมน์"วันที่ส่งสินค้า"
คอลัมน์"เวลาที่ส่งสินค้า"
คอลัมน์"จุดส่งสินค้าปลายทาง"
คอลัมน์"ชื่อ - นามสกุล"
คอลัมน์"ทะเบียนรถ"
คอลัมน์"Shipment No"
คอลัมน์"Invoice No"
คอลัมน์"รูปถ่ายบิลส่งสินค้า"
คอลัมน์"รหัสลูกค้า"
คอลัมน์"ชื่อเจ้าของสินค้า"
คอลัมน์"ชื่อปลายทาง"
คอลัมน์"Email พนักงาน"
คอลัมน์"LAT"
คอลัมน์"LONG"
คอลัมน์"ID_Doc_Return"
คอลัมน์"คลังสินค้า"
คอลัมน์"ที่อยู่ปลายทาง"
คอลัมน์"รูปสินค้าตอนส่ง"
คอลัมน์"รูปหน้าร้าน / บ้าน"
คอลัมน์"หมายเหตุ"
คอลัมน์"เดือน"
คอลัมน์"ระยะทางจากคลัง_Km"
คอลัมน์"ชื่อที่อยู่จาก_LatLong"
คอลัมน์"SM_Link_SCG"
คอลัมน์"ID_พนักงาน"
คอลัมน์"พิกัดตอนกดบันทึกงาน"
คอลัมน์"เวลาเริ่มกรอกงาน"
คอลัมน์"เวลาบันทึกงานสำเร็จ"
คอลัมน์"ระยะขยับจากจุดเริ่มต้น_เมตร"
คอลัมน์"ระยะเวลาใช้งาน_นาที"
คอลัมน์"ความเร็วการเคลื่อนที่_เมตร_นาที"
คอลัมน์"ผลการตรวจสอบงานส่ง"
คอลัมน์"เหตุผิดปกติที่ตรวจพบ"
คอลัมน์"เวลาถ่ายรูปหน้าร้าน_หน้าบ้าน"
คอลัมน์"SYNC_STATUS"

คอลัมน์พวกนี้ คุณน่าจะนำมาใช้งานได้ครับ
คอลัมน์"วันที่ส่งสินค้า" = ตรงตัวตามชื่อ
คอลัมน์"เวลาที่ส่งสินค้า"= ตรงตัวตามชื่อ
คอลัมน์"จุดส่งสินค้าปลายทาง" = ตัวเลขLatLong
คอลัมน์"ชื่อ - นามสกุล"= ตรงตัวตามชื่อ
คอลัมน์"Invoice No" = ตัวเลขใบส่งของ ของงานนั้น
คอลัมน์ ชื่อเจ้าของสินค้า" = ชื่อบริษัทที่ขายของ 
คอลัมน์"ชื่อปลายทาง" = ชื่อลูกค้าที่สั่งของ อันนี้แหละตัวปัญหา
คอลัมน์"LAT" = ตัวเลขละติจูด
คอลัมน์"LONG" = ตัวเลขลองจิจูด
คอลัมน์"ที่อยู่ปลายทาง" = ชื่อที่อยู่มั่วๆมาจากระบบ
คอลัมน์" ระยะทางจากคลัง_Km" = ตัวเลขระยะทางที่ห่างจากคลังต้นทางscgวังน้อย
คอลัมน์"ชื่อที่อยู่จาก_LatLong" = ชื่อที่อยู่ที่แปลงข้อมูลมาจากคอลัมน์"จุดส่งสินค้าปลายทาง" แปลงเป็นข้อความใช้scriptทำ

ชีตนี้คือ GoogleSheet
ต้องการทำผ่าน GoogleAppScriptครับ
ต้องการสร้างระบบฐานข้อมูลที่แข็งแกร่ง สะอาด สามารถนำมาใช้งานได้จริงๆ
ชีตSCGนครหลวงJWDภูมิภาค
ชีตนี้จะมีข้อมูลบันทึกเข้ามาทุกวัน LatLong ที่บันทึกเข้ามาคือจุดที่คนขับส่งงานจริงๆครับ โดยผ่านการกรองข้อมูลเบื้องต้นแล้วจากแอดมิน

การแก้ไขปัญหาทั้ง 8 ข้อนี้
1.เรื่องชื่อบุคคลซ้ำกัน
2.เรื่องชื่อสถานที่อยู่ซ้ำ
3.เรื่องLatLongซ้ำกัน
4.เรื่องบุคคลเดียวกันแต่ชื่อเขียนไม่เหมือนกัน หลายบริษัทส่งของก็พิมชื่อต่างกัน
5.เรื่องบุคคลคนละชื่อ แต่ชื่อสถานที่อยู่เดียวกัน
6.เรื่องบุคคลชื่อเดียวกัน แต่ชื่อสถานที่อยู่ไม่เหมือนกัน
7.เรื่องบุคคลชื่อเดียวกัน แต่เลข Lat Long คนละที่ ไม่เหมือนกัน
8.เรื่องบุคคล คนละชื่อ แต่ เลข Lat Long ที่เดียวกัน

การวิเคราะห์และแนวทาง จะต้องใช้งานสิ่งที่มีอยู่แล้วให้เกิดประโยชน์ 
ตอนนี้ผมต้องการรู้ว่าโปรเจกต์ใหม่นี้ มีกี่โมดูลโค๊ด และ ในแต่ละโมดูลโค๊ดมีฟังชั่นอะไรบ้าง และก็ ชื่อชีตว่ามีกี่ชีต ชื่อคอลัมน์อะไรบ้าง
ขอให้ช่วยอธิบาย ขอให้ช่วยทำแบบละเอียด ทุกขั้นตอนนะครับ
ได้ครับ ผมจะสรุปให้เป็น “แบบออกแบบระบบจริง” สำหรับทำด้วย Google Sheets + Google Apps Script โดยยึดข้อมูลจากชีตที่คุณมีอยู่ตอนนี้เป็นฐาน แล้วออกแบบให้รองรับปัญหา 8 ข้อที่คุณเจออยู่ให้ได้จริง

ภาพรวมสั้นที่สุดก่อน:

ตอนนี้จากข้อมูลที่คุณให้มา มี ชีตต้นทาง 1 ชีต คือ
SCGนครหลวงJWDภูมิภาค
และมี คอลัมน์ทั้งหมด 37 คอลัมน์

แต่ถ้าจะทำเป็น “ระบบฐานข้อมูลที่แข็งแรง สะอาด ใช้งานจริงได้” ผม ไม่แนะนำ ให้ใช้ชีตต้นทางนี้เป็นฐานข้อมูลหลักโดยตรง เพราะข้อมูลที่เข้ามาทุกวันจะมีความซ้ำ ความเพี้ยน และความคลุมเครือของชื่อ/สถานที่/พิกัด
แนวทางที่ถูกคือแยกเป็น 3 ชั้นข้อมูล คือ

Raw Data = เก็บข้อมูลดิบจากแอดมิน/คนขับ
Master Data = เก็บข้อมูลมาตรฐาน เช่น บุคคล สถานที่ พิกัด ปลายทาง
Fact / Review / Log = เก็บผลการจับคู่ ผลตรวจสอบ และประวัติการประมวลผล
1) โครงสร้างข้อมูลที่มีอยู่ตอนนี้
1.1 ชีตต้นทางที่มีอยู่
มี 1 ชีต คือ

SCGนครหลวงJWDภูมิภาค

1.2 คอลัมน์ทั้งหมดในชีต SCGนครหลวงJWDภูมิภาค
มี 37 คอลัมน์ดังนี้

ลำดับ	ชื่อคอลัมน์	ความหมาย / บทบาท
1	head	คอลัมน์ระบบ/หัวข้อมูล
2	ID_SCGนครหลวงJWDภูมิภาค	รหัสรายการของชีตต้นทาง
3	วันที่ส่งสินค้า	วันที่ส่งจริง
4	เวลาที่ส่งสินค้า	เวลาที่ส่งจริง
5	จุดส่งสินค้าปลายทาง	ค่า LatLong ของจุดส่ง
6	ชื่อ - นามสกุล	ชื่อบุคคลตามที่บันทึก
7	ทะเบียนรถ	ทะเบียนรถที่ใช้ส่ง
8	Shipment No	เลข Shipment
9	Invoice No	เลขใบส่งของของงานนั้น
10	รูปถ่ายบิลส่งสินค้า	รูปบิลส่งสินค้า
11	รหัสลูกค้า	รหัสลูกค้า
12	ชื่อเจ้าของสินค้า	ชื่อบริษัทเจ้าของสินค้า / บริษัทที่ขายของ
13	ชื่อปลายทาง	ชื่อลูกค้าที่สั่งของ / จุดปัญหาหลัก
14	Email พนักงาน	อีเมลพนักงาน
15	LAT	ค่าละติจูด
16	LONG	ค่าลองจิจูด
17	ID_Doc_Return	รหัสเอกสารคืน/อ้างอิง
18	คลังสินค้า	คลังต้นทาง
19	ที่อยู่ปลายทาง	ที่อยู่จากระบบ ซึ่งอาจมั่วหรือไม่สะอาด
20	รูปสินค้าตอนส่ง	รูปสินค้าขณะส่ง
21	รูปหน้าร้าน / บ้าน	รูปหน้าร้านหรือหน้าบ้าน
22	หมายเหตุ	หมายเหตุเพิ่มเติม
23	เดือน	เดือนของรายการ
24	ระยะทางจากคลัง_Km	ระยะทางจากคลังต้นทาง SCG วังน้อย
25	ชื่อที่อยู่จาก_LatLong	ข้อความที่แปลงจากจุดส่งสินค้าปลายทางด้วยสคริปต์
26	SM_Link_SCG	ลิงก์อ้างอิงระบบ
27	ID_พนักงาน	รหัสพนักงาน
28	พิกัดตอนกดบันทึกงาน	พิกัดตอนคนขับกดบันทึก
29	เวลาเริ่มกรอกงาน	เวลาเริ่มกรอกงาน
30	เวลาบันทึกงานสำเร็จ	เวลาบันทึกงานเสร็จ
31	ระยะขยับจากจุดเริ่มต้น_เมตร	ระยะเคลื่อนที่จากจุดเริ่มต้น
32	ระยะเวลาใช้งาน_นาที	เวลาที่ใช้ในการกรอกงาน
33	ความเร็วการเคลื่อนที่_เมตร_นาที	ความเร็วระหว่างทำรายการ
34	ผลการตรวจสอบงานส่ง	สถานะการตรวจสอบ
35	เหตุผิดปกติที่ตรวจพบ	ปัญหาที่ตรวจพบ
36	เวลาถ่ายรูปหน้าร้าน_หน้าบ้าน	เวลา 찍รูปหน้าสถานที่
37	SYNC_STATUS	สถานะ sync/ประมวลผล
2) ปัญหาหลักของข้อมูลชุดนี้
จากสิ่งที่คุณอธิบาย ปัญหาไม่ได้อยู่ที่ “แค่ชื่อซ้ำ” แต่เป็นปัญหาเชิงฐานข้อมูลแบบ Entity Resolution หรือการ “ระบุตัวตนของปลายทางให้ถูกต้อง” ซึ่งจริง ๆ มี 3 แกนหลักปนกันอยู่ตลอดเวลา คือ

บุคคล เช่น ชื่อปลายทาง, ชื่อผู้รับ, ชื่อลูกค้า
สถานที่/ที่อยู่ เช่น ร้าน, บ้าน, สาขา, บริษัท
พิกัด เช่น LAT/LONG หรือ LatLong text
เพราะฉะนั้น ถ้าเอาเพียงคอลัมน์ ชื่อปลายทาง ไปเป็นตัวหลัก ระบบจะพังแน่นอน
วิธีที่ถูกต้องคือ ต้องแยก “คน”, “สถานที่”, “พิกัด” ออกจากกันก่อน แล้วค่อยประกอบกลับมาเป็น “ปลายทางจริง”

3) แนวคิดฐานข้อมูลที่ถูกต้องสำหรับโปรเจกต์นี้
ผมแนะนำให้สร้างระบบใหม่เป็น 12 ชีต ภายในไฟล์ Google Sheets เดียวกันก่อน เพื่อให้เริ่มใช้งานจริงได้เร็ว และยังดูแลง่ายใน Google Apps Script

3.1 สรุปจำนวนชีตที่แนะนำ
ชีตทั้งหมดที่แนะนำ: 12 ชีต
SCGนครหลวงJWDภูมิภาค
M_PERSON
M_PERSON_ALIAS
M_PLACE
M_PLACE_ALIAS
M_GEO_POINT
M_DESTINATION
FACT_DELIVERY
Q_REVIEW
SYS_CONFIG
SYS_LOG
RPT_DATA_QUALITY
4) รายละเอียดแต่ละชีต และคอลัมน์ที่ควรมี
4.1 ชีตที่ 1: SCGนครหลวงJWDภูมิภาค
นี่คือ ชีตต้นทาง (Raw Source)
ยังคงใช้ชื่อเดิม และเก็บข้อมูลเดิม 37 คอลัมน์ทั้งหมด

บทบาท:
เก็บข้อมูลดิบที่เข้ามาทุกวัน ห้ามลบ ห้ามแก้เป็นฐานข้อมูลหลัก ห้ามใช้เป็น master โดยตรง

4.2 ชีตที่ 2: M_PERSON
ใช้เก็บ “บุคคลมาตรฐาน” หรือชื่อคนแบบ canonical

คอลัมน์ที่แนะนำ

ลำดับ	ชื่อคอลัมน์
1	person_id
2	person_name_canonical
3	person_name_normalized
4	first_seen_date
5	last_seen_date
6	usage_count
7	status
8	note
หน้าที่:
ถ้าชื่อ “สมชาย”, “นายสมชาย”, “คุณสมชาย”, “สมชาย ซื้อวัสดุ” สุดท้ายอาจเป็นคนเดียวกัน ก็จะมี person_id เดียว

4.3 ชีตที่ 3: M_PERSON_ALIAS
ใช้เก็บ “ชื่อเรียกอื่น” ของบุคคลเดียวกัน

คอลัมน์ที่แนะนำ

ลำดับ	ชื่อคอลัมน์
1	person_alias_id
2	person_id
3	alias_raw
4	alias_normalized
5	source_field
6	first_seen_date
7	last_seen_date
8	usage_count
9	active_flag
หน้าที่:
แก้ปัญหา “บุคคลเดียวกันแต่สะกดต่างกัน”

4.4 ชีตที่ 4: M_PLACE
ใช้เก็บ “สถานที่มาตรฐาน” เช่น ร้าน สาขา บ้าน บริษัท หน่วยงาน

คอลัมน์ที่แนะนำ

ลำดับ	ชื่อคอลัมน์
1	place_id
2	place_name_canonical
3	place_name_normalized
4	address_best
5	address_normalized
6	warehouse_default
7	first_seen_date
8	last_seen_date
9	usage_count
10	status
11	note
หน้าที่:
แยก “สถานที่” ออกจาก “คน”
เช่น ร้านเดียวกัน แต่มีคนรับหลายชื่อ ก็ยังเป็น place_id เดียวกันได้

4.5 ชีตที่ 5: M_PLACE_ALIAS
ใช้เก็บชื่อสถานที่แบบอื่น ๆ

คอลัมน์ที่แนะนำ

ลำดับ	ชื่อคอลัมน์
1	place_alias_id
2	place_id
3	alias_raw
4	alias_normalized
5	source_field
6	first_seen_date
7	last_seen_date
8	usage_count
9	active_flag
หน้าที่:
แก้ปัญหา “ชื่อสถานที่เดียวกัน แต่พิมพ์ไม่เหมือนกัน”
เช่น “ร้านช่างแดง”, “ช่างแดง”, “ช่างแดงวัสดุ”

4.6 ชีตที่ 6: M_GEO_POINT
ใช้เก็บ “พิกัดมาตรฐาน”

คอลัมน์ที่แนะนำ

ลำดับ	ชื่อคอลัมน์
1	geo_id
2	lat_raw
3	long_raw
4	lat_norm
5	long_norm
6	geo_key_6
7	geo_key_5
8	geo_key_4
9	address_from_latlong_best
10	first_seen_date
11	last_seen_date
12	usage_count
13	note
หน้าที่:
เก็บพิกัดจริง และรองรับการเทียบแบบ

จุดเดียวกันเป๊ะ
จุดใกล้กัน
จุดเดียวกันแต่ GPS แกว่งเล็กน้อย
4.7 ชีตที่ 7: M_DESTINATION
นี่คือหัวใจของระบบ

ใช้เก็บ “ปลายทางจริง” ที่ประกอบจาก
person_id + place_id + geo_id

คอลัมน์ที่แนะนำ

ลำดับ	ชื่อคอลัมน์
1	destination_id
2	person_id
3	place_id
4	geo_id
5	destination_label_canonical
6	destination_key
7	confidence_status
8	first_seen_date
9	last_seen_date
10	usage_count
11	note
หน้าที่:
ทำให้ตอบโจทย์กรณีซับซ้อน เช่น

คนเดียวกัน หลายสถานที่
สถานที่เดียวกัน หลายคน
พิกัดเดียวกัน แต่คนละชื่อ
ชื่อเดียวกัน แต่คนละพิกัด
4.8 ชีตที่ 8: FACT_DELIVERY
ใช้เก็บ “ธุรกรรมงานส่ง” ที่ผ่านการแม็ปแล้ว

คอลัมน์ที่แนะนำ

ลำดับ	ชื่อคอลัมน์
1	tx_id
2	source_sheet
3	source_row_number
4	source_record_id
5	delivery_date
6	delivery_time
7	shipment_no
8	invoice_no
9	owner_name
10	customer_code
11	raw_person_name
12	raw_place_name
13	raw_address
14	raw_lat
15	raw_long
16	person_id
17	place_id
18	geo_id
19	destination_id
20	warehouse
21	distance_km
22	driver_name
23	employee_id
24	employee_email
25	license_plate
26	validation_result
27	anomaly_reason
28	review_status
29	sync_status
30	created_at
31	updated_at
หน้าที่:
นี่คือชีตสำหรับทำรายงานจริง วิเคราะห์จริง ใช้งานจริง
ไม่ต้องวิ่งไปอ่าน raw ตรง ๆ ทุกครั้ง

4.9 ชีตที่ 9: Q_REVIEW
ใช้เก็บรายการที่ระบบยังไม่มั่นใจ ต้องรอคนตรวจ

คอลัมน์ที่แนะนำ

ลำดับ	ชื่อคอลัมน์
1	review_id
2	issue_type
3	source_record_id
4	source_row_number
5	invoice_no
6	raw_person_name
7	raw_place_name
8	raw_lat
9	raw_long
10	candidate_person_ids
11	candidate_place_ids
12	candidate_geo_ids
13	candidate_destination_ids
14	score
15	recommended_action
16	status
17	reviewer
18	reviewed_at
19	decision
20	note
หน้าที่:
เก็บเคสที่ระบบยังตัดสินไม่ได้ 100%

4.10 ชีตที่ 10: SYS_CONFIG
เก็บค่าตั้งค่าระบบ

คอลัมน์ที่แนะนำ

ลำดับ	ชื่อคอลัมน์
1	config_key
2	config_value
3	config_group
4	description
5	updated_at
ตัวอย่างค่า config

AUTO_MATCH_SCORE = 90
REVIEW_SCORE_MIN = 75
GEO_RADIUS_METER = 30
SOURCE_SHEET_NAME = SCGนครหลวงJWDภูมิภาค
4.11 ชีตที่ 11: SYS_LOG
เก็บประวัติการทำงานของสคริปต์

คอลัมน์ที่แนะนำ

ลำดับ	ชื่อคอลัมน์
1	log_id
2	run_id
3	created_at
4	level
5	module_name
6	function_name
7	ref_id
8	message
9	payload_json
หน้าที่:
ไว้ debug และตรวจสอบว่า script ทำอะไรไปบ้าง

4.12 ชีตที่ 12: RPT_DATA_QUALITY
เก็บสรุปคุณภาพข้อมูลในแต่ละวัน

คอลัมน์ที่แนะนำ

ลำดับ	ชื่อคอลัมน์
1	report_date
2	total_source_rows
3	processed_rows
4	new_person_count
5	new_place_count
6	new_geo_count
7	new_destination_count
8	auto_match_count
9	review_count
10	duplicate_alert_count
11	error_count
12	last_refresh_at
5) สรุปจำนวนโมดูลโค้ดที่แนะนำใน Google Apps Script
ถ้าจะทำแบบใช้งานจริงและดูแลง่าย ผมแนะนำ 15 โมดูลโค้ด (.gs files)

โมดูลที่ 1: 00_App.gs
เป็นจุดเริ่มต้นของระบบ

ฟังก์ชันที่ควรมี

onOpen()
runInitialSetup()
runDailyProcess()
runNightlyMaintenance()
reprocessSelectedRows()
หน้าที่:
สร้างเมนู เรียกงานตั้งค่า เรียก process รายวัน และงาน maintenance

โมดูลที่ 2: 01_Config.gs
จัดการค่าคงที่และค่าตั้งค่า

ฟังก์ชันที่ควรมี

getConfig(key)
getAllConfigs()
setConfig(key, value)
getThresholds()
getSheetNames()
หน้าที่:
อ่านค่า threshold, ชื่อชีต, radius, score ต่าง ๆ จาก SYS_CONFIG

โมดูลที่ 3: 02_Schema.gs
ตรวจสอบโครงสร้างชีต

ฟังก์ชันที่ควรมี

validateSourceSchema()
ensureSystemSheets()
createHeadersIfMissing()
getSourceColumnMap()
assertRequiredColumns()
หน้าที่:
เช็คว่าชีตต้นทางและชีตระบบมีหัวคอลัมน์ครบหรือไม่

โมดูลที่ 4: 03_SetupSheets.gs
สร้างชีตระบบครั้งแรก

ฟังก์ชันที่ควรมี

createSystemSheets()
setupSourceSheetProtection()
applyHeaderFormatting()
freezeHeaderRows()
seedInitialConfig()
หน้าที่:
สร้าง 11 ชีตระบบเพิ่มเติม พร้อมหัวตาราง และค่า config เริ่มต้น

โมดูลที่ 5: 04_SourceRepository.gs
จัดการการอ่านข้อมูลจากชีตต้นทาง

ฟังก์ชันที่ควรมี

getSourceRows()
getUnprocessedSourceRows()
mapRowToSourceObject(row)
markSourceRowProcessed(rowNumber)
updateSourceSyncStatus(rowNumber, status)
หน้าที่:
อ่านข้อมูลดิบจาก SCGนครหลวงJWDภูมิภาค ให้กลายเป็น object ใช้งานใน code

โมดูลที่ 6: 05_NormalizeService.gs
ทำความสะอาดและมาตรฐานข้อมูล

ฟังก์ชันที่ควรมี

normalizeThaiText(text)
normalizePersonName(name)
normalizePlaceName(name)
normalizeAddress(address)
normalizeLatLong(lat, lng)
buildGeoKeys(lat, lng)
buildFingerprint(data)
หน้าที่:
แปลงข้อมูลที่สะกดมั่ว เว้นวรรคแปลก ตัวพิมพ์ต่างกัน ให้เป็นรูปแบบมาตรฐานเดียวกัน

โมดูลที่ 7: 06_PersonService.gs
จัดการ master บุคคล

ฟังก์ชันที่ควรมี

findPersonCandidates(normalizedName)
scorePersonCandidate(input, candidate)
resolvePerson(sourceObj)
createPerson(canonicalName)
createPersonAlias(personId, aliasRaw, aliasNormalized)
updatePersonStats(personId)
หน้าที่:
หา person_id ที่ถูกต้อง หรือสร้างใหม่ถ้ายังไม่เคยมี

โมดูลที่ 8: 07_PlaceService.gs
จัดการ master สถานที่

ฟังก์ชันที่ควรมี

findPlaceCandidates(normalizedPlace, normalizedAddress)
scorePlaceCandidate(input, candidate)
resolvePlace(sourceObj)
createPlace(canonicalPlaceName, addressBest)
createPlaceAlias(placeId, aliasRaw, aliasNormalized)
updatePlaceStats(placeId)
หน้าที่:
รวมชื่อสถานที่หลายแบบให้เหลือ place_id เดียว

โมดูลที่ 9: 08_GeoService.gs
จัดการพิกัด

ฟังก์ชันที่ควรมี

buildGeoKey(lat, lng, precision)
findGeoCandidates(lat, lng)
resolveGeo(sourceObj)
createGeoPoint(lat, lng, geoKeys)
calcDistanceMeters(lat1, lng1, lat2, lng2)
clusterNearbyGeo(lat, lng)
หน้าที่:
ตัดสินว่าพิกัดนี้เป็นจุดเดิม จุดใกล้เคียง หรือจุดใหม่

โมดูลที่ 10: 09_DestinationService.gs
จัดการปลายทางจริง

ฟังก์ชันที่ควรมี

buildDestinationKey(personId, placeId, geoId)
findDestinationCandidates(personId, placeId, geoId)
resolveDestination(personId, placeId, geoId, sourceObj)
createDestination(personId, placeId, geoId, label)
updateDestinationStats(destinationId)
หน้าที่:
เชื่อม “คน + สถานที่ + พิกัด” ให้กลายเป็นปลายทางจริง 1 จุด

โมดูลที่ 11: 10_MatchEngine.gs
เป็นตัวตัดสินกลางของระบบ

ฟังก์ชันที่ควรมี

matchAllEntities(sourceObj)
calculateCompositeScore(result)
decideAutoMatchOrReview(result)
detectConflictType(result)
buildReviewPayload(result)
หน้าที่:
รวมผลจาก person/place/geo แล้วตัดสินว่า

auto match
create new
ส่งเข้า review
โมดูลที่ 12: 11_TransactionService.gs
จัดการการบันทึก fact งานส่ง

ฟังก์ชันที่ควรมี

buildFactRow(sourceObj, resolvedObj)
upsertFactDelivery(factObj)
preventDuplicateTransaction(sourceRecordId, invoiceNo)
saveProcessingResult(sourceObj, resolvedObj)
linkFactToMasters(factId, resolvedObj)
หน้าที่:
บันทึกผลลง FACT_DELIVERY แบบไม่ซ้ำ และพร้อมใช้งานรายงาน

โมดูลที่ 13: 12_ReviewService.gs
จัดการงานที่ต้องตรวจด้วยคน

ฟังก์ชันที่ควรมี

enqueueReview(reviewPayload)
getPendingReviews()
applyReviewDecision(reviewId, decision)
mergeMasterRecords(masterType, sourceId, targetId)
learnAliasFromReview(reviewId)
closeReviewItem(reviewId)
หน้าที่:
ให้คนช่วยตัดสินเคสที่ระบบไม่มั่นใจ และเรียนรู้กลับเข้าระบบ

โมดูลที่ 14: 13_ReportService.gs
ทำรายงานคุณภาพข้อมูล

ฟังก์ชันที่ควรมี

refreshQualityReport()
buildDuplicateReport()
buildConflictReport()
buildDailySummary()
writeReportSnapshot()
หน้าที่:
สรุปว่าแต่ละวันมีข้อมูลใหม่กี่รายการ ซ้ำกี่รายการ review กี่รายการ

โมดูลที่ 15: 14_Utils.gs
ฟังก์ชันช่วยเหลือทั่วไป

ฟังก์ชันที่ควรมี

uuid()
safeTrim(value)
safeString(value)
safeNumber(value)
safeDate(value)
withLock(callback)
writeLog(level, module, func, refId, message, payload)
chunkArray(arr, size)
หน้าที่:
ลดโค้ดซ้ำ และทำให้ระบบนิ่งขึ้น

6) วิธีที่ระบบนี้จะแก้ปัญหา 8 ข้อของคุณ
ปัญหา 1: ชื่อบุคคลซ้ำกัน
วิธีแก้:
ใช้ M_PERSON เป็นตัวกลาง
ถ้าชื่อ normalized แล้วเหมือนกัน หรือ review แล้วยืนยันว่าเป็นคนเดียวกัน ก็ผูกเข้า person_id เดียว

ปัญหา 2: ชื่อสถานที่อยู่ซ้ำ
วิธีแก้:
ใช้ M_PLACE และ M_PLACE_ALIAS
ชื่อร้าน/สถานที่หลายแบบจะถูก map ไป place_id เดียว

ปัญหา 3: LatLong ซ้ำกัน
วิธีแก้:
ใช้ M_GEO_POINT
ถ้า lat/long เท่ากันหรือใกล้กันตามรัศมีที่กำหนด ก็ใช้ geo_id เดียว

ปัญหา 4: บุคคลเดียวกันแต่ชื่อเขียนไม่เหมือนกัน
วิธีแก้:
ใช้ M_PERSON_ALIAS + normalization + review
เช่น “สมชาย”, “คุณสมชาย”, “ช่างสมชาย”, “สมชายวัสดุ”
สุดท้ายอาจถูก map เป็นคนเดียวกัน

ปัญหา 5: บุคคลคนละชื่อ แต่ชื่อสถานที่เดียวกัน
วิธีแก้:
ระบบจะไม่บังคับให้ 1 สถานที่มีได้แค่ 1 คน
เพราะใน M_DESTINATION สถานที่เดียวกัน (place_id เดียว) สามารถเชื่อมกับหลาย person_id ได้

ปัญหา 6: บุคคลชื่อเดียวกัน แต่ชื่อสถานที่ไม่เหมือนกัน
วิธีแก้:
1 คน (person_id) สามารถมีหลายสถานที่ (place_id)
จึงแยกเป็นหลาย destination_id

ปัญหา 7: บุคคลชื่อเดียวกัน แต่เลข Lat Long คนละที่
วิธีแก้:
คนเดียวกัน แต่คนละ geo_id ก็เป็นคนละปลายทาง
ระบบจะไม่ยุบมั่ว เพราะมี geo_id เป็นตัวช่วยตัดสิน

ปัญหา 8: บุคคลคนละชื่อ แต่เลข Lat Long ที่เดียวกัน
วิธีแก้:
พิกัดเดียวกัน (geo_id เดียว) ไม่ได้แปลว่าคนเดียวกัน
ระบบจะดูร่วมกับ person/place แล้วเก็บแยกใน M_DESTINATION

7) ลำดับการทำงานของระบบแบบละเอียด
ขั้นตอนที่ 1: เตรียมโครงสร้าง
สร้างชีตระบบทั้งหมด
วาง header ให้ครบ
ตั้ง config เริ่มต้น
ตรวจ schema ชีตต้นทาง
ขั้นตอนที่ 2: อ่านข้อมูลใหม่จากชีตต้นทาง
อ่านแถวที่ยังไม่ process
แปลงเป็น object ทีละแถว
เก็บ row number และ source id ไว้
ขั้นตอนที่ 3: ทำ normalization
ชื่อปลายทาง → ล้างช่องว่างซ้ำ ตัด prefix/suffix ที่ไม่จำเป็น
ชื่อสถานที่ → normalize
ที่อยู่ → normalize
LAT/LONG → ทำมาตรฐานเลข
สร้าง geo keys หลายระดับ
ขั้นตอนที่ 4: จับคู่บุคคล
ค้นใน M_PERSON_ALIAS
ถ้าตรงเป๊ะ → ใช้ person_id เดิม
ถ้าคล้ายมาก → ให้คะแนน
ถ้าไม่ชัด → ส่ง review
ถ้าใหม่จริง → สร้าง person_id ใหม่
ขั้นตอนที่ 5: จับคู่สถานที่
ค้นใน M_PLACE_ALIAS
ใช้ชื่อสถานที่ + ที่อยู่ + address from lat/long มาช่วย
ถ้ายังไม่ชัด → review
ถ้าใหม่จริง → create place ใหม่
ขั้นตอนที่ 6: จับคู่พิกัด
ตรวจ exact lat/long
ตรวจ geo key ระดับใกล้เคียง
ตรวจระยะห่างจริงเป็นเมตร
ถ้าใกล้เกณฑ์ → ใช้ geo เดิม
ถ้าไกลเกิน → สร้าง geo ใหม่
ขั้นตอนที่ 7: สร้าง/หา destination
เมื่อได้ person_id, place_id, geo_id แล้ว
ระบบจะเช็คว่าชุดนี้มี destination เดิมหรือไม่
ถ้ามี → reuse
ถ้าไม่มี → create destination ใหม่
ขั้นตอนที่ 8: บันทึกลง FACT_DELIVERY
เก็บข้อมูลธุรกรรมพร้อม master ids
กันซ้ำด้วย source_record_id / invoice_no / row number ตามกติกา
อัปเดต sync_status
ขั้นตอนที่ 9: ส่งรายการไม่ชัดเจนเข้า Q_REVIEW
ถ้าคะแนนไม่ถึงเกณฑ์ auto match
สร้าง review item
ให้แอดมินตัดสิน
ขั้นตอนที่ 10: เรียนรู้จาก review
ถ้าแอดมินบอกว่า alias นี้คือ person เดิม
ระบบเพิ่มเข้า M_PERSON_ALIAS
รอบหน้าเจออีกจะ auto ได้
ขั้นตอนที่ 11: สรุปคุณภาพข้อมูล
วันนี้มีข้อมูลเข้ากี่แถว
new person/place/geo เท่าไร
review กี่รายการ
error กี่รายการ
8) หลักการออกแบบที่ทำให้ระบบ “แข็งแกร่งและสะอาด”
8.1 ห้ามใช้ชีตต้นทางเป็น master โดยตรง
เพราะชีตต้นทางคือ raw data ไม่ใช่ clean data

8.2 ต้องมีรหัสกลางทุก entity
เช่น

PER000001
PLA000001
GEO000001
DST000001
TX000001
อย่าใช้ชื่อเป็น primary key

8.3 ต้องแยก canonical กับ alias
นี่คือหัวใจของงานนี้
เพราะโลกจริงชื่อเดียวกันเขียนได้หลายแบบ

8.4 ต้องมี review queue
ถ้าพยายาม auto ทุกเคส จะผิดง่าย
ระบบดีต้องมีพื้นที่สำหรับ “เคสกำกวม”

8.5 ต้องมี log
เวลา script พัง หรือจับคู่ผิด จะหาสาเหตุได้

8.6 ต้องมี scoring
ไม่ใช่เจอชื่อคล้ายแล้ว merge ทันที
ควรมีคะแนน เช่น

exact name match
alias match
same geo
same address
same place
ตัวอย่างตรรกะ:

คะแนน ≥ 90 = auto match
75–89 = review
< 75 = สร้างใหม่หรือรอ review ตามกติกา
8.7 ต้องมี destination master
ถ้าไม่มีชั้นนี้ คุณจะแก้ปัญหา 5, 6, 7, 8 ได้ไม่ครบ

9) สรุปคำตอบแบบตรงคำถาม
9.1 ตอนนี้มีชีตกี่ชีต
จากข้อมูลที่คุณให้มา ตอนนี้ยืนยันได้ว่า มี 1 ชีตต้นทาง คือ

SCGนครหลวงJWDภูมิภาค
9.2 ตอนนี้ชีตนี้มีคอลัมน์กี่คอลัมน์
มีทั้งหมด 37 คอลัมน์

9.3 ถ้าทำโปรเจกต์ใหม่ควรมีกี่ชีต
ผมแนะนำ 12 ชีต

SCGนครหลวงJWDภูมิภาค
M_PERSON
M_PERSON_ALIAS
M_PLACE
M_PLACE_ALIAS
M_GEO_POINT
M_DESTINATION
FACT_DELIVERY
Q_REVIEW
SYS_CONFIG
SYS_LOG
RPT_DATA_QUALITY
9.4 ถ้าทำใน Google Apps Script ควรมีกี่โมดูลโค้ด
ผมแนะนำ 15 โมดูลโค้ด

00_App.gs
01_Config.gs
02_Schema.gs
03_SetupSheets.gs
04_SourceRepository.gs
05_NormalizeService.gs
06_PersonService.gs
07_PlaceService.gs
08_GeoService.gs
09_DestinationService.gs
10_MatchEngine.gs
11_TransactionService.gs
12_ReviewService.gs
13_ReportService.gs
14_Utils.gs
10) ข้อสรุปเชิงออกแบบที่สำคัญที่สุด
สำหรับงานนี้
คอลัมน์ “ชื่อปลายทาง” ห้ามใช้เป็นตัวตัดสินหลักเพียงตัวเดียว
เพราะมันเป็นเพียงข้อความที่คนพิมพ์เข้ามา และเป็นจุดที่คุณบอกเองว่า “ตัวปัญหา”

ตัวที่ควรใช้ร่วมกันเป็นแกนกลางคือ

ชื่อปลายทาง → ใช้แยก person
ชื่อที่อยู่/สถานที่ → ใช้แยก place
LAT/LONG / จุดส่งสินค้าปลายทาง → ใช้แยก geo
แล้วประกอบเป็น destination master
นี่คือโครงสร้างที่จะทำให้ระบบ “สะอาด” และ “โตได้” โดยไม่พังในอีก 3–6 เดือนข้างหน้า

ในรอบถัดไป ผมสามารถทำต่อให้คุณได้เป็น 3 ส่วนทันที:

ผังความสัมพันธ์ตารางทั้งหมดแบบ database diagram
โครงสร้างไฟล์ Google Apps Script พร้อมชื่อฟังก์ชันครบ
โค้ด Apps Script ชุดเริ่มต้นสำหรับสร้างทุกชีตและ header อัตโนมัติ
รหัสไปรษณีย์ไทย.xlsx
237.79 KB
ตรรกะใหม่ที่ผมเพิ่มเข้าไป (Length Ratio): ต่อไปนี้ระบบจะ "เทียบสัดส่วนความยาวของข้อความด้วย"
ถ้าข้อความสั้นๆ แค่ 18 ตัวอักษร ("อ.ศรีราชา จ.ชลบุรี") ไปจับคู่กับที่อยู่ยาวๆ 60 ตัวอักษร
ระบบจะคำนวณสัดส่วนได้แค่ 30% และให้คะแนนแค่ 30 คะแนน (สอบตกทันที)
ผลคือ ระบบจะเลิกเหมาว่ามันคือที่เดียวกัน และจะไป "สร้าง Place ID ใหม่แยกให้แต่ละสาขา" อย่างถูกต้องครับ

🛠️ สิ่งที่ต้องทำต่อไป (เพื่อตัดสินใจ)
โดยปกติแล้วในคอลัมน์ S (decision) ผู้ดูแลระบบจะต้องเป็นคนตัดสินใจว่าจะทำอย่างไรกับข้อมูลนี้ เช่น จะบังคับให้ไปรวมกับข้อมูลเดิม หรือ จะให้มองว่าเป็นลูกค้า/พิกัดสถานที่แห่งใหม่เลย
แต่อย่างที่แจ้งไปก่อนหน้านี้ว่า ตอนนี้เรายังไม่มี "ปุ่มให้กด" เพื่อความสะดวกครับ
💡 ผมขอเสนอให้เพิ่มโค้ดเล็กน้อย เพื่อทำ "ระบบกดตัดสินใจ (Dropdown)" ให้คุณเลยดีไหมครับ? ถ้าเพิ่มโค้ดส่วนนี้เข้าไป:
ระบบจะสร้าง Dropdown (Data Validation) ในคอลัมน์ decision ให้คุณเลือกได้ง่ายๆ 3 ตัวเลือก:
🟢 CREATE_NEW (ให้ถือว่าเป็นข้อมูลใหม่ สร้างรหัส Master ใหม่เลย)
🔵 MERGE_TO_CANDIDATE (ให้ผูกข้อมูลนี้เข้ากับไอดีที่ระบบเดามาให้ - เป็นการสอนให้ AI ฉลาดขึ้น)
🔴 IGNORE (เพิกเฉย ไม่ประมวลผลข้อมูลนี้เพราะมั่วเกินไป)
เมื่อคุณกดเลือก Dropdown ปุ๊บ โค้ดจะทำงานอัตโนมัติ (onEdit) นำข้อมูลแถวนี้ไปปรับปรุงใน Master Data ทันที และกลับไปอัปเดตชีตต้นทางให้เป็น SUCCESS โดยที่คุณไม่ต้องทำอะไรเพิ่มเลย

ผมมีชีต ที่มีข้อมูลที่ถูกต้องของประเทศไทย 
คุณเอามาใช้อะไรได้มั้ย ผมจะเพิ่่มเข้ามาให้ครับ
ในช่องหมายเหตุก็ดีนะมีข้อมูลบอกด้วย 
ผมจะตั้งชื่อชีตว่า"SYS_TH_GEO"
และชื่อคอลัมน์ให้ผมเปลี่ยนให้ด้วยมั้ย
(A) รหัสไปรษณีย์
(B) แขวง/ตำบล
(C) เขต/อำเภอ
(D) จังหวัด
(E) หมายเหตุ

แล้วข้อมูลในช่องหมายเหตุ ผมต้องเอามาแปลงอะไรใหม่เพื่อให้ระบบเข้าใจจมั้ย
ตัวอย่าง
ทั้งแขวง(ยกเว้น ถนนสุขุมวิท ซอย 48/1, 48/2, 48/3, 48/4, 50 และถนนริมทางรถไฟเก่า หมู่ 1<บ้านเลขที่เลขคี่ ตั้งแต่ 6021-6689 และบ้านเลขที่เลขคู่ ตั้งแต่ 1928-2422> ใช้รหัส 10260)
เฉพาะ อาคารเพลินจิตเซ็นเตอร์ เท่านั้น
ทั้งแขวง(ยกเว้น ถนนสุขุมวิท ซอย 73, 75, 75/1, 77<บ้านเลขที่เป็นเลขคี่ ตั้งแต่ 1-299 และบ้านเลขที่เป็นเลขคู่ ตั้งแต่ 2-252> และถนนสุขุมวิท ซอย 77/1, 79, 81 ใช้รหัส 10260)
เฉพาะ อาคารลุมพินีทาวเวอร์ เท่านั้น


ระบบนี้ ผมจะต้องทำอะไรต่อมััย หรือ ต้องเพิ่ม script มั้ย เพิ่่มฟังชั่นอะไรใหม่ๆมั้ย
ผมต้องการสร้างระบบเก็บข้อมูล ชื่อลูกค้า ชื่อที่อยู่ลูกค้า ละติจูด ลองจิจูด ที่ส่่งสินค้า
และทำความสะอาดข้อมูล เพื่อทำการแก้ไขปัญหาทั้ง8ข้อ 
และ สามารถนำกลับมาใช้งานใหม่ได้จจริงๆ มีคความแม่นยำ
เพราะว่าอีกซักพัก ถ้าระบบนิ่่งแล้ว  ผมจะเพิ่มอีก 1 ชีต คือชีตที่ต้องการนำLatLongที่เเราเก็บมา ไปใช้ โดยจะตรวจเช็คกับชื่อลูกค้า ชื่อที่อยู่ลูกค้า ค้นหาแบบที่เราแก้ไไขปัญหาทั้ง8ข้อแล้ว
คุณมีอะไรแนะนำเพิ่มเติม มั้ยครับ
ช่วยวิเคราะห์ไฟล์โครงสร้างโปรเจค แบบละเอียดและทำต่อ 3 ส่วนให้ผมด้วย:
1.ผังความสัมพันธ์ตารางทั้งหมดแบบ database diagram
2.โครงสร้างไฟล์ Google Apps Script พร้อมชื่อฟังก์ชันครบ
3.โมดูลโค้ด Apps Script แบบครบทุกโมดูล ทุกฟังชั่น แบบสมบูรณ์100% ให้ผมสามารถ copy-pass ได้เลยนะครับ
และขอเพิ่มเติม
ช่วยทำให้มีระบบตัดก่อนที่จะรันเกินเวลาได้มั้ย
และถ้าผมกดประมวลผลข้อมูลใหม่ ระบบจะทำต่อจากที่ทำไปแล้ว หรือ จะต้องเริ่มต้นแถวแรกใหม่
และช่วยเน้นตรง โค๊ด 8 ข้อปัญหาให้ด้วยนะครับ ผมต้องการให้ระบบนี้ แข็งแรง สะอาด ฉลาด นำกลับมาใช้งานได้จริงๆ
กำลังใช้เครื่องมือ
|
Download File
thai_postcodes.xlsx → /home/user/downloads
ดู
📥
File Downloaded
Filename:
thai_postcodes.xlsx
Directory:
/home/user/downloads
Path:
/home/user/downloads/thai_postcodes.xlsx
Size:
237.79 KB
Source:
https://www.genspark.ai/api/files/s/AUDE55q2
กำลังใช้เครื่องมือ
|
Write File
/home/user/inspect_xlsx.py
ดู
import json
from openpyxl import load_workbook
from collections import Counter
...
        'data_row_count': count,
        'sample_rows': samples,
        'top_note_examples': note_examples,
    })
print(json.dumps(result, ensure_ascii=False, indent=2))
กำลังใช้เครื่องมือ
|
Bash Command
python3 /home/user/inspect_xlsx.py
ดู
{
  "sheet_names": [
    "Sheet1"
...
      ]
    }
  ]
}
Exit Code: 0
กำลังใช้เครื่องมือ
|
Bash Command
ดู
Exit Code: unknown
ได้ครับ — รอบนี้ผมจะตอบแบบ “เอาไปทำงานต่อได้จริง” และผมจะตอบให้ครบตามที่คุณขอเป็น 3 ส่วนใหญ่ ๆ พร้อมคำแนะนำเชิงระบบด้วย

ก่อนอื่น สรุปสั้นที่สุดก่อน:

ไฟล์ รหัสไปรษณีย์ไทย.xlsx ที่คุณส่งมา ใช้ได้ครับ และ “ควรเอามาใช้” แน่นอน เพราะมันช่วยให้ระบบรู้บริบท ตำบล/อำเภอ/จังหวัด/รหัสไปรษณีย์ และช่วยแยกปลายทางที่ชื่อคล้ายกันแต่คนละพื้นที่ได้ดีขึ้นมาก โดยไฟล์นี้มี 1 worksheet, มี 7,537 แถวข้อมูล และ header ตรงกับที่คุณเสนอคือ รหัสไปรษณีย์ / แขวง-ตำบล / เขต-อำเภอ / จังหวัด / หมายเหตุ Source

ภาพรวมคำตอบสั้น ๆ ก่อนลงรายละเอียด
1) ชีต SYS_TH_GEO ใช้ได้ไหม
ใช้ได้ และ ควรเพิ่ม เข้าโปรเจกต์

2) ต้องเปลี่ยนชื่อคอลัมน์ไหม
ใช่ — แนะนำให้ตั้งตามนี้เลย

A = รหัสไปรษณีย์
B = แขวง/ตำบล
C = เขต/อำเภอ
D = จังหวัด
E = หมายเหตุ
แล้วให้สคริปต์เติมคอลัมน์ระบบเพิ่มเองด้านขวา ไม่ต้องพิมพ์เอง

3) ช่อง “หมายเหตุ” ต้องแปลงเองไหม
ไม่ต้องแปลงเองด้วยมือ แต่ ควรให้สคริปต์ช่วย parse เป็นข้อมูลระบบเพิ่ม เช่น

note_type
include_keywords
exclude_keywords
postcode_override
parse_confidence
พูดง่าย ๆ คือ:

คอลัมน์ E เก็บ ข้อความดิบจริง
ระบบสร้างคอลัมน์ช่วยวิเคราะห์เพิ่มเอง
4) ระบบต้องเพิ่ม script อะไรใหม่
ต้องเพิ่มแน่นอน โดยเฉพาะ 5 ส่วนนี้

SYS_TH_GEO index builder
length ratio scoring
review dropdown + onEdit workflow
time guard / checkpoint resume
future lookup API สำหรับชีตค้นหา LatLong ในอนาคต
5) ถ้ารันไม่จบภายในเวลา Apps Script จะทำยังไง
เราจะทำ ระบบตัดก่อนหมดเวลา และ บันทึก checkpoint พอกดรันใหม่ หรือให้ trigger รันต่อ มันจะ เริ่มต่อจากแถวล่าสุด ไม่ย้อนกลับไปแถวแรก

คำแนะนำสำคัญมากเรื่อง SYS_TH_GEO
ตั้งชื่อชีต
ให้ตั้งชื่อเป็น:

SYS_TH_GEO

ตั้งชื่อคอลัมน์ 5 ตัวแรก
ตามนี้เลย

คอลัมน์	ชื่อ
A	รหัสไปรษณีย์
B	แขวง/ตำบล
C	เขต/อำเภอ
D	จังหวัด
E	หมายเหตุ
แล้วให้สคริปต์สร้างคอลัมน์เพิ่มอัตโนมัติ
แนะนำเพิ่มคอลัมน์ระบบด้านขวาเป็น

คอลัมน์	ชื่อ
F	postcode_text
G	subdistrict_norm
H	district_norm
I	province_norm
J	note_type
K	note_keywords
L	postcode_override
M	geo_key
N	active_flag
ข้อสรุปเรื่อง “หมายเหตุ” ที่สำคัญมาก
ตัวอย่างเช่น

เฉพาะ อาคารเพลินจิตเซ็นเตอร์ เท่านั้น
ทั้งแขวง(ยกเว้น ... ใช้รหัส 10260)
เฉพาะ หมู่ 1-7
บ้านเลขที่เลขคี่/เลขคู่ ...
สิ่งที่ควรรู้
ข้อความพวกนี้มีประโยชน์มาก แต่ต้องเข้าใจก่อนว่า:

ใช้ได้ทันที
แยก “เฉพาะอาคาร”
แยก “เฉพาะหมู่”
แยก “ทั้งพื้นที่ยกเว้น...”
แยก “มีรหัสไปรษณีย์ override”
ใช้ได้บางส่วน
กฎบ้านเลขที่เลขคี่/เลขคู่
เพราะถ้าชีตต้นทางของคุณ ไม่มี house number ที่ชัด ระบบจะเอาไปตัดสินแบบ 100% ไม่ได้
คำแนะนำที่ถูก
ดังนั้น อย่าแปลงหมายเหตุด้วยมือ ให้ทำแบบนี้แทน:

เก็บข้อความดิบไว้ใน หมายเหตุ
ให้สคริปต์ parse เป็นชนิดของหมายเหตุ
ใช้ผล parse เพื่อ “ช่วย scoring / review”
อย่าใช้หมายเหตุเป็นตัวตัดสินเด็ดขาดเพียงตัวเดียว
สิ่งที่ผมแนะนำเพิ่มเติมจากโจทย์ของคุณ
คุณกำลังสร้างระบบที่จริง ๆ แล้วไม่ใช่แค่ clean data ธรรมดา
แต่มันคือระบบ Master Data + Entity Resolution + Geo Matching + Human Review

ถ้าจะให้ “นิ่ง ใช้ได้จริง และเอาไปต่อยอดชีตค้นหา LatLong ในอนาคตได้”
ผมแนะนำให้โครงสร้างโปรเจกต์เป็นแบบนี้

ส่วนที่ 1: ผังความสัมพันธ์ตารางทั้งหมดแบบ Database Diagram
ชีตทั้งหมดที่แนะนำ
SCGนครหลวงJWDภูมิภาค = raw source
SYS_TH_GEO = master ภูมิศาสตร์ไทย
M_PERSON
M_PERSON_ALIAS
M_PLACE
M_PLACE_ALIAS
M_GEO_POINT
M_DESTINATION
FACT_DELIVERY
Q_REVIEW
SYS_CONFIG
SYS_PROGRESS
SYS_LOG
RPT_DATA_QUALITY
Database Diagram แบบ Mermaid
คัดลอก block นี้ไปเก็บในเอกสารได้เลย

creates

may_generate

has

has

links

links

links

used_by

enriches

enriches

SCG_RAW

string

ID_SCGนครหลวงJWDภูมิภาค

date

วันที่ส่งสินค้า

time

เวลาที่ส่งสินค้า

string

จุดส่งสินค้าปลายทาง

string

ชื่อปลายทาง

string

ที่อยู่ปลายทาง

number

LAT

number

LONG

string

SYNC_STATUS

FACT_DELIVERY

string

fact_id

string

source_sheet

number

source_row

string

invoice_no

string

raw_person_name

string

raw_place_name

string

raw_address

number

lat

number

lng

string

person_id

string

place_id

string

geo_id

string

destination_id

string

result_status

string

problem_flags

Q_REVIEW

string

review_id

string

issue_type

number

source_row

string

candidate_json

string

decision

string

status

string

apply_result

M_PERSON

string

person_id

string

canonical_name

string

normalized_name

string

status

M_PERSON_ALIAS

string

alias_id

string

person_id

string

alias_raw

string

alias_norm

M_PLACE

string

place_id

string

canonical_name

string

normalized_name

string

canonical_address

string

normalized_address

string

geo_hint

M_PLACE_ALIAS

string

alias_id

string

place_id

string

alias_raw

string

alias_norm

M_DESTINATION

string

destination_id

string

person_id

string

place_id

string

geo_id

string

label

string

status

M_GEO_POINT

string

geo_id

number

lat

number

lng

string

geo_key6

string

geo_key5

string

geo_key4

SYS_TH_GEO

string

รหัสไปรษณีย์

string

แขวง_ตำบล

string

เขต_อำเภอ

string

จังหวัด

string

หมายเหตุ

string

note_type

string

note_keywords

string

postcode_override

string

geo_key

Copy
ส่วนที่ 2: โครงสร้างไฟล์ Google Apps Script พร้อมชื่อฟังก์ชันครบ
ผมแนะนำให้ใช้ 8 โมดูลหลัก แบบนี้
เพื่อให้ดูแลง่าย และยังไม่แตกย่อยเกินไป

1) 00_CONFIG.gs
หน้าที่
เก็บค่าคงที่ทั้งหมดของระบบ

ฟังก์ชัน/ตัวแปรหลัก
APP
APP.SHEETS
APP.HEADERS
APP.PROCESS
APP.REVIEW_DECISIONS
2) 01_UTILS.gs
หน้าที่
เครื่องมือกลางที่ทุกโมดูลใช้ร่วมกัน

ฟังก์ชัน
ss_()
sh_(name)
ensureSheet_(name, headers)
ensureHeaders_(sheet, headers)
sheetObjects_(sheetName)
appendObject_(sheetName, obj, headers)
nowStr_()
newId_(prefix)
toNum_(v)
normText_(v)
normArea_(v)
tokenize_(s)
jaccard_(a, b)
diceCoeff_(a, b)
lengthRatio_(a, b)
similarity_(a, b)
addressScore_(a, b)
parseLatLng_(text)
distanceMeters_(lat1, lng1, lat2, lng2)
writeLog_(level, module, func, refId, message, payload)
getProgress_()
setProgress_(obj)
clearProgress_()
3) 02_SETUP.gs
หน้าที่
สร้างชีต, วาง header, seed config, build index ของ SYS_TH_GEO

ฟังก์ชัน
onOpen()
setupProject()
seedConfig_()
setupReviewValidation_()
rebuildThaiGeoIndex()
deriveThaiGeoIndexRow_(row)
4) 03_MASTER.gs
หน้าที่
โหลด master data เข้าหน่วยความจำ และสร้าง master ใหม่เมื่อจำเป็น

ฟังก์ชัน
buildContext_()
createPerson_(ctx, rawName, normName)
createPersonAlias_(ctx, personId, rawName, normName, source)
createPlace_(ctx, rawName, normName, rawAddress, normAddress, geoHint)
createPlaceAlias_(ctx, placeId, rawName, normName, source)
createGeo_(ctx, lat, lng, addressBest)
getOrCreateDestination_(ctx, personId, placeId, geoId, label)
5) 04_MATCH_ENGINE.gs
หน้าที่
ใช้แก้โจทย์ 8 ข้อโดยตรง

ฟังก์ชัน
getRawColumnMap_()
mapSourceRow_(row, rowNum, colMap)
detectThaiGeo_(ctx, text)
findBestPerson_(ctx, rawPerson)
findBestPlace_(ctx, rawPlace, rawAddress, geoResult, thGeo)
findBestGeo_(ctx, lat, lng)
detectProblemFlags_(person, place, geo)
resolveRow_(ctx, src, options)
6) 05_PROCESS.gs
หน้าที่
ประมวลผลข้อมูลใหม่, checkpoint, resume, time guard

ฟังก์ชัน
runProcessNewRows()
runProcessFromCheckpoint()
resetCheckpoint()
processRows_(startRow)
upsertFact_(ctx, src, resolved, reviewId)
enqueueReview_(src, resolved)
markRawSyncStatus_(rowNum, status)
scheduleResume_()
deleteResumeTriggers_()
7) 06_REVIEW_UI.gs
หน้าที่
ระบบ dropdown + onEdit + ตัดสินใจ review

ฟังก์ชัน
onEdit(e)
handleReviewDecision_(rowNum)
applyCreateNew_(review)
applyMergeToCandidate_(review)
applyIgnore_(review)
updateReviewRowResult_(rowNum, status, result)
8) 07_REPORT_LOOKUP.gs
หน้าที่
สรุปรายงาน และทำ API สำหรับชีตค้นหา LatLong ในอนาคต

ฟังก์ชัน
refreshQualityReport()
lookupBestDestination(customerName, customerAddress, lat, lng)
testLookup_()
ส่วนที่ 3: โมดูลโค้ด Apps Script แบบ copy-paste
ด้านล่างนี้เป็นชุด v1 production-ready ที่ออกแบบให้

รองรับปัญหา 8 ข้อ
มี SYS_TH_GEO
มี length ratio
มี review dropdown
มี timeout guard
มี checkpoint resume
มี future lookup function
หมายเหตุสำคัญ: ชุดนี้เป็นโครงสร้าง “ใช้งานจริงได้” และ “ขยายต่อได้”
ผมตั้งใจเขียนให้คัดลอกลง Apps Script ได้เป็นไฟล์ ๆ

00_CONFIG.gs
Copyconst APP = {
  VERSION: '1.0.0',
  TZ: 'Asia/Bangkok',
  SHEETS: {
    RAW: 'SCGนครหลวงJWDภูมิภาค',
    TH_GEO: 'SYS_TH_GEO',
    PERSON: 'M_PERSON',
    PERSON_ALIAS: 'M_PERSON_ALIAS',
    PLACE: 'M_PLACE',
    PLACE_ALIAS: 'M_PLACE_ALIAS',
    GEO: 'M_GEO_POINT',
    DEST: 'M_DESTINATION',
    FACT: 'FACT_DELIVERY',
    REVIEW: 'Q_REVIEW',
    CONFIG: 'SYS_CONFIG',
    PROGRESS: 'SYS_PROGRESS',
    LOG: 'SYS_LOG',
    REPORT: 'RPT_DATA_QUALITY'
  },
  REQUIRED_RAW_COLS: [
    'ID_SCGนครหลวงJWDภูมิภาค',
    'วันที่ส่งสินค้า',
    'เวลาที่ส่งสินค้า',
    'จุดส่งสินค้าปลายทาง',
    'ชื่อ - นามสกุล',
    'Shipment No',
    'Invoice No',
    'รหัสลูกค้า',
    'ชื่อเจ้าของสินค้า',
    'ชื่อปลายทาง',
    'Email พนักงาน',
    'LAT',
    'LONG',
    'คลังสินค้า',
    'ที่อยู่ปลายทาง',
    'ระยะทางจากคลัง_Km',
    'ชื่อที่อยู่จาก_LatLong',
    'ID_พนักงาน',
    'ผลการตรวจสอบงานส่ง',
    'เหตุผิดปกติที่ตรวจพบ',
    'SYNC_STATUS'
  ],
  REVIEW_DECISIONS: ['CREATE_NEW', 'MERGE_TO_CANDIDATE', 'IGNORE'],
  PROCESS: {
    MAX_MS: 320000,
    CHECK_EVERY: 15,
    BATCH_SIZE: 150,
    AUTO_SCORE: 85,
    REVIEW_SCORE: 55,
    GEO_RADIUS_M: 30
  },
  HEADERS: {
    TH_GEO: [
      'รหัสไปรษณีย์','แขวง/ตำบล','เขต/อำเภอ','จังหวัด','หมายเหตุ',
      'postcode_text','subdistrict_norm','district_norm','province_norm',
      'note_type','note_keywords','postcode_override','geo_key','active_flag'
    ],
    PERSON: [
      'person_id','canonical_name','normalized_name','first_seen','last_seen',
      'usage_count','status','note'
    ],
    PERSON_ALIAS: [
      'alias_id','person_id','alias_raw','alias_norm','source',
      'created_at','last_seen','usage_count','active_flag'
    ],
    PLACE: [
      'place_id','canonical_name','normalized_name','canonical_address',
      'normalized_address','geo_hint','first_seen','last_seen',
      'usage_count','status','note'
    ],
    PLACE_ALIAS: [
      'alias_id','place_id','alias_raw','alias_norm','source',
      'created_at','last_seen','usage_count','active_flag'
    ],
    GEO: [
      'geo_id','lat','lng','lat6','lng6','geo_key6','geo_key5','geo_key4',
      'address_best','first_seen','last_seen','usage_count','status','note'
    ],
    DEST: [
      'destination_id','person_id','place_id','geo_id','label',
      'status','first_seen','last_seen','usage_count','note'
    ],
    FACT: [
      'fact_id','source_sheet','source_row','source_record_id','invoice_no',
      'shipment_no','delivery_date','delivery_time','owner_name','customer_code',
      'raw_person_name','raw_place_name','raw_address','lat','lng',
      'person_id','place_id','geo_id','destination_id','driver_name',
      'employee_id','employee_email','warehouse','distance_km',
      'result_status','problem_flags','review_id','sync_status',
      'created_at','updated_at'
    ],
    REVIEW: [
      'review_id','created_at','status','issue_type','source_sheet',
      'source_row','source_record_id','invoice_no','raw_person_name',
      'raw_place_name','raw_address','raw_lat','raw_long','candidate_json',
      'recommended_action','score','problem_flags','note','decision',
      'decision_by','decision_at','apply_result'
    ],
    CONFIG: ['config_key','config_value','config_group','description'],
    PROGRESS: ['progress_key','progress_value','updated_at'],
    LOG: ['log_id','created_at','level','module','func','ref_id','message','payload_json'],
    REPORT: [
      'report_date','total_raw','processed','success','review','error',
      'new_person','new_place','new_geo','new_destination','last_run'
    ]
  }
};
Copy
01_UTILS.gs
Copyfunction ss_() { return SpreadsheetApp.getActiveSpreadsheet(); }
function sh_(name) {
  const s = ss_().getSheetByName(name);
  if (!s) throw new Error('Sheet not found: ' + name);
  return s;
}
function ensureSheet_(name, headers) {
  const ss = ss_();
  let s = ss.getSheetByName(name);
  if (!s) s = ss.insertSheet(name);
  ensureHeaders_(s, headers);
  return s;
}
function ensureHeaders_(sheet, headers) {
  const nowHeaders = sheet.getLastColumn() > 0 ? sheet.getRange(1,1,1,Math.max(sheet.getLastColumn(), headers.length)).getValues()[0] : [];
  let changed = false;
  headers.forEach(function(h, i) {
    if (nowHeaders[i] !== h) {
      sheet.getRange(1, i + 1).setValue(h);
      changed = true;
    }
  });
  if (changed) sheet.setFrozenRows(1);
}
function sheetObjects_(sheetName) {
  const s = sh_(sheetName);
  const values = s.getDataRange().getValues();
  if (values.length < 2) return [];
  const headers = values[0];
  return values.slice(1).filter(r => r.join('') !== '').map(function(r, idx) {
    const o = {_row: idx + 2};
    headers.forEach((h, i) => o[h] = r[i]);
    return o;
  });
}
function appendObject_(sheetName, obj, headers) {
  const s = sh_(sheetName);
  const row = headers.map(h => obj[h] !== undefined ? obj[h] : '');
  s.appendRow(row);
  return s.getLastRow();
}
function nowStr_() { return Utilities.formatDate(new Date(), APP.TZ, 'yyyy-MM-dd HH:mm:ss'); }
function newId_(prefix) { return prefix + '_' + Utilities.getUuid().slice(0, 8).toUpperCase(); }
function toNum_(v) {
  if (v === '' || v === null || v === undefined) return '';
  const n = Number(v);
  return isNaN(n) ? '' : n;
}
function normText_(v) {
  if (v === null || v === undefined) return '';
  return String(v)
    .replace(/[“”"']/g,'')
    .replace(/[()（）【】\[\],.;:\/\\\-]/g,' ')
    .replace(/\s+/g,' ')
    .trim()
    .toLowerCase();
}
function normArea_(v) {
  return normText_(v)
    .replace(/^แขวง/,'')
    .replace(/^ตำบล/,'')
    .replace(/^เขต/,'')
    .replace(/^อำเภอ/,'')
    .replace(/^จังหวัด/,'')
    .replace(/^จ\./,'')
    .replace(/^อ\./,'')
    .replace(/^ต\./,'')
    .trim();
}
function tokenize_(s) { return normText_(s).split(' ').filter(Boolean); }
function jaccard_(a, b) {
  const sa = new Set(tokenize_(a)), sb = new Set(tokenize_(b));
  if (!sa.size && !sb.size) return 100;
  const inter = [...sa].filter(x => sb.has(x)).length;
  const union = new Set([...sa, ...sb]).size || 1;
  return Math.round((inter / union) * 100);
}
function diceCoeff_(a, b) {
  a = normText_(a); b = normText_(b);
  if (!a && !b) return 100;
  if (!a || !b) return 0;
  function bigrams(s) {
    if (s.length < 2) return [s];
    const arr = [];
    for (let i = 0; i < s.length - 1; i++) arr.push(s.slice(i, i + 2));
    return arr;
  }
  const aa = bigrams(a), bb = bigrams(b);
  const used = new Array(bb.length).fill(false);
  let inter = 0;
  aa.forEach(x => {
    const idx = bb.findIndex((y, i) => !used[i] && y === x);
    if (idx >= 0) { used[idx] = true; inter++; }
  });
  return Math.round((2 * inter / (aa.length + bb.length)) * 100);
}
function lengthRatio_(a, b) {
  a = normText_(a); b = normText_(b);
  if (!a && !b) return 1;
  if (!a || !b) return 0;
  return Math.min(a.length, b.length) / Math.max(a.length, b.length);
}
function similarity_(a, b) {
  return Math.round((jaccard_(a, b) * 0.45 + diceCoeff_(a, b) * 0.55) * 100) / 100;
}
function addressScore_(a, b) {
  const base = similarity_(a, b);
  const ratio = lengthRatio_(a, b);
  return Math.round(Math.min(base, ratio * 100) * 100) / 100;
}
function parseLatLng_(text) {
  if (!text) return {lat:'', lng:''};
  const m = String(text).match(/(-?\d+\.\d+)\s*,\s*(-?\d+\.\d+)/);
  return m ?Copy
ข้อมูลที่ได้มา ทั้งชื่อบุคคล ทั้งชื่อสถานที่ มันมาแบบมั่วๆ ครบบ้าง ไม่ครบบ้าง ตัดคำมามั่วๆครับ ทำมาแบบไม่ใส่ใจ ให้สูตรตัดคำแต่ไม่ตรวจสอบ ผมจึงอยากจะพัฒนาระบบเอง แค่ข้อมูลที่ได้มามัน ไม่ดีเท่าไหร่ครับ  จึงอยากจะเน้นย้ำเรื่องตรงนี้แหละ  และขอถามต่อครับ ระบบคุณเป็นอะไรหรือป่าว ผมเห็นว่าคุณส่งโค๊ดมา2ไฟล์ 1. 00_CONFIG.gs ,2. 01_UTILS.gs และ ไฟล์ที่2 เหมือนจะยังไม่สมบูรณ์ด้วยนะ ช่วยทำให้ครบด้วยนะครับ
ได้ครับ — และต้องขออภัยตรง ๆ เลย
รอบที่แล้วคำตอบ ส่งไม่ครบจริง ครับ ไม่ใช่ว่าระบบพัง แต่เป็นเพราะข้อความยาวมาก เลยออกมาแค่ 00_CONFIG.gs กับ 01_UTILS.gs แถม 01_UTILS.gs ก็ถูกตัดกลางฟังก์ชันอีก แบบนี้เอาไปใช้ต่อไม่ได้จริง คุณทักถูกแล้วครับ

และผมเข้าใจประเด็นสำคัญของคุณชัดมากว่า:

ข้อมูล ชื่อบุคคล มั่ว
ข้อมูล ชื่อสถานที่ / ที่อยู่ มั่ว
ข้อมูลบางแถว ไม่ครบ
บางแถว ตัดคำมาแปลก ๆ
บางแถว ชื่อเหมือนกันแต่คนละสถานที่
บางแถว คนละชื่อแต่พิกัดเดียวกัน
บางแถว ข้อความสั้นมาก แต่ระบบเดิมชอบเหมารวม
ดังนั้นระบบที่ผมให้ต่อจากนี้ จะเน้นหลัก 6 อย่างนี้เป็นพิเศษ:

ไม่ merge ง่ายเกินไป
ลงโทษข้อความสั้นด้วย Length Ratio
ใช้ Lat/Long ช่วยตัดสิน แต่ไม่ใช้เดี่ยว ๆ แบบมั่ว
แยก Person / Place / Geo / Destination ออกจากกัน
มี Review Queue + Dropdown ตัดสินใจ
มี Checkpoint และ Resume ต่อจากงานเดิม ไม่ย้อนเริ่มใหม่
ด้านล่างนี้คือชุดโค้ด ครบทุกไฟล์หลัก แบบต่อเนื่องให้คุณ copy-paste ลง Google Apps Script ได้เลย

สิ่งที่คุณต้องมีก่อนวางโค้ด
ชีตหลัก
SCGนครหลวงJWDภูมิภาค
ชีตภูมิศาสตร์ไทย
SYS_TH_GEO
โดย SYS_TH_GEO ให้มี 5 คอลัมน์แรกแบบนี้:

A	B	C	D	E
รหัสไปรษณีย์	แขวง/ตำบล	เขต/อำเภอ	จังหวัด	หมายเหตุ
ไฟล์รหัสไปรษณีย์ไทยที่คุณส่งมา ใช้ได้ครับ และโครงสร้างตรงกับที่คุณจะใช้ Source

โครงสร้างไฟล์ Apps Script ที่ให้ครบในรอบนี้
00_CONFIG.gs
01_UTILS.gs
02_SETUP.gs
03_MASTER.gs
04_MATCH_ENGINE.gs
05_PROCESS.gs
06_REVIEW_UI.gs
07_REPORT_LOOKUP.gs
1) 00_CONFIG.gs
Copyconst APP = {
  VERSION: '1.0.0',
  TZ: 'Asia/Bangkok',

  SHEETS: {
    RAW: 'SCGนครหลวงJWDภูมิภาค',
    TH_GEO: 'SYS_TH_GEO',
    PERSON: 'M_PERSON',
    PERSON_ALIAS: 'M_PERSON_ALIAS',
    PLACE: 'M_PLACE',
    PLACE_ALIAS: 'M_PLACE_ALIAS',
    GEO: 'M_GEO_POINT',
    DEST: 'M_DESTINATION',
    FACT: 'FACT_DELIVERY',
    REVIEW: 'Q_REVIEW',
    CONFIG: 'SYS_CONFIG',
    PROGRESS: 'SYS_PROGRESS',
    LOG: 'SYS_LOG',
    REPORT: 'RPT_DATA_QUALITY'
  },

  REQUIRED_RAW_COLS: [
    'ID_SCGนครหลวงJWDภูมิภาค',
    'วันที่ส่งสินค้า',
    'เวลาที่ส่งสินค้า',
    'จุดส่งสินค้าปลายทาง',
    'ชื่อ - นามสกุล',
    'Shipment No',
    'Invoice No',
    'รหัสลูกค้า',
    'ชื่อเจ้าของสินค้า',
    'ชื่อปลายทาง',
    'Email พนักงาน',
    'LAT',
    'LONG',
    'คลังสินค้า',
    'ที่อยู่ปลายทาง',
    'ระยะทางจากคลัง_Km',
    'ชื่อที่อยู่จาก_LatLong',
    'ID_พนักงาน',
    'ผลการตรวจสอบงานส่ง',
    'เหตุผิดปกติที่ตรวจพบ',
    'SYNC_STATUS'
  ],

  REVIEW_DECISIONS: ['CREATE_NEW', 'MERGE_TO_CANDIDATE', 'IGNORE'],

  PROCESS: {
    MAX_MS: 320000,           // ตัดก่อน Apps Script timeout
    CHECK_EVERY: 20,          // เช็คเวลาทุกกี่แถว
    AUTO_SCORE: 85,
    REVIEW_SCORE: 55,
    GEO_RADIUS_M: 30,         // ระยะถือว่าเป็นจุดเดียวกัน
    HARD_TEXT_MIN_LEN: 4,     // ข้อความสั้นเกินไป ห้ามมั่ว merge ง่าย
    LOW_LENGTH_RATIO_FAIL: 0.45
  },

  HEADERS: {
    TH_GEO: [
      'รหัสไปรษณีย์',
      'แขวง/ตำบล',
      'เขต/อำเภอ',
      'จังหวัด',
      'หมายเหตุ',
      'postcode_text',
      'subdistrict_norm',
      'district_norm',
      'province_norm',
      'note_type',
      'note_keywords',
      'postcode_override',
      'geo_key',
      'active_flag'
    ],

    PERSON: [
      'person_id',
      'canonical_name',
      'normalized_name',
      'first_seen',
      'last_seen',
      'usage_count',
      'status',
      'note'
    ],

    PERSON_ALIAS: [
      'alias_id',
      'person_id',
      'alias_raw',
      'alias_norm',
      'source',
      'created_at',
      'last_seen',
      'usage_count',
      'active_flag'
    ],

    PLACE: [
      'place_id',
      'canonical_name',
      'normalized_name',
      'canonical_address',
      'normalized_address',
      'geo_hint',
      'first_seen',
      'last_seen',
      'usage_count',
      'status',
      'note'
    ],

    PLACE_ALIAS: [
      'alias_id',
      'place_id',
      'alias_raw',
      'alias_norm',
      'source',
      'created_at',
      'last_seen',
      'usage_count',
      'active_flag'
    ],

    GEO: [
      'geo_id',
      'lat',
      'lng',
      'lat6',
      'lng6',
      'geo_key6',
      'geo_key5',
      'geo_key4',
      'address_best',
      'first_seen',
      'last_seen',
      'usage_count',
      'status',
      'note'
    ],

    DEST: [
      'destination_id',
      'person_id',
      'place_id',
      'geo_id',
      'label',
      'status',
      'first_seen',
      'last_seen',
      'usage_count',
      'note'
    ],

    FACT: [
      'fact_id',
      'source_sheet',
      'source_row',
      'source_record_id',
      'invoice_no',
      'shipment_no',
      'delivery_date',
      'delivery_time',
      'owner_name',
      'customer_code',
      'raw_person_name',
      'raw_place_name',
      'raw_address',
      'lat',
      'lng',
      'person_id',
      'place_id',
      'geo_id',
      'destination_id',
      'driver_name',
      'employee_id',
      'employee_email',
      'warehouse',
      'distance_km',
      'result_status',
      'problem_flags',
      'review_id',
      'sync_status',
      'created_at',
      'updated_at'
    ],

    REVIEW: [
      'review_id',
      'created_at',
      'status',
      'issue_type',
      'source_sheet',
      'source_row',
      'source_record_id',
      'invoice_no',
      'raw_person_name',
      'raw_place_name',
      'raw_address',
      'raw_lat',
      'raw_long',
      'candidate_json',
      'recommended_action',
      'score',
      'problem_flags',
      'note',
      'decision',
      'decision_by',
      'decision_at',
      'apply_result'
    ],

    CONFIG: [
      'config_key',
      'config_value',
      'config_group',
      'description'
    ],

    PROGRESS: [
      'progress_key',
      'progress_value',
      'updated_at'
    ],

    LOG: [
      'log_id',
      'created_at',
      'level',
      'module',
      'func',
      'ref_id',
      'message',
      'payload_json'
    ],

    REPORT: [
      'report_date',
      'total_raw',
      'processed',
      'success',
      'review',
      'error',
      'new_person',
      'new_place',
      'new_geo',
      'new_destination',
      'last_run'
    ]
  }
};
Copy
2) 01_UTILS.gs
Copyfunction ss_() {
  return SpreadsheetApp.getActiveSpreadsheet();
}

function sh_(name) {
  const s = ss_().getSheetByName(name);
  if (!s) throw new Error('Sheet not found: ' + name);
  return s;
}

function ensureSheet_(name, headers) {
  const ss = ss_();
  let s = ss.getSheetByName(name);
  if (!s) s = ss.insertSheet(name);
  ensureHeaders_(s, headers);
  return s;
}

function ensureHeaders_(sheet, headers) {
  if (!headers || !headers.length) return;
  const maxCols = Math.max(sheet.getLastColumn(), headers.length, 1);
  const row = sheet.getRange(1, 1, 1, maxCols).getValues()[0];
  let changed = false;

  headers.forEach(function(h, i) {
    if (row[i] !== h) {
      sheet.getRange(1, i + 1).setValue(h);
      changed = true;
    }
  });

  if (changed) {
    sheet.setFrozenRows(1);
  }
}

function getHeaderMap_(sheet) {
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  const map = {};
  headers.forEach(function(h, i) {
    map[h] = i + 1;
  });
  return map;
}

function sheetObjects_(sheetName) {
  const s = sh_(sheetName);
  const values = s.getDataRange().getValues();
  if (values.length < 2) return [];
  const headers = values[0];
  return values.slice(1).filter(function(r) {
    return r.join('') !== '';
  }).map(function(r, idx) {
    const o = {_row: idx + 2};
    headers.forEach(function(h, i) {
      o[h] = r[i];
    });
    return o;
  });
}

function appendObject_(sheetName, obj, headers) {
  const s = sh_(sheetName);
  const row = headers.map(function(h) {
    return obj[h] !== undefined ? obj[h] : '';
  });
  s.appendRow(row);
  return s.getLastRow();
}

function updateRowByHeaders_(sheetName, rowNumber, obj, headers) {
  const s = sh_(sheetName);
  const row = headers.map(function(h) {
    return obj[h] !== undefined ? obj[h] : '';
  });
  s.getRange(rowNumber, 1, 1, headers.length).setValues([row]);
}

function nowStr_() {
  return Utilities.formatDate(new Date(), APP.TZ, 'yyyy-MM-dd HH:mm:ss');
}

function todayStr_() {
  return Utilities.formatDate(new Date(), APP.TZ, 'yyyy-MM-dd');
}

function newId_(prefix) {
  return prefix + '_' + Utilities.getUuid().slice(0, 8).toUpperCase();
}

function toNum_(v) {
  if (v === '' || v === null || v === undefined) return '';
  const n = Number(String(v).replace(/,/g, ''));
  return isNaN(n) ? '' : n;
}

function isBlank_(v) {
  return v === '' || v === null || v === undefined;
}

function safeStr_(v) {
  return isBlank_(v) ? '' : String(v).trim();
}

function inc_(n, by) {
  const x = Number(n || 0);
  return x + (by || 1);
}

function normText_(v) {
  if (v === null || v === undefined) return '';
  return String(v)
    .replace(/[“”"']/g, '')
    .replace(/[()（）【】\[\]{}]/g, ' ')
    .replace(/[\,\.;:\/\\\|\-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

function normName_(v) {
  let s = normText_(v);
  s = s
    .replace(/^นาย\s*/, '')
    .replace(/^นาง\s*/, '')
    .replace(/^นางสาว\s*/, '')
    .replace(/^คุณ\s*/, '')
    .replace(/^mr\s*/, '')
    .replace(/^mrs\s*/, '')
    .replace(/^ms\s*/, '')
    .replace(/^บริษัท\s*/, '')
    .replace(/^บจก\s*/, '')
    .replace(/^หจก\s*/, '')
    .trim();
  return s;
}

function normPlace_(v) {
  let s = normText_(v);
  s = s
    .replace(/^ร้าน\s*/, '')
    .replace(/^บริษัท\s*/, '')
    .replace(/^บจก\s*/, '')
    .replace(/^หจก\s*/, '')
    .replace(/^สาขา\s*/, '')
    .trim();
  return s;
}

function normArea_(v) {
  return normText_(v)
    .replace(/^แขวง/, '')
    .replace(/^ตำบล/, '')
    .replace(/^เขต/, '')
    .replace(/^อำเภอ/, '')
    .replace(/^จังหวัด/, '')
    .replace(/^จ\./, '')
    .replace(/^อ\./, '')
    .replace(/^ต\./, '')
    .trim();
}

function tokenize_(s) {
  return normText_(s).split(' ').filter(Boolean);
}

function jaccard_(a, b) {
  const sa = new Set(tokenize_(a));
  const sb = new Set(tokenize_(b));
  if (!sa.size && !sb.size) return 100;
  const inter = Array.from(sa).filter(function(x) { return sb.has(x); }).length;
  const union = new Set([].concat(Array.from(sa), Array.from(sb))).size || 1;
  return Math.round((inter / union) * 100);
}

function diceCoeff_(a, b) {
  a = normText_(a);
  b = normText_(b);
  if (!a && !b) return 100;
  if (!a || !b) return 0;

  function bigrams(s) {
    if (s.length < 2) return [s];
    const arr = [];
    for (let i = 0; i < s.length - 1; i++) {
      arr.push(s.slice(i, i + 2));
    }
    return arr;
  }

  const aa = bigrams(a);
  const bb = bigrams(b);
  const used = new Array(bb.length).fill(false);
  let inter = 0;

  aa.forEach(function(x) {
    const idx = bb.findIndex(function(y, i) {
      return !used[i] && y === x;
    });
    if (idx >= 0) {
      used[idx] = true;
      inter++;
    }
  });

  return Math.round((2 * inter / (aa.length + bb.length)) * 100);
}

function lengthRatio_(a, b) {
  a = normText_(a);
  b = normText_(b);
  if (!a && !b) return 1;
  if (!a || !b) return 0;
  return Math.min(a.length, b.length) / Math.max(a.length, b.length);
}

function similarity_(a, b) {
  const score = (jaccard_(a, b) * 0.45) + (diceCoeff_(a, b) * 0.55);
  return Math.round(score * 100) / 100;
}

function addressScore_(a, b) {
  const base = similarity_(a, b);
  const ratio = lengthRatio_(a, b);
  return Math.round(Math.min(base, ratio * 100) * 100) / 100;
}

function parseLatLng_(text) {
  if (!text) return { lat: '', lng: '' };
  const s = String(text).trim();
  const m = s.match(/(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)/);
  if (!m) return { lat: '', lng: '' };
  return {
    lat: toNum_(m[1]),
    lng: toNum_(m[2])
  };
}

function round6_(n) {
  const x = Number(n);
  if (isNaN(x)) return '';
  return Number(x.toFixed(6));
}

function round5_(n) {
  const x = Number(n);
  if (isNaN(x)) return '';
  return Number(x.toFixed(5));
}

function round4_(n) {
  const x = Number(n);
  if (isNaN(x)) return '';
  return Number(x.toFixed(4));
}

function geoKeys_(lat, lng) {
  if (isBlank_(lat) || isBlank_(lng)) {
    return {geo_key6:'', geo_key5:'', geo_key4:'', lat6:'', lng6:''};
  }
  return {
    lat6: round6_(lat),
    lng6: round6_(lng),
    geo_key6: round6_(lat) + ',' + round6_(lng),
    geo_key5: round5_(lat) + ',' + round5_(lng),
    geo_key4: round4_(lat) + ',' + round4_(lng)
  };
}

function distanceMeters_(lat1, lng1, lat2, lng2) {
  if ([lat1, lng1, lat2, lng2].some(isBlank_)) return 999999999;
  const R = 6371000;
  const toRad = function(d) { return d * Math.PI / 180; };
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}

function parseThaiGeoNote_(note) {
  const raw = safeStr_(note);
  const t = normText_(note);
  let noteType = 'NONE';
  let override = '';
  let keywords = [];

  if (!t) {
    return {
      note_type: noteType,
      note_keywords: '',
      postcode_override: ''
    };
  }

  if (t.indexOf('เฉพาะ') >= 0) noteType = 'SPECIFIC_ONLY';
  if (t.indexOf('ยกเว้น') >= 0) noteType = 'EXCLUDE_PARTIAL';
  if (t.indexOf('ทั้งแขวง') >= 0 || t.indexOf('ทั้งตำบล') >= 0) noteType = 'FULL_AREA_WITH_RULE';
  if (t.indexOf('อาคาร') >= 0) noteType = 'BUILDING_RULE';
  if (t.indexOf('หมู่') >= 0 && noteType === 'NONE') noteType = 'MOO_RULE';

  const overrideMatch = raw.match(/ใช้รหัส\s*(\d{5})/);
  if (overrideMatch) override = overrideMatch[1];

  const keywordMatches = raw.match(/อาคาร[^,，)）]+|หมู่\s*[\d\-\/, ]+|ซอย\s*[\d\-\/, ]+|ถนน[^,，)）]+/g);
  if (keywordMatches) {
    keywords = keywordMatches.map(function(x) { return x.trim(); }).filter(Boolean);
  }

  return {
    note_type: noteType,
    note_keywords: keywords.join(' | '),
    postcode_override: override
  };
}

function writeLog_(level, module, func, refId, message, payload) {
  try {
    appendObject_(APP.SHEETS.LOG, {
      log_id: newId_('LOG'),
      created_at: nowStr_(),
      level: level || 'INFO',
      module: module || '',
      func: func || '',
      ref_id: refId || '',
      message: message || '',
      payload_json: payload ? JSON.stringify(payload) : ''
    }, APP.HEADERS.LOG);
  } catch (err) {
    Logger.log('writeLog_ failed: ' + err);
  }
}

function getCfgMap_() {
  const rows = sheetObjects_(APP.SHEETS.CONFIG);
  const map = {};
  rows.forEach(function(r) {
    map[r.config_key] = r.config_value;
  });
  return map;
}

function getCfg_(key, defaultValue) {
  const map = getCfgMap_();
  return map[key] !== undefined && map[key] !== '' ? map[key] : defaultValue;
}

function setCfg_(key, value, group, description) {
  const s = sh_(APP.SHEETS.CONFIG);
  const values = s.getDataRange().getValues();
  const headers = values[0];
  const idx = {
    key: headers.indexOf('config_key'),
    value: headers.indexOf('config_value'),
    group: headers.indexOf('config_group'),
    desc: headers.indexOf('description')
  };
  for (let i = 1; i < values.length; i++) {
    if (values[i][idx.key] === key) {
      s.getRange(i + 1, idx.value + 1).setValue(value);
      if (group !== undefined) s.getRange(i + 1, idx.group + 1).setValue(group);
      if (description !== undefined) s.getRange(i + 1, idx.desc + 1).setValue(description);
      return;
    }
  }
  s.appendRow([key, value, group || '', description || '']);
}

function getProgress_() {
  const rows = sheetObjects_(APP.SHEETS.PROGRESS);
  const out = {};
  rows.forEach(function(r) {
    out[r.progress_key] = r.progress_value;
  });
  return out;
}

function setProgress_(obj) {
  const s = sh_(APP.SHEETS.PROGRESS);
  const values = s.getDataRange().getValues();
  const headers = values[0];
  const idxKey = headers.indexOf('progress_key');
  const idxVal = headers.indexOf('progress_value');
  const idxUpd = headers.indexOf('updated_at');

  Object.keys(obj).forEach(function(key) {
    let found = -1;
    for (let i = 1; i < values.length; i++) {
      if (values[i][idxKey] === key) {
        found = i + 1;
        break;
      }
    }
    if (found > 0) {
      s.getRange(found, idxVal + 1).setValue(obj[key]);
      s.getRange(found, idxUpd + 1).setValue(nowStr_());
    } else {
      s.appendRow([key, obj[key], nowStr_()]);
    }
  });
}

function clearProgress_() {
  const s = sh_(APP.SHEETS.PROGRESS);
  const lastRow = s.getLastRow();
  if (lastRow > 1) {
    s.getRange(2, 1, lastRow - 1, s.getLastColumn()).clearContent();
  }
}

function deleteResumeTriggers_() {
  const triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(function(t) {
    if (t.getHandlerFunction && t.getHandlerFunction() === 'runProcessFromCheckpoint') {
      ScriptApp.deleteTrigger(t);
    }
  });
}

function scheduleResume_() {
  deleteResumeTriggers_();
  ScriptApp.newTrigger('runProcessFromCheckpoint')
    .timeBased()
    .after(60 * 1000)
    .create();
}
Copy
3) 02_SETUP.gs
Copyfunction onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('SCG Master Data')
    .addItem('1) Setup Project', 'setupProject')
    .addItem('2) Rebuild Thai Geo Index', 'rebuildThaiGeoIndex')
    .addSeparator()
    .addItem('3) Run Process New Rows', 'runProcessNewRows')
    .addItem('4) Resume From Checkpoint', 'runProcessFromCheckpoint')
    .addItem('5) Reset Checkpoint', 'resetCheckpoint')
    .addSeparator()
    .addItem('6) Refresh Quality Report', 'refreshQualityReport')
    .addItem('7) Test Lookup', 'testLookup_')
    .addToUi();
}

function setupProject() {
  ensureSheet_(APP.SHEETS.TH_GEO, APP.HEADERS.TH_GEO);
  ensureSheet_(APP.SHEETS.PERSON, APP.HEADERS.PERSON);
  ensureSheet_(APP.SHEETS.PERSON_ALIAS, APP.HEADERS.PERSON_ALIAS);
  ensureSheet_(APP.SHEETS.PLACE, APP.HEADERS.PLACE);
  ensureSheet_(APP.SHEETS.PLACE_ALIAS, APP.HEADERS.PLACE_ALIAS);
  ensureSheet_(APP.SHEETS.GEO, APP.HEADERS.GEO);
  ensureSheet_(APP.SHEETS.DEST, APP.HEADERS.DEST);
  ensureSheet_(APP.SHEETS.FACT, APP.HEADERS.FACT);
  ensureSheet_(APP.SHEETS.REVIEW, APP.HEADERS.REVIEW);
  ensureSheet_(APP.SHEETS.CONFIG, APP.HEADERS.CONFIG);
  ensureSheet_(APP.SHEETS.PROGRESS, APP.HEADERS.PROGRESS);
  ensureSheet_(APP.SHEETS.LOG, APP.HEADERS.LOG);
  ensureSheet_(APP.SHEETS.REPORT, APP.HEADERS.REPORT);

  validateRawSheet_();
  seedConfig_();
  setupReviewValidation_();
  writeLog_('INFO', '02_SETUP', 'setupProject', '', 'Project setup completed', {});
}

function validateRawSheet_() {
  const s = sh_(APP.SHEETS.RAW);
  const map = getHeaderMap_(s);
  const missing = APP.REQUIRED_RAW_COLS.filter(function(c) { return !map[c]; });
  if (missing.length) {
    throw new Error('Raw sheet missing columns: ' + missing.join(', '));
  }
}

function seedConfig_() {
  setCfg_('AUTO_SCORE', APP.PROCESS.AUTO_SCORE, 'MATCH', 'คะแนนขั้นต่ำสำหรับ auto match');
  setCfg_('REVIEW_SCORE', APP.PROCESS.REVIEW_SCORE, 'MATCH', 'คะแนนขั้นต่ำส่ง review');
  setCfg_('GEO_RADIUS_M', APP.PROCESS.GEO_RADIUS_M, 'MATCH', 'ระยะเมตรสำหรับถือว่าเป็นพิกัดเดียวกัน');
  setCfg_('MAX_MS', APP.PROCESS.MAX_MS, 'PROCESS', 'เวลาประมวลผลต่อรอบก่อนตัด');
  setCfg_('LOW_LENGTH_RATIO_FAIL', APP.PROCESS.LOW_LENGTH_RATIO_FAIL, 'MATCH', 'length ratio ต่ำกว่านี้ให้ลดความมั่นใจ');
}

function setupReviewValidation_() {
  const s = sh_(APP.SHEETS.REVIEW);
  const map = getHeaderMap_(s);
  const col = map['decision'];
  if (!col) return;

  const rule = SpreadsheetApp.newDataValidation()
    .requireValueInList(APP.REVIEW_DECISIONS, true)
    .setAllowInvalid(false)
    .build();

  const lastRow = Math.max(s.getMaxRows(), 2000);
  s.getRange(2, col, lastRow - 1, 1).setDataValidation(rule);
}

function rebuildThaiGeoIndex() {
  const s = sh_(APP.SHEETS.TH_GEO);
  ensureHeaders_(s, APP.HEADERS.TH_GEO);

  const values = s.getDataRange().getValues();
  if (values.length < 2) return;

  const map = getHeaderMap_(s);

  for (let r = 2; r <= values.length; r++) {
    const row = values[r - 1];
    const obj = {
      postcode: row[map['รหัสไปรษณีย์'] - 1],
      subdistrict: row[map['แขวง/ตำบล'] - 1],
      district: row[map['เขต/อำเภอ'] - 1],
      province: row[map['จังหวัด'] - 1],
      note: row[map['หมายเหตุ'] - 1]
    };

    const derived = deriveThaiGeoIndexRow_(obj);

    s.getRange(r, map['postcode_text']).setValue(derived.postcode_text);
    s.getRange(r, map['subdistrict_norm']).setValue(derived.subdistrict_norm);
    s.getRange(r, map['district_norm']).setValue(derived.district_norm);
    s.getRange(r, map['province_norm']).setValue(derived.province_norm);
    s.getRange(r, map['note_type']).setValue(derived.note_type);
    s.getRange(r, map['note_keywords']).setValue(derived.note_keywords);
    s.getRange(r, map['postcode_override']).setValue(derived.postcode_override);
    s.getRange(r, map['geo_key']).setValue(derived.geo_key);
    s.getRange(r, map['active_flag']).setValue('Y');
  }

  writeLog_('INFO', '02_SETUP', 'rebuildThaiGeoIndex', '', 'Rebuilt SYS_TH_GEO index', {
    rows: values.length - 1
  });
}

function deriveThaiGeoIndexRow_(row) {
  const parsed = parseThaiGeoNote_(row.note);
  const postcodeText = safeStr_(row.postcode);
  const sub = normArea_(row.subdistrict);
  const dist = normArea_(row.district);
  const prov = normArea_(row.province);

  return {
    postcode_text: postcodeText,
    subdistrict_norm: sub,
    district_norm: dist,
    province_norm: prov,
    note_type: parsed.note_type,
    note_keywords: parsed.note_keywords,
    postcode_override: parsed.postcode_override,
    geo_key: [sub, dist, prov, postcodeText].join('|')
  };
}
Copy
4) 03_MASTER.gs
Copyfunction buildContext_() {
  const ctx = {
    persons: sheetObjects_(APP.SHEETS.PERSON),
    personAliases: sheetObjects_(APP.SHEETS.PERSON_ALIAS),
    places: sheetObjects_(APP.SHEETS.PLACE),
    placeAliases: sheetObjects_(APP.SHEETS.PLACE_ALIAS),
    geos: sheetObjects_(APP.SHEETS.GEO),
    dests: sheetObjects_(APP.SHEETS.DEST),
    thGeo: sheetObjects_(APP.SHEETS.TH_GEO),
    facts: sheetObjects_(APP.SHEETS.FACT)
  };

  ctx.personById = {};
  ctx.personAliasByNorm = {};
  ctx.placeById = {};
  ctx.placeAliasByNorm = {};
  ctx.geoById = {};
  ctx.destByKey = {};
  ctx.factBySourceKey = {};
  ctx.factByRecordId = {};

  ctx.persons.forEach(function(p) {
    ctx.personById[p.person_id] = p;
  });

  ctx.personAliases.forEach(function(a) {
    const k = normName_(a.alias_norm || a.alias_raw);
    if (!ctx.personAliasByNorm[k]) ctx.personAliasByNorm[k] = [];
    ctx.personAliasByNorm[k].push(a);
  });

  ctx.places.forEach(function(p) {
    ctx.placeById[p.place_id] = p;
  });

  ctx.placeAliases.forEach(function(a) {
    const k = normPlace_(a.alias_norm || a.alias_raw);
    if (!ctx.placeAliasByNorm[k]) ctx.placeAliasByNorm[k] = [];
    ctx.placeAliasByNorm[k].push(a);
  });

  ctx.geos.forEach(function(g) {
    ctx.geoById[g.geo_id] = g;
  });

  ctx.dests.forEach(function(d) {
    const key = [d.person_id, d.place_id, d.geo_id].join('|');
    ctx.destByKey[key] = d;
  });

  ctx.facts.forEach(function(f) {
    const sourceKey = [f.source_sheet, f.source_row].join('|');
    ctx.factBySourceKey[sourceKey] = f;
    if (f.source_record_id) ctx.factByRecordId[f.source_record_id] = f;
  });

  return ctx;
}

function createPerson_(ctx, rawName, normName) {
  const obj = {
    person_id: newId_('PER'),
    canonical_name: safeStr_(rawName),
    normalized_name: normName || normName_(rawName),
    first_seen: nowStr_(),
    last_seen: nowStr_(),
    usage_count: 1,
    status: 'ACTIVE',
    note: 'auto-created'
  };
  appendObject_(APP.SHEETS.PERSON, obj, APP.HEADERS.PERSON);
  ctx.persons.push(obj);
  ctx.personById[obj.person_id] = obj;
  return obj;
}

function createPersonAlias_(ctx, personId, rawName, normName, source) {
  const aliasNorm = normName || normName_(rawName);
  const obj = {
    alias_id: newId_('PAL'),
    person_id: personId,
    alias_raw: safeStr_(rawName),
    alias_norm: aliasNorm,
    source: source || 'auto',
    created_at: nowStr_(),
    last_seen: nowStr_(),
    usage_count: 1,
    active_flag: 'Y'
  };
  appendObject_(APP.SHEETS.PERSON_ALIAS, obj, APP.HEADERS.PERSON_ALIAS);

  ctx.personAliases.push(obj);
  if (!ctx.personAliasByNorm[aliasNorm]) ctx.personAliasByNorm[aliasNorm] = [];
  ctx.personAliasByNorm[aliasNorm].push(obj);
  return obj;
}

function createPlace_(ctx, rawName, normName, rawAddress, normAddress, geoHint) {
  const obj = {
    place_id: newId_('PLC'),
    canonical_name: safeStr_(rawName),
    normalized_name: normName || normPlace_(rawName),
    canonical_address: safeStr_(rawAddress),
    normalized_address: normAddress || normText_(rawAddress),
    geo_hint: safeStr_(geoHint),
    first_seen: nowStr_(),
    last_seen: nowStr_(),
    usage_count: 1,
    status: 'ACTIVE',
    note: 'auto-created'
  };
  appendObject_(APP.SHEETS.PLACE, obj, APP.HEADERS.PLACE);
  ctx.places.push(obj);
  ctx.placeById[obj.place_id] = obj;
  return obj;
}

function createPlaceAlias_(ctx, placeId, rawName, normName, source) {
  const aliasNorm = normName || normPlace_(rawName);
  const obj = {
    alias_id: newId_('PLA'),
    place_id: placeId,
    alias_raw: safeStr_(rawName),
    alias_norm: aliasNorm,
    source: source || 'auto',
    created_at: nowStr_(),
    last_seen: nowStr_(),
    usage_count: 1,
    active_flag: 'Y'
  };
  appendObject_(APP.SHEETS.PLACE_ALIAS, obj, APP.HEADERS.PLACE_ALIAS);

  ctx.placeAliases.push(obj);
  if (!ctx.placeAliasByNorm[aliasNorm]) ctx.placeAliasByNorm[aliasNorm] = [];
  ctx.placeAliasByNorm[aliasNorm].push(obj);
  return obj;
}

function createGeo_(ctx, lat, lng, addressBest) {
  const keys = geoKeys_(lat, lng);
  const obj = {
    geo_id: newId_('GEO'),
    lat: toNum_(lat),
    lng: toNum_(lng),
    lat6: keys.lat6,
    lng6: keys.lng6,
    geo_key6: keys.geo_key6,
    geo_key5: keys.geo_key5,
    geo_key4: keys.geo_key4,
    address_best: safeStr_(addressBest),
    first_seen: nowStr_(),
    last_seen: nowStr_(),
    usage_count: 1,
    status: 'ACTIVE',
    note: 'auto-created'
  };
  appendObject_(APP.SHEETS.GEO, obj, APP.HEADERS.GEO);
  ctx.geos.push(obj);
  ctx.geoById[obj.geo_id] = obj;
  return obj;
}

function getOrCreateDestination_(ctx, personId, placeId, geoId, label) {
  const key = [personId, placeId, geoId].join('|');
  let found = ctx.destByKey[key];
  if (found) return found;

  const obj = {
    destination_id: newId_('DST'),
    person_id: personId,
    place_id: placeId,
    geo_id: geoId,
    label: safeStr_(label),
    status: 'ACTIVE',
    first_seen: nowStr_(),
    last_seen: nowStr_(),
    usage_count: 1,
    note: 'auto-created'
  };
  appendObject_(APP.SHEETS.DEST, obj, APP.HEADERS.DEST);
  ctx.dests.push(obj);
  ctx.destByKey[key] = obj;
  return obj;
}
Copy
5) 04_MATCH_ENGINE.gs
ไฟล์นี้คือหัวใจของการแก้ “8 ปัญหา” โดยตรง

Copyfunction getRawColumnMap_() {
  const s = sh_(APP.SHEETS.RAW);
  return getHeaderMap_(s);
}

function mapSourceRow_(row, rowNum, colMap) {
  const get = function(name) {
    const idx = colMap[name];
    return idx ? row[idx - 1] : '';
  };

  let lat = toNum_(get('LAT'));
  let lng = toNum_(get('LONG'));

  if (isBlank_(lat) || isBlank_(lng)) {
    const parsed = parseLatLng_(get('จุดส่งสินค้าปลายทาง'));
    if (isBlank_(lat)) lat = parsed.lat;
    if (isBlank_(lng)) lng = parsed.lng;
  }

  return {
    source_sheet: APP.SHEETS.RAW,
    source_row: rowNum,
    source_record_id: safeStr_(get('ID_SCGนครหลวงJWDภูมิภาค')),
    delivery_date: get('วันที่ส่งสินค้า'),
    delivery_time: get('เวลาที่ส่งสินค้า'),
    raw_point: safeStr_(get('จุดส่งสินค้าปลายทาง')),
    raw_driver_name: safeStr_(get('ชื่อ - นามสกุล')),
    shipment_no: safeStr_(get('Shipment No')),
    invoice_no: safeStr_(get('Invoice No')),
    customer_code: safeStr_(get('รหัสลูกค้า')),
    owner_name: safeStr_(get('ชื่อเจ้าของสินค้า')),
    raw_person_name: safeStr_(get('ชื่อปลายทาง')),
    employee_email: safeStr_(get('Email พนักงาน')),
    lat: lat,
    lng: lng,
    warehouse: safeStr_(get('คลังสินค้า')),
    raw_address: safeStr_(get('ที่อยู่ปลายทาง')),
    distance_km: get('ระยะทางจากคลัง_Km'),
    geo_address_text: safeStr_(get('ชื่อที่อยู่จาก_LatLong')),
    employee_id: safeStr_(get('ID_พนักงาน')),
    validation_result: safeStr_(get('ผลการตรวจสอบงานส่ง')),
    anomaly_reason: safeStr_(get('เหตุผิดปกติที่ตรวจพบ')),
    sync_status: safeStr_(get('SYNC_STATUS'))
  };
}

function detectThaiGeo_(ctx, text) {
  const t = normText_(text);
  if (!t) return null;

  let best = null;
  let bestScore = -1;

  ctx.thGeo.forEach(function(g) {
    if (g.active_flag === 'N') return;

    let score = 0;
    const sub = normArea_(g.subdistrict_norm || g['แขวง/ตำบล']);
    const dist = normArea_(g.district_norm || g['เขต/อำเภอ']);
    const prov = normArea_(g.province_norm || g['จังหวัด']);

    if (sub && t.indexOf(sub) >= 0) score += 45;
    if (dist && t.indexOf(dist) >= 0) score += 30;
    if (prov && t.indexOf(prov) >= 0) score += 20;

    const kws = safeStr_(g.note_keywords).split('|').map(function(x){ return normText_(x); }).filter(Boolean);
    if (kws.length) {
      const matched = kws.some(function(k){ return t.indexOf(k) >= 0; });
      if (matched) score += 15;
    }

    if (score > bestScore) {
      bestScore = score;
      best = {
        row: g,
        score: score
      };
    }
  });

  return bestScore > 0 ? best : null;
}

function findBestPerson_(ctx, rawPerson) {
  const norm = normName_(rawPerson);

  if (!norm || norm.length < APP.PROCESS.HARD_TEXT_MIN_LEN) {
    return {
      status: 'WEAK',
      score: 0,
      person: null,
      candidates: [],
      reason: 'person_name_too_short_or_blank'
    };
  }

  const directAliases = ctx.personAliasByNorm[norm] || [];
  if (directAliases.length === 1) {
    const p = ctx.personById[directAliases[0].person_id];
    return {
      status: 'MATCH',
      score: 100,
      person: p,
      candidates: [{person_id: p.person_id, score: 100, via: 'alias_exact'}],
      reason: 'alias_exact'
    };
  }

  const candidates = [];
  ctx.persons.forEach(function(p) {
    const s1 = similarity_(norm, p.normalized_name);
    const lr = lengthRatio_(norm, p.normalized_name);
    let score = s1;

    if (lr < APP.PROCESS.LOW_LENGTH_RATIO_FAIL) {
      score = Math.min(score, lr * 100);
    }

    if (norm === p.normalized_name) score = 100;

    if (score >= 45) {
      candidates.push({
        person_id: p.person_id,
        score: Math.round(score),
        via: 'name_similarity',
        canonical_name: p.canonical_name
      });
    }
  });

  candidates.sort(function(a, b) { return b.score - a.score; });

  if (!candidates.length) {
    return {
      status: 'NEW',
      score: 0,
      person: null,
      candidates: [],
      reason: 'no_person_candidate'
    };
  }

  const top = candidates[0];
  const second = candidates[1];

  if (top.score >= 92 && (!second || top.score - second.score >= 12)) {
    return {
      status: 'MATCH',
      score: top.score,
      person: ctx.personById[top.person_id],
      candidates: candidates.slice(0, 5),
      reason: 'person_confident'
    };
  }

  return {
    status: 'REVIEW',
    score: top.score,
    person: top.score >= APP.PROCESS.REVIEW_SCORE ? ctx.personById[top.person_id] : null,
    candidates: candidates.slice(0, 5),
    reason: 'person_ambiguous'
  };
}

function findBestPlace_(ctx, rawPlace, rawAddress, geoAddressText, thaiGeoHit) {
  const placeNorm = normPlace_(rawPlace);
  const addrNorm = normText_(rawAddress);
  const geoNorm = normText_(geoAddressText);

  const combinedInput = [placeNorm, addrNorm, geoNorm].filter(Boolean).join(' ');

  if (!combinedInput) {
    return {
      status: 'WEAK',
      score: 0,
      place: null,
      candidates: [],
      reason: 'place_and_address_blank'
    };
  }

  const candidates = [];

  // exact alias by place name
  if (placeNorm) {
    const aliasHit = ctx.placeAliasByNorm[placeNorm] || [];
    aliasHit.forEach(function(a) {
      const p = ctx.placeById[a.place_id];
      candidates.push({
        place_id: p.place_id,
        score: 96,
        via: 'place_alias_exact',
        canonical_name: p.canonical_name
      });
    });
  }

  ctx.places.forEach(function(p) {
    const nameScore = placeNorm ? similarity_(placeNorm, p.normalized_name) : 0;
    const addrScore = rawAddress ? addressScore_(rawAddress, p.canonical_address || p.normalized_address) : 0;
    const geoTextScore = geoAddressText ? addressScore_(geoAddressText, p.canonical_address || p.normalized_address) : 0;

    let thaiGeoBonus = 0;
    if (thaiGeoHit && p.canonical_address) {
      const t = normText_(p.canonical_address);
      const sub = normArea_(thaiGeoHit.row.subdistrict_norm || thaiGeoHit.row['แขวง/ตำบล']);
      const dist = normArea_(thaiGeoHit.row.district_norm || thaiGeoHit.row['เขต/อำเภอ']);
      const prov = normArea_(thaiGeoHit.row.province_norm || thaiGeoHit.row['จังหวัด']);

      if (sub && t.indexOf(sub) >= 0) thaiGeoBonus += 8;
      if (dist && t.indexOf(dist) >= 0) thaiGeoBonus += 5;
      if (prov && t.indexOf(prov) >= 0) thaiGeoBonus += 3;
    }

    let score = (nameScore * 0.45) + (addrScore * 0.40) + (geoTextScore * 0.15) + thaiGeoBonus;

    const nameLenRatio = lengthRatio_(placeNorm, p.normalized_name);
    if (placeNorm && nameLenRatio < APP.PROCESS.LOW_LENGTH_RATIO_FAIL) {
      score = Math.min(score, nameLenRatio * 100);
    }

    if (score >= 45) {
      candidates.push({
        place_id: p.place_id,
        score: Math.round(score),
        via: 'place_composite',
        canonical_name: p.canonical_name
      });
    }
  });

  // dedupe by place_id keep max score
  const bestMap = {};
  candidates.forEach(function(c) {
    if (!bestMap[c.place_id] || c.score > bestMap[c.place_id].score) {
      bestMap[c.place_id] = c;
    }
  });

  const list = Object.keys(bestMap).map(function(k) { return bestMap[k]; })
    .sort(function(a, b) { return b.score - a.score; });

  if (!list.length) {
    return {
      status: 'NEW',
      score: 0,
      place: null,
      candidates: [],
      reason: 'no_place_candidate'
    };
  }

  const top = list[0];
  const second = list[1];

  if (top.score >= 90 && (!second || top.score - second.score >= 10)) {
    return {
      status: 'MATCH',
      score: top.score,
      place: ctx.placeById[top.place_id],
      candidates: list.slice(0, 5),
      reason: 'place_confident'
    };
  }

  return {
    status: 'REVIEW',
    score: top.score,
    place: top.score >= APP.PROCESS.REVIEW_SCORE ? ctx.placeById[top.place_id] : null,
    candidates: list.slice(0, 5),
    reason: 'place_ambiguous'
  };
}

function findBestGeo_(ctx, lat, lng) {
  if (isBlank_(lat) || isBlank_(lng)) {
    return {
      status: 'WEAK',
      score: 0,
      geo: null,
      candidates: [],
      reason: 'geo_blank'
    };
  }

  const candidates = [];
  ctx.geos.forEach(function(g) {
    const d = distanceMeters_(lat, lng, toNum_(g.lat), toNum_(g.lng));
    if (d <= Number(getCfg_('GEO_RADIUS_M', APP.PROCESS.GEO_RADIUS_M))) {
      let score = 100 - Math.min(60, d);
      if (d <= 3) score = 100;
      candidates.push({
        geo_id: g.geo_id,
        score: Math.round(score),
        distance_m: d,
        via: 'distance'
      });
    }
  });

  candidates.sort(function(a, b) {
    if (b.score !== a.score) return b.score - a.score;
    return a.distance_m - b.distance_m;
  });

  if (!candidates.length) {
    return {
      status: 'NEW',
      score: 0,
      geo: null,
      candidates: [],
      reason: 'no_geo_candidate'
    };
  }

  const top = candidates[0];

  if (top.distance_m <= 10 || top.score >= 95) {
    return {
      status: 'MATCH',
      score: top.score,
      geo: ctx.geoById[top.geo_id],
      candidates: candidates.slice(0, 5),
      reason: 'geo_confident'
    };
  }

  return {
    status: 'REVIEW',
    score: top.score,
    geo: ctx.geoById[top.geo_id],
    candidates: candidates.slice(0, 5),
    reason: 'geo_nearby_not_exact'
  };
}

function detectProblemFlags_(src, personResult, placeResult, geoResult) {
  const flags = [];

  // 1 ชื่อบุคคลซ้ำกัน / คลุมเครือ
  if (personResult.status === 'REVIEW' && personResult.candidates.length > 1) {
    flags.push('P1_DUPLICATE_PERSON_NAME');
  }

  // 2 ชื่อสถานที่ซ้ำกัน
  if (placeResult.status === 'REVIEW' && placeResult.candidates.length > 1) {
    flags.push('P2_DUPLICATE_PLACE_NAME');
  }

  // 3 LatLong ซ้ำกัน
  if (geoResult.status === 'MATCH') {
    flags.push('P3_DUPLICATE_LATLONG');
  }

  // 4 คนเดียวกันแต่ชื่อเขียนไม่เหมือนกัน
  if (personResult.status === 'MATCH' &&
      src.raw_person_name &&
      personResult.person &&
      normName_(src.raw_person_name) !== normName_(personResult.person.canonical_name)) {
    flags.push('P4_SAME_PERSON_DIFFERENT_WRITING');
  }

  // 5 คนละชื่อ แต่ที่เดียวกัน
  if (placeResult.status === 'MATCH' && personResult.status !== 'MATCH') {
    flags.push('P5_DIFFERENT_PERSON_SAME_PLACE');
  }

  // 6 ชื่อเดียวกัน แต่สถานที่ไม่เหมือนกัน
  if (personResult.status === 'MATCH' && placeResult.status === 'NEW') {
    flags.push('P6_SAME_PERSON_DIFFERENT_PLACE');
  }

  // 7 ชื่อเดียวกัน แต่ LatLong คนละที่
  if (personResult.status === 'MATCH' && geoResult.status === 'NEW') {
    flags.push('P7_SAME_PERSON_DIFFERENT_GEO');
  }

  // 8 คนละชื่อ แต่ LatLong เดียวกัน
  if (personResult.status !== 'MATCH' && geoResult.status === 'MATCH') {
    flags.push('P8_DIFFERENT_PERSON_SAME_GEO');
  }

  return flags;
}

function resolveRow_(ctx, src, options) {
  options = options || {};

  const geoTextForGeoThai = [src.raw_address, src.geo_address_text].filter(Boolean).join(' ');
  const thaiGeoHit = detectThaiGeo_(ctx, geoTextForGeoThai);

  const personResult = findBestPerson_(ctx, src.raw_person_name);
  const placeResult = findBestPlace_(ctx, src.raw_person_name, src.raw_address, src.geo_address_text, thaiGeoHit);
  const geoResult = findBestGeo_(ctx, src.lat, src.lng);

  const flags = detectProblemFlags_(src, personResult, placeResult, geoResult);

  let finalScore = Math.round(
    (personResult.score * 0.35) +
    (placeResult.score * 0.35) +
    (geoResult.score * 0.30)
  );

  const personNorm = normName_(src.raw_person_name);
  const placeNorm = normPlace_(src.raw_person_name);
  const addressNorm = normText_(src.raw_address);

  // ถ้าข้อความสั้นเกินไป ลดความมั่นใจ
  if (personNorm && personNorm.length < APP.PROCESS.HARD_TEXT_MIN_LEN) {
    finalScore = Math.min(finalScore, 50);
    flags.push('SHORT_PERSON_TEXT');
  }

  if (placeNorm && placeNorm.length < APP.PROCESS.HARD_TEXT_MIN_LEN) {
    finalScore = Math.min(finalScore, 50);
    flags.push('SHORT_PLACE_TEXT');
  }

  if (addressNorm && thaiGeoHit && thaiGeoHit.score < 45) {
    flags.push('WEAK_THAI_GEO_CONTEXT');
  }

  let action = 'REVIEW';
  if (personResult.status === 'MATCH' && placeResult.status === 'MATCH' && geoResult.status === 'MATCH' && finalScore >= Number(getCfg_('AUTO_SCORE', APP.PROCESS.AUTO_SCORE))) {
    action = 'AUTO_MATCH';
  } else if (personResult.status === 'NEW' && placeResult.status === 'NEW' && geoResult.status === 'NEW') {
    action = 'CREATE_NEW';
  } else if (finalScore < Number(getCfg_('REVIEW_SCORE', APP.PROCESS.REVIEW_SCORE))) {
    action = 'CREATE_NEW';
  } else {
    action = 'REVIEW';
  }

  return {
    action: action,
    finalScore: finalScore,
    thaiGeoHit: thaiGeoHit,
    personResult: personResult,
    placeResult: placeResult,
    geoResult: geoResult,
    flags: flags
  };
}
Copy
6) 05_PROCESS.gs
Copyfunction runProcessNewRows() {
  deleteResumeTriggers_();
  const progress = getProgress_();
  const startRow = Number(progress.last_row || 2);
  processRows_(startRow, false);
}

function runProcessFromCheckpoint() {
  const progress = getProgress_();
  const startRow = Number(progress.last_row || 2);
  processRows_(startRow, true);
}

function resetCheckpoint() {
  clearProgress_();
  deleteResumeTriggers_();
  SpreadsheetApp.getUi().alert('Reset checkpoint เรียบร้อย');
}

function processRows_(startRow, isResume) {
  const startedAt = Date.now();
  const rawSheet = sh_(APP.SHEETS.RAW);
  const lastRow = rawSheet.getLastRow();
  if (lastRow < 2) return;

  const colMap = getRawColumnMap_();
  const syncCol = colMap['SYNC_STATUS'];

  const ctx = buildContext_();
  const values = rawSheet.getRange(startRow, 1, lastRow - startRow + 1, rawSheet.getLastColumn()).getValues();

  let processed = 0;
  let successCount = 0;
  let reviewCount = 0;
  let errorCount = 0;

  for (let i = 0; i < values.length; i++) {
    const rowNum = startRow + i;
    const row = values[i];
    const currentSync = row[syncCol - 1];

    // ข้าม SUCCESS / IGNORE ไปเลย
    if (currentSync === 'SUCCESS' || currentSync === 'IGNORE') {
      continue;
    }

    try {
      const src = mapSourceRow_(row, rowNum, colMap);
      const resolved = resolveRow_(ctx, src, {});

      if (resolved.action === 'AUTO_MATCH') {
        const person = resolved.personResult.person || createPerson_(ctx, src.raw_person_name, normName_(src.raw_person_name));
        if (!resolved.personResult.person) createPersonAlias_(ctx, person.person_id, src.raw_person_name, normName_(src.raw_person_name), 'raw_auto');

        const place = resolved.placeResult.place || createPlace_(
          ctx,
          src.raw_person_name || src.raw_address,
          normPlace_(src.raw_person_name || src.raw_address),
          src.raw_address || src.geo_address_text,
          normText_(src.raw_address || src.geo_address_text),
          src.geo_address_text
        );
        if (!resolved.placeResult.place) createPlaceAlias_(ctx, place.place_id, src.raw_person_name || src.raw_address, normPlace_(src.raw_person_name || src.raw_address), 'raw_auto');

        const geo = resolved.geoResult.geo || createGeo_(ctx, src.lat, src.lng, src.geo_address_text || src.raw_address);
        const dest = getOrCreateDestination_(ctx, person.person_id, place.place_id, geo.geo_id, [person.canonical_name, place.canonical_name].filter(Boolean).join(' | '));

        upsertFact_(ctx, src, {
          person_id: person.person_id,
          place_id: place.place_id,
          geo_id: geo.geo_id,
          destination_id: dest.destination_id,
          result_status: 'SUCCESS',
          flags: resolved.flags
        }, '');

        markRawSyncStatus_(rowNum, 'SUCCESS');
        successCount++;

      } else if (resolved.action === 'CREATE_NEW') {
        const person = createPerson_(ctx, src.raw_person_name || '(blank_person)', normName_(src.raw_person_name || '(blank_person)'));
        createPersonAlias_(ctx, person.person_id, src.raw_person_name || '(blank_person)', normName_(src.raw_person_name || '(blank_person)'), 'raw_new');

        const placeSeed = src.raw_address || src.geo_address_text || src.raw_person_name || '(blank_place)';
        const place = createPlace_(ctx, placeSeed, normPlace_(placeSeed), src.raw_address || src.geo_address_text, normText_(src.raw_address || src.geo_address_text), src.geo_address_text);
        createPlaceAlias_(ctx, place.place_id, placeSeed, normPlace_(placeSeed), 'raw_new');

        const geo = createGeo_(ctx, src.lat, src.lng, src.geo_address_text || src.raw_address);
        const dest = getOrCreateDestination_(ctx, person.person_id, place.place_id, geo.geo_id, [person.canonical_name, place.canonical_name].filter(Boolean).join(' | '));

        upsertFact_(ctx, src, {
          person_id: person.person_id,
          place_id: place.place_id,
          geo_id: geo.geo_id,
          destination_id: dest.destination_id,
          result_status: 'SUCCESS_NEW',
          flags: resolved.flags
        }, '');

        markRawSyncStatus_(rowNum, 'SUCCESS');
        successCount++;

      } else {
        const reviewId = enqueueReview_(src, resolved);
        upsertFact_(ctx, src, {
          person_id: resolved.personResult.person ? resolved.personResult.person.person_id : '',
          place_id: resolved.placeResult.place ? resolved.placeResult.place.place_id : '',
          geo_id: resolved.geoResult.geo ? resolved.geoResult.geo.geo_id : '',
          destination_id: '',
          result_status: 'REVIEW',
          flags: resolved.flags
        }, reviewId);

        markRawSyncStatus_(rowNum, 'REVIEW');
        reviewCount++;
      }

      processed++;

      if (i % APP.PROCESS.CHECK_EVERY === 0) {
        const elapsed = Date.now() - startedAt;
        if (elapsed >= Number(getCfg_('MAX_MS', APP.PROCESS.MAX_MS))) {
          setProgress_({
            last_row: rowNum + 1,
            mode: 'RUNNING',
            updated_by: 'processRows_'
          });
          scheduleResume_();
          writeLog_('WARN', '05_PROCESS', 'processRows_', '', 'Stopped early due to max time guard', {
            last_row: rowNum + 1
          });
          refreshQualityReport();
          return;
        }
      }

    } catch (err) {
      errorCount++;
      markRawSyncStatus_(rowNum, 'ERROR');
      writeLog_('ERROR', '05_PROCESS', 'processRows_', 'ROW_' + rowNum, err.message, { stack: err.stack });
    }
  }

  setProgress_({
    last_row: lastRow + 1,
    mode: 'DONE',
    updated_by: 'processRows_'
  });
  deleteResumeTriggers_();

  writeLog_('INFO', '05_PROCESS', 'processRows_', '', 'Process finished', {
    processed: processed,
    success: successCount,
    review: reviewCount,
    error: errorCount,
    isResume: !!isResume
  });

  refreshQualityReport();
}

function upsertFact_(ctx, src, resolved, reviewId) {
  const sourceKey = [src.source_sheet, src.source_row].join('|');
  const exist = ctx.factBySourceKey[sourceKey] || (src.source_record_id ? ctx.factByRecordId[src.source_record_id] : null);

  const obj = {
    fact_id: exist ? exist.fact_id : newId_('FAC'),
    source_sheet: src.source_sheet,
    source_row: src.source_row,
    source_record_id: src.source_record_id,
    invoice_no: src.invoice_no,
    shipment_no: src.shipment_no,
    delivery_date: src.delivery_date,
    delivery_time: src.delivery_time,
    owner_name: src.owner_name,
    customer_code: src.customer_code,
    raw_person_name: src.raw_person_name,
    raw_place_name: src.raw_person_name,
    raw_address: src.raw_address,
    lat: src.lat,
    lng: src.lng,
    person_id: resolved.person_id || '',
    place_id: resolved.place_id || '',
    geo_id: resolved.geo_id || '',
    destination_id: resolved.destination_id || '',
    driver_name: src.raw_driver_name,
    employee_id: src.employee_id,
    employee_email: src.employee_email,
    warehouse: src.warehouse,
    distance_km: src.distance_km,
    result_status: resolved.result_status,
    problem_flags: (resolved.flags || []).join('|'),
    review_id: reviewId || '',
    sync_status: resolved.result_status,
    created_at: exist ? exist.created_at : nowStr_(),
    updated_at: nowStr_()
  };

  if (exist) {
    updateRowByHeaders_(APP.SHEETS.FACT, exist._row, obj, APP.HEADERS.FACT);
    obj._row = exist._row;
  } else {
    const newRow = appendObject_(APP.SHEETS.FACT, obj, APP.HEADERS.FACT);
    obj._row = newRow;
  }

  ctx.factBySourceKey[sourceKey] = obj;
  if (src.source_record_id) ctx.factByRecordId[src.source_record_id] = obj;
}

function enqueueReview_(src, resolved) {
  const review = {
    review_id: newId_('REV'),
    created_at: nowStr_(),
    status: 'OPEN',
    issue_type: 'AMBIGUOUS_MATCH',
    source_sheet: src.source_sheet,
    source_row: src.source_row,
    source_record_id: src.source_record_id,
    invoice_no: src.invoice_no,
    raw_person_name: src.raw_person_name,
    raw_place_name: src.raw_person_name,
    raw_address: src.raw_address,
    raw_lat: src.lat,
    raw_long: src.lng,
    candidate_json: JSON.stringify({
      score: resolved.finalScore,
      person: resolved.personResult.candidates,
      place: resolved.placeResult.candidates,
      geo: resolved.geoResult.candidates,
      thai_geo: resolved.thaiGeoHit ? {
        score: resolved.thaiGeoHit.score,
        row: {
          postcode: resolved.thaiGeoHit.row['รหัสไปรษณีย์'],
          subdistrict: resolved.thaiGeoHit.row['แขวง/ตำบล'],
          district: resolved.thaiGeoHit.row['เขต/อำเภอ'],
          province: resolved.thaiGeoHit.row['จังหวัด'],
          note: resolved.thaiGeoHit.row['หมายเหตุ']
        }
      } : null
    }),
    recommended_action: resolved.finalScore < APP.PROCESS.REVIEW_SCORE ? 'CREATE_NEW' : 'MERGE_TO_CANDIDATE',
    score: resolved.finalScore,
    problem_flags: resolved.flags.join('|'),
    note: '',
    decision: '',
    decision_by: '',
    decision_at: '',
    apply_result: ''
  };

  appendObject_(APP.SHEETS.REVIEW, review, APP.HEADERS.REVIEW);
  setupReviewValidation_();
  return review.review_id;
}

function markRawSyncStatus_(rowNum, status) {
  const s = sh_(APP.SHEETS.RAW);
  const map = getHeaderMap_(s);
  const col = map['SYNC_STATUS'];
  if (!col) return;
  s.getRange(rowNum, col).setValue(status);
}
Copy
7) 06_REVIEW_UI.gs
Copyfunction onEdit(e) {
  try {
    if (!e || !e.range) return;

    const sheet = e.range.getSheet();
    if (sheet.getName() !== APP.SHEETS.REVIEW) return;

    const map = getHeaderMap_(sheet);
    const decisionCol = map['decision'];
    if (e.range.getColumn() !== decisionCol || e.range.getRow() < 2) return;

    handleReviewDecision_(e.range.getRow());
  } catch (err) {
    writeLog_('ERROR', '06_REVIEW_UI', 'onEdit', '', err.message, { stack: err.stack });
  }
}

function handleReviewDecision_(rowNum) {
  const s = sh_(APP.SHEETS.REVIEW);
  const headers = APP.HEADERS.REVIEW;
  const row = s.getRange(rowNum, 1, 1, headers.length).getValues()[0];
  const review = {};
  headers.forEach(function(h, i) { review[h] = row[i]; });
  review._row = rowNum;

  if (review.status === 'CLOSED') return;
  const decision = safeStr_(review.decision);
  if (!decision) return;

  if (decision === 'CREATE_NEW') {
    applyCreateNew_(review);
  } else if (decision === 'MERGE_TO_CANDIDATE') {
    applyMergeToCandidate_(review);
  } else if (decision === 'IGNORE') {
    applyIgnore_(review);
  }
}

function getReviewSourceObj_(review) {
  return {
    source_sheet: review.source_sheet,
    source_row: Number(review.source_row),
    source_record_id: review.source_record_id,
    invoice_no: review.invoice_no,
    shipment_no: '',
    delivery_date: '',
    delivery_time: '',
    owner_name: '',
    customer_code: '',
    raw_person_name: review.raw_person_name,
    raw_address: review.raw_address,
    raw_driver_name: '',
    employee_id: '',
    employee_email: '',
    warehouse: '',
    distance_km: '',
    lat: toNum_(review.raw_lat),
    lng: toNum_(review.raw_long),
    geo_address_text: ''
  };
}

function applyCreateNew_(review) {
  const ctx = buildContext_();
  const src = getReviewSourceObj_(review);

  const personSeed = src.raw_person_name || '(blank_person)';
  const person = createPerson_(ctx, personSeed, normName_(personSeed));
  createPersonAlias_(ctx, person.person_id, personSeed, normName_(personSeed), 'review_create_new');

  const placeSeed = src.raw_address || src.raw_person_name || '(blank_place)';
  const place = createPlace_(ctx, placeSeed, normPlace_(placeSeed), src.raw_address, normText_(src.raw_address), '');
  createPlaceAlias_(ctx, place.place_id, placeSeed, normPlace_(placeSeed), 'review_create_new');

  const geo = createGeo_(ctx, src.lat, src.lng, src.raw_address);
  const dest = getOrCreateDestination_(ctx, person.person_id, place.place_id, geo.geo_id, [person.canonical_name, place.canonical_name].join(' | '));

  upsertFact_(ctx, src, {
    person_id: person.person_id,
    place_id: place.place_id,
    geo_id: geo.geo_id,
    destination_id: dest.destination_id,
    result_status: 'SUCCESS_REVIEW_CREATE',
    flags: ['MANUAL_CREATE_NEW']
  }, review.review_id);

  markRawSyncStatus_(src.source_row, 'SUCCESS');
  updateReviewRowResult_(review._row, 'CLOSED', 'CREATE_NEW_APPLIED');
}

function applyMergeToCandidate_(review) {
  const ctx = buildContext_();
  const src = getReviewSourceObj_(review);
  const candidate = review.candidate_json ? JSON.parse(review.candidate_json) : {};

  let personId = '';
  let placeId = '';
  let geoId = '';

  if (candidate.person && candidate.person.length) {
    personId = candidate.person[0].person_id || '';
  }
  if (candidate.place && candidate.place.length) {
    place

Google Maps Formulas for Google Sheets

Dec 5, 2025 Use Google Maps formulas inside Google Sheets to calculate distances, travel time, get driving directions, look up postal codes with reverse geocoding and more! Maps Maps #google maps #google sheets #google apps script
You can bring the power of Google Maps to your Google Sheets using simple formulas with no coding. You don’t need to sign up for the Google Maps API and all results from Google Maps are cached in the sheet so you are unlikely to hit any quota limits.

To give you a quick example, if you have the starting address in column A and the destination address in column B, a formula like =GOOGLEMAPS_DISTANCE(A1, B1, "driving") will quickly calculate the distance between the two points.

Or modify the formula slightly =GOOGLEMAPS_TIME(A1, B1, "walking") to know how long it will take for a person to walk from one point to another.

If you would like to try the Google Maps formulas without getting into the technical details, just make a copy of this Google Sheet and you are all set.

Web Apps & Online Tools

Google Maps - Apps Script

How to Install Google Maps Functions in Google Sheets
To install the Google Maps functions in your Google Sheets, you need to add the functions to your Google Sheet.

Open your Google Sheet and click on “Extensions” in the top menu, then select “Apps Script.”
In the Apps Script editor that opens, replace any existing code with the Google Maps functions below.
Google Maps in Google Sheets

Using Google Maps inside Google Sheets
This tutorial explains how you can easily write custom Google Maps functions inside Google Sheets that will help you:

Maps

Calculate distances between two cities or any addresses.
Calculate the travel time (walking, driving or biking) between two points.
Get the latitude and longitude co-ordinates of any address on Google Maps.
Use reverse geocoding to find the postal address from GPS coordinates.
Print driving directions between any points on earth.
Get the address from the zip code itself.
1. Calculate Distances in Google Sheets
Specify the origin, the destination, the travel mode (walking or driving) and the function will return the distance between the two points in miles.

=GOOGLEMAPS_DISTANCE("NY 10005", "Hoboken NJ", "walking")

/**
 * Calculate the distance between two
 * locations on Google Maps.
 *
 * =GOOGLEMAPS_DISTANCE("NY 10005", "Hoboken NJ", "walking")
 *
 * @param {String} origin The address of starting point
 * @param {String} destination The address of destination
 * @param {String} mode The mode of travel (driving, walking, bicycling or transit)
 * @return {String} The distance in miles
 * @customFunction
 */
const GOOGLEMAPS_DISTANCE = (origin, destination, mode = "driving") => {
  if (!origin || !destination) {
    return "Origin and destination are required!";
  }
  const { routes: [data] = [] } = Maps.newDirectionFinder()
    .setOrigin(origin)
    .setDestination(destination)
    .setMode(mode)
    .getDirections();

  if (!data) {
    return "No route found!";
  }

  const { legs: [{ distance: { text: distance } } = {}] = [] } = data;
  return distance;
};
2. Reverse Geocoding in Google Sheets
Specify the latitude and longitude and get the full address of the point through reverse geocoding of coordinates.

Web Apps & Online Tools

=GOOGLEMAPS_REVERSEGEOCODE(40.7128, -74.0060)

/**
 * Use Reverse Geocoding to get the address of
 * a point location (latitude, longitude) on Google Maps.
 *
 * =GOOGLEMAPS_REVERSEGEOCODE(latitude, longitude)
 *
 * @param {String} latitude The latitude to lookup.
 * @param {String} longitude The longitude to lookup.
 * @return {String} The postal address of the point.
 * @customFunction
 */

const GOOGLEMAPS_REVERSEGEOCODE = (latitude, longitude) => {
  const { results: [data = {}] = [] } = Maps.newGeocoder().reverseGeocode(latitude, longitude);
  return data.formatted_address;
};
3. Get the GPS coordinates of an address
Get the latitude and longitude of any address on Google Maps.

=GOOGLEMAPS_LATLONG("10 Hanover Square, NY")

/**
 * Get the latitude and longitude of any
 * address on Google Maps.
 *
 * =GOOGLEMAPS_LATLONG("10 Hanover Square, NY")
 *
 * @param {String} address The address to lookup.
 * @return {String} The latitude and longitude of the address.
 * @customFunction
 */
const GOOGLEMAPS_LATLONG = address => {
  const { results: [data = null] = [] } = Maps.newGeocoder().geocode(address);
  if (data === null) {
    return "Address not found!";
  }
  const { geometry: { location: { lat, lng } } = {} } = data;
  return `${lat}, ${lng}`;
};
4. Print the driving directions between addresses
Specify the origin address, the destination address, the travel mode and the function will use the Google Maps API to print step-by-step driving directions.

=GOOGLEMAPS_DIRECTIONS("NY 10005", "Hoboken NJ", "walking")

/**
 * Find the driving direction between two
 * locations on Google Maps.
 *
 * =GOOGLEMAPS_DIRECTIONS("NY 10005", "Hoboken NJ", "walking")
 *
 * @param {String} origin The address of starting point
 * @param {String} destination The address of destination
 * @param {String} mode The mode of travel (driving, walking, bicycling or transit)
 * @return {String} The driving direction
 * @customFunction
 */
const GOOGLEMAPS_DIRECTIONS = (origin, destination, mode = "driving") => {
  const { routes = [] } = Maps.newDirectionFinder()
    .setOrigin(origin)
    .setDestination(destination)
    .setMode(mode)
    .getDirections();
  if (!routes.length) {
    throw new Error("No route found!");
  }
  return routes
    .map(({ legs }) => {
      return legs
        .map(({ steps }) => {
          return steps
            .map(step => {
              return step.html_instructions.replace(/<[^>]+>/g, "").replace(/&quot;/g, '"');
            })
            .join(", ");
        })
        .join(", ");
    })
    .join(", ");
};
5. Measure the trip time with Google Maps
Specify the origin address, the destination address, the travel mode and the function will measure your approximate trip time between the specified addresses, provided a route exists.

Maps

=GOOGLEMAPS_DURATION("NY 10005", "Hoboken NJ", "walking")

/**
 * Calculate the travel time between two locations
 * on Google Maps.
 *
 * =GOOGLEMAPS_DURATION("NY 10005", "Hoboken NJ", "walking")
 *
 * @param {String} origin The address of starting point
 * @param {String} destination The address of destination
 * @param {String} mode The mode of travel (driving, walking, bicycling or transit)
 * @return {String} The time in minutes
 * @customFunction
 */
const GOOGLEMAPS_DURATION = (origin, destination, mode = "driving") => {
  if (!origin || !destination) {
    return "Origin and destination are required!";
  }
  const { routes: [data] = [] } = Maps.newDirectionFinder()
    .setOrigin(origin)
    .setDestination(destination)
    .setMode(mode)
    .getDirections();
  if (!data) {
    return "No route found!";
  }
  const { legs: [{ duration: { text: time } } = {}] = [] } = data;
  return time;
};
Google Maps Functions in Sheets

6. Find the Elevation of any location
Calculate the elevation of any location on Google Maps.

=GOOGLEMAPS_ELEVATION(37.423021, -122.083739)

/**
 * Calculate the elevation of any location
 * on Google Maps.
 *
 * =GOOGLEMAPS_ELEVATION(37.423021, -122.083739)
 *
 * @param {String} latitude The latitude of the location
 * @param {String} longitude The longitude of the location
 * @return {String} The elevation in meters
 * @customFunction
 */
const GOOGLEMAPS_ELEVATION = (latitude, longitude) => {
  const { results: [data] = [] } = Maps.newElevationSampler().sampleLocation(latitude, longitude);
  if (!data) {
    return "No elevation data found!";
  }
  return data.elevation;
};
Tip: Improve Formula Performance by Caching
The Google Sheets functions internally use the Google Maps API to calculate routes, distances and travel time. Google offers a limited quota for Maps operations and if your sheet performs too many queries in a short duration, you are likely to see errors like ""Service invoked too many times for one day” or something similar.

Web Apps & Online Tools

To get around the quota issue, it is recommended that you use Apps Script’s built-in cache to store results and, if the results of a function already exist in the case, you’ll make one less request to Google Maps.

The Maps functions inside this Google Sheet also use caching and here’s how you can implement it.

// The cache key for "New York" and "new york  " should be same
const md5 = (key = "") => {
  const code = key.toLowerCase().replace(/\s/g, "");
  return Utilities.computeDigest(Utilities.DigestAlgorithm.MD5, code).reduce(
    (str, byte) => str + (byte + 256).toString(16).slice(-2),
    ""
  );
};

const getCache = key => {
  return CacheService.getDocumentCache().get(md5(key));
};

// Store the results for 6 hours
const setCache = (key, value) => {
  const expirationInSeconds = 6 * 60 * 60;
  CacheService.getDocumentCache().put(md5(key), value, expirationInSeconds);
};

/**
 * Calculate the travel time between two locations
 * on Google Maps.
 *
 * =GOOGLEMAPS_DURATION("NY 10005", "Hoboken NJ", "walking")
 *
 * @param {String} origin The address of starting point
 * @param {String} destination The address of destination
 * @param {String} mode The mode of travel (driving, walking, bicycling or transit)
 * @return {String} The time in minutes
 * @customFunction
 */
const GOOGLEMAPS_DURATION = (origin, destination, mode = "driving") => {
  if (!origin || !destination) {
    return "Origin and destination are required!";
  }
  const key = ["duration", origin, destination, mode].join(",");
  const value = getCache(key);
  if (value !== null) return value;
  const { routes: [data] = [] } = Maps.newDirectionFinder()
    .setOrigin(origin)
    .setDestination(destination)
    .setMode(mode)
    .getDirections();
  if (!data) {
    return "No route found!";
  }
  const { legs: [{ duration: { text: time } } = {}] = [] } = data;
  setCache(key, time);
  return time;
};
Also see: Embed Google Maps in Emails and Documents

ด้านบนนี้ คือ Script ที่อยากได้มาใช้ในโปรเจกต์ของเรา เพราะว่า มันเหมือนได้ใช้Api ที่เสียเงิน แต่ได้ใช้ฟรีๆถ้าใช้ผ่าน Script ดังนั้น คุณช่วยดูหน่อยว่าจะนำส่วนไหนไปปรับใช้ได้บ้าง และ ช่วยทำให้ผมสามารถใช้งานฟังชั่นต่างๆของscriptนี้ ผ่านทางGooglesheetโดยการพิมสูตรได้เลย

และอีกเรื่อง ระบบคุณน่าจะมีปัญหานะ ข้อมูลก็ยังส่งไม่ครบ ระบบก็ตัดไปก่อนอีกแล้ว( รอบที่2) ทีนี้เรามาเข้าเรื่องนะ ตอนนี้ที่ผมได้รับแล้วมี
1.00_CONFIG.gs
2.01_UTILS.gs
3.02_SETUP.gs
4.03_MASTER.gs
5.04_MATCH_ENGINE.gs
6.05_PROCESS.gs
1-6 ไม่ต้องทำส่งมาแล้วนะ เดี๋ยวมันจะค้างอีกให้คุณแค่ 7-8 ส่งมา
7.06_REVIEW_UI.gs
8.07_REPORT_LOOKUP.gs
และอย่าลืม Script GoogleMap ที่ผมเอาให้ดูด้วยนะครับ
กำลังใช้เครื่องมือ
|
การค้นหาแบบขนาน
Google Apps Script Maps service reference newGeocoder newDirectionFinder
Google Apps Script custom functions CacheService document cache
labnol Google Maps formulas Google Sheets Apps Script
ดู
ได้ครับ รอบนี้ผมจะส่ง เฉพาะไฟล์ 7–8 ตามที่คุณสั่ง และผมจะ รวม Google Maps custom formulas เข้าไปในไฟล์ 8 ให้เลย เพื่อให้คุณพิมพ์สูตรใน Google Sheets ได้ทันที โดยไม่ต้องไปแยกคิดต่อเอง

และพูดตรง ๆ เลยว่า แนวคิด Google Maps ที่คุณเอามาให้นั้น เอามาปรับใช้กับโปรเจกต์นี้ได้จริง โดยเฉพาะ 4 กลุ่มงานนี้:

reverse geocode จาก LAT/LONG เพื่อช่วยทำความสะอาด ชื่อที่อยู่จาก_LatLong
geocode / latlong lookup เพื่อใช้ตรวจซ้ำกับ master
postal code lookup เพื่อช่วยเทียบกับ SYS_TH_GEO
distance / duration / directions สำหรับงานตรวจสอบเส้นทางหรือกรณีใช้งานต่อในอนาคต
ตัว Apps Script รองรับ Maps service เช่น DirectionFinder, Geocoder, และ ElevationSampler อยู่แล้ว และสามารถใช้ CacheService เพื่อลดการเรียกซ้ำได้ Source Source Source
ส่วนแนวทาง custom formula แบบที่คุณยกมา เป็นแพตเทิร์นที่ใช้ได้ดีมากสำหรับ Google Sheets Source

และไฟล์ รหัสไปรษณีย์ไทย.xlsx ที่คุณให้มา ใช้ได้ตรงกับโครงสร้าง SYS_TH_GEO ที่เราคุยกัน คือมี 5 คอลัมน์หลัก รหัสไปรษณีย์ / แขวง-ตำบล / เขต-อำเภอ / จังหวัด / หมายเหตุ Source

สิ่งที่ผมส่งให้ในรอบนี้
ไฟล์ที่ 7
06_REVIEW_UI.gs

ไฟล์ที่ 8
07_REPORT_LOOKUP.gs

ไฟล์ 8 นี้ผมรวมให้ครบทั้ง:

รายงานคุณภาพข้อมูล
lookup สำหรับชีตใช้งานในอนาคต
custom formulas ของระบบ master data
custom formulas ของ Google Maps
7) 06_REVIEW_UI.gs
Copyfunction onEdit(e) {
  try {
    if (!e || !e.range) return;

    const sheet = e.range.getSheet();
    if (sheet.getName() !== APP.SHEETS.REVIEW) return;

    const headerMap = getHeaderMap_(sheet);
    const decisionCol = headerMap['decision'];
    if (!decisionCol) return;

    if (e.range.getColumn() !== decisionCol) return;
    if (e.range.getRow() < 2) return;

    handleReviewDecision_(e.range.getRow());
  } catch (err) {
    writeLog_('ERROR', '06_REVIEW_UI', 'onEdit', '', err.message, { stack: err.stack });
  }
}

function handleReviewDecision_(rowNum) {
  const lock = LockService.getDocumentLock();
  lock.waitLock(30000);

  try {
    const review = getReviewRowObject_(rowNum);
    if (!review) return;

    const decision = safeStr_(review.decision);
    if (!decision) return;

    if (safeStr_(review.status) === 'CLOSED') return;

    if (decision === 'CREATE_NEW') {
      applyCreateNew_(review);
    } else if (decision === 'MERGE_TO_CANDIDATE') {
      applyMergeToCandidate_(review);
    } else if (decision === 'IGNORE') {
      applyIgnore_(review);
    } else {
      updateReviewRowMeta_(rowNum, {
        status: 'OPEN',
        apply_result: 'UNKNOWN_DECISION'
      });
    }
  } catch (err) {
    writeLog_('ERROR', '06_REVIEW_UI', 'handleReviewDecision_', 'ROW_' + rowNum, err.message, {
      stack: err.stack
    });
    updateReviewRowMeta_(rowNum, {
      status: 'OPEN',
      apply_result: 'ERROR: ' + err.message
    });
  } finally {
    lock.releaseLock();
  }
}

function getReviewRowObject_(rowNum) {
  const s = sh_(APP.SHEETS.REVIEW);
  const headers = APP.HEADERS.REVIEW;
  const row = s.getRange(rowNum, 1, 1, headers.length).getValues()[0];
  const obj = { _row: rowNum };
  headers.forEach(function(h, i) {
    obj[h] = row[i];
  });
  return obj;
}

function parseCandidateJsonSafe_(text) {
  try {
    if (!text) return {};
    return JSON.parse(text);
  } catch (err) {
    return {};
  }
}

function getRawSourceByRow_(rowNum) {
  const s = sh_(APP.SHEETS.RAW);
  const lastCol = s.getLastColumn();
  const row = s.getRange(rowNum, 1, 1, lastCol).getValues()[0];
  const colMap = getRawColumnMap_();
  return mapSourceRow_(row, rowNum, colMap);
}

function getReviewSourceObj_(review) {
  const rowNum = Number(review.source_row || 0);

  if (rowNum >= 2) {
    try {
      return getRawSourceByRow_(rowNum);
    } catch (err) {
      // fallback to review fields
    }
  }

  return {
    source_sheet: review.source_sheet || APP.SHEETS.RAW,
    source_row: Number(review.source_row || 0),
    source_record_id: safeStr_(review.source_record_id),
    delivery_date: '',
    delivery_time: '',
    raw_point: '',
    raw_driver_name: '',
    shipment_no: '',
    invoice_no: safeStr_(review.invoice_no),
    customer_code: '',
    owner_name: '',
    raw_person_name: safeStr_(review.raw_person_name),
    employee_email: '',
    lat: toNum_(review.raw_lat),
    lng: toNum_(review.raw_long),
    warehouse: '',
    raw_address: safeStr_(review.raw_address),
    distance_km: '',
    geo_address_text: '',
    employee_id: '',
    validation_result: '',
    anomaly_reason: '',
    sync_status: ''
  };
}

function ensurePersonFromReview_(ctx, src, candidateJson) {
  const candidate = (candidateJson.person && candidateJson.person[0]) ? candidateJson.person[0] : null;
  let person = null;

  if (candidate && candidate.person_id && ctx.personById[candidate.person_id]) {
    person = ctx.personById[candidate.person_id];
  }

  if (!person) {
    const found = findBestPerson_(ctx, src.raw_person_name);
    if (found.person) person = found.person;
  }

  if (!person) {
    person = createPerson_(ctx, src.raw_person_name || '(blank_person)', normName_(src.raw_person_name || '(blank_person)'));
  }

  const aliasNorm = normName_(src.raw_person_name || '(blank_person)');
  const aliasExists = (ctx.personAliasByNorm[aliasNorm] || []).some(function(a) {
    return a.person_id === person.person_id;
  });

  if (!aliasExists) {
    createPersonAlias_(ctx, person.person_id, src.raw_person_name || '(blank_person)', aliasNorm, 'review_merge');
  }

  return person;
}

function ensurePlaceFromReview_(ctx, src, candidateJson) {
  const candidate = (candidateJson.place && candidateJson.place[0]) ? candidateJson.place[0] : null;
  let place = null;

  if (candidate && candidate.place_id && ctx.placeById[candidate.place_id]) {
    place = ctx.placeById[candidate.place_id];
  }

  if (!place) {
    const thaiGeoHit = detectThaiGeo_(ctx, [src.raw_address, src.geo_address_text].filter(Boolean).join(' '));
    const found = findBestPlace_(ctx, src.raw_person_name, src.raw_address, src.geo_address_text, thaiGeoHit);
    if (found.place) place = found.place;
  }

  if (!place) {
    const placeSeed = src.raw_address || src.geo_address_text || src.raw_person_name || '(blank_place)';
    place = createPlace_(
      ctx,
      placeSeed,
      normPlace_(placeSeed),
      src.raw_address || src.geo_address_text,
      normText_(src.raw_address || src.geo_address_text),
      src.geo_address_text || ''
    );
  }

  const aliasSeed = src.raw_address || src.raw_person_name || '(blank_place)';
  const aliasNorm = normPlace_(aliasSeed);
  const aliasExists = (ctx.placeAliasByNorm[aliasNorm] || []).some(function(a) {
    return a.place_id === place.place_id;
  });

  if (!aliasExists) {
    createPlaceAlias_(ctx, place.place_id, aliasSeed, aliasNorm, 'review_merge');
  }

  return place;
}

function ensureGeoFromReview_(ctx, src, candidateJson) {
  const candidate = (candidateJson.geo && candidateJson.geo[0]) ? candidateJson.geo[0] : null;
  let geo = null;

  if (candidate && candidate.geo_id && ctx.geoById[candidate.geo_id]) {
    geo = ctx.geoById[candidate.geo_id];
  }

  if (!geo) {
    const found = findBestGeo_(ctx, src.lat, src.lng);
    if (found.geo) geo = found.geo;
  }

  if (!geo) {
    geo = createGeo_(ctx, src.lat, src.lng, src.geo_address_text || src.raw_address);
  }

  return geo;
}

function applyCreateNew_(review) {
  const ctx = buildContext_();
  const src = getReviewSourceObj_(review);

  const personSeed = src.raw_person_name || '(blank_person)';
  const person = createPerson_(ctx, personSeed, normName_(personSeed));
  createPersonAlias_(ctx, person.person_id, personSeed, normName_(personSeed), 'review_create_new');

  const placeSeed = src.raw_address || src.geo_address_text || src.raw_person_name || '(blank_place)';
  const place = createPlace_(
    ctx,
    placeSeed,
    normPlace_(placeSeed),
    src.raw_address || src.geo_address_text,
    normText_(src.raw_address || src.geo_address_text),
    src.geo_address_text || ''
  );
  createPlaceAlias_(ctx, place.place_id, placeSeed, normPlace_(placeSeed), 'review_create_new');

  const geo = createGeo_(ctx, src.lat, src.lng, src.geo_address_text || src.raw_address);
  const dest = getOrCreateDestination_(
    ctx,
    person.person_id,
    place.place_id,
    geo.geo_id,
    [person.canonical_name, place.canonical_name].filter(Boolean).join(' | ')
  );

  upsertFact_(ctx, src, {
    person_id: person.person_id,
    place_id: place.place_id,
    geo_id: geo.geo_id,
    destination_id: dest.destination_id,
    result_status: 'SUCCESS_REVIEW_CREATE',
    flags: ['MANUAL_CREATE_NEW']
  }, review.review_id);

  if (src.source_row) {
    markRawSyncStatus_(src.source_row, 'SUCCESS');
  }

  updateReviewRowMeta_(review._row, {
    status: 'CLOSED',
    apply_result: 'CREATE_NEW_APPLIED'
  });

  writeLog_('INFO', '06_REVIEW_UI', 'applyCreateNew_', review.review_id, 'Review CREATE_NEW applied', {
    source_row: src.source_row,
    person_id: person.person_id,
    place_id: place.place_id,
    geo_id: geo.geo_id,
    destination_id: dest.destination_id
  });
}

function applyMergeToCandidate_(review) {
  const ctx = buildContext_();
  const src = getReviewSourceObj_(review);
  const candidateJson = parseCandidateJsonSafe_(review.candidate_json);

  const person = ensurePersonFromReview_(ctx, src, candidateJson);
  const place = ensurePlaceFromReview_(ctx, src, candidateJson);
  const geo = ensureGeoFromReview_(ctx, src, candidateJson);

  const dest = getOrCreateDestination_(
    ctx,
    person.person_id,
    place.place_id,
    geo.geo_id,
    [person.canonical_name, place.canonical_name].filter(Boolean).join(' | ')
  );

  upsertFact_(ctx, src, {
    person_id: person.person_id,
    place_id: place.place_id,
    geo_id: geo.geo_id,
    destination_id: dest.destination_id,
    result_status: 'SUCCESS_REVIEW_MERGE',
    flags: ['MANUAL_MERGE_TO_CANDIDATE']
  }, review.review_id);

  if (src.source_row) {
    markRawSyncStatus_(src.source_row, 'SUCCESS');
  }

  updateReviewRowMeta_(review._row, {
    status: 'CLOSED',
    apply_result: 'MERGE_TO_CANDIDATE_APPLIED'
  });

  writeLog_('INFO', '06_REVIEW_UI', 'applyMergeToCandidate_', review.review_id, 'Review MERGE_TO_CANDIDATE applied', {
    source_row: src.source_row,
    person_id: person.person_id,
    place_id: place.place_id,
    geo_id: geo.geo_id,
    destination_id: dest.destination_id
  });
}

function applyIgnore_(review) {
  const ctx = buildContext_();
  const src = getReviewSourceObj_(review);

  upsertFact_(ctx, src, {
    person_id: '',
    place_id: '',
    geo_id: '',
    destination_id: '',
    result_status: 'IGNORE',
    flags: ['MANUAL_IGNORE']
  }, review.review_id);

  if (src.source_row) {
    markRawSyncStatus_(src.source_row, 'IGNORE');
  }

  updateReviewRowMeta_(review._row, {
    status: 'CLOSED',
    apply_result: 'IGNORE_APPLIED'
  });

  writeLog_('INFO', '06_REVIEW_UI', 'applyIgnore_', review.review_id, 'Review IGNORE applied', {
    source_row: src.source_row
  });
}

function updateReviewRowMeta_(rowNum, patch) {
  const s = sh_(APP.SHEETS.REVIEW);
  const map = getHeaderMap_(s);
  const actor = (Session.getActiveUser && Session.getActiveUser().getEmail()) ? Session.getActiveUser().getEmail() : 'unknown';

  if (patch.status !== undefined && map['status']) {
    s.getRange(rowNum, map['status']).setValue(patch.status);
  }
  if (map['decision_by']) {
    s.getRange(rowNum, map['decision_by']).setValue(actor);
  }
  if (map['decision_at']) {
    s.getRange(rowNum, map['decision_at']).setValue(nowStr_());
  }
  if (patch.apply_result !== undefined && map['apply_result']) {
    s.getRange(rowNum, map['apply_result']).setValue(patch.apply_result);
  }
}
Copy
8) 07_REPORT_LOOKUP.gs
ไฟล์นี้รวม 3 ส่วนไว้ด้วยกัน:

รายงานคุณภาพข้อมูล
ฟังก์ชัน lookup/master-search สำหรับชีตอนาคต
Google Maps formulas สำหรับพิมพ์ในชีตได้เลย
Copy/************************************************************
 * PART A: REPORT
 ************************************************************/

function refreshQualityReport() {
  const raw = sheetObjects_(APP.SHEETS.RAW);
  const facts = sheetObjects_(APP.SHEETS.FACT);
  const persons = sheetObjects_(APP.SHEETS.PERSON);
  const places = sheetObjects_(APP.SHEETS.PLACE);
  const geos = sheetObjects_(APP.SHEETS.GEO);
  const dests = sheetObjects_(APP.SHEETS.DEST);

  const today = todayStr_();

  const totalRaw = raw.length;
  const processed = raw.filter(function(r) {
    return ['SUCCESS', 'REVIEW', 'ERROR', 'IGNORE'].indexOf(safeStr_(r.SYNC_STATUS)) >= 0;
  }).length;

  const success = raw.filter(function(r) {
    return safeStr_(r.SYNC_STATUS) === 'SUCCESS';
  }).length;

  const review = raw.filter(function(r) {
    return safeStr_(r.SYNC_STATUS) === 'REVIEW';
  }).length;

  const error = raw.filter(function(r) {
    return safeStr_(r.SYNC_STATUS) === 'ERROR';
  }).length;

  const newPerson = persons.filter(function(r) {
    return safeStr_(r.first_seen).indexOf(today) === 0;
  }).length;

  const newPlace = places.filter(function(r) {
    return safeStr_(r.first_seen).indexOf(today) === 0;
  }).length;

  const newGeo = geos.filter(function(r) {
    return safeStr_(r.first_seen).indexOf(today) === 0;
  }).length;

  const newDest = dests.filter(function(r) {
    return safeStr_(r.first_seen).indexOf(today) === 0;
  }).length;

  const reportObj = {
    report_date: today,
    total_raw: totalRaw,
    processed: processed,
    success: success,
    review: review,
    error: error,
    new_person: newPerson,
    new_place: newPlace,
    new_geo: newGeo,
    new_destination: newDest,
    last_run: nowStr_()
  };

  const s = sh_(APP.SHEETS.REPORT);
  const all = s.getDataRange().getValues();
  let foundRow = 0;

  for (let i = 1; i < all.length; i++) {
    if (all[i][0] === today) {
      foundRow = i + 1;
      break;
    }
  }

  if (foundRow) {
    updateRowByHeaders_(APP.SHEETS.REPORT, foundRow, reportObj, APP.HEADERS.REPORT);
  } else {
    appendObject_(APP.SHEETS.REPORT, reportObj, APP.HEADERS.REPORT);
  }

  writeLog_('INFO', '07_REPORT_LOOKUP', 'refreshQualityReport', '', 'Quality report refreshed', reportObj);
}


/************************************************************
 * PART B: MASTER LOOKUP FOR FUTURE SHEET
 ************************************************************/

function calcLookupGeoScore_(inputLat, inputLng, geoRow) {
  if (isBlank_(inputLat) || isBlank_(inputLng) || !geoRow) return 0;
  const d = distanceMeters_(toNum_(inputLat), toNum_(inputLng), toNum_(geoRow.lat), toNum_(geoRow.lng));
  if (d <= 5) return 100;
  if (d <= 10) return 95;
  if (d <= 20) return 85;
  if (d <= 30) return 75;
  if (d <= 50) return 60;
  if (d <= 100) return 35;
  return 0;
}

function calcLookupPersonScore_(customerName, personRow) {
  if (!customerName || !personRow) return 0;
  const base = similarity_(customerName, personRow.canonical_name || personRow.normalized_name);
  const ratio = lengthRatio_(customerName, personRow.canonical_name || personRow.normalized_name);
  return Math.min(base, ratio * 100);
}

function calcLookupPlaceScore_(customerName, customerAddress, placeRow) {
  if (!placeRow) return 0;

  const nameScore = customerName
    ? Math.min(
        similarity_(customerName, placeRow.canonical_name || placeRow.normalized_name),
        lengthRatio_(customerName, placeRow.canonical_name || placeRow.normalized_name) * 100
      )
    : 0;

  const addrScore = customerAddress
    ? addressScore_(customerAddress, placeRow.canonical_address || placeRow.normalized_address)
    : 0;

  if (customerName && customerAddress) {
    return (nameScore * 0.35) + (addrScore * 0.65);
  }
  return Math.max(nameScore, addrScore);
}

function lookupBestDestination(customerName, customerAddress, lat, lng) {
  const ctx = buildContext_();

  const inputName = safeStr_(customerName);
  const inputAddr = safeStr_(customerAddress);
  const inputLat = toNum_(lat);
  const inputLng = toNum_(lng);

  let best = null;
  let bestScore = -1;

  ctx.dests.forEach(function(d) {
    const p = ctx.personById[d.person_id];
    const place = ctx.placeById[d.place_id];
    const geo = ctx.geoById[d.geo_id];

    const personScore = calcLookupPersonScore_(inputName, p);
    const placeScore = calcLookupPlaceScore_(inputName, inputAddr, place);
    const geoScore = calcLookupGeoScore_(inputLat, inputLng, geo);

    let total = 0;

    if (inputName && inputAddr && !isBlank_(inputLat) && !isBlank_(inputLng)) {
      total = (personScore * 0.25) + (placeScore * 0.45) + (geoScore * 0.30);
    } else if (inputName && inputAddr) {
      total = (personScore * 0.30) + (placeScore * 0.70);
    } else if (inputAddr && !isBlank_(inputLat) && !isBlank_(inputLng)) {
      total = (placeScore * 0.60) + (geoScore * 0.40);
    } else if (inputName) {
      total = personScore;
    } else if (inputAddr) {
      total = placeScore;
    } else if (!isBlank_(inputLat) && !isBlank_(inputLng)) {
      total = geoScore;
    }

    const flags = [];

    // เน้นกันผิดกรณี 8 ปัญหา
    if (inputName && p && normName_(inputName) !== normName_(p.canonical_name) && personScore >= 75) {
      flags.push('P4_ALIAS_NAME_MATCH');
    }
    if (inputAddr && place && addressScore_(inputAddr, place.canonical_address || place.normalized_address) < 45 && placeScore >= 55) {
      flags.push('WEAK_ADDRESS_RATIO');
    }
    if (!isBlank_(inputLat) && !isBlank_(inputLng) && geoScore >= 75 && personScore < 45) {
      flags.push('P8_DIFFERENT_PERSON_SAME_GEO');
    }
    if (!isBlank_(inputLat) && !isBlank_(inputLng) && geoScore < 35 && personScore >= 75) {
      flags.push('P7_SAME_PERSON_DIFFERENT_GEO');
    }

    if (total > bestScore) {
      bestScore = total;
      best = {
        destination_id: d.destination_id,
        person_id: d.person_id,
        place_id: d.place_id,
        geo_id: d.geo_id,
        label: d.label,
        person_name: p ? p.canonical_name : '',
        place_name: place ? place.canonical_name : '',
        place_address: place ? (place.canonical_address || place.normalized_address) : '',
        lat: geo ? geo.lat : '',
        lng: geo ? geo.lng : '',
        score: Math.round(total * 100) / 100,
        person_score: Math.round(personScore * 100) / 100,
        place_score: Math.round(placeScore * 100) / 100,
        geo_score: Math.round(geoScore * 100) / 100,
        flags: flags.join('|')
      };
    }
  });

  if (!best || best.score < 55) {
    return {
      status: 'NOT_FOUND',
      destination_id: '',
      person_id: '',
      place_id: '',
      geo_id: '',
      label: '',
      person_name: '',
      place_name: '',
      place_address: '',
      lat: '',
      lng: '',
      score: best ? best.score : 0,
      person_score: best ? best.person_score : 0,
      place_score: best ? best.place_score : 0,
      geo_score: best ? best.geo_score : 0,
      flags: best ? best.flags : 'NO_MATCH'
    };
  }

  best.status = best.score >= 85 ? 'CONFIDENT' : 'REVIEW';
  return best;
}

function testLookup_() {
  const result = lookupBestDestination('สมชาย', 'อ.ศรีราชา จ.ชลบุรี', '', '');
  Logger.log(JSON.stringify(result, null, 2));
}

/**
 * ค้นหา destination ที่ดีที่สุดจาก master
 *
 * =FIND_DESTINATION(A2,B2,C2,D2)
 *
 * A = ชื่อลูกค้า
 * B = ชื่อที่อยู่ลูกค้า
 * C = LAT (optional)
 * D = LONG (optional)
 *
 * @customFunction
 */
function FIND_DESTINATION(customerName, customerAddress, lat, lng) {
  const r = lookupBestDestination(customerName, customerAddress, lat, lng);
  return [[
    r.status,
    r.destination_id,
    r.person_id,
    r.place_id,
    r.geo_id,
    r.person_name,
    r.place_name,
    r.place_address,
    r.lat,
    r.lng,
    r.score,
    r.flags
  ]];
}

/**
 * ดึง Lat,Long จาก master ที่ตรงที่สุด
 *
 * =LOOKUP_LATLNG(A2,B2,C2,D2)
 *
 * @customFunction
 */
function LOOKUP_LATLNG(customerName, customerAddress, lat, lng) {
  const r = lookupBestDestination(customerName, customerAddress, lat, lng);
  if (!r.lat || !r.lng) return '';
  return r.lat + ', ' + r.lng;
}

/**
 * ดึง destination_id จาก master ที่ตรงที่สุด
 *
 * =LOOKUP_DESTINATION_ID(A2,B2,C2,D2)
 *
 * @customFunction
 */
function LOOKUP_DESTINATION_ID(customerName, customerAddress, lat, lng) {
  const r = lookupBestDestination(customerName, customerAddress, lat, lng);
  return r.destination_id || '';
}


/************************************************************
 * PART C: GOOGLE MAPS CUSTOM FORMULAS FOR SHEETS
 * ใช้พิมพ์สูตรในชีตได้เลย
 ************************************************************/

function md5_(key) {
  const raw = safeStr_(key).toLowerCase().replace(/\s+/g, '');
  const bytes = Utilities.computeDigest(Utilities.DigestAlgorithm.MD5, raw);
  return bytes.map(function(b) {
    const v = (b + 256) % 256;
    return ('0' + v.toString(16)).slice(-2);
  }).join('');
}

function getCache_(key) {
  return CacheService.getDocumentCache().get(md5_(key));
}

function setCache_(key, value, seconds) {
  CacheService.getDocumentCache().put(md5_(key), value, seconds || 21600);
}

function getJsonCache_(key) {
  const v = getCache_(key);
  if (!v) return null;
  try {
    return JSON.parse(v);
  } catch (err) {
    return null;
  }
}

function setJsonCache_(key, value, seconds) {
  setCache_(key, JSON.stringify(value), seconds || 21600);
}

function normalizeTravelMode_(mode) {
  const m = safeStr_(mode).toLowerCase() || 'driving';
  if (['driving', 'walking', 'bicycling', 'transit'].indexOf(m) >= 0) return m;
  return 'driving';
}

function unwrapCellValue_(v) {
  if (Array.isArray(v)) {
    if (Array.isArray(v[0])) return v[0][0];
    return v[0];
  }
  return v;
}

function extractAddressComponent_(result, typeName) {
  if (!result || !result.address_components) return '';
  const comp = result.address_components.find(function(c) {
    return c.types && c.types.indexOf(typeName) >= 0;
  });
  return comp ? (comp.long_name || comp.short_name || '') : '';
}

function geocodeAddressCached_(address) {
  const addr = safeStr_(unwrapCellValue_(address));
  if (!addr) return null;

  const key = ['geocode', addr].join('|');
  const cached = getJsonCache_(key);
  if (cached) return cached;

  const response = Maps.newGeocoder().geocode(addr);
  const result = response && response.results && response.results.length ? response.results[0] : null;
  if (result) setJsonCache_(key, result, 21600);
  return result;
}

function reverseGeocodeCached_(lat, lng) {
  const latNum = toNum_(unwrapCellValue_(lat));
  const lngNum = toNum_(unwrapCellValue_(lng));
  if (isBlank_(latNum) || isBlank_(lngNum)) return null;

  const key = ['reverse', round6_(latNum), round6_(lngNum)].join('|');
  const cached = getJsonCache_(key);
  if (cached) return cached;

  const response = Maps.newGeocoder().reverseGeocode(latNum, lngNum);
  const result = response && response.results && response.results.length ? response.results[0] : null;
  if (result) setJsonCache_(key, result, 21600);
  return result;
}

function getDirectionsCached_(origin, destination, mode) {
  const o = safeStr_(unwrapCellValue_(origin));
  const d = safeStr_(unwrapCellValue_(destination));
  const m = normalizeTravelMode_(mode);

  if (!o || !d) return null;

  const key = ['directions', o, d, m].join('|');
  const cached = getJsonCache_(key);
  if (cached) return cached;

  const response = Maps.newDirectionFinder()
    .setOrigin(o)
    .setDestination(d)
    .setMode(m)
    .getDirections();

  const route = response && response.routes && response.routes.length ? response.routes[0] : null;
  if (route) setJsonCache_(key, route, 21600);
  return route;
}

/**
 * ระยะทางจาก Google Maps
 *
 * =GOOGLEMAPS_DISTANCE(A2,B2,"driving")
 *
 * @customFunction
 */
function GOOGLEMAPS_DISTANCE(origin, destination, mode) {
  const route = getDirectionsCached_(origin, destination, mode || 'driving');
  if (!route) return 'No route found!';
  const leg = route.legs && route.legs.length ? route.legs[0] : null;
  return leg && leg.distance ? leg.distance.text : 'No route found!';
}

/**
 * เวลาเดินทางจาก Google Maps
 *
 * =GOOGLEMAPS_DURATION(A2,B2,"driving")
 *
 * @customFunction
 */
function GOOGLEMAPS_DURATION(origin, destination, mode) {
  const route = getDirectionsCached_(origin, destination, mode || 'driving');
  if (!route) return 'No route found!';
  const leg = route.legs && route.legs.length ? route.legs[0] : null;
  return leg && leg.duration ? leg.duration.text : 'No route found!';
}

/**
 * alias ของ duration
 *
 * =GOOGLEMAPS_TIME(A2,B2,"walking")
 *
 * @customFunction
 */
function GOOGLEMAPS_TIME(origin, destination, mode) {
  return GOOGLEMAPS_DURATION(origin, destination, mode || 'driving');
}

/**
 * รายละเอียดเส้นทางแบบทีละขั้น
 *
 * =GOOGLEMAPS_DIRECTIONS(A2,B2,"driving")
 *
 * @customFunction
 */
function GOOGLEMAPS_DIRECTIONS(origin, destination, mode) {
  const route = getDirectionsCached_(origin, destination, mode || 'driving');
  if (!route) return 'No route found!';

  const out = [];
  (route.legs || []).forEach(function(leg) {
    (leg.steps || []).forEach(function(step) {
      const txt = String(step.html_instructions || '')
        .replace(/<[^>]+>/g, '')
        .replace(/&quot;/g, '"')
        .replace(/&nbsp;/g, ' ')
        .trim();
      if (txt) out.push(txt);
    });
  });

  return out.join(' | ');
}

/**
 * หา lat,long จาก address
 *
 * =GOOGLEMAPS_LATLONG(A2)
 *
 * @customFunction
 */
function GOOGLEMAPS_LATLONG(address) {
  const result = geocodeAddressCached_(address);
  if (!result || !result.geometry || !result.geometry.location) return 'Address not found!';
  return result.geometry.location.lat + ', ' + result.geometry.location.lng;
}

/**
 * reverse geocode จาก lat,long
 *
 * =GOOGLEMAPS_REVERSEGEOCODE(C2,D2)
 *
 * @customFunction
 */
function GOOGLEMAPS_REVERSEGEOCODE(lat, lng) {
  const result = reverseGeocodeCached_(lat, lng);
  return result ? (result.formatted_address || '') : 'Address not found!';
}

/**
 * ดึงรหัสไปรษณีย์จาก address หรือ lat/long
 *
 * ใช้ได้ 2 แบบ:
 * =GOOGLEMAPS_POSTCODE(A2)
 * =GOOGLEMAPS_POSTCODE(C2,D2)
 *
 * @customFunction
 */
function GOOGLEMAPS_POSTCODE(input1, input2) {
  let result = null;

  if (!isBlank_(input2) || (String(input1).match(/^-?\d+(\.\d+)?$/) && String(input2).match(/^-?\d+(\.\d+)?$/))) {
    result = reverseGeocodeCached_(input1, input2);
  } else {
    result = geocodeAddressCached_(input1);
  }

  if (!result) return '';
  return extractAddressComponent_(result, 'postal_code');
}

/**
 * ดึงจังหวัดจาก address หรือ lat/long
 *
 * =GOOGLEMAPS_PROVINCE(A2)
 * =GOOGLEMAPS_PROVINCE(C2,D2)
 *
 * @customFunction
 */
function GOOGLEMAPS_PROVINCE(input1, input2) {
  let result = null;

  if (!isBlank_(input2) || (String(input1).match(/^-?\d+(\.\d+)?$/) && String(input2).match(/^-?\d+(\.\d+)?$/))) {
    result = reverseGeocodeCached_(input1, input2);
  } else {
    result = geocodeAddressCached_(input1);
  }

  if (!result) return '';
  return extractAddressComponent_(result, 'administrative_area_level_1');
}

/**
 * ดึงอำเภอ/เขต จาก address หรือ lat/long
 *
 * =GOOGLEMAPS_DISTRICT(A2)
 * =GOOGLEMAPS_DISTRICT(C2,D2)
 *
 * @customFunction
 */
function GOOGLEMAPS_DISTRICT(input1, input2) {
  let result = null;

  if (!isBlank_(input2) || (String(input1).match(/^-?\d+(\.\d+)?$/) && String(input2).match(/^-?\d+(\.\d+)?$/))) {
    result = reverseGeocodeCached_(input1, input2);
  } else {
    result = geocodeAddressCached_(input1);
  }

  if (!result) return '';
  return extractAddressComponent_(result, 'administrative_area_level_2');
}

/**
 * ดึงตำบล/แขวง จาก address หรือ lat/long
 *
 * =GOOGLEMAPS_SUBDISTRICT(A2)
 * =GOOGLEMAPS_SUBDISTRICT(C2,D2)
 *
 * @customFunction
 */
function GOOGLEMAPS_SUBDISTRICT(input1, input2) {
  let result = null;

  if (!isBlank_(input2) || (String(input1).match(/^-?\d+(\.\d+)?$/) && String(input2).match(/^-?\d+(\.\d+)?$/))) {
    result = reverseGeocodeCached_(input1, input2);
  } else {
    result = geocodeAddressCached_(input1);
  }

  if (!result) return '';
  return extractAddressComponent_(result, 'sublocality_level_1') ||
         extractAddressComponent_(result, 'locality') ||
         extractAddressComponent_(result, 'administrative_area_level_3');
}

/**
 * ความสูงจากระดับน้ำทะเล
 *
 * =GOOGLEMAPS_ELEVATION(C2,D2)
 *
 * @customFunction
 */
function GOOGLEMAPS_ELEVATION(lat, lng) {
  const latNum = toNum_(unwrapCellValue_(lat));
  const lngNum = toNum_(unwrapCellValue_(lng));

  if (isBlank_(latNum) || isBlank_(lngNum)) return '';

  const key = ['elevation', round6_(latNum), round6_(lngNum)].join('|');
  const cached = getCache_(key);
  if (cached !== null) return cached;

  const response = Maps.newElevationSampler().sampleLocation(latNum, lngNum);
  const result = response && response.results && response.results.length ? response.results[0] : null;
  if (!result) return 'No elevation data found!';

  const elevation = result.elevation;
  setCache_(key, String(elevation), 21600);
  return elevation;
}

/**
 * รวม reverse geocode + postcode + จังหวัด ในครั้งเดียว
 *
 * =GOOGLEMAPS_ENRICH(C2,D2)
 *
 * คืนค่าเป็น 1 แถว 4 คอลัมน์:
 * [formatted_address, postal_code, district, province]
 *
 * @customFunction
 */
function GOOGLEMAPS_ENRICH(lat, lng) {
  const result = reverseGeocodeCached_(lat, lng);
  if (!result) return [['', '', '', '']];

  return [[
    result.formatted_address || '',
    extractAddressComponent_(result, 'postal_code'),
    extractAddressComponent_(result, 'administrative_area_level_2'),
    extractAddressComponent_(result, 'administrative_area_level_1')
  ]];
}
Copy
สูตรที่คุณจะใช้ได้ทันทีใน Google Sheets
สูตรจากระบบ master data ของเรา
1) หาปลายทางที่ตรงที่สุด
Copy=FIND_DESTINATION(A2,B2,C2,D2)
A2 = ชื่อลูกค้า
B2 = ชื่อที่อยู่ลูกค้า
C2 = LAT
D2 = LONG
ผลลัพธ์จะคืน:

status
destination_id
person_id
place_id
geo_id
person_name
place_name
place_address
lat
lng
score
flags
2) เอาเฉพาะ LatLong ที่ควรใช้
Copy=LOOKUP_LATLNG(A2,B2,C2,D2)
3) เอาเฉพาะ destination_id
Copy=LOOKUP_DESTINATION_ID(A2,B2,C2,D2)
สูตร Google Maps ที่ใช้ได้ทันที
หา lat,long จาก address
Copy=GOOGLEMAPS_LATLONG(A2)
หา address จาก lat,long
Copy=GOOGLEMAPS_REVERSEGEOCODE(C2,D2)
หา postal code
Copy=GOOGLEMAPS_POSTCODE(A2)
หรือ

Copy=GOOGLEMAPS_POSTCODE(C2,D2)
หาจังหวัด
Copy=GOOGLEMAPS_PROVINCE(A2)
หาเขต/อำเภอ
Copy=GOOGLEMAPS_DISTRICT(A2)
หาแขวง/ตำบล
Copy=GOOGLEMAPS_SUBDISTRICT(A2)
ระยะทาง
Copy=GOOGLEMAPS_DISTANCE(A2,B2,"driving")
เวลาเดินทาง
Copy=GOOGLEMAPS_DURATION(A2,B2,"driving")
alias อีกชื่อ
Copy=GOOGLEMAPS_TIME(A2,B2,"walking")
คำสั่งเส้นทาง
Copy=GOOGLEMAPS_DIRECTIONS(A2,B2,"driving")
ความสูงจากระดับน้ำทะเล
Copy=GOOGLEMAPS_ELEVATION(C2,D2)
enrich ทีเดียว 4 ช่อง
Copy=GOOGLEMAPS_ENRICH(C2,D2)
สิ่งที่คุณเอาไปใช้กับโปรเจกต์นี้ได้ทันที
1) ใช้ Maps formulas เพื่อ “เติมข้อมูลช่วยตัดสิน”
เช่นในชีต staging หรือชีตตรวจสอบ:

reverse geocode จาก LAT/LONG
ดึง postal code
ดึง province / district / subdistrict
แล้วเอาไปเทียบกับ SYS_TH_GEO

2) ใช้ GOOGLEMAPS_POSTCODE + SYS_TH_GEO
นี่สำคัญมาก เพราะจะช่วย:

เช็คว่าพิกัดนี้ควรอยู่โซนไหน
ลดการ merge ผิดระหว่างลูกค้าชื่อคล้ายกันแต่คนละอำเภอ
ใช้ประกอบ review ได้ดีมาก
3) ใช้ LOOKUP_LATLNG กับชีตใหม่ในอนาคต
ตอนที่คุณเพิ่มชีตใหม่เพื่อ “ค้นหาพิกัดจากชื่อ/ที่อยู่ลูกค้า” คุณสามารถเรียก:

Copy=LOOKUP_LATLNG(A2,B2)
หรือ

Copy=FIND_DESTINATION(A2,B2,C2,D2)
เพื่อดึง master ที่ผ่านการแก้ 8 ปัญหาแล้วกลับมาใช้ได้ทันที

ข้อสังเกตสำคัญที่ผมแนะนำเพิ่ม
1) Google Maps formulas ช่วยมาก แต่ไม่ควรเป็น “master truth” เพียงตัวเดียว
เพราะ address จาก geocoder อาจสวยกว่า แต่ไม่ได้แปลว่าตรงกับจุดใช้งานธุรกิจของคุณเสมอ
ในระบบนี้ ตัวจริงควรเป็น:

master data ที่คุณ curate เอง
review queue ที่คุณตัดสินเอง
geo point ที่เกิดจากงานส่งจริง
Google Maps ควรเป็น “ตัวช่วย enrich / validate / suggest” มากกว่า “ตัดสินเด็ดขาดแทนคุณ” Source

2) Cache สำคัญมาก
ผมใส่ cache ไว้แล้ว เพราะการเรียก geocode/directions ซ้ำเยอะ ๆ มีโอกาสชน quota ได้ การใช้ Document Cache ช่วยลดการยิงซ้ำได้ดี Source

3) ชีต SYS_TH_GEO ใช้ได้เต็มที่กับการช่วย normalize จังหวัด/อำเภอ/ตำบล
และช่อง หมายเหตุ ควรใช้เป็นตัวช่วย scoring / rule enrichment ไม่ควรใช้เป็น key หลักเพียงตัวเดียว Source

ลำดับที่ผมแนะนำให้คุณทำต่อทันที
ขั้นที่ 1
วางไฟล์ 06_REVIEW_UI.gs และ 07_REPORT_LOOKUP.gs

ขั้นที่ 2
รันเมนู:

Setup Project
Rebuild Thai Geo Index
ขั้นที่ 3
ทดสอบในชีตใหม่ด้วยสูตรพวกนี้ก่อน

Copy=GOOGLEMAPS_REVERSEGEOCODE(C2,D2)
=GOOGLEMAPS_POSTCODE(C2,D2)
=GOOGLEMAPS_PROVINCE(C2,D2)
=LOOKUP_LATLNG(A2,B2,C2,D2)
=FIND_DESTINATION(A2,B2,C2,D2)
ขั้นที่ 4
ทดสอบ workflow review

ให้ระบบสร้างแถวใน Q_REVIEW
เลือก dropdown ในคอลัมน์ decision
ดูว่า raw sheet ถูกอัปเดต SYNC_STATUS เป็น SUCCESS หรือ IGNORE
ถ้าคุณต้องการ รอบถัดไปผมทำต่อให้ได้ 3 อย่าง
เช็กลูกเล่น/บั๊กในไฟล์ 1–6 แบบไม่ส่งโค้ดซ้ำ
ผมจะทำเป็นรายการ “ต้องแก้บรรทัดไหน” ให้สั้น ๆ

ทำชีตค้นหาใช้งานจริง
เช่นชีต SEARCH_DESTINATION ที่คุณแค่กรอก:

ชื่อลูกค้า
ที่อยู่ลูกค้า
แล้วระบบคืน:
destination_id
lat/long
confidence
master ที่ match ได้
เพิ่ม rule engine สำหรับ SYS_TH_GEO[หมายเหตุ]
เช่นแยก:
เฉพาะอาคาร...
เฉพาะหมู่...
ยกเว้น...ใช้รหัส... ให้ฉลาดขึ้นอีกขั้น
ถ้าต้องการ ผมขอเสนอว่ารอบหน้าให้ผมทำต่อแบบนี้:
“ตรวจไฟล์ 1–6 แบบ patch list + ออกแบบชีต SEARCH_DESTINATION + เพิ่ม rule parser ของหมายเหตุ”
แบบนี้จะต่อเนื่องและไม่เสี่ยงข้อความถูกตัดอีกครับ

อธิบายความหมายคอลัมน์ข้อมูลดิบให้อีกรอบครับ
คอลัมน์"จุดส่งสินค้าปลายทาง" = ตัวเลข LatLong (ทศนิยม 6หลัก)

คอลัมน์"ชื่อเจ้าของสินค้า" = ชื่อบริษัทที่ขายของ

คอลัมน์"ชื่อปลายทาง" = ชื่อบุคคลลูกค้าที่สั่งของ อันนี้แหละตัว ปัญหา

คอลัมน์"LAT" = ตัวเลขละติจูด(ทศนิยม6หลัก)แปลงมาจากคอลัมน์"จุดส่งสินค้าปลายทาง" 

คอลัมน์"LONG" = ตัวเลข ลองจิจูด(ทศนิยม6หลัก)แปลงมาจากคอลัมน์"จุดส่งสินค้าปลายทาง"

คอลัมน์"ที่อยู่ปลายทาง" = ชื่อสถานที่อยู่ มั่วๆมาจากระบบ อันนี้แหละตัวปัญหา

คอลัมน์" ระยะทางจากคลัง_Km" = ตัวเลขระยะทาง ที่เริ่มจากต้นทางคลังscgวังน้อย ไปจนถึง จุดส่งสินค้าปลายทาง โดยใช้scriptทำให้

คอลัมน์"ชื่อที่อยู่จาก_LatLong" = ชื่อสถานที่อยู่ ที่แปลงข้อมูลมาจาก คอลัมน์"จุดส่งสินค้าปลายทาง" แปลงเป็นข้อความโดยใช้scriptทำให้
ได้ครับ รอบนี้ผมจะ สรุปความหมายคอลัมน์ข้อมูลดิบใหม่แบบเป็นทางการ ให้ชัดเจนเลย เพื่อให้เราใช้เป็น “นิยามกลางของโปรเจกต์” และจะได้ไม่ตีความผิดตอนออกแบบฐานข้อมูล, เขียน Apps Script, ทำ matching logic และแก้ปัญหา 8 ข้อ

นิยามข้อมูลดิบที่ถูกต้องของโปรเจกต์นี้
ด้านล่างนี้คือความหมายที่ผมเข้าใจจากคำอธิบายล่าสุดของคุณ และผมจะยึดความหมายนี้เป็นหลักต่อจากนี้

1) คอลัมน์ จุดส่งสินค้าปลายทาง
ความหมาย
เป็น ตัวเลขพิกัด LatLong ของจุดส่งจริง
อยู่ในรูปข้อความหรือค่าที่เก็บเป็นคู่พิกัด เช่น

Copy13.123456,100.123456
และเป็นพิกัดแบบ ทศนิยม 6 หลัก

สถานะความน่าเชื่อถือ
ถือว่าเป็น ข้อมูลสำคัญมาก และเป็นหนึ่งในคอลัมน์ที่น่าเชื่อถือที่สุด
เพราะเป็นจุดที่คนขับกดส่งงานจริง

บทบาทในระบบ
คอลัมน์นี้ควรถูกมองเป็น:

Geo Point หลักของงานส่ง
ต้นทางของการสร้าง LAT
ต้นทางของการสร้าง LONG
ต้นทางของการแปลงเป็นที่อยู่ข้อความใน ชื่อที่อยู่จาก_LatLong
ใช้เป็นตัวช่วยสำคัญในการแก้ปัญหาเรื่องข้อมูลมั่วของ ชื่อปลายทาง และ ที่อยู่ปลายทาง
สรุปสั้น
คอลัมน์นี้คือ “พิกัดจริงของงานส่ง”

2) คอลัมน์ ชื่อเจ้าของสินค้า
ความหมาย
คือ ชื่อบริษัทที่ขายของ
ไม่ใช่ชื่อลูกค้าปลายทาง
ไม่ใช่ชื่อสถานที่ส่ง
ไม่ใช่ชื่อคนขับ

ตัวอย่างแนวคิด
เช่น

SCG
บริษัท A
บริษัท B
บริษัทพวกนี้คือ “เจ้าของสินค้า” หรือ “ผู้ขาย”

สถานะความน่าเชื่อถือ
โดยทั่วไปถือว่า ค่อนข้างน่าเชื่อถือ ในฐานะข้อมูลเชิงธุรกิจ
แต่ ไม่ควรใช้เป็นตัวระบุปลายทางโดยตรง

บทบาทในระบบ
คอลัมน์นี้ควรใช้เพื่อ:

แยกบริบทธุรกิจว่า ลูกค้ารายเดียวกันอาจซื้อของจากหลายบริษัท
ช่วยวิเคราะห์ alias ของลูกค้าบางกรณี
ช่วยทำรายงาน เช่น ลูกค้าคนนี้รับสินค้าจากบริษัทไหนบ้าง
ใช้เป็น metadata ของธุรกรรมส่งสินค้า
สิ่งที่ไม่ควรทำ
ไม่ควรเอาคอลัมน์นี้ไปใช้แทน:

ชื่อปลายทาง
ที่อยู่ปลายทาง
สถานที่ส่ง
สรุปสั้น
คอลัมน์นี้คือ “บริษัทผู้ขาย/เจ้าของสินค้า”

3) คอลัมน์ ชื่อปลายทาง
ความหมาย
คือ ชื่อบุคคลลูกค้าที่สั่งของ

และนี่คือคอลัมน์ที่คุณย้ำชัดว่าเป็น ตัวปัญหาหลัก

ปัญหาของคอลัมน์นี้
ข้อมูลในคอลัมน์นี้อาจมีลักษณะดังนี้

เขียนไม่ครบ
เขียนไม่เหมือนกัน
มีคำนำหน้า/ไม่มีคำนำหน้า
มีชื่อเล่น
มีคำแทรก เช่น ร้าน, ช่าง, พี่, คุณ
บางครั้งเป็นชื่อคน
บางครั้งปนชื่อร้าน
บางครั้งตัดคำมามั่ว
บางครั้งคนเดียวกันแต่คนละบริษัทเรียกไม่เหมือนกัน
ตัวอย่างปัญหา
เช่น คนเดียวกันอาจถูกเขียนเป็น

สมชาย
คุณสมชาย
ช่างสมชาย
สมชาย รับของ
สมชาย ร้านวัสดุ
นายสมชาย
ทั้งหมดนี้อาจเป็นคนเดียวกัน หรืออาจไม่ใช่ก็ได้

สถานะความน่าเชื่อถือ
เป็นข้อมูลที่ สำคัญมาก แต่สกปรกมาก จึง ห้ามใช้เป็น primary key และ ห้ามใช้ตัดสินปลายทางเพียงคอลัมน์เดียว

บทบาทในระบบ
คอลัมน์นี้ต้องถูกใช้เป็น:

raw_person_name
วัตถุดิบสำหรับสร้าง Person Master
วัตถุดิบสำหรับ Person Alias
หนึ่งในตัวช่วยแก้ปัญหา 8 ข้อ
สรุปสั้น
คอลัมน์นี้คือ “ชื่อบุคคลลูกค้า”
แต่เป็นข้อมูลดิบที่ ต้อง normalize + match + review

4) คอลัมน์ LAT
ความหมาย
คือ ตัวเลขละติจูดแบบทศนิยม 6 หลัก
และถูกแปลงมาจากคอลัมน์ จุดส่งสินค้าปลายทาง

ความสัมพันธ์กับคอลัมน์อื่น
LAT และ LONG คือผลจากการแยกค่าพิกัดออกมาจาก

จุดส่งสินค้าปลายทาง
เช่น

จุดส่งสินค้าปลายทาง = 13.123456,100.123456
LAT = 13.123456
LONG = 100.123456
สถานะความน่าเชื่อถือ
ถือว่า น่าเชื่อถือสูง เพราะมาจากพิกัดจริงชุดเดียวกัน

บทบาทในระบบ
ใช้สำหรับ:

สร้าง M_GEO_POINT
เทียบจุดซ้ำ / จุดใกล้เคียง
reverse geocode
ค้นหาปลายทางจากพิกัด
ช่วยแยกว่า “ชื่อเหมือนกันแต่คนละที่”
ช่วยแยกว่า “คนละชื่อแต่พิกัดเดียวกัน”
สรุปสั้น
คอลัมน์นี้คือ ละติจูดจริงของจุดส่ง

5) คอลัมน์ LONG
ความหมาย
คือ ตัวเลขลองจิจูดแบบทศนิยม 6 หลัก
และถูกแปลงมาจากคอลัมน์ จุดส่งสินค้าปลายทาง

สถานะความน่าเชื่อถือ
เช่นเดียวกับ LAT คือ น่าเชื่อถือสูง

บทบาทในระบบ
ใช้ร่วมกับ LAT เสมอ เพื่อเป็น:

พิกัดจริงของปลายทาง
ตัวระบุ geo point
ตัวช่วยในการจับคู่ destination
ตัวช่วยตรวจความถูกต้องของชื่อ/ที่อยู่
สรุปสั้น
คอลัมน์นี้คือ ลองจิจูดจริงของจุดส่ง

6) คอลัมน์ ที่อยู่ปลายทาง
ความหมาย
คือ ชื่อสถานที่อยู่ ที่มาจากระบบเดิม
และคุณย้ำว่าอันนี้ก็เป็น ตัวปัญหาอีกตัวหลัก

ลักษณะของข้อมูล
ข้อมูลนี้อาจเป็น

ชื่อที่อยู่
ชื่อสถานที่
ชื่อร้าน
ข้อความประกอบที่อยู่
ข้อความตัดมาไม่ครบ
ข้อความมั่วจากระบบ
ข้อความไม่มาตรฐาน
ประเด็นสำคัญ
คอลัมน์นี้ ไม่ใช่พิกัดจริง และ ไม่ใช่ที่อยู่ที่เชื่อถือได้ 100% แต่เป็น “ข้อความที่ระบบเดิมพยายามให้เป็นที่อยู่”

สถานะความน่าเชื่อถือ
อยู่ระดับ กลางถึงต่ำ เพราะเป็นข้อความมั่วจากระบบ

บทบาทในระบบ
ควรใช้เป็น:

raw_place_address
วัตถุดิบสำหรับสร้าง Place Master
ใช้เทียบกับ ชื่อที่อยู่จาก_LatLong
ใช้เทียบกับ SYS_TH_GEO
ใช้ช่วย scoring แต่ไม่ควรเป็นตัวตัดสินหลัก
สิ่งที่ไม่ควรทำ
ไม่ควรใช้คอลัมน์นี้:

เป็น key หลักของสถานที่
merge สถานที่โดยตรงทันที
สรุปว่า address เดียวกันแน่ ๆ จากข้อความเพียงอย่างเดียว
สรุปสั้น
คอลัมน์นี้คือ “ข้อความที่อยู่/สถานที่จากระบบเดิม”
มีประโยชน์ แต่ สกปรกและต้องตรวจซ้ำ

7) คอลัมน์ ระยะทางจากคลัง_Km
ความหมาย
คือ ตัวเลขระยะทาง ที่คำนวณจาก

ต้นทาง = คลัง SCG วังน้อย
ปลายทาง = จุดส่งสินค้าปลายทาง
และถูกสร้างโดยสคริปต์

สถานะความน่าเชื่อถือ
ถือว่า มีประโยชน์เชิงวิเคราะห์ แต่ไม่ใช่ข้อมูลหลักสำหรับระบุตัวตนลูกค้า

บทบาทในระบบ
ใช้เพื่อ:

วิเคราะห์ว่าปลายทางนี้อยู่ไกลจากคลังเท่าไร
ใช้ตรวจความผิดปกติ
ใช้ทำรายงาน
ใช้เช็ค sanity ของข้อมูล เช่น ถ้าพิกัดผิดมาก ระยะทางอาจผิดธรรมชาติ
สิ่งที่ไม่ควรทำ
ไม่ควรใช้เป็นตัว match หลักของ customer/place
เพราะระยะทางเดียวกันไม่ได้แปลว่าเป็นที่เดียวกัน

สรุปสั้น
คอลัมน์นี้คือ “ระยะทางเชิงคำนวณจากคลังไปจุดส่ง”

8) คอลัมน์ ชื่อที่อยู่จาก_LatLong
ความหมาย
คือ ชื่อสถานที่อยู่แบบข้อความ
ที่ถูกแปลงมาจากคอลัมน์ จุดส่งสินค้าปลายทาง โดยใช้ script

พูดให้ตรงคือ มันเป็นผลของ reverse geocoding

ความแตกต่างจาก ที่อยู่ปลายทาง
สองคอลัมน์นี้คนชอบสับสนมาก จึงต้องแยกให้ชัด:

ที่อยู่ปลายทาง
มาจากระบบเดิม
เป็นข้อความที่ระบบต้นทางให้มา
มั่วได้มาก
ชื่อที่อยู่จาก_LatLong
มาจากพิกัดจริง
ระบบแปลงจาก LatLong เป็นข้อความ
โดยทั่วไปน่าเชื่อถือกว่าในเชิงตำแหน่ง
แต่บางครั้ง wording อาจไม่ตรงภาษาคนใช้งานจริง
สถานะความน่าเชื่อถือ
โดยทั่วไปถือว่า น่าเชื่อถือมากกว่า ที่อยู่ปลายทาง ในฐานะ “ข้อความที่สะท้อนตำแหน่งจริง”

บทบาทในระบบ
คอลัมน์นี้สำคัญมาก เพราะควรใช้เป็น:

geo_resolved_address
ตัวช่วย normalize สถานที่
ตัวช่วยเทียบกับ SYS_TH_GEO
ตัวช่วยเช็คอำเภอ/ตำบล/จังหวัด
ตัวช่วยแยกสาขา
ตัวช่วยตรวจว่าที่อยู่จากระบบเดิมเพี้ยนแค่ไหน
สรุปสั้น
คอลัมน์นี้คือ “ที่อยู่ข้อความที่สร้างจากพิกัดจริง”

สรุปความสัมพันธ์ของ 8 คอลัมน์นี้แบบสั้นและชัด
กลุ่มพิกัดจริง
คอลัมน์ที่น่าเชื่อถือสูงสุดในเชิงตำแหน่งคือ

จุดส่งสินค้าปลายทาง
LAT
LONG
คอลัมน์พวกนี้สะท้อน ตำแหน่งจริงของจุดส่ง

กลุ่มชื่อบุคคล
คอลัมน์ที่บอกว่า “ใครเป็นลูกค้า” คือ

ชื่อปลายทาง
แต่มันเป็นข้อมูลดิบที่สกปรกมาก ต้องทำ alias/matching/review

กลุ่มชื่อสถานที่/ที่อยู่
คอลัมน์ที่เกี่ยวกับที่อยู่มี 2 ตัว

ที่อยู่ปลายทาง = ข้อความมั่วจากระบบ
ชื่อที่อยู่จาก_LatLong = ข้อความที่แปลงจากพิกัดจริง
ถ้าให้เรียงความน่าเชื่อถือในเชิงตำแหน่ง:

LAT/LONG
ชื่อที่อยู่จาก_LatLong
ที่อยู่ปลายทาง
กลุ่มข้อมูลบริบทธุรกิจ
คอลัมน์ที่ช่วยบอกบริบทธุรกรรมคือ

ชื่อเจ้าของสินค้า
ระยะทางจากคลัง_Km
สองตัวนี้มีประโยชน์มาก แต่ไม่ใช่ key หลักของการระบุตัวตนปลายทาง

นิยามเชิงระบบที่ผมแนะนำให้ใช้ต่อจากนี้
เพื่อไม่ให้การออกแบบสคริปต์เพี้ยน ผมขอสรุปเป็น mapping กลางแบบนี้

คอลัมน์ดิบ	นิยามในระบบ
จุดส่งสินค้าปลายทาง	raw_geo_text
LAT	raw_lat
LONG	raw_lng
ชื่อปลายทาง	raw_person_name
ที่อยู่ปลายทาง	raw_system_address
ชื่อที่อยู่จาก_LatLong	raw_geo_resolved_address
ชื่อเจ้าของสินค้า	raw_owner_company
ระยะทางจากคลัง_Km	raw_distance_from_warehouse_km
ลำดับความน่าเชื่อถือที่ระบบควรใช้
ผมแนะนำให้ระบบถือ “น้ำหนักความน่าเชื่อถือ” แบบนี้

สำหรับการระบุตำแหน่ง
LAT + LONG
จุดส่งสินค้าปลายทาง
ชื่อที่อยู่จาก_LatLong
ที่อยู่ปลายทาง
สำหรับการระบุตัวบุคคล
ชื่อปลายทาง
แต่ต้องผ่าน normalization + alias + review ก่อนเสมอ
สำหรับบริบทธุรกิจ
ชื่อเจ้าของสินค้า
Invoice No
รหัสลูกค้า
ระยะทางจากคลัง_Km
สิ่งที่การตีความใหม่นี้ทำให้ต้อง “แก้โค้ดเชิงตรรกะ”
จากคำอธิบายล่าสุดของคุณ มีจุดสำคัญที่ต้องย้ำให้ระบบคิดใหม่ให้ถูก:

1) ชื่อปลายทาง = คน ไม่ใช่สถานที่
ดังนั้นในโค้ด matching:

ต้องส่งเข้า person logic เป็นหลัก
ห้ามเอาไปใช้แทน place โดยตรงแบบเหมารวม
2) ที่อยู่ปลายทาง = ข้อความที่อยู่จากระบบเดิมที่มั่ว
ดังนั้น:

ใช้เป็น input ของ place/address scoring ได้
แต่ห้ามเชื่อ 100%
3) ชื่อที่อยู่จาก_LatLong = address ที่ derive จากพิกัดจริง
ดังนั้น:

ควรมีน้ำหนักมากกว่า ที่อยู่ปลายทาง
ใช้เทียบกับ SYS_TH_GEO ได้ดีมาก
4) LAT/LONG มาจาก จุดส่งสินค้าปลายทาง
ดังนั้น:

ถ้ามี LAT/LONG แล้ว ถือเป็นค่าหลัก
จุดส่งสินค้าปลายทาง เป็น raw source สำรอง/ตรวจย้อนกลับ
5) ชื่อเจ้าของสินค้า ไม่ใช่ผู้รับ
ดังนั้น:

อย่าเอาไปสร้าง person master ของลูกค้า
แต่สามารถใช้เป็น context ว่า “ลูกค้าคนเดียวกันอาจซื้อจากหลายเจ้าของสินค้า”
ถ้าจะเขียนเป็นคู่มือให้ทีมใช้งาน ควรอธิบายแบบนี้
คำอธิบายสั้นสำหรับทีม
ชื่อปลายทาง = ชื่อลูกค้าบุคคล
ที่อยู่ปลายทาง = ที่อยู่จากระบบเดิม อาจมั่ว
ชื่อที่อยู่จาก_LatLong = ที่อยู่จากพิกัดจริง
LAT/LONG = พิกัดจริงของจุดส่ง
ชื่อเจ้าของสินค้า = บริษัทผู้ขาย
ระยะทางจากคลัง_Km = ระยะจากคลังวังน้อยถึงจุดส่ง
ข้อสรุปสำคัญที่สุดสำหรับโปรเจกต์นี้
ถ้าจะพูดให้สั้นและตรงที่สุด:

ตัวจริงของตำแหน่ง คือ จุดส่งสินค้าปลายทาง / LAT / LONG
ตัวจริงของคน คือ ชื่อปลายทาง แต่ข้อมูลมั่ว ต้อง clean
ตัวช่วยเรื่องที่อยู่ คือ ชื่อที่อยู่จาก_LatLong
ตัวที่ต้องระวังมาก คือ ที่อยู่ปลายทาง
ตัวบริบทธุรกิจ คือ ชื่อเจ้าของสินค้า
ตัววิเคราะห์เสริม คือ ระยะทางจากคลัง_Km
ถ้าคุณต้องการ รอบถัดไปผมทำต่อให้ได้ 2 แบบ เลือกได้เลย:

แบบที่ 1
ผมจะ ปรับนิยามนี้กลับเข้าโครงสร้างฐานข้อมูลทั้งหมด
เช่นบอกว่าแต่ละคอลัมน์ควรไหลไปลง sheet ไหน / field ไหน

แบบที่ 2
ผมจะ ตรวจโค้ด 1–8 ใหม่ตามนิยามล่าสุดนี้
แล้วบอกให้เลยว่า function ไหนต้องแก้ logic ตรงไหนบ้าง โดยเฉพาะเรื่อง:

ชื่อปลายทาง = person
ที่อยู่ปลายทาง = noisy address
ชื่อที่อยู่จาก_LatLong = derived geo address
ถ้าจะให้ผมแนะนำ ผมแนะนำให้ทำ แบบที่ 2 ต่อทันที เพราะจะทำให้โค้ดที่คุณมีอยู่ “ตรงความหมายข้อมูลจริง” มากที่สุดครับ

ต้องการทั้ง2แบบครับ
ได้ครับ — ผมจะทำให้ครบทั้ง 2 แบบ ตามที่คุณต้องการ โดยจะยึดความหมายข้อมูลดิบล่าสุดของคุณเป็น “นิยามจริงของระบบ” จากนี้ไป

คำตอบนี้จะแบ่งเป็น 2 ส่วนใหญ่ ๆ คือ

ส่วนที่ 1: เอาความหมายคอลัมน์ดิบล่าสุดของคุณ ไปผูกกับโครงสร้างฐานข้อมูลทั้งหมดว่า
“แต่ละคอลัมน์ควรไหลไปลงชีตไหน / ฟิลด์ไหน / ใช้ทำอะไร”

ส่วนที่ 2: ตรวจตรรกะของโค้ดทั้ง 1–8 โมดูล ใหม่ตามนิยามล่าสุด แล้วบอกชัด ๆ ว่า
“ไฟล์ไหนผิดความหมายตรงไหน / ต้องแก้ฟังก์ชันไหน / ทำไมต้องแก้”

ผมจะเขียนแบบใช้งานจริง ไม่ใช่แค่ทฤษฎี

สรุปนิยามจริงของข้อมูลดิบที่เราจะยึดเป็นมาตรฐาน
ก่อนเข้า 2 ส่วน ผมขอสรุป “แกนกลาง” ให้ตรงกันก่อน 1 รอบ

คอลัมน์ดิบ	ความหมายจริง	ระดับความน่าเชื่อถือ	บทบาทหลัก
จุดส่งสินค้าปลายทาง	พิกัด LatLong จริงของจุดส่ง	สูงมาก	Geo source หลัก
LAT	ละติจูด แยกจากจุดส่งสินค้าปลายทาง	สูงมาก	Geo matching
LONG	ลองจิจูด แยกจากจุดส่งสินค้าปลายทาง	สูงมาก	Geo matching
ชื่อปลายทาง	ชื่อบุคคลลูกค้าที่สั่งของ	สำคัญมากแต่สกปรกมาก	Person matching
ที่อยู่ปลายทาง	ชื่อสถานที่/ที่อยู่จากระบบเดิม มั่ว ๆ	กลาง-ต่ำ	Place/address support
ชื่อที่อยู่จาก_LatLong	ที่อยู่ข้อความที่ derive จากพิกัดจริง	กลาง-สูง	Geo-derived address
ชื่อเจ้าของสินค้า	ชื่อบริษัทที่ขายของ	กลาง-สูง	Business context
ระยะทางจากคลัง_Km	ระยะจากคลังวังน้อยถึงจุดส่ง	กลาง	Analytical / sanity check
ส่วนที่ 1: ผูกความหมายข้อมูลดิบเข้ากับโครงสร้างฐานข้อมูลทั้งหมด
1.1 หลักการสำคัญที่ต้องยึดก่อน
จากคำอธิบายล่าสุดของคุณ มี 4 เรื่องที่ “ห้ามตีความผิด” เด็ดขาด

1) ชื่อปลายทาง = คน
ไม่ใช่ร้าน
ไม่ใช่สถานที่
ไม่ใช่ที่อยู่

ดังนั้นต้องไหลไปที่ Person logic เป็นหลัก

2) ที่อยู่ปลายทาง = ข้อความที่อยู่มั่วจากระบบ
มีประโยชน์
แต่เชื่อไม่ได้เต็มร้อย

ดังนั้นต้องใช้เป็น raw noisy address ไม่ใช่ master truth

3) ชื่อที่อยู่จาก_LatLong = address ที่ derive จากพิกัดจริง
นี่สำคัญมาก เพราะมันเป็น “ที่อยู่ที่สะท้อนตำแหน่งจริง” มากกว่าที่อยู่จากระบบเดิม

ดังนั้นควรมีน้ำหนักสูงกว่า ที่อยู่ปลายทาง

4) จุดส่งสินค้าปลายทาง / LAT / LONG = แกนหลักของตำแหน่งจริง
ถ้าจะตัดสินว่าเป็นสถานที่เดิมหรือไม่ พิกัดต้องมีบทบาทสูงสุด

1.2 ชื่อฟิลด์กลางของระบบที่แนะนำให้ใช้
ผมแนะนำให้ในโค้ดใช้ชื่อกลางแบบนี้ จะทำให้ไม่งงเวลาอ่าน logic

คอลัมน์ดิบ	ชื่อฟิลด์กลางที่แนะนำ
จุดส่งสินค้าปลายทาง	raw_geo_text
LAT	raw_lat
LONG	raw_lng
ชื่อปลายทาง	raw_person_name
ที่อยู่ปลายทาง	raw_system_address
ชื่อที่อยู่จาก_LatLong	raw_geo_resolved_address
ชื่อเจ้าของสินค้า	raw_owner_company
ระยะทางจากคลัง_Km	raw_distance_from_warehouse_km
1.3 การไหลของข้อมูลที่ถูกต้อง
ข้อมูล 1 แถวจากชีตดิบ ควรไหลแบบนี้

ชั้นที่ 1: Raw
อยู่ในชีต
SCGนครหลวงJWDภูมิภาค

ชั้นที่ 2: Parsed / Normalized
แปลงออกมาเป็น object กลาง เช่น

raw_person_name
person_name_norm
raw_system_address
system_address_norm
raw_geo_resolved_address
geo_resolved_address_norm
raw_lat
raw_lng
geo_key6 / 5 / 4
ชั้นที่ 3: Master resolution
ระบบพยายาม map ไปยัง

person_id
place_id
geo_id
destination_id
ชั้นที่ 4: Fact
บันทึกผลธุรกรรมจริงลง
FACT_DELIVERY

1.4 ฟิลด์ไหนควรลงชีตไหน
ด้านล่างคือ mapping แบบ “ใช้งานจริง”

A) ชีต SCGนครหลวงJWDภูมิภาค
นี่คือ raw source
เก็บข้อมูลดิบตามเดิม

ไม่ควรแก้ให้เป็น master

ควรใช้เป็น:

ที่เก็บข้อมูลต้นฉบับ
แหล่งอ่านข้อมูลใหม่
จุดอัปเดต SYNC_STATUS
B) ชีต M_PERSON
เก็บข้อมูลบุคคลลูกค้า

ฟิลด์ที่ควรสร้างมาจากข้อมูลดิบ
ต้นทางหลักคือ:

ชื่อปลายทาง
Mapping
จากดิบ	ไปที่ M_PERSON
ชื่อปลายทาง	canonical_name / normalized_name
หมายเหตุ
อย่าเอา ชื่อเจ้าของสินค้า หรือ ที่อยู่ปลายทาง มาใช้สร้าง person master

C) ชีต M_PERSON_ALIAS
เก็บ alias ของชื่อบุคคล

Mapping
จากดิบ	ไปที่ M_PERSON_ALIAS
ชื่อปลายทาง	alias_raw
normalize ของชื่อปลายทาง	alias_norm
ใช้แก้ปัญหา
ข้อ 1 ชื่อบุคคลซ้ำ
ข้อ 4 คนเดียวกันแต่เขียนชื่อไม่เหมือนกัน
D) ชีต M_PLACE
เก็บ “สถานที่ปลายทาง”

แต่ต้องเข้าใจก่อนว่า “place” ในโปรเจกต์นี้ ไม่ควรตั้งจากชื่อปลายทางเป็นหลัก
ควรตั้งจาก address + geo-derived address + geo

ต้นทางหลัก
ที่อยู่ปลายทาง
ชื่อที่อยู่จาก_LatLong
LAT
LONG
Mapping ที่ถูกต้อง
จากดิบ	ไปที่ M_PLACE
ที่อยู่ปลายทาง	canonical_address (raw side)
ชื่อที่อยู่จาก_LatLong	geo_hint หรือ canonical_address_best
normalize ของที่อยู่ปลายทาง	normalized_address
normalize ของชื่อที่อยู่จาก_LatLong	geo_resolved_address_norm
LAT/LONG	ใช้ช่วย resolve ไม่ได้เก็บตรงใน M_PLACE เป็นหลัก
ข้อสำคัญ
ชื่อปลายทาง ไม่ควรไหลเข้า canonical_name ของสถานที่โดยตรง
ยกเว้นกรณี fallback และต้องติดธงว่าเป็น fallback

E) ชีต M_PLACE_ALIAS
เก็บ alias ของสถานที่

ต้นทางที่ควรใช้
ที่อยู่ปลายทาง
ชื่อที่อยู่จาก_LatLong
Mapping
จากดิบ	ไปที่ M_PLACE_ALIAS
ที่อยู่ปลายทาง	alias_raw
ชื่อที่อยู่จาก_LatLong	alias_raw อีกแถวหนึ่งได้
normalize ของแต่ละตัว	alias_norm
ใช้แก้ปัญหา
ข้อ 2 ชื่อสถานที่ซ้ำ
ข้อ 5 คนละชื่อ แต่สถานที่เดียวกัน
ข้อ 6 ชื่อเดียวกัน แต่สถานที่ไม่เหมือนกัน
F) ชีต M_GEO_POINT
เก็บพิกัดจริง

ต้นทางหลัก
จุดส่งสินค้าปลายทาง
LAT
LONG
ชื่อที่อยู่จาก_LatLong
Mapping
จากดิบ	ไปที่ M_GEO_POINT
LAT	lat
LONG	lng
LAT/LONG ปัด 6, 5, 4 หลัก	lat6/lng6/geo_key6/5/4
ชื่อที่อยู่จาก_LatLong	address_best
ใช้แก้ปัญหา
ข้อ 3 LatLong ซ้ำ
ข้อ 7 ชื่อเดียวกันแต่คนละพิกัด
ข้อ 8 คนละชื่อแต่พิกัดเดียวกัน
G) ชีต M_DESTINATION
นี่คือ entity กลางที่เชื่อม

คน
สถานที่
พิกัด
Mapping
สร้างจากผล resolve ของ

person_id
place_id
geo_id
ใช้แก้ปัญหา
ทั้ง 8 ข้อโดยตรง
เพราะ destination คือ “ปลายทางเชิงธุรกิจที่ใช้งานจริง”

H) ชีต FACT_DELIVERY
ชีตนี้ต้องเก็บ raw ที่สำคัญให้ครบ ไม่อย่างนั้นย้อนตรวจยาก

ผมแนะนำให้ปรับ header ของ FACT_DELIVERY
จากของเดิม เพิ่มฟิลด์เหล่านี้ให้ชัด

คอลัมน์ที่ควรมีแน่ ๆ
ฟิลด์ใน FACT	มาจากคอลัมน์ดิบ
raw_geo_text	จุดส่งสินค้าปลายทาง
raw_lat	LAT
raw_lng	LONG
raw_person_name	ชื่อปลายทาง
raw_system_address	ที่อยู่ปลายทาง
raw_geo_resolved_address	ชื่อที่อยู่จาก_LatLong
raw_owner_company	ชื่อเจ้าของสินค้า
raw_distance_from_warehouse_km	ระยะทางจากคลัง_Km
ทำไมต้องเพิ่ม
เพราะตอนนี้ในโค้ดที่ผมส่งไปก่อนหน้า FACT_DELIVERY ยังเก็บ raw ไม่ละเอียดพอ
และมีบางจุดผูก raw_place_name ผิดความหมายด้วย

I) ชีต Q_REVIEW
ชีตนี้ต้องเก็บ raw field ที่ช่วยให้คนตัดสินใจได้ถูก

ฟิลด์ที่ควรมีเพิ่ม
ผมแนะนำเพิ่มใน Q_REVIEW ด้วย

raw_system_address
raw_geo_resolved_address
raw_owner_company
raw_geo_text
เพราะถ้าคน review เห็นแค่ชื่อคน + ที่อยู่เดิมอย่างเดียว จะตัดสินผิดง่าย

J) ชีต SYS_TH_GEO
ชีตนี้ใช้เป็น reference ภูมิศาสตร์ไทย

โครงสร้าง 5 คอลัมน์แรกของไฟล์คุณใช้ได้ตรงกับระบบ:

รหัสไปรษณีย์
แขวง/ตำบล
เขต/อำเภอ
จังหวัด
หมายเหตุ Source
ใช้ทำอะไรในโปรเจกต์นี้
ช่วย normalize จังหวัด/อำเภอ/ตำบล
ช่วยประเมินว่า ชื่อที่อยู่จาก_LatLong กับ ที่อยู่ปลายทาง อยู่บริบทพื้นที่เดียวกันหรือไม่
ช่วย review แยกสาขาที่ชื่อคล้ายกันแต่คนละพื้นที่
1.5 สรุปการไหลของแต่ละคอลัมน์ดิบแบบเต็ม
คอลัมน์ดิบ	ฟิลด์กลาง	ชีตปลายทางหลัก	ใช้ทำอะไร
จุดส่งสินค้าปลายทาง	raw_geo_text	FACT_DELIVERY, M_GEO_POINT	ต้นทางของพิกัดจริง
LAT	raw_lat	FACT_DELIVERY, M_GEO_POINT	resolve geo
LONG	raw_lng	FACT_DELIVERY, M_GEO_POINT	resolve geo
ชื่อปลายทาง	raw_person_name	FACT_DELIVERY, M_PERSON, M_PERSON_ALIAS	resolve คน
ที่อยู่ปลายทาง	raw_system_address	FACT_DELIVERY, M_PLACE_ALIAS	ที่อยู่ดิบจากระบบ
ชื่อที่อยู่จาก_LatLong	raw_geo_resolved_address	FACT_DELIVERY, M_PLACE, M_GEO_POINT	ที่อยู่ derive จากพิกัด
ชื่อเจ้าของสินค้า	raw_owner_company	FACT_DELIVERY	บริบทธุรกิจ
ระยะทางจากคลัง_Km	raw_distance_from_warehouse_km	FACT_DELIVERY	ตรวจความสมเหตุสมผล / รายงาน
1.6 กติกา “น้ำหนักความน่าเชื่อถือ” ที่ควรใช้ในระบบ
สำหรับการระบุสถานที่
LAT/LONG
ชื่อที่อยู่จาก_LatLong
SYS_TH_GEO
ที่อยู่ปลายทาง
สำหรับการระบุตัวบุคคล
ชื่อปลายทาง
ประวัติ alias เดิมใน M_PERSON_ALIAS
owner company ใช้เป็น context เท่านั้น
สำหรับการตัดสิน destination
ใช้ร่วมกัน:

person
place
geo
ห้ามใช้อย่างใดอย่างหนึ่งเด็ดขาด

ส่วนที่ 2: ตรวจโค้ด 1–8 ใหม่ตามนิยามล่าสุด และบอกว่าต้องแก้อะไรบ้าง
ด้านล่างนี้คือ “code audit ตามนิยามล่าสุดของคุณ”

ผมจะสรุปเป็น 3 ชั้น:

ปัญหาระดับวิกฤต
ตรวจทีละไฟล์ 1–8
ลำดับการแก้
2.1 ปัญหาระดับวิกฤตที่ต้องแก้ก่อน
นี่คือจุดสำคัญที่สุดที่ตอนนี้ “ผิดความหมายข้อมูลจริง”

วิกฤต 1: ระบบยังใช้ ชื่อปลายทาง ไปปนกับ place logic มากเกินไป
นี่ผิดแก่นข้อมูลทันที
เพราะคุณยืนยันแล้วว่า

ชื่อปลายทาง = ชื่อบุคคลลูกค้า
แต่ใน logic เดิม มีหลายจุดที่เอา raw_person_name ไปใช้เป็น

raw_place_name
seed ของ place
alias ของ place
ผลเสีย

คนกับสถานที่ปนกัน
merge ผิด
เกิด false positive สูงมาก
วิกฤต 2: ระบบยังแยกไม่ชัดระหว่าง
ที่อยู่ปลายทาง
ชื่อที่อยู่จาก_LatLong
ทั้งที่สองตัวนี้ “ความน่าเชื่อถือไม่เท่ากัน”

ผลเสีย

system address ที่มั่ว อาจลากคะแนนผิด
geo-derived address ที่ควรมีน้ำหนักสูงกว่า กลับไม่ได้ถูกยกน้ำหนักชัด
วิกฤต 3: FACT_DELIVERY ยังเก็บ raw field ไม่ครบ
ถ้า raw field ไม่ครบ เวลา review หรือ debug จะยากมาก

เช่นควรมีชัด ๆ:

raw_geo_text
raw_person_name
raw_system_address
raw_geo_resolved_address
raw_owner_company
วิกฤต 4: Q_REVIEW ยังไม่แสดงข้อมูลพอให้คนตัดสินใจ
ถ้าจะให้ dropdown review ใช้งานจริง ต้องเห็น raw context ครบกว่านี้

2.2 ตรวจทีละไฟล์ 1–8
ไฟล์ 1: 00_CONFIG.gs
สถานะ
โครงสร้างใช้ได้ แต่ยังไม่ตรงนิยามใหม่ 100%

จุดที่ต้องแก้
1) FACT header ควรเพิ่ม field ดิบให้ครบ
ตอนนี้ยังใช้:

raw_person_name
raw_place_name
raw_address
ซึ่งไม่พอ และคำว่า raw_place_name ยังทำให้ตีความผิด

ควรเปลี่ยนเป็นประมาณนี้
แทน block เดิมของ FACT ให้ใช้แนวนี้

CopyFACT: [
  'fact_id',
  'source_sheet',
  'source_row',
  'source_record_id',
  'invoice_no',
  'shipment_no',
  'delivery_date',
  'delivery_time',
  'raw_owner_company',
  'customer_code',
  'raw_person_name',
  'raw_system_address',
  'raw_geo_resolved_address',
  'raw_geo_text',
  'raw_lat',
  'raw_lng',
  'person_id',
  'place_id',
  'geo_id',
  'destination_id',
  'driver_name',
  'employee_id',
  'employee_email',
  'warehouse',
  'raw_distance_from_warehouse_km',
  'result_status',
  'problem_flags',
  'review_id',
  'sync_status',
  'created_at',
  'updated_at'
]
Copy
2) REVIEW header ควรเพิ่ม raw context
แนะนำเพิ่ม:

raw_system_address
raw_geo_resolved_address
raw_owner_company
raw_geo_text
ไฟล์ 2: 01_UTILS.gs
สถานะ
โดยรวมดี แต่ยังต้องเพิ่ม util ที่ช่วยนิยามใหม่

จุดที่ต้องแก้
1) ควรมี util สำหรับ “address precedence”
เช่นเลือก address ที่ดีที่สุดจาก

geo resolved
system address
แนะนำเพิ่มฟังก์ชัน:

Copyfunction bestAddress_(src) {
  return safeStr_(src.raw_geo_resolved_address) || safeStr_(src.raw_system_address) || '';
}
2) ควรมี util สำหรับ normalize คน vs normalize สถานที่ แยกกันชัดกว่านี้
ตอนนี้ normPlace_() ยังง่ายไป ถ้าข้อมูลมั่วมาก อาจต้องเพิ่ม logic ภายหลัง เช่นลบคำฟุ่มเฟือย:

บ้าน
ร้าน
หน้าร้าน
โกดัง
จุดลงของ
3) ควรมี util สำหรับเลือก “geo preferred text”
Copyfunction geoContextText_(src) {
  return [src.raw_geo_resolved_address, src.raw_system_address].filter(Boolean).join(' ');
}
ไฟล์ 3: 02_SETUP.gs
สถานะ
ใช้ได้ แต่ต้องอัปเดต header ใหม่ให้ตรง schema

จุดที่ต้องแก้
1) setupProject() ต้องสร้าง sheet ตาม header ใหม่
โดยเฉพาะ FACT และ REVIEW

2) rebuildThaiGeoIndex() ใช้ได้
ส่วนนี้ถือว่าถูกทางแล้ว เพราะช่วยตีความ SYS_TH_GEO

3) ควรเพิ่ม config ใหม่
เช่น

PLACE_USE_GEO_RESOLVED_ADDRESS_WEIGHT
PLACE_USE_SYSTEM_ADDRESS_WEIGHT
PERSON_MIN_LEN
PLACE_MIN_LEN
ไฟล์ 4: 03_MASTER.gs
สถานะ
เป็นแกน master data ที่ใช้ได้ แต่ place logic ยังต้องแก้

จุดที่ต้องแก้
1) createPlace_() ยังใช้ชื่อ field ไม่สะท้อนนิยามใหม่
ตอนนี้รับ:

rawName
normName
rawAddress
normAddress
geoHint
แต่ในบริบทของคุณ place ไม่ได้มี “ชื่อสถานที่ที่ชัด” จากดิบเสมอไป
ส่วนใหญ่ได้เป็น “address-derived place”

แนะนำแนวคิดใหม่
ให้ place master ยึด:

canonical_name = อาจว่างได้
canonical_address = ใช้ที่อยู่ที่ดีที่สุด
normalized_address = normalized best address
geo_hint = geo resolved address
2) ไม่ควรสร้าง place alias จาก person name โดยตรง
ถ้าจะแก้ให้ถูก ควรสร้าง alias จาก:

raw_system_address
raw_geo_resolved_address
ไฟล์ 5: 04_MATCH_ENGINE.gs
สถานะ
ไฟล์นี้เป็นจุดที่ต้องแก้มากที่สุด

นี่คือหัวใจของระบบ และตอนนี้มีบางจุด “ผิดแก่นข้อมูล” ตามนิยามล่าสุด

จุดผิดที่สำคัญมาก
❌ ปัญหา 1: mapSourceRow_() ยังไม่แยก field ดิบให้ครบ
ตอนนี้ยังไม่มีชื่อแบบชัด ๆ ว่า

raw_system_address
raw_geo_resolved_address
raw_owner_company
raw_geo_text
ต้องแก้เป็นแบบนี้
ใน mapSourceRow_() ให้เปลี่ยนเป็นโครงนี้

Copyreturn {
  source_sheet: APP.SHEETS.RAW,
  source_row: rowNum,
  source_record_id: safeStr_(get('ID_SCGนครหลวงJWDภูมิภาค')),
  delivery_date: get('วันที่ส่งสินค้า'),
  delivery_time: get('เวลาที่ส่งสินค้า'),
  raw_geo_text: safeStr_(get('จุดส่งสินค้าปลายทาง')),
  raw_driver_name: safeStr_(get('ชื่อ - นามสกุล')),
  shipment_no: safeStr_(get('Shipment No')),
  invoice_no: safeStr_(get('Invoice No')),
  customer_code: safeStr_(get('รหัสลูกค้า')),
  raw_owner_company: safeStr_(get('ชื่อเจ้าของสินค้า')),
  raw_person_name: safeStr_(get('ชื่อปลายทาง')),
  employee_email: safeStr_(get('Email พนักงาน')),
  raw_lat: lat,
  raw_lng: lng,
  warehouse: safeStr_(get('คลังสินค้า')),
  raw_system_address: safeStr_(get('ที่อยู่ปลายทาง')),
  raw_distance_from_warehouse_km: get('ระยะทางจากคลัง_Km'),
  raw_geo_resolved_address: safeStr_(get('ชื่อที่อยู่จาก_LatLong')),
  employee_id: safeStr_(get('ID_พนักงาน')),
  validation_result: safeStr_(get('ผลการตรวจสอบงานส่ง')),
  anomaly_reason: safeStr_(get('เหตุผิดปกติที่ตรวจพบ')),
  sync_status: safeStr_(get('SYNC_STATUS'))
};
❌ ปัญหา 2: resolveRow_() ตอนนี้ยังส่ง raw_person_name เข้า findBestPlace_()
อันนี้ผิดความหมายตรง ๆ

เดิมมีลักษณะประมาณนี้:

Copyconst placeResult = findBestPlace_(ctx, src.raw_person_name, src.raw_address, src.geo_address_text, thaiGeoHit);
ต้องแก้เป็น
place ควรใช้ address เป็นหลัก ไม่ใช่ชื่อคน

Copyconst placeResult = findBestPlace_(
  ctx,
  src.raw_system_address,
  src.raw_geo_resolved_address,
  thaiGeoHit,
  src.raw_lat,
  src.raw_lng
);
❌ ปัญหา 3: findBestPlace_() นิยาม input ยังผิด
ปัจจุบัน place function คิดเหมือนมี “ชื่อสถานที่” มาจากดิบชัด ๆ
แต่ข้อมูลจริงของคุณไม่ได้เป็นแบบนั้น

ควรเปลี่ยน signature
จาก:

CopyfindBestPlace_(ctx, rawPlace, rawAddress, geoAddressText, thaiGeoHit)
เป็น:

CopyfindBestPlace_(ctx, rawSystemAddress, rawGeoResolvedAddress, thaiGeoHit, lat, lng)
และให้ scoring แบบนี้
45% = geo_resolved_address match
30% = system_address match
15% = thai_geo consistency
10% = geo proximity if known
เหตุผล
เพราะ ชื่อที่อยู่จาก_LatLong น่าเชื่อถือกว่า ที่อยู่ปลายทาง

❌ ปัญหา 4: problem flags บางข้อยังตีความ person/place ไม่ตรง
เช่น logic ข้อ 5–8 ต้องยึดนิยามใหม่ชัดขึ้น

ตัวอย่างที่ควรตีความใหม่
ข้อ 5: บุคคลคนละชื่อ แต่ชื่อสถานที่เดียวกัน
จริง ๆ ต้องอิง place/address + geo ไม่ใช่แค่ข้อความสถานที่ล้วน

ข้อ 6: บุคคลชื่อเดียวกัน แต่ชื่อสถานที่อยู่ไม่เหมือนกัน
ควรอิง

same person candidate
different place candidate
different address cluster
ข้อ 7: บุคคลชื่อเดียวกัน แต่ LatLong คนละที่
อิง

same person match
geo distance far enough
ข้อ 8: บุคคลคนละชื่อ แต่ LatLong ที่เดียวกัน
อิง

geo match strong
person weak or mismatched
สรุปไฟล์ 5
ไฟล์นี้คือไฟล์ที่ต้องแก้มากที่สุด และถ้าแก้ไฟล์นี้ถูก ระบบจะดีขึ้นเยอะที่สุด

ไฟล์ 6: 05_PROCESS.gs
สถานะ
โครง run / checkpoint / resume ใช้ได้ดี
แต่ข้อมูลที่เขียนลง master/fact ยังยึด semantics เก่าอยู่บางจุด

จุดที่ต้องแก้
❌ ปัญหา 1: ตอน AUTO_MATCH และ CREATE_NEW
ยังมีจุดที่ใช้ src.raw_person_name ไป seed place

ตัวอย่างเดิมแนวนี้:

Copyconst place = resolved.placeResult.place || createPlace_(
  ctx,
  src.raw_person_name || src.raw_address,
  ...
);
อันนี้ผิด

ต้องแก้เป็น
Copyconst placeSeedAddress = src.raw_geo_resolved_address || src.raw_system_address || '';
const place = resolved.placeResult.place || createPlace_(
  ctx,
  '',
  '',
  placeSeedAddress,
  normText_(placeSeedAddress),
  src.raw_geo_resolved_address || ''
);
❌ ปัญหา 2: upsertFact_() เขียน raw field ผิด
เดิมมีแนวนี้:

Copyraw_place_name: src.raw_person_name,
raw_address: src.raw_address,
lat: src.lat,
lng: src.lng,
owner_name: src.owner_name,
distance_km: src.distance_km
ต้องแก้เป็นฟิลด์ใหม่
Copyraw_owner_company: src.raw_owner_company,
raw_person_name: src.raw_person_name,
raw_system_address: src.raw_system_address,
raw_geo_resolved_address: src.raw_geo_resolved_address,
raw_geo_text: src.raw_geo_text,
raw_lat: src.raw_lat,
raw_lng: src.raw_lng,
raw_distance_from_warehouse_km: src.raw_distance_from_warehouse_km,
❌ ปัญหา 3: enqueueReview_() ยังส่ง raw_place_name ผิดความหมาย
ต้องให้ review เห็น:

raw person
raw system address
raw geo resolved address
raw geo text
owner company
✅ จุดดีของไฟล์นี้
มี time guard
มี checkpoint
มี resume
ไม่จำเป็นต้องเริ่มจากแถวแรกใหม่
อันนี้โครงสร้างถูกแล้ว

ไฟล์ 7: 06_REVIEW_UI.gs
สถานะ
โครง dropdown + onEdit ใช้ได้
แต่ review logic ยังต้องเปลี่ยน semantics ให้ตรงข้อมูลจริง

จุดที่ต้องแก้
❌ ปัญหา 1: getReviewSourceObj_() ต้องคืน field ชุดใหม่
ตอนนี้ยังคืนแบบเก่าอยู่ เช่น raw_address, lat, lng

ควรคืนแบบนี้
raw_person_name
raw_system_address
raw_geo_resolved_address
raw_geo_text
raw_lat
raw_lng
raw_owner_company
❌ ปัญหา 2: ensurePlaceFromReview_() ยังใช้ raw_person_name ปนใน place fallback
ตอนนี้มีแนวคิดแบบ

Copyconst found = findBestPlace_(ctx, src.raw_person_name, src.raw_address, ...)
หรือ

Copyconst placeSeed = src.raw_address || src.raw_person_name
อันนี้ต้องแก้ทั้งหมด

ควรเป็น
Copyconst placeSeed = src.raw_geo_resolved_address || src.raw_system_address || '';
❌ ปัญหา 3: applyCreateNew_() ต้องสร้าง place จาก address ไม่ใช่จาก person
แก้เหมือนข้อด้านบน

❌ ปัญหา 4: applyMergeToCandidate_() ควร “สอนระบบ” ด้วย alias ให้ถูก entity
เช่น

ถ้า merge person → เพิ่ม alias ให้ M_PERSON_ALIAS
ถ้า merge place → เพิ่ม alias ให้ M_PLACE_ALIAS จาก address string ที่ใช้จริง
✅ จุดดี
onEdit + lock document + apply action ถือว่าออกแบบมาถูกทางแล้ว

ไฟล์ 8: 07_REPORT_LOOKUP.gs
สถานะ
ใช้ได้ แต่ต้องแก้ lookup semantics ให้ตรงข้อมูลจริง

จุดที่ต้องแก้
❌ ปัญหา 1: lookupBestDestination() ยังใช้ customerName ไปเทียบ place มากเกินไป
ในข้อมูลจริงของคุณ

customerName = คน
address = สถานที่
ดังนั้น place score ไม่ควรใช้ customerName เป็น input หลัก

ควรแก้
place score ควรใช้:

customerAddress
geo address
lat/lng
ส่วน person score ใช้:

customerName
❌ ปัญหา 2: calcLookupPlaceScore_() ควรยึด address เป็นแกน
เดิมยังมี

Copyconst nameScore = customerName ? ...
ตรงนี้ควรลดบทบาท หรือเอาออกเลย
เว้นแต่ในอนาคตคุณมี “ชื่อสถานที่ปลายทาง” จริง ๆ แยกจากชื่อคน

❌ ปัญหา 3: Google Maps formulas ใช้ได้ แต่ควรใช้เป็น “ตัวช่วย enrich”
ไม่ควรเอา GOOGLEMAPS_REVERSEGEOCODE() ไปแทน master truth โดยตรง

แนวทางที่ถูกคือ:

เอามาเติมข้อมูลช่วย
เอามาตรวจ consistency กับ SYS_TH_GEO
เอามาช่วยสร้าง review context
2.3 สรุป “patch list” แบบสั้นที่สุด
ถ้าคุณจะลงมือแก้จริง เรียงลำดับแบบนี้ดีที่สุด

P0 — ต้องแก้ก่อนทันที
mapSourceRow_()
แยก field ใหม่ให้ครบ:

raw_geo_text
raw_lat
raw_lng
raw_system_address
raw_geo_resolved_address
raw_owner_company
resolveRow_()
หยุดส่ง raw_person_name เข้า place logic

findBestPlace_()
เปลี่ยนให้ใช้ address-first, geo-first

upsertFact_()
เปลี่ยน schema การเก็บ raw field ให้ถูกต้อง

P1 — ต้องแก้ต่อทันทีหลัง P0
enqueueReview_()
ให้ review เห็น raw context ครบ

applyCreateNew_() / applyMergeToCandidate_() / ensurePlaceFromReview_()
หยุดใช้ person เป็น seed ของ place

lookupBestDestination()
แยก person score / place score ให้ถูก entity

P2 — ปรับปรุงความแม่นยำ
เพิ่ม weighted scoring ใหม่
person = ชื่อปลายทาง
place = geo resolved address > system address
geo = lat/lng exact or radius
thai geo = supporting evidence
เพิ่ม field จังหวัด/อำเภอ/ตำบล ที่ derive จาก SYS_TH_GEO เข้า FACT_DELIVERY หรือ Q_REVIEW
2.4 ข้อเสนอ “สูตรคะแนนใหม่” ที่เหมาะกับข้อมูลของคุณ
ผมแนะนำ scoring แบบนี้

Person score
ใช้จาก ชื่อปลายทาง

alias exact = 100
normalized strong = 85–95
weak/short text = cap ไม่เกิน 50
Place score
ใช้จาก:

ชื่อที่อยู่จาก_LatLong 50%
ที่อยู่ปลายทาง 30%
SYS_TH_GEO consistency 20%
Geo score
ใช้จาก:

same point exact = 100
within 10m = 95
within 30m = 80
beyond = ลดลงแรง
Final decision
85+ = auto
55–84 = review
<55 = create new / weak match
2.5 สรุปว่าโค้ด 1–8 ตอนนี้ “แนวคิดถูกกี่เปอร์เซ็นต์”
ถ้าประเมินแบบตรงไปตรงมา:

โครงสร้างสถาปัตยกรรม
ประมาณ 80–85% ถูกทาง เพราะแยก master / fact / review / checkpoint / maps formula ได้แล้ว

ความหมายเชิงธุรกิจของ field
ตอนนี้ประมาณ 60–65% เพราะยังมีบางจุดที่ person/place ปนกัน

ความพร้อมใช้กับข้อมูลจริงของคุณ
ถ้ายังไม่แก้ patch list ข้างบน
ผมให้ประมาณ 55–60% เพราะจะยังมี false merge พอสมควร

ถ้าแก้ตาม patch list นี้
จะกระโดดขึ้นไปประมาณ 80%+ ได้ไม่ยาก
และค่อยขยับต่อด้วย review learning

ข้อสรุปสุดท้ายแบบตรงที่สุด
แบบที่ 1 — ผูกคอลัมน์เข้าฐานข้อมูล
ตอนนี้ชัดแล้วว่า:

ชื่อปลายทาง ต้องไหลไป Person
ที่อยู่ปลายทาง ต้องไหลไป raw system address
ชื่อที่อยู่จาก_LatLong ต้องไหลไป geo-derived address / place support
LAT/LONG ต้องไหลไป Geo
ชื่อเจ้าของสินค้า ต้องเก็บเป็น business context
ระยะทางจากคลัง_Km ต้องเก็บเป็น analytical field
แบบที่ 2 — ตรวจโค้ด 1–8
จุดที่ต้องแก้ที่สุดคือ:

04_MATCH_ENGINE.gs
05_PROCESS.gs
06_REVIEW_UI.gs
07_REPORT_LOOKUP.gs
โดยเฉพาะกติกานี้:

ห้ามเอา ชื่อปลายทาง ไปใช้เป็น place seed หรือ place alias หลักอีกต่อไป

นี่คือจุดแก้ใหญ่ที่สุดของทั้งระบบ

ถ้าคุณต้องการ รอบถัดไปผมทำต่อให้ได้ 2 ทาง เลือกได้เลย หรือจะเอาทั้งคู่ต่อทันทีอีกก็ได้:

ทาง A
ผมจะทำ “patch code รายไฟล์แบบพร้อมแทนบล็อก”
เช่นบอกเลยว่า:

ใน 04_MATCH_ENGINE.gs ให้เปลี่ยนฟังก์ชัน mapSourceRow_() เป็นโค้ดชุดใหม่
ใน 05_PROCESS.gs ให้เปลี่ยน upsertFact_() เป็นโค้ดชุดใหม่
ทาง B
ผมจะทำ “schema v2 final” ให้เลย
คือสรุป header ใหม่ของทุกชีต:

FACT_DELIVERY
Q_REVIEW
M_PLACE
M_GEO_POINT
M_DESTINATION
ถ้าจะให้ผมแนะนำ ผมแนะนำว่า รอบต่อไปให้ทำทั้ง A + B
เพราะจะทำให้คุณเอาไปแก้โค้ดจริงได้ทันที และ schema จะไม่แก้ไปแก้มาซ้ำครับ