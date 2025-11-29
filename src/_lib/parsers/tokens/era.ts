import { Parser } from "../../../types";
import { getEraName } from "../../localeHelpers";

export const parseEra: Parser = (input, position, token, locale, dateComponents) => {
  // Collect all era variants from locale (case-sensitive by default)
  const adVariants = [
    getEraName(locale, 1, "wide"),
    getEraName(locale, 1, "abbr"),
    getEraName(locale, 1, "narrow"),
  ];

  const bcVariants = [
    getEraName(locale, 0, "wide"),
    getEraName(locale, 0, "abbr"),
    getEraName(locale, 0, "narrow"),
  ];

  // Additional English fallback variants (case-insensitive)
  // These are alternative English era designations not in default en-US locale
  // or case variants of default locale values
  const additionalAdVariants = ["CE", "ce", "Ce", "cE", "ad", "Ad", "aD"];
  const additionalBcVariants = ["BCE", "bce", "Bce", "bcE", "BCe", "BcE", "bCe", "bCE", "bc", "Bc", "bC"];

  // Combine all variants and sort by length (longest first) to prefer longer matches
  const allAdVariants = [...adVariants, ...additionalAdVariants].sort((a, b) => b.length - a.length);
  const allBcVariants = [...bcVariants, ...additionalBcVariants].sort((a, b) => b.length - a.length);

  // Try BC/BCE first (to handle "BCE" before "BC")
  for (const bcText of allBcVariants) {
    if (input.startsWith(bcText, position)) {
      // Make year negative for BC
      if (dateComponents.year > 0) {
        dateComponents.year = -dateComponents.year + 1;
      }
      return { position: position + bcText.length };
    }
  }

  // Try AD/CE
  for (const adText of allAdVariants) {
    if (input.startsWith(adText, position)) {
      // Era doesn't change the year directly in our implementation
      // This is mainly for validation
      return { position: position + adText.length };
    }
  }

  return null;
};