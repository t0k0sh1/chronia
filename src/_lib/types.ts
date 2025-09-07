export type Localize = {
  era: (
    era: 0 | 1,
    options?: { width: "narrow" | "abbreviated" | "wide" },
  ) => string;
  month: (
    month: number,
    options?: { width: "narrow" | "abbreviated" | "wide" },
  ) => string;
  day: (
    day: number,
    options?: { width: "narrow" | "abbreviated" | "wide" },
  ) => string;
};

export type Formatter = (
  date: Date,
  token: string,
  localize?: Localize,
) => string;
