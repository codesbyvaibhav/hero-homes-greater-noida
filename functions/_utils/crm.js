/**
 * Forwards a lead submission to the CRM API endpoint
 * Supports standard JSON REST formats (Zoho, HubSpot) and Sell.Do URL-encoded capture.
 * @param {Object} lead - Sanitized lead data
 * @param {Object} env - Cloudflare Environment secrets
 * @returns {Promise<{success: boolean, responseText?: string, error?: string}>}
 */
export async function submitToCrm(lead, env) {
  const crmUrl = env.CRM_API_URL;
  const crmKey = env.CRM_API_KEY; // Can hold API Key or Sell.Do SRD Code

  if (!crmUrl) {
    console.warn('[CRM Helper] CRM_API_URL is not set. Skipping CRM forward.');
    return { success: true, message: 'CRM endpoint is disabled. Skipping submission.' };
  }

  // ==========================================
  // NATIVE SELL.DO PUBLIC CAPTURE ROUTING
  // ==========================================
  if (crmUrl.includes('sell.do')) {
    console.log('[CRM Helper] Formatting payload for Sell.Do URL-encoded API.');
    
    // Retrieve SRD from environment variables, fallback to user's provided default
    const srdCode = env.SELL_DO_SRD || crmKey || '6a4f77fe58f1e71b0c00dcde';

    const payload = new URLSearchParams();
    payload.append('srd', srdCode);
    payload.append('sell_do[form][lead][name]', lead.name);
    payload.append('sell_do[form][lead][email]', lead.email === 'N/A' ? '' : lead.email);
    payload.append('sell_do[form][lead][phone]', lead.phone);

    // Build the consolidated lead note details
    const note = `Project: ${lead.project_name || 'Hero Homes Greater Noida'}
Configuration: ${lead.config || 'All Sizes'}
Message: ${lead.message || 'N/A'}
Form Source: ${lead.source || 'Website Form'}
Source URL: ${lead.source_url || ''}
UTM Source: ${lead.utm_source || ''}
UTM Medium: ${lead.utm_medium || ''}
UTM Campaign: ${lead.utm_campaign || ''}
Submitted: ${lead.timestamp || new Date().toISOString()}`;
    
    payload.append('sell_do[form][note]', note);

    try {
      const response = await fetch(crmUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: payload.toString()
      });

      const responseText = await response.text();

      if (!response.ok) {
        throw new Error(`Sell.Do API HTTP error ${response.status}: ${responseText}`);
      }

      return { success: true, responseText };
    } catch (err) {
      console.error('[CRM Helper] Sell.Do capture failed:', err);
      return { success: false, error: err.message || 'Unknown Sell.Do error.' };
    }
  }

  // ==========================================
  // STANDARD JSON API CAPTURE (Zoho / HubSpot / Webhooks)
  // ==========================================
  const payload = {
    first_name: lead.name,
    last_name: '',
    phone: lead.phone,
    email: lead.email === 'N/A' ? '' : lead.email,
    project_name: lead.project_name || 'Hero Homes Greater Noida',
    configuration: lead.config || 'All Sizes',
    notes: lead.message || 'No additional comments.',
    lead_source: lead.source || 'Website Form',
    source_url: lead.source_url,
    utm_source: lead.utm_source || '',
    utm_medium: lead.utm_medium || '',
    utm_campaign: lead.utm_campaign || '',
    created_at: lead.timestamp || new Date().toISOString()
  };

  // Split name if CRM requires split first/last names
  if (lead.name) {
    const parts = lead.name.trim().split(/\s+/);
    if (parts.length > 1) {
      payload.first_name = parts[0];
      payload.last_name = parts.slice(1).join(' ');
    } else {
      payload.first_name = lead.name;
      payload.last_name = 'Customer';
    }
  }

  const headers = {
    'Content-Type': 'application/json'
  };

  if (crmKey) {
    if (crmKey.startsWith('Bearer ') || crmKey.startsWith('Token ')) {
      headers['Authorization'] = crmKey;
    } else {
      headers['Authorization'] = `Bearer ${crmKey}`;
      headers['X-API-KEY'] = crmKey;
    }
  }

  try {
    const response = await fetch(crmUrl, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(payload),
    });

    const responseText = await response.text();

    if (!response.ok) {
      throw new Error(`CRM API HTTP error ${response.status}: ${responseText}`);
    }

    return { success: true, responseText };
  } catch (err) {
    console.error('[CRM Helper] CRM submission failed:', err);
    return { success: false, error: err.message || 'Unknown CRM error.' };
  }
}
