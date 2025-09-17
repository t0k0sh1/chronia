import { Parser } from "../../../types";

export const parseDayPeriod: Parser = (input, position, token, locale, dateComponents) => {
  if (locale) {
    // Try AM - check longer strings first
    const amVariants = [
      locale.dayPeriod("am", { width: "wide" }),
      locale.dayPeriod("am", { width: "abbreviated" }),
      locale.dayPeriod("am", { width: "narrow" }),
    ].sort((a, b) => b.length - a.length); // Sort by length descending

    for (const amText of amVariants) {
      if (input.startsWith(amText, position)) {
        dateComponents.isPM = false;
        return { position: position + amText.length };
      }
    }

    // Try PM - check longer strings first
    const pmVariants = [
      locale.dayPeriod("pm", { width: "wide" }),
      locale.dayPeriod("pm", { width: "abbreviated" }),
      locale.dayPeriod("pm", { width: "narrow" }),
    ].sort((a, b) => b.length - a.length); // Sort by length descending

    for (const pmText of pmVariants) {
      if (input.startsWith(pmText, position)) {
        dateComponents.isPM = true;
        return { position: position + pmText.length };
      }
    }
  }

  // Fallback to English AM/PM
  const upperInput = input.slice(position, position + 2).toUpperCase();
  if (upperInput === "AM") {
    dateComponents.isPM = false;
    return { position: position + 2 };
  } else if (upperInput === "PM") {
    dateComponents.isPM = true;
    return { position: position + 2 };
  }

  // Try single letter
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