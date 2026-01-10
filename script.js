/* ============================
   STAR FIELD (CINEMATIC)
============================ */

const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

let w, h;

function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

/* STAR OBJECTS */
const stars = [];
const STAR_COUNT = Math.min(180, window.innerWidth / 5); // mobile-safe

for (let i = 0; i < STAR_COUNT; i++) {
  stars.push({
    x: Math.random() * w,
    y: Math.random() * h,
    r: Math.random() * 1.6 + 0.4,
    alpha: Math.random(),
    speed: Math.random() * 0.15 + 0.05,
    twinkle: Math.random() * 0.02 + 0.005
  });
}

function animateStars() {
  ctx.clearRect(0, 0, w, h);

  for (const s of stars) {
    s.y += s.speed;
    s.alpha += s.twinkle;

    if (s.alpha <= 0 || s.alpha >= 1) {
      s.twinkle *= -1;
    }

    if (s.y > h) {
      s.y = 0;
      s.x = Math.random() * w;
    }

    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(200, 210, 255, ${s.alpha})`;
    ctx.shadowBlur = 8;
    ctx.shadowColor = "rgba(170, 180, 255, 0.8)";
    ctx.fill();
  }

  requestAnimationFrame(animateStars);
}

animateStars();
