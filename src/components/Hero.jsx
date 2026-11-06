import Stars from "./Stars.jsx";
import Tilt from "./Tilt.jsx";
import Toran from "./Toran.jsx";
import Bell from "./Bell.jsx";
import { IMG } from "../images.js";
import { host, dayLong, place } from "../data/homeData.js";
import { useLang } from "../i18n.jsx";

export default function Hero() {
  const { t, guest } = useLang();
  return (
    <section className="hero night" id="top" data-nav="top">
      <div className="hero-bg" style={{ backgroundImage: `url(${IMG.house})` }} aria-hidden="true" />
      <Stars count={50} />
      <Toran />
      <Bell side="l" /><Bell side="r" />
      <p className="hero-kicker">{guest ? `${t("dear")} ${guest},` : t("salaam")}</p>
      <div className="hero-float">
        <Tilt className="hero-tilt">
          <div className="cover-card" style={{ backgroundImage: `url(${IMG.frame})` }}>
            <div className="cover-text">
              <p className="cv-small">{t("together")}</p>
              <h1 className="cv-te te" aria-label="Gruhapravesam, the housewarming of our new home">శుభ గృహప్రవేశం</h1>
              <p className="cv-script" aria-hidden="true">Gruhapravesam</p>
              <p className="cv-small">{t("invite")}</p>
              <p className="cv-date">{dayLong}</p>
              <p className="cv-small">{host.names} · {place}</p>
            </div>
            <span className="cover-shine" aria-hidden="true" />
          </div>
        </Tilt>
      </div>
      <a className="scroll-hint" href="#verse" aria-label="Scroll down">
        <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M5 9l7 7 7-7" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>
      </a>
    </section>
  );
}
