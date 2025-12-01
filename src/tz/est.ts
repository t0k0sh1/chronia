import type { TZ } from "../types";

// America/New_York handles EST/EDT automatically
export const EST: TZ = {
  ianaName: "America/New_York",
  identifier: "EST",
} as const;
