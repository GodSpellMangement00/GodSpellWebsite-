/* =================================
   CINEMATIC NIGHT SKY
   STARS + METEORS (STABLE)
================================= */

const canvas = document.getElementById("space");
const ctx = canvas.getContext("2d");

let w, h;
function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

/* =====================
   STARS
===================== */
const stars = [];
const STAR_COUNT = Math.min(160, window.innerWidth / 5);

for (let i = 0; i < STAR_COUNT; i++) {
  stars.push({
    x: Math.random() * w,
    y: Math.random() * h,
    r: Math.random() * 1.3 + 0.4,
    alpha: Math.random() * 0.6 + 0.2,
    twinkle: Math.random() * 0.003 + 0.001
  });
}

/* =====================
   METEORS
===================== */
const meteors = [];

function spawnMeteor() {
  meteors.push({
    x: Math.random() * w,
    y: -50,
    vx: Math.random() * 5 + 4,
    vy: Math.random() * 8 + 6,
    life: 0
  });
}

/* Rare meteors */
setInterval(() => {
  if (Math.random() > 0.7) spawnMeteor();
}, 3500);

/* =====================
   ANIMATION LOOP
===================== */
function animate() {
  ctx.clearRect(0, 0, w, h);

  /* Draw stars */
  for (const s of stars) {
    s.alpha += s.twinkle;
    if (s.alpha > 0.85 || s.alpha < 0.2) {
      s.twinkle *= -1;
    }

    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(200,220,255,${s.alpha})`;
    ctx.fill();
  }

  /* Draw meteors */
  for (let i = meteors.length - 1; i >= 0; i--) {
    const m = meteors[i];
    m.x += m.vx;
    m.y += m.vy;
    m.life++;

    ctx.strokeStyle = "rgba(180,200,255,0.75)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(m.x, m.y);
    ctx.lineTo(m.x - m.vx * 2, m.y - m.vy * 2);
    ctx.stroke();

    if (m.life > 35) {
      meteors.splice(i, 1);
    }
  }

  requestAnimationFrame(animate);
}

animate();
