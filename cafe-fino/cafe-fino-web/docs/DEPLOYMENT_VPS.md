# VPS Deployment

Target: VPS with Nginx reverse proxy.

## Build

```bash
npm install
npm run build
```

The production output is in dist.

## Serve with Nginx

- Point Nginx root to the dist directory.
- Ensure a fallback to index.html for SPA routes.
- Enable gzip and cache static assets.

## Environment

- This site is static; no runtime env vars are required yet.
- For API integration, add a VITE_API_BASE in a .env file.
