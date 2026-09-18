# Hackathon Forensics

Offline-first forensic demo for the **Nebius × NVIDIA Global AI Hackathon**.

Ingest finished AI/ML hackathons → cluster tired archetypes → compare side-by-side → emit a citeable one-pager for Nebius tracks → stub Cosmos video polish.

> **Judges line:** *Nemotron does the forensics; Cosmos makes the forensics visible.*

## What it is

A multi-step App Router demo with a dark intel/forensics UI:

| Stage | Screen | Behavior |
|-------|--------|----------|
| 01 | **Ingest** | Lists 6 seed events, project counts, prize totals, target lock |
| 02 | **Cluster** | Tiredness/archetype map; hover/click shows citeable projects |
| 03 | **Compare** | Side-by-side event columns + Nebius whitespace overlay |
| 04 | **Brief** | One-pager markdown; **Download .md**; optional Ultra regen |
| 05 | **Video** | Cosmos T2I/I2V stub + model map credit order |

Pipeline code lives in `src/lib/pipeline/` (`ingest`, `cluster`, `compare`, `brief`) — pure deterministic functions over `data/seed.json`. Optional Nebius Token Factory (Nemotron) via `src/lib/nebius.ts` when `NEBIUS_API_KEY` is set.

## How to run

```bash
cd hackathon-forensics
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Production build:

```bash
npm run build && npm start
```

## Offline vs API key

| Mode | When | Behavior |
|------|------|----------|
| **Offline (default)** | No `NEBIUS_API_KEY` | All stages from `data/seed.json`. Brief is deterministic markdown. Never fails. |
| **Online optional** | `NEBIUS_API_KEY` set | `POST /api/brief` regenerates the one-pager with Nemotron Ultra. On API error → offline fallback. |

```bash
cp .env.example .env.local
# edit NEBIUS_API_KEY=...
```

Defaults:

- Base URL: `https://api.tokenfactory.nebius.com/v1/` (override with `NEBIUS_BASE_URL`; us-central1 regional endpoints also work if documented for your account)
- Brief model: `nvidia/NVIDIA-Nemotron-3-Ultra` (override with `NEBIUS_BRIEF_MODEL`)

**Never commit secrets.** `.env*` is gitignored; only `.env.example` ships.

## Model map (credit order)

From `seed.model_map`:

1. Lightning/Nano text — normalize titles/tags  
2. Nano Omni vision — classify thumbnails  
3. Super cluster — archetype + tiredness  
4. Ultra brief — target one-pager  
5. Cosmos gen last — B-roll only (AI Cloud)

Compliance posture: **Token Factory and/or AI Cloud + ≥1 NVIDIA open model** (Nemotron / GR00T / Cosmos / Sonic, etc.). This demo uses Nemotron for forensics logic and Cosmos as optional polish.

## Data & research

- `data/seed.json` — events, projects, archetypes, whitespace, model_map  
- `data/research-brief.md` / `docs/research-brief.md` — full research brief  

Archetype shares are **EST.** from winners/featured samples, not full corpus counts.

## 3-minute demo script

1. **Ingest (30s)** — Show 6 events + totals; point at Nebius target lock (~6.3k / $50k / Oct 30 2026).  
2. **Cluster (45s)** — Scroll saturated → whitespace; click *meta_hackathon* / *production_tool*; cite Tailored Labs, Klinva, RoboChef.  
3. **Compare (45s)** — Scroll columns; highlight Nebius track overlay (Physical AI, Personal AI, Coding agents).  
4. **Brief (45s)** — Open one-pager; hit **Download .md**; if key present, **Regenerate (Ultra)**.  
5. **Video (15s)** — Show credit order + judges line; Cosmós stub = polish only.

## Nebius / NVIDIA compliance notes

- Product narrative credits **Nemotron** for ingest/cluster/compare/brief and **Cosmos** only for video polish.  
- Offline path proves the product without burning tokens.  
- Online path uses OpenAI-compatible Token Factory chat completions.  
- Do not claim GR00T/Cosmos as core unless you wire them; this repo stubs Cosmos UI only.

## License

MIT — see [LICENSE](./LICENSE).
