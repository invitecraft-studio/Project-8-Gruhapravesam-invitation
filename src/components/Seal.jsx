import { useEffect, useRef, useState } from "react";
import Diya from "./Diya.jsx";
import { IMG } from "../images.js";
import { bell } from "../utils/sound.js";
import { verse } from "../data/homeData.js";
import { useLang } from "../i18n.jsx";

const HOLD_MS = 1300;
const C = 2 * Math.PI * 84;

/* Press and hold to light the diya. The carved doors then swing open onto the invitation. */
export default function Seal({ onStart, onDone }) {
  const { t, guest } = useLang();
  const [p, setP] = useState(0);
  const [cracked, setCracked] = useState(false);
  const raf = useRef(0);
  const t0 = useRef(0);
  const doneRef = useRef(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; cancelAnimationFrame(raf.current); };
  }, []);

  function finish() {
    if (doneRef.current) return;
    doneRef.current = true;
    cancelAnimationFrame(raf.current);
    setP(1); setCracked(true);
    bell();
    if (navigator.vibrate) navigator.vibrate(35);
    onStart();
    window.setTimeout(onDone, 2700);
  }
  function down() {
    if (doneRef.current) return;
    cancelAnimationFrame(raf.current);
    t0.current = performance.now();
    const tick = (now) => {
      const v = Math.min(1, (now - t0.current) / HOLD_MS);
      setP(v);
      if (v >= 1) { finish(); return; }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
  }
  function up() {
    if (doneRef.current) return;
    cancelAnimationFrame(raf.current);
    setP(0);
  }
  const key = (e) => { if (e.key === " " || e.key === "Enter") { e.preventDefault(); if (!e.repeat) down(); } };
  const keyUp = (e) => { if (e.key === " " || e.key === "Enter") up(); };

  return (
    <div className={"seal-screen" + (cracked ? " is-cracked" : "")} style={{ "--door": `url(${IMG.door})` }}>
      <div className="door-glow" />
      <div className="door-stage" aria-hidden="true">
        <div className="door-half l" /><div className="door-half r" />
      </div>
      <div className="seal-wrap">
        {guest && <p className="seal-for">{t("forGuest")} {guest}</p>}
        <p className="seal-bismillah te">{verse.greeting}</p>
        <div className="seal-ring" style={{ "--p": p }}>
          <svg viewBox="0 0 180 180" className="seal-progress" aria-hidden="true">
            <circle cx="90" cy="90" r="84" fill="none" stroke="rgba(230,207,148,0.2)" strokeWidth="2" />
            <circle cx="90" cy="90" r="84" fill="none" stroke="#e6cf94" strokeWidth="3" strokeLinecap="round"
              strokeDasharray={C} strokeDashoffset={C * (1 - p)} transform="rotate(-90 90 90)" />
          </svg>
          <button
            type="button"
            className={"seal-btn" + (p > 0 && !cracked ? " is-holding" : "")}
            style={{ transform: `scale(${1 + p * 0.08})` }}
            aria-label="Press and hold to light the diya and open the invitation"
            onPointerDown={down} onPointerUp={up} onPointerLeave={up} onPointerCancel={up}
            onKeyDown={key} onKeyUp={keyUp} onContextMenu={(e) => e.preventDefault()}
          >
            <Diya lit={p} uid="s" />
          </button>
        </div>
        <p className="seal-hint">{t("holdSeal")}</p>
        <button type="button" className="seal-skip" onClick={finish}>{t("skip")}</button>
      </div>
    </div>
  );
}
