import { useState } from 'react'

const docs = [
  { src: '/media/endorsements/bendigo.png', alt: 'Bendigo recommendation letter', label: 'Bendigo' },
  { src: '/media/endorsements/ymca.png', alt: 'YMCA recommendation letter', label: 'YMCA' },
]

export default function Endorsements() {
  const [lightbox, setLightbox] = useState<string | null>(null)

  return (
    <section className="endorsements-section" aria-label="Client recommendations">
      <div className="wrap">
        <div className="endorse-head">
          <div className="endorse-eyebrow">Client Recommendations</div>
          <h2 className="endorse-title">Trusted by Those We've Worked With.</h2>
          <p className="endorse-desc">
            Our greatest measure of success is the trust we build with our clients. Here's what some of the people we've worked with have to say about their experience.
          </p>
        </div>

        <div className="endorse-stage">
          <div className="endorse-panel endorse-panel--sage" aria-hidden="true" />
          <div className="endorse-panel endorse-panel--emerald" aria-hidden="true" />

          <button
            type="button"
            className="endorse-doc endorse-doc--back"
            onClick={() => setLightbox(docs[1].src)}
            aria-label="View YMCA recommendation letter"
          >
            <img src={docs[1].src} alt={docs[1].alt} loading="lazy" />
          </button>

          <button
            type="button"
            className="endorse-doc endorse-doc--front"
            onClick={() => setLightbox(docs[0].src)}
            aria-label="View Bendigo recommendation letter"
          >
            <img src={docs[0].src} alt={docs[0].alt} loading="lazy" />
          </button>
        </div>

        <div className="endorse-actions">
          <button type="button" className="endorse-view-btn" onClick={() => setLightbox(docs[0].src)}>
            View Bendigo letter
          </button>
          <button type="button" className="endorse-view-btn" onClick={() => setLightbox(docs[1].src)}>
            View YMCA letter
          </button>
        </div>
      </div>

      {lightbox && (
        <div className="endorse-lightbox" onClick={() => setLightbox(null)} role="dialog" aria-modal="true" aria-label="Recommendation letter preview">
          <button type="button" className="endorse-lightbox-close" onClick={() => setLightbox(null)} aria-label="Close preview">×</button>
          <div className="endorse-lightbox-inner" onClick={(e) => e.stopPropagation()}>
            <img src={lightbox} alt="Recommendation letter full preview" />
            <a className="endorse-download" href={lightbox} download target="_blank" rel="noopener noreferrer">
              Open original
            </a>
          </div>
        </div>
      )}
    </section>
  )
}