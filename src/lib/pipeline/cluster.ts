import type {
  CitedProject,
  ClusterArchetypeView,
  ClusterResult,
  SeedData,
} from "../types";

function tirednessLabel(
  rank: number
): ClusterArchetypeView["tirednessLabel"] {
  if (rank <= 3) return "saturated";
  if (rank <= 8) return "crowded";
  if (rank <= 14) return "emerging";
  return "whitespace";
}

export function runCluster(seed: SeedData): ClusterResult {
  const byHint = new Map<string, CitedProject[]>();

  for (const event of seed.events) {
    for (const project of event.projects) {
      const cite: CitedProject = {
        name: project.name,
        place: project.place,
        one_liner: project.one_liner,
        url: project.url,
        eventId: event.id,
        eventName: event.name,
        archetype_hint: project.archetype_hint,
      };
      const list = byHint.get(project.archetype_hint) ?? [];
      list.push(cite);
      byHint.set(project.archetype_hint, list);
    }
  }

  const archetypes: ClusterArchetypeView[] = seed.archetypes
    .slice()
    .sort((a, b) => a.tiredness_rank - b.tiredness_rank)
    .map((a) => ({
      id: a.id,
      label: a.label,
      tiredness_rank: a.tiredness_rank,
      est_share_pct: a.est_share_pct,
      note: a.note,
      projects: byHint.get(a.id) ?? [],
      tirednessLabel: tirednessLabel(a.tiredness_rank),
    }));

  return {
    archetypes,
    disclaimer: seed.meta.disclaimer,
  };
}
