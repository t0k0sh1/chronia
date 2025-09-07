import { Formatter } from "../types";

export const formatEra: Formatter = (date, token) => {
  const rawYear = date.getFullYear();
  const era = rawYear > 0 ? "AD" : "BC";
  return era; // token "G"
};
