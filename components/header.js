/**
 * components/header.js - the shared header (edit the HTML between the backticks).
 * Loaded by js/layout.js on every page.
 *
 * It is a .js file on purpose: tools like VS Code Live Server inject a reload
 * script into every .html file they serve, which cuts the end off an HTML
 * fragment (the mobile menu vanished). JavaScript files are never modified, so
 * the header always arrives complete - and it works without a local server too.
 */
window.SITE_PARTS = window.SITE_PARTS || {};
window.SITE_PARTS.header = `<!-- ========== HEADER (shared by every page, loaded by js/layout.js) ========== -->
  <a href="#main" class="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:rounded-full focus:bg-[#5A2A3C] focus:px-4 focus:py-2 focus:text-white">Skip to content</a>

  <!-- ========== HEADER / NAVBAR (same on every page) ========== -->
  <div class="bg-linear-to-r from-[#C2557D] via-[#E26A90] to-[#C2557D] text-white">
    <div class="mx-auto flex max-w-7xl items-center justify-center gap-4 px-4 py-2 text-center text-xs font-medium sm:justify-between sm:px-6 sm:text-sm lg:px-8">
      <p>Fresh cakes &amp; pastries baked every morning</p>
      <p class="hidden sm:block">Open 7 days a week &middot; <a href="./contact.html" class="underline underline-offset-2 hover:text-[#FDE6EE]">See opening hours</a></p>
    </div>
  </div>

  <header class="sticky top-0 z-40 border-b-4 border-[#F8B9CC] bg-white shadow-md shadow-[#E26A90]/10">
    <nav class="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8" aria-label="Main navigation">
      <a href="./index.html" class="group flex items-center gap-3 font-[Pacifico,cursive] min-w-0 text-lg font-normal text-[#5A2A3C] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E26A90] min-[400px]:text-xl sm:text-2xl">
        <img src="./assets/images/logo.svg" alt="" class="h-10 w-10 shrink-0 rounded-full shadow-md shadow-[#E26A90]/30 ring-2 ring-[#F8B9CC] transition duration-500 motion-safe:group-hover:rotate-[360deg] sm:h-12 sm:w-12" width="48" height="48">
        <span class="truncate leading-none">Sweet Crumbs <span class="text-[#C24A74]">Bakery</span></span>
      </a>

      <ul class="hidden items-center gap-1 font-[Quicksand,sans-serif] text-sm font-bold lg:flex">
        <li><a data-nav href="./index.html" class="rounded-full border-2 border-transparent px-4 py-2 text-[#5A2A3C] transition hover:border-[#F8B9CC] duration-300 motion-safe:hover:-translate-y-0.5 hover:bg-[#FDE6EE] focus-visible:outline-2 focus-visible:outline-[#E26A90] aria-[current=page]:bg-linear-to-r aria-[current=page]:from-[#E9769C] aria-[current=page]:to-[#C8456F] aria-[current=page]:border-[#C8456F] aria-[current=page]:text-white aria-[current=page]:shadow-md aria-[current=page]:shadow-[#E26A90]/30">Home</a></li>
        <li><a data-nav href="./menu.html" class="rounded-full border-2 border-transparent px-4 py-2 text-[#5A2A3C] transition hover:border-[#F8B9CC] duration-300 motion-safe:hover:-translate-y-0.5 hover:bg-[#FDE6EE] focus-visible:outline-2 focus-visible:outline-[#E26A90] aria-[current=page]:bg-linear-to-r aria-[current=page]:from-[#E9769C] aria-[current=page]:to-[#C8456F] aria-[current=page]:border-[#C8456F] aria-[current=page]:text-white aria-[current=page]:shadow-md aria-[current=page]:shadow-[#E26A90]/30">Menu</a></li>
        <li><a data-nav href="./about.html" class="rounded-full border-2 border-transparent px-4 py-2 text-[#5A2A3C] transition hover:border-[#F8B9CC] duration-300 motion-safe:hover:-translate-y-0.5 hover:bg-[#FDE6EE] focus-visible:outline-2 focus-visible:outline-[#E26A90] aria-[current=page]:bg-linear-to-r aria-[current=page]:from-[#E9769C] aria-[current=page]:to-[#C8456F] aria-[current=page]:border-[#C8456F] aria-[current=page]:text-white aria-[current=page]:shadow-md aria-[current=page]:shadow-[#E26A90]/30">About Us</a></li>
        <li><a data-nav href="./gallery.html" class="rounded-full border-2 border-transparent px-4 py-2 text-[#5A2A3C] transition hover:border-[#F8B9CC] duration-300 motion-safe:hover:-translate-y-0.5 hover:bg-[#FDE6EE] focus-visible:outline-2 focus-visible:outline-[#E26A90] aria-[current=page]:bg-linear-to-r aria-[current=page]:from-[#E9769C] aria-[current=page]:to-[#C8456F] aria-[current=page]:border-[#C8456F] aria-[current=page]:text-white aria-[current=page]:shadow-md aria-[current=page]:shadow-[#E26A90]/30">Gallery</a></li>
        <li><a data-nav href="./contact.html" class="rounded-full border-2 border-transparent px-4 py-2 text-[#5A2A3C] transition hover:border-[#F8B9CC] duration-300 motion-safe:hover:-translate-y-0.5 hover:bg-[#FDE6EE] focus-visible:outline-2 focus-visible:outline-[#E26A90] aria-[current=page]:bg-linear-to-r aria-[current=page]:from-[#E9769C] aria-[current=page]:to-[#C8456F] aria-[current=page]:border-[#C8456F] aria-[current=page]:text-white aria-[current=page]:shadow-md aria-[current=page]:shadow-[#E26A90]/30">Contact</a></li>
      </ul>

      <a href="./contact.html" class="border-2 border-[#C8456F] font-[Quicksand,sans-serif] hidden min-h-11 items-center justify-center gap-2 rounded-full bg-linear-to-r from-[#E9769C] to-[#C8456F] px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-[#E26A90]/30 transition duration-300 hover:from-[#C8456F] hover:to-[#A93A62] motion-safe:hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E26A90] lg:inline-flex">
        Visit Us
        <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14M13 6l6 6-6 6"/></svg>
      </a>

      <button id="menu-toggle" type="button" aria-expanded="false" aria-controls="mobile-menu" aria-label="Open menu"
        class="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-linear-to-r from-[#E9769C] to-[#C8456F] text-white shadow-md shadow-[#E26A90]/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E26A90] lg:hidden">
        <svg id="icon-open" class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" d="M4 7h16M4 12h16M4 17h16"/></svg>
        <svg id="icon-close" class="hidden h-6 w-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" d="M6 6l12 12M18 6L6 18"/></svg>
      </button>
    </nav>

    <div id="mobile-menu" class="hidden border-t border-[#F8B9CC] bg-[#FFF4F7] lg:hidden">
      <ul class="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3 sm:px-6">
        <li><a data-nav href="./index.html" class="block rounded-2xl border-2 border-transparent px-4 py-3 font-[Quicksand,sans-serif] font-bold hover:border-[#F8B9CC] text-[#5A2A3C] hover:bg-[#FDE6EE] aria-[current=page]:bg-linear-to-r aria-[current=page]:from-[#E9769C] aria-[current=page]:to-[#C8456F] aria-[current=page]:text-white">Home</a></li>
        <li><a data-nav href="./menu.html" class="block rounded-2xl border-2 border-transparent px-4 py-3 font-[Quicksand,sans-serif] font-bold hover:border-[#F8B9CC] text-[#5A2A3C] hover:bg-[#FDE6EE] aria-[current=page]:bg-linear-to-r aria-[current=page]:from-[#E9769C] aria-[current=page]:to-[#C8456F] aria-[current=page]:text-white">Menu</a></li>
        <li><a data-nav href="./about.html" class="block rounded-2xl border-2 border-transparent px-4 py-3 font-[Quicksand,sans-serif] font-bold hover:border-[#F8B9CC] text-[#5A2A3C] hover:bg-[#FDE6EE] aria-[current=page]:bg-linear-to-r aria-[current=page]:from-[#E9769C] aria-[current=page]:to-[#C8456F] aria-[current=page]:text-white">About Us</a></li>
        <li><a data-nav href="./gallery.html" class="block rounded-2xl border-2 border-transparent px-4 py-3 font-[Quicksand,sans-serif] font-bold hover:border-[#F8B9CC] text-[#5A2A3C] hover:bg-[#FDE6EE] aria-[current=page]:bg-linear-to-r aria-[current=page]:from-[#E9769C] aria-[current=page]:to-[#C8456F] aria-[current=page]:text-white">Gallery</a></li>
        <li><a data-nav href="./contact.html" class="block rounded-2xl border-2 border-transparent px-4 py-3 font-[Quicksand,sans-serif] font-bold hover:border-[#F8B9CC] text-[#5A2A3C] hover:bg-[#FDE6EE] aria-[current=page]:bg-linear-to-r aria-[current=page]:from-[#E9769C] aria-[current=page]:to-[#C8456F] aria-[current=page]:text-white">Contact</a></li>
      </ul>
    </div>
  </header>
`;
