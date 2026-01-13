/* =========================
   CLICK SOUND
========================= */
const clickSound = document.getElementById("click-sound");

document.addEventListener("click", () => {
  if (!clickSound) return;
  clickSound.currentTime = 0;
  clickSound.volume = 0.3;
  clickSound.play().catch(() => {});
});

/* =========================
   COPY SERVER IP
========================= */
const copyBtn = document.querySelector(".copy-ip");
const ipText = document.getElementById("server-ip");
const SERVER_IP = "pika-network.net";

if (copyBtn) {
  copyBtn.addEventListener("click", () => {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(SERVER_IP).then(showCopied).catch(showFallback);
    } else {
      showFallback();
    }
  });
}

function showCopied() {
  const old = copyBtn.innerText;
  copyBtn.innerText = "IP Copied ✔";
  setTimeout(() => (copyBtn.innerText = old), 2000);
}

function showFallback() {
  ipText.style.display = "block";
  ipText.innerText = "Server IP: " + SERVER_IP + " (long press to copy)";
}

/* =========================
   SCROLL REVEAL
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
   CLICK BUBBLES
========================= */
function bubble(x, y) {
  const b = document.createElement("span");
  b.className = "bubble";
  const size = Math.random() * 12 + 8;

  b.style.width = size + "px";
  b.style.height = size + "px";
  b.style.left = x - size / 2 + "px";
  b.style.top = y - size / 2 + "px";

  document.body.appendChild(b);
  setTimeout(() => b.remove(), 1200);
}

document.addEventListener("click", e => {
  bubble(e.clientX, e.clientY);
});

/* =========================
   FAQ SEARCH LOGIC
========================= */
const searchInput = document.getElementById("faqSearch");
const faqs = document.querySelectorAll("#all-faqs details");
const resultBox = document.getElementById("faq-results");

if (searchInput) {
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase().trim();
    let found = false;

    resultBox.style.display = "none";
    resultBox.innerHTML = "";

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

    if (!found) {
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
