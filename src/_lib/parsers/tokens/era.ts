import { Parser } from "../../../types";

export const parseEra: Parser = (input, position, token, locale, dateComponents) => {
  if (locale) {
    // Try AD/CE (era = 1) - check longer strings first
    const adVariants = [
      locale.era(1, { width: "wide" }),
      locale.era(1, { width: "abbreviated" }),
      locale.era(1, { width: "narrow" }),
    ].sort((a, b) => b.length - a.length); // Sort by length descending

    for (const adText of adVariants) {
      if (input.startsWith(adText, position)) {
        // Era doesn't change the year directly in our implementation
        // This is mainly for validation
        return { position: position + adText.length };
      }
    }

    // Try BC/BCE (era = 0) - check longer strings first
    const bcVariants = [
      locale.era(0, { width: "wide" }),
      locale.era(0, { width: "abbreviated" }),
      locale.era(0, { width: "narrow" }),
    ].sort((a, b) => b.length - a.length); // Sort by length descending

    for (const bcText of bcVariants) {
      if (input.startsWith(bcText, position)) {
        // Make year negative for BC
        if (dateComponents.year > 0) {
          dateComponents.year = -dateComponents.year + 1;
        }
        return { position: position + bcText.length };
      }
    }
  }

  // Fallback to English AD/BC
  // Support both uppercase and mixed case
  const substr = input.slice(position, position + 3).toUpperCase();

  if (substr.startsWith("AD") || substr.startsWith("CE")) {
    const len = substr.startsWith("CE") ? 2 : 2;
    return { position: position + len };
  } else if (substr.startsWith("BC")) {
    const len = substr === "BCE" ? 3 : 2;
    if (dateComponents.year > 0) {
      dateComponents.year = -dateComponents.year + 1;
    }
    return { position: position + len };
  }

  // Try single letter
  const singleChar = input[position]?.toUpperCase();
  if (singleChar === "A") {
    return { position: position + 1 };
  } else if (singleChar === "B") {
    if (dateComponents.year > 0) {
      dateComponents.year = -dateComponents.year + 1;
    }
    return { position: position + 1 };
  }

  return null;
};