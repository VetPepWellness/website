# Vet Pep Wellness — Website

A fast, fully static website for **Vet Pep Wellness ("Peps and More")**.
No build step, no server, no monthly cost — just HTML, CSS, and a little JavaScript.
It can be hosted **free** on GitHub Pages, Netlify, Vercel, or Cloudflare Pages.

## Files
| File | What it is |
|------|-----------|
| `index.html` | All page content and sections |
| `styles.css` | The dark-emerald + gold theme |
| `script.js` | Product list, mobile menu, order form, animations |
| `assets/logo.svg` | The gold "V" logo |

## Preview it locally
Just open `index.html` in a browser, or run a tiny local server:
```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## How to edit common things
- **Products & prices:** edit the `PRODUCTS` list at the top of `script.js`.
- **Contact email/phone:** search for `hello@vetpepwellness.com` and `(000) 000-0000`
  in `index.html` and `script.js` and replace with your real details.
- **Wording:** edit text directly in `index.html` (About, Why Us, FAQ, disclaimer).

## Deploy free (recommended: GitHub Pages)
1. Push this repo to GitHub (already done).
2. Repo **Settings → Pages → Build and deployment → Source: Deploy from a branch**.
3. Pick the branch and `/ (root)` folder, then **Save**.
4. Your site goes live at `https://<user>.github.io/website/` in ~1 minute.

Prefer a custom domain (e.g. `vetpepwellness.com`)? Netlify, Vercel, and
Cloudflare Pages all offer free hosting + easy custom-domain setup.

## To-do / placeholders to replace
- [ ] Real contact email and phone number
- [ ] Social media links (not added yet — tell me which)
- [ ] Review the footer disclaimer for your jurisdiction
- [ ] Confirm product list, dosages, and prices
