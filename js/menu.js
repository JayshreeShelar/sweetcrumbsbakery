/**
 * menu.js — category filter for menu.html
 * Shows or hides product cards by toggling Tailwind's "hidden" class.
 */
document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll("[data-filter]");
  const cards = document.querySelectorAll("#menu-grid [data-category]");
  const empty = document.getElementById("menu-empty");
  const status = document.getElementById("menu-status");

  function applyFilter(category) {
    let visible = 0;
    cards.forEach((card) => {
      const show = category === "all" || card.dataset.category === category;
      card.classList.toggle("hidden", !show);
      if (show) visible += 1;
    });
    buttons.forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.filter === category)));
    if (empty) empty.classList.toggle("hidden", visible !== 0);
    if (status) status.textContent = visible + (visible === 1 ? " item shown" : " items shown");
  }

  buttons.forEach((b) => b.addEventListener("click", () => applyFilter(b.dataset.filter)));
  applyFilter("all");
});
