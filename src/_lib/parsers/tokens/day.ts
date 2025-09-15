import { Parser } from "../../../types";

export const parseDay: Parser = (input, position, token, _localize, dateComponents) => {
  let dayStr = "";
  const maxLength = token === "d" ? 2 : 2;

  for (let i = 0; i < maxLength && position + i < input.length; i++) {
    const char = input[position + i];
    if (!/\d/.test(char)) {
      if (i === 0) return null;
      break;
    }
    dayStr += char;
  }

  if (dayStr.length === 0) return null;
  if (token === "dd" && dayStr.length !== 2) return null;

  const day = parseInt(dayStr, 10);
  if (day < 1 || day > 31) return null;

  dateComponents.day = day;
  return { position: position + dayStr.length };
};