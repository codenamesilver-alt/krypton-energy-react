import { processSteps } from '../data/content'

export default function Process() {
  return (
    <section className="section" id="process">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <div className="kicker">From roof to meter</div>
            <h2>Four steps. No surprises in between.</h2>
          </div>
          <p>The part most installers skip is the paperwork and the net meter. We treat both as part of the job, not as your problem.</p>
        </div>

        <div className="steps">
          {processSteps.map((s) => (
            <div className="step reveal" key={s.n}>
              <div className="num">STEP {s.n}</div>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}