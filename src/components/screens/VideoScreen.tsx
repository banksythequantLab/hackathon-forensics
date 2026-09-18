"use client";

import type { ModelMap } from "@/lib/types";

interface Props {
  modelMap: ModelMap;
}

export function VideoScreen({ modelMap }: Props) {
  const stages = [
    { key: "ingest_text", ...modelMap.ingest_text },
    { key: "ingest_vision", ...modelMap.ingest_vision },
    { key: "cluster", ...modelMap.cluster },
    { key: "compare", ...modelMap.compare },
    { key: "brief", ...modelMap.brief },
    { key: "video_polish", ...modelMap.video_polish },
  ];

  return (
    <div className="space-y-4">
      <div className="panel border-amber-signal/30">
        <div className="panel-header text-amber-signal">
          Video polish — stub (Cosmos on AI Cloud)
        </div>
        <div className="grid gap-4 p-4 md:grid-cols-2">
          <div className="rounded border border-dashed border-ink-600 bg-ink-800/30 p-6 text-center">
            <div className="mx-auto mb-3 flex h-24 w-40 items-center justify-center rounded bg-ink-700/80 font-mono text-[10px] uppercase tracking-widest text-steel-500">
              T2I / I2V preview
            </div>
            <p className="text-sm text-steel-400">
              {modelMap.video_polish.model}
            </p>
            <p className="mt-1 font-mono text-[11px] text-steel-500">
              {modelMap.video_polish.where} · {modelMap.video_polish.job}
            </p>
            <button type="button" className="btn-ghost mt-4" disabled>
              Generate B-roll (stub)
            </button>
          </div>
          <div>
            <h3 className="font-mono text-xs uppercase tracking-[0.16em] text-phosphor-500">
              Judges line
            </h3>
            <blockquote className="mt-2 border-l-2 border-phosphor-500/50 pl-3 text-lg text-steel-300">
              “{modelMap.judges_line}”
            </blockquote>
            <p className="mt-4 text-sm text-steel-500">
              Cosmos is demo polish only — not product core. Forensic stages run
              on Nemotron via Token Factory.
            </p>
          </div>
        </div>
      </div>

      <div className="panel">
        <div className="panel-header">Model map — credit order</div>
        <ol className="divide-y divide-ink-600/60">
          {modelMap.credit_order.map((step, i) => (
            <li
              key={step}
              className="flex items-center gap-3 px-4 py-3 font-mono text-sm"
            >
              <span className="text-phosphor-500">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-steel-300">{step}</span>
            </li>
          ))}
        </ol>
        <div className="border-t border-ink-600/60 p-4">
          <h4 className="font-mono text-[10px] uppercase tracking-[0.16em] text-steel-500">
            Stage → model
          </h4>
          <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {stages.map((s) => (
              <div
                key={s.key}
                className="rounded border border-ink-600 bg-ink-800/40 px-3 py-2"
              >
                <div className="font-mono text-[10px] uppercase text-phosphor-500">
                  {s.key}
                </div>
                <div className="mt-1 text-sm text-steel-300">{s.model}</div>
                <div className="mt-0.5 font-mono text-[10px] text-steel-500">
                  {s.where}
                </div>
                <div className="mt-1 text-[11px] text-steel-400">{s.job}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
