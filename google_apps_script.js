// ============================================================
// GOOGLE APPS SCRIPT CODE FOR GOOGLE SHEETS LEAD INTEGRATION
// Copy & paste this code into your Google Apps Script editor:
// Extensions -> Apps Script inside your Google Sheet
// ============================================================

function doPost(e) {
  var lock = LockService.getScriptLock();
  // Wait up to 10 seconds for a lock to prevent concurrent write overlap errors
  lock.tryLock(10000); 

  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var rawData = e.postData.contents;
    var data = JSON.parse(rawData);

    // Capture standard lead fields
    var timestamp = data.timestamp || new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
    var name = data.name || "";
    var phone = data.phone || "";
    var email = data.email || "";
    var project = data.project || "";
    var message = data.message || "";
    var source = data.source || "";

    // Append to sheet
    sheet.appendRow([timestamp, name, phone, email, project, message, source]);

    return ContentService.createTextOutput(JSON.stringify({
      "result": "success",
      "message": "Lead saved successfully"
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      "result": "error",
      "error": error.toString()
    })).setMimeType(ContentService.MimeType.JSON);

  } finally {
    lock.releaseLock();
  }
}

// Enable CORS Preflight request handling
function doOptions(e) {
  return ContentService.createTextOutput("")
    .setMimeType(ContentService.MimeType.TEXT);
}
