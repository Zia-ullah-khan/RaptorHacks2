// ─── Alert Popup ───
// Show the popup after the website fully loads (window load event)

const ALERT_KEY = "team-formation-3-10-26";

window.addEventListener("load", () => {
  const overlay = document.getElementById("alert-popup-overlay");
  if (!overlay) return;

  // Check if user has already dismissed this alert this session
  if (sessionStorage.getItem("alertDismissed") === ALERT_KEY) return;

  // Wait for preloader to finish, then show
  const showDelay = document.querySelector(".preloader") ? 4000 : 1200;

  setTimeout(() => {
    overlay.classList.add("active");
  }, showDelay);

  // Close popup
  const closeBtn = overlay.querySelector(".alert-popup-close");
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      overlay.classList.remove("active");
      sessionStorage.setItem("alertDismissed", ALERT_KEY);
    });
  }

  // Close on overlay click (outside the popup)
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
      overlay.classList.remove("active");
      sessionStorage.setItem("alertDismissed", ALERT_KEY);
    }
  });

  // Close on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && overlay.classList.contains("active")) {
      overlay.classList.remove("active");
      sessionStorage.setItem("alertDismissed", ALERT_KEY);
    }
  });
});
