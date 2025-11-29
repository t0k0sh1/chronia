import { Formatter } from "../../../types";
import { getMonthName } from "../../localeHelpers";

export const formatMonth: Formatter = (date, token, locale) => {
  const month = date.getMonth(); // 0–11

  switch (token) {
    case "M":
    case "MM":
      return (month + 1).toString().padStart(token.length, "0");
    case "MMM":
      return getMonthName(locale, month, "abbr");
    case "MMMM":
      return getMonthName(locale, month, "wide");
    case "MMMMM":
      return getMonthName(locale, month, "narrow");
    default:
      return (month + 1).toString();
  }
};
