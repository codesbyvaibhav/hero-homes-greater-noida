/**
 * Sends a lead notification email via the Brevo (Sendinblue) SMTP API.
 * @param {Object} lead - Sanitized lead data
 * @param {Object} env - Cloudflare Environment secrets
 * @returns {Promise<{success: boolean, messageId?: string, error?: string}>}
 */
export async function sendLeadEmail(lead, env) {
  const brevoApiKey = env.BREVO_API_KEY || env.EMAIL_API_KEY;
  const emailTo = env.EMAIL_TO || 'enquiry.homelynk@gmail.com';
  const emailFrom = env.EMAIL_FROM || 'hosting.newdomain@gmail.com';
  const emailFromName = env.EMAIL_FROM_NAME || env.PROJECT_NAME || 'Hero Homes Greater Noida';
  const projectName = env.PROJECT_NAME || lead.project_name || 'Hero Homes Greater Noida';

  if (!brevoApiKey) {
    console.warn('[Email Helper] BREVO_API_KEY is not set. Skipping email notification.');
    return { success: true, message: 'Email helper is disabled. Skipping submission.' };
  }

  const subject = `New Lead: ${projectName} - ${lead.name}`;

  // Build a professionally formatted HTML content body
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; line-height: 1.6; color: #333333; margin: 0; padding: 20px; background-color: #f5f5f5; }
        .container { max-width: 600px; margin: 0 auto; background: #ffffff; padding: 30px; border-radius: 8px; border: 1px solid #e0e0e0; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
        .header { border-bottom: 2px solid #E6332A; padding-bottom: 15px; margin-bottom: 20px; }
        .header h2 { margin: 0; color: #2F2A27; font-size: 22px; }
        .lead-detail-table { width: 100%; border-collapse: collapse; margin-bottom: 25px; }
        .lead-detail-table th { text-align: left; padding: 10px; border-bottom: 1px solid #eeeeee; color: #666666; font-size: 13px; width: 35%; text-transform: uppercase; letter-spacing: 0.5px; }
        .lead-detail-table td { padding: 10px; border-bottom: 1px solid #eeeeee; color: #222222; font-weight: 500; }
        .section-title { font-size: 14px; font-weight: bold; color: #E6332A; text-transform: uppercase; margin: 25px 0 10px 0; border-bottom: 1px solid #e0e0e0; padding-bottom: 5px; }
        .footer { font-size: 12px; color: #999999; border-top: 1px solid #eeeeee; padding-top: 15px; margin-top: 25px; text-align: center; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>New Lead Registered</h2>
          <span style="font-size: 12px; color: #888888;">Project: ${projectName}</span>
        </div>
        
        <table class="lead-detail-table">
          <tr>
            <th>Name</th>
            <td>${lead.name}</td>
          </tr>
          <tr>
            <th>Phone</th>
            <td><a href="tel:${lead.phone}" style="color: #E6332A; text-decoration: none;">${lead.phone}</a></td>
          </tr>
          <tr>
            <th>Email</th>
            <td>${lead.email}</td>
          </tr>
          <tr>
            <th>Configuration</th>
            <td>${lead.config}</td>
          </tr>
          <tr>
            <th>User Comments</th>
            <td>${lead.message || 'N/A'}</td>
          </tr>
        </table>

        <div class="section-title">Traffic &amp; Metadata</div>
        <table class="lead-detail-table">
          <tr>
            <th>IP Address</th>
            <td>${lead.ip || 'N/A'}</td>
          </tr>
          <tr>
            <th>Submission Date</th>
            <td>${lead.timestamp}</td>
          </tr>
          <tr>
            <th>Form Location</th>
            <td>${lead.source}</td>
          </tr>
          <tr>
            <th>Landing URL</th>
            <td style="word-break: break-all; font-size: 12px;">${lead.source_url || 'N/A'}</td>
          </tr>
        </table>

        <div class="section-title">UTM Tracking Parameters</div>
        <table class="lead-detail-table">
          <tr>
            <th>Campaign Source</th>
            <td>${lead.utm_source || 'Direct / Organic'}</td>
          </tr>
          <tr>
            <th>Campaign Medium</th>
            <td>${lead.utm_medium || 'N/A'}</td>
          </tr>
          <tr>
            <th>Campaign Name</th>
            <td>${lead.utm_campaign || 'N/A'}</td>
          </tr>
        </table>

        <div class="footer">
          This is an automated notification from your landing page server.
        </div>
      </div>
    </body>
    </html>
  `;

  const payload = {
    sender: {
      name: emailFromName,
      email: emailFrom
    },
    to: [
      {
        email: emailTo,
        name: 'Sales Manager'
      }
    ],
    subject: subject,
    htmlContent: htmlContent
  };

  try {
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'api-key': brevoApiKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const responseText = await response.text();

    if (!response.ok) {
      throw new Error(`Brevo API HTTP error ${response.status}: ${responseText}`);
    }

    let responseJson;
    try {
      responseJson = JSON.parse(responseText);
    } catch (e) {
      // Safe fallback
    }

    const messageId = responseJson?.messageId || 'sent-success';
    return { success: true, messageId };
  } catch (err) {
    console.error('[Email Helper] Brevo delivery failed:', err);
    return { success: false, error: err.message || 'Unknown Brevo SMTP error.' };
  }
}
