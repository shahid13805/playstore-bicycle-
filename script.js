// Play Store Bicycle - plain JavaScript version
// No React, TypeScript, Tailwind or Supabase is required.

// -------------------------
// Mobile navigation
// -------------------------
const menuBtn = document.getElementById("menuBtn");
const mobileNav = document.getElementById("mobileNav");

if (menuBtn && mobileNav) {
  menuBtn.addEventListener("click", () => {
    const isOpen = mobileNav.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", String(isOpen));
    menuBtn.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  });

  mobileNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileNav.classList.remove("open");
      menuBtn.setAttribute("aria-expanded", "false");
      menuBtn.setAttribute("aria-label", "Open menu");
    });
  });
}

// -------------------------
// Contact form -> WhatsApp
// -------------------------
const form = document.getElementById("contactForm");
const nameInput = document.getElementById("name");
const phoneInput = document.getElementById("phone");
const interestInput = document.getElementById("interest");
const messageInput = document.getElementById("message");

const nameError = document.getElementById("nameError");
const phoneError = document.getElementById("phoneError");
const successMessage = document.getElementById("successMessage");

const WHATSAPP_NUMBER = "919787788188";

function createWhatsAppLink(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function clearErrors() {
  nameError.textContent = "";
  phoneError.textContent = "";
}

function validateForm() {
  clearErrors();

  let valid = true;
  const name = nameInput.value.trim();
  const phone = phoneInput.value.trim();

  if (name.length < 2) {
    nameError.textContent = "Please enter your name.";
    valid = false;
  }

  // Accepts Indian-style phone numbers and common formats.
  const phoneDigits = phone.replace(/\D/g, "");

  if (phoneDigits.length < 10) {
    phoneError.textContent = "Please enter a valid phone number.";
    valid = false;
  }

  return valid;
}

if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    successMessage.textContent = "";

    if (!validateForm()) {
      return;
    }

    const name = nameInput.value.trim();
    const phone = phoneInput.value.trim();
    const interest = interestInput.value;
    const message = messageInput.value.trim();

    const whatsappMessage =
      `Hi Play Store Bicycle, I'm ${name}.` +
      `\nPhone: ${phone}` +
      `\nI'm interested in: ${interest}.` +
      (message ? `\nMessage: ${message}` : "");

    const whatsappUrl = createWhatsAppLink(whatsappMessage);

    successMessage.textContent = "Opening WhatsApp...";
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  });
}

// -------------------------
// Add a subtle active state to
// navigation links while scrolling
// -------------------------
const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".desktop-nav a, .mobile-nav a");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${entry.target.id}`) {
            link.classList.add("active");
          }
        });
      }
    });
  },
  { rootMargin: "-35% 0px -55% 0px" }
);

sections.forEach((section) => observer.observe(section));
