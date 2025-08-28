# Nishit Popat — Portfolio

A modern, mobile-friendly, animated portfolio powered by Tailwind (CDN) and GSAP. No build tools required.

## Structure

- `index.html` — single-page portfolio
- `script.js` — interactions and animations (GSAP + ScrollTrigger)
- `assets/profile.svg` — placeholder avatar (replace with your photo)

## Customize

1. Replace avatar: put your image at `assets/profile.jpg` or update the `<img>` in `index.html`.
2. Update copy: edit hero, About, Skills, Experience, Projects, Education to match new details.
3. Links: set email, LinkedIn, and phone in `index.html`.
4. SEO: update `<title>`, meta description, Open Graph tags, and JSON-LD in the head.

## Animations

GSAP + ScrollTrigger animate hero content and section cards on scroll. Adjust selectors in `script.js`:

```js
gsap.from('.reveal', {/* ... */})
```

## Dark Mode

Stored in `localStorage` key `theme`. Toggle via the header button. System preference respected on first load.

## Deployment

- GitHub Pages: push to `main`, enable Pages → deploy `/(root)`.
- Netlify/Vercel: import repo, framework = "Other"/Static.
- NGINX/S3: upload files as-is.

## Performance tips

- Replace SVG avatar with optimized JPG/PNG and add `width`/`height`.
- Use real OG image (1200x630) for better link previews.
- Keep Tailwind CDN for simplicity; switch to a build if you need purging/custom plugins.

## License

MIT


