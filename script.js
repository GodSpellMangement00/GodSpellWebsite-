/* =========================
   SCROLL REVEAL (AESTHETIC)
========================= */

const revealItems = document.querySelectorAll(
  ".section, .card, footer"
);

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  { threshold: 0.15 }
);

revealItems.forEach(el => {
  el.classList.add("reveal");
  revealObserver.observe(el);
});

/* =========================
   CLICK BUBBLES (MINIMAL)
========================= */

function createBubble(x, y) {
  const bubble = document.createElement("span");
  bubble.className = "bubble";

  const size = Math.random() * 12 + 6;
  bubble.style.width = size + "px";
  bubble.style.height = size + "px";
  bubble.style.left = x - size / 2 + "px";
  bubble.style.top = y - size / 2 + "px";

  document.body.appendChild(bubble);
  setTimeout(() => bubble.remove(), 1200);
}

document.addEventListener("click", e => {
  createBubble(e.clientX, e.clientY);
});

/* =========================
   HOVER LIFT (CARDS)
========================= */

document.querySelectorAll(".card").forEach(card => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-6px)";
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0)";
  });
});
