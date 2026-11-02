import { useEffect, useState } from 'react'

const modules = import.meta.glob('../../assets/success/*.{jpg,jpeg,png}', { eager: true, import: 'default' }) as Record<string, string>
const images = Object.entries(modules)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([path, url]) => ({ url, name: path.split('/').pop() || '' }))

export default function Carousel() {
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused || images.length < 2) return
    const t = setInterval(() => setI((v) => (v + 1) % images.length), 4000)
    return () => clearInterval(t)
  }, [paused])

  if (!images.length) return null

  const prev = () => setI((v) => (v - 1 + images.length) % images.length)
  const next = () => setI((v) => (v + 1) % images.length)

  return (
    <div
      className="kry-carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="kry-stage">
        {images.map((img, idx) => (
          <img
            key={img.url}
            src={img.url}
            alt={`Krypton installation ${idx + 1}`}
            className={idx === i ? 'is-on' : ''}
            loading={idx === 0 ? 'eager' : 'lazy'}
          />
        ))}
      </div>
      <button className="kry-nav prev" onClick={prev} aria-label="Previous">‹</button>
      <button className="kry-nav next" onClick={next} aria-label="Next">›</button>
      <div className="kry-dots">
        {images.map((_, idx) => (
          <button
            key={idx}
            className={idx === i ? 'is-on' : ''}
            onClick={() => setI(idx)}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
      <div className="kry-count">{i + 1} / {images.length}</div>
    </div>
  )
}