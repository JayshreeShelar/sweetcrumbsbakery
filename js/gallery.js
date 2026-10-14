/**
 * gallery.js — category filter + accessible lightbox for gallery.html
 */
document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll("[data-filter]");
  const items = document.querySelectorAll("#gallery-grid [data-category]");
  const status = document.getElementById("gallery-status");
  const box = document.getElementById("lightbox");
  const boxImg = document.getElementById("lightbox-img");
  const boxCaption = document.getElementById("lightbox-caption");
  const closeBtn = document.getElementById("lightbox-close");
  let lastTrigger = null;

  // ----- Filter -----
  function applyFilter(category) {
    let visible = 0;
    items.forEach((item) => {
      const show = category === "all" || item.dataset.category === category;
      item.classList.toggle("hidden", !show);
      if (show) visible += 1;
    });
    buttons.forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.filter === category)));
    if (status) status.textContent = visible + (visible === 1 ? " photo shown" : " photos shown");
  }
  buttons.forEach((b) => b.addEventListener("click", () => applyFilter(b.dataset.filter)));
  applyFilter("all");

  // ----- Lightbox -----
  function openBox(trigger) {
    lastTrigger = trigger;
    boxImg.src = trigger.dataset.full;
    boxImg.alt = trigger.dataset.alt;
    boxCaption.textContent = trigger.dataset.alt;
    box.classList.remove("hidden");
    box.classList.add("flex");
    document.body.classList.add("overflow-hidden"); // stop page scrolling behind the lightbox
    closeBtn.focus();
  }

  function closeBox() {
    box.classList.add("hidden");
    box.classList.remove("flex");
    document.body.classList.remove("overflow-hidden");
    boxImg.src = "";
    if (lastTrigger) lastTrigger.focus(); // return focus to the photo that was opened
  }

  document.querySelectorAll("#gallery-grid button[data-full]").forEach((b) => {
    b.addEventListener("click", () => openBox(b));
  });
  closeBtn.addEventListener("click", closeBox);
  // Clicking the dark backdrop (but not the photo) also closes it.
  box.addEventListener("click", (event) => {
    if (event.target === box) closeBox();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !box.classList.contains("hidden")) closeBox();
  });
});
