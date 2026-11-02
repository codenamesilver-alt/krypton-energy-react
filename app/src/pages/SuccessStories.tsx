import { useEffect, useState } from 'react'
import '../styles/success.css'

const installMods = import.meta.glob('../assets/success/*.{jpg,jpeg,png}', { eager: true, import: 'default' }) as Record<string, string>
const installImages = Object.entries(installMods).sort(([a], [b]) => a.localeCompare(b)).map(([, url]) => url)

const storyMods = import.meta.glob('../assets/successstories/*.{jpg,jpeg,png}', { eager: true, import: 'default' }) as Record<string, string>
const storyEntries = Object.entries(storyMods).sort(([a], [b]) => a.localeCompare(b))
const letters = storyEntries.filter(([p]) => /\/R\d?/i.test(p)).map(([, u]) => u)
const centerLetter = letters[0]

const sidePool = installImages.slice(0, 8)

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function SuccessStoriesPage() {
  const [sides, setSides] = useState(() => shuffle(sidePool))

  useEffect(() => {
    const t = setInterval(() => setSides(shuffle(sidePool)), 4000)
    return () => clearInterval(t)
  }, [])

  const tiles = [
    sides[0], sides[1], sides[2],
    sides[3], centerLetter, sides[4],
    sides[5], sides[6], sides[7],
  ]

  return (
    <main id="main">
      {/* 3x3 tile grid */}
      <section className="section" id="success-stories">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <div className="kicker">Success stories</div>
              <h2>Our work. <span>In one view.</span></h2>
            </div>
          </div>

          <div className="ss-tile-grid">
            {tiles.map((src, i) => (
              <div className={`ss-tile${i === 4 ? ' center' : ''}`} key={src + i}>
                <img src={src} alt={i === 4 ? 'Recommendation letter' : 'Installation'} loading="lazy" />
                <span className="label">{i === 4 ? 'Recommendation letter' : 'Installation'}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}