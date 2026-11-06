import { IMG } from "../images.js";
import { host, venue, weekday, dayShort, events } from "../data/homeData.js";

/* The two printed-style invitation cards. They scale with their container
   (thumbnail in the events section, full size in the lightbox). */
export const ART_RATIO = { muhurtham: 735 / 1041, bhojanam: 1080 / 1920 };

export function MuhurthamArt() {
  const e = events.muhurtham;
  return (
    <div className="art art-muhurtham" style={{ backgroundImage: `url(${IMG.frame})` }}>
      <div className="art-text">
        <p className="a-small">With the blessings of our elders, we invite you to the</p>
        <p className="a-te te">శుభ గృహప్రవేశం</p>
        <p className="a-script">Gruhapravesam</p>
        <p className="a-small">of the new home of</p>
        <p className="a-names">{host.names}</p>
        <p className="a-small a-date-s">{weekday}, {dayShort}</p>
        <p className="a-title">Muhurtham · {e.time}</p>
      </div>
    </div>
  );
}

export function BhojanamArt() {
  const e = events.bhojanam;
  return (
    <div className="art art-bhojanam" style={{ backgroundImage: `url(${IMG.door})` }}>
      <div className="art-text">
        <p className="a-small">Please stay for the</p>
        <p className="a-script">Blessing Lunch</p>
        <p className="a-te te">భోజనం</p>
        <p className="a-title">{weekday}, {dayShort}</p>
        <p className="a-small">{e.time} onwards</p>
        <p className="a-small a-venue-s">{venue.name}</p>
      </div>
    </div>
  );
}
