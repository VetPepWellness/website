// ===== Vet Pep Wellness — storefront =====
// NOTE: Catalogue transcribed from the product sheets. Prices marked with a
// trailing "// verify" in the data were read from a dense, low-res photo —
// confirm those figures. Edit anything here freely; the site auto-updates.

// ---- Categories ----
const CATEGORIES = [
  { id: "glp1",     name: "GLP-1 & Weight Loss",     icon: "⚖", blurb: "Appetite, glucose & metabolic fat loss", color: "#e3c478" },
  { id: "gh",       name: "Growth Hormone & Body",   icon: "❖", blurb: "GH / IGF-1 & body composition",          color: "#cbb06a" },
  { id: "repair",   name: "Tissue Repair & Recovery",icon: "✦", blurb: "Injury recovery, skin & wound healing",   color: "#d9a679" },
  { id: "longevity",name: "Energy & Longevity",      icon: "⏳", blurb: "Mitochondria, antioxidants & anti-aging", color: "#9fc3a8" },
  { id: "immune",   name: "Immune & Inflammation",   icon: "✚", blurb: "Immune support & inflammation",           color: "#a7c4b5" },
  { id: "brain",    name: "Brain, Mood & Sleep",     icon: "☾", blurb: "Focus, mood, sleep & nerve support",      color: "#c2b2d8" },
  { id: "sexual",   name: "Sexual & Hormonal",       icon: "♡", blurb: "Libido & hormonal signaling",             color: "#dba6a6" },
  { id: "supply",   name: "Supplies",                icon: "⚗", blurb: "Reconstitution & extras",                 color: "#bcae8a" },
];

// ---- Products. Each has one or more dosage variants {dose, price}. ----
const PRODUCTS = [
  // ===== GLP-1 & Weight Loss =====
  { id: "tirzepatide", cat: "glp1", name: "Tirzepatide", best: true,
    info: "Dual GLP-1/GIP — very strong appetite control, weight loss and glucose support.",
    variants: [{dose:"5 mg",price:50},{dose:"10 mg",price:70},{dose:"15 mg",price:80},{dose:"20 mg",price:90},{dose:"30 mg",price:105},{dose:"40 mg",price:120},{dose:"50 mg",price:140},{dose:"60 mg",price:165}] },
  { id: "semaglutide", cat: "glp1", name: "Semaglutide", best: true,
    info: "GLP-1 — appetite control, fullness and glucose control.",
    variants: [{dose:"5 mg",price:45},{dose:"10 mg",price:60},{dose:"15 mg",price:70},{dose:"20 mg",price:80},{dose:"30 mg",price:95}] },
  { id: "retatrutide", cat: "glp1", name: "Retatrutide", best: true,
    info: "Triple GLP-1/GIP/glucagon — the strongest fat-loss peptide in the lineup.",
    variants: [{dose:"5 mg",price:55},{dose:"10 mg",price:85},{dose:"15 mg",price:100},{dose:"20 mg",price:135},{dose:"30 mg",price:175},{dose:"50 mg",price:225},{dose:"60 mg",price:265}] },
  { id: "cagrilintide", cat: "glp1", name: "Cagrilintide",
    info: "Amylin analog — increases fullness and reduces appetite.",
    variants: [{dose:"5 mg",price:110},{dose:"10 mg",price:165}] },
  { id: "cagri-sema", cat: "glp1", name: "Cagrilintide + Semaglutide",
    info: "Combo for stronger hunger control than semaglutide alone.",
    variants: [{dose:"5 mg + 5 mg",price:185}] },
  { id: "aod9604", cat: "glp1", name: "AOD-9604",
    info: "HGH fragment aimed at fat metabolism; gentler than the GLP-1 class.",
    variants: [{dose:"5 mg",price:95},{dose:"10 mg",price:185}] }, // verify
  { id: "amino1mq", cat: "glp1", name: "5-Amino-1MQ",
    info: "Research compound targeting the NNMT/NAD fat-metabolism pathway.",
    variants: [{dose:"10 mg",price:50},{dose:"60 mg",price:95}] }, // verify
  { id: "lipoc-b12", cat: "glp1", name: "Lipo-C with B12",
    info: "Lipotropic support plus B12 to help energy and fat metabolism.",
    variants: [{dose:"10 mL",price:60}] },
  { id: "lipoc", cat: "glp1", name: "Lipo-C (no B12)",
    info: "Lipotropic support without B12.",
    variants: [{dose:"10 mL",price:60}] },
  { id: "lemonbottle", cat: "glp1", name: "Lemon Bottle",
    info: "Local cosmetic fat-dissolving product (not whole-body fat loss).",
    variants: [{dose:"10 mL",price:60}] }, // verify
  { id: "b12", cat: "glp1", name: "Vitamin B12",
    info: "B12 for general energy support.",
    variants: [{dose:"10 mL",price:45}] }, // verify

  // ===== Growth Hormone & Body Composition =====
  { id: "tesamorelin", cat: "gh", name: "Tesamorelin",
    info: "Raises growth hormone to help reduce visceral belly fat.",
    variants: [{dose:"5 mg",price:95},{dose:"10 mg",price:160},{dose:"15 mg",price:195}] },
  { id: "cjc-ipa", cat: "gh", name: "CJC-1295 (no DAC) + Ipamorelin", best: true,
    info: "Popular GH-pulse stack — supports sleep, recovery and body composition.",
    variants: [{dose:"5 mg + 5 mg",price:115}] },
  { id: "cjc-dac", cat: "gh", name: "CJC-1295 with DAC",
    info: "Longer-acting GH/IGF-1 signal.",
    variants: [{dose:"5 mg",price:90}] },
  { id: "cjc-nodac", cat: "gh", name: "CJC-1295 without DAC",
    info: "Shorter GH pulse; usually stacked with ipamorelin.",
    variants: [{dose:"10 mg",price:135}] },
  { id: "ipamorelin", cat: "gh", name: "Ipamorelin",
    info: "Gentle GH secretagogue — clean, but weaker on its own.",
    variants: [{dose:"5 mg",price:50},{dose:"10 mg",price:70}] },
  { id: "sermorelin", cat: "gh", name: "Sermorelin Acetate",
    info: "Tells the pituitary to release growth hormone naturally.",
    variants: [{dose:"5 mg",price:80},{dose:"10 mg",price:145}] }, // verify

  // ===== Tissue Repair & Recovery =====
  { id: "bpc157", cat: "repair", name: "BPC-157",
    info: "Injury-repair peptide — supports tendon, gut and general healing.",
    variants: [{dose:"5 mg",price:45},{dose:"10 mg",price:60}] },
  { id: "tb500", cat: "repair", name: "TB-500 (Thymosin Beta-4)",
    info: "Recovery and repair — supports flexibility and healing.",
    variants: [{dose:"5 mg",price:60},{dose:"10 mg",price:120}] },
  { id: "bpc-tb-5", cat: "repair", name: "BPC-157 + TB-500 (5 mg + 5 mg)",
    info: "Repair combo for faster recovery, smaller vial.",
    variants: [{dose:"10 mg",price:105}] },
  { id: "bpc-tb-10", cat: "repair", name: "BPC-157 + TB-500 (10 mg + 10 mg)",
    info: "Same repair combo, higher total supply.",
    variants: [{dose:"20 mg",price:180}] },
  { id: "glow", cat: "repair", name: "Glow (BPC-157 + GHK-Cu + TB-500)", best: true,
    info: "Skin + tissue-repair blend for recovery and glow.",
    variants: [{dose:"70 mg",price:195}] },
  { id: "klow", cat: "repair", name: "KLOW (GHK-Cu + TB-500 + BPC-157 + KPV)", best: true,
    info: "Broadest repair blend — skin, tissue, tendon and inflammation.",
    variants: [{dose:"60 mg",price:195}] }, // verify total mg
  { id: "ghkcu", cat: "repair", name: "GHK-Cu",
    info: "Copper peptide — skin repair, collagen and anti-aging.",
    variants: [{dose:"50 mg",price:50},{dose:"100 mg",price:75}] },
  { id: "kpv", cat: "repair", name: "KPV",
    info: "Calms inflammation — gut and broad support.",
    variants: [{dose:"5 mg",price:55},{dose:"10 mg",price:70}] },
  { id: "ll37", cat: "repair", name: "LL-37",
    info: "Antimicrobial immune-defense and repair peptide.",
    variants: [{dose:"5 mg",price:75}] }, // verify

  // ===== Energy & Longevity =====
  { id: "nad", cat: "longevity", name: "NAD+",
    info: "Cellular energy and longevity support.",
    variants: [{dose:"100 mg",price:55},{dose:"500 mg",price:80},{dose:"1000 mg",price:125}] },
  { id: "glutathione", cat: "longevity", name: "Glutathione",
    info: "Master antioxidant — detox and redox balance.",
    variants: [{dose:"600 mg",price:55}] },
  { id: "ss31", cat: "longevity", name: "SS-31 (Elamipretide)",
    info: "Targets mitochondria for cellular energy support.",
    variants: [{dose:"10 mg",price:85}] }, // verify
  { id: "motsc", cat: "longevity", name: "MOTS-C",
    info: "Mitochondrial/metabolic peptide — energy and endurance.",
    variants: [{dose:"5 mg",price:100},{dose:"10 mg",price:165}] }, // verify
  { id: "epithalon", cat: "longevity", name: "Epithalon",
    info: "Longevity, sleep and circadian telomere-research peptide.",
    variants: [{dose:"5 mg",price:55},{dose:"10 mg",price:115}] }, // verify

  // ===== Immune & Inflammation =====
  { id: "thymosin-a1", cat: "immune", name: "Thymosin Alpha-1",
    info: "Strong immune-support peptide — T-cell immune signaling.",
    variants: [{dose:"5 mg",price:95},{dose:"10 mg",price:185}] }, // verify
  { id: "thymalin", cat: "immune", name: "Thymalin",
    info: "Immune-aging and restorative thymus peptide.",
    variants: [{dose:"10 mg",price:95}] }, // verify
  { id: "vip", cat: "immune", name: "VIP",
    info: "Calms inflammation; affects blood flow and neuroimmune signaling.",
    variants: [{dose:"5 mg",price:115}] }, // verify
  { id: "ara290", cat: "immune", name: "Ara-290",
    info: "Nerve/tissue-protective; anti-inflammatory repair peptide.",
    variants: [{dose:"10 mg",price:115}] }, // verify

  // ===== Brain, Mood & Sleep =====
  { id: "cerebrolysin", cat: "brain", name: "Cerebrolysin",
    info: "Neuro-recovery, cognition and brain support.",
    variants: [{dose:"10 mL",price:65}] }, // verify
  { id: "semax", cat: "brain", name: "Semax",
    info: "Focus, learning, mental energy and neuroprotection.",
    variants: [{dose:"30 mg",price:95}] }, // verify
  { id: "selank", cat: "brain", name: "Selank",
    info: "Calm focus, stress control and anxiety support.",
    variants: [{dose:"30 mg",price:95}] }, // verify
  { id: "dsip", cat: "brain", name: "DSIP",
    info: "Deep-sleep and sleep-quality support.",
    variants: [{dose:"5 mg",price:60}] }, // verify

  // ===== Sexual & Hormonal =====
  { id: "pt141", cat: "sexual", name: "PT-141 (Bremelanotide)",
    info: "Direct libido and arousal peptide.",
    variants: [{dose:"10 mg",price:65}] },
  { id: "hcg", cat: "sexual", name: "HCG",
    info: "LH-like signal — supports testosterone and fertility.",
    variants: [{dose:"5000 iu",price:85}] }, // verify
  { id: "kisspeptin", cat: "sexual", name: "Kisspeptin-10",
    info: "Stimulates the GnRH → LH/FSH hormone chain.",
    variants: [{dose:"5 mg",price:65},{dose:"10 mg",price:95}] }, // verify
  { id: "mt2", cat: "sexual", name: "Melanotan II (MT-2)",
    info: "Tanning plus libido effect.",
    variants: [{dose:"10 mg",price:55}] }, // verify
  { id: "oxytocin", cat: "sexual", name: "Oxytocin Acetate",
    info: "Bonding, social and neuroendocrine peptide.",
    variants: [{dose:"10 mg",price:55}] }, // verify
  { id: "mt1", cat: "sexual", name: "Melanotan I / Afamelanotide",
    info: "Pigmentation and photoprotection tanning peptide.",
    variants: [{dose:"10 mg",price:65}] }, // verify

  // ===== Supplies =====
  { id: "bacwater", cat: "supply", name: "BAC Water (Bacteriostatic)",
    info: "For reconstituting peptides.",
    variants: [{dose:"3 mL",price:10},{dose:"10 mL",price:15}] }, // verify
  { id: "aceticwater", cat: "supply", name: "Acetic Acid Water",
    info: "Dilute acetic acid for reconstitution.",
    variants: [{dose:"3 mL",price:11},{dose:"10 mL",price:15}] }, // verify
];

// ---- Your contact details (used for one-tap order sending) ----
// TODO: replace with your real number (digits only, incl. country code) and email.
const ORDER_PHONE = "10000000000";          // e.g. "18065551234"
const ORDER_EMAIL = "hello@vetpepwellness.com";

const catById = (id) => CATEGORIES.find((c) => c.id === id) || {};
const money = (n) => "$" + n.toLocaleString();
const findProduct = (id) => PRODUCTS.find((p) => p.id === id);
function variantPrice(id, dose) {
  const p = findProduct(id); if (!p) return 0;
  const v = p.variants.find((v) => v.dose === dose) || p.variants[0];
  return v ? v.price : 0;
}
const fromPrice = (p) => Math.min(...p.variants.map((v) => v.price));

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
    ${small ? "" : `<text x="30" y="62" text-anchor="middle" font-family="Jost,sans-serif" font-size="6.2" font-weight="600" fill="#20180a">${label}</text>`}
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

// ---- Cart state (persisted). Keyed by "id|dose". ----
const CART_KEY = "vpw_cart";
let cart = loadCart();
function loadCart() { try { return JSON.parse(localStorage.getItem(CART_KEY)) || {}; } catch { return {}; } }
function saveCart() { localStorage.setItem(CART_KEY, JSON.stringify(cart)); }
function cartCount() { return Object.values(cart).reduce((a, b) => a + b, 0); }
function parseKey(key) { const i = key.lastIndexOf("|"); return { id: key.slice(0, i), dose: key.slice(i + 1) }; }
function cartSubtotal() {
  return Object.entries(cart).reduce((sum, [key, qty]) => {
    const { id, dose } = parseKey(key);
    return sum + variantPrice(id, dose) * qty;
  }, 0);
}

function addToCart(id, dose) {
  const key = `${id}|${dose}`;
  cart[key] = (cart[key] || 0) + 1;
  saveCart(); renderCart(); updateCartCount();
  openCart();
}
function setQty(key, qty) {
  if (qty <= 0) delete cart[key]; else cart[key] = qty;
  saveCart(); renderCart(); updateCartCount();
}

// ---- Renderers ----
function productCard(p) {
  const cat = catById(p.cat);
  const multi = p.variants.length > 1;
  const first = p.variants[0];
  const doseStr = p.variants.map((v) => v.dose).join(" ").toLowerCase();
  const select = multi
    ? `<select class="dose-select" data-pid="${p.id}" aria-label="Select dosage">
         ${p.variants.map((v) => `<option value="${v.dose}" data-price="${v.price}">${v.dose} — ${money(v.price)}</option>`).join("")}
       </select>`
    : `<span class="product-dose">${first.dose || "each"}</span>`;
  return `
  <article class="product-card reveal" data-cat="${p.cat}" data-name="${(p.name + " " + doseStr).toLowerCase()}">
    <div class="product-media">
      <span class="product-tag" style="background:${cat.color}">${cat.name}</span>
      ${p.best ? '<span class="product-badge">Best Seller</span>' : ""}
      ${vialSVG(p)}
    </div>
    <div class="product-body">
      <h3 class="product-name">${p.name}</h3>
      ${p.info ? `<p class="product-info-text">${p.info}</p>` : ""}
      ${select}
      <div class="product-row">
        <span class="product-price" id="price-${p.id}">${money(first.price)}</span>
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
  const keys = Object.keys(cart);
  if (!keys.length) {
    wrap.innerHTML = `<p class="cart-empty">Your cart is empty.<br>Add some peps and more.</p>`;
    document.getElementById("cart-subtotal").textContent = "$0";
    if (checkoutBtn) checkoutBtn.disabled = true;
    return;
  }
  wrap.innerHTML = keys.map((key) => {
    const { id, dose } = parseKey(key);
    const p = findProduct(id); if (!p) return "";
    const qty = cart[key];
    return `
    <div class="cart-item">
      <div class="cart-item-media">${vialSVG(p, true)}</div>
      <div class="cart-item-info">
        <div class="cart-item-name">${p.name}${dose ? " · " + dose : ""}</div>
        <div class="cart-item-price">${money(variantPrice(id, dose))} each</div>
      </div>
      <div class="qty">
        <button data-dec="${key}" aria-label="Decrease">−</button>
        <span>${qty}</span>
        <button data-inc="${key}" aria-label="Increase">+</button>
      </div>
      <button class="cart-item-remove" data-remove="${key}" aria-label="Remove">✕</button>
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
  const keys = Object.keys(cart); if (!keys.length) return;
  const summary = document.getElementById("checkout-summary");
  summary.innerHTML =
    keys.map((key) => {
      const { id, dose } = parseKey(key);
      const p = findProduct(id);
      return `<div class="checkout-line"><span>${p.name}${dose ? " " + dose : ""} × ${cart[key]}</span><span>${money(variantPrice(id, dose) * cart[key])}</span></div>`;
    }).join("") +
    `<div class="checkout-line total"><span>Subtotal</span><span>${money(cartSubtotal())}</span></div>`;
  try {
    const saved = JSON.parse(localStorage.getItem(CUST_KEY)) || {};
    const f = document.getElementById("checkout-form");
    ["name", "contact", "address"].forEach((k) => { if (saved[k]) f[k].value = saved[k]; });
  } catch {}
  document.getElementById("checkout-form").hidden = false;
  document.getElementById("order-channels").hidden = true;
  document.getElementById("checkout-overlay").hidden = false;
}
function closeCheckout() { document.getElementById("checkout-overlay").hidden = true; }

function buildOrderText(f) {
  const lines = Object.keys(cart).map((key) => {
    const { id, dose } = parseKey(key);
    const p = findProduct(id);
    return `• ${p.name}${dose ? " " + dose : ""} x${cart[key]} = ${money(variantPrice(id, dose) * cart[key])}`;
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
  try {
    localStorage.setItem(CUST_KEY, JSON.stringify({ name: f.name.value, contact: f.contact.value, address: f.address.value }));
  } catch {}
  const text = buildOrderText(f);
  const enc = encodeURIComponent(text);
  const subject = encodeURIComponent(`New Order — ${f.name.value}`);
  document.getElementById("ch-sms").href = `sms:${ORDER_PHONE}?&body=${enc}`;
  document.getElementById("ch-wa").href = `https://wa.me/${ORDER_PHONE}?text=${enc}`;
  document.getElementById("ch-email").href = `mailto:${ORDER_EMAIL}?subject=${subject}&body=${enc}`;
  document.getElementById("ch-copy").onclick = () => {
    navigator.clipboard?.writeText(text);
    document.getElementById("ch-copy").textContent = "✓ Copied";
  };
  // ── PAYMENT INTEGRATION POINT ──────────────────────────────────────────
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

  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".nav");
  toggle?.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });

  // Dosage selector updates the displayed price
  document.addEventListener("change", (e) => {
    const sel = e.target.closest(".dose-select");
    if (!sel) return;
    const opt = sel.options[sel.selectedIndex];
    const priceEl = document.getElementById(`price-${sel.dataset.pid}`);
    if (priceEl) priceEl.textContent = money(Number(opt.dataset.price));
  });

  // Delegated clicks
  document.addEventListener("click", (e) => {
    const t = e.target.closest("[data-add],[data-jump],[data-inc],[data-dec],[data-remove],[data-filter]");
    if (!t) return;
    if (t.dataset.add) {
      const card = t.closest(".product-card");
      const sel = card?.querySelector(".dose-select");
      const p = findProduct(t.dataset.add);
      const dose = sel ? sel.value : (p ? p.variants[0].dose : "");
      addToCart(t.dataset.add, dose);
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

  document.getElementById("cart-btn")?.addEventListener("click", openCart);
  document.getElementById("cart-close")?.addEventListener("click", closeCart);
  document.getElementById("cart-overlay")?.addEventListener("click", closeCart);
  document.getElementById("checkout-btn")?.addEventListener("click", () => { closeCart(); openCheckout(); });
  document.getElementById("checkout-close")?.addEventListener("click", closeCheckout);
  document.getElementById("checkout-overlay")?.addEventListener("click", (e) => { if (e.target.id === "checkout-overlay") closeCheckout(); });
  document.getElementById("checkout-form")?.addEventListener("submit", submitOrder);

  document.getElementById("search")?.addEventListener("input", () => {
    applyFilters();
    if (document.getElementById("search").value) document.getElementById("shop").scrollIntoView({ behavior: "smooth" });
  });

  document.getElementById("newsletter-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    document.getElementById("newsletter-hint").textContent = "Thanks! You're on the list. 🎉";
    e.target.reset();
  });
});
