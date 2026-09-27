// Generates src/_data/tray.json: a naturally settled pile of balls for the
// hero tray. This runs once, offline (npm run tray). The website itself
// never runs physics; it only reads the finished positions.
//
//   node scripts/generate-tray.mjs [seed]
//
import { writeFileSync } from "node:fs";

const seed = Number(process.argv[2] ?? 11);
let s = seed;
const rand = () => ((s = (s * 1664525 + 1013904223) % 4294967296) / 4294967296);

const W = 7.4;             // tray inner width, in ball diameters (not a whole number, so the pile never forms a neat lattice)
const H = W * 1.7;         // tray inner height (matches the CSS aspect ratio)
const R = 0.5;             // ball radius
const COUNT = 50;
const COLORS = ["blue", "red", "green", "purple", "gold"];

// Drop balls in one at a time, then let everything settle.
const balls = [];
for (let i = 0; i < COUNT; i++) {
  balls.push({
    x: R + rand() * (W - 2 * R),
    y: H + i * 1.1,          // y is measured upward from the floor
    px: 0, py: 0,
    color: COLORS[Math.floor(rand() * COLORS.length)],
  });
}
for (const b of balls) { b.px = b.x; b.py = b.y; }

const G = -0.004;
for (let step = 0; step < 9000; step++) {
  for (const b of balls) {
    const vx = (b.x - b.px) * 0.985;
    const vy = (b.y - b.py) * 0.985;
    b.px = b.x; b.py = b.y;
    b.x += vx; b.y += vy + G;
  }
  for (let it = 0; it < 4; it++) {
    for (let i = 0; i < balls.length; i++) {
      const a = balls[i];
      for (let j = i + 1; j < balls.length; j++) {
        const b = balls[j];
        const dx = b.x - a.x, dy = b.y - a.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 4 * R * R && d2 > 1e-9) {
          const d = Math.sqrt(d2), push = (2 * R - d) / 2;
          const nx = dx / d, ny = dy / d;
          a.x -= nx * push; a.y -= ny * push;
          b.x += nx * push; b.y += ny * push;
        }
      }
      if (a.y < R) a.y = R;
      if (a.x < R) a.x = R;
      if (a.x > W - R) a.x = W - R;
    }
  }
}

// The Galaxy Ball: the highest ball near the middle, so it sits on top of the pile.
const top = [...balls]
  .filter((b) => b.x > W * 0.3 && b.x < W * 0.7)
  .sort((a, b) => b.y - a.y)[1];
top.color = "galaxy";

const out = balls
  .sort((a, b) => b.y - a.y)
  .map((b) => ({
    left: +(((b.x - R) / W) * 100).toFixed(2),
    bottom: +(((b.y - R) / H) * 100).toFixed(2),
    color: b.color,
  }));

writeFileSync(
  new URL("../src/_data/tray.json", import.meta.url),
  JSON.stringify({ seed, size: +(100 / W).toFixed(3), balls: out }, null, 1) + "\n"
);
console.log(`tray.json written: ${out.length} balls, seed ${seed}`);
