# Architecture

## Current architecture
Static frontend only.

- `index.html`: app shell
- `styles.css`: responsive dashboard styles
- `data.js`: local seed data
- `app.js`: rendering, filters, navigation, modals
- `manifest.json`: PWA metadata
- `sw.js`: simple offline cache fallback

## Why static first
- No backend to fail.
- No package install needed.
- No API rate limit.
- No Replit credit required.
- Easy GitHub Pages deployment.

## Future architecture
Phase 2 can introduce:
- `/data/model_registry.json`
- `/data/watchlist.json`
- GitHub Actions to update static JSON
- Price API adapter with caching
- Earnings calendar adapter
- Optional backend only when necessary
