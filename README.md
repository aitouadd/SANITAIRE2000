# Sanitaire 2000 — Website

A static website for Sanitaire 2000 (tiles, ceramics and bathroom fittings). It uses plain HTML, CSS and JS, with no build step.

## Run locally
Open `index.html` in a browser, or run:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Structure
- `index.html`: page content (menu, hero video, full-screen slider, effects/collections cards, inspiration gallery, catalogue cards, footer)
- `css/style.css`: styles (colors and fonts are set at the top in `:root`)
- `js/main.js`: drop-down menu, video and slider controls, tabs, inspiration gallery, scroll animations
- `images/`: put your own photos here

## Adding your own photos
The images are CSS texture placeholders for now (`.tile--marble`, `.tile--wood`, and so on).
To use real photos, put them in `images/` and override the class, for example:

```css
.tile--marble { background: url('../images/marble.jpg') center / cover; }
```

Hero video: put a muted MP4 at `images/hero.mp4`.

Logo: in `index.html`, replace the `<span class="logo-text">` in the header and footer with `<img src="images/logo.svg" alt="Sanitaire 2000">`.

## To complete
- Address and phone number in the footer
- Social media links in the footer
- Connect the newsletter form to a backend or email service (for example Formspree or Netlify Forms)

## Preview
Screenshots are in `preview/` (desktop and phone).
