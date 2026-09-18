import type { BriefResult, SeedData } from "../types";

function formatUsd(n: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

function citeLine(seed: SeedData): string {
  const cites: string[] = [];
  for (const event of seed.events) {
    for (const p of event.projects) {
      if (p.url) {
        cites.push(`- **${p.name}** (${p.place}, ${event.name}): ${p.url}`);
      }
    }
  }
  return cites.slice(0, 12).join("\n");
}

/** Deterministic offline one-pager from seed whitespace + cites. */
export function runBriefOffline(seed: SeedData): BriefResult {
  const t = seed.target_hackathon;
  const mm = seed.model_map;
  const topWhitespace = seed.whitespace_for_target.slice(0, 5);
  const saturated = seed.archetypes
    .filter((a) => a.tiredness_rank <= 3)
    .map((a) => a.label)
    .join("; ");

  const markdown = `# Forensic Brief — ${t.name}

**Generated:** ${seed.meta.research_date} (offline seed)  
**Source:** ${seed.meta.source_brief}  
**Disclaimer:** ${seed.meta.disclaimer}

---

## Target snapshot

| Field | Value |
|-------|-------|
| Event | [${t.name}](${t.url}) |
| Deadline | ${t.deadline} |
| Participants (approx.) | ${t.participants_approx.toLocaleString()} |
| Prize pool | ${formatUsd(t.prize_pool_usd)} |
| Tracks | ${t.tracks.join(" · ")} |
| Stack requirement | ${t.requirements} |

## What the corpus says (6 prior events)

Audited **${seed.events.length}** finished AI/ML hackathons (~${seed.events
    .reduce((n, e) => n + e.participants, 0)
    .toLocaleString()} listed participants). Saturated archetypes: **${saturated}**.

Winning patterns that still clear the bar:
- **Non-chat production UX** — Tailored Labs (Bolt grand prize)
- **Deep vertical SaaS with ROI** — Klinva, CallVance
- **Embodied / robotics when rewarded** — RoboChef (OpenAI overall)
- **Real offline / privacy care** — Memory Palace, Chrome accessibility winners
- **Closed-loop coding agents** — RepoPilot-class (rare)

## Whitespace opportunities for Nebius × NVIDIA

${topWhitespace
  .map(
    (w, i) =>
      `### ${i + 1}. ${w.title}\n- **Fit tracks:** ${w.fit_tracks.join(", ")}\n- **Why:** ${w.why}`
  )
  .join("\n\n")}

## Recommended build posture

1. Lead with a **Best Apps & Agents** or **Coding & Agentic Engineering** story that is *meta* or *closed-loop* — not another generic chatbot.
2. Use **Nebius Token Factory** for Nemotron stages (${mm.credit_order.join(" → ")}).
3. Keep **Cosmos T2I/I2V** as polish only — judges line: *"${mm.judges_line}"*
4. Cite real prior winners; avoid archetype ranks 1–3 unless you have a sharp wedge.

## Citeable projects (seed)

${citeLine(seed)}

---

*Hackathon Forensics · ${seed.meta.product} v${seed.meta.version} · MIT*
`;

  return {
    markdown,
    source: "offline",
    generatedAt: new Date().toISOString(),
  };
}

export function buildBriefPrompt(seed: SeedData): string {
  const offline = runBriefOffline(seed);
  return `You are a hackathon strategy analyst. Rewrite and sharpen the following forensic one-pager for the Nebius × NVIDIA Global AI Hackathon. Keep all factual cites and URLs. Stay concise (≈1 page). Use markdown.

---
${offline.markdown}`;
}
