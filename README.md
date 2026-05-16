# Model Factory Hub Lite

Personal Investing Model Factory dashboard MVP.

## Why this version exists
This is a deliberately simple, static, dependency-free web/PWA MVP. It avoids backend complexity, live market APIs, authentication, and background polling so the app opens quickly and does not crash when an external service is unavailable.

## What it includes
- Dashboard overview
- Model Registry M1-M16
- Stock Watchlist seed data
- Buy Zone Monitor
- Batch Log
- Agent Workflow Board
- Requirements & PQA Test Cases
- Settings/Data Source guardrails
- Responsive UI for iPad/iPhone/desktop
- Local mock data mode

## How to open locally
Open `index.html` in a browser.

For best PWA/service-worker behavior, serve the folder with any static server later. The app itself has no build step and no dependencies.

## Current data mode
Local mock data only. Do not treat prices or buy zones as live investment advice. Future versions can connect to GitHub JSON, price APIs, earnings calendars, and model batch logs.

## Next development path
1. Upload this folder to GitHub.
2. Enable GitHub Pages for the repository.
3. Ask Codex to review and improve issue by issue.
4. Add real data sources only after the UI and schema are stable.
