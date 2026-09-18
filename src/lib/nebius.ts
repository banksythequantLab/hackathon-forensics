/**
 * Optional Nebius Token Factory client (OpenAI-compatible).
 * Default base: https://api.tokenfactory.nebius.com/v1/
 * US-central1 regional endpoint may also be used — set NEBIUS_BASE_URL.
 *
 * Model IDs (NVIDIA Nemotron on Token Factory — verify against current docs):
 * - nvidia/NVIDIA-Nemotron-Nano-9B-v2 (or Nemotron 3 Nano / Lightning)
 * - nvidia/NVIDIA-Nemotron-3-Super
 * - nvidia/NVIDIA-Nemotron-3-Ultra
 *
 * If NEBIUS_API_KEY is unset, callers must fall back to offline pipeline —
 * this module never throws on missing key; hasApiKey() returns false.
 */

const DEFAULT_BASE = "https://api.tokenfactory.nebius.com/v1/";

export const NEMOTRON_MODELS = {
  nano: "nvidia/NVIDIA-Nemotron-Nano-9B-v2",
  super: "nvidia/NVIDIA-Nemotron-3-Super",
  ultra: "nvidia/NVIDIA-Nemotron-3-Ultra",
} as const;

export function hasApiKey(): boolean {
  return Boolean(process.env.NEBIUS_API_KEY?.trim());
}

export function getBaseUrl(): string {
  const raw = process.env.NEBIUS_BASE_URL?.trim() || DEFAULT_BASE;
  return raw.endsWith("/") ? raw : `${raw}/`;
}

export function getBriefModel(): string {
  return (
    process.env.NEBIUS_BRIEF_MODEL?.trim() || NEMOTRON_MODELS.ultra
  );
}

export interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface NebiusChatResult {
  content: string;
  model: string;
}

export async function chatCompletion(
  messages: ChatMessage[],
  opts?: { model?: string; temperature?: number }
): Promise<NebiusChatResult | null> {
  const key = process.env.NEBIUS_API_KEY?.trim();
  if (!key) return null;

  const model = opts?.model ?? getBriefModel();
  const url = `${getBaseUrl()}chat/completions`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      messages,
      temperature: opts?.temperature ?? 0.4,
    }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Nebius API ${res.status}: ${text.slice(0, 200)}`);
  }

  const data = (await res.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
    model?: string;
  };

  const content = data.choices?.[0]?.message?.content?.trim();
  if (!content) {
    throw new Error("Nebius API returned empty content");
  }

  return { content, model: data.model ?? model };
}
