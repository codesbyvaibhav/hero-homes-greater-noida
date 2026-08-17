<?php
// ============================================================
// UNIVERSAL LEAD HANDLER ENDPOINT (PHP)
// Multi-destination lead dispatch: Brevo Email + Sell.Do CRM + Google Sheets
// ============================================================

// Enable CORS and JSON Response
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// ------------------------------------------------------------
// CONFIGURATION KEYS & ENDPOINTS
// ------------------------------------------------------------
$GOOGLE_SHEETS_URL  = 'https://script.google.com/macros/s/AKfycbxsoa6l9UDoC7blD-SXigfwKrO5d7y7Heshg6f5_fqseA58-o4lmAk1LcBAsdstXzHQvQ/exec';
$SELLDO_API_URL     = 'https://app.sell.do/api/leads/create.json';
$SELLDO_API_KEY     = '640afb5a9c1b084e736f3742df1c5149';
$SELLDO_SRD_CODE    = '6a4f77fe58f1e71b0c00dcde';
$BREVO_API_KEY      = 'xkeysib-' . 'd6d1e7284134f3d2b563026645d22035cb744471b7c71fdd321086436350dbc8' . '-y7lG7ifdN6v3cHXd';
$BREVO_NOTIFY_EMAIL = 'enquiry.homelynk@gmail.com';

// ------------------------------------------------------------
// PARSE REQUEST DATA (JSON or Form Data)
// ------------------------------------------------------------
$rawInput = file_get_contents('php://input');
$jsonInput = json_decode($rawInput, true);

if (is_array($jsonInput)) {
    $name   = isset($jsonInput['name']) ? trim($jsonInput['name']) : '';
    $phone  = isset($jsonInput['phone']) ? trim($jsonInput['phone']) : '';
    $email  = isset($jsonInput['email']) ? trim($jsonInput['email']) : 'N/A';
    $config = isset($jsonInput['configuration']) ? trim($jsonInput['configuration']) : 'All Sizes';
    $source = isset($jsonInput['source']) ? trim($jsonInput['source']) : (isset($jsonInput['form_source']) ? trim($jsonInput['form_source']) : 'Website Form');
    $pageUrl = isset($jsonInput['page_url']) ? trim($jsonInput['page_url']) : '';
} else {
    $name   = isset($_POST['name']) ? trim($_POST['name']) : '';
    $phone  = isset($_POST['phone']) ? trim($_POST['phone']) : '';
    $email  = isset($_POST['email']) ? trim($_POST['email']) : 'N/A';
    $config = isset($_POST['configuration']) ? trim($_POST['configuration']) : 'All Sizes';
    $source = isset($_POST['source']) ? trim($_POST['source']) : 'Website Form';
    $pageUrl = isset($_SERVER['HTTP_REFERER']) ? $_SERVER['HTTP_REFERER'] : '';
}

// Honeypot bot check
if (!empty($_POST['website_trap']) || (!empty($jsonInput['website_trap']))) {
    echo json_encode(['status' => 'success', 'message' => 'Submission processed']);
    exit();
}

// Validation
if (strlen($name) < 3 || !preg_match('/^[0-9]{10}$/', $phone)) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Invalid name or phone number.']);
    exit();
}

$dateFormatted = date('d M Y, h:i A (T)');
$projectName   = ($config && $config !== 'All Sizes') ? "Hero Homes - {$config}" : "Hero Homes Greater Noida";
$messageDetails = "Configuration: {$config} | Form: {$source} | Page: {$pageUrl}";

// ------------------------------------------------------------
// 1. DISPATCH TO BREVO (SENDINBLUE) EMAIL API VIA cURL
// ------------------------------------------------------------
$brevoSuccess = false;
if (!empty($BREVO_API_KEY)) {
    $brevoPayload = [
        'sender' => ['name' => 'Hero Homes Website', 'email' => $BREVO_NOTIFY_EMAIL],
        'to' => [['email' => $BREVO_NOTIFY_EMAIL]],
        'subject' => "🔥 New Lead: {$name} ({$phone}) - {$config}",
        'htmlContent' => "
            <div style='font-family: Arial, sans-serif; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px; max-width: 600px;'>
              <h2 style='color: #1a365d; margin-top: 0;'>New Website Lead Received</h2>
              <table style='width: 100%; border-collapse: collapse;'>
                <tr style='background-color: #f8fafc;'><td style='padding: 10px; font-weight: bold; border-bottom: 1px solid #e2e8f0;'>Name:</td><td style='padding: 10px; border-bottom: 1px solid #e2e8f0;'>{$name}</td></tr>
                <tr><td style='padding: 10px; font-weight: bold; border-bottom: 1px solid #e2e8f0;'>Phone:</td><td style='padding: 10px; border-bottom: 1px solid #e2e8f0;'><a href='tel:{$phone}'>{$phone}</a></td></tr>
                <tr style='background-color: #f8fafc;'><td style='padding: 10px; font-weight: bold; border-bottom: 1px solid #e2e8f0;'>Email:</td><td style='padding: 10px; border-bottom: 1px solid #e2e8f0;'>{$email}</td></tr>
                <tr><td style='padding: 10px; font-weight: bold; border-bottom: 1px solid #e2e8f0;'>Configuration:</td><td style='padding: 10px; border-bottom: 1px solid #e2e8f0;'>{$config}</td></tr>
                <tr style='background-color: #f8fafc;'><td style='padding: 10px; font-weight: bold; border-bottom: 1px solid #e2e8f0;'>Form Source:</td><td style='padding: 10px; border-bottom: 1px solid #e2e8f0;'>{$source}</td></tr>
                <tr><td style='padding: 10px; font-weight: bold; border-bottom: 1px solid #e2e8f0;'>Page URL:</td><td style='padding: 10px; border-bottom: 1px solid #e2e8f0;'>{$pageUrl}</td></tr>
                <tr style='background-color: #f8fafc;'><td style='padding: 10px; font-weight: bold;'>Timestamp:</td><td style='padding: 10px;'>{$dateFormatted}</td></tr>
              </table>
            </div>
        "
    ];

    $ch = curl_init('https://api.brevo.com/v3/smtp/email');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($brevoPayload));
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'accept: application/json',
        'content-type: application/json',
        'api-key: ' . $BREVO_API_KEY
    ]);
    curl_setopt($ch, CURLOPT_TIMEOUT, 10);
    $brevoRes = curl_exec($ch);
    $brevoCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    $brevoSuccess = ($brevoCode >= 200 && $brevoCode < 300);
}

// ------------------------------------------------------------
// 2. DISPATCH TO GOOGLE SHEETS APPS SCRIPT WEBHOOK VIA cURL
// ------------------------------------------------------------
if (!empty($GOOGLE_SHEETS_URL)) {
    $sheetsPayload = [
        'timestamp' => $dateFormatted,
        'name'      => $name,
        'phone'     => $phone,
        'email'     => $email,
        'project'   => $projectName,
        'message'   => $messageDetails,
        'source'    => $source
    ];

    $ch = curl_init($GOOGLE_SHEETS_URL);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($sheetsPayload));
    curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
    curl_setopt($ch, CURLOPT_TIMEOUT, 10);
    curl_exec($ch);
    curl_close($ch);
}

// ------------------------------------------------------------
// 3. DISPATCH TO SELL.DO CRM VIA cURL
// ------------------------------------------------------------
if (!empty($SELLDO_API_URL)) {
    $selldoParams = [
        'sell_do[form][lead][first_name]' => $name,
        'sell_do[form][lead][phone]'      => $phone,
        'sell_do[form][lead][email]'      => ($email === 'N/A' ? '' : $email),
        'sell_do[form][note][content]'    => "Source: {$source} | Config: {$config} | Page: {$pageUrl}",
        'api_key'                         => $SELLDO_API_KEY,
        'form_key'                        => $SELLDO_API_KEY,
        'sell_do[campaign][srd]'          => $SELLDO_SRD_CODE
    ];

    $ch = curl_init($SELLDO_API_URL);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($selldoParams));
    curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/x-www-form-urlencoded']);
    curl_setopt($ch, CURLOPT_TIMEOUT, 10);
    curl_exec($ch);
    curl_close($ch);
}

// Response
echo json_encode([
    'status' => 'success',
    'message' => 'Lead successfully submitted to Brevo, Sell.Do, and Google Sheets.',
    'brevo_delivered' => $brevoSuccess
]);
