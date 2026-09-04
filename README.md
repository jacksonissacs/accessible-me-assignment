# AION

Agentic event-intelligence and prediction operating system.

Cursor × Bloomberg Terminal × Palantir × Linear.

AION tracks important events and shows what changed, when it changed, the size and significance of the move, likely causes, supporting evidence, remaining uncertainty, related events and markets, historical analogues, and how previous expectations evolved.

This repository is the **Phase 0 foundation**: a local Next.js application over a typed mock catalog. There are no payments, no production authentication, and no paid external APIs.

## Product docs

- [Product vision](docs/product-vision.md)
- [Architecture](docs/architecture.md)
- [Roadmap](docs/roadmap.md)

## Stack

- Next.js 16 (App Router) and React 19
- TypeScript
- Tailwind CSS 4
- shadcn/ui
- Vitest + Testing Library

## Surfaces

- `/` — intelligence feed and probability-change cards
- `/events/[id]` — event reconstruction, evidence, analogues, local graph
- `/graph` — relationship-graph placeholder for the full book
- `⌘K` / `Ctrl+K` — command palette

## Setup

Requires Node.js 20+ and npm.

```bash
git clone <this-repo>
cd accessible-me-assignment
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Other commands

```bash
npm test          # Vitest, single run
npm run test:watch
npm run lint
npm run build
npm start         # production server after build
```

### Internal API

The UI reads the in-process repository. These routes exist so later clients can share the same contract:

- `GET /api/events`
- `GET /api/events?domain=finance`
- `GET /api/events/:id`

Domains: `technology`, `finance`, `geopolitics`, `supply_chain`.

## Architecture in brief

Domain types and scoring live in `src/lib/domain`. The `IntelligenceRepository` port in `src/lib/data/repository.ts` is the only way surfaces load data. Today's adapter is `MockIntelligenceRepository`. Swap that adapter — not the UI — when persistence or ingest arrives.

The relationship graph is a **visual placeholder**. The topology is real catalog data; the layout is not a production graph engine.

## What is intentionally missing

- Payments and entitlements
- Production authentication / SSO
- Paid market-data or model APIs
- A write path or multi-user workspaces

See the [roadmap](docs/roadmap.md) for the order those appear.

## Tests

Tests cover scoring, the mock repository, command search, formatters, and the probability card. They run without a browser or network.
