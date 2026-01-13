/* ===============================
   AUDIO
================================ */
const clickSound = document.getElementById("click-sound");
const bgMusic = document.getElementById("bg-music");
const musicToggle = document.getElementById("music-toggle");

let musicPlaying = false;

if (clickSound) clickSound.volume = 0.4;
if (bgMusic) bgMusic.volume = 0.25;

/* Click sound */
document.addEventListener("click", () => {
  if (!clickSound) return;
  clickSound.currentTime = 0;
  clickSound.play().catch(() => {});
});

/* Music toggle (mobile-safe) */
if (musicToggle && bgMusic) {
  musicToggle.addEventListener("pointerdown", (e) => {
    e.stopPropagation();
    if (!musicPlaying) {
      bgMusic.play().then(() => {
        musicPlaying = true;
        musicToggle.textContent = "🔇 Music";
      }).catch(() => {});
    } else {
      bgMusic.pause();
      musicPlaying = false;
      musicToggle.textContent = "🎵 Music";
    }
  });
}

/* ===============================
   BUBBLES ON CLICK
================================ */
document.addEventListener("click", (e) => {
  const bubble = document.createElement("div");
  bubble.className = "bubble";
  bubble.style.left = e.clientX + "px";
  bubble.style.top = e.clientY + "px";
  document.body.appendChild(bubble);

  setTimeout(() => bubble.remove(), 1200);
});

/* ===============================
   FALLING LEAVES
================================ */
function createLeaf() {
  const leaf = document.createElement("div");
  leaf.className = "leaf";

  const size = Math.random() * 6 + 8;
  leaf.style.width = size + "px";
  leaf.style.height = size + "px";

  leaf.style.left = Math.random() * window.innerWidth + "px";
  leaf.style.animationDuration = (Math.random() * 5 + 6) + "s";

  document.body.appendChild(leaf);

  setTimeout(() => leaf.remove(), 12000);
}

/* Spawn leaves slowly (no overload) */
setInterval(createLeaf, 1200);
