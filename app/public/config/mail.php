<?php
if (!defined('KRYPTON_APP')) {
    http_response_code(403);
    header('Content-Type: text/plain; charset=utf-8');
    echo 'Forbidden';
    exit;
}
return [
    'smtp_host'       => 'smtp.gmail.com',
    'smtp_port'       => 587,
    'smtp_encryption' => 'tls',
    'smtp_username'   => 'codenamesilver@gmail.com',
    'smtp_password'   => 'rxcmuwloehsvfyag',
    'smtp_timeout'    => 20,
    'from_email'      => 'codenamesilver@gmail.com',
    'from_name'       => 'Krypton Energy Website',
    'to_email'        => 'info@kryptonenergy.in',
    'to_name'         => 'Krypton Energy',
    'subject'         => 'New Lead from Website',
];