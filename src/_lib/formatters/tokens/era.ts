import { Formatter } from "../../../types";

export const formatEra: Formatter = (date, token, localize) => {
  const rawYear = date.getFullYear();
  const era = rawYear > 0 ? 1 : 0;

  if (localize) {
    switch (token) {
      case "G":
      case "GG":
      case "GGG":
        return localize.era(era, { width: "abbreviated" });
      case "GGGGG":
        return localize.era(era, { width: "narrow" });
      case "GGGG":
      default:
        return localize.era(era, { width: "wide" });
    }
  }

  // fallback
  return era ? "AD" : "BC";
};
