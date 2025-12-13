import { Locale } from "../../types";

/**
 * Greek locale data.
 *
 * Based on CLDR data for Greek (Greece).
 */
export const el: Locale = {
  era: {
    // Narrow: π.Χ., μ.Χ.
    narrow: ["π.Χ.", "μ.Χ."] as const,
    // Abbreviated: π.Χ., μ.Χ.
    abbr: ["π.Χ.", "μ.Χ."] as const,
    // Wide: προ Χριστού, μετά Χριστόν
    wide: ["προ Χριστού", "μετά Χριστόν"] as const,
  },

  month: {
    // Narrow: single letter
    narrow: [
      "Ι",
      "Φ",
      "Μ",
      "Α",
      "Μ",
      "Ι",
      "Ι",
      "Α",
      "Σ",
      "Ο",
      "Ν",
      "Δ",
    ] as const,
    // Abbreviated
    abbr: [
      "Ιαν",
      "Φεβ",
      "Μαρ",
      "Απρ",
      "Μαΐ",
      "Ιουν",
      "Ιουλ",
      "Αυγ",
      "Σεπ",
      "Οκτ",
      "Νοε",
      "Δεκ",
    ] as const,
    // Wide
    wide: [
      "Ιανουαρίου",
      "Φεβρουαρίου",
      "Μαρτίου",
      "Απριλίου",
      "Μαΐου",
      "Ιουνίου",
      "Ιουλίου",
      "Αυγούστου",
      "Σεπτεμβρίου",
      "Οκτωβρίου",
      "Νοεμβρίου",
      "Δεκεμβρίου",
    ] as const,
  },

  weekday: {
    // Narrow: single letter
    narrow: ["Κ", "Δ", "Τ", "Τ", "Π", "Π", "Σ"] as const,
    // Abbreviated
    abbr: ["Κυρ", "Δευ", "Τρί", "Τετ", "Πέμ", "Παρ", "Σάβ"] as const,
    // Wide
    wide: [
      "Κυριακή",
      "Δευτέρα",
      "Τρίτη",
      "Τετάρτη",
      "Πέμπτη",
      "Παρασκευή",
      "Σάββατο",
    ] as const,
  },

  dayPeriod: {
    // Narrow: πμ, μμ
    narrow: ["πμ", "μμ"] as const,
    // Abbreviated: π.μ., μ.μ.
    abbr: ["π.μ.", "μ.μ."] as const,
    // Wide: π.μ., μ.μ.
    wide: ["π.μ.", "μ.μ."] as const,
  },
};
