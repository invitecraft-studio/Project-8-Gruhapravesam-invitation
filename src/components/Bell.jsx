import { useState } from "react";
import { bell } from "../utils/sound.js";

/* A brass bell. Tap it to ring. */
export default function Bell({ side = "l" }) {
  const [ringing, setRinging] = useState(false);
  const ring = () => { bell(); setRinging(true); window.setTimeout(() => setRinging(false), 1500); };
  return (
    <button type="button" className={`bell bell--${side}${ringing ? " ringing" : ""}`} onClick={ring} aria-label="Ring the bell">
      <svg viewBox="0 0 40 64" width="38" height="61" aria-hidden="true">
        <path d="M20 0V14" stroke="#e6cf94" strokeWidth="1.5" />
        <path d="M7 42 C7 26 13 16 20 16 C27 16 33 26 33 42 L38 49 H2Z" fill="#e0b04c" stroke="#8a5e14" strokeWidth="1.2" />
        <path d="M13 30 C14 24 17 20 20 20" stroke="#fff3b0" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        <circle cx="20" cy="55" r="4.5" fill="#b8862e" stroke="#6b470c" />
      </svg>
    </button>
  );
}
