export default function Locations() {
  return (
    <section className="section" id="places">
      <div className="wrap">
        <div className="sec-head places-head">
          <div>
            <div className="kicker">Where we work</div>
            <h2>Close enough to come back.</h2>
          </div>
        </div>

        <a className="place-row" href="#">
          <span className="place-name">Patna</span>
          <span className="place-coord">25.5941° N<br />85.1376° E</span>
          <span className="place-desc">Bihar's residential rooftop programme, with local survey teams and DISCOM liaison for Patna and nearby districts.</span>
        </a>
        <a className="place-row" href="#">
          <span className="place-name">Delhi NCR</span>
          <span className="place-coord">28.6139° N<br />77.2090° E</span>
          <span className="place-desc">Rooftop systems for independent homes, builder floors and housing societies across Delhi, Gurugram and Noida.</span>
        </a>
        <a className="place-row" href="#">
          <span className="place-name">Uttarakhand</span>
          <span className="place-coord">30.3165° N<br />78.0322° E</span>
          <span className="place-desc">Hill-climate sizing, snow and wind loading, and service coverage across Uttarakhand and the surrounding valley.</span>
        </a>
        <a className="place-row place-biz" href="#business">
          <span className="place-name">PAN India C&amp;I</span>
          <span className="place-coord">Any site<br />any state</span>
          <span className="place-desc">Industrial and commercial projects delivered nationwide, with feasibility, EPC and O&amp;M under one contract.</span>
        </a>
      </div>
    </section>
  )
}
