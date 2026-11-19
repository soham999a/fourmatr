interface Entry {
  count: number;
  resetAt: number;
}

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;

// Per-instance guard. On serverless with multiple instances, replace with a
// shared store (Redis/KV) — documented in README.
const buckets = new Map<string, Entry>();

export function allowRequest(key: string): boolean {
  const now = Date.now();
  const entry = buckets.get(key);

  if (!entry || now > entry.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + WINDOW_MS });
    prune(now);
    return true;
  }

  if (entry.count >= MAX_REQUESTS) return false;

  entry.count += 1;
  return true;
}

function prune(now: number): void {
  for (const [key, entry] of buckets) {
    if (now > entry.resetAt) buckets.delete(key);
  }
}
