import { useCallback, useEffect, useRef, useState } from 'react'
import '../styles/testimonials.css'

type Testimonial = {
  name: string
  role: string
  company?: string
  text: string
  initials: string
  accent: string
}

const testimonials: Testimonial[] = [
  { name: 'George & Sonya', role: 'Homeowners', company: 'Shepparton, VIC', text: 'George and I had been considering getting a solar system for over 5 years. But due to lack of knowledge and steep costs, we decided to stay away from it. That’s when we met the blokes from Krypton Group who were absolutely fantastic and patient in running us through all our queries. They even assisted us with applying and securing our rebates. I could not be any happier with their service. Highly recommend to anyone looking to get Solar!', initials: 'GS', accent: '#7fe3b0' },
  { name: 'Jude McCann', role: 'Verified customer', company: 'Residential', text: 'Great service from Azka and Krypton Group in the installation of my solar panels. Quick service, kept me informed along the way, took me through the documents in detail. I’ve already recommended them to several friends.', initials: 'JM', accent: '#93c5fd' },
  { name: 'Amin Nazari', role: 'Verified customer', company: 'Residential', text: 'Called and received calls many but found Krypton Group as the best one. Azka helped me a lot to choose the right options with the best possible price. I found him and his group very honest, professional and fair. Lucky anyone closing the deal with him and his company.', initials: 'AN', accent: '#f9a8d4' },
  { name: 'Frank Stevenson', role: 'Verified customer', company: 'Residential', text: 'Krypton was fabulous with my install. They gave me a perfect system that can bring my bills to $0. With Christmas around the corner and rising power costs, I am glad I made the jump to Solar now with Krypton. Excellent workmanship with excellent communication. Thank you!', initials: 'FS', accent: '#fcd34d' },
  { name: 'Angel Velazquez', role: 'Verified customer', company: 'Residential', text: 'Really happy with the service from krypton group. Job was done very nicely. Got the heat pump and solar installed from them. Communication was spot on and really quick install. Really impressed. Thank you, we will recommend krypton group to all friends and family.', initials: 'AV', accent: '#c4b5fd' },
]

export default function Testimonials() {
  const n = testimonials.length
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const touchStartX = useRef<number | null>(null)

  const go = useCallback((dir: number) => {
    setActive((i) => (i + dir + n) % n)
  }, [n])

  // autoplay
  useEffect(() => {
    if (n <= 1 || paused) return
    const id = setInterval(() => setActive((i) => (i + 1) % n), 5000)
    return () => clearInterval(id)
  }, [n, paused])

  // keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1) }
      if (e.key === 'ArrowRight') { e.preventDefault(); go(1) }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [go])

  // touch
  const onTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX }
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return
    const dx = e.changedTouches[0].clientX - touchStartX.current
    touchStartX.current = null
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1)
  }

  // position helpers: returns 'left' | 'center' | 'right' | 'hidden'
  const roleOf = (i: number): 'left' | 'center' | 'right' | 'hidden' => {
    const d = (i - active + n) % n
    if (d === 0) return 'center'
    if (d === 1) return 'right'
    if (d === n - 1) return 'left'
    return 'hidden'
  }

  return (
    <section className="section testi-section" id="testimonials" aria-label="What customers say about us">
      <div className="wrap">
        <div className="testi-head">
          <span className="testi-kicker">What they say</span>
          <span className="testi-rule" aria-hidden="true" />
        </div>
        <h2 className="testi-title">WHAT THEY SAY</h2>
        <div className="testi-rule testi-rule--lg" aria-hidden="true" />

        <div
          className="testi-stage"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          tabIndex={0}
          role="region"
          aria-roledescription="carousel"
          aria-label="Customer testimonials"
        >
          <button className="testi-nav testi-prev" onClick={() => go(-1)} aria-label="Previous testimonial">‹</button>

          <div className="testi-stack">
            {testimonials.map((t, i) => {
              const role = roleOf(i)
              return (
                <article
                  key={i}
                  className={`testi-card testi-card--${role}`}
                  aria-hidden={role === 'hidden'}
                  aria-label={`${t.name}, ${t.role}`}
                >
                  <span className="testi-quote" aria-hidden="true">“</span>
                  <p className="testi-text">{t.text}</p>
                  <div className="testi-author">
                    <span className="testi-avatar" style={{ background: t.accent }}>{t.initials}</span>
                    <div>
                      <div className="testi-name">{t.name}</div>
                      <div className="testi-role">{t.role}{t.company ? ` · ${t.company}` : ''}</div>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>

          <button className="testi-nav testi-next" onClick={() => go(1)} aria-label="Next testimonial">›</button>
        </div>

        <div className="testi-dots" role="tablist" aria-label="Testimonial pagination">
          {testimonials.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === active}
              aria-label={`Go to testimonial ${i + 1}`}
              className={`testi-dot${i === active ? ' is-active' : ''}`}
              onClick={() => setActive(i)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}