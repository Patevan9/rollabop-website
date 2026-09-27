// Star and spiral-arm geometry for the interim Galaxy Ball illustration.
// Generated at build time from a fixed seed, so it never changes between builds.
// Replace the illustration with official art via assets.json (galaxyBall).
export default function () {
  let s = 20260927;
  const rand = () => ((s = (s * 1664525 + 1013904223) % 4294967296) / 4294967296);
  const gauss = () => (rand() + rand() + rand() - 1.5) / 1.5;
  const f = (n) => +n.toFixed(2);

  const arms = [];
  const armStars = [];
  for (let k = 0; k < 2; k++) {
    const offset = k * Math.PI;
    const pts = [];
    for (let t = 0.15; t <= 3.1; t += 0.08) {
      const r = 7 * Math.exp(0.82 * t);
      const a = t * 1.25 + offset;
      pts.push([f(Math.cos(a) * r), f(Math.sin(a) * r)]);
    }
    arms.push("M" + pts.map((p) => p.join(" ")).join(" L"));
    for (let i = 0; i < 70; i++) {
      const t = 0.2 + rand() * 2.85;
      const r = 7 * Math.exp(0.82 * t) + gauss() * 6;
      const a = t * 1.25 + offset + gauss() * 0.22;
      armStars.push({ x: f(Math.cos(a) * r), y: f(Math.sin(a) * r), r: f(0.35 + rand() * 0.9), o: f(0.45 + rand() * 0.55) });
    }
  }

  const fieldStars = [];
  for (let i = 0; i < 46; i++) {
    const a = rand() * Math.PI * 2;
    const r = Math.sqrt(rand()) * 96;
    fieldStars.push({ x: f(Math.cos(a) * r), y: f(Math.sin(a) * r), r: f(0.3 + rand() * 0.8), o: f(0.3 + rand() * 0.6) });
  }

  return { arms, armStars, fieldStars };
}
