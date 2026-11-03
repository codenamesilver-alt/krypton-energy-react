export type BlogPost = {
  slug: string
  title: string
  excerpt: string
  category: string
  coverImage: string
  publishedAt: string
  readingTime: string
  contentHtml: string
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'why-solar-makes-sense-for-indian-homes',
    title: 'Why Solar Makes Sense for Indian Homes',
    excerpt: 'With rising electricity tariffs and abundant sunshine, rooftop solar is one of the smartest investments an Indian homeowner can make today.',
    category: 'Solar',
    coverImage: '/media/kry/kry-1.jpg',
    publishedAt: '2026-10-15',
    readingTime: '4 min read',
    contentHtml: `
      <p>India receives some of the highest solar irradiation in the world, averaging 4–7 kWh per square metre per day. For a homeowner, that translates into a rooftop that can generate most — if not all — of your household electricity for the next 25 years.</p>
      <h2>The economics are simple</h2>
      <p>A typical 3 kW rooftop system costs roughly ₹1.5–2 lakh after subsidy. At current tariffs, it pays for itself in 4–5 years and generates free electricity for the remaining 20+ years of its life.</p>
      <ul>
        <li>Reduce monthly electricity bills by 70–90%</li>
        <li>Government subsidy up to ₹78,000 under PM Surya Ghar</li>
        <li>Net metering credits for surplus power exported to the grid</li>
        <li>25-year performance warranty on panels</li>
      </ul>
      <h2>What about maintenance?</h2>
      <p>Solar panels have no moving parts. A simple water wash every few months and an annual inspection keep the system running at peak. We include scheduled service in every installation contract.</p>
      <blockquote>Switching to solar is not just about saving money — it's about taking control of your energy future.</blockquote>
    `,
  },
  {
    slug: 'understanding-on-grid-vs-hybrid-solar',
    title: 'On-Grid vs Hybrid Solar: Which Is Right for You?',
    excerpt: 'Choosing between an on-grid and hybrid solar system depends on your power needs, grid reliability, and budget. Here\u2019s a plain-language guide.',
    category: 'Solar',
    coverImage: '/media/kry/kry-2.jpg',
    publishedAt: '2026-10-22',
    readingTime: '5 min read',
    contentHtml: `
      <p>An on-grid system works with the electricity grid: it exports surplus power and imports when needed. A hybrid system adds battery storage, giving you backup during outages and the ability to store solar energy for night use.</p>
      <h2>On-grid is best when</h2>
      <ul>
        <li>Your grid supply is reliable</li>
        <li>You want the lowest upfront cost</li>
        <li>You want the fastest payback period</li>
      </ul>
      <h2>Hybrid is best when</h2>
      <ul>
        <li>You experience frequent power cuts</li>
        <li>You want to maximise self-consumption</li>
        <li>You plan to add battery storage later</li>
      </ul>
      <p>Not sure which suits you? Our engineers will assess your load profile and grid reliability before recommending a system.</p>
    `,
  },
  {
    slug: 'pm-surya-ghar-yojana-explained',
    title: 'PM Surya Ghar: Muft Bijli Yojana Explained',
    excerpt: 'The government\u2019s flagship rooftop solar scheme offers subsidies up to ₹78,000 for residential installations. Here\u2019s how it works and how to apply.',
    category: 'Policy',
    coverImage: '/media/kry/kry-3.jpg',
    publishedAt: '2026-10-29',
    readingTime: '6 min read',
    contentHtml: `
      <p>PM Surya Ghar: Muft Bijli Yojana is India\u2019s flagship residential rooftop solar scheme. It provides central financial assistance (CFA) to eligible households installing rooftop solar systems.</p>
      <h2>Subsidy amounts</h2>
      <ul>
        <li>Up to 2 kW: ₹30,000 per kW</li>
        <li>2–3 kW: ₹18,000 per kW for the additional capacity</li>
        <li>Maximum subsidy: ₹78,000 (for 3 kW and above)</li>
      </ul>
      <h2>How to apply</h2>
      <p>Register on the national portal (pmsuryaghar.gov.in), submit your application, and choose an empanelled vendor. Krypton Energy handles the entire process — from application to net-metering — so you don\u2019t have to navigate the paperwork alone.</p>
      <blockquote>The subsidy is credited directly to your bank account after installation and inspection.</blockquote>
    `,
  },
  {
    slug: 'ev-charging-at-home-with-solar',
    title: 'Charging Your EV with Solar Power',
    excerpt: 'Pairing a home EV charger with a rooftop solar system is the ultimate way to drive on sunshine. Here\u2019s how it works and what you need.',
    category: 'EV',
    coverImage: '/media/kry/kry-4.jpg',
    publishedAt: '2026-11-01',
    readingTime: '4 min read',
    contentHtml: `
      <p>An electric vehicle charged from the grid still has a carbon footprint. But charge it from your own rooftop solar, and every kilometre you drive is powered by the sun.</p>
      <h2>What you need</h2>
      <ul>
        <li>A rooftop solar system sized for your home + car consumption</li>
        <li>A Type 2 AC charger (7.4 kW) installed at home</li>
        <li>A hybrid or on-grid inverter that supports load management</li>
      </ul>
      <h2>How much solar do you need?</h2>
      <p>A typical EV (e.g., Tata Nexon EV) uses about 12–15 kWh per 100 km. If you drive 40 km a day, that\u2019s ~6 kWh/day. A 1 kW solar panel generates ~4–5 kWh/day, so adding 2 kW of panels covers your daily driving.</p>
      <p>Krypton Energy designs solar + EV charger setups as a single system, so your charger syncs with solar surplus automatically.</p>
    `,
  },
  {
    slug: 'battery-storage-for-indian-homes',
    title: 'Battery Storage: Is It Worth It for Indian Homes?',
    excerpt: 'Lithium battery storage adds backup power and energy independence to your solar system. Here\u2019s when it makes sense and when it doesn\u2019t.',
    category: 'Battery',
    coverImage: '/media/kry/kry-5.jpg',
    publishedAt: '2026-11-03',
    readingTime: '5 min read',
    contentHtml: `
      <p>Battery storage lets you store excess solar energy during the day and use it at night or during power cuts. But it adds ₹1.5–4 lakh to your system cost. Is it worth it?</p>
      <h2>When battery storage makes sense</h2>
      <ul>
        <li>You experience frequent or long power cuts</li>
        <li>Your DISCOM has time-of-day tariffs (charge cheap, use expensive)</li>
        <li>You want maximum energy independence</li>
        <li>You already have solar and want to upgrade</li>
      </ul>
      <h2>When to skip it</h2>
      <ul>
        <li>Your grid is reliable and tariffs are flat</li>
        <li>You\u2019re on a tight budget (add battery later)</li>
        <li>Your consumption is low and solar already covers it</li>
      </ul>
      <p>Krypton Energy offers battery-ready hybrid inverters, so you can add storage later without replacing the inverter. Start with solar, upgrade when ready.</p>
    `,
  },
]