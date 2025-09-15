import { Parser } from "../../../types";

export const parseWeekday: Parser = (input, position, token, localize, _dateComponents) => {
  // Weekday parsing doesn't affect the date components directly
  // It's mainly for validation - ensuring the parsed weekday matches the date

  if (localize) {
    const widthMap: { [key: string]: "narrow" | "abbreviated" | "wide" } = {
      "E": "abbreviated",
      "EE": "abbreviated",
      "EEE": "abbreviated",
      "EEEE": "wide",
      "EEEEE": "narrow",
    };

    const width = widthMap[token] || "abbreviated";

    // Try to match each weekday
    for (let weekdayIndex = 0; weekdayIndex < 7; weekdayIndex++) {
      const weekdayName = localize.weekday(weekdayIndex, { width });
      if (input.startsWith(weekdayName, position)) {
        // We don't set the date based on weekday, just validate it matches
        return { position: position + weekdayName.length };
      }
    }
  }

  // Fallback to English weekday names
  const weekdayFormats: { [key: string]: string[] } = {
    "E": ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    "EE": ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    "EEE": ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    "EEEE": ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    "EEEEE": ["S", "M", "T", "W", "T", "F", "S"],
  };

  const weekdays = weekdayFormats[token];
  if (weekdays) {
    for (const weekdayName of weekdays) {
      if (input.startsWith(weekdayName, position)) {
        return { position: position + weekdayName.length };
      }
    }
  }

  return null;
};