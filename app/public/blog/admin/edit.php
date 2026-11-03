<?php
declare(strict_types=1);

define('KRYPTON_BLOG', true);
require_once __DIR__ . '/../bootstrap.php';
require_once __DIR__ . '/../lib/auth.php';
require_once __DIR__ . '/../lib/posts.php';
require_once __DIR__ . '/../lib/uploads.php';

no_cache();
auth_require();

$idParam = filter_input(INPUT_GET, 'id', FILTER_VALIDATE_INT);
if ($idParam === false || ($idParam !== null && $idParam <= 0)) {
    $idParam = null;
}

$post = $idParam !== null ? post_find((int) $idParam) : null;

if ($idParam !== null && $post === null) {
    http_response_code(404);
    $pageTitle = 'Article not found | Krypton Journal Admin';
    require __DIR__ . '/../404.php';
    exit;
}

$errors = [];

$values = [
    'id'           => $post !== null ? (int) $post['id'] : null,
    'title'        => (string) ($post['title'] ?? ''),
    'slug'         => (string) ($post['slug'] ?? ''),
    'category'     => (string) ($post['category'] ?? ''),
    'excerpt'      => (string) ($post['excerpt'] ?? ''),
    'content_html' => (string) ($post['content_html'] ?? ''),
    'cover_image'  => (string) ($post['cover_image'] ?? ''),
    'status'       => (string) ($post['status'] ?? 'draft'),
    'published_at' => $post['published_at'] ?? null,
];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    require_csrf();

    $action = (string) ($_POST['action'] ?? 'save_draft');
    $postedId = filter_input(INPUT_POST, 'id', FILTER_VALIDATE_INT);
    if ($postedId !== false && $postedId !== null && $postedId > 0) {
        $values['id'] = (int) $postedId;
        if ($post === null) {
            $post = post_find((int) $postedId);
            if ($post === null) {
                http_response_code(404);
                $pageTitle = 'Article not found | Krypton Journal Admin';
                require __DIR__ . '/../404.php';
                exit;
            }
        }
        $values['status'] = (string) $post['status'];
        $values['published_at'] = $post['published_at'] ?? null;
    }

    $values['title'] = trim((string) ($_POST['title'] ?? ''));
    $values['slug'] = trim((string) ($_POST['slug'] ?? ''));
    $values['category'] = trim((string) ($_POST['category'] ?? ''));
    $values['excerpt'] = trim((string) ($_POST['excerpt'] ?? ''));
    $values['content_html'] = (string) ($_POST['content_html'] ?? '');

    // ---- Unpublish is its own action and needs no content validation. --------
    if ($action === 'unpublish' && $values['id'] !== null) {
        post_set_status($values['id'], 'draft');
        flash('notice', 'The article is now a draft. Its public link returns 404 until you publish again.');
        redirect(blog_url('admin/edit.php?id=' . $values['id']));
    }

    // ---- Validate ------------------------------------------------------------
    if ($values['title'] === '') {
        $errors[] = 'A title is required.';
    } elseif (mb_strlen($values['title'], 'UTF-8') > 200) {
        $errors[] = 'The title must be 200 characters or fewer.';
    }

    if (trim(strip_tags($values['content_html'])) === '') {
        $errors[] = 'The article needs some content before it can be saved.';
    }

    if (mb_strlen($values['category'], 'UTF-8') > 80) {
        $errors[] = 'The category must be 80 characters or fewer.';
    }

    if (mb_strlen($values['excerpt'], 'UTF-8') > 400) {
        $errors[] = 'The summary must be 400 characters or fewer.';
    }

    // ---- Optional cover upload ----------------------------------------------
    $upload = $_FILES['cover'] ?? null;
    $coverUploaded = false;

    if (is_array($upload) && (int) ($upload['error'] ?? UPLOAD_ERR_NO_FILE) !== UPLOAD_ERR_NO_FILE) {
        $stored = upload_store($upload, $values['title'] !== '' ? $values['title'] : 'cover');

        if ($stored['ok'] && is_string($stored['path'])) {
            upload_delete($values['cover_image'] !== '' ? $values['cover_image'] : null);
            $values['cover_image'] = $stored['path'];
            $coverUploaded = true;
        } else {
            $errors[] = (string) ($stored['error'] ?? 'The cover image could not be uploaded.');
        }
    } elseif (isset($_POST['remove_cover'])) {
        upload_delete($values['cover_image'] !== '' ? $values['cover_image'] : null);
        $values['cover_image'] = '';
    }

    if ($errors !== []) {
        $values['content_html'] = sanitize_html($values['content_html']);
    } else {
        $status = $action === 'publish' || $action === 'update'
            ? 'published'
            : ($values['status'] === 'published' && $action !== 'save_draft' ? 'published' : 'draft');

        if ($action === 'save_draft') {
            $status = 'draft';
        }

        $savedId = post_save([
            'title'        => $values['title'],
            'slug'         => $values['slug'],
            'category'     => $values['category'],
            'excerpt'      => $values['excerpt'],
            'content_html' => $values['content_html'],
            'cover_image'  => $values['cover_image'],
            'status'       => $status,
        ], $values['id']);

        flash('notice', $status === 'published'
            ? 'Article published.'
            : 'Draft saved.');

        redirect(blog_url('admin/edit.php?id=' . $savedId));
    }
}

$assetBase = '../';
$isAdmin = true;
$pageTitle = ($values['id'] !== null ? 'Edit article' : 'New article') . ' | Krypton Journal Admin';
$pageDescription = 'Write and publish a Krypton Energy article.';
$robots = 'noindex, nofollow';
$canonical = blog_url('admin/edit.php');
$extraHead = '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/quill@2.0.2/dist/quill.snow.css">'
    . '<script src="https://cdn.jsdelivr.net/npm/quill@2.0.2/dist/quill.js"></script>';

require __DIR__ . '/../partials/head.php';

$adminTitle = $values['id'] !== null ? 'Edit article' : 'New article';
require __DIR__ . '/../partials/admin-shell.php';
?>
<?php if ($errors !== []): ?>
  <div class="mb-6 rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-100" role="alert">
    <ul class="list-disc space-y-1 pl-5">
      <?php foreach ($errors as $message): ?>
        <li><?= e($message) ?></li>
      <?php endforeach; ?>
    </ul>
  </div>
<?php endif; ?>

<form method="post" action="edit.php<?= $values['id'] !== null ? '?id=' . (int) $values['id'] : '' ?>" enctype="multipart/form-data" class="grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
  <?= csrf_field() ?>
  <input type="hidden" name="id" value="<?= $values['id'] !== null ? (int) $values['id'] : '' ?>">

  <div class="space-y-5">
    <label class="field">
      <span class="label">Title</span>
      <input name="title" id="title" type="text" required maxlength="200" value="<?= e($values['title']) ?>" placeholder="How solar pays for itself in Indian homes">
    </label>

    <label class="field">
      <span class="label">Slug</span>
      <input name="slug" id="slug" type="text" maxlength="200" value="<?= e($values['slug']) ?>" placeholder="generated-from-the-title" data-slug-source="title">
      <span class="help">Leave blank to build it from the title. Changing it changes the public URL.</span>
    </label>

    <div class="field">
      <span class="label">Article</span>
      <textarea name="content_html" id="content_html" rows="18" class="font-mono text-[13px]"><?= e($values['content_html']) ?></textarea>
      <div id="editor" class="hidden"></div>
      <span class="help">Paste from Word or Google Docs. Images can be added with the toolbar.</span>
    </div>  </div>

  <aside class="space-y-5">
    <div class="rounded-2xl border border-white/10 bg-white/5 p-4">
      <p class="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-gray-300">Publish</p>
      <p class="mb-4 text-xs text-gray-400">
        Status:
        <span class="status-badge <?= $values['status'] === 'published' ? 'status-badge--published' : 'status-badge--draft' ?>"><?= $values['status'] === 'published' ? 'Published' : 'Draft' ?></span>
      </p>
      <?php if ($values['published_at'] !== null): ?>
        <p class="mb-4 text-xs text-gray-500">First published <?= e(date('j M Y', strtotime((string) $values['published_at']))) ?></p>
      <?php endif; ?>

      <div class="flex flex-col gap-2">
        <?php if ($values['status'] === 'published'): ?>
          <button type="submit" name="action" value="update" class="btn-gold w-full">Update</button>
          <button type="submit" name="action" value="unpublish" class="btn-ghost w-full">Unpublish</button>
        <?php else: ?>
          <button type="submit" name="action" value="publish" class="btn-gold w-full">Publish</button>
          <button type="submit" name="action" value="save_draft" class="btn-ghost w-full">Save Draft</button>
        <?php endif; ?>
        <button type="submit" name="action" value="preview" formaction="preview.php" formtarget="_blank" formnovalidate class="btn-ghost w-full">Preview</button>
        <a href="dashboard.php" class="btn-ghost w-full">Cancel</a>
      </div>
    </div>

    <label class="field">
      <span class="label">Category</span>
      <input name="category" type="text" maxlength="80" value="<?= e($values['category']) ?>" placeholder="Solar">
      <span class="help">Optional. One category per article.</span>
    </label>

    <label class="field">
      <span class="label">Summary</span>
      <textarea name="excerpt" rows="4" maxlength="400" placeholder="One or two sentences shown on the card."><?= e($values['excerpt']) ?></textarea>
      <span class="help">Leave blank to build it from the first paragraph.</span>
    </label>

    <div class="field">
      <span class="label">Cover image</span>
      <?php if ($values['cover_image'] !== ''): ?>
        <img src="<?= e('../' . $values['cover_image']) ?>" alt="Current cover" class="mb-3 aspect-video w-full rounded-xl border border-white/10 object-cover">
        <label class="mb-3 flex items-center gap-2 text-xs text-gray-300">
          <input type="checkbox" name="remove_cover" value="1" class="h-4 w-4 rounded border-white/20 bg-black/30">
          Remove the current cover
        </label>
      <?php endif; ?>
      <input name="cover" type="file" accept="image/jpeg,image/png,image/webp">
      <img id="cover-preview" src="" alt="Selected cover preview" class="mt-3 hidden aspect-video w-full rounded-xl border border-white/10 object-cover">
      <span class="help">JPEG, PNG, or WebP up to 4 MB. The article title is used as the alt text.</span>
    </div>
  </aside>
</form>
</main>
<script src="<?= e($assetBase) ?>assets/blog.js"></script>
</body>
</html>
