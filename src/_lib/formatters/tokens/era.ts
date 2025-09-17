import { Formatter } from "../../../types";

export const formatEra: Formatter = (date, token, locale) => {
  const rawYear = date.getFullYear();
  const era = rawYear > 0 ? 1 : 0;

  if (locale) {
    switch (token) {
      case "G":
      case "GG":
      case "GGG":
        return locale.era(era, { width: "abbreviated" });
      case "GGGGG":
        return locale.era(era, { width: "narrow" });
      case "GGGG":
      default:
        return locale.era(era, { width: "wide" });
    }
  }

  // fallback
  return era ? "AD" : "BC";
};
