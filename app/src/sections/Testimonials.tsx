import { useEffect, useRef, useState } from 'react'
import '../styles/testimonials.css'

const testimonials = [
  { author: 'George & Sonya', role: 'Shepparton', text: 'George and I had been considering getting a solar system for over 5 years. But due to lack of knowledge and steep costs, we decided to stay away from it to not make a wrong decision. That’s when we met the blokes from Krypton Group who were absolutely fantastic and patient in running us through all our queries. They even assisted us with applying and securing our rebates. I could not be any happier with their service. Highly recommend to anyone looking to get Solar!' },
  { author: 'Jude McCann', role: 'Verified customer', text: 'Great service from Azka and Krypton Group in the installation of my solar panels. Quick service, kept me informed along the way, took me through the documents in detail. I’ve already recommended them to several friends.' },
  { author: 'Amin Nazari', role: 'Verified customer', text: 'Called and received calls many but found Krypton Group as the best one. Azka helped me a lot to choose the right options with the best possible price. I found him and his group very honest, professional and fair. Lucky anyone closing the deal with him and his company.' },
  { author: 'Frank Stevenson', role: 'Verified customer', text: 'Krypton was fabulous with my install. They gave me a perfect system that can bring my bills to $0. With Christmas around the corner and rising power costs, I am glad I made the jump to Solar now with Krypton. Excellent workmanship with excellent communication. Thank you!' },
]

export default function Testimonials() {
  const [index, setIndex] = useState(0)
  const [slideWidth, setSlideWidth] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const pausedRef = useRef(false)
  const count = testimonials.length

  const gap = 24
  const slidePct = 0.72 // each slide takes 72% of the viewport, leaving 14% peek on each side
  const peek = (1 - slidePct) / 2

  useEffect(() => {
    const measure = () => {
      if (containerRef.current) {
        setSlideWidth(containerRef.current.clientWidth * slidePct)
      }
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  useEffect(() => {
    if (count <= 1) return
    const id = setInterval(() => {
      if (!pausedRef.current) setIndex((i) => (i + 1) % count)
    }, 5500)
    return () => clearInterval(id)
  }, [count])

  const prev = () => setIndex((i) => (i - 1 + count) % count)
  const next = () => setIndex((i) => (i + 1) % count)

  const translateX = slideWidth ? (containerRef.current!.clientWidth * peek) - index * (slideWidth + gap) : 0

  return (
    <section className="section" id="testimonials">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <div className="kicker">In their words</div>
            <h2>What customers <span>say about us.</span></h2>
          </div>
          <p>Real words from homeowners and businesses we’ve served.</p>
        </div>

        <div
          className="testi-carousel"
          ref={containerRef}
          onMouseEnter={() => (pausedRef.current = true)}
          onMouseLeave={() => (pausedRef.current = false)}
        >
          <div
            className="testi-track"
            style={{ transform: `translateX(${translateX}px)`, transition: 'transform 0.6s cubic-bezier(.22,.61,.36,1)' }}
          >
            {testimonials.map((t, i) => (
              <div className={`testi-slide${i === index ? ' is-active' : ''}`} key={i} style={{ width: slideWidth || '72%' }}>
                <div className="testi-card">
                  <p className="quote">“{t.text}”</p>
                  <div className="author">
                    <span className="dot" />
                    <div>
                      <div className="name">{t.author}</div>
                      <div className="role">{t.role}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button className="testi-nav testi-prev" onClick={prev} aria-label="Previous testimonial">‹</button>
          <button className="testi-nav testi-next" onClick={next} aria-label="Next testimonial">›</button>
        </div>

        <div className="testi-dots">
          {testimonials.map((_, i) => (
            <button
              key={i}
              className={`testi-dot${i === index ? ' is-active' : ''}`}
              onClick={() => setIndex(i)}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}