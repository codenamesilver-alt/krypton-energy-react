import { Link, useParams, Navigate } from 'react-router-dom'
import { blogPosts } from '../data/blogPosts'

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>()
  const post = blogPosts.find((p) => p.slug === slug)

  if (!post) return <Navigate to="/blog" replace />

  const others = blogPosts
    .filter((p) => p.slug !== post.slug)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .slice(0, 3)

  return (
    <main id="main">
      <section className="section" id="blog-post">
        <div className="wrap">
          <Link to="/blog" className="blog-back">← Back to all articles</Link>

          <div className="blog-post-head">
            <div className="blog-meta">
              <span className="blog-cat">{post.category}</span>
              <span className="blog-date">{formatDate(post.publishedAt)}</span>
              <span className="blog-read">{post.readingTime}</span>
            </div>
            <h1 className="blog-post-title">{post.title}</h1>
          </div>

          <div className="blog-cover blog-cover-lg">
            <img src={post.coverImage} alt={post.title} />
          </div>

          <article className="blog-prose" dangerouslySetInnerHTML={{ __html: post.contentHtml }} />

          <div className="blog-cta">
            <p>Ready to make the switch to solar?</p>
            <a className="link-arrow" href="#quote">Talk to our team
              <svg width="16" height="8" viewBox="0 0 16 8" fill="none"><path d="M0 4h14M11 1l3 3-3 3" stroke="currentColor" strokeWidth="1.2" /></svg>
            </a>
          </div>

          {others.length > 0 && (
            <div className="blog-related">
              <h3>More articles</h3>
              <div className="blog-grid">
                {others.map((p) => (
                  <article className="blog-card" key={p.slug}>
                    <Link to={`/blog/${p.slug}`} className="blog-card-link">
                      <div className="blog-cover">
                        <img src={p.coverImage} alt={p.title} loading="lazy" />
                      </div>
                      <div className="blog-body">
                        <div className="blog-meta">
                          <span className="blog-cat">{p.category}</span>
                          <span className="blog-date">{formatDate(p.publishedAt)}</span>
                        </div>
                        <h3 className="blog-title">{p.title}</h3>
                        <p className="blog-excerpt">{p.excerpt}</p>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}