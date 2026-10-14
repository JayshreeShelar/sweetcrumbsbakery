/**
 * main.js — shared behaviour for every page of Sweet Crumbs Bakery.
 * 1. Mobile navbar toggle (with aria-expanded)
 * 2. Close mobile menu after a link is clicked, or on Escape
 * 3. Mark the current page in the navigation (aria-current="page")
 * 4. Fallback for photos that fail to load
 * 5. Footer year
 */

// ---------- 1 & 2. Mobile menu (runs immediately, does not wait for the header) ----------
// The click is caught at the window level (capture phase) and checked against the
// button's position, so it works even if the header loads late or something
// transparent sits on top of the button.
(function () {
  if (window.__menuBound) return;
  window.__menuBound = true;

  function setMenu(open) {
    const toggle = document.getElementById("menu-toggle");
    const menu = document.getElementById("mobile-menu");
    if (!toggle || !menu) return;
    menu.classList.toggle("hidden", !open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    const iconOpen = document.getElementById("icon-open");
    const iconClose = document.getElementById("icon-close");
    if (iconOpen && iconClose) {
      iconOpen.classList.toggle("hidden", open);
      iconClose.classList.toggle("hidden", !open);
    }
  }

  function hitsToggle(e) {
    const toggle = document.getElementById("menu-toggle");
    if (!toggle || toggle.offsetParent === null) return false;
    const r = toggle.getBoundingClientRect();
    return e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
  }

  window.addEventListener("click", function (e) {
    if (hitsToggle(e)) {
      e.preventDefault();
      e.stopPropagation();
      const toggle = document.getElementById("menu-toggle");
      setMenu(toggle.getAttribute("aria-expanded") !== "true");
      return;
    }
    if (e.target.closest && e.target.closest("#mobile-menu a")) setMenu(false);
  }, true);

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") setMenu(false);
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth >= 1024) setMenu(false);
  });
})();

document.addEventListener("DOMContentLoaded", () => {
  // Wait until js/layout.js has put the shared header and footer on the page.
  (window.layoutReady || Promise.resolve()).then(init);
});


function init() {
  const reduceMotionAll = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  // ---------- 3. Highlight current page ----------
  // Works with "index.html", "/" and local servers alike.
  let current = window.location.pathname.split("/").pop();
  if (current === "") current = "index.html";
  document.querySelectorAll("[data-nav]").forEach((link) => {
    const target = link.getAttribute("href").split("/").pop();
    if (target === current) link.setAttribute("aria-current", "page");
  });

  // ---------- 4. Image fallback ----------
  // Each photo sits inside a pink container, so a failed image
  // simply reveals the soft pink background instead of a broken icon.
  document.querySelectorAll("img[data-photo]").forEach((img) => {
    const hide = () => img.classList.add("invisible");
    img.addEventListener("error", hide);
    if (img.complete && img.naturalWidth === 0) hide();
  });

  // ---------- 5. Footer year ----------
  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });

  // ---------- 6. Home page hero slider ----------
  // Full-width banner photos that fade into each other every 5 seconds.
  // Pauses on hover/focus, has prev/next/dots/pause buttons, and does not
  // start automatically if the visitor prefers reduced motion.
  const slider = document.getElementById("hero-slider");
  if (slider) {
    const slides = slider.querySelectorAll("[data-slide]");
    const dots = slider.querySelectorAll("[data-dot]");
    const pauseBtn = document.getElementById("hero-pause");
    const pauseIcon = document.getElementById("hero-pause-icon");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let index = 0;
    let timer = null;
    let userPaused = reduceMotion;

    function show(i) {
      index = (i + slides.length) % slides.length;
      slides.forEach((slide, n) => {
        const active = n === index;
        slide.classList.toggle("opacity-100", active);
        slide.classList.toggle("opacity-0", !active);
        slide.setAttribute("aria-hidden", String(!active));
      });
      dots.forEach((dot, n) => dot.setAttribute("aria-current", String(n === index)));
    }
    function stop() { clearInterval(timer); timer = null; }
    function start() {
      stop();
      if (!userPaused) timer = setInterval(() => show(index + 1), 5000);
    }
    function syncPauseButton() {
      pauseBtn.setAttribute("aria-label", userPaused ? "Play banner slideshow" : "Pause banner slideshow");
      pauseIcon.textContent = userPaused ? "\u25B6" : "||";
    }

    document.getElementById("hero-prev").addEventListener("click", () => { show(index - 1); start(); });
    document.getElementById("hero-next").addEventListener("click", () => { show(index + 1); start(); });
    dots.forEach((dot, n) => dot.addEventListener("click", () => { show(n); start(); }));
    pauseBtn.addEventListener("click", () => { userPaused = !userPaused; syncPauseButton(); start(); });
    slider.addEventListener("mouseenter", stop);
    slider.addEventListener("mouseleave", start);
    slider.addEventListener("focusin", stop);
    slider.addEventListener("focusout", start);

    syncPauseButton();
    start();
  }

  // ---------- 7. Navbar shadow after scrolling ----------
  const header = document.querySelector("header");
  function onScroll() {
    if (header) header.classList.toggle("shadow-md", window.scrollY > 10);
    if (topBtn) {
      const show = window.scrollY > 600;
      topBtn.classList.toggle("opacity-0", !show);
      topBtn.classList.toggle("pointer-events-none", !show);
      topBtn.classList.toggle("translate-y-4", !show);
    }
  }

  // ---------- 8. Back-to-top button ----------
  const topBtn = document.createElement("button");
  topBtn.type = "button";
  topBtn.setAttribute("aria-label", "Back to top");
  topBtn.className = "pointer-events-none fixed bottom-5 right-5 z-40 flex h-12 w-12 translate-y-4 items-center justify-center rounded-full bg-linear-to-r from-[#E9769C] to-[#C8456F] text-white opacity-0 shadow-lg transition duration-300 hover:from-[#C8456F] hover:to-[#A93A62] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E26A90]";
  topBtn.innerHTML = '<svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M6 15l6-6 6 6"/></svg>';
  topBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: reduceMotionAll ? "auto" : "smooth" }));
  document.body.appendChild(topBtn);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // ---------- 9. Scroll reveal ----------
  // Elements marked data-reveal fade and slide up as they enter the screen.
  // Siblings are staggered a little. Skipped entirely for reduced-motion users.
  if (!reduceMotionAll && "IntersectionObserver" in window) {
    const delays = ["delay-0", "delay-100", "delay-200", "delay-300"];
    const hidden = ["opacity-0", "translate-y-8"];
    const targets = document.querySelectorAll("[data-reveal]");
    const seen = new Map();
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        el.classList.remove(...hidden);
        setTimeout(() => el.classList.remove("duration-700", "ease-out", ...delays), 1300);
        io.unobserve(el);
      });
    }, { threshold: 0.12 });
    targets.forEach((el) => {
      const n = seen.get(el.parentElement) || 0;
      seen.set(el.parentElement, n + 1);
      el.classList.add(...hidden, "transition-all", "duration-700", "ease-out", delays[n % 4]);
      io.observe(el);
    });
  }
}
