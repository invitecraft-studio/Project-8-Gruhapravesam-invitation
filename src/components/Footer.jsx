import Stars from "./Stars.jsx";
import Kolam from "./Kolam.jsx";
import { host, dayShort, blessing, credit } from "../data/homeData.js";
import { useLang } from "../i18n.jsx";

export default function Footer() {
  const { t } = useLang();
  const share = () => {
    const text = `Namaskaram! You are invited to the Gruhapravesam of ${host.names} on ${dayShort}.\n${window.location.origin}${window.location.pathname}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank", "noopener");
  };
  return (
    <footer className="footer night reveal">
      <Stars count={40} />
      <div className="f-kolam"><Kolam size={120} /></div>
      <p className="f-names">{host.family}</p>
      <p className="f-line">{dayShort} · {host.hashtag}</p>
      <p className="f-arabic te">{blessing.te}</p>
      <p className="f-verse">{blessing.text}</p>
      <p className="f-verse">{t("footerNote")}</p>
      <button type="button" className="btn btn-line" onClick={share}>{t("share")}</button>
      <p className="f-credit">{credit}</p>
    </footer>
  );
}
