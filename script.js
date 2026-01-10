/* ============================
   SUBTLE STAR BACKGROUND
   (CALM + AESTHETIC)
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

/* STAR SETUP */
const stars = [];
const STAR_COUNT = Math.min(120, window.innerWidth / 8);

for (let i = 0; i < STAR_COUNT; i++) {
  stars.push({
    x: Math.random() * w,
    y: Math.random() * h,
    r: Math.random() * 1.2 + 0.4,
    alpha: Math.random() * 0.6 + 0.2,
    speed: Math.random() * 0.05 + 0.02,
    twinkle: Math.random() * 0.004 + 0.002
  });
}

function animateStars() {
  ctx.clearRect(0, 0, w, h);

  for (const s of stars) {
    s.y += s.speed;
    s.alpha += s.twinkle;

    if (s.alpha > 0.8 || s.alpha < 0.2) {
      s.twinkle *= -1;
    }

    if (s.y > h) {
      s.y = 0;
      s.x = Math.random() * w;
    }

    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(200, 210, 255, ${s.alpha})`;
    ctx.shadowBlur = 4;
    ctx.shadowColor = "rgba(180, 190, 255, 0.6)";
    ctx.fill();
  }

  requestAnimationFrame(animateStars);
}

animateStars();
