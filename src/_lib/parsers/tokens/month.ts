import { Parser } from "../../../types";
import { getMonthName } from "../../localeHelpers";

export const parseMonth: Parser = (input, position, token, locale, dateComponents) => {
  // Handle numeric month formats
  if (token === "M" || token === "MM") {
    let monthStr = "";
    const maxLength = token === "M" ? 2 : 2;

    for (let i = 0; i < maxLength && position + i < input.length; i++) {
      const char = input[position + i];
      if (!/\d/.test(char)) {
        if (i === 0) return null;
        break;
      }
      monthStr += char;
    }

    if (monthStr.length === 0) return null;
    if (token === "MM" && monthStr.length !== 2) return null;

    const month = parseInt(monthStr, 10);
    if (month < 1 || month > 12) return null;

    dateComponents.month = month - 1; // Convert to 0-based index
    // Reset day to 1 only if day wasn't explicitly parsed
    if (!dateComponents._dayParsed) {
      dateComponents.day = 1;
    }
    return { position: position + monthStr.length };
  }

  // Handle text month formats (MMM, MMMM, MMMMM)
  if (token === "MMM" || token === "MMMM" || token === "MMMMM") {
    const width = token === "MMM" ? "abbr" : token === "MMMM" ? "wide" : "narrow";

    // Try to match each month (case-insensitive)
    for (let monthIndex = 0; monthIndex < 12; monthIndex++) {
      const monthName = getMonthName(locale, monthIndex, width);
      const inputSlice = input.slice(position, position + monthName.length);
      if (inputSlice.toLowerCase() === monthName.toLowerCase()) {
        dateComponents.month = monthIndex;
        // Reset day to 1 only if day wasn't explicitly parsed
        if (!dateComponents._dayParsed) {
          dateComponents.day = 1;
        }
        return { position: position + monthName.length };
      }
    }
  }

  return null;
};;