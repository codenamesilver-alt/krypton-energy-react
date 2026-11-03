import { useState } from 'react'

type Category = 'all' | 'solar' | 'inverter' | 'battery' | 'ev'

type Brand = {
  name: string
  logo: string
  category: Exclude<Category, 'all'>
  tagline: string
}

const brands: Brand[] = [
  { name: 'Tata Power Solar', logo: '/media/sol/tata-power-solar.png', category: 'solar', tagline: 'India\u2019s largest integrated solar manufacturer' },
  { name: 'Adani Solar', logo: '/media/sol/adani-solar.png', category: 'solar', tagline: 'Vertically integrated PV modules' },
  { name: 'Vikram Solar', logo: '/media/sol/vikram-solar.png', category: 'solar', tagline: 'High-efficiency modules & EPC' },
  { name: 'Waaree', logo: '/media/sol/waaree.png', category: 'solar', tagline: 'India\u2019s largest solar panel maker' },
  { name: 'Loom Solar', logo: '/media/sol/loom-solar.png', category: 'solar', tagline: 'Panels, inverters & lithium batteries' },
  { name: 'Growatt', logo: '/media/sol/growatt.png', category: 'inverter', tagline: 'Distributed energy & storage' },
  { name: 'Sungrow', logo: '/media/sol/sungrow.svg', category: 'inverter', tagline: 'Global leader in PV inverters' },
  { name: 'GoodWe', logo: '/media/sol/goodwe.svg', category: 'inverter', tagline: 'Smart energy & inverter systems' },
  { name: 'Solis', logo: '/media/sol/solis.png', category: 'inverter', tagline: 'String & hybrid inverters' },
  { name: 'Schneider Electric', logo: '/media/sol/schneider.svg', category: 'inverter', tagline: 'Energy management & automation' },
  { name: 'ABB', logo: '/media/sol/abb.svg', category: 'inverter', tagline: 'Electrification & automation' },
  { name: 'Exide', logo: '/media/sol/exide.png', category: 'battery', tagline: 'India\u2019s largest battery maker' },
  { name: 'Amaron', logo: '/media/sol/amaron.png', category: 'battery', tagline: 'Automotive & industrial batteries' },
  { name: 'Luminous', logo: '/media/sol/luminous.png', category: 'battery', tagline: 'Power backup & solar storage' },
  { name: 'Okaya', logo: '/media/sol/okaya.webp', category: 'battery', tagline: 'Inverter batteries & lithium ESS' },
  { name: 'Mahindra', logo: '/media/sol/mahindra.webp', category: 'ev', tagline: 'Electric SUVs & last-mile mobility' },
  { name: 'Tata Motors', logo: '/media/sol/tata-motors.png', category: 'ev', tagline: 'EV cars & commercial vehicles' },
  { name: 'MG Motor', logo: '/media/sol/mg-motor.webp', category: 'ev', tagline: 'Electric SUVs & connected cars' },
]

const filters: { key: Category; label: string }[] = [
  { key: 'all', label: 'All brands' },
  { key: 'solar', label: 'Solar panels' },
  { key: 'inverter', label: 'Inverters' },
  { key: 'battery', label: 'Batteries' },
  { key: 'ev', label: 'EV charging' },
]

const categoryLabel: Record<Exclude<Category, 'all'>, string> = {
  solar: 'Solar',
  inverter: 'Inverter',
  battery: 'Battery',
  ev: 'EV',
}

export default function ProductsPage() {
  const [active, setActive] = useState<Category>('all')
  const visible = active === 'all' ? brands : brands.filter((b) => b.category === active)

  return (
    <main id="main">
      <section className="section prod-hero" id="products">
        <div className="wrap">
          <div className="prod-head">
            <div>
              <div className="kicker">Our products</div>
              <h2>Brands we <span>trust and install.</span></h2>
            </div>
            <p>Krypton Energy specifies, installs and services equipment from the world\u2019s most trusted solar, inverter, battery and EV charging brands \u2014 chosen for performance, reliability and long-term support in Indian conditions.</p>
          </div>

          <div className="brand-filters" role="tablist" aria-label="Filter brands by category">
            {filters.map((f) => (
              <button
                key={f.key}
                role="tab"
                aria-selected={active === f.key}
                className={`brand-filter${active === f.key ? ' is-active' : ''}`}
                onClick={() => setActive(f.key)}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="brand-grid">
            {visible.map((b, i) => (
              <div className="brand-card reveal" key={b.name} style={{ transitionDelay: `${i * 60}ms` }}>
                <div className="brand-logo-wrap">
                  <img src={b.logo} alt={`${b.name} logo`} loading="lazy" />
                </div>
                <div className="brand-name">{b.name}</div>
                <div className="brand-cat">{categoryLabel[b.category]}</div>
                <div className="brand-tag">{b.tagline}</div>
              </div>
            ))}
          </div>

          <div className="prod-cta">
            <p>Not sure which brand or system is right for you? We\u2019ll help you choose.</p>
            <a className="link-arrow" href="#quote">Talk to our team
              <svg width="16" height="8" viewBox="0 0 16 8" fill="none"><path d="M0 4h14M11 1l3 3-3 3" stroke="currentColor" strokeWidth="1.2" /></svg>
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}