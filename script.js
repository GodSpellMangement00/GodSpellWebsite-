/* =========================
   1. SCROLL REVEAL ANIMATION
========================= */
const revealEls = document.querySelectorAll(".section, .card");

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add("reveal");
    }
  });
}, { threshold: 0.15 });

revealEls.forEach(el => revealObserver.observe(el));

/* =========================
   2. FAQ TOGGLE
========================= */
document.querySelectorAll(".faq-title").forEach(q => {
  q.addEventListener("click", () => {
    const a = q.nextElementSibling;
    a.style.display = a.style.display === "block" ? "none" : "block";
  });
});

/* =========================
   3. FAQ LIVE SEARCH
========================= */
const faqSearch = document.getElementById("faqSearch");
if (faqSearch) {
  faqSearch.addEventListener("input", () => {
    const v = faqSearch.value.toLowerCase();
    document.querySelectorAll(".faq").forEach(f => {
      f.style.display = f.innerText.toLowerCase().includes(v)
        ? "block"
        : "none";
    });
  });
}

/* =========================
   4. MEMBER POPUP (members.html)
========================= */
function openPopup(name) {
  const popup = document.getElementById("popup");
  const nameBox = document.getElementById("popupName");
  if (!popup || !nameBox) return;

  nameBox.textContent = name;
  popup.style.display = "flex";
}

function closePopup() {
  const popup = document.getElementById("popup");
  if (popup) popup.style.display = "none";
}

/* =========================
   5. MEMBER LIVE SEARCH
========================= */
const memberSearch = document.getElementById("memberSearch");
if (memberSearch) {
  memberSearch.addEventListener("input", () => {
    const q = memberSearch.value.toLowerCase();
    document.querySelectorAll(".member-card").forEach(m => {
      m.style.display = m.textContent.toLowerCase().includes(q)
        ? "block"
        : "none";
    });
  });
}

/* =========================
   6. GALLERY FULLSCREEN VIEW
========================= */
const galleryImgs = document.querySelectorAll(".gallery img");

if (galleryImgs.length) {
  const overlay = document.createElement("div");
  overlay.style.cssText = `
    position:fixed;
    inset:0;
    background:rgba(0,0,0,.85);
    display:none;
    align-items:center;
    justify-content:center;
    z-index:9999;
  `;
  const fullImg = document.createElement("img");
  fullImg.style.maxWidth = "90%";
  fullImg.style.maxHeight = "90%";
  fullImg.style.borderRadius = "16px";

  overlay.appendChild(fullImg);
  document.body.appendChild(overlay);

  galleryImgs.forEach(img => {
    img.addEventListener("click", () => {
      fullImg.src = img.src;
      overlay.style.display = "flex";
    });
  });

  overlay.addEventListener("click", () => {
    overlay.style.display = "none";
  });
}

/* =========================
   7. CLICK BUBBLE EFFECT
========================= */
document.addEventListener("click", e => {
  const b = document.createElement("span");
  b.className = "click-bubble";
  b.style.left = e.clientX + "px";
  b.style.top = e.clientY + "px";
  document.body.appendChild(b);
  setTimeout(() => b.remove(), 600);
});

/* =========================
   8. PARALLAX BACKGROUND
========================= */
window.addEventListener("scroll", () => {
  document.body.style.backgroundPositionY =
    window.scrollY * 0.25 + "px";
});

/* =========================
   9. BACK TO TOP BUTTON
========================= */
const topBtn = document.createElement("button");
topBtn.textContent = "↑";
topBtn.style.cssText = `
  position:fixed;
  bottom:20px;
  right:20px;
  width:42px;
  height:42px;
  border-radius:50%;
  border:none;
  background:#9b7bff;
  color:#fff;
  box-shadow:0 0 18px rgba(160,120,255,.7);
  cursor:pointer;
  z-index:999;
`;
topBtn.onclick = () =>
  window.scrollTo({ top: 0, behavior: "smooth" });

document.body.appendChild(topBtn);
