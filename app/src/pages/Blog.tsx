import { Link } from 'react-router-dom'
import { blogPosts } from '../data/blogPosts'

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default function BlogPage() {
  const sorted = [...blogPosts].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))

  return (
    <main id="main">
      <section className="section" id="blog">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <div className="kicker">Insights</div>
              <h2>Stories, guides <span>and updates.</span></h2>
            </div>
            <p>Everything you need to know before you switch to solar — and after.</p>
          </div>

          <div className="blog-grid">
            {sorted.map((post, i) => (
              <article className="blog-card reveal" key={post.slug} style={{ transitionDelay: `${i * 80}ms` }}>
                <Link to={`/blog/${post.slug}`} className="blog-card-link">
                  <div className="blog-cover">
                    <img src={post.coverImage} alt={post.title} loading="lazy" />
                  </div>
                  <div className="blog-body">
                    <div className="blog-meta">
                      <span className="blog-cat">{post.category}</span>
                      <span className="blog-date">{formatDate(post.publishedAt)}</span>
                    </div>
                    <h3 className="blog-title">{post.title}</h3>
                    <p className="blog-excerpt">{post.excerpt}</p>
                    <div className="blog-foot">
                      <span className="blog-read">{post.readingTime}</span>
                      <span className="blog-arrow">Read article →</span>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}