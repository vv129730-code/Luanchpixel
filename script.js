const body = document.body;
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelectorAll(".nav-links a, .nav-cta");
const revealItems = document.querySelectorAll("[data-reveal]");
const magneticItems = document.querySelectorAll(".magnetic-cta");
const demoLinks = document.querySelectorAll(".demo-button");

if (navToggle) {
  navToggle.addEventListener("click", () => {
    const isOpen = body.classList.toggle("nav-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    body.classList.remove("nav-open");
    navToggle?.setAttribute("aria-expanded", "false");
    navToggle?.setAttribute("aria-label", "Open navigation");
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.13,
    rootMargin: "0px 0px -40px 0px"
  }
);

revealItems.forEach((item, index) => {
  item.style.transitionDelay = `${Math.min(index * 35, 260)}ms`;
  revealObserver.observe(item);
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (event) => {
    const target = document.querySelector(anchor.getAttribute("href"));
    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

magneticItems.forEach((item) => {
  item.addEventListener("mousemove", (event) => {
    const rect = item.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 12;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 10;
    item.style.setProperty("--magnet-x", `${x}px`);
    item.style.setProperty("--magnet-y", `${y}px`);
  });

  item.addEventListener("mouseleave", () => {
    item.style.setProperty("--magnet-x", "0px");
    item.style.setProperty("--magnet-y", "0px");
  });
});

demoLinks.forEach((link) => {
  link.addEventListener("click", () => {
    link.classList.add("is-loading");
    window.setTimeout(() => link.classList.remove("is-loading"), 900);
  });
});
