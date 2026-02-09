# Cafe Fino Web Architecture

## Overview

- Single-page React app built with Vite.
- Section-based layout in [src/App.jsx](../src/App.jsx) with layout components in [src/components/layout](../src/components/layout) and content sections in [src/components/sections](../src/components/sections).
- Content is file-based JSON and localized via i18next.
- Click and Collect is UI-only and ready for API integration.

## Entry Flow

- [index.html](../index.html) mounts a single root element.
- [src/main.jsx](../src/main.jsx) initializes i18n and renders the React tree.
- [src/App.jsx](../src/App.jsx) composes sections and registers GSAP scroll reveals.

## Component Layers

- Layout: global frame elements (Intro, Navbar, Footer).
- Sections: Hero, FoodSlider, About, Menu, ClickCollect, Locations, InstagramFeed.
- State: [src/store/useCartStore.js](../src/store/useCartStore.js) stores cart items and totals.

## Data Flow

- Static content in [src/data/config.json](../src/data/config.json) and [src/data/menu.json](../src/data/menu.json).
- Components read JSON directly; translations add i18n overrides.
- Menu items can render multiple images or a single image; fallback placeholder used if missing.

## Styling

- Tailwind tokens and custom animations in [tailwind.config.js](../tailwind.config.js).
- Global styles and shared utility classes in [src/index.css](../src/index.css).
- Custom utility classes are defined under @layer components.

## Animations

- GSAP used for section reveal and hero parallax.
- Framer Motion used for staggered and hover-based interactions.

## i18n

- Initialized in [src/i18n.js](../src/i18n.js).
- Default language is French with English fallback.
- Language is persisted in localStorage under cafe-fino-lang.

## Assets

- Images are referenced as public paths under /images.
- Keep file names stable to avoid broken links.

## Known Gaps

- No API integration yet for orders.
- No router, so all content is on a single page.
- App.css is unused; keep or remove intentionally.
