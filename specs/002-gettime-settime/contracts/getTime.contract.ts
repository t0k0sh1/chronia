/**
 * Contract specification for getTime function
 * This file defines the expected behavior and interface for the getTime utility function
 */

// Function Contract
export interface GetTimeContract {
  /**
   * Extract timestamp value from a Date object.
   *
   * @param date - The Date object to extract timestamp from
   * @returns The number of milliseconds since Unix epoch, or NaN for invalid dates
   */
  (date: Date): number;
}

// Behavioral Contracts
export const GetTimeBehaviorContracts = {
  /**
   * Valid Date objects
   */
  validDates: {
    description: "Returns timestamp for valid Date objects",
    examples: [
      {
        input: new Date('2024-01-01T00:00:00.000Z'),
        expectedOutput: 1704067200000,
        description: "ISO date string"
      },
      {
        input: new Date(2024, 0, 1), // Year, month (0-indexed), day
        expectedOutput: expect.any(Number),
        description: "Date constructor with numbers"
      },
      {
        input: new Date(1704067200000),
        expectedOutput: 1704067200000,
        description: "Date from timestamp"
      }
    ]
  },

  /**
   * Invalid Date objects
   */
  invalidDates: {
    description: "Returns NaN for invalid Date objects",
    examples: [
      {
        input: new Date('invalid-date-string'),
        expectedOutput: NaN,
        description: "Invalid date string"
      },
      {
        input: new Date(NaN),
        expectedOutput: NaN,
        description: "Date constructed with NaN"
      },
      {
        input: new Date('2024-13-45'), // Invalid month/day
        expectedOutput: NaN,
        description: "Invalid date values"
      }
    ]
  },

  /**
   * Edge cases
   */
  edgeCases: {
    description: "Handles edge cases correctly",
    examples: [
      {
        input: new Date(8.64e15), // Maximum valid timestamp
        expectedOutput: 8.64e15,
        description: "Maximum valid Date timestamp"
      },
      {
        input: new Date(-8.64e15), // Minimum valid timestamp
        expectedOutput: -8.64e15,
        description: "Minimum valid Date timestamp"
      },
      {
        input: new Date(0), // Unix epoch
        expectedOutput: 0,
        description: "Unix epoch (1970-01-01)"
      }
    ]
  },

  /**
   * Compatibility with native Date.prototype.getTime()
   */
  nativeCompatibility: {
    description: "Behavior matches native Date.prototype.getTime()",
    testCases: [
      "Same return value for identical Date objects",
      "Same NaN handling for invalid dates",
      "Same behavior for edge case timestamps",
      "Same precision (milliseconds)"
    ]
  }
};

// Test Contract Scenarios
export const GetTimeTestScenarios = {
  /**
   * Basic functionality tests
   */
  basicTests: [
    {
      name: "Valid date extraction",
      setup: () => new Date('2024-06-15T12:30:45.123Z'),
      expectation: (result: number) => {
        expect(typeof result).toBe('number');
        expect(result).toBe(1718453445123);
      }
    },
    {
      name: "Invalid date extraction",
      setup: () => new Date('invalid'),
      expectation: (result: number) => {
        expect(result).toBeNaN();
      }
    }
  ],

  /**
   * Comparison tests with native implementation
   */
  compatibilityTests: [
    {
      name: "Matches native getTime() for valid dates",
      test: (getTimeImpl: GetTimeContract) => {
        const date = new Date('2024-01-01T00:00:00.000Z');
        const nativeResult = date.getTime();
        const implResult = getTimeImpl(date);
        expect(implResult).toBe(nativeResult);
      }
    },
    {
      name: "Matches native getTime() for invalid dates",
      test: (getTimeImpl: GetTimeContract) => {
        const date = new Date('invalid');
        const nativeResult = date.getTime();
        const implResult = getTimeImpl(date);
        expect(implResult).toBeNaN();
        expect(nativeResult).toBeNaN();
      }
    }
  ],

  /**
   * Performance tests
   */
  performanceTests: [
    {
      name: "Performance comparable to native getTime()",
      test: (getTimeImpl: GetTimeContract) => {
        const dates = Array.from({length: 1000}, () => new Date());

        const startNative = performance.now();
        dates.forEach(date => date.getTime());
        const nativeTime = performance.now() - startNative;

        const startImpl = performance.now();
        dates.forEach(date => getTimeImpl(date));
        const implTime = performance.now() - startImpl;

        // Implementation should be within reasonable factor of native performance
        expect(implTime).toBeLessThan(nativeTime * 10);
      }
    }
  ]
};