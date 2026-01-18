/* =========================
   GLOBAL SOUND SYSTEM
========================= */
let soundEnabled = true;
const clickSound = new Audio("sounds/click.mp3");
clickSound.volume = 0.6;

document.addEventListener("click", e => {
  if (!soundEnabled) return;
  if (e.target.closest("button, .btn, a")) {
    clickSound.currentTime = 0;
    clickSound.play();
  }
});

/* Toggle sound button */
const soundBtn = document.querySelector(".sound-toggle");
if (soundBtn) {
  soundBtn.addEventListener("click", () => {
    soundEnabled = !soundEnabled;
    soundBtn.textContent = soundEnabled ? "🔊 Sound ON" : "🔇 Sound OFF";
  });
}

/* =========================
   WATER RIPPLE EFFECT
========================= */
function rippleEffect(e) {
  const ripple = document.createElement("span");
  ripple.className = "ripple";

  const rect = e.currentTarget.getBoundingClientRect();
  ripple.style.left = `${e.clientX - rect.left}px`;
  ripple.style.top = `${e.clientY - rect.top}px`;

  e.currentTarget.appendChild(ripple);
  setTimeout(() => ripple.remove(), 700);
}

document.querySelectorAll(".card, .btn, button").forEach(el => {
  el.addEventListener("click", rippleEffect);
});

/* =========================
   FISH ANIMATION (BUTTONS)
========================= */
document.querySelectorAll(".btn").forEach(btn => {
  const fish = document.createElement("span");
  fish.className = "fish";
  btn.appendChild(fish);
});

/* =========================
   FAQ LIVE SEARCH
========================= */
const faqInput = document.querySelector("#faqSearch");
if (faqInput) {
  faqInput.addEventListener("input", () => {
    const q = faqInput.value.toLowerCase();
    document.querySelectorAll(".faq-item").forEach(item => {
      item.style.display = item.textContent.toLowerCase().includes(q)
        ? "block"
        : "none";
    });
  });
}

/* =========================
   FAQ ACCORDION
========================= */
document.querySelectorAll(".faq-item").forEach(item => {
  item.addEventListener("click", () => {
    item.classList.toggle("open");
  });
});

/* =========================
   GALLERY FAIL-SAFE
========================= */
document.querySelectorAll(".gallery-item img").forEach(img => {
  img.onerror = () => {
    img.src = "gallery/placeholder.jpg";
  };
});

/* =========================
   SMOOTH SCROLL
========================= */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    document.querySelector(link.getAttribute("href"))
      ?.scrollIntoView({ behavior: "smooth" });
  });
});
