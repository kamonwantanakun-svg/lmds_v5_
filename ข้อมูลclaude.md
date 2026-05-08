รับทราบครับ! จากการวิเคราะห์ข้อมูลจริงในไฟล์ CSV และ Design Document — ผมเห็น Pattern ปัญหาครบทั้ง 8 ข้อแล้ว เช่น คุณแตง โทร.0639656564 vs คุณจันทร์ โทร.0819994556 ที่ LAT/LONG ใกล้กันมาก, ผลการตรวจสอบงานส่ง = WARNING ที่ต้อง review ฯลฯ
มาสร้างทั้ง 3 ส่วนเลยครับ:

ส่วนที่ 1 — Database Relationship Diagramได้รับข้อมูลครบแล้วครับ พบ Pattern ปัญหาในข้อมูลจริง:

คุณแตง โทร.0639656564 vs คุณจันทร์ — ส่ง LAT ต่างกัน 0.004°
ที่อยู่ปลายทาง มีทั้ง (เบอร์โทร) prefix และตัวย่อ
WARNING rows ต้องเข้า Q_REVIEW

เริ่มส่วนที่ 1 — ERD Diagram ก่อนเลยครับ:

  ::view-transition-group(*),
  ::view-transition-old(*),
  ::view-transition-new(*) {
    animation-duration: 0.25s;
    animation-timing-function: cubic-bezier(0.19, 1, 0.22, 1);
  }
VvisualizeVvisualize show_widget
ส่วนที่ 2 & 3 — GAS File Structure + Complete Code
เขียนโค้ดทั้ง 15 โมดูลเลยครับ:Ran a command, created a fileRan a command, created a fileCreate directory for GAS modulesbashmkdir -p /home/claude/gas_modulesOutputexit code 0Module 00_App.gs - Main entry point00_App.gsDoneYou said: ครับครับ25 เม.ย.Claude responded: ตอนนี้รวมไฟล์ทั้งหมดเพื่อ Export ครับ:Orchestrated continuation of comprehensive module seriesOrchestrated continuation of comprehensive module seriesThe user wants me to continue writing all the remaining GAS modules. Let me continue with modules 01-14.Module 01_Config.gs - Configuration management01_Config.gsModule 02_Schema.gs - Schema validation02_Schema.gsModule 03_SetupSheets.gs - Initial sheet creation03_SetupSheets.gsModule 04_SourceRepository.gs - Read from source sheet04_SourceRepository.gsModule 05_NormalizeService.gs - Text normalization05_NormalizeService.gsModule 06_PersonService.gs - Person master management06_PersonService.gsModules 07-14 combined into remaining files07_PlaceService.gsModule 08_GeoService.gs - GPS coordinate management08_GeoService.gsModules 09-10: DestinationService and MatchEngine09_10_DestinationAndMatchEngine.gsModules 11-12: TransactionService and ReviewService11_12_TransactionAndReview.gsModules 13-14: ReportService and Utils13_14_ReportAndUtils.gsDoneตอนนี้รวมไฟล์ทั้งหมดเพื่อ Export ครับ:Ran 2 commandsRan 2 commandsMerge all GAS modules into single output filebashcat /home/claude/gas_modules/00_App.gs \
    /home/claude/gas_modules/01_Config.gs \
    /home/claude/gas_modules/02_Schema.gs \
    /home/claude/gas_modules/03_SetupSheets.gs \
    /home/claude/gas_modules/04_SourceRepository.gs \
    /home/claude/gas_modules/05_NormalizeService.gs \
    /home/claude/gas_modules/06_PersonService.gs \
    /home/claude/gas_modules/07_PlaceService.gs \
    /home/claude/gas_modules/08_GeoService.gs \
    /home/claude/gas_modules/09_10_DestinationAndMatchEngine.gs \
    /home/claude/gas_modules/11_12_TransactionAndReview.gs \
    /home/claude/gas_modules/13_14_ReportAndUtils.gs \
    > /mnt/user-data/outputs/LogisticsMDM_GAS_Complete_V001.gs
wc -l /mnt/user-data/outputs/LogisticsMDM_GAS_Complete_V001.gs
echo "✅ รวมไฟล์สำเร็จ"Output3122 /mnt/user-data/outputs/LogisticsMDM_GAS_Complete_V001.gs
✅ รวมไฟล์สำเร็จ
Count and list all functionsbash# Count functions per module
echo "📊 สรุป Function Count:"
grep -c "^function " /home/claude/gas_modules/00_App.gs
grep -c "^function " /home/claude/gas_modules/01_Config.gs
grep -c "^function " /home/claude/gas_modules/02_Schema.gs
grep -c "^function " /home/claude/gas_modules/03_SetupSheets.gs
grep -c "^function " /home/claude/gas_modules/04_SourceRepository.gs
grep -c "^function " /home/claude/gas_modules/05_NormalizeService.gs
grep -c "^function " /home/claude/gas_modules/06_PersonService.gs
grep -c "^function " /home/claude/gas_modules/07_PlaceService.gs
grep -c "^function " /home/claude/gas_modules/08_GeoService.gs
grep -c "^function " /home/claude/gas_modules/09_10_DestinationAndMatchEngine.gs
grep -c "^function " /home/claude/gas_modules/11_12_TransactionAndReview.gs
grep -c "^function " /home/claude/gas_modules/13_14_ReportAndUtils.gs
echo ""
echo "📋 รายชื่อ Function ทั้งหมด:"
grep "^function " /mnt/user-data/outputs/LogisticsMDM_GAS_Complete_V001.gs | wc -lOutput📊 สรุป Function Count:
10
6
7
5
7
10
13
13
11
14
12
20

📋 รายชื่อ Function ทั้งหมด:
128
DoneYou said: รออยู่ครับรออยู่ครับ
และขอเพิ่มเติม
ช่วยทำให้มีระบบตัดก่อนที่จะรันเกินเวลาได้มั้ย
และถ้าผมกดประมวลผลข้อมูลใหม่ ระบบจะทำต่อจากที่ทำไปแล้ว หรือ จะต้องเริ่มต้นแถวแรกใหม่
และช่วยเน้นตรง โค๊ด 8 ข้อปัญหาให้ด้วยนะครับ ผมต้องการให้ระบบนี้ แข็งแรง สะอาด ฉลาด นำกลับมาใช้งานได้จริงๆ25 เม.ย.Claude responded: รับทราบครับ!วางแผนเพิ่มระบบป้องกันเวลา จุดตรวจสอบ และปรับปรุงโค้ดวางแผนเพิ่มระบบป้องกันเวลา จุดตรวจสอบ และปรับปรุงโค้ดThe user wants:

Execution time guard (timeout protection before hitting Google Apps Script's 6-minute limit)
Resume capability - continue from where it left off (not restart from row 1)
Enhanced handling of the 8 problem types with stronger, smarter logic

Let me design this properly and write the complete enhanced code.
Key additions:

Execution Time Guard: GAS has 6-minute limit. Need to checkpoint progress and stop gracefully before timeout.
Resume/Checkpoint System: Save last processed row to SYS_CONFIG or a dedicated checkpoint, so next run continues from there.
Enhanced 8-Problem Detection & Resolution: More robust logic for all 8 conflict types.

Let me write the updated modules:

Enhanced 00_App.gs with time guard
New 15_CheckpointService.gs for resume capability
Enhanced 10_MatchEngine.gs with deeper 8-problem handling
Enhanced conflict resolution logic

The execution time guard approach:

Record start time
Before each row, check elapsed time
If elapsed > 5 minutes (leaving 1 min buffer), save checkpoint and stop
Next run reads checkpoint and continues

For the 8 problems, I need more sophisticated scoring and detection.Show moreCheck existing modules structureNow I need to create the enhanced version with:

Execution time guard
Resume/checkpoint system
Enhanced 8-problem handling

Let me create the new modules.Doneรับทราบครับ! นี่คือ 3 ปัญหาหลักที่ต้องแก้:

Time Guard — GAS หยุดอัตโนมัติที่ 6 นาที ต้องตัดก่อน ไม่งั้นข้อมูลจะ corrupt กลางคัน
Resume System — Checkpoint บันทึก row สุดท้ายที่ทำ รันครั้งถัดไปต่อจากตรงนั้น
8 ปัญหา — ต้องการ scoring engine ที่ฉลาดกว่าเดิม + resolution path ชัดเจน

สร้างโมดูลใหม่ + อัปเดต 3 โมดูลหลักเลยครับ:เตรียมสรุปการเปลี่ยนแปลงและเพิ่มเติมอย่างครอบคลุมเตรียมสรุปการเปลี่ยนแปลงและเพิ่มเติมอย่างครอบคลุมNew Module 15_CheckpointService.gs - Resume and execution time guard15_CheckpointService.gsUpdated 00_App.gs with Time Guard and Resume integration00_App_v002.gsEnhanced MatchEngine v002 - Full 8-problem detection and resolution10_MatchEngine_v002.gsBuild final V002 output and count functionsScriptPresented fileGood, the file is ready. Let me now provide a comprehensive summary of what was added/changed.Done
✅ CHANGE LOG — VERSION 002
🔍 [1] สิ่งที่เพิ่มและแก้ไข
ไฟล์เวอร์ชันการเปลี่ยนแปลง00_App.gs001→002เพิ่ม Time Guard + Auto-Trigger + Resume flow10_MatchEngine.gs001→002เขียนใหม่ทั้งหมด — 8-Problem Engine15_CheckpointService.gs001 ใหม่ระบบ Checkpoint + Timer ทั้งโมดูล

⏱ [2] Time Guard & Resume — ทำงานอย่างไร
รัน runDailyProcess()
    │
    ├─ โหลด Checkpoint ← PropertiesService (ถาวร ไม่หายแม้ script หยุด)
    │       ↓
    │  มี Checkpoint?
    │  YES → ข้ามแถวที่ทำแล้ว เริ่มต่อจาก lastProcessedRow + 1
    │  NO  → เริ่มจาก row 2
    │
    ├─ Loop ทีละแถว พร้อม Timer.shouldStop() ทุกแถว
    │       ↓
    │  เวลา < 5 นาที → ทำต่อ
    │  เวลา ≥ 5 นาที → บันทึก Checkpoint + ติดตั้ง Auto-Trigger
    │
    └─ เสร็จทุกแถว → ล้าง Checkpoint
สิ่งที่เกิดขึ้นถ้ากด Process ครั้งที่ 2:

ระบบ load Checkpoint → รู้ว่าทำถึง row 847 แล้ว
เริ่มต่อจาก row 848 ทันที ไม่ย้อนกลับ row 1
Auto-save Checkpoint ทุก 50 แถว (ป้องกัน crash กลางคัน)


🔎 [3] 8-Problem Engine — Logic ใหม่ทั้งหมด
Weight Matrix ที่ใช้คำนวณ Composite Score:
Person Exact Match    → +40 คะแนน
Person Alias Match    → +38 คะแนน  
Person Fuzzy Match    → +28 × (score/100)
Place Exact           → +30 คะแนน
Geo Exact (key_6)     → +30 คะแนน
Geo Near  (key_5)     → +25 คะแนน
Address Bonus         → +10 คะแนน
Owner Match Bonus     → +5  คะแนน
Decision + Action ต่อปัญหาแต่ละข้อ:
ปัญหาTrigger ConditionDecisionAction#1 ชื่อซ้ำCanonical match = 100%AUTO_MATCHAUTO_MAP#2 Place ซ้ำPlace match = 100%AUTO_MATCHAUTO_MAP#3 Geo ซ้ำkey_6 หรือ radius matchAUTO_MATCHAUTO_MAP#4 ชื่อเพี้ยนFuzzy score 70–89%AUTO/REVIEWADD_ALIAS#5 คนละชื่อ Place เดิมPlace match + Person ใหม่REVIEWCONFIRM_MULTI#6 คนเดิม Place ใหม่Person match + Place ใหม่REVIEWCONFIRM_MULTI#7 คนเดิม Geo ต่างPerson match + Geo ใหม่AUTO (drift<500m) / REVIEWตามระยะ#8 คนต่าง Geo เดิมGeo match + Person ใหม่REVIEWCONFIRM_MULTI

✅ [4] Test Checklist หลัง Deploy
□ Setup: กด "ติดตั้งระบบ" → ได้ 12 ชีต + header ครบ
□ Timer: จำลอง data 1000+ แถว → ระบบตัดก่อน 5 นาที + มี Checkpoint
□ Resume: กด Process ครั้งที่ 2 → ต่อจากแถวที่ค้าง ไม่เริ่มใหม่
□ C4: ใส่ชื่อเพี้ยน เช่น "คุณแตง" vs "แตง" → Fuzzy match + เพิ่ม Alias
□ C7: คนเดิม Geo ต่าง < 500m → AUTO_MAP (GPS drift)
□ C7: คนเดิม Geo ต่าง > 500m → REVIEW queue
□ C8: Geo เดิม Person ใหม่ → REVIEW + แสดงรายชื่อคนเดิมใน candidate
□ Q_REVIEW: มี issue_type ถูกต้องตาม Conflict Code
□ Auto-Trigger: ดูใน Apps Script > Triggers ว่ามีหลัง Time Guard ตัด

// ============================================================
// FILE: 00_App.gs  (UPDATED)
// VERSION: 002
// MODULE: App — Entry Point พร้อม Time Guard + Resume System
// ============================================================

function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('🚚 MDM Logistics')
    .addItem('🔧 ติดตั้งระบบครั้งแรก (Setup)', 'runInitialSetup')
    .addSeparator()
    .addItem('▶ รัน Daily Process', 'runDailyProcess')
    .addItem('⏸ ดูสถานะ Checkpoint', 'showCheckpointStatus')
    .addItem('🔄 Reset และเริ่มใหม่ทั้งหมด', 'resetAndRestart')
    .addSeparator()
    .addItem('🌙 รัน Nightly Maintenance', 'runNightlyMaintenance')
    .addItem('🔁 Reprocess Selected Rows', 'reprocessSelectedRows')
    .addItem('📊 Refresh Quality Report', 'refreshQualityReport')
    .addSeparator()
    .addItem('🔍 ดู Pending Reviews', 'showPendingReviews')
    .addItem('📋 ดู System Log', 'viewRecentLogs')
    .addItem('❓ ตรวจสอบ Schema', 'runSchemaCheck')
    .addToUi();
}

// ─────────────────────────────────────────────────────────────
// MAIN ENTRY POINTS
// ─────────────────────────────────────────────────────────────

/**
 * runDailyProcess — ประมวลผลข้อมูลใหม่ พร้อม Time Guard + Resume
 *
 * FLOW:
 *   1. ตรวจ Schema
 *   2. โหลด Checkpoint (ถ้ามี = ต่อจากที่ค้าง)
 *   3. รัน runWithTimeGuard loop
 *   4. ถ้า Time Guard ตัด → บันทึก Checkpoint + ติดตั้ง Auto-Trigger
 *   5. ถ้าเสร็จ → ล้าง Checkpoint + สรุปผล
 */
function runDailyProcess() {
  // ลบ Trigger ของตัวเองก่อน (กรณีถูก trigger อัตโนมัติ)
  removeSelfTrigger('runDailyProcess');

  const runId = uuid();
  const startTime = new Date();

  try {
    writeLog('INFO', '00_App', 'runDailyProcess', runId, '▶ เริ่ม Daily Process', null);

    // 1. Schema check
    if (!preCheck_Schema()) {
      writeLog('ERROR', '00_App', 'runDailyProcess', runId, 'Schema ไม่ผ่าน — หยุด', null);
      return;
    }

    // 2. แสดง Checkpoint status (ถ้ามี)
    const cpStatus = getCheckpointStatus();
    if (cpStatus.exists) {
      writeLog('INFO', '00_App', 'runDailyProcess', runId,
        `⏸ พบ Checkpoint: ${cpStatus.message}`, null);
    }

    // 3. อ่านทุก row จากชีตต้นทาง (getValues ครั้งเดียว — RULE 6)
    const allRows = getSourceRows();
    if (!allRows || allRows.length === 0) {
      writeLog('INFO', '00_App', 'runDailyProcess', runId,
        'ไม่มีข้อมูลในชีตต้นทาง', null);
      return;
    }

    writeLog('INFO', '00_App', 'runDailyProcess', runId,
      `📊 Source rows ทั้งหมด: ${allRows.length}`, null);

    // 4. รัน Time-Guard Loop ─────────────────────────────────
    const result = runWithTimeGuard(
      allRows,
      (row) => _processOneRow(row, runId),
      runId
    );

    // 5. จัดการผลลัพธ์ ─────────────────────────────────────────

    if (result.interrupted) {
      // ยังทำไม่เสร็จ — ติดตั้ง Auto-Trigger รันต่อ
      installTimeTrigger('runDailyProcess');

      const pct = result.sourceLastRow > 0
        ? ((result.lastRowDone / result.sourceLastRow) * 100).toFixed(1) : '?';

      writeLog('WARN', '00_App', 'runDailyProcess', runId,
        `⏱ Time Guard ตัด: ${pct}% เสร็จ (row ${result.lastRowDone}/${result.sourceLastRow}) ` +
        `| จะ Auto-Continue ใน ~1 นาที`, null);

      // แจ้งใน Spreadsheet cell (ไม่ popup เพราะอาจเป็น background trigger)
      _writeStatusToCell(`⏸ Process ยังไม่เสร็จ: ${pct}% (row ${result.lastRowDone}/${result.sourceLastRow}) — Auto-continue กำลังรอ...`);

    } else {
      // เสร็จสมบูรณ์ทุก row
      writeLog('INFO', '00_App', 'runDailyProcess', runId,
        `✅ เสร็จสมบูรณ์ | session: ok=${result.sessionOk} review=${result.sessionReview} error=${result.sessionError} ` +
        `| รวมทั้งหมด: ok=${result.totalOk} review=${result.totalReview} error=${result.totalError}`,
        JSON.stringify(result));

      // บันทึก Quality Report
      writeReportSnapshot({
        report_date:           startTime,
        total_source_rows:     allRows.length,
        processed_rows:        result.totalDone,
        auto_match_count:      result.totalOk,
        review_count:          result.totalReview,
        error_count:           result.totalError,
        new_person_count:      0,  // อัปเดตใน Nightly
        new_place_count:       0,
        new_geo_count:         0,
        new_destination_count: 0,
        duplicate_alert_count: 0,
        last_refresh_at:       new Date()
      });

      _writeStatusToCell(
        `✅ Process เสร็จ ${new Date().toLocaleString('th-TH')} | ` +
        `ok=${result.sessionOk} review=${result.sessionReview} error=${result.sessionError}`
      );

      // แสดง popup เฉพาะถ้า run แบบ manual
      try {
        SpreadsheetApp.getUi().alert(
          '✅ Daily Process เสร็จสิ้น',
          `ประมวลผล ${result.sessionDone} แถว ใน ${result.elapsedSeconds.toFixed(0)}s\n` +
          `✔ Auto-Match: ${result.sessionOk}\n` +
          `🔍 Review Queue: ${result.sessionReview}\n` +
          `❌ Error: ${result.sessionError}`,
          SpreadsheetApp.getUi().ButtonSet.OK
        );
      } catch (_) { /* Background trigger — ไม่มี UI */ }
    }

  } catch (e) {
    writeLog('ERROR', '00_App', 'runDailyProcess', runId, e.message, null);
    try { SpreadsheetApp.getUi().alert('❌ Error', e.message, SpreadsheetApp.getUi().ButtonSet.OK); }
    catch (_) {}
  }
}

/**
 * _processOneRow — ประมวลผล 1 แถว (ใช้ใน runWithTimeGuard)
 * @param {Object} row
 * @param {string} runId
 * @returns {{ ok: boolean, decision: string }}
 */
function _processOneRow(row, runId) {
  // Normalize
  const normObj = normalizeSourceObject(row);

  // Match Engine
  const resolved = matchAllEntities(normObj);

  // บันทึก FACT + Review Queue
  saveProcessingResult(normObj, resolved);

  // อัปเดต SYNC_STATUS ในชีตต้นทาง
  let newStatus;
  switch (resolved.decision) {
    case 'AUTO_MATCH': newStatus = 'PROCESSED';       break;
    case 'NEW':        newStatus = 'PROCESSED_NEW';   break;
    case 'REVIEW':     newStatus = 'PENDING_REVIEW';  break;
    default:           newStatus = 'PROCESSED';
  }
  updateSourceSyncStatus(row._rowNumber, newStatus);

  return { ok: resolved.decision !== 'REVIEW', decision: resolved.decision };
}

// ─────────────────────────────────────────────────────────────
// SETUP
// ─────────────────────────────────────────────────────────────

function runInitialSetup() {
  const ui = SpreadsheetApp.getUi();
  const resp = ui.alert(
    '🔧 ติดตั้งระบบ MDM',
    'ระบบจะสร้างชีต, config และ header ทั้งหมด\nต้องการดำเนินการต่อหรือไม่?',
    ui.ButtonSet.YES_NO
  );
  if (resp !== ui.Button.YES) return;

  try {
    writeLog('INFO', '00_App', 'runInitialSetup', null, 'เริ่มติดตั้ง', null);
    validateSourceSchema();
    createSystemSheets();
    seedInitialConfig();
    freezeHeaderRows();
    writeLog('INFO', '00_App', 'runInitialSetup', null, 'ติดตั้งสำเร็จ', null);
    ui.alert('✅ ติดตั้งสำเร็จ', 'MDM Logistics พร้อมใช้งาน', ui.ButtonSet.OK);
  } catch (e) {
    writeLog('ERROR', '00_App', 'runInitialSetup', null, e.message, null);
    ui.alert('❌ Error', e.message, ui.ButtonSet.OK);
  }
}

// ─────────────────────────────────────────────────────────────
// MAINTENANCE
// ─────────────────────────────────────────────────────────────

function runNightlyMaintenance() {
  const runId = uuid();
  removeSelfTrigger('runNightlyMaintenance');
  try {
    writeLog('INFO', '00_App', 'runNightlyMaintenance', runId, 'เริ่ม Nightly', null);
    updateAllMasterStats();
    refreshQualityReport();
    purgeOldLogs(90);
    writeLog('INFO', '00_App', 'runNightlyMaintenance', runId, 'Maintenance เสร็จ', null);
  } catch (e) {
    writeLog('ERROR', '00_App', 'runNightlyMaintenance', runId, e.message, null);
  }
}

function reprocessSelectedRows() {
  const ui = SpreadsheetApp.getUi();
  const sheet = SpreadsheetApp.getActiveSheet();
  if (sheet.getName() !== getConfig('SOURCE_SHEET_NAME')) {
    ui.alert('⚠ กรุณา select แถวในชีต ' + getConfig('SOURCE_SHEET_NAME'));
    return;
  }
  const range = sheet.getActiveRange();
  if (!range) { ui.alert('⚠ กรุณาเลือกแถวก่อน'); return; }

  const startRow = range.getRow();
  const numRows  = range.getNumRows();
  const resp = ui.alert('🔁 Reprocess',
    `Reprocess ${numRows} แถว (${startRow}–${startRow + numRows - 1})?`, ui.ButtonSet.YES_NO);
  if (resp !== ui.Button.YES) return;

  const runId = uuid();
  let ok = 0, error = 0;
  for (let r = startRow; r < startRow + numRows; r++) {
    try {
      const row = getSourceRowByNumber(r);
      if (!row) continue;
      _processOneRow(row, runId);
      ok++;
    } catch (e) {
      writeLog('ERROR', '00_App', 'reprocessSelectedRows', runId, `Row ${r}: ${e.message}`, null);
      error++;
    }
  }
  ui.alert('✅ Reprocess เสร็จ', `สำเร็จ: ${ok} | Error: ${error}`, ui.ButtonSet.OK);
}

function showPendingReviews() {
  const reviews = getPendingReviews();
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = ss.getSheetByName(SHEET_NAMES.Q_REVIEW);
  if (sh) ss.setActiveSheet(sh);
  SpreadsheetApp.getUi().alert(
    '🔍 Pending Reviews',
    `มีรายการรอตรวจ: ${reviews.length} รายการ\n(ดูใน Sheet Q_REVIEW)`,
    SpreadsheetApp.getUi().ButtonSet.OK
  );
}

function viewRecentLogs() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = ss.getSheetByName('SYS_LOG');
  if (!sh) { SpreadsheetApp.getUi().alert('ไม่พบ SYS_LOG'); return; }
  ss.setActiveSheet(sh);
  const lastRow = sh.getLastRow();
  if (lastRow > 1) sh.getRange(Math.max(2, lastRow - 30), 1, Math.min(30, lastRow - 1), 9).activate();
}

function runSchemaCheck() {
  try {
    validateSourceSchema();
    SpreadsheetApp.getUi().alert('✅ Schema ถูกต้องครบถ้วน');
  } catch (e) {
    SpreadsheetApp.getUi().alert('❌ Schema Error: ' + e.message);
  }
}

// ─────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────

/**
 * _writeStatusToCell — เขียน Status ลง SYS_CONFIG row 'LAST_RUN_STATUS'
 * เพื่อให้ดูสถานะได้จาก Sheet โดยไม่ต้องเปิด Log
 */
function _writeStatusToCell(message) {
  try {
    setConfig('LAST_RUN_STATUS', message);
    setConfig('LAST_RUN_AT', new Date().toISOString());
  } catch (_) {}
}

function updateAllMasterStats() {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const factSheet = ss.getSheetByName('FACT_DELIVERY');
    if (!factSheet || factSheet.getLastRow() < 2) return;
    const factData = factSheet.getDataRange().getValues();
    const hdr = factData[0];
    const pidIdx = hdr.indexOf('person_id');
    const plcIdx = hdr.indexOf('place_id');
    const geoIdx = hdr.indexOf('geo_id');
    const dateIdx = hdr.indexOf('delivery_date');
    const stats = { person: {}, place: {}, geo: {} };
    for (let i = 1; i < factData.length; i++) {
      const r = factData[i];
      const d = r[dateIdx] ? new Date(r[dateIdx]) : null;
      ['person', 'place', 'geo'].forEach((type, ti) => {
        const idx = [pidIdx, plcIdx, geoIdx][ti];
        if (!r[idx]) return;
        if (!stats[type][r[idx]]) stats[type][r[idx]] = { count: 0, last: null };
        stats[type][r[idx]].count++;
        if (d && (!stats[type][r[idx]].last || d > stats[type][r[idx]].last))
          stats[type][r[idx]].last = d;
      });
    }
    _applyStatsToSheet('M_PERSON', 'person_id', stats.person);
    _applyStatsToSheet('M_PLACE',  'place_id',  stats.place);
    _applyStatsToSheet('M_GEO_POINT', 'geo_id', stats.geo);
  } catch (e) {
    writeLog('ERROR', '00_App', 'updateAllMasterStats', null, e.message, null);
  }
}

function _applyStatsToSheet(sheetName, idCol, statsMap) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = ss.getSheetByName(sheetName);
  if (!sh || sh.getLastRow() < 2) return;
  const data = sh.getDataRange().getValues();
  const hdr = data[0];
  const idIdx = hdr.indexOf(idCol);
  const countIdx = hdr.indexOf('usage_count');
  const lastIdx  = hdr.indexOf('last_seen_date');
  if (idIdx < 0) return;
  for (let i = 1; i < data.length; i++) {
    const id = data[i][idIdx];
    if (!id || !statsMap[id]) continue;
    if (countIdx >= 0) data[i][countIdx] = statsMap[id].count;
    if (lastIdx  >= 0 && statsMap[id].last) data[i][lastIdx] = statsMap[id].last;
  }
  sh.getRange(1, 1, data.length, data[0].length).setValues(data);
}

function purgeOldLogs(daysOld) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sh = ss.getSheetByName('SYS_LOG');
    if (!sh || sh.getLastRow() < 2) return;
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - daysOld);
    const data = sh.getDataRange().getValues();
    const hdr = data[0];
    const dtIdx = hdr.indexOf('created_at');
    if (dtIdx < 0) return;
    const keep = [hdr];
    for (let i = 1; i < data.length; i++) {
      const dt = new Date(data[i][dtIdx]);
      if (isNaN(dt) || dt >= cutoff) keep.push(data[i]);
    }
    sh.clearContents();
    sh.getRange(1, 1, keep.length, keep[0].length).setValues(keep);
  } catch (e) {
    writeLog('WARN', '00_App', 'purgeOldLogs', null, e.message, null);
  }
}
// ============================================================
// FILE: 01_Config.gs
// VERSION: 001
// MODULE: Config — จัดการค่าคงที่และค่าตั้งค่าระบบ
// ============================================================

/**
 * SHEET_NAMES — ชื่อชีตทั้งหมดในระบบ (Source of Truth)
 */
const SHEET_NAMES = {
  SOURCE:       'SCGนครหลวงJWDภูมิภาค',
  M_PERSON:     'M_PERSON',
  M_PERSON_ALIAS:'M_PERSON_ALIAS',
  M_PLACE:      'M_PLACE',
  M_PLACE_ALIAS:'M_PLACE_ALIAS',
  M_GEO_POINT:  'M_GEO_POINT',
  M_DESTINATION:'M_DESTINATION',
  FACT_DELIVERY:'FACT_DELIVERY',
  Q_REVIEW:     'Q_REVIEW',
  SYS_CONFIG:   'SYS_CONFIG',
  SYS_LOG:      'SYS_LOG',
  RPT_QUALITY:  'RPT_DATA_QUALITY'
};

/**
 * C_IDX — Column Index Map ของชีตต้นทาง (0-based)
 * RULE 3: อ้างอิงจากนี้เสมอ ห้าม hardcode ตัวเลข
 */
const C_IDX = {
  SOURCE: {
    HEAD:            0,
    ID:              1,
    DELIVERY_DATE:   2,
    DELIVERY_TIME:   3,
    GEO_POINT:       4,   // "จุดส่งสินค้าปลายทาง" = "lat, long" string
    DRIVER_NAME:     5,
    LICENSE_PLATE:   6,
    SHIPMENT_NO:     7,
    INVOICE_NO:      8,
    BILL_PHOTO:      9,
    CUSTOMER_CODE:   10,
    OWNER_NAME:      11,  // ชื่อเจ้าของสินค้า (บริษัท)
    DEST_NAME:       12,  // ชื่อปลายทาง ← ตัวปัญหาหลัก
    EMP_EMAIL:       13,
    LAT:             14,
    LONG:            15,
    DOC_RETURN_ID:   16,
    WAREHOUSE:       17,
    ADDRESS:         18,  // ที่อยู่ปลายทาง (มั่วๆ จากระบบ)
    PHOTO_GOODS:     19,
    PHOTO_STORE:     20,
    NOTE:            21,
    MONTH:           22,
    DISTANCE_KM:     23,
    ADDRESS_LATLONG: 24,  // ชื่อที่อยู่จาก LatLong (แปลงด้วย script)
    SM_LINK:         25,
    EMP_ID:          26,
    GPS_RECORD:      27,
    TIME_START:      28,
    TIME_SUCCESS:    29,
    MOVE_DISTANCE_M: 30,
    DURATION_MIN:    31,
    SPEED_M_MIN:     32,
    VALIDATION:      33,  // ผลการตรวจสอบงานส่ง
    ANOMALY:         34,  // เหตุผิดปกติ
    PHOTO_TIME:      35,
    SYNC_STATUS:     36
  }
};

// ค่า Default สำหรับ SYS_CONFIG ที่จะ seed ครั้งแรก
const DEFAULT_CONFIG = {
  SOURCE_SHEET_NAME:      SHEET_NAMES.SOURCE,
  AUTO_MATCH_SCORE:       '90',
  REVIEW_SCORE_MIN:       '70',
  GEO_RADIUS_METER:       '50',
  GEO_KEY_PRECISION:      '6',
  MAX_BATCH_SIZE:         '500',
  LOG_RETENTION_DAYS:     '90',
  ENABLE_FUZZY_MATCH:     'true',
  FUZZY_MIN_LENGTH:       '3',
  WAREHOUSE_LAT:          '14.165716',
  WAREHOUSE_LONG:         '100.625296',
  VERSION:                '001'
};

// ─────────────────────────────────────────────
// PUBLIC FUNCTIONS
// ─────────────────────────────────────────────

/**
 * getConfig — อ่านค่า config จากชีต SYS_CONFIG
 * ใช้ CacheService เพื่อลด sheet read (cache 6 ชั่วโมง)
 * @param {string} key - ชื่อ config key
 * @returns {string|null}
 */
function getConfig(key) {
  const cache = CacheService.getScriptCache();
  const cacheKey = 'CFG_' + key;
  const cached = cache.get(cacheKey);
  if (cached !== null) return cached;

  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sh = ss.getSheetByName(SHEET_NAMES.SYS_CONFIG);
    if (!sh) return DEFAULT_CONFIG[key] || null;

    const data = sh.getDataRange().getValues();
    for (let i = 1; i < data.length; i++) {
      if (data[i][0] === key) {
        const val = String(data[i][1]);
        cache.put(cacheKey, val, 21600); // RULE 6: cache 6 ชม.
        return val;
      }
    }
    return DEFAULT_CONFIG[key] || null;
  } catch (e) {
    return DEFAULT_CONFIG[key] || null;
  }
}

/**
 * getAllConfigs — อ่าน config ทั้งหมดเป็น object
 * @returns {Object}
 */
function getAllConfigs() {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sh = ss.getSheetByName(SHEET_NAMES.SYS_CONFIG);
    if (!sh) return { ...DEFAULT_CONFIG };

    const data = sh.getDataRange().getValues();
    const result = { ...DEFAULT_CONFIG };
    for (let i = 1; i < data.length; i++) {
      if (data[i][0]) result[data[i][0]] = String(data[i][1]);
    }
    return result;
  } catch (e) {
    return { ...DEFAULT_CONFIG };
  }
}

/**
 * setConfig — บันทึกค่า config และ clear cache
 * @param {string} key
 * @param {string} value
 */
function setConfig(key, value) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sh = ss.getSheetByName(SHEET_NAMES.SYS_CONFIG);
    if (!sh) return;

    const data = sh.getDataRange().getValues();
    for (let i = 1; i < data.length; i++) {
      if (data[i][0] === key) {
        sh.getRange(i + 1, 2).setValue(value);
        sh.getRange(i + 1, 5).setValue(new Date());
        CacheService.getScriptCache().remove('CFG_' + key);
        return;
      }
    }
    // ถ้าไม่มี key เดิม — เพิ่มแถวใหม่
    sh.appendRow([key, value, 'MANUAL', '', new Date()]);
    CacheService.getScriptCache().remove('CFG_' + key);
  } catch (e) {
    writeLog('ERROR', '01_Config', 'setConfig', null, e.message, null);
  }
}

/**
 * getThresholds — ดึงค่า threshold ทั้งหมดที่ใช้ใน MatchEngine
 * @returns {Object}
 */
function getThresholds() {
  return {
    autoMatch:   parseFloat(getConfig('AUTO_MATCH_SCORE'))  || 90,
    reviewMin:   parseFloat(getConfig('REVIEW_SCORE_MIN'))  || 70,
    geoRadius:   parseFloat(getConfig('GEO_RADIUS_METER'))  || 50,
    geoPrecision:parseInt(getConfig('GEO_KEY_PRECISION'))   || 6,
    maxBatch:    parseInt(getConfig('MAX_BATCH_SIZE'))       || 500,
    fuzzyOn:     getConfig('ENABLE_FUZZY_MATCH') === 'true',
    fuzzyMinLen: parseInt(getConfig('FUZZY_MIN_LENGTH'))    || 3
  };
}

/**
 * getSheetNames — คืนค่า SHEET_NAMES object
 * @returns {Object}
 */
function getSheetNames() {
  return { ...SHEET_NAMES };
}

/**
 * invalidateConfigCache — ล้าง Cache ทั้งหมด (เรียกหลัง setConfig หลายตัว)
 */
function invalidateConfigCache() {
  CacheService.getScriptCache().removeAll(
    Object.keys(DEFAULT_CONFIG).map(k => 'CFG_' + k)
  );
}
// ============================================================
// FILE: 02_Schema.gs
// VERSION: 001
// MODULE: Schema — ตรวจสอบโครงสร้างชีตและ Headers
// ============================================================

// Header definitions สำหรับแต่ละชีต Master
const SHEET_HEADERS = {
  M_PERSON: [
    'person_id','person_name_canonical','person_name_normalized',
    'first_seen_date','last_seen_date','usage_count','status','note'
  ],
  M_PERSON_ALIAS: [
    'person_alias_id','person_id','alias_raw','alias_normalized',
    'source_field','first_seen_date','last_seen_date','usage_count','active_flag'
  ],
  M_PLACE: [
    'place_id','place_name_canonical','place_name_normalized',
    'address_best','address_normalized','warehouse_default',
    'first_seen_date','last_seen_date','usage_count','status','note'
  ],
  M_PLACE_ALIAS: [
    'place_alias_id','place_id','alias_raw','alias_normalized',
    'source_field','first_seen_date','last_seen_date','usage_count','active_flag'
  ],
  M_GEO_POINT: [
    'geo_id','lat_raw','long_raw','lat_norm','long_norm',
    'geo_key_6','geo_key_5','geo_key_4',
    'address_from_latlong_best','first_seen_date','last_seen_date','usage_count','note'
  ],
  M_DESTINATION: [
    'destination_id','person_id','place_id','geo_id',
    'destination_label_canonical','destination_key',
    'confidence_status','first_seen_date','last_seen_date','usage_count','note'
  ],
  FACT_DELIVERY: [
    'tx_id','source_sheet','source_row_number','source_record_id',
    'delivery_date','delivery_time','shipment_no','invoice_no',
    'owner_name','customer_code','raw_person_name','raw_place_name',
    'raw_address','raw_lat','raw_long',
    'person_id','place_id','geo_id','destination_id',
    'warehouse','distance_km','driver_name','employee_id','employee_email',
    'license_plate','validation_result','anomaly_reason',
    'review_status','sync_status','created_at','updated_at'
  ],
  Q_REVIEW: [
    'review_id','issue_type','source_record_id','source_row_number',
    'invoice_no','raw_person_name','raw_place_name','raw_lat','raw_long',
    'candidate_person_ids','candidate_place_ids','candidate_geo_ids',
    'candidate_destination_ids','score','recommended_action',
    'status','reviewer','reviewed_at','decision','note'
  ],
  SYS_CONFIG: [
    'config_key','config_value','config_group','description','updated_at'
  ],
  SYS_LOG: [
    'log_id','run_id','created_at','level','module_name',
    'function_name','ref_id','message','payload_json'
  ],
  RPT_DATA_QUALITY: [
    'report_date','total_source_rows','processed_rows',
    'new_person_count','new_place_count','new_geo_count','new_destination_count',
    'auto_match_count','review_count','duplicate_alert_count',
    'error_count','last_refresh_at'
  ]
};

// คอลัมน์บังคับที่ต้องมีในชีตต้นทาง (ตรวจจาก C_IDX)
const SOURCE_REQUIRED_COLUMNS = [
  'ID_SCGนครหลวงJWDภูมิภาค',
  'วันที่ส่งสินค้า',
  'ชื่อปลายทาง',
  'LAT',
  'LONG',
  'Invoice No',
  'SYNC_STATUS'
];

// ─────────────────────────────────────────────
// PUBLIC FUNCTIONS
// ─────────────────────────────────────────────

/**
 * validateSourceSchema — ตรวจสอบ header ชีตต้นทางว่าครบหรือไม่
 * @throws Error ถ้า column สำคัญหายไป
 */
function validateSourceSchema() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = ss.getSheetByName(SHEET_NAMES.SOURCE);
  if (!sh) throw new Error(`ไม่พบชีตต้นทาง: ${SHEET_NAMES.SOURCE}`);

  const headers = sh.getRange(1, 1, 1, sh.getLastColumn()).getValues()[0];
  const missing = SOURCE_REQUIRED_COLUMNS.filter(col => !headers.includes(col));

  if (missing.length > 0) {
    throw new Error(`ชีตต้นทางขาด column: ${missing.join(', ')}`);
  }
  return true;
}

/**
 * ensureSystemSheets — ตรวจสอบว่าชีตระบบมีครบและ header ถูกต้อง
 * @returns {Object} { ok: boolean, missing: string[], fixed: string[] }
 */
function ensureSystemSheets() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const result = { ok: true, missing: [], fixed: [] };

  for (const [sheetKey, headers] of Object.entries(SHEET_HEADERS)) {
    const sheetName = SHEET_NAMES[sheetKey] || sheetKey;
    let sh = ss.getSheetByName(sheetName);

    if (!sh) {
      // สร้างชีตใหม่
      sh = ss.insertSheet(sheetName);
      sh.getRange(1, 1, 1, headers.length).setValues([headers]);
      result.missing.push(sheetName);
      result.fixed.push(sheetName);
      writeLog('INFO', '02_Schema', 'ensureSystemSheets', null,
        `สร้างชีตใหม่: ${sheetName}`, null);
    } else {
      // ตรวจสอบ header
      const ok = _verifyHeaders(sh, headers);
      if (!ok) {
        createHeadersIfMissing(sh, headers);
        result.fixed.push(sheetName);
      }
    }
  }

  result.ok = result.missing.length === 0;
  return result;
}

/**
 * createHeadersIfMissing — เพิ่ม header ที่หายไปต่อท้าย (RULE 2)
 * @param {Sheet} sh
 * @param {string[]} expectedHeaders
 */
function createHeadersIfMissing(sh, expectedHeaders) {
  const existingHeaders = sh.getLastColumn() > 0
    ? sh.getRange(1, 1, 1, sh.getLastColumn()).getValues()[0]
    : [];

  const toAdd = expectedHeaders.filter(h => !existingHeaders.includes(h));
  if (toAdd.length === 0) return;

  // RULE 2: เพิ่มต่อท้ายเท่านั้น
  const startCol = (sh.getLastColumn() || 0) + 1;
  sh.getRange(1, startCol, 1, toAdd.length).setValues([toAdd]);
  writeLog('INFO', '02_Schema', 'createHeadersIfMissing', null,
    `เพิ่ม header ใน ${sh.getName()}: ${toAdd.join(', ')}`, null);
}

/**
 * getSourceColumnMap — แมป header name → column index (1-based) ของชีตต้นทาง
 * @returns {Object}
 */
function getSourceColumnMap() {
  const cache = CacheService.getScriptCache();
  const cached = cache.get('SOURCE_COL_MAP');
  if (cached) return JSON.parse(cached);

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = ss.getSheetByName(SHEET_NAMES.SOURCE);
  if (!sh) return {};

  const headers = sh.getRange(1, 1, 1, sh.getLastColumn()).getValues()[0];
  const map = {};
  headers.forEach((h, i) => { if (h) map[h] = i + 1; });

  cache.put('SOURCE_COL_MAP', JSON.stringify(map), 21600);
  return map;
}

/**
 * assertRequiredColumns — throw ถ้า sheet ไม่มี column ที่ระบุ
 * @param {Sheet} sh
 * @param {string[]} required
 */
function assertRequiredColumns(sh, required) {
  const headers = sh.getRange(1, 1, 1, sh.getLastColumn()).getValues()[0];
  const missing = required.filter(c => !headers.includes(c));
  if (missing.length > 0) {
    throw new Error(`${sh.getName()} ขาด column: ${missing.join(', ')}`);
  }
}

/**
 * preCheck_Schema — guard ตรวจ schema ก่อนงานสำคัญ (RULE 7)
 * @returns {boolean}
 */
function preCheck_Schema() {
  try {
    validateSourceSchema();
    return true;
  } catch (e) {
    writeLog('ERROR', '02_Schema', 'preCheck_Schema', null, e.message, null);
    return false;
  }
}

// ─────────────────────────────────────────────
// PRIVATE HELPERS
// ─────────────────────────────────────────────

function _verifyHeaders(sh, expectedHeaders) {
  if (sh.getLastColumn() === 0) return false;
  const existing = sh.getRange(1, 1, 1, sh.getLastColumn()).getValues()[0];
  return expectedHeaders.every(h => existing.includes(h));
}
// ============================================================
// FILE: 03_SetupSheets.gs
// VERSION: 001
// MODULE: SetupSheets — สร้างชีตระบบครั้งแรกพร้อม format
// ============================================================

// สีหัว Header แต่ละกลุ่มชีต
const HEADER_COLORS = {
  SOURCE:      '#C73B20',  // แดง-ส้ม = Raw data (อันตราย)
  MASTER:      '#0F6E56',  // เขียวเข้ม = Master data
  ALIAS:       '#185FA5',  // น้ำเงิน = Alias / Sub
  FACT:        '#534AB7',  // ม่วง = Fact / Transaction
  REVIEW:      '#854F0B',  // น้ำตาล = Queue / Review
  SYSTEM:      '#444441',  // เทาเข้ม = System / Config
};

// ─────────────────────────────────────────────
// PUBLIC FUNCTIONS
// ─────────────────────────────────────────────

/**
 * createSystemSheets — สร้างชีตระบบทั้งหมด 11 ชีต (ไม่รวม Source)
 */
function createSystemSheets() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  const sheetConfigs = [
    { key:'M_PERSON',      color: HEADER_COLORS.MASTER },
    { key:'M_PERSON_ALIAS',color: HEADER_COLORS.ALIAS },
    { key:'M_PLACE',       color: HEADER_COLORS.MASTER },
    { key:'M_PLACE_ALIAS', color: HEADER_COLORS.ALIAS },
    { key:'M_GEO_POINT',   color: HEADER_COLORS.MASTER },
    { key:'M_DESTINATION', color: HEADER_COLORS.MASTER },
    { key:'FACT_DELIVERY', color: HEADER_COLORS.FACT },
    { key:'Q_REVIEW',      color: HEADER_COLORS.REVIEW },
    { key:'SYS_CONFIG',    color: HEADER_COLORS.SYSTEM },
    { key:'SYS_LOG',       color: HEADER_COLORS.SYSTEM },
    { key:'RPT_QUALITY',   color: HEADER_COLORS.SYSTEM }
  ];

  for (const cfg of sheetConfigs) {
    const sheetName = SHEET_NAMES[cfg.key];
    let sh = ss.getSheetByName(sheetName);

    if (!sh) {
      sh = ss.insertSheet(sheetName);
      writeLog('INFO', '03_SetupSheets', 'createSystemSheets', null,
        `สร้างชีตใหม่: ${sheetName}`, null);
    }

    const headers = SHEET_HEADERS[cfg.key];
    if (headers) {
      sh.getRange(1, 1, 1, headers.length).setValues([headers]);
      applyHeaderFormatting(sh, headers.length, cfg.color);
    }
  }

  // ป้องกันชีตต้นทาง
  setupSourceSheetProtection();
}

/**
 * applyHeaderFormatting — จัด format หัวตาราง
 * @param {Sheet} sh
 * @param {number} numCols
 * @param {string} bgColor
 */
function applyHeaderFormatting(sh, numCols, bgColor) {
  const headerRange = sh.getRange(1, 1, 1, numCols);
  headerRange
    .setBackground(bgColor)
    .setFontColor('#FFFFFF')
    .setFontWeight('bold')
    .setFontSize(10)
    .setBorder(true, true, true, true, true, true)
    .setHorizontalAlignment('center');

  // Column widths
  sh.setColumnWidth(1, 160);
  for (let c = 2; c <= numCols; c++) sh.setColumnWidth(c, 140);

  // สีแถวสลับ (banding)
  try {
    const existingBandings = sh.getBandings();
    existingBandings.forEach(b => b.remove());
    sh.getRange(1, 1, Math.max(sh.getMaxRows(), 100), numCols)
      .applyRowBanding(SpreadsheetApp.BandingTheme.LIGHT_GREY, true, false);
  } catch (e) {
    // Banding error — skip
  }
}

/**
 * freezeHeaderRows — ตรึงแถวที่ 1 ของทุกชีต
 */
function freezeHeaderRows() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  for (const sheetName of Object.values(SHEET_NAMES)) {
    const sh = ss.getSheetByName(sheetName);
    if (sh) sh.setFrozenRows(1);
  }
}

/**
 * setupSourceSheetProtection — ตั้ง Protection บนชีตต้นทาง
 * RULE 4: ป้องกันการแก้ไขข้อมูลดิบโดยไม่ตั้งใจ
 */
function setupSourceSheetProtection() {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sh = ss.getSheetByName(SHEET_NAMES.SOURCE);
    if (!sh) return;

    // ลบ protection เดิมออกก่อน
    sh.getProtections(SpreadsheetApp.ProtectionType.SHEET)
      .forEach(p => p.remove());

    // ตั้ง protection ใหม่
    const protection = sh.protect()
      .setDescription('Raw Source — แก้ไขผ่านระบบ MDM เท่านั้น')
      .setWarningOnly(true); // ให้ยังแก้ได้แต่มี warning

    writeLog('INFO', '03_SetupSheets', 'setupSourceSheetProtection', null,
      'ตั้ง Protection บนชีตต้นทางแล้ว (Warning Only Mode)', null);
  } catch (e) {
    writeLog('WARN', '03_SetupSheets', 'setupSourceSheetProtection', null,
      e.message, null);
  }
}

/**
 * seedInitialConfig — ใส่ค่า Config เริ่มต้นลงใน SYS_CONFIG
 */
function seedInitialConfig() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = ss.getSheetByName(SHEET_NAMES.SYS_CONFIG);
  if (!sh) return;

  // อ่าน key ที่มีอยู่แล้ว
  const existingData = sh.getLastRow() > 1
    ? sh.getRange(2, 1, sh.getLastRow() - 1, 1).getValues().flat()
    : [];

  const now = new Date();
  const rows = [];

  const configDefinitions = [
    ['SOURCE_SHEET_NAME',  SHEET_NAMES.SOURCE,    'SHEET',     'ชื่อชีตต้นทาง'],
    ['AUTO_MATCH_SCORE',   '90',                  'THRESHOLD', 'คะแนนขั้นต่ำสำหรับ Auto Match (%)'],
    ['REVIEW_SCORE_MIN',   '70',                  'THRESHOLD', 'คะแนนขั้นต่ำสำหรับส่ง Review (%)'],
    ['GEO_RADIUS_METER',   '50',                  'GEO',       'รัศมีสำหรับถือว่าพิกัดเดียวกัน (เมตร)'],
    ['GEO_KEY_PRECISION',  '6',                   'GEO',       'ทศนิยม Geo Key ระดับสูงสุด'],
    ['MAX_BATCH_SIZE',     '500',                 'SYSTEM',    'จำนวนแถวสูงสุดต่อ batch'],
    ['LOG_RETENTION_DAYS', '90',                  'SYSTEM',    'เก็บ Log กี่วัน'],
    ['ENABLE_FUZZY_MATCH', 'true',                'MATCH',     'เปิด/ปิด Fuzzy Matching'],
    ['FUZZY_MIN_LENGTH',   '3',                   'MATCH',     'ความยาวขั้นต่ำสำหรับ Fuzzy'],
    ['WAREHOUSE_LAT',      '14.165716',           'GEO',       'ละติจูดคลัง SCG วังน้อย'],
    ['WAREHOUSE_LONG',     '100.625296',          'GEO',       'ลองจิจูดคลัง SCG วังน้อย'],
    ['VERSION',            '001',                 'SYSTEM',    'Version ของระบบ MDM'],
  ];

  for (const [key, value, group, desc] of configDefinitions) {
    if (!existingData.includes(key)) {
      rows.push([key, value, group, desc, now]);
    }
  }

  if (rows.length > 0) {
    const startRow = sh.getLastRow() + 1;
    sh.getRange(startRow, 1, rows.length, 5).setValues(rows);
    writeLog('INFO', '03_SetupSheets', 'seedInitialConfig', null,
      `เพิ่ม config ${rows.length} รายการ`, null);
  }

  invalidateConfigCache();
}
// ============================================================
// FILE: 04_SourceRepository.gs
// VERSION: 001
// MODULE: SourceRepository — อ่านและจัดการข้อมูลจากชีตต้นทาง
// ============================================================

/**
 * getSourceRows — อ่านข้อมูลทั้งหมดจากชีตต้นทาง
 * @returns {Object[]} array of row objects
 */
function getSourceRows() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = ss.getSheetByName(SHEET_NAMES.SOURCE);
  if (!sh || sh.getLastRow() < 2) return [];

  const data = sh.getDataRange().getValues(); // RULE 6: getValues() เทเสมอ
  const result = [];
  for (let i = 1; i < data.length; i++) {
    const obj = mapRowToSourceObject(data[i], i + 1);
    if (obj && obj.source_id) result.push(obj);
  }
  return result;
}

/**
 * getUnprocessedSourceRows — อ่านเฉพาะแถวที่ SYNC_STATUS ไม่ใช่ PROCESSED
 * @returns {Object[]}
 */
function getUnprocessedSourceRows() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = ss.getSheetByName(SHEET_NAMES.SOURCE);
  if (!sh || sh.getLastRow() < 2) return [];

  const maxBatch = parseInt(getConfig('MAX_BATCH_SIZE')) || 500;
  const data = sh.getDataRange().getValues();
  const result = [];

  const SKIP_STATUSES = ['PROCESSED', 'REPROCESSED', 'ARCHIVED'];

  for (let i = 1; i < data.length; i++) {
    const syncStatus = String(data[i][C_IDX.SOURCE.SYNC_STATUS] || '').trim();
    if (SKIP_STATUSES.includes(syncStatus)) continue;

    const obj = mapRowToSourceObject(data[i], i + 1);
    if (obj && obj.source_id) {
      result.push(obj);
      if (result.length >= maxBatch) break;
    }
  }

  return result;
}

/**
 * getSourceRowByNumber — อ่านแถวเดียวตาม row number (1-based)
 * @param {number} rowNumber
 * @returns {Object|null}
 */
function getSourceRowByNumber(rowNumber) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = ss.getSheetByName(SHEET_NAMES.SOURCE);
  if (!sh || rowNumber < 2) return null;

  const numCols = sh.getLastColumn();
  const rowData = sh.getRange(rowNumber, 1, 1, numCols).getValues()[0];
  return mapRowToSourceObject(rowData, rowNumber);
}

/**
 * mapRowToSourceObject — แปลง raw array → structured object
 * RULE 3: ใช้ C_IDX เสมอ ห้าม hardcode index
 * @param {Array} row
 * @param {number} rowNumber
 * @returns {Object}
 */
function mapRowToSourceObject(row, rowNumber) {
  try {
    const idx = C_IDX.SOURCE;
    const sourceId = safeString(row[idx.ID]);
    if (!sourceId) return null;

    // แยก lat/long จาก "จุดส่งสินค้าปลายทาง" เช่น "13.631403, 100.548684"
    const geoPointStr = safeString(row[idx.GEO_POINT]);
    const [geoLat, geoLong] = _parseLatLongString(geoPointStr);

    // lat/long จากคอลัมน์ตรง
    const latDirect  = safeNumber(row[idx.LAT]);
    const longDirect = safeNumber(row[idx.LONG]);

    // ใช้ค่าตรงก่อน ถ้าไม่มีใช้ค่าจาก GEO_POINT string
    const finalLat  = latDirect  || geoLat;
    const finalLong = longDirect || geoLong;

    return {
      _rowNumber:       rowNumber,
      _sheetName:       SHEET_NAMES.SOURCE,
      source_id:        sourceId,
      delivery_date:    safeDate(row[idx.DELIVERY_DATE]),
      delivery_time:    safeString(row[idx.DELIVERY_TIME]),
      geo_point_raw:    geoPointStr,
      driver_name:      safeString(row[idx.DRIVER_NAME]),
      license_plate:    safeString(row[idx.LICENSE_PLATE]),
      shipment_no:      safeString(row[idx.SHIPMENT_NO]),
      invoice_no:       safeString(row[idx.INVOICE_NO]),
      customer_code:    safeString(row[idx.CUSTOMER_CODE]),
      owner_name:       safeString(row[idx.OWNER_NAME]),
      dest_name_raw:    safeString(row[idx.DEST_NAME]),    // ชื่อปลายทาง (ตัวปัญหา)
      employee_email:   safeString(row[idx.EMP_EMAIL]),
      lat:              finalLat,
      long:             finalLong,
      doc_return_id:    safeString(row[idx.DOC_RETURN_ID]),
      warehouse:        safeString(row[idx.WAREHOUSE]),
      address_raw:      safeString(row[idx.ADDRESS]),       // ที่อยู่มั่วๆ
      note:             safeString(row[idx.NOTE]),
      month:            safeString(row[idx.MONTH]),
      distance_km:      safeNumber(row[idx.DISTANCE_KM]),
      address_latlong:  safeString(row[idx.ADDRESS_LATLONG]), // แปลงจาก LatLong
      employee_id:      safeString(row[idx.EMP_ID]),
      gps_record_raw:   safeString(row[idx.GPS_RECORD]),
      time_start:       safeString(row[idx.TIME_START]),
      time_success:     safeString(row[idx.TIME_SUCCESS]),
      move_distance_m:  safeNumber(row[idx.MOVE_DISTANCE_M]),
      duration_min:     safeString(row[idx.DURATION_MIN]),
      speed_m_min:      safeNumber(row[idx.SPEED_M_MIN]),
      validation_result:safeString(row[idx.VALIDATION]),
      anomaly_reason:   safeString(row[idx.ANOMALY]),
      photo_time:       safeString(row[idx.PHOTO_TIME]),
      sync_status:      safeString(row[idx.SYNC_STATUS])
    };
  } catch (e) {
    writeLog('ERROR', '04_SourceRepository', 'mapRowToSourceObject', null,
      `Row ${rowNumber}: ${e.message}`, null);
    return null;
  }
}

/**
 * markSourceRowProcessed — อัปเดต SYNC_STATUS = 'PROCESSED'
 * @param {number} rowNumber
 */
function markSourceRowProcessed(rowNumber) {
  updateSourceSyncStatus(rowNumber, 'PROCESSED');
}

/**
 * updateSourceSyncStatus — อัปเดต SYNC_STATUS ในชีตต้นทาง
 * @param {number} rowNumber
 * @param {string} status
 */
function updateSourceSyncStatus(rowNumber, status) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sh = ss.getSheetByName(SHEET_NAMES.SOURCE);
    if (!sh) return;

    const syncCol = C_IDX.SOURCE.SYNC_STATUS + 1; // +1 เพราะ getRange ใช้ 1-based
    sh.getRange(rowNumber, syncCol).setValue(status);
  } catch (e) {
    writeLog('ERROR', '04_SourceRepository', 'updateSourceSyncStatus', null,
      `Row ${rowNumber}: ${e.message}`, null);
  }
}

// ─────────────────────────────────────────────
// PRIVATE HELPERS
// ─────────────────────────────────────────────

/**
 * _parseLatLongString — แยก lat, long จาก string "13.631403, 100.548684"
 * @param {string} str
 * @returns {[number, number]}
 */
function _parseLatLongString(str) {
  if (!str) return [0, 0];
  const parts = str.replace(/['"]/g, '').split(',');
  if (parts.length < 2) return [0, 0];
  const lat  = parseFloat(parts[0].trim());
  const long = parseFloat(parts[1].trim());
  return [isNaN(lat) ? 0 : lat, isNaN(long) ? 0 : long];
}
// ============================================================
// FILE: 05_NormalizeService.gs
// VERSION: 001
// MODULE: NormalizeService — ทำความสะอาดและ normalize ข้อมูล
// ============================================================

// Stop words ที่ตัดออกจากชื่อบุคคล (ภาษาไทย)
const PERSON_STOP_WORDS = [
  'คุณ','นาย','นาง','นางสาว','นส.','ดร.','อ.','ผศ.',
  'รศ.','ศ.','พ.ต.','พ.ท.','พ.อ.',
  'ช่าง','ร้าน','บ้าน','โทร','tel','โทรศัพท์'
];

// Stop words สำหรับชื่อบริษัท/นิติบุคคล
const COMPANY_STOP_WORDS = [
  'บริษัท','บจก.','จำกัด','จก.','ห้างหุ้นส่วน','หจก.',
  'ห้าง','สาขา','branch','co.,ltd','co.ltd','ltd',
  'company','limited','corp','corporation','inc'
];

// Pattern สำหรับตัดเบอร์โทรออก: "โทร.0639656564", "tel.08XXXX"
const PHONE_PATTERN = /(?:โทร\.?|tel\.?|โทรศัพท์\.?)[\s]?[\d\-\(\)\s]{8,}/gi;
const PARENTHESIS_PHONE = /\(\d{9,12}\)/g;

// ─────────────────────────────────────────────
// PUBLIC FUNCTIONS
// ─────────────────────────────────────────────

/**
 * normalizeSourceObject — normalize ข้อมูลทั้ง source object
 * @param {Object} sourceObj (จาก mapRowToSourceObject)
 * @returns {Object} sourceObj + normalized fields
 */
function normalizeSourceObject(sourceObj) {
  const norm = { ...sourceObj };

  norm.person_name_norm    = normalizePersonName(sourceObj.dest_name_raw);
  norm.place_name_norm     = normalizePlaceName(sourceObj.address_latlong || sourceObj.address_raw);
  norm.address_norm        = normalizeAddress(sourceObj.address_raw);
  norm.address_latlong_norm = normalizeAddress(sourceObj.address_latlong);
  norm.owner_name_norm     = normalizeCompanyName(sourceObj.owner_name);

  const geoNorm = normalizeLatLong(sourceObj.lat, sourceObj.long);
  norm.lat_norm  = geoNorm.lat;
  norm.long_norm = geoNorm.long;
  norm.geo_keys  = buildGeoKeys(geoNorm.lat, geoNorm.long);
  norm.fingerprint = buildFingerprint(norm);

  return norm;
}

/**
 * normalizeThaiText — ล้างข้อความภาษาไทยทั่วไป
 * - ตัด whitespace ซ้ำ, trim, lowercase, full-width → half-width
 * @param {string} text
 * @returns {string}
 */
function normalizeThaiText(text) {
  if (!text) return '';
  return String(text)
    .replace(/\uFF01-\uFF5E/g, c => String.fromCharCode(c.charCodeAt(0) - 0xFEE0)) // Full→Half width
    .replace(/\u3000/g, ' ')         // Ideographic space → normal space
    .replace(/\s+/g, ' ')            // Multiple spaces → single
    .trim()
    .toLowerCase();
}

/**
 * normalizePersonName — normalize ชื่อบุคคล/ลูกค้า
 * ตัด prefix, คำนำหน้า, เบอร์โทร, วงเล็บ
 * @param {string} name
 * @returns {string}
 */
function normalizePersonName(name) {
  if (!name) return '';

  let n = String(name);

  // ตัดเบอร์โทรและวงเล็บออก
  n = n.replace(PHONE_PATTERN, '').replace(PARENTHESIS_PHONE, '');

  // Normalize whitespace
  n = normalizeThaiText(n);

  // ตัด stop words คำนำหน้า
  for (const sw of PERSON_STOP_WORDS) {
    const re = new RegExp('^' + sw + '[\\s.]+', 'i');
    n = n.replace(re, '');
  }

  return n.trim();
}

/**
 * normalizePlaceName — normalize ชื่อสถานที่
 * @param {string} name
 * @returns {string}
 */
function normalizePlaceName(name) {
  if (!name) return '';
  let n = normalizeThaiText(String(name));

  // ตัด company stop words
  for (const sw of COMPANY_STOP_WORDS) {
    const re = new RegExp('\\b' + sw + '\\b', 'gi');
    n = n.replace(re, '');
  }

  // ตัด เลขที่/ซ./ถ./หมู่ที่ ที่อาจรบกวน canonical name
  // (เก็บไว้ใน address_norm แทน)
  n = n.replace(/\b(เลขที่|เลข)\s*[\d\/]+/g, '');

  return n.replace(/\s+/g, ' ').trim();
}

/**
 * normalizeCompanyName — normalize ชื่อบริษัทเจ้าของสินค้า
 * @param {string} name
 * @returns {string}
 */
function normalizeCompanyName(name) {
  if (!name) return '';
  let n = normalizeThaiText(String(name));
  for (const sw of COMPANY_STOP_WORDS) {
    const re = new RegExp('\\b' + sw + '\\b', 'gi');
    n = n.replace(re, '');
  }
  return n.replace(/\s+/g, ' ').trim();
}

/**
 * normalizeAddress — ทำความสะอาดที่อยู่
 * @param {string} address
 * @returns {string}
 */
function normalizeAddress(address) {
  if (!address) return '';
  let a = normalizeThaiText(String(address));

  // ตัดเบอร์โทรออก
  a = a.replace(PHONE_PATTERN, '').replace(PARENTHESIS_PHONE, '');

  // ย่อคำซ้ำ เช่น "เขตเขตตลิ่งชัน" → "เขตตลิ่งชัน"
  a = a.replace(/\b(แขวง|เขต|ตำบล|อำเภอ|จังหวัด)\s+\1/g, '$1');

  // ตัด " ประเทศไทย" suffix
  a = a.replace(/\s*ประเทศไทย\s*$/i, '');

  return a.replace(/\s+/g, ' ').trim();
}

/**
 * normalizeLatLong — ทำมาตรฐานตัวเลข lat/long (6 ทศนิยม)
 * @param {number} lat
 * @param {number} long
 * @returns {{lat: number, long: number}}
 */
function normalizeLatLong(lat, long) {
  const precision = parseInt(getConfig('GEO_KEY_PRECISION')) || 6;
  const factor = Math.pow(10, precision);
  return {
    lat:  Math.round(parseFloat(lat  || 0) * factor) / factor,
    long: Math.round(parseFloat(long || 0) * factor) / factor
  };
}

/**
 * buildGeoKeys — สร้าง geo key หลายระดับสำหรับ fuzzy geo match
 * key_6 = แม่นยำ (สูงสุด), key_5 = ±10m, key_4 = ±100m
 * @param {number} lat
 * @param {number} long
 * @returns {{key6: string, key5: string, key4: string}}
 */
function buildGeoKeys(lat, long) {
  const f6 = v => parseFloat(v).toFixed(6);
  const f5 = v => parseFloat(v).toFixed(5);
  const f4 = v => parseFloat(v).toFixed(4);

  return {
    key6: `${f6(lat)},${f6(long)}`,
    key5: `${f5(lat)},${f5(long)}`,
    key4: `${f4(lat)},${f4(long)}`
  };
}

/**
 * buildFingerprint — สร้าง fingerprint string สำหรับ dedup check
 * รวม normalized person + place + geo_key5
 * @param {Object} normObj
 * @returns {string}
 */
function buildFingerprint(normObj) {
  const parts = [
    normObj.person_name_norm || '',
    normObj.place_name_norm  || '',
    (normObj.geo_keys && normObj.geo_keys.key5) || ''
  ];
  return parts.join('|').toLowerCase();
}

/**
 * buildThaiPhoneticKey — สร้าง phonetic key สำหรับชื่อภาษาไทย
 * ใช้หลัก: ตัดสระ ตัดวรรณยุกต์ เหลือแต่พยัญชนะหลัก
 * (simplified version — ระบบจริงควร integrate Soundex Thai)
 * @param {string} text
 * @returns {string}
 */
function buildThaiPhoneticKey(text) {
  if (!text) return '';
  // ตัดสระบน สระล่าง วรรณยุกต์ ทัณฑฆาต
  return text
    .replace(/[\u0E31\u0E34-\u0E3A\u0E47-\u0E4E]/g, '') // สระ+วรรณยุกต์
    .replace(/\s+/g, '')
    .toLowerCase()
    .trim();
}
// ============================================================
// FILE: 06_PersonService.gs
// VERSION: 001
// MODULE: PersonService — จัดการ Master บุคคล (M_PERSON)
// ============================================================

/**
 * resolvePerson — หา / สร้าง person_id จากชื่อที่ normalize แล้ว
 * Entry point หลักสำหรับ MatchEngine
 * @param {Object} normObj (จาก normalizeSourceObject)
 * @returns {{person_id, score, method, is_new}}
 */
function resolvePerson(normObj) {
  try {
    const personName = normObj.person_name_norm;
    if (!personName || personName.length < 2) {
      return { person_id: null, score: 0, method: 'SKIP', is_new: false };
    }

    // 1. ตรวจ Alias ก่อน (exact match)
    const aliasMatch = _findPersonByAlias(personName);
    if (aliasMatch) {
      return { person_id: aliasMatch, score: 100, method: 'ALIAS_EXACT', is_new: false };
    }

    // 2. ตรวจ Canonical name (exact)
    const exactMatch = _findPersonByCanonical(personName);
    if (exactMatch) {
      return { person_id: exactMatch, score: 100, method: 'CANONICAL_EXACT', is_new: false };
    }

    // 3. Fuzzy match ถ้าเปิดใช้งาน
    if (getConfig('ENABLE_FUZZY_MATCH') === 'true') {
      const candidates = findPersonCandidates(personName);
      if (candidates.length > 0) {
        const best = candidates[0];
        if (best.score >= parseFloat(getConfig('AUTO_MATCH_SCORE') || '90')) {
          // Auto-match: เพิ่ม alias
          createPersonAlias(best.person_id, normObj.dest_name_raw, personName);
          return { person_id: best.person_id, score: best.score, method: 'FUZZY_AUTO', is_new: false };
        }
        if (best.score >= parseFloat(getConfig('REVIEW_SCORE_MIN') || '70')) {
          return { person_id: null, score: best.score, method: 'FUZZY_REVIEW',
            is_new: false, candidates };
        }
      }
    }

    // 4. สร้างใหม่
    const newId = createPerson(normObj.dest_name_raw, personName);
    createPersonAlias(newId, normObj.dest_name_raw, personName);
    return { person_id: newId, score: 0, method: 'NEW', is_new: true };

  } catch (e) {
    writeLog('ERROR', '06_PersonService', 'resolvePerson', null, e.message,
      JSON.stringify({ name: normObj.dest_name_raw }));
    return { person_id: null, score: 0, method: 'ERROR', is_new: false };
  }
}

/**
 * findPersonCandidates — หา candidates จาก M_PERSON + M_PERSON_ALIAS
 * @param {string} normalizedName
 * @returns {Array<{person_id, name, score}>} เรียงจากคะแนนสูงสุด
 */
function findPersonCandidates(normalizedName) {
  const persons = _getAllPersons();
  const aliases  = _getAllPersonAliases();
  const phoneticKey = buildThaiPhoneticKey(normalizedName);

  const scores = {};

  // คะแนนจาก canonical
  for (const p of persons) {
    const s = scorePersonCandidate(normalizedName, phoneticKey, p.norm, p.person_id);
    if (s > 0) {
      scores[p.person_id] = Math.max(scores[p.person_id] || 0, s);
    }
  }

  // คะแนนจาก alias
  for (const a of aliases) {
    if (!a.active) continue;
    const s = scorePersonCandidate(normalizedName, phoneticKey, a.norm, a.person_id);
    if (s > 0) {
      scores[a.person_id] = Math.max(scores[a.person_id] || 0, s);
    }
  }

  // แปลงเป็น array เรียงคะแนน
  const personMap = {};
  persons.forEach(p => { personMap[p.person_id] = p.canonical; });

  return Object.entries(scores)
    .map(([pid, score]) => ({ person_id: pid, name: personMap[pid] || '', score }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 5); // คืน top 5
}

/**
 * scorePersonCandidate — ให้คะแนนการจับคู่ชื่อ (0-100)
 * @param {string} inputNorm - ชื่อที่กำลังค้น (normalized)
 * @param {string} inputPhonetic - phonetic key ของ input
 * @param {string} candidateNorm - ชื่อใน master (normalized)
 * @param {string} candidateId
 * @returns {number} คะแนน 0-100
 */
function scorePersonCandidate(inputNorm, inputPhonetic, candidateNorm, candidateId) {
  if (!inputNorm || !candidateNorm) return 0;
  if (inputNorm === candidateNorm) return 100; // exact match

  // ความยาวขั้นต่ำ
  const minLen = parseInt(getConfig('FUZZY_MIN_LENGTH')) || 3;
  if (inputNorm.length < minLen || candidateNorm.length < minLen) return 0;

  let score = 0;

  // 1. Levenshtein similarity (น้ำหนัก 50%)
  const maxLen = Math.max(inputNorm.length, candidateNorm.length);
  const lev = _levenshtein(inputNorm, candidateNorm);
  const levScore = Math.max(0, (1 - lev / maxLen)) * 50;
  score += levScore;

  // 2. Phonetic match (น้ำหนัก 30%)
  const candidatePhonetic = buildThaiPhoneticKey(candidateNorm);
  if (inputPhonetic && candidatePhonetic && inputPhonetic === candidatePhonetic) {
    score += 30;
  } else if (inputPhonetic && candidatePhonetic) {
    const pLev = _levenshtein(inputPhonetic, candidatePhonetic);
    const pMax = Math.max(inputPhonetic.length, candidatePhonetic.length);
    score += Math.max(0, (1 - pLev / pMax)) * 20;
  }

  // 3. Prefix/Suffix match (น้ำหนัก 20%)
  if (inputNorm.startsWith(candidateNorm) || candidateNorm.startsWith(inputNorm)) score += 20;
  else if (inputNorm.includes(candidateNorm) || candidateNorm.includes(inputNorm)) score += 10;

  return Math.min(100, Math.round(score));
}

/**
 * createPerson — สร้าง M_PERSON record ใหม่
 * @param {string} canonicalName
 * @param {string} normalizedName
 * @returns {string} person_id ใหม่
 */
function createPerson(canonicalName, normalizedName) {
  return withLock(() => {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sh = ss.getSheetByName(SHEET_NAMES.M_PERSON);
    const newId = _generateId('PER');
    const now = new Date();
    sh.appendRow([
      newId,
      canonicalName,
      normalizedName,
      now,   // first_seen_date
      now,   // last_seen_date
      1,     // usage_count
      'ACTIVE',
      ''
    ]);
    _clearPersonCache();
    return newId;
  });
}

/**
 * createPersonAlias — เพิ่ม Alias ให้ M_PERSON (ป้องกัน duplicate)
 * @param {string} personId
 * @param {string} aliasRaw
 * @param {string} aliasNormalized
 */
function createPersonAlias(personId, aliasRaw, aliasNormalized) {
  return withLock(() => {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sh = ss.getSheetByName(SHEET_NAMES.M_PERSON_ALIAS);

    // ตรวจซ้ำก่อน
    if (sh.getLastRow() > 1) {
      const data = sh.getDataRange().getValues();
      for (let i = 1; i < data.length; i++) {
        if (data[i][1] === personId && data[i][3] === aliasNormalized) return; // ซ้ำ
      }
    }

    const now = new Date();
    sh.appendRow([
      _generateId('PAL'),
      personId,
      aliasRaw,
      aliasNormalized,
      'dest_name_raw',
      now,
      now,
      1,
      1
    ]);
    _clearPersonCache();
  });
}

/**
 * updatePersonStats — อัปเดต last_seen + usage_count
 * @param {string} personId
 */
function updatePersonStats(personId) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sh = ss.getSheetByName(SHEET_NAMES.M_PERSON);
    if (!sh || sh.getLastRow() < 2) return;

    const data = sh.getDataRange().getValues();
    for (let i = 1; i < data.length; i++) {
      if (data[i][0] === personId) {
        const usageCol = 6, lastSeenCol = 5;
        sh.getRange(i + 1, usageCol).setValue((data[i][usageCol - 1] || 0) + 1);
        sh.getRange(i + 1, lastSeenCol).setValue(new Date());
        return;
      }
    }
  } catch (e) {
    writeLog('WARN', '06_PersonService', 'updatePersonStats', null, e.message, null);
  }
}

// ─────────────────────────────────────────────
// PRIVATE HELPERS
// ─────────────────────────────────────────────

function _getAllPersons() {
  const cache = CacheService.getScriptCache();
  const cached = cache.get('ALL_PERSONS');
  if (cached) return JSON.parse(cached);

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = ss.getSheetByName(SHEET_NAMES.M_PERSON);
  if (!sh || sh.getLastRow() < 2) return [];

  const data = sh.getDataRange().getValues();
  const result = [];
  for (let i = 1; i < data.length; i++) {
    if (data[i][6] !== 'ARCHIVED') { // skip archived
      result.push({ person_id: data[i][0], canonical: data[i][1], norm: data[i][2] });
    }
  }
  cache.put('ALL_PERSONS', JSON.stringify(result), 21600);
  return result;
}

function _getAllPersonAliases() {
  const cache = CacheService.getScriptCache();
  const cached = cache.get('ALL_PERSON_ALIASES');
  if (cached) return JSON.parse(cached);

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = ss.getSheetByName(SHEET_NAMES.M_PERSON_ALIAS);
  if (!sh || sh.getLastRow() < 2) return [];

  const data = sh.getDataRange().getValues();
  const result = [];
  for (let i = 1; i < data.length; i++) {
    result.push({
      alias_id: data[i][0], person_id: data[i][1],
      raw: data[i][2], norm: data[i][3],
      active: data[i][8] === 1 || data[i][8] === true
    });
  }
  cache.put('ALL_PERSON_ALIASES', JSON.stringify(result), 21600);
  return result;
}

function _findPersonByAlias(normalizedName) {
  const aliases = _getAllPersonAliases();
  const match = aliases.find(a => a.active && a.norm === normalizedName);
  return match ? match.person_id : null;
}

function _findPersonByCanonical(normalizedName) {
  const persons = _getAllPersons();
  const match = persons.find(p => p.norm === normalizedName);
  return match ? match.person_id : null;
}

function _clearPersonCache() {
  CacheService.getScriptCache().removeAll(['ALL_PERSONS', 'ALL_PERSON_ALIASES']);
}

/**
 * _levenshtein — คำนวณ Levenshtein Distance
 * @param {string} a
 * @param {string} b
 * @returns {number}
 */
function _levenshtein(a, b) {
  const m = a.length, n = b.length;
  const dp = Array.from({ length: m + 1 }, (_, i) =>
    Array.from({ length: n + 1 }, (_, j) => i === 0 ? j : j === 0 ? i : 0)
  );
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = a[i - 1] === b[j - 1]
        ? dp[i - 1][j - 1]
        : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }
  return dp[m][n];
}

function _generateId(prefix) {
  const ts = new Date().getTime().toString(36).toUpperCase();
  const rand = Math.random().toString(36).substr(2, 4).toUpperCase();
  return `${prefix}-${ts}${rand}`;
}
// ============================================================
// FILE: 07_PlaceService.gs
// VERSION: 001
// MODULE: PlaceService — จัดการ Master สถานที่ (M_PLACE)
// ============================================================

/**
 * resolvePlace — หา / สร้าง place_id
 * @param {Object} normObj
 * @returns {{place_id, score, method, is_new}}
 */
function resolvePlace(normObj) {
  try {
    const placeName = normObj.place_name_norm;
    const addrNorm  = normObj.address_norm || normObj.address_latlong_norm;

    if (!placeName && !addrNorm) {
      return { place_id: null, score: 0, method: 'SKIP', is_new: false };
    }

    // 1. Alias exact
    const aliasMatch = _findPlaceByAlias(placeName);
    if (aliasMatch) {
      return { place_id: aliasMatch, score: 100, method: 'ALIAS_EXACT', is_new: false };
    }

    // 2. Canonical exact
    const exactMatch = _findPlaceByCanonical(placeName);
    if (exactMatch) {
      return { place_id: exactMatch, score: 100, method: 'CANONICAL_EXACT', is_new: false };
    }

    // 3. Fuzzy match
    if (getConfig('ENABLE_FUZZY_MATCH') === 'true') {
      const candidates = findPlaceCandidates(placeName, addrNorm);
      if (candidates.length > 0) {
        const best = candidates[0];
        if (best.score >= parseFloat(getConfig('AUTO_MATCH_SCORE') || '90')) {
          createPlaceAlias(best.place_id, normObj.address_raw, placeName);
          return { place_id: best.place_id, score: best.score, method: 'FUZZY_AUTO', is_new: false };
        }
        if (best.score >= parseFloat(getConfig('REVIEW_SCORE_MIN') || '70')) {
          return { place_id: null, score: best.score, method: 'FUZZY_REVIEW',
            is_new: false, candidates };
        }
      }
    }

    // 4. สร้างใหม่
    const addrBest = normObj.address_latlong || normObj.address_raw;
    const newId = createPlace(placeName || addrBest, addrBest);
    if (placeName) createPlaceAlias(newId, normObj.address_raw, placeName);
    return { place_id: newId, score: 0, method: 'NEW', is_new: true };

  } catch (e) {
    writeLog('ERROR', '07_PlaceService', 'resolvePlace', null, e.message, null);
    return { place_id: null, score: 0, method: 'ERROR', is_new: false };
  }
}

function findPlaceCandidates(normalizedPlace, normalizedAddress) {
  const places  = _getAllPlaces();
  const aliases = _getAllPlaceAliases();
  const scores  = {};

  for (const p of places) {
    const s = scorePlaceCandidate(normalizedPlace, normalizedAddress, p.norm, p.addrNorm);
    if (s > 0) scores[p.place_id] = Math.max(scores[p.place_id] || 0, s);
  }
  for (const a of aliases) {
    if (!a.active) continue;
    const s = scorePlaceCandidate(normalizedPlace, normalizedAddress, a.norm, '');
    if (s > 0) scores[a.place_id] = Math.max(scores[a.place_id] || 0, s);
  }

  const placeMap = {};
  places.forEach(p => { placeMap[p.place_id] = p.canonical; });

  return Object.entries(scores)
    .map(([pid, score]) => ({ place_id: pid, name: placeMap[pid] || '', score }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);
}

function scorePlaceCandidate(inputPlace, inputAddr, candidateNorm, candidateAddr) {
  let score = 0;
  if (!inputPlace && !inputAddr) return 0;

  if (inputPlace && candidateNorm) {
    if (inputPlace === candidateNorm) return 100;
    const lev = _levenshtein(inputPlace, candidateNorm);
    const maxLen = Math.max(inputPlace.length, candidateNorm.length);
    score += Math.max(0, (1 - lev / maxLen)) * 60;
    if (inputPlace.includes(candidateNorm) || candidateNorm.includes(inputPlace)) score += 10;
  }

  if (inputAddr && candidateAddr && inputAddr.length > 5 && candidateAddr.length > 5) {
    const lev = _levenshtein(inputAddr.slice(0, 40), candidateAddr.slice(0, 40));
    const maxLen = Math.max(inputAddr.length, candidateAddr.length, 1);
    score += Math.max(0, (1 - lev / maxLen)) * 40;
  }

  return Math.min(100, Math.round(score));
}

function createPlace(canonicalName, addressBest) {
  return withLock(() => {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sh = ss.getSheetByName(SHEET_NAMES.M_PLACE);
    const newId = _generatePlaceId();
    const now = new Date();
    sh.appendRow([
      newId, canonicalName, normalizeThaiText(canonicalName),
      addressBest, normalizeAddress(addressBest), '',
      now, now, 1, 'ACTIVE', ''
    ]);
    _clearPlaceCache();
    return newId;
  });
}

function createPlaceAlias(placeId, aliasRaw, aliasNormalized) {
  return withLock(() => {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sh = ss.getSheetByName(SHEET_NAMES.M_PLACE_ALIAS);
    if (sh.getLastRow() > 1) {
      const data = sh.getDataRange().getValues();
      for (let i = 1; i < data.length; i++) {
        if (data[i][1] === placeId && data[i][3] === aliasNormalized) return;
      }
    }
    const now = new Date();
    sh.appendRow([_generatePlaceAliasId(), placeId, aliasRaw, aliasNormalized,
      'address_raw', now, now, 1, 1]);
    _clearPlaceCache();
  });
}

function updatePlaceStats(placeId) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sh = ss.getSheetByName(SHEET_NAMES.M_PLACE);
    if (!sh || sh.getLastRow() < 2) return;
    const data = sh.getDataRange().getValues();
    for (let i = 1; i < data.length; i++) {
      if (data[i][0] === placeId) {
        sh.getRange(i + 1, 9).setValue((data[i][8] || 0) + 1);
        sh.getRange(i + 1, 8).setValue(new Date());
        return;
      }
    }
  } catch (e) {
    writeLog('WARN', '07_PlaceService', 'updatePlaceStats', null, e.message, null);
  }
}

function _getAllPlaces() {
  const cache = CacheService.getScriptCache();
  const cached = cache.get('ALL_PLACES');
  if (cached) return JSON.parse(cached);
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = ss.getSheetByName(SHEET_NAMES.M_PLACE);
  if (!sh || sh.getLastRow() < 2) return [];
  const data = sh.getDataRange().getValues();
  const result = [];
  for (let i = 1; i < data.length; i++) {
    if (data[i][9] !== 'ARCHIVED') {
      result.push({ place_id: data[i][0], canonical: data[i][1],
        norm: data[i][2], addrNorm: data[i][4] });
    }
  }
  cache.put('ALL_PLACES', JSON.stringify(result), 21600);
  return result;
}

function _getAllPlaceAliases() {
  const cache = CacheService.getScriptCache();
  const cached = cache.get('ALL_PLACE_ALIASES');
  if (cached) return JSON.parse(cached);
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = ss.getSheetByName(SHEET_NAMES.M_PLACE_ALIAS);
  if (!sh || sh.getLastRow() < 2) return [];
  const data = sh.getDataRange().getValues();
  const result = [];
  for (let i = 1; i < data.length; i++) {
    result.push({ alias_id: data[i][0], place_id: data[i][1],
      norm: data[i][3], active: data[i][8] === 1 || data[i][8] === true });
  }
  cache.put('ALL_PLACE_ALIASES', JSON.stringify(result), 21600);
  return result;
}

function _findPlaceByAlias(norm) {
  const aliases = _getAllPlaceAliases();
  const m = aliases.find(a => a.active && a.norm === norm);
  return m ? m.place_id : null;
}

function _findPlaceByCanonical(norm) {
  const places = _getAllPlaces();
  const m = places.find(p => p.norm === norm);
  return m ? m.place_id : null;
}

function _clearPlaceCache() {
  CacheService.getScriptCache().removeAll(['ALL_PLACES', 'ALL_PLACE_ALIASES']);
}

function _generatePlaceId() {
  return 'PLA-' + new Date().getTime().toString(36).toUpperCase() +
    Math.random().toString(36).substr(2, 4).toUpperCase();
}

function _generatePlaceAliasId() {
  return 'PLAL-' + new Date().getTime().toString(36).toUpperCase() +
    Math.random().toString(36).substr(2, 3).toUpperCase();
}
// ============================================================
// FILE: 08_GeoService.gs
// VERSION: 001
// MODULE: GeoService — จัดการพิกัด GPS (M_GEO_POINT)
// ============================================================

// Haversine Earth radius (km)
const EARTH_RADIUS_KM = 6371;

/**
 * resolveGeo — หา / สร้าง geo_id จากพิกัด lat/long
 * @param {Object} normObj
 * @returns {{geo_id, score, method, is_new}}
 */
function resolveGeo(normObj) {
  try {
    const lat  = normObj.lat_norm;
    const long = normObj.long_norm;

    if (!lat || !long || lat === 0 || long === 0) {
      return { geo_id: null, score: 0, method: 'SKIP', is_new: false };
    }

    const geoKeys = normObj.geo_keys || buildGeoKeys(lat, long);
    const radius  = parseFloat(getConfig('GEO_RADIUS_METER')) || 50;

    // 1. Exact match (key_6)
    const exactMatch = _findGeoByKey6(geoKeys.key6);
    if (exactMatch) {
      return { geo_id: exactMatch, score: 100, method: 'EXACT', is_new: false };
    }

    // 2. Near match (key_5 = ±~11m)
    const nearMatch5 = _findGeoByKey5(geoKeys.key5);
    if (nearMatch5) {
      return { geo_id: nearMatch5, score: 95, method: 'NEAR_KEY5', is_new: false };
    }

    // 3. Cluster match — ตรวจจากรัศมีจริง (Haversine)
    const candidates = findGeoCandidates(lat, long);
    if (candidates.length > 0) {
      const best = candidates[0];
      if (best.dist_m <= radius) {
        return { geo_id: best.geo_id, score: 90, method: 'RADIUS_MATCH', is_new: false };
      }
    }

    // 4. สร้างใหม่
    const addrFromLL = normObj.address_latlong || '';
    const newId = createGeoPoint(lat, long, geoKeys, addrFromLL);
    return { geo_id: newId, score: 0, method: 'NEW', is_new: true };

  } catch (e) {
    writeLog('ERROR', '08_GeoService', 'resolveGeo', null, e.message,
      JSON.stringify({ lat: normObj.lat, long: normObj.long }));
    return { geo_id: null, score: 0, method: 'ERROR', is_new: false };
  }
}

/**
 * findGeoCandidates — หา geo points ในรัศมี 200m
 * @param {number} lat
 * @param {number} long
 * @returns {Array<{geo_id, lat, long, dist_m}>} เรียงจากใกล้สุด
 */
function findGeoCandidates(lat, long) {
  const allGeo = _getAllGeoPoints();
  const results = [];

  // Pre-filter: ±0.01° ≈ ±1km — ลด loop
  const LAT_RANGE  = 0.01;
  const LONG_RANGE = 0.01;

  for (const g of allGeo) {
    if (Math.abs(g.lat - lat) > LAT_RANGE) continue;
    if (Math.abs(g.long - long) > LONG_RANGE) continue;

    const dist_m = calcDistanceMeters(lat, long, g.lat, g.long);
    if (dist_m <= 200) { // ค้นในรัศมี 200m
      results.push({ geo_id: g.geo_id, lat: g.lat, long: g.long, dist_m });
    }
  }

  return results.sort((a, b) => a.dist_m - b.dist_m).slice(0, 5);
}

/**
 * createGeoPoint — สร้าง M_GEO_POINT record ใหม่
 * @param {number} lat
 * @param {number} long
 * @param {Object} geoKeys
 * @param {string} addressFromLatLong
 * @returns {string} geo_id
 */
function createGeoPoint(lat, long, geoKeys, addressFromLatLong) {
  return withLock(() => {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sh = ss.getSheetByName(SHEET_NAMES.M_GEO_POINT);
    const newId = _generateGeoId();
    const now = new Date();
    sh.appendRow([
      newId,
      lat, long,           // lat_raw, long_raw
      lat, long,           // lat_norm, long_norm
      geoKeys.key6,
      geoKeys.key5,
      geoKeys.key4,
      addressFromLatLong,  // address_from_latlong_best
      now,                 // first_seen_date
      now,                 // last_seen_date
      1,                   // usage_count
      ''                   // note
    ]);
    _clearGeoCache();
    return newId;
  });
}

/**
 * calcDistanceMeters — Haversine Formula
 * @param {number} lat1
 * @param {number} lon1
 * @param {number} lat2
 * @param {number} lon2
 * @returns {number} ระยะทาง (เมตร)
 */
function calcDistanceMeters(lat1, lon1, lat2, lon2) {
  const toRad = x => x * Math.PI / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return EARTH_RADIUS_KM * 1000 * 2 * Math.asin(Math.sqrt(a));
}

/**
 * buildGeoKey — สร้าง key ระดับ precision ที่กำหนด
 * @param {number} lat
 * @param {number} long
 * @param {number} precision
 * @returns {string}
 */
function buildGeoKey(lat, long, precision) {
  return `${parseFloat(lat).toFixed(precision)},${parseFloat(long).toFixed(precision)}`;
}

/**
 * clusterNearbyGeo — หา geo points ทั้งหมดที่อยู่ในรัศมีที่กำหนด
 * ใช้สำหรับ Maintenance — ตรวจจับจุดที่อาจ merge ได้
 * @param {number} lat
 * @param {number} long
 * @param {number} radiusMeters
 * @returns {Array}
 */
function clusterNearbyGeo(lat, long, radiusMeters) {
  const allGeo = _getAllGeoPoints();
  return allGeo.filter(g => calcDistanceMeters(lat, long, g.lat, g.long) <= radiusMeters);
}

// ─────────────────────────────────────────────
// PRIVATE HELPERS
// ─────────────────────────────────────────────

function _getAllGeoPoints() {
  const cache = CacheService.getScriptCache();
  const cached = cache.get('ALL_GEO');
  if (cached) return JSON.parse(cached);

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = ss.getSheetByName(SHEET_NAMES.M_GEO_POINT);
  if (!sh || sh.getLastRow() < 2) return [];

  const data = sh.getDataRange().getValues();
  const result = [];
  for (let i = 1; i < data.length; i++) {
    result.push({
      geo_id: data[i][0],
      lat:    parseFloat(data[i][3]),  // lat_norm
      long:   parseFloat(data[i][4]),  // long_norm
      key6:   data[i][5],
      key5:   data[i][6],
      key4:   data[i][7]
    });
  }
  cache.put('ALL_GEO', JSON.stringify(result), 21600);
  return result;
}

function _findGeoByKey6(key6) {
  const all = _getAllGeoPoints();
  const m = all.find(g => g.key6 === key6);
  return m ? m.geo_id : null;
}

function _findGeoByKey5(key5) {
  const all = _getAllGeoPoints();
  const m = all.find(g => g.key5 === key5);
  return m ? m.geo_id : null;
}

function _clearGeoCache() {
  CacheService.getScriptCache().remove('ALL_GEO');
}

function _generateGeoId() {
  return 'GEO-' + new Date().getTime().toString(36).toUpperCase() +
    Math.random().toString(36).substr(2, 4).toUpperCase();
}
// ============================================================
// FILE: 09_DestinationService.gs
// VERSION: 001
// MODULE: DestinationService — จัดการปลายทางจริง (M_DESTINATION)
// ============================================================

/**
 * resolveDestination — หา / สร้าง destination_id
 * จาก person_id + place_id + geo_id
 * @param {string} personId
 * @param {string} placeId
 * @param {string} geoId
 * @param {Object} normObj
 * @returns {{destination_id, is_new}}
 */
function resolveDestination(personId, placeId, geoId, normObj) {
  try {
    if (!personId && !placeId && !geoId) {
      return { destination_id: null, is_new: false };
    }

    const key = buildDestinationKey(personId, placeId, geoId);

    // ค้นหา destination เดิม
    const existing = findDestinationCandidates(personId, placeId, geoId);
    if (existing.length > 0) {
      updateDestinationStats(existing[0].destination_id);
      return { destination_id: existing[0].destination_id, is_new: false };
    }

    // สร้างใหม่
    const label = _buildDestinationLabel(normObj);
    const newId = createDestination(personId, placeId, geoId, label, key);
    return { destination_id: newId, is_new: true };

  } catch (e) {
    writeLog('ERROR', '09_DestinationService', 'resolveDestination', null, e.message, null);
    return { destination_id: null, is_new: false };
  }
}

/**
 * buildDestinationKey — สร้าง key จาก 3 master IDs
 * @param {string} personId
 * @param {string} placeId
 * @param {string} geoId
 * @returns {string}
 */
function buildDestinationKey(personId, placeId, geoId) {
  return `${personId || 'NOPERSON'}|${placeId || 'NOPLACE'}|${geoId || 'NOGEO'}`;
}

/**
 * findDestinationCandidates — หา destination จาก combination ของ IDs
 * @param {string} personId
 * @param {string} placeId
 * @param {string} geoId
 * @returns {Array<{destination_id, key}>}
 */
function findDestinationCandidates(personId, placeId, geoId) {
  const all = _getAllDestinations();
  const key = buildDestinationKey(personId, placeId, geoId);
  return all.filter(d => d.key === key);
}

/**
 * createDestination — สร้าง M_DESTINATION record
 * @param {string} personId
 * @param {string} placeId
 * @param {string} geoId
 * @param {string} label
 * @param {string} key
 * @returns {string} destination_id
 */
function createDestination(personId, placeId, geoId, label, key) {
  return withLock(() => {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sh = ss.getSheetByName(SHEET_NAMES.M_DESTINATION);
    const newId = _generateDestId();
    const now = new Date();
    sh.appendRow([
      newId, personId, placeId, geoId,
      label, key, 'CONFIRMED',
      now, now, 1, ''
    ]);
    _clearDestCache();
    return newId;
  });
}

/**
 * updateDestinationStats — อัปเดต usage_count, last_seen_date
 * @param {string} destinationId
 */
function updateDestinationStats(destinationId) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sh = ss.getSheetByName(SHEET_NAMES.M_DESTINATION);
    if (!sh || sh.getLastRow() < 2) return;
    const data = sh.getDataRange().getValues();
    for (let i = 1; i < data.length; i++) {
      if (data[i][0] === destinationId) {
        sh.getRange(i + 1, 10).setValue((data[i][9] || 0) + 1); // usage_count
        sh.getRange(i + 1, 9).setValue(new Date());               // last_seen_date
        return;
      }
    }
  } catch (e) {
    writeLog('WARN', '09_DestinationService', 'updateDestinationStats', null, e.message, null);
  }
}

function _getAllDestinations() {
  const cache = CacheService.getScriptCache();
  const cached = cache.get('ALL_DESTS');
  if (cached) return JSON.parse(cached);
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = ss.getSheetByName(SHEET_NAMES.M_DESTINATION);
  if (!sh || sh.getLastRow() < 2) return [];
  const data = sh.getDataRange().getValues();
  const result = [];
  for (let i = 1; i < data.length; i++) {
    result.push({ destination_id: data[i][0], person_id: data[i][1],
      place_id: data[i][2], geo_id: data[i][3], key: data[i][5] });
  }
  cache.put('ALL_DESTS', JSON.stringify(result), 21600);
  return result;
}

function _clearDestCache() { CacheService.getScriptCache().remove('ALL_DESTS'); }

function _buildDestinationLabel(normObj) {
  const parts = [];
  if (normObj.person_name_norm) parts.push(normObj.person_name_norm);
  if (normObj.place_name_norm)  parts.push(normObj.place_name_norm);
  if (normObj.lat_norm && normObj.long_norm)
    parts.push(`(${normObj.lat_norm},${normObj.long_norm})`);
  return parts.join(' | ');
}

function _generateDestId() {
  return 'DST-' + new Date().getTime().toString(36).toUpperCase() +
    Math.random().toString(36).substr(2, 4).toUpperCase();
}


// ============================================================
// FILE: 10_MatchEngine.gs
// VERSION: 001
// MODULE: MatchEngine — ตัวตัดสินกลางของระบบ
// ============================================================

/**
 * matchAllEntities — จุดประสาน Person + Place + Geo + Destination
 * Entry point จาก runDailyProcess
 * @param {Object} normObj (จาก normalizeSourceObject)
 * @returns {{personResult, placeResult, geoResult, destResult, compositeScore, decision}}
 */
function matchAllEntities(normObj) {
  // ─── 1. แต่ละ entity ─────────────────────────
  const personResult = resolvePerson(normObj);
  const placeResult  = resolvePlace(normObj);
  const geoResult    = resolveGeo(normObj);

  // ─── 2. Destination ────────────────────────
  let destResult = { destination_id: null, is_new: false };
  if (personResult.person_id || placeResult.place_id || geoResult.geo_id) {
    destResult = resolveDestination(
      personResult.person_id, placeResult.place_id, geoResult.geo_id, normObj
    );
  }

  // ─── 3. คะแนนรวม ───────────────────────────
  const compositeScore = calculateCompositeScore({
    personResult, placeResult, geoResult
  });

  // ─── 4. ตัดสินใจ ───────────────────────────
  const decision = decideAutoMatchOrReview(compositeScore, {
    personResult, placeResult, geoResult, destResult, normObj
  });

  // ─── 5. ตรวจ Conflict types ────────────────
  const conflictTypes = detectConflictType({ personResult, placeResult, geoResult, normObj });

  return {
    personResult, placeResult, geoResult, destResult,
    compositeScore, decision, conflictTypes, normObj
  };
}

/**
 * calculateCompositeScore — คะแนนรวมจาก 3 entity (0-100)
 * น้ำหนัก: Person 40%, Place 35%, Geo 25%
 * @param {{personResult, placeResult, geoResult}}
 * @returns {number}
 */
function calculateCompositeScore({ personResult, placeResult, geoResult }) {
  const pScore = (personResult.score || 0) * 0.40;
  const lScore = (placeResult.score  || 0) * 0.35;
  const gScore = (geoResult.score    || 0) * 0.25;
  return Math.round(pScore + lScore + gScore);
}

/**
 * decideAutoMatchOrReview — ตัดสินว่าเป็น AUTO_MATCH / REVIEW / NEW
 * @param {number} compositeScore
 * @param {Object} context
 * @returns {string}
 */
function decideAutoMatchOrReview(compositeScore, context) {
  const thresholds = getThresholds();
  const { personResult, placeResult, geoResult } = context;

  // ถ้าทุก entity เป็น NEW — เพิ่มใหม่โดยตรง
  const allNew = personResult.is_new && placeResult.is_new && geoResult.is_new;
  if (allNew) return 'NEW';

  // REVIEW methods จาก entity ใดก็ตาม
  const needsReview = [personResult, placeResult, geoResult]
    .some(r => r.method === 'FUZZY_REVIEW' || r.method === 'ERROR');
  if (needsReview) return 'REVIEW';

  if (compositeScore >= thresholds.autoMatch) return 'AUTO_MATCH';
  if (compositeScore >= thresholds.reviewMin)  return 'REVIEW';

  return 'NEW';
}

/**
 * detectConflictType — ตรวจหาประเภทปัญหาข้อมูล (ปัญหา 8 ข้อ)
 * @param {{personResult, placeResult, geoResult, normObj}}
 * @returns {string[]} รายการ conflict types ที่พบ
 */
function detectConflictType({ personResult, placeResult, geoResult, normObj }) {
  const types = [];

  // ปัญหา 4: บุคคลเดียวกันแต่ชื่อต่างกัน (Fuzzy match สำเร็จ)
  if (personResult.method === 'FUZZY_AUTO' || personResult.method === 'ALIAS_EXACT') {
    types.push('SAME_PERSON_DIFF_NAME');
  }

  // ปัญหา 7: คนเดียวกัน แต่ Geo ต่าง (person match แต่ geo ใหม่)
  if (personResult.person_id && !personResult.is_new && geoResult.is_new) {
    types.push('SAME_PERSON_DIFF_GEO');
  }

  // ปัญหา 6: คนเดียวกัน แต่ Place ต่าง
  if (personResult.person_id && !personResult.is_new && placeResult.is_new) {
    types.push('SAME_PERSON_DIFF_PLACE');
  }

  // ปัญหา 8: Geo เดียวกัน แต่คนต่าง (geo match แต่ person ใหม่)
  if (geoResult.geo_id && !geoResult.is_new && personResult.is_new) {
    types.push('SAME_GEO_DIFF_PERSON');
  }

  // ปัญหา 5: Place เดียวกัน แต่คนต่าง
  if (placeResult.place_id && !placeResult.is_new && personResult.is_new) {
    types.push('SAME_PLACE_DIFF_PERSON');
  }

  return types;
}

/**
 * buildReviewPayload — สร้าง payload สำหรับ Q_REVIEW
 * @param {Object} resolvedObj (จาก matchAllEntities)
 * @returns {Object}
 */
function buildReviewPayload(resolvedObj) {
  const { personResult, placeResult, geoResult, destResult, compositeScore,
    conflictTypes, normObj } = resolvedObj;

  const issueType = conflictTypes.length > 0 ? conflictTypes[0] : 'UNCERTAIN_MATCH';

  return {
    issue_type:              issueType,
    source_record_id:        normObj.source_id,
    source_row_number:       normObj._rowNumber,
    invoice_no:              normObj.invoice_no,
    raw_person_name:         normObj.dest_name_raw,
    raw_place_name:          normObj.address_raw,
    raw_lat:                 normObj.lat,
    raw_long:                normObj.long,
    candidate_person_ids:    personResult.candidates
      ? personResult.candidates.map(c => `${c.person_id}(${c.score}%)`).join(',') : '',
    candidate_place_ids:     placeResult.candidates
      ? placeResult.candidates.map(c => `${c.place_id}(${c.score}%)`).join(',') : '',
    candidate_geo_ids:       geoResult.candidates
      ? geoResult.candidates.map(c => `${c.geo_id}(${c.dist_m}m)`).join(',') : '',
    candidate_destination_ids: destResult.destination_id || '',
    score:                   compositeScore,
    recommended_action:      compositeScore >= 70 ? 'VERIFY_AND_MERGE' : 'MANUAL_REVIEW',
    status:                  'PENDING'
  };
}
// ============================================================
// FILE: 10_MatchEngine.gs  (VERSION 002 — Enhanced 8-Problem System)
// VERSION: 002
// MODULE: MatchEngine — ตัวตัดสินกลาง พร้อมระบบวิเคราะห์ 8 ปัญหา
//
// ──────────────────────────────────────────────────────────────
//  8 ปัญหาที่ระบบนี้แก้ไข:
//
//  #1  ชื่อบุคคลซ้ำกัน           → Person Dedup via M_PERSON
//  #2  ชื่อสถานที่ซ้ำ             → Place Dedup via M_PLACE
//  #3  LatLong ซ้ำกัน            → Geo Cluster via M_GEO_POINT
//  #4  คนเดียวแต่ชื่อต่างกัน     → Person Alias + Fuzzy Match
//  #5  คนละชื่อ สถานที่เดียวกัน  → Place Shared, Person Separate
//  #6  ชื่อเดียวกัน สถานที่ต่าง  → 1 Person → N Places (N Destinations)
//  #7  ชื่อเดียวกัน LatLong ต่าง → 1 Person → N GeoPoints
//  #8  คนละชื่อ LatLong เดียวกัน → N Persons → 1 GeoPoint
// ──────────────────────────────────────────────────────────────

// ─── Weight Matrix ─────────────────────────────────────────────
// น้ำหนักคะแนนในแต่ละ dimension (รวม = 100%)
const SCORE_WEIGHTS = {
  PERSON_EXACT:      40,   // ชื่อตรงเป๊ะ
  PERSON_ALIAS:      38,   // ตรงผ่าน alias
  PERSON_FUZZY:      28,   // fuzzy match
  PLACE_EXACT:       30,   // สถานที่ตรง
  PLACE_ALIAS:       28,
  PLACE_FUZZY:       20,
  GEO_EXACT:         30,   // พิกัดตรง (key_6)
  GEO_NEAR5:         25,   // พิกัดใกล้ (key_5 ≈ ±11m)
  GEO_RADIUS:        18,   // พิกัดในรัศมี
  ADDRESS_MATCH:     10,   // ที่อยู่ตรงกัน (bonus)
  OWNER_MATCH:        5    // เจ้าของสินค้าเดียวกัน (bonus)
};

// Conflict Type Codes — ตรงกับ 8 ปัญหา
const CONFLICT = {
  C1_PERSON_DUPE:         'C1_PERSON_DUPLICATE',
  C2_PLACE_DUPE:          'C2_PLACE_DUPLICATE',
  C3_GEO_DUPE:            'C3_GEO_DUPLICATE',
  C4_SAME_PERSON_DIFF_NAME:'C4_SAME_PERSON_DIFF_NAME',
  C5_DIFF_PERSON_SAME_PLACE:'C5_DIFF_PERSON_SAME_PLACE',
  C6_SAME_PERSON_DIFF_PLACE:'C6_SAME_PERSON_DIFF_PLACE',
  C7_SAME_PERSON_DIFF_GEO: 'C7_SAME_PERSON_DIFF_GEO',
  C8_DIFF_PERSON_SAME_GEO: 'C8_DIFF_PERSON_SAME_GEO'
};

// Resolution Actions — วิธีแก้ไขที่แนะนำให้ Admin
const ACTION = {
  AUTO_MAP:      'AUTO_MAP',      // ระบบทำได้เองทันที
  ADD_ALIAS:     'ADD_ALIAS',     // เพิ่ม Alias แล้วแมพ
  MERGE:         'MERGE',         // Merge Master Records
  SPLIT:         'SPLIT',         // แยกออกเป็น Record ใหม่
  CONFIRM_MULTI: 'CONFIRM_MULTI', // ยืนยันว่ามีหลาย destination จริง
  MANUAL:        'MANUAL'         // ต้องให้คนตัดสิน
};

// ─── Main Engine ───────────────────────────────────────────────

/**
 * matchAllEntities — Entry Point หลัก
 * ทำ Entity Resolution + 8-Problem Detection ครบในที่เดียว
 *
 * @param {Object} normObj — จาก normalizeSourceObject()
 * @returns {Object} resolvedObj
 */
function matchAllEntities(normObj) {

  // ── STEP 1: Resolve แต่ละ Entity ──────────────────────────
  const personResult = resolvePerson(normObj);
  const placeResult  = resolvePlace(normObj);
  const geoResult    = resolveGeo(normObj);

  // ── STEP 2: ตรวจ Conflicts ทั้ง 8 ข้อ ────────────────────
  const conflictReport = detectAllConflicts({
    personResult, placeResult, geoResult, normObj
  });

  // ── STEP 3: คำนวณ Composite Score ────────────────────────
  const compositeScore = calculateCompositeScore({
    personResult, placeResult, geoResult, normObj
  });

  // ── STEP 4: ตัดสิน Decision ──────────────────────────────
  const decision = decideAutoMatchOrReview(compositeScore, {
    personResult, placeResult, geoResult,
    conflictReport, normObj
  });

  // ── STEP 5: Resolve Destination ──────────────────────────
  let destResult = { destination_id: null, is_new: false };
  if (decision !== 'SKIP' && (personResult.person_id || placeResult.place_id || geoResult.geo_id)) {
    destResult = resolveDestination(
      personResult.person_id,
      placeResult.place_id,
      geoResult.geo_id,
      normObj
    );
  }

  // ── STEP 6: บันทึก Conflict Log ──────────────────────────
  if (conflictReport.conflicts.length > 0) {
    writeLog('INFO', '10_MatchEngine', 'matchAllEntities',
      normObj.source_id,
      `Conflicts: ${conflictReport.conflicts.join(', ')} | score=${compositeScore} | ${decision}`,
      null);
  }

  return {
    personResult,
    placeResult,
    geoResult,
    destResult,
    compositeScore,
    decision,
    conflictReport,
    normObj
  };
}

// ─── 8-Problem Detector ─────────────────────────────────────────

/**
 * detectAllConflicts — ตรวจและจัดประเภทปัญหาทั้ง 8 ข้อ
 *
 * @param {{personResult, placeResult, geoResult, normObj}}
 * @returns {{
 *   conflicts: string[],       — รหัส Conflict ที่พบ
 *   details: Object,           — ข้อมูลละเอียด
 *   recommendations: Object[]  — Action ที่แนะนำให้ทำ
 * }}
 */
function detectAllConflicts({ personResult, placeResult, geoResult, normObj }) {
  const conflicts     = [];
  const details       = {};
  const recommendations = [];

  const P = personResult;  // shortcuts
  const L = placeResult;
  const G = geoResult;

  // ──────────────────────────────────────────────────────────
  // ปัญหา #1: ชื่อบุคคลซ้ำกันในระบบ
  //   → พบเมื่อ canonical match score = 100 แต่มีหลาย alias
  // ──────────────────────────────────────────────────────────
  if (P.person_id && !P.is_new && P.score === 100 && P.method === 'CANONICAL_EXACT') {
    // ตรวจว่าชื่อ raw ต่างจาก canonical หรือไม่ (คนละการพิมพ์)
    if (normObj.dest_name_raw &&
        normObj.person_name_norm !== normObj.dest_name_raw.toLowerCase().trim()) {
      conflicts.push(CONFLICT.C1_PERSON_DUPE);
      details.C1 = {
        person_id: P.person_id,
        raw_input: normObj.dest_name_raw,
        canonical: P.person_id,
        action: 'ชื่อนี้มีอยู่แล้ว — เชื่อมเข้า person เดิมโดยอัตโนมัติ'
      };
      recommendations.push({ conflict: CONFLICT.C1_PERSON_DUPE, action: ACTION.AUTO_MAP });
    }
  }

  // ──────────────────────────────────────────────────────────
  // ปัญหา #2: ชื่อสถานที่ซ้ำกันในระบบ
  // ──────────────────────────────────────────────────────────
  if (L.place_id && !L.is_new && L.score === 100) {
    conflicts.push(CONFLICT.C2_PLACE_DUPE);
    details.C2 = {
      place_id: L.place_id,
      method: L.method,
      action: 'สถานที่มีอยู่แล้ว — reuse place_id เดิม'
    };
    recommendations.push({ conflict: CONFLICT.C2_PLACE_DUPE, action: ACTION.AUTO_MAP });
  }

  // ──────────────────────────────────────────────────────────
  // ปัญหา #3: LatLong ซ้ำกัน (พิกัดเดียวกันแต่ record ใหม่)
  // ──────────────────────────────────────────────────────────
  if (G.geo_id && !G.is_new) {
    conflicts.push(CONFLICT.C3_GEO_DUPE);
    details.C3 = {
      geo_id:  G.geo_id,
      method:  G.method,
      dist_m:  G.dist_m || 0,
      action:  `พิกัดซ้ำ (method=${G.method}) — reuse geo_id เดิม`
    };
    recommendations.push({ conflict: CONFLICT.C3_GEO_DUPE, action: ACTION.AUTO_MAP });
  }

  // ──────────────────────────────────────────────────────────
  // ปัญหา #4: คนเดียวกันแต่ชื่อเขียนไม่เหมือน
  //   Fuzzy match สำเร็จ → แสดงว่าเป็นคนเดิมแต่สะกดต่าง
  // ──────────────────────────────────────────────────────────
  if (P.person_id && !P.is_new &&
      (P.method === 'FUZZY_AUTO' || P.method === 'ALIAS_EXACT') &&
      P.score < 100) {
    conflicts.push(CONFLICT.C4_SAME_PERSON_DIFF_NAME);
    details.C4 = {
      person_id:   P.person_id,
      raw_input:   normObj.dest_name_raw,
      match_score: P.score,
      method:      P.method,
      action:      `Fuzzy match ${P.score}% — เพิ่ม Alias อัตโนมัติ`
    };
    recommendations.push({
      conflict: CONFLICT.C4_SAME_PERSON_DIFF_NAME,
      action:   P.score >= parseFloat(getConfig('AUTO_MATCH_SCORE') || '90')
        ? ACTION.ADD_ALIAS : ACTION.MANUAL,
      note: `"${normObj.dest_name_raw}" → person_id ${P.person_id} (${P.score}%)`
    });
  }

  // ──────────────────────────────────────────────────────────
  // ปัญหา #5: คนละชื่อ แต่สถานที่เดียวกัน
  //   Place match สำเร็จ แต่ Person เป็นใหม่
  // ──────────────────────────────────────────────────────────
  if (L.place_id && !L.is_new && P.is_new) {
    conflicts.push(CONFLICT.C5_DIFF_PERSON_SAME_PLACE);
    details.C5 = {
      new_person_name: normObj.dest_name_raw,
      existing_place:  L.place_id,
      action: 'สถานที่เดิม — เพิ่ม Person ใหม่เชื่อมกับ Place เดิม'
    };
    recommendations.push({
      conflict: CONFLICT.C5_DIFF_PERSON_SAME_PLACE,
      action:   ACTION.CONFIRM_MULTI,
      note:     `Place ${L.place_id} มี Person ใหม่: "${normObj.dest_name_raw}"`
    });
  }

  // ──────────────────────────────────────────────────────────
  // ปัญหา #6: ชื่อเดียวกัน แต่สถานที่อยู่ไม่เหมือนกัน
  //   Person match แต่ Place ใหม่ → คนเดิมมีหลายที่ส่ง
  // ──────────────────────────────────────────────────────────
  if (P.person_id && !P.is_new && L.is_new && normObj.place_name_norm) {
    conflicts.push(CONFLICT.C6_SAME_PERSON_DIFF_PLACE);
    details.C6 = {
      person_id:      P.person_id,
      new_place_name: normObj.place_name_norm,
      existing_place: L.place_id,
      action:         'คนเดิม แต่สถานที่ใหม่ — สร้าง Destination ใหม่ให้คนนี้'
    };
    recommendations.push({
      conflict: CONFLICT.C6_SAME_PERSON_DIFF_PLACE,
      action:   ACTION.CONFIRM_MULTI,
      note:     `Person ${P.person_id} → Place ใหม่ "${normObj.place_name_norm}"`
    });
  }

  // ──────────────────────────────────────────────────────────
  // ปัญหา #7: ชื่อเดียวกัน แต่พิกัดคนละที่
  //   Person match แต่ Geo ใหม่ที่ไกลเกินรัศมี
  // ──────────────────────────────────────────────────────────
  if (P.person_id && !P.is_new && G.is_new && normObj.lat && normObj.long) {
    conflicts.push(CONFLICT.C7_SAME_PERSON_DIFF_GEO);

    // หา Geo ที่คนนี้เคยใช้ก่อนหน้า (จาก FACT_DELIVERY)
    const prevGeos = _getPersonPrevGeos(P.person_id);
    const minDist  = prevGeos.length > 0
      ? Math.min(...prevGeos.map(g => calcDistanceMeters(normObj.lat, normObj.long, g.lat, g.long)))
      : null;

    details.C7 = {
      person_id:    P.person_id,
      new_lat:      normObj.lat,
      new_long:     normObj.long,
      prev_geo_count: prevGeos.length,
      min_dist_m:   minDist !== null ? minDist.toFixed(0) + 'm' : 'N/A',
      action:       minDist !== null && minDist < 500
        ? 'พิกัดต่างเล็กน้อย — อาจเป็น GPS drift'
        : 'พิกัดต่างมาก — อาจเป็นที่ส่งใหม่จริง'
    };
    recommendations.push({
      conflict: CONFLICT.C7_SAME_PERSON_DIFF_GEO,
      action:   minDist !== null && minDist < 500
        ? ACTION.AUTO_MAP   // GPS drift — ใช้จุดเดิม
        : ACTION.CONFIRM_MULTI,  // ที่ใหม่จริง
      note: details.C7.action
    });
  }

  // ──────────────────────────────────────────────────────────
  // ปัญหา #8: คนละชื่อ แต่พิกัดเดียวกัน
  //   Geo match แต่ Person ใหม่ → หลายคนที่จุดเดิม
  // ──────────────────────────────────────────────────────────
  if (G.geo_id && !G.is_new && P.is_new) {
    conflicts.push(CONFLICT.C8_DIFF_PERSON_SAME_GEO);

    // หาว่า Geo นี้มีใครอยู่แล้วบ้าง
    const prevPersons = _getGeoPrevPersons(G.geo_id);

    details.C8 = {
      geo_id:          G.geo_id,
      new_person_name: normObj.dest_name_raw,
      existing_persons: prevPersons.map(p => p.name),
      count:           prevPersons.length,
      action:          prevPersons.length > 0
        ? `พิกัดนี้เคยส่งให้: ${prevPersons.map(p => p.name).join(', ')}`
        : 'พิกัดเดียวกัน — Person ใหม่คนแรก'
    };
    recommendations.push({
      conflict: CONFLICT.C8_DIFF_PERSON_SAME_GEO,
      action:   ACTION.CONFIRM_MULTI,
      note:     `Geo ${G.geo_id} → Person ใหม่ "${normObj.dest_name_raw}" (เดิมมี ${prevPersons.length} คน)`
    });
  }

  return { conflicts, details, recommendations };
}

// ─── Composite Score ─────────────────────────────────────────────

/**
 * calculateCompositeScore — คะแนนรวม 0-100
 * ใช้ Weight Matrix ที่กำหนดไว้
 *
 * @param {{personResult, placeResult, geoResult, normObj}}
 * @returns {number}
 */
function calculateCompositeScore({ personResult, placeResult, geoResult, normObj }) {

  let score = 0;

  // ── Person Score ────────────────────────────────────────────
  if (personResult.person_id) {
    const weight = {
      'CANONICAL_EXACT': SCORE_WEIGHTS.PERSON_EXACT,
      'ALIAS_EXACT':     SCORE_WEIGHTS.PERSON_ALIAS,
      'FUZZY_AUTO':      SCORE_WEIGHTS.PERSON_FUZZY * (personResult.score / 100),
      'NEW':             0
    }[personResult.method] ?? (SCORE_WEIGHTS.PERSON_EXACT * personResult.score / 100);
    score += weight;
  }

  // ── Place Score ─────────────────────────────────────────────
  if (placeResult.place_id) {
    const weight = {
      'CANONICAL_EXACT': SCORE_WEIGHTS.PLACE_EXACT,
      'ALIAS_EXACT':     SCORE_WEIGHTS.PLACE_ALIAS,
      'FUZZY_AUTO':      SCORE_WEIGHTS.PLACE_FUZZY * (placeResult.score / 100),
      'NEW':             0
    }[placeResult.method] ?? (SCORE_WEIGHTS.PLACE_EXACT * placeResult.score / 100);
    score += weight;
  }

  // ── Geo Score ───────────────────────────────────────────────
  if (geoResult.geo_id) {
    const weight = {
      'EXACT':        SCORE_WEIGHTS.GEO_EXACT,
      'NEAR_KEY5':    SCORE_WEIGHTS.GEO_NEAR5,
      'RADIUS_MATCH': SCORE_WEIGHTS.GEO_RADIUS,
      'NEW':          0
    }[geoResult.method] ?? 0;
    score += weight;
  }

  // ── Bonus: Address match ────────────────────────────────────
  if (normObj.address_norm && normObj.address_latlong_norm &&
      normObj.address_norm.length > 5 &&
      _stringSimilarity(normObj.address_norm, normObj.address_latlong_norm) > 0.7) {
    score += SCORE_WEIGHTS.ADDRESS_MATCH;
  }

  return Math.min(100, Math.round(score));
}

// ─── Decision Logic ──────────────────────────────────────────────

/**
 * decideAutoMatchOrReview — ตัดสิน Decision สุดท้าย
 *
 * Decision Matrix:
 *   score ≥ AUTO_MATCH_SCORE → AUTO_MATCH (ระบบทำเองได้)
 *   score ≥ REVIEW_SCORE_MIN → REVIEW (ให้คนช่วยตัดสิน)
 *   allNew = true            → NEW (สร้างทุก Entity ใหม่)
 *   มี Conflict ที่ต้องใส่ใจ → REVIEW
 *
 * @param {number} compositeScore
 * @param {Object} context
 * @returns {string}
 */
function decideAutoMatchOrReview(compositeScore, context) {
  const thresholds = getThresholds();
  const { personResult, placeResult, geoResult, conflictReport } = context;

  // ── กรณีพิเศษ: Error ─────────────────────────────────────
  const hasError = [personResult, placeResult, geoResult]
    .some(r => r.method === 'ERROR');
  if (hasError) return 'REVIEW';

  // ── กรณีใหม่ทุก Entity ────────────────────────────────────
  const allNew = personResult.is_new && placeResult.is_new && geoResult.is_new;
  if (allNew) return 'NEW';

  // ── Conflict ที่บังคับ Review ──────────────────────────────
  // C7 ที่พิกัดต่างมาก และ C8 ต้องให้คนยืนยัน
  const forceReviewConflicts = [CONFLICT.C7_SAME_PERSON_DIFF_GEO, CONFLICT.C8_DIFF_PERSON_SAME_GEO];
  const forceReview = conflictReport?.conflicts?.some(c => {
    if (!forceReviewConflicts.includes(c)) return false;
    // C7: force review เฉพาะถ้าระยะต่างมาก (> 500m)
    if (c === CONFLICT.C7_SAME_PERSON_DIFF_GEO) {
      const minDist = parseFloat(conflictReport.details?.C7?.min_dist_m) || 9999;
      return minDist > 500;
    }
    return true;
  });
  if (forceReview) return 'REVIEW';

  // ── Fuzzy Review method ────────────────────────────────────
  const needsReview = [personResult, placeResult, geoResult]
    .some(r => r.method === 'FUZZY_REVIEW');
  if (needsReview) return 'REVIEW';

  // ── Score-based ────────────────────────────────────────────
  if (compositeScore >= thresholds.autoMatch) return 'AUTO_MATCH';
  if (compositeScore >= thresholds.reviewMin)  return 'REVIEW';

  return 'NEW';
}

/**
 * buildReviewPayload — สร้าง payload สมบูรณ์สำหรับ Q_REVIEW
 * @param {Object} resolvedObj
 * @returns {Object}
 */
function buildReviewPayload(resolvedObj) {
  const { personResult, placeResult, geoResult, destResult,
    compositeScore, conflictReport, normObj } = resolvedObj;

  const topConflict = conflictReport?.conflicts?.[0] || 'UNCERTAIN_MATCH';
  const topRec = conflictReport?.recommendations?.[0];

  return {
    issue_type:              topConflict,
    source_record_id:        normObj.source_id,
    source_row_number:       normObj._rowNumber,
    invoice_no:              normObj.invoice_no,
    raw_person_name:         normObj.dest_name_raw,
    raw_place_name:          normObj.address_raw || normObj.address_latlong,
    raw_lat:                 normObj.lat,
    raw_long:                normObj.long,
    candidate_person_ids:    _formatCandidates(personResult.candidates, 'person_id'),
    candidate_place_ids:     _formatCandidates(placeResult.candidates,  'place_id'),
    candidate_geo_ids:       _formatCandidates(geoResult.candidates,    'geo_id'),
    candidate_destination_ids: destResult.destination_id || '',
    score:                   compositeScore,
    recommended_action:      topRec ? `${topRec.action}: ${topRec.note || ''}` : 'MANUAL_REVIEW',
    status:                  'PENDING'
  };
}

// ─── Context Lookup Helpers ──────────────────────────────────────

/**
 * _getPersonPrevGeos — หา Geo ที่ Person นี้เคยใช้ (จาก FACT_DELIVERY)
 * ใช้ใน conflict #7 detection
 * @param {string} personId
 * @returns {Array<{geo_id, lat, long}>}
 */
function _getPersonPrevGeos(personId) {
  try {
    const cache = CacheService.getScriptCache();
    const cKey = `PERSON_GEOS_${personId}`;
    const cached = cache.get(cKey);
    if (cached) return JSON.parse(cached);

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sh = ss.getSheetByName(SHEET_NAMES.FACT_DELIVERY);
    if (!sh || sh.getLastRow() < 2) return [];

    const data = sh.getDataRange().getValues();
    const hdr = data[0];
    const pidIdx = hdr.indexOf('person_id');
    const gidIdx = hdr.indexOf('geo_id');
    const latIdx = hdr.indexOf('raw_lat');
    const lngIdx = hdr.indexOf('raw_long');

    const result = [];
    const seen   = new Set();
    for (let i = 1; i < data.length; i++) {
      if (data[i][pidIdx] !== personId) continue;
      const geoId = data[i][gidIdx];
      if (geoId && !seen.has(geoId)) {
        seen.add(geoId);
        result.push({
          geo_id: geoId,
          lat:    parseFloat(data[i][latIdx]) || 0,
          long:   parseFloat(data[i][lngIdx]) || 0
        });
      }
    }
    cache.put(cKey, JSON.stringify(result), 600); // cache 10 นาที
    return result;
  } catch (e) {
    return [];
  }
}

/**
 * _getGeoPrevPersons — หา Person ที่เคยใช้ Geo นี้ (จาก FACT_DELIVERY)
 * ใช้ใน conflict #8 detection
 * @param {string} geoId
 * @returns {Array<{person_id, name}>}
 */
function _getGeoPrevPersons(geoId) {
  try {
    const cache = CacheService.getScriptCache();
    const cKey = `GEO_PERSONS_${geoId}`;
    const cached = cache.get(cKey);
    if (cached) return JSON.parse(cached);

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sh = ss.getSheetByName(SHEET_NAMES.FACT_DELIVERY);
    if (!sh || sh.getLastRow() < 2) return [];

    const data = sh.getDataRange().getValues();
    const hdr = data[0];
    const gidIdx = hdr.indexOf('geo_id');
    const pidIdx = hdr.indexOf('person_id');
    const nameIdx = hdr.indexOf('raw_person_name');

    const result = [];
    const seen = new Set();
    for (let i = 1; i < data.length; i++) {
      if (data[i][gidIdx] !== geoId) continue;
      const pid = data[i][pidIdx];
      if (pid && !seen.has(pid)) {
        seen.add(pid);
        result.push({ person_id: pid, name: data[i][nameIdx] || '' });
      }
    }
    cache.put(cKey, JSON.stringify(result), 600);
    return result;
  } catch (e) {
    return [];
  }
}

// ─── String Similarity ───────────────────────────────────────────

/**
 * _stringSimilarity — Jaccard similarity ระหว่าง 2 strings (0–1)
 */
function _stringSimilarity(a, b) {
  if (!a || !b) return 0;
  const setA = new Set(a.split(''));
  const setB = new Set(b.split(''));
  const intersection = [...setA].filter(x => setB.has(x)).length;
  const union = new Set([...setA, ...setB]).size;
  return union === 0 ? 0 : intersection / union;
}

/**
 * _formatCandidates — แปลง candidates array เป็น string สำหรับ Q_REVIEW
 */
function _formatCandidates(candidates, idField) {
  if (!candidates || candidates.length === 0) return '';
  return candidates.map(c => `${c[idField] || ''}(${c.score || c.dist_m || '?'})`).join(',');
}
// ============================================================
// FILE: 11_TransactionService.gs
// VERSION: 001
// MODULE: TransactionService — บันทึก FACT_DELIVERY
// ============================================================

/**
 * saveProcessingResult — บันทึกผลการประมวลผลลง FACT_DELIVERY
 * และ enqueue review ถ้าจำเป็น
 * @param {Object} normObj
 * @param {Object} resolvedObj (จาก matchAllEntities)
 * @returns {string} tx_id
 */
function saveProcessingResult(normObj, resolvedObj) {
  // ป้องกัน duplicate
  const dupeCheck = preventDuplicateTransaction(normObj.source_id, normObj.invoice_no);
  if (dupeCheck) {
    writeLog('WARN', '11_TransactionService', 'saveProcessingResult', null,
      `Duplicate transaction: source_id=${normObj.source_id}`, null);
    return dupeCheck; // คืน tx_id เดิม
  }

  const factObj = buildFactRow(normObj, resolvedObj);
  const txId = upsertFactDelivery(factObj);

  // ถ้าต้อง Review — ส่งเข้า Queue
  if (resolvedObj.decision === 'REVIEW') {
    const reviewPayload = buildReviewPayload(resolvedObj);
    reviewPayload.tx_id = txId;
    enqueueReview(reviewPayload);
  }

  // อัปเดต stats ของ Master records
  if (resolvedObj.personResult.person_id)
    updatePersonStats(resolvedObj.personResult.person_id);
  if (resolvedObj.placeResult.place_id)
    updatePlaceStats(resolvedObj.placeResult.place_id);

  return txId;
}

/**
 * buildFactRow — สร้าง object สำหรับ FACT_DELIVERY row
 * @param {Object} normObj
 * @param {Object} resolvedObj
 * @returns {Object}
 */
function buildFactRow(normObj, resolvedObj) {
  const { personResult, placeResult, geoResult, destResult, decision } = resolvedObj;
  const now = new Date();

  return {
    tx_id:             'TX-' + uuid().replace(/-/g, '').substr(0, 12).toUpperCase(),
    source_sheet:      SHEET_NAMES.SOURCE,
    source_row_number: normObj._rowNumber,
    source_record_id:  normObj.source_id,
    delivery_date:     normObj.delivery_date,
    delivery_time:     normObj.delivery_time,
    shipment_no:       normObj.shipment_no,
    invoice_no:        normObj.invoice_no,
    owner_name:        normObj.owner_name,
    customer_code:     normObj.customer_code,
    raw_person_name:   normObj.dest_name_raw,
    raw_place_name:    normObj.address_raw,
    raw_address:       normObj.address_latlong || normObj.address_raw,
    raw_lat:           normObj.lat,
    raw_long:          normObj.long,
    person_id:         personResult.person_id || '',
    place_id:          placeResult.place_id   || '',
    geo_id:            geoResult.geo_id       || '',
    destination_id:    destResult.destination_id || '',
    warehouse:         normObj.warehouse,
    distance_km:       normObj.distance_km,
    driver_name:       normObj.driver_name,
    employee_id:       normObj.employee_id,
    employee_email:    normObj.employee_email,
    license_plate:     normObj.license_plate,
    validation_result: normObj.validation_result,
    anomaly_reason:    normObj.anomaly_reason,
    review_status:     decision === 'REVIEW' ? 'PENDING' : 'APPROVED',
    sync_status:       decision,
    created_at:        now,
    updated_at:        now
  };
}

/**
 * upsertFactDelivery — เพิ่มหรืออัปเดต FACT_DELIVERY
 * @param {Object} factObj
 * @returns {string} tx_id
 */
function upsertFactDelivery(factObj) {
  return withLock(() => {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sh = ss.getSheetByName(SHEET_NAMES.FACT_DELIVERY);
    const headers = SHEET_HEADERS.FACT_DELIVERY;

    const row = headers.map(h => factObj[h] !== undefined ? factObj[h] : '');
    sh.appendRow(row);

    return factObj.tx_id;
  });
}

/**
 * preventDuplicateTransaction — ตรวจซ้ำจาก source_record_id
 * @param {string} sourceRecordId
 * @param {string} invoiceNo
 * @returns {string|null} tx_id ถ้าซ้ำ, null ถ้าไม่ซ้ำ
 */
function preventDuplicateTransaction(sourceRecordId, invoiceNo) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sh = ss.getSheetByName(SHEET_NAMES.FACT_DELIVERY);
    if (!sh || sh.getLastRow() < 2) return null;

    const data = sh.getDataRange().getValues();
    const hdr = data[0];
    const txIdx  = hdr.indexOf('tx_id');
    const srcIdx = hdr.indexOf('source_record_id');

    for (let i = 1; i < data.length; i++) {
      if (data[i][srcIdx] === sourceRecordId) return data[i][txIdx];
    }
    return null;
  } catch (e) {
    return null;
  }
}

/**
 * linkFactToMasters — เพิ่ม link ย้อนกลับ (สำหรับ future use)
 * @param {string} txId
 * @param {Object} resolvedObj
 */
function linkFactToMasters(txId, resolvedObj) {
  // Reserved for future BigQuery / Firestore integration
  writeLog('DEBUG', '11_TransactionService', 'linkFactToMasters', txId,
    'link recorded', JSON.stringify({
      person_id: resolvedObj.personResult.person_id,
      place_id:  resolvedObj.placeResult.place_id,
      geo_id:    resolvedObj.geoResult.geo_id
    }));
}


// ============================================================
// FILE: 12_ReviewService.gs
// VERSION: 001
// MODULE: ReviewService — จัดการ Q_REVIEW และการเรียนรู้
// ============================================================

/**
 * enqueueReview — เพิ่มรายการเข้า Q_REVIEW
 * @param {Object} reviewPayload (จาก buildReviewPayload)
 * @returns {string} review_id
 */
function enqueueReview(reviewPayload) {
  return withLock(() => {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sh = ss.getSheetByName(SHEET_NAMES.Q_REVIEW);
    const reviewId = 'RVW-' + uuid().replace(/-/g, '').substr(0, 10).toUpperCase();
    const headers = SHEET_HEADERS.Q_REVIEW;

    const fullPayload = { review_id: reviewId, ...reviewPayload };
    const row = headers.map(h => fullPayload[h] !== undefined ? fullPayload[h] : '');
    sh.appendRow(row);

    writeLog('INFO', '12_ReviewService', 'enqueueReview', reviewId,
      `Queued review: ${reviewPayload.issue_type} | ${reviewPayload.raw_person_name}`, null);
    return reviewId;
  });
}

/**
 * getPendingReviews — ดึงรายการที่รอการตรวจสอบ
 * @returns {Object[]}
 */
function getPendingReviews() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = ss.getSheetByName(SHEET_NAMES.Q_REVIEW);
  if (!sh || sh.getLastRow() < 2) return [];

  const data = sh.getDataRange().getValues();
  const headers = data[0];
  const statusIdx = headers.indexOf('status');
  const result = [];

  for (let i = 1; i < data.length; i++) {
    if (data[i][statusIdx] === 'PENDING') {
      const obj = {};
      headers.forEach((h, j) => { obj[h] = data[i][j]; });
      obj._rowNumber = i + 1;
      result.push(obj);
    }
  }
  return result;
}

/**
 * applyReviewDecision — บันทึกคำตัดสินของ Admin
 * @param {string} reviewId
 * @param {string} decision — 'MERGE_PERSON' | 'MERGE_PLACE' | 'KEEP_SEPARATE' | 'CREATE_NEW'
 * @param {Object} details — { target_person_id, target_place_id, reviewer }
 */
function applyReviewDecision(reviewId, decision, details) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sh = ss.getSheetByName(SHEET_NAMES.Q_REVIEW);
    if (!sh || sh.getLastRow() < 2) return;

    const data = sh.getDataRange().getValues();
    const headers = data[0];
    const idIdx   = headers.indexOf('review_id');
    const statusIdx = headers.indexOf('status');
    const decisionIdx = headers.indexOf('decision');
    const reviewerIdx = headers.indexOf('reviewer');
    const reviewedAtIdx = headers.indexOf('reviewed_at');

    for (let i = 1; i < data.length; i++) {
      if (data[i][idIdx] !== reviewId) continue;

      // อัปเดต decision
      sh.getRange(i + 1, statusIdx + 1).setValue('RESOLVED');
      sh.getRange(i + 1, decisionIdx + 1).setValue(decision);
      sh.getRange(i + 1, reviewerIdx + 1).setValue(details.reviewer || 'ADMIN');
      sh.getRange(i + 1, reviewedAtIdx + 1).setValue(new Date());

      // Execute decision
      if (decision === 'MERGE_PERSON' && details.source_person_id && details.target_person_id) {
        mergeMasterRecords('PERSON', details.source_person_id, details.target_person_id);
        learnAliasFromReview(reviewId, data[i], headers);
      } else if (decision === 'MERGE_PLACE' && details.source_place_id && details.target_place_id) {
        mergeMasterRecords('PLACE', details.source_place_id, details.target_place_id);
      }

      writeLog('INFO', '12_ReviewService', 'applyReviewDecision', reviewId,
        `Decision: ${decision}`, JSON.stringify(details));
      return;
    }
    writeLog('WARN', '12_ReviewService', 'applyReviewDecision', reviewId,
      'review_id ไม่พบ', null);

  } catch (e) {
    writeLog('ERROR', '12_ReviewService', 'applyReviewDecision', reviewId, e.message, null);
  }
}

/**
 * mergeMasterRecords — Merge master records (RULE 4: ใช้ Archived ไม่ใช่ delete)
 * @param {'PERSON'|'PLACE'} masterType
 * @param {string} sourceId — ID ที่จะถูก merge (จะถูก Archive)
 * @param {string} targetId — ID ปลายทาง (master ที่ถูกต้อง)
 */
function mergeMasterRecords(masterType, sourceId, targetId) {
  try {
    const sheetName = masterType === 'PERSON' ? SHEET_NAMES.M_PERSON : SHEET_NAMES.M_PLACE;
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sh = ss.getSheetByName(sheetName);
    if (!sh) return;

    const data = sh.getDataRange().getValues();
    const statusCol = masterType === 'PERSON' ? 7 : 10; // 1-based

    // Archive source record (RULE 4: ห้าม delete)
    for (let i = 1; i < data.length; i++) {
      if (data[i][0] === sourceId) {
        sh.getRange(i + 1, statusCol).setValue('MERGED_TO:' + targetId);
        sh.getRange(i + 1, statusCol + 1).setValue('Merged to ' + targetId + ' by Review');
        break;
      }
    }

    // อัปเดต FACT_DELIVERY ให้ใช้ targetId แทน
    _redirectFactsToTarget(masterType, sourceId, targetId);

    writeLog('INFO', '12_ReviewService', 'mergeMasterRecords', null,
      `Merged ${masterType}: ${sourceId} → ${targetId}`, null);

    // Clear caches
    if (masterType === 'PERSON') _clearPersonCache();
    else _clearPlaceCache();

  } catch (e) {
    writeLog('ERROR', '12_ReviewService', 'mergeMasterRecords', null, e.message, null);
  }
}

/**
 * learnAliasFromReview — เพิ่ม alias ที่เรียนรู้จาก review decision
 * @param {string} reviewId
 * @param {Array} reviewRow
 * @param {Array} headers
 */
function learnAliasFromReview(reviewId, reviewRow, headers) {
  try {
    const rawNameIdx = headers.indexOf('raw_person_name');
    const rawName = reviewRow[rawNameIdx];
    if (!rawName) return;

    // ดึง target person_id จาก note หรือ decision field
    const decisionIdx = headers.indexOf('decision');
    const decision = reviewRow[decisionIdx] || '';
    const targetMatch = decision.match(/MERGE_PERSON:([A-Z0-9\-]+)/);
    if (!targetMatch) return;

    const targetPersonId = targetMatch[1];
    const normalizedAlias = normalizePersonName(rawName);
    createPersonAlias(targetPersonId, rawName, normalizedAlias);

    writeLog('INFO', '12_ReviewService', 'learnAliasFromReview', reviewId,
      `เพิ่ม Alias "${normalizedAlias}" → ${targetPersonId}`, null);
  } catch (e) {
    writeLog('WARN', '12_ReviewService', 'learnAliasFromReview', reviewId, e.message, null);
  }
}

/**
 * closeReviewItem — ปิด review item ที่เสร็จแล้ว
 * @param {string} reviewId
 */
function closeReviewItem(reviewId) {
  applyReviewDecision(reviewId, 'CLOSED', { reviewer: 'SYSTEM' });
}

// ─────────────────────────────────────────────
// PRIVATE HELPERS
// ─────────────────────────────────────────────

/**
 * _redirectFactsToTarget — อัปเดต FACT_DELIVERY ให้ใช้ ID ใหม่หลัง merge
 */
function _redirectFactsToTarget(masterType, sourceId, targetId) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = ss.getSheetByName(SHEET_NAMES.FACT_DELIVERY);
  if (!sh || sh.getLastRow() < 2) return;

  const data = sh.getDataRange().getValues();
  const headers = data[0];
  const colName = masterType === 'PERSON' ? 'person_id' : 'place_id';
  const colIdx  = headers.indexOf(colName);
  if (colIdx < 0) return;

  const updates = [];
  for (let i = 1; i < data.length; i++) {
    if (data[i][colIdx] === sourceId) {
      updates.push({ row: i + 1, col: colIdx + 1, val: targetId });
    }
  }

  // RULE 6: Batch update
  for (const u of updates) {
    sh.getRange(u.row, u.col).setValue(u.val);
  }
}
// ============================================================
// FILE: 13_ReportService.gs
// VERSION: 001
// MODULE: ReportService — รายงานคุณภาพข้อมูล
// ============================================================

/**
 * refreshQualityReport — รีเฟรช RPT_DATA_QUALITY
 * สรุปข้อมูลล่าสุดจาก FACT_DELIVERY และ Master tables
 */
function refreshQualityReport() {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const today = new Date();
    const todayStr = Utilities.formatDate(today, Session.getScriptTimeZone(), 'yyyy-MM-dd');

    // นับข้อมูลจาก FACT_DELIVERY วันนี้
    const factData = _getFactDataToday(todayStr);

    // นับ Master ใหม่วันนี้
    const newPersonCount = _countNewMastersToday(SHEET_NAMES.M_PERSON, 'first_seen_date', todayStr);
    const newPlaceCount  = _countNewMastersToday(SHEET_NAMES.M_PLACE,  'first_seen_date', todayStr);
    const newGeoCount    = _countNewMastersToday(SHEET_NAMES.M_GEO_POINT, 'first_seen_date', todayStr);
    const newDestCount   = _countNewMastersToday(SHEET_NAMES.M_DESTINATION, 'first_seen_date', todayStr);

    // นับ Reviews และ Errors
    const reviewCount  = _countReviewsToday(todayStr);
    const errorCount   = _countErrors();

    const snapshot = {
      report_date:            today,
      total_source_rows:      factData.total,
      processed_rows:         factData.processed,
      new_person_count:       newPersonCount,
      new_place_count:        newPlaceCount,
      new_geo_count:          newGeoCount,
      new_destination_count:  newDestCount,
      auto_match_count:       factData.autoMatch,
      review_count:           reviewCount,
      duplicate_alert_count:  factData.duplicates,
      error_count:            errorCount,
      last_refresh_at:        today
    };

    writeReportSnapshot(snapshot);
    writeLog('INFO', '13_ReportService', 'refreshQualityReport', null,
      `Report refreshed: ${todayStr}`, JSON.stringify(snapshot));

    return snapshot;
  } catch (e) {
    writeLog('ERROR', '13_ReportService', 'refreshQualityReport', null, e.message, null);
    return null;
  }
}

/**
 * buildDuplicateReport — สร้างรายงาน Duplicates ที่ตรวจพบ
 * @returns {Object[]}
 */
function buildDuplicateReport() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = ss.getSheetByName(SHEET_NAMES.FACT_DELIVERY);
  if (!sh || sh.getLastRow() < 2) return [];

  const data = sh.getDataRange().getValues();
  const headers = data[0];
  const invoiceIdx = headers.indexOf('invoice_no');
  const txIdx = headers.indexOf('tx_id');

  const seen = {};
  const dupes = [];
  for (let i = 1; i < data.length; i++) {
    const inv = data[i][invoiceIdx];
    if (!inv) continue;
    if (seen[inv]) {
      dupes.push({ invoice_no: inv, tx_id_first: seen[inv], tx_id_dupe: data[i][txIdx], row: i + 1 });
    } else {
      seen[inv] = data[i][txIdx];
    }
  }
  return dupes;
}

/**
 * buildConflictReport — รายงาน Conflicts ประเภทต่างๆ
 * @returns {Object}
 */
function buildConflictReport() {
  const reviews = getPendingReviews();
  const byType = {};
  reviews.forEach(r => {
    byType[r.issue_type] = (byType[r.issue_type] || 0) + 1;
  });
  return { total: reviews.length, byType };
}

/**
 * buildDailySummary — สรุปประจำวัน
 * @returns {Object}
 */
function buildDailySummary() {
  const snapshot = refreshQualityReport();
  const conflicts = buildConflictReport();
  const dupes = buildDuplicateReport();

  return { snapshot, conflicts, duplicates: dupes.length, asOf: new Date() };
}

/**
 * writeReportSnapshot — บันทึก snapshot ลง RPT_DATA_QUALITY
 * @param {Object} snapshot
 */
function writeReportSnapshot(snapshot) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sh = ss.getSheetByName(SHEET_NAMES.RPT_QUALITY);
    if (!sh) return;

    const headers = SHEET_HEADERS.RPT_DATA_QUALITY;
    const row = headers.map(h => snapshot[h] !== undefined ? snapshot[h] : '');

    // อัปเดต row ของวันนี้ถ้ามีอยู่แล้ว
    if (sh.getLastRow() > 1) {
      const data = sh.getDataRange().getValues();
      const dateIdx = 0;
      const todayStr = Utilities.formatDate(
        snapshot.report_date || new Date(),
        Session.getScriptTimeZone(), 'yyyy-MM-dd'
      );
      for (let i = 1; i < data.length; i++) {
        const rowDate = data[i][dateIdx]
          ? Utilities.formatDate(new Date(data[i][dateIdx]), Session.getScriptTimeZone(), 'yyyy-MM-dd')
          : '';
        if (rowDate === todayStr) {
          sh.getRange(i + 1, 1, 1, headers.length).setValues([row]);
          return;
        }
      }
    }
    sh.appendRow(row);
  } catch (e) {
    writeLog('WARN', '13_ReportService', 'writeReportSnapshot', null, e.message, null);
  }
}

// ─────────────────────────────────────────────
// PRIVATE HELPERS
// ─────────────────────────────────────────────

function _getFactDataToday(todayStr) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = ss.getSheetByName(SHEET_NAMES.FACT_DELIVERY);
  if (!sh || sh.getLastRow() < 2) return { total: 0, processed: 0, autoMatch: 0, duplicates: 0 };

  const data = sh.getDataRange().getValues();
  const headers = data[0];
  const createdIdx = headers.indexOf('created_at');
  const syncIdx    = headers.indexOf('sync_status');

  let total = 0, processed = 0, autoMatch = 0, duplicates = 0;
  const tz = Session.getScriptTimeZone();

  for (let i = 1; i < data.length; i++) {
    const rowDate = data[i][createdIdx]
      ? Utilities.formatDate(new Date(data[i][createdIdx]), tz, 'yyyy-MM-dd') : '';
    if (rowDate !== todayStr) continue;
    total++;
    const status = data[i][syncIdx];
    if (status === 'AUTO_MATCH' || status === 'PROCESSED' || status === 'NEW') processed++;
    if (status === 'AUTO_MATCH') autoMatch++;
  }
  return { total, processed, autoMatch, duplicates };
}

function _countNewMastersToday(sheetName, dateCol, todayStr) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = ss.getSheetByName(sheetName);
  if (!sh || sh.getLastRow() < 2) return 0;
  const data = sh.getDataRange().getValues();
  const headers = data[0];
  const dateIdx = headers.indexOf(dateCol);
  if (dateIdx < 0) return 0;
  const tz = Session.getScriptTimeZone();
  let count = 0;
  for (let i = 1; i < data.length; i++) {
    const d = data[i][dateIdx];
    if (!d) continue;
    const s = Utilities.formatDate(new Date(d), tz, 'yyyy-MM-dd');
    if (s === todayStr) count++;
  }
  return count;
}

function _countReviewsToday(todayStr) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = ss.getSheetByName(SHEET_NAMES.Q_REVIEW);
  if (!sh || sh.getLastRow() < 2) return 0;
  const data = sh.getDataRange().getValues();
  const headers = data[0];
  const statusIdx = headers.indexOf('status');
  return data.slice(1).filter(r => r[statusIdx] === 'PENDING').length;
}

function _countErrors() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = ss.getSheetByName(SHEET_NAMES.FACT_DELIVERY);
  if (!sh || sh.getLastRow() < 2) return 0;
  const data = sh.getDataRange().getValues();
  const headers = data[0];
  const syncIdx = headers.indexOf('sync_status');
  return data.slice(1).filter(r => r[syncIdx] === 'ERROR').length;
}


// ============================================================
// FILE: 14_Utils.gs
// VERSION: 001
// MODULE: Utils — ฟังก์ชันช่วยเหลือทั่วไป
// ============================================================

/**
 * uuid — สร้าง UUID v4
 * @returns {string}
 */
function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = Math.random() * 16 | 0;
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
}

/**
 * safeTrim — trim string อย่างปลอดภัย
 * @param {*} value
 * @returns {string}
 */
function safeTrim(value) {
  if (value === null || value === undefined) return '';
  return String(value).trim();
}

/**
 * safeString — แปลงเป็น string อย่างปลอดภัย
 * @param {*} value
 * @returns {string}
 */
function safeString(value) {
  if (value === null || value === undefined) return '';
  const s = String(value).trim();
  return s === 'undefined' || s === 'null' ? '' : s;
}

/**
 * safeNumber — แปลงเป็น number อย่างปลอดภัย
 * @param {*} value
 * @returns {number}
 */
function safeNumber(value) {
  if (value === null || value === undefined || value === '') return 0;
  const n = parseFloat(String(value).replace(/,/g, ''));
  return isNaN(n) ? 0 : n;
}

/**
 * safeDate — แปลงเป็น Date อย่างปลอดภัย
 * @param {*} value
 * @returns {Date|string}
 */
function safeDate(value) {
  if (!value) return '';
  if (value instanceof Date) return value;
  const d = new Date(value);
  return isNaN(d.getTime()) ? String(value) : d;
}

/**
 * withLock — Execute callback ภายใน ScriptLock (RULE 6 + concurrency safe)
 * @param {Function} callback
 * @returns {*} ค่าที่ callback return
 */
function withLock(callback) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(30000); // รอ 30 วินาที
    return callback();
  } catch (e) {
    writeLog('ERROR', '14_Utils', 'withLock', null, 'Lock timeout: ' + e.message, null);
    throw e;
  } finally {
    lock.releaseLock();
  }
}

/**
 * writeLog — บันทึก Log ลง SYS_LOG
 * RULE 7: ใช้ใน try-catch ทุก service function
 * @param {string} level — INFO | WARN | ERROR | DEBUG
 * @param {string} moduleName
 * @param {string} functionName
 * @param {string|null} refId
 * @param {string} message
 * @param {string|null} payloadJson
 */
function writeLog(level, moduleName, functionName, refId, message, payloadJson) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sh = ss.getSheetByName('SYS_LOG');
    if (!sh) return; // ถ้ายังไม่มีชีต — skip

    // Console output เพิ่มด้วย
    const consoleMsg = `[${level}][${moduleName}.${functionName}] ${message}`;
    if (level === 'ERROR') console.error(consoleMsg);
    else if (level === 'WARN') console.warn(consoleMsg);
    else console.log(consoleMsg);

    // เขียนลงชีต (ไม่ใช้ withLock เพื่อหลีกเลี่ยง deadlock ใน catch)
    sh.appendRow([
      uuid().substr(0, 8).toUpperCase(),   // log_id
      refId || '',                          // run_id
      new Date(),                           // created_at
      level,
      moduleName,
      functionName,
      refId || '',
      message,
      payloadJson || ''
    ]);
  } catch (logErr) {
    console.error('writeLog failed:', logErr.message);
  }
}

/**
 * chunkArray — แบ่ง array เป็น chunks
 * @param {Array} arr
 * @param {number} size
 * @returns {Array[]}
 */
function chunkArray(arr, size) {
  const chunks = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}

/**
 * formatDateThai — แปลงวันที่เป็นรูปแบบไทย
 * @param {Date|string} date
 * @returns {string}
 */
function formatDateThai(date) {
  if (!date) return '';
  const d = date instanceof Date ? date : new Date(date);
  if (isNaN(d.getTime())) return String(date);
  return Utilities.formatDate(d, Session.getScriptTimeZone(), 'dd/MM/yyyy HH:mm:ss');
}

/**
 * isValidLatLong — ตรวจสอบว่า lat/long อยู่ในประเทศไทย
 * @param {number} lat
 * @param {number} long
 * @returns {boolean}
 */
function isValidLatLong(lat, long) {
  return lat >= 5.0 && lat <= 21.0 && long >= 97.0 && long <= 106.0;
}

/**
 * deepEqual — เปรียบเทียบ object แบบ deep
 * @param {*} a
 * @param {*} b
 * @returns {boolean}
 */
function deepEqual(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}
// ============================================================
// FILE: 15_CheckpointService.gs
// VERSION: 001
// MODULE: CheckpointService
//   — ระบบ Checkpoint + Time Guard สำหรับ Google Apps Script
//
// WHY THIS EXISTS:
//   Google Apps Script มี Hard Limit 6 นาที (360 วินาที)
//   ถ้าสคริปต์ทำงานเกิน 6 นาทีจะถูกบังคับหยุด
//   ผลคือ: ข้อมูลเขียนค้างกลางคัน, Sync Status ไม่อัปเดต,
//   รอบหน้าประมวลผลซ้ำ หรือข้ามข้อมูลที่ควรทำ
//
// SOLUTION:
//   - ตัดการทำงานก่อน 5 นาที (buffer 60 วินาที)
//   - บันทึก Checkpoint: row ล่าสุดที่ทำเสร็จ + สถิติ
//   - รันครั้งถัดไปอ่าน Checkpoint แล้วต่อจากตรงนั้น
//   - ถ้าไม่มี Checkpoint = เริ่มจาก row 2 ใหม่
// ============================================================

// ─── Constants ───────────────────────────────────────────────
const EXEC_LIMIT_SECONDS  = 300;   // 5 นาที = ตัดก่อน Hard Limit 60 วินาที
const CHECKPOINT_KEY      = 'MDM_CHECKPOINT';
const CHECKPOINT_CACHE_S  = 21600; // 6 ชั่วโมง

// ─── ExecutionTimer Class (Singleton Pattern) ─────────────────

/**
 * createTimer — สร้าง Timer object สำหรับ session นี้
 * เรียกครั้งเดียวต้น runDailyProcess
 * @returns {Object} timer
 */
function createTimer() {
  const startMs = Date.now();
  return {
    startMs,

    /** elapsed — เวลาที่ผ่านไป (วินาที) */
    elapsed() {
      return (Date.now() - startMs) / 1000;
    },

    /** remaining — เวลาที่เหลือ (วินาที) */
    remaining() {
      return EXEC_LIMIT_SECONDS - this.elapsed();
    },

    /** isNearLimit — true ถ้าเหลือเวลา < 30 วินาที */
    isNearLimit() {
      return this.remaining() < 30;
    },

    /** shouldStop — true ถ้าเกิน budget แล้ว */
    shouldStop() {
      return this.elapsed() >= EXEC_LIMIT_SECONDS;
    },

    /** summary — สรุป string */
    summary() {
      const e = this.elapsed().toFixed(1);
      const r = this.remaining().toFixed(1);
      return `ใช้ไป ${e}s / เหลือ ${r}s`;
    }
  };
}

// ─── Checkpoint Save / Load ───────────────────────────────────

/**
 * saveCheckpoint — บันทึก Checkpoint ลง PropertiesService
 * (PropertiesService ถาวรกว่า CacheService — ไม่หายหลังสคริปต์หยุด)
 *
 * @param {Object} cp — {
 *   lastProcessedRow: number,   // row number สุดท้ายที่เสร็จ (1-based)
 *   runId: string,              // run ID ของ session นี้
 *   totalDone: number,          // จำนวน row ที่ทำเสร็จ session นี้
 *   totalOk: number,
 *   totalReview: number,
 *   totalError: number,
 *   savedAt: string (ISO),      // เวลาที่บันทึก
 *   sourceLastRow: number       // จำนวน row ทั้งหมดในชีตต้นทาง
 * }
 */
function saveCheckpoint(cp) {
  try {
    const payload = JSON.stringify({ ...cp, savedAt: new Date().toISOString() });
    PropertiesService.getScriptProperties().setProperty(CHECKPOINT_KEY, payload);
    // Cache ด้วยสำหรับ read เร็ว
    CacheService.getScriptCache().put(CHECKPOINT_KEY, payload, CHECKPOINT_CACHE_S);

    writeLog('INFO', '15_CheckpointService', 'saveCheckpoint', cp.runId,
      `💾 Checkpoint saved: row ${cp.lastProcessedRow} | done=${cp.totalDone}`,
      null);
  } catch (e) {
    writeLog('ERROR', '15_CheckpointService', 'saveCheckpoint', null,
      'บันทึก Checkpoint ไม่สำเร็จ: ' + e.message, null);
  }
}

/**
 * loadCheckpoint — โหลด Checkpoint จาก PropertiesService
 * @returns {Object|null} checkpoint object หรือ null ถ้าไม่มี
 */
function loadCheckpoint() {
  try {
    // อ่านจาก Cache ก่อน (เร็วกว่า)
    const cached = CacheService.getScriptCache().get(CHECKPOINT_KEY);
    if (cached) return JSON.parse(cached);

    const stored = PropertiesService.getScriptProperties().getProperty(CHECKPOINT_KEY);
    if (!stored) return null;

    const cp = JSON.parse(stored);
    // Refresh cache
    CacheService.getScriptCache().put(CHECKPOINT_KEY, stored, CHECKPOINT_CACHE_S);
    return cp;
  } catch (e) {
    writeLog('WARN', '15_CheckpointService', 'loadCheckpoint', null,
      'อ่าน Checkpoint ไม่สำเร็จ: ' + e.message, null);
    return null;
  }
}

/**
 * clearCheckpoint — ล้าง Checkpoint เมื่อประมวลผลเสร็จสมบูรณ์
 */
function clearCheckpoint() {
  try {
    PropertiesService.getScriptProperties().deleteProperty(CHECKPOINT_KEY);
    CacheService.getScriptCache().remove(CHECKPOINT_KEY);
    writeLog('INFO', '15_CheckpointService', 'clearCheckpoint', null,
      '🗑 Checkpoint cleared — งานเสร็จสมบูรณ์', null);
  } catch (e) {
    writeLog('WARN', '15_CheckpointService', 'clearCheckpoint', null, e.message, null);
  }
}

/**
 * getCheckpointStatus — แสดงสถานะ Checkpoint ปัจจุบัน (ใช้ใน UI)
 * @returns {Object}
 */
function getCheckpointStatus() {
  const cp = loadCheckpoint();
  if (!cp) return { exists: false, message: 'ไม่มี Checkpoint — จะเริ่มใหม่จาก row แรก' };

  const savedAt = new Date(cp.savedAt);
  const ageMinutes = ((Date.now() - savedAt.getTime()) / 60000).toFixed(1);
  const progress = cp.sourceLastRow > 0
    ? ((cp.lastProcessedRow / cp.sourceLastRow) * 100).toFixed(1) : '?';

  return {
    exists: true,
    lastProcessedRow: cp.lastProcessedRow,
    sourceLastRow:    cp.sourceLastRow,
    progressPct:      progress,
    totalDone:        cp.totalDone,
    totalOk:          cp.totalOk,
    totalReview:      cp.totalReview,
    totalError:       cp.totalError,
    savedAt:          cp.savedAt,
    ageMinutes,
    message: `⏸ มี Checkpoint: row ${cp.lastProcessedRow}/${cp.sourceLastRow} (${progress}%) | บันทึกเมื่อ ${ageMinutes} นาทีที่แล้ว`
  };
}

/**
 * showCheckpointStatus — แสดง Checkpoint Status ผ่าน UI Alert
 * เรียกจากเมนู
 */
function showCheckpointStatus() {
  const status = getCheckpointStatus();
  const ui = SpreadsheetApp.getUi();

  if (!status.exists) {
    ui.alert('📋 Checkpoint Status', status.message, ui.ButtonSet.OK);
    return;
  }

  const msg = [
    `📌 Row ล่าสุดที่ทำ: ${status.lastProcessedRow} / ${status.sourceLastRow}`,
    `📊 Progress: ${status.progressPct}%`,
    `✔ สำเร็จ: ${status.totalOk} | 🔍 Review: ${status.totalReview} | ❌ Error: ${status.totalError}`,
    `⏱ บันทึกเมื่อ: ${status.ageMinutes} นาทีที่แล้ว`,
    '',
    'กด "Run Daily Process" เพื่อทำต่อจากจุดนี้'
  ].join('\n');

  ui.alert('⏸ Checkpoint พบข้อมูลค้าง', msg, ui.ButtonSet.OK);
}

/**
 * resetAndRestart — ล้าง Checkpoint แล้วเริ่มใหม่จาก row แรก
 * ใช้เมื่อต้องการ reprocess ทั้งหมด
 */
function resetAndRestart() {
  const ui = SpreadsheetApp.getUi();
  const resp = ui.alert(
    '⚠ Reset และเริ่มใหม่',
    'ระบบจะล้าง Checkpoint และเริ่ม process ใหม่จาก row แรกทั้งหมด\n\nดำเนินการต่อหรือไม่?',
    ui.ButtonSet.YES_NO
  );
  if (resp !== ui.Button.YES) return;

  clearCheckpoint();
  ui.alert('✅ ล้าง Checkpoint แล้ว', 'กด "Run Daily Process" เพื่อเริ่มใหม่', ui.ButtonSet.OK);
}

// ─── Time-Safe Batch Runner ───────────────────────────────────

/**
 * runWithTimeGuard — Wrapper สำหรับรัน batch loop อย่างปลอดภัย
 *
 * ทำงานดังนี้:
 *   1. โหลด Checkpoint (ถ้ามี) → ข้ามแถวที่เคยทำแล้ว
 *   2. วน loop ทีละแถว พร้อม check เวลาทุกแถว
 *   3. ถ้าใกล้ครบ 5 นาที → บันทึก Checkpoint แล้วหยุด
 *   4. ถ้าทำเสร็จทุกแถว → ล้าง Checkpoint
 *
 * @param {Object[]} allRows        — ข้อมูลทั้งหมดจากชีตต้นทาง
 * @param {Function} processRowFn   — function(row) → { ok, decision }
 * @param {string}   runId          — UUID ของ run นี้
 * @returns {Object} — สรุปผล
 */
function runWithTimeGuard(allRows, processRowFn, runId) {
  const timer = createTimer();

  // ─── โหลด Checkpoint ─────────────────────────────────────
  const checkpoint = loadCheckpoint();
  let startFromRow = 2; // row 2 = แถวข้อมูลแรก (row 1 = header)

  if (checkpoint) {
    startFromRow = checkpoint.lastProcessedRow + 1;
    writeLog('INFO', '15_CheckpointService', 'runWithTimeGuard', runId,
      `▶ ต่อจาก Checkpoint: row ${startFromRow} (เคยทำไป ${checkpoint.totalDone} แถว)`,
      null);
  } else {
    writeLog('INFO', '15_CheckpointService', 'runWithTimeGuard', runId,
      '▶ เริ่มใหม่จาก row 2 (ไม่มี Checkpoint)', null);
  }

  // ─── สถิติ session ปัจจุบัน ────────────────────────────────
  let sessionDone  = 0;
  let sessionOk    = 0;
  let sessionReview = 0;
  let sessionError = 0;
  let lastRowDone  = startFromRow - 1;
  let interrupted  = false;

  // ─── กรอง rows ที่ต้องทำ (≥ startFromRow) ─────────────────
  const pendingRows = allRows.filter(r => r._rowNumber >= startFromRow);

  writeLog('INFO', '15_CheckpointService', 'runWithTimeGuard', runId,
    `📋 แถวที่ต้องทำ: ${pendingRows.length} / ${allRows.length} ทั้งหมด | ${timer.summary()}`,
    null);

  // ─── Main Loop ─────────────────────────────────────────────
  for (const row of pendingRows) {

    // ── Time Guard Check ──────────────────────────────────────
    if (timer.shouldStop()) {
      interrupted = true;
      writeLog('WARN', '15_CheckpointService', 'runWithTimeGuard', runId,
        `⏱ Time Guard: หยุดก่อน Limit | ${timer.summary()} | row ${row._rowNumber}`,
        null);
      break;
    }

    // ── Process Row ───────────────────────────────────────────
    let rowResult = { ok: false, decision: 'ERROR' };
    try {
      rowResult = processRowFn(row);
      sessionDone++;

      if (rowResult.decision === 'REVIEW') sessionReview++;
      else if (rowResult.ok)              sessionOk++;
      else                                sessionError++;

    } catch (rowErr) {
      sessionError++;
      sessionDone++;
      writeLog('ERROR', '15_CheckpointService', 'runWithTimeGuard', runId,
        `❌ Row ${row._rowNumber}: ${rowErr.message}`, null);
    }

    lastRowDone = row._rowNumber;

    // ── Save Checkpoint ทุก 50 แถว ────────────────────────────
    if (sessionDone % 50 === 0) {
      saveCheckpoint({
        runId,
        lastProcessedRow: lastRowDone,
        sourceLastRow:    allRows[allRows.length - 1]?._rowNumber || 0,
        totalDone:  (checkpoint?.totalDone || 0) + sessionDone,
        totalOk:    (checkpoint?.totalOk   || 0) + sessionOk,
        totalReview:(checkpoint?.totalReview || 0) + sessionReview,
        totalError: (checkpoint?.totalError || 0) + sessionError
      });
      writeLog('INFO', '15_CheckpointService', 'runWithTimeGuard', runId,
        `🔖 Auto-checkpoint: row ${lastRowDone} | ${timer.summary()}`, null);
    }
  }

  // ─── บันทึก Checkpoint สุดท้าย หรือ Clear ──────────────────
  const finalCheckpoint = {
    runId,
    lastProcessedRow: lastRowDone,
    sourceLastRow:    allRows[allRows.length - 1]?._rowNumber || 0,
    totalDone:  (checkpoint?.totalDone || 0) + sessionDone,
    totalOk:    (checkpoint?.totalOk   || 0) + sessionOk,
    totalReview:(checkpoint?.totalReview || 0) + sessionReview,
    totalError: (checkpoint?.totalError || 0) + sessionError
  };

  if (interrupted) {
    // ยังทำไม่เสร็จ — บันทึก Checkpoint รอรอบหน้า
    saveCheckpoint(finalCheckpoint);
  } else {
    // เสร็จสมบูรณ์ — ล้าง Checkpoint
    clearCheckpoint();
  }

  return {
    interrupted,
    sessionDone,
    sessionOk,
    sessionReview,
    sessionError,
    lastRowDone,
    pendingCount:  pendingRows.length,
    elapsedSeconds: timer.elapsed(),
    ...finalCheckpoint
  };
}

/**
 * installTimeTrigger — ติดตั้ง Time-based Trigger ให้รันต่อเองอัตโนมัติ
 * เรียกเมื่อ Time Guard ตัด เพื่อให้ระบบรันต่อหลัง 1 นาที
 * @param {string} functionName — ชื่อ function ที่จะ trigger
 */
function installTimeTrigger(functionName) {
  try {
    // ลบ Trigger เก่าของ function นี้ออกก่อน (ป้องกัน duplicate)
    ScriptApp.getProjectTriggers()
      .filter(t => t.getHandlerFunction() === functionName)
      .forEach(t => ScriptApp.deleteTrigger(t));

    // สร้าง Trigger ใหม่: รัน after 1 นาที
    ScriptApp.newTrigger(functionName)
      .timeBased()
      .after(60 * 1000) // 1 นาที (milliseconds)
      .create();

    writeLog('INFO', '15_CheckpointService', 'installTimeTrigger', null,
      `⏰ Auto-trigger ติดตั้ง: ${functionName} จะรันอีกครั้งใน ~1 นาที`, null);
  } catch (e) {
    writeLog('ERROR', '15_CheckpointService', 'installTimeTrigger', null, e.message, null);
  }
}

/**
 * removeSelfTrigger — ลบ Trigger ของตัวเอง (เรียกต้น function ที่ถูก trigger)
 * ป้องกัน Trigger วิ่งซ้ำ
 * @param {string} functionName
 */
function removeSelfTrigger(functionName) {
  try {
    ScriptApp.getProjectTriggers()
      .filter(t => t.getHandlerFunction() === functionName)
      .forEach(t => ScriptApp.deleteTrigger(t));
  } catch (e) {
    // ignore
  }
}

ข้อมูลครบแล้วครับ วิเคราะห์ได้เลย:

7,537 แถว | 77 จังหวัด | 975 รหัสไปรษณีย์
หมายเหตุมี 206 แถว — จัดได้ 6 ประเภท (เฉพาะหมู่ 155, ยกเว้นบางส่วน 5, อาคาร 3 ฯลฯ)

จะทำครบทุกอย่างเลยครับ — Excel ที่ clean + 2 GAS Module ใหม่:Ran 3 commands, created 2 files, read a fileRan 3 commands, created 2 files, read a fileProcess and enrich Thai postal code dataScriptBuild formatted SYS_TH_GEO Excel with enriched columnsScriptModule 16_ThGeoService.gs - Thai postal code integration16_ThGeoService.gsModule 17_ReviewDecisionService.gs - Dropdown decision system with onEdit17_ReviewDecisionService.gsBuild final V003 with all 17 modulesScriptPresented 2 filesDone
✅ CHANGE LOG — VERSION 003
🔍 [1] ส่งมอบ 2 ไฟล์
SYS_TH_GEO_V001.xlsx — ไฟล์ข้อมูลภูมิศาสตร์ไทยที่ Enrich แล้ว 7,537 แถว 16 คอลัมน์
LogisticsMDM_GAS_V003_COMPLETE.gs — โค้ดครบทุก 17 โมดูล 176 functions

📊 [2] SYS_TH_GEO — คอลัมน์ที่เพิ่มใหม่
ระบบเพิ่ม 11 คอลัมน์ จากข้อมูลต้นทาง 5 คอลัมน์:
Colชื่อบทบาทAรหัสไปรษณีย์Key หลัก (5 หลัก zero-padded)B–Eข้อมูลเดิม (renamed)ตามที่ขอFตำบล_cleanตัด "แขวง/ตำบล" ออกGอำเภอ_cleanตัด "เขต/อำเภอ" ออกHตำบล_label'แขวง' หรือ 'ตำบล'Iอำเภอ_label'เขต' หรือ 'อำเภอ'Jtambon_normnormalized ไม่มี space lowercaseKamphoe_normnormalizedLprovince_normnormalizedMsearch_keytambon|amphoe|province — ใช้ lookupNpostal_keypostal|tambon — ใช้ dedupOnote_typeAUTO-classified: FULL_AREA / SPECIFIC_MOO / EXCLUDE_SOME / SPECIFIC_BUILDING / SPECIFIC_ROAD / SPECIFIC_OTHER / CHECK_NOTEPnote_scopeFULL หรือ PARTIAL
หมายเหตุ (คำตอบตรงๆ): ไม่ต้องแปลงอะไรเพิ่มในคอลัมน์ E ครับ ระบบ Auto-classify ให้แล้วใน O+P ส่วนข้อความ E เก็บไว้เป็น reference สำหรับ Admin ตรวจสอบเอง เพราะ logic "ยกเว้น ซอย 73, 75..." นั้นละเอียดเกินกว่าจะ auto-parse ได้ถูกต้อง 100%

🎯 [3] Module 16 — ThGeoService ใช้ทำอะไรได้บ้าง
extractGeoFromAddress("123 แขวงลาดพร้าว เขตลาดพร้าว กทม 10230")
→ { tambon:'ลาดพร้าว', amphoe:'ลาดพร้าว',
    province:'กรุงเทพมหานคร', postal:'10230', confidence:100 }

lookupPostalCode("พระโขนง", "คลองเตย", "กรุงเทพมหานคร")
→ { postal_code:'10110', note_type:'EXCLUDE_SOME', note_scope:'PARTIAL',
    note_raw:'ทั้งแขวง(ยกเว้น ถนนสุขุมวิท...)' }

validateAddressWithGeo("เขตลาดพร้าว กทม", "10230")
→ { valid:true, confidence:95, details:'Postal match: 10230' }
PlaceService จะเรียก extractGeoFromAddress() อัตโนมัติทุกครั้งที่ประมวลผลที่อยู่

🟢 [4] Module 17 — Dropdown Decision Flow
Q_REVIEW มีแถว PENDING
    ↓
Admin คลิก Dropdown ในคอลัมน์ "decision"
    ↓
onEdit → onEditHandler(e) → applyDecisionFromDropdown()
    ↓
🟢 CREATE_NEW         → createPerson + createPlace + createGeoPoint + createDestination
                      → updateFact(personId, placeId, geoId, destId)
                      → Source SYNC_STATUS = PROCESSED

🔵 MERGE_TO_CANDIDATE → createPersonAlias + createPlaceAlias (ระบบเรียนรู้ #4)
                      → resolveDestination ด้วย candidate IDs
                      → updateFact + learnAliasFromReview

🔴 IGNORE             → FACT review_status = IGNORED
                      → Source SYNC_STATUS = IGNORED
    ↓
Q_REVIEW แถวนี้ → status=RESOLVED + สีเปลี่ยน (เขียว/น้ำเงิน/แดง)

🗺️ [5] ขั้นตอนการ Deploy ทั้งหมด (ลำดับ)
1. Import SYS_TH_GEO_V001.xlsx เข้า Google Sheets
   → ชีตชื่อ "SYS_TH_GEO" (ตั้งชื่อให้ตรง)

2. Copy GAS V003 ทั้งหมดลง Apps Script

3. กดเมนู "🔧 ติดตั้งระบบครั้งแรก" → สร้าง 13 ชีต

4. กดเมนู "รัน Daily Process" ครั้งแรก

5. ไปที่ชีต Q_REVIEW → กด "ติดตั้ง Decision Dropdown"

6. กด "ติดตั้ง onEdit Trigger" (ครั้งเดียว)

7. ระบบพร้อมใช้งาน — Admin แค่เลือก Dropdown

💡 [6] ชีต Lookup ในอนาคต (ที่บอกว่าจะเพิ่ม)
เมื่อระบบนิ่งแล้ว ชีตที่เพิ่มได้คือ LOOKUP_REQUEST — User กรอกชื่อลูกค้าหรือที่อยู่ → ระบบ match กลับ M_DESTINATION แล้วคืน LatLong ที่สะอาดแล้ว ผมออกแบบ Schema ให้ได้ทันทีครับ เมื่อพร้อม

// ============================================================
// FILE: 00_App.gs  (UPDATED)
// VERSION: 002
// MODULE: App — Entry Point พร้อม Time Guard + Resume System
// ============================================================

function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('🚚 MDM Logistics')
    .addItem('🔧 ติดตั้งระบบครั้งแรก (Setup)', 'runInitialSetup')
    .addSeparator()
    .addItem('▶ รัน Daily Process', 'runDailyProcess')
    .addItem('⏸ ดูสถานะ Checkpoint', 'showCheckpointStatus')
    .addItem('🔄 Reset และเริ่มใหม่ทั้งหมด', 'resetAndRestart')
    .addSeparator()
    .addItem('🌙 รัน Nightly Maintenance', 'runNightlyMaintenance')
    .addItem('🔁 Reprocess Selected Rows', 'reprocessSelectedRows')
    .addItem('📊 Refresh Quality Report', 'refreshQualityReport')
    .addSeparator()
    .addItem('🔍 ดู Pending Reviews', 'showPendingReviews')
    .addItem('📋 ดู System Log', 'viewRecentLogs')
    .addItem('❓ ตรวจสอบ Schema', 'runSchemaCheck')
    .addToUi();
}

// ─────────────────────────────────────────────────────────────
// MAIN ENTRY POINTS
// ─────────────────────────────────────────────────────────────

/**
 * runDailyProcess — ประมวลผลข้อมูลใหม่ พร้อม Time Guard + Resume
 *
 * FLOW:
 *   1. ตรวจ Schema
 *   2. โหลด Checkpoint (ถ้ามี = ต่อจากที่ค้าง)
 *   3. รัน runWithTimeGuard loop
 *   4. ถ้า Time Guard ตัด → บันทึก Checkpoint + ติดตั้ง Auto-Trigger
 *   5. ถ้าเสร็จ → ล้าง Checkpoint + สรุปผล
 */
function runDailyProcess() {
  // ลบ Trigger ของตัวเองก่อน (กรณีถูก trigger อัตโนมัติ)
  removeSelfTrigger('runDailyProcess');

  const runId = uuid();
  const startTime = new Date();

  try {
    writeLog('INFO', '00_App', 'runDailyProcess', runId, '▶ เริ่ม Daily Process', null);

    // 1. Schema check
    if (!preCheck_Schema()) {
      writeLog('ERROR', '00_App', 'runDailyProcess', runId, 'Schema ไม่ผ่าน — หยุด', null);
      return;
    }

    // 2. แสดง Checkpoint status (ถ้ามี)
    const cpStatus = getCheckpointStatus();
    if (cpStatus.exists) {
      writeLog('INFO', '00_App', 'runDailyProcess', runId,
        `⏸ พบ Checkpoint: ${cpStatus.message}`, null);
    }

    // 3. อ่านทุก row จากชีตต้นทาง (getValues ครั้งเดียว — RULE 6)
    const allRows = getSourceRows();
    if (!allRows || allRows.length === 0) {
      writeLog('INFO', '00_App', 'runDailyProcess', runId,
        'ไม่มีข้อมูลในชีตต้นทาง', null);
      return;
    }

    writeLog('INFO', '00_App', 'runDailyProcess', runId,
      `📊 Source rows ทั้งหมด: ${allRows.length}`, null);

    // 4. รัน Time-Guard Loop ─────────────────────────────────
    const result = runWithTimeGuard(
      allRows,
      (row) => _processOneRow(row, runId),
      runId
    );

    // 5. จัดการผลลัพธ์ ─────────────────────────────────────────

    if (result.interrupted) {
      // ยังทำไม่เสร็จ — ติดตั้ง Auto-Trigger รันต่อ
      installTimeTrigger('runDailyProcess');

      const pct = result.sourceLastRow > 0
        ? ((result.lastRowDone / result.sourceLastRow) * 100).toFixed(1) : '?';

      writeLog('WARN', '00_App', 'runDailyProcess', runId,
        `⏱ Time Guard ตัด: ${pct}% เสร็จ (row ${result.lastRowDone}/${result.sourceLastRow}) ` +
        `| จะ Auto-Continue ใน ~1 นาที`, null);

      // แจ้งใน Spreadsheet cell (ไม่ popup เพราะอาจเป็น background trigger)
      _writeStatusToCell(`⏸ Process ยังไม่เสร็จ: ${pct}% (row ${result.lastRowDone}/${result.sourceLastRow}) — Auto-continue กำลังรอ...`);

    } else {
      // เสร็จสมบูรณ์ทุก row
      writeLog('INFO', '00_App', 'runDailyProcess', runId,
        `✅ เสร็จสมบูรณ์ | session: ok=${result.sessionOk} review=${result.sessionReview} error=${result.sessionError} ` +
        `| รวมทั้งหมด: ok=${result.totalOk} review=${result.totalReview} error=${result.totalError}`,
        JSON.stringify(result));

      // บันทึก Quality Report
      writeReportSnapshot({
        report_date:           startTime,
        total_source_rows:     allRows.length,
        processed_rows:        result.totalDone,
        auto_match_count:      result.totalOk,
        review_count:          result.totalReview,
        error_count:           result.totalError,
        new_person_count:      0,  // อัปเดตใน Nightly
        new_place_count:       0,
        new_geo_count:         0,
        new_destination_count: 0,
        duplicate_alert_count: 0,
        last_refresh_at:       new Date()
      });

      _writeStatusToCell(
        `✅ Process เสร็จ ${new Date().toLocaleString('th-TH')} | ` +
        `ok=${result.sessionOk} review=${result.sessionReview} error=${result.sessionError}`
      );

      // แสดง popup เฉพาะถ้า run แบบ manual
      try {
        SpreadsheetApp.getUi().alert(
          '✅ Daily Process เสร็จสิ้น',
          `ประมวลผล ${result.sessionDone} แถว ใน ${result.elapsedSeconds.toFixed(0)}s\n` +
          `✔ Auto-Match: ${result.sessionOk}\n` +
          `🔍 Review Queue: ${result.sessionReview}\n` +
          `❌ Error: ${result.sessionError}`,
          SpreadsheetApp.getUi().ButtonSet.OK
        );
      } catch (_) { /* Background trigger — ไม่มี UI */ }
    }

  } catch (e) {
    writeLog('ERROR', '00_App', 'runDailyProcess', runId, e.message, null);
    try { SpreadsheetApp.getUi().alert('❌ Error', e.message, SpreadsheetApp.getUi().ButtonSet.OK); }
    catch (_) {}
  }
}

/**
 * _processOneRow — ประมวลผล 1 แถว (ใช้ใน runWithTimeGuard)
 * @param {Object} row
 * @param {string} runId
 * @returns {{ ok: boolean, decision: string }}
 */
function _processOneRow(row, runId) {
  // Normalize
  const normObj = normalizeSourceObject(row);

  // Match Engine
  const resolved = matchAllEntities(normObj);

  // บันทึก FACT + Review Queue
  saveProcessingResult(normObj, resolved);

  // อัปเดต SYNC_STATUS ในชีตต้นทาง
  let newStatus;
  switch (resolved.decision) {
    case 'AUTO_MATCH': newStatus = 'PROCESSED';       break;
    case 'NEW':        newStatus = 'PROCESSED_NEW';   break;
    case 'REVIEW':     newStatus = 'PENDING_REVIEW';  break;
    default:           newStatus = 'PROCESSED';
  }
  updateSourceSyncStatus(row._rowNumber, newStatus);

  return { ok: resolved.decision !== 'REVIEW', decision: resolved.decision };
}

// ─────────────────────────────────────────────────────────────
// SETUP
// ─────────────────────────────────────────────────────────────

function runInitialSetup() {
  const ui = SpreadsheetApp.getUi();
  const resp = ui.alert(
    '🔧 ติดตั้งระบบ MDM',
    'ระบบจะสร้างชีต, config และ header ทั้งหมด\nต้องการดำเนินการต่อหรือไม่?',
    ui.ButtonSet.YES_NO
  );
  if (resp !== ui.Button.YES) return;

  try {
    writeLog('INFO', '00_App', 'runInitialSetup', null, 'เริ่มติดตั้ง', null);
    validateSourceSchema();
    createSystemSheets();
    seedInitialConfig();
    freezeHeaderRows();
    writeLog('INFO', '00_App', 'runInitialSetup', null, 'ติดตั้งสำเร็จ', null);
    ui.alert('✅ ติดตั้งสำเร็จ', 'MDM Logistics พร้อมใช้งาน', ui.ButtonSet.OK);
  } catch (e) {
    writeLog('ERROR', '00_App', 'runInitialSetup', null, e.message, null);
    ui.alert('❌ Error', e.message, ui.ButtonSet.OK);
  }
}

// ─────────────────────────────────────────────────────────────
// MAINTENANCE
// ─────────────────────────────────────────────────────────────

function runNightlyMaintenance() {
  const runId = uuid();
  removeSelfTrigger('runNightlyMaintenance');
  try {
    writeLog('INFO', '00_App', 'runNightlyMaintenance', runId, 'เริ่ม Nightly', null);
    updateAllMasterStats();
    refreshQualityReport();
    purgeOldLogs(90);
    writeLog('INFO', '00_App', 'runNightlyMaintenance', runId, 'Maintenance เสร็จ', null);
  } catch (e) {
    writeLog('ERROR', '00_App', 'runNightlyMaintenance', runId, e.message, null);
  }
}

function reprocessSelectedRows() {
  const ui = SpreadsheetApp.getUi();
  const sheet = SpreadsheetApp.getActiveSheet();
  if (sheet.getName() !== getConfig('SOURCE_SHEET_NAME')) {
    ui.alert('⚠ กรุณา select แถวในชีต ' + getConfig('SOURCE_SHEET_NAME'));
    return;
  }
  const range = sheet.getActiveRange();
  if (!range) { ui.alert('⚠ กรุณาเลือกแถวก่อน'); return; }

  const startRow = range.getRow();
  const numRows  = range.getNumRows();
  const resp = ui.alert('🔁 Reprocess',
    `Reprocess ${numRows} แถว (${startRow}–${startRow + numRows - 1})?`, ui.ButtonSet.YES_NO);
  if (resp !== ui.Button.YES) return;

  const runId = uuid();
  let ok = 0, error = 0;
  for (let r = startRow; r < startRow + numRows; r++) {
    try {
      const row = getSourceRowByNumber(r);
      if (!row) continue;
      _processOneRow(row, runId);
      ok++;
    } catch (e) {
      writeLog('ERROR', '00_App', 'reprocessSelectedRows', runId, `Row ${r}: ${e.message}`, null);
      error++;
    }
  }
  ui.alert('✅ Reprocess เสร็จ', `สำเร็จ: ${ok} | Error: ${error}`, ui.ButtonSet.OK);
}

function showPendingReviews() {
  const reviews = getPendingReviews();
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = ss.getSheetByName(SHEET_NAMES.Q_REVIEW);
  if (sh) ss.setActiveSheet(sh);
  SpreadsheetApp.getUi().alert(
    '🔍 Pending Reviews',
    `มีรายการรอตรวจ: ${reviews.length} รายการ\n(ดูใน Sheet Q_REVIEW)`,
    SpreadsheetApp.getUi().ButtonSet.OK
  );
}

function viewRecentLogs() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = ss.getSheetByName('SYS_LOG');
  if (!sh) { SpreadsheetApp.getUi().alert('ไม่พบ SYS_LOG'); return; }
  ss.setActiveSheet(sh);
  const lastRow = sh.getLastRow();
  if (lastRow > 1) sh.getRange(Math.max(2, lastRow - 30), 1, Math.min(30, lastRow - 1), 9).activate();
}

function runSchemaCheck() {
  try {
    validateSourceSchema();
    SpreadsheetApp.getUi().alert('✅ Schema ถูกต้องครบถ้วน');
  } catch (e) {
    SpreadsheetApp.getUi().alert('❌ Schema Error: ' + e.message);
  }
}

// ─────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────

/**
 * _writeStatusToCell — เขียน Status ลง SYS_CONFIG row 'LAST_RUN_STATUS'
 * เพื่อให้ดูสถานะได้จาก Sheet โดยไม่ต้องเปิด Log
 */
function _writeStatusToCell(message) {
  try {
    setConfig('LAST_RUN_STATUS', message);
    setConfig('LAST_RUN_AT', new Date().toISOString());
  } catch (_) {}
}

function updateAllMasterStats() {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const factSheet = ss.getSheetByName('FACT_DELIVERY');
    if (!factSheet || factSheet.getLastRow() < 2) return;
    const factData = factSheet.getDataRange().getValues();
    const hdr = factData[0];
    const pidIdx = hdr.indexOf('person_id');
    const plcIdx = hdr.indexOf('place_id');
    const geoIdx = hdr.indexOf('geo_id');
    const dateIdx = hdr.indexOf('delivery_date');
    const stats = { person: {}, place: {}, geo: {} };
    for (let i = 1; i < factData.length; i++) {
      const r = factData[i];
      const d = r[dateIdx] ? new Date(r[dateIdx]) : null;
      ['person', 'place', 'geo'].forEach((type, ti) => {
        const idx = [pidIdx, plcIdx, geoIdx][ti];
        if (!r[idx]) return;
        if (!stats[type][r[idx]]) stats[type][r[idx]] = { count: 0, last: null };
        stats[type][r[idx]].count++;
        if (d && (!stats[type][r[idx]].last || d > stats[type][r[idx]].last))
          stats[type][r[idx]].last = d;
      });
    }
    _applyStatsToSheet('M_PERSON', 'person_id', stats.person);
    _applyStatsToSheet('M_PLACE',  'place_id',  stats.place);
    _applyStatsToSheet('M_GEO_POINT', 'geo_id', stats.geo);
  } catch (e) {
    writeLog('ERROR', '00_App', 'updateAllMasterStats', null, e.message, null);
  }
}

function _applyStatsToSheet(sheetName, idCol, statsMap) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = ss.getSheetByName(sheetName);
  if (!sh || sh.getLastRow() < 2) return;
  const data = sh.getDataRange().getValues();
  const hdr = data[0];
  const idIdx = hdr.indexOf(idCol);
  const countIdx = hdr.indexOf('usage_count');
  const lastIdx  = hdr.indexOf('last_seen_date');
  if (idIdx < 0) return;
  for (let i = 1; i < data.length; i++) {
    const id = data[i][idIdx];
    if (!id || !statsMap[id]) continue;
    if (countIdx >= 0) data[i][countIdx] = statsMap[id].count;
    if (lastIdx  >= 0 && statsMap[id].last) data[i][lastIdx] = statsMap[id].last;
  }
  sh.getRange(1, 1, data.length, data[0].length).setValues(data);
}

function purgeOldLogs(daysOld) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sh = ss.getSheetByName('SYS_LOG');
    if (!sh || sh.getLastRow() < 2) return;
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - daysOld);
    const data = sh.getDataRange().getValues();
    const hdr = data[0];
    const dtIdx = hdr.indexOf('created_at');
    if (dtIdx < 0) return;
    const keep = [hdr];
    for (let i = 1; i < data.length; i++) {
      const dt = new Date(data[i][dtIdx]);
      if (isNaN(dt) || dt >= cutoff) keep.push(data[i]);
    }
    sh.clearContents();
    sh.getRange(1, 1, keep.length, keep[0].length).setValues(keep);
  } catch (e) {
    writeLog('WARN', '00_App', 'purgeOldLogs', null, e.message, null);
  }
}
// ============================================================
// FILE: 01_Config.gs
// VERSION: 001
// MODULE: Config — จัดการค่าคงที่และค่าตั้งค่าระบบ
// ============================================================

/**
 * SHEET_NAMES — ชื่อชีตทั้งหมดในระบบ (Source of Truth)
 */
const SHEET_NAMES = {
  SOURCE:       'SCGนครหลวงJWDภูมิภาค',
  M_PERSON:     'M_PERSON',
  M_PERSON_ALIAS:'M_PERSON_ALIAS',
  M_PLACE:      'M_PLACE',
  M_PLACE_ALIAS:'M_PLACE_ALIAS',
  M_GEO_POINT:  'M_GEO_POINT',
  M_DESTINATION:'M_DESTINATION',
  FACT_DELIVERY:'FACT_DELIVERY',
  Q_REVIEW:     'Q_REVIEW',
  SYS_CONFIG:   'SYS_CONFIG',
  SYS_LOG:      'SYS_LOG',
  RPT_QUALITY:  'RPT_DATA_QUALITY'
};

/**
 * C_IDX — Column Index Map ของชีตต้นทาง (0-based)
 * RULE 3: อ้างอิงจากนี้เสมอ ห้าม hardcode ตัวเลข
 */
const C_IDX = {
  SOURCE: {
    HEAD:            0,
    ID:              1,
    DELIVERY_DATE:   2,
    DELIVERY_TIME:   3,
    GEO_POINT:       4,   // "จุดส่งสินค้าปลายทาง" = "lat, long" string
    DRIVER_NAME:     5,
    LICENSE_PLATE:   6,
    SHIPMENT_NO:     7,
    INVOICE_NO:      8,
    BILL_PHOTO:      9,
    CUSTOMER_CODE:   10,
    OWNER_NAME:      11,  // ชื่อเจ้าของสินค้า (บริษัท)
    DEST_NAME:       12,  // ชื่อปลายทาง ← ตัวปัญหาหลัก
    EMP_EMAIL:       13,
    LAT:             14,
    LONG:            15,
    DOC_RETURN_ID:   16,
    WAREHOUSE:       17,
    ADDRESS:         18,  // ที่อยู่ปลายทาง (มั่วๆ จากระบบ)
    PHOTO_GOODS:     19,
    PHOTO_STORE:     20,
    NOTE:            21,
    MONTH:           22,
    DISTANCE_KM:     23,
    ADDRESS_LATLONG: 24,  // ชื่อที่อยู่จาก LatLong (แปลงด้วย script)
    SM_LINK:         25,
    EMP_ID:          26,
    GPS_RECORD:      27,
    TIME_START:      28,
    TIME_SUCCESS:    29,
    MOVE_DISTANCE_M: 30,
    DURATION_MIN:    31,
    SPEED_M_MIN:     32,
    VALIDATION:      33,  // ผลการตรวจสอบงานส่ง
    ANOMALY:         34,  // เหตุผิดปกติ
    PHOTO_TIME:      35,
    SYNC_STATUS:     36
  }
};

// ค่า Default สำหรับ SYS_CONFIG ที่จะ seed ครั้งแรก
const DEFAULT_CONFIG = {
  SOURCE_SHEET_NAME:      SHEET_NAMES.SOURCE,
  AUTO_MATCH_SCORE:       '90',
  REVIEW_SCORE_MIN:       '70',
  GEO_RADIUS_METER:       '50',
  GEO_KEY_PRECISION:      '6',
  MAX_BATCH_SIZE:         '500',
  LOG_RETENTION_DAYS:     '90',
  ENABLE_FUZZY_MATCH:     'true',
  FUZZY_MIN_LENGTH:       '3',
  WAREHOUSE_LAT:          '14.165716',
  WAREHOUSE_LONG:         '100.625296',
  VERSION:                '001'
};

// ─────────────────────────────────────────────
// PUBLIC FUNCTIONS
// ─────────────────────────────────────────────

/**
 * getConfig — อ่านค่า config จากชีต SYS_CONFIG
 * ใช้ CacheService เพื่อลด sheet read (cache 6 ชั่วโมง)
 * @param {string} key - ชื่อ config key
 * @returns {string|null}
 */
function getConfig(key) {
  const cache = CacheService.getScriptCache();
  const cacheKey = 'CFG_' + key;
  const cached = cache.get(cacheKey);
  if (cached !== null) return cached;

  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sh = ss.getSheetByName(SHEET_NAMES.SYS_CONFIG);
    if (!sh) return DEFAULT_CONFIG[key] || null;

    const data = sh.getDataRange().getValues();
    for (let i = 1; i < data.length; i++) {
      if (data[i][0] === key) {
        const val = String(data[i][1]);
        cache.put(cacheKey, val, 21600); // RULE 6: cache 6 ชม.
        return val;
      }
    }
    return DEFAULT_CONFIG[key] || null;
  } catch (e) {
    return DEFAULT_CONFIG[key] || null;
  }
}

/**
 * getAllConfigs — อ่าน config ทั้งหมดเป็น object
 * @returns {Object}
 */
function getAllConfigs() {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sh = ss.getSheetByName(SHEET_NAMES.SYS_CONFIG);
    if (!sh) return { ...DEFAULT_CONFIG };

    const data = sh.getDataRange().getValues();
    const result = { ...DEFAULT_CONFIG };
    for (let i = 1; i < data.length; i++) {
      if (data[i][0]) result[data[i][0]] = String(data[i][1]);
    }
    return result;
  } catch (e) {
    return { ...DEFAULT_CONFIG };
  }
}

/**
 * setConfig — บันทึกค่า config และ clear cache
 * @param {string} key
 * @param {string} value
 */
function setConfig(key, value) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sh = ss.getSheetByName(SHEET_NAMES.SYS_CONFIG);
    if (!sh) return;

    const data = sh.getDataRange().getValues();
    for (let i = 1; i < data.length; i++) {
      if (data[i][0] === key) {
        sh.getRange(i + 1, 2).setValue(value);
        sh.getRange(i + 1, 5).setValue(new Date());
        CacheService.getScriptCache().remove('CFG_' + key);
        return;
      }
    }
    // ถ้าไม่มี key เดิม — เพิ่มแถวใหม่
    sh.appendRow([key, value, 'MANUAL', '', new Date()]);
    CacheService.getScriptCache().remove('CFG_' + key);
  } catch (e) {
    writeLog('ERROR', '01_Config', 'setConfig', null, e.message, null);
  }
}

/**
 * getThresholds — ดึงค่า threshold ทั้งหมดที่ใช้ใน MatchEngine
 * @returns {Object}
 */
function getThresholds() {
  return {
    autoMatch:   parseFloat(getConfig('AUTO_MATCH_SCORE'))  || 90,
    reviewMin:   parseFloat(getConfig('REVIEW_SCORE_MIN'))  || 70,
    geoRadius:   parseFloat(getConfig('GEO_RADIUS_METER'))  || 50,
    geoPrecision:parseInt(getConfig('GEO_KEY_PRECISION'))   || 6,
    maxBatch:    parseInt(getConfig('MAX_BATCH_SIZE'))       || 500,
    fuzzyOn:     getConfig('ENABLE_FUZZY_MATCH') === 'true',
    fuzzyMinLen: parseInt(getConfig('FUZZY_MIN_LENGTH'))    || 3
  };
}

/**
 * getSheetNames — คืนค่า SHEET_NAMES object
 * @returns {Object}
 */
function getSheetNames() {
  return { ...SHEET_NAMES };
}

/**
 * invalidateConfigCache — ล้าง Cache ทั้งหมด (เรียกหลัง setConfig หลายตัว)
 */
function invalidateConfigCache() {
  CacheService.getScriptCache().removeAll(
    Object.keys(DEFAULT_CONFIG).map(k => 'CFG_' + k)
  );
}
// ============================================================
// FILE: 02_Schema.gs
// VERSION: 001
// MODULE: Schema — ตรวจสอบโครงสร้างชีตและ Headers
// ============================================================

// Header definitions สำหรับแต่ละชีต Master
const SHEET_HEADERS = {
  M_PERSON: [
    'person_id','person_name_canonical','person_name_normalized',
    'first_seen_date','last_seen_date','usage_count','status','note'
  ],
  M_PERSON_ALIAS: [
    'person_alias_id','person_id','alias_raw','alias_normalized',
    'source_field','first_seen_date','last_seen_date','usage_count','active_flag'
  ],
  M_PLACE: [
    'place_id','place_name_canonical','place_name_normalized',
    'address_best','address_normalized','warehouse_default',
    'first_seen_date','last_seen_date','usage_count','status','note'
  ],
  M_PLACE_ALIAS: [
    'place_alias_id','place_id','alias_raw','alias_normalized',
    'source_field','first_seen_date','last_seen_date','usage_count','active_flag'
  ],
  M_GEO_POINT: [
    'geo_id','lat_raw','long_raw','lat_norm','long_norm',
    'geo_key_6','geo_key_5','geo_key_4',
    'address_from_latlong_best','first_seen_date','last_seen_date','usage_count','note'
  ],
  M_DESTINATION: [
    'destination_id','person_id','place_id','geo_id',
    'destination_label_canonical','destination_key',
    'confidence_status','first_seen_date','last_seen_date','usage_count','note'
  ],
  FACT_DELIVERY: [
    'tx_id','source_sheet','source_row_number','source_record_id',
    'delivery_date','delivery_time','shipment_no','invoice_no',
    'owner_name','customer_code','raw_person_name','raw_place_name',
    'raw_address','raw_lat','raw_long',
    'person_id','place_id','geo_id','destination_id',
    'warehouse','distance_km','driver_name','employee_id','employee_email',
    'license_plate','validation_result','anomaly_reason',
    'review_status','sync_status','created_at','updated_at'
  ],
  Q_REVIEW: [
    'review_id','issue_type','source_record_id','source_row_number',
    'invoice_no','raw_person_name','raw_place_name','raw_lat','raw_long',
    'candidate_person_ids','candidate_place_ids','candidate_geo_ids',
    'candidate_destination_ids','score','recommended_action',
    'status','reviewer','reviewed_at','decision','note'
  ],
  SYS_CONFIG: [
    'config_key','config_value','config_group','description','updated_at'
  ],
  SYS_LOG: [
    'log_id','run_id','created_at','level','module_name',
    'function_name','ref_id','message','payload_json'
  ],
  RPT_DATA_QUALITY: [
    'report_date','total_source_rows','processed_rows',
    'new_person_count','new_place_count','new_geo_count','new_destination_count',
    'auto_match_count','review_count','duplicate_alert_count',
    'error_count','last_refresh_at'
  ]
};

// คอลัมน์บังคับที่ต้องมีในชีตต้นทาง (ตรวจจาก C_IDX)
const SOURCE_REQUIRED_COLUMNS = [
  'ID_SCGนครหลวงJWDภูมิภาค',
  'วันที่ส่งสินค้า',
  'ชื่อปลายทาง',
  'LAT',
  'LONG',
  'Invoice No',
  'SYNC_STATUS'
];

// ─────────────────────────────────────────────
// PUBLIC FUNCTIONS
// ─────────────────────────────────────────────

/**
 * validateSourceSchema — ตรวจสอบ header ชีตต้นทางว่าครบหรือไม่
 * @throws Error ถ้า column สำคัญหายไป
 */
function validateSourceSchema() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = ss.getSheetByName(SHEET_NAMES.SOURCE);
  if (!sh) throw new Error(`ไม่พบชีตต้นทาง: ${SHEET_NAMES.SOURCE}`);

  const headers = sh.getRange(1, 1, 1, sh.getLastColumn()).getValues()[0];
  const missing = SOURCE_REQUIRED_COLUMNS.filter(col => !headers.includes(col));

  if (missing.length > 0) {
    throw new Error(`ชีตต้นทางขาด column: ${missing.join(', ')}`);
  }
  return true;
}

/**
 * ensureSystemSheets — ตรวจสอบว่าชีตระบบมีครบและ header ถูกต้อง
 * @returns {Object} { ok: boolean, missing: string[], fixed: string[] }
 */
function ensureSystemSheets() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const result = { ok: true, missing: [], fixed: [] };

  for (const [sheetKey, headers] of Object.entries(SHEET_HEADERS)) {
    const sheetName = SHEET_NAMES[sheetKey] || sheetKey;
    let sh = ss.getSheetByName(sheetName);

    if (!sh) {
      // สร้างชีตใหม่
      sh = ss.insertSheet(sheetName);
      sh.getRange(1, 1, 1, headers.length).setValues([headers]);
      result.missing.push(sheetName);
      result.fixed.push(sheetName);
      writeLog('INFO', '02_Schema', 'ensureSystemSheets', null,
        `สร้างชีตใหม่: ${sheetName}`, null);
    } else {
      // ตรวจสอบ header
      const ok = _verifyHeaders(sh, headers);
      if (!ok) {
        createHeadersIfMissing(sh, headers);
        result.fixed.push(sheetName);
      }
    }
  }

  result.ok = result.missing.length === 0;
  return result;
}

/**
 * createHeadersIfMissing — เพิ่ม header ที่หายไปต่อท้าย (RULE 2)
 * @param {Sheet} sh
 * @param {string[]} expectedHeaders
 */
function createHeadersIfMissing(sh, expectedHeaders) {
  const existingHeaders = sh.getLastColumn() > 0
    ? sh.getRange(1, 1, 1, sh.getLastColumn()).getValues()[0]
    : [];

  const toAdd = expectedHeaders.filter(h => !existingHeaders.includes(h));
  if (toAdd.length === 0) return;

  // RULE 2: เพิ่มต่อท้ายเท่านั้น
  const startCol = (sh.getLastColumn() || 0) + 1;
  sh.getRange(1, startCol, 1, toAdd.length).setValues([toAdd]);
  writeLog('INFO', '02_Schema', 'createHeadersIfMissing', null,
    `เพิ่ม header ใน ${sh.getName()}: ${toAdd.join(', ')}`, null);
}

/**
 * getSourceColumnMap — แมป header name → column index (1-based) ของชีตต้นทาง
 * @returns {Object}
 */
function getSourceColumnMap() {
  const cache = CacheService.getScriptCache();
  const cached = cache.get('SOURCE_COL_MAP');
  if (cached) return JSON.parse(cached);

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = ss.getSheetByName(SHEET_NAMES.SOURCE);
  if (!sh) return {};

  const headers = sh.getRange(1, 1, 1, sh.getLastColumn()).getValues()[0];
  const map = {};
  headers.forEach((h, i) => { if (h) map[h] = i + 1; });

  cache.put('SOURCE_COL_MAP', JSON.stringify(map), 21600);
  return map;
}

/**
 * assertRequiredColumns — throw ถ้า sheet ไม่มี column ที่ระบุ
 * @param {Sheet} sh
 * @param {string[]} required
 */
function assertRequiredColumns(sh, required) {
  const headers = sh.getRange(1, 1, 1, sh.getLastColumn()).getValues()[0];
  const missing = required.filter(c => !headers.includes(c));
  if (missing.length > 0) {
    throw new Error(`${sh.getName()} ขาด column: ${missing.join(', ')}`);
  }
}

/**
 * preCheck_Schema — guard ตรวจ schema ก่อนงานสำคัญ (RULE 7)
 * @returns {boolean}
 */
function preCheck_Schema() {
  try {
    validateSourceSchema();
    return true;
  } catch (e) {
    writeLog('ERROR', '02_Schema', 'preCheck_Schema', null, e.message, null);
    return false;
  }
}

// ─────────────────────────────────────────────
// PRIVATE HELPERS
// ─────────────────────────────────────────────

function _verifyHeaders(sh, expectedHeaders) {
  if (sh.getLastColumn() === 0) return false;
  const existing = sh.getRange(1, 1, 1, sh.getLastColumn()).getValues()[0];
  return expectedHeaders.every(h => existing.includes(h));
}
// ============================================================
// FILE: 03_SetupSheets.gs
// VERSION: 001
// MODULE: SetupSheets — สร้างชีตระบบครั้งแรกพร้อม format
// ============================================================

// สีหัว Header แต่ละกลุ่มชีต
const HEADER_COLORS = {
  SOURCE:      '#C73B20',  // แดง-ส้ม = Raw data (อันตราย)
  MASTER:      '#0F6E56',  // เขียวเข้ม = Master data
  ALIAS:       '#185FA5',  // น้ำเงิน = Alias / Sub
  FACT:        '#534AB7',  // ม่วง = Fact / Transaction
  REVIEW:      '#854F0B',  // น้ำตาล = Queue / Review
  SYSTEM:      '#444441',  // เทาเข้ม = System / Config
};

// ─────────────────────────────────────────────
// PUBLIC FUNCTIONS
// ─────────────────────────────────────────────

/**
 * createSystemSheets — สร้างชีตระบบทั้งหมด 11 ชีต (ไม่รวม Source)
 */
function createSystemSheets() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  const sheetConfigs = [
    { key:'M_PERSON',      color: HEADER_COLORS.MASTER },
    { key:'M_PERSON_ALIAS',color: HEADER_COLORS.ALIAS },
    { key:'M_PLACE',       color: HEADER_COLORS.MASTER },
    { key:'M_PLACE_ALIAS', color: HEADER_COLORS.ALIAS },
    { key:'M_GEO_POINT',   color: HEADER_COLORS.MASTER },
    { key:'M_DESTINATION', color: HEADER_COLORS.MASTER },
    { key:'FACT_DELIVERY', color: HEADER_COLORS.FACT },
    { key:'Q_REVIEW',      color: HEADER_COLORS.REVIEW },
    { key:'SYS_CONFIG',    color: HEADER_COLORS.SYSTEM },
    { key:'SYS_LOG',       color: HEADER_COLORS.SYSTEM },
    { key:'RPT_QUALITY',   color: HEADER_COLORS.SYSTEM }
  ];

  for (const cfg of sheetConfigs) {
    const sheetName = SHEET_NAMES[cfg.key];
    let sh = ss.getSheetByName(sheetName);

    if (!sh) {
      sh = ss.insertSheet(sheetName);
      writeLog('INFO', '03_SetupSheets', 'createSystemSheets', null,
        `สร้างชีตใหม่: ${sheetName}`, null);
    }

    const headers = SHEET_HEADERS[cfg.key];
    if (headers) {
      sh.getRange(1, 1, 1, headers.length).setValues([headers]);
      applyHeaderFormatting(sh, headers.length, cfg.color);
    }
  }

  // ป้องกันชีตต้นทาง
  setupSourceSheetProtection();
}

/**
 * applyHeaderFormatting — จัด format หัวตาราง
 * @param {Sheet} sh
 * @param {number} numCols
 * @param {string} bgColor
 */
function applyHeaderFormatting(sh, numCols, bgColor) {
  const headerRange = sh.getRange(1, 1, 1, numCols);
  headerRange
    .setBackground(bgColor)
    .setFontColor('#FFFFFF')
    .setFontWeight('bold')
    .setFontSize(10)
    .setBorder(true, true, true, true, true, true)
    .setHorizontalAlignment('center');

  // Column widths
  sh.setColumnWidth(1, 160);
  for (let c = 2; c <= numCols; c++) sh.setColumnWidth(c, 140);

  // สีแถวสลับ (banding)
  try {
    const existingBandings = sh.getBandings();
    existingBandings.forEach(b => b.remove());
    sh.getRange(1, 1, Math.max(sh.getMaxRows(), 100), numCols)
      .applyRowBanding(SpreadsheetApp.BandingTheme.LIGHT_GREY, true, false);
  } catch (e) {
    // Banding error — skip
  }
}

/**
 * freezeHeaderRows — ตรึงแถวที่ 1 ของทุกชีต
 */
function freezeHeaderRows() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  for (const sheetName of Object.values(SHEET_NAMES)) {
    const sh = ss.getSheetByName(sheetName);
    if (sh) sh.setFrozenRows(1);
  }
}

/**
 * setupSourceSheetProtection — ตั้ง Protection บนชีตต้นทาง
 * RULE 4: ป้องกันการแก้ไขข้อมูลดิบโดยไม่ตั้งใจ
 */
function setupSourceSheetProtection() {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sh = ss.getSheetByName(SHEET_NAMES.SOURCE);
    if (!sh) return;

    // ลบ protection เดิมออกก่อน
    sh.getProtections(SpreadsheetApp.ProtectionType.SHEET)
      .forEach(p => p.remove());

    // ตั้ง protection ใหม่
    const protection = sh.protect()
      .setDescription('Raw Source — แก้ไขผ่านระบบ MDM เท่านั้น')
      .setWarningOnly(true); // ให้ยังแก้ได้แต่มี warning

    writeLog('INFO', '03_SetupSheets', 'setupSourceSheetProtection', null,
      'ตั้ง Protection บนชีตต้นทางแล้ว (Warning Only Mode)', null);
  } catch (e) {
    writeLog('WARN', '03_SetupSheets', 'setupSourceSheetProtection', null,
      e.message, null);
  }
}

/**
 * seedInitialConfig — ใส่ค่า Config เริ่มต้นลงใน SYS_CONFIG
 */
function seedInitialConfig() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = ss.getSheetByName(SHEET_NAMES.SYS_CONFIG);
  if (!sh) return;

  // อ่าน key ที่มีอยู่แล้ว
  const existingData = sh.getLastRow() > 1
    ? sh.getRange(2, 1, sh.getLastRow() - 1, 1).getValues().flat()
    : [];

  const now = new Date();
  const rows = [];

  const configDefinitions = [
    ['SOURCE_SHEET_NAME',  SHEET_NAMES.SOURCE,    'SHEET',     'ชื่อชีตต้นทาง'],
    ['AUTO_MATCH_SCORE',   '90',                  'THRESHOLD', 'คะแนนขั้นต่ำสำหรับ Auto Match (%)'],
    ['REVIEW_SCORE_MIN',   '70',                  'THRESHOLD', 'คะแนนขั้นต่ำสำหรับส่ง Review (%)'],
    ['GEO_RADIUS_METER',   '50',                  'GEO',       'รัศมีสำหรับถือว่าพิกัดเดียวกัน (เมตร)'],
    ['GEO_KEY_PRECISION',  '6',                   'GEO',       'ทศนิยม Geo Key ระดับสูงสุด'],
    ['MAX_BATCH_SIZE',     '500',                 'SYSTEM',    'จำนวนแถวสูงสุดต่อ batch'],
    ['LOG_RETENTION_DAYS', '90',                  'SYSTEM',    'เก็บ Log กี่วัน'],
    ['ENABLE_FUZZY_MATCH', 'true',                'MATCH',     'เปิด/ปิด Fuzzy Matching'],
    ['FUZZY_MIN_LENGTH',   '3',                   'MATCH',     'ความยาวขั้นต่ำสำหรับ Fuzzy'],
    ['WAREHOUSE_LAT',      '14.165716',           'GEO',       'ละติจูดคลัง SCG วังน้อย'],
    ['WAREHOUSE_LONG',     '100.625296',          'GEO',       'ลองจิจูดคลัง SCG วังน้อย'],
    ['VERSION',            '001',                 'SYSTEM',    'Version ของระบบ MDM'],
  ];

  for (const [key, value, group, desc] of configDefinitions) {
    if (!existingData.includes(key)) {
      rows.push([key, value, group, desc, now]);
    }
  }

  if (rows.length > 0) {
    const startRow = sh.getLastRow() + 1;
    sh.getRange(startRow, 1, rows.length, 5).setValues(rows);
    writeLog('INFO', '03_SetupSheets', 'seedInitialConfig', null,
      `เพิ่ม config ${rows.length} รายการ`, null);
  }

  invalidateConfigCache();
}
// ============================================================
// FILE: 04_SourceRepository.gs
// VERSION: 001
// MODULE: SourceRepository — อ่านและจัดการข้อมูลจากชีตต้นทาง
// ============================================================

/**
 * getSourceRows — อ่านข้อมูลทั้งหมดจากชีตต้นทาง
 * @returns {Object[]} array of row objects
 */
function getSourceRows() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = ss.getSheetByName(SHEET_NAMES.SOURCE);
  if (!sh || sh.getLastRow() < 2) return [];

  const data = sh.getDataRange().getValues(); // RULE 6: getValues() เทเสมอ
  const result = [];
  for (let i = 1; i < data.length; i++) {
    const obj = mapRowToSourceObject(data[i], i + 1);
    if (obj && obj.source_id) result.push(obj);
  }
  return result;
}

/**
 * getUnprocessedSourceRows — อ่านเฉพาะแถวที่ SYNC_STATUS ไม่ใช่ PROCESSED
 * @returns {Object[]}
 */
function getUnprocessedSourceRows() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = ss.getSheetByName(SHEET_NAMES.SOURCE);
  if (!sh || sh.getLastRow() < 2) return [];

  const maxBatch = parseInt(getConfig('MAX_BATCH_SIZE')) || 500;
  const data = sh.getDataRange().getValues();
  const result = [];

  const SKIP_STATUSES = ['PROCESSED', 'REPROCESSED', 'ARCHIVED'];

  for (let i = 1; i < data.length; i++) {
    const syncStatus = String(data[i][C_IDX.SOURCE.SYNC_STATUS] || '').trim();
    if (SKIP_STATUSES.includes(syncStatus)) continue;

    const obj = mapRowToSourceObject(data[i], i + 1);
    if (obj && obj.source_id) {
      result.push(obj);
      if (result.length >= maxBatch) break;
    }
  }

  return result;
}

/**
 * getSourceRowByNumber — อ่านแถวเดียวตาม row number (1-based)
 * @param {number} rowNumber
 * @returns {Object|null}
 */
function getSourceRowByNumber(rowNumber) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = ss.getSheetByName(SHEET_NAMES.SOURCE);
  if (!sh || rowNumber < 2) return null;

  const numCols = sh.getLastColumn();
  const rowData = sh.getRange(rowNumber, 1, 1, numCols).getValues()[0];
  return mapRowToSourceObject(rowData, rowNumber);
}

/**
 * mapRowToSourceObject — แปลง raw array → structured object
 * RULE 3: ใช้ C_IDX เสมอ ห้าม hardcode index
 * @param {Array} row
 * @param {number} rowNumber
 * @returns {Object}
 */
function mapRowToSourceObject(row, rowNumber) {
  try {
    const idx = C_IDX.SOURCE;
    const sourceId = safeString(row[idx.ID]);
    if (!sourceId) return null;

    // แยก lat/long จาก "จุดส่งสินค้าปลายทาง" เช่น "13.631403, 100.548684"
    const geoPointStr = safeString(row[idx.GEO_POINT]);
    const [geoLat, geoLong] = _parseLatLongString(geoPointStr);

    // lat/long จากคอลัมน์ตรง
    const latDirect  = safeNumber(row[idx.LAT]);
    const longDirect = safeNumber(row[idx.LONG]);

    // ใช้ค่าตรงก่อน ถ้าไม่มีใช้ค่าจาก GEO_POINT string
    const finalLat  = latDirect  || geoLat;
    const finalLong = longDirect || geoLong;

    return {
      _rowNumber:       rowNumber,
      _sheetName:       SHEET_NAMES.SOURCE,
      source_id:        sourceId,
      delivery_date:    safeDate(row[idx.DELIVERY_DATE]),
      delivery_time:    safeString(row[idx.DELIVERY_TIME]),
      geo_point_raw:    geoPointStr,
      driver_name:      safeString(row[idx.DRIVER_NAME]),
      license_plate:    safeString(row[idx.LICENSE_PLATE]),
      shipment_no:      safeString(row[idx.SHIPMENT_NO]),
      invoice_no:       safeString(row[idx.INVOICE_NO]),
      customer_code:    safeString(row[idx.CUSTOMER_CODE]),
      owner_name:       safeString(row[idx.OWNER_NAME]),
      dest_name_raw:    safeString(row[idx.DEST_NAME]),    // ชื่อปลายทาง (ตัวปัญหา)
      employee_email:   safeString(row[idx.EMP_EMAIL]),
      lat:              finalLat,
      long:             finalLong,
      doc_return_id:    safeString(row[idx.DOC_RETURN_ID]),
      warehouse:        safeString(row[idx.WAREHOUSE]),
      address_raw:      safeString(row[idx.ADDRESS]),       // ที่อยู่มั่วๆ
      note:             safeString(row[idx.NOTE]),
      month:            safeString(row[idx.MONTH]),
      distance_km:      safeNumber(row[idx.DISTANCE_KM]),
      address_latlong:  safeString(row[idx.ADDRESS_LATLONG]), // แปลงจาก LatLong
      employee_id:      safeString(row[idx.EMP_ID]),
      gps_record_raw:   safeString(row[idx.GPS_RECORD]),
      time_start:       safeString(row[idx.TIME_START]),
      time_success:     safeString(row[idx.TIME_SUCCESS]),
      move_distance_m:  safeNumber(row[idx.MOVE_DISTANCE_M]),
      duration_min:     safeString(row[idx.DURATION_MIN]),
      speed_m_min:      safeNumber(row[idx.SPEED_M_MIN]),
      validation_result:safeString(row[idx.VALIDATION]),
      anomaly_reason:   safeString(row[idx.ANOMALY]),
      photo_time:       safeString(row[idx.PHOTO_TIME]),
      sync_status:      safeString(row[idx.SYNC_STATUS])
    };
  } catch (e) {
    writeLog('ERROR', '04_SourceRepository', 'mapRowToSourceObject', null,
      `Row ${rowNumber}: ${e.message}`, null);
    return null;
  }
}

/**
 * markSourceRowProcessed — อัปเดต SYNC_STATUS = 'PROCESSED'
 * @param {number} rowNumber
 */
function markSourceRowProcessed(rowNumber) {
  updateSourceSyncStatus(rowNumber, 'PROCESSED');
}

/**
 * updateSourceSyncStatus — อัปเดต SYNC_STATUS ในชีตต้นทาง
 * @param {number} rowNumber
 * @param {string} status
 */
function updateSourceSyncStatus(rowNumber, status) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sh = ss.getSheetByName(SHEET_NAMES.SOURCE);
    if (!sh) return;

    const syncCol = C_IDX.SOURCE.SYNC_STATUS + 1; // +1 เพราะ getRange ใช้ 1-based
    sh.getRange(rowNumber, syncCol).setValue(status);
  } catch (e) {
    writeLog('ERROR', '04_SourceRepository', 'updateSourceSyncStatus', null,
      `Row ${rowNumber}: ${e.message}`, null);
  }
}

// ─────────────────────────────────────────────
// PRIVATE HELPERS
// ─────────────────────────────────────────────

/**
 * _parseLatLongString — แยก lat, long จาก string "13.631403, 100.548684"
 * @param {string} str
 * @returns {[number, number]}
 */
function _parseLatLongString(str) {
  if (!str) return [0, 0];
  const parts = str.replace(/['"]/g, '').split(',');
  if (parts.length < 2) return [0, 0];
  const lat  = parseFloat(parts[0].trim());
  const long = parseFloat(parts[1].trim());
  return [isNaN(lat) ? 0 : lat, isNaN(long) ? 0 : long];
}
// ============================================================
// FILE: 05_NormalizeService.gs
// VERSION: 001
// MODULE: NormalizeService — ทำความสะอาดและ normalize ข้อมูล
// ============================================================

// Stop words ที่ตัดออกจากชื่อบุคคล (ภาษาไทย)
const PERSON_STOP_WORDS = [
  'คุณ','นาย','นาง','นางสาว','นส.','ดร.','อ.','ผศ.',
  'รศ.','ศ.','พ.ต.','พ.ท.','พ.อ.',
  'ช่าง','ร้าน','บ้าน','โทร','tel','โทรศัพท์'
];

// Stop words สำหรับชื่อบริษัท/นิติบุคคล
const COMPANY_STOP_WORDS = [
  'บริษัท','บจก.','จำกัด','จก.','ห้างหุ้นส่วน','หจก.',
  'ห้าง','สาขา','branch','co.,ltd','co.ltd','ltd',
  'company','limited','corp','corporation','inc'
];

// Pattern สำหรับตัดเบอร์โทรออก: "โทร.0639656564", "tel.08XXXX"
const PHONE_PATTERN = /(?:โทร\.?|tel\.?|โทรศัพท์\.?)[\s]?[\d\-\(\)\s]{8,}/gi;
const PARENTHESIS_PHONE = /\(\d{9,12}\)/g;

// ─────────────────────────────────────────────
// PUBLIC FUNCTIONS
// ─────────────────────────────────────────────

/**
 * normalizeSourceObject — normalize ข้อมูลทั้ง source object
 * @param {Object} sourceObj (จาก mapRowToSourceObject)
 * @returns {Object} sourceObj + normalized fields
 */
function normalizeSourceObject(sourceObj) {
  const norm = { ...sourceObj };

  norm.person_name_norm    = normalizePersonName(sourceObj.dest_name_raw);
  norm.place_name_norm     = normalizePlaceName(sourceObj.address_latlong || sourceObj.address_raw);
  norm.address_norm        = normalizeAddress(sourceObj.address_raw);
  norm.address_latlong_norm = normalizeAddress(sourceObj.address_latlong);
  norm.owner_name_norm     = normalizeCompanyName(sourceObj.owner_name);

  const geoNorm = normalizeLatLong(sourceObj.lat, sourceObj.long);
  norm.lat_norm  = geoNorm.lat;
  norm.long_norm = geoNorm.long;
  norm.geo_keys  = buildGeoKeys(geoNorm.lat, geoNorm.long);
  norm.fingerprint = buildFingerprint(norm);

  return norm;
}

/**
 * normalizeThaiText — ล้างข้อความภาษาไทยทั่วไป
 * - ตัด whitespace ซ้ำ, trim, lowercase, full-width → half-width
 * @param {string} text
 * @returns {string}
 */
function normalizeThaiText(text) {
  if (!text) return '';
  return String(text)
    .replace(/\uFF01-\uFF5E/g, c => String.fromCharCode(c.charCodeAt(0) - 0xFEE0)) // Full→Half width
    .replace(/\u3000/g, ' ')         // Ideographic space → normal space
    .replace(/\s+/g, ' ')            // Multiple spaces → single
    .trim()
    .toLowerCase();
}

/**
 * normalizePersonName — normalize ชื่อบุคคล/ลูกค้า
 * ตัด prefix, คำนำหน้า, เบอร์โทร, วงเล็บ
 * @param {string} name
 * @returns {string}
 */
function normalizePersonName(name) {
  if (!name) return '';

  let n = String(name);

  // ตัดเบอร์โทรและวงเล็บออก
  n = n.replace(PHONE_PATTERN, '').replace(PARENTHESIS_PHONE, '');

  // Normalize whitespace
  n = normalizeThaiText(n);

  // ตัด stop words คำนำหน้า
  for (const sw of PERSON_STOP_WORDS) {
    const re = new RegExp('^' + sw + '[\\s.]+', 'i');
    n = n.replace(re, '');
  }

  return n.trim();
}

/**
 * normalizePlaceName — normalize ชื่อสถานที่
 * @param {string} name
 * @returns {string}
 */
function normalizePlaceName(name) {
  if (!name) return '';
  let n = normalizeThaiText(String(name));

  // ตัด company stop words
  for (const sw of COMPANY_STOP_WORDS) {
    const re = new RegExp('\\b' + sw + '\\b', 'gi');
    n = n.replace(re, '');
  }

  // ตัด เลขที่/ซ./ถ./หมู่ที่ ที่อาจรบกวน canonical name
  // (เก็บไว้ใน address_norm แทน)
  n = n.replace(/\b(เลขที่|เลข)\s*[\d\/]+/g, '');

  return n.replace(/\s+/g, ' ').trim();
}

/**
 * normalizeCompanyName — normalize ชื่อบริษัทเจ้าของสินค้า
 * @param {string} name
 * @returns {string}
 */
function normalizeCompanyName(name) {
  if (!name) return '';
  let n = normalizeThaiText(String(name));
  for (const sw of COMPANY_STOP_WORDS) {
    const re = new RegExp('\\b' + sw + '\\b', 'gi');
    n = n.replace(re, '');
  }
  return n.replace(/\s+/g, ' ').trim();
}

/**
 * normalizeAddress — ทำความสะอาดที่อยู่
 * @param {string} address
 * @returns {string}
 */
function normalizeAddress(address) {
  if (!address) return '';
  let a = normalizeThaiText(String(address));

  // ตัดเบอร์โทรออก
  a = a.replace(PHONE_PATTERN, '').replace(PARENTHESIS_PHONE, '');

  // ย่อคำซ้ำ เช่น "เขตเขตตลิ่งชัน" → "เขตตลิ่งชัน"
  a = a.replace(/\b(แขวง|เขต|ตำบล|อำเภอ|จังหวัด)\s+\1/g, '$1');

  // ตัด " ประเทศไทย" suffix
  a = a.replace(/\s*ประเทศไทย\s*$/i, '');

  return a.replace(/\s+/g, ' ').trim();
}

/**
 * normalizeLatLong — ทำมาตรฐานตัวเลข lat/long (6 ทศนิยม)
 * @param {number} lat
 * @param {number} long
 * @returns {{lat: number, long: number}}
 */
function normalizeLatLong(lat, long) {
  const precision = parseInt(getConfig('GEO_KEY_PRECISION')) || 6;
  const factor = Math.pow(10, precision);
  return {
    lat:  Math.round(parseFloat(lat  || 0) * factor) / factor,
    long: Math.round(parseFloat(long || 0) * factor) / factor
  };
}

/**
 * buildGeoKeys — สร้าง geo key หลายระดับสำหรับ fuzzy geo match
 * key_6 = แม่นยำ (สูงสุด), key_5 = ±10m, key_4 = ±100m
 * @param {number} lat
 * @param {number} long
 * @returns {{key6: string, key5: string, key4: string}}
 */
function buildGeoKeys(lat, long) {
  const f6 = v => parseFloat(v).toFixed(6);
  const f5 = v => parseFloat(v).toFixed(5);
  const f4 = v => parseFloat(v).toFixed(4);

  return {
    key6: `${f6(lat)},${f6(long)}`,
    key5: `${f5(lat)},${f5(long)}`,
    key4: `${f4(lat)},${f4(long)}`
  };
}

/**
 * buildFingerprint — สร้าง fingerprint string สำหรับ dedup check
 * รวม normalized person + place + geo_key5
 * @param {Object} normObj
 * @returns {string}
 */
function buildFingerprint(normObj) {
  const parts = [
    normObj.person_name_norm || '',
    normObj.place_name_norm  || '',
    (normObj.geo_keys && normObj.geo_keys.key5) || ''
  ];
  return parts.join('|').toLowerCase();
}

/**
 * buildThaiPhoneticKey — สร้าง phonetic key สำหรับชื่อภาษาไทย
 * ใช้หลัก: ตัดสระ ตัดวรรณยุกต์ เหลือแต่พยัญชนะหลัก
 * (simplified version — ระบบจริงควร integrate Soundex Thai)
 * @param {string} text
 * @returns {string}
 */
function buildThaiPhoneticKey(text) {
  if (!text) return '';
  // ตัดสระบน สระล่าง วรรณยุกต์ ทัณฑฆาต
  return text
    .replace(/[\u0E31\u0E34-\u0E3A\u0E47-\u0E4E]/g, '') // สระ+วรรณยุกต์
    .replace(/\s+/g, '')
    .toLowerCase()
    .trim();
}
// ============================================================
// FILE: 06_PersonService.gs
// VERSION: 001
// MODULE: PersonService — จัดการ Master บุคคล (M_PERSON)
// ============================================================

/**
 * resolvePerson — หา / สร้าง person_id จากชื่อที่ normalize แล้ว
 * Entry point หลักสำหรับ MatchEngine
 * @param {Object} normObj (จาก normalizeSourceObject)
 * @returns {{person_id, score, method, is_new}}
 */
function resolvePerson(normObj) {
  try {
    const personName = normObj.person_name_norm;
    if (!personName || personName.length < 2) {
      return { person_id: null, score: 0, method: 'SKIP', is_new: false };
    }

    // 1. ตรวจ Alias ก่อน (exact match)
    const aliasMatch = _findPersonByAlias(personName);
    if (aliasMatch) {
      return { person_id: aliasMatch, score: 100, method: 'ALIAS_EXACT', is_new: false };
    }

    // 2. ตรวจ Canonical name (exact)
    const exactMatch = _findPersonByCanonical(personName);
    if (exactMatch) {
      return { person_id: exactMatch, score: 100, method: 'CANONICAL_EXACT', is_new: false };
    }

    // 3. Fuzzy match ถ้าเปิดใช้งาน
    if (getConfig('ENABLE_FUZZY_MATCH') === 'true') {
      const candidates = findPersonCandidates(personName);
      if (candidates.length > 0) {
        const best = candidates[0];
        if (best.score >= parseFloat(getConfig('AUTO_MATCH_SCORE') || '90')) {
          // Auto-match: เพิ่ม alias
          createPersonAlias(best.person_id, normObj.dest_name_raw, personName);
          return { person_id: best.person_id, score: best.score, method: 'FUZZY_AUTO', is_new: false };
        }
        if (best.score >= parseFloat(getConfig('REVIEW_SCORE_MIN') || '70')) {
          return { person_id: null, score: best.score, method: 'FUZZY_REVIEW',
            is_new: false, candidates };
        }
      }
    }

    // 4. สร้างใหม่
    const newId = createPerson(normObj.dest_name_raw, personName);
    createPersonAlias(newId, normObj.dest_name_raw, personName);
    return { person_id: newId, score: 0, method: 'NEW', is_new: true };

  } catch (e) {
    writeLog('ERROR', '06_PersonService', 'resolvePerson', null, e.message,
      JSON.stringify({ name: normObj.dest_name_raw }));
    return { person_id: null, score: 0, method: 'ERROR', is_new: false };
  }
}

/**
 * findPersonCandidates — หา candidates จาก M_PERSON + M_PERSON_ALIAS
 * @param {string} normalizedName
 * @returns {Array<{person_id, name, score}>} เรียงจากคะแนนสูงสุด
 */
function findPersonCandidates(normalizedName) {
  const persons = _getAllPersons();
  const aliases  = _getAllPersonAliases();
  const phoneticKey = buildThaiPhoneticKey(normalizedName);

  const scores = {};

  // คะแนนจาก canonical
  for (const p of persons) {
    const s = scorePersonCandidate(normalizedName, phoneticKey, p.norm, p.person_id);
    if (s > 0) {
      scores[p.person_id] = Math.max(scores[p.person_id] || 0, s);
    }
  }

  // คะแนนจาก alias
  for (const a of aliases) {
    if (!a.active) continue;
    const s = scorePersonCandidate(normalizedName, phoneticKey, a.norm, a.person_id);
    if (s > 0) {
      scores[a.person_id] = Math.max(scores[a.person_id] || 0, s);
    }
  }

  // แปลงเป็น array เรียงคะแนน
  const personMap = {};
  persons.forEach(p => { personMap[p.person_id] = p.canonical; });

  return Object.entries(scores)
    .map(([pid, score]) => ({ person_id: pid, name: personMap[pid] || '', score }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 5); // คืน top 5
}

/**
 * scorePersonCandidate — ให้คะแนนการจับคู่ชื่อ (0-100)
 * @param {string} inputNorm - ชื่อที่กำลังค้น (normalized)
 * @param {string} inputPhonetic - phonetic key ของ input
 * @param {string} candidateNorm - ชื่อใน master (normalized)
 * @param {string} candidateId
 * @returns {number} คะแนน 0-100
 */
function scorePersonCandidate(inputNorm, inputPhonetic, candidateNorm, candidateId) {
  if (!inputNorm || !candidateNorm) return 0;
  if (inputNorm === candidateNorm) return 100; // exact match

  // ความยาวขั้นต่ำ
  const minLen = parseInt(getConfig('FUZZY_MIN_LENGTH')) || 3;
  if (inputNorm.length < minLen || candidateNorm.length < minLen) return 0;

  let score = 0;

  // 1. Levenshtein similarity (น้ำหนัก 50%)
  const maxLen = Math.max(inputNorm.length, candidateNorm.length);
  const lev = _levenshtein(inputNorm, candidateNorm);
  const levScore = Math.max(0, (1 - lev / maxLen)) * 50;
  score += levScore;

  // 2. Phonetic match (น้ำหนัก 30%)
  const candidatePhonetic = buildThaiPhoneticKey(candidateNorm);
  if (inputPhonetic && candidatePhonetic && inputPhonetic === candidatePhonetic) {
    score += 30;
  } else if (inputPhonetic && candidatePhonetic) {
    const pLev = _levenshtein(inputPhonetic, candidatePhonetic);
    const pMax = Math.max(inputPhonetic.length, candidatePhonetic.length);
    score += Math.max(0, (1 - pLev / pMax)) * 20;
  }

  // 3. Prefix/Suffix match (น้ำหนัก 20%)
  if (inputNorm.startsWith(candidateNorm) || candidateNorm.startsWith(inputNorm)) score += 20;
  else if (inputNorm.includes(candidateNorm) || candidateNorm.includes(inputNorm)) score += 10;

  return Math.min(100, Math.round(score));
}

/**
 * createPerson — สร้าง M_PERSON record ใหม่
 * @param {string} canonicalName
 * @param {string} normalizedName
 * @returns {string} person_id ใหม่
 */
function createPerson(canonicalName, normalizedName) {
  return withLock(() => {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sh = ss.getSheetByName(SHEET_NAMES.M_PERSON);
    const newId = _generateId('PER');
    const now = new Date();
    sh.appendRow([
      newId,
      canonicalName,
      normalizedName,
      now,   // first_seen_date
      now,   // last_seen_date
      1,     // usage_count
      'ACTIVE',
      ''
    ]);
    _clearPersonCache();
    return newId;
  });
}

/**
 * createPersonAlias — เพิ่ม Alias ให้ M_PERSON (ป้องกัน duplicate)
 * @param {string} personId
 * @param {string} aliasRaw
 * @param {string} aliasNormalized
 */
function createPersonAlias(personId, aliasRaw, aliasNormalized) {
  return withLock(() => {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sh = ss.getSheetByName(SHEET_NAMES.M_PERSON_ALIAS);

    // ตรวจซ้ำก่อน
    if (sh.getLastRow() > 1) {
      const data = sh.getDataRange().getValues();
      for (let i = 1; i < data.length; i++) {
        if (data[i][1] === personId && data[i][3] === aliasNormalized) return; // ซ้ำ
      }
    }

    const now = new Date();
    sh.appendRow([
      _generateId('PAL'),
      personId,
      aliasRaw,
      aliasNormalized,
      'dest_name_raw',
      now,
      now,
      1,
      1
    ]);
    _clearPersonCache();
  });
}

/**
 * updatePersonStats — อัปเดต last_seen + usage_count
 * @param {string} personId
 */
function updatePersonStats(personId) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sh = ss.getSheetByName(SHEET_NAMES.M_PERSON);
    if (!sh || sh.getLastRow() < 2) return;

    const data = sh.getDataRange().getValues();
    for (let i = 1; i < data.length; i++) {
      if (data[i][0] === personId) {
        const usageCol = 6, lastSeenCol = 5;
        sh.getRange(i + 1, usageCol).setValue((data[i][usageCol - 1] || 0) + 1);
        sh.getRange(i + 1, lastSeenCol).setValue(new Date());
        return;
      }
    }
  } catch (e) {
    writeLog('WARN', '06_PersonService', 'updatePersonStats', null, e.message, null);
  }
}

// ─────────────────────────────────────────────
// PRIVATE HELPERS
// ─────────────────────────────────────────────

function _getAllPersons() {
  const cache = CacheService.getScriptCache();
  const cached = cache.get('ALL_PERSONS');
  if (cached) return JSON.parse(cached);

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = ss.getSheetByName(SHEET_NAMES.M_PERSON);
  if (!sh || sh.getLastRow() < 2) return [];

  const data = sh.getDataRange().getValues();
  const result = [];
  for (let i = 1; i < data.length; i++) {
    if (data[i][6] !== 'ARCHIVED') { // skip archived
      result.push({ person_id: data[i][0], canonical: data[i][1], norm: data[i][2] });
    }
  }
  cache.put('ALL_PERSONS', JSON.stringify(result), 21600);
  return result;
}

function _getAllPersonAliases() {
  const cache = CacheService.getScriptCache();
  const cached = cache.get('ALL_PERSON_ALIASES');
  if (cached) return JSON.parse(cached);

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = ss.getSheetByName(SHEET_NAMES.M_PERSON_ALIAS);
  if (!sh || sh.getLastRow() < 2) return [];

  const data = sh.getDataRange().getValues();
  const result = [];
  for (let i = 1; i < data.length; i++) {
    result.push({
      alias_id: data[i][0], person_id: data[i][1],
      raw: data[i][2], norm: data[i][3],
      active: data[i][8] === 1 || data[i][8] === true
    });
  }
  cache.put('ALL_PERSON_ALIASES', JSON.stringify(result), 21600);
  return result;
}

function _findPersonByAlias(normalizedName) {
  const aliases = _getAllPersonAliases();
  const match = aliases.find(a => a.active && a.norm === normalizedName);
  return match ? match.person_id : null;
}

function _findPersonByCanonical(normalizedName) {
  const persons = _getAllPersons();
  const match = persons.find(p => p.norm === normalizedName);
  return match ? match.person_id : null;
}

function _clearPersonCache() {
  CacheService.getScriptCache().removeAll(['ALL_PERSONS', 'ALL_PERSON_ALIASES']);
}

/**
 * _levenshtein — คำนวณ Levenshtein Distance
 * @param {string} a
 * @param {string} b
 * @returns {number}
 */
function _levenshtein(a, b) {
  const m = a.length, n = b.length;
  const dp = Array.from({ length: m + 1 }, (_, i) =>
    Array.from({ length: n + 1 }, (_, j) => i === 0 ? j : j === 0 ? i : 0)
  );
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = a[i - 1] === b[j - 1]
        ? dp[i - 1][j - 1]
        : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }
  return dp[m][n];
}

function _generateId(prefix) {
  const ts = new Date().getTime().toString(36).toUpperCase();
  const rand = Math.random().toString(36).substr(2, 4).toUpperCase();
  return `${prefix}-${ts}${rand}`;
}
// ============================================================
// FILE: 07_PlaceService.gs
// VERSION: 001
// MODULE: PlaceService — จัดการ Master สถานที่ (M_PLACE)
// ============================================================

/**
 * resolvePlace — หา / สร้าง place_id
 * @param {Object} normObj
 * @returns {{place_id, score, method, is_new}}
 */
function resolvePlace(normObj) {
  try {
    const placeName = normObj.place_name_norm;
    const addrNorm  = normObj.address_norm || normObj.address_latlong_norm;

    if (!placeName && !addrNorm) {
      return { place_id: null, score: 0, method: 'SKIP', is_new: false };
    }

    // 1. Alias exact
    const aliasMatch = _findPlaceByAlias(placeName);
    if (aliasMatch) {
      return { place_id: aliasMatch, score: 100, method: 'ALIAS_EXACT', is_new: false };
    }

    // 2. Canonical exact
    const exactMatch = _findPlaceByCanonical(placeName);
    if (exactMatch) {
      return { place_id: exactMatch, score: 100, method: 'CANONICAL_EXACT', is_new: false };
    }

    // 3. Fuzzy match
    if (getConfig('ENABLE_FUZZY_MATCH') === 'true') {
      const candidates = findPlaceCandidates(placeName, addrNorm);
      if (candidates.length > 0) {
        const best = candidates[0];
        if (best.score >= parseFloat(getConfig('AUTO_MATCH_SCORE') || '90')) {
          createPlaceAlias(best.place_id, normObj.address_raw, placeName);
          return { place_id: best.place_id, score: best.score, method: 'FUZZY_AUTO', is_new: false };
        }
        if (best.score >= parseFloat(getConfig('REVIEW_SCORE_MIN') || '70')) {
          return { place_id: null, score: best.score, method: 'FUZZY_REVIEW',
            is_new: false, candidates };
        }
      }
    }

    // 4. สร้างใหม่
    const addrBest = normObj.address_latlong || normObj.address_raw;
    const newId = createPlace(placeName || addrBest, addrBest);
    if (placeName) createPlaceAlias(newId, normObj.address_raw, placeName);
    return { place_id: newId, score: 0, method: 'NEW', is_new: true };

  } catch (e) {
    writeLog('ERROR', '07_PlaceService', 'resolvePlace', null, e.message, null);
    return { place_id: null, score: 0, method: 'ERROR', is_new: false };
  }
}

function findPlaceCandidates(normalizedPlace, normalizedAddress) {
  const places  = _getAllPlaces();
  const aliases = _getAllPlaceAliases();
  const scores  = {};

  for (const p of places) {
    const s = scorePlaceCandidate(normalizedPlace, normalizedAddress, p.norm, p.addrNorm);
    if (s > 0) scores[p.place_id] = Math.max(scores[p.place_id] || 0, s);
  }
  for (const a of aliases) {
    if (!a.active) continue;
    const s = scorePlaceCandidate(normalizedPlace, normalizedAddress, a.norm, '');
    if (s > 0) scores[a.place_id] = Math.max(scores[a.place_id] || 0, s);
  }

  const placeMap = {};
  places.forEach(p => { placeMap[p.place_id] = p.canonical; });

  return Object.entries(scores)
    .map(([pid, score]) => ({ place_id: pid, name: placeMap[pid] || '', score }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);
}

function scorePlaceCandidate(inputPlace, inputAddr, candidateNorm, candidateAddr) {
  let score = 0;
  if (!inputPlace && !inputAddr) return 0;

  if (inputPlace && candidateNorm) {
    if (inputPlace === candidateNorm) return 100;
    const lev = _levenshtein(inputPlace, candidateNorm);
    const maxLen = Math.max(inputPlace.length, candidateNorm.length);
    score += Math.max(0, (1 - lev / maxLen)) * 60;
    if (inputPlace.includes(candidateNorm) || candidateNorm.includes(inputPlace)) score += 10;
  }

  if (inputAddr && candidateAddr && inputAddr.length > 5 && candidateAddr.length > 5) {
    const lev = _levenshtein(inputAddr.slice(0, 40), candidateAddr.slice(0, 40));
    const maxLen = Math.max(inputAddr.length, candidateAddr.length, 1);
    score += Math.max(0, (1 - lev / maxLen)) * 40;
  }

  return Math.min(100, Math.round(score));
}

function createPlace(canonicalName, addressBest) {
  return withLock(() => {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sh = ss.getSheetByName(SHEET_NAMES.M_PLACE);
    const newId = _generatePlaceId();
    const now = new Date();
    sh.appendRow([
      newId, canonicalName, normalizeThaiText(canonicalName),
      addressBest, normalizeAddress(addressBest), '',
      now, now, 1, 'ACTIVE', ''
    ]);
    _clearPlaceCache();
    return newId;
  });
}

function createPlaceAlias(placeId, aliasRaw, aliasNormalized) {
  return withLock(() => {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sh = ss.getSheetByName(SHEET_NAMES.M_PLACE_ALIAS);
    if (sh.getLastRow() > 1) {
      const data = sh.getDataRange().getValues();
      for (let i = 1; i < data.length; i++) {
        if (data[i][1] === placeId && data[i][3] === aliasNormalized) return;
      }
    }
    const now = new Date();
    sh.appendRow([_generatePlaceAliasId(), placeId, aliasRaw, aliasNormalized,
      'address_raw', now, now, 1, 1]);
    _clearPlaceCache();
  });
}

function updatePlaceStats(placeId) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sh = ss.getSheetByName(SHEET_NAMES.M_PLACE);
    if (!sh || sh.getLastRow() < 2) return;
    const data = sh.getDataRange().getValues();
    for (let i = 1; i < data.length; i++) {
      if (data[i][0] === placeId) {
        sh.getRange(i + 1, 9).setValue((data[i][8] || 0) + 1);
        sh.getRange(i + 1, 8).setValue(new Date());
        return;
      }
    }
  } catch (e) {
    writeLog('WARN', '07_PlaceService', 'updatePlaceStats', null, e.message, null);
  }
}

function _getAllPlaces() {
  const cache = CacheService.getScriptCache();
  const cached = cache.get('ALL_PLACES');
  if (cached) return JSON.parse(cached);
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = ss.getSheetByName(SHEET_NAMES.M_PLACE);
  if (!sh || sh.getLastRow() < 2) return [];
  const data = sh.getDataRange().getValues();
  const result = [];
  for (let i = 1; i < data.length; i++) {
    if (data[i][9] !== 'ARCHIVED') {
      result.push({ place_id: data[i][0], canonical: data[i][1],
        norm: data[i][2], addrNorm: data[i][4] });
    }
  }
  cache.put('ALL_PLACES', JSON.stringify(result), 21600);
  return result;
}

function _getAllPlaceAliases() {
  const cache = CacheService.getScriptCache();
  const cached = cache.get('ALL_PLACE_ALIASES');
  if (cached) return JSON.parse(cached);
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = ss.getSheetByName(SHEET_NAMES.M_PLACE_ALIAS);
  if (!sh || sh.getLastRow() < 2) return [];
  const data = sh.getDataRange().getValues();
  const result = [];
  for (let i = 1; i < data.length; i++) {
    result.push({ alias_id: data[i][0], place_id: data[i][1],
      norm: data[i][3], active: data[i][8] === 1 || data[i][8] === true });
  }
  cache.put('ALL_PLACE_ALIASES', JSON.stringify(result), 21600);
  return result;
}

function _findPlaceByAlias(norm) {
  const aliases = _getAllPlaceAliases();
  const m = aliases.find(a => a.active && a.norm === norm);
  return m ? m.place_id : null;
}

function _findPlaceByCanonical(norm) {
  const places = _getAllPlaces();
  const m = places.find(p => p.norm === norm);
  return m ? m.place_id : null;
}

function _clearPlaceCache() {
  CacheService.getScriptCache().removeAll(['ALL_PLACES', 'ALL_PLACE_ALIASES']);
}

function _generatePlaceId() {
  return 'PLA-' + new Date().getTime().toString(36).toUpperCase() +
    Math.random().toString(36).substr(2, 4).toUpperCase();
}

function _generatePlaceAliasId() {
  return 'PLAL-' + new Date().getTime().toString(36).toUpperCase() +
    Math.random().toString(36).substr(2, 3).toUpperCase();
}
// ============================================================
// FILE: 08_GeoService.gs
// VERSION: 001
// MODULE: GeoService — จัดการพิกัด GPS (M_GEO_POINT)
// ============================================================

// Haversine Earth radius (km)
const EARTH_RADIUS_KM = 6371;

/**
 * resolveGeo — หา / สร้าง geo_id จากพิกัด lat/long
 * @param {Object} normObj
 * @returns {{geo_id, score, method, is_new}}
 */
function resolveGeo(normObj) {
  try {
    const lat  = normObj.lat_norm;
    const long = normObj.long_norm;

    if (!lat || !long || lat === 0 || long === 0) {
      return { geo_id: null, score: 0, method: 'SKIP', is_new: false };
    }

    const geoKeys = normObj.geo_keys || buildGeoKeys(lat, long);
    const radius  = parseFloat(getConfig('GEO_RADIUS_METER')) || 50;

    // 1. Exact match (key_6)
    const exactMatch = _findGeoByKey6(geoKeys.key6);
    if (exactMatch) {
      return { geo_id: exactMatch, score: 100, method: 'EXACT', is_new: false };
    }

    // 2. Near match (key_5 = ±~11m)
    const nearMatch5 = _findGeoByKey5(geoKeys.key5);
    if (nearMatch5) {
      return { geo_id: nearMatch5, score: 95, method: 'NEAR_KEY5', is_new: false };
    }

    // 3. Cluster match — ตรวจจากรัศมีจริง (Haversine)
    const candidates = findGeoCandidates(lat, long);
    if (candidates.length > 0) {
      const best = candidates[0];
      if (best.dist_m <= radius) {
        return { geo_id: best.geo_id, score: 90, method: 'RADIUS_MATCH', is_new: false };
      }
    }

    // 4. สร้างใหม่
    const addrFromLL = normObj.address_latlong || '';
    const newId = createGeoPoint(lat, long, geoKeys, addrFromLL);
    return { geo_id: newId, score: 0, method: 'NEW', is_new: true };

  } catch (e) {
    writeLog('ERROR', '08_GeoService', 'resolveGeo', null, e.message,
      JSON.stringify({ lat: normObj.lat, long: normObj.long }));
    return { geo_id: null, score: 0, method: 'ERROR', is_new: false };
  }
}

/**
 * findGeoCandidates — หา geo points ในรัศมี 200m
 * @param {number} lat
 * @param {number} long
 * @returns {Array<{geo_id, lat, long, dist_m}>} เรียงจากใกล้สุด
 */
function findGeoCandidates(lat, long) {
  const allGeo = _getAllGeoPoints();
  const results = [];

  // Pre-filter: ±0.01° ≈ ±1km — ลด loop
  const LAT_RANGE  = 0.01;
  const LONG_RANGE = 0.01;

  for (const g of allGeo) {
    if (Math.abs(g.lat - lat) > LAT_RANGE) continue;
    if (Math.abs(g.long - long) > LONG_RANGE) continue;

    const dist_m = calcDistanceMeters(lat, long, g.lat, g.long);
    if (dist_m <= 200) { // ค้นในรัศมี 200m
      results.push({ geo_id: g.geo_id, lat: g.lat, long: g.long, dist_m });
    }
  }

  return results.sort((a, b) => a.dist_m - b.dist_m).slice(0, 5);
}

/**
 * createGeoPoint — สร้าง M_GEO_POINT record ใหม่
 * @param {number} lat
 * @param {number} long
 * @param {Object} geoKeys
 * @param {string} addressFromLatLong
 * @returns {string} geo_id
 */
function createGeoPoint(lat, long, geoKeys, addressFromLatLong) {
  return withLock(() => {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sh = ss.getSheetByName(SHEET_NAMES.M_GEO_POINT);
    const newId = _generateGeoId();
    const now = new Date();
    sh.appendRow([
      newId,
      lat, long,           // lat_raw, long_raw
      lat, long,           // lat_norm, long_norm
      geoKeys.key6,
      geoKeys.key5,
      geoKeys.key4,
      addressFromLatLong,  // address_from_latlong_best
      now,                 // first_seen_date
      now,                 // last_seen_date
      1,                   // usage_count
      ''                   // note
    ]);
    _clearGeoCache();
    return newId;
  });
}

/**
 * calcDistanceMeters — Haversine Formula
 * @param {number} lat1
 * @param {number} lon1
 * @param {number} lat2
 * @param {number} lon2
 * @returns {number} ระยะทาง (เมตร)
 */
function calcDistanceMeters(lat1, lon1, lat2, lon2) {
  const toRad = x => x * Math.PI / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return EARTH_RADIUS_KM * 1000 * 2 * Math.asin(Math.sqrt(a));
}

/**
 * buildGeoKey — สร้าง key ระดับ precision ที่กำหนด
 * @param {number} lat
 * @param {number} long
 * @param {number} precision
 * @returns {string}
 */
function buildGeoKey(lat, long, precision) {
  return `${parseFloat(lat).toFixed(precision)},${parseFloat(long).toFixed(precision)}`;
}

/**
 * clusterNearbyGeo — หา geo points ทั้งหมดที่อยู่ในรัศมีที่กำหนด
 * ใช้สำหรับ Maintenance — ตรวจจับจุดที่อาจ merge ได้
 * @param {number} lat
 * @param {number} long
 * @param {number} radiusMeters
 * @returns {Array}
 */
function clusterNearbyGeo(lat, long, radiusMeters) {
  const allGeo = _getAllGeoPoints();
  return allGeo.filter(g => calcDistanceMeters(lat, long, g.lat, g.long) <= radiusMeters);
}

// ─────────────────────────────────────────────
// PRIVATE HELPERS
// ─────────────────────────────────────────────

function _getAllGeoPoints() {
  const cache = CacheService.getScriptCache();
  const cached = cache.get('ALL_GEO');
  if (cached) return JSON.parse(cached);

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = ss.getSheetByName(SHEET_NAMES.M_GEO_POINT);
  if (!sh || sh.getLastRow() < 2) return [];

  const data = sh.getDataRange().getValues();
  const result = [];
  for (let i = 1; i < data.length; i++) {
    result.push({
      geo_id: data[i][0],
      lat:    parseFloat(data[i][3]),  // lat_norm
      long:   parseFloat(data[i][4]),  // long_norm
      key6:   data[i][5],
      key5:   data[i][6],
      key4:   data[i][7]
    });
  }
  cache.put('ALL_GEO', JSON.stringify(result), 21600);
  return result;
}

function _findGeoByKey6(key6) {
  const all = _getAllGeoPoints();
  const m = all.find(g => g.key6 === key6);
  return m ? m.geo_id : null;
}

function _findGeoByKey5(key5) {
  const all = _getAllGeoPoints();
  const m = all.find(g => g.key5 === key5);
  return m ? m.geo_id : null;
}

function _clearGeoCache() {
  CacheService.getScriptCache().remove('ALL_GEO');
}

function _generateGeoId() {
  return 'GEO-' + new Date().getTime().toString(36).toUpperCase() +
    Math.random().toString(36).substr(2, 4).toUpperCase();
}
// ============================================================
// FILE: 09_DestinationService.gs
// VERSION: 001
// MODULE: DestinationService — จัดการปลายทางจริง (M_DESTINATION)
// ============================================================

/**
 * resolveDestination — หา / สร้าง destination_id
 * จาก person_id + place_id + geo_id
 * @param {string} personId
 * @param {string} placeId
 * @param {string} geoId
 * @param {Object} normObj
 * @returns {{destination_id, is_new}}
 */
function resolveDestination(personId, placeId, geoId, normObj) {
  try {
    if (!personId && !placeId && !geoId) {
      return { destination_id: null, is_new: false };
    }

    const key = buildDestinationKey(personId, placeId, geoId);

    // ค้นหา destination เดิม
    const existing = findDestinationCandidates(personId, placeId, geoId);
    if (existing.length > 0) {
      updateDestinationStats(existing[0].destination_id);
      return { destination_id: existing[0].destination_id, is_new: false };
    }

    // สร้างใหม่
    const label = _buildDestinationLabel(normObj);
    const newId = createDestination(personId, placeId, geoId, label, key);
    return { destination_id: newId, is_new: true };

  } catch (e) {
    writeLog('ERROR', '09_DestinationService', 'resolveDestination', null, e.message, null);
    return { destination_id: null, is_new: false };
  }
}

/**
 * buildDestinationKey — สร้าง key จาก 3 master IDs
 * @param {string} personId
 * @param {string} placeId
 * @param {string} geoId
 * @returns {string}
 */
function buildDestinationKey(personId, placeId, geoId) {
  return `${personId || 'NOPERSON'}|${placeId || 'NOPLACE'}|${geoId || 'NOGEO'}`;
}

/**
 * findDestinationCandidates — หา destination จาก combination ของ IDs
 * @param {string} personId
 * @param {string} placeId
 * @param {string} geoId
 * @returns {Array<{destination_id, key}>}
 */
function findDestinationCandidates(personId, placeId, geoId) {
  const all = _getAllDestinations();
  const key = buildDestinationKey(personId, placeId, geoId);
  return all.filter(d => d.key === key);
}

/**
 * createDestination — สร้าง M_DESTINATION record
 * @param {string} personId
 * @param {string} placeId
 * @param {string} geoId
 * @param {string} label
 * @param {string} key
 * @returns {string} destination_id
 */
function createDestination(personId, placeId, geoId, label, key) {
  return withLock(() => {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sh = ss.getSheetByName(SHEET_NAMES.M_DESTINATION);
    const newId = _generateDestId();
    const now = new Date();
    sh.appendRow([
      newId, personId, placeId, geoId,
      label, key, 'CONFIRMED',
      now, now, 1, ''
    ]);
    _clearDestCache();
    return newId;
  });
}

/**
 * updateDestinationStats — อัปเดต usage_count, last_seen_date
 * @param {string} destinationId
 */
function updateDestinationStats(destinationId) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sh = ss.getSheetByName(SHEET_NAMES.M_DESTINATION);
    if (!sh || sh.getLastRow() < 2) return;
    const data = sh.getDataRange().getValues();
    for (let i = 1; i < data.length; i++) {
      if (data[i][0] === destinationId) {
        sh.getRange(i + 1, 10).setValue((data[i][9] || 0) + 1); // usage_count
        sh.getRange(i + 1, 9).setValue(new Date());               // last_seen_date
        return;
      }
    }
  } catch (e) {
    writeLog('WARN', '09_DestinationService', 'updateDestinationStats', null, e.message, null);
  }
}

function _getAllDestinations() {
  const cache = CacheService.getScriptCache();
  const cached = cache.get('ALL_DESTS');
  if (cached) return JSON.parse(cached);
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = ss.getSheetByName(SHEET_NAMES.M_DESTINATION);
  if (!sh || sh.getLastRow() < 2) return [];
  const data = sh.getDataRange().getValues();
  const result = [];
  for (let i = 1; i < data.length; i++) {
    result.push({ destination_id: data[i][0], person_id: data[i][1],
      place_id: data[i][2], geo_id: data[i][3], key: data[i][5] });
  }
  cache.put('ALL_DESTS', JSON.stringify(result), 21600);
  return result;
}

function _clearDestCache() { CacheService.getScriptCache().remove('ALL_DESTS'); }

function _buildDestinationLabel(normObj) {
  const parts = [];
  if (normObj.person_name_norm) parts.push(normObj.person_name_norm);
  if (normObj.place_name_norm)  parts.push(normObj.place_name_norm);
  if (normObj.lat_norm && normObj.long_norm)
    parts.push(`(${normObj.lat_norm},${normObj.long_norm})`);
  return parts.join(' | ');
}

function _generateDestId() {
  return 'DST-' + new Date().getTime().toString(36).toUpperCase() +
    Math.random().toString(36).substr(2, 4).toUpperCase();
}


// ============================================================
// FILE: 10_MatchEngine.gs
// VERSION: 001
// MODULE: MatchEngine — ตัวตัดสินกลางของระบบ
// ============================================================

/**
 * matchAllEntities — จุดประสาน Person + Place + Geo + Destination
 * Entry point จาก runDailyProcess
 * @param {Object} normObj (จาก normalizeSourceObject)
 * @returns {{personResult, placeResult, geoResult, destResult, compositeScore, decision}}
 */
function matchAllEntities(normObj) {
  // ─── 1. แต่ละ entity ─────────────────────────
  const personResult = resolvePerson(normObj);
  const placeResult  = resolvePlace(normObj);
  const geoResult    = resolveGeo(normObj);

  // ─── 2. Destination ────────────────────────
  let destResult = { destination_id: null, is_new: false };
  if (personResult.person_id || placeResult.place_id || geoResult.geo_id) {
    destResult = resolveDestination(
      personResult.person_id, placeResult.place_id, geoResult.geo_id, normObj
    );
  }

  // ─── 3. คะแนนรวม ───────────────────────────
  const compositeScore = calculateCompositeScore({
    personResult, placeResult, geoResult
  });

  // ─── 4. ตัดสินใจ ───────────────────────────
  const decision = decideAutoMatchOrReview(compositeScore, {
    personResult, placeResult, geoResult, destResult, normObj
  });

  // ─── 5. ตรวจ Conflict types ────────────────
  const conflictTypes = detectConflictType({ personResult, placeResult, geoResult, normObj });

  return {
    personResult, placeResult, geoResult, destResult,
    compositeScore, decision, conflictTypes, normObj
  };
}

/**
 * calculateCompositeScore — คะแนนรวมจาก 3 entity (0-100)
 * น้ำหนัก: Person 40%, Place 35%, Geo 25%
 * @param {{personResult, placeResult, geoResult}}
 * @returns {number}
 */
function calculateCompositeScore({ personResult, placeResult, geoResult }) {
  const pScore = (personResult.score || 0) * 0.40;
  const lScore = (placeResult.score  || 0) * 0.35;
  const gScore = (geoResult.score    || 0) * 0.25;
  return Math.round(pScore + lScore + gScore);
}

/**
 * decideAutoMatchOrReview — ตัดสินว่าเป็น AUTO_MATCH / REVIEW / NEW
 * @param {number} compositeScore
 * @param {Object} context
 * @returns {string}
 */
function decideAutoMatchOrReview(compositeScore, context) {
  const thresholds = getThresholds();
  const { personResult, placeResult, geoResult } = context;

  // ถ้าทุก entity เป็น NEW — เพิ่มใหม่โดยตรง
  const allNew = personResult.is_new && placeResult.is_new && geoResult.is_new;
  if (allNew) return 'NEW';

  // REVIEW methods จาก entity ใดก็ตาม
  const needsReview = [personResult, placeResult, geoResult]
    .some(r => r.method === 'FUZZY_REVIEW' || r.method === 'ERROR');
  if (needsReview) return 'REVIEW';

  if (compositeScore >= thresholds.autoMatch) return 'AUTO_MATCH';
  if (compositeScore >= thresholds.reviewMin)  return 'REVIEW';

  return 'NEW';
}

/**
 * detectConflictType — ตรวจหาประเภทปัญหาข้อมูล (ปัญหา 8 ข้อ)
 * @param {{personResult, placeResult, geoResult, normObj}}
 * @returns {string[]} รายการ conflict types ที่พบ
 */
function detectConflictType({ personResult, placeResult, geoResult, normObj }) {
  const types = [];

  // ปัญหา 4: บุคคลเดียวกันแต่ชื่อต่างกัน (Fuzzy match สำเร็จ)
  if (personResult.method === 'FUZZY_AUTO' || personResult.method === 'ALIAS_EXACT') {
    types.push('SAME_PERSON_DIFF_NAME');
  }

  // ปัญหา 7: คนเดียวกัน แต่ Geo ต่าง (person match แต่ geo ใหม่)
  if (personResult.person_id && !personResult.is_new && geoResult.is_new) {
    types.push('SAME_PERSON_DIFF_GEO');
  }

  // ปัญหา 6: คนเดียวกัน แต่ Place ต่าง
  if (personResult.person_id && !personResult.is_new && placeResult.is_new) {
    types.push('SAME_PERSON_DIFF_PLACE');
  }

  // ปัญหา 8: Geo เดียวกัน แต่คนต่าง (geo match แต่ person ใหม่)
  if (geoResult.geo_id && !geoResult.is_new && personResult.is_new) {
    types.push('SAME_GEO_DIFF_PERSON');
  }

  // ปัญหา 5: Place เดียวกัน แต่คนต่าง
  if (placeResult.place_id && !placeResult.is_new && personResult.is_new) {
    types.push('SAME_PLACE_DIFF_PERSON');
  }

  return types;
}

/**
 * buildReviewPayload — สร้าง payload สำหรับ Q_REVIEW
 * @param {Object} resolvedObj (จาก matchAllEntities)
 * @returns {Object}
 */
function buildReviewPayload(resolvedObj) {
  const { personResult, placeResult, geoResult, destResult, compositeScore,
    conflictTypes, normObj } = resolvedObj;

  const issueType = conflictTypes.length > 0 ? conflictTypes[0] : 'UNCERTAIN_MATCH';

  return {
    issue_type:              issueType,
    source_record_id:        normObj.source_id,
    source_row_number:       normObj._rowNumber,
    invoice_no:              normObj.invoice_no,
    raw_person_name:         normObj.dest_name_raw,
    raw_place_name:          normObj.address_raw,
    raw_lat:                 normObj.lat,
    raw_long:                normObj.long,
    candidate_person_ids:    personResult.candidates
      ? personResult.candidates.map(c => `${c.person_id}(${c.score}%)`).join(',') : '',
    candidate_place_ids:     placeResult.candidates
      ? placeResult.candidates.map(c => `${c.place_id}(${c.score}%)`).join(',') : '',
    candidate_geo_ids:       geoResult.candidates
      ? geoResult.candidates.map(c => `${c.geo_id}(${c.dist_m}m)`).join(',') : '',
    candidate_destination_ids: destResult.destination_id || '',
    score:                   compositeScore,
    recommended_action:      compositeScore >= 70 ? 'VERIFY_AND_MERGE' : 'MANUAL_REVIEW',
    status:                  'PENDING'
  };
}
// ============================================================
// FILE: 10_MatchEngine.gs  (VERSION 002 — Enhanced 8-Problem System)
// VERSION: 002
// MODULE: MatchEngine — ตัวตัดสินกลาง พร้อมระบบวิเคราะห์ 8 ปัญหา
//
// ──────────────────────────────────────────────────────────────
//  8 ปัญหาที่ระบบนี้แก้ไข:
//
//  #1  ชื่อบุคคลซ้ำกัน           → Person Dedup via M_PERSON
//  #2  ชื่อสถานที่ซ้ำ             → Place Dedup via M_PLACE
//  #3  LatLong ซ้ำกัน            → Geo Cluster via M_GEO_POINT
//  #4  คนเดียวแต่ชื่อต่างกัน     → Person Alias + Fuzzy Match
//  #5  คนละชื่อ สถานที่เดียวกัน  → Place Shared, Person Separate
//  #6  ชื่อเดียวกัน สถานที่ต่าง  → 1 Person → N Places (N Destinations)
//  #7  ชื่อเดียวกัน LatLong ต่าง → 1 Person → N GeoPoints
//  #8  คนละชื่อ LatLong เดียวกัน → N Persons → 1 GeoPoint
// ──────────────────────────────────────────────────────────────

// ─── Weight Matrix ─────────────────────────────────────────────
// น้ำหนักคะแนนในแต่ละ dimension (รวม = 100%)
const SCORE_WEIGHTS = {
  PERSON_EXACT:      40,   // ชื่อตรงเป๊ะ
  PERSON_ALIAS:      38,   // ตรงผ่าน alias
  PERSON_FUZZY:      28,   // fuzzy match
  PLACE_EXACT:       30,   // สถานที่ตรง
  PLACE_ALIAS:       28,
  PLACE_FUZZY:       20,
  GEO_EXACT:         30,   // พิกัดตรง (key_6)
  GEO_NEAR5:         25,   // พิกัดใกล้ (key_5 ≈ ±11m)
  GEO_RADIUS:        18,   // พิกัดในรัศมี
  ADDRESS_MATCH:     10,   // ที่อยู่ตรงกัน (bonus)
  OWNER_MATCH:        5    // เจ้าของสินค้าเดียวกัน (bonus)
};

// Conflict Type Codes — ตรงกับ 8 ปัญหา
const CONFLICT = {
  C1_PERSON_DUPE:         'C1_PERSON_DUPLICATE',
  C2_PLACE_DUPE:          'C2_PLACE_DUPLICATE',
  C3_GEO_DUPE:            'C3_GEO_DUPLICATE',
  C4_SAME_PERSON_DIFF_NAME:'C4_SAME_PERSON_DIFF_NAME',
  C5_DIFF_PERSON_SAME_PLACE:'C5_DIFF_PERSON_SAME_PLACE',
  C6_SAME_PERSON_DIFF_PLACE:'C6_SAME_PERSON_DIFF_PLACE',
  C7_SAME_PERSON_DIFF_GEO: 'C7_SAME_PERSON_DIFF_GEO',
  C8_DIFF_PERSON_SAME_GEO: 'C8_DIFF_PERSON_SAME_GEO'
};

// Resolution Actions — วิธีแก้ไขที่แนะนำให้ Admin
const ACTION = {
  AUTO_MAP:      'AUTO_MAP',      // ระบบทำได้เองทันที
  ADD_ALIAS:     'ADD_ALIAS',     // เพิ่ม Alias แล้วแมพ
  MERGE:         'MERGE',         // Merge Master Records
  SPLIT:         'SPLIT',         // แยกออกเป็น Record ใหม่
  CONFIRM_MULTI: 'CONFIRM_MULTI', // ยืนยันว่ามีหลาย destination จริง
  MANUAL:        'MANUAL'         // ต้องให้คนตัดสิน
};

// ─── Main Engine ───────────────────────────────────────────────

/**
 * matchAllEntities — Entry Point หลัก
 * ทำ Entity Resolution + 8-Problem Detection ครบในที่เดียว
 *
 * @param {Object} normObj — จาก normalizeSourceObject()
 * @returns {Object} resolvedObj
 */
function matchAllEntities(normObj) {

  // ── STEP 1: Resolve แต่ละ Entity ──────────────────────────
  const personResult = resolvePerson(normObj);
  const placeResult  = resolvePlace(normObj);
  const geoResult    = resolveGeo(normObj);

  // ── STEP 2: ตรวจ Conflicts ทั้ง 8 ข้อ ────────────────────
  const conflictReport = detectAllConflicts({
    personResult, placeResult, geoResult, normObj
  });

  // ── STEP 3: คำนวณ Composite Score ────────────────────────
  const compositeScore = calculateCompositeScore({
    personResult, placeResult, geoResult, normObj
  });

  // ── STEP 4: ตัดสิน Decision ──────────────────────────────
  const decision = decideAutoMatchOrReview(compositeScore, {
    personResult, placeResult, geoResult,
    conflictReport, normObj
  });

  // ── STEP 5: Resolve Destination ──────────────────────────
  let destResult = { destination_id: null, is_new: false };
  if (decision !== 'SKIP' && (personResult.person_id || placeResult.place_id || geoResult.geo_id)) {
    destResult = resolveDestination(
      personResult.person_id,
      placeResult.place_id,
      geoResult.geo_id,
      normObj
    );
  }

  // ── STEP 6: บันทึก Conflict Log ──────────────────────────
  if (conflictReport.conflicts.length > 0) {
    writeLog('INFO', '10_MatchEngine', 'matchAllEntities',
      normObj.source_id,
      `Conflicts: ${conflictReport.conflicts.join(', ')} | score=${compositeScore} | ${decision}`,
      null);
  }

  return {
    personResult,
    placeResult,
    geoResult,
    destResult,
    compositeScore,
    decision,
    conflictReport,
    normObj
  };
}

// ─── 8-Problem Detector ─────────────────────────────────────────

/**
 * detectAllConflicts — ตรวจและจัดประเภทปัญหาทั้ง 8 ข้อ
 *
 * @param {{personResult, placeResult, geoResult, normObj}}
 * @returns {{
 *   conflicts: string[],       — รหัส Conflict ที่พบ
 *   details: Object,           — ข้อมูลละเอียด
 *   recommendations: Object[]  — Action ที่แนะนำให้ทำ
 * }}
 */
function detectAllConflicts({ personResult, placeResult, geoResult, normObj }) {
  const conflicts     = [];
  const details       = {};
  const recommendations = [];

  const P = personResult;  // shortcuts
  const L = placeResult;
  const G = geoResult;

  // ──────────────────────────────────────────────────────────
  // ปัญหา #1: ชื่อบุคคลซ้ำกันในระบบ
  //   → พบเมื่อ canonical match score = 100 แต่มีหลาย alias
  // ──────────────────────────────────────────────────────────
  if (P.person_id && !P.is_new && P.score === 100 && P.method === 'CANONICAL_EXACT') {
    // ตรวจว่าชื่อ raw ต่างจาก canonical หรือไม่ (คนละการพิมพ์)
    if (normObj.dest_name_raw &&
        normObj.person_name_norm !== normObj.dest_name_raw.toLowerCase().trim()) {
      conflicts.push(CONFLICT.C1_PERSON_DUPE);
      details.C1 = {
        person_id: P.person_id,
        raw_input: normObj.dest_name_raw,
        canonical: P.person_id,
        action: 'ชื่อนี้มีอยู่แล้ว — เชื่อมเข้า person เดิมโดยอัตโนมัติ'
      };
      recommendations.push({ conflict: CONFLICT.C1_PERSON_DUPE, action: ACTION.AUTO_MAP });
    }
  }

  // ──────────────────────────────────────────────────────────
  // ปัญหา #2: ชื่อสถานที่ซ้ำกันในระบบ
  // ──────────────────────────────────────────────────────────
  if (L.place_id && !L.is_new && L.score === 100) {
    conflicts.push(CONFLICT.C2_PLACE_DUPE);
    details.C2 = {
      place_id: L.place_id,
      method: L.method,
      action: 'สถานที่มีอยู่แล้ว — reuse place_id เดิม'
    };
    recommendations.push({ conflict: CONFLICT.C2_PLACE_DUPE, action: ACTION.AUTO_MAP });
  }

  // ──────────────────────────────────────────────────────────
  // ปัญหา #3: LatLong ซ้ำกัน (พิกัดเดียวกันแต่ record ใหม่)
  // ──────────────────────────────────────────────────────────
  if (G.geo_id && !G.is_new) {
    conflicts.push(CONFLICT.C3_GEO_DUPE);
    details.C3 = {
      geo_id:  G.geo_id,
      method:  G.method,
      dist_m:  G.dist_m || 0,
      action:  `พิกัดซ้ำ (method=${G.method}) — reuse geo_id เดิม`
    };
    recommendations.push({ conflict: CONFLICT.C3_GEO_DUPE, action: ACTION.AUTO_MAP });
  }

  // ──────────────────────────────────────────────────────────
  // ปัญหา #4: คนเดียวกันแต่ชื่อเขียนไม่เหมือน
  //   Fuzzy match สำเร็จ → แสดงว่าเป็นคนเดิมแต่สะกดต่าง
  // ──────────────────────────────────────────────────────────
  if (P.person_id && !P.is_new &&
      (P.method === 'FUZZY_AUTO' || P.method === 'ALIAS_EXACT') &&
      P.score < 100) {
    conflicts.push(CONFLICT.C4_SAME_PERSON_DIFF_NAME);
    details.C4 = {
      person_id:   P.person_id,
      raw_input:   normObj.dest_name_raw,
      match_score: P.score,
      method:      P.method,
      action:      `Fuzzy match ${P.score}% — เพิ่ม Alias อัตโนมัติ`
    };
    recommendations.push({
      conflict: CONFLICT.C4_SAME_PERSON_DIFF_NAME,
      action:   P.score >= parseFloat(getConfig('AUTO_MATCH_SCORE') || '90')
        ? ACTION.ADD_ALIAS : ACTION.MANUAL,
      note: `"${normObj.dest_name_raw}" → person_id ${P.person_id} (${P.score}%)`
    });
  }

  // ──────────────────────────────────────────────────────────
  // ปัญหา #5: คนละชื่อ แต่สถานที่เดียวกัน
  //   Place match สำเร็จ แต่ Person เป็นใหม่
  // ──────────────────────────────────────────────────────────
  if (L.place_id && !L.is_new && P.is_new) {
    conflicts.push(CONFLICT.C5_DIFF_PERSON_SAME_PLACE);
    details.C5 = {
      new_person_name: normObj.dest_name_raw,
      existing_place:  L.place_id,
      action: 'สถานที่เดิม — เพิ่ม Person ใหม่เชื่อมกับ Place เดิม'
    };
    recommendations.push({
      conflict: CONFLICT.C5_DIFF_PERSON_SAME_PLACE,
      action:   ACTION.CONFIRM_MULTI,
      note:     `Place ${L.place_id} มี Person ใหม่: "${normObj.dest_name_raw}"`
    });
  }

  // ──────────────────────────────────────────────────────────
  // ปัญหา #6: ชื่อเดียวกัน แต่สถานที่อยู่ไม่เหมือนกัน
  //   Person match แต่ Place ใหม่ → คนเดิมมีหลายที่ส่ง
  // ──────────────────────────────────────────────────────────
  if (P.person_id && !P.is_new && L.is_new && normObj.place_name_norm) {
    conflicts.push(CONFLICT.C6_SAME_PERSON_DIFF_PLACE);
    details.C6 = {
      person_id:      P.person_id,
      new_place_name: normObj.place_name_norm,
      existing_place: L.place_id,
      action:         'คนเดิม แต่สถานที่ใหม่ — สร้าง Destination ใหม่ให้คนนี้'
    };
    recommendations.push({
      conflict: CONFLICT.C6_SAME_PERSON_DIFF_PLACE,
      action:   ACTION.CONFIRM_MULTI,
      note:     `Person ${P.person_id} → Place ใหม่ "${normObj.place_name_norm}"`
    });
  }

  // ──────────────────────────────────────────────────────────
  // ปัญหา #7: ชื่อเดียวกัน แต่พิกัดคนละที่
  //   Person match แต่ Geo ใหม่ที่ไกลเกินรัศมี
  // ──────────────────────────────────────────────────────────
  if (P.person_id && !P.is_new && G.is_new && normObj.lat && normObj.long) {
    conflicts.push(CONFLICT.C7_SAME_PERSON_DIFF_GEO);

    // หา Geo ที่คนนี้เคยใช้ก่อนหน้า (จาก FACT_DELIVERY)
    const prevGeos = _getPersonPrevGeos(P.person_id);
    const minDist  = prevGeos.length > 0
      ? Math.min(...prevGeos.map(g => calcDistanceMeters(normObj.lat, normObj.long, g.lat, g.long)))
      : null;

    details.C7 = {
      person_id:    P.person_id,
      new_lat:      normObj.lat,
      new_long:     normObj.long,
      prev_geo_count: prevGeos.length,
      min_dist_m:   minDist !== null ? minDist.toFixed(0) + 'm' : 'N/A',
      action:       minDist !== null && minDist < 500
        ? 'พิกัดต่างเล็กน้อย — อาจเป็น GPS drift'
        : 'พิกัดต่างมาก — อาจเป็นที่ส่งใหม่จริง'
    };
    recommendations.push({
      conflict: CONFLICT.C7_SAME_PERSON_DIFF_GEO,
      action:   minDist !== null && minDist < 500
        ? ACTION.AUTO_MAP   // GPS drift — ใช้จุดเดิม
        : ACTION.CONFIRM_MULTI,  // ที่ใหม่จริง
      note: details.C7.action
    });
  }

  // ──────────────────────────────────────────────────────────
  // ปัญหา #8: คนละชื่อ แต่พิกัดเดียวกัน
  //   Geo match แต่ Person ใหม่ → หลายคนที่จุดเดิม
  // ──────────────────────────────────────────────────────────
  if (G.geo_id && !G.is_new && P.is_new) {
    conflicts.push(CONFLICT.C8_DIFF_PERSON_SAME_GEO);

    // หาว่า Geo นี้มีใครอยู่แล้วบ้าง
    const prevPersons = _getGeoPrevPersons(G.geo_id);

    details.C8 = {
      geo_id:          G.geo_id,
      new_person_name: normObj.dest_name_raw,
      existing_persons: prevPersons.map(p => p.name),
      count:           prevPersons.length,
      action:          prevPersons.length > 0
        ? `พิกัดนี้เคยส่งให้: ${prevPersons.map(p => p.name).join(', ')}`
        : 'พิกัดเดียวกัน — Person ใหม่คนแรก'
    };
    recommendations.push({
      conflict: CONFLICT.C8_DIFF_PERSON_SAME_GEO,
      action:   ACTION.CONFIRM_MULTI,
      note:     `Geo ${G.geo_id} → Person ใหม่ "${normObj.dest_name_raw}" (เดิมมี ${prevPersons.length} คน)`
    });
  }

  return { conflicts, details, recommendations };
}

// ─── Composite Score ─────────────────────────────────────────────

/**
 * calculateCompositeScore — คะแนนรวม 0-100
 * ใช้ Weight Matrix ที่กำหนดไว้
 *
 * @param {{personResult, placeResult, geoResult, normObj}}
 * @returns {number}
 */
function calculateCompositeScore({ personResult, placeResult, geoResult, normObj }) {

  let score = 0;

  // ── Person Score ────────────────────────────────────────────
  if (personResult.person_id) {
    const weight = {
      'CANONICAL_EXACT': SCORE_WEIGHTS.PERSON_EXACT,
      'ALIAS_EXACT':     SCORE_WEIGHTS.PERSON_ALIAS,
      'FUZZY_AUTO':      SCORE_WEIGHTS.PERSON_FUZZY * (personResult.score / 100),
      'NEW':             0
    }[personResult.method] ?? (SCORE_WEIGHTS.PERSON_EXACT * personResult.score / 100);
    score += weight;
  }

  // ── Place Score ─────────────────────────────────────────────
  if (placeResult.place_id) {
    const weight = {
      'CANONICAL_EXACT': SCORE_WEIGHTS.PLACE_EXACT,
      'ALIAS_EXACT':     SCORE_WEIGHTS.PLACE_ALIAS,
      'FUZZY_AUTO':      SCORE_WEIGHTS.PLACE_FUZZY * (placeResult.score / 100),
      'NEW':             0
    }[placeResult.method] ?? (SCORE_WEIGHTS.PLACE_EXACT * placeResult.score / 100);
    score += weight;
  }

  // ── Geo Score ───────────────────────────────────────────────
  if (geoResult.geo_id) {
    const weight = {
      'EXACT':        SCORE_WEIGHTS.GEO_EXACT,
      'NEAR_KEY5':    SCORE_WEIGHTS.GEO_NEAR5,
      'RADIUS_MATCH': SCORE_WEIGHTS.GEO_RADIUS,
      'NEW':          0
    }[geoResult.method] ?? 0;
    score += weight;
  }

  // ── Bonus: Address match ────────────────────────────────────
  if (normObj.address_norm && normObj.address_latlong_norm &&
      normObj.address_norm.length > 5 &&
      _stringSimilarity(normObj.address_norm, normObj.address_latlong_norm) > 0.7) {
    score += SCORE_WEIGHTS.ADDRESS_MATCH;
  }

  return Math.min(100, Math.round(score));
}

// ─── Decision Logic ──────────────────────────────────────────────

/**
 * decideAutoMatchOrReview — ตัดสิน Decision สุดท้าย
 *
 * Decision Matrix:
 *   score ≥ AUTO_MATCH_SCORE → AUTO_MATCH (ระบบทำเองได้)
 *   score ≥ REVIEW_SCORE_MIN → REVIEW (ให้คนช่วยตัดสิน)
 *   allNew = true            → NEW (สร้างทุก Entity ใหม่)
 *   มี Conflict ที่ต้องใส่ใจ → REVIEW
 *
 * @param {number} compositeScore
 * @param {Object} context
 * @returns {string}
 */
function decideAutoMatchOrReview(compositeScore, context) {
  const thresholds = getThresholds();
  const { personResult, placeResult, geoResult, conflictReport } = context;

  // ── กรณีพิเศษ: Error ─────────────────────────────────────
  const hasError = [personResult, placeResult, geoResult]
    .some(r => r.method === 'ERROR');
  if (hasError) return 'REVIEW';

  // ── กรณีใหม่ทุก Entity ────────────────────────────────────
  const allNew = personResult.is_new && placeResult.is_new && geoResult.is_new;
  if (allNew) return 'NEW';

  // ── Conflict ที่บังคับ Review ──────────────────────────────
  // C7 ที่พิกัดต่างมาก และ C8 ต้องให้คนยืนยัน
  const forceReviewConflicts = [CONFLICT.C7_SAME_PERSON_DIFF_GEO, CONFLICT.C8_DIFF_PERSON_SAME_GEO];
  const forceReview = conflictReport?.conflicts?.some(c => {
    if (!forceReviewConflicts.includes(c)) return false;
    // C7: force review เฉพาะถ้าระยะต่างมาก (> 500m)
    if (c === CONFLICT.C7_SAME_PERSON_DIFF_GEO) {
      const minDist = parseFloat(conflictReport.details?.C7?.min_dist_m) || 9999;
      return minDist > 500;
    }
    return true;
  });
  if (forceReview) return 'REVIEW';

  // ── Fuzzy Review method ────────────────────────────────────
  const needsReview = [personResult, placeResult, geoResult]
    .some(r => r.method === 'FUZZY_REVIEW');
  if (needsReview) return 'REVIEW';

  // ── Score-based ────────────────────────────────────────────
  if (compositeScore >= thresholds.autoMatch) return 'AUTO_MATCH';
  if (compositeScore >= thresholds.reviewMin)  return 'REVIEW';

  return 'NEW';
}

/**
 * buildReviewPayload — สร้าง payload สมบูรณ์สำหรับ Q_REVIEW
 * @param {Object} resolvedObj
 * @returns {Object}
 */
function buildReviewPayload(resolvedObj) {
  const { personResult, placeResult, geoResult, destResult,
    compositeScore, conflictReport, normObj } = resolvedObj;

  const topConflict = conflictReport?.conflicts?.[0] || 'UNCERTAIN_MATCH';
  const topRec = conflictReport?.recommendations?.[0];

  return {
    issue_type:              topConflict,
    source_record_id:        normObj.source_id,
    source_row_number:       normObj._rowNumber,
    invoice_no:              normObj.invoice_no,
    raw_person_name:         normObj.dest_name_raw,
    raw_place_name:          normObj.address_raw || normObj.address_latlong,
    raw_lat:                 normObj.lat,
    raw_long:                normObj.long,
    candidate_person_ids:    _formatCandidates(personResult.candidates, 'person_id'),
    candidate_place_ids:     _formatCandidates(placeResult.candidates,  'place_id'),
    candidate_geo_ids:       _formatCandidates(geoResult.candidates,    'geo_id'),
    candidate_destination_ids: destResult.destination_id || '',
    score:                   compositeScore,
    recommended_action:      topRec ? `${topRec.action}: ${topRec.note || ''}` : 'MANUAL_REVIEW',
    status:                  'PENDING'
  };
}

// ─── Context Lookup Helpers ──────────────────────────────────────

/**
 * _getPersonPrevGeos — หา Geo ที่ Person นี้เคยใช้ (จาก FACT_DELIVERY)
 * ใช้ใน conflict #7 detection
 * @param {string} personId
 * @returns {Array<{geo_id, lat, long}>}
 */
function _getPersonPrevGeos(personId) {
  try {
    const cache = CacheService.getScriptCache();
    const cKey = `PERSON_GEOS_${personId}`;
    const cached = cache.get(cKey);
    if (cached) return JSON.parse(cached);

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sh = ss.getSheetByName(SHEET_NAMES.FACT_DELIVERY);
    if (!sh || sh.getLastRow() < 2) return [];

    const data = sh.getDataRange().getValues();
    const hdr = data[0];
    const pidIdx = hdr.indexOf('person_id');
    const gidIdx = hdr.indexOf('geo_id');
    const latIdx = hdr.indexOf('raw_lat');
    const lngIdx = hdr.indexOf('raw_long');

    const result = [];
    const seen   = new Set();
    for (let i = 1; i < data.length; i++) {
      if (data[i][pidIdx] !== personId) continue;
      const geoId = data[i][gidIdx];
      if (geoId && !seen.has(geoId)) {
        seen.add(geoId);
        result.push({
          geo_id: geoId,
          lat:    parseFloat(data[i][latIdx]) || 0,
          long:   parseFloat(data[i][lngIdx]) || 0
        });
      }
    }
    cache.put(cKey, JSON.stringify(result), 600); // cache 10 นาที
    return result;
  } catch (e) {
    return [];
  }
}

/**
 * _getGeoPrevPersons — หา Person ที่เคยใช้ Geo นี้ (จาก FACT_DELIVERY)
 * ใช้ใน conflict #8 detection
 * @param {string} geoId
 * @returns {Array<{person_id, name}>}
 */
function _getGeoPrevPersons(geoId) {
  try {
    const cache = CacheService.getScriptCache();
    const cKey = `GEO_PERSONS_${geoId}`;
    const cached = cache.get(cKey);
    if (cached) return JSON.parse(cached);

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sh = ss.getSheetByName(SHEET_NAMES.FACT_DELIVERY);
    if (!sh || sh.getLastRow() < 2) return [];

    const data = sh.getDataRange().getValues();
    const hdr = data[0];
    const gidIdx = hdr.indexOf('geo_id');
    const pidIdx = hdr.indexOf('person_id');
    const nameIdx = hdr.indexOf('raw_person_name');

    const result = [];
    const seen = new Set();
    for (let i = 1; i < data.length; i++) {
      if (data[i][gidIdx] !== geoId) continue;
      const pid = data[i][pidIdx];
      if (pid && !seen.has(pid)) {
        seen.add(pid);
        result.push({ person_id: pid, name: data[i][nameIdx] || '' });
      }
    }
    cache.put(cKey, JSON.stringify(result), 600);
    return result;
  } catch (e) {
    return [];
  }
}

// ─── String Similarity ───────────────────────────────────────────

/**
 * _stringSimilarity — Jaccard similarity ระหว่าง 2 strings (0–1)
 */
function _stringSimilarity(a, b) {
  if (!a || !b) return 0;
  const setA = new Set(a.split(''));
  const setB = new Set(b.split(''));
  const intersection = [...setA].filter(x => setB.has(x)).length;
  const union = new Set([...setA, ...setB]).size;
  return union === 0 ? 0 : intersection / union;
}

/**
 * _formatCandidates — แปลง candidates array เป็น string สำหรับ Q_REVIEW
 */
function _formatCandidates(candidates, idField) {
  if (!candidates || candidates.length === 0) return '';
  return candidates.map(c => `${c[idField] || ''}(${c.score || c.dist_m || '?'})`).join(',');
}
// ============================================================
// FILE: 11_TransactionService.gs
// VERSION: 001
// MODULE: TransactionService — บันทึก FACT_DELIVERY
// ============================================================

/**
 * saveProcessingResult — บันทึกผลการประมวลผลลง FACT_DELIVERY
 * และ enqueue review ถ้าจำเป็น
 * @param {Object} normObj
 * @param {Object} resolvedObj (จาก matchAllEntities)
 * @returns {string} tx_id
 */
function saveProcessingResult(normObj, resolvedObj) {
  // ป้องกัน duplicate
  const dupeCheck = preventDuplicateTransaction(normObj.source_id, normObj.invoice_no);
  if (dupeCheck) {
    writeLog('WARN', '11_TransactionService', 'saveProcessingResult', null,
      `Duplicate transaction: source_id=${normObj.source_id}`, null);
    return dupeCheck; // คืน tx_id เดิม
  }

  const factObj = buildFactRow(normObj, resolvedObj);
  const txId = upsertFactDelivery(factObj);

  // ถ้าต้อง Review — ส่งเข้า Queue
  if (resolvedObj.decision === 'REVIEW') {
    const reviewPayload = buildReviewPayload(resolvedObj);
    reviewPayload.tx_id = txId;
    enqueueReview(reviewPayload);
  }

  // อัปเดต stats ของ Master records
  if (resolvedObj.personResult.person_id)
    updatePersonStats(resolvedObj.personResult.person_id);
  if (resolvedObj.placeResult.place_id)
    updatePlaceStats(resolvedObj.placeResult.place_id);

  return txId;
}

/**
 * buildFactRow — สร้าง object สำหรับ FACT_DELIVERY row
 * @param {Object} normObj
 * @param {Object} resolvedObj
 * @returns {Object}
 */
function buildFactRow(normObj, resolvedObj) {
  const { personResult, placeResult, geoResult, destResult, decision } = resolvedObj;
  const now = new Date();

  return {
    tx_id:             'TX-' + uuid().replace(/-/g, '').substr(0, 12).toUpperCase(),
    source_sheet:      SHEET_NAMES.SOURCE,
    source_row_number: normObj._rowNumber,
    source_record_id:  normObj.source_id,
    delivery_date:     normObj.delivery_date,
    delivery_time:     normObj.delivery_time,
    shipment_no:       normObj.shipment_no,
    invoice_no:        normObj.invoice_no,
    owner_name:        normObj.owner_name,
    customer_code:     normObj.customer_code,
    raw_person_name:   normObj.dest_name_raw,
    raw_place_name:    normObj.address_raw,
    raw_address:       normObj.address_latlong || normObj.address_raw,
    raw_lat:           normObj.lat,
    raw_long:          normObj.long,
    person_id:         personResult.person_id || '',
    place_id:          placeResult.place_id   || '',
    geo_id:            geoResult.geo_id       || '',
    destination_id:    destResult.destination_id || '',
    warehouse:         normObj.warehouse,
    distance_km:       normObj.distance_km,
    driver_name:       normObj.driver_name,
    employee_id:       normObj.employee_id,
    employee_email:    normObj.employee_email,
    license_plate:     normObj.license_plate,
    validation_result: normObj.validation_result,
    anomaly_reason:    normObj.anomaly_reason,
    review_status:     decision === 'REVIEW' ? 'PENDING' : 'APPROVED',
    sync_status:       decision,
    created_at:        now,
    updated_at:        now
  };
}

/**
 * upsertFactDelivery — เพิ่มหรืออัปเดต FACT_DELIVERY
 * @param {Object} factObj
 * @returns {string} tx_id
 */
function upsertFactDelivery(factObj) {
  return withLock(() => {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sh = ss.getSheetByName(SHEET_NAMES.FACT_DELIVERY);
    const headers = SHEET_HEADERS.FACT_DELIVERY;

    const row = headers.map(h => factObj[h] !== undefined ? factObj[h] : '');
    sh.appendRow(row);

    return factObj.tx_id;
  });
}

/**
 * preventDuplicateTransaction — ตรวจซ้ำจาก source_record_id
 * @param {string} sourceRecordId
 * @param {string} invoiceNo
 * @returns {string|null} tx_id ถ้าซ้ำ, null ถ้าไม่ซ้ำ
 */
function preventDuplicateTransaction(sourceRecordId, invoiceNo) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sh = ss.getSheetByName(SHEET_NAMES.FACT_DELIVERY);
    if (!sh || sh.getLastRow() < 2) return null;

    const data = sh.getDataRange().getValues();
    const hdr = data[0];
    const txIdx  = hdr.indexOf('tx_id');
    const srcIdx = hdr.indexOf('source_record_id');

    for (let i = 1; i < data.length; i++) {
      if (data[i][srcIdx] === sourceRecordId) return data[i][txIdx];
    }
    return null;
  } catch (e) {
    return null;
  }
}

/**
 * linkFactToMasters — เพิ่ม link ย้อนกลับ (สำหรับ future use)
 * @param {string} txId
 * @param {Object} resolvedObj
 */
function linkFactToMasters(txId, resolvedObj) {
  // Reserved for future BigQuery / Firestore integration
  writeLog('DEBUG', '11_TransactionService', 'linkFactToMasters', txId,
    'link recorded', JSON.stringify({
      person_id: resolvedObj.personResult.person_id,
      place_id:  resolvedObj.placeResult.place_id,
      geo_id:    resolvedObj.geoResult.geo_id
    }));
}


// ============================================================
// FILE: 12_ReviewService.gs
// VERSION: 001
// MODULE: ReviewService — จัดการ Q_REVIEW และการเรียนรู้
// ============================================================

/**
 * enqueueReview — เพิ่มรายการเข้า Q_REVIEW
 * @param {Object} reviewPayload (จาก buildReviewPayload)
 * @returns {string} review_id
 */
function enqueueReview(reviewPayload) {
  return withLock(() => {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sh = ss.getSheetByName(SHEET_NAMES.Q_REVIEW);
    const reviewId = 'RVW-' + uuid().replace(/-/g, '').substr(0, 10).toUpperCase();
    const headers = SHEET_HEADERS.Q_REVIEW;

    const fullPayload = { review_id: reviewId, ...reviewPayload };
    const row = headers.map(h => fullPayload[h] !== undefined ? fullPayload[h] : '');
    sh.appendRow(row);

    writeLog('INFO', '12_ReviewService', 'enqueueReview', reviewId,
      `Queued review: ${reviewPayload.issue_type} | ${reviewPayload.raw_person_name}`, null);
    return reviewId;
  });
}

/**
 * getPendingReviews — ดึงรายการที่รอการตรวจสอบ
 * @returns {Object[]}
 */
function getPendingReviews() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = ss.getSheetByName(SHEET_NAMES.Q_REVIEW);
  if (!sh || sh.getLastRow() < 2) return [];

  const data = sh.getDataRange().getValues();
  const headers = data[0];
  const statusIdx = headers.indexOf('status');
  const result = [];

  for (let i = 1; i < data.length; i++) {
    if (data[i][statusIdx] === 'PENDING') {
      const obj = {};
      headers.forEach((h, j) => { obj[h] = data[i][j]; });
      obj._rowNumber = i + 1;
      result.push(obj);
    }
  }
  return result;
}

/**
 * applyReviewDecision — บันทึกคำตัดสินของ Admin
 * @param {string} reviewId
 * @param {string} decision — 'MERGE_PERSON' | 'MERGE_PLACE' | 'KEEP_SEPARATE' | 'CREATE_NEW'
 * @param {Object} details — { target_person_id, target_place_id, reviewer }
 */
function applyReviewDecision(reviewId, decision, details) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sh = ss.getSheetByName(SHEET_NAMES.Q_REVIEW);
    if (!sh || sh.getLastRow() < 2) return;

    const data = sh.getDataRange().getValues();
    const headers = data[0];
    const idIdx   = headers.indexOf('review_id');
    const statusIdx = headers.indexOf('status');
    const decisionIdx = headers.indexOf('decision');
    const reviewerIdx = headers.indexOf('reviewer');
    const reviewedAtIdx = headers.indexOf('reviewed_at');

    for (let i = 1; i < data.length; i++) {
      if (data[i][idIdx] !== reviewId) continue;

      // อัปเดต decision
      sh.getRange(i + 1, statusIdx + 1).setValue('RESOLVED');
      sh.getRange(i + 1, decisionIdx + 1).setValue(decision);
      sh.getRange(i + 1, reviewerIdx + 1).setValue(details.reviewer || 'ADMIN');
      sh.getRange(i + 1, reviewedAtIdx + 1).setValue(new Date());

      // Execute decision
      if (decision === 'MERGE_PERSON' && details.source_person_id && details.target_person_id) {
        mergeMasterRecords('PERSON', details.source_person_id, details.target_person_id);
        learnAliasFromReview(reviewId, data[i], headers);
      } else if (decision === 'MERGE_PLACE' && details.source_place_id && details.target_place_id) {
        mergeMasterRecords('PLACE', details.source_place_id, details.target_place_id);
      }

      writeLog('INFO', '12_ReviewService', 'applyReviewDecision', reviewId,
        `Decision: ${decision}`, JSON.stringify(details));
      return;
    }
    writeLog('WARN', '12_ReviewService', 'applyReviewDecision', reviewId,
      'review_id ไม่พบ', null);

  } catch (e) {
    writeLog('ERROR', '12_ReviewService', 'applyReviewDecision', reviewId, e.message, null);
  }
}

/**
 * mergeMasterRecords — Merge master records (RULE 4: ใช้ Archived ไม่ใช่ delete)
 * @param {'PERSON'|'PLACE'} masterType
 * @param {string} sourceId — ID ที่จะถูก merge (จะถูก Archive)
 * @param {string} targetId — ID ปลายทาง (master ที่ถูกต้อง)
 */
function mergeMasterRecords(masterType, sourceId, targetId) {
  try {
    const sheetName = masterType === 'PERSON' ? SHEET_NAMES.M_PERSON : SHEET_NAMES.M_PLACE;
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sh = ss.getSheetByName(sheetName);
    if (!sh) return;

    const data = sh.getDataRange().getValues();
    const statusCol = masterType === 'PERSON' ? 7 : 10; // 1-based

    // Archive source record (RULE 4: ห้าม delete)
    for (let i = 1; i < data.length; i++) {
      if (data[i][0] === sourceId) {
        sh.getRange(i + 1, statusCol).setValue('MERGED_TO:' + targetId);
        sh.getRange(i + 1, statusCol + 1).setValue('Merged to ' + targetId + ' by Review');
        break;
      }
    }

    // อัปเดต FACT_DELIVERY ให้ใช้ targetId แทน
    _redirectFactsToTarget(masterType, sourceId, targetId);

    writeLog('INFO', '12_ReviewService', 'mergeMasterRecords', null,
      `Merged ${masterType}: ${sourceId} → ${targetId}`, null);

    // Clear caches
    if (masterType === 'PERSON') _clearPersonCache();
    else _clearPlaceCache();

  } catch (e) {
    writeLog('ERROR', '12_ReviewService', 'mergeMasterRecords', null, e.message, null);
  }
}

/**
 * learnAliasFromReview — เพิ่ม alias ที่เรียนรู้จาก review decision
 * @param {string} reviewId
 * @param {Array} reviewRow
 * @param {Array} headers
 */
function learnAliasFromReview(reviewId, reviewRow, headers) {
  try {
    const rawNameIdx = headers.indexOf('raw_person_name');
    const rawName = reviewRow[rawNameIdx];
    if (!rawName) return;

    // ดึง target person_id จาก note หรือ decision field
    const decisionIdx = headers.indexOf('decision');
    const decision = reviewRow[decisionIdx] || '';
    const targetMatch = decision.match(/MERGE_PERSON:([A-Z0-9\-]+)/);
    if (!targetMatch) return;

    const targetPersonId = targetMatch[1];
    const normalizedAlias = normalizePersonName(rawName);
    createPersonAlias(targetPersonId, rawName, normalizedAlias);

    writeLog('INFO', '12_ReviewService', 'learnAliasFromReview', reviewId,
      `เพิ่ม Alias "${normalizedAlias}" → ${targetPersonId}`, null);
  } catch (e) {
    writeLog('WARN', '12_ReviewService', 'learnAliasFromReview', reviewId, e.message, null);
  }
}

/**
 * closeReviewItem — ปิด review item ที่เสร็จแล้ว
 * @param {string} reviewId
 */
function closeReviewItem(reviewId) {
  applyReviewDecision(reviewId, 'CLOSED', { reviewer: 'SYSTEM' });
}

// ─────────────────────────────────────────────
// PRIVATE HELPERS
// ─────────────────────────────────────────────

/**
 * _redirectFactsToTarget — อัปเดต FACT_DELIVERY ให้ใช้ ID ใหม่หลัง merge
 */
function _redirectFactsToTarget(masterType, sourceId, targetId) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = ss.getSheetByName(SHEET_NAMES.FACT_DELIVERY);
  if (!sh || sh.getLastRow() < 2) return;

  const data = sh.getDataRange().getValues();
  const headers = data[0];
  const colName = masterType === 'PERSON' ? 'person_id' : 'place_id';
  const colIdx  = headers.indexOf(colName);
  if (colIdx < 0) return;

  const updates = [];
  for (let i = 1; i < data.length; i++) {
    if (data[i][colIdx] === sourceId) {
      updates.push({ row: i + 1, col: colIdx + 1, val: targetId });
    }
  }

  // RULE 6: Batch update
  for (const u of updates) {
    sh.getRange(u.row, u.col).setValue(u.val);
  }
}
// ============================================================
// FILE: 13_ReportService.gs
// VERSION: 001
// MODULE: ReportService — รายงานคุณภาพข้อมูล
// ============================================================

/**
 * refreshQualityReport — รีเฟรช RPT_DATA_QUALITY
 * สรุปข้อมูลล่าสุดจาก FACT_DELIVERY และ Master tables
 */
function refreshQualityReport() {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const today = new Date();
    const todayStr = Utilities.formatDate(today, Session.getScriptTimeZone(), 'yyyy-MM-dd');

    // นับข้อมูลจาก FACT_DELIVERY วันนี้
    const factData = _getFactDataToday(todayStr);

    // นับ Master ใหม่วันนี้
    const newPersonCount = _countNewMastersToday(SHEET_NAMES.M_PERSON, 'first_seen_date', todayStr);
    const newPlaceCount  = _countNewMastersToday(SHEET_NAMES.M_PLACE,  'first_seen_date', todayStr);
    const newGeoCount    = _countNewMastersToday(SHEET_NAMES.M_GEO_POINT, 'first_seen_date', todayStr);
    const newDestCount   = _countNewMastersToday(SHEET_NAMES.M_DESTINATION, 'first_seen_date', todayStr);

    // นับ Reviews และ Errors
    const reviewCount  = _countReviewsToday(todayStr);
    const errorCount   = _countErrors();

    const snapshot = {
      report_date:            today,
      total_source_rows:      factData.total,
      processed_rows:         factData.processed,
      new_person_count:       newPersonCount,
      new_place_count:        newPlaceCount,
      new_geo_count:          newGeoCount,
      new_destination_count:  newDestCount,
      auto_match_count:       factData.autoMatch,
      review_count:           reviewCount,
      duplicate_alert_count:  factData.duplicates,
      error_count:            errorCount,
      last_refresh_at:        today
    };

    writeReportSnapshot(snapshot);
    writeLog('INFO', '13_ReportService', 'refreshQualityReport', null,
      `Report refreshed: ${todayStr}`, JSON.stringify(snapshot));

    return snapshot;
  } catch (e) {
    writeLog('ERROR', '13_ReportService', 'refreshQualityReport', null, e.message, null);
    return null;
  }
}

/**
 * buildDuplicateReport — สร้างรายงาน Duplicates ที่ตรวจพบ
 * @returns {Object[]}
 */
function buildDuplicateReport() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = ss.getSheetByName(SHEET_NAMES.FACT_DELIVERY);
  if (!sh || sh.getLastRow() < 2) return [];

  const data = sh.getDataRange().getValues();
  const headers = data[0];
  const invoiceIdx = headers.indexOf('invoice_no');
  const txIdx = headers.indexOf('tx_id');

  const seen = {};
  const dupes = [];
  for (let i = 1; i < data.length; i++) {
    const inv = data[i][invoiceIdx];
    if (!inv) continue;
    if (seen[inv]) {
      dupes.push({ invoice_no: inv, tx_id_first: seen[inv], tx_id_dupe: data[i][txIdx], row: i + 1 });
    } else {
      seen[inv] = data[i][txIdx];
    }
  }
  return dupes;
}

/**
 * buildConflictReport — รายงาน Conflicts ประเภทต่างๆ
 * @returns {Object}
 */
function buildConflictReport() {
  const reviews = getPendingReviews();
  const byType = {};
  reviews.forEach(r => {
    byType[r.issue_type] = (byType[r.issue_type] || 0) + 1;
  });
  return { total: reviews.length, byType };
}

/**
 * buildDailySummary — สรุปประจำวัน
 * @returns {Object}
 */
function buildDailySummary() {
  const snapshot = refreshQualityReport();
  const conflicts = buildConflictReport();
  const dupes = buildDuplicateReport();

  return { snapshot, conflicts, duplicates: dupes.length, asOf: new Date() };
}

/**
 * writeReportSnapshot — บันทึก snapshot ลง RPT_DATA_QUALITY
 * @param {Object} snapshot
 */
function writeReportSnapshot(snapshot) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sh = ss.getSheetByName(SHEET_NAMES.RPT_QUALITY);
    if (!sh) return;

    const headers = SHEET_HEADERS.RPT_DATA_QUALITY;
    const row = headers.map(h => snapshot[h] !== undefined ? snapshot[h] : '');

    // อัปเดต row ของวันนี้ถ้ามีอยู่แล้ว
    if (sh.getLastRow() > 1) {
      const data = sh.getDataRange().getValues();
      const dateIdx = 0;
      const todayStr = Utilities.formatDate(
        snapshot.report_date || new Date(),
        Session.getScriptTimeZone(), 'yyyy-MM-dd'
      );
      for (let i = 1; i < data.length; i++) {
        const rowDate = data[i][dateIdx]
          ? Utilities.formatDate(new Date(data[i][dateIdx]), Session.getScriptTimeZone(), 'yyyy-MM-dd')
          : '';
        if (rowDate === todayStr) {
          sh.getRange(i + 1, 1, 1, headers.length).setValues([row]);
          return;
        }
      }
    }
    sh.appendRow(row);
  } catch (e) {
    writeLog('WARN', '13_ReportService', 'writeReportSnapshot', null, e.message, null);
  }
}

// ─────────────────────────────────────────────
// PRIVATE HELPERS
// ─────────────────────────────────────────────

function _getFactDataToday(todayStr) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = ss.getSheetByName(SHEET_NAMES.FACT_DELIVERY);
  if (!sh || sh.getLastRow() < 2) return { total: 0, processed: 0, autoMatch: 0, duplicates: 0 };

  const data = sh.getDataRange().getValues();
  const headers = data[0];
  const createdIdx = headers.indexOf('created_at');
  const syncIdx    = headers.indexOf('sync_status');

  let total = 0, processed = 0, autoMatch = 0, duplicates = 0;
  const tz = Session.getScriptTimeZone();

  for (let i = 1; i < data.length; i++) {
    const rowDate = data[i][createdIdx]
      ? Utilities.formatDate(new Date(data[i][createdIdx]), tz, 'yyyy-MM-dd') : '';
    if (rowDate !== todayStr) continue;
    total++;
    const status = data[i][syncIdx];
    if (status === 'AUTO_MATCH' || status === 'PROCESSED' || status === 'NEW') processed++;
    if (status === 'AUTO_MATCH') autoMatch++;
  }
  return { total, processed, autoMatch, duplicates };
}

function _countNewMastersToday(sheetName, dateCol, todayStr) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = ss.getSheetByName(sheetName);
  if (!sh || sh.getLastRow() < 2) return 0;
  const data = sh.getDataRange().getValues();
  const headers = data[0];
  const dateIdx = headers.indexOf(dateCol);
  if (dateIdx < 0) return 0;
  const tz = Session.getScriptTimeZone();
  let count = 0;
  for (let i = 1; i < data.length; i++) {
    const d = data[i][dateIdx];
    if (!d) continue;
    const s = Utilities.formatDate(new Date(d), tz, 'yyyy-MM-dd');
    if (s === todayStr) count++;
  }
  return count;
}

function _countReviewsToday(todayStr) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = ss.getSheetByName(SHEET_NAMES.Q_REVIEW);
  if (!sh || sh.getLastRow() < 2) return 0;
  const data = sh.getDataRange().getValues();
  const headers = data[0];
  const statusIdx = headers.indexOf('status');
  return data.slice(1).filter(r => r[statusIdx] === 'PENDING').length;
}

function _countErrors() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = ss.getSheetByName(SHEET_NAMES.FACT_DELIVERY);
  if (!sh || sh.getLastRow() < 2) return 0;
  const data = sh.getDataRange().getValues();
  const headers = data[0];
  const syncIdx = headers.indexOf('sync_status');
  return data.slice(1).filter(r => r[syncIdx] === 'ERROR').length;
}


// ============================================================
// FILE: 14_Utils.gs
// VERSION: 001
// MODULE: Utils — ฟังก์ชันช่วยเหลือทั่วไป
// ============================================================

/**
 * uuid — สร้าง UUID v4
 * @returns {string}
 */
function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = Math.random() * 16 | 0;
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
}

/**
 * safeTrim — trim string อย่างปลอดภัย
 * @param {*} value
 * @returns {string}
 */
function safeTrim(value) {
  if (value === null || value === undefined) return '';
  return String(value).trim();
}

/**
 * safeString — แปลงเป็น string อย่างปลอดภัย
 * @param {*} value
 * @returns {string}
 */
function safeString(value) {
  if (value === null || value === undefined) return '';
  const s = String(value).trim();
  return s === 'undefined' || s === 'null' ? '' : s;
}

/**
 * safeNumber — แปลงเป็น number อย่างปลอดภัย
 * @param {*} value
 * @returns {number}
 */
function safeNumber(value) {
  if (value === null || value === undefined || value === '') return 0;
  const n = parseFloat(String(value).replace(/,/g, ''));
  return isNaN(n) ? 0 : n;
}

/**
 * safeDate — แปลงเป็น Date อย่างปลอดภัย
 * @param {*} value
 * @returns {Date|string}
 */
function safeDate(value) {
  if (!value) return '';
  if (value instanceof Date) return value;
  const d = new Date(value);
  return isNaN(d.getTime()) ? String(value) : d;
}

/**
 * withLock — Execute callback ภายใน ScriptLock (RULE 6 + concurrency safe)
 * @param {Function} callback
 * @returns {*} ค่าที่ callback return
 */
function withLock(callback) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(30000); // รอ 30 วินาที
    return callback();
  } catch (e) {
    writeLog('ERROR', '14_Utils', 'withLock', null, 'Lock timeout: ' + e.message, null);
    throw e;
  } finally {
    lock.releaseLock();
  }
}

/**
 * writeLog — บันทึก Log ลง SYS_LOG
 * RULE 7: ใช้ใน try-catch ทุก service function
 * @param {string} level — INFO | WARN | ERROR | DEBUG
 * @param {string} moduleName
 * @param {string} functionName
 * @param {string|null} refId
 * @param {string} message
 * @param {string|null} payloadJson
 */
function writeLog(level, moduleName, functionName, refId, message, payloadJson) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sh = ss.getSheetByName('SYS_LOG');
    if (!sh) return; // ถ้ายังไม่มีชีต — skip

    // Console output เพิ่มด้วย
    const consoleMsg = `[${level}][${moduleName}.${functionName}] ${message}`;
    if (level === 'ERROR') console.error(consoleMsg);
    else if (level === 'WARN') console.warn(consoleMsg);
    else console.log(consoleMsg);

    // เขียนลงชีต (ไม่ใช้ withLock เพื่อหลีกเลี่ยง deadlock ใน catch)
    sh.appendRow([
      uuid().substr(0, 8).toUpperCase(),   // log_id
      refId || '',                          // run_id
      new Date(),                           // created_at
      level,
      moduleName,
      functionName,
      refId || '',
      message,
      payloadJson || ''
    ]);
  } catch (logErr) {
    console.error('writeLog failed:', logErr.message);
  }
}

/**
 * chunkArray — แบ่ง array เป็น chunks
 * @param {Array} arr
 * @param {number} size
 * @returns {Array[]}
 */
function chunkArray(arr, size) {
  const chunks = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}

/**
 * formatDateThai — แปลงวันที่เป็นรูปแบบไทย
 * @param {Date|string} date
 * @returns {string}
 */
function formatDateThai(date) {
  if (!date) return '';
  const d = date instanceof Date ? date : new Date(date);
  if (isNaN(d.getTime())) return String(date);
  return Utilities.formatDate(d, Session.getScriptTimeZone(), 'dd/MM/yyyy HH:mm:ss');
}

/**
 * isValidLatLong — ตรวจสอบว่า lat/long อยู่ในประเทศไทย
 * @param {number} lat
 * @param {number} long
 * @returns {boolean}
 */
function isValidLatLong(lat, long) {
  return lat >= 5.0 && lat <= 21.0 && long >= 97.0 && long <= 106.0;
}

/**
 * deepEqual — เปรียบเทียบ object แบบ deep
 * @param {*} a
 * @param {*} b
 * @returns {boolean}
 */
function deepEqual(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}
// ============================================================
// FILE: 15_CheckpointService.gs
// VERSION: 001
// MODULE: CheckpointService
//   — ระบบ Checkpoint + Time Guard สำหรับ Google Apps Script
//
// WHY THIS EXISTS:
//   Google Apps Script มี Hard Limit 6 นาที (360 วินาที)
//   ถ้าสคริปต์ทำงานเกิน 6 นาทีจะถูกบังคับหยุด
//   ผลคือ: ข้อมูลเขียนค้างกลางคัน, Sync Status ไม่อัปเดต,
//   รอบหน้าประมวลผลซ้ำ หรือข้ามข้อมูลที่ควรทำ
//
// SOLUTION:
//   - ตัดการทำงานก่อน 5 นาที (buffer 60 วินาที)
//   - บันทึก Checkpoint: row ล่าสุดที่ทำเสร็จ + สถิติ
//   - รันครั้งถัดไปอ่าน Checkpoint แล้วต่อจากตรงนั้น
//   - ถ้าไม่มี Checkpoint = เริ่มจาก row 2 ใหม่
// ============================================================

// ─── Constants ───────────────────────────────────────────────
const EXEC_LIMIT_SECONDS  = 300;   // 5 นาที = ตัดก่อน Hard Limit 60 วินาที
const CHECKPOINT_KEY      = 'MDM_CHECKPOINT';
const CHECKPOINT_CACHE_S  = 21600; // 6 ชั่วโมง

// ─── ExecutionTimer Class (Singleton Pattern) ─────────────────

/**
 * createTimer — สร้าง Timer object สำหรับ session นี้
 * เรียกครั้งเดียวต้น runDailyProcess
 * @returns {Object} timer
 */
function createTimer() {
  const startMs = Date.now();
  return {
    startMs,

    /** elapsed — เวลาที่ผ่านไป (วินาที) */
    elapsed() {
      return (Date.now() - startMs) / 1000;
    },

    /** remaining — เวลาที่เหลือ (วินาที) */
    remaining() {
      return EXEC_LIMIT_SECONDS - this.elapsed();
    },

    /** isNearLimit — true ถ้าเหลือเวลา < 30 วินาที */
    isNearLimit() {
      return this.remaining() < 30;
    },

    /** shouldStop — true ถ้าเกิน budget แล้ว */
    shouldStop() {
      return this.elapsed() >= EXEC_LIMIT_SECONDS;
    },

    /** summary — สรุป string */
    summary() {
      const e = this.elapsed().toFixed(1);
      const r = this.remaining().toFixed(1);
      return `ใช้ไป ${e}s / เหลือ ${r}s`;
    }
  };
}

// ─── Checkpoint Save / Load ───────────────────────────────────

/**
 * saveCheckpoint — บันทึก Checkpoint ลง PropertiesService
 * (PropertiesService ถาวรกว่า CacheService — ไม่หายหลังสคริปต์หยุด)
 *
 * @param {Object} cp — {
 *   lastProcessedRow: number,   // row number สุดท้ายที่เสร็จ (1-based)
 *   runId: string,              // run ID ของ session นี้
 *   totalDone: number,          // จำนวน row ที่ทำเสร็จ session นี้
 *   totalOk: number,
 *   totalReview: number,
 *   totalError: number,
 *   savedAt: string (ISO),      // เวลาที่บันทึก
 *   sourceLastRow: number       // จำนวน row ทั้งหมดในชีตต้นทาง
 * }
 */
function saveCheckpoint(cp) {
  try {
    const payload = JSON.stringify({ ...cp, savedAt: new Date().toISOString() });
    PropertiesService.getScriptProperties().setProperty(CHECKPOINT_KEY, payload);
    // Cache ด้วยสำหรับ read เร็ว
    CacheService.getScriptCache().put(CHECKPOINT_KEY, payload, CHECKPOINT_CACHE_S);

    writeLog('INFO', '15_CheckpointService', 'saveCheckpoint', cp.runId,
      `💾 Checkpoint saved: row ${cp.lastProcessedRow} | done=${cp.totalDone}`,
      null);
  } catch (e) {
    writeLog('ERROR', '15_CheckpointService', 'saveCheckpoint', null,
      'บันทึก Checkpoint ไม่สำเร็จ: ' + e.message, null);
  }
}

/**
 * loadCheckpoint — โหลด Checkpoint จาก PropertiesService
 * @returns {Object|null} checkpoint object หรือ null ถ้าไม่มี
 */
function loadCheckpoint() {
  try {
    // อ่านจาก Cache ก่อน (เร็วกว่า)
    const cached = CacheService.getScriptCache().get(CHECKPOINT_KEY);
    if (cached) return JSON.parse(cached);

    const stored = PropertiesService.getScriptProperties().getProperty(CHECKPOINT_KEY);
    if (!stored) return null;

    const cp = JSON.parse(stored);
    // Refresh cache
    CacheService.getScriptCache().put(CHECKPOINT_KEY, stored, CHECKPOINT_CACHE_S);
    return cp;
  } catch (e) {
    writeLog('WARN', '15_CheckpointService', 'loadCheckpoint', null,
      'อ่าน Checkpoint ไม่สำเร็จ: ' + e.message, null);
    return null;
  }
}

/**
 * clearCheckpoint — ล้าง Checkpoint เมื่อประมวลผลเสร็จสมบูรณ์
 */
function clearCheckpoint() {
  try {
    PropertiesService.getScriptProperties().deleteProperty(CHECKPOINT_KEY);
    CacheService.getScriptCache().remove(CHECKPOINT_KEY);
    writeLog('INFO', '15_CheckpointService', 'clearCheckpoint', null,
      '🗑 Checkpoint cleared — งานเสร็จสมบูรณ์', null);
  } catch (e) {
    writeLog('WARN', '15_CheckpointService', 'clearCheckpoint', null, e.message, null);
  }
}

/**
 * getCheckpointStatus — แสดงสถานะ Checkpoint ปัจจุบัน (ใช้ใน UI)
 * @returns {Object}
 */
function getCheckpointStatus() {
  const cp = loadCheckpoint();
  if (!cp) return { exists: false, message: 'ไม่มี Checkpoint — จะเริ่มใหม่จาก row แรก' };

  const savedAt = new Date(cp.savedAt);
  const ageMinutes = ((Date.now() - savedAt.getTime()) / 60000).toFixed(1);
  const progress = cp.sourceLastRow > 0
    ? ((cp.lastProcessedRow / cp.sourceLastRow) * 100).toFixed(1) : '?';

  return {
    exists: true,
    lastProcessedRow: cp.lastProcessedRow,
    sourceLastRow:    cp.sourceLastRow,
    progressPct:      progress,
    totalDone:        cp.totalDone,
    totalOk:          cp.totalOk,
    totalReview:      cp.totalReview,
    totalError:       cp.totalError,
    savedAt:          cp.savedAt,
    ageMinutes,
    message: `⏸ มี Checkpoint: row ${cp.lastProcessedRow}/${cp.sourceLastRow} (${progress}%) | บันทึกเมื่อ ${ageMinutes} นาทีที่แล้ว`
  };
}

/**
 * showCheckpointStatus — แสดง Checkpoint Status ผ่าน UI Alert
 * เรียกจากเมนู
 */
function showCheckpointStatus() {
  const status = getCheckpointStatus();
  const ui = SpreadsheetApp.getUi();

  if (!status.exists) {
    ui.alert('📋 Checkpoint Status', status.message, ui.ButtonSet.OK);
    return;
  }

  const msg = [
    `📌 Row ล่าสุดที่ทำ: ${status.lastProcessedRow} / ${status.sourceLastRow}`,
    `📊 Progress: ${status.progressPct}%`,
    `✔ สำเร็จ: ${status.totalOk} | 🔍 Review: ${status.totalReview} | ❌ Error: ${status.totalError}`,
    `⏱ บันทึกเมื่อ: ${status.ageMinutes} นาทีที่แล้ว`,
    '',
    'กด "Run Daily Process" เพื่อทำต่อจากจุดนี้'
  ].join('\n');

  ui.alert('⏸ Checkpoint พบข้อมูลค้าง', msg, ui.ButtonSet.OK);
}

/**
 * resetAndRestart — ล้าง Checkpoint แล้วเริ่มใหม่จาก row แรก
 * ใช้เมื่อต้องการ reprocess ทั้งหมด
 */
function resetAndRestart() {
  const ui = SpreadsheetApp.getUi();
  const resp = ui.alert(
    '⚠ Reset และเริ่มใหม่',
    'ระบบจะล้าง Checkpoint และเริ่ม process ใหม่จาก row แรกทั้งหมด\n\nดำเนินการต่อหรือไม่?',
    ui.ButtonSet.YES_NO
  );
  if (resp !== ui.Button.YES) return;

  clearCheckpoint();
  ui.alert('✅ ล้าง Checkpoint แล้ว', 'กด "Run Daily Process" เพื่อเริ่มใหม่', ui.ButtonSet.OK);
}

// ─── Time-Safe Batch Runner ───────────────────────────────────

/**
 * runWithTimeGuard — Wrapper สำหรับรัน batch loop อย่างปลอดภัย
 *
 * ทำงานดังนี้:
 *   1. โหลด Checkpoint (ถ้ามี) → ข้ามแถวที่เคยทำแล้ว
 *   2. วน loop ทีละแถว พร้อม check เวลาทุกแถว
 *   3. ถ้าใกล้ครบ 5 นาที → บันทึก Checkpoint แล้วหยุด
 *   4. ถ้าทำเสร็จทุกแถว → ล้าง Checkpoint
 *
 * @param {Object[]} allRows        — ข้อมูลทั้งหมดจากชีตต้นทาง
 * @param {Function} processRowFn   — function(row) → { ok, decision }
 * @param {string}   runId          — UUID ของ run นี้
 * @returns {Object} — สรุปผล
 */
function runWithTimeGuard(allRows, processRowFn, runId) {
  const timer = createTimer();

  // ─── โหลด Checkpoint ─────────────────────────────────────
  const checkpoint = loadCheckpoint();
  let startFromRow = 2; // row 2 = แถวข้อมูลแรก (row 1 = header)

  if (checkpoint) {
    startFromRow = checkpoint.lastProcessedRow + 1;
    writeLog('INFO', '15_CheckpointService', 'runWithTimeGuard', runId,
      `▶ ต่อจาก Checkpoint: row ${startFromRow} (เคยทำไป ${checkpoint.totalDone} แถว)`,
      null);
  } else {
    writeLog('INFO', '15_CheckpointService', 'runWithTimeGuard', runId,
      '▶ เริ่มใหม่จาก row 2 (ไม่มี Checkpoint)', null);
  }

  // ─── สถิติ session ปัจจุบัน ────────────────────────────────
  let sessionDone  = 0;
  let sessionOk    = 0;
  let sessionReview = 0;
  let sessionError = 0;
  let lastRowDone  = startFromRow - 1;
  let interrupted  = false;

  // ─── กรอง rows ที่ต้องทำ (≥ startFromRow) ─────────────────
  const pendingRows = allRows.filter(r => r._rowNumber >= startFromRow);

  writeLog('INFO', '15_CheckpointService', 'runWithTimeGuard', runId,
    `📋 แถวที่ต้องทำ: ${pendingRows.length} / ${allRows.length} ทั้งหมด | ${timer.summary()}`,
    null);

  // ─── Main Loop ─────────────────────────────────────────────
  for (const row of pendingRows) {

    // ── Time Guard Check ──────────────────────────────────────
    if (timer.shouldStop()) {
      interrupted = true;
      writeLog('WARN', '15_CheckpointService', 'runWithTimeGuard', runId,
        `⏱ Time Guard: หยุดก่อน Limit | ${timer.summary()} | row ${row._rowNumber}`,
        null);
      break;
    }

    // ── Process Row ───────────────────────────────────────────
    let rowResult = { ok: false, decision: 'ERROR' };
    try {
      rowResult = processRowFn(row);
      sessionDone++;

      if (rowResult.decision === 'REVIEW') sessionReview++;
      else if (rowResult.ok)              sessionOk++;
      else                                sessionError++;

    } catch (rowErr) {
      sessionError++;
      sessionDone++;
      writeLog('ERROR', '15_CheckpointService', 'runWithTimeGuard', runId,
        `❌ Row ${row._rowNumber}: ${rowErr.message}`, null);
    }

    lastRowDone = row._rowNumber;

    // ── Save Checkpoint ทุก 50 แถว ────────────────────────────
    if (sessionDone % 50 === 0) {
      saveCheckpoint({
        runId,
        lastProcessedRow: lastRowDone,
        sourceLastRow:    allRows[allRows.length - 1]?._rowNumber || 0,
        totalDone:  (checkpoint?.totalDone || 0) + sessionDone,
        totalOk:    (checkpoint?.totalOk   || 0) + sessionOk,
        totalReview:(checkpoint?.totalReview || 0) + sessionReview,
        totalError: (checkpoint?.totalError || 0) + sessionError
      });
      writeLog('INFO', '15_CheckpointService', 'runWithTimeGuard', runId,
        `🔖 Auto-checkpoint: row ${lastRowDone} | ${timer.summary()}`, null);
    }
  }

  // ─── บันทึก Checkpoint สุดท้าย หรือ Clear ──────────────────
  const finalCheckpoint = {
    runId,
    lastProcessedRow: lastRowDone,
    sourceLastRow:    allRows[allRows.length - 1]?._rowNumber || 0,
    totalDone:  (checkpoint?.totalDone || 0) + sessionDone,
    totalOk:    (checkpoint?.totalOk   || 0) + sessionOk,
    totalReview:(checkpoint?.totalReview || 0) + sessionReview,
    totalError: (checkpoint?.totalError || 0) + sessionError
  };

  if (interrupted) {
    // ยังทำไม่เสร็จ — บันทึก Checkpoint รอรอบหน้า
    saveCheckpoint(finalCheckpoint);
  } else {
    // เสร็จสมบูรณ์ — ล้าง Checkpoint
    clearCheckpoint();
  }

  return {
    interrupted,
    sessionDone,
    sessionOk,
    sessionReview,
    sessionError,
    lastRowDone,
    pendingCount:  pendingRows.length,
    elapsedSeconds: timer.elapsed(),
    ...finalCheckpoint
  };
}

/**
 * installTimeTrigger — ติดตั้ง Time-based Trigger ให้รันต่อเองอัตโนมัติ
 * เรียกเมื่อ Time Guard ตัด เพื่อให้ระบบรันต่อหลัง 1 นาที
 * @param {string} functionName — ชื่อ function ที่จะ trigger
 */
function installTimeTrigger(functionName) {
  try {
    // ลบ Trigger เก่าของ function นี้ออกก่อน (ป้องกัน duplicate)
    ScriptApp.getProjectTriggers()
      .filter(t => t.getHandlerFunction() === functionName)
      .forEach(t => ScriptApp.deleteTrigger(t));

    // สร้าง Trigger ใหม่: รัน after 1 นาที
    ScriptApp.newTrigger(functionName)
      .timeBased()
      .after(60 * 1000) // 1 นาที (milliseconds)
      .create();

    writeLog('INFO', '15_CheckpointService', 'installTimeTrigger', null,
      `⏰ Auto-trigger ติดตั้ง: ${functionName} จะรันอีกครั้งใน ~1 นาที`, null);
  } catch (e) {
    writeLog('ERROR', '15_CheckpointService', 'installTimeTrigger', null, e.message, null);
  }
}

/**
 * removeSelfTrigger — ลบ Trigger ของตัวเอง (เรียกต้น function ที่ถูก trigger)
 * ป้องกัน Trigger วิ่งซ้ำ
 * @param {string} functionName
 */
function removeSelfTrigger(functionName) {
  try {
    ScriptApp.getProjectTriggers()
      .filter(t => t.getHandlerFunction() === functionName)
      .forEach(t => ScriptApp.deleteTrigger(t));
  } catch (e) {
    // ignore
  }
}
// ============================================================
// FILE: 16_ThGeoService.gs
// VERSION: 001
// MODULE: ThGeoService — ระบบ Reference ข้อมูลภูมิศาสตร์ไทย
//
// ใช้ข้อมูลจากชีต SYS_TH_GEO (7,537 แถว, 16 คอลัมน์)
// เพื่อ:
//   1. ค้นหารหัสไปรษณีย์จากชื่อ ตำบล/อำเภอ/จังหวัด
//   2. Validate ที่อยู่ว่าอยู่ในไทยจริงหรือไม่
//   3. Extract ตำบล/อำเภอ/จังหวัด จากข้อความที่อยู่ (fuzzy)
//   4. เพิ่ม Geo Context ให้ MatchEngine ฉลาดขึ้น
//
// SYS_TH_GEO Column Index (0-based):
//   0: รหัสไปรษณีย์    1: ตำบล_แขวง(raw)  2: อำเภอ_เขต(raw)
//   3: จังหวัด          4: หมายเหตุ          5: ตำบล_clean
//   6: อำเภอ_clean      7: ตำบล_label        8: อำเภอ_label
//   9: tambon_norm     10: amphoe_norm      11: province_norm
//  12: search_key      13: postal_key       14: note_type
//  15: note_scope
// ============================================================

const TH_GEO_SHEET = 'SYS_TH_GEO';
const TH_GEO_CACHE_KEY = 'TH_GEO_INDEX';
const TH_GEO_CACHE_S   = 21600; // 6 ชั่วโมง

// ─── Column Index ─────────────────────────────────────────────
const TH_GEO_COL = {
  POSTAL:         0,
  TAMBON_RAW:     1,
  AMPHOE_RAW:     2,
  PROVINCE:       3,
  NOTE_RAW:       4,
  TAMBON_CLEAN:   5,
  AMPHOE_CLEAN:   6,
  TAMBON_LABEL:   7,  // 'แขวง' หรือ 'ตำบล'
  AMPHOE_LABEL:   8,  // 'เขต' หรือ 'อำเภอ'
  TAMBON_NORM:    9,
  AMPHOE_NORM:    10,
  PROVINCE_NORM:  11,
  SEARCH_KEY:     12,
  POSTAL_KEY:     13,
  NOTE_TYPE:      14,
  NOTE_SCOPE:     15
};

// Stop words ที่ตัดออกจากที่อยู่ก่อนค้นหา
const ADDRESS_STOP_WORDS = [
  'แขวง','ตำบล','เขต','อำเภอ','จังหวัด','จ.','อ.','ต.','ข.','ประเทศไทย',
  'thailand','road','soi','ซอย','ถนน','หมู่','บ้าน','เลขที่'
];

// ─────────────────────────────────────────────────────────────
// PUBLIC API
// ─────────────────────────────────────────────────────────────

/**
 * lookupPostalCode — ค้นหารหัสไปรษณีย์จาก ตำบล+อำเภอ+จังหวัด
 * @param {string} tambon
 * @param {string} amphoe
 * @param {string} province
 * @returns {Object|null} { postal_code, tambon_clean, amphoe_clean, note_type, note_scope, note_raw }
 */
function lookupPostalCode(tambon, amphoe, province) {
  try {
    const idx = _getTHGeoIndex();
    if (!idx) return null;

    const tn = _normTH(tambon);
    const an = _normTH(amphoe);
    const pn = _normTH(province);

    // ลำดับการค้นหา: exact (3 field) → tambon+amphoe → tambon+province
    const key3 = `${tn}|${an}|${pn}`;
    const key2a = `${tn}|${an}|`;
    const key2b = `${tn}||${pn}`;

    let match = idx.bySearchKey[key3]
      || _findPartialKey(idx.bySearchKey, key2a)
      || _findPartialKey(idx.bySearchKey, key2b);

    if (!match && tn) {
      // Fuzzy: ค้นจาก tambon_norm อย่างเดียว (ถ้ามีผลเดียว)
      const fuzzyMatches = Object.keys(idx.bySearchKey)
        .filter(k => k.startsWith(tn + '|'))
        .map(k => idx.bySearchKey[k]);
      if (fuzzyMatches.length === 1) match = fuzzyMatches[0];
    }

    return match || null;
  } catch (e) {
    writeLog('WARN', '16_ThGeoService', 'lookupPostalCode', null, e.message, null);
    return null;
  }
}

/**
 * lookupByPostal — หาทุก ตำบล ที่ใช้รหัสไปรษณีย์นั้น
 * @param {string} postalCode
 * @returns {Object[]}
 */
function lookupByPostal(postalCode) {
  try {
    const idx = _getTHGeoIndex();
    if (!idx) return [];
    return idx.byPostal[String(postalCode).padStart(5,'0')] || [];
  } catch (e) {
    return [];
  }
}

/**
 * extractGeoFromAddress — วิเคราะห์ที่อยู่ข้อความ หาตำบล/อำเภอ/จังหวัด/รหัสไปรษณีย์
 *
 * ตัวอย่าง input: "123 แขวงลาดพร้าว เขตลาดพร้าว กรุงเทพ 10230"
 * ตัวอย่าง output: { tambon:'ลาดพร้าว', amphoe:'ลาดพร้าว', province:'กรุงเทพมหานคร',
 *                    postal:'10230', confidence: 95 }
 *
 * @param {string} addressText
 * @returns {Object}
 */
function extractGeoFromAddress(addressText) {
  if (!addressText) return _emptyGeoResult();

  try {
    const idx = _getTHGeoIndex();
    if (!idx) return _emptyGeoResult();

    const text = addressText.replace(/\s+/g, ' ').trim();

    // 1. ดึงรหัสไปรษณีย์จาก text (5 หลัก)
    const postalMatch = text.match(/\b(\d{5})\b/);
    const extractedPostal = postalMatch ? postalMatch[1] : null;

    // 2. Extract จังหวัด
    const province = _extractProvince(text, idx.provinces);

    // 3. Extract อำเภอ/เขต
    const amphoe = _extractAmphoe(text, province, idx);

    // 4. Extract ตำบล/แขวง
    const tambon = _extractTambon(text, amphoe, province, idx);

    // 5. Lookup postal ถ้า extract ได้
    let resolvedPostal = extractedPostal;
    let matchedRecord  = null;

    if (tambon || amphoe) {
      matchedRecord = lookupPostalCode(tambon, amphoe, province);
      if (matchedRecord && !resolvedPostal) {
        resolvedPostal = matchedRecord.postal_code;
      }
    }

    // คำนวณ Confidence
    let confidence = 0;
    if (resolvedPostal) confidence += 30;
    if (province)       confidence += 25;
    if (amphoe)         confidence += 25;
    if (tambon)         confidence += 20;

    return {
      tambon:      tambon || '',
      amphoe:      amphoe || '',
      province:    province || '',
      postal:      resolvedPostal || '',
      note_type:   matchedRecord ? matchedRecord.note_type  : '',
      note_scope:  matchedRecord ? matchedRecord.note_scope : '',
      note_raw:    matchedRecord ? matchedRecord.note_raw   : '',
      confidence,
      matched_record: matchedRecord
    };

  } catch (e) {
    writeLog('WARN', '16_ThGeoService', 'extractGeoFromAddress', null, e.message, null);
    return _emptyGeoResult();
  }
}

/**
 * validateAddressWithGeo — ตรวจสอบว่าที่อยู่สอดคล้องกับ postal code หรือไม่
 * ใช้ใน PlaceService เพื่อเพิ่ม Confidence score
 * @param {string} addressText
 * @param {string} postalCode
 * @returns {{ valid: boolean, confidence: number, details: string }}
 */
function validateAddressWithGeo(addressText, postalCode) {
  if (!addressText && !postalCode) return { valid: false, confidence: 0, details: 'no input' };

  const extracted = extractGeoFromAddress(addressText);
  if (!extracted.postal) return { valid: false, confidence: 20, details: 'ไม่ extract postal ได้' };

  if (postalCode && extracted.postal === String(postalCode)) {
    return { valid: true, confidence: 95, details: `Postal match: ${postalCode}` };
  }

  // ค้นว่า extracted postal อยู่ใน province เดียวกันหรือไม่
  if (postalCode && extracted.province) {
    const postalRecords = lookupByPostal(postalCode);
    const sameProvince = postalRecords.some(r => _normTH(r.province) === _normTH(extracted.province));
    if (sameProvince) return { valid: true, confidence: 70, details: `จังหวัดตรง: ${extracted.province}` };
  }

  return { valid: false, confidence: 30, details: `postal ไม่ตรง: ได้ ${extracted.postal} คาด ${postalCode}` };
}

/**
 * getProvinceList — คืนรายชื่อจังหวัดทั้งหมด 77 จังหวัด
 * @returns {string[]}
 */
function getProvinceList() {
  const idx = _getTHGeoIndex();
  if (!idx) return [];
  return idx.provinces;
}

/**
 * setupThGeoSheet — import ข้อมูล SYS_TH_GEO จาก CSV string
 * ใช้ครั้งแรกตอน Setup ถ้าชีตว่างเปล่า
 * *** ปกติ user Import Excel มือ แต่ถ้าต้องการ Auto-seed ใช้ function นี้ ***
 */
function setupThGeoSheet() {
  const ui = SpreadsheetApp.getUi();
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  let sh = ss.getSheetByName(TH_GEO_SHEET);
  if (!sh) sh = ss.insertSheet(TH_GEO_SHEET);

  // Headers
  const headers = [
    'รหัสไปรษณีย์','ตำบล_แขวง','อำเภอ_เขต','จังหวัด','หมายเหตุ',
    'ตำบล_clean','อำเภอ_clean','ตำบล_label','อำเภอ_label',
    'tambon_norm','amphoe_norm','province_norm',
    'search_key','postal_key','note_type','note_scope'
  ];

  if (sh.getLastRow() < 1) {
    sh.getRange(1, 1, 1, headers.length).setValues([headers]);
    applyHeaderFormatting(sh, headers.length, '#0F6E56');
    sh.setFrozenRows(1);
    ui.alert(
      '📋 SYS_TH_GEO พร้อมแล้ว',
      'กรุณา Import ไฟล์ SYS_TH_GEO_V001.xlsx ลงในชีตนี้\n\n' +
      'วิธี: File > Import > Upload > เลือก SYS_TH_GEO_V001.xlsx\n' +
      '→ เลือก "Replace data in selected cells"\n' +
      '→ เลือก Sheet = SYS_TH_GEO',
      ui.ButtonSet.OK
    );
  } else {
    writeLog('INFO', '16_ThGeoService', 'setupThGeoSheet', null,
      `SYS_TH_GEO มีข้อมูลแล้ว: ${sh.getLastRow() - 1} แถว`, null);
  }
}

/**
 * reloadThGeoCache — Force reload cache (เรียกหลัง import ข้อมูลใหม่)
 */
function reloadThGeoCache() {
  CacheService.getScriptCache().remove(TH_GEO_CACHE_KEY);
  const idx = _buildTHGeoIndex();
  if (idx) {
    writeLog('INFO', '16_ThGeoService', 'reloadThGeoCache', null,
      `โหลด TH_GEO Index สำเร็จ: ${idx.totalRows} แถว`, null);
    SpreadsheetApp.getUi().alert(
      '✅ โหลดข้อมูล TH_GEO สำเร็จ',
      `พบ ${idx.totalRows} แถว | ${idx.provinces.length} จังหวัด`,
      SpreadsheetApp.getUi().ButtonSet.OK
    );
  }
}

// ─────────────────────────────────────────────────────────────
// PRIVATE: Index Builder
// ─────────────────────────────────────────────────────────────

/**
 * _getTHGeoIndex — โหลด/สร้าง Index
 * ใช้ PropertiesService สำรองเพราะ Cache อาจ expire
 */
function _getTHGeoIndex() {
  // ลอง Cache ก่อน (เร็วสุด)
  const cache = CacheService.getScriptCache();
  const cached = cache.get(TH_GEO_CACHE_KEY);
  if (cached) {
    try { return JSON.parse(cached); } catch (_) {}
  }
  return _buildTHGeoIndex();
}

function _buildTHGeoIndex() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = ss.getSheetByName(TH_GEO_SHEET);
  if (!sh || sh.getLastRow() < 2) return null;

  const data = sh.getDataRange().getValues(); // RULE 6: batch read
  const idx = {
    bySearchKey: {},   // tambon_norm|amphoe_norm|province_norm → record
    byPostal:    {},   // postal_code → record[]
    byTambon:    {},   // tambon_norm → record[]
    provinces:   [],
    totalRows:   data.length - 1
  };

  const provinceSet = new Set();
  const C = TH_GEO_COL;

  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    const record = {
      postal_code:   String(row[C.POSTAL] || '').padStart(5,'0'),
      tambon_raw:    String(row[C.TAMBON_RAW]   || ''),
      amphoe_raw:    String(row[C.AMPHOE_RAW]   || ''),
      province:      String(row[C.PROVINCE]     || ''),
      note_raw:      String(row[C.NOTE_RAW]     || ''),
      tambon_clean:  String(row[C.TAMBON_CLEAN] || ''),
      amphoe_clean:  String(row[C.AMPHOE_CLEAN] || ''),
      tambon_label:  String(row[C.TAMBON_LABEL] || 'ตำบล'),
      amphoe_label:  String(row[C.AMPHOE_LABEL] || 'อำเภอ'),
      tambon_norm:   String(row[C.TAMBON_NORM]  || ''),
      amphoe_norm:   String(row[C.AMPHOE_NORM]  || ''),
      province_norm: String(row[C.PROVINCE_NORM]|| ''),
      search_key:    String(row[C.SEARCH_KEY]   || ''),
      postal_key:    String(row[C.POSTAL_KEY]   || ''),
      note_type:     String(row[C.NOTE_TYPE]    || 'FULL_AREA'),
      note_scope:    String(row[C.NOTE_SCOPE]   || 'FULL')
    };

    // bySearchKey
    if (record.search_key) idx.bySearchKey[record.search_key] = record;

    // byPostal
    if (record.postal_code) {
      if (!idx.byPostal[record.postal_code]) idx.byPostal[record.postal_code] = [];
      idx.byPostal[record.postal_code].push(record);
    }

    // byTambon
    if (record.tambon_norm) {
      if (!idx.byTambon[record.tambon_norm]) idx.byTambon[record.tambon_norm] = [];
      idx.byTambon[record.tambon_norm].push(record);
    }

    if (record.province) provinceSet.add(record.province);
  }

  idx.provinces = [...provinceSet].sort();

  // บันทึกลง Cache (แต่ JSON อาจใหญ่เกิน 100KB limit ของ CacheService)
  // ทำ Sparse cache เก็บ bySearchKey เท่านั้น
  try {
    const slim = { bySearchKey: idx.bySearchKey, provinces: idx.provinces, totalRows: idx.totalRows };
    const json = JSON.stringify(slim);
    if (json.length < 90000) { // CacheService limit ~100KB
      CacheService.getScriptCache().put(TH_GEO_CACHE_KEY, json, TH_GEO_CACHE_S);
    }
  } catch (_) {}

  return idx;
}

// ─────────────────────────────────────────────────────────────
// PRIVATE: Text Extractors
// ─────────────────────────────────────────────────────────────

function _extractProvince(text, provinces) {
  if (!provinces) return '';
  // จับคู่ชื่อจังหวัดในข้อความ (รวม กทม = กรุงเทพมหานคร)
  const abbrev = { 'กทม':'กรุงเทพมหานคร', 'กรุงเทพ':'กรุงเทพมหานคร', 'bkk':'กรุงเทพมหานคร' };
  const tNorm = text.toLowerCase().replace(/\s+/g,'');
  for (const [abbr, full] of Object.entries(abbrev)) {
    if (tNorm.includes(abbr.toLowerCase())) return full;
  }
  for (const p of provinces) {
    if (text.includes(p)) return p;
    // Try without 'จังหวัด' prefix
    if (p.length > 2 && text.includes(p.replace('จังหวัด',''))) return p;
  }
  return '';
}

function _extractAmphoe(text, province, idx) {
  if (!idx) return '';
  const tNorm = _normTH(text);
  // ค้นจาก bySearchKey — หา amphoe_norm ที่ตรงกัน
  const candidates = new Set();
  for (const key of Object.keys(idx.bySearchKey || {})) {
    const rec = idx.bySearchKey[key];
    if (province && _normTH(rec.province) !== _normTH(province)) continue;
    if (rec.amphoe_norm && tNorm.includes(rec.amphoe_norm)) {
      candidates.add(rec.amphoe_clean);
    }
  }
  return candidates.size === 1 ? [...candidates][0] : '';
}

function _extractTambon(text, amphoe, province, idx) {
  if (!idx) return '';
  const tNorm = _normTH(text);
  const candidates = new Set();
  for (const key of Object.keys(idx.bySearchKey || {})) {
    const rec = idx.bySearchKey[key];
    if (province && _normTH(rec.province) !== _normTH(province)) continue;
    if (amphoe && _normTH(rec.amphoe_clean) !== _normTH(amphoe)) continue;
    if (rec.tambon_norm && tNorm.includes(rec.tambon_norm)) {
      candidates.add(rec.tambon_clean);
    }
  }
  return candidates.size === 1 ? [...candidates][0] : '';
}

function _normTH(text) {
  if (!text) return '';
  return String(text).replace(/\s+/g,'').toLowerCase().trim();
}

function _findPartialKey(map, partialKey) {
  const match = Object.keys(map).find(k => k.startsWith(partialKey) || k.includes(partialKey));
  return match ? map[match] : null;
}

function _emptyGeoResult() {
  return { tambon:'', amphoe:'', province:'', postal:'',
    note_type:'', note_scope:'', note_raw:'', confidence: 0, matched_record: null };
}
// ============================================================
// FILE: 17_ReviewDecisionService.gs
// VERSION: 001
// MODULE: ReviewDecisionService
//   — ระบบ Dropdown Decision สำหรับ Q_REVIEW
//   — onEdit Trigger: กด Dropdown ปั๊บ Master Data อัปเดตทันที
//
// FLOW:
//   Admin เห็นแถวใน Q_REVIEW ที่ status = PENDING
//     ↓
//   คลิก Dropdown ในคอลัมน์ "decision" เลือก:
//     🟢 CREATE_NEW      → สร้าง Master ใหม่ทันที
//     🔵 MERGE_TO_CANDIDATE → รวมเข้า Master เดิมที่ระบบแนะนำ
//     🔴 IGNORE          → ข้ามแถวนี้ (ข้อมูลมั่วเกินไป)
//   onEdit ทำงาน → update Master → update SYNC_STATUS ใน Source
// ============================================================

// ─── Dropdown Options ──────────────────────────────────────────
const DECISION_OPTIONS = [
  '🟢 CREATE_NEW',
  '🔵 MERGE_TO_CANDIDATE',
  '🔴 IGNORE'
];

// Decision value → clean code mapping
const DECISION_CODE = {
  '🟢 CREATE_NEW':         'CREATE_NEW',
  '🔵 MERGE_TO_CANDIDATE': 'MERGE_TO_CANDIDATE',
  '🔴 IGNORE':             'IGNORE'
};

// สีพื้นหลังของแถวหลังตัดสิน
const DECISION_ROW_COLORS = {
  CREATE_NEW:         'E8F5E9',  // เขียวอ่อน
  MERGE_TO_CANDIDATE: 'E3F2FD',  // น้ำเงินอ่อน
  IGNORE:             'FFEBEE',  // แดงอ่อน
  PENDING:            'FFFFFF',
  RESOLVED:           'F5F5F5'
};

// ─────────────────────────────────────────────────────────────
// ENTRY POINTS
// ─────────────────────────────────────────────────────────────

/**
 * onEditHandler — onEdit Trigger (ติดตั้งโดย installOnEditTrigger)
 * ตรวจว่า Edit เกิดใน Q_REVIEW คอลัมน์ decision หรือไม่
 * @param {GoogleAppsScript.Events.SheetsOnEdit} e
 */
function onEditHandler(e) {
  try {
    if (!e || !e.range) return;

    const sheet = e.range.getSheet();
    if (sheet.getName() !== SHEET_NAMES.Q_REVIEW) return;

    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    const decisionColIdx = headers.indexOf('decision') + 1; // 1-based
    if (decisionColIdx === 0) return;

    // ตรวจว่า edit อยู่ใน decision column
    if (e.range.getColumn() !== decisionColIdx) return;
    if (e.range.getRow() < 2) return;

    const rawValue = String(e.range.getValue() || '').trim();
    const decisionCode = DECISION_CODE[rawValue];
    if (!decisionCode) return; // ไม่ใช่ค่าจาก dropdown → skip

    // ดึงข้อมูลแถวนี้
    const rowNum = e.range.getRow();
    const rowData = sheet.getRange(rowNum, 1, 1, headers.length).getValues()[0];
    const reviewObj = {};
    headers.forEach((h, i) => { reviewObj[h] = rowData[i]; });
    reviewObj._rowNumber = rowNum;

    // Execute Decision
    writeLog('INFO', '17_ReviewDecision', 'onEditHandler', reviewObj.review_id,
      `Admin decision: ${decisionCode} | ${reviewObj.raw_person_name}`, null);

    applyDecisionFromDropdown(reviewObj, decisionCode, sheet, rowNum, headers);

  } catch (err) {
    writeLog('ERROR', '17_ReviewDecision', 'onEditHandler', null, err.message, null);
  }
}

/**
 * applyDecisionFromDropdown — Execute decision logic
 * @param {Object}  reviewObj    — Q_REVIEW row as object
 * @param {string}  decisionCode — CREATE_NEW | MERGE_TO_CANDIDATE | IGNORE
 * @param {Sheet}   sheet        — Q_REVIEW sheet
 * @param {number}  rowNum
 * @param {string[]} headers
 */
function applyDecisionFromDropdown(reviewObj, decisionCode, sheet, rowNum, headers) {
  let resultMsg = '';
  let success   = false;

  try {
    switch (decisionCode) {
      case 'CREATE_NEW':
        resultMsg = executeCreateNew(reviewObj);
        success = true;
        break;
      case 'MERGE_TO_CANDIDATE':
        resultMsg = executeMergeToCandidate(reviewObj);
        success = true;
        break;
      case 'IGNORE':
        resultMsg = executeIgnore(reviewObj);
        success = true;
        break;
    }
  } catch (err) {
    resultMsg = 'ERROR: ' + err.message;
    writeLog('ERROR', '17_ReviewDecision', 'applyDecisionFromDropdown',
      reviewObj.review_id, err.message, null);
  }

  // ─── อัปเดตแถว Q_REVIEW ──────────────────────────────────
  const statusIdx    = headers.indexOf('status')      + 1;
  const reviewerIdx  = headers.indexOf('reviewer')    + 1;
  const reviewedAtIdx= headers.indexOf('reviewed_at') + 1;
  const noteIdx      = headers.indexOf('note')        + 1;

  if (statusIdx    > 0) sheet.getRange(rowNum, statusIdx).setValue('RESOLVED');
  if (reviewerIdx  > 0) sheet.getRange(rowNum, reviewerIdx).setValue('ADMIN_DROPDOWN');
  if (reviewedAtIdx > 0) sheet.getRange(rowNum, reviewedAtIdx).setValue(new Date());
  if (noteIdx      > 0) sheet.getRange(rowNum, noteIdx).setValue(resultMsg);

  // ─── สีแถว ───────────────────────────────────────────────
  const bgColor = DECISION_ROW_COLORS[decisionCode] || DECISION_ROW_COLORS.RESOLVED;
  sheet.getRange(rowNum, 1, 1, headers.length)
    .setBackground(bgColor);

  // ─── อัปเดต Source Sheet SYNC_STATUS ─────────────────────
  if (success && reviewObj.source_row_number) {
    const syncStatus = decisionCode === 'IGNORE' ? 'IGNORED' : 'PROCESSED';
    updateSourceSyncStatus(parseInt(reviewObj.source_row_number), syncStatus);
  }

  writeLog('INFO', '17_ReviewDecision', 'applyDecisionFromDropdown',
    reviewObj.review_id,
    `${success ? '✅' : '❌'} ${decisionCode}: ${resultMsg}`, null);
}

// ─────────────────────────────────────────────────────────────
// DECISION EXECUTORS
// ─────────────────────────────────────────────────────────────

/**
 * executeCreateNew — สร้าง Master Records ใหม่ทั้งหมด
 * ใช้เมื่อ: ข้อมูลนี้เป็นลูกค้าจริง / สถานที่จริงที่ยังไม่มีในระบบ
 * @param {Object} reviewObj
 * @returns {string} result message
 */
function executeCreateNew(reviewObj) {
  const parts = [];

  // Normalize ข้อมูลจาก review
  const pseudoNorm = {
    dest_name_raw:      reviewObj.raw_person_name || '',
    person_name_norm:   normalizePersonName(reviewObj.raw_person_name || ''),
    place_name_norm:    normalizePlaceName(reviewObj.raw_place_name || ''),
    address_raw:        reviewObj.raw_place_name || '',
    address_norm:       normalizeAddress(reviewObj.raw_place_name || ''),
    address_latlong_norm: '',
    lat_norm:           parseFloat(reviewObj.raw_lat)  || 0,
    long_norm:          parseFloat(reviewObj.raw_long) || 0,
    geo_keys:           buildGeoKeys(
      parseFloat(reviewObj.raw_lat)  || 0,
      parseFloat(reviewObj.raw_long) || 0
    )
  };

  // สร้าง Person
  let personId = null;
  if (pseudoNorm.person_name_norm) {
    personId = createPerson(reviewObj.raw_person_name, pseudoNorm.person_name_norm);
    createPersonAlias(personId, reviewObj.raw_person_name, pseudoNorm.person_name_norm);
    parts.push(`Person: ${personId}`);
  }

  // สร้าง Place
  let placeId = null;
  if (pseudoNorm.place_name_norm || pseudoNorm.address_norm) {
    placeId = createPlace(
      pseudoNorm.place_name_norm || pseudoNorm.address_norm,
      pseudoNorm.address_norm
    );
    if (pseudoNorm.place_name_norm)
      createPlaceAlias(placeId, reviewObj.raw_place_name, pseudoNorm.place_name_norm);
    parts.push(`Place: ${placeId}`);
  }

  // สร้าง Geo
  let geoId = null;
  if (pseudoNorm.lat_norm && pseudoNorm.long_norm) {
    geoId = createGeoPoint(
      pseudoNorm.lat_norm, pseudoNorm.long_norm,
      pseudoNorm.geo_keys, reviewObj.raw_place_name || ''
    );
    parts.push(`Geo: ${geoId}`);
  }

  // สร้าง Destination
  if (personId || placeId || geoId) {
    const destId = createDestination(
      personId, placeId, geoId,
      [pseudoNorm.person_name_norm, pseudoNorm.place_name_norm].filter(Boolean).join(' | '),
      buildDestinationKey(personId, placeId, geoId)
    );
    parts.push(`Dest: ${destId}`);

    // อัปเดต FACT_DELIVERY ที่อ้างถึง source record นี้
    _updateFactWithNewIds(reviewObj.source_record_id, personId, placeId, geoId, destId);
  }

  return 'CREATE_NEW: ' + parts.join(', ');
}

/**
 * executeMergeToCandidate — Merge เข้า Master ที่ระบบแนะนำ
 * ใช้เมื่อ: ระบบแนะนำ candidate ที่ถูกต้อง Admin กด confirm
 * @param {Object} reviewObj
 * @returns {string} result message
 */
function executeMergeToCandidate(reviewObj) {
  const parts = [];

  // ดึง candidates ที่ระบบแนะนำ
  const personCandidates = _parseCandidates(reviewObj.candidate_person_ids);
  const placeCandidates  = _parseCandidates(reviewObj.candidate_place_ids);
  const geoCandidates    = _parseCandidates(reviewObj.candidate_geo_ids);

  // ใช้ candidate แรก (คะแนนสูงสุด)
  const targetPersonId = personCandidates[0]?.id || null;
  const targetPlaceId  = placeCandidates[0]?.id  || null;
  const targetGeoId    = geoCandidates[0]?.id    || null;

  // เพิ่ม Alias ให้ระบบเรียนรู้ (ปัญหา #4)
  if (targetPersonId && reviewObj.raw_person_name) {
    const normName = normalizePersonName(reviewObj.raw_person_name);
    createPersonAlias(targetPersonId, reviewObj.raw_person_name, normName);
    parts.push(`PersonAlias → ${targetPersonId}`);
  }

  if (targetPlaceId && reviewObj.raw_place_name) {
    const normPlace = normalizePlaceName(reviewObj.raw_place_name);
    createPlaceAlias(targetPlaceId, reviewObj.raw_place_name, normPlace);
    parts.push(`PlaceAlias → ${targetPlaceId}`);
  }

  // หา/สร้าง Destination
  if (targetPersonId || targetPlaceId || targetGeoId) {
    const resolvedDest = resolveDestination(
      targetPersonId, targetPlaceId, targetGeoId,
      { person_name_norm: '', place_name_norm: '', lat_norm: 0, long_norm: 0 }
    );
    parts.push(`Dest: ${resolvedDest.destination_id} (${resolvedDest.is_new ? 'new' : 'existing'})`);

    // อัปเดต FACT_DELIVERY
    _updateFactWithNewIds(
      reviewObj.source_record_id,
      targetPersonId, targetPlaceId, targetGeoId, resolvedDest.destination_id
    );
  }

  // เรียน alias ย้อนกลับไป Master
  learnAliasFromReview(reviewObj.review_id, Object.values(reviewObj), Object.keys(reviewObj));

  return 'MERGE: ' + parts.join(', ');
}

/**
 * executeIgnore — Mark รายการนี้ว่า Ignore (ข้อมูลมั่วเกินไป)
 * RULE 4: ไม่ลบ — เก็บไว้ใน Q_REVIEW status = IGNORED
 * @param {Object} reviewObj
 * @returns {string}
 */
function executeIgnore(reviewObj) {
  // อัปเดต FACT_DELIVERY ให้รู้ว่า IGNORED
  if (reviewObj.source_record_id) {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sh = ss.getSheetByName(SHEET_NAMES.FACT_DELIVERY);
    if (sh && sh.getLastRow() > 1) {
      const data = sh.getDataRange().getValues();
      const hdr  = data[0];
      const srcIdx    = hdr.indexOf('source_record_id');
      const statusIdx = hdr.indexOf('review_status');
      for (let i = 1; i < data.length; i++) {
        if (data[i][srcIdx] === reviewObj.source_record_id) {
          sh.getRange(i + 1, statusIdx + 1).setValue('IGNORED');
          break;
        }
      }
    }
  }
  return `IGNORED: ${reviewObj.raw_person_name || reviewObj.invoice_no || 'N/A'}`;
}

// ─────────────────────────────────────────────────────────────
// SETUP FUNCTIONS (เรียกครั้งแรก หรือ reset)
// ─────────────────────────────────────────────────────────────

/**
 * setupDecisionDropdowns — ติดตั้ง Data Validation Dropdown
 * ในคอลัมน์ "decision" ของ Q_REVIEW ทุกแถว
 */
function setupDecisionDropdowns() {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sh = ss.getSheetByName(SHEET_NAMES.Q_REVIEW);
    if (!sh) {
      writeLog('WARN','17_ReviewDecision','setupDecisionDropdowns',null,'ไม่พบ Q_REVIEW',null);
      return;
    }

    const headers = sh.getRange(1, 1, 1, sh.getLastColumn()).getValues()[0];
    const decisionCol = headers.indexOf('decision') + 1;
    if (decisionCol === 0) return;

    const lastRow = Math.max(sh.getLastRow(), 100); // ตั้ง dropdown ล่วงหน้า 100 แถว

    const rule = SpreadsheetApp.newDataValidation()
      .requireValueInList(DECISION_OPTIONS, true)
      .setAllowInvalid(false)
      .setHelpText('เลือก: CREATE_NEW = สร้างใหม่ | MERGE = รวมกับ candidate | IGNORE = ข้าม')
      .build();

    // ใช้ batch set (RULE 6)
    sh.getRange(2, decisionCol, lastRow - 1, 1).setDataValidation(rule);

    // ตั้ง Conditional Formatting สีตาม decision
    _applyDecisionConditionalFormat(sh, decisionCol, lastRow);

    writeLog('INFO','17_ReviewDecision','setupDecisionDropdowns',null,
      `ติดตั้ง Dropdown ใน Q_REVIEW col ${decisionCol}`, null);

    SpreadsheetApp.getUi().alert(
      '✅ ติดตั้ง Decision Dropdown สำเร็จ',
      'คอลัมน์ "decision" ใน Q_REVIEW พร้อมใช้งาน\n\n' +
      '🟢 CREATE_NEW = สร้าง Master ใหม่\n' +
      '🔵 MERGE_TO_CANDIDATE = รวมกับที่ระบบแนะนำ\n' +
      '🔴 IGNORE = ข้ามแถวนี้\n\n' +
      'เมื่อเลือก Dropdown → ระบบจะประมวลผลอัตโนมัติ',
      SpreadsheetApp.getUi().ButtonSet.OK
    );
  } catch (e) {
    writeLog('ERROR','17_ReviewDecision','setupDecisionDropdowns',null, e.message, null);
  }
}

/**
 * installOnEditTrigger — ติดตั้ง onEdit Trigger สำหรับ Q_REVIEW
 * ต้องรันครั้งเดียวหลัง Setup
 */
function installOnEditTrigger() {
  try {
    // ลบ onEditHandler เดิมออกก่อน
    ScriptApp.getProjectTriggers()
      .filter(t => t.getHandlerFunction() === 'onEditHandler')
      .forEach(t => ScriptApp.deleteTrigger(t));

    // สร้างใหม่
    ScriptApp.newTrigger('onEditHandler')
      .forSpreadsheet(SpreadsheetApp.getActive())
      .onEdit()
      .create();

    writeLog('INFO','17_ReviewDecision','installOnEditTrigger',null,
      'ติดตั้ง onEdit Trigger สำเร็จ', null);

    SpreadsheetApp.getUi().alert(
      '✅ ติดตั้ง onEdit Trigger สำเร็จ',
      'ระบบจะตอบสนองต่อการเลือก Dropdown ใน Q_REVIEW โดยอัตโนมัติ',
      SpreadsheetApp.getUi().ButtonSet.OK
    );
  } catch (e) {
    writeLog('ERROR','17_ReviewDecision','installOnEditTrigger',null,e.message,null);
    SpreadsheetApp.getUi().alert('❌ Error: ' + e.message);
  }
}

/**
 * showPendingReviewSummary — แสดงสรุป Pending Reviews แยกตาม issue_type
 */
function showPendingReviewSummary() {
  const reviews  = getPendingReviews();
  if (reviews.length === 0) {
    SpreadsheetApp.getUi().alert('✅ ไม่มีรายการ Pending Review');
    return;
  }

  const byType = {};
  reviews.forEach(r => {
    byType[r.issue_type] = (byType[r.issue_type] || 0) + 1;
  });

  const lines = [
    `📋 Pending Reviews: ${reviews.length} รายการ`,
    '',
    ...Object.entries(byType).map(([type, count]) => {
      const emoji = {
        C1_PERSON_DUPLICATE:   '👤 #1',
        C2_PLACE_DUPLICATE:    '🏢 #2',
        C3_GEO_DUPLICATE:      '📍 #3',
        C4_SAME_PERSON_DIFF_NAME: '✏️ #4',
        C5_DIFF_PERSON_SAME_PLACE:'🔀 #5',
        C6_SAME_PERSON_DIFF_PLACE:'🗺️ #6',
        C7_SAME_PERSON_DIFF_GEO:  '📡 #7',
        C8_DIFF_PERSON_SAME_GEO:  '🔍 #8',
        UNCERTAIN_MATCH:       '❓ ?'
      }[type] || '⚠️';
      return `  ${emoji} ${type}: ${count} รายการ`;
    }),
    '',
    'ไปที่ชีต Q_REVIEW เพื่อตัดสินใจ'
  ];

  SpreadsheetApp.getUi().alert(
    '🔍 Pending Review Summary',
    lines.join('\n'),
    SpreadsheetApp.getUi().ButtonSet.OK
  );
}

// ─────────────────────────────────────────────────────────────
// PRIVATE HELPERS
// ─────────────────────────────────────────────────────────────

/**
 * _updateFactWithNewIds — อัปเดต FACT_DELIVERY row ด้วย Master IDs ใหม่
 */
function _updateFactWithNewIds(sourceRecordId, personId, placeId, geoId, destId) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sh = ss.getSheetByName(SHEET_NAMES.FACT_DELIVERY);
    if (!sh || sh.getLastRow() < 2) return;

    const data = sh.getDataRange().getValues();
    const hdr  = data[0];
    const srcIdx  = hdr.indexOf('source_record_id');
    const pidIdx  = hdr.indexOf('person_id');
    const plcIdx  = hdr.indexOf('place_id');
    const geoIdx  = hdr.indexOf('geo_id');
    const dstIdx  = hdr.indexOf('destination_id');
    const rvwIdx  = hdr.indexOf('review_status');
    const updIdx  = hdr.indexOf('updated_at');

    for (let i = 1; i < data.length; i++) {
      if (data[i][srcIdx] !== sourceRecordId) continue;
      if (personId && pidIdx >= 0) sh.getRange(i + 1, pidIdx + 1).setValue(personId);
      if (placeId  && plcIdx >= 0) sh.getRange(i + 1, plcIdx + 1).setValue(placeId);
      if (geoId    && geoIdx >= 0) sh.getRange(i + 1, geoIdx + 1).setValue(geoId);
      if (destId   && dstIdx >= 0) sh.getRange(i + 1, dstIdx + 1).setValue(destId);
      if (rvwIdx >= 0) sh.getRange(i + 1, rvwIdx + 1).setValue('APPROVED');
      if (updIdx >= 0) sh.getRange(i + 1, updIdx + 1).setValue(new Date());
      return; // อัปเดตแถวแรกที่เจอ
    }
  } catch (e) {
    writeLog('WARN','17_ReviewDecision','_updateFactWithNewIds',null,e.message,null);
  }
}

/**
 * _parseCandidates — parse "PER-XXX(95),PER-YYY(82)" → [{id, score}]
 */
function _parseCandidates(candidateStr) {
  if (!candidateStr) return [];
  return String(candidateStr).split(',')
    .map(s => s.trim())
    .filter(Boolean)
    .map(s => {
      const m = s.match(/^([^\(]+)\(([^\)]+)\)$/);
      return m ? { id: m[1].trim(), score: parseFloat(m[2]) || 0 } : { id: s, score: 0 };
    })
    .sort((a, b) => b.score - a.score);
}

/**
 * _applyDecisionConditionalFormat — ตั้ง Conditional Formatting
 */
function _applyDecisionConditionalFormat(sh, decisionCol, lastRow) {
  try {
    const range = sh.getRange(2, decisionCol, lastRow - 1, 1);
    const rules = [];

    [
      ['🟢 CREATE_NEW',         'E8F5E9', '0F6E56'],
      ['🔵 MERGE_TO_CANDIDATE', 'E3F2FD', '185FA5'],
      ['🔴 IGNORE',             'FFEBEE', 'C73B20']
    ].forEach(([val, bg, font]) => {
      rules.push(
        SpreadsheetApp.newConditionalFormatRule()
          .whenTextEqualTo(val)
          .setBackground('#' + bg)
          .setFontColor('#' + font)
          .setBold(true)
          .setRanges([range])
          .build()
      );
    });

    sh.setConditionalFormatRules([
      ...sh.getConditionalFormatRules().filter(r =>
        !r.getRanges().some(rng => rng.getColumn() === decisionCol)
      ),
      ...rules
    ]);
  } catch (e) {
    // Conditional format ไม่ critical — skip
  }
}

รับทราบครับ! ตอนนี้เข้าใจปัญหาตรงนี้ชัดเจนแล้ว:

ชื่อปลายทาง = "คุณแตง โทร.063...", "นายสมชาย ร้านวัสดุ", "แตง(ช่างแอร์)" — มั่วมากระดับ
ที่อยู่ปลายทาง = ตัดคำมาผิด ครึ่งๆกลางๆ ไม่ครบ
ชื่อที่อยู่จาก_LatLong = มาจาก Reverse Geocode แต่ก็ยังมั่วบ้าง

จะทำ Module 18 (Google Maps) + อัปเดต NormalizeService V003 ให้รองรับข้อมูลมั่วๆ จริงๆ ครับ:Created 2 files, ran a command, read a fileCreated 2 files, ran a command, read a file
✅ CHANGE LOG — VERSION 004
5,771 บรรทัด | 201 functions | 18 โมดูล

🗺️ [1] Module 18 — Google Maps Custom Formulas (พิมในชีตได้เลย)
สูตรทั่วไป:
สูตรตัวอย่างผลลัพธ์=GOOGLEMAPS_DISTANCE(A1,B1,"driving")A1="วังน้อย" B1="ลาดพร้าว""72 km"=GOOGLEMAPS_DISTANCE_KM(LAT1,LNG1,LAT2,LNG2)เลข lat/long 4 ตัว72.3=GOOGLEMAPS_REVERSEGEOCODE(C2,D2)C2=13.76 D2=100.50"ลาดพร้าว กรุงเทพฯ..."=GOOGLEMAPS_LATLONG("บิ๊กซีรังสิต")—"14.023, 100.617"=GOOGLEMAPS_DURATION(A1,B1,"driving")—"1 hour 23 mins"=GOOGLEMAPS_ELEVATION(C2,D2)—12.5 เมตร
สูตรเฉพาะ MDM Logistics:
สูตรใช้ทำอะไร=MDM_REVERSE_GEOCODE(C2,D2)แปลง LAT/LONG → ที่อยู่ (ตัด "Thailand" แล้ว)=MDM_DISTANCE_FROM_WAREHOUSE(C2,D2)ระยะทาง km จากคลัง SCG วังน้อย → ปลายทาง=MDM_VALIDATE_ADDRESS(E2,C2,D2)✅ ตรง (50m) / ⚠ ห่าง 2.3km / ❌ ต่างกันมาก=MDM_CLEAN_ADDRESS(C2,D2)ที่อยู่สะอาด ตัด "Thailand" ออกแล้ว=MDM_POSTAL_FROM_LATLONG(C2,D2)รหัสไปรษณีย์จาก GPS=MDM_ADDRESS_COMPONENTS(C2,D2,"sublocality")ดึงแค่ ตำบล/แขวง
ทุกสูตรใช้ Cache 6 ชั่วโมง — คำนวณครั้งเดียว ไม่ตีซ้ำ ประหยัด quota

🧹 [2] NormalizeService V003 — รองรับข้อมูลมั่วๆ จริงๆ
ชื่อบุคคล — ตัดออกได้ทั้งหมด:
"คุณแตง โทร.0639656564"       → "แตง"       confidence=80
"นายสมชาย ร้านวัสดุก่อสร้าง"  → "สมชาย"     confidence=70
"แตง(ช่างแอร์)"               → "แตง"       confidence=75
"คุณจันทร์ 081-999-4556"       → "จันทร์"    confidence=80
"K.แมน"                        → "แมน"       confidence=70
"14/2 ม.3 ต.บ้านนา"           → ""          inputType=PLACE
ที่อยู่ — ตัดออกและ Extract:
"(เบอร์โทร) อ.ศรีราชา จ.ชลบุรี" → amphoe="ศรีราชา" province="ชลบุรี"
"ลาดพร้าว 101 กทม"               → province="กรุงเทพมหานคร"
"อาคาร ABC ชั้น3 ถ.สุขุมวิท"     → address="สุขุมวิท"
ระบบยังเพิ่ม person_name_confidence ส่งเข้า MatchEngine — ถ้า confidence ต่ำกว่า 50 จะ force ส่ง Review แทนที่จะ auto-match ผิดๆ

📋 [3] แนะนำสูตรใส่ใน Source Sheet ทันที
เพิ่มคอลัมน์ใหม่ต่อท้ายชีต SCGนครหลวงJWDภูมิภาค:
คอลัมน์ AF:  =MDM_CLEAN_ADDRESS(O2,P2)          ← ที่อยู่สะอาด
คอลัมน์ AG:  =MDM_DISTANCE_FROM_WAREHOUSE(O2,P2) ← กม.จากคลัง (ตรวจสอบ)
คอลัมน์ AH:  =MDM_VALIDATE_ADDRESS(S2,O2,P2)     ← ที่อยู่ตรงกับ GPS?
คอลัมน์ AI:  =MDM_POSTAL_FROM_LATLONG(O2,P2)     ← รหัสไปรษณีย์จาก GPS

// ============================================================
// FILE: 00_App.gs  (UPDATED)
// VERSION: 002
// MODULE: App — Entry Point พร้อม Time Guard + Resume System
// ============================================================

function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('🚚 MDM Logistics')
    .addItem('🔧 ติดตั้งระบบครั้งแรก (Setup)', 'runInitialSetup')
    .addSeparator()
    .addItem('▶ รัน Daily Process', 'runDailyProcess')
    .addItem('⏸ ดูสถานะ Checkpoint', 'showCheckpointStatus')
    .addItem('🔄 Reset และเริ่มใหม่ทั้งหมด', 'resetAndRestart')
    .addSeparator()
    .addItem('🌙 รัน Nightly Maintenance', 'runNightlyMaintenance')
    .addItem('🔁 Reprocess Selected Rows', 'reprocessSelectedRows')
    .addItem('📊 Refresh Quality Report', 'refreshQualityReport')
    .addSeparator()
    .addItem('🔍 ดู Pending Reviews', 'showPendingReviews')
    .addItem('📋 ดู System Log', 'viewRecentLogs')
    .addItem('❓ ตรวจสอบ Schema', 'runSchemaCheck')
    .addToUi();
}

// ─────────────────────────────────────────────────────────────
// MAIN ENTRY POINTS
// ─────────────────────────────────────────────────────────────

/**
 * runDailyProcess — ประมวลผลข้อมูลใหม่ พร้อม Time Guard + Resume
 *
 * FLOW:
 *   1. ตรวจ Schema
 *   2. โหลด Checkpoint (ถ้ามี = ต่อจากที่ค้าง)
 *   3. รัน runWithTimeGuard loop
 *   4. ถ้า Time Guard ตัด → บันทึก Checkpoint + ติดตั้ง Auto-Trigger
 *   5. ถ้าเสร็จ → ล้าง Checkpoint + สรุปผล
 */
function runDailyProcess() {
  // ลบ Trigger ของตัวเองก่อน (กรณีถูก trigger อัตโนมัติ)
  removeSelfTrigger('runDailyProcess');

  const runId = uuid();
  const startTime = new Date();

  try {
    writeLog('INFO', '00_App', 'runDailyProcess', runId, '▶ เริ่ม Daily Process', null);

    // 1. Schema check
    if (!preCheck_Schema()) {
      writeLog('ERROR', '00_App', 'runDailyProcess', runId, 'Schema ไม่ผ่าน — หยุด', null);
      return;
    }

    // 2. แสดง Checkpoint status (ถ้ามี)
    const cpStatus = getCheckpointStatus();
    if (cpStatus.exists) {
      writeLog('INFO', '00_App', 'runDailyProcess', runId,
        `⏸ พบ Checkpoint: ${cpStatus.message}`, null);
    }

    // 3. อ่านทุก row จากชีตต้นทาง (getValues ครั้งเดียว — RULE 6)
    const allRows = getSourceRows();
    if (!allRows || allRows.length === 0) {
      writeLog('INFO', '00_App', 'runDailyProcess', runId,
        'ไม่มีข้อมูลในชีตต้นทาง', null);
      return;
    }

    writeLog('INFO', '00_App', 'runDailyProcess', runId,
      `📊 Source rows ทั้งหมด: ${allRows.length}`, null);

    // 4. รัน Time-Guard Loop ─────────────────────────────────
    const result = runWithTimeGuard(
      allRows,
      (row) => _processOneRow(row, runId),
      runId
    );

    // 5. จัดการผลลัพธ์ ─────────────────────────────────────────

    if (result.interrupted) {
      // ยังทำไม่เสร็จ — ติดตั้ง Auto-Trigger รันต่อ
      installTimeTrigger('runDailyProcess');

      const pct = result.sourceLastRow > 0
        ? ((result.lastRowDone / result.sourceLastRow) * 100).toFixed(1) : '?';

      writeLog('WARN', '00_App', 'runDailyProcess', runId,
        `⏱ Time Guard ตัด: ${pct}% เสร็จ (row ${result.lastRowDone}/${result.sourceLastRow}) ` +
        `| จะ Auto-Continue ใน ~1 นาที`, null);

      // แจ้งใน Spreadsheet cell (ไม่ popup เพราะอาจเป็น background trigger)
      _writeStatusToCell(`⏸ Process ยังไม่เสร็จ: ${pct}% (row ${result.lastRowDone}/${result.sourceLastRow}) — Auto-continue กำลังรอ...`);

    } else {
      // เสร็จสมบูรณ์ทุก row
      writeLog('INFO', '00_App', 'runDailyProcess', runId,
        `✅ เสร็จสมบูรณ์ | session: ok=${result.sessionOk} review=${result.sessionReview} error=${result.sessionError} ` +
        `| รวมทั้งหมด: ok=${result.totalOk} review=${result.totalReview} error=${result.totalError}`,
        JSON.stringify(result));

      // บันทึก Quality Report
      writeReportSnapshot({
        report_date:           startTime,
        total_source_rows:     allRows.length,
        processed_rows:        result.totalDone,
        auto_match_count:      result.totalOk,
        review_count:          result.totalReview,
        error_count:           result.totalError,
        new_person_count:      0,  // อัปเดตใน Nightly
        new_place_count:       0,
        new_geo_count:         0,
        new_destination_count: 0,
        duplicate_alert_count: 0,
        last_refresh_at:       new Date()
      });

      _writeStatusToCell(
        `✅ Process เสร็จ ${new Date().toLocaleString('th-TH')} | ` +
        `ok=${result.sessionOk} review=${result.sessionReview} error=${result.sessionError}`
      );

      // แสดง popup เฉพาะถ้า run แบบ manual
      try {
        SpreadsheetApp.getUi().alert(
          '✅ Daily Process เสร็จสิ้น',
          `ประมวลผล ${result.sessionDone} แถว ใน ${result.elapsedSeconds.toFixed(0)}s\n` +
          `✔ Auto-Match: ${result.sessionOk}\n` +
          `🔍 Review Queue: ${result.sessionReview}\n` +
          `❌ Error: ${result.sessionError}`,
          SpreadsheetApp.getUi().ButtonSet.OK
        );
      } catch (_) { /* Background trigger — ไม่มี UI */ }
    }

  } catch (e) {
    writeLog('ERROR', '00_App', 'runDailyProcess', runId, e.message, null);
    try { SpreadsheetApp.getUi().alert('❌ Error', e.message, SpreadsheetApp.getUi().ButtonSet.OK); }
    catch (_) {}
  }
}

/**
 * _processOneRow — ประมวลผล 1 แถว (ใช้ใน runWithTimeGuard)
 * @param {Object} row
 * @param {string} runId
 * @returns {{ ok: boolean, decision: string }}
 */
function _processOneRow(row, runId) {
  // Normalize
  const normObj = normalizeSourceObject(row);

  // Match Engine
  const resolved = matchAllEntities(normObj);

  // บันทึก FACT + Review Queue
  saveProcessingResult(normObj, resolved);

  // อัปเดต SYNC_STATUS ในชีตต้นทาง
  let newStatus;
  switch (resolved.decision) {
    case 'AUTO_MATCH': newStatus = 'PROCESSED';       break;
    case 'NEW':        newStatus = 'PROCESSED_NEW';   break;
    case 'REVIEW':     newStatus = 'PENDING_REVIEW';  break;
    default:           newStatus = 'PROCESSED';
  }
  updateSourceSyncStatus(row._rowNumber, newStatus);

  return { ok: resolved.decision !== 'REVIEW', decision: resolved.decision };
}

// ─────────────────────────────────────────────────────────────
// SETUP
// ─────────────────────────────────────────────────────────────

function runInitialSetup() {
  const ui = SpreadsheetApp.getUi();
  const resp = ui.alert(
    '🔧 ติดตั้งระบบ MDM',
    'ระบบจะสร้างชีต, config และ header ทั้งหมด\nต้องการดำเนินการต่อหรือไม่?',
    ui.ButtonSet.YES_NO
  );
  if (resp !== ui.Button.YES) return;

  try {
    writeLog('INFO', '00_App', 'runInitialSetup', null, 'เริ่มติดตั้ง', null);
    validateSourceSchema();
    createSystemSheets();
    seedInitialConfig();
    freezeHeaderRows();
    writeLog('INFO', '00_App', 'runInitialSetup', null, 'ติดตั้งสำเร็จ', null);
    ui.alert('✅ ติดตั้งสำเร็จ', 'MDM Logistics พร้อมใช้งาน', ui.ButtonSet.OK);
  } catch (e) {
    writeLog('ERROR', '00_App', 'runInitialSetup', null, e.message, null);
    ui.alert('❌ Error', e.message, ui.ButtonSet.OK);
  }
}

// ─────────────────────────────────────────────────────────────
// MAINTENANCE
// ─────────────────────────────────────────────────────────────

function runNightlyMaintenance() {
  const runId = uuid();
  removeSelfTrigger('runNightlyMaintenance');
  try {
    writeLog('INFO', '00_App', 'runNightlyMaintenance', runId, 'เริ่ม Nightly', null);
    updateAllMasterStats();
    refreshQualityReport();
    purgeOldLogs(90);
    writeLog('INFO', '00_App', 'runNightlyMaintenance', runId, 'Maintenance เสร็จ', null);
  } catch (e) {
    writeLog('ERROR', '00_App', 'runNightlyMaintenance', runId, e.message, null);
  }
}

function reprocessSelectedRows() {
  const ui = SpreadsheetApp.getUi();
  const sheet = SpreadsheetApp.getActiveSheet();
  if (sheet.getName() !== getConfig('SOURCE_SHEET_NAME')) {
    ui.alert('⚠ กรุณา select แถวในชีต ' + getConfig('SOURCE_SHEET_NAME'));
    return;
  }
  const range = sheet.getActiveRange();
  if (!range) { ui.alert('⚠ กรุณาเลือกแถวก่อน'); return; }

  const startRow = range.getRow();
  const numRows  = range.getNumRows();
  const resp = ui.alert('🔁 Reprocess',
    `Reprocess ${numRows} แถว (${startRow}–${startRow + numRows - 1})?`, ui.ButtonSet.YES_NO);
  if (resp !== ui.Button.YES) return;

  const runId = uuid();
  let ok = 0, error = 0;
  for (let r = startRow; r < startRow + numRows; r++) {
    try {
      const row = getSourceRowByNumber(r);
      if (!row) continue;
      _processOneRow(row, runId);
      ok++;
    } catch (e) {
      writeLog('ERROR', '00_App', 'reprocessSelectedRows', runId, `Row ${r}: ${e.message}`, null);
      error++;
    }
  }
  ui.alert('✅ Reprocess เสร็จ', `สำเร็จ: ${ok} | Error: ${error}`, ui.ButtonSet.OK);
}

function showPendingReviews() {
  const reviews = getPendingReviews();
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = ss.getSheetByName(SHEET_NAMES.Q_REVIEW);
  if (sh) ss.setActiveSheet(sh);
  SpreadsheetApp.getUi().alert(
    '🔍 Pending Reviews',
    `มีรายการรอตรวจ: ${reviews.length} รายการ\n(ดูใน Sheet Q_REVIEW)`,
    SpreadsheetApp.getUi().ButtonSet.OK
  );
}

function viewRecentLogs() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = ss.getSheetByName('SYS_LOG');
  if (!sh) { SpreadsheetApp.getUi().alert('ไม่พบ SYS_LOG'); return; }
  ss.setActiveSheet(sh);
  const lastRow = sh.getLastRow();
  if (lastRow > 1) sh.getRange(Math.max(2, lastRow - 30), 1, Math.min(30, lastRow - 1), 9).activate();
}

function runSchemaCheck() {
  try {
    validateSourceSchema();
    SpreadsheetApp.getUi().alert('✅ Schema ถูกต้องครบถ้วน');
  } catch (e) {
    SpreadsheetApp.getUi().alert('❌ Schema Error: ' + e.message);
  }
}

// ─────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────

/**
 * _writeStatusToCell — เขียน Status ลง SYS_CONFIG row 'LAST_RUN_STATUS'
 * เพื่อให้ดูสถานะได้จาก Sheet โดยไม่ต้องเปิด Log
 */
function _writeStatusToCell(message) {
  try {
    setConfig('LAST_RUN_STATUS', message);
    setConfig('LAST_RUN_AT', new Date().toISOString());
  } catch (_) {}
}

function updateAllMasterStats() {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const factSheet = ss.getSheetByName('FACT_DELIVERY');
    if (!factSheet || factSheet.getLastRow() < 2) return;
    const factData = factSheet.getDataRange().getValues();
    const hdr = factData[0];
    const pidIdx = hdr.indexOf('person_id');
    const plcIdx = hdr.indexOf('place_id');
    const geoIdx = hdr.indexOf('geo_id');
    const dateIdx = hdr.indexOf('delivery_date');
    const stats = { person: {}, place: {}, geo: {} };
    for (let i = 1; i < factData.length; i++) {
      const r = factData[i];
      const d = r[dateIdx] ? new Date(r[dateIdx]) : null;
      ['person', 'place', 'geo'].forEach((type, ti) => {
        const idx = [pidIdx, plcIdx, geoIdx][ti];
        if (!r[idx]) return;
        if (!stats[type][r[idx]]) stats[type][r[idx]] = { count: 0, last: null };
        stats[type][r[idx]].count++;
        if (d && (!stats[type][r[idx]].last || d > stats[type][r[idx]].last))
          stats[type][r[idx]].last = d;
      });
    }
    _applyStatsToSheet('M_PERSON', 'person_id', stats.person);
    _applyStatsToSheet('M_PLACE',  'place_id',  stats.place);
    _applyStatsToSheet('M_GEO_POINT', 'geo_id', stats.geo);
  } catch (e) {
    writeLog('ERROR', '00_App', 'updateAllMasterStats', null, e.message, null);
  }
}

function _applyStatsToSheet(sheetName, idCol, statsMap) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = ss.getSheetByName(sheetName);
  if (!sh || sh.getLastRow() < 2) return;
  const data = sh.getDataRange().getValues();
  const hdr = data[0];
  const idIdx = hdr.indexOf(idCol);
  const countIdx = hdr.indexOf('usage_count');
  const lastIdx  = hdr.indexOf('last_seen_date');
  if (idIdx < 0) return;
  for (let i = 1; i < data.length; i++) {
    const id = data[i][idIdx];
    if (!id || !statsMap[id]) continue;
    if (countIdx >= 0) data[i][countIdx] = statsMap[id].count;
    if (lastIdx  >= 0 && statsMap[id].last) data[i][lastIdx] = statsMap[id].last;
  }
  sh.getRange(1, 1, data.length, data[0].length).setValues(data);
}

function purgeOldLogs(daysOld) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sh = ss.getSheetByName('SYS_LOG');
    if (!sh || sh.getLastRow() < 2) return;
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - daysOld);
    const data = sh.getDataRange().getValues();
    const hdr = data[0];
    const dtIdx = hdr.indexOf('created_at');
    if (dtIdx < 0) return;
    const keep = [hdr];
    for (let i = 1; i < data.length; i++) {
      const dt = new Date(data[i][dtIdx]);
      if (isNaN(dt) || dt >= cutoff) keep.push(data[i]);
    }
    sh.clearContents();
    sh.getRange(1, 1, keep.length, keep[0].length).setValues(keep);
  } catch (e) {
    writeLog('WARN', '00_App', 'purgeOldLogs', null, e.message, null);
  }
}
// ============================================================
// FILE: 01_Config.gs
// VERSION: 001
// MODULE: Config — จัดการค่าคงที่และค่าตั้งค่าระบบ
// ============================================================

/**
 * SHEET_NAMES — ชื่อชีตทั้งหมดในระบบ (Source of Truth)
 */
const SHEET_NAMES = {
  SOURCE:       'SCGนครหลวงJWDภูมิภาค',
  M_PERSON:     'M_PERSON',
  M_PERSON_ALIAS:'M_PERSON_ALIAS',
  M_PLACE:      'M_PLACE',
  M_PLACE_ALIAS:'M_PLACE_ALIAS',
  M_GEO_POINT:  'M_GEO_POINT',
  M_DESTINATION:'M_DESTINATION',
  FACT_DELIVERY:'FACT_DELIVERY',
  Q_REVIEW:     'Q_REVIEW',
  SYS_CONFIG:   'SYS_CONFIG',
  SYS_LOG:      'SYS_LOG',
  RPT_QUALITY:  'RPT_DATA_QUALITY'
};

/**
 * C_IDX — Column Index Map ของชีตต้นทาง (0-based)
 * RULE 3: อ้างอิงจากนี้เสมอ ห้าม hardcode ตัวเลข
 */
const C_IDX = {
  SOURCE: {
    HEAD:            0,
    ID:              1,
    DELIVERY_DATE:   2,
    DELIVERY_TIME:   3,
    GEO_POINT:       4,   // "จุดส่งสินค้าปลายทาง" = "lat, long" string
    DRIVER_NAME:     5,
    LICENSE_PLATE:   6,
    SHIPMENT_NO:     7,
    INVOICE_NO:      8,
    BILL_PHOTO:      9,
    CUSTOMER_CODE:   10,
    OWNER_NAME:      11,  // ชื่อเจ้าของสินค้า (บริษัท)
    DEST_NAME:       12,  // ชื่อปลายทาง ← ตัวปัญหาหลัก
    EMP_EMAIL:       13,
    LAT:             14,
    LONG:            15,
    DOC_RETURN_ID:   16,
    WAREHOUSE:       17,
    ADDRESS:         18,  // ที่อยู่ปลายทาง (มั่วๆ จากระบบ)
    PHOTO_GOODS:     19,
    PHOTO_STORE:     20,
    NOTE:            21,
    MONTH:           22,
    DISTANCE_KM:     23,
    ADDRESS_LATLONG: 24,  // ชื่อที่อยู่จาก LatLong (แปลงด้วย script)
    SM_LINK:         25,
    EMP_ID:          26,
    GPS_RECORD:      27,
    TIME_START:      28,
    TIME_SUCCESS:    29,
    MOVE_DISTANCE_M: 30,
    DURATION_MIN:    31,
    SPEED_M_MIN:     32,
    VALIDATION:      33,  // ผลการตรวจสอบงานส่ง
    ANOMALY:         34,  // เหตุผิดปกติ
    PHOTO_TIME:      35,
    SYNC_STATUS:     36
  }
};

// ค่า Default สำหรับ SYS_CONFIG ที่จะ seed ครั้งแรก
const DEFAULT_CONFIG = {
  SOURCE_SHEET_NAME:      SHEET_NAMES.SOURCE,
  AUTO_MATCH_SCORE:       '90',
  REVIEW_SCORE_MIN:       '70',
  GEO_RADIUS_METER:       '50',
  GEO_KEY_PRECISION:      '6',
  MAX_BATCH_SIZE:         '500',
  LOG_RETENTION_DAYS:     '90',
  ENABLE_FUZZY_MATCH:     'true',
  FUZZY_MIN_LENGTH:       '3',
  WAREHOUSE_LAT:          '14.165716',
  WAREHOUSE_LONG:         '100.625296',
  VERSION:                '001'
};

// ─────────────────────────────────────────────
// PUBLIC FUNCTIONS
// ─────────────────────────────────────────────

/**
 * getConfig — อ่านค่า config จากชีต SYS_CONFIG
 * ใช้ CacheService เพื่อลด sheet read (cache 6 ชั่วโมง)
 * @param {string} key - ชื่อ config key
 * @returns {string|null}
 */
function getConfig(key) {
  const cache = CacheService.getScriptCache();
  const cacheKey = 'CFG_' + key;
  const cached = cache.get(cacheKey);
  if (cached !== null) return cached;

  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sh = ss.getSheetByName(SHEET_NAMES.SYS_CONFIG);
    if (!sh) return DEFAULT_CONFIG[key] || null;

    const data = sh.getDataRange().getValues();
    for (let i = 1; i < data.length; i++) {
      if (data[i][0] === key) {
        const val = String(data[i][1]);
        cache.put(cacheKey, val, 21600); // RULE 6: cache 6 ชม.
        return val;
      }
    }
    return DEFAULT_CONFIG[key] || null;
  } catch (e) {
    return DEFAULT_CONFIG[key] || null;
  }
}

/**
 * getAllConfigs — อ่าน config ทั้งหมดเป็น object
 * @returns {Object}
 */
function getAllConfigs() {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sh = ss.getSheetByName(SHEET_NAMES.SYS_CONFIG);
    if (!sh) return { ...DEFAULT_CONFIG };

    const data = sh.getDataRange().getValues();
    const result = { ...DEFAULT_CONFIG };
    for (let i = 1; i < data.length; i++) {
      if (data[i][0]) result[data[i][0]] = String(data[i][1]);
    }
    return result;
  } catch (e) {
    return { ...DEFAULT_CONFIG };
  }
}

/**
 * setConfig — บันทึกค่า config และ clear cache
 * @param {string} key
 * @param {string} value
 */
function setConfig(key, value) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sh = ss.getSheetByName(SHEET_NAMES.SYS_CONFIG);
    if (!sh) return;

    const data = sh.getDataRange().getValues();
    for (let i = 1; i < data.length; i++) {
      if (data[i][0] === key) {
        sh.getRange(i + 1, 2).setValue(value);
        sh.getRange(i + 1, 5).setValue(new Date());
        CacheService.getScriptCache().remove('CFG_' + key);
        return;
      }
    }
    // ถ้าไม่มี key เดิม — เพิ่มแถวใหม่
    sh.appendRow([key, value, 'MANUAL', '', new Date()]);
    CacheService.getScriptCache().remove('CFG_' + key);
  } catch (e) {
    writeLog('ERROR', '01_Config', 'setConfig', null, e.message, null);
  }
}

/**
 * getThresholds — ดึงค่า threshold ทั้งหมดที่ใช้ใน MatchEngine
 * @returns {Object}
 */
function getThresholds() {
  return {
    autoMatch:   parseFloat(getConfig('AUTO_MATCH_SCORE'))  || 90,
    reviewMin:   parseFloat(getConfig('REVIEW_SCORE_MIN'))  || 70,
    geoRadius:   parseFloat(getConfig('GEO_RADIUS_METER'))  || 50,
    geoPrecision:parseInt(getConfig('GEO_KEY_PRECISION'))   || 6,
    maxBatch:    parseInt(getConfig('MAX_BATCH_SIZE'))       || 500,
    fuzzyOn:     getConfig('ENABLE_FUZZY_MATCH') === 'true',
    fuzzyMinLen: parseInt(getConfig('FUZZY_MIN_LENGTH'))    || 3
  };
}

/**
 * getSheetNames — คืนค่า SHEET_NAMES object
 * @returns {Object}
 */
function getSheetNames() {
  return { ...SHEET_NAMES };
}

/**
 * invalidateConfigCache — ล้าง Cache ทั้งหมด (เรียกหลัง setConfig หลายตัว)
 */
function invalidateConfigCache() {
  CacheService.getScriptCache().removeAll(
    Object.keys(DEFAULT_CONFIG).map(k => 'CFG_' + k)
  );
}
// ============================================================
// FILE: 02_Schema.gs
// VERSION: 001
// MODULE: Schema — ตรวจสอบโครงสร้างชีตและ Headers
// ============================================================

// Header definitions สำหรับแต่ละชีต Master
const SHEET_HEADERS = {
  M_PERSON: [
    'person_id','person_name_canonical','person_name_normalized',
    'first_seen_date','last_seen_date','usage_count','status','note'
  ],
  M_PERSON_ALIAS: [
    'person_alias_id','person_id','alias_raw','alias_normalized',
    'source_field','first_seen_date','last_seen_date','usage_count','active_flag'
  ],
  M_PLACE: [
    'place_id','place_name_canonical','place_name_normalized',
    'address_best','address_normalized','warehouse_default',
    'first_seen_date','last_seen_date','usage_count','status','note'
  ],
  M_PLACE_ALIAS: [
    'place_alias_id','place_id','alias_raw','alias_normalized',
    'source_field','first_seen_date','last_seen_date','usage_count','active_flag'
  ],
  M_GEO_POINT: [
    'geo_id','lat_raw','long_raw','lat_norm','long_norm',
    'geo_key_6','geo_key_5','geo_key_4',
    'address_from_latlong_best','first_seen_date','last_seen_date','usage_count','note'
  ],
  M_DESTINATION: [
    'destination_id','person_id','place_id','geo_id',
    'destination_label_canonical','destination_key',
    'confidence_status','first_seen_date','last_seen_date','usage_count','note'
  ],
  FACT_DELIVERY: [
    'tx_id','source_sheet','source_row_number','source_record_id',
    'delivery_date','delivery_time','shipment_no','invoice_no',
    'owner_name','customer_code','raw_person_name','raw_place_name',
    'raw_address','raw_lat','raw_long',
    'person_id','place_id','geo_id','destination_id',
    'warehouse','distance_km','driver_name','employee_id','employee_email',
    'license_plate','validation_result','anomaly_reason',
    'review_status','sync_status','created_at','updated_at'
  ],
  Q_REVIEW: [
    'review_id','issue_type','source_record_id','source_row_number',
    'invoice_no','raw_person_name','raw_place_name','raw_lat','raw_long',
    'candidate_person_ids','candidate_place_ids','candidate_geo_ids',
    'candidate_destination_ids','score','recommended_action',
    'status','reviewer','reviewed_at','decision','note'
  ],
  SYS_CONFIG: [
    'config_key','config_value','config_group','description','updated_at'
  ],
  SYS_LOG: [
    'log_id','run_id','created_at','level','module_name',
    'function_name','ref_id','message','payload_json'
  ],
  RPT_DATA_QUALITY: [
    'report_date','total_source_rows','processed_rows',
    'new_person_count','new_place_count','new_geo_count','new_destination_count',
    'auto_match_count','review_count','duplicate_alert_count',
    'error_count','last_refresh_at'
  ]
};

// คอลัมน์บังคับที่ต้องมีในชีตต้นทาง (ตรวจจาก C_IDX)
const SOURCE_REQUIRED_COLUMNS = [
  'ID_SCGนครหลวงJWDภูมิภาค',
  'วันที่ส่งสินค้า',
  'ชื่อปลายทาง',
  'LAT',
  'LONG',
  'Invoice No',
  'SYNC_STATUS'
];

// ─────────────────────────────────────────────
// PUBLIC FUNCTIONS
// ─────────────────────────────────────────────

/**
 * validateSourceSchema — ตรวจสอบ header ชีตต้นทางว่าครบหรือไม่
 * @throws Error ถ้า column สำคัญหายไป
 */
function validateSourceSchema() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = ss.getSheetByName(SHEET_NAMES.SOURCE);
  if (!sh) throw new Error(`ไม่พบชีตต้นทาง: ${SHEET_NAMES.SOURCE}`);

  const headers = sh.getRange(1, 1, 1, sh.getLastColumn()).getValues()[0];
  const missing = SOURCE_REQUIRED_COLUMNS.filter(col => !headers.includes(col));

  if (missing.length > 0) {
    throw new Error(`ชีตต้นทางขาด column: ${missing.join(', ')}`);
  }
  return true;
}

/**
 * ensureSystemSheets — ตรวจสอบว่าชีตระบบมีครบและ header ถูกต้อง
 * @returns {Object} { ok: boolean, missing: string[], fixed: string[] }
 */
function ensureSystemSheets() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const result = { ok: true, missing: [], fixed: [] };

  for (const [sheetKey, headers] of Object.entries(SHEET_HEADERS)) {
    const sheetName = SHEET_NAMES[sheetKey] || sheetKey;
    let sh = ss.getSheetByName(sheetName);

    if (!sh) {
      // สร้างชีตใหม่
      sh = ss.insertSheet(sheetName);
      sh.getRange(1, 1, 1, headers.length).setValues([headers]);
      result.missing.push(sheetName);
      result.fixed.push(sheetName);
      writeLog('INFO', '02_Schema', 'ensureSystemSheets', null,
        `สร้างชีตใหม่: ${sheetName}`, null);
    } else {
      // ตรวจสอบ header
      const ok = _verifyHeaders(sh, headers);
      if (!ok) {
        createHeadersIfMissing(sh, headers);
        result.fixed.push(sheetName);
      }
    }
  }

  result.ok = result.missing.length === 0;
  return result;
}

/**
 * createHeadersIfMissing — เพิ่ม header ที่หายไปต่อท้าย (RULE 2)
 * @param {Sheet} sh
 * @param {string[]} expectedHeaders
 */
function createHeadersIfMissing(sh, expectedHeaders) {
  const existingHeaders = sh.getLastColumn() > 0
    ? sh.getRange(1, 1, 1, sh.getLastColumn()).getValues()[0]
    : [];

  const toAdd = expectedHeaders.filter(h => !existingHeaders.includes(h));
  if (toAdd.length === 0) return;

  // RULE 2: เพิ่มต่อท้ายเท่านั้น
  const startCol = (sh.getLastColumn() || 0) + 1;
  sh.getRange(1, startCol, 1, toAdd.length).setValues([toAdd]);
  writeLog('INFO', '02_Schema', 'createHeadersIfMissing', null,
    `เพิ่ม header ใน ${sh.getName()}: ${toAdd.join(', ')}`, null);
}

/**
 * getSourceColumnMap — แมป header name → column index (1-based) ของชีตต้นทาง
 * @returns {Object}
 */
function getSourceColumnMap() {
  const cache = CacheService.getScriptCache();
  const cached = cache.get('SOURCE_COL_MAP');
  if (cached) return JSON.parse(cached);

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = ss.getSheetByName(SHEET_NAMES.SOURCE);
  if (!sh) return {};

  const headers = sh.getRange(1, 1, 1, sh.getLastColumn()).getValues()[0];
  const map = {};
  headers.forEach((h, i) => { if (h) map[h] = i + 1; });

  cache.put('SOURCE_COL_MAP', JSON.stringify(map), 21600);
  return map;
}

/**
 * assertRequiredColumns — throw ถ้า sheet ไม่มี column ที่ระบุ
 * @param {Sheet} sh
 * @param {string[]} required
 */
function assertRequiredColumns(sh, required) {
  const headers = sh.getRange(1, 1, 1, sh.getLastColumn()).getValues()[0];
  const missing = required.filter(c => !headers.includes(c));
  if (missing.length > 0) {
    throw new Error(`${sh.getName()} ขาด column: ${missing.join(', ')}`);
  }
}

/**
 * preCheck_Schema — guard ตรวจ schema ก่อนงานสำคัญ (RULE 7)
 * @returns {boolean}
 */
function preCheck_Schema() {
  try {
    validateSourceSchema();
    return true;
  } catch (e) {
    writeLog('ERROR', '02_Schema', 'preCheck_Schema', null, e.message, null);
    return false;
  }
}

// ─────────────────────────────────────────────
// PRIVATE HELPERS
// ─────────────────────────────────────────────

function _verifyHeaders(sh, expectedHeaders) {
  if (sh.getLastColumn() === 0) return false;
  const existing = sh.getRange(1, 1, 1, sh.getLastColumn()).getValues()[0];
  return expectedHeaders.every(h => existing.includes(h));
}
// ============================================================
// FILE: 03_SetupSheets.gs
// VERSION: 001
// MODULE: SetupSheets — สร้างชีตระบบครั้งแรกพร้อม format
// ============================================================

// สีหัว Header แต่ละกลุ่มชีต
const HEADER_COLORS = {
  SOURCE:      '#C73B20',  // แดง-ส้ม = Raw data (อันตราย)
  MASTER:      '#0F6E56',  // เขียวเข้ม = Master data
  ALIAS:       '#185FA5',  // น้ำเงิน = Alias / Sub
  FACT:        '#534AB7',  // ม่วง = Fact / Transaction
  REVIEW:      '#854F0B',  // น้ำตาล = Queue / Review
  SYSTEM:      '#444441',  // เทาเข้ม = System / Config
};

// ─────────────────────────────────────────────
// PUBLIC FUNCTIONS
// ─────────────────────────────────────────────

/**
 * createSystemSheets — สร้างชีตระบบทั้งหมด 11 ชีต (ไม่รวม Source)
 */
function createSystemSheets() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  const sheetConfigs = [
    { key:'M_PERSON',      color: HEADER_COLORS.MASTER },
    { key:'M_PERSON_ALIAS',color: HEADER_COLORS.ALIAS },
    { key:'M_PLACE',       color: HEADER_COLORS.MASTER },
    { key:'M_PLACE_ALIAS', color: HEADER_COLORS.ALIAS },
    { key:'M_GEO_POINT',   color: HEADER_COLORS.MASTER },
    { key:'M_DESTINATION', color: HEADER_COLORS.MASTER },
    { key:'FACT_DELIVERY', color: HEADER_COLORS.FACT },
    { key:'Q_REVIEW',      color: HEADER_COLORS.REVIEW },
    { key:'SYS_CONFIG',    color: HEADER_COLORS.SYSTEM },
    { key:'SYS_LOG',       color: HEADER_COLORS.SYSTEM },
    { key:'RPT_QUALITY',   color: HEADER_COLORS.SYSTEM }
  ];

  for (const cfg of sheetConfigs) {
    const sheetName = SHEET_NAMES[cfg.key];
    let sh = ss.getSheetByName(sheetName);

    if (!sh) {
      sh = ss.insertSheet(sheetName);
      writeLog('INFO', '03_SetupSheets', 'createSystemSheets', null,
        `สร้างชีตใหม่: ${sheetName}`, null);
    }

    const headers = SHEET_HEADERS[cfg.key];
    if (headers) {
      sh.getRange(1, 1, 1, headers.length).setValues([headers]);
      applyHeaderFormatting(sh, headers.length, cfg.color);
    }
  }

  // ป้องกันชีตต้นทาง
  setupSourceSheetProtection();
}

/**
 * applyHeaderFormatting — จัด format หัวตาราง
 * @param {Sheet} sh
 * @param {number} numCols
 * @param {string} bgColor
 */
function applyHeaderFormatting(sh, numCols, bgColor) {
  const headerRange = sh.getRange(1, 1, 1, numCols);
  headerRange
    .setBackground(bgColor)
    .setFontColor('#FFFFFF')
    .setFontWeight('bold')
    .setFontSize(10)
    .setBorder(true, true, true, true, true, true)
    .setHorizontalAlignment('center');

  // Column widths
  sh.setColumnWidth(1, 160);
  for (let c = 2; c <= numCols; c++) sh.setColumnWidth(c, 140);

  // สีแถวสลับ (banding)
  try {
    const existingBandings = sh.getBandings();
    existingBandings.forEach(b => b.remove());
    sh.getRange(1, 1, Math.max(sh.getMaxRows(), 100), numCols)
      .applyRowBanding(SpreadsheetApp.BandingTheme.LIGHT_GREY, true, false);
  } catch (e) {
    // Banding error — skip
  }
}

/**
 * freezeHeaderRows — ตรึงแถวที่ 1 ของทุกชีต
 */
function freezeHeaderRows() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  for (const sheetName of Object.values(SHEET_NAMES)) {
    const sh = ss.getSheetByName(sheetName);
    if (sh) sh.setFrozenRows(1);
  }
}

/**
 * setupSourceSheetProtection — ตั้ง Protection บนชีตต้นทาง
 * RULE 4: ป้องกันการแก้ไขข้อมูลดิบโดยไม่ตั้งใจ
 */
function setupSourceSheetProtection() {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sh = ss.getSheetByName(SHEET_NAMES.SOURCE);
    if (!sh) return;

    // ลบ protection เดิมออกก่อน
    sh.getProtections(SpreadsheetApp.ProtectionType.SHEET)
      .forEach(p => p.remove());

    // ตั้ง protection ใหม่
    const protection = sh.protect()
      .setDescription('Raw Source — แก้ไขผ่านระบบ MDM เท่านั้น')
      .setWarningOnly(true); // ให้ยังแก้ได้แต่มี warning

    writeLog('INFO', '03_SetupSheets', 'setupSourceSheetProtection', null,
      'ตั้ง Protection บนชีตต้นทางแล้ว (Warning Only Mode)', null);
  } catch (e) {
    writeLog('WARN', '03_SetupSheets', 'setupSourceSheetProtection', null,
      e.message, null);
  }
}

/**
 * seedInitialConfig — ใส่ค่า Config เริ่มต้นลงใน SYS_CONFIG
 */
function seedInitialConfig() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = ss.getSheetByName(SHEET_NAMES.SYS_CONFIG);
  if (!sh) return;

  // อ่าน key ที่มีอยู่แล้ว
  const existingData = sh.getLastRow() > 1
    ? sh.getRange(2, 1, sh.getLastRow() - 1, 1).getValues().flat()
    : [];

  const now = new Date();
  const rows = [];

  const configDefinitions = [
    ['SOURCE_SHEET_NAME',  SHEET_NAMES.SOURCE,    'SHEET',     'ชื่อชีตต้นทาง'],
    ['AUTO_MATCH_SCORE',   '90',                  'THRESHOLD', 'คะแนนขั้นต่ำสำหรับ Auto Match (%)'],
    ['REVIEW_SCORE_MIN',   '70',                  'THRESHOLD', 'คะแนนขั้นต่ำสำหรับส่ง Review (%)'],
    ['GEO_RADIUS_METER',   '50',                  'GEO',       'รัศมีสำหรับถือว่าพิกัดเดียวกัน (เมตร)'],
    ['GEO_KEY_PRECISION',  '6',                   'GEO',       'ทศนิยม Geo Key ระดับสูงสุด'],
    ['MAX_BATCH_SIZE',     '500',                 'SYSTEM',    'จำนวนแถวสูงสุดต่อ batch'],
    ['LOG_RETENTION_DAYS', '90',                  'SYSTEM',    'เก็บ Log กี่วัน'],
    ['ENABLE_FUZZY_MATCH', 'true',                'MATCH',     'เปิด/ปิด Fuzzy Matching'],
    ['FUZZY_MIN_LENGTH',   '3',                   'MATCH',     'ความยาวขั้นต่ำสำหรับ Fuzzy'],
    ['WAREHOUSE_LAT',      '14.165716',           'GEO',       'ละติจูดคลัง SCG วังน้อย'],
    ['WAREHOUSE_LONG',     '100.625296',          'GEO',       'ลองจิจูดคลัง SCG วังน้อย'],
    ['VERSION',            '001',                 'SYSTEM',    'Version ของระบบ MDM'],
  ];

  for (const [key, value, group, desc] of configDefinitions) {
    if (!existingData.includes(key)) {
      rows.push([key, value, group, desc, now]);
    }
  }

  if (rows.length > 0) {
    const startRow = sh.getLastRow() + 1;
    sh.getRange(startRow, 1, rows.length, 5).setValues(rows);
    writeLog('INFO', '03_SetupSheets', 'seedInitialConfig', null,
      `เพิ่ม config ${rows.length} รายการ`, null);
  }

  invalidateConfigCache();
}
// ============================================================
// FILE: 04_SourceRepository.gs
// VERSION: 001
// MODULE: SourceRepository — อ่านและจัดการข้อมูลจากชีตต้นทาง
// ============================================================

/**
 * getSourceRows — อ่านข้อมูลทั้งหมดจากชีตต้นทาง
 * @returns {Object[]} array of row objects
 */
function getSourceRows() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = ss.getSheetByName(SHEET_NAMES.SOURCE);
  if (!sh || sh.getLastRow() < 2) return [];

  const data = sh.getDataRange().getValues(); // RULE 6: getValues() เทเสมอ
  const result = [];
  for (let i = 1; i < data.length; i++) {
    const obj = mapRowToSourceObject(data[i], i + 1);
    if (obj && obj.source_id) result.push(obj);
  }
  return result;
}

/**
 * getUnprocessedSourceRows — อ่านเฉพาะแถวที่ SYNC_STATUS ไม่ใช่ PROCESSED
 * @returns {Object[]}
 */
function getUnprocessedSourceRows() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = ss.getSheetByName(SHEET_NAMES.SOURCE);
  if (!sh || sh.getLastRow() < 2) return [];

  const maxBatch = parseInt(getConfig('MAX_BATCH_SIZE')) || 500;
  const data = sh.getDataRange().getValues();
  const result = [];

  const SKIP_STATUSES = ['PROCESSED', 'REPROCESSED', 'ARCHIVED'];

  for (let i = 1; i < data.length; i++) {
    const syncStatus = String(data[i][C_IDX.SOURCE.SYNC_STATUS] || '').trim();
    if (SKIP_STATUSES.includes(syncStatus)) continue;

    const obj = mapRowToSourceObject(data[i], i + 1);
    if (obj && obj.source_id) {
      result.push(obj);
      if (result.length >= maxBatch) break;
    }
  }

  return result;
}

/**
 * getSourceRowByNumber — อ่านแถวเดียวตาม row number (1-based)
 * @param {number} rowNumber
 * @returns {Object|null}
 */
function getSourceRowByNumber(rowNumber) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = ss.getSheetByName(SHEET_NAMES.SOURCE);
  if (!sh || rowNumber < 2) return null;

  const numCols = sh.getLastColumn();
  const rowData = sh.getRange(rowNumber, 1, 1, numCols).getValues()[0];
  return mapRowToSourceObject(rowData, rowNumber);
}

/**
 * mapRowToSourceObject — แปลง raw array → structured object
 * RULE 3: ใช้ C_IDX เสมอ ห้าม hardcode index
 * @param {Array} row
 * @param {number} rowNumber
 * @returns {Object}
 */
function mapRowToSourceObject(row, rowNumber) {
  try {
    const idx = C_IDX.SOURCE;
    const sourceId = safeString(row[idx.ID]);
    if (!sourceId) return null;

    // แยก lat/long จาก "จุดส่งสินค้าปลายทาง" เช่น "13.631403, 100.548684"
    const geoPointStr = safeString(row[idx.GEO_POINT]);
    const [geoLat, geoLong] = _parseLatLongString(geoPointStr);

    // lat/long จากคอลัมน์ตรง
    const latDirect  = safeNumber(row[idx.LAT]);
    const longDirect = safeNumber(row[idx.LONG]);

    // ใช้ค่าตรงก่อน ถ้าไม่มีใช้ค่าจาก GEO_POINT string
    const finalLat  = latDirect  || geoLat;
    const finalLong = longDirect || geoLong;

    return {
      _rowNumber:       rowNumber,
      _sheetName:       SHEET_NAMES.SOURCE,
      source_id:        sourceId,
      delivery_date:    safeDate(row[idx.DELIVERY_DATE]),
      delivery_time:    safeString(row[idx.DELIVERY_TIME]),
      geo_point_raw:    geoPointStr,
      driver_name:      safeString(row[idx.DRIVER_NAME]),
      license_plate:    safeString(row[idx.LICENSE_PLATE]),
      shipment_no:      safeString(row[idx.SHIPMENT_NO]),
      invoice_no:       safeString(row[idx.INVOICE_NO]),
      customer_code:    safeString(row[idx.CUSTOMER_CODE]),
      owner_name:       safeString(row[idx.OWNER_NAME]),
      dest_name_raw:    safeString(row[idx.DEST_NAME]),    // ชื่อปลายทาง (ตัวปัญหา)
      employee_email:   safeString(row[idx.EMP_EMAIL]),
      lat:              finalLat,
      long:             finalLong,
      doc_return_id:    safeString(row[idx.DOC_RETURN_ID]),
      warehouse:        safeString(row[idx.WAREHOUSE]),
      address_raw:      safeString(row[idx.ADDRESS]),       // ที่อยู่มั่วๆ
      note:             safeString(row[idx.NOTE]),
      month:            safeString(row[idx.MONTH]),
      distance_km:      safeNumber(row[idx.DISTANCE_KM]),
      address_latlong:  safeString(row[idx.ADDRESS_LATLONG]), // แปลงจาก LatLong
      employee_id:      safeString(row[idx.EMP_ID]),
      gps_record_raw:   safeString(row[idx.GPS_RECORD]),
      time_start:       safeString(row[idx.TIME_START]),
      time_success:     safeString(row[idx.TIME_SUCCESS]),
      move_distance_m:  safeNumber(row[idx.MOVE_DISTANCE_M]),
      duration_min:     safeString(row[idx.DURATION_MIN]),
      speed_m_min:      safeNumber(row[idx.SPEED_M_MIN]),
      validation_result:safeString(row[idx.VALIDATION]),
      anomaly_reason:   safeString(row[idx.ANOMALY]),
      photo_time:       safeString(row[idx.PHOTO_TIME]),
      sync_status:      safeString(row[idx.SYNC_STATUS])
    };
  } catch (e) {
    writeLog('ERROR', '04_SourceRepository', 'mapRowToSourceObject', null,
      `Row ${rowNumber}: ${e.message}`, null);
    return null;
  }
}

/**
 * markSourceRowProcessed — อัปเดต SYNC_STATUS = 'PROCESSED'
 * @param {number} rowNumber
 */
function markSourceRowProcessed(rowNumber) {
  updateSourceSyncStatus(rowNumber, 'PROCESSED');
}

/**
 * updateSourceSyncStatus — อัปเดต SYNC_STATUS ในชีตต้นทาง
 * @param {number} rowNumber
 * @param {string} status
 */
function updateSourceSyncStatus(rowNumber, status) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sh = ss.getSheetByName(SHEET_NAMES.SOURCE);
    if (!sh) return;

    const syncCol = C_IDX.SOURCE.SYNC_STATUS + 1; // +1 เพราะ getRange ใช้ 1-based
    sh.getRange(rowNumber, syncCol).setValue(status);
  } catch (e) {
    writeLog('ERROR', '04_SourceRepository', 'updateSourceSyncStatus', null,
      `Row ${rowNumber}: ${e.message}`, null);
  }
}

// ─────────────────────────────────────────────
// PRIVATE HELPERS
// ─────────────────────────────────────────────

/**
 * _parseLatLongString — แยก lat, long จาก string "13.631403, 100.548684"
 * @param {string} str
 * @returns {[number, number]}
 */
function _parseLatLongString(str) {
  if (!str) return [0, 0];
  const parts = str.replace(/['"]/g, '').split(',');
  if (parts.length < 2) return [0, 0];
  const lat  = parseFloat(parts[0].trim());
  const long = parseFloat(parts[1].trim());
  return [isNaN(lat) ? 0 : lat, isNaN(long) ? 0 : long];
}
// ============================================================
// FILE: 05_NormalizeService.gs  (VERSION 003 — Real-World Messy Data)
// VERSION: 003
// MODULE: NormalizeService — ทำความสะอาด "ข้อมูลมั่วๆ จริงๆ"
//
// ปัญหาที่พบจริงในข้อมูล:
//
// ชื่อบุคคล (ชื่อปลายทาง) มั่วแบบนี้:
//   "คุณแตง โทร.0639656564"       → "แตง"
//   "นายสมชาย ร้านวัสดุก่อสร้าง"  → "สมชาย"
//   "แตง(ช่างแอร์)"               → "แตง"
//   "คุณจันทร์ 081-999-4556"       → "จันทร์"
//   "บ้านคุณหมอสมหญิง"            → "สมหญิง"
//   "ร้านทองคำสุก/คุณทอง"         → "ทอง"
//   "K.แมน"                        → "แมน"
//   "mr.somchai"                   → "somchai"
//
// ชื่อสถานที่ (ที่อยู่ปลายทาง) มั่วแบบนี้:
//   "14/2 ม.3 ต.บ้านนา"           → "ต.บ้านนา อ.?"
//   "ลาดพร้าว 101 กทม"             → "ลาดพร้าว กรุงเทพฯ"
//   "(เบอร์โทร) อ.ศรีราชา จ.ชลบุรี" → "ศรีราชา ชลบุรี"
//   "อาคาร ABC ชั้น3 ถ.สุขุมวิท"   → "สุขุมวิท กรุงเทพฯ"
//   "ส่งคุณแตง ร้านแตงโม หน้า 7-11" → ที่อยู่ไม่มี
// ============================================================

// ─── Patterns สำหรับตัดออกจากชื่อบุคคล ─────────────────────

// คำนำหน้าชื่อ (ตัดได้ทั้งหมด)
const PERSON_TITLE_PATTERNS = [
  /^(คุณ|นาย|นาง|นางสาว|นส\.|ดร\.|อ\.|ผศ\.|รศ\.|ศ\.|พ\.ต\.|พ\.ท\.|พ\.อ\.|หมอ|คุณหมอ|ครู|อาจารย์)\s*/,
  /^(mr\.?|mrs\.?|ms\.?|miss\.?|dr\.?|k\.|khun)\s*/i,
  /^(บ้านคุณ|ร้านคุณ|ของคุณ|ส่งคุณ|ส่งให้|ให้)\s*/
];

// Pattern เบอร์โทรศัพท์ (หลายรูปแบบ)
const PHONE_PATTERNS = [
  /[\s,\/\(]?\d{3}[-\s]?\d{3}[-\s]?\d{4}\b/g,      // 081-999-4556
  /[\s,\/\(]?\d{10}\b/g,                              // 0819994556
  /[\s,\/\(]?\d{9}\b/g,                               // 023456789
  /(?:โทร\.?|tel\.?|โทรศัพท์\.?|โทร:)\s*[\d\-\(\)\s\.]+/gi,
  /\(\s*\d{9,12}\s*\)/g                               // (0819994556)
];

// วงเล็บและ suffix ที่ไม่ใช่ชื่อ
const PAREN_NOISE = [
  /\([^)]{0,30}\)/g,              // (...) ที่สั้น เช่น (ช่างแอร์)
  /\/[^\/\n]{1,20}$/g,            // /.../ท้าย เช่น /คุณทอง
  /\s+(ร้าน|สาขา|หน้า|ใกล้|บริเวณ|ติดกับ|เยื้อง|ข้างๆ?)[^\n]{0,40}$/g
];

// Pattern ที่บ่งชี้ว่าไม่ใช่ชื่อ (context clue)
const NOT_A_PERSON_PATTERNS = [
  /^\d+[\/ ]/,          // ขึ้นต้นด้วยเลขที่บ้าน
  /^(อาคาร|ตึก|บ้าน\d)/i,
  /^(สี่แยก|ตลาด|วัด|โรงพยาบาล|โรงเรียน|มหาวิทยาลัย)/
];

// ─── Patterns สำหรับทำความสะอาดที่อยู่ ──────────────────────

// ส่วนที่อยู่จริง (เก็บไว้)
const ADDRESS_KEEP_KEYWORDS = [
  'หมู่','ซอย','ถนน','ถ.','ซ.','ม.','ตำบล','ต.','แขวง','อำเภอ','อ.','เขต',
  'จังหวัด','จ.','กรุงเทพ','กทม','นนทบุรี','ปทุม','สมุทร'
];

// Prefix เบอร์โทรที่ขึ้นต้น เช่น "(เบอร์โทร) อ.ศรีราชา"
const LEADING_PHONE_PAREN = /^\s*\([^)]*\d[^)]*\)\s*/;

// ─────────────────────────────────────────────────────────────
// PUBLIC FUNCTIONS
// ─────────────────────────────────────────────────────────────

/**
 * normalizeSourceObject — Normalize ข้อมูลทั้ง source object
 * Entry point หลักสำหรับ MatchEngine
 * @param {Object} sourceObj (จาก mapRowToSourceObject)
 * @returns {Object} sourceObj + normalized fields
 */
function normalizeSourceObject(sourceObj) {
  const norm = { ...sourceObj };

  // ─── ชื่อบุคคล (ตัวปัญหา #1) ─────────────────────────────
  const personResult = deepCleanPersonName(sourceObj.dest_name_raw);
  norm.person_name_norm      = personResult.name;
  norm.person_name_tokens    = personResult.tokens;
  norm.person_name_confidence= personResult.confidence;
  norm.person_original_type  = personResult.inputType; // PERSON | PLACE | MIXED | UNKNOWN

  // ─── ชื่อสถานที่ (ตัวปัญหา #2) ───────────────────────────
  // เรียง priority: address_latlong (แม่นสุด) > address_raw > dest_name ถ้าเป็น place
  const bestAddress = sourceObj.address_latlong || sourceObj.address_raw || '';
  const placeResult = deepCleanPlaceName(bestAddress, sourceObj.address_raw);
  norm.place_name_norm       = placeResult.place;
  norm.address_norm          = placeResult.address;
  norm.address_latlong_norm  = normalizeAddress(sourceObj.address_latlong || '');
  norm.extracted_amphoe      = placeResult.amphoe;
  norm.extracted_province    = placeResult.province;

  // ─── กรณี dest_name เป็นที่อยู่จริง ─────────────────────
  // เช่น "14/2 ม.3 ต.บ้านนา อ.บ้านนา" — ไม่ใช่ชื่อคน
  if (personResult.inputType === 'PLACE' && !norm.place_name_norm) {
    const placeFromName = deepCleanPlaceName(sourceObj.dest_name_raw, '');
    norm.place_name_norm = placeFromName.place || norm.place_name_norm;
    norm.address_norm    = placeFromName.address || norm.address_norm;
    norm.person_name_norm = ''; // ล้างชื่อคนถ้าจริงๆคือที่อยู่
  }

  // ─── ชื่อบริษัท (เจ้าของสินค้า) ─────────────────────────
  norm.owner_name_norm = normalizeCompanyName(sourceObj.owner_name || '');

  // ─── Geo ─────────────────────────────────────────────────
  const geoNorm = normalizeLatLong(sourceObj.lat, sourceObj.long);
  norm.lat_norm  = geoNorm.lat;
  norm.long_norm = geoNorm.long;
  norm.geo_keys  = buildGeoKeys(geoNorm.lat, geoNorm.long);

  // ─── Fingerprint ─────────────────────────────────────────
  norm.fingerprint = buildFingerprint(norm);

  return norm;
}

/**
 * deepCleanPersonName — ทำความสะอาดชื่อบุคคลแบบลึก
 * รองรับข้อมูลมั่วๆ จริงๆ
 *
 * @param {string} rawName
 * @returns {{
 *   name: string,         — ชื่อที่สะอาดที่สุด
 *   tokens: string[],     — ชิ้นส่วนชื่อ
 *   confidence: number,   — 0-100 มั่นใจว่าเป็นชื่อคนแค่ไหน
 *   inputType: string     — PERSON | PLACE | MIXED | UNKNOWN
 * }}
 */
function deepCleanPersonName(rawName) {
  if (!rawName || String(rawName).trim() === '') {
    return { name: '', tokens: [], confidence: 0, inputType: 'UNKNOWN' };
  }

  let n = String(rawName).trim();
  const original = n;

  // ── ตรวจว่าเป็นที่อยู่ ไม่ใช่ชื่อคน ─────────────────────
  const looksLikePlace = NOT_A_PERSON_PATTERNS.some(p => p.test(n))
    || ADDRESS_KEEP_KEYWORDS.some(kw => n.includes(kw))
    || /\d+\/\d+/.test(n);  // เลขที่บ้าน เช่น 14/2

  if (looksLikePlace && !_hasPersonIndicator(n)) {
    return { name: '', tokens: [], confidence: 10, inputType: 'PLACE' };
  }

  // ── ตัด Leading phone/bracket ─────────────────────────────
  PHONE_PATTERNS.forEach(p => { n = n.replace(p, ''); });
  PAREN_NOISE.forEach(p => { n = n.replace(p, ''); });

  // ── ตัดคำนำหน้าชื่อ ──────────────────────────────────────
  PERSON_TITLE_PATTERNS.forEach(p => { n = n.replace(p, ''); });

  // ── ตัด Suffix ที่อยู่หลังชื่อ เช่น "สมชาย ร้านวัสดุ" ──
  n = _cutAddressSuffix(n);

  // ── Normalize whitespace ──────────────────────────────────
  n = n.replace(/\s+/g, ' ').trim();

  // ── ตัดเครื่องหมายพิเศษ ──────────────────────────────────
  n = n.replace(/^[,.\-\/\s]+|[,.\-\/\s]+$/g, '').trim();

  // ── คำนวณ Confidence ─────────────────────────────────────
  let confidence = 50;
  if (n.length >= 2 && n.length <= 20) confidence += 20;
  if (n.length > 20) confidence -= 20;
  if (/\s/.test(n)) confidence += 10;      // มีนามสกุล
  if (/^[ก-ฮ]/.test(n)) confidence += 10; // ขึ้นต้นพยัญชนะไทย
  if (/\d/.test(n)) confidence -= 30;      // ยังมีตัวเลข
  if (n.length < 2) confidence = 10;

  const inputType = looksLikePlace ? 'MIXED' : 'PERSON';
  const tokens = n.split(/\s+/).filter(Boolean);

  return {
    name: normalizeThaiText(n),
    tokens,
    confidence: Math.max(0, Math.min(100, confidence)),
    inputType
  };
}

/**
 * deepCleanPlaceName — ทำความสะอาดที่อยู่แบบลึก
 * Extract: ชื่อสถานที่, ที่อยู่, อำเภอ, จังหวัด
 *
 * @param {string} primaryAddress  — ที่อยู่หลัก (address_latlong ถ้ามี)
 * @param {string} rawAddress      — ที่อยู่ raw จากระบบ
 * @returns {{ place, address, amphoe, province }}
 */
function deepCleanPlaceName(primaryAddress, rawAddress) {
  const empty = { place: '', address: '', amphoe: '', province: '' };

  const src = String(primaryAddress || rawAddress || '').trim();
  if (!src) return empty;

  let a = src;

  // ── ตัด Leading phone in parenthesis เช่น "(0819994556) อ.ศรีราชา" ──
  a = a.replace(LEADING_PHONE_PAREN, '');
  PHONE_PATTERNS.forEach(p => { a = a.replace(p, ''); });

  // ── ตัด "ส่งให้คุณXXX" prefix ────────────────────────────
  a = a.replace(/^ส่ง(คุณ|ให้|ที่)?\s*/i, '');

  // ── Extract จังหวัด ──────────────────────────────────────
  const province = _extractProvinceFromText(a);

  // ── Extract อำเภอ/เขต ───────────────────────────────────
  const amphoe = _extractAmphoeFromText(a);

  // ── ตัดคำที่อยู่จาก address_latlong (มาจาก Google Maps แล้ว) ──
  // address_latlong มักมีรูปแบบ: "ตำบล อำเภอ จังหวัด รหัสไปรษณีย์ ประเทศไทย"
  // → ทำความสะอาดและใช้เป็น canonical place
  let cleanPlace = '';
  if (primaryAddress && primaryAddress.includes(',')) {
    // Google Maps format — ดึงส่วนแรกเป็น place name
    const parts = primaryAddress.split(',').map(p => p.trim());
    cleanPlace = parts[0] || '';
    // ตัด house number ออก เช่น "14/2 หมู่บ้านX" → "หมู่บ้านX"
    cleanPlace = cleanPlace.replace(/^\d+[\d\/]*\s*/, '').trim();
  } else {
    cleanPlace = a;
  }

  // Normalize
  cleanPlace = normalizeAddress(cleanPlace);
  const cleanAddress = normalizeAddress(a);

  return {
    place:    cleanPlace,
    address:  cleanAddress,
    amphoe:   amphoe,
    province: province
  };
}

/**
 * normalizePersonName — wrapper สำหรับ compatibility
 */
function normalizePersonName(name) {
  return deepCleanPersonName(name).name;
}

/**
 * normalizePlaceName — wrapper สำหรับ compatibility
 */
function normalizePlaceName(name) {
  return deepCleanPlaceName(name, '').place;
}

/**
 * normalizeCompanyName — ทำความสะอาดชื่อบริษัทเจ้าของสินค้า
 */
function normalizeCompanyName(name) {
  if (!name) return '';
  let n = String(name).trim();

  // ตัด legal suffixes
  const LEGAL = [
    'บริษัท','จำกัด','บจก.','บจก','หจก.','หจก','จก.','(มหาชน)',
    'co.,ltd','co.ltd','co., ltd','limited','ltd.','ltd','corp','inc'
  ];
  LEGAL.forEach(s => {
    n = n.replace(new RegExp('\\b' + s + '\\b', 'gi'), '');
  });

  return normalizeThaiText(n);
}

/**
 * normalizeThaiText — ล้างข้อความภาษาไทยทั่วไป
 */
function normalizeThaiText(text) {
  if (!text) return '';
  return String(text)
    .replace(/\uFF01-\uFF5E/g, c => String.fromCharCode(c.charCodeAt(0) - 0xFEE0))
    .replace(/\u3000/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

/**
 * normalizeAddress — ทำความสะอาดที่อยู่ทั่วไป
 */
function normalizeAddress(address) {
  if (!address) return '';
  let a = String(address);

  PHONE_PATTERNS.forEach(p => { a = a.replace(p, ''); });
  a = a.replace(LEADING_PHONE_PAREN, '');
  a = a.replace(/\b(ประเทศไทย|thailand)\b/gi, '');
  a = a.replace(/\b(แขวง|ตำบล|เขต|อำเภอ|จังหวัด)\s*\1/g, '$1'); // ลบซ้ำ
  a = normalizeThaiText(a);

  return a;
}

/**
 * normalizeLatLong — ทำมาตรฐานตัวเลข lat/long
 */
function normalizeLatLong(lat, long) {
  const precision = parseInt(getConfig('GEO_KEY_PRECISION') || '6');
  const factor = Math.pow(10, precision);
  return {
    lat:  Math.round(parseFloat(lat  || 0) * factor) / factor,
    long: Math.round(parseFloat(long || 0) * factor) / factor
  };
}

/**
 * buildGeoKeys — สร้าง geo key หลายระดับ
 */
function buildGeoKeys(lat, long) {
  return {
    key6: `${parseFloat(lat).toFixed(6)},${parseFloat(long).toFixed(6)}`,
    key5: `${parseFloat(lat).toFixed(5)},${parseFloat(long).toFixed(5)}`,
    key4: `${parseFloat(lat).toFixed(4)},${parseFloat(long).toFixed(4)}`
  };
}

/**
 * buildFingerprint — สร้าง fingerprint สำหรับ dedup
 */
function buildFingerprint(normObj) {
  return [
    normObj.person_name_norm || '',
    normObj.place_name_norm  || '',
    (normObj.geo_keys && normObj.geo_keys.key5) || ''
  ].join('|').toLowerCase();
}

/**
 * buildThaiPhoneticKey — สร้าง phonetic key (ตัดสระ/วรรณยุกต์)
 */
function buildThaiPhoneticKey(text) {
  if (!text) return '';
  return text
    .replace(/[\u0E31\u0E34-\u0E3A\u0E47-\u0E4E]/g, '')
    .replace(/\s+/g, '')
    .toLowerCase()
    .trim();
}

// ─────────────────────────────────────────────────────────────
// PRIVATE HELPERS
// ─────────────────────────────────────────────────────────────

/**
 * _hasPersonIndicator — ตรวจว่ามีสัญญาณว่าเป็นชื่อคน
 */
function _hasPersonIndicator(text) {
  const PERSON_SIGNALS = ['คุณ','นาย','นาง','นางสาว','K.','mr','mrs','ms'];
  return PERSON_SIGNALS.some(s => text.toLowerCase().includes(s.toLowerCase()));
}

/**
 * _cutAddressSuffix — ตัดส่วนที่เป็นสถานที่ต่อท้ายชื่อ
 * "สมชาย ร้านวัสดุก่อสร้างพระราม9" → "สมชาย"
 * "ทอง/ร้านทอง" → "ทอง"
 */
function _cutAddressSuffix(name) {
  // ตัดหลัง "/" เช่น "สมชาย/ร้านวัสดุ"
  const slashIdx = name.indexOf('/');
  if (slashIdx > 0 && slashIdx < name.length - 1) {
    name = name.substring(0, slashIdx).trim();
  }

  // ตัด keyword ที่บ่งว่าเป็นสถานที่/ร้าน
  const PLACE_SUFFIX_KEYWORDS = [
    'ร้าน','สาขา','บริษัท','อาคาร','ตึก','ห้าง','ตลาด','วัด',
    'โรงพยาบาล','โรงเรียน','สำนักงาน','โกดัง','คลัง','ไซต์'
  ];

  for (const kw of PLACE_SUFFIX_KEYWORDS) {
    const idx = name.indexOf(kw);
    if (idx > 1) { // ไม่ใช่ตั้งแต่ต้น
      name = name.substring(0, idx).trim();
      break;
    }
  }

  return name;
}

/**
 * _extractProvinceFromText — ดึงจังหวัดจาก text
 */
function _extractProvinceFromText(text) {
  if (!text) return '';
  const ABBREV = {
    'กทม':'กรุงเทพมหานคร','กรุงเทพ':'กรุงเทพมหานคร',
    'กรุงเทพฯ':'กรุงเทพมหานคร','bkk':'กรุงเทพมหานคร',
    'นนท์':'นนทบุรี','ปทุม':'ปทุมธานี','สมุทรปราการ':'สมุทรปราการ'
  };

  const t = text.toLowerCase();
  for (const [abbr, full] of Object.entries(ABBREV)) {
    if (t.includes(abbr.toLowerCase())) return full;
  }

  const jMatch = text.match(/(?:จ\.|จังหวัด)\s*([\u0E00-\u0E7F]+)/);
  if (jMatch) return jMatch[1];

  return '';
}

/**
 * _extractAmphoeFromText — ดึง อำเภอ/เขต จาก text
 */
function _extractAmphoeFromText(text) {
  if (!text) return '';
  const aMatch = text.match(/(?:อ\.|อำเภอ|เขต)\s*([\u0E00-\u0E7F]+)/);
  if (aMatch) return aMatch[1];
  return '';
}
// ============================================================
// FILE: 06_PersonService.gs
// VERSION: 001
// MODULE: PersonService — จัดการ Master บุคคล (M_PERSON)
// ============================================================

/**
 * resolvePerson — หา / สร้าง person_id จากชื่อที่ normalize แล้ว
 * Entry point หลักสำหรับ MatchEngine
 * @param {Object} normObj (จาก normalizeSourceObject)
 * @returns {{person_id, score, method, is_new}}
 */
function resolvePerson(normObj) {
  try {
    const personName = normObj.person_name_norm;
    if (!personName || personName.length < 2) {
      return { person_id: null, score: 0, method: 'SKIP', is_new: false };
    }

    // 1. ตรวจ Alias ก่อน (exact match)
    const aliasMatch = _findPersonByAlias(personName);
    if (aliasMatch) {
      return { person_id: aliasMatch, score: 100, method: 'ALIAS_EXACT', is_new: false };
    }

    // 2. ตรวจ Canonical name (exact)
    const exactMatch = _findPersonByCanonical(personName);
    if (exactMatch) {
      return { person_id: exactMatch, score: 100, method: 'CANONICAL_EXACT', is_new: false };
    }

    // 3. Fuzzy match ถ้าเปิดใช้งาน
    if (getConfig('ENABLE_FUZZY_MATCH') === 'true') {
      const candidates = findPersonCandidates(personName);
      if (candidates.length > 0) {
        const best = candidates[0];
        if (best.score >= parseFloat(getConfig('AUTO_MATCH_SCORE') || '90')) {
          // Auto-match: เพิ่ม alias
          createPersonAlias(best.person_id, normObj.dest_name_raw, personName);
          return { person_id: best.person_id, score: best.score, method: 'FUZZY_AUTO', is_new: false };
        }
        if (best.score >= parseFloat(getConfig('REVIEW_SCORE_MIN') || '70')) {
          return { person_id: null, score: best.score, method: 'FUZZY_REVIEW',
            is_new: false, candidates };
        }
      }
    }

    // 4. สร้างใหม่
    const newId = createPerson(normObj.dest_name_raw, personName);
    createPersonAlias(newId, normObj.dest_name_raw, personName);
    return { person_id: newId, score: 0, method: 'NEW', is_new: true };

  } catch (e) {
    writeLog('ERROR', '06_PersonService', 'resolvePerson', null, e.message,
      JSON.stringify({ name: normObj.dest_name_raw }));
    return { person_id: null, score: 0, method: 'ERROR', is_new: false };
  }
}

/**
 * findPersonCandidates — หา candidates จาก M_PERSON + M_PERSON_ALIAS
 * @param {string} normalizedName
 * @returns {Array<{person_id, name, score}>} เรียงจากคะแนนสูงสุด
 */
function findPersonCandidates(normalizedName) {
  const persons = _getAllPersons();
  const aliases  = _getAllPersonAliases();
  const phoneticKey = buildThaiPhoneticKey(normalizedName);

  const scores = {};

  // คะแนนจาก canonical
  for (const p of persons) {
    const s = scorePersonCandidate(normalizedName, phoneticKey, p.norm, p.person_id);
    if (s > 0) {
      scores[p.person_id] = Math.max(scores[p.person_id] || 0, s);
    }
  }

  // คะแนนจาก alias
  for (const a of aliases) {
    if (!a.active) continue;
    const s = scorePersonCandidate(normalizedName, phoneticKey, a.norm, a.person_id);
    if (s > 0) {
      scores[a.person_id] = Math.max(scores[a.person_id] || 0, s);
    }
  }

  // แปลงเป็น array เรียงคะแนน
  const personMap = {};
  persons.forEach(p => { personMap[p.person_id] = p.canonical; });

  return Object.entries(scores)
    .map(([pid, score]) => ({ person_id: pid, name: personMap[pid] || '', score }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 5); // คืน top 5
}

/**
 * scorePersonCandidate — ให้คะแนนการจับคู่ชื่อ (0-100)
 * @param {string} inputNorm - ชื่อที่กำลังค้น (normalized)
 * @param {string} inputPhonetic - phonetic key ของ input
 * @param {string} candidateNorm - ชื่อใน master (normalized)
 * @param {string} candidateId
 * @returns {number} คะแนน 0-100
 */
function scorePersonCandidate(inputNorm, inputPhonetic, candidateNorm, candidateId) {
  if (!inputNorm || !candidateNorm) return 0;
  if (inputNorm === candidateNorm) return 100; // exact match

  // ความยาวขั้นต่ำ
  const minLen = parseInt(getConfig('FUZZY_MIN_LENGTH')) || 3;
  if (inputNorm.length < minLen || candidateNorm.length < minLen) return 0;

  let score = 0;

  // 1. Levenshtein similarity (น้ำหนัก 50%)
  const maxLen = Math.max(inputNorm.length, candidateNorm.length);
  const lev = _levenshtein(inputNorm, candidateNorm);
  const levScore = Math.max(0, (1 - lev / maxLen)) * 50;
  score += levScore;

  // 2. Phonetic match (น้ำหนัก 30%)
  const candidatePhonetic = buildThaiPhoneticKey(candidateNorm);
  if (inputPhonetic && candidatePhonetic && inputPhonetic === candidatePhonetic) {
    score += 30;
  } else if (inputPhonetic && candidatePhonetic) {
    const pLev = _levenshtein(inputPhonetic, candidatePhonetic);
    const pMax = Math.max(inputPhonetic.length, candidatePhonetic.length);
    score += Math.max(0, (1 - pLev / pMax)) * 20;
  }

  // 3. Prefix/Suffix match (น้ำหนัก 20%)
  if (inputNorm.startsWith(candidateNorm) || candidateNorm.startsWith(inputNorm)) score += 20;
  else if (inputNorm.includes(candidateNorm) || candidateNorm.includes(inputNorm)) score += 10;

  return Math.min(100, Math.round(score));
}

/**
 * createPerson — สร้าง M_PERSON record ใหม่
 * @param {string} canonicalName
 * @param {string} normalizedName
 * @returns {string} person_id ใหม่
 */
function createPerson(canonicalName, normalizedName) {
  return withLock(() => {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sh = ss.getSheetByName(SHEET_NAMES.M_PERSON);
    const newId = _generateId('PER');
    const now = new Date();
    sh.appendRow([
      newId,
      canonicalName,
      normalizedName,
      now,   // first_seen_date
      now,   // last_seen_date
      1,     // usage_count
      'ACTIVE',
      ''
    ]);
    _clearPersonCache();
    return newId;
  });
}

/**
 * createPersonAlias — เพิ่ม Alias ให้ M_PERSON (ป้องกัน duplicate)
 * @param {string} personId
 * @param {string} aliasRaw
 * @param {string} aliasNormalized
 */
function createPersonAlias(personId, aliasRaw, aliasNormalized) {
  return withLock(() => {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sh = ss.getSheetByName(SHEET_NAMES.M_PERSON_ALIAS);

    // ตรวจซ้ำก่อน
    if (sh.getLastRow() > 1) {
      const data = sh.getDataRange().getValues();
      for (let i = 1; i < data.length; i++) {
        if (data[i][1] === personId && data[i][3] === aliasNormalized) return; // ซ้ำ
      }
    }

    const now = new Date();
    sh.appendRow([
      _generateId('PAL'),
      personId,
      aliasRaw,
      aliasNormalized,
      'dest_name_raw',
      now,
      now,
      1,
      1
    ]);
    _clearPersonCache();
  });
}

/**
 * updatePersonStats — อัปเดต last_seen + usage_count
 * @param {string} personId
 */
function updatePersonStats(personId) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sh = ss.getSheetByName(SHEET_NAMES.M_PERSON);
    if (!sh || sh.getLastRow() < 2) return;

    const data = sh.getDataRange().getValues();
    for (let i = 1; i < data.length; i++) {
      if (data[i][0] === personId) {
        const usageCol = 6, lastSeenCol = 5;
        sh.getRange(i + 1, usageCol).setValue((data[i][usageCol - 1] || 0) + 1);
        sh.getRange(i + 1, lastSeenCol).setValue(new Date());
        return;
      }
    }
  } catch (e) {
    writeLog('WARN', '06_PersonService', 'updatePersonStats', null, e.message, null);
  }
}

// ─────────────────────────────────────────────
// PRIVATE HELPERS
// ─────────────────────────────────────────────

function _getAllPersons() {
  const cache = CacheService.getScriptCache();
  const cached = cache.get('ALL_PERSONS');
  if (cached) return JSON.parse(cached);

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = ss.getSheetByName(SHEET_NAMES.M_PERSON);
  if (!sh || sh.getLastRow() < 2) return [];

  const data = sh.getDataRange().getValues();
  const result = [];
  for (let i = 1; i < data.length; i++) {
    if (data[i][6] !== 'ARCHIVED') { // skip archived
      result.push({ person_id: data[i][0], canonical: data[i][1], norm: data[i][2] });
    }
  }
  cache.put('ALL_PERSONS', JSON.stringify(result), 21600);
  return result;
}

function _getAllPersonAliases() {
  const cache = CacheService.getScriptCache();
  const cached = cache.get('ALL_PERSON_ALIASES');
  if (cached) return JSON.parse(cached);

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = ss.getSheetByName(SHEET_NAMES.M_PERSON_ALIAS);
  if (!sh || sh.getLastRow() < 2) return [];

  const data = sh.getDataRange().getValues();
  const result = [];
  for (let i = 1; i < data.length; i++) {
    result.push({
      alias_id: data[i][0], person_id: data[i][1],
      raw: data[i][2], norm: data[i][3],
      active: data[i][8] === 1 || data[i][8] === true
    });
  }
  cache.put('ALL_PERSON_ALIASES', JSON.stringify(result), 21600);
  return result;
}

function _findPersonByAlias(normalizedName) {
  const aliases = _getAllPersonAliases();
  const match = aliases.find(a => a.active && a.norm === normalizedName);
  return match ? match.person_id : null;
}

function _findPersonByCanonical(normalizedName) {
  const persons = _getAllPersons();
  const match = persons.find(p => p.norm === normalizedName);
  return match ? match.person_id : null;
}

function _clearPersonCache() {
  CacheService.getScriptCache().removeAll(['ALL_PERSONS', 'ALL_PERSON_ALIASES']);
}

/**
 * _levenshtein — คำนวณ Levenshtein Distance
 * @param {string} a
 * @param {string} b
 * @returns {number}
 */
function _levenshtein(a, b) {
  const m = a.length, n = b.length;
  const dp = Array.from({ length: m + 1 }, (_, i) =>
    Array.from({ length: n + 1 }, (_, j) => i === 0 ? j : j === 0 ? i : 0)
  );
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = a[i - 1] === b[j - 1]
        ? dp[i - 1][j - 1]
        : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }
  return dp[m][n];
}

function _generateId(prefix) {
  const ts = new Date().getTime().toString(36).toUpperCase();
  const rand = Math.random().toString(36).substr(2, 4).toUpperCase();
  return `${prefix}-${ts}${rand}`;
}
// ============================================================
// FILE: 07_PlaceService.gs
// VERSION: 001
// MODULE: PlaceService — จัดการ Master สถานที่ (M_PLACE)
// ============================================================

/**
 * resolvePlace — หา / สร้าง place_id
 * @param {Object} normObj
 * @returns {{place_id, score, method, is_new}}
 */
function resolvePlace(normObj) {
  try {
    const placeName = normObj.place_name_norm;
    const addrNorm  = normObj.address_norm || normObj.address_latlong_norm;

    if (!placeName && !addrNorm) {
      return { place_id: null, score: 0, method: 'SKIP', is_new: false };
    }

    // 1. Alias exact
    const aliasMatch = _findPlaceByAlias(placeName);
    if (aliasMatch) {
      return { place_id: aliasMatch, score: 100, method: 'ALIAS_EXACT', is_new: false };
    }

    // 2. Canonical exact
    const exactMatch = _findPlaceByCanonical(placeName);
    if (exactMatch) {
      return { place_id: exactMatch, score: 100, method: 'CANONICAL_EXACT', is_new: false };
    }

    // 3. Fuzzy match
    if (getConfig('ENABLE_FUZZY_MATCH') === 'true') {
      const candidates = findPlaceCandidates(placeName, addrNorm);
      if (candidates.length > 0) {
        const best = candidates[0];
        if (best.score >= parseFloat(getConfig('AUTO_MATCH_SCORE') || '90')) {
          createPlaceAlias(best.place_id, normObj.address_raw, placeName);
          return { place_id: best.place_id, score: best.score, method: 'FUZZY_AUTO', is_new: false };
        }
        if (best.score >= parseFloat(getConfig('REVIEW_SCORE_MIN') || '70')) {
          return { place_id: null, score: best.score, method: 'FUZZY_REVIEW',
            is_new: false, candidates };
        }
      }
    }

    // 4. สร้างใหม่
    const addrBest = normObj.address_latlong || normObj.address_raw;
    const newId = createPlace(placeName || addrBest, addrBest);
    if (placeName) createPlaceAlias(newId, normObj.address_raw, placeName);
    return { place_id: newId, score: 0, method: 'NEW', is_new: true };

  } catch (e) {
    writeLog('ERROR', '07_PlaceService', 'resolvePlace', null, e.message, null);
    return { place_id: null, score: 0, method: 'ERROR', is_new: false };
  }
}

function findPlaceCandidates(normalizedPlace, normalizedAddress) {
  const places  = _getAllPlaces();
  const aliases = _getAllPlaceAliases();
  const scores  = {};

  for (const p of places) {
    const s = scorePlaceCandidate(normalizedPlace, normalizedAddress, p.norm, p.addrNorm);
    if (s > 0) scores[p.place_id] = Math.max(scores[p.place_id] || 0, s);
  }
  for (const a of aliases) {
    if (!a.active) continue;
    const s = scorePlaceCandidate(normalizedPlace, normalizedAddress, a.norm, '');
    if (s > 0) scores[a.place_id] = Math.max(scores[a.place_id] || 0, s);
  }

  const placeMap = {};
  places.forEach(p => { placeMap[p.place_id] = p.canonical; });

  return Object.entries(scores)
    .map(([pid, score]) => ({ place_id: pid, name: placeMap[pid] || '', score }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);
}

function scorePlaceCandidate(inputPlace, inputAddr, candidateNorm, candidateAddr) {
  let score = 0;
  if (!inputPlace && !inputAddr) return 0;

  if (inputPlace && candidateNorm) {
    if (inputPlace === candidateNorm) return 100;
    const lev = _levenshtein(inputPlace, candidateNorm);
    const maxLen = Math.max(inputPlace.length, candidateNorm.length);
    score += Math.max(0, (1 - lev / maxLen)) * 60;
    if (inputPlace.includes(candidateNorm) || candidateNorm.includes(inputPlace)) score += 10;
  }

  if (inputAddr && candidateAddr && inputAddr.length > 5 && candidateAddr.length > 5) {
    const lev = _levenshtein(inputAddr.slice(0, 40), candidateAddr.slice(0, 40));
    const maxLen = Math.max(inputAddr.length, candidateAddr.length, 1);
    score += Math.max(0, (1 - lev / maxLen)) * 40;
  }

  return Math.min(100, Math.round(score));
}

function createPlace(canonicalName, addressBest) {
  return withLock(() => {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sh = ss.getSheetByName(SHEET_NAMES.M_PLACE);
    const newId = _generatePlaceId();
    const now = new Date();
    sh.appendRow([
      newId, canonicalName, normalizeThaiText(canonicalName),
      addressBest, normalizeAddress(addressBest), '',
      now, now, 1, 'ACTIVE', ''
    ]);
    _clearPlaceCache();
    return newId;
  });
}

function createPlaceAlias(placeId, aliasRaw, aliasNormalized) {
  return withLock(() => {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sh = ss.getSheetByName(SHEET_NAMES.M_PLACE_ALIAS);
    if (sh.getLastRow() > 1) {
      const data = sh.getDataRange().getValues();
      for (let i = 1; i < data.length; i++) {
        if (data[i][1] === placeId && data[i][3] === aliasNormalized) return;
      }
    }
    const now = new Date();
    sh.appendRow([_generatePlaceAliasId(), placeId, aliasRaw, aliasNormalized,
      'address_raw', now, now, 1, 1]);
    _clearPlaceCache();
  });
}

function updatePlaceStats(placeId) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sh = ss.getSheetByName(SHEET_NAMES.M_PLACE);
    if (!sh || sh.getLastRow() < 2) return;
    const data = sh.getDataRange().getValues();
    for (let i = 1; i < data.length; i++) {
      if (data[i][0] === placeId) {
        sh.getRange(i + 1, 9).setValue((data[i][8] || 0) + 1);
        sh.getRange(i + 1, 8).setValue(new Date());
        return;
      }
    }
  } catch (e) {
    writeLog('WARN', '07_PlaceService', 'updatePlaceStats', null, e.message, null);
  }
}

function _getAllPlaces() {
  const cache = CacheService.getScriptCache();
  const cached = cache.get('ALL_PLACES');
  if (cached) return JSON.parse(cached);
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = ss.getSheetByName(SHEET_NAMES.M_PLACE);
  if (!sh || sh.getLastRow() < 2) return [];
  const data = sh.getDataRange().getValues();
  const result = [];
  for (let i = 1; i < data.length; i++) {
    if (data[i][9] !== 'ARCHIVED') {
      result.push({ place_id: data[i][0], canonical: data[i][1],
        norm: data[i][2], addrNorm: data[i][4] });
    }
  }
  cache.put('ALL_PLACES', JSON.stringify(result), 21600);
  return result;
}

function _getAllPlaceAliases() {
  const cache = CacheService.getScriptCache();
  const cached = cache.get('ALL_PLACE_ALIASES');
  if (cached) return JSON.parse(cached);
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = ss.getSheetByName(SHEET_NAMES.M_PLACE_ALIAS);
  if (!sh || sh.getLastRow() < 2) return [];
  const data = sh.getDataRange().getValues();
  const result = [];
  for (let i = 1; i < data.length; i++) {
    result.push({ alias_id: data[i][0], place_id: data[i][1],
      norm: data[i][3], active: data[i][8] === 1 || data[i][8] === true });
  }
  cache.put('ALL_PLACE_ALIASES', JSON.stringify(result), 21600);
  return result;
}

function _findPlaceByAlias(norm) {
  const aliases = _getAllPlaceAliases();
  const m = aliases.find(a => a.active && a.norm === norm);
  return m ? m.place_id : null;
}

function _findPlaceByCanonical(norm) {
  const places = _getAllPlaces();
  const m = places.find(p => p.norm === norm);
  return m ? m.place_id : null;
}

function _clearPlaceCache() {
  CacheService.getScriptCache().removeAll(['ALL_PLACES', 'ALL_PLACE_ALIASES']);
}

function _generatePlaceId() {
  return 'PLA-' + new Date().getTime().toString(36).toUpperCase() +
    Math.random().toString(36).substr(2, 4).toUpperCase();
}

function _generatePlaceAliasId() {
  return 'PLAL-' + new Date().getTime().toString(36).toUpperCase() +
    Math.random().toString(36).substr(2, 3).toUpperCase();
}
// ============================================================
// FILE: 08_GeoService.gs
// VERSION: 001
// MODULE: GeoService — จัดการพิกัด GPS (M_GEO_POINT)
// ============================================================

// Haversine Earth radius (km)
const EARTH_RADIUS_KM = 6371;

/**
 * resolveGeo — หา / สร้าง geo_id จากพิกัด lat/long
 * @param {Object} normObj
 * @returns {{geo_id, score, method, is_new}}
 */
function resolveGeo(normObj) {
  try {
    const lat  = normObj.lat_norm;
    const long = normObj.long_norm;

    if (!lat || !long || lat === 0 || long === 0) {
      return { geo_id: null, score: 0, method: 'SKIP', is_new: false };
    }

    const geoKeys = normObj.geo_keys || buildGeoKeys(lat, long);
    const radius  = parseFloat(getConfig('GEO_RADIUS_METER')) || 50;

    // 1. Exact match (key_6)
    const exactMatch = _findGeoByKey6(geoKeys.key6);
    if (exactMatch) {
      return { geo_id: exactMatch, score: 100, method: 'EXACT', is_new: false };
    }

    // 2. Near match (key_5 = ±~11m)
    const nearMatch5 = _findGeoByKey5(geoKeys.key5);
    if (nearMatch5) {
      return { geo_id: nearMatch5, score: 95, method: 'NEAR_KEY5', is_new: false };
    }

    // 3. Cluster match — ตรวจจากรัศมีจริง (Haversine)
    const candidates = findGeoCandidates(lat, long);
    if (candidates.length > 0) {
      const best = candidates[0];
      if (best.dist_m <= radius) {
        return { geo_id: best.geo_id, score: 90, method: 'RADIUS_MATCH', is_new: false };
      }
    }

    // 4. สร้างใหม่
    const addrFromLL = normObj.address_latlong || '';
    const newId = createGeoPoint(lat, long, geoKeys, addrFromLL);
    return { geo_id: newId, score: 0, method: 'NEW', is_new: true };

  } catch (e) {
    writeLog('ERROR', '08_GeoService', 'resolveGeo', null, e.message,
      JSON.stringify({ lat: normObj.lat, long: normObj.long }));
    return { geo_id: null, score: 0, method: 'ERROR', is_new: false };
  }
}

/**
 * findGeoCandidates — หา geo points ในรัศมี 200m
 * @param {number} lat
 * @param {number} long
 * @returns {Array<{geo_id, lat, long, dist_m}>} เรียงจากใกล้สุด
 */
function findGeoCandidates(lat, long) {
  const allGeo = _getAllGeoPoints();
  const results = [];

  // Pre-filter: ±0.01° ≈ ±1km — ลด loop
  const LAT_RANGE  = 0.01;
  const LONG_RANGE = 0.01;

  for (const g of allGeo) {
    if (Math.abs(g.lat - lat) > LAT_RANGE) continue;
    if (Math.abs(g.long - long) > LONG_RANGE) continue;

    const dist_m = calcDistanceMeters(lat, long, g.lat, g.long);
    if (dist_m <= 200) { // ค้นในรัศมี 200m
      results.push({ geo_id: g.geo_id, lat: g.lat, long: g.long, dist_m });
    }
  }

  return results.sort((a, b) => a.dist_m - b.dist_m).slice(0, 5);
}

/**
 * createGeoPoint — สร้าง M_GEO_POINT record ใหม่
 * @param {number} lat
 * @param {number} long
 * @param {Object} geoKeys
 * @param {string} addressFromLatLong
 * @returns {string} geo_id
 */
function createGeoPoint(lat, long, geoKeys, addressFromLatLong) {
  return withLock(() => {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sh = ss.getSheetByName(SHEET_NAMES.M_GEO_POINT);
    const newId = _generateGeoId();
    const now = new Date();
    sh.appendRow([
      newId,
      lat, long,           // lat_raw, long_raw
      lat, long,           // lat_norm, long_norm
      geoKeys.key6,
      geoKeys.key5,
      geoKeys.key4,
      addressFromLatLong,  // address_from_latlong_best
      now,                 // first_seen_date
      now,                 // last_seen_date
      1,                   // usage_count
      ''                   // note
    ]);
    _clearGeoCache();
    return newId;
  });
}

/**
 * calcDistanceMeters — Haversine Formula
 * @param {number} lat1
 * @param {number} lon1
 * @param {number} lat2
 * @param {number} lon2
 * @returns {number} ระยะทาง (เมตร)
 */
function calcDistanceMeters(lat1, lon1, lat2, lon2) {
  const toRad = x => x * Math.PI / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return EARTH_RADIUS_KM * 1000 * 2 * Math.asin(Math.sqrt(a));
}

/**
 * buildGeoKey — สร้าง key ระดับ precision ที่กำหนด
 * @param {number} lat
 * @param {number} long
 * @param {number} precision
 * @returns {string}
 */
function buildGeoKey(lat, long, precision) {
  return `${parseFloat(lat).toFixed(precision)},${parseFloat(long).toFixed(precision)}`;
}

/**
 * clusterNearbyGeo — หา geo points ทั้งหมดที่อยู่ในรัศมีที่กำหนด
 * ใช้สำหรับ Maintenance — ตรวจจับจุดที่อาจ merge ได้
 * @param {number} lat
 * @param {number} long
 * @param {number} radiusMeters
 * @returns {Array}
 */
function clusterNearbyGeo(lat, long, radiusMeters) {
  const allGeo = _getAllGeoPoints();
  return allGeo.filter(g => calcDistanceMeters(lat, long, g.lat, g.long) <= radiusMeters);
}

// ─────────────────────────────────────────────
// PRIVATE HELPERS
// ─────────────────────────────────────────────

function _getAllGeoPoints() {
  const cache = CacheService.getScriptCache();
  const cached = cache.get('ALL_GEO');
  if (cached) return JSON.parse(cached);

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = ss.getSheetByName(SHEET_NAMES.M_GEO_POINT);
  if (!sh || sh.getLastRow() < 2) return [];

  const data = sh.getDataRange().getValues();
  const result = [];
  for (let i = 1; i < data.length; i++) {
    result.push({
      geo_id: data[i][0],
      lat:    parseFloat(data[i][3]),  // lat_norm
      long:   parseFloat(data[i][4]),  // long_norm
      key6:   data[i][5],
      key5:   data[i][6],
      key4:   data[i][7]
    });
  }
  cache.put('ALL_GEO', JSON.stringify(result), 21600);
  return result;
}

function _findGeoByKey6(key6) {
  const all = _getAllGeoPoints();
  const m = all.find(g => g.key6 === key6);
  return m ? m.geo_id : null;
}

function _findGeoByKey5(key5) {
  const all = _getAllGeoPoints();
  const m = all.find(g => g.key5 === key5);
  return m ? m.geo_id : null;
}

function _clearGeoCache() {
  CacheService.getScriptCache().remove('ALL_GEO');
}

function _generateGeoId() {
  return 'GEO-' + new Date().getTime().toString(36).toUpperCase() +
    Math.random().toString(36).substr(2, 4).toUpperCase();
}
// ============================================================
// FILE: 09_DestinationService.gs
// VERSION: 001
// MODULE: DestinationService — จัดการปลายทางจริง (M_DESTINATION)
// ============================================================

/**
 * resolveDestination — หา / สร้าง destination_id
 * จาก person_id + place_id + geo_id
 * @param {string} personId
 * @param {string} placeId
 * @param {string} geoId
 * @param {Object} normObj
 * @returns {{destination_id, is_new}}
 */
function resolveDestination(personId, placeId, geoId, normObj) {
  try {
    if (!personId && !placeId && !geoId) {
      return { destination_id: null, is_new: false };
    }

    const key = buildDestinationKey(personId, placeId, geoId);

    // ค้นหา destination เดิม
    const existing = findDestinationCandidates(personId, placeId, geoId);
    if (existing.length > 0) {
      updateDestinationStats(existing[0].destination_id);
      return { destination_id: existing[0].destination_id, is_new: false };
    }

    // สร้างใหม่
    const label = _buildDestinationLabel(normObj);
    const newId = createDestination(personId, placeId, geoId, label, key);
    return { destination_id: newId, is_new: true };

  } catch (e) {
    writeLog('ERROR', '09_DestinationService', 'resolveDestination', null, e.message, null);
    return { destination_id: null, is_new: false };
  }
}

/**
 * buildDestinationKey — สร้าง key จาก 3 master IDs
 * @param {string} personId
 * @param {string} placeId
 * @param {string} geoId
 * @returns {string}
 */
function buildDestinationKey(personId, placeId, geoId) {
  return `${personId || 'NOPERSON'}|${placeId || 'NOPLACE'}|${geoId || 'NOGEO'}`;
}

/**
 * findDestinationCandidates — หา destination จาก combination ของ IDs
 * @param {string} personId
 * @param {string} placeId
 * @param {string} geoId
 * @returns {Array<{destination_id, key}>}
 */
function findDestinationCandidates(personId, placeId, geoId) {
  const all = _getAllDestinations();
  const key = buildDestinationKey(personId, placeId, geoId);
  return all.filter(d => d.key === key);
}

/**
 * createDestination — สร้าง M_DESTINATION record
 * @param {string} personId
 * @param {string} placeId
 * @param {string} geoId
 * @param {string} label
 * @param {string} key
 * @returns {string} destination_id
 */
function createDestination(personId, placeId, geoId, label, key) {
  return withLock(() => {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sh = ss.getSheetByName(SHEET_NAMES.M_DESTINATION);
    const newId = _generateDestId();
    const now = new Date();
    sh.appendRow([
      newId, personId, placeId, geoId,
      label, key, 'CONFIRMED',
      now, now, 1, ''
    ]);
    _clearDestCache();
    return newId;
  });
}

/**
 * updateDestinationStats — อัปเดต usage_count, last_seen_date
 * @param {string} destinationId
 */
function updateDestinationStats(destinationId) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sh = ss.getSheetByName(SHEET_NAMES.M_DESTINATION);
    if (!sh || sh.getLastRow() < 2) return;
    const data = sh.getDataRange().getValues();
    for (let i = 1; i < data.length; i++) {
      if (data[i][0] === destinationId) {
        sh.getRange(i + 1, 10).setValue((data[i][9] || 0) + 1); // usage_count
        sh.getRange(i + 1, 9).setValue(new Date());               // last_seen_date
        return;
      }
    }
  } catch (e) {
    writeLog('WARN', '09_DestinationService', 'updateDestinationStats', null, e.message, null);
  }
}

function _getAllDestinations() {
  const cache = CacheService.getScriptCache();
  const cached = cache.get('ALL_DESTS');
  if (cached) return JSON.parse(cached);
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = ss.getSheetByName(SHEET_NAMES.M_DESTINATION);
  if (!sh || sh.getLastRow() < 2) return [];
  const data = sh.getDataRange().getValues();
  const result = [];
  for (let i = 1; i < data.length; i++) {
    result.push({ destination_id: data[i][0], person_id: data[i][1],
      place_id: data[i][2], geo_id: data[i][3], key: data[i][5] });
  }
  cache.put('ALL_DESTS', JSON.stringify(result), 21600);
  return result;
}

function _clearDestCache() { CacheService.getScriptCache().remove('ALL_DESTS'); }

function _buildDestinationLabel(normObj) {
  const parts = [];
  if (normObj.person_name_norm) parts.push(normObj.person_name_norm);
  if (normObj.place_name_norm)  parts.push(normObj.place_name_norm);
  if (normObj.lat_norm && normObj.long_norm)
    parts.push(`(${normObj.lat_norm},${normObj.long_norm})`);
  return parts.join(' | ');
}

function _generateDestId() {
  return 'DST-' + new Date().getTime().toString(36).toUpperCase() +
    Math.random().toString(36).substr(2, 4).toUpperCase();
}


// ============================================================
// FILE: 10_MatchEngine.gs
// VERSION: 001
// MODULE: MatchEngine — ตัวตัดสินกลางของระบบ
// ============================================================

/**
 * matchAllEntities — จุดประสาน Person + Place + Geo + Destination
 * Entry point จาก runDailyProcess
 * @param {Object} normObj (จาก normalizeSourceObject)
 * @returns {{personResult, placeResult, geoResult, destResult, compositeScore, decision}}
 */
function matchAllEntities(normObj) {
  // ─── 1. แต่ละ entity ─────────────────────────
  const personResult = resolvePerson(normObj);
  const placeResult  = resolvePlace(normObj);
  const geoResult    = resolveGeo(normObj);

  // ─── 2. Destination ────────────────────────
  let destResult = { destination_id: null, is_new: false };
  if (personResult.person_id || placeResult.place_id || geoResult.geo_id) {
    destResult = resolveDestination(
      personResult.person_id, placeResult.place_id, geoResult.geo_id, normObj
    );
  }

  // ─── 3. คะแนนรวม ───────────────────────────
  const compositeScore = calculateCompositeScore({
    personResult, placeResult, geoResult
  });

  // ─── 4. ตัดสินใจ ───────────────────────────
  const decision = decideAutoMatchOrReview(compositeScore, {
    personResult, placeResult, geoResult, destResult, normObj
  });

  // ─── 5. ตรวจ Conflict types ────────────────
  const conflictTypes = detectConflictType({ personResult, placeResult, geoResult, normObj });

  return {
    personResult, placeResult, geoResult, destResult,
    compositeScore, decision, conflictTypes, normObj
  };
}

/**
 * calculateCompositeScore — คะแนนรวมจาก 3 entity (0-100)
 * น้ำหนัก: Person 40%, Place 35%, Geo 25%
 * @param {{personResult, placeResult, geoResult}}
 * @returns {number}
 */
function calculateCompositeScore({ personResult, placeResult, geoResult }) {
  const pScore = (personResult.score || 0) * 0.40;
  const lScore = (placeResult.score  || 0) * 0.35;
  const gScore = (geoResult.score    || 0) * 0.25;
  return Math.round(pScore + lScore + gScore);
}

/**
 * decideAutoMatchOrReview — ตัดสินว่าเป็น AUTO_MATCH / REVIEW / NEW
 * @param {number} compositeScore
 * @param {Object} context
 * @returns {string}
 */
function decideAutoMatchOrReview(compositeScore, context) {
  const thresholds = getThresholds();
  const { personResult, placeResult, geoResult } = context;

  // ถ้าทุก entity เป็น NEW — เพิ่มใหม่โดยตรง
  const allNew = personResult.is_new && placeResult.is_new && geoResult.is_new;
  if (allNew) return 'NEW';

  // REVIEW methods จาก entity ใดก็ตาม
  const needsReview = [personResult, placeResult, geoResult]
    .some(r => r.method === 'FUZZY_REVIEW' || r.method === 'ERROR');
  if (needsReview) return 'REVIEW';

  if (compositeScore >= thresholds.autoMatch) return 'AUTO_MATCH';
  if (compositeScore >= thresholds.reviewMin)  return 'REVIEW';

  return 'NEW';
}

/**
 * detectConflictType — ตรวจหาประเภทปัญหาข้อมูล (ปัญหา 8 ข้อ)
 * @param {{personResult, placeResult, geoResult, normObj}}
 * @returns {string[]} รายการ conflict types ที่พบ
 */
function detectConflictType({ personResult, placeResult, geoResult, normObj }) {
  const types = [];

  // ปัญหา 4: บุคคลเดียวกันแต่ชื่อต่างกัน (Fuzzy match สำเร็จ)
  if (personResult.method === 'FUZZY_AUTO' || personResult.method === 'ALIAS_EXACT') {
    types.push('SAME_PERSON_DIFF_NAME');
  }

  // ปัญหา 7: คนเดียวกัน แต่ Geo ต่าง (person match แต่ geo ใหม่)
  if (personResult.person_id && !personResult.is_new && geoResult.is_new) {
    types.push('SAME_PERSON_DIFF_GEO');
  }

  // ปัญหา 6: คนเดียวกัน แต่ Place ต่าง
  if (personResult.person_id && !personResult.is_new && placeResult.is_new) {
    types.push('SAME_PERSON_DIFF_PLACE');
  }

  // ปัญหา 8: Geo เดียวกัน แต่คนต่าง (geo match แต่ person ใหม่)
  if (geoResult.geo_id && !geoResult.is_new && personResult.is_new) {
    types.push('SAME_GEO_DIFF_PERSON');
  }

  // ปัญหา 5: Place เดียวกัน แต่คนต่าง
  if (placeResult.place_id && !placeResult.is_new && personResult.is_new) {
    types.push('SAME_PLACE_DIFF_PERSON');
  }

  return types;
}

/**
 * buildReviewPayload — สร้าง payload สำหรับ Q_REVIEW
 * @param {Object} resolvedObj (จาก matchAllEntities)
 * @returns {Object}
 */
function buildReviewPayload(resolvedObj) {
  const { personResult, placeResult, geoResult, destResult, compositeScore,
    conflictTypes, normObj } = resolvedObj;

  const issueType = conflictTypes.length > 0 ? conflictTypes[0] : 'UNCERTAIN_MATCH';

  return {
    issue_type:              issueType,
    source_record_id:        normObj.source_id,
    source_row_number:       normObj._rowNumber,
    invoice_no:              normObj.invoice_no,
    raw_person_name:         normObj.dest_name_raw,
    raw_place_name:          normObj.address_raw,
    raw_lat:                 normObj.lat,
    raw_long:                normObj.long,
    candidate_person_ids:    personResult.candidates
      ? personResult.candidates.map(c => `${c.person_id}(${c.score}%)`).join(',') : '',
    candidate_place_ids:     placeResult.candidates
      ? placeResult.candidates.map(c => `${c.place_id}(${c.score}%)`).join(',') : '',
    candidate_geo_ids:       geoResult.candidates
      ? geoResult.candidates.map(c => `${c.geo_id}(${c.dist_m}m)`).join(',') : '',
    candidate_destination_ids: destResult.destination_id || '',
    score:                   compositeScore,
    recommended_action:      compositeScore >= 70 ? 'VERIFY_AND_MERGE' : 'MANUAL_REVIEW',
    status:                  'PENDING'
  };
}
// ============================================================
// FILE: 10_MatchEngine.gs  (VERSION 002 — Enhanced 8-Problem System)
// VERSION: 002
// MODULE: MatchEngine — ตัวตัดสินกลาง พร้อมระบบวิเคราะห์ 8 ปัญหา
//
// ──────────────────────────────────────────────────────────────
//  8 ปัญหาที่ระบบนี้แก้ไข:
//
//  #1  ชื่อบุคคลซ้ำกัน           → Person Dedup via M_PERSON
//  #2  ชื่อสถานที่ซ้ำ             → Place Dedup via M_PLACE
//  #3  LatLong ซ้ำกัน            → Geo Cluster via M_GEO_POINT
//  #4  คนเดียวแต่ชื่อต่างกัน     → Person Alias + Fuzzy Match
//  #5  คนละชื่อ สถานที่เดียวกัน  → Place Shared, Person Separate
//  #6  ชื่อเดียวกัน สถานที่ต่าง  → 1 Person → N Places (N Destinations)
//  #7  ชื่อเดียวกัน LatLong ต่าง → 1 Person → N GeoPoints
//  #8  คนละชื่อ LatLong เดียวกัน → N Persons → 1 GeoPoint
// ──────────────────────────────────────────────────────────────

// ─── Weight Matrix ─────────────────────────────────────────────
// น้ำหนักคะแนนในแต่ละ dimension (รวม = 100%)
const SCORE_WEIGHTS = {
  PERSON_EXACT:      40,   // ชื่อตรงเป๊ะ
  PERSON_ALIAS:      38,   // ตรงผ่าน alias
  PERSON_FUZZY:      28,   // fuzzy match
  PLACE_EXACT:       30,   // สถานที่ตรง
  PLACE_ALIAS:       28,
  PLACE_FUZZY:       20,
  GEO_EXACT:         30,   // พิกัดตรง (key_6)
  GEO_NEAR5:         25,   // พิกัดใกล้ (key_5 ≈ ±11m)
  GEO_RADIUS:        18,   // พิกัดในรัศมี
  ADDRESS_MATCH:     10,   // ที่อยู่ตรงกัน (bonus)
  OWNER_MATCH:        5    // เจ้าของสินค้าเดียวกัน (bonus)
};

// Conflict Type Codes — ตรงกับ 8 ปัญหา
const CONFLICT = {
  C1_PERSON_DUPE:         'C1_PERSON_DUPLICATE',
  C2_PLACE_DUPE:          'C2_PLACE_DUPLICATE',
  C3_GEO_DUPE:            'C3_GEO_DUPLICATE',
  C4_SAME_PERSON_DIFF_NAME:'C4_SAME_PERSON_DIFF_NAME',
  C5_DIFF_PERSON_SAME_PLACE:'C5_DIFF_PERSON_SAME_PLACE',
  C6_SAME_PERSON_DIFF_PLACE:'C6_SAME_PERSON_DIFF_PLACE',
  C7_SAME_PERSON_DIFF_GEO: 'C7_SAME_PERSON_DIFF_GEO',
  C8_DIFF_PERSON_SAME_GEO: 'C8_DIFF_PERSON_SAME_GEO'
};

// Resolution Actions — วิธีแก้ไขที่แนะนำให้ Admin
const ACTION = {
  AUTO_MAP:      'AUTO_MAP',      // ระบบทำได้เองทันที
  ADD_ALIAS:     'ADD_ALIAS',     // เพิ่ม Alias แล้วแมพ
  MERGE:         'MERGE',         // Merge Master Records
  SPLIT:         'SPLIT',         // แยกออกเป็น Record ใหม่
  CONFIRM_MULTI: 'CONFIRM_MULTI', // ยืนยันว่ามีหลาย destination จริง
  MANUAL:        'MANUAL'         // ต้องให้คนตัดสิน
};

// ─── Main Engine ───────────────────────────────────────────────

/**
 * matchAllEntities — Entry Point หลัก
 * ทำ Entity Resolution + 8-Problem Detection ครบในที่เดียว
 *
 * @param {Object} normObj — จาก normalizeSourceObject()
 * @returns {Object} resolvedObj
 */
function matchAllEntities(normObj) {

  // ── STEP 1: Resolve แต่ละ Entity ──────────────────────────
  const personResult = resolvePerson(normObj);
  const placeResult  = resolvePlace(normObj);
  const geoResult    = resolveGeo(normObj);

  // ── STEP 2: ตรวจ Conflicts ทั้ง 8 ข้อ ────────────────────
  const conflictReport = detectAllConflicts({
    personResult, placeResult, geoResult, normObj
  });

  // ── STEP 3: คำนวณ Composite Score ────────────────────────
  const compositeScore = calculateCompositeScore({
    personResult, placeResult, geoResult, normObj
  });

  // ── STEP 4: ตัดสิน Decision ──────────────────────────────
  const decision = decideAutoMatchOrReview(compositeScore, {
    personResult, placeResult, geoResult,
    conflictReport, normObj
  });

  // ── STEP 5: Resolve Destination ──────────────────────────
  let destResult = { destination_id: null, is_new: false };
  if (decision !== 'SKIP' && (personResult.person_id || placeResult.place_id || geoResult.geo_id)) {
    destResult = resolveDestination(
      personResult.person_id,
      placeResult.place_id,
      geoResult.geo_id,
      normObj
    );
  }

  // ── STEP 6: บันทึก Conflict Log ──────────────────────────
  if (conflictReport.conflicts.length > 0) {
    writeLog('INFO', '10_MatchEngine', 'matchAllEntities',
      normObj.source_id,
      `Conflicts: ${conflictReport.conflicts.join(', ')} | score=${compositeScore} | ${decision}`,
      null);
  }

  return {
    personResult,
    placeResult,
    geoResult,
    destResult,
    compositeScore,
    decision,
    conflictReport,
    normObj
  };
}

// ─── 8-Problem Detector ─────────────────────────────────────────

/**
 * detectAllConflicts — ตรวจและจัดประเภทปัญหาทั้ง 8 ข้อ
 *
 * @param {{personResult, placeResult, geoResult, normObj}}
 * @returns {{
 *   conflicts: string[],       — รหัส Conflict ที่พบ
 *   details: Object,           — ข้อมูลละเอียด
 *   recommendations: Object[]  — Action ที่แนะนำให้ทำ
 * }}
 */
function detectAllConflicts({ personResult, placeResult, geoResult, normObj }) {
  const conflicts     = [];
  const details       = {};
  const recommendations = [];

  const P = personResult;  // shortcuts
  const L = placeResult;
  const G = geoResult;

  // ──────────────────────────────────────────────────────────
  // ปัญหา #1: ชื่อบุคคลซ้ำกันในระบบ
  //   → พบเมื่อ canonical match score = 100 แต่มีหลาย alias
  // ──────────────────────────────────────────────────────────
  if (P.person_id && !P.is_new && P.score === 100 && P.method === 'CANONICAL_EXACT') {
    // ตรวจว่าชื่อ raw ต่างจาก canonical หรือไม่ (คนละการพิมพ์)
    if (normObj.dest_name_raw &&
        normObj.person_name_norm !== normObj.dest_name_raw.toLowerCase().trim()) {
      conflicts.push(CONFLICT.C1_PERSON_DUPE);
      details.C1 = {
        person_id: P.person_id,
        raw_input: normObj.dest_name_raw,
        canonical: P.person_id,
        action: 'ชื่อนี้มีอยู่แล้ว — เชื่อมเข้า person เดิมโดยอัตโนมัติ'
      };
      recommendations.push({ conflict: CONFLICT.C1_PERSON_DUPE, action: ACTION.AUTO_MAP });
    }
  }

  // ──────────────────────────────────────────────────────────
  // ปัญหา #2: ชื่อสถานที่ซ้ำกันในระบบ
  // ──────────────────────────────────────────────────────────
  if (L.place_id && !L.is_new && L.score === 100) {
    conflicts.push(CONFLICT.C2_PLACE_DUPE);
    details.C2 = {
      place_id: L.place_id,
      method: L.method,
      action: 'สถานที่มีอยู่แล้ว — reuse place_id เดิม'
    };
    recommendations.push({ conflict: CONFLICT.C2_PLACE_DUPE, action: ACTION.AUTO_MAP });
  }

  // ──────────────────────────────────────────────────────────
  // ปัญหา #3: LatLong ซ้ำกัน (พิกัดเดียวกันแต่ record ใหม่)
  // ──────────────────────────────────────────────────────────
  if (G.geo_id && !G.is_new) {
    conflicts.push(CONFLICT.C3_GEO_DUPE);
    details.C3 = {
      geo_id:  G.geo_id,
      method:  G.method,
      dist_m:  G.dist_m || 0,
      action:  `พิกัดซ้ำ (method=${G.method}) — reuse geo_id เดิม`
    };
    recommendations.push({ conflict: CONFLICT.C3_GEO_DUPE, action: ACTION.AUTO_MAP });
  }

  // ──────────────────────────────────────────────────────────
  // ปัญหา #4: คนเดียวกันแต่ชื่อเขียนไม่เหมือน
  //   Fuzzy match สำเร็จ → แสดงว่าเป็นคนเดิมแต่สะกดต่าง
  // ──────────────────────────────────────────────────────────
  if (P.person_id && !P.is_new &&
      (P.method === 'FUZZY_AUTO' || P.method === 'ALIAS_EXACT') &&
      P.score < 100) {
    conflicts.push(CONFLICT.C4_SAME_PERSON_DIFF_NAME);
    details.C4 = {
      person_id:   P.person_id,
      raw_input:   normObj.dest_name_raw,
      match_score: P.score,
      method:      P.method,
      action:      `Fuzzy match ${P.score}% — เพิ่ม Alias อัตโนมัติ`
    };
    recommendations.push({
      conflict: CONFLICT.C4_SAME_PERSON_DIFF_NAME,
      action:   P.score >= parseFloat(getConfig('AUTO_MATCH_SCORE') || '90')
        ? ACTION.ADD_ALIAS : ACTION.MANUAL,
      note: `"${normObj.dest_name_raw}" → person_id ${P.person_id} (${P.score}%)`
    });
  }

  // ──────────────────────────────────────────────────────────
  // ปัญหา #5: คนละชื่อ แต่สถานที่เดียวกัน
  //   Place match สำเร็จ แต่ Person เป็นใหม่
  // ──────────────────────────────────────────────────────────
  if (L.place_id && !L.is_new && P.is_new) {
    conflicts.push(CONFLICT.C5_DIFF_PERSON_SAME_PLACE);
    details.C5 = {
      new_person_name: normObj.dest_name_raw,
      existing_place:  L.place_id,
      action: 'สถานที่เดิม — เพิ่ม Person ใหม่เชื่อมกับ Place เดิม'
    };
    recommendations.push({
      conflict: CONFLICT.C5_DIFF_PERSON_SAME_PLACE,
      action:   ACTION.CONFIRM_MULTI,
      note:     `Place ${L.place_id} มี Person ใหม่: "${normObj.dest_name_raw}"`
    });
  }

  // ──────────────────────────────────────────────────────────
  // ปัญหา #6: ชื่อเดียวกัน แต่สถานที่อยู่ไม่เหมือนกัน
  //   Person match แต่ Place ใหม่ → คนเดิมมีหลายที่ส่ง
  // ──────────────────────────────────────────────────────────
  if (P.person_id && !P.is_new && L.is_new && normObj.place_name_norm) {
    conflicts.push(CONFLICT.C6_SAME_PERSON_DIFF_PLACE);
    details.C6 = {
      person_id:      P.person_id,
      new_place_name: normObj.place_name_norm,
      existing_place: L.place_id,
      action:         'คนเดิม แต่สถานที่ใหม่ — สร้าง Destination ใหม่ให้คนนี้'
    };
    recommendations.push({
      conflict: CONFLICT.C6_SAME_PERSON_DIFF_PLACE,
      action:   ACTION.CONFIRM_MULTI,
      note:     `Person ${P.person_id} → Place ใหม่ "${normObj.place_name_norm}"`
    });
  }

  // ──────────────────────────────────────────────────────────
  // ปัญหา #7: ชื่อเดียวกัน แต่พิกัดคนละที่
  //   Person match แต่ Geo ใหม่ที่ไกลเกินรัศมี
  // ──────────────────────────────────────────────────────────
  if (P.person_id && !P.is_new && G.is_new && normObj.lat && normObj.long) {
    conflicts.push(CONFLICT.C7_SAME_PERSON_DIFF_GEO);

    // หา Geo ที่คนนี้เคยใช้ก่อนหน้า (จาก FACT_DELIVERY)
    const prevGeos = _getPersonPrevGeos(P.person_id);
    const minDist  = prevGeos.length > 0
      ? Math.min(...prevGeos.map(g => calcDistanceMeters(normObj.lat, normObj.long, g.lat, g.long)))
      : null;

    details.C7 = {
      person_id:    P.person_id,
      new_lat:      normObj.lat,
      new_long:     normObj.long,
      prev_geo_count: prevGeos.length,
      min_dist_m:   minDist !== null ? minDist.toFixed(0) + 'm' : 'N/A',
      action:       minDist !== null && minDist < 500
        ? 'พิกัดต่างเล็กน้อย — อาจเป็น GPS drift'
        : 'พิกัดต่างมาก — อาจเป็นที่ส่งใหม่จริง'
    };
    recommendations.push({
      conflict: CONFLICT.C7_SAME_PERSON_DIFF_GEO,
      action:   minDist !== null && minDist < 500
        ? ACTION.AUTO_MAP   // GPS drift — ใช้จุดเดิม
        : ACTION.CONFIRM_MULTI,  // ที่ใหม่จริง
      note: details.C7.action
    });
  }

  // ──────────────────────────────────────────────────────────
  // ปัญหา #8: คนละชื่อ แต่พิกัดเดียวกัน
  //   Geo match แต่ Person ใหม่ → หลายคนที่จุดเดิม
  // ──────────────────────────────────────────────────────────
  if (G.geo_id && !G.is_new && P.is_new) {
    conflicts.push(CONFLICT.C8_DIFF_PERSON_SAME_GEO);

    // หาว่า Geo นี้มีใครอยู่แล้วบ้าง
    const prevPersons = _getGeoPrevPersons(G.geo_id);

    details.C8 = {
      geo_id:          G.geo_id,
      new_person_name: normObj.dest_name_raw,
      existing_persons: prevPersons.map(p => p.name),
      count:           prevPersons.length,
      action:          prevPersons.length > 0
        ? `พิกัดนี้เคยส่งให้: ${prevPersons.map(p => p.name).join(', ')}`
        : 'พิกัดเดียวกัน — Person ใหม่คนแรก'
    };
    recommendations.push({
      conflict: CONFLICT.C8_DIFF_PERSON_SAME_GEO,
      action:   ACTION.CONFIRM_MULTI,
      note:     `Geo ${G.geo_id} → Person ใหม่ "${normObj.dest_name_raw}" (เดิมมี ${prevPersons.length} คน)`
    });
  }

  return { conflicts, details, recommendations };
}

// ─── Composite Score ─────────────────────────────────────────────

/**
 * calculateCompositeScore — คะแนนรวม 0-100
 * ใช้ Weight Matrix ที่กำหนดไว้
 *
 * @param {{personResult, placeResult, geoResult, normObj}}
 * @returns {number}
 */
function calculateCompositeScore({ personResult, placeResult, geoResult, normObj }) {

  let score = 0;

  // ── Person Score ────────────────────────────────────────────
  if (personResult.person_id) {
    const weight = {
      'CANONICAL_EXACT': SCORE_WEIGHTS.PERSON_EXACT,
      'ALIAS_EXACT':     SCORE_WEIGHTS.PERSON_ALIAS,
      'FUZZY_AUTO':      SCORE_WEIGHTS.PERSON_FUZZY * (personResult.score / 100),
      'NEW':             0
    }[personResult.method] ?? (SCORE_WEIGHTS.PERSON_EXACT * personResult.score / 100);
    score += weight;
  }

  // ── Place Score ─────────────────────────────────────────────
  if (placeResult.place_id) {
    const weight = {
      'CANONICAL_EXACT': SCORE_WEIGHTS.PLACE_EXACT,
      'ALIAS_EXACT':     SCORE_WEIGHTS.PLACE_ALIAS,
      'FUZZY_AUTO':      SCORE_WEIGHTS.PLACE_FUZZY * (placeResult.score / 100),
      'NEW':             0
    }[placeResult.method] ?? (SCORE_WEIGHTS.PLACE_EXACT * placeResult.score / 100);
    score += weight;
  }

  // ── Geo Score ───────────────────────────────────────────────
  if (geoResult.geo_id) {
    const weight = {
      'EXACT':        SCORE_WEIGHTS.GEO_EXACT,
      'NEAR_KEY5':    SCORE_WEIGHTS.GEO_NEAR5,
      'RADIUS_MATCH': SCORE_WEIGHTS.GEO_RADIUS,
      'NEW':          0
    }[geoResult.method] ?? 0;
    score += weight;
  }

  // ── Bonus: Address match ────────────────────────────────────
  if (normObj.address_norm && normObj.address_latlong_norm &&
      normObj.address_norm.length > 5 &&
      _stringSimilarity(normObj.address_norm, normObj.address_latlong_norm) > 0.7) {
    score += SCORE_WEIGHTS.ADDRESS_MATCH;
  }

  return Math.min(100, Math.round(score));
}

// ─── Decision Logic ──────────────────────────────────────────────

/**
 * decideAutoMatchOrReview — ตัดสิน Decision สุดท้าย
 *
 * Decision Matrix:
 *   score ≥ AUTO_MATCH_SCORE → AUTO_MATCH (ระบบทำเองได้)
 *   score ≥ REVIEW_SCORE_MIN → REVIEW (ให้คนช่วยตัดสิน)
 *   allNew = true            → NEW (สร้างทุก Entity ใหม่)
 *   มี Conflict ที่ต้องใส่ใจ → REVIEW
 *
 * @param {number} compositeScore
 * @param {Object} context
 * @returns {string}
 */
function decideAutoMatchOrReview(compositeScore, context) {
  const thresholds = getThresholds();
  const { personResult, placeResult, geoResult, conflictReport } = context;

  // ── กรณีพิเศษ: Error ─────────────────────────────────────
  const hasError = [personResult, placeResult, geoResult]
    .some(r => r.method === 'ERROR');
  if (hasError) return 'REVIEW';

  // ── กรณีใหม่ทุก Entity ────────────────────────────────────
  const allNew = personResult.is_new && placeResult.is_new && geoResult.is_new;
  if (allNew) return 'NEW';

  // ── Conflict ที่บังคับ Review ──────────────────────────────
  // C7 ที่พิกัดต่างมาก และ C8 ต้องให้คนยืนยัน
  const forceReviewConflicts = [CONFLICT.C7_SAME_PERSON_DIFF_GEO, CONFLICT.C8_DIFF_PERSON_SAME_GEO];
  const forceReview = conflictReport?.conflicts?.some(c => {
    if (!forceReviewConflicts.includes(c)) return false;
    // C7: force review เฉพาะถ้าระยะต่างมาก (> 500m)
    if (c === CONFLICT.C7_SAME_PERSON_DIFF_GEO) {
      const minDist = parseFloat(conflictReport.details?.C7?.min_dist_m) || 9999;
      return minDist > 500;
    }
    return true;
  });
  if (forceReview) return 'REVIEW';

  // ── Fuzzy Review method ────────────────────────────────────
  const needsReview = [personResult, placeResult, geoResult]
    .some(r => r.method === 'FUZZY_REVIEW');
  if (needsReview) return 'REVIEW';

  // ── Score-based ────────────────────────────────────────────
  if (compositeScore >= thresholds.autoMatch) return 'AUTO_MATCH';
  if (compositeScore >= thresholds.reviewMin)  return 'REVIEW';

  return 'NEW';
}

/**
 * buildReviewPayload — สร้าง payload สมบูรณ์สำหรับ Q_REVIEW
 * @param {Object} resolvedObj
 * @returns {Object}
 */
function buildReviewPayload(resolvedObj) {
  const { personResult, placeResult, geoResult, destResult,
    compositeScore, conflictReport, normObj } = resolvedObj;

  const topConflict = conflictReport?.conflicts?.[0] || 'UNCERTAIN_MATCH';
  const topRec = conflictReport?.recommendations?.[0];

  return {
    issue_type:              topConflict,
    source_record_id:        normObj.source_id,
    source_row_number:       normObj._rowNumber,
    invoice_no:              normObj.invoice_no,
    raw_person_name:         normObj.dest_name_raw,
    raw_place_name:          normObj.address_raw || normObj.address_latlong,
    raw_lat:                 normObj.lat,
    raw_long:                normObj.long,
    candidate_person_ids:    _formatCandidates(personResult.candidates, 'person_id'),
    candidate_place_ids:     _formatCandidates(placeResult.candidates,  'place_id'),
    candidate_geo_ids:       _formatCandidates(geoResult.candidates,    'geo_id'),
    candidate_destination_ids: destResult.destination_id || '',
    score:                   compositeScore,
    recommended_action:      topRec ? `${topRec.action}: ${topRec.note || ''}` : 'MANUAL_REVIEW',
    status:                  'PENDING'
  };
}

// ─── Context Lookup Helpers ──────────────────────────────────────

/**
 * _getPersonPrevGeos — หา Geo ที่ Person นี้เคยใช้ (จาก FACT_DELIVERY)
 * ใช้ใน conflict #7 detection
 * @param {string} personId
 * @returns {Array<{geo_id, lat, long}>}
 */
function _getPersonPrevGeos(personId) {
  try {
    const cache = CacheService.getScriptCache();
    const cKey = `PERSON_GEOS_${personId}`;
    const cached = cache.get(cKey);
    if (cached) return JSON.parse(cached);

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sh = ss.getSheetByName(SHEET_NAMES.FACT_DELIVERY);
    if (!sh || sh.getLastRow() < 2) return [];

    const data = sh.getDataRange().getValues();
    const hdr = data[0];
    const pidIdx = hdr.indexOf('person_id');
    const gidIdx = hdr.indexOf('geo_id');
    const latIdx = hdr.indexOf('raw_lat');
    const lngIdx = hdr.indexOf('raw_long');

    const result = [];
    const seen   = new Set();
    for (let i = 1; i < data.length; i++) {
      if (data[i][pidIdx] !== personId) continue;
      const geoId = data[i][gidIdx];
      if (geoId && !seen.has(geoId)) {
        seen.add(geoId);
        result.push({
          geo_id: geoId,
          lat:    parseFloat(data[i][latIdx]) || 0,
          long:   parseFloat(data[i][lngIdx]) || 0
        });
      }
    }
    cache.put(cKey, JSON.stringify(result), 600); // cache 10 นาที
    return result;
  } catch (e) {
    return [];
  }
}

/**
 * _getGeoPrevPersons — หา Person ที่เคยใช้ Geo นี้ (จาก FACT_DELIVERY)
 * ใช้ใน conflict #8 detection
 * @param {string} geoId
 * @returns {Array<{person_id, name}>}
 */
function _getGeoPrevPersons(geoId) {
  try {
    const cache = CacheService.getScriptCache();
    const cKey = `GEO_PERSONS_${geoId}`;
    const cached = cache.get(cKey);
    if (cached) return JSON.parse(cached);

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sh = ss.getSheetByName(SHEET_NAMES.FACT_DELIVERY);
    if (!sh || sh.getLastRow() < 2) return [];

    const data = sh.getDataRange().getValues();
    const hdr = data[0];
    const gidIdx = hdr.indexOf('geo_id');
    const pidIdx = hdr.indexOf('person_id');
    const nameIdx = hdr.indexOf('raw_person_name');

    const result = [];
    const seen = new Set();
    for (let i = 1; i < data.length; i++) {
      if (data[i][gidIdx] !== geoId) continue;
      const pid = data[i][pidIdx];
      if (pid && !seen.has(pid)) {
        seen.add(pid);
        result.push({ person_id: pid, name: data[i][nameIdx] || '' });
      }
    }
    cache.put(cKey, JSON.stringify(result), 600);
    return result;
  } catch (e) {
    return [];
  }
}

// ─── String Similarity ───────────────────────────────────────────

/**
 * _stringSimilarity — Jaccard similarity ระหว่าง 2 strings (0–1)
 */
function _stringSimilarity(a, b) {
  if (!a || !b) return 0;
  const setA = new Set(a.split(''));
  const setB = new Set(b.split(''));
  const intersection = [...setA].filter(x => setB.has(x)).length;
  const union = new Set([...setA, ...setB]).size;
  return union === 0 ? 0 : intersection / union;
}

/**
 * _formatCandidates — แปลง candidates array เป็น string สำหรับ Q_REVIEW
 */
function _formatCandidates(candidates, idField) {
  if (!candidates || candidates.length === 0) return '';
  return candidates.map(c => `${c[idField] || ''}(${c.score || c.dist_m || '?'})`).join(',');
}
// ============================================================
// FILE: 11_TransactionService.gs
// VERSION: 001
// MODULE: TransactionService — บันทึก FACT_DELIVERY
// ============================================================

/**
 * saveProcessingResult — บันทึกผลการประมวลผลลง FACT_DELIVERY
 * และ enqueue review ถ้าจำเป็น
 * @param {Object} normObj
 * @param {Object} resolvedObj (จาก matchAllEntities)
 * @returns {string} tx_id
 */
function saveProcessingResult(normObj, resolvedObj) {
  // ป้องกัน duplicate
  const dupeCheck = preventDuplicateTransaction(normObj.source_id, normObj.invoice_no);
  if (dupeCheck) {
    writeLog('WARN', '11_TransactionService', 'saveProcessingResult', null,
      `Duplicate transaction: source_id=${normObj.source_id}`, null);
    return dupeCheck; // คืน tx_id เดิม
  }

  const factObj = buildFactRow(normObj, resolvedObj);
  const txId = upsertFactDelivery(factObj);

  // ถ้าต้อง Review — ส่งเข้า Queue
  if (resolvedObj.decision === 'REVIEW') {
    const reviewPayload = buildReviewPayload(resolvedObj);
    reviewPayload.tx_id = txId;
    enqueueReview(reviewPayload);
  }

  // อัปเดต stats ของ Master records
  if (resolvedObj.personResult.person_id)
    updatePersonStats(resolvedObj.personResult.person_id);
  if (resolvedObj.placeResult.place_id)
    updatePlaceStats(resolvedObj.placeResult.place_id);

  return txId;
}

/**
 * buildFactRow — สร้าง object สำหรับ FACT_DELIVERY row
 * @param {Object} normObj
 * @param {Object} resolvedObj
 * @returns {Object}
 */
function buildFactRow(normObj, resolvedObj) {
  const { personResult, placeResult, geoResult, destResult, decision } = resolvedObj;
  const now = new Date();

  return {
    tx_id:             'TX-' + uuid().replace(/-/g, '').substr(0, 12).toUpperCase(),
    source_sheet:      SHEET_NAMES.SOURCE,
    source_row_number: normObj._rowNumber,
    source_record_id:  normObj.source_id,
    delivery_date:     normObj.delivery_date,
    delivery_time:     normObj.delivery_time,
    shipment_no:       normObj.shipment_no,
    invoice_no:        normObj.invoice_no,
    owner_name:        normObj.owner_name,
    customer_code:     normObj.customer_code,
    raw_person_name:   normObj.dest_name_raw,
    raw_place_name:    normObj.address_raw,
    raw_address:       normObj.address_latlong || normObj.address_raw,
    raw_lat:           normObj.lat,
    raw_long:          normObj.long,
    person_id:         personResult.person_id || '',
    place_id:          placeResult.place_id   || '',
    geo_id:            geoResult.geo_id       || '',
    destination_id:    destResult.destination_id || '',
    warehouse:         normObj.warehouse,
    distance_km:       normObj.distance_km,
    driver_name:       normObj.driver_name,
    employee_id:       normObj.employee_id,
    employee_email:    normObj.employee_email,
    license_plate:     normObj.license_plate,
    validation_result: normObj.validation_result,
    anomaly_reason:    normObj.anomaly_reason,
    review_status:     decision === 'REVIEW' ? 'PENDING' : 'APPROVED',
    sync_status:       decision,
    created_at:        now,
    updated_at:        now
  };
}

/**
 * upsertFactDelivery — เพิ่มหรืออัปเดต FACT_DELIVERY
 * @param {Object} factObj
 * @returns {string} tx_id
 */
function upsertFactDelivery(factObj) {
  return withLock(() => {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sh = ss.getSheetByName(SHEET_NAMES.FACT_DELIVERY);
    const headers = SHEET_HEADERS.FACT_DELIVERY;

    const row = headers.map(h => factObj[h] !== undefined ? factObj[h] : '');
    sh.appendRow(row);

    return factObj.tx_id;
  });
}

/**
 * preventDuplicateTransaction — ตรวจซ้ำจาก source_record_id
 * @param {string} sourceRecordId
 * @param {string} invoiceNo
 * @returns {string|null} tx_id ถ้าซ้ำ, null ถ้าไม่ซ้ำ
 */
function preventDuplicateTransaction(sourceRecordId, invoiceNo) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sh = ss.getSheetByName(SHEET_NAMES.FACT_DELIVERY);
    if (!sh || sh.getLastRow() < 2) return null;

    const data = sh.getDataRange().getValues();
    const hdr = data[0];
    const txIdx  = hdr.indexOf('tx_id');
    const srcIdx = hdr.indexOf('source_record_id');

    for (let i = 1; i < data.length; i++) {
      if (data[i][srcIdx] === sourceRecordId) return data[i][txIdx];
    }
    return null;
  } catch (e) {
    return null;
  }
}

/**
 * linkFactToMasters — เพิ่ม link ย้อนกลับ (สำหรับ future use)
 * @param {string} txId
 * @param {Object} resolvedObj
 */
function linkFactToMasters(txId, resolvedObj) {
  // Reserved for future BigQuery / Firestore integration
  writeLog('DEBUG', '11_TransactionService', 'linkFactToMasters', txId,
    'link recorded', JSON.stringify({
      person_id: resolvedObj.personResult.person_id,
      place_id:  resolvedObj.placeResult.place_id,
      geo_id:    resolvedObj.geoResult.geo_id
    }));
}


// ============================================================
// FILE: 12_ReviewService.gs
// VERSION: 001
// MODULE: ReviewService — จัดการ Q_REVIEW และการเรียนรู้
// ============================================================

/**
 * enqueueReview — เพิ่มรายการเข้า Q_REVIEW
 * @param {Object} reviewPayload (จาก buildReviewPayload)
 * @returns {string} review_id
 */
function enqueueReview(reviewPayload) {
  return withLock(() => {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sh = ss.getSheetByName(SHEET_NAMES.Q_REVIEW);
    const reviewId = 'RVW-' + uuid().replace(/-/g, '').substr(0, 10).toUpperCase();
    const headers = SHEET_HEADERS.Q_REVIEW;

    const fullPayload = { review_id: reviewId, ...reviewPayload };
    const row = headers.map(h => fullPayload[h] !== undefined ? fullPayload[h] : '');
    sh.appendRow(row);

    writeLog('INFO', '12_ReviewService', 'enqueueReview', reviewId,
      `Queued review: ${reviewPayload.issue_type} | ${reviewPayload.raw_person_name}`, null);
    return reviewId;
  });
}

/**
 * getPendingReviews — ดึงรายการที่รอการตรวจสอบ
 * @returns {Object[]}
 */
function getPendingReviews() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = ss.getSheetByName(SHEET_NAMES.Q_REVIEW);
  if (!sh || sh.getLastRow() < 2) return [];

  const data = sh.getDataRange().getValues();
  const headers = data[0];
  const statusIdx = headers.indexOf('status');
  const result = [];

  for (let i = 1; i < data.length; i++) {
    if (data[i][statusIdx] === 'PENDING') {
      const obj = {};
      headers.forEach((h, j) => { obj[h] = data[i][j]; });
      obj._rowNumber = i + 1;
      result.push(obj);
    }
  }
  return result;
}

/**
 * applyReviewDecision — บันทึกคำตัดสินของ Admin
 * @param {string} reviewId
 * @param {string} decision — 'MERGE_PERSON' | 'MERGE_PLACE' | 'KEEP_SEPARATE' | 'CREATE_NEW'
 * @param {Object} details — { target_person_id, target_place_id, reviewer }
 */
function applyReviewDecision(reviewId, decision, details) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sh = ss.getSheetByName(SHEET_NAMES.Q_REVIEW);
    if (!sh || sh.getLastRow() < 2) return;

    const data = sh.getDataRange().getValues();
    const headers = data[0];
    const idIdx   = headers.indexOf('review_id');
    const statusIdx = headers.indexOf('status');
    const decisionIdx = headers.indexOf('decision');
    const reviewerIdx = headers.indexOf('reviewer');
    const reviewedAtIdx = headers.indexOf('reviewed_at');

    for (let i = 1; i < data.length; i++) {
      if (data[i][idIdx] !== reviewId) continue;

      // อัปเดต decision
      sh.getRange(i + 1, statusIdx + 1).setValue('RESOLVED');
      sh.getRange(i + 1, decisionIdx + 1).setValue(decision);
      sh.getRange(i + 1, reviewerIdx + 1).setValue(details.reviewer || 'ADMIN');
      sh.getRange(i + 1, reviewedAtIdx + 1).setValue(new Date());

      // Execute decision
      if (decision === 'MERGE_PERSON' && details.source_person_id && details.target_person_id) {
        mergeMasterRecords('PERSON', details.source_person_id, details.target_person_id);
        learnAliasFromReview(reviewId, data[i], headers);
      } else if (decision === 'MERGE_PLACE' && details.source_place_id && details.target_place_id) {
        mergeMasterRecords('PLACE', details.source_place_id, details.target_place_id);
      }

      writeLog('INFO', '12_ReviewService', 'applyReviewDecision', reviewId,
        `Decision: ${decision}`, JSON.stringify(details));
      return;
    }
    writeLog('WARN', '12_ReviewService', 'applyReviewDecision', reviewId,
      'review_id ไม่พบ', null);

  } catch (e) {
    writeLog('ERROR', '12_ReviewService', 'applyReviewDecision', reviewId, e.message, null);
  }
}

/**
 * mergeMasterRecords — Merge master records (RULE 4: ใช้ Archived ไม่ใช่ delete)
 * @param {'PERSON'|'PLACE'} masterType
 * @param {string} sourceId — ID ที่จะถูก merge (จะถูก Archive)
 * @param {string} targetId — ID ปลายทาง (master ที่ถูกต้อง)
 */
function mergeMasterRecords(masterType, sourceId, targetId) {
  try {
    const sheetName = masterType === 'PERSON' ? SHEET_NAMES.M_PERSON : SHEET_NAMES.M_PLACE;
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sh = ss.getSheetByName(sheetName);
    if (!sh) return;

    const data = sh.getDataRange().getValues();
    const statusCol = masterType === 'PERSON' ? 7 : 10; // 1-based

    // Archive source record (RULE 4: ห้าม delete)
    for (let i = 1; i < data.length; i++) {
      if (data[i][0] === sourceId) {
        sh.getRange(i + 1, statusCol).setValue('MERGED_TO:' + targetId);
        sh.getRange(i + 1, statusCol + 1).setValue('Merged to ' + targetId + ' by Review');
        break;
      }
    }

    // อัปเดต FACT_DELIVERY ให้ใช้ targetId แทน
    _redirectFactsToTarget(masterType, sourceId, targetId);

    writeLog('INFO', '12_ReviewService', 'mergeMasterRecords', null,
      `Merged ${masterType}: ${sourceId} → ${targetId}`, null);

    // Clear caches
    if (masterType === 'PERSON') _clearPersonCache();
    else _clearPlaceCache();

  } catch (e) {
    writeLog('ERROR', '12_ReviewService', 'mergeMasterRecords', null, e.message, null);
  }
}

/**
 * learnAliasFromReview — เพิ่ม alias ที่เรียนรู้จาก review decision
 * @param {string} reviewId
 * @param {Array} reviewRow
 * @param {Array} headers
 */
function learnAliasFromReview(reviewId, reviewRow, headers) {
  try {
    const rawNameIdx = headers.indexOf('raw_person_name');
    const rawName = reviewRow[rawNameIdx];
    if (!rawName) return;

    // ดึง target person_id จาก note หรือ decision field
    const decisionIdx = headers.indexOf('decision');
    const decision = reviewRow[decisionIdx] || '';
    const targetMatch = decision.match(/MERGE_PERSON:([A-Z0-9\-]+)/);
    if (!targetMatch) return;

    const targetPersonId = targetMatch[1];
    const normalizedAlias = normalizePersonName(rawName);
    createPersonAlias(targetPersonId, rawName, normalizedAlias);

    writeLog('INFO', '12_ReviewService', 'learnAliasFromReview', reviewId,
      `เพิ่ม Alias "${normalizedAlias}" → ${targetPersonId}`, null);
  } catch (e) {
    writeLog('WARN', '12_ReviewService', 'learnAliasFromReview', reviewId, e.message, null);
  }
}

/**
 * closeReviewItem — ปิด review item ที่เสร็จแล้ว
 * @param {string} reviewId
 */
function closeReviewItem(reviewId) {
  applyReviewDecision(reviewId, 'CLOSED', { reviewer: 'SYSTEM' });
}

// ─────────────────────────────────────────────
// PRIVATE HELPERS
// ─────────────────────────────────────────────

/**
 * _redirectFactsToTarget — อัปเดต FACT_DELIVERY ให้ใช้ ID ใหม่หลัง merge
 */
function _redirectFactsToTarget(masterType, sourceId, targetId) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = ss.getSheetByName(SHEET_NAMES.FACT_DELIVERY);
  if (!sh || sh.getLastRow() < 2) return;

  const data = sh.getDataRange().getValues();
  const headers = data[0];
  const colName = masterType === 'PERSON' ? 'person_id' : 'place_id';
  const colIdx  = headers.indexOf(colName);
  if (colIdx < 0) return;

  const updates = [];
  for (let i = 1; i < data.length; i++) {
    if (data[i][colIdx] === sourceId) {
      updates.push({ row: i + 1, col: colIdx + 1, val: targetId });
    }
  }

  // RULE 6: Batch update
  for (const u of updates) {
    sh.getRange(u.row, u.col).setValue(u.val);
  }
}
// ============================================================
// FILE: 13_ReportService.gs
// VERSION: 001
// MODULE: ReportService — รายงานคุณภาพข้อมูล
// ============================================================

/**
 * refreshQualityReport — รีเฟรช RPT_DATA_QUALITY
 * สรุปข้อมูลล่าสุดจาก FACT_DELIVERY และ Master tables
 */
function refreshQualityReport() {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const today = new Date();
    const todayStr = Utilities.formatDate(today, Session.getScriptTimeZone(), 'yyyy-MM-dd');

    // นับข้อมูลจาก FACT_DELIVERY วันนี้
    const factData = _getFactDataToday(todayStr);

    // นับ Master ใหม่วันนี้
    const newPersonCount = _countNewMastersToday(SHEET_NAMES.M_PERSON, 'first_seen_date', todayStr);
    const newPlaceCount  = _countNewMastersToday(SHEET_NAMES.M_PLACE,  'first_seen_date', todayStr);
    const newGeoCount    = _countNewMastersToday(SHEET_NAMES.M_GEO_POINT, 'first_seen_date', todayStr);
    const newDestCount   = _countNewMastersToday(SHEET_NAMES.M_DESTINATION, 'first_seen_date', todayStr);

    // นับ Reviews และ Errors
    const reviewCount  = _countReviewsToday(todayStr);
    const errorCount   = _countErrors();

    const snapshot = {
      report_date:            today,
      total_source_rows:      factData.total,
      processed_rows:         factData.processed,
      new_person_count:       newPersonCount,
      new_place_count:        newPlaceCount,
      new_geo_count:          newGeoCount,
      new_destination_count:  newDestCount,
      auto_match_count:       factData.autoMatch,
      review_count:           reviewCount,
      duplicate_alert_count:  factData.duplicates,
      error_count:            errorCount,
      last_refresh_at:        today
    };

    writeReportSnapshot(snapshot);
    writeLog('INFO', '13_ReportService', 'refreshQualityReport', null,
      `Report refreshed: ${todayStr}`, JSON.stringify(snapshot));

    return snapshot;
  } catch (e) {
    writeLog('ERROR', '13_ReportService', 'refreshQualityReport', null, e.message, null);
    return null;
  }
}

/**
 * buildDuplicateReport — สร้างรายงาน Duplicates ที่ตรวจพบ
 * @returns {Object[]}
 */
function buildDuplicateReport() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = ss.getSheetByName(SHEET_NAMES.FACT_DELIVERY);
  if (!sh || sh.getLastRow() < 2) return [];

  const data = sh.getDataRange().getValues();
  const headers = data[0];
  const invoiceIdx = headers.indexOf('invoice_no');
  const txIdx = headers.indexOf('tx_id');

  const seen = {};
  const dupes = [];
  for (let i = 1; i < data.length; i++) {
    const inv = data[i][invoiceIdx];
    if (!inv) continue;
    if (seen[inv]) {
      dupes.push({ invoice_no: inv, tx_id_first: seen[inv], tx_id_dupe: data[i][txIdx], row: i + 1 });
    } else {
      seen[inv] = data[i][txIdx];
    }
  }
  return dupes;
}

/**
 * buildConflictReport — รายงาน Conflicts ประเภทต่างๆ
 * @returns {Object}
 */
function buildConflictReport() {
  const reviews = getPendingReviews();
  const byType = {};
  reviews.forEach(r => {
    byType[r.issue_type] = (byType[r.issue_type] || 0) + 1;
  });
  return { total: reviews.length, byType };
}

/**
 * buildDailySummary — สรุปประจำวัน
 * @returns {Object}
 */
function buildDailySummary() {
  const snapshot = refreshQualityReport();
  const conflicts = buildConflictReport();
  const dupes = buildDuplicateReport();

  return { snapshot, conflicts, duplicates: dupes.length, asOf: new Date() };
}

/**
 * writeReportSnapshot — บันทึก snapshot ลง RPT_DATA_QUALITY
 * @param {Object} snapshot
 */
function writeReportSnapshot(snapshot) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sh = ss.getSheetByName(SHEET_NAMES.RPT_QUALITY);
    if (!sh) return;

    const headers = SHEET_HEADERS.RPT_DATA_QUALITY;
    const row = headers.map(h => snapshot[h] !== undefined ? snapshot[h] : '');

    // อัปเดต row ของวันนี้ถ้ามีอยู่แล้ว
    if (sh.getLastRow() > 1) {
      const data = sh.getDataRange().getValues();
      const dateIdx = 0;
      const todayStr = Utilities.formatDate(
        snapshot.report_date || new Date(),
        Session.getScriptTimeZone(), 'yyyy-MM-dd'
      );
      for (let i = 1; i < data.length; i++) {
        const rowDate = data[i][dateIdx]
          ? Utilities.formatDate(new Date(data[i][dateIdx]), Session.getScriptTimeZone(), 'yyyy-MM-dd')
          : '';
        if (rowDate === todayStr) {
          sh.getRange(i + 1, 1, 1, headers.length).setValues([row]);
          return;
        }
      }
    }
    sh.appendRow(row);
  } catch (e) {
    writeLog('WARN', '13_ReportService', 'writeReportSnapshot', null, e.message, null);
  }
}

// ─────────────────────────────────────────────
// PRIVATE HELPERS
// ─────────────────────────────────────────────

function _getFactDataToday(todayStr) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = ss.getSheetByName(SHEET_NAMES.FACT_DELIVERY);
  if (!sh || sh.getLastRow() < 2) return { total: 0, processed: 0, autoMatch: 0, duplicates: 0 };

  const data = sh.getDataRange().getValues();
  const headers = data[0];
  const createdIdx = headers.indexOf('created_at');
  const syncIdx    = headers.indexOf('sync_status');

  let total = 0, processed = 0, autoMatch = 0, duplicates = 0;
  const tz = Session.getScriptTimeZone();

  for (let i = 1; i < data.length; i++) {
    const rowDate = data[i][createdIdx]
      ? Utilities.formatDate(new Date(data[i][createdIdx]), tz, 'yyyy-MM-dd') : '';
    if (rowDate !== todayStr) continue;
    total++;
    const status = data[i][syncIdx];
    if (status === 'AUTO_MATCH' || status === 'PROCESSED' || status === 'NEW') processed++;
    if (status === 'AUTO_MATCH') autoMatch++;
  }
  return { total, processed, autoMatch, duplicates };
}

function _countNewMastersToday(sheetName, dateCol, todayStr) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = ss.getSheetByName(sheetName);
  if (!sh || sh.getLastRow() < 2) return 0;
  const data = sh.getDataRange().getValues();
  const headers = data[0];
  const dateIdx = headers.indexOf(dateCol);
  if (dateIdx < 0) return 0;
  const tz = Session.getScriptTimeZone();
  let count = 0;
  for (let i = 1; i < data.length; i++) {
    const d = data[i][dateIdx];
    if (!d) continue;
    const s = Utilities.formatDate(new Date(d), tz, 'yyyy-MM-dd');
    if (s === todayStr) count++;
  }
  return count;
}

function _countReviewsToday(todayStr) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = ss.getSheetByName(SHEET_NAMES.Q_REVIEW);
  if (!sh || sh.getLastRow() < 2) return 0;
  const data = sh.getDataRange().getValues();
  const headers = data[0];
  const statusIdx = headers.indexOf('status');
  return data.slice(1).filter(r => r[statusIdx] === 'PENDING').length;
}

function _countErrors() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = ss.getSheetByName(SHEET_NAMES.FACT_DELIVERY);
  if (!sh || sh.getLastRow() < 2) return 0;
  const data = sh.getDataRange().getValues();
  const headers = data[0];
  const syncIdx = headers.indexOf('sync_status');
  return data.slice(1).filter(r => r[syncIdx] === 'ERROR').length;
}


// ============================================================
// FILE: 14_Utils.gs
// VERSION: 001
// MODULE: Utils — ฟังก์ชันช่วยเหลือทั่วไป
// ============================================================

/**
 * uuid — สร้าง UUID v4
 * @returns {string}
 */
function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = Math.random() * 16 | 0;
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
}

/**
 * safeTrim — trim string อย่างปลอดภัย
 * @param {*} value
 * @returns {string}
 */
function safeTrim(value) {
  if (value === null || value === undefined) return '';
  return String(value).trim();
}

/**
 * safeString — แปลงเป็น string อย่างปลอดภัย
 * @param {*} value
 * @returns {string}
 */
function safeString(value) {
  if (value === null || value === undefined) return '';
  const s = String(value).trim();
  return s === 'undefined' || s === 'null' ? '' : s;
}

/**
 * safeNumber — แปลงเป็น number อย่างปลอดภัย
 * @param {*} value
 * @returns {number}
 */
function safeNumber(value) {
  if (value === null || value === undefined || value === '') return 0;
  const n = parseFloat(String(value).replace(/,/g, ''));
  return isNaN(n) ? 0 : n;
}

/**
 * safeDate — แปลงเป็น Date อย่างปลอดภัย
 * @param {*} value
 * @returns {Date|string}
 */
function safeDate(value) {
  if (!value) return '';
  if (value instanceof Date) return value;
  const d = new Date(value);
  return isNaN(d.getTime()) ? String(value) : d;
}

/**
 * withLock — Execute callback ภายใน ScriptLock (RULE 6 + concurrency safe)
 * @param {Function} callback
 * @returns {*} ค่าที่ callback return
 */
function withLock(callback) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(30000); // รอ 30 วินาที
    return callback();
  } catch (e) {
    writeLog('ERROR', '14_Utils', 'withLock', null, 'Lock timeout: ' + e.message, null);
    throw e;
  } finally {
    lock.releaseLock();
  }
}

/**
 * writeLog — บันทึก Log ลง SYS_LOG
 * RULE 7: ใช้ใน try-catch ทุก service function
 * @param {string} level — INFO | WARN | ERROR | DEBUG
 * @param {string} moduleName
 * @param {string} functionName
 * @param {string|null} refId
 * @param {string} message
 * @param {string|null} payloadJson
 */
function writeLog(level, moduleName, functionName, refId, message, payloadJson) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sh = ss.getSheetByName('SYS_LOG');
    if (!sh) return; // ถ้ายังไม่มีชีต — skip

    // Console output เพิ่มด้วย
    const consoleMsg = `[${level}][${moduleName}.${functionName}] ${message}`;
    if (level === 'ERROR') console.error(consoleMsg);
    else if (level === 'WARN') console.warn(consoleMsg);
    else console.log(consoleMsg);

    // เขียนลงชีต (ไม่ใช้ withLock เพื่อหลีกเลี่ยง deadlock ใน catch)
    sh.appendRow([
      uuid().substr(0, 8).toUpperCase(),   // log_id
      refId || '',                          // run_id
      new Date(),                           // created_at
      level,
      moduleName,
      functionName,
      refId || '',
      message,
      payloadJson || ''
    ]);
  } catch (logErr) {
    console.error('writeLog failed:', logErr.message);
  }
}

/**
 * chunkArray — แบ่ง array เป็น chunks
 * @param {Array} arr
 * @param {number} size
 * @returns {Array[]}
 */
function chunkArray(arr, size) {
  const chunks = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}

/**
 * formatDateThai — แปลงวันที่เป็นรูปแบบไทย
 * @param {Date|string} date
 * @returns {string}
 */
function formatDateThai(date) {
  if (!date) return '';
  const d = date instanceof Date ? date : new Date(date);
  if (isNaN(d.getTime())) return String(date);
  return Utilities.formatDate(d, Session.getScriptTimeZone(), 'dd/MM/yyyy HH:mm:ss');
}

/**
 * isValidLatLong — ตรวจสอบว่า lat/long อยู่ในประเทศไทย
 * @param {number} lat
 * @param {number} long
 * @returns {boolean}
 */
function isValidLatLong(lat, long) {
  return lat >= 5.0 && lat <= 21.0 && long >= 97.0 && long <= 106.0;
}

/**
 * deepEqual — เปรียบเทียบ object แบบ deep
 * @param {*} a
 * @param {*} b
 * @returns {boolean}
 */
function deepEqual(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}
// ============================================================
// FILE: 15_CheckpointService.gs
// VERSION: 001
// MODULE: CheckpointService
//   — ระบบ Checkpoint + Time Guard สำหรับ Google Apps Script
//
// WHY THIS EXISTS:
//   Google Apps Script มี Hard Limit 6 นาที (360 วินาที)
//   ถ้าสคริปต์ทำงานเกิน 6 นาทีจะถูกบังคับหยุด
//   ผลคือ: ข้อมูลเขียนค้างกลางคัน, Sync Status ไม่อัปเดต,
//   รอบหน้าประมวลผลซ้ำ หรือข้ามข้อมูลที่ควรทำ
//
// SOLUTION:
//   - ตัดการทำงานก่อน 5 นาที (buffer 60 วินาที)
//   - บันทึก Checkpoint: row ล่าสุดที่ทำเสร็จ + สถิติ
//   - รันครั้งถัดไปอ่าน Checkpoint แล้วต่อจากตรงนั้น
//   - ถ้าไม่มี Checkpoint = เริ่มจาก row 2 ใหม่
// ============================================================

// ─── Constants ───────────────────────────────────────────────
const EXEC_LIMIT_SECONDS  = 300;   // 5 นาที = ตัดก่อน Hard Limit 60 วินาที
const CHECKPOINT_KEY      = 'MDM_CHECKPOINT';
const CHECKPOINT_CACHE_S  = 21600; // 6 ชั่วโมง

// ─── ExecutionTimer Class (Singleton Pattern) ─────────────────

/**
 * createTimer — สร้าง Timer object สำหรับ session นี้
 * เรียกครั้งเดียวต้น runDailyProcess
 * @returns {Object} timer
 */
function createTimer() {
  const startMs = Date.now();
  return {
    startMs,

    /** elapsed — เวลาที่ผ่านไป (วินาที) */
    elapsed() {
      return (Date.now() - startMs) / 1000;
    },

    /** remaining — เวลาที่เหลือ (วินาที) */
    remaining() {
      return EXEC_LIMIT_SECONDS - this.elapsed();
    },

    /** isNearLimit — true ถ้าเหลือเวลา < 30 วินาที */
    isNearLimit() {
      return this.remaining() < 30;
    },

    /** shouldStop — true ถ้าเกิน budget แล้ว */
    shouldStop() {
      return this.elapsed() >= EXEC_LIMIT_SECONDS;
    },

    /** summary — สรุป string */
    summary() {
      const e = this.elapsed().toFixed(1);
      const r = this.remaining().toFixed(1);
      return `ใช้ไป ${e}s / เหลือ ${r}s`;
    }
  };
}

// ─── Checkpoint Save / Load ───────────────────────────────────

/**
 * saveCheckpoint — บันทึก Checkpoint ลง PropertiesService
 * (PropertiesService ถาวรกว่า CacheService — ไม่หายหลังสคริปต์หยุด)
 *
 * @param {Object} cp — {
 *   lastProcessedRow: number,   // row number สุดท้ายที่เสร็จ (1-based)
 *   runId: string,              // run ID ของ session นี้
 *   totalDone: number,          // จำนวน row ที่ทำเสร็จ session นี้
 *   totalOk: number,
 *   totalReview: number,
 *   totalError: number,
 *   savedAt: string (ISO),      // เวลาที่บันทึก
 *   sourceLastRow: number       // จำนวน row ทั้งหมดในชีตต้นทาง
 * }
 */
function saveCheckpoint(cp) {
  try {
    const payload = JSON.stringify({ ...cp, savedAt: new Date().toISOString() });
    PropertiesService.getScriptProperties().setProperty(CHECKPOINT_KEY, payload);
    // Cache ด้วยสำหรับ read เร็ว
    CacheService.getScriptCache().put(CHECKPOINT_KEY, payload, CHECKPOINT_CACHE_S);

    writeLog('INFO', '15_CheckpointService', 'saveCheckpoint', cp.runId,
      `💾 Checkpoint saved: row ${cp.lastProcessedRow} | done=${cp.totalDone}`,
      null);
  } catch (e) {
    writeLog('ERROR', '15_CheckpointService', 'saveCheckpoint', null,
      'บันทึก Checkpoint ไม่สำเร็จ: ' + e.message, null);
  }
}

/**
 * loadCheckpoint — โหลด Checkpoint จาก PropertiesService
 * @returns {Object|null} checkpoint object หรือ null ถ้าไม่มี
 */
function loadCheckpoint() {
  try {
    // อ่านจาก Cache ก่อน (เร็วกว่า)
    const cached = CacheService.getScriptCache().get(CHECKPOINT_KEY);
    if (cached) return JSON.parse(cached);

    const stored = PropertiesService.getScriptProperties().getProperty(CHECKPOINT_KEY);
    if (!stored) return null;

    const cp = JSON.parse(stored);
    // Refresh cache
    CacheService.getScriptCache().put(CHECKPOINT_KEY, stored, CHECKPOINT_CACHE_S);
    return cp;
  } catch (e) {
    writeLog('WARN', '15_CheckpointService', 'loadCheckpoint', null,
      'อ่าน Checkpoint ไม่สำเร็จ: ' + e.message, null);
    return null;
  }
}

/**
 * clearCheckpoint — ล้าง Checkpoint เมื่อประมวลผลเสร็จสมบูรณ์
 */
function clearCheckpoint() {
  try {
    PropertiesService.getScriptProperties().deleteProperty(CHECKPOINT_KEY);
    CacheService.getScriptCache().remove(CHECKPOINT_KEY);
    writeLog('INFO', '15_CheckpointService', 'clearCheckpoint', null,
      '🗑 Checkpoint cleared — งานเสร็จสมบูรณ์', null);
  } catch (e) {
    writeLog('WARN', '15_CheckpointService', 'clearCheckpoint', null, e.message, null);
  }
}

/**
 * getCheckpointStatus — แสดงสถานะ Checkpoint ปัจจุบัน (ใช้ใน UI)
 * @returns {Object}
 */
function getCheckpointStatus() {
  const cp = loadCheckpoint();
  if (!cp) return { exists: false, message: 'ไม่มี Checkpoint — จะเริ่มใหม่จาก row แรก' };

  const savedAt = new Date(cp.savedAt);
  const ageMinutes = ((Date.now() - savedAt.getTime()) / 60000).toFixed(1);
  const progress = cp.sourceLastRow > 0
    ? ((cp.lastProcessedRow / cp.sourceLastRow) * 100).toFixed(1) : '?';

  return {
    exists: true,
    lastProcessedRow: cp.lastProcessedRow,
    sourceLastRow:    cp.sourceLastRow,
    progressPct:      progress,
    totalDone:        cp.totalDone,
    totalOk:          cp.totalOk,
    totalReview:      cp.totalReview,
    totalError:       cp.totalError,
    savedAt:          cp.savedAt,
    ageMinutes,
    message: `⏸ มี Checkpoint: row ${cp.lastProcessedRow}/${cp.sourceLastRow} (${progress}%) | บันทึกเมื่อ ${ageMinutes} นาทีที่แล้ว`
  };
}

/**
 * showCheckpointStatus — แสดง Checkpoint Status ผ่าน UI Alert
 * เรียกจากเมนู
 */
function showCheckpointStatus() {
  const status = getCheckpointStatus();
  const ui = SpreadsheetApp.getUi();

  if (!status.exists) {
    ui.alert('📋 Checkpoint Status', status.message, ui.ButtonSet.OK);
    return;
  }

  const msg = [
    `📌 Row ล่าสุดที่ทำ: ${status.lastProcessedRow} / ${status.sourceLastRow}`,
    `📊 Progress: ${status.progressPct}%`,
    `✔ สำเร็จ: ${status.totalOk} | 🔍 Review: ${status.totalReview} | ❌ Error: ${status.totalError}`,
    `⏱ บันทึกเมื่อ: ${status.ageMinutes} นาทีที่แล้ว`,
    '',
    'กด "Run Daily Process" เพื่อทำต่อจากจุดนี้'
  ].join('\n');

  ui.alert('⏸ Checkpoint พบข้อมูลค้าง', msg, ui.ButtonSet.OK);
}

/**
 * resetAndRestart — ล้าง Checkpoint แล้วเริ่มใหม่จาก row แรก
 * ใช้เมื่อต้องการ reprocess ทั้งหมด
 */
function resetAndRestart() {
  const ui = SpreadsheetApp.getUi();
  const resp = ui.alert(
    '⚠ Reset และเริ่มใหม่',
    'ระบบจะล้าง Checkpoint และเริ่ม process ใหม่จาก row แรกทั้งหมด\n\nดำเนินการต่อหรือไม่?',
    ui.ButtonSet.YES_NO
  );
  if (resp !== ui.Button.YES) return;

  clearCheckpoint();
  ui.alert('✅ ล้าง Checkpoint แล้ว', 'กด "Run Daily Process" เพื่อเริ่มใหม่', ui.ButtonSet.OK);
}

// ─── Time-Safe Batch Runner ───────────────────────────────────

/**
 * runWithTimeGuard — Wrapper สำหรับรัน batch loop อย่างปลอดภัย
 *
 * ทำงานดังนี้:
 *   1. โหลด Checkpoint (ถ้ามี) → ข้ามแถวที่เคยทำแล้ว
 *   2. วน loop ทีละแถว พร้อม check เวลาทุกแถว
 *   3. ถ้าใกล้ครบ 5 นาที → บันทึก Checkpoint แล้วหยุด
 *   4. ถ้าทำเสร็จทุกแถว → ล้าง Checkpoint
 *
 * @param {Object[]} allRows        — ข้อมูลทั้งหมดจากชีตต้นทาง
 * @param {Function} processRowFn   — function(row) → { ok, decision }
 * @param {string}   runId          — UUID ของ run นี้
 * @returns {Object} — สรุปผล
 */
function runWithTimeGuard(allRows, processRowFn, runId) {
  const timer = createTimer();

  // ─── โหลด Checkpoint ─────────────────────────────────────
  const checkpoint = loadCheckpoint();
  let startFromRow = 2; // row 2 = แถวข้อมูลแรก (row 1 = header)

  if (checkpoint) {
    startFromRow = checkpoint.lastProcessedRow + 1;
    writeLog('INFO', '15_CheckpointService', 'runWithTimeGuard', runId,
      `▶ ต่อจาก Checkpoint: row ${startFromRow} (เคยทำไป ${checkpoint.totalDone} แถว)`,
      null);
  } else {
    writeLog('INFO', '15_CheckpointService', 'runWithTimeGuard', runId,
      '▶ เริ่มใหม่จาก row 2 (ไม่มี Checkpoint)', null);
  }

  // ─── สถิติ session ปัจจุบัน ────────────────────────────────
  let sessionDone  = 0;
  let sessionOk    = 0;
  let sessionReview = 0;
  let sessionError = 0;
  let lastRowDone  = startFromRow - 1;
  let interrupted  = false;

  // ─── กรอง rows ที่ต้องทำ (≥ startFromRow) ─────────────────
  const pendingRows = allRows.filter(r => r._rowNumber >= startFromRow);

  writeLog('INFO', '15_CheckpointService', 'runWithTimeGuard', runId,
    `📋 แถวที่ต้องทำ: ${pendingRows.length} / ${allRows.length} ทั้งหมด | ${timer.summary()}`,
    null);

  // ─── Main Loop ─────────────────────────────────────────────
  for (const row of pendingRows) {

    // ── Time Guard Check ──────────────────────────────────────
    if (timer.shouldStop()) {
      interrupted = true;
      writeLog('WARN', '15_CheckpointService', 'runWithTimeGuard', runId,
        `⏱ Time Guard: หยุดก่อน Limit | ${timer.summary()} | row ${row._rowNumber}`,
        null);
      break;
    }

    // ── Process Row ───────────────────────────────────────────
    let rowResult = { ok: false, decision: 'ERROR' };
    try {
      rowResult = processRowFn(row);
      sessionDone++;

      if (rowResult.decision === 'REVIEW') sessionReview++;
      else if (rowResult.ok)              sessionOk++;
      else                                sessionError++;

    } catch (rowErr) {
      sessionError++;
      sessionDone++;
      writeLog('ERROR', '15_CheckpointService', 'runWithTimeGuard', runId,
        `❌ Row ${row._rowNumber}: ${rowErr.message}`, null);
    }

    lastRowDone = row._rowNumber;

    // ── Save Checkpoint ทุก 50 แถว ────────────────────────────
    if (sessionDone % 50 === 0) {
      saveCheckpoint({
        runId,
        lastProcessedRow: lastRowDone,
        sourceLastRow:    allRows[allRows.length - 1]?._rowNumber || 0,
        totalDone:  (checkpoint?.totalDone || 0) + sessionDone,
        totalOk:    (checkpoint?.totalOk   || 0) + sessionOk,
        totalReview:(checkpoint?.totalReview || 0) + sessionReview,
        totalError: (checkpoint?.totalError || 0) + sessionError
      });
      writeLog('INFO', '15_CheckpointService', 'runWithTimeGuard', runId,
        `🔖 Auto-checkpoint: row ${lastRowDone} | ${timer.summary()}`, null);
    }
  }

  // ─── บันทึก Checkpoint สุดท้าย หรือ Clear ──────────────────
  const finalCheckpoint = {
    runId,
    lastProcessedRow: lastRowDone,
    sourceLastRow:    allRows[allRows.length - 1]?._rowNumber || 0,
    totalDone:  (checkpoint?.totalDone || 0) + sessionDone,
    totalOk:    (checkpoint?.totalOk   || 0) + sessionOk,
    totalReview:(checkpoint?.totalReview || 0) + sessionReview,
    totalError: (checkpoint?.totalError || 0) + sessionError
  };

  if (interrupted) {
    // ยังทำไม่เสร็จ — บันทึก Checkpoint รอรอบหน้า
    saveCheckpoint(finalCheckpoint);
  } else {
    // เสร็จสมบูรณ์ — ล้าง Checkpoint
    clearCheckpoint();
  }

  return {
    interrupted,
    sessionDone,
    sessionOk,
    sessionReview,
    sessionError,
    lastRowDone,
    pendingCount:  pendingRows.length,
    elapsedSeconds: timer.elapsed(),
    ...finalCheckpoint
  };
}

/**
 * installTimeTrigger — ติดตั้ง Time-based Trigger ให้รันต่อเองอัตโนมัติ
 * เรียกเมื่อ Time Guard ตัด เพื่อให้ระบบรันต่อหลัง 1 นาที
 * @param {string} functionName — ชื่อ function ที่จะ trigger
 */
function installTimeTrigger(functionName) {
  try {
    // ลบ Trigger เก่าของ function นี้ออกก่อน (ป้องกัน duplicate)
    ScriptApp.getProjectTriggers()
      .filter(t => t.getHandlerFunction() === functionName)
      .forEach(t => ScriptApp.deleteTrigger(t));

    // สร้าง Trigger ใหม่: รัน after 1 นาที
    ScriptApp.newTrigger(functionName)
      .timeBased()
      .after(60 * 1000) // 1 นาที (milliseconds)
      .create();

    writeLog('INFO', '15_CheckpointService', 'installTimeTrigger', null,
      `⏰ Auto-trigger ติดตั้ง: ${functionName} จะรันอีกครั้งใน ~1 นาที`, null);
  } catch (e) {
    writeLog('ERROR', '15_CheckpointService', 'installTimeTrigger', null, e.message, null);
  }
}

/**
 * removeSelfTrigger — ลบ Trigger ของตัวเอง (เรียกต้น function ที่ถูก trigger)
 * ป้องกัน Trigger วิ่งซ้ำ
 * @param {string} functionName
 */
function removeSelfTrigger(functionName) {
  try {
    ScriptApp.getProjectTriggers()
      .filter(t => t.getHandlerFunction() === functionName)
      .forEach(t => ScriptApp.deleteTrigger(t));
  } catch (e) {
    // ignore
  }
}
// ============================================================
// FILE: 16_ThGeoService.gs
// VERSION: 001
// MODULE: ThGeoService — ระบบ Reference ข้อมูลภูมิศาสตร์ไทย
//
// ใช้ข้อมูลจากชีต SYS_TH_GEO (7,537 แถว, 16 คอลัมน์)
// เพื่อ:
//   1. ค้นหารหัสไปรษณีย์จากชื่อ ตำบล/อำเภอ/จังหวัด
//   2. Validate ที่อยู่ว่าอยู่ในไทยจริงหรือไม่
//   3. Extract ตำบล/อำเภอ/จังหวัด จากข้อความที่อยู่ (fuzzy)
//   4. เพิ่ม Geo Context ให้ MatchEngine ฉลาดขึ้น
//
// SYS_TH_GEO Column Index (0-based):
//   0: รหัสไปรษณีย์    1: ตำบล_แขวง(raw)  2: อำเภอ_เขต(raw)
//   3: จังหวัด          4: หมายเหตุ          5: ตำบล_clean
//   6: อำเภอ_clean      7: ตำบล_label        8: อำเภอ_label
//   9: tambon_norm     10: amphoe_norm      11: province_norm
//  12: search_key      13: postal_key       14: note_type
//  15: note_scope
// ============================================================

const TH_GEO_SHEET = 'SYS_TH_GEO';
const TH_GEO_CACHE_KEY = 'TH_GEO_INDEX';
const TH_GEO_CACHE_S   = 21600; // 6 ชั่วโมง

// ─── Column Index ─────────────────────────────────────────────
const TH_GEO_COL = {
  POSTAL:         0,
  TAMBON_RAW:     1,
  AMPHOE_RAW:     2,
  PROVINCE:       3,
  NOTE_RAW:       4,
  TAMBON_CLEAN:   5,
  AMPHOE_CLEAN:   6,
  TAMBON_LABEL:   7,  // 'แขวง' หรือ 'ตำบล'
  AMPHOE_LABEL:   8,  // 'เขต' หรือ 'อำเภอ'
  TAMBON_NORM:    9,
  AMPHOE_NORM:    10,
  PROVINCE_NORM:  11,
  SEARCH_KEY:     12,
  POSTAL_KEY:     13,
  NOTE_TYPE:      14,
  NOTE_SCOPE:     15
};

// Stop words ที่ตัดออกจากที่อยู่ก่อนค้นหา
const ADDRESS_STOP_WORDS = [
  'แขวง','ตำบล','เขต','อำเภอ','จังหวัด','จ.','อ.','ต.','ข.','ประเทศไทย',
  'thailand','road','soi','ซอย','ถนน','หมู่','บ้าน','เลขที่'
];

// ─────────────────────────────────────────────────────────────
// PUBLIC API
// ─────────────────────────────────────────────────────────────

/**
 * lookupPostalCode — ค้นหารหัสไปรษณีย์จาก ตำบล+อำเภอ+จังหวัด
 * @param {string} tambon
 * @param {string} amphoe
 * @param {string} province
 * @returns {Object|null} { postal_code, tambon_clean, amphoe_clean, note_type, note_scope, note_raw }
 */
function lookupPostalCode(tambon, amphoe, province) {
  try {
    const idx = _getTHGeoIndex();
    if (!idx) return null;

    const tn = _normTH(tambon);
    const an = _normTH(amphoe);
    const pn = _normTH(province);

    // ลำดับการค้นหา: exact (3 field) → tambon+amphoe → tambon+province
    const key3 = `${tn}|${an}|${pn}`;
    const key2a = `${tn}|${an}|`;
    const key2b = `${tn}||${pn}`;

    let match = idx.bySearchKey[key3]
      || _findPartialKey(idx.bySearchKey, key2a)
      || _findPartialKey(idx.bySearchKey, key2b);

    if (!match && tn) {
      // Fuzzy: ค้นจาก tambon_norm อย่างเดียว (ถ้ามีผลเดียว)
      const fuzzyMatches = Object.keys(idx.bySearchKey)
        .filter(k => k.startsWith(tn + '|'))
        .map(k => idx.bySearchKey[k]);
      if (fuzzyMatches.length === 1) match = fuzzyMatches[0];
    }

    return match || null;
  } catch (e) {
    writeLog('WARN', '16_ThGeoService', 'lookupPostalCode', null, e.message, null);
    return null;
  }
}

/**
 * lookupByPostal — หาทุก ตำบล ที่ใช้รหัสไปรษณีย์นั้น
 * @param {string} postalCode
 * @returns {Object[]}
 */
function lookupByPostal(postalCode) {
  try {
    const idx = _getTHGeoIndex();
    if (!idx) return [];
    return idx.byPostal[String(postalCode).padStart(5,'0')] || [];
  } catch (e) {
    return [];
  }
}

/**
 * extractGeoFromAddress — วิเคราะห์ที่อยู่ข้อความ หาตำบล/อำเภอ/จังหวัด/รหัสไปรษณีย์
 *
 * ตัวอย่าง input: "123 แขวงลาดพร้าว เขตลาดพร้าว กรุงเทพ 10230"
 * ตัวอย่าง output: { tambon:'ลาดพร้าว', amphoe:'ลาดพร้าว', province:'กรุงเทพมหานคร',
 *                    postal:'10230', confidence: 95 }
 *
 * @param {string} addressText
 * @returns {Object}
 */
function extractGeoFromAddress(addressText) {
  if (!addressText) return _emptyGeoResult();

  try {
    const idx = _getTHGeoIndex();
    if (!idx) return _emptyGeoResult();

    const text = addressText.replace(/\s+/g, ' ').trim();

    // 1. ดึงรหัสไปรษณีย์จาก text (5 หลัก)
    const postalMatch = text.match(/\b(\d{5})\b/);
    const extractedPostal = postalMatch ? postalMatch[1] : null;

    // 2. Extract จังหวัด
    const province = _extractProvince(text, idx.provinces);

    // 3. Extract อำเภอ/เขต
    const amphoe = _extractAmphoe(text, province, idx);

    // 4. Extract ตำบล/แขวง
    const tambon = _extractTambon(text, amphoe, province, idx);

    // 5. Lookup postal ถ้า extract ได้
    let resolvedPostal = extractedPostal;
    let matchedRecord  = null;

    if (tambon || amphoe) {
      matchedRecord = lookupPostalCode(tambon, amphoe, province);
      if (matchedRecord && !resolvedPostal) {
        resolvedPostal = matchedRecord.postal_code;
      }
    }

    // คำนวณ Confidence
    let confidence = 0;
    if (resolvedPostal) confidence += 30;
    if (province)       confidence += 25;
    if (amphoe)         confidence += 25;
    if (tambon)         confidence += 20;

    return {
      tambon:      tambon || '',
      amphoe:      amphoe || '',
      province:    province || '',
      postal:      resolvedPostal || '',
      note_type:   matchedRecord ? matchedRecord.note_type  : '',
      note_scope:  matchedRecord ? matchedRecord.note_scope : '',
      note_raw:    matchedRecord ? matchedRecord.note_raw   : '',
      confidence,
      matched_record: matchedRecord
    };

  } catch (e) {
    writeLog('WARN', '16_ThGeoService', 'extractGeoFromAddress', null, e.message, null);
    return _emptyGeoResult();
  }
}

/**
 * validateAddressWithGeo — ตรวจสอบว่าที่อยู่สอดคล้องกับ postal code หรือไม่
 * ใช้ใน PlaceService เพื่อเพิ่ม Confidence score
 * @param {string} addressText
 * @param {string} postalCode
 * @returns {{ valid: boolean, confidence: number, details: string }}
 */
function validateAddressWithGeo(addressText, postalCode) {
  if (!addressText && !postalCode) return { valid: false, confidence: 0, details: 'no input' };

  const extracted = extractGeoFromAddress(addressText);
  if (!extracted.postal) return { valid: false, confidence: 20, details: 'ไม่ extract postal ได้' };

  if (postalCode && extracted.postal === String(postalCode)) {
    return { valid: true, confidence: 95, details: `Postal match: ${postalCode}` };
  }

  // ค้นว่า extracted postal อยู่ใน province เดียวกันหรือไม่
  if (postalCode && extracted.province) {
    const postalRecords = lookupByPostal(postalCode);
    const sameProvince = postalRecords.some(r => _normTH(r.province) === _normTH(extracted.province));
    if (sameProvince) return { valid: true, confidence: 70, details: `จังหวัดตรง: ${extracted.province}` };
  }

  return { valid: false, confidence: 30, details: `postal ไม่ตรง: ได้ ${extracted.postal} คาด ${postalCode}` };
}

/**
 * getProvinceList — คืนรายชื่อจังหวัดทั้งหมด 77 จังหวัด
 * @returns {string[]}
 */
function getProvinceList() {
  const idx = _getTHGeoIndex();
  if (!idx) return [];
  return idx.provinces;
}

/**
 * setupThGeoSheet — import ข้อมูล SYS_TH_GEO จาก CSV string
 * ใช้ครั้งแรกตอน Setup ถ้าชีตว่างเปล่า
 * *** ปกติ user Import Excel มือ แต่ถ้าต้องการ Auto-seed ใช้ function นี้ ***
 */
function setupThGeoSheet() {
  const ui = SpreadsheetApp.getUi();
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  let sh = ss.getSheetByName(TH_GEO_SHEET);
  if (!sh) sh = ss.insertSheet(TH_GEO_SHEET);

  // Headers
  const headers = [
    'รหัสไปรษณีย์','ตำบล_แขวง','อำเภอ_เขต','จังหวัด','หมายเหตุ',
    'ตำบล_clean','อำเภอ_clean','ตำบล_label','อำเภอ_label',
    'tambon_norm','amphoe_norm','province_norm',
    'search_key','postal_key','note_type','note_scope'
  ];

  if (sh.getLastRow() < 1) {
    sh.getRange(1, 1, 1, headers.length).setValues([headers]);
    applyHeaderFormatting(sh, headers.length, '#0F6E56');
    sh.setFrozenRows(1);
    ui.alert(
      '📋 SYS_TH_GEO พร้อมแล้ว',
      'กรุณา Import ไฟล์ SYS_TH_GEO_V001.xlsx ลงในชีตนี้\n\n' +
      'วิธี: File > Import > Upload > เลือก SYS_TH_GEO_V001.xlsx\n' +
      '→ เลือก "Replace data in selected cells"\n' +
      '→ เลือก Sheet = SYS_TH_GEO',
      ui.ButtonSet.OK
    );
  } else {
    writeLog('INFO', '16_ThGeoService', 'setupThGeoSheet', null,
      `SYS_TH_GEO มีข้อมูลแล้ว: ${sh.getLastRow() - 1} แถว`, null);
  }
}

/**
 * reloadThGeoCache — Force reload cache (เรียกหลัง import ข้อมูลใหม่)
 */
function reloadThGeoCache() {
  CacheService.getScriptCache().remove(TH_GEO_CACHE_KEY);
  const idx = _buildTHGeoIndex();
  if (idx) {
    writeLog('INFO', '16_ThGeoService', 'reloadThGeoCache', null,
      `โหลด TH_GEO Index สำเร็จ: ${idx.totalRows} แถว`, null);
    SpreadsheetApp.getUi().alert(
      '✅ โหลดข้อมูล TH_GEO สำเร็จ',
      `พบ ${idx.totalRows} แถว | ${idx.provinces.length} จังหวัด`,
      SpreadsheetApp.getUi().ButtonSet.OK
    );
  }
}

// ─────────────────────────────────────────────────────────────
// PRIVATE: Index Builder
// ─────────────────────────────────────────────────────────────

/**
 * _getTHGeoIndex — โหลด/สร้าง Index
 * ใช้ PropertiesService สำรองเพราะ Cache อาจ expire
 */
function _getTHGeoIndex() {
  // ลอง Cache ก่อน (เร็วสุด)
  const cache = CacheService.getScriptCache();
  const cached = cache.get(TH_GEO_CACHE_KEY);
  if (cached) {
    try { return JSON.parse(cached); } catch (_) {}
  }
  return _buildTHGeoIndex();
}

function _buildTHGeoIndex() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = ss.getSheetByName(TH_GEO_SHEET);
  if (!sh || sh.getLastRow() < 2) return null;

  const data = sh.getDataRange().getValues(); // RULE 6: batch read
  const idx = {
    bySearchKey: {},   // tambon_norm|amphoe_norm|province_norm → record
    byPostal:    {},   // postal_code → record[]
    byTambon:    {},   // tambon_norm → record[]
    provinces:   [],
    totalRows:   data.length - 1
  };

  const provinceSet = new Set();
  const C = TH_GEO_COL;

  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    const record = {
      postal_code:   String(row[C.POSTAL] || '').padStart(5,'0'),
      tambon_raw:    String(row[C.TAMBON_RAW]   || ''),
      amphoe_raw:    String(row[C.AMPHOE_RAW]   || ''),
      province:      String(row[C.PROVINCE]     || ''),
      note_raw:      String(row[C.NOTE_RAW]     || ''),
      tambon_clean:  String(row[C.TAMBON_CLEAN] || ''),
      amphoe_clean:  String(row[C.AMPHOE_CLEAN] || ''),
      tambon_label:  String(row[C.TAMBON_LABEL] || 'ตำบล'),
      amphoe_label:  String(row[C.AMPHOE_LABEL] || 'อำเภอ'),
      tambon_norm:   String(row[C.TAMBON_NORM]  || ''),
      amphoe_norm:   String(row[C.AMPHOE_NORM]  || ''),
      province_norm: String(row[C.PROVINCE_NORM]|| ''),
      search_key:    String(row[C.SEARCH_KEY]   || ''),
      postal_key:    String(row[C.POSTAL_KEY]   || ''),
      note_type:     String(row[C.NOTE_TYPE]    || 'FULL_AREA'),
      note_scope:    String(row[C.NOTE_SCOPE]   || 'FULL')
    };

    // bySearchKey
    if (record.search_key) idx.bySearchKey[record.search_key] = record;

    // byPostal
    if (record.postal_code) {
      if (!idx.byPostal[record.postal_code]) idx.byPostal[record.postal_code] = [];
      idx.byPostal[record.postal_code].push(record);
    }

    // byTambon
    if (record.tambon_norm) {
      if (!idx.byTambon[record.tambon_norm]) idx.byTambon[record.tambon_norm] = [];
      idx.byTambon[record.tambon_norm].push(record);
    }

    if (record.province) provinceSet.add(record.province);
  }

  idx.provinces = [...provinceSet].sort();

  // บันทึกลง Cache (แต่ JSON อาจใหญ่เกิน 100KB limit ของ CacheService)
  // ทำ Sparse cache เก็บ bySearchKey เท่านั้น
  try {
    const slim = { bySearchKey: idx.bySearchKey, provinces: idx.provinces, totalRows: idx.totalRows };
    const json = JSON.stringify(slim);
    if (json.length < 90000) { // CacheService limit ~100KB
      CacheService.getScriptCache().put(TH_GEO_CACHE_KEY, json, TH_GEO_CACHE_S);
    }
  } catch (_) {}

  return idx;
}

// ─────────────────────────────────────────────────────────────
// PRIVATE: Text Extractors
// ─────────────────────────────────────────────────────────────

function _extractProvince(text, provinces) {
  if (!provinces) return '';
  // จับคู่ชื่อจังหวัดในข้อความ (รวม กทม = กรุงเทพมหานคร)
  const abbrev = { 'กทม':'กรุงเทพมหานคร', 'กรุงเทพ':'กรุงเทพมหานคร', 'bkk':'กรุงเทพมหานคร' };
  const tNorm = text.toLowerCase().replace(/\s+/g,'');
  for (const [abbr, full] of Object.entries(abbrev)) {
    if (tNorm.includes(abbr.toLowerCase())) return full;
  }
  for (const p of provinces) {
    if (text.includes(p)) return p;
    // Try without 'จังหวัด' prefix
    if (p.length > 2 && text.includes(p.replace('จังหวัด',''))) return p;
  }
  return '';
}

function _extractAmphoe(text, province, idx) {
  if (!idx) return '';
  const tNorm = _normTH(text);
  // ค้นจาก bySearchKey — หา amphoe_norm ที่ตรงกัน
  const candidates = new Set();
  for (const key of Object.keys(idx.bySearchKey || {})) {
    const rec = idx.bySearchKey[key];
    if (province && _normTH(rec.province) !== _normTH(province)) continue;
    if (rec.amphoe_norm && tNorm.includes(rec.amphoe_norm)) {
      candidates.add(rec.amphoe_clean);
    }
  }
  return candidates.size === 1 ? [...candidates][0] : '';
}

function _extractTambon(text, amphoe, province, idx) {
  if (!idx) return '';
  const tNorm = _normTH(text);
  const candidates = new Set();
  for (const key of Object.keys(idx.bySearchKey || {})) {
    const rec = idx.bySearchKey[key];
    if (province && _normTH(rec.province) !== _normTH(province)) continue;
    if (amphoe && _normTH(rec.amphoe_clean) !== _normTH(amphoe)) continue;
    if (rec.tambon_norm && tNorm.includes(rec.tambon_norm)) {
      candidates.add(rec.tambon_clean);
    }
  }
  return candidates.size === 1 ? [...candidates][0] : '';
}

function _normTH(text) {
  if (!text) return '';
  return String(text).replace(/\s+/g,'').toLowerCase().trim();
}

function _findPartialKey(map, partialKey) {
  const match = Object.keys(map).find(k => k.startsWith(partialKey) || k.includes(partialKey));
  return match ? map[match] : null;
}

function _emptyGeoResult() {
  return { tambon:'', amphoe:'', province:'', postal:'',
    note_type:'', note_scope:'', note_raw:'', confidence: 0, matched_record: null };
}
// ============================================================
// FILE: 17_ReviewDecisionService.gs
// VERSION: 001
// MODULE: ReviewDecisionService
//   — ระบบ Dropdown Decision สำหรับ Q_REVIEW
//   — onEdit Trigger: กด Dropdown ปั๊บ Master Data อัปเดตทันที
//
// FLOW:
//   Admin เห็นแถวใน Q_REVIEW ที่ status = PENDING
//     ↓
//   คลิก Dropdown ในคอลัมน์ "decision" เลือก:
//     🟢 CREATE_NEW      → สร้าง Master ใหม่ทันที
//     🔵 MERGE_TO_CANDIDATE → รวมเข้า Master เดิมที่ระบบแนะนำ
//     🔴 IGNORE          → ข้ามแถวนี้ (ข้อมูลมั่วเกินไป)
//   onEdit ทำงาน → update Master → update SYNC_STATUS ใน Source
// ============================================================

// ─── Dropdown Options ──────────────────────────────────────────
const DECISION_OPTIONS = [
  '🟢 CREATE_NEW',
  '🔵 MERGE_TO_CANDIDATE',
  '🔴 IGNORE'
];

// Decision value → clean code mapping
const DECISION_CODE = {
  '🟢 CREATE_NEW':         'CREATE_NEW',
  '🔵 MERGE_TO_CANDIDATE': 'MERGE_TO_CANDIDATE',
  '🔴 IGNORE':             'IGNORE'
};

// สีพื้นหลังของแถวหลังตัดสิน
const DECISION_ROW_COLORS = {
  CREATE_NEW:         'E8F5E9',  // เขียวอ่อน
  MERGE_TO_CANDIDATE: 'E3F2FD',  // น้ำเงินอ่อน
  IGNORE:             'FFEBEE',  // แดงอ่อน
  PENDING:            'FFFFFF',
  RESOLVED:           'F5F5F5'
};

// ─────────────────────────────────────────────────────────────
// ENTRY POINTS
// ─────────────────────────────────────────────────────────────

/**
 * onEditHandler — onEdit Trigger (ติดตั้งโดย installOnEditTrigger)
 * ตรวจว่า Edit เกิดใน Q_REVIEW คอลัมน์ decision หรือไม่
 * @param {GoogleAppsScript.Events.SheetsOnEdit} e
 */
function onEditHandler(e) {
  try {
    if (!e || !e.range) return;

    const sheet = e.range.getSheet();
    if (sheet.getName() !== SHEET_NAMES.Q_REVIEW) return;

    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    const decisionColIdx = headers.indexOf('decision') + 1; // 1-based
    if (decisionColIdx === 0) return;

    // ตรวจว่า edit อยู่ใน decision column
    if (e.range.getColumn() !== decisionColIdx) return;
    if (e.range.getRow() < 2) return;

    const rawValue = String(e.range.getValue() || '').trim();
    const decisionCode = DECISION_CODE[rawValue];
    if (!decisionCode) return; // ไม่ใช่ค่าจาก dropdown → skip

    // ดึงข้อมูลแถวนี้
    const rowNum = e.range.getRow();
    const rowData = sheet.getRange(rowNum, 1, 1, headers.length).getValues()[0];
    const reviewObj = {};
    headers.forEach((h, i) => { reviewObj[h] = rowData[i]; });
    reviewObj._rowNumber = rowNum;

    // Execute Decision
    writeLog('INFO', '17_ReviewDecision', 'onEditHandler', reviewObj.review_id,
      `Admin decision: ${decisionCode} | ${reviewObj.raw_person_name}`, null);

    applyDecisionFromDropdown(reviewObj, decisionCode, sheet, rowNum, headers);

  } catch (err) {
    writeLog('ERROR', '17_ReviewDecision', 'onEditHandler', null, err.message, null);
  }
}

/**
 * applyDecisionFromDropdown — Execute decision logic
 * @param {Object}  reviewObj    — Q_REVIEW row as object
 * @param {string}  decisionCode — CREATE_NEW | MERGE_TO_CANDIDATE | IGNORE
 * @param {Sheet}   sheet        — Q_REVIEW sheet
 * @param {number}  rowNum
 * @param {string[]} headers
 */
function applyDecisionFromDropdown(reviewObj, decisionCode, sheet, rowNum, headers) {
  let resultMsg = '';
  let success   = false;

  try {
    switch (decisionCode) {
      case 'CREATE_NEW':
        resultMsg = executeCreateNew(reviewObj);
        success = true;
        break;
      case 'MERGE_TO_CANDIDATE':
        resultMsg = executeMergeToCandidate(reviewObj);
        success = true;
        break;
      case 'IGNORE':
        resultMsg = executeIgnore(reviewObj);
        success = true;
        break;
    }
  } catch (err) {
    resultMsg = 'ERROR: ' + err.message;
    writeLog('ERROR', '17_ReviewDecision', 'applyDecisionFromDropdown',
      reviewObj.review_id, err.message, null);
  }

  // ─── อัปเดตแถว Q_REVIEW ──────────────────────────────────
  const statusIdx    = headers.indexOf('status')      + 1;
  const reviewerIdx  = headers.indexOf('reviewer')    + 1;
  const reviewedAtIdx= headers.indexOf('reviewed_at') + 1;
  const noteIdx      = headers.indexOf('note')        + 1;

  if (statusIdx    > 0) sheet.getRange(rowNum, statusIdx).setValue('RESOLVED');
  if (reviewerIdx  > 0) sheet.getRange(rowNum, reviewerIdx).setValue('ADMIN_DROPDOWN');
  if (reviewedAtIdx > 0) sheet.getRange(rowNum, reviewedAtIdx).setValue(new Date());
  if (noteIdx      > 0) sheet.getRange(rowNum, noteIdx).setValue(resultMsg);

  // ─── สีแถว ───────────────────────────────────────────────
  const bgColor = DECISION_ROW_COLORS[decisionCode] || DECISION_ROW_COLORS.RESOLVED;
  sheet.getRange(rowNum, 1, 1, headers.length)
    .setBackground(bgColor);

  // ─── อัปเดต Source Sheet SYNC_STATUS ─────────────────────
  if (success && reviewObj.source_row_number) {
    const syncStatus = decisionCode === 'IGNORE' ? 'IGNORED' : 'PROCESSED';
    updateSourceSyncStatus(parseInt(reviewObj.source_row_number), syncStatus);
  }

  writeLog('INFO', '17_ReviewDecision', 'applyDecisionFromDropdown',
    reviewObj.review_id,
    `${success ? '✅' : '❌'} ${decisionCode}: ${resultMsg}`, null);
}

// ─────────────────────────────────────────────────────────────
// DECISION EXECUTORS
// ─────────────────────────────────────────────────────────────

/**
 * executeCreateNew — สร้าง Master Records ใหม่ทั้งหมด
 * ใช้เมื่อ: ข้อมูลนี้เป็นลูกค้าจริง / สถานที่จริงที่ยังไม่มีในระบบ
 * @param {Object} reviewObj
 * @returns {string} result message
 */
function executeCreateNew(reviewObj) {
  const parts = [];

  // Normalize ข้อมูลจาก review
  const pseudoNorm = {
    dest_name_raw:      reviewObj.raw_person_name || '',
    person_name_norm:   normalizePersonName(reviewObj.raw_person_name || ''),
    place_name_norm:    normalizePlaceName(reviewObj.raw_place_name || ''),
    address_raw:        reviewObj.raw_place_name || '',
    address_norm:       normalizeAddress(reviewObj.raw_place_name || ''),
    address_latlong_norm: '',
    lat_norm:           parseFloat(reviewObj.raw_lat)  || 0,
    long_norm:          parseFloat(reviewObj.raw_long) || 0,
    geo_keys:           buildGeoKeys(
      parseFloat(reviewObj.raw_lat)  || 0,
      parseFloat(reviewObj.raw_long) || 0
    )
  };

  // สร้าง Person
  let personId = null;
  if (pseudoNorm.person_name_norm) {
    personId = createPerson(reviewObj.raw_person_name, pseudoNorm.person_name_norm);
    createPersonAlias(personId, reviewObj.raw_person_name, pseudoNorm.person_name_norm);
    parts.push(`Person: ${personId}`);
  }

  // สร้าง Place
  let placeId = null;
  if (pseudoNorm.place_name_norm || pseudoNorm.address_norm) {
    placeId = createPlace(
      pseudoNorm.place_name_norm || pseudoNorm.address_norm,
      pseudoNorm.address_norm
    );
    if (pseudoNorm.place_name_norm)
      createPlaceAlias(placeId, reviewObj.raw_place_name, pseudoNorm.place_name_norm);
    parts.push(`Place: ${placeId}`);
  }

  // สร้าง Geo
  let geoId = null;
  if (pseudoNorm.lat_norm && pseudoNorm.long_norm) {
    geoId = createGeoPoint(
      pseudoNorm.lat_norm, pseudoNorm.long_norm,
      pseudoNorm.geo_keys, reviewObj.raw_place_name || ''
    );
    parts.push(`Geo: ${geoId}`);
  }

  // สร้าง Destination
  if (personId || placeId || geoId) {
    const destId = createDestination(
      personId, placeId, geoId,
      [pseudoNorm.person_name_norm, pseudoNorm.place_name_norm].filter(Boolean).join(' | '),
      buildDestinationKey(personId, placeId, geoId)
    );
    parts.push(`Dest: ${destId}`);

    // อัปเดต FACT_DELIVERY ที่อ้างถึง source record นี้
    _updateFactWithNewIds(reviewObj.source_record_id, personId, placeId, geoId, destId);
  }

  return 'CREATE_NEW: ' + parts.join(', ');
}

/**
 * executeMergeToCandidate — Merge เข้า Master ที่ระบบแนะนำ
 * ใช้เมื่อ: ระบบแนะนำ candidate ที่ถูกต้อง Admin กด confirm
 * @param {Object} reviewObj
 * @returns {string} result message
 */
function executeMergeToCandidate(reviewObj) {
  const parts = [];

  // ดึง candidates ที่ระบบแนะนำ
  const personCandidates = _parseCandidates(reviewObj.candidate_person_ids);
  const placeCandidates  = _parseCandidates(reviewObj.candidate_place_ids);
  const geoCandidates    = _parseCandidates(reviewObj.candidate_geo_ids);

  // ใช้ candidate แรก (คะแนนสูงสุด)
  const targetPersonId = personCandidates[0]?.id || null;
  const targetPlaceId  = placeCandidates[0]?.id  || null;
  const targetGeoId    = geoCandidates[0]?.id    || null;

  // เพิ่ม Alias ให้ระบบเรียนรู้ (ปัญหา #4)
  if (targetPersonId && reviewObj.raw_person_name) {
    const normName = normalizePersonName(reviewObj.raw_person_name);
    createPersonAlias(targetPersonId, reviewObj.raw_person_name, normName);
    parts.push(`PersonAlias → ${targetPersonId}`);
  }

  if (targetPlaceId && reviewObj.raw_place_name) {
    const normPlace = normalizePlaceName(reviewObj.raw_place_name);
    createPlaceAlias(targetPlaceId, reviewObj.raw_place_name, normPlace);
    parts.push(`PlaceAlias → ${targetPlaceId}`);
  }

  // หา/สร้าง Destination
  if (targetPersonId || targetPlaceId || targetGeoId) {
    const resolvedDest = resolveDestination(
      targetPersonId, targetPlaceId, targetGeoId,
      { person_name_norm: '', place_name_norm: '', lat_norm: 0, long_norm: 0 }
    );
    parts.push(`Dest: ${resolvedDest.destination_id} (${resolvedDest.is_new ? 'new' : 'existing'})`);

    // อัปเดต FACT_DELIVERY
    _updateFactWithNewIds(
      reviewObj.source_record_id,
      targetPersonId, targetPlaceId, targetGeoId, resolvedDest.destination_id
    );
  }

  // เรียน alias ย้อนกลับไป Master
  learnAliasFromReview(reviewObj.review_id, Object.values(reviewObj), Object.keys(reviewObj));

  return 'MERGE: ' + parts.join(', ');
}

/**
 * executeIgnore — Mark รายการนี้ว่า Ignore (ข้อมูลมั่วเกินไป)
 * RULE 4: ไม่ลบ — เก็บไว้ใน Q_REVIEW status = IGNORED
 * @param {Object} reviewObj
 * @returns {string}
 */
function executeIgnore(reviewObj) {
  // อัปเดต FACT_DELIVERY ให้รู้ว่า IGNORED
  if (reviewObj.source_record_id) {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sh = ss.getSheetByName(SHEET_NAMES.FACT_DELIVERY);
    if (sh && sh.getLastRow() > 1) {
      const data = sh.getDataRange().getValues();
      const hdr  = data[0];
      const srcIdx    = hdr.indexOf('source_record_id');
      const statusIdx = hdr.indexOf('review_status');
      for (let i = 1; i < data.length; i++) {
        if (data[i][srcIdx] === reviewObj.source_record_id) {
          sh.getRange(i + 1, statusIdx + 1).setValue('IGNORED');
          break;
        }
      }
    }
  }
  return `IGNORED: ${reviewObj.raw_person_name || reviewObj.invoice_no || 'N/A'}`;
}

// ─────────────────────────────────────────────────────────────
// SETUP FUNCTIONS (เรียกครั้งแรก หรือ reset)
// ─────────────────────────────────────────────────────────────

/**
 * setupDecisionDropdowns — ติดตั้ง Data Validation Dropdown
 * ในคอลัมน์ "decision" ของ Q_REVIEW ทุกแถว
 */
function setupDecisionDropdowns() {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sh = ss.getSheetByName(SHEET_NAMES.Q_REVIEW);
    if (!sh) {
      writeLog('WARN','17_ReviewDecision','setupDecisionDropdowns',null,'ไม่พบ Q_REVIEW',null);
      return;
    }

    const headers = sh.getRange(1, 1, 1, sh.getLastColumn()).getValues()[0];
    const decisionCol = headers.indexOf('decision') + 1;
    if (decisionCol === 0) return;

    const lastRow = Math.max(sh.getLastRow(), 100); // ตั้ง dropdown ล่วงหน้า 100 แถว

    const rule = SpreadsheetApp.newDataValidation()
      .requireValueInList(DECISION_OPTIONS, true)
      .setAllowInvalid(false)
      .setHelpText('เลือก: CREATE_NEW = สร้างใหม่ | MERGE = รวมกับ candidate | IGNORE = ข้าม')
      .build();

    // ใช้ batch set (RULE 6)
    sh.getRange(2, decisionCol, lastRow - 1, 1).setDataValidation(rule);

    // ตั้ง Conditional Formatting สีตาม decision
    _applyDecisionConditionalFormat(sh, decisionCol, lastRow);

    writeLog('INFO','17_ReviewDecision','setupDecisionDropdowns',null,
      `ติดตั้ง Dropdown ใน Q_REVIEW col ${decisionCol}`, null);

    SpreadsheetApp.getUi().alert(
      '✅ ติดตั้ง Decision Dropdown สำเร็จ',
      'คอลัมน์ "decision" ใน Q_REVIEW พร้อมใช้งาน\n\n' +
      '🟢 CREATE_NEW = สร้าง Master ใหม่\n' +
      '🔵 MERGE_TO_CANDIDATE = รวมกับที่ระบบแนะนำ\n' +
      '🔴 IGNORE = ข้ามแถวนี้\n\n' +
      'เมื่อเลือก Dropdown → ระบบจะประมวลผลอัตโนมัติ',
      SpreadsheetApp.getUi().ButtonSet.OK
    );
  } catch (e) {
    writeLog('ERROR','17_ReviewDecision','setupDecisionDropdowns',null, e.message, null);
  }
}

/**
 * installOnEditTrigger — ติดตั้ง onEdit Trigger สำหรับ Q_REVIEW
 * ต้องรันครั้งเดียวหลัง Setup
 */
function installOnEditTrigger() {
  try {
    // ลบ onEditHandler เดิมออกก่อน
    ScriptApp.getProjectTriggers()
      .filter(t => t.getHandlerFunction() === 'onEditHandler')
      .forEach(t => ScriptApp.deleteTrigger(t));

    // สร้างใหม่
    ScriptApp.newTrigger('onEditHandler')
      .forSpreadsheet(SpreadsheetApp.getActive())
      .onEdit()
      .create();

    writeLog('INFO','17_ReviewDecision','installOnEditTrigger',null,
      'ติดตั้ง onEdit Trigger สำเร็จ', null);

    SpreadsheetApp.getUi().alert(
      '✅ ติดตั้ง onEdit Trigger สำเร็จ',
      'ระบบจะตอบสนองต่อการเลือก Dropdown ใน Q_REVIEW โดยอัตโนมัติ',
      SpreadsheetApp.getUi().ButtonSet.OK
    );
  } catch (e) {
    writeLog('ERROR','17_ReviewDecision','installOnEditTrigger',null,e.message,null);
    SpreadsheetApp.getUi().alert('❌ Error: ' + e.message);
  }
}

/**
 * showPendingReviewSummary — แสดงสรุป Pending Reviews แยกตาม issue_type
 */
function showPendingReviewSummary() {
  const reviews  = getPendingReviews();
  if (reviews.length === 0) {
    SpreadsheetApp.getUi().alert('✅ ไม่มีรายการ Pending Review');
    return;
  }

  const byType = {};
  reviews.forEach(r => {
    byType[r.issue_type] = (byType[r.issue_type] || 0) + 1;
  });

  const lines = [
    `📋 Pending Reviews: ${reviews.length} รายการ`,
    '',
    ...Object.entries(byType).map(([type, count]) => {
      const emoji = {
        C1_PERSON_DUPLICATE:   '👤 #1',
        C2_PLACE_DUPLICATE:    '🏢 #2',
        C3_GEO_DUPLICATE:      '📍 #3',
        C4_SAME_PERSON_DIFF_NAME: '✏️ #4',
        C5_DIFF_PERSON_SAME_PLACE:'🔀 #5',
        C6_SAME_PERSON_DIFF_PLACE:'🗺️ #6',
        C7_SAME_PERSON_DIFF_GEO:  '📡 #7',
        C8_DIFF_PERSON_SAME_GEO:  '🔍 #8',
        UNCERTAIN_MATCH:       '❓ ?'
      }[type] || '⚠️';
      return `  ${emoji} ${type}: ${count} รายการ`;
    }),
    '',
    'ไปที่ชีต Q_REVIEW เพื่อตัดสินใจ'
  ];

  SpreadsheetApp.getUi().alert(
    '🔍 Pending Review Summary',
    lines.join('\n'),
    SpreadsheetApp.getUi().ButtonSet.OK
  );
}

// ─────────────────────────────────────────────────────────────
// PRIVATE HELPERS
// ─────────────────────────────────────────────────────────────

/**
 * _updateFactWithNewIds — อัปเดต FACT_DELIVERY row ด้วย Master IDs ใหม่
 */
function _updateFactWithNewIds(sourceRecordId, personId, placeId, geoId, destId) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sh = ss.getSheetByName(SHEET_NAMES.FACT_DELIVERY);
    if (!sh || sh.getLastRow() < 2) return;

    const data = sh.getDataRange().getValues();
    const hdr  = data[0];
    const srcIdx  = hdr.indexOf('source_record_id');
    const pidIdx  = hdr.indexOf('person_id');
    const plcIdx  = hdr.indexOf('place_id');
    const geoIdx  = hdr.indexOf('geo_id');
    const dstIdx  = hdr.indexOf('destination_id');
    const rvwIdx  = hdr.indexOf('review_status');
    const updIdx  = hdr.indexOf('updated_at');

    for (let i = 1; i < data.length; i++) {
      if (data[i][srcIdx] !== sourceRecordId) continue;
      if (personId && pidIdx >= 0) sh.getRange(i + 1, pidIdx + 1).setValue(personId);
      if (placeId  && plcIdx >= 0) sh.getRange(i + 1, plcIdx + 1).setValue(placeId);
      if (geoId    && geoIdx >= 0) sh.getRange(i + 1, geoIdx + 1).setValue(geoId);
      if (destId   && dstIdx >= 0) sh.getRange(i + 1, dstIdx + 1).setValue(destId);
      if (rvwIdx >= 0) sh.getRange(i + 1, rvwIdx + 1).setValue('APPROVED');
      if (updIdx >= 0) sh.getRange(i + 1, updIdx + 1).setValue(new Date());
      return; // อัปเดตแถวแรกที่เจอ
    }
  } catch (e) {
    writeLog('WARN','17_ReviewDecision','_updateFactWithNewIds',null,e.message,null);
  }
}

/**
 * _parseCandidates — parse "PER-XXX(95),PER-YYY(82)" → [{id, score}]
 */
function _parseCandidates(candidateStr) {
  if (!candidateStr) return [];
  return String(candidateStr).split(',')
    .map(s => s.trim())
    .filter(Boolean)
    .map(s => {
      const m = s.match(/^([^\(]+)\(([^\)]+)\)$/);
      return m ? { id: m[1].trim(), score: parseFloat(m[2]) || 0 } : { id: s, score: 0 };
    })
    .sort((a, b) => b.score - a.score);
}

/**
 * _applyDecisionConditionalFormat — ตั้ง Conditional Formatting
 */
function _applyDecisionConditionalFormat(sh, decisionCol, lastRow) {
  try {
    const range = sh.getRange(2, decisionCol, lastRow - 1, 1);
    const rules = [];

    [
      ['🟢 CREATE_NEW',         'E8F5E9', '0F6E56'],
      ['🔵 MERGE_TO_CANDIDATE', 'E3F2FD', '185FA5'],
      ['🔴 IGNORE',             'FFEBEE', 'C73B20']
    ].forEach(([val, bg, font]) => {
      rules.push(
        SpreadsheetApp.newConditionalFormatRule()
          .whenTextEqualTo(val)
          .setBackground('#' + bg)
          .setFontColor('#' + font)
          .setBold(true)
          .setRanges([range])
          .build()
      );
    });

    sh.setConditionalFormatRules([
      ...sh.getConditionalFormatRules().filter(r =>
        !r.getRanges().some(rng => rng.getColumn() === decisionCol)
      ),
      ...rules
    ]);
  } catch (e) {
    // Conditional format ไม่ critical — skip
  }
}
// ============================================================
// FILE: 18_GoogleMapsService.gs
// VERSION: 001
// MODULE: GoogleMapsService
//   — Custom Formula Functions สำหรับ Google Sheets
//   — ใช้ Maps Service ของ GAS (ฟรี ไม่ต้องมี API Key)
//   — Cache ผลลัพธ์ 6 ชั่วโมง เพื่อประหยัด quota
//   — Integration กับ MDM: Reverse Geocode + Distance Calc
//
// วิธีใช้ใน Google Sheets (พิมสูตรได้เลย):
//   =GOOGLEMAPS_DISTANCE(A1, B1, "driving")
//   =GOOGLEMAPS_REVERSEGEOCODE(C1, D1)
//   =GOOGLEMAPS_LATLONG("10 Hanover Square, NY")
//   =GOOGLEMAPS_DURATION(A1, B1, "driving")
//   =GOOGLEMAPS_DIRECTIONS(A1, B1, "driving")
//   =GOOGLEMAPS_ELEVATION(13.7563, 100.5018)
//
// MDM Formulas (ใช้ใน Source Sheet):
//   =MDM_REVERSE_GEOCODE(LAT_CELL, LONG_CELL)
//   =MDM_DISTANCE_FROM_WAREHOUSE(LAT_CELL, LONG_CELL)
//   =MDM_VALIDATE_ADDRESS(ADDRESS_CELL, LAT_CELL, LONG_CELL)
// ============================================================

// ─── Cache Utilities ──────────────────────────────────────────

/**
 * _md5Key — สร้าง cache key จาก string (normalize ก่อน hash)
 * ทำให้ "New York" และ "new york " ได้ key เดียวกัน
 */
function _md5Key(key) {
  const code = String(key).toLowerCase().replace(/\s/g, '');
  return Utilities.computeDigest(
    Utilities.DigestAlgorithm.MD5, code
  ).reduce((str, byte) => str + (byte + 256).toString(16).slice(-2), '');
}

/**
 * _getMapCache — อ่านค่าจาก DocumentCache (shared ทุก user)
 * @param {string} key
 * @returns {string|null}
 */
function _getMapCache(key) {
  try {
    return CacheService.getDocumentCache().get(_md5Key(key));
  } catch (_) { return null; }
}

/**
 * _setMapCache — บันทึกลง DocumentCache 6 ชั่วโมง
 * @param {string} key
 * @param {string} value
 */
function _setMapCache(key, value) {
  try {
    CacheService.getDocumentCache().put(_md5Key(key), String(value), 21600);
  } catch (_) {}
}

// ─── CUSTOM FORMULA FUNCTIONS ────────────────────────────────
// ทุก function มี @customfunction → Google Sheets รู้จักเป็น Formula

/**
 * GOOGLEMAPS_DISTANCE — คำนวณระยะทางระหว่างสองจุด
 * =GOOGLEMAPS_DISTANCE("กรุงเทพ", "เชียงใหม่", "driving")
 *
 * @param {string} origin      ที่อยู่ต้นทาง หรือ "lat, long"
 * @param {string} destination ที่อยู่ปลายทาง หรือ "lat, long"
 * @param {string} mode        driving | walking | bicycling | transit
 * @return {string} ระยะทาง เช่น "591 km"
 * @customfunction
 */
function GOOGLEMAPS_DISTANCE(origin, destination, mode) {
  mode = mode || 'driving';
  if (!origin || !destination) return 'ระบุ origin และ destination';

  const cacheKey = ['distance', origin, destination, mode].join('|');
  const cached   = _getMapCache(cacheKey);
  if (cached !== null) return cached;

  try {
    const { routes: [data] = [] } = Maps.newDirectionFinder()
      .setOrigin(String(origin))
      .setDestination(String(destination))
      .setMode(mode)
      .getDirections();

    if (!data) return 'ไม่พบเส้นทาง';

    const { legs: [{ distance: { text: distance } } = {}] = [] } = data;
    _setMapCache(cacheKey, distance || '');
    return distance || 'ไม่พบข้อมูล';
  } catch (e) {
    return 'Error: ' + e.message;
  }
}

/**
 * GOOGLEMAPS_DISTANCE_KM — คำนวณระยะทาง (ตัวเลข km เท่านั้น)
 * =GOOGLEMAPS_DISTANCE_KM(14.165716, 100.625296, 13.7563, 100.5018)
 *
 * @param {number} originLat
 * @param {number} originLng
 * @param {number} destLat
 * @param {number} destLng
 * @param {string} mode driving | walking
 * @return {number} ระยะทาง (km)
 * @customfunction
 */
function GOOGLEMAPS_DISTANCE_KM(originLat, originLng, destLat, destLng, mode) {
  mode = mode || 'driving';
  if (!originLat || !destLat) return '';

  const origin      = `${originLat}, ${originLng}`;
  const destination = `${destLat}, ${destLng}`;
  const cacheKey    = ['distKm', origin, destination, mode].join('|');
  const cached      = _getMapCache(cacheKey);
  if (cached !== null) return parseFloat(cached) || cached;

  try {
    const { routes: [data] = [] } = Maps.newDirectionFinder()
      .setOrigin(origin)
      .setDestination(destination)
      .setMode(mode)
      .getDirections();

    if (!data) return '';

    const { legs: [{ distance: { value: distMeters } } = {}] = [] } = data;
    const km = distMeters ? (distMeters / 1000).toFixed(2) : '';
    _setMapCache(cacheKey, String(km));
    return parseFloat(km) || km;
  } catch (e) {
    return 'Error: ' + e.message;
  }
}

/**
 * GOOGLEMAPS_REVERSEGEOCODE — แปลง LatLong → ที่อยู่ข้อความ
 * =GOOGLEMAPS_REVERSEGEOCODE(13.7563, 100.5018)
 * =GOOGLEMAPS_REVERSEGEOCODE(C2, D2)
 *
 * @param {number} latitude
 * @param {number} longitude
 * @return {string} ที่อยู่ข้อความ
 * @customfunction
 */
function GOOGLEMAPS_REVERSEGEOCODE(latitude, longitude) {
  if (!latitude || !longitude) return '';

  const cacheKey = ['rgeo', latitude, longitude].join('|');
  const cached   = _getMapCache(cacheKey);
  if (cached !== null) return cached;

  try {
    const { results: [data = {}] = [] } = Maps.newGeocoder()
      .reverseGeocode(parseFloat(latitude), parseFloat(longitude));
    const address = data.formatted_address || '';
    _setMapCache(cacheKey, address);
    return address;
  } catch (e) {
    return 'Error: ' + e.message;
  }
}

/**
 * GOOGLEMAPS_LATLONG — แปลง ที่อยู่ → LatLong
 * =GOOGLEMAPS_LATLONG("บิ๊กซีรังสิต ปทุมธานี")
 *
 * @param {string} address
 * @return {string} "lat, long"
 * @customfunction
 */
function GOOGLEMAPS_LATLONG(address) {
  if (!address) return '';

  const cacheKey = ['latlong', address].join('|');
  const cached   = _getMapCache(cacheKey);
  if (cached !== null) return cached;

  try {
    const { results: [data = null] = [] } = Maps.newGeocoder().geocode(String(address));
    if (!data) return 'ไม่พบที่อยู่';

    const { geometry: { location: { lat, lng } } = {} } = data;
    const result = `${lat}, ${lng}`;
    _setMapCache(cacheKey, result);
    return result;
  } catch (e) {
    return 'Error: ' + e.message;
  }
}

/**
 * GOOGLEMAPS_DURATION — คำนวณเวลาเดินทาง
 * =GOOGLEMAPS_DURATION("วังน้อย อยุธยา", "บางนา กรุงเทพ", "driving")
 *
 * @param {string} origin
 * @param {string} destination
 * @param {string} mode driving | walking | bicycling | transit
 * @return {string} เวลา เช่น "1 hour 23 mins"
 * @customfunction
 */
function GOOGLEMAPS_DURATION(origin, destination, mode) {
  mode = mode || 'driving';
  if (!origin || !destination) return '';

  const cacheKey = ['duration', origin, destination, mode].join('|');
  const cached   = _getMapCache(cacheKey);
  if (cached !== null) return cached;

  try {
    const { routes: [data] = [] } = Maps.newDirectionFinder()
      .setOrigin(String(origin))
      .setDestination(String(destination))
      .setMode(mode)
      .getDirections();

    if (!data) return 'ไม่พบเส้นทาง';

    const { legs: [{ duration: { text: time } } = {}] = [] } = data;
    _setMapCache(cacheKey, time || '');
    return time || '';
  } catch (e) {
    return 'Error: ' + e.message;
  }
}

/**
 * GOOGLEMAPS_DIRECTIONS — แสดง step-by-step directions
 * =GOOGLEMAPS_DIRECTIONS("วังน้อย", "ลาดพร้าว กรุงเทพ", "driving")
 *
 * @param {string} origin
 * @param {string} destination
 * @param {string} mode
 * @return {string} เส้นทางแบบข้อความ
 * @customfunction
 */
function GOOGLEMAPS_DIRECTIONS(origin, destination, mode) {
  mode = mode || 'driving';
  if (!origin || !destination) return '';

  const cacheKey = ['dir', origin, destination, mode].join('|');
  const cached   = _getMapCache(cacheKey);
  if (cached !== null) return cached;

  try {
    const { routes = [] } = Maps.newDirectionFinder()
      .setOrigin(String(origin))
      .setDestination(String(destination))
      .setMode(mode)
      .getDirections();

    if (!routes.length) return 'ไม่พบเส้นทาง';

    const result = routes.map(({ legs }) =>
      legs.map(({ steps }) =>
        steps.map(step =>
          step.html_instructions
            .replace(/<[^>]+>/g, '')
            .replace(/&amp;/g, '&')
            .replace(/&quot;/g, '"')
        ).join(' → ')
      ).join(' | ')
    ).join('\n');

    _setMapCache(cacheKey, result);
    return result;
  } catch (e) {
    return 'Error: ' + e.message;
  }
}

/**
 * GOOGLEMAPS_ELEVATION — ความสูงจากระดับน้ำทะเล (เมตร)
 * =GOOGLEMAPS_ELEVATION(13.7563, 100.5018)
 *
 * @param {number} latitude
 * @param {number} longitude
 * @return {number} ความสูง (เมตร)
 * @customfunction
 */
function GOOGLEMAPS_ELEVATION(latitude, longitude) {
  if (!latitude || !longitude) return '';

  const cacheKey = ['elev', latitude, longitude].join('|');
  const cached   = _getMapCache(cacheKey);
  if (cached !== null) return parseFloat(cached) || cached;

  try {
    const { results: [data] = [] } = Maps.newElevationSampler()
      .sampleLocation(parseFloat(latitude), parseFloat(longitude));
    if (!data) return '';

    const elevation = parseFloat(data.elevation.toFixed(2));
    _setMapCache(cacheKey, String(elevation));
    return elevation;
  } catch (e) {
    return 'Error: ' + e.message;
  }
}

// ─── MDM-Specific Formulas ───────────────────────────────────
// สูตรเฉพาะสำหรับ Logistics MDM System

/**
 * MDM_REVERSE_GEOCODE — แปลง LatLong → ที่อยู่ภาษาไทย (สะอาดกว่า)
 * ใช้ใน Source Sheet แทนที่ระบบเดิม
 * =MDM_REVERSE_GEOCODE(C2, D2)
 * =MDM_REVERSE_GEOCODE(14.165716, 100.625296)
 *
 * @param {number} lat
 * @param {number} long
 * @return {string} ที่อยู่ไทย
 * @customfunction
 */
function MDM_REVERSE_GEOCODE(lat, long) {
  if (!lat || !long || lat === 0 || long === 0) return '';
  return GOOGLEMAPS_REVERSEGEOCODE(lat, long);
}

/**
 * MDM_DISTANCE_FROM_WAREHOUSE — ระยะทางจากคลัง SCG วังน้อย
 * =MDM_DISTANCE_FROM_WAREHOUSE(C2, D2)  ← C=LAT, D=LONG
 *
 * ค่าคลัง: LAT 14.165716, LONG 100.625296 (SCG Wang Noi)
 *
 * @param {number} destLat   ละติจูดปลายทาง
 * @param {number} destLong  ลองจิจูดปลายทาง
 * @return {number} ระยะทาง (km)
 * @customfunction
 */
function MDM_DISTANCE_FROM_WAREHOUSE(destLat, destLong) {
  if (!destLat || !destLong) return '';

  // ดึงค่าคลังจาก Config (หรือใช้ default)
  const whLat  = parseFloat(_getMapCache('WAREHOUSE_LAT_CFG')  || '14.165716');
  const whLong = parseFloat(_getMapCache('WAREHOUSE_LONG_CFG') || '100.625296');

  return GOOGLEMAPS_DISTANCE_KM(whLat, whLong, destLat, destLong, 'driving');
}

/**
 * MDM_VALIDATE_ADDRESS — ตรวจสอบว่าที่อยู่ข้อความตรงกับ LatLong หรือไม่
 * =MDM_VALIDATE_ADDRESS(E2, C2, D2)  ← E=ที่อยู่, C=LAT, D=LONG
 *
 * คืนค่า: "✅ ตรง (95%)" | "⚠ ต่าง ~2.3km" | "❌ ตรวจไม่ได้"
 *
 * @param {string} addressText ที่อยู่ข้อความ
 * @param {number} lat
 * @param {number} long
 * @return {string}
 * @customfunction
 */
function MDM_VALIDATE_ADDRESS(addressText, lat, long) {
  if (!addressText || !lat || !long) return '❌ ข้อมูลไม่ครบ';

  const cacheKey = ['valaddr', addressText, lat, long].join('|');
  const cached   = _getMapCache(cacheKey);
  if (cached !== null) return cached;

  try {
    // Geocode ที่อยู่ → ได้ lat/long
    const { results: [data = null] = [] } = Maps.newGeocoder().geocode(String(addressText));
    if (!data) {
      _setMapCache(cacheKey, '❌ ตรวจไม่ได้');
      return '❌ ตรวจไม่ได้';
    }

    const { geometry: { location: { lat: gLat, lng: gLng } } = {} } = data;

    // คำนวณระยะห่างด้วย Haversine
    const distM = _haversineM(parseFloat(lat), parseFloat(long), gLat, gLng);
    let result;

    if (distM <= 100)       result = `✅ ตรง (~${distM.toFixed(0)}m)`;
    else if (distM <= 500)  result = `⚠ ใกล้ (~${distM.toFixed(0)}m)`;
    else if (distM <= 2000) result = `⚠ ห่าง ~${(distM/1000).toFixed(1)}km`;
    else                    result = `❌ ต่างกันมาก ~${(distM/1000).toFixed(1)}km`;

    _setMapCache(cacheKey, result);
    return result;
  } catch (e) {
    return '❌ Error';
  }
}

/**
 * MDM_CLEAN_ADDRESS — ดึงที่อยู่สะอาดจาก LatLong (ภาษาไทย, ตัดประเทศออก)
 * =MDM_CLEAN_ADDRESS(C2, D2)
 *
 * @param {number} lat
 * @param {number} long
 * @return {string} ที่อยู่สะอาด เช่น "ลาดพร้าว เขตลาดพร้าว กรุงเทพมหานคร 10230"
 * @customfunction
 */
function MDM_CLEAN_ADDRESS(lat, long) {
  if (!lat || !long) return '';
  const full = GOOGLEMAPS_REVERSEGEOCODE(lat, long);
  if (!full || full.startsWith('Error')) return full;

  // ตัด ", Thailand" / ", ประเทศไทย" ออก
  return full
    .replace(/,?\s*Thailand\s*$/i, '')
    .replace(/,?\s*ประเทศไทย\s*$/, '')
    .trim();
}

/**
 * MDM_POSTAL_FROM_LATLONG — ดึงรหัสไปรษณีย์จาก LatLong
 * =MDM_POSTAL_FROM_LATLONG(C2, D2)
 *
 * @param {number} lat
 * @param {number} long
 * @return {string} รหัสไปรษณีย์ 5 หลัก
 * @customfunction
 */
function MDM_POSTAL_FROM_LATLONG(lat, long) {
  if (!lat || !long) return '';

  const cacheKey = ['postal_ll', lat, long].join('|');
  const cached   = _getMapCache(cacheKey);
  if (cached !== null) return cached;

  try {
    const { results: [data = {}] = [] } = Maps.newGeocoder()
      .reverseGeocode(parseFloat(lat), parseFloat(long));

    const components = data.address_components || [];
    const postalComp = components.find(c =>
      c.types && c.types.includes('postal_code')
    );
    const postal = postalComp ? postalComp.long_name : '';
    _setMapCache(cacheKey, postal);
    return postal;
  } catch (e) {
    return '';
  }
}

/**
 * MDM_ADDRESS_COMPONENTS — ดึง ตำบล/อำเภอ/จังหวัด จาก LatLong
 * =MDM_ADDRESS_COMPONENTS(C2, D2, "sublocality")
 *
 * type: "sublocality" = ตำบล/แขวง
 *       "locality"    = เขต/เมือง
 *       "province"    = จังหวัด
 *       "postal_code" = รหัสไปรษณีย์
 *
 * @param {number} lat
 * @param {number} long
 * @param {string} componentType
 * @return {string}
 * @customfunction
 */
function MDM_ADDRESS_COMPONENTS(lat, long, componentType) {
  if (!lat || !long) return '';
  componentType = componentType || 'sublocality';

  const cacheKey = ['addrcomp', lat, long, componentType].join('|');
  const cached   = _getMapCache(cacheKey);
  if (cached !== null) return cached;

  try {
    const { results: [data = {}] = [] } = Maps.newGeocoder()
      .reverseGeocode(parseFloat(lat), parseFloat(long));

    const components = data.address_components || [];
    // ค้นหา component ที่ตรงกับ type
    const TYPE_MAP = {
      'sublocality':  ['sublocality_level_1', 'sublocality'],
      'locality':     ['locality', 'administrative_area_level_2'],
      'province':     ['administrative_area_level_1'],
      'postal_code':  ['postal_code']
    };
    const searchTypes = TYPE_MAP[componentType] || [componentType];
    const found = components.find(c =>
      c.types && searchTypes.some(t => c.types.includes(t))
    );
    const result = found ? (found.long_name || '') : '';
    _setMapCache(cacheKey, result);
    return result;
  } catch (e) {
    return '';
  }
}

// ─── Batch MDM Functions (ใช้ใน Apps Script ไม่ใช่ Formula) ──

/**
 * batchReverseGeocodeUnresolved — Reverse Geocode แถวที่ address ว่าง
 * เรียกจาก runNightlyMaintenance หรือ Manual
 * อัปเดตคอลัมน์ "ชื่อที่อยู่จาก_LatLong" ในชีตต้นทาง
 */
function batchReverseGeocodeUnresolved() {
  const ui = SpreadsheetApp.getUi();
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = ss.getSheetByName(SHEET_NAMES.SOURCE);
  if (!sh) { ui.alert('ไม่พบชีตต้นทาง'); return; }

  const data = sh.getDataRange().getValues();
  const idx  = C_IDX.SOURCE;

  let count = 0;
  const LIMIT = 50; // ทำสูงสุด 50 แถวต่อรอบ (quota)

  for (let i = 1; i < data.length && count < LIMIT; i++) {
    const lat  = parseFloat(data[i][idx.LAT]);
    const long = parseFloat(data[i][idx.LONG]);
    const existingAddr = String(data[i][idx.ADDRESS_LATLONG] || '').trim();

    // ข้ามถ้ามีข้อมูลแล้ว หรือไม่มี LAT/LONG
    if (existingAddr || !lat || !long) continue;

    const address = MDM_CLEAN_ADDRESS(lat, long);
    if (address && !address.startsWith('Error')) {
      sh.getRange(i + 1, idx.ADDRESS_LATLONG + 1).setValue(address);
      count++;
      Utilities.sleep(200); // ป้องกัน rate limit
    }
  }

  writeLog('INFO', '18_GoogleMapsService', 'batchReverseGeocodeUnresolved', null,
    `Reverse Geocoded ${count} แถว`, null);

  ui.alert('✅ Reverse Geocode เสร็จ', `อัปเดต ${count} แถว`, ui.ButtonSet.OK);
}

/**
 * batchFillDistanceFromWarehouse — คำนวณระยะทางจากคลังสำหรับแถวที่ยังว่าง
 */
function batchFillDistanceFromWarehouse() {
  const ui = SpreadsheetApp.getUi();
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = ss.getSheetByName(SHEET_NAMES.SOURCE);
  if (!sh) { ui.alert('ไม่พบชีตต้นทาง'); return; }

  const whLat  = parseFloat(getConfig('WAREHOUSE_LAT')  || '14.165716');
  const whLong = parseFloat(getConfig('WAREHOUSE_LONG') || '100.625296');
  const data   = sh.getDataRange().getValues();
  const idx    = C_IDX.SOURCE;

  let count = 0;
  const LIMIT = 50;

  for (let i = 1; i < data.length && count < LIMIT; i++) {
    const lat  = parseFloat(data[i][idx.LAT]);
    const long = parseFloat(data[i][idx.LONG]);
    const existingDist = data[i][idx.DISTANCE_KM];

    if (existingDist || !lat || !long) continue;

    const km = GOOGLEMAPS_DISTANCE_KM(whLat, whLong, lat, long, 'driving');
    if (km && typeof km === 'number') {
      sh.getRange(i + 1, idx.DISTANCE_KM + 1).setValue(km);
      count++;
      Utilities.sleep(300);
    }
  }

  writeLog('INFO', '18_GoogleMapsService', 'batchFillDistanceFromWarehouse', null,
    `Fill Distance ${count} แถว`, null);

  ui.alert('✅ Fill Distance เสร็จ', `อัปเดต ${count} แถว`, ui.ButtonSet.OK);
}

// ─── Private Math ─────────────────────────────────────────────

/**
 * _haversineM — Haversine distance (เมตร) ระหว่าง 2 จุด
 */
function _haversineM(lat1, lon1, lat2, lon2) {
  const R = 6371000;
  const toRad = x => x * Math.PI / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.asin(Math.sqrt(a));
}