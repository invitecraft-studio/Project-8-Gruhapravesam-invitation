# Gruhapravesam invitation website (React + Vite)

A mobile-first housewarming invitation. Press and hold to light the diya and the carved doors swing open onto: a swaying toran with tappable bells, a scroll-lit Ganapati prayer, a live countdown, the story of the home, an interactive Pal Ubikindi (hold to boil the milk until it overflows), muhurtham and lunch tabs with zoomable invitation cards, a photo gallery, a schematic guest map, family, and a WhatsApp RSVP with a downloadable guest pass. English and Telugu toggle included.

## Run it
```bash
npm install
npm run dev
```

## Change the details
Edit **`src/data/homeData.js`**. All names, timings, address, story and helpers there are SAMPLE content (the address is the real venue: Street 1, Podalakur Road, Nellore 524004).
- `EVENT_DATE` and `RSVP_BY_DATE` (first lines) re-date the site, the countdown and the calendar files.
- `rsvp.whatsapp`: number that receives RSVPs (country code, no `+`, e.g. `919876543210`).
- `venue.mapsQuery` / `venue.mapsEmbed`: put the real home location.
- `cities`: where guests travel from; mark one with `home: true`.
- Telugu wording for the interface is in `src/i18n.jsx`.
- Personal links: `yoursite.com/?guest=Lakshmi%20Garu` greets that guest by name.

Artwork is in `src/assets/`.

## Build
```bash
npm run build              # normal build (dist/)
npm run build:standalone   # one self-contained dist-standalone/index.html
```
## Deploy (Vercel)
Push to GitHub, import in Vercel (framework: Vite). In `index.html` replace `YOUR-SITE.vercel.app` (3 places) so WhatsApp shows `public/og-share.jpg`.
