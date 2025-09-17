import { Parser } from "../../../types";

export const parseMillisecond: Parser = (input, position, token, _locale, dateComponents) => {
  const length = token.length;
  let msStr = "";

  for (let i = 0; i < length && position + i < input.length; i++) {
    const char = input[position + i];
    if (!/\d/.test(char)) {
      if (i === 0) return null;
      break;
    }
    msStr += char;
  }

  if (msStr.length !== length) return null;

  let milliseconds = parseInt(msStr, 10);

  // Adjust based on token length
  switch (token) {
    case "S":
      // Single digit - multiply by 100 (e.g., 5 -> 500ms)
      milliseconds *= 100;
      break;
    case "SS":
      // Two digits - multiply by 10 (e.g., 50 -> 500ms)
      milliseconds *= 10;
      break;
    case "SSS":
      // Three digits - use as is
      break;
    default:
      return null;
  }

  dateComponents.milliseconds = milliseconds;
  return { position: position + msStr.length };
};