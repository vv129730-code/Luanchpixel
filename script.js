const siteData = {
  agencyName: "LaunchPixel",
  tagline: "Launch Your Business Online.",

  phoneNumber: "+91 9236537415",
  whatsappNumber: "+91 9236537415",
  whatsappLink: "https://wa.me/919236537415",

  email: "vv129730@gmail.com",

  instagram: "@launchpixel",
  websiteUrl: "https://launchpixel.vercel.app",

  pricingPlans: [
    {
      name: "Basic",
      price: "₹3,999",
      features: [
        "Premium Business Website",
        "Mobile Responsive Design",
        "WhatsApp Integration",
        "Google Maps Integration",
        "Contact Form",
        "Basic SEO Setup",
        "7 Days Support"
      ]
    },
    {
      name: "Pro",
      price: "₹5,999",
      badge: "Most Popular",
      featured: true,
      features: [
        "Everything in Basic",
        "Digital Menu System",
        "QR Marketing Setup",
        "Custom Animations",
        "Social Media Integration",
        "Priority Support",
        "15 Days Support"
      ]
    },
    {
      name: "Premium",
      price: "₹10,999",
      badge: "Best Value",
      features: [
        "Everything in Pro",
        "Admin Dashboard",
        "Custom Features",
        "Lead Capture System",
        "Advanced Integrations",
        "Performance Optimization",
        "30 Days Support"
      ]
    }
  ]
};

const whatsappMessage = {
  freeDemo: `Hi ${siteData.agencyName}, I want my free demo`,
  launch: `Hi ${siteData.agencyName}, I want to launch my business online`,
  plan: (planName) => `Hi ${siteData.agencyName}, I want a free demo for the ${planName} plan`
};

const getWhatsappUrl = (message) => `${siteData.whatsappLink}?text=${encodeURIComponent(message)}`;
const getInstagramUrl = () => `https://instagram.com/${siteData.instagram.replace("@", "")}`;

const hydrateSiteText = () => {
  document.querySelectorAll("[data-site]").forEach((item) => {
    const key = item.dataset.site;
    if (siteData[key]) item.textContent = siteData[key];
  });
};

const hydrateContactLinks = () => {
  const linkMap = {
    whatsapp: {
      href: getWhatsappUrl(whatsappMessage.freeDemo),
      text: `WhatsApp ${siteData.whatsappNumber}`
    },
    instagram: {
      href: getInstagramUrl(),
      text: `Instagram ${siteData.instagram}`
    },
    email: {
      href: `mailto:${siteData.email}`,
      text: `Email ${siteData.email}`
    },
    website: {
      href: siteData.websiteUrl,
      text: "Website"
    }
  };

  document.querySelectorAll("[data-contact-link]").forEach((link) => {
    const details = linkMap[link.dataset.contactLink];
    if (!details) return;
    link.href = details.href;
    link.textContent = details.text;
  });

  document.querySelectorAll("[data-whatsapp-cta]").forEach((link) => {
    const message = whatsappMessage[link.dataset.whatsappCta] || whatsappMessage.freeDemo;
    link.href = getWhatsappUrl(message);
  });

  document.querySelectorAll("[data-contact-form]").forEach((form) => {
    form.action = `mailto:${siteData.email}`;
  });

  document.querySelectorAll("[data-phone-placeholder]").forEach((field) => {
    field.placeholder = siteData.phoneNumber;
  });
};

const renderPricing = () => {
  const pricingGrid = document.querySelector("[data-pricing-grid]");
  if (!pricingGrid) return;

  pricingGrid.innerHTML = "";

  siteData.pricingPlans.forEach((plan) => {
    const card = document.createElement("article");
    card.className = `pricing-card gradient-border${plan.featured ? " is-featured" : ""}`;
    card.setAttribute("data-reveal", "");

    if (plan.badge) {
      const badge = document.createElement("span");
      badge.className = "popular";
      badge.textContent = plan.badge;
      card.appendChild(badge);
    }

    const head = document.createElement("div");
    head.className = "price-head";

    const title = document.createElement("h3");
    title.textContent = plan.name;

    const price = document.createElement("strong");
    price.textContent = plan.price;

    head.append(title, price);
    card.appendChild(head);

    const list = document.createElement("ul");
    plan.features.forEach((feature) => {
      const item = document.createElement("li");
      item.textContent = feature;
      list.appendChild(item);
    });
    card.appendChild(list);

    const button = document.createElement("a");
    button.className = `btn ${plan.featured ? "btn-primary" : "btn-secondary"} magnetic-cta`;
    button.href = getWhatsappUrl(whatsappMessage.plan(plan.name));
    button.target = "_blank";
    button.rel = "noopener";
    button.textContent = "Get Your Free Demo";
    card.appendChild(button);

    pricingGrid.appendChild(card);
  });
};

hydrateSiteText();
renderPricing();
hydrateContactLinks();

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
