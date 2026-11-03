/**
 * Lightweight Markdown → HTML converter for blog content.
 * Supports: headings (#, ##, ###), bold (**), italic (*), links ([]()),
 * unordered lists (- ), ordered lists (1. ), blockquotes (>), paragraphs,
 * and horizontal rules (---).
 *
 * HTML is escaped first to prevent XSS, then markdown syntax is converted.
 */
export function markdownToHtml(md: string): string {
  if (!md) return ''

  // Escape HTML entities to prevent XSS
  let text = md
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

  const lines = text.split('\n')
  const out: string[] = []
  let inUl = false
  let inOl = false
  let inQuote = false

  const closeLists = () => {
    if (inUl) { out.push('</ul>'); inUl = false }
    if (inOl) { out.push('</ol>'); inOl = false }
  }
  const closeQuote = () => {
    if (inQuote) { out.push('</blockquote>'); inQuote = false }
  }

  const inline = (s: string) =>
    s
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/`(.+?)`/g, '<code>$1</code>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')

  for (const raw of lines) {
    const line = raw.trim()

    if (line === '') {
      closeLists()
      closeQuote()
      continue
    }

    // Horizontal rule
    if (/^(-{3,}|\*{3,})$/.test(line)) {
      closeLists()
      closeQuote()
      out.push('<hr />')
      continue
    }

    // Headings
    if (line.startsWith('### ')) {
      closeLists(); closeQuote()
      out.push(`<h3>${inline(line.slice(4))}</h3>`)
      continue
    }
    if (line.startsWith('## ')) {
      closeLists(); closeQuote()
      out.push(`<h2>${inline(line.slice(3))}</h2>`)
      continue
    }
    if (line.startsWith('# ')) {
      closeLists(); closeQuote()
      out.push(`<h2>${inline(line.slice(2))}</h2>`)
      continue
    }

    // Blockquote (after HTML escaping, > becomes &gt;)
    if (line.startsWith('&gt; ') || line.startsWith('> ')) {
      closeLists()
      if (!inQuote) { out.push('<blockquote>'); inQuote = true }
      const quoteText = line.startsWith('&gt; ') ? line.slice(5) : line.slice(2)
      out.push(`<p>${inline(quoteText)}</p>`)
      continue
    } else {
      closeQuote()
    }

    // Unordered list
    if (/^[-*]\s+/.test(line)) {
      closeQuote()
      if (!inUl) { out.push('<ul>'); inUl = true }
      out.push(`<li>${inline(line.replace(/^[-*]\s+/, ''))}</li>`)
      continue
    }

    // Ordered list
    if (/^\d+\.\s+/.test(line)) {
      closeQuote()
      if (!inOl) { out.push('<ol>'); inOl = true }
      out.push(`<li>${inline(line.replace(/^\d+\.\s+/, ''))}</li>`)
      continue
    }

    // Regular paragraph
    closeLists()
    closeQuote()
    out.push(`<p>${inline(line)}</p>`)
  }

  closeLists()
  closeQuote()
  return out.join('\n')
}