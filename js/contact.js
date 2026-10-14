/**
 * contact.js - validates the enquiry form on contact.html and then opens
 * WhatsApp with the enquiry already typed, so the visitor only has to press send.
 * Change WHATSAPP_NUMBER below (country code + number, digits only) to use another number.
 */
const WHATSAPP_NUMBER = "918830532500";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  const statusBox = document.getElementById("form-status");
  if (!form) return;

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const phonePattern = /^[+()\d\s-]{7,16}$/;

  // Each rule returns an error message, or "" when the value is fine.
  const rules = {
    name: (v) => (v.length < 2 ? "Please enter your full name." : ""),
    email: (v) => (v === "" ? "Please enter your email address." : !emailPattern.test(v) ? "Enter a valid email, like name@example.com." : ""),
    phone: (v) => (v !== "" && !phonePattern.test(v) ? "Use digits, spaces, + or - only (7 to 16 characters)." : ""),
    type: (v) => (v === "" ? "Please choose an enquiry type." : ""),
    message: (v) => (v.length < 10 ? "Please write at least 10 characters so we can help." : ""),
  };

  function check(id) {
    const input = document.getElementById(id);
    const error = document.getElementById(id + "-error");
    const message = rules[id](input.value.trim());
    error.textContent = message;
    input.setAttribute("aria-invalid", message ? "true" : "false");
    return message === "";
  }

  function showStatus(text, ok) {
    statusBox.textContent = text;
    statusBox.classList.remove("hidden", "bg-[#FDE6EE]", "text-[#5A2A3C]", "bg-[#B3261E]", "text-white");
    statusBox.classList.add(...(ok ? ["bg-[#FDE6EE]", "text-[#5A2A3C]"] : ["bg-[#B3261E]", "text-white"]));
    statusBox.focus();
  }

  // Re-check a field once the visitor leaves it.
  Object.keys(rules).forEach((id) => {
    document.getElementById(id).addEventListener("blur", () => check(id));
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault(); // no page reload
    const failed = Object.keys(rules).filter((id) => !check(id));

    if (failed.length > 0) {
      showStatus("Please fix the " + failed.length + (failed.length === 1 ? " field" : " fields") + " marked below and try again.", false);
      document.getElementById(failed[0]).focus();
      return;
    }

    // Valid: build the WhatsApp message and open WhatsApp.
    const val = (id) => document.getElementById(id).value.trim();
    const lines = [
      "Hello Sweet Crumbs Bakery, I have an enquiry from your website.",
      "",
      "Name: " + val("name"),
      "Email: " + val("email"),
      "Phone: " + (val("phone") || "-"),
      "Enquiry type: " + val("type"),
      "",
      "Message:",
      val("message"),
    ];
    const url = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(lines.join("\n"));
    const opened = window.open(url, "_blank", "noopener");
    showStatus("Opening WhatsApp with your enquiry. Press send there to reach us. ", true);
    const link = document.createElement("a");
    link.href = url;
    link.target = "_blank";
    link.rel = "noopener";
    link.className = "font-semibold underline";
    link.textContent = "WhatsApp did not open? Tap here.";
    statusBox.appendChild(link);
    if (!opened) window.location.href = url; // popup blocked: open in the same tab
    form.reset();
  });
});
