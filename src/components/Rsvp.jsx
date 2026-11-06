import { useState } from "react";
import { host, rsvp, dayShort } from "../data/homeData.js";
import { downloadPass } from "../utils/pass.js";
import { useLang } from "../i18n.jsx";

export default function Rsvp() {
  const { t, guest } = useLang();
  const [name, setName] = useState(guest || "");
  const [answer, setAnswer] = useState("yes");
  const [guests, setGuests] = useState(1);
  const [which, setWhich] = useState("both");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [lanterns, setLanterns] = useState([]);

  function release(text) {
    const id = Date.now();
    setLanterns((l) => [...l, { id, text, left: 20 + Math.random() * 60 }]);
    window.setTimeout(() => setLanterns((l) => l.filter((x) => x.id !== id)), 9000);
  }

  function submit(e) {
    e.preventDefault();
    if (!name.trim()) { setError("Please enter your name so the family knows who replied."); return; }
    setError("");
    const whichText = { both: "the muhurtham and the lunch", muhurtham: "the muhurtham only", bhojanam: "the lunch only" }[which];
    const body = answer === "yes"
      ? `Namaskaram! This is ${name.trim()}. We will gladly join the Gruhapravesam of ${host.names} on ${dayShort}.\nGuests: ${guests}\nAttending: ${whichText}`
      : `Namaskaram! This is ${name.trim()}. We are sorry we cannot attend the Gruhapravesam of ${host.names}, but you have our blessings and best wishes.`;
    const text = body + (msg.trim() ? `\n\nBlessing: ${msg.trim()}` : "");
    release(msg.trim() || "శుభం భూయాత్! Congratulations on your new home");
    const base = rsvp.whatsapp ? `https://wa.me/${rsvp.whatsapp}` : "https://wa.me/";
    window.setTimeout(() => window.open(`${base}?text=${encodeURIComponent(text)}`, "_blank", "noopener"), 900);
  }

  return (
    <section className="rsvp night reveal" id="rsvp" data-nav="rsvp">
      <h2 className="h2">{t("rsvpTitle")}</h2>
      <p className="sub">{t("rsvpSub")} {rsvp.deadline}</p>

      <form className="rsvp-form" onSubmit={submit} noValidate>
        <label>Your name
          <input value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
        </label>

        <fieldset>
          <legend>Can you come?</legend>
          <div className="choices">
            <label className={answer === "yes" ? "is-on" : ""}>
              <input type="radio" name="answer" checked={answer === "yes"} onChange={() => setAnswer("yes")} />Yes, with joy
            </label>
            <label className={answer === "no" ? "is-on" : ""}>
              <input type="radio" name="answer" checked={answer === "no"} onChange={() => setAnswer("no")} />Sorry, I can't
            </label>
          </div>
        </fieldset>

        {answer === "yes" && (
          <div className="row">
            <label>Guests (including you)
              <select value={guests} onChange={(e) => setGuests(Number(e.target.value))}>
                {[1, 2, 3, 4, 5, 6].map((n) => <option key={n} value={n}>{n}</option>)}
              </select>
            </label>
            <label>Which parts?
              <select value={which} onChange={(e) => setWhich(e.target.value)}>
                <option value="both">Muhurtham and lunch</option>
                <option value="muhurtham">Muhurtham only</option>
                <option value="bhojanam">Lunch only</option>
              </select>
            </label>
          </div>
        )}

        <label>A blessing or wish for the new home (optional)
          <textarea rows="3" value={msg} onChange={(e) => setMsg(e.target.value)} />
        </label>

        {error && <p className="form-error" role="alert">{error}</p>}
        <div className="rsvp-actions">
          <button type="submit" className="btn btn-gold">{t("send")}</button>
          <button type="button" className="btn btn-line" onClick={() => downloadPass(name.trim())}>{t("pass")}</button>
        </div>
        <p className="rsvp-tip">Your blessing rises as a glowing lamp on this page, and the reply opens in WhatsApp, ready to send.</p>
      </form>

      <div className="lantern-sky" aria-hidden="true">
        {lanterns.map((l) => (
          <div key={l.id} className="lantern-rise" style={{ left: l.left + "%" }}>
            <span className="lr-body" />
            <span className="lr-text">{l.text.slice(0, 80)}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
