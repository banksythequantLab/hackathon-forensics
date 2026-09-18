import { NextResponse } from "next/server";
import { getSeed } from "@/lib/seed";
import { buildBriefPrompt, runBriefOffline } from "@/lib/pipeline";
import { chatCompletion, getBriefModel, hasApiKey } from "@/lib/nebius";
import type { BriefResult } from "@/lib/types";

export const runtime = "nodejs";

export async function GET() {
  const seed = getSeed();
  const offline = runBriefOffline(seed);
  return NextResponse.json(offline);
}

export async function POST() {
  const seed = getSeed();
  const offline = runBriefOffline(seed);

  if (!hasApiKey()) {
    const result: BriefResult = {
      ...offline,
      source: "offline",
    };
    return NextResponse.json(result);
  }

  try {
    const prompt = buildBriefPrompt(seed);
    const completion = await chatCompletion(
      [
        {
          role: "system",
          content:
            "You write concise, cite-heavy hackathon forensic briefs in markdown. Preserve URLs and factual claims from the user prompt.",
        },
        { role: "user", content: prompt },
      ],
      { model: getBriefModel() }
    );

    if (!completion) {
      return NextResponse.json(offline);
    }

    const result: BriefResult = {
      markdown: completion.content,
      source: "nebius",
      model: completion.model,
      generatedAt: new Date().toISOString(),
    };
    return NextResponse.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      {
        ...offline,
        source: "offline" as const,
        error: message,
        fallback: true,
      },
      { status: 200 }
    );
  }
}
