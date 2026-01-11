/* =========================
   SCROLL REVEAL
========================= */
const revealElements = document.querySelectorAll(
  ".section, .card, footer"
);

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  { threshold: 0.15 }
);

revealElements.forEach(el => {
  el.classList.add("reveal");
  observer.observe(el);
});

/* =========================
   COZY CLICK BUBBLES
========================= */
function createBubble(x, y) {
  const bubble = document.createElement("span");
  bubble.className = "bubble";

  const size = Math.random() * 10 + 6;
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
   FALLING LEAVES 🍃
========================= */
const leafContainer = document.createElement("div");
leafContainer.style.position = "fixed";
leafContainer.style.inset = "0";
leafContainer.style.pointerEvents = "none";
leafContainer.style.zIndex = "3";
document.body.appendChild(leafContainer);

function createLeaf() {
  const leaf = document.createElement("span");
  leaf.style.position = "absolute";
  leaf.style.left = Math.random() * window.innerWidth + "px";
  leaf.style.top = "-30px";
  leaf.style.width = "12px";
  leaf.style.height = "12px";
  leaf.style.borderRadius = "50%";
  leaf.style.background = "rgba(200,170,255,0.6)";
  leaf.style.filter = "blur(1px)";

  const duration = Math.random() * 8 + 10;
  const drift = Math.random() * 100 - 50;

  leaf.style.transition = `transform ${duration}s linear, opacity ${duration}s linear`;
  leafContainer.appendChild(leaf);

  requestAnimationFrame(() => {
    leaf.style.transform = `translate(${drift}px, ${window.innerHeight + 50}px) rotate(360deg)`;
    leaf.style.opacity = "0";
  });

  setTimeout(() => leaf.remove(), duration * 1000);
}

setInterval(createLeaf, 900);

/* =========================
   LIGHTNING ⚡ (RARE)
========================= */
const lightning = document.createElement("div");
lightning.style.position = "fixed";
lightning.style.inset = "0";
lightning.style.background = "rgba(255,255,255,0.6)";
lightning.style.opacity = "0";
lightning.style.pointerEvents = "none";
lightning.style.zIndex = "2";
document.body.appendChild(lightning);

function strikeLightning() {
  lightning.style.transition = "none";
  lightning.style.opacity = "0.6";

  setTimeout(() => {
    lightning.style.transition = "opacity 0.4s ease";
    lightning.style.opacity = "0";
  }, 80);
}

setInterval(() => {
  if (Math.random() > 0.85) {
    strikeLightning();
  }
}, 15000);
/* =========================
   COPY SERVER IP BUTTON
========================= */

document.querySelectorAll("[data-ip]").forEach(button => {
  button.addEventListener("click", () => {
    const ip = button.getAttribute("data-ip");

    navigator.clipboard.writeText(ip).then(() => {
      const originalText = button.innerText;
      button.innerText = "IP Copied ✔";

      setTimeout(() => {
        button.innerText = originalText;
      }, 2000);
    }).catch(() => {
      alert("Copy failed. IP: " + ip);
    });
  });
});
