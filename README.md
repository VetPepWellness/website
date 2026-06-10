# Vet Pep Wellness — Website

A fast, professional, fully **static** storefront for **Vet Pep Wellness ("Peps and More")** —
veteran founded & operated. No build step, no server, no monthly cost. It can be hosted
**free** on GitHub Pages, Netlify, Vercel, or Cloudflare Pages.

Theme: deep emerald + metallic gold, elegant serif headings, custom gold "V" logo.

## What's included
| File | What it is |
|------|-----------|
| `index.html` | Home: hero, Who We Are, categories, best sellers, full shop, disclaimer, why-us, newsletter, footer |
| `coa.html` | COA / Testing Reports page |
| `terms.html` | Terms & Conditions (template — review with counsel) |
| `contact.html` | Contact page with message form |
| `404.html` | Custom not-found page |
| `styles.css` | The full theme |
| `script.js` | Products, categories, cart + checkout, search/filter, animations |
| `assets/logo.svg` | Gold "V" logo |
| `assets/og-image.png` | 1200×630 social-share image |
| `robots.txt`, `sitemap.xml` | SEO basics |

## Cart & checkout
The site has a complete shopping cart (add/remove/quantity, persists between visits) and a
checkout review. **Currently, placing an order emails the full order to you for manual
confirmation** — this works on free static hosting with no backend.

### Taking card payments later — important
Before wiring a live card processor, know that **mainstream processors
(Stripe, PayPal, Square, Shopify Payments) prohibit research peptides and especially
testosterone / anabolic compounds** in their acceptable-use policies; accounts selling them
are commonly frozen with funds held. Realistic options:
- **Manual invoicing** (current flow) — order request → you confirm payment method.
- **Crypto payment** processors.
- **High-risk / specialized merchant accounts** that allow these categories.

The code has a clearly marked **"PAYMENT INTEGRATION POINT"** in `script.js` where a
processor redirect drops in once you've chosen one.

> **Legal note (not legal advice):** several listed items are prescription drugs or
> controlled substances in many jurisdictions. The site ships with a "research use only"
> disclaimer and a Terms template as the standard protective framing used by similar
> vendors, but you should have a qualified attorney review your model before selling.

## Edit common things
- **Products / prices / dosages:** the `PRODUCTS` list near the top of `script.js`.
- **Categories:** the `CATEGORIES` list in `script.js`.
- **Contact email/phone:** search for `hello@vetpepwellness.com` and `(000) 000-0000`
  across the `.html` files and `script.js`.
- **Your domain:** replace `vetpepwellness.com` in the meta tags (`index.html`),
  `robots.txt`, and `sitemap.xml`.
- **Wording, About story, disclaimer, Terms:** edit directly in the `.html` files.

## Preview locally
```bash
python3 -m http.server 8000
# visit http://localhost:8000
```

## Deploy free — GitHub Pages
1. Repo **Settings → Pages → Source: Deploy from a branch**.
2. Pick the branch + `/ (root)` folder → **Save**.
3. Live at `https://<user>.github.io/website/` in ~1 minute.

For a custom domain (e.g. `vetpepwellness.com`), Netlify / Vercel / Cloudflare Pages
all offer free hosting with easy custom-domain + HTTPS setup.

## Placeholders to replace (marked in the UI with *(placeholder)*)
- [ ] Real contact email + phone
- [ ] Social media links (tell me which platforms)
- [ ] Your domain in meta/SEO files
- [ ] Confirm product list / dosages / prices
- [ ] Review disclaimer + Terms for your jurisdiction
- [ ] Upload real COA files to the COA page
