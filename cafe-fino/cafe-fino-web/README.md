# Cafe Fino Web

Single-page React site for Cafe Fino (Nice + Paris). Built with Vite, Tailwind, GSAP/Framer animations, and local JSON content.

## Quick Start

```bash
npm install
npm run dev
```

## Scripts

- `npm run dev`: local dev server
- `npm run build`: production build
- `npm run preview`: preview production build
- `npm run lint`: ESLint

## Project Structure

- [index.html](index.html): root shell
- [src/main.jsx](src/main.jsx): React mount + i18n init
- [src/App.jsx](src/App.jsx): section composition
- [src/components/layout](src/components/layout): intro, navbar, footer
- [src/components/sections](src/components/sections): page sections
- [src/data/config.json](src/data/config.json): locations + brand + socials
- [src/data/menu.json](src/data/menu.json): menu categories/items/specials
- [src/locales](src/locales): i18n translations
- [src/store/useCartStore.js](src/store/useCartStore.js): cart state
- [src/index.css](src/index.css): global styles + Tailwind utilities

## Core Stack

- React 19 + Vite 7
- TailwindCSS + PostCSS
- GSAP + Framer Motion
- i18next + react-i18next
- Zustand (cart)

## Docs

- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)
- [docs/DATA_MODEL.md](docs/DATA_MODEL.md)
- [docs/I18N.md](docs/I18N.md)
- [docs/AI_PLAYBOOK.md](docs/AI_PLAYBOOK.md)
- [docs/QUALITY_CHECKS.md](docs/QUALITY_CHECKS.md)
- [docs/DEPLOYMENT_VPS.md](docs/DEPLOYMENT_VPS.md)
- [docs/ROADMAP_ORDERING.md](docs/ROADMAP_ORDERING.md)

## Notes

- This is a single-page site (no router).
- Menu and location content is file-based for now.
- Click & Collect is UI-only; it is ready for API integration.
