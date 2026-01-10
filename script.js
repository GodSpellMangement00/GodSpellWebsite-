// STAR EFFECT DISABLED COMPLETELY
// (kept empty on purpose to stop animation)

// If canvas exists, clear it once and stop
const canvas = document.getElementById("stars");
if (canvas) {
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
