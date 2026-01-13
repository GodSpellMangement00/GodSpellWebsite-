/* ===============================
   CLICK SOUND (ON / OFF)
================================ */
const clickSound = document.getElementById("click-sound");
const soundToggle = document.getElementById("sound-toggle");

let soundOn = true;

if (clickSound) {
  clickSound.volume = 0.4;
}

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

/* ===============================
   MEMBER LIST TOGGLE
================================ */
document.querySelectorAll(".collapsible").forEach(card => {
  card.addEventListener("click", () => {
    card.classList.toggle("open");
  });
});

/* ===============================
   BUBBLES ON CLICK
================================ */
document.addEventListener("click", (e) => {
  const bubble = document.createElement("div");
  bubble.className = "bubble";
  bubble.style.left = e.clientX + "px";
  bubble.style.top = e.clientY + "px";
  document.body.appendChild(bubble);

  setTimeout(() => bubble.remove(), 1000);
});

/* ===============================
   FALLING LEAVES
================================ */
function createLeaf() {
  const leaf = document.createElement("div");
  leaf.className = "leaf";

  leaf.style.left = Math.random() * window.innerWidth + "px";
  leaf.style.animationDuration = (Math.random() * 5 + 7) + "s";

  document.body.appendChild(leaf);

  setTimeout(() => leaf.remove(), 12000);
}

/* spawn leaves slowly (smooth, no lag) */
setInterval(createLeaf, 1500);

/* ===============================
   COPY SERVER IP
================================ */
const copyBtn = document.querySelector(".copy-ip");

if (copyBtn) {
  copyBtn.addEventListener("click", () => {
    navigator.clipboard.writeText("pika-network.net").then(() => {
      const oldText = copyBtn.textContent;
      copyBtn.textContent = "IP Copied ✔";
      setTimeout(() => {
        copyBtn.textContent = oldText;
      }, 1500);
    });
  });
}
const faqInput = document.getElementById("faqSearch");
const faqs = document.querySelectorAll("#all-faqs details");
const results = document.getElementById("faq-results");

if (faqInput) {
  faqInput.addEventListener("input", () => {
    const query = faqInput.value.toLowerCase().trim();
    let found = false;

    faqs.forEach(faq => {
      if (faq.innerText.toLowerCase().includes(query)) {
        faq.style.display = "block";
        found = true;
      } else {
        faq.style.display = "none";
      }
    });

    results.innerHTML = (!found && query)
      ? `<div class="card">No answer found.<br>
         <a class="btn" href="https://discord.gg/YQVF7sy2gR">Join our Discord</a></div>`
      : "";
  });
}
