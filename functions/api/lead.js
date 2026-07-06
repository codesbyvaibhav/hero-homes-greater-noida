import { validateLead } from '../_utils/validation.js';
import { checkRateLimit } from '../_utils/rateLimiter.js';
import { sendLeadEmail } from '../_utils/email.js';
import { submitToCrm } from '../_utils/crm.js';

export async function onRequest(context) {
  // CORS Preflight headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle Options preflight
  if (context.request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  // Only allow POST submissions
  if (context.request.method !== 'POST') {
    return new Response(JSON.stringify({ success: false, message: 'Method Not Allowed' }), {
      status: 450,
      headers: corsHeaders
    });
  }

  try {
    // 1. IP-Based Rate Limiting
    const ip = context.request.headers.get('CF-Connecting-IP') || '127.0.0.1';
    const rateCheck = await checkRateLimit(ip);
    if (rateCheck.isRateLimited) {
      return new Response(JSON.stringify({
        success: false,
        message: 'Too many submissions. Please wait a minute and try again.'
      }), { status: 429, headers: corsHeaders });
    }

    // 2. Parse payload
    const data = await context.request.json();
    
    // 3. Server-side inputs and CAPTCHA validation
    const validationResult = validateLead(data);
    if (!validationResult.isValid) {
      return new Response(JSON.stringify({
        success: false,
        message: validationResult.errors.join(' ')
      }), { status: 400, headers: corsHeaders });
    }

    // Prepare lead dataset
    const lead = {
      name: data.name,
      phone: data.phone,
      email: data.email || 'N/A',
      project_name: data.project_name || 'Hero Homes Greater Noida',
      config: data.config || 'All Sizes',
      message: data.message || 'N/A',
      source: data.source || 'Website Form',
      source_url: data.source_url || context.request.headers.get('Referer') || 'https://herohomenoida.com',
      utm_source: data.utm_source || '',
      utm_medium: data.utm_medium || '',
      utm_campaign: data.utm_campaign || '',
      timestamp: new Date().toISOString()
    };

    // 4. Background tasks execution (Email + CRM posting)
    // context.waitUntil runs tasks in worker thread background after responding, preventing API lags.
    context.waitUntil((async () => {
      console.log(`[Lead Worker] Processing background tasks for lead: ${lead.name}`);
      
      const emailPromise = sendLeadEmail(lead, context.env);
      const crmPromise = submitToCrm(lead, context.env);

      // Run both concurrently
      const [emailResult, crmResult] = await Promise.allSettled([emailPromise, crmPromise]);

      if (emailResult.status === 'fulfilled' && emailResult.value.success) {
        console.log(`[Lead Worker] Email notification sent: ${emailResult.value.messageId}`);
      } else {
        console.error(`[Lead Worker] Email delivery failed:`, emailResult.reason || emailResult.value?.error);
      }

      if (crmResult.status === 'fulfilled' && crmResult.value.success) {
        console.log(`[Lead Worker] CRM forward successful`);
      } else {
        console.error(`[Lead Worker] CRM forward failed:`, crmResult.reason || crmResult.value?.error);
      }
    })());

    // 5. Instantly return success feedback to user
    return new Response(JSON.stringify({
      success: true,
      message: 'Thank you! Your enquiry has been received. Our sales team will call you shortly.'
    }), { status: 200, headers: corsHeaders });

  } catch (error) {
    console.error('[API Error] Main controller exception:', error);
    return new Response(JSON.stringify({
      success: false,
      message: 'A system error occurred. Please contact us directly.'
    }), { status: 500, headers: corsHeaders });
  }
}
export async function onRequestPost(context) {
  return onRequest(context);
}
export async function onRequestOptions(context) {
  return onRequest(context);
}
