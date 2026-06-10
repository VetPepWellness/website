// ===== Vet Pep Wellness — interactivity =====

// Product catalog (from the flyer). Edit prices/names/dosages here anytime.
const PRODUCTS = [
  { name: "Retatrutide", dose: "30 mg", price: 175 },
  { name: "Tirzepatide", dose: "40 mg", price: 120 },
  { name: "Klow", dose: "80 mg", price: 195 },
  { name: "Glow (BBG70)", dose: "70 mg", price: 195 },
  { name: "NAD+", dose: "1000 mg", price: 125 },
  { name: "Tesamorelin", dose: "10 mg", price: 160 },
  { name: "GHK-Cu", dose: "100 mg", price: 70 },
  { name: "CJC-1295 (no DAC) + IPA", dose: "5 mg + 5 mg", price: 115 },
  { name: "Lipo-C with B12", dose: "", price: 60 },
  { name: "Test-E", dose: "250", price: 85 },
  { name: "Test-E", dose: "400", price: 130 },
  { name: "Test-C", dose: "250", price: 85 },
];

function renderProducts() {
  const grid = document.getElementById("product-grid");
  if (!grid) return;
  grid.innerHTML = PRODUCTS.map((p) => {
    const label = p.dose ? `${p.name} <span style="color:var(--text-muted);font-weight:400">${p.dose}</span>` : p.name;
    return `
      <div class="product-card reveal">
        <div class="product-info">
          <span class="product-bullet">✦</span>
          <span class="product-name">${label}</span>
        </div>
        <span class="product-price">$${p.price}</span>
      </div>`;
  }).join("");
}

// Mobile nav toggle
function initNav() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".nav");
  if (!toggle || !nav) return;
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  nav.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    })
  );
}

// Scroll reveal
function initReveal() {
  const els = document.querySelectorAll(".section, .product-card, .feature, .stat");
  els.forEach((el) => el.classList.add("reveal"));
  if (!("IntersectionObserver" in window)) {
    els.forEach((el) => el.classList.add("in"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  els.forEach((el) => io.observe(el));
}

// Order form — mailto handoff (no backend needed; works on free static hosting)
function initForm() {
  const form = document.getElementById("order-form");
  const hint = document.getElementById("form-hint");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const name = (data.get("name") || "").toString().trim();
    const contact = (data.get("contact") || "").toString().trim();
    const message = (data.get("message") || "").toString().trim();
    const subject = encodeURIComponent(`Order Inquiry — ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nContact: ${contact}\n\nOrder / Message:\n${message}`
    );
    // TODO: replace with your real inbox.
    window.location.href = `mailto:hello@vetpepwellness.com?subject=${subject}&body=${body}`;
    if (hint) hint.textContent = "Opening your email app to send the inquiry…";
    form.reset();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  initNav();
  initReveal();
  initForm();
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
});
