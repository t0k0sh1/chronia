import { Parser } from "../../../types";

export const parseMinute: Parser = (input, position, token, _locale, dateComponents) => {
  let minuteStr = "";
  const maxLength = 2;

  for (let i = 0; i < maxLength && position + i < input.length; i++) {
    const char = input[position + i];
    if (!/\d/.test(char)) {
      if (i === 0) return null;
      break;
    }
    minuteStr += char;
  }

  if (minuteStr.length === 0) return null;
  if (token === "mm" && minuteStr.length !== 2) return null;

  const minute = parseInt(minuteStr, 10);
  if (minute < 0 || minute > 59) return null;

  dateComponents.minutes = minute;
  return { position: position + minuteStr.length };
};