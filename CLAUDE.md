# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm install        # install dependencies
pnpm dev            # start dev server with live reload (reads .env for links)
pnpm build          # production build → public/build/
pnpm test           # run jest tests
pnpm test --testPathPattern=get-links  # run a single test file
pnpm generate-config  # write public/config.js from current env (calls scripts/generate-config.sh)
```

`pnpm` is provided via Corepack — `packageManager` is pinned in `package.json`. `.mise.toml` declares `node`, `pnpm`, and `jq` (used by the runtime config generator).

## Architecture

**envlinks** is a static single-page app (Svelte + Rollup) that renders a filterable link dashboard. The Svelte bundle is prebuilt; environment variables are injected at container startup as a `window.env` object.

### Runtime data pipeline

The architectural decision: the Svelte bundle is content-agnostic. At container startup, a small bash script writes `/srv/www/config.js` containing `window.env = { ... }` populated from `LINK_*` and `LINKS_TITLE` env vars. `index.html` loads `config.js` _before_ the bundle, so by the time `App.svelte` runs it can call `getLinks(window.env)` and render synchronously.

This means:

- `src/get-links.js` runs in the **browser**, not in Node.
- Changing links does **not** require a rebuild — just restart the container with new env vars.
- The runtime image has no Node, no npm, no Rollup. It's `nginx:alpine-slim` + `bash` + `jq` (~15 MB).

### Build vs runtime split

- `scripts/generate-config.sh` — bash + jq. Used both in dev (via `pnpm generate-config` or chained into `pnpm dev`) and at container startup. Filters `process.env` for `LINK_*` and `LINKS_TITLE`, writes them as a JSON-encoded `window.env` assignment.
- `Dockerfile` is multi-stage: stage 1 (`node:22-alpine`) installs deps with pnpm and runs `pnpm build`; stage 2 (`nginx:1.31-alpine-slim` + `apk add bash jq`) copies in the prebuilt `public/` and the entrypoint.
- `docker-entrypoint.sh` runs `generate-config.sh` then `exec "$@"` (nginx).
- `nginx.conf` serves `/srv/www` on port 80 with an SPA catch-all (`try_files $uri $uri/ /index.html`) and gzip.

### Source files

- `src/get-links.js` — parses `LINK_*` env vars into `{ name, url, icon, index }` objects, sorted by index. Supports three variable formats (see README).
- `src/filter-links.js` — filters links by space-separated search terms against link names (case-insensitive, all terms must match).
- `src/App.svelte` — root component; reads `window.env`, calls `getLinks()`, owns search state and keyboard handling (type to search, Enter to navigate, Tab to focus links, Escape to clear).
- `src/Search.svelte`, `src/Links.svelte`, `src/Link.svelte`, `src/Layout.svelte` — presentational components.

### Icons

Icons use [Material Design Icons](https://pictogrammers.com/library/mdi/) loaded from a CDN in `App.svelte`. Icon names in env vars map directly to MDI icon slugs (e.g. `icon:github` → `mdi-github`).

### Testing

Jest with Babel (`babel.config.js` targets current Node). Tests cover `get-links.js` and `filter-links.js` — the pure logic modules. Svelte components are not tested.
