/* ================================
   3D LIVE BACKGROUND (CANVAS)
================================ */
const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");

let w, h;
function resizeCanvas() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const particles = [];
const COUNT = 90; // safe for phone

for (let i = 0; i < COUNT; i++) {
  particles.push({
    x: Math.random() * w,
    y: Math.random() * h,
    z: Math.random() * 1 + 0.3, // depth (3D feel)
    r: Math.random() * 2 + 1,
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.3
  });
}

function animateBackground() {
  ctx.clearRect(0, 0, w, h);

  for (const p of particles) {
    p.x += p.vx * p.z;
    p.y += p.vy * p.z;

    if (p.x < 0) p.x = w;
    if (p.x > w) p.x = 0;
    if (p.y < 0) p.y = h;
    if (p.y > h) p.y = 0;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r * p.z, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(106, 0, 255, ${0.25 * p.z})`;
    ctx.fill();
  }

  requestAnimationFrame(animateBackground);
}
animateBackground();

/* ================================
   COLLAPSIBLE LIST LOGIC
================================ */
const toggles = document.querySelectorAll(".member-toggle");

toggles.forEach(current => {
  const summary = current.querySelector("summary");
  const originalText = summary.textContent;

  current.addEventListener("toggle", () => {
    // Auto-close other lists
    if (current.open) {
      toggles.forEach(other => {
        if (other !== current) other.open = false;
      });
      summary.textContent = originalText.replace("view", "hide");
    } else {
      summary.textContent = originalText.replace("hide", "view");
    }
  });
});
