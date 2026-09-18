export interface SeedMeta {
  product: string;
  version: string;
  research_date: string;
  disclaimer: string;
  source_brief: string;
}

export interface TargetHackathon {
  id: string;
  name: string;
  deadline: string;
  participants_approx: number;
  prize_pool_usd: number;
  url: string;
  tracks: string[];
  requirements: string;
}

export interface Project {
  name: string;
  place: string;
  one_liner: string;
  url: string | null;
  archetype_hint: string;
}

export interface Event {
  id: string;
  name: string;
  when: string;
  participants: number;
  submissions_approx?: number;
  prize_pool_usd: number;
  gallery_url: string;
  winners_url?: string;
  event_url: string;
  stack_notes: string;
  projects: Project[];
}

export interface Archetype {
  id: string;
  label: string;
  tiredness_rank: number;
  est_share_pct: string;
  note: string | null;
}

export interface WhitespaceItem {
  title: string;
  fit_tracks: string[];
  why: string;
}

export interface ModelStage {
  model: string;
  where: string;
  job: string;
}

export interface ModelMap {
  ingest_text: ModelStage;
  ingest_vision: ModelStage;
  cluster: ModelStage;
  compare: ModelStage;
  brief: ModelStage;
  video_polish: ModelStage;
  credit_order: string[];
  judges_line: string;
}

export interface SeedData {
  meta: SeedMeta;
  target_hackathon: TargetHackathon;
  events: Event[];
  archetypes: Archetype[];
  whitespace_for_target: WhitespaceItem[];
  model_map: ModelMap;
}

export interface CitedProject {
  name: string;
  place: string;
  one_liner: string;
  url: string | null;
  eventId: string;
  eventName: string;
  archetype_hint: string;
}

export interface IngestResult {
  events: Array<{
    id: string;
    name: string;
    when: string;
    participants: number;
    prize_pool_usd: number;
    projectCount: number;
    stack_notes: string;
    gallery_url: string;
    event_url: string;
  }>;
  totals: {
    events: number;
    projects: number;
    participants: number;
    prizePoolUsd: number;
  };
  target: TargetHackathon;
  meta: SeedMeta;
}

export interface ClusterArchetypeView {
  id: string;
  label: string;
  tiredness_rank: number;
  est_share_pct: string;
  note: string | null;
  projects: CitedProject[];
  tirednessLabel: "saturated" | "crowded" | "emerging" | "whitespace";
}

export interface ClusterResult {
  archetypes: ClusterArchetypeView[];
  disclaimer: string;
}

export interface CompareResult {
  events: Array<{
    id: string;
    name: string;
    when: string;
    participants: number;
    prize_pool_usd: number;
    topProjects: CitedProject[];
    archetypeHints: string[];
  }>;
  target: TargetHackathon;
  whitespace: WhitespaceItem[];
}

export interface BriefResult {
  markdown: string;
  source: "offline" | "nebius";
  model?: string;
  generatedAt: string;
}
