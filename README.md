# Sanitaire 2000 — Website

A static website for Sanitaire 2000 (tiles, ceramics and bathroom fittings). It uses plain HTML, CSS and JS, with no build step.

## Run locally
Open `index.html` in a browser, or run:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Structure
- `index.html`: page content (hero slider, collections, inspirations, projects, company, showrooms, contact, footer)
- `css/style.css`: styles (colors and fonts are set at the top in `:root`)
- `js/main.js`: slider, mobile menu, search, collection filters, carousel, scroll animations
- `images/`: put your own photos here

## Adding your own photos
The images are CSS texture placeholders for now (`.tile--marble`, `.tile--wood`, and so on).
To use real photos, put them in `images/` and override the class, for example:

```css
.tile--marble { background: url('../images/marble.jpg') center / cover; }
```

For the hero slider, edit `--img-hero-1`, `--img-hero-2` and `--img-hero-3` in `:root`:

```css
--img-hero-1: url('../images/hero-1.jpg');
```

## To complete
- Showroom addresses and phone numbers (the "Points de vente" section)
- Social media links in the footer
- Connect the contact and newsletter forms to a backend or email service (for example Formspree or Netlify Forms)
