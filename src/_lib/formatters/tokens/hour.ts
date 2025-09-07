import { Formatter } from "../types";

export const formatHour: Formatter = (date, token) => {
  const hours24 = date.getHours();
  const hours12 = hours24 % 12 === 0 ? 12 : hours24 % 12;

  switch (token) {
    // 24時間制
    case "HH":
      return String(hours24).padStart(2, "0");
    case "H":
      return String(hours24);
    // 12時間制
    case "hh":
      return String(hours12).padStart(2, "0");
    case "h":
      return String(hours12);
    default:
      return String(hours24);
  }
};
