import { Parser } from "../../../types";

function getDaysInMonth(year: number, month: number): number {
  const date = new Date(year, month + 1, 0);
  return date.getDate();
}

export const parseDayOfYear: Parser = (input, position, token, _locale, dateComponents) => {
  const maxLength = token.length <= 3 ? 3 : token.length;
  let dayStr = "";

  for (let i = 0; i < maxLength && position + i < input.length; i++) {
    const char = input[position + i];
    if (!/\d/.test(char)) {
      if (i === 0) return null;
      break;
    }
    dayStr += char;
  }

  if (dayStr.length === 0) return null;

  // For DD and DDD tokens, require exact length
  if (token === "DD" && dayStr.length !== 2) return null;
  if (token === "DDD" && dayStr.length !== 3) return null;

  const dayOfYear = parseInt(dayStr, 10);
  if (dayOfYear < 1) return null;

  // Check if the day of year is valid for the given year
  const isLeapYear = new Date(dateComponents.year, 1, 29).getDate() === 29;
  const maxDaysInYear = isLeapYear ? 366 : 365;
  if (dayOfYear > maxDaysInYear) return null;

  // Calculate month and day from day of year
  let remainingDays = dayOfYear;
  let month = 0;

  while (month < 12) {
    const daysInMonth = getDaysInMonth(dateComponents.year, month);
    if (remainingDays <= daysInMonth) {
      break;
    }
    remainingDays -= daysInMonth;
    month++;
  }

  dateComponents.month = month;
  dateComponents.day = remainingDays;
  dateComponents._dayParsed = true;

  return { position: position + dayStr.length };
};;