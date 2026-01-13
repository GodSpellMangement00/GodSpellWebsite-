/* =========================
   AUDIO ELEMENTS
========================= */
const clickSound = document.getElementById("click-sound");
const bgMusic = document.getElementById("bg-music");
const musicToggle = document.getElementById("music-toggle");

/* =========================
   AUDIO STATE
========================= */
let musicOn = false;

/* Initial volumes */
if (clickSound) clickSound.volume = 0.5;
if (bgMusic) bgMusic.volume = 0.25;

/* =========================
   CLICK SOUND (ALL CLICKS)
========================= */
document.addEventListener("click", () => {
  if (!clickSound) return;
  clickSound.currentTime = 0;
  clickSound.play().catch(() => {});
});

/* =========================
   MUSIC TOGGLE BUTTON
========================= */
if (musicToggle && bgMusic) {
  musicToggle.addEventListener("click", (e) => {
    e.stopPropagation(); // avoid double click sound

    musicOn = !musicOn;

    if (musicOn) {
      bgMusic.play().catch(() => {});
      musicToggle.textContent = "🔇 Music";
    } else {
      bgMusic.pause();
      musicToggle.textContent = "🎵 Music";
    }
  });
}

/* =========================
   COPY SERVER IP
========================= */
const copyBtn = document.querySelector(".copy-ip");
const ipText = document.getElementById("server-ip");
const SERVER_IP = "pika-network.net";

if (copyBtn) {
  copyBtn.addEventListener("click", () => {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(SERVER_IP)
        .then(() => {
          const old = copyBtn.innerText;
          copyBtn.innerText = "IP Copied ✔";
          setTimeout(() => (copyBtn.innerText = old), 2000);
        })
        .catch(showFallback);
    } else {
      showFallback();
    }
  });
}

function showFallback() {
  if (!ipText) return;
  ipText.style.display = "block";
  ipText.innerText = "Server IP: " + SERVER_IP + " (long press to copy)";
}

/* =========================
   SCROLL REVEAL ANIMATION
========================= */
const revealItems = document.querySelectorAll(".section, .card, footer");

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

revealItems.forEach(el => {
  el.classList.add("reveal");
  observer.observe(el);
});

/* =========================
   CLICK BUBBLES EFFECT
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

document.addEventListener("click", (e) => {
  createBubble(e.clientX, e.clientY);
});

/* =========================
   FAQ SEARCH (faq.html)
========================= */
const searchInput = document.getElementById("faqSearch");
const faqs = document.querySelectorAll("#all-faqs details");
const resultBox = document.getElementById("faq-results");

if (searchInput && faqs.length) {
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase().trim();
    let found = false;

    if (resultBox) {
      resultBox.style.display = "none";
      resultBox.innerHTML = "";
    }

    if (query === "") {
      faqs.forEach(faq => (faq.style.display = "block"));
      return;
    }

    faqs.forEach(faq => {
      const text = faq.innerText.toLowerCase();
      if (text.includes(query)) {
        faq.style.display = "block";
        found = true;
      } else {
        faq.style.display = "none";
      }
    });

    if (!found && resultBox) {
      resultBox.style.display = "block";
      resultBox.innerHTML = `
        <p>No matching answer found.</p>
        <p>
          👉 <a href="https://discord.gg/YQVF7sy2gR" target="_blank">
          Join our Discord to get every answer
          </a>
        </p>
      `;
    }
  });
}
