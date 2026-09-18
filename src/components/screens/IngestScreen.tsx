"use client";

import type { IngestResult } from "@/lib/types";
import { formatNum, formatUsd } from "@/lib/format";

interface Props {
  data: IngestResult;
}

export function IngestScreen({ data }: Props) {
  const { events, totals, target, meta } = data;

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Events", value: String(totals.events) },
          { label: "Seed projects", value: String(totals.projects) },
          { label: "Participants Σ", value: formatNum(totals.participants) },
          { label: "Prize pools Σ", value: formatUsd(totals.prizePoolUsd) },
        ].map((stat) => (
          <div key={stat.label} className="panel px-4 py-3">
            <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-steel-500">
              {stat.label}
            </div>
            <div className="mt-1 font-mono text-2xl text-phosphor-400">
              {stat.value}
            </div>
          </div>
        ))}
      </div>

      <div className="panel">
        <div className="panel-header flex items-center justify-between gap-2">
          <span>Corpus ingest — {meta.research_date}</span>
          <span className="chip">offline seed</span>
        </div>
        <div className="divide-y divide-ink-600/60">
          {events.map((e, i) => (
            <div
              key={e.id}
              className="flex flex-col gap-2 px-4 py-3 sm:flex-row sm:items-start sm:justify-between"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline gap-2">
                  <span className="font-mono text-[10px] text-steel-500">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <a
                    href={e.event_url}
                    target="_blank"
                    rel="noreferrer"
                    className="truncate font-medium text-steel-300 hover:text-phosphor-400"
                  >
                    {e.name}
                  </a>
                </div>
                <p className="mt-1 text-sm text-steel-400">{e.when}</p>
                <p className="mt-1 font-mono text-[11px] text-steel-500">
                  {e.stack_notes}
                </p>
              </div>
              <div className="flex shrink-0 flex-wrap gap-2 sm:justify-end">
                <span className="chip">{formatNum(e.participants)} pax</span>
                <span className="chip">{e.projectCount} projects</span>
                <span className="chip">{formatUsd(e.prize_pool_usd)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="panel px-4 py-3">
        <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-amber-signal">
          Target lock
        </div>
        <div className="mt-1 flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <a
            href={target.url}
            target="_blank"
            rel="noreferrer"
            className="text-lg text-steel-300 hover:text-phosphor-400"
          >
            {target.name}
          </a>
          <span className="font-mono text-xs text-steel-500">
            ~{formatNum(target.participants_approx)} ·{" "}
            {formatUsd(target.prize_pool_usd)} · deadline {target.deadline}
          </span>
        </div>
        <p className="mt-2 text-xs text-steel-500">{meta.disclaimer}</p>
      </div>
    </div>
  );
}
