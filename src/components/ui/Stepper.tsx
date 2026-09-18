"use client";

export type StepId = "ingest" | "cluster" | "compare" | "brief" | "video";

export const STEPS: { id: StepId; label: string; code: string }[] = [
  { id: "ingest", label: "Ingest", code: "01" },
  { id: "cluster", label: "Cluster", code: "02" },
  { id: "compare", label: "Compare", code: "03" },
  { id: "brief", label: "Brief", code: "04" },
  { id: "video", label: "Video", code: "05" },
];

interface StepperProps {
  current: StepId;
  onChange: (id: StepId) => void;
}

export function Stepper({ current, onChange }: StepperProps) {
  const idx = STEPS.findIndex((s) => s.id === current);

  return (
    <nav className="panel overflow-hidden" aria-label="Pipeline stages">
      <ol className="flex flex-wrap divide-x divide-ink-600/80">
        {STEPS.map((step, i) => {
          const active = step.id === current;
          const done = i < idx;
          return (
            <li key={step.id} className="flex-1 min-w-[7rem]">
              <button
                type="button"
                onClick={() => onChange(step.id)}
                className={`flex w-full items-center gap-3 px-4 py-3 text-left transition ${
                  active
                    ? "bg-phosphor-500/10 text-phosphor-400"
                    : done
                      ? "bg-ink-800/40 text-steel-300 hover:bg-ink-800"
                      : "text-steel-400 hover:bg-ink-800/60 hover:text-steel-300"
                }`}
              >
                <span
                  className={`font-mono text-[10px] ${
                    active ? "text-phosphor-500" : "text-steel-500"
                  }`}
                >
                  {step.code}
                </span>
                <span className="font-mono text-xs uppercase tracking-[0.14em]">
                  {step.label}
                </span>
                {active && (
                  <span className="ml-auto h-1.5 w-1.5 rounded-full bg-phosphor-500 shadow-[0_0_8px_#2dd4bf]" />
                )}
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
