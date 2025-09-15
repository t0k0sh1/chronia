import { Parser } from "../../../types";

export const parseHour12: Parser = (input, position, token, _localize, dateComponents) => {
  let hourStr = "";
  const maxLength = 2;

  for (let i = 0; i < maxLength && position + i < input.length; i++) {
    const char = input[position + i];
    if (!/\d/.test(char)) {
      if (i === 0) return null;
      break;
    }
    hourStr += char;
  }

  if (hourStr.length === 0) return null;
  if (token === "hh" && hourStr.length !== 2) return null;

  const hour = parseInt(hourStr, 10);
  if (hour < 1 || hour > 12) return null;

  dateComponents.hours12 = hour;
  return { position: position + hourStr.length };
};