/* =========================================
   CLICK SOUND (ON / OFF)
========================================= */
const clickSound = document.getElementById("click-sound");
const soundToggle = document.getElementById("sound-toggle");
let soundOn = true;

if (clickSound) clickSound.volume = 0.4;

document.addEventListener("click", (e) => {
  if (!soundOn || !clickSound) return;
  if (e.target.id === "sound-toggle") return;
  clickSound.currentTime = 0;
  clickSound.play().catch(() => {});
});

if (soundToggle) {
  soundToggle.addEventListener("click", () => {
    soundOn = !soundOn;
    soundToggle.textContent = soundOn ? "🔊 Sound ON" : "🔇 Sound OFF";
  });
}

/* =========================================
   MEMBER LIST TOGGLE
========================================= */
document.querySelectorAll(".collapsible").forEach(card => {
  card.addEventListener("click", () => {
    card.classList.toggle("open");
  });
});

/* =========================================
   COPY SERVER IP
========================================= */
const copyBtn = document.querySelector(".copy-ip");
if (copyBtn) {
  copyBtn.addEventListener("click", () => {
    navigator.clipboard.writeText("pika-network.net").then(() => {
      const old = copyBtn.textContent;
      copyBtn.textContent = "IP Copied ✔";
      setTimeout(() => copyBtn.textContent = old, 1500);
    });
  });
}

/* =========================================
   FAQ SEARCH (faq.html)
========================================= */
const faqInput = document.getElementById("faqSearch");
const faqs = document.querySelectorAll("#all-faqs details");
const faqFallback = document.getElementById("faq-discord-fallback");

if (faqInput) {
  faqInput.addEventListener("input", () => {
    const q = faqInput.value.toLowerCase().trim();
    let found = false;

    faqs.forEach(faq => {
      if (faq.innerText.toLowerCase().includes(q)) {
        faq.style.display = "block";
        found = true;
      } else {
        faq.style.display = "none";
      }
    });

    if (faqFallback) {
      faqFallback.style.display = (!found && q) ? "block" : "none";
    }
  });
}

/* =========================================
   BUBBLES ON CLICK
========================================= */
document.addEventListener("click", (e) => {
  const bubble = document.createElement("div");
  bubble.className = "bubble";
  bubble.style.left = e.clientX + "px";
  bubble.style.top = e.clientY + "px";
  document.body.appendChild(bubble);
  setTimeout(() => bubble.remove(), 1000);
});

/* =========================================
   FALLING LEAVES (BACKGROUND)
========================================= */
function createLeaf() {
  const leaf = document.createElement("div");
  leaf.className = "leaf";
  leaf.style.left = Math.random() * window.innerWidth + "px";
  leaf.style.animationDuration = (Math.random() * 5 + 6) + "s";
  document.body.appendChild(leaf);
  setTimeout(() => leaf.remove(), 12000);
}
setInterval(createLeaf, 1500);

/* =========================================
   GALLERY FULLSCREEN POPUP
========================================= */
const galleryImages = document.querySelectorAll(".gallery-item img");

if (galleryImages.length) {
  const overlay = document.createElement("div");
  overlay.style.position = "fixed";
  overlay.style.inset = "0";
  overlay.style.background = "rgba(0,0,0,0.85)";
  overlay.style.display = "none";
  overlay.style.alignItems = "center";
  overlay.style.justifyContent = "center";
  overlay.style.zIndex = "9999";

  const fullImg = document.createElement("img");
  fullImg.style.maxWidth = "90%";
  fullImg.style.maxHeight = "90%";
  fullImg.style.borderRadius = "16px";

  overlay.appendChild(fullImg);
  document.body.appendChild(overlay);

  galleryImages.forEach(img => {
    img.addEventListener("click", () => {
      fullImg.src = img.src;
      overlay.style.display = "flex";
    });
  });

  overlay.addEventListener("click", () => {
    overlay.style.display = "none";
  });
}
