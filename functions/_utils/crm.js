/**
 * Forwards a lead submission to the CRM API endpoint
 * Supports popular CRM payload formats (adaptable via CRM_API_URL and headers)
 * @param {Object} lead - Sanitized lead data
 * @param {Object} env - Cloudflare Environment secrets
 * @returns {Promise<{success: boolean, responseText?: string, error?: string}>}
 */
export async function submitToCrm(lead, env) {
  const crmUrl = env.CRM_API_URL;
  const crmKey = env.CRM_API_KEY;

  if (!crmUrl) {
    console.warn('[CRM Helper] CRM_API_URL is not set. Skipping CRM forward.');
    return { success: true, message: 'CRM endpoint is disabled. Skipping submission.' };
  }

  // Format standard payload compatible with Zoho / HubSpot webhook / custom formats
  const payload = {
    first_name: lead.name,
    last_name: '', // Standard split if CRM requires last name
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

  // Adjust name format if CRM expects full name combined or split
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

  // Set auth header if API Key/Token is configured
  if (crmKey) {
    // Detect key format (typically Bearer or custom x-api-key)
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
