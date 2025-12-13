import type { Locale } from "../../types";

export const pt: Locale = {
  era: {
    // Narrow: aC, dC
    narrow: ["aC", "dC"] as const,
    // Abbreviated: a.C., d.C.
    abbr: ["a.C.", "d.C."] as const,
    // Wide: antes de Cristo, depois de Cristo
    wide: ["antes de Cristo", "depois de Cristo"] as const,
  },

  month: {
    // Narrow: single letter (lowercase in Portuguese)
    narrow: [
      "j",
      "f",
      "m",
      "a",
      "m",
      "j",
      "j",
      "a",
      "s",
      "o",
      "n",
      "d",
    ] as const,
    // Abbreviated
    abbr: [
      "jan",
      "fev",
      "mar",
      "abr",
      "mai",
      "jun",
      "jul",
      "ago",
      "set",
      "out",
      "nov",
      "dez",
    ] as const,
    // Wide
    wide: [
      "janeiro",
      "fevereiro",
      "março",
      "abril",
      "maio",
      "junho",
      "julho",
      "agosto",
      "setembro",
      "outubro",
      "novembro",
      "dezembro",
    ] as const,
  },

  weekday: {
    // Narrow: single letter (lowercase in Portuguese)
    narrow: ["d", "s", "t", "q", "q", "s", "s"] as const,
    // Abbreviated
    abbr: ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"] as const,
    // Wide
    wide: [
      "domingo",
      "segunda-feira",
      "terça-feira",
      "quarta-feira",
      "quinta-feira",
      "sexta-feira",
      "sábado",
    ] as const,
  },

  dayPeriod: {
    // Narrow: AM, PM
    narrow: ["AM", "PM"] as const,
    // Abbreviated: AM, PM
    abbr: ["AM", "PM"] as const,
    // Wide: AM, PM
    wide: ["AM", "PM"] as const,
  },
};
