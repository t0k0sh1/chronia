import { Parser } from "../../../types";
import { getDayPeriod } from "../../localeHelpers";

export const parseDayPeriod: Parser = (input, position, token, locale, dateComponents) => {
  // Try AM - check longer strings first
  const amVariants = [
    getDayPeriod(locale, "am", "wide"),
    getDayPeriod(locale, "am", "abbr"),
    getDayPeriod(locale, "am", "narrow"),
  ].sort((a, b) => b.length - a.length); // Sort by length descending

  for (const amText of amVariants) {
    if (input.startsWith(amText, position)) {
      dateComponents.isPM = false;
      return { position: position + amText.length };
    }
  }

  // Try PM - check longer strings first
  const pmVariants = [
    getDayPeriod(locale, "pm", "wide"),
    getDayPeriod(locale, "pm", "abbr"),
    getDayPeriod(locale, "pm", "narrow"),
  ].sort((a, b) => b.length - a.length); // Sort by length descending

  for (const pmText of pmVariants) {
    if (input.startsWith(pmText, position)) {
      dateComponents.isPM = true;
      return { position: position + pmText.length };
    }
  }

  // Fallback to English AM/PM (case-insensitive)
  const upperInput = input.slice(position, position + 2).toUpperCase();
  if (upperInput === "AM") {
    dateComponents.isPM = false;
    return { position: position + 2 };
  } else if (upperInput === "PM") {
    dateComponents.isPM = true;
    return { position: position + 2 };
  }

  // Try single letter (case-insensitive)
  const singleChar = input[position]?.toUpperCase();
  if (singleChar === "A") {
    dateComponents.isPM = false;
    return { position: position + 1 };
  } else if (singleChar === "P") {
    dateComponents.isPM = true;
    return { position: position + 1 };
  }

  return null;
};