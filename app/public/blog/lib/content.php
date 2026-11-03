<?php
declare(strict_types=1);

/**
 * Content helpers: slugs, HTML sanitising, excerpts, reading time.
 *
 * These functions are pure except unique_slug(), which asks the database.
 */

/**
 * Turn a title into a URL slug.
 */
function slugify(string $title): string
{
    $text = trim($title);

    // Common Latin accents, so titles written in French/Spanish still slug well
    // even when iconv transliteration is unavailable.
    $text = strtr($text, [
        'á' => 'a', 'à' => 'a', 'â' => 'a', 'ä' => 'a', 'ã' => 'a', 'å' => 'a',
        'é' => 'e', 'è' => 'e', 'ê' => 'e', 'ë' => 'e',
        'í' => 'i', 'ì' => 'i', 'î' => 'i', 'ï' => 'i',
        'ó' => 'o', 'ò' => 'o', 'ô' => 'o', 'ö' => 'o', 'õ' => 'o',
        'ú' => 'u', 'ù' => 'u', 'û' => 'u', 'ü' => 'u',
        'ñ' => 'n', 'ç' => 'c', 'ý' => 'y', 'ÿ' => 'y',
        'Á' => 'a', 'À' => 'a', 'Â' => 'a', 'Ä' => 'a', 'Ã' => 'a', 'Å' => 'a',
        'É' => 'e', 'È' => 'e', 'Ê' => 'e', 'Ë' => 'e',
        'Í' => 'i', 'Ì' => 'i', 'Î' => 'i', 'Ï' => 'i',
        'Ó' => 'o', 'Ò' => 'o', 'Ô' => 'o', 'Ö' => 'o', 'Õ' => 'o',
        'Ú' => 'u', 'Ù' => 'u', 'Û' => 'u', 'Ü' => 'u',
        'Ñ' => 'n', 'Ç' => 'c', 'Ý' => 'y',
    ]);

    $text = mb_strtolower($text, 'UTF-8');
    $text = preg_replace('/[^a-z0-9]+/u', '-', $text) ?? '';
    $text = trim($text, '-');

    if ($text === '') {
        return 'post';
    }

    $text = substr($text, 0, 200);

    return rtrim($text, '-');
}

/**
 * Return a slug that is not already used by another post.
 */
function unique_slug(PDO $pdo, string $base, ?int $ignoreId = null): string
{
    $base = slugify($base);
    $candidate = $base;
    $suffix = 2;

    while (true) {
        $sql = 'SELECT id FROM blog_posts WHERE slug = ?';
        $params = [$candidate];

        if ($ignoreId !== null) {
            $sql .= ' AND id <> ?';
            $params[] = $ignoreId;
        }

        $stmt = $pdo->prepare($sql . ' LIMIT 1');
        $stmt->execute($params);

        if ($stmt->fetch() === false) {
            return $candidate;
        }

        $candidate = $base . '-' . $suffix;
        $suffix++;
    }
}

/**
 * Sanitise editor HTML with a strict allowlist.
 */
function sanitize_html(string $html): string
{
    $html = trim($html);
    if ($html === '') {
        return '';
    }

    $allowed = [
        'p', 'br', 'h1', 'h2', 'h3', 'h4', 'strong', 'b', 'em', 'i', 'u', 's',
        'ul', 'ol', 'li', 'blockquote', 'a', 'img', 'figure', 'figcaption',
        'hr', 'pre', 'code',
    ];

    // These are dropped together with everything inside them.
    $blocked = [
        'script', 'style', 'iframe', 'object', 'embed', 'form', 'input',
        'button', 'select', 'textarea', 'link', 'meta', 'svg', 'math', 'base',
        'noscript', 'template',
    ];

    $dom = new DOMDocument('1.0', 'UTF-8');
    $previous = libxml_use_internal_errors(true);

    $wrapped = '<div id="blog-root">' . $html . '</div>';
    $dom->loadHTML(
        '<?xml encoding="UTF-8">' . $wrapped,
        LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD
    );
    libxml_clear_errors();
    libxml_use_internal_errors($previous);

    $root = null;
    foreach ($dom->getElementsByTagName('div') as $div) {
        if ($div->getAttribute('id') === 'blog-root') {
            $root = $div;
            break;
        }
    }

    if (!$root instanceof DOMElement) {
        return '';
    }

    $clean = [];
    foreach (iterator_to_array($root->childNodes) as $child) {
        clean_node($child, $dom, $allowed, $blocked, $clean);
    }

    while ($root->firstChild !== null) {
        $root->removeChild($root->firstChild);
    }
    foreach ($clean as $node) {
        $root->appendChild($node);
    }

    $out = $dom->saveHTML($root);
    if (!is_string($out)) {
        return '';
    }

    return trim(preg_replace('~^<div[^>]*>|</div>$~', '', $out) ?? '');
}

/**
 * Recursively rebuild one node into the clean document.
 *
 * @param array<int, string> $allowed
 * @param array<int, string> $blocked
 * @param array<int, DOMNode> $out
 */
function clean_node(DOMNode $node, DOMDocument $dom, array $allowed, array $blocked, array &$out): void
{
    if ($node instanceof DOMText) {
        $out[] = $dom->createTextNode($node->nodeValue ?? '');
        return;
    }

    if (!$node instanceof DOMElement) {
        return;
    }

    $tag = strtolower($node->nodeName);

    if (in_array($tag, $blocked, true)) {
        return;
    }

    if (!in_array($tag, $allowed, true)) {
        // Unknown but harmless wrappers (span, div) are unwrapped, not deleted.
        foreach (iterator_to_array($node->childNodes) as $child) {
            clean_node($child, $dom, $allowed, $blocked, $out);
        }
        return;
    }

    $element = $dom->createElement($tag);

    if ($tag === 'a') {
        $href = trim((string) $node->getAttribute('href'));
        if (is_safe_link($href)) {
            $element->setAttribute('href', $href);
            $element->setAttribute('rel', 'noopener noreferrer');
        }
    }

    if ($tag === 'img') {
        $src = trim((string) $node->getAttribute('src'));
        if (is_safe_image_src($src)) {
            $element->setAttribute('src', $src);

            $alt = trim((string) $node->getAttribute('alt'));
            $element->setAttribute('alt', $alt);

            $title = trim((string) $node->getAttribute('title'));
            if ($title !== '') {
                $element->setAttribute('title', $title);
            }
        } else {
            return;
        }
    }

    if ($tag !== 'img') {
        $classes = safe_classes((string) $node->getAttribute('class'));
        if ($classes !== '') {
            $element->setAttribute('class', $classes);
        }
    }

    $children = [];
    foreach (iterator_to_array($node->childNodes) as $child) {
        clean_node($child, $dom, $allowed, $blocked, $children);
    }
    foreach ($children as $child) {
        $element->appendChild($child);
    }

    $out[] = $element;
}

function is_safe_link(string $url): bool
{
    if ($url === '') {
        return false;
    }

    if ($url[0] === '#' || $url[0] === '/') {
        return true;
    }

    if (!preg_match('~^[a-z][a-z0-9+.-]*:~i', $url)) {
        return true; // relative path
    }

    $scheme = strtolower(substr($url, 0, (int) strpos($url, ':')));

    return in_array($scheme, ['http', 'https', 'mailto'], true);
}

function is_safe_image_src(string $url): bool
{
    if ($url === '') {
        return false;
    }

    if (str_starts_with($url, 'https://')) {
        return true;
    }

    if (str_starts_with($url, 'uploads/')) {
        return true;
    }

    return (bool) preg_match('~^/[A-Za-z0-9._/-]+$~', $url);
}

/**
 * Keep only the Quill alignment/size/indent classes.
 */
function safe_classes(string $classes): string
{
    $kept = [];

    foreach (preg_split('/\s+/', trim($classes)) ?: [] as $class) {
        if (preg_match('/^(ql-align-(center|right|justify)|ql-indent-[1-8]|ql-size-(small|large|huge))$/', $class)) {
            $kept[] = $class;
        }
    }

    return implode(' ', $kept);
}

function excerpt_from_html(string $html, int $limit = 180): string
{
    $text = html_entity_decode(strip_tags($html), ENT_QUOTES | ENT_HTML5, 'UTF-8');
    $text = preg_replace('/\s+/u', ' ', $text) ?? '';
    $text = trim($text);

    if ($limit <= 0 || mb_strlen($text, 'UTF-8') <= $limit) {
        return $text;
    }

    $cut = mb_substr($text, 0, $limit, 'UTF-8');
    $lastSpace = mb_strrpos($cut, ' ', 0, 'UTF-8');

    if ($lastSpace !== false && $lastSpace > 0) {
        $cut = mb_substr($cut, 0, $lastSpace, 'UTF-8');
    }

    return rtrim($cut, " \t\n\r\0\x0B.,;:!?-") . '…';
}

function word_count(string $html): int
{
    $text = html_entity_decode(strip_tags($html), ENT_QUOTES | ENT_HTML5, 'UTF-8');
    preg_match_all("/[\\p{L}\\p{N}']+/u", $text, $matches);

    return count($matches[0]);
}

function reading_time(string $html): int
{
    return max(1, (int) ceil(word_count($html) / 200));
}
