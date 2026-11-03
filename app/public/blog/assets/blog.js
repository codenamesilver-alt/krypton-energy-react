(function () {
  const toggle = document.getElementById('blog-menu-toggle');
  const menu = document.getElementById('blog-mobile-menu');

  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      const open = menu.classList.toggle('hidden');
      toggle.setAttribute('aria-expanded', open ? 'false' : 'true');
    });
  }

  // Close dropdowns when clicking outside.
  document.addEventListener('click', function (event) {
    document.querySelectorAll('.nav-drop[open]').forEach(function (drop) {
      if (!drop.contains(event.target)) {
        drop.removeAttribute('open');
      }
    });
  });

  // Close dropdowns on Escape.
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      document.querySelectorAll('.nav-drop[open]').forEach(function (drop) {
        drop.removeAttribute('open');
      });
    }
  });

  // ---- Admin editor --------------------------------------------------------
  const textarea = document.getElementById('content_html');
  const editorEl = document.getElementById('editor');
  const form = textarea ? textarea.closest('form') : null;

  if (textarea && editorEl && form && window.Quill) {
    textarea.classList.add('hidden');
    editorEl.classList.remove('hidden');

    const quill = new Quill(editorEl, {
      theme: 'snow',
      modules: {
        toolbar: {
          container: [
            [{ header: [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['blockquote', 'link', 'image'],
            ['clean'],
          ],
          handlers: {
            image: function () {
              const input = document.createElement('input');
              input.type = 'file';
              input.accept = 'image/jpeg,image/png,image/webp';
              input.click();

              input.onchange = function () {
                const file = input.files && input.files[0];
                if (!file) {
                  return;
                }

                const token = form.querySelector('input[name="_token"]');
                const formData = new FormData();
                formData.append('_token', token ? token.value : '');
                formData.append('image', file);

                const range = quill.getSelection(true);
                quill.insertText(range.index, '\u00a0', Quill.sources.USER);

                fetch('../admin/upload.php', {
                  method: 'POST',
                  body: formData,
                  credentials: 'same-origin',
                })
                  .then(function (response) { return response.json(); })
                  .then(function (json) {
                    if (json && json.ok && json.url) {
                      quill.deleteText(range.index, 1);
                      quill.insertEmbed(range.index, 'image', json.url);
                      quill.setSelection(range.index + 1);
                    } else {
                      quill.deleteText(range.index, 1);
                      alert((json && json.error) ? json.error : 'The image could not be uploaded.');
                    }
                  })
                  .catch(function () {
                    quill.deleteText(range.index, 1);
                    alert('The image could not be uploaded.');
                  });
              };
            },
          },
        },
      },
      placeholder: 'Write your article...',
    });

    if (textarea.value) {
      quill.root.innerHTML = textarea.value;
    }

    form.addEventListener('submit', function () {
      textarea.value = quill.root.innerHTML;
    });
  }

  // Slug autofill
  const title = document.getElementById('title');
  const slug = document.getElementById('slug');
  let slugTouched = slug && slug.value.trim() !== '';

  if (slug) {
    slug.addEventListener('input', function () {
      slugTouched = true;
    });
  }

  if (title && slug) {
    title.addEventListener('input', function () {
      if (slugTouched) {
        return;
      }

      const value = title.value
        .toLowerCase()
        .normalize('NFKD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
        .slice(0, 200);
      slug.value = value;
    });
  }

  // Cover preview
  const coverInput = form ? form.querySelector('input[name="cover"]') : null;
  const coverPreview = document.getElementById('cover-preview');

  if (coverInput && coverPreview) {
    coverInput.addEventListener('change', function () {
      const file = coverInput.files && coverInput.files[0];
      if (!file) {
        coverPreview.classList.add('hidden');
        coverPreview.removeAttribute('src');
        return;
      }

      const url = URL.createObjectURL(file);
      coverPreview.src = url;
      coverPreview.classList.remove('hidden');
    });
  }

  // Delete confirmations
  document.querySelectorAll('[data-confirm]').forEach(function (el) {
    el.addEventListener('click', function (event) {
      const message = el.getAttribute('data-confirm');
      if (message && !confirm(message)) {
        event.preventDefault();
      }
    });
  });
})();
