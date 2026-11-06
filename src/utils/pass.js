import { host, events, venue, dayLong, rsvp } from "../data/homeData.js";

/* Draws a personal guest pass on a canvas and downloads it as a PNG. */
export async function downloadPass(guestName) {
  try { await document.fonts?.ready; } catch { /* ignore */ }
  const W = 900, H = 1400;
  const c = document.createElement("canvas");
  c.width = W; c.height = H;
  const x = c.getContext("2d");
  const gold = "#e6cf94", cream = "#fff7e3";

  const bg = x.createLinearGradient(0, 0, 0, H);
  bg.addColorStop(0, "#2b1005"); bg.addColorStop(0.5, "#5c2209"); bg.addColorStop(1, "#150803");
  x.fillStyle = bg; x.fillRect(0, 0, W, H);
  x.strokeStyle = "rgba(230,207,148,0.07)"; x.lineWidth = 1;
  for (let gx = 40; gx < W; gx += 70) for (let gy = 40; gy < H; gy += 70) {
    x.save(); x.translate(gx, gy); x.rotate(Math.PI / 4); x.strokeRect(-14, -14, 28, 28); x.restore();
  }
  x.strokeStyle = gold; x.lineWidth = 3; x.strokeRect(36, 36, W - 72, H - 72);
  x.lineWidth = 1; x.strokeRect(52, 52, W - 104, H - 104);

  x.textAlign = "center"; x.fillStyle = gold;
  x.font = '600 44px "Noto Sans Telugu", sans-serif';
  x.fillText("ఓం శ్రీ గణేశాయ నమః", W / 2, 150);

  x.fillStyle = "#ffb02e"; x.beginPath(); x.moveTo(W / 2, 190); x.bezierCurveTo(W / 2 + 22, 222, W / 2 + 24, 248, W / 2, 272); x.bezierCurveTo(W / 2 - 24, 248, W / 2 - 22, 222, W / 2, 190); x.fill();
  x.fillStyle = gold; x.beginPath(); x.ellipse(W / 2, 290, 58, 20, 0, 0, Math.PI); x.fill();
  x.fillRect(W / 2 - 22, 300, 44, 12);

  x.fillStyle = cream;
  x.font = '500 28px Jost, sans-serif'; if ("letterSpacing" in x) x.letterSpacing = "10px";
  x.fillText("GUEST PASS", W / 2, 380);
  if ("letterSpacing" in x) x.letterSpacing = "0px";

  x.fillStyle = gold; x.font = '700 70px "Noto Sans Telugu", sans-serif';
  x.fillText("శుభ గృహప్రవేశం", W / 2, 490);
  x.font = '110px "Pinyon Script", cursive';
  x.fillText("Gruhapravesam", W / 2, 610);
  x.strokeStyle = "rgba(230,207,148,0.5)"; x.beginPath(); x.moveTo(200, 650); x.lineTo(W - 200, 650); x.stroke();

  x.fillStyle = "rgba(255,247,227,0.7)"; x.font = 'italic 32px "Cormorant Garamond", serif';
  x.fillText("Admit", W / 2, 710);
  let size = 78; const name = (guestName || "Our dear guest").slice(0, 32);
  do { x.font = `600 ${size}px "Cormorant Garamond", serif`; size -= 2; } while (x.measureText(name).width > W - 220 && size > 30);
  x.fillStyle = cream; x.fillText(name, W / 2, 795);

  const block = (title, ev, y) => {
    x.fillStyle = gold; x.font = '500 26px Jost, sans-serif'; if ("letterSpacing" in x) x.letterSpacing = "8px";
    x.fillText(title, W / 2, y); if ("letterSpacing" in x) x.letterSpacing = "0px";
    x.fillStyle = cream; x.font = '600 40px "Cormorant Garamond", serif';
    x.fillText(dayLong, W / 2, y + 56);
    x.font = '500 36px "Cormorant Garamond", serif'; x.fillText(ev.time, W / 2, y + 104);
  };
  block("THE MUHURTHAM", events.muhurtham, 900);
  block("THE BHOJANAM", events.bhojanam, 1070);

  x.fillStyle = "rgba(255,247,227,0.75)"; x.font = '400 24px Jost, sans-serif';
  x.fillText(venue.address.slice(0, 60), W / 2, 1255);
  x.fillStyle = "rgba(230,207,148,0.85)"; x.font = 'italic 30px "Cormorant Garamond", serif';
  x.fillText(`${host.names}  ·  ${host.hashtag}`, W / 2, 1305);
  x.font = '400 22px Jost, sans-serif'; x.fillStyle = "rgba(255,247,227,0.55)";
  x.fillText(`Kindly reply by ${rsvp.deadline}`, W / 2, 1348);

  const a = document.createElement("a");
  a.href = c.toDataURL("image/png");
  a.download = `guest-pass-${(guestName || "guest").toLowerCase().replace(/[^a-z0-9]+/g, "-")}.png`;
  document.body.appendChild(a); a.click(); a.remove();
}
