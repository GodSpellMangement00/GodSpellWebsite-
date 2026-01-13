/* =====================================================
   AUDIO (CLICK + MUSIC)
===================================================== */
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

/* Music toggle (mobile safe) */
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

/* =====================================================
   SCROLL REVEAL (SECTIONS + CARDS)
===================================================== */
const revealItems = document.querySelectorAll(".section, .card");

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal-show");
      }
    });
  },
  { threshold: 0.15 }
);

revealItems.forEach(el => {
  el.classList.add("reveal");
  revealObserver.observe(el);
});

/* =====================================================
   BUTTON RIPPLE EFFECT
===================================================== */
document.querySelectorAll("button, .btn").forEach(btn => {
  btn.addEventListener("click", e => {
    const ripple = document.createElement("span");
    ripple.className = "ripple";
    btn.appendChild(ripple);

    const rect = btn.getBoundingClientRect();
    ripple.style.left = e.clientX - rect.left + "px";
    ripple.style.top = e.clientY - rect.top + "px";

    setTimeout(() => ripple.remove(), 600);
  });
});

/* =====================================================
   BUBBLES ON CLICK
===================================================== */
document.addEventListener("click", e => {
  const bubble = document.createElement("div");
  bubble.className = "bubble";
  bubble.style.left = e.clientX + "px";
  bubble.style.top = e.clientY + "px";
  document.body.appendChild(bubble);
  setTimeout(() => bubble.remove(), 1200);
});

/* =====================================================
   FALLING LEAVES
===================================================== */
function createLeaf() {
  const leaf = document.createElement("div");
  leaf.className = "leaf";
  leaf.style.left = Math.random() * window.innerWidth + "px";
  leaf.style.animationDuration = Math.random() * 5 + 6 + "s";
  document.body.appendChild(leaf);
  setTimeout(() => leaf.remove(), 12000);
}
setInterval(createLeaf, 1200);

/* =====================================================
   FLOATING STARS (PARALLAX)
===================================================== */
for (let i = 0; i < 40; i++) {
  const star = document.createElement("div");
  star.style.position = "fixed";
  star.style.width = "2px";
  star.style.height = "2px";
  star.style.background = "rgba(200,160,255,0.8)";
  star.style.borderRadius = "50%";
  star.style.top = Math.random() * window.innerHeight + "px";
  star.style.left = Math.random() * window.innerWidth + "px";
  star.style.animation = `starFloat ${Math.random() * 20 + 20}s linear infinite`;
  document.body.appendChild(star);
}

/* =====================================================
   COLLAPSIBLE MEMBER LISTS
===================================================== */
document.querySelectorAll(".collapsible").forEach(card => {
  card.addEventListener("click", () => {
    card.classList.toggle("open");
  });
});

/* =====================================================
   FAQ SEARCH
===================================================== */
const faqInput = document.getElementById("faqSearch");
const allFaqs = document.querySelectorAll("#all-faqs details");
const faqResults = document.getElementById("faq-results");
const faqFallback = document.getElementById("faq-discord-fallback");

if (faqInput) {
  faqInput.addEventListener("input", () => {
    const q = faqInput.value.toLowerCase().trim();
    let found = false;

    allFaqs.forEach(faq => {
      const text = faq.innerText.toLowerCase();
      if (text.includes(q)) {
        faq.style.display = "block";
        found = true;
      } else {
        faq.style.display = "none";
      }
    });

    if (!found && q !== "") {
      faqResults.innerHTML = "";
      if (faqFallback) faqFallback.style.display = "block";
    } else {
      faqResults.innerHTML = "";
      if (faqFallback) faqFallback.style.display = "none";
    }
  });
}

/* =====================================================
   COPY SERVER IP
===================================================== */
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

/* =====================================================
   BACK TO TOP BUTTON
===================================================== */
const topBtn = document.createElement("button");
topBtn.textContent = "↑";
topBtn.id = "topBtn";
document.body.appendChild(topBtn);

topBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

window.addEventListener("scroll", () => {
  topBtn.style.display = window.scrollY > 400 ? "block" : "none";
});
