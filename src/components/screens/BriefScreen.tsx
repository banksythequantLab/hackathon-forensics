"use client";

import { useCallback, useState } from "react";
import type { BriefResult } from "@/lib/types";

interface Props {
  initial: BriefResult;
}

export function BriefScreen({ initial }: Props) {
  const [brief, setBrief] = useState<BriefResult>(initial);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const download = useCallback(() => {
    const blob = new Blob([brief.markdown], {
      type: "text/markdown;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "nebius-forensic-brief.md";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }, [brief.markdown]);

  const regenerate = useCallback(async () => {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/brief", { method: "POST" });
      const data = (await res.json()) as BriefResult & {
        error?: string;
        fallback?: boolean;
      };
      setBrief(data);
      if (data.error) {
        setError(`Fell back to offline: ${data.error}`);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Request failed");
    } finally {
      setBusy(false);
    }
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <button type="button" className="btn-primary" onClick={download}>
          Download .md
        </button>
        <button
          type="button"
          className="btn-ghost"
          onClick={regenerate}
          disabled={busy}
        >
          {busy ? "Regenerating…" : "Regenerate (Ultra if key)"}
        </button>
        <span className="chip">
          source: {brief.source}
          {brief.model ? ` · ${brief.model}` : ""}
        </span>
        {error && (
          <span className="font-mono text-[11px] text-alert-amber">{error}</span>
        )}
      </div>

      <div className="panel">
        <div className="panel-header">One-pager — Nebius target</div>
        <pre className="max-h-[32rem] overflow-auto whitespace-pre-wrap break-words p-4 font-mono text-xs leading-relaxed text-steel-300">
          {brief.markdown}
        </pre>
      </div>
    </div>
  );
}
