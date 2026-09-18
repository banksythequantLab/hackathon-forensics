import type { CompareResult, SeedData } from "../types";

export function runCompare(seed: SeedData): CompareResult {
  const events = seed.events.map((e) => {
    const topProjects = e.projects.slice(0, 4).map((p) => ({
      name: p.name,
      place: p.place,
      one_liner: p.one_liner,
      url: p.url,
      eventId: e.id,
      eventName: e.name,
      archetype_hint: p.archetype_hint,
    }));

    const archetypeHints = Array.from(
      new Set(e.projects.map((p) => p.archetype_hint))
    );

    return {
      id: e.id,
      name: e.name,
      when: e.when,
      participants: e.participants,
      prize_pool_usd: e.prize_pool_usd,
      topProjects,
      archetypeHints,
    };
  });

  return {
    events,
    target: seed.target_hackathon,
    whitespace: seed.whitespace_for_target,
  };
}
