import { Formatter } from "../../../types";

export const formatMonth: Formatter = (date, token, locale) => {
  const month = date.getMonth(); // 0–11

  if (locale) {
    switch (token) {
      case "M":
      case "MM":
        return (month + 1).toString().padStart(token.length, "0");
      case "MMM":
        return locale.month(month, { width: "abbreviated" });
      case "MMMM":
        return locale.month(month, { width: "wide" });
      case "MMMMM":
        return locale.month(month, { width: "narrow" });
    }
  }

  // fallback
  switch (token) {
    case "MM":
      return (month + 1).toString().padStart(2, "0");
    case "M":
    default:
      return (month + 1).toString();
  }
};
