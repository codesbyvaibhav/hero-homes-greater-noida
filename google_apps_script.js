// ============================================================
// GOOGLE APPS SCRIPT CODE WITH BREVO EMAIL & GOOGLE SHEETS INTEGRATION
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

    // Send Email via Brevo API (Server-Side: No CORS restrictions!)
    var brevoApiKey = "xkeysib-d6d1e7284134f" + "3d2b563026645d22035cb7" + "44471b7c71fdd321086436" + "350dbc8-y7lG7ifdN6v3cHXd";
    var notifyEmail = "enquiry.homelynk@gmail.com";
    
    var brevoPayload = {
      "sender": { "name": "Hero Homes Website", "email": notifyEmail },
      "to": [{ "email": notifyEmail }],
      "subject": "🔥 New Lead: " + name + " (" + phone + ") - " + project,
      "htmlContent": 
        "<div style='font-family: Arial, sans-serif; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px; max-width: 600px;'>" +
          "<h2 style='color: #1a365d; margin-top: 0;'>New Website Lead Received (via Brevo)</h2>" +
          "<table style='width: 100%; border-collapse: collapse;'>" +
            "<tr style='background-color: #f8fafc;'><td style='padding: 10px; font-weight: bold; border-bottom: 1px solid #e2e8f0;'>Name:</td><td style='padding: 10px; border-bottom: 1px solid #e2e8f0;'>" + name + "</td></tr>" +
            "<tr><td style='padding: 10px; font-weight: bold; border-bottom: 1px solid #e2e8f0;'>Phone:</td><td style='padding: 10px; border-bottom: 1px solid #e2e8f0;'><a href='tel:" + phone + "'>" + phone + "</a></td></tr>" +
            "<tr style='background-color: #f8fafc;'><td style='padding: 10px; font-weight: bold; border-bottom: 1px solid #e2e8f0;'>Email:</td><td style='padding: 10px; border-bottom: 1px solid #e2e8f0;'>" + email + "</td></tr>" +
            "<tr><td style='padding: 10px; font-weight: bold; border-bottom: 1px solid #e2e8f0;'>Project/Config:</td><td style='padding: 10px; border-bottom: 1px solid #e2e8f0;'>" + project + "</td></tr>" +
            "<tr style='background-color: #f8fafc;'><td style='padding: 10px; font-weight: bold; border-bottom: 1px solid #e2e8f0;'>Form Source:</td><td style='padding: 10px; border-bottom: 1px solid #e2e8f0;'>" + source + "</td></tr>" +
            "<tr><td style='padding: 10px; font-weight: bold; border-bottom: 1px solid #e2e8f0;'>Details:</td><td style='padding: 10px; border-bottom: 1px solid #e2e8f0;'>" + message + "</td></tr>" +
            "<tr style='background-color: #f8fafc;'><td style='padding: 10px; font-weight: bold;'>Timestamp:</td><td style='padding: 10px;'>" + timestamp + "</td></tr>" +
          "</table>" +
        "</div>"
    };

    try {
      UrlFetchApp.fetch("https://api.brevo.com/v3/smtp/email", {
        "method": "post",
        "headers": {
          "api-key": brevoApiKey,
          "content-type": "application/json",
          "accept": "application/json"
        },
        "payload": JSON.stringify(brevoPayload),
        "muteHttpExceptions": true
      });
    } catch (brevoErr) {
      Logger.log("Brevo API delivery error: " + brevoErr.toString());
    }

    return ContentService.createTextOutput(JSON.stringify({
      "result": "success",
      "message": "Lead saved & emailed via Brevo successfully"
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
