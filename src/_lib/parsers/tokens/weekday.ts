import { Parser } from "../../../types";
import { getWeekdayName } from "../../localeHelpers";

export const parseWeekday: Parser = (input, position, token, locale, _dateComponents) => {
  // Weekday parsing doesn't affect the date components directly
  // It's mainly for validation - ensuring the parsed weekday matches the date

  // Determine width based on token
  const widthMap: { [key: string]: "narrow" | "abbr" | "wide" } = {
    "E": "abbr",
    "EE": "abbr",
    "EEE": "abbr",
    "EEEE": "wide",
    "EEEEE": "narrow",
  };

  // Use default width "abbr" for unknown tokens when locale is provided
  // Return null for unknown tokens when locale is not provided
  const width = widthMap[token] || (locale ? "abbr" : undefined);

  // Return null for unsupported tokens when no locale
  if (!width) {
    return null;
  }

  // Try to match each weekday
  for (let weekdayIndex = 0; weekdayIndex < 7; weekdayIndex++) {
    const weekdayName = getWeekdayName(locale, weekdayIndex, width);
    if (input.startsWith(weekdayName, position)) {
      // We don't set the date based on weekday, just validate it matches
      return { position: position + weekdayName.length };
    }
  }

  return null;
};