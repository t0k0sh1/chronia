import { Parser } from "../../../types";

export const parseSecond: Parser = (input, position, token, _locale, dateComponents) => {
  let secondStr = "";
  const maxLength = 2;

  for (let i = 0; i < maxLength && position + i < input.length; i++) {
    const char = input[position + i];
    if (!/\d/.test(char)) {
      if (i === 0) return null;
      break;
    }
    secondStr += char;
  }

  if (secondStr.length === 0) return null;
  if (token === "ss" && secondStr.length !== 2) return null;

  const second = parseInt(secondStr, 10);
  if (second < 0 || second > 59) return null;

  dateComponents.seconds = second;
  return { position: position + secondStr.length };
};