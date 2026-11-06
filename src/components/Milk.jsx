import { useEffect, useRef, useState } from "react";
import Stars from "./Stars.jsx";
import Kolam from "./Kolam.jsx";
import { bell } from "../utils/sound.js";
import { useLang } from "../i18n.jsx";

/* Pal Ubikindi: hold the button to heat the milk until it overflows. */
export default function Milk() {
  const { t } = useLang();
  const [h, setH] = useState(0);
  const [boiled, setBoiled] = useState(false);
  const holding = useRef(false), raf = useRef(0), last = useRef(0), hv = useRef(0), done = useRef(false);

  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  const loop = (now) => {
    const dt = Math.min(50, now - last.current) / 1000; last.current = now;
    hv.current = Math.max(0, Math.min(1, hv.current + (holding.current ? dt / 2.6 : -dt / 4)));
    setH(hv.current);
    if (hv.current >= 1 && !done.current) { done.current = true; setBoiled(true); bell(); if (navigator.vibrate) navigator.vibrate([40, 30, 40]); return; }
    if (holding.current || hv.current > 0) raf.current = requestAnimationFrame(loop);
  };
  const down = () => { if (done.current) return; holding.current = true; last.current = performance.now(); cancelAnimationFrame(raf.current); raf.current = requestAnimationFrame(loop); };
  const up = () => { holding.current = false; };
  const reset = () => { cancelAnimationFrame(raf.current); done.current = false; hv.current = 0; setH(0); setBoiled(false); };

  return (
    <section className="milk night reveal" id="milk">
      <Stars count={40} />
      <h2 className="h2">{t("milkTitle")}</h2>
      <p className="sub">{t("milkSub")}</p>
      <div className={"mk" + (boiled ? " boiled" : "")} style={{ "--h": h }}>
        <i className="mk-steam" style={{ left: 74 }} /><i className="mk-steam" style={{ left: 112, animationDelay: ".9s" }} /><i className="mk-steam" style={{ left: 150, animationDelay: "1.5s" }} />
        <div className="mk-milk" /><div className="mk-foam" />
        <i className="mk-drip l" /><i className="mk-drip r" />
        <div className="mk-pot" />
        <div className="mk-fire">{[0, 1, 2, 3, 4].map((i) => <i key={i} style={{ animationDelay: `${i * -0.13}s` }} />)}</div>
        <div className="mk-stove" />
      </div>
      <div className="mk-gauge" aria-hidden="true"><i style={{ width: `${h * 100}%` }} /></div>
      <p className="mk-msg te" aria-live="polite">{boiled ? t("boiled") : "\u00a0"}</p>
      <div className="mk-actions">
        {!boiled && (
          <button type="button" className="btn btn-gold" onPointerDown={down} onPointerUp={up} onPointerLeave={up} onPointerCancel={up} onContextMenu={(e) => e.preventDefault()}>🔥 {t("heat")}</button>
        )}
        {boiled && <button type="button" className="btn btn-line" onClick={reset}>{t("again")}</button>}
      </div>
      <div className="milk-kolam"><Kolam size={96} /></div>
    </section>
  );
}
