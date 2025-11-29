import { Formatter } from "../../../types";
import { getEraName } from "../../localeHelpers";

export const formatEra: Formatter = (date, token, locale) => {
  const rawYear = date.getFullYear();
  const era = rawYear > 0 ? 1 : 0;

  switch (token) {
    case "G":
    case "GG":
    case "GGG":
      return getEraName(locale, era, "abbr");
    case "GGGGG":
      return getEraName(locale, era, "narrow");
    case "GGGG":
    default:
      return getEraName(locale, era, "wide");
  }
};
