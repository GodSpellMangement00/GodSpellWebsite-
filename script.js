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
function openLightbox(src) {
  const box = document.getElementById("lightbox");
  const img = document.getElementById("lightbox-img");
  img.src = src;
  box.style.display = "flex";
}

function closeLightbox() {
  document.getElementById("lightbox").style.display = "none";
}
/* ===== CLICK SOUND (optional) ===== */
const clickSound = new Audio("sounds/click.mp3");
clickSound.volume = 0.4;

document.addEventListener("click", () => {
  clickSound.currentTime = 0;
  clickSound.play().catch(()=>{});
});

/* ===== BUBBLE CLICK EFFECT ===== */
document.addEventListener("click", (e) => {
  const bubble = document.createElement("span");
  bubble.style.left = e.clientX + "px";
  bubble.style.top = e.clientY + "px";
  bubble.className = "click-bubble";
  document.body.appendChild(bubble);

  setTimeout(() => bubble.remove(), 600);
});

/* ===== MEMBER TOGGLE ===== */
function toggleMembers(openId, closeId) {
  document.getElementById(openId).classList.toggle("show");
  document.getElementById(closeId).classList.remove("show");
}

/* ===== FAQ TOGGLE ===== */
document.querySelectorAll(".faq-item").forEach(item => {
  item.addEventListener("click", () => {
    const ans = item.querySelector(".faq-answer");
    ans.style.display = ans.style.display === "block" ? "none" : "block";
  });
});

/* ===== FALLING LEAVES / PARTICLES ===== */
const canvas = document.createElement("canvas");
document.body.appendChild(canvas);
const ctx = canvas.getContext("2d");

canvas.style.position = "fixed";
canvas.style.top = 0;
canvas.style.left = 0;
canvas.style.pointerEvents = "none";
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

function createParticle() {
  particles.push({
    x: Math.random() * canvas.width,
    y: -10,
    size: Math.random() * 6 + 4,
    speed: Math.random() * 1.5 + 0.5,
    drift: Math.random() * 1 - 0.5
  });
}

function animate() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particles.forEach((p, i) => {
    p.y += p.speed;
    p.x += p.drift;
    ctx.fillStyle = "rgba(180,140,255,0.6)";
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();

    if (p.y > canvas.height) particles.splice(i,1);
  });

  if (particles.length < 40) createParticle();
  requestAnimationFrame(animate);
}

animate();

/* ===== RESIZE FIX ===== */
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
