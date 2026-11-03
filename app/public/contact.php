<?php
declare(strict_types=1);

use PHPMailer\PHPMailer\PHPMailer;

define('KRYPTON_APP', true);

ini_set('display_errors', '0');
ini_set('log_errors', '1');
error_reporting(E_ALL);

require_once __DIR__ . '/vendor/phpmailer/src/Exception.php';
require_once __DIR__ . '/vendor/phpmailer/src/PHPMailer.php';
require_once __DIR__ . '/vendor/phpmailer/src/SMTP.php';

$config = require __DIR__ . '/config/mail.php';

date_default_timezone_set('Asia/Kolkata');

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, X-Requested-With, Accept');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'message' => 'Method not allowed.']);
    exit;
}

// Read JSON body or form data
$rawBody = file_get_contents('php://input');
$data = json_decode($rawBody, true);
if (!is_array($data)) {
    $data = $_POST;
}

$name = trim((string) ($data['name'] ?? ''));
$phone = trim((string) ($data['phone'] ?? ''));
$email = trim((string) ($data['email'] ?? ''));
$city = trim((string) ($data['city'] ?? ''));
$type = trim((string) ($data['type'] ?? 'Residential'));

$errors = [];
if (mb_strlen($name) < 2) $errors['name'] = 'Name is required.';
if ($phone === '' || strlen(preg_replace('/\D+/', '', $phone)) < 9) $errors['phone'] = 'Valid phone number required.';
if ($email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) $errors['email'] = 'Valid email required.';
if ($city === '') $errors['city'] = 'City is required.';

if ($errors) {
    http_response_code(422);
    echo json_encode(['ok' => false, 'message' => 'Please check the highlighted fields.', 'errors' => $errors]);
    exit;
}

// Handle file upload (electricity bill)
$billAttachment = null;
$billAttachmentName = null;
if (isset($_FILES['bill']) && is_array($_FILES['bill']) && ($_FILES['bill']['error'] ?? UPLOAD_ERR_NO_FILE) !== UPLOAD_ERR_NO_FILE) {
    $file = $_FILES['bill'];
    if (($file['error'] ?? UPLOAD_ERR_OK) === UPLOAD_ERR_OK && ($file['size'] ?? 0) <= 1024 * 1024) {
        $allowedExt = ['pdf', 'jpg', 'jpeg', 'png'];
        $ext = strtolower(pathinfo($file['name'] ?? '', PATHINFO_EXTENSION));
        if (in_array($ext, $allowedExt, true) && is_uploaded_file($file['tmp_name'])) {
            $billAttachment = $file['tmp_name'];
            $billAttachmentName = $file['name'];
        }
    }
}

// Build email
$rows = [
    'Full Name' => $name,
    'Phone Number' => $phone,
    'Email Address' => $email,
    'City' => $city,
    'Looking for' => $type,
    'Electricity Bill' => $billAttachmentName !== null ? $billAttachmentName . ' (attached)' : 'Not uploaded',
];

$html = '<html><body style="margin:0;padding:24px;background:#f6f4ee;font-family:Segoe UI,Helvetica,Arial,sans-serif;color:#1f2937;">'
    . '<div style="max-width:640px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e5e7eb;">'
    . '<div style="background:#1e222a;padding:20px 24px;">'
    . '<div style="color:#e4d18e;font-size:12px;letter-spacing:2px;text-transform:uppercase;">Krypton Energy</div>'
    . '<div style="color:#ffffff;font-size:20px;font-weight:700;margin-top:4px;">New Lead from Website</div>'
    . '</div>'
    . '<div style="padding:24px;">'
    . '<p style="margin:0 0 16px;font-size:14px;color:#4b5563;">A visitor submitted the quote form on the website.</p>'
    . '<table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;font-size:14px;">';

foreach ($rows as $label => $value) {
    $html .= '<tr>'
        . '<td style="padding:10px 12px;border-bottom:1px solid #eef0f3;width:42%;color:#6b7280;vertical-align:top;">'
        . htmlspecialchars($label, ENT_QUOTES, 'UTF-8') . '</td>'
        . '<td style="padding:10px 12px;border-bottom:1px solid #eef0f3;color:#111827;font-weight:600;vertical-align:top;">'
        . nl2br(htmlspecialchars((string)$value, ENT_QUOTES, 'UTF-8')) . '</td>'
        . '</tr>';
}

$html .= '</table></div></div></body></html>';

$text = "New Lead from Website\n\n";
foreach ($rows as $label => $value) {
    $text .= $label . ': ' . $value . "\n";
}

// Send email
try {
    $mail = new PHPMailer(true);
    $mail->isSMTP();
    $mail->Host = $config['smtp_host'];
    $mail->SMTPAuth = true;
    $mail->Username = $config['smtp_username'];
    $mail->Password = $config['smtp_password'];
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = (int) $config['smtp_port'];
    $mail->Timeout = (int) $config['smtp_timeout'];
    $mail->CharSet = 'UTF-8';

    $mail->setFrom($config['from_email'], $config['from_name']);
    $mail->addAddress($config['to_email'], $config['to_name']);
    $mail->addReplyTo($email, $name);

    if ($billAttachment !== null && $billAttachmentName !== null) {
        $mail->addAttachment($billAttachment, $billAttachmentName);
    }

    $mail->isHTML(true);
    $mail->Subject = $config['subject'];
    $mail->Body = $html;
    $mail->AltBody = $text;

    $mail->send();
} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'message' => 'Failed to send email. Please try again or email info@kryptonenergy.in directly.']);
    exit;
}

echo json_encode(['ok' => true, 'message' => 'Thank you! Your request has been received. Our team will contact you shortly.']);