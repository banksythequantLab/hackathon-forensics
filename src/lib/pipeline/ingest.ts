import type { IngestResult, SeedData } from "../types";

export function runIngest(seed: SeedData): IngestResult {
  const events = seed.events.map((e) => ({
    id: e.id,
    name: e.name,
    when: e.when,
    participants: e.participants,
    prize_pool_usd: e.prize_pool_usd,
    projectCount: e.projects.length,
    stack_notes: e.stack_notes,
    gallery_url: e.gallery_url,
    event_url: e.event_url,
  }));

  const totals = {
    events: events.length,
    projects: events.reduce((n, e) => n + e.projectCount, 0),
    participants: events.reduce((n, e) => n + e.participants, 0),
    prizePoolUsd: events.reduce((n, e) => n + e.prize_pool_usd, 0),
  };

  return {
    events,
    totals,
    target: seed.target_hackathon,
    meta: seed.meta,
  };
}
