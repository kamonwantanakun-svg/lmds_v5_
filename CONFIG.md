/\*\*  
 \* VERSION: 4.2 — Phase A  
 \* \[Phase A\] เพิ่ม DB\_TOTAL\_COLS, header constants  
 \*/

var CONFIG \= {  
  SHEET\_NAME:    "Database",  
  MAPPING\_SHEET: "NameMapping",  
  SOURCE\_SHEET:  "SCGนครหลวงJWDภูมิภาค",  
  SHEET\_POSTAL:  "PostalRef",

  // \[Phase A NEW\] Schema Width Constants  
  DB\_TOTAL\_COLS:        22,  
  DB\_LEGACY\_COLS:       17,  
  MAP\_TOTAL\_COLS:       5,  
  GPS\_QUEUE\_TOTAL\_COLS: 9,  
  DATA\_TOTAL\_COLS:      29,

  // \[Phase A NEW\] Header Arrays กลาง  
  DB\_REQUIRED\_HEADERS: {  
    1: "NAME", 2: "LAT", 3: "LNG", 11: "UUID",  
    15: "QUALITY", 16: "CREATED", 17: "UPDATED",  
    18: "Coord\_Source", 19: "Coord\_Confidence",  
    20: "Coord\_Last\_Updated",  
    21: "Record\_Status",  
    22: "Merged\_To\_UUID"  
  },

  MAP\_REQUIRED\_HEADERS: {  
    1: "Variant\_Name", 2: "Master\_UID",  
    3: "Confidence\_Score", 4: "Mapped\_By", 5: "Timestamp"  
  },

  GPS\_QUEUE\_REQUIRED\_HEADERS: {  
    1: "Timestamp", 2: "ShipToName", 3: "UUID\_DB",  
    4: "LatLng\_Driver", 5: "LatLng\_DB", 6: "Diff\_Meters",  
    7: "Reason", 8: "Approve", 9: "Reject"  
  },

  get GEMINI\_API\_KEY() {  
    var key \= PropertiesService.getScriptProperties().getProperty('GEMINI\_API\_KEY');  
    if (\!key) throw new Error(  
      "CRITICAL ERROR: GEMINI\_API\_KEY is not set. Please run setupEnvironment() first."  
    );  
    return key;  
  },  
  USE\_AI\_AUTO\_FIX: true,  
  AI\_MODEL:       "gemini-1.5-flash",  
  AI\_BATCH\_SIZE:  20,

  DEPOT\_LAT: 14.164688,  
  DEPOT\_LNG: 100.625354,

  DISTANCE\_THRESHOLD\_KM: 0.05,  
  BATCH\_LIMIT:            50,  
  DEEP\_CLEAN\_LIMIT:       100,  
  API\_MAX\_RETRIES:        3,  
  API\_TIMEOUT\_MS:         30000,  
  CACHE\_EXPIRATION:       21600,

  COL\_NAME: 1,       COL\_LAT: 2,        COL\_LNG: 3,  
  COL\_SUGGESTED: 4,  COL\_CONFIDENCE: 5, COL\_NORMALIZED: 6,  
  COL\_VERIFIED: 7,   COL\_SYS\_ADDR: 8,   COL\_ADDR\_GOOG: 9,  
  COL\_DIST\_KM: 10,   COL\_UUID: 11,      COL\_PROVINCE: 12,  
  COL\_DISTRICT: 13,  COL\_POSTCODE: 14,  COL\_QUALITY: 15,  
  COL\_CREATED: 16,   COL\_UPDATED: 17,  
  COL\_COORD\_SOURCE:       18,  
  COL\_COORD\_CONFIDENCE:   19,  
  COL\_COORD\_LAST\_UPDATED: 20,  
  COL\_RECORD\_STATUS:      21,  
  COL\_MERGED\_TO\_UUID:     22,

  MAP\_COL\_VARIANT: 1, MAP\_COL\_UID: 2,   MAP\_COL\_CONFIDENCE: 3,  
  MAP\_COL\_MAPPED\_BY: 4, MAP\_COL\_TIMESTAMP: 5,

  get C\_IDX() {  
    return {  
      NAME: this.COL\_NAME \- 1,           LAT: this.COL\_LAT \- 1,  
      LNG: this.COL\_LNG \- 1,             SUGGESTED: this.COL\_SUGGESTED \- 1,  
      CONFIDENCE: this.COL\_CONFIDENCE \- 1, NORMALIZED: this.COL\_NORMALIZED \- 1,  
      VERIFIED: this.COL\_VERIFIED \- 1,   SYS\_ADDR: this.COL\_SYS\_ADDR \- 1,  
      GOOGLE\_ADDR: this.COL\_ADDR\_GOOG \- 1, DIST\_KM: this.COL\_DIST\_KM \- 1,  
      UUID: this.COL\_UUID \- 1,           PROVINCE: this.COL\_PROVINCE \- 1,  
      DISTRICT: this.COL\_DISTRICT \- 1,   POSTCODE: this.COL\_POSTCODE \- 1,  
      QUALITY: this.COL\_QUALITY \- 1,     CREATED: this.COL\_CREATED \- 1,  
      UPDATED: this.COL\_UPDATED \- 1,  
      COORD\_SOURCE:       this.COL\_COORD\_SOURCE \- 1,  
      COORD\_CONFIDENCE:   this.COL\_COORD\_CONFIDENCE \- 1,  
      COORD\_LAST\_UPDATED: this.COL\_COORD\_LAST\_UPDATED \- 1,  
      RECORD\_STATUS:      this.COL\_RECORD\_STATUS \- 1,  
      MERGED\_TO\_UUID:     this.COL\_MERGED\_TO\_UUID \- 1  
    };  
  },

  get MAP\_IDX() {  
    return {  
      VARIANT:    this.MAP\_COL\_VARIANT \- 1,  
      UID:        this.MAP\_COL\_UID \- 1,  
      CONFIDENCE: this.MAP\_COL\_CONFIDENCE \- 1,  
      MAPPED\_BY:  this.MAP\_COL\_MAPPED\_BY \- 1,  
      TIMESTAMP:  this.MAP\_COL\_TIMESTAMP \- 1  
    };  
  }  
};

const SCG\_CONFIG \= {  
  SHEET\_DATA:     'Data',  
  SHEET\_INPUT:    'Input',  
  SHEET\_EMPLOYEE: 'ข้อมูลพนักงาน',  
  API\_URL:        'https://fsm.scgjwd.com/Monitor/SearchDelivery',  
  INPUT\_START\_ROW: 4,  
  COOKIE\_CELL:    'B1',  
  SHIPMENT\_STRING\_CELL: 'B3',  
  SHEET\_MASTER\_DB: 'Database',  
  SHEET\_MAPPING:   'NameMapping',  
  SHEET\_GPS\_QUEUE: 'GPS\_Queue',  
  GPS\_THRESHOLD\_METERS: 50,  
  SRC\_IDX: {  
    NAME: 12, LAT: 14, LNG: 15,  
    SYS\_ADDR: 18, DIST: 23, GOOG\_ADDR: 24  
  },  
  SRC\_IDX\_SYNC\_STATUS: 37,  
  SYNC\_STATUS\_DONE: "SYNCED",  
  JSON\_MAP: {  
    SHIPMENT\_NO:   'shipmentNo',  
    CUSTOMER\_NAME: 'customerName',  
    DELIVERY\_DATE: 'deliveryDate'  
  }  
};

// \[Phase B NEW\] เพิ่มใน SCG\_CONFIG ต่อท้าย JSON\_MAP  
// Data Sheet Column Index (0-based) สำหรับ Service\_SCG.gs  
// แทน r\[10\], r\[22\], r\[26\] ที่กระจัดกระจาย  
const DATA\_IDX \= {  
  JOB\_ID:        0,   // ID\_งานประจำวัน  
  PLAN\_DELIVERY: 1,   // PlanDelivery  
  INVOICE\_NO:    2,   // InvoiceNo  
  SHIPMENT\_NO:   3,   // ShipmentNo  
  DRIVER\_NAME:   4,   // DriverName  
  TRUCK\_LICENSE: 5,   // TruckLicense  
  CARRIER\_CODE:  6,   // CarrierCode  
  CARRIER\_NAME:  7,   // CarrierName  
  SOLD\_TO\_CODE:  8,   // SoldToCode  
  SOLD\_TO\_NAME:  9,   // SoldToName  
  SHIP\_TO\_NAME:  10,  // ShipToName  
  SHIP\_TO\_ADDR:  11,  // ShipToAddress  
  LATLNG\_SCG:    12,  // LatLong\_SCG  
  MATERIAL:      13,  // MaterialName  
  QTY:           14,  // ItemQuantity  
  QTY\_UNIT:      15,  // QuantityUnit  
  WEIGHT:        16,  // ItemWeight  
  DELIVERY\_NO:   17,  // DeliveryNo  
  DEST\_COUNT:    18,  // จำนวนปลายทาง\_System  
  DEST\_LIST:     19,  // รายชื่อปลายทาง\_System  
  SCAN\_STATUS:   20,  // ScanStatus  
  DELIVERY\_STATUS: 21, // DeliveryStatus  
  EMAIL:         22,  // Email พนักงาน  
  TOT\_QTY:       23,  // จำนวนสินค้ารวมของร้านนี้  
  TOT\_WEIGHT:    24,  // น้ำหนักสินค้ารวมของร้านนี้  
  SCAN\_INV:      25,  // จำนวน\_Invoice\_ที่ต้องสแกน  
  LATLNG\_ACTUAL: 26,  // LatLong\_Actual  
  OWNER\_LABEL:   27,  // ชื่อเจ้าของสินค้า\_Invoice\_ที่ต้องสแกน  
  SHOP\_KEY:      28   // ShopKey  
};

// \[Phase D NEW\] AI Field Column Index (ใน Database)  
// Phase D จะแยก AI keywords ออกจาก COL\_NORMALIZED  
// ตอนนี้เพิ่ม constants ไว้ก่อน ใช้จริงเมื่อ migrate data  
const AI\_CONFIG \= {  
  // Confidence thresholds สำหรับ AI matching  
  THRESHOLD\_AUTO\_MAP:    90,  // \>= 90 → append mapping ทันที  
  THRESHOLD\_REVIEW:      70,  // 70-89 → ส่งเข้า review queue  
  THRESHOLD\_IGNORE:      70,  // \< 70  → ignore

  // AI field tags  
  TAG\_AI:       "\[AI\]",  
  TAG\_REVIEWED: "\[REVIEWED\]",

  // Prompt version tracking  
  PROMPT\_VERSION: "v4.2",

  // Candidate retrieval limit ก่อนส่ง AI  
  RETRIEVAL\_LIMIT: 50  
};

CONFIG.validateSystemIntegrity \= function() {  
  var ss     \= SpreadsheetApp.getActiveSpreadsheet();  
  var errors \= \[\];  
  \[this.SHEET\_NAME, this.MAPPING\_SHEET,  
   SCG\_CONFIG.SHEET\_INPUT, this.SHEET\_POSTAL\].forEach(function(name) {  
    if (\!ss.getSheetByName(name)) errors.push("Missing Sheet: " \+ name);  
  });  
  try {  
    var key \= this.GEMINI\_API\_KEY;  
    if (\!key || key.length \< 20\) errors.push("Invalid Gemini API Key format");  
  } catch(e) {  
    errors.push("Gemini API Key not set. Run setupEnvironment() first.");  
  }  
  if (errors.length \> 0\) {  
    var msg \= "⚠️ SYSTEM INTEGRITY FAILED:\\n" \+ errors.join("\\n");  
    console.error(msg);  
    throw new Error(msg);  
  }  
  console.log("✅ System Integrity: OK");  
  return true;  
};