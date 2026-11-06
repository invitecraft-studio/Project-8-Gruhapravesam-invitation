import { useEffect, useMemo, useRef, useState } from "react";
import Diya from "./Diya.jsx";
import { verse, blessing } from "../data/homeData.js";

const reduce = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* The words of the prayer light up one by one as the guest scrolls. */
export default function Verse() {
  const box = useRef(null);
  const [p, setP] = useState(reduce() ? 1 : 0);
  const words = useMemo(() => verse.text.split(" "), []);

  useEffect(() => {
    if (reduce()) return;
    let raf = 0;
    const calc = () => {
      const el = box.current; if (!el) return;
      const r = el.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      setP(Math.min(1, Math.max(0, -r.top / (total * 0.85))));
    };
    const on = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(calc); };
    calc();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("scroll", on); window.removeEventListener("resize", on); };
  }, []);

  const lit = Math.ceil(p * words.length);

  return (
    <>
      <section className="verse night" id="verse" ref={box}>
        <div className="verse-stick">
          <p className="verse-salaam te">{verse.greeting}</p>
          <Diya lit={Math.min(1, 0.25 + p)} size={92} uid="v" className="verse-moon" />
          <p className="verse-ar te" style={{ opacity: 0.35 + 0.65 * Math.min(1, p * 3) }}>{verse.sanskrit}</p>
          <p className="verse-text" aria-label={verse.text}>
            {words.map((w, i) => (<span key={i} className={i < lit ? "w on" : "w"} aria-hidden="true">{w} </span>))}
          </p>
          <cite className="verse-ref" style={{ opacity: p > 0.9 ? 1 : 0 }}>{verse.ref}</cite>
        </div>
      </section>
      <section className="dua day reveal">
        <p className="verse-note">{verse.note}</p>
        <div className="dua-card">
          <p className="dua-label">Aashirvadam · A blessing for the home</p>
          <p className="dua-ar te">{blessing.te}</p>
          <p className="dua-tr">{blessing.translit}</p>
          <p className="dua-en">{blessing.text}</p>
        </div>
      </section>
    </>
  );
}
