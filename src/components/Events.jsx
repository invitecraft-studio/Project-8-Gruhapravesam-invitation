import { useState } from "react";
import Tilt from "./Tilt.jsx";
import { MuhurthamArt, BhojanamArt } from "./InviteArt.jsx";
import { events, venue, schedule } from "../data/homeData.js";
import { downloadICS } from "../utils/ics.js";
import { useLang } from "../i18n.jsx";

const Sun = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><circle cx="12" cy="12" r="4.2" fill="currentColor" /><g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M12 2.5v2.4M12 19.1v2.4M2.5 12h2.4M19.1 12h2.4M5.3 5.3l1.7 1.7M17 17l1.7 1.7M5.3 18.7L7 17M17 7l1.7-1.7" /></g></svg>
);
const Leaf = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M20 4C9 4 4 9 4 15c0 2 .8 3.6 2 5 1.4-6 5-9.6 10-11-4 2.5-7 6-8.4 11.4C14 21 20 17 20 4z" fill="currentColor" /></svg>
);

export default function Events({ onZoom }) {
  const { t } = useLang();
  const [ev, setEv] = useState("muhurtham");
  const e = events[ev];
  const sch = ev === "muhurtham" ? schedule.morning : schedule.lunch;
  const Art = ev === "muhurtham" ? MuhurthamArt : BhojanamArt;
  const maps = `https://www.google.com/maps/search/?api=1&query=${venue.mapsQuery}`;

  return (
    <section className="events" id="events" data-nav="events" data-ev={ev}>
      <div className="events-inner">
        <p className="eyebrow">{t("eventsTitle")}</p>
        <div className="switch" role="tablist" aria-label="Choose a part of the day" data-ev={ev}>
          <span className="switch-thumb" aria-hidden="true" />
          <button type="button" role="tab" aria-selected={ev === "muhurtham"} onClick={() => setEv("muhurtham")}>
            <Sun /> <span>{t("muhurtham")}<small>{events.muhurtham.time}</small></span>
          </button>
          <button type="button" role="tab" aria-selected={ev === "bhojanam"} onClick={() => setEv("bhojanam")}>
            <Leaf /> <span>{t("bhojanam")}<small>{events.bhojanam.time}</small></span>
          </button>
        </div>

        <div className="events-grid" key={ev}>
          <div className="ev-card">
            <Tilt max={7}>
              <button type="button" className="ev-art" onClick={() => onZoom(ev)} aria-label={`View the ${e.title} invitation full screen`}>
                <Art />
                <span className="ev-art-hint">{t("enlarge")}</span>
              </button>
            </Tilt>
          </div>

          <div className="ev-info">
            <p className="ev-day">{e.day}</p>
            <h3 className="ev-title">{e.title}</h3>
            <p className="ev-time">{e.time} <i>·</i> {e.until}</p>
            <p className="ev-quote">“{e.quote}”</p>
            <div className="ev-links">
              <button type="button" className="btn btn-line" onClick={() => downloadICS(ev)}>+ {t("addCal")}</button>
              <a className="btn btn-line" href={maps} target="_blank" rel="noopener noreferrer">{t("directions")}</a>
            </div>

            <h4 className="ev-sub">{t("scheduleTitle")}</h4>
            <ol className="ev-sched">
              {sch.items.map((it) => (
                <li key={it.time + it.what}>
                  <time>{it.time}</time>
                  <div><strong>{it.what}</strong>{it.note && <p>{it.note}</p>}</div>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="ev-venue">
          <div className="ev-venue-text">
            <h4>{venue.name}</h4>
            <p>{venue.address}</p>
            <a className="btn btn-line" href={maps} target="_blank" rel="noopener noreferrer">{t("openMaps")}</a>
          </div>
          <div className="ev-map">
            <iframe title={`Map of ${venue.name}`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" src={venue.mapsEmbed} />
          </div>
        </div>
      </div>
    </section>
  );
}
