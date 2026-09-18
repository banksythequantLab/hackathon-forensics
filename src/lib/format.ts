export function formatUsd(n: number): string {
  if (n >= 1_000_000) {
    return `$${(n / 1_000_000).toFixed(2)}M`;
  }
  if (n >= 1_000) {
    return `$${Math.round(n / 1_000)}k`;
  }
  return `$${n}`;
}

export function formatNum(n: number): string {
  return n.toLocaleString("en-US");
}
