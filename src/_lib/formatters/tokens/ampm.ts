import { Formatter } from "../../types";

export const formatAmPm: Formatter = (date, token) => {
  const ampm = date.getHours() < 12 ? "AM" : "PM";
  return ampm; // token "a"
};
