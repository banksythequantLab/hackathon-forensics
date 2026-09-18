"use client";

import { useState } from "react";
import type { ClusterResult } from "@/lib/types";

interface Props {
  data: ClusterResult;
}

const TONE: Record<
  string,
  { bar: string; chip: string; label: string }
> = {
  saturated: {
    bar: "bg-alert-red",
    chip: "border-alert-red/40 text-alert-red",
    label: "saturated",
  },
  crowded: {
    bar: "bg-alert-amber",
    chip: "border-alert-amber/40 text-alert-amber",
    label: "crowded",
  },
  emerging: {
    bar: "bg-phosphor-600",
    chip: "border-phosphor-500/40 text-phosphor-400",
    label: "emerging",
  },
  whitespace: {
    bar: "bg-phosphor-400",
    chip: "border-phosphor-400/50 text-phosphor-400",
    label: "whitespace",
  },
};

export function ClusterScreen({ data }: Props) {
  const [selected, setSelected] = useState<string | null>(
    data.archetypes.find((a) => a.projects.length > 0)?.id ?? null
  );
  const active = data.archetypes.find((a) => a.id === selected);

  return (
    <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
      <div className="panel">
        <div className="panel-header flex items-center justify-between">
          <span>Tiredness / archetype map</span>
          <span className="normal-case tracking-normal text-steel-500">
            EST. shares
          </span>
        </div>
        <div className="max-h-[28rem] space-y-1 overflow-y-auto p-3">
          {data.archetypes.map((a) => {
            const tone = TONE[a.tirednessLabel];
            const width = Math.max(8, 100 - (a.tiredness_rank - 1) * 4);
            const isActive = a.id === selected;
            return (
              <button
                key={a.id}
                type="button"
                onClick={() => setSelected(a.id)}
                onMouseEnter={() => setSelected(a.id)}
                className={`w-full rounded border px-3 py-2 text-left transition ${
                  isActive
                    ? "border-phosphor-500/40 bg-phosphor-500/5"
                    : "border-transparent hover:border-ink-600 hover:bg-ink-800/50"
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex min-w-0 items-center gap-2">
                    <span className="w-5 shrink-0 font-mono text-[10px] text-steel-500">
                      {String(a.tiredness_rank).padStart(2, "0")}
                    </span>
                    <span className="truncate text-sm text-steel-300">
                      {a.label}
                    </span>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <span className={`chip ${tone.chip}`}>{tone.label}</span>
                    <span className="font-mono text-[10px] text-steel-500">
                      {a.projects.length} cite
                      {a.projects.length === 1 ? "" : "s"}
                    </span>
                  </div>
                </div>
                <div className="mt-2 h-1.5 overflow-hidden rounded bg-ink-700">
                  <div
                    className={`h-full ${tone.bar} opacity-80`}
                    style={{ width: `${width}%` }}
                  />
                </div>
                <div className="mt-1 font-mono text-[10px] text-steel-500">
                  {a.est_share_pct}
                  {a.note ? ` · ${a.note}` : ""}
                </div>
              </button>
            );
          })}
        </div>
        <div className="border-t border-ink-600/60 px-4 py-2 text-[11px] text-steel-500">
          {data.disclaimer}
        </div>
      </div>

      <div className="panel">
        <div className="panel-header">Citeable projects</div>
        {active ? (
          <div className="p-4">
            <h3 className="text-base text-steel-300">{active.label}</h3>
            <p className="mt-1 font-mono text-[11px] text-steel-500">
              Rank #{active.tiredness_rank} · {active.est_share_pct}
            </p>
            {active.projects.length === 0 ? (
              <p className="mt-4 text-sm text-steel-500">
                No seed projects tagged — meta whitespace candidate.
              </p>
            ) : (
              <ul className="mt-4 space-y-3">
                {active.projects.map((p) => (
                  <li
                    key={`${p.eventId}-${p.name}`}
                    className="rounded border border-ink-600/80 bg-ink-800/40 px-3 py-2"
                  >
                    <div className="flex items-start justify-between gap-2">
                      {p.url ? (
                        <a
                          href={p.url}
                          target="_blank"
                          rel="noreferrer"
                          className="font-medium text-phosphor-400 hover:underline"
                        >
                          {p.name}
                        </a>
                      ) : (
                        <span className="font-medium text-steel-300">
                          {p.name}
                        </span>
                      )}
                      <span className="chip shrink-0">{p.place}</span>
                    </div>
                    <p className="mt-1 text-sm text-steel-400">{p.one_liner}</p>
                    <p className="mt-1 font-mono text-[10px] text-steel-500">
                      {p.eventName}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ) : (
          <p className="p-4 text-sm text-steel-500">
            Hover or click an archetype.
          </p>
        )}
      </div>
    </div>
  );
}
