# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
yarn install        # install dependencies
yarn dev            # start dev server with live reload (reads .env for links)
yarn build          # production build → public/build/
yarn test           # run jest tests
yarn test --testPathPattern=get-links  # run a single test file
```

## Architecture

**envlinks** is a static single-page app (Svelte + Rollup) that renders a filterable link dashboard. All link data is baked into the bundle at build time — there is no runtime API.

### Build-time data pipeline

The key architectural decision: environment variables are processed *during the Rollup build*, not at runtime. `rollup.config.js` calls `getLinks(process.env)` and injects the result as `process.env.LINKS` (a JSON-serialized array) and `process.env.TITLE` into the bundle via `@rollup/plugin-replace`. The Svelte app reads `process.env.LINKS` directly as a JS value.

This means:
- `src/get-links.js` runs in Node (Rollup context), not in the browser.
- Changing links requires a rebuild. In Docker, the entrypoint runs `npm run build` on startup so the container's environment variables are baked in fresh each time.
- Dev mode uses `env-cmd` to load `.env` before starting Rollup's watch mode.

### Source files

- `src/get-links.js` — parses `LINK_*` env vars into `{ name, url, icon, index }` objects, sorted by index. Supports three variable formats (see README).
- `src/filter-links.js` — filters links by space-separated search terms against link names (case-insensitive, all terms must match).
- `src/App.svelte` — root component; owns search state, keyboard handling (type to search, Enter to navigate, Tab to focus links, Escape to clear).
- `src/Search.svelte`, `src/Links.svelte`, `src/Link.svelte`, `src/Layout.svelte` — presentational components.

### Icons

Icons use [Material Design Icons](https://pictogrammers.com/library/mdi/) loaded from a CDN in `App.svelte`. Icon names in env vars map directly to MDI icon slugs (e.g. `icon:github` → `mdi-github`).

### Testing

Jest with Babel (`babel.config.js` targets current Node). Tests cover `get-links.js` and `filter-links.js` — the pure logic modules. Svelte components are not tested.
