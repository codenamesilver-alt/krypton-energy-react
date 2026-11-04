import { useQuoteModal } from '../context/QuoteModal'
import '../styles/products.css'

type Category = 'solar' | 'inverter' | 'battery' | 'ev'

type Brand = {
  name: string
  logo: string
  category: Category
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

const categoryLabel: Record<Category, string> = {
  solar: 'Solar',
  inverter: 'Inverter',
  battery: 'Battery',
  ev: 'EV',
}

export default function ProductsPage() {
  const { open: openQuote } = useQuoteModal()
  return (
    <main id="main">
      <section className="section prod-hero" id="products">
        <div className="wrap">
          <div className="prod-head">
            <div>
              <div className="kicker">Our products</div>
              <h2>Brands we <span>trust and install.</span></h2>
            </div>
            <p>Krypton Energy specifies, installs and services equipment from the world’s most trusted solar, inverter, battery and EV charging brands — chosen for performance, reliability and long-term support in Indian conditions.</p>
          </div>

          <div className="brand-ribbon" aria-label="Brands we trust and install">
            <div className="brand-track">
              {[0, 1].map((copy) => (
                <div className="brand-group" key={copy} aria-hidden={copy === 1 || undefined}>
                  {brands.map((b) => (
                    <div className="brand-chip" key={`${copy}-${b.name}`} title={b.tagline}>
                      <span className="brand-chip-logo">
                        <img src={b.logo} alt={`${b.name} logo`} loading="eager" />
                      </span>
                      <span className="brand-chip-text">
                        <span className="brand-chip-name">{b.name}</span>
                        <span className="brand-chip-cat">{categoryLabel[b.category]}</span>
                      </span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="prod-cta">
            <p>Not sure which brand or system is right for you? We’ll help you choose.</p>
            <a className="btn btn-gold btn-pill" href="#quote" onClick={(e) => { e.preventDefault(); openQuote() }}>Talk to our team
              <svg width="16" height="8" viewBox="0 0 16 8" fill="none"><path d="M0 4h14M11 1l3 3-3 3" stroke="currentColor" strokeWidth="1.2" /></svg>
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}