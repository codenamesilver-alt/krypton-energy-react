export type Product = {
  name: string
  spec: string
  note: string
}

export const products: Product[] = [
  { name: 'Solar Panels', spec: 'TOPCon N-Type · 545–590 Wp', note: 'Tier 1 · ALMM listed' },
  { name: 'Inverters', spec: 'Hybrid & On-Grid · 3–100 kW', note: 'String & central' },
  { name: 'Batteries', spec: 'Li · Lead-Acid · AGM · 5–30 kWh', note: '5,000+ cycles (Li)' },
  { name: 'EV Home Chargers', spec: 'AC Type 2 · 7.4–22 kW', note: 'OCPP 1.6' },
]

export const processSteps = [
  { n: '01', title: 'Survey', body: 'Roof assessment, shadow analysis, and sanctioned-load check before any quote is issued.' },
  { n: '02', title: 'Design', body: 'System sized to your bill, not to a sales target. Single-line diagram and layout shared for approval.' },
  { n: '03', title: 'Install', body: 'Our own crew. Mounting, cabling, earthing, and commissioning in 2–4 days for a typical home.' },
  { n: '04', title: 'Handover', body: 'Net-meter application filed, subsidy paperwork submitted, monitoring app configured.' },
]

export const locations = [
  { city: 'Patna', region: 'Bihar', note: 'Head office · survey & install' },
  { city: 'Delhi NCR', region: 'Delhi', note: 'Sales & commercial projects' },
  { city: 'Uttarakhand', region: 'Uttarakhand', note: 'Hill-region specialists' },
]

export const promises = [
  { title: 'Own crew, not subcontractors', body: 'The same engineers who survey your roof install it. No hand-offs, no finger-pointing.' },
  { title: 'Priced in public', body: 'System cost, subsidy, and expected savings shown before you sign. No "call for price".' },
  { title: 'Paperwork handled', body: 'Net meter, subsidy, and DISCOM liaison filed by us. You sign twice.' },
  { title: 'Service on a schedule', body: 'Year 1, 3, 5, 10 inspections written into the contract, not promised verbally.' },
]

export const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/backup', label: 'About Us' },
  { to: '/products', label: 'Our Products' },
  { to: '/calculator', label: 'Calculator' },
  { to: '/contact', label: 'Contact Us' },
]
