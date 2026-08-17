// ============================================================
// GOOGLE APPS SCRIPT CODE FOR GOOGLE SHEETS & INSTANT EMAIL NOTIFICATIONS
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

    // Send Instant Email Notification directly to your email
    var notifyEmail = "enquiry.homelynk@gmail.com";
    var subject = "🔥 New Lead: " + name + " (" + phone + ") - " + project;
    var htmlContent = 
      "<div style='font-family: Arial, sans-serif; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px; max-width: 600px;'>" +
        "<h2 style='color: #1a365d; margin-top: 0;'>New Website Enquiry Received</h2>" +
        "<table style='width: 100%; border-collapse: collapse;'>" +
          "<tr style='background-color: #f8fafc;'><td style='padding: 10px; font-weight: bold; border-bottom: 1px solid #e2e8f0;'>Name:</td><td style='padding: 10px; border-bottom: 1px solid #e2e8f0;'>" + name + "</td></tr>" +
          "<tr><td style='padding: 10px; font-weight: bold; border-bottom: 1px solid #e2e8f0;'>Phone:</td><td style='padding: 10px; border-bottom: 1px solid #e2e8f0;'><a href='tel:" + phone + "'>" + phone + "</a></td></tr>" +
          "<tr style='background-color: #f8fafc;'><td style='padding: 10px; font-weight: bold; border-bottom: 1px solid #e2e8f0;'>Email:</td><td style='padding: 10px; border-bottom: 1px solid #e2e8f0;'>" + email + "</td></tr>" +
          "<tr><td style='padding: 10px; font-weight: bold; border-bottom: 1px solid #e2e8f0;'>Project/Config:</td><td style='padding: 10px; border-bottom: 1px solid #e2e8f0;'>" + project + "</td></tr>" +
          "<tr style='background-color: #f8fafc;'><td style='padding: 10px; font-weight: bold; border-bottom: 1px solid #e2e8f0;'>Form Source:</td><td style='padding: 10px; border-bottom: 1px solid #e2e8f0;'>" + source + "</td></tr>" +
          "<tr><td style='padding: 10px; font-weight: bold; border-bottom: 1px solid #e2e8f0;'>Details:</td><td style='padding: 10px; border-bottom: 1px solid #e2e8f0;'>" + message + "</td></tr>" +
          "<tr style='background-color: #f8fafc;'><td style='padding: 10px; font-weight: bold;'>Timestamp:</td><td style='padding: 10px;'>" + timestamp + "</td></tr>" +
        "</table>" +
      "</div>";

    try {
      MailApp.sendEmail({
        to: notifyEmail,
        subject: subject,
        htmlBody: htmlContent
      });
    } catch (mailErr) {
      Logger.log("Email notification error: " + mailErr.toString());
    }

    return ContentService.createTextOutput(JSON.stringify({
      "result": "success",
      "message": "Lead saved & emailed successfully"
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
