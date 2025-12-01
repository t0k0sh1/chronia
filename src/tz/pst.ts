import type { TZ } from "../types";

// America/Los_Angeles handles PST/PDT automatically
export const PST: TZ = {
  ianaName: "America/Los_Angeles",
  identifier: "PST",
} as const;
