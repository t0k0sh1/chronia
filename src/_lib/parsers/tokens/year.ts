import { Parser } from "../../../types";

export const parseYear: Parser = (input, position, token, _localize, dateComponents) => {
  let yearStr = "";

  if (token === "y") {
    // Variable length year - read all consecutive digits
    while (position + yearStr.length < input.length) {
      const char = input[position + yearStr.length];
      if (!/\d/.test(char)) break;
      yearStr += char;
    }
  } else if (token === "yyyy") {
    // Four-digit year, but allow less for years like "1 AD"
    while (yearStr.length < 4 && position + yearStr.length < input.length) {
      const char = input[position + yearStr.length];
      if (!/\d/.test(char)) break;
      yearStr += char;
    }
  } else {
    // Fixed length patterns
    const length = token.length;
    for (let i = 0; i < length && position + i < input.length; i++) {
      const char = input[position + i];
      if (!/\d/.test(char)) {
        if (i === 0) return null; // No digits found
        break;
      }
      yearStr += char;
    }
  }

  if (yearStr.length === 0) return null;

  let year = parseInt(yearStr, 10);

  // Handle different year formats
  switch (token) {
    case "yy":
      // Two-digit year - interpret as 20XX or 19XX
      if (yearStr.length !== 2) return null;
      year = year >= 50 ? 1900 + year : 2000 + year;
      break;
    case "yyyy":
      // Four-digit year or less (for years like "1 AD")
      if (yearStr.length === 0 || yearStr.length > 4) return null;
      break;
    case "yyy":
      // Three-digit year (rare)
      if (yearStr.length !== 3) return null;
      break;
    case "y":
      // Variable length year - no modification needed, use as-is
      break;
    default:
      // For repeated patterns like "yyyyy", expect exact length
      if (yearStr.length !== token.length) return null;
  }

  dateComponents.year = year;
  return { position: position + yearStr.length };
};