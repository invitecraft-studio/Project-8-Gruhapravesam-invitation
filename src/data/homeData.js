// ─────────────────────────────────────────────────────────────
//  Everything on the site comes from this one file.
//  Names, timings, address, story and helpers are SAMPLE content:
//  replace them with the real family's details.
// ─────────────────────────────────────────────────────────────

// ▼▼ RE-DATE THE WHOLE SITE WITH THESE TWO LINES ▼▼
const EVENT_DATE = "2026-11-12"; // YYYY-MM-DD
const RSVP_BY_DATE = "2026-11-09"; // YYYY-MM-DD
// ▲▲ labels, calendar files and the countdown all follow ▲▲

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const WEEKDAYS = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
function parts(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  return { y, d, dow: WEEKDAYS[new Date(Date.UTC(y, m - 1, d)).getUTCDay()], month: MONTHS[m - 1] };
}
const longDay = (iso) => { const p = parts(iso); return `${p.dow}, ${p.d} ${p.month} ${p.y}`; };
const shortDay = (iso) => { const p = parts(iso); return `${p.d} ${p.month} ${p.y}`; };

export const host = {
  names: "Ramesh & Lakshmi",
  family: "Ramesh & Lakshmi Family",
  hashtag: "#OurNewHome",
};

export const dayLong = longDay(EVENT_DATE);
export const dayShort = shortDay(EVENT_DATE);
export const weekday = parts(EVENT_DATE).dow;
export const rsvpDeadline = shortDay(RSVP_BY_DATE);
export const eventTarget = `${EVENT_DATE}T08:15:00+05:30`; // countdown ends at the muhurtham
export const place = "Nellore, Andhra Pradesh";

export const verse = {
  greeting: "ఓం శ్రీ గణేశాయ నమః",
  sanskrit: "వక్రతుండ మహాకాయ సూర్యకోటి సమప్రభ | నిర్విఘ్నం కురు మే దేవ సర్వకార్యేషు సర్వదా ||",
  text: "O Lord with the curved trunk and mighty form, whose splendour equals a million suns, remove all obstacles from all my endeavours, always.",
  ref: "Ganapati Prarthana",
  note: "We begin life in our new home with the blessings of Lord Ganesha and our elders, and we would be so happy to have you with us.",
};

export const blessing = {
  te: "ఆయురారోగ్యైశ్వర్యాభివృద్ధిరస్తు",
  translit: "Ayur-arogya-aishwarya-abhivriddhirastu",
  text: "May there be long life, good health and prosperity in this home.",
};

export const venue = {
  name: "Our New Home",
  hall: "",
  address: "Street 1, Podalakur Road, Nellore, Andhra Pradesh – 524004",
  mapsQuery: "Podalakur+Road+Nellore+524004",
  mapsEmbed: "https://maps.google.com/maps?q=Podalakur%20Road%20Nellore%20524004&t=&z=15&ie=UTF8&iwloc=&output=embed",
};

export const events = {
  muhurtham: {
    key: "muhurtham",
    title: "Gruhapravesam",
    day: dayLong,
    time: "8:15 AM",
    until: "about 9:30 AM",
    venue: `${venue.name}, ${place}`,
    quote: "Step into our new home with us at the auspicious muhurtham, and bless it with your presence.",
    icsStart: `${EVENT_DATE}T08:15:00+05:30`,
    icsEnd: `${EVENT_DATE}T09:30:00+05:30`,
  },
  bhojanam: {
    key: "bhojanam",
    title: "Blessing Lunch",
    day: dayLong,
    time: "12:30 PM",
    until: "about 2:30 PM",
    venue: `${venue.name}, ${place}`,
    quote: "A traditional lunch shared with the people we love, in the home you blessed.",
    icsStart: `${EVENT_DATE}T12:30:00+05:30`,
    icsEnd: `${EVENT_DATE}T14:30:00+05:30`,
  },
};

export const story = [
  { year: "The dream", title: "A door of our own", text: "For years we carried one picture in our minds: a front door, a courtyard and a place where everyone we love could gather." },
  { year: "The beginning", title: "Bhoomi Puja", text: "With prayers to Mother Earth and the blessings of our elders, the first stone was laid." },
  { year: "The making", title: "Brick by brick", text: "Plans, tiles, paint colours and many cups of tea with the builder. Every corner was chosen with love." },
  { year: "The day", title: "The doors open", text: `On ${dayShort} we step in, the milk will overflow, and we hope you will be there to bless every room.` },
];

export const schedule = {
  morning: {
    heading: "The Muhurtham",
    items: [
      { time: "7:00 AM", what: "Ganapathi Homam", note: "A sacred fire ritual to clear every obstacle." },
      { time: "8:15 AM", what: "Vastu Puja and Gruhapravesam", note: "We enter the new home at the auspicious muhurtham." },
      { time: "8:45 AM", what: "Pal Ubikindi", note: "The milk is boiled until it overflows, for abundance." },
      { time: "9:15 AM", what: "Aashirvadam", note: "Greet the family and share your blessings." },
    ],
  },
  lunch: {
    heading: "The Bhojanam",
    items: [
      { time: "12:30 PM", what: "Traditional lunch", note: "Served with love, sitting together." },
      { time: "1:30 PM", what: "Tambulam", note: "A small gift of love and a warm goodbye." },
    ],
  },
};

export const families = [
  { side: "The host family", names: "Mr. Ramesh and Mrs. Lakshmi", note: "Welcoming you to their new home" },
  { side: "With the blessings of", names: "Our parents and elders", note: "Whose prayers built this house" },
];

export const party = [
  { initials: "SR", name: "Suresh", role: "Brother of the host", note: "Keeper of the keys and the checklist." },
  { initials: "PL", name: "Padma", role: "Sister of the host", note: "In charge of the rangoli and the flowers." },
  { initials: "KV", name: "Kiran", role: "Family friend", note: "Our builder-in-chief, who knows every wall." },
  { initials: "AM", name: "Anitha", role: "Neighbour", note: "The first to welcome us to the street." },
];

export const goodToKnow = [
  { title: "What to wear", text: "Traditional attire is lovely: sarees, pattu langas, dhotis and kurtas. Warm yellows, reds and greens suit the day." },
  { title: "Parking", text: "Please park along the street and leave the gate side free for the ceremony. A volunteer will guide you." },
  { title: "Footwear", text: "We will keep a neat place to leave your footwear at the gate before you enter the home." },
  { title: "Little guests and gifts", text: "Children are warmly welcome. Your presence and blessings are the greatest gift." },
];

export const travel = [
  { title: "By road", text: "Add the exact road directions for your guests here." },
  { title: "By train", text: "Get down at Nellore railway station. Autos and cabs are available outside; add the distance to the house." },
  { title: "By air", text: "Add the nearest airport and travel time." },
  { title: "Landmark", text: "Add an easy landmark near the house." },
];

export const gallery = [
  { key: "house", caption: "Our new home", ratio: 736 / 519 },
  { key: "door", caption: "The main door", ratio: 1080 / 1920 },
  { key: "family", caption: "The welcome", ratio: 1 },
  { key: "homam", caption: "The homam", ratio: 1 },
  { key: "puja", caption: "The puja", ratio: 1 },
  { key: "frame", caption: "The invitation", ratio: 735 / 1041 },
];

// Put the number that should receive RSVPs, with country code and no + or spaces
// (for example "919876543210"). If left empty, WhatsApp opens and lets the guest pick a contact.
export const rsvp = { whatsapp: "", deadline: rsvpDeadline };
export const credit = "Website by InviteCraft Studio";

// Where guests travel from (real coordinates, drawn on the schematic map). Mark one as home.
export const cities = [
  { name: "Nellore", lat: 14.44, lon: 79.99, home: true },
  { name: "Vijayawada", lat: 16.51, lon: 80.65 },
  { name: "Guntur", lat: 16.31, lon: 80.44 },
  { name: "Ongole", lat: 15.5, lon: 80.05 },
  { name: "Tirupati", lat: 13.63, lon: 79.42 },
  { name: "Kadapa", lat: 14.47, lon: 78.82 },
  { name: "Kurnool", lat: 15.83, lon: 78.04 },
  { name: "Visakhapatnam", lat: 17.69, lon: 83.22 },
];
