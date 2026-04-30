/**
 * Google Apps Script — attach to your spreadsheet
 *
 * 1. Extensions → Apps Script → paste this file (adjust SHEET_NAME / SPREADSHEET_ID if needed).
 * 2. Project Settings → Script properties → add INGEST_SECRET (same value as GOOGLE_SHEETS_WEB_APP_SECRET in .env).
 * 3. Deploy → New deployment → Type: Web app
 *    - Execute as: Me
 *    - Who has access: Anyone (or restrict and keep secret strong)
 * 4. Copy the Web app URL into GOOGLE_SHEETS_WEB_APP_URL.
 *
 * First row of the sheet should be headers (see appendRow order in doPost).
 */
var SHEET_NAME = "FormResponses";

function doPost(e) {
  try {
    var body = JSON.parse(e.postData.contents);
    var props = PropertiesService.getScriptProperties();
    var expected = props.getProperty("INGEST_SECRET");
    if (expected && body.secret !== expected) {
      return jsonOut({ ok: false, error: "unauthorized" });
    }

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sh = ss.getSheetByName(SHEET_NAME);
    if (!sh) {
      sh = ss.insertSheet(SHEET_NAME);
      sh.appendRow([
        "submittedAt",
        "form",
        "name",
        "email",
        "company",
        "message",
        "phone",
        "employer",
        "jobTitle",
        "specialization",
        "yearsExperience",
        "preferredRole",
        "linkedin",
        "portfolio",
        "notes",
        "resumeFileName",
      ]);
    }

    if (body.form === "contact") {
      sh.appendRow([
        body.submittedAt || "",
        "contact",
        body.name || "",
        body.email || "",
        body.company || "",
        body.message || "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
      ]);
    } else if (body.form === "careers") {
      sh.appendRow([
        body.submittedAt || "",
        "careers",
        body.fullName || "",
        body.email || "",
        "",
        "",
        body.phone || "",
        body.employer || "",
        body.jobTitle || "",
        body.specialization || "",
        body.yearsExperience || "",
        body.preferredRole || "",
        body.linkedin || "",
        body.portfolio || "",
        body.message || "",
        body.resumeFileName || "",
      ]);
    } else {
      return jsonOut({ ok: false, error: "unknown form" });
    }

    return jsonOut({ ok: true });
  } catch (err) {
    return jsonOut({ ok: false, error: String(err) });
  }
}

function jsonOut(obj) {
  var out = ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
  // Apps Script Web App cannot set true HTTP status easily; client checks JSON body.
  return out;
}
