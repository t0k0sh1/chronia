import { describe, it, expect } from "vitest";
import { parseMonth } from "../../../../src/_lib/parsers/tokens/month";
import { DateComponents, Locale } from "../../../../src/types";

describe("parseMonth", () => {
  const createDateComponents = (): DateComponents => ({
    year: 2000,
    month: 0,
    day: 1,
    hours: 0,
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
    isPM: false,
    hours12: null,
  });

  const mockLocale: Locale = {
    era: {
      narrow: ["B", "A"],
      abbr: ["BC", "AD"],
      wide: ["Before Christ", "Anno Domini"],
    },
    month: {
      narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
      abbr: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      wide: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
    },
    weekday: {
      narrow: ["S", "M", "T", "W", "T", "F", "S"],
      abbr: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      wide: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
    },
    dayPeriod: {
      narrow: ["a", "p"],
      abbr: ["AM", "PM"],
      wide: ["AM (morning)", "PM (afternoon)"],
    },
  };

  describe("happy path", () => {
    it("should parse single-digit month '1' with 'M' pattern (January)", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseMonth("1", 0, "M", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(1);
      expect(dateComponents.month).toBe(0); // January = month 0
    });

    it("should parse single-digit month '2' with 'M' pattern (February)", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseMonth("2", 0, "M", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(1);
      expect(dateComponents.month).toBe(1); // February = month 1
    });

    it("should parse single-digit month '9' with 'M' pattern (September)", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseMonth("9", 0, "M", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(1);
      expect(dateComponents.month).toBe(8); // September = month 8
    });

    it("should parse double-digit month '12' with 'M' pattern (December)", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseMonth("12", 0, "M", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(2);
      expect(dateComponents.month).toBe(11); // December = month 11
    });

    it("should parse two-digit month '01' with 'MM' pattern (January)", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseMonth("01", 0, "MM", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(2);
      expect(dateComponents.month).toBe(0); // January = month 0
    });

    it("should parse two-digit month '02' with 'MM' pattern (February)", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseMonth("02", 0, "MM", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(2);
      expect(dateComponents.month).toBe(1); // February = month 1
    });

    it("should parse two-digit month '12' with 'MM' pattern (December)", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseMonth("12", 0, "MM", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(2);
      expect(dateComponents.month).toBe(11); // December = month 11
    });

    it("should parse English abbreviated 'Jan' with 'MMM' pattern", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseMonth("Jan", 0, "MMM", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(3);
      expect(dateComponents.month).toBe(0); // January = month 0
    });

    it("should parse English abbreviated 'Feb' with 'MMM' pattern", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseMonth("Feb", 0, "MMM", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(3);
      expect(dateComponents.month).toBe(1); // February = month 1
    });

    it("should parse English abbreviated 'Mar' with 'MMM' pattern", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseMonth("Mar", 0, "MMM", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(3);
      expect(dateComponents.month).toBe(2); // March = month 2
    });

    it("should parse English abbreviated 'Apr' with 'MMM' pattern", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseMonth("Apr", 0, "MMM", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(3);
      expect(dateComponents.month).toBe(3); // April = month 3
    });

    it("should parse English abbreviated 'May' with 'MMM' pattern", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseMonth("May", 0, "MMM", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(3);
      expect(dateComponents.month).toBe(4); // May = month 4
    });

    it("should parse English abbreviated 'Jun' with 'MMM' pattern", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseMonth("Jun", 0, "MMM", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(3);
      expect(dateComponents.month).toBe(5); // June = month 5
    });

    it("should parse English abbreviated 'Jul' with 'MMM' pattern", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseMonth("Jul", 0, "MMM", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(3);
      expect(dateComponents.month).toBe(6); // July = month 6
    });

    it("should parse English abbreviated 'Aug' with 'MMM' pattern", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseMonth("Aug", 0, "MMM", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(3);
      expect(dateComponents.month).toBe(7); // August = month 7
    });

    it("should parse English abbreviated 'Sep' with 'MMM' pattern", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseMonth("Sep", 0, "MMM", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(3);
      expect(dateComponents.month).toBe(8); // September = month 8
    });

    it("should parse English abbreviated 'Oct' with 'MMM' pattern", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseMonth("Oct", 0, "MMM", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(3);
      expect(dateComponents.month).toBe(9); // October = month 9
    });

    it("should parse English abbreviated 'Nov' with 'MMM' pattern", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseMonth("Nov", 0, "MMM", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(3);
      expect(dateComponents.month).toBe(10); // November = month 10
    });

    it("should parse English abbreviated 'Dec' with 'MMM' pattern", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseMonth("Dec", 0, "MMM", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(3);
      expect(dateComponents.month).toBe(11); // December = month 11
    });

    it("should parse English wide 'January' with 'MMMM' pattern", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseMonth("January", 0, "MMMM", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(7);
      expect(dateComponents.month).toBe(0); // January = month 0
    });

    it("should parse English wide 'February' with 'MMMM' pattern", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseMonth("February", 0, "MMMM", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(8);
      expect(dateComponents.month).toBe(1); // February = month 1
    });

    it("should parse English wide 'March' with 'MMMM' pattern", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseMonth("March", 0, "MMMM", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(5);
      expect(dateComponents.month).toBe(2); // March = month 2
    });

    it("should parse English wide 'April' with 'MMMM' pattern", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseMonth("April", 0, "MMMM", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(5);
      expect(dateComponents.month).toBe(3); // April = month 3
    });

    it("should parse English wide 'May' with 'MMMM' pattern", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseMonth("May", 0, "MMMM", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(3);
      expect(dateComponents.month).toBe(4); // May = month 4
    });

    it("should parse English wide 'June' with 'MMMM' pattern", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseMonth("June", 0, "MMMM", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(4);
      expect(dateComponents.month).toBe(5); // June = month 5
    });

    it("should parse English wide 'July' with 'MMMM' pattern", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseMonth("July", 0, "MMMM", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(4);
      expect(dateComponents.month).toBe(6); // July = month 6
    });

    it("should parse English wide 'August' with 'MMMM' pattern", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseMonth("August", 0, "MMMM", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(6);
      expect(dateComponents.month).toBe(7); // August = month 7
    });

    it("should parse English wide 'September' with 'MMMM' pattern", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseMonth("September", 0, "MMMM", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(9);
      expect(dateComponents.month).toBe(8); // September = month 8
    });

    it("should parse English wide 'October' with 'MMMM' pattern", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseMonth("October", 0, "MMMM", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(7);
      expect(dateComponents.month).toBe(9); // October = month 9
    });

    it("should parse English wide 'November' with 'MMMM' pattern", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseMonth("November", 0, "MMMM", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(8);
      expect(dateComponents.month).toBe(10); // November = month 10
    });

    it("should parse English wide 'December' with 'MMMM' pattern", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseMonth("December", 0, "MMMM", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(8);
      expect(dateComponents.month).toBe(11); // December = month 11
    });

    it("should parse English narrow 'J' for January with 'MMMMM' pattern", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseMonth("J", 0, "MMMMM", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(1);
      expect(dateComponents.month).toBe(0); // January = month 0
    });

    it("should parse English narrow 'F' for February with 'MMMMM' pattern", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseMonth("F", 0, "MMMMM", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(1);
      expect(dateComponents.month).toBe(1); // February = month 1
    });

    it("should parse English narrow 'M' for March with 'MMMMM' pattern", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseMonth("M", 0, "MMMMM", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(1);
      expect(dateComponents.month).toBe(2); // March = month 2
    });

    it("should parse English narrow 'A' for April with 'MMMMM' pattern", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseMonth("A", 0, "MMMMM", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(1);
      expect(dateComponents.month).toBe(3); // April = month 3
    });

    it("should parse English narrow 'D' for December with 'MMMMM' pattern", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseMonth("D", 0, "MMMMM", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(1);
      expect(dateComponents.month).toBe(11); // December = month 11
    });

    it("should parse localized abbreviated 'Jan' with 'MMM' pattern", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseMonth("Jan", 0, "MMM", mockLocale, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(3);
      expect(dateComponents.month).toBe(0); // January = month 0
    });

    it("should parse localized abbreviated 'Feb' with 'MMM' pattern", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseMonth("Feb", 0, "MMM", mockLocale, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(3);
      expect(dateComponents.month).toBe(1); // February = month 1
    });

    it("should parse localized abbreviated 'Dec' with 'MMM' pattern", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseMonth("Dec", 0, "MMM", mockLocale, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(3);
      expect(dateComponents.month).toBe(11); // December = month 11
    });

    it("should parse localized wide 'January' with 'MMMM' pattern", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseMonth("January", 0, "MMMM", mockLocale, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(7);
      expect(dateComponents.month).toBe(0); // January = month 0
    });

    it("should parse localized wide 'February' with 'MMMM' pattern", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseMonth("February", 0, "MMMM", mockLocale, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(8);
      expect(dateComponents.month).toBe(1); // February = month 1
    });

    it("should parse localized wide 'December' with 'MMMM' pattern", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseMonth("December", 0, "MMMM", mockLocale, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(8);
      expect(dateComponents.month).toBe(11); // December = month 11
    });

    it("should parse localized narrow 'J' for January with 'MMMMM' pattern", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseMonth("J", 0, "MMMMM", mockLocale, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(1);
      expect(dateComponents.month).toBe(0); // January = month 0
    });

    it("should parse localized narrow 'F' for February with 'MMMMM' pattern", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseMonth("F", 0, "MMMMM", mockLocale, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(1);
      expect(dateComponents.month).toBe(1); // February = month 1
    });

    it("should parse at different position in string", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseMonth("abc05def", 3, "MM", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(5);
      expect(dateComponents.month).toBe(4); // May = month 4
    });
  });

  describe("edge cases", () => {
    it("should stop at non-digit for 'M' pattern", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseMonth("1x", 0, "M", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(1);
      expect(dateComponents.month).toBe(0); // January = month 0
    });

    it("should prefer longer matches first (March over Mar)", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act - "March" should match before "Mar"
      const result = parseMonth("March", 0, "MMMM", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(5);
      expect(dateComponents.month).toBe(2); // March = month 2
    });

    it("should handle end of string correctly", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseMonth("Dec", 0, "MMM", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(3);
      expect(dateComponents.month).toBe(11); // December = month 11
    });

    it("should parse case-insensitive 'jan' (lowercase) with 'MMM' pattern", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseMonth("jan", 0, "MMM", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(3);
      expect(dateComponents.month).toBe(0); // January = month 0
    });

    it("should parse case-insensitive 'JAN' (uppercase) with 'MMM' pattern", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseMonth("JAN", 0, "MMM", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(3);
      expect(dateComponents.month).toBe(0); // January = month 0
    });

    it("should parse case-insensitive 'Jan' (mixed case) with 'MMM' pattern", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseMonth("Jan", 0, "MMM", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(3);
      expect(dateComponents.month).toBe(0); // January = month 0
    });

    it("should parse case-insensitive 'feb' (lowercase) with 'MMM' pattern", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseMonth("feb", 0, "MMM", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(3);
      expect(dateComponents.month).toBe(1); // February = month 1
    });

    it("should parse case-insensitive 'FEB' (uppercase) with 'MMM' pattern", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseMonth("FEB", 0, "MMM", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(3);
      expect(dateComponents.month).toBe(1); // February = month 1
    });

    it("should parse case-insensitive 'dec' (lowercase) with 'MMM' pattern", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseMonth("dec", 0, "MMM", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(3);
      expect(dateComponents.month).toBe(11); // December = month 11
    });

    it("should parse case-insensitive 'DEC' (uppercase) with 'MMM' pattern", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseMonth("DEC", 0, "MMM", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(3);
      expect(dateComponents.month).toBe(11); // December = month 11
    });

    it("should parse case-insensitive 'january' (lowercase) with 'MMMM' pattern", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseMonth("january", 0, "MMMM", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(7);
      expect(dateComponents.month).toBe(0); // January = month 0
    });

    it("should parse case-insensitive 'JANUARY' (uppercase) with 'MMMM' pattern", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseMonth("JANUARY", 0, "MMMM", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(7);
      expect(dateComponents.month).toBe(0); // January = month 0
    });

    it("should parse case-insensitive 'January' (mixed case) with 'MMMM' pattern", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseMonth("January", 0, "MMMM", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(7);
      expect(dateComponents.month).toBe(0); // January = month 0
    });

    it("should parse case-insensitive 'february' (lowercase) with 'MMMM' pattern", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseMonth("february", 0, "MMMM", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(8);
      expect(dateComponents.month).toBe(1); // February = month 1
    });

    it("should parse case-insensitive 'FEBRUARY' (uppercase) with 'MMMM' pattern", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseMonth("FEBRUARY", 0, "MMMM", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(8);
      expect(dateComponents.month).toBe(1); // February = month 1
    });

    it("should parse case-insensitive 'december' (lowercase) with 'MMMM' pattern", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseMonth("december", 0, "MMMM", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(8);
      expect(dateComponents.month).toBe(11); // December = month 11
    });

    it("should parse case-insensitive 'DECEMBER' (uppercase) with 'MMMM' pattern", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseMonth("DECEMBER", 0, "MMMM", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(8);
      expect(dateComponents.month).toBe(11); // December = month 11
    });

    it("should parse case-insensitive 'j' (lowercase) for January with 'MMMMM' pattern", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseMonth("j", 0, "MMMMM", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(1);
      expect(dateComponents.month).toBe(0); // January = month 0
    });

    it("should parse case-insensitive 'J' (uppercase) for January with 'MMMMM' pattern", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseMonth("J", 0, "MMMMM", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(1);
      expect(dateComponents.month).toBe(0); // January = month 0
    });

    it("should parse case-insensitive 'f' (lowercase) for February with 'MMMMM' pattern", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseMonth("f", 0, "MMMMM", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(1);
      expect(dateComponents.month).toBe(1); // February = month 1
    });

    it("should parse case-insensitive 'F' (uppercase) for February with 'MMMMM' pattern", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseMonth("F", 0, "MMMMM", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(1);
      expect(dateComponents.month).toBe(1); // February = month 1
    });

    it("should parse case-insensitive 'd' (lowercase) for December with 'MMMMM' pattern", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseMonth("d", 0, "MMMMM", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(1);
      expect(dateComponents.month).toBe(11); // December = month 11
    });

    it("should parse case-insensitive 'D' (uppercase) for December with 'MMMMM' pattern", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseMonth("D", 0, "MMMMM", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(1);
      expect(dateComponents.month).toBe(11); // December = month 11
    });

    it("should parse localized month names case-insensitively", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseMonth("jan", 0, "MMM", mockLocale, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(3);
      expect(dateComponents.month).toBe(0); // January = month 0
    });
  });

  describe("invalid inputs", () => {
    it("should return null for month 0 (invalid) with 'M' pattern", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseMonth("0", 0, "M", undefined, dateComponents);

      // Assert
      expect(result).toBeNull();
    });

    it("should return null for month 13 (out of range) with 'M' pattern", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseMonth("13", 0, "M", undefined, dateComponents);

      // Assert
      expect(result).toBeNull();
    });

    it("should return null for month 99 (out of range) with 'M' pattern", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseMonth("99", 0, "M", undefined, dateComponents);

      // Assert
      expect(result).toBeNull();
    });

    it("should return null for no digits with 'M' pattern", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseMonth("abc", 0, "M", undefined, dateComponents);

      // Assert
      expect(result).toBeNull();
    });

    it("should return null for 'MM' pattern with single digit", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseMonth("1", 0, "MM", undefined, dateComponents);

      // Assert
      expect(result).toBeNull();
    });

    it("should return null for 'MM' pattern with month 00 (invalid)", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseMonth("00", 0, "MM", undefined, dateComponents);

      // Assert
      expect(result).toBeNull();
    });

    it("should return null for 'MM' pattern with month 13 (invalid)", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseMonth("13", 0, "MM", undefined, dateComponents);

      // Assert
      expect(result).toBeNull();
    });

    it("should return null for 'MM' pattern with non-digits", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseMonth("a1", 0, "MM", undefined, dateComponents);

      // Assert
      expect(result).toBeNull();
    });

    it("should return null for unrecognized month name 'Xyz' with 'MMM' pattern", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseMonth("Xyz", 0, "MMM", undefined, dateComponents);

      // Assert
      expect(result).toBeNull();
    });

    it("should return null for numeric input '123' with 'MMM' pattern", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseMonth("123", 0, "MMM", undefined, dateComponents);

      // Assert
      expect(result).toBeNull();
    });

    it("should return null for empty numeric string with 'M' pattern", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseMonth("abc", 0, "M", undefined, dateComponents);

      // Assert
      expect(result).toBeNull();
    });

    it("should return null when locale text format doesn't match", () => {
      // Arrange
      const chineseLocale: Locale = {
        era: {
          narrow: ["前", "公"],
          abbr: ["公元前", "公元"],
          wide: ["公元前", "公元"],
        },
        month: {
          narrow: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
          abbr: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
          wide: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
        },
        weekday: {
          narrow: ["日", "一", "二", "三", "四", "五", "六"],
          abbr: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
          wide: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
        },
        dayPeriod: {
          narrow: ["上", "下"],
          abbr: ["上午", "下午"],
          wide: ["上午", "下午"],
        },
      };
      const dateComponents = createDateComponents();

      // Act
      const result = parseMonth("January", 0, "MMMM", chineseLocale, dateComponents);

      // Assert
      expect(result).toBeNull();
    });

    it("should return null for empty string", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseMonth("", 0, "M", undefined, dateComponents);

      // Assert
      expect(result).toBeNull();
    });
  });
});
