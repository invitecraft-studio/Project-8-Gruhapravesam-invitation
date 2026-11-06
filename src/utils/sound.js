/* A temple-bell sound made with the Web Audio API, so no audio file is needed. */
export function bell() {
  try {
    const a = new (window.AudioContext || window.webkitAudioContext)();
    [880, 1320, 1760, 2200].forEach((f, i) => {
      const o = a.createOscillator(), g = a.createGain();
      o.frequency.value = f;
      g.gain.setValueAtTime(0.22 / (i + 1), a.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, a.currentTime + 2.6);
      o.connect(g); g.connect(a.destination); o.start(); o.stop(a.currentTime + 2.7);
    });
  } catch { /* sound is optional */ }
}
