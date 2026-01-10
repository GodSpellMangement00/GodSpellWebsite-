/* ===============================
   COZY NATURE BACKGROUND (LEAVES)
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

/* Leaf particles */
const leaves = [];
const LEAF_COUNT = 60; // safe for mobile

for (let i = 0; i < LEAF_COUNT; i++) {
  leaves.push({
    x: Math.random() * w,
    y: Math.random() * h,
    r: Math.random() * 3 + 1,
    speed: Math.random() * 0.35 + 0.15,
    sway: Math.random() * 0.6 + 0.2,
    offset: Math.random() * Math.PI * 2
  });
}

function animateLeaves() {
  ctx.clearRect(0, 0, w, h);

  for (const leaf of leaves) {
    leaf.x += leaf.speed;
    leaf.offset += 0.01;
    leaf.y += Math.sin(leaf.offset) * leaf.sway;

    if (leaf.x > w + 10) {
      leaf.x = -10;
      leaf.y = Math.random() * h;
    }

    ctx.beginPath();
    ctx.arc(leaf.x, leaf.y, leaf.r, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(120, 170, 140, 0.35)";
    ctx.fill();
  }

  requestAnimationFrame(animateLeaves);
}

animateLeaves();

/* ===============================
   AUTO-CLOSE MEMBER LISTS
================================ */

const toggles = document.querySelectorAll(".member-toggle");

toggles.forEach(current => {
  current.addEventListener("toggle", () => {
    if (current.open) {
      toggles.forEach(other => {
        if (other !== current) other.open = false;
      });
    }
  });
});
