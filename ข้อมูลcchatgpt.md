รหัสไปรษณีย์ไทย.xlsx
สเปรดชีต
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
  return ${lat}, ${lng};
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
              return step.html_instructions.replace(/]+>/g, "").replace(/&quot;/g, '"');
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

ข้อมูลดิบที่ได้มา ทั้งชื่อบุคคล ทั้งชื่อสถานที่ มันมาแบบมั่วๆ ครบบ้าง ไม่ครบบ้าง ตัดคำมามั่วๆครับ ทำมาแบบไม่ใส่ใจ ให้สูตรตัดคำแต่ไม่ตรวจสอบ ผมจึงอยากจะพัฒนาระบบเอง แค่ข้อมูลที่ได้มามัน ไม่ดีเท่าไหร่ครับ  จึงอยากจะเน้นย้ำเรื่องตรงนี้แหละ  