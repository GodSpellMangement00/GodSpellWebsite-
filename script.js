// Auto-close other open member lists + toggle text
const toggles = document.querySelectorAll(".member-toggle");

toggles.forEach(current => {
  current.addEventListener("toggle", () => {
    if (current.open) {
      toggles.forEach(other => {
        if (other !== current) other.open = false;
      });
    }
  });
});
