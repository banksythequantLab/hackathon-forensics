"use client";

import { useMemo, useState } from "react";
import { Stepper, type StepId } from "@/components/ui/Stepper";
import { IngestScreen } from "@/components/screens/IngestScreen";
import { ClusterScreen } from "@/components/screens/ClusterScreen";
import { CompareScreen } from "@/components/screens/CompareScreen";
import { BriefScreen } from "@/components/screens/BriefScreen";
import { VideoScreen } from "@/components/screens/VideoScreen";
import type {
  BriefResult,
  ClusterResult,
  CompareResult,
  IngestResult,
  ModelMap,
  TargetHackathon,
} from "@/lib/types";

interface Props {
  ingest: IngestResult;
  cluster: ClusterResult;
  compare: CompareResult;
  brief: BriefResult;
  modelMap: ModelMap;
  target: TargetHackathon;
}

export function ForensicsApp({
  ingest,
  cluster,
  compare,
  brief,
  modelMap,
  target,
}: Props) {
  const [step, setStep] = useState<StepId>("ingest");

  const title = useMemo(() => {
    const map: Record<StepId, string> = {
      ingest: "Corpus ingest",
      cluster: "Archetype clustering",
      compare: "Cross-event compare",
      brief: "Target brief",
      video: "Video polish",
    };
    return map[step];
  }, [step]);

  return (
    <div className="mx-auto flex min-h-screen max-w-7xl flex-col gap-4 px-4 py-6 sm:px-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-phosphor-500">
            Nebius × NVIDIA · forensic demo
          </div>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-steel-300 sm:text-3xl">
            Hackathon Forensics
          </h1>
          <p className="mt-1 max-w-2xl text-sm text-steel-400">
            Offline-first audit of finished AI hackathons → whitespace for{" "}
            <a
              href={target.url}
              target="_blank"
              rel="noreferrer"
              className="text-phosphor-400 hover:underline"
            >
              {target.name}
            </a>
            .
          </p>
        </div>
        <div className="panel px-3 py-2 font-mono text-[10px] uppercase tracking-wider text-steel-500">
          mode · seed.json
        </div>
      </header>

      <Stepper current={step} onChange={setStep} />

      <div className="flex items-center justify-between gap-2">
        <h2 className="font-mono text-sm uppercase tracking-[0.14em] text-steel-400">
          {title}
        </h2>
        <div className="flex gap-2">
          <button
            type="button"
            className="btn-ghost"
            disabled={step === "ingest"}
            onClick={() => {
              const order: StepId[] = [
                "ingest",
                "cluster",
                "compare",
                "brief",
                "video",
              ];
              const i = order.indexOf(step);
              if (i > 0) setStep(order[i - 1]);
            }}
          >
            Prev
          </button>
          <button
            type="button"
            className="btn-primary"
            disabled={step === "video"}
            onClick={() => {
              const order: StepId[] = [
                "ingest",
                "cluster",
                "compare",
                "brief",
                "video",
              ];
              const i = order.indexOf(step);
              if (i < order.length - 1) setStep(order[i + 1]);
            }}
          >
            Next
          </button>
        </div>
      </div>

      <main className="flex-1 pb-10">
        {step === "ingest" && <IngestScreen data={ingest} />}
        {step === "cluster" && <ClusterScreen data={cluster} />}
        {step === "compare" && <CompareScreen data={compare} />}
        {step === "brief" && <BriefScreen initial={brief} />}
        {step === "video" && <VideoScreen modelMap={modelMap} />}
      </main>

      <footer className="border-t border-ink-600/60 py-4 font-mono text-[10px] text-steel-500">
        MIT · Nemotron forensics · Cosmos polish · no secrets in repo
      </footer>
    </div>
  );
}
