<?php
declare(strict_types=1);

require_once __DIR__ . '/content.php';

/**
 * Cover and inline image storage.
 *
 * Files are validated by content, never by the name the browser sent, and are
 * written under uploads/YYYY/MM/. Nothing here depends on GD.
 */

const UPLOAD_MAX_BYTES = 4 * 1024 * 1024;

/** @return array{ok: bool, path: ?string, error: ?string} */
function upload_store(array $file, string $slug): array
{
    $error = (int) ($file['error'] ?? UPLOAD_ERR_NO_FILE);

    if ($error !== UPLOAD_ERR_OK) {
        return upload_fail(upload_error_message($error));
    }

    $tmp = (string) ($file['tmp_name'] ?? '');
    if ($tmp === '' || !is_file($tmp)) {
        return upload_fail('No uploaded file was received.');
    }

    if (PHP_SAPI !== 'cli' && !is_uploaded_file($tmp)) {
        return upload_fail('The file did not arrive through an upload.');
    }

    $size = (int) ($file['size'] ?? filesize($tmp));
    if ($size <= 0) {
        return upload_fail('The file is empty.');
    }

    if ($size > UPLOAD_MAX_BYTES) {
        return upload_fail('Images must be 4 MB or smaller.');
    }

    $mime = upload_mime($tmp);
    $extensions = [
        'image/jpeg' => 'jpg',
        'image/png'  => 'png',
        'image/webp' => 'webp',
    ];

    if (!isset($extensions[$mime])) {
        return upload_fail('Only JPEG, PNG, and WebP images are allowed.');
    }

    $info = @getimagesize($tmp);
    if ($info === false || !isset($info['mime']) || !isset($extensions[(string) $info['mime']])) {
        return upload_fail('That file is not a readable image.');
    }

    $relativeDir = 'uploads/' . date('Y/m');
    $absoluteDir = __DIR__ . '/../' . $relativeDir;

    if (!is_dir($absoluteDir) && !mkdir($absoluteDir, 0775, true) && !is_dir($absoluteDir)) {
        return upload_fail('The upload folder could not be created.');
    }

    $name = bin2hex(random_bytes(8)) . '-' . slugify($slug) . '.' . $extensions[$mime];
    $absolute = $absoluteDir . '/' . $name;

    if (!move_uploaded_file($tmp, $absolute)) {
        if (!@rename($tmp, $absolute)) {
            return upload_fail('The image could not be saved.');
        }
    }

    return [
        'ok'    => true,
        'path'  => $relativeDir . '/' . $name,
        'error' => null,
    ];
}

function upload_delete(?string $relativePath): void
{
    if ($relativePath === null || $relativePath === '') {
        return;
    }

    $relative = ltrim(str_replace('\\', '/', $relativePath), '/');
    if (!str_starts_with($relative, 'uploads/')) {
        return;
    }

    $base = realpath(__DIR__ . '/../uploads');
    $absolute = realpath(__DIR__ . '/../' . $relative);

    if ($base === false || $absolute === false) {
        return;
    }

    if (!str_starts_with($absolute, $base . DIRECTORY_SEPARATOR) || !is_file($absolute)) {
        return;
    }

    @unlink($absolute);
}

/** @return array{ok: false, path: null, error: string} */
function upload_fail(string $message): array
{
    return ['ok' => false, 'path' => null, 'error' => $message];
}

function upload_mime(string $path): string
{
    if (class_exists('finfo')) {
        $finfo = new finfo(FILEINFO_MIME_TYPE);
        $mime = $finfo->file($path);
        if (is_string($mime) && $mime !== '') {
            return $mime;
        }
    }

    $info = @getimagesize($path);

    return is_array($info) && isset($info['mime']) ? (string) $info['mime'] : '';
}

function upload_error_message(int $error): string
{
    return match ($error) {
        UPLOAD_ERR_INI_SIZE, UPLOAD_ERR_FORM_SIZE => 'Images must be 4 MB or smaller.',
        UPLOAD_ERR_PARTIAL => 'The upload was interrupted. Try again.',
        UPLOAD_ERR_NO_FILE => 'Choose an image first.',
        default => 'The image could not be uploaded.',
    };
}
