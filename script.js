// ===== Vet Pep Wellness — storefront =====

// ---- Categories (edit freely) ----
const CATEGORIES = [
  { id: "glp1",   name: "GLP-1 Analogs",      icon: "⚖", blurb: "Metabolic & weight management", color: "#e3c478" },
  { id: "gero",   name: "Geroprotectors",     icon: "⏳", blurb: "Longevity & anti-aging",        color: "#9fc3a8" },
  { id: "skin",   name: "Skin & Regeneration",icon: "✦", blurb: "Repair, recovery & glow",        color: "#d9a679" },
  { id: "growth", name: "Growth & Recovery",  icon: "❖", blurb: "GH support & recovery",           color: "#cbb06a" },
  { id: "supply", name: "Wellness & Supplies",icon: "✚", blurb: "Vitamins & extras",              color: "#bcae8a" },
];

// ---- Products (from the flyer). Edit prices/names/dosages here. ----
const PRODUCTS = [
  { id: "reta30",  cat: "glp1",   name: "Retatrutide",          dose: "30 mg",        price: 175, best: true },
  { id: "tirz40",  cat: "glp1",   name: "Tirzepatide",          dose: "40 mg",        price: 120, best: true },
  { id: "nad1000", cat: "gero",   name: "NAD+",                 dose: "1000 mg",      price: 125 },
  { id: "ghkcu",   cat: "gero",   name: "GHK-Cu",               dose: "100 mg",       price: 70 },
  { id: "klow80",  cat: "skin",   name: "Klow",                 dose: "80 mg",        price: 195 },
  { id: "glow70",  cat: "skin",   name: "Glow (BBG70)",         dose: "70 mg",        price: 195, best: true },
  { id: "tesa10",  cat: "growth", name: "Tesamorelin",          dose: "10 mg",        price: 160 },
  { id: "cjcipa",  cat: "growth", name: "CJC-1295 (no DAC) + Ipamorelin", dose: "5 mg + 5 mg", price: 115, best: true },
  { id: "lipoc",   cat: "supply", name: "Lipo-C with B12",      dose: "",             price: 60 },
];

// ---- Your contact details (used for one-tap order sending) ----
// TODO: replace with your real number (digits only, incl. country code) and email.
const ORDER_PHONE = "10000000000";          // e.g. "18065551234"
const ORDER_EMAIL = "hello@vetpepwellness.com";

const catById = (id) => CATEGORIES.find((c) => c.id === id) || {};
const money = (n) => "$" + n.toLocaleString();

// ---- Generated vial graphic (no photos needed) ----
function vialSVG(product, small) {
  const c = catById(product.cat).color || "#c9a14a";
  const label = (product.name.match(/[A-Za-z0-9+]+/g) || [product.name])[0].slice(0, 7);
  return `
  <svg viewBox="0 0 60 110" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="20" y="2" width="20" height="9" rx="2" fill="url(#cap-${product.id})"/>
    <rect x="16" y="14" width="28" height="92" rx="9" fill="#0d3a33" stroke="${c}" stroke-width="1.4"/>
    <rect x="16" y="14" width="28" height="92" rx="9" fill="url(#glass-${product.id})"/>
    <rect x="18" y="44" width="24" height="40" rx="3" fill="${c}" opacity="0.92"/>
    ${small ? "" : `<text x="30" y="60" text-anchor="middle" font-family="Jost,sans-serif" font-size="6.5" font-weight="600" fill="#20180a">${label}</text>`}
    ${small ? "" : `<text x="30" y="70" text-anchor="middle" font-family="Jost,sans-serif" font-size="5" fill="#3a2d10">${product.dose || "VPW"}</text>`}
    <defs>
      <linearGradient id="cap-${product.id}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#e6cd86"/><stop offset="1" stop-color="#a8842f"/>
      </linearGradient>
      <linearGradient id="glass-${product.id}" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="rgba(255,255,255,0.16)"/>
        <stop offset="0.3" stop-color="rgba(255,255,255,0)"/>
        <stop offset="1" stop-color="rgba(0,0,0,0.12)"/>
      </linearGradient>
    </defs>
  </svg>`;
}

// ---- Cart state (persisted) ----
const CART_KEY = "vpw_cart";
let cart = loadCart();
function loadCart() { try { return JSON.parse(localStorage.getItem(CART_KEY)) || {}; } catch { return {}; } }
function saveCart() { localStorage.setItem(CART_KEY, JSON.stringify(cart)); }
function cartCount() { return Object.values(cart).reduce((a, b) => a + b, 0); }
function cartSubtotal() {
  return Object.entries(cart).reduce((sum, [id, qty]) => {
    const p = PRODUCTS.find((x) => x.id === id);
    return sum + (p ? p.price * qty : 0);
  }, 0);
}

function addToCart(id) {
  cart[id] = (cart[id] || 0) + 1;
  saveCart(); renderCart(); updateCartCount();
  openCart();
}
function setQty(id, qty) {
  if (qty <= 0) delete cart[id]; else cart[id] = qty;
  saveCart(); renderCart(); updateCartCount();
}

// ---- Renderers ----
function productCard(p) {
  const cat = catById(p.cat);
  return `
  <article class="product-card reveal" data-cat="${p.cat}" data-name="${p.name.toLowerCase()} ${p.dose.toLowerCase()}">
    <div class="product-media">
      <span class="product-tag" style="background:${cat.color}">${cat.name}</span>
      ${p.best ? '<span class="product-badge">Best Seller</span>' : ""}
      ${vialSVG(p)}
    </div>
    <div class="product-body">
      <h3 class="product-name">${p.name}</h3>
      ${p.dose ? `<span class="product-dose">${p.dose}</span>` : ""}
      <div class="product-row">
        <span class="product-price">${money(p.price)}</span>
        <button class="add-btn" data-add="${p.id}">Add to Cart</button>
      </div>
    </div>
  </article>`;
}

function renderCategories() {
  const grid = document.getElementById("category-grid");
  if (!grid) return;
  grid.innerHTML = CATEGORIES.map((c) => {
    const count = PRODUCTS.filter((p) => p.cat === c.id).length;
    return `
    <button class="category-card reveal" data-jump="${c.id}">
      <div class="category-icon" style="color:${c.color}">${c.icon}</div>
      <h3>${c.name}</h3>
      <p>${c.blurb}</p>
      <span class="cat-count">${count} product${count !== 1 ? "s" : ""} →</span>
    </button>`;
  }).join("");
}

function renderFeatured() {
  const grid = document.getElementById("featured-grid");
  if (!grid) return;
  grid.innerHTML = PRODUCTS.filter((p) => p.best).map(productCard).join("");
}

function renderShop() {
  const grid = document.getElementById("shop-grid");
  const filters = document.getElementById("shop-filters");
  if (!grid) return;
  filters.innerHTML =
    `<button class="filter-pill active" data-filter="all">All</button>` +
    CATEGORIES.map((c) => `<button class="filter-pill" data-filter="${c.id}">${c.name}</button>`).join("");
  grid.innerHTML = PRODUCTS.map(productCard).join("");
}

function renderCart() {
  const wrap = document.getElementById("cart-items");
  const checkoutBtn = document.getElementById("checkout-btn");
  if (!wrap) return;
  const ids = Object.keys(cart);
  if (!ids.length) {
    wrap.innerHTML = `<p class="cart-empty">Your cart is empty.<br>Add some peps and more.</p>`;
    document.getElementById("cart-subtotal").textContent = "$0";
    if (checkoutBtn) checkoutBtn.disabled = true;
    return;
  }
  wrap.innerHTML = ids.map((id) => {
    const p = PRODUCTS.find((x) => x.id === id); if (!p) return "";
    const qty = cart[id];
    return `
    <div class="cart-item">
      <div class="cart-item-media">${vialSVG(p, true)}</div>
      <div class="cart-item-info">
        <div class="cart-item-name">${p.name}${p.dose ? " · " + p.dose : ""}</div>
        <div class="cart-item-price">${money(p.price)} each</div>
      </div>
      <div class="qty">
        <button data-dec="${id}" aria-label="Decrease">−</button>
        <span>${qty}</span>
        <button data-inc="${id}" aria-label="Increase">+</button>
      </div>
      <button class="cart-item-remove" data-remove="${id}" aria-label="Remove">✕</button>
    </div>`;
  }).join("");
  document.getElementById("cart-subtotal").textContent = money(cartSubtotal());
  if (checkoutBtn) checkoutBtn.disabled = false;
}

function updateCartCount() {
  const el = document.getElementById("cart-count");
  if (el) el.textContent = cartCount();
}

// ---- Cart drawer ----
function openCart() {
  document.getElementById("cart-drawer").classList.add("open");
  document.getElementById("cart-drawer").setAttribute("aria-hidden", "false");
  document.getElementById("cart-overlay").hidden = false;
}
function closeCart() {
  document.getElementById("cart-drawer").classList.remove("open");
  document.getElementById("cart-drawer").setAttribute("aria-hidden", "true");
  document.getElementById("cart-overlay").hidden = true;
}

// ---- Checkout ----
const CUST_KEY = "vpw_customer";

function openCheckout() {
  const ids = Object.keys(cart); if (!ids.length) return;
  const summary = document.getElementById("checkout-summary");
  summary.innerHTML =
    ids.map((id) => {
      const p = PRODUCTS.find((x) => x.id === id);
      return `<div class="checkout-line"><span>${p.name}${p.dose ? " " + p.dose : ""} × ${cart[id]}</span><span>${money(p.price * cart[id])}</span></div>`;
    }).join("") +
    `<div class="checkout-line total"><span>Subtotal</span><span>${money(cartSubtotal())}</span></div>`;
  // Prefill saved customer details for fast repeat orders
  try {
    const saved = JSON.parse(localStorage.getItem(CUST_KEY)) || {};
    const f = document.getElementById("checkout-form");
    ["name", "contact", "address"].forEach((k) => { if (saved[k]) f[k].value = saved[k]; });
  } catch {}
  // Reset to form view
  document.getElementById("checkout-form").hidden = false;
  document.getElementById("order-channels").hidden = true;
  document.getElementById("checkout-overlay").hidden = false;
}
function closeCheckout() { document.getElementById("checkout-overlay").hidden = true; }

function buildOrderText(f) {
  const lines = Object.keys(cart).map((id) => {
    const p = PRODUCTS.find((x) => x.id === id);
    return `• ${p.name}${p.dose ? " " + p.dose : ""} x${cart[id]} = ${money(p.price * cart[id])}`;
  }).join("\n");
  return (
    `New Order — Vet Pep Wellness\n${lines}\nSubtotal: ${money(cartSubtotal())}\n` +
    `(shipping/total to be confirmed)\n\n` +
    `Name: ${f.name.value}\nContact: ${f.contact.value}\nShip to:\n${f.address.value}\n\n` +
    `Notes: ${f.notes.value || "—"}`
  );
}

function submitOrder(e) {
  e.preventDefault();
  const f = e.target;
  // Save details so repeat orders are one tap
  try {
    localStorage.setItem(CUST_KEY, JSON.stringify({ name: f.name.value, contact: f.contact.value, address: f.address.value }));
  } catch {}

  const text = buildOrderText(f);
  const enc = encodeURIComponent(text);
  const subject = encodeURIComponent(`New Order — ${f.name.value}`);
  const body = encodeURIComponent(text);

  // Wire up the one-tap send channels (customer picks whatever's easiest)
  document.getElementById("ch-sms").href = `sms:${ORDER_PHONE}?&body=${enc}`;
  document.getElementById("ch-wa").href = `https://wa.me/${ORDER_PHONE}?text=${enc}`;
  document.getElementById("ch-email").href = `mailto:${ORDER_EMAIL}?subject=${subject}&body=${body}`;
  document.getElementById("ch-copy").onclick = () => {
    navigator.clipboard?.writeText(text);
    document.getElementById("ch-copy").textContent = "✓ Copied";
  };

  // ── PAYMENT INTEGRATION POINT ───────────────────────────────────────────
  // Orders are sent to you for confirmation (works on free static hosting,
  // no deception, no processor risk). To add legitimate card/crypto checkout
  // later, trigger your processor's hosted checkout here instead.
  document.getElementById("checkout-form").hidden = true;
  document.getElementById("order-channels").hidden = false;
}

// ---- Search & filter ----
function applyFilters() {
  const term = (document.getElementById("search")?.value || "").toLowerCase().trim();
  const active = document.querySelector(".filter-pill.active")?.dataset.filter || "all";
  let shown = 0;
  document.querySelectorAll("#shop-grid .product-card").forEach((card) => {
    const matchCat = active === "all" || card.dataset.cat === active;
    const matchTerm = !term || card.dataset.name.includes(term);
    const show = matchCat && matchTerm;
    card.style.display = show ? "" : "none";
    if (show) shown++;
  });
  const nr = document.getElementById("no-results");
  if (nr) nr.hidden = shown !== 0;
}

// ---- Reveal animation ----
function initReveal() {
  const els = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) { els.forEach((el) => el.classList.add("in")); return; }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
  }, { threshold: 0.1 });
  els.forEach((el) => io.observe(el));
}

// ---- Wiring ----
document.addEventListener("DOMContentLoaded", () => {
  renderCategories();
  renderFeatured();
  renderShop();
  renderCart();
  updateCartCount();
  initReveal();

  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Mobile nav
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".nav");
  toggle?.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });

  // Delegated clicks
  document.addEventListener("click", (e) => {
    const t = e.target.closest("[data-add],[data-jump],[data-inc],[data-dec],[data-remove],[data-filter]");
    if (!t) return;
    if (t.dataset.add) {
      addToCart(t.dataset.add);
      t.textContent = "Added ✓"; t.classList.add("added");
      setTimeout(() => { t.textContent = "Add to Cart"; t.classList.remove("added"); }, 1200);
    } else if (t.dataset.jump) {
      document.querySelector(`.filter-pill[data-filter="${t.dataset.jump}"]`)?.click();
      document.getElementById("shop").scrollIntoView({ behavior: "smooth" });
    } else if (t.dataset.inc) {
      setQty(t.dataset.inc, (cart[t.dataset.inc] || 0) + 1);
    } else if (t.dataset.dec) {
      setQty(t.dataset.dec, (cart[t.dataset.dec] || 0) - 1);
    } else if (t.dataset.remove) {
      setQty(t.dataset.remove, 0);
    } else if (t.dataset.filter) {
      document.querySelectorAll(".filter-pill").forEach((p) => p.classList.remove("active"));
      t.classList.add("active"); applyFilters();
    }
  });

  // Cart open/close
  document.getElementById("cart-btn")?.addEventListener("click", openCart);
  document.getElementById("cart-close")?.addEventListener("click", closeCart);
  document.getElementById("cart-overlay")?.addEventListener("click", closeCart);
  document.getElementById("checkout-btn")?.addEventListener("click", () => { closeCart(); openCheckout(); });
  document.getElementById("checkout-close")?.addEventListener("click", closeCheckout);
  document.getElementById("checkout-overlay")?.addEventListener("click", (e) => { if (e.target.id === "checkout-overlay") closeCheckout(); });
  document.getElementById("checkout-form")?.addEventListener("submit", submitOrder);

  // Search
  document.getElementById("search")?.addEventListener("input", () => {
    applyFilters();
    if (document.getElementById("search").value) document.getElementById("shop").scrollIntoView({ behavior: "smooth" });
  });

  // Newsletter (demo)
  document.getElementById("newsletter-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    document.getElementById("newsletter-hint").textContent = "Thanks! You're on the list. 🎉";
    e.target.reset();
  });
});
