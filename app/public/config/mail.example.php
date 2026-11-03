<?php
if (!defined('KRYPTON_APP')) {
    http_response_code(403);
    header('Content-Type: text/plain; charset=utf-8');
    echo 'Forbidden';
    exit;
}
return [
    'smtp_host'       => 'smtp.hostinger.com',
    'smtp_port'       => 465,
    'smtp_encryption' => 'ssl',
    'smtp_username'   => 'your-email@yourdomain.com',
    'smtp_password'   => 'your-email-password',
    'smtp_timeout'    => 20,
    'from_email'      => 'your-email@yourdomain.com',
    'from_name'       => 'Krypton Energy Website',
    'to_email'        => 'info@kryptonenergy.in',
    'to_name'         => 'Krypton Energy',
    'subject'         => 'New Lead from Website',
];