export type Localize = {
  era: (
    era: 0 | 1,
    options?: { width: "narrow" | "abbreviated" | "wide" },
  ) => string;
  month: (
    month: number,
    options?: { width: "narrow" | "abbreviated" | "wide" },
  ) => string;
  weekday: (
    weekday: number,
    options?: { width: "narrow" | "abbreviated" | "wide" },
  ) => string;
  dayPeriod: (
    period: "am" | "pm",
    options?: { width: "narrow" | "abbreviated" | "wide" },
  ) => string;
};

export type Formatter = (
  date: Date,
  token: string,
  localize?: Localize,
) => string;

export type TimeUnit =
  | "year"
  | "month"
  | "day"
  | "hour"
  | "minute"
  | "second"
  | "millisecond";
