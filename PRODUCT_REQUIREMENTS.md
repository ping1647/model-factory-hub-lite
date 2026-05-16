# Product Requirements: Model Factory Hub Lite

## Goal
Build a personal Investing Model Factory dashboard that lets the user quickly see model health, watchlist status, buy zone signals, batch history, agent workflow, and QA readiness.

## Primary success criteria
- Opens quickly.
- Does not crash when data is missing.
- All navigation works.
- Search/filter works with seed data.
- Detail modals open and close cleanly.
- Works on iPad/iPhone/desktop.
- No live API dependency in MVP.

## MVP modules
1. Home Dashboard
2. Model Registry
3. Stock Watchlist
4. Buy Zone Monitor
5. Batch Log
6. Agent Workflow Board
7. Requirements & Test Cases
8. Settings/Data Source

## Non-goals for MVP
- Real-time stock prices
- Login/authentication
- Database/backend
- Broker integration
- Background PM auto-run
- Trading execution

## Guardrails
All buy zones in MVP are placeholders or memory-derived seed notes. The app must clearly warn that live price validation is required before investment action.
