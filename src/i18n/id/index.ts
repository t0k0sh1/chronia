import { Locale } from "../../types";

/**
 * Indonesian locale data.
 *
 * Note: Indonesian uses Latin script with Western-influenced month and
 * weekday names. Era uses "Sebelum Masehi" (Before Christ) and "Masehi"
 * (Common Era/AD).
 */
export const id: Locale = {
  era: {
    // Narrow: SM (Sebelum Masehi), M (Masehi)
    narrow: ["SM", "M"] as const,
    // Abbreviated: same as narrow
    abbr: ["SM", "M"] as const,
    // Wide: full forms
    wide: ["Sebelum Masehi", "Masehi"] as const,
  },

  month: {
    // Narrow: first letter of each month
    narrow: [
      "J",
      "F",
      "M",
      "A",
      "M",
      "J",
      "J",
      "A",
      "S",
      "O",
      "N",
      "D",
    ] as const,
    // Abbreviated: 3-letter abbreviations
    abbr: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "Mei",
      "Jun",
      "Jul",
      "Agt",
      "Sep",
      "Okt",
      "Nov",
      "Des",
    ] as const,
    // Wide: full Indonesian month names
    wide: [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ] as const,
  },

  weekday: {
    // Narrow: first letter (M for Minggu/Sunday)
    narrow: ["M", "S", "S", "R", "K", "J", "S"] as const,
    // Abbreviated: 3-letter abbreviations
    abbr: ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"] as const,
    // Wide: full Indonesian day names
    wide: [
      "Minggu",
      "Senin",
      "Selasa",
      "Rabu",
      "Kamis",
      "Jumat",
      "Sabtu",
    ] as const,
  },

  dayPeriod: {
    // Narrow: AM/PM (international standard)
    narrow: ["AM", "PM"] as const,
    // Abbreviated: same as narrow
    abbr: ["AM", "PM"] as const,
    // Wide: same (Indonesian commonly uses AM/PM)
    wide: ["AM", "PM"] as const,
  },
};
