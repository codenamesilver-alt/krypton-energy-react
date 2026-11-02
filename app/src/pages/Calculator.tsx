import { useMemo, useState } from 'react'
import { useQuoteModal } from '../context/QuoteModal'
import '../styles/calculator.css'

const inr = (n: number) => '₹' + Math.round(n).toLocaleString('en-IN')

function num(v: string): number {
  const n = parseFloat(v)
  return isFinite(n) && n > 0 ? n : 0
}

// Special category states/UTs get a higher central subsidy cap (NE, Himalayan, island territories).
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

// Indicative state top-ups on top of the central PM Surya Ghar subsidy. State schemes are
// time-bound and budget-dependent, so these are best-effort and clearly labelled.
function stateTopup(state: string, kw: number): number {
  if (state === 'Delhi') return Math.min(kw, 3) * 10000
  if (state === 'Uttar Pradesh') return Math.min(kw, 2) * 15000
  if (state === 'Rajasthan') return kw >= 1 ? 17000 : 0
  return 0
}

function stateTopupNote(state: string): string {
  if (state === 'Delhi') return 'Delhi top-up: ₹10,000/kW up to 3 kW (max ₹30,000).'
  if (state === 'Uttar Pradesh') return 'UP top-up: ₹15,000/kW up to 2 kW (max ₹30,000).'
  if (state === 'Rajasthan') return 'Rajasthan (RREC) top-up: ~₹17,000 (indicative).'
  if (['Gujarat', 'Maharashtra', 'Haryana', 'Kerala', 'Assam', 'Jammu & Kashmir'].includes(state))
    return `${state} runs additional schemes that vary by DISCOM/budget — check the state nodal agency.`
  return 'No fixed state top-up recorded here; central subsidy applies. Check your state nodal agency for time-bound schemes.'
}

export default function CalculatorPage() {
  const { open: openQuote } = useQuoteModal()
  const [bill, setBill] = useState('8000')
  const [off, setOff] = useState(80)
  const [tar, setTar] = useState('8')
  const [yld, setYld] = useState('4')
  const [cpk, setCpk] = useState('60000')
  const [esc, setEsc] = useState('3')
  const [state, setState] = useState('Bihar')
  const [overrideSub, setOverrideSub] = useState('') // empty = use computed subsidy

  const result = useMemo(() => {
    const b = num(bill), o = num(String(off)) / 100, t = num(tar), y = num(yld), c = num(cpk), e = num(esc) / 100
    if (!b || !t || !y) {
      return { kw: '0 kW', ms: '₹0', net: '₹0', pb: '–', s25: '₹0', nb: '₹0', ys: '₹0', ysn: 'Enter your bill, tariff and solar output to see results.',
        central: 0, stateTop: 0, subsidy: 0, kwNum: 0 }
    }
    const units = b / t
    const solarUnits = units * o
    let kw = solarUnits / (y * 30.4)
    kw = Math.max(1, Math.round(kw * 10) / 10)
    const gen = kw * y * 365
    const yearSave = Math.min(gen, units * 12) * t
    const special = SPECIAL_STATES.has(state)
    const cs = centralSubsidy(kw, special)
    const st = stateTopup(state, kw)
    const computedSub = cs + st
    const sub = overrideSub.trim() !== '' ? num(overrideSub) : computedSub
    const cost = Math.max(0, kw * c - sub)
    let total = 0
    let pb: number | null = null
    for (let yr = 1; yr <= 25; yr++) {
      const sv = Math.min(gen * Math.pow(0.993, yr - 1), units * 12) * t * Math.pow(1 + e, yr - 1)
      total += sv
      if (pb === null && total >= cost) {
        const prev = total - sv
        pb = yr - 1 + (cost - prev) / sv
      }
    }
    return {
      kw: kw.toFixed(1) + ' kW',
      ms: inr(yearSave / 12),
      net: inr(cost),
      pb: pb === null ? '25+ yrs' : pb.toFixed(1) + ' yrs',
      s25: inr(Math.max(0, total - cost)),
      nb: inr(Math.max(0, b - yearSave / 12)),
      ys: inr(yearSave),
      ysn: 'in your first year, at today’s tariff',
      central: cs, stateTop: st, subsidy: sub, kwNum: kw,
    }
  }, [bill, off, tar, yld, cpk, esc, state, overrideSub])

  const special = SPECIAL_STATES.has(state)

  return (
    <main id="main">
      <section className="section calc" id="calculator">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <div className="kicker">Savings calculator</div>
              <h2>See how much you could save <span>with solar.</span></h2>
            </div>
            <p>Honest numbers. Plain language. No fine print. Change any assumption to match your situation.</p>
          </div>

          <div className="calc-grid">
            <div>
              <div className="f">
                <label htmlFor="bill">Your average monthly electricity bill (₹)</label>
                <input id="bill" type="number" inputMode="numeric" min={0} step={100} value={bill} onChange={(e) => setBill(e.target.value)} />
              </div>
              <div className="f">
                <label htmlFor="off">Share of your bill to cover with solar <span className="rv" id="offv">{off}%</span></label>
                <input id="off" type="range" min={30} max={100} step={5} value={off} onChange={(e) => setOff(Number(e.target.value))} />
                <small>Most customers size the system to cover the bulk of their daytime use.</small>
              </div>

              <div className="f">
                <label htmlFor="state">Your state / UT (for subsidy)</label>
                <select id="state" value={state} onChange={(e) => setState(e.target.value)}>
                  {STATES.map((s) => <option key={s} value={s}>{s}{SPECIAL_STATES.has(s) ? ' (special category)' : ''}</option>)}
                </select>
                <small>{stateTopupNote(state)}</small>
              </div>

              <div className="adv">
                <h3>Assumptions you can edit</h3>
                <div className="two">
                  <div className="f">
                    <label htmlFor="tar">Tariff (₹ per unit)</label>
                    <input id="tar" type="number" inputMode="decimal" min={1} step={0.5} value={tar} onChange={(e) => setTar(e.target.value)} />
                  </div>
                  <div className="f">
                    <label htmlFor="yld">Solar output Unit/Day</label>
                    <input id="yld" type="number" inputMode="decimal" min={1} step={0.1} value={yld} onChange={(e) => setYld(e.target.value)} />
                  </div>
                  <div className="f">
                    <label htmlFor="cpk">System cost (₹ per kW)</label>
                    <input id="cpk" type="number" inputMode="numeric" min={0} step={1000} value={cpk} onChange={(e) => setCpk(e.target.value)} />
                  </div>
                  <div className="f">
                    <label htmlFor="sub">Override total subsidy (₹, leave blank to auto)</label>
                    <input id="sub" type="number" inputMode="numeric" min={0} step={1000} value={overrideSub} placeholder={inr(result.subsidy)} onChange={(e) => setOverrideSub(e.target.value)} />
                  </div>
                </div>
                <div className="f" style={{ marginBottom: 0 }}>
                  <label htmlFor="esc">Yearly rise in electricity tariff (%)</label>
                  <input id="esc" type="number" inputMode="decimal" min={0} step={0.5} value={esc} onChange={(e) => setEsc(e.target.value)} />
                  <small>Illustrative starting values. Enter your own tariff and the subsidy that applies to you.</small>
                </div>
              </div>
            </div>

            <div className="res" aria-live="polite">
              <div className="turn">
                <div className="lab">Estimated yearly saving</div>
                <div className="big">{result.ys}</div>
                <div className="sub">{result.ysn}</div>
              </div>
              <div className="res-list">
                <div className="res-row"><span className="rl">Suggested system size</span><span className="rv">{result.kw}</span></div>
                <div className="res-row"><span className="rl">Saving every month</span><span className="rv gold">{result.ms}</span></div>
                <div className="res-row"><span className="rl">Central subsidy (PM Surya Ghar)</span><span className="rv">{inr(result.central)}{special ? ' (special category)' : ''}</span></div>
                <div className="res-row"><span className="rl">State top-up</span><span className="rv">{inr(result.stateTop)}</span></div>
                <div className="res-row"><span className="rl">Total subsidy</span><span className="rv">{inr(result.subsidy)}</span></div>
                <div className="res-row"><span className="rl">Cost after subsidy</span><span className="rv">{result.net}</span></div>
                <div className="res-row"><span className="rl">Payback time</span><span className="rv">{result.pb}</span></div>
                <div className="res-row"><span className="rl">Net saving over 25 years</span><span className="rv gold">{result.s25}</span></div>
                <div className="res-row"><span className="rl">New monthly bill (approx.)</span><span className="rv">{result.nb}</span></div>
              </div>
              <p className="calc-note" style={{ marginTop: 16 }}>Subsidy figures are indicative. Central subsidy follows the PM Surya Ghar slab (₹30,000/kW for first 2 kW, ₹18,000 for the 3rd kW, max ₹78,000; ₹1,17,000 in special category states/UTs). State top-ups are time-bound and budget-dependent — verify with your DISCOM / state nodal agency before committing. These are estimates for guidance only; your actual savings depend on your roof, sanctioned load, tariff slab and available subsidy. Our team confirms the final numbers after a free site survey.</p>
              <div style={{ marginTop: 22 }}>
                <button className="btn btn-gold" onClick={openQuote}>Request Quote</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}