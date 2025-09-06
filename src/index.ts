export function now(): Date {
  return new Date();
}
export function toISO(d: Date = now()): string {
  return d.toISOString();
}
