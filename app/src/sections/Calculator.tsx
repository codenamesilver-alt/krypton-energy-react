import { useMemo, useState } from 'react'

const inr = (n: number) => '₹' + Math.round(n).toLocaleString('en-IN')

const SPECIAL_STATES = new Set([
  'Arunachal Pradesh', 'Assam', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Sikkim', 'Tripura',
  'Himachal Pradesh', 'Uttarakhand', 'Jammu & Kashmir', 'Ladakh',
  'Andaman & Nicobar Islands', 'Lakshadweep',
])

const STATES = [
  'Andaman & Nicobar Islands', 'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar',
  'Chandigarh', 'Chhattisgarh', 'Dadra & Nagar Haveli and Daman & Diu', 'Delhi', 'Goa',
  'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jammu & Kashmir', 'Jharkhand', 'Karnataka',
  'Kerala', 'Ladakh', 'Lakshadweep', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya',
  'Mizoram', 'Nagaland', 'Odisha', 'Puducherry', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
]

function centralSubsidy(kw: number, special: boolean): number {
  const base = kw <= 2 ? 30000 * kw : 60000 + 18000 * (kw - 2)
  const capped = Math.min(base, 78000)
  if (special) return Math.min(capped * 1.5, 117000)
  return capped
}

function stateTopup(state: string, kw: number): number {
  if (state === 'Delhi') return Math.min(kw, 3) * 10000
  if (state === 'Uttar Pradesh') return Math.min(kw, 2) * 15000
  if (state === 'Rajasthan') return kw >= 1 ? 17000 : 0
  return 0
}

export default function Calculator() {
  const [bill, setBill] = useState(4000)
  const [state, setState] = useState('Bihar')

  const { kw, gen, central, stateTop, sub, net, payback } = useMemo(() => {
    const units = bill / 8
    const k = Math.max(1, Math.min(100, Math.round((units / 120) * 2) / 2))
    const g = Math.round(k * 120)
    const gr = k * 58000
    const special = SPECIAL_STATES.has(state)
    const c = centralSubsidy(k, special)
    const st = stateTopup(state, k)
    const s = c + st
    const n = Math.max(0, gr - s)
    const p = n / (bill * 0.9 * 12)
    return { kw: k, gen: g, central: c, stateTop: st, sub: s, net: n, payback: p }
  }, [bill, state])

  return (
    <section className="section calc" id="calculator">
      <div className="wrap calc-grid">
        <div>
          <div className="kicker">Estimate first</div>
          <h2>What could your roof take off the bill?</h2>
          <p className="lede">Move the slider to your average monthly electricity bill. We will show the system size, the subsidy you may qualify for, and a realistic payback.</p>

          <div className="bill-field">
            <label htmlFor="billRange">Average monthly bill</label>
            <div className="bill-row"><span className="rupee">₹</span><input id="billOut" value={bill.toLocaleString('en-IN')} inputMode="numeric" aria-live="polite" readOnly tabIndex={-1} /></div>
          </div>
          <input id="billRange" type="range" min={1000} max={20000} step={500} value={bill} aria-label="Average monthly electricity bill in rupees" onChange={(e) => setBill(Number(e.target.value))} />

          <div className="f" style={{ marginTop: 16 }}>
            <label htmlFor="stateSel">State / UT (for subsidy)</label>
            <select id="stateSel" value={state} onChange={(e) => setState(e.target.value)}>
              {STATES.map((s) => <option key={s} value={s}>{s}{SPECIAL_STATES.has(s) ? ' (special category)' : ''}</option>)}
            </select>
          </div>

          <p className="calc-note">Indicative only. Final sizing depends on roof area, shading, sanction load and DISCOM rules. Subsidy figures follow the PM Surya Ghar residential slab plus any state top-up.</p>
        </div>

        <div className="results" aria-live="polite">
          <div className="result"><div className="rlabel">Recommended system</div><div className="rval" id="rKw">{kw.toFixed(1)} kW</div><div className="rsub" id="rUnits">≈ {gen.toLocaleString('en-IN')} units generated a month</div></div>
          <div className="result"><div className="rlabel">Central subsidy (PM Surya Ghar)</div><div className="rval" id="rSub">{inr(central)}</div><div className="rsub">{SPECIAL_STATES.has(state) ? 'Special category state' : 'General category state'}</div></div>
          <div className="result"><div className="rlabel">State top-up</div><div className="rval" id="rStateTop">{inr(stateTop)}</div><div className="rsub">Indicative, time-bound</div></div>
          <div className="result"><div className="rlabel">Total subsidy</div><div className="rval" id="rTotalSub">{inr(sub)}</div><div className="rsub">Central + state</div></div>
          <div className="result"><div className="rlabel">Your investment</div><div className="rval" id="rNet">{inr(net)}</div><div className="rsub">after subsidy, before financing</div></div>
          <div className="result highlight"><div className="rlabel">Payback</div><div className="rval" id="rPay">{payback.toFixed(1)} yrs</div><div className="rsub">at ₹8 per unit, 90% offset</div></div>
        </div>
      </div>
    </section>
  )
}