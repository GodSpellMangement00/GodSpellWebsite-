/* ===============================
   1. SMOOTH SCROLL REVEAL
================================ */
const revealEls = document.querySelectorAll(".section, .card, .gallery-grid img");

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("reveal");
    }
  });
}, { threshold: 0.15 });

revealEls.forEach(el => revealObserver.observe(el));

/* ===============================
   2. FULLSCREEN GALLERY (LIGHTBOX)
================================ */
const galleryImgs = document.querySelectorAll(".gallery-grid img");
const overlay = document.createElement("div");
overlay.id = "img-overlay";
overlay.innerHTML = `<img>`;
document.body.appendChild(overlay);

const overlayImg = overlay.querySelector("img");

galleryImgs.forEach(img => {
  img.addEventListener("click", () => {
    overlayImg.src = img.src;
    overlay.classList.add("show");
  });
});

overlay.addEventListener("click", () => {
  overlay.classList.remove("show");
});

document.addEventListener("keydown", e => {
  if (e.key === "Escape") overlay.classList.remove("show");
});

/* ===============================
   3. PARALLAX BACKGROUND
================================ */
window.addEventListener("scroll", () => {
  document.body.style.backgroundPositionY =
    window.scrollY * 0.25 + "px";
});

/* ===============================
   4. CLICK BUBBLE EFFECT
================================ */
document.addEventListener("click", e => {
  const bubble = document.createElement("span");
  bubble.className = "click-bubble";
  bubble.style.left = e.clientX + "px";
  bubble.style.top = e.clientY + "px";
  document.body.appendChild(bubble);
  setTimeout(() => bubble.remove(), 600);
});

/* ===============================
   5. FALLING PARTICLES (LEAVES/STARS)
================================ */
const canvas = document.createElement("canvas");
canvas.id = "particle-canvas";
document.body.appendChild(canvas);
const ctx = canvas.getContext("2d");

canvas.style.position = "fixed";
canvas.style.inset = "0";
canvas.style.pointerEvents = "none";
canvas.style.zIndex = "0";

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

let particles = [];

function spawnParticle() {
  particles.push({
    x: Math.random() * canvas.width,
    y: -20,
    r: Math.random() * 3 + 2,
    s: Math.random() * 1.2 + 0.4,
    d: Math.random() * 0.8 - 0.4
  });
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((p, i) => {
    p.y += p.s;
    p.x += p.d;
    ctx.fillStyle = "rgba(180,140,255,0.6)";
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
    if (p.y > canvas.height) particles.splice(i, 1);
  });
  if (particles.length < 50) spawnParticle();
  requestAnimationFrame(animateParticles);
}
animateParticles();

/* ===============================
   6. MEMBER TOGGLE (ONE OPEN)
================================ */
function toggleMembers(openId, closeId) {
  document.getElementById(openId).classList.toggle("show");
  document.getElementById(closeId).classList.remove("show");
}

/* ===============================
   7. MEMBER SEARCH (LIVE)
================================ */
const searchInput = document.querySelector(".search-box");
if (searchInput) {
  searchInput.addEventListener("input", () => {
    const q = searchInput.value.toLowerCase();
    document.querySelectorAll(".member").forEach(m => {
      m.style.display = m.textContent.toLowerCase().includes(q)
        ? "block"
        : "none";
    });
  });
}

/* ===============================
   8. FAQ TOGGLE
================================ */
document.querySelectorAll(".faq-item").forEach(item => {
  item.addEventListener("click", () => {
    const ans = item.querySelector(".faq-answer");
    ans.style.display = ans.style.display === "block" ? "none" : "block";
  });
});

/* ===============================
   9. TOAST NOTIFICATION
================================ */
function toast(msg) {
  const t = document.createElement("div");
  t.textContent = msg;
  t.style.cssText = `
    position:fixed;bottom:30px;left:50%;
    transform:translateX(-50%);
    background:#6f3cff;color:#fff;
    padding:10px 20px;border-radius:20px;
    box-shadow:0 0 20px rgba(160,120,255,.8);
    z-index:9999`;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 1800);
}

/* ===============================
   10. COPY SERVER IP
================================ */
const copyBtn = document.querySelector(".copy-ip");
if (copyBtn) {
  copyBtn.addEventListener("click", () => {
    navigator.clipboard.writeText("pika-network.net");
    toast("Server IP Copied!");
  });
}

/* ===============================
   11. BACK TO TOP BUTTON
================================ */
const topBtn = document.createElement("button");
topBtn.textContent = "↑";
topBtn.style.cssText = `
  position:fixed;bottom:20px;right:20px;
  width:42px;height:42px;border-radius:50%;
  border:none;background:#9d78ff;color:#fff;
  box-shadow:0 0 18px rgba(160,120,255,.7);
  cursor:pointer;z-index:999`;
topBtn.onclick = () =>
  window.scrollTo({ top: 0, behavior: "smooth" });
document.body.appendChild(topBtn);
