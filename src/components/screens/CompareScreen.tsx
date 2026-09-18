"use client";

import type { CompareResult } from "@/lib/types";
import { formatNum, formatUsd } from "@/lib/format";

interface Props {
  data: CompareResult;
}

export function CompareScreen({ data }: Props) {
  return (
    <div className="space-y-4">
      <div className="panel overflow-hidden">
        <div className="panel-header flex flex-wrap items-center justify-between gap-2">
          <span>Side-by-side event columns</span>
          <span className="normal-case tracking-normal text-steel-500">
            Overlay → Nebius tracks / whitespace
          </span>
        </div>
        <div className="flex gap-3 overflow-x-auto p-3">
          {data.events.map((e) => (
            <div
              key={e.id}
              className="w-64 shrink-0 rounded border border-ink-600 bg-ink-800/40"
            >
              <div className="border-b border-ink-600/80 px-3 py-2">
                <h3 className="line-clamp-2 text-sm font-medium text-steel-300">
                  {e.name}
                </h3>
                <p className="mt-1 font-mono text-[10px] text-steel-500">
                  {e.when}
                </p>
                <div className="mt-2 flex flex-wrap gap-1">
                  <span className="chip">{formatNum(e.participants)}</span>
                  <span className="chip">{formatUsd(e.prize_pool_usd)}</span>
                </div>
              </div>
              <ul className="space-y-2 p-3">
                {e.topProjects.map((p) => (
                  <li key={p.name} className="text-xs">
                    <div className="flex items-start justify-between gap-1">
                      {p.url ? (
                        <a
                          href={p.url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-phosphor-400 hover:underline"
                        >
                          {p.name}
                        </a>
                      ) : (
                        <span className="text-steel-300">{p.name}</span>
                      )}
                      <span className="shrink-0 font-mono text-[9px] text-steel-500">
                        {p.place}
                      </span>
                    </div>
                    <p className="mt-0.5 text-steel-500 line-clamp-2">
                      {p.one_liner}
                    </p>
                    <span className="mt-1 inline-block font-mono text-[9px] text-amber-dim">
                      {p.archetype_hint}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Target overlay column */}
          <div className="w-72 shrink-0 rounded border border-phosphor-500/40 bg-phosphor-500/5">
            <div className="border-b border-phosphor-500/30 px-3 py-2">
              <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-phosphor-500">
                Target overlay
              </div>
              <h3 className="mt-1 text-sm font-medium text-phosphor-400">
                {data.target.name}
              </h3>
              <p className="mt-1 font-mono text-[10px] text-steel-400">
                Tracks: {data.target.tracks.join(" · ")}
              </p>
            </div>
            <ul className="space-y-2 p-3">
              {data.whitespace.map((w) => (
                <li
                  key={w.title}
                  className="rounded border border-ink-600/80 bg-ink-900/60 px-2 py-2"
                >
                  <div className="text-xs font-medium text-steel-300">
                    {w.title}
                  </div>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {w.fit_tracks.map((t) => (
                      <span key={t} className="chip text-phosphor-400">
                        {t}
                      </span>
                    ))}
                  </div>
                  <p className="mt-1 text-[11px] text-steel-500">{w.why}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
