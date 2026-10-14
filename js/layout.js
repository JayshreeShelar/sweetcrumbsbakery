/**
 * layout.js - puts the shared header and footer on every page.
 *
 *   components/header.js   -> the top bar + navigation (+ mobile menu)
 *   components/footer.js   -> the footer
 *
 * Every page only needs:
 *   <div id="site-header"></div>      (top of <body>)
 *   <div id="site-footer"></div>      (after </main>)
 *   <script src="./js/layout.js" defer></script>   (before main.js)
 *
 * The parts are .js files (not .html) so that tools such as VS Code Live Server,
 * which inject a script into every .html file, can never cut them off.
 * This also means the site works when index.html is simply double-clicked.
 */
(function () {
  function loadScript(src) {
    return new Promise(function (resolve, reject) {
      var s = document.createElement("script");
      s.src = src;
      s.onload = resolve;
      s.onerror = function () { reject(new Error(src + " could not be loaded")); };
      document.head.appendChild(s);
    });
  }

  function put(id, html) {
    var el = document.getElementById(id);
    if (el) el.outerHTML = html;
  }

  window.layoutReady = Promise.all([
    loadScript("./components/header.js"),
    loadScript("./components/footer.js"),
  ])
    .then(function () {
      put("site-header", window.SITE_PARTS.header);
      put("site-footer", window.SITE_PARTS.footer);
    })
    .catch(function (err) {
      console.error("Header/footer could not be loaded:", err);
      put(
        "site-header",
        '<p class="bg-[#C8456F] px-4 py-2 text-center text-sm text-white">' +
          '<a class="underline" href="./index.html">Home</a> &middot; <a class="underline" href="./menu.html">Menu</a> &middot; <a class="underline" href="./about.html">About</a> &middot; <a class="underline" href="./gallery.html">Gallery</a> &middot; <a class="underline" href="./contact.html">Contact</a></p>'
      );
    });
})();
