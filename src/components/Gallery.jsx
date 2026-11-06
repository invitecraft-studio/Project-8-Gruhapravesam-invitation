import { useState } from "react";
import Lightbox from "./Lightbox.jsx";
import { IMG } from "../images.js";
import { gallery } from "../data/homeData.js";
import { useLang } from "../i18n.jsx";

export default function Gallery() {
  const { t } = useLang();
  const [open, setOpen] = useState(null);
  return (
    <section className="gallery day reveal" id="gallery" data-nav="gallery">
      <p className="eyebrow">{t("swipe")} →</p>
      <h2 className="h2">{t("galleryTitle")}</h2>
      <p className="sub">{t("gallerySub")}</p>
      <div className="gal-track">
        {gallery.map((g) => (
          <button type="button" className="gal-item" key={g.key} onClick={() => setOpen(g)} aria-label={`View ${g.caption} full screen`}>
            <span className="gal-img"><img src={IMG[g.key]} alt={g.caption} loading="lazy" /></span>
            <b>{g.caption}</b>
          </button>
        ))}
      </div>
      <Lightbox open={!!open} onClose={() => setOpen(null)} ratio={open ? open.ratio : 1} label={open ? open.caption : ""}>
        {open && <img className="lb-img" src={IMG[open.key]} alt={open.caption} />}
      </Lightbox>
    </section>
  );
}
