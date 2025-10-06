import { Parser } from "../../../types";

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

    if (token === "MM" && monthStr.length !== 2) return null;

    const month = parseInt(monthStr, 10);
    if (month < 1 || month > 12) return null;

    dateComponents.month = month - 1; // Convert to 0-based index
    return { position: position + monthStr.length };
  }

  // Handle text month formats (MMM, MMMM, MMMMM)
  if (locale && (token === "MMM" || token === "MMMM" || token === "MMMMM")) {
    const width = token === "MMM" ? "abbreviated" : token === "MMMM" ? "wide" : "narrow";

    // Try to match each month
    for (let monthIndex = 0; monthIndex < 12; monthIndex++) {
      const monthName = locale.month(monthIndex, { width });
      if (input.startsWith(monthName, position)) {
        dateComponents.month = monthIndex;
        return { position: position + monthName.length };
      }
    }
  } else if (token === "MMM" || token === "MMMM" || token === "MMMMM") {
    // Fallback to English month names
    const months = {
      MMM: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      MMMM: [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ],
      MMMMM: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
    };

    const monthList = months[token as keyof typeof months];
    for (let monthIndex = 0; monthIndex < 12; monthIndex++) {
      const monthName = monthList[monthIndex];
      if (input.startsWith(monthName, position)) {
        dateComponents.month = monthIndex;
        return { position: position + monthName.length };
      }
    }
  }

  return null;
};