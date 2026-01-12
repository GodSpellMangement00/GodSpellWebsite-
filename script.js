/* =========================
   SCROLL REVEAL
========================= */
const revealItems = document.querySelectorAll(".section, .card, footer");

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
   CLICK BUBBLES
========================= */
function createBubble(x, y) {
  const bubble = document.createElement("span");
  bubble.className = "bubble";

  const size = Math.random() * 12 + 8;
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
const leafLayer = document.createElement("div");
leafLayer.style.position = "fixed";
leafLayer.style.inset = "0";
leafLayer.style.pointerEvents = "none";
leafLayer.style.zIndex = "2";
document.body.appendChild(leafLayer);

function spawnLeaf() {
  const leaf = document.createElement("span");
  leaf.style.position = "absolute";
  leaf.style.left = Math.random() * window.innerWidth + "px";
  leaf.style.top = "-20px";
  leaf.style.width = "10px";
  leaf.style.height = "10px";
  leaf.style.borderRadius = "50%";
  leaf.style.background = "rgba(200,160,255,0.6)";
  leaf.style.filter = "blur(1px)";

  const duration = Math.random() * 8 + 10;
  const drift = Math.random() * 120 - 60;

  leaf.style.transition = `transform ${duration}s linear, opacity ${duration}s linear`;
  leafLayer.appendChild(leaf);

  requestAnimationFrame(() => {
    leaf.style.transform =
      `translate(${drift}px, ${window.innerHeight + 40}px) rotate(360deg)`;
    leaf.style.opacity = "0";
  });

  setTimeout(() => leaf.remove(), duration * 1000);
}

setInterval(spawnLeaf, 900);

/* =========================
   LIGHTNING ⚡ (RARE)
========================= */
const lightning = document.createElement("div");
lightning.style.position = "fixed";
lightning.style.inset = "0";
lightning.style.background = "rgba(255,255,255,0.55)";
lightning.style.opacity = "0";
lightning.style.pointerEvents = "none";
lightning.style.zIndex = "1";
document.body.appendChild(lightning);

function lightningStrike() {
  lightning.style.transition = "none";
  lightning.style.opacity = "0.6";

  setTimeout(() => {
    lightning.style.transition = "opacity 0.4s ease";
    lightning.style.opacity = "0";
  }, 90);
}

setInterval(() => {
  if (Math.random() > 0.86) {
    lightningStrike();
  }
}, 15000);

/* =========================
   COPY SERVER IP (SAFE)
========================= */
const copyBtn = document.querySelector(".copy-ip");
const ipText = document.getElementById("server-ip");
const SERVER_IP = "pika-network.net";

if (copyBtn) {
  copyBtn.addEventListener("click", () => {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(SERVER_IP)
        .then(showCopied)
        .catch(showFallback);
    } else {
      showFallback();
    }
  });
}

function showCopied() {
  const oldText = copyBtn.innerText;
  copyBtn.innerText = "IP Copied ✔";
  setTimeout(() => copyBtn.innerText = oldText, 2000);
}

function showFallback() {
  ipText.style.display = "block";
  ipText.innerText = "Server IP: " + SERVER_IP + " (long-press to copy)";
}

/* =========================
   BUTTON RIPPLE 😎
========================= */
document.querySelectorAll("button, .discord-btn").forEach(btn => {
  btn.addEventListener("click", e => {
    btn.classList.remove("ripple");
    void btn.offsetWidth;
    btn.classList.add("ripple");
  });
});

/* =========================
   SOFT CLICK SOUND 🔊
========================= */
const clickSound = document.getElementById("click-sound");

document.querySelectorAll("button, .discord-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    if (!clickSound) return;
    clickSound.currentTime = 0;
    clickSound.volume = 0.35;
    clickSound.play().catch(() => {});
  });
});
