/**
 * Forwards a lead submission to the CRM API endpoint.
 * Supports Sell.Do CRM JSON API and generic JSON REST webhooks.
 * @param {Object} lead - Sanitized lead data
 * @param {Object} env - Cloudflare Environment secrets
 * @returns {Promise<{success: boolean, responseText?: string, error?: string}>}
 */
export async function submitToCrm(lead, env) {
  // Use Sell.Do JSON API URL from environment, or fallback to the standard endpoint
  const crmUrl = env.CRM_API_URL || 'https://app.sell.do/api/leads/create.json';
  
  // Read key and SRD securely from variables. No hardcoded credentials.
  const sellDoApiKey = env.SELL_DO_API_KEY || env.CRM_API_KEY;
  const srdCode = env.SELL_DO_SRD;

  if (!crmUrl) {
    console.warn('[CRM Helper] CRM_API_URL is not set. Skipping CRM forward.');
    return { success: true, message: 'CRM endpoint is disabled. Skipping submission.' };
  }

  // ==========================================
  // NATIVE SELL.DO JSON API INTEGRATION
  // ==========================================
  if (crmUrl.includes('sell.do') || crmUrl.includes('selldo')) {
    console.log('[CRM Helper] Formatting payload for Sell.Do leads/create.json API.');

    if (!sellDoApiKey) {
      console.error('[CRM Helper] SELL_DO_API_KEY/CRM_API_KEY environment variable is missing.');
      return { success: false, error: 'Sell.Do API Key is not configured on the server.' };
    }

    if (!srdCode) {
      console.error('[CRM Helper] SELL_DO_SRD environment variable is missing.');
      return { success: false, error: 'Sell.Do SRD Code is not configured on the server.' };
    }

    // Build the exact nested payload structure required by Sell.Do
    const payload = {
      sell_do: {
        analytics: {
          utm_source: lead.utm_source || '',
          utm_medium: lead.utm_medium || '',
          utm_campaign: lead.utm_campaign || '',
          utm_term: lead.utm_term || '',
          utm_content: lead.utm_content || ''
        },
        campaign: {
          srd: srdCode
        },
        form: {
          requirement: {
            property_type: 'flat'
          },
          custom: {},
          note: {
            content: `Project Preference: ${lead.project_name || 'Hero Homes Greater Noida'}
Configuration: ${lead.config || 'All Sizes'}
User Comments: ${lead.message || 'No additional comments.'}
Form Source: ${lead.source || 'Website Form'}
Source URL: ${lead.source_url || ''}`
          },
          lead: {
            name: lead.name,
            phone: lead.phone,
            email: lead.email === 'N/A' ? '' : lead.email
          }
        }
      },
      api_key: sellDoApiKey
    };

    try {
      const response = await fetch(crmUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const responseText = await response.text();

      if (!response.ok) {
        throw new Error(`Sell.Do API HTTP error ${response.status}: ${responseText}`);
      }

      // Check if response contains Sell.Do success status
      let responseJson;
      try {
        responseJson = JSON.parse(responseText);
      } catch (e) {
        console.warn('[CRM Helper] Failed to parse Sell.Do response as JSON:', responseText);
      }

      // Check for actual populated errors (ignoring empty arrays or objects)
      if (responseJson && responseJson.error) {
        const err = responseJson.error;
        let hasError = false;
        let errorMessage = '';

        if (typeof err === 'string' && err.trim() !== '') {
          hasError = true;
          errorMessage = err;
        } else if (Array.isArray(err) && err.length > 0) {
          hasError = true;
          errorMessage = JSON.stringify(err);
        } else if (typeof err === 'object' && err !== null && Object.keys(err).length > 0) {
          hasError = true;
          errorMessage = JSON.stringify(err);
        }

        if (hasError) {
          throw new Error(`Sell.Do Error: ${errorMessage}`);
        }
      }

      return { success: true, responseText };
    } catch (err) {
      console.error('[CRM Helper] Sell.Do integration failed:', err);
      return { success: false, error: err.message || 'Unknown Sell.Do API error.' };
    }
  }

  // ==========================================
  // STANDARD JSON WEBHOOK CAPTURE (Zoho / HubSpot / Webhooks)
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

  const genericApiKey = env.CRM_API_KEY;
  if (genericApiKey) {
    if (genericApiKey.startsWith('Bearer ') || genericApiKey.startsWith('Token ')) {
      headers['Authorization'] = genericApiKey;
    } else {
      headers['Authorization'] = `Bearer ${genericApiKey}`;
      headers['X-API-KEY'] = genericApiKey;
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
