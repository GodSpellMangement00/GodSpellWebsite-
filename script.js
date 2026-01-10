/* ==================================
   INTERACTIVE BUBBLES SYSTEM
   CLICK + TRAIL + SCROLL
================================== */

const colors = [
  "rgba(170,190,255,0.6)",
  "rgba(140,200,255,0.6)",
  "rgba(200,170,255,0.6)",
  "rgba(150,220,255,0.6)"
];

function createBubble(x, y) {
  const bubble = document.createElement("span");
  bubble.className = "bubble";

  const size = Math.random() * 18 + 10;
  bubble.style.width = size + "px";
  bubble.style.height = size + "px";
  bubble.style.left = x - size / 2 + "px";
  bubble.style.top = y - size / 2 + "px";

  bubble.style.background =
    colors[Math.floor(Math.random() * colors.length)];

  document.body.appendChild(bubble);

  setTimeout(() => bubble.remove(), 1800);
}

/* CLICK / TAP */
document.addEventListener("click", (e) => {
  for (let i = 0; i < 3; i++) {
    setTimeout(() => {
      createBubble(
        e.clientX + Math.random() * 20 - 10,
        e.clientY + Math.random() * 20 - 10
      );
    }, i * 60);
  }
});

/* MOUSE / FINGER TRAIL */
let lastMove = 0;
document.addEventListener("mousemove", (e) => {
  const now = Date.now();
  if (now - lastMove > 70) {
    lastMove = now;
    createBubble(e.clientX, e.clientY);
  }
});

/* SCROLL BUBBLES */
let lastScroll = 0;
window.addEventListener("scroll", () => {
  const now = Date.now();
  if (now - lastScroll > 150) {
    lastScroll = now;
    createBubble(
      Math.random() * window.innerWidth,
      window.innerHeight - 40
    );
  }
});
