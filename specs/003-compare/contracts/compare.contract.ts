/**
 * Contract specification for compare function
 * This file defines the expected behavior and interface for the compare utility function
 */

// Function Contract
export interface CompareContract {
  /**
   * Compare two Date objects chronologically.
   *
   * @param date1 - The first Date object to compare
   * @param date2 - The second Date object to compare
   * @param order - Optional sort order: "ASC" for ascending (default) or "DESC" for descending
   * @returns -1 if date1 < date2, 1 if date1 > date2, 0 if equal (adjusted for order)
   * @throws {RangeError} When arguments are not valid Date objects or order is invalid
   */
  (date1: Date, date2: Date, order?: 'ASC' | 'DESC'): number;
}

// Behavioral Contracts
export const CompareBehaviorContracts = {
  /**
   * Ascending order comparisons (default)
   */
  ascendingOrder: {
    description: "Returns correct comparison values for ascending chronological order",
    examples: [
      {
        date1: new Date('2024-01-01T00:00:00.000Z'),
        date2: new Date('2024-01-02T00:00:00.000Z'),
        order: 'ASC' as const,
        expectedResult: -1,
        description: "Earlier date returns -1"
      },
      {
        date1: new Date('2024-01-02T00:00:00.000Z'),
        date2: new Date('2024-01-01T00:00:00.000Z'),
        order: 'ASC' as const,
        expectedResult: 1,
        description: "Later date returns 1"
      },
      {
        date1: new Date('2024-01-01T00:00:00.000Z'),
        date2: new Date('2024-01-01T00:00:00.000Z'),
        order: 'ASC' as const,
        expectedResult: 0,
        description: "Equal dates return 0"
      }
    ]
  },

  /**
   * Descending order comparisons
   */
  descendingOrder: {
    description: "Returns reversed comparison values for descending chronological order",
    examples: [
      {
        date1: new Date('2024-01-01T00:00:00.000Z'),
        date2: new Date('2024-01-02T00:00:00.000Z'),
        order: 'DESC' as const,
        expectedResult: 1,
        description: "Earlier date returns 1 in DESC mode"
      },
      {
        date1: new Date('2024-01-02T00:00:00.000Z'),
        date2: new Date('2024-01-01T00:00:00.000Z'),
        order: 'DESC' as const,
        expectedResult: -1,
        description: "Later date returns -1 in DESC mode"
      },
      {
        date1: new Date('2024-01-01T00:00:00.000Z'),
        date2: new Date('2024-01-01T00:00:00.000Z'),
        order: 'DESC' as const,
        expectedResult: 0,
        description: "Equal dates return 0 in DESC mode"
      }
    ]
  },

  /**
   * Default behavior (no order parameter)
   */
  defaultBehavior: {
    description: "Defaults to ascending order when order parameter is omitted",
    examples: [
      {
        date1: new Date('2024-01-01T00:00:00.000Z'),
        date2: new Date('2024-01-02T00:00:00.000Z'),
        expectedResult: -1,
        description: "Default behavior matches ASC order"
      }
    ]
  },

  /**
   * Error conditions
   */
  errorConditions: {
    description: "Throws RangeError for invalid inputs",
    examples: [
      {
        input1: null,
        input2: new Date(),
        expectedError: RangeError,
        expectedMessage: "First argument must be a Date object"
      },
      {
        input1: new Date(),
        input2: "not a date",
        expectedError: RangeError,
        expectedMessage: "Second argument must be a Date object"
      },
      {
        input1: new Date('invalid'),
        input2: new Date(),
        expectedError: RangeError,
        expectedMessage: "First date is invalid"
      },
      {
        input1: new Date(),
        input2: new Date('invalid'),
        expectedError: RangeError,
        expectedMessage: "Second date is invalid"
      },
      {
        input1: new Date(),
        input2: new Date(),
        order: "INVALID",
        expectedError: RangeError,
        expectedMessage: "Order must be 'ASC' or 'DESC'"
      }
    ]
  }
};

// Test Contract Scenarios
export const CompareTestScenarios = {
  /**
   * Basic functionality tests
   */
  basicTests: [
    {
      name: "Compare earlier to later date (ASC)",
      setup: () => ({
        date1: new Date('2024-01-01T12:00:00.000Z'),
        date2: new Date('2024-01-02T12:00:00.000Z'),
        order: 'ASC' as const
      }),
      expectation: (result: number) => {
        expect(result).toBe(-1);
      }
    },
    {
      name: "Compare later to earlier date (ASC)",
      setup: () => ({
        date1: new Date('2024-01-02T12:00:00.000Z'),
        date2: new Date('2024-01-01T12:00:00.000Z'),
        order: 'ASC' as const
      }),
      expectation: (result: number) => {
        expect(result).toBe(1);
      }
    },
    {
      name: "Compare equal dates",
      setup: () => ({
        date1: new Date('2024-01-01T12:00:00.000Z'),
        date2: new Date('2024-01-01T12:00:00.000Z')
      }),
      expectation: (result: number) => {
        expect(result).toBe(0);
      }
    }
  ],

  /**
   * Array.sort() compatibility tests
   */
  sortTests: [
    {
      name: "Sort dates in ascending order",
      test: (compareImpl: CompareContract) => {
        const dates = [
          new Date('2024-01-03'),
          new Date('2024-01-01'),
          new Date('2024-01-02')
        ];

        dates.sort(compareImpl);

        expect(dates[0].toISOString()).toBe('2024-01-01T00:00:00.000Z');
        expect(dates[1].toISOString()).toBe('2024-01-02T00:00:00.000Z');
        expect(dates[2].toISOString()).toBe('2024-01-03T00:00:00.000Z');
      }
    },
    {
      name: "Sort dates in descending order",
      test: (compareImpl: CompareContract) => {
        const dates = [
          new Date('2024-01-01'),
          new Date('2024-01-03'),
          new Date('2024-01-02')
        ];

        dates.sort((a, b) => compareImpl(a, b, 'DESC'));

        expect(dates[0].toISOString()).toBe('2024-01-03T00:00:00.000Z');
        expect(dates[1].toISOString()).toBe('2024-01-02T00:00:00.000Z');
        expect(dates[2].toISOString()).toBe('2024-01-01T00:00:00.000Z');
      }
    }
  ],

  /**
   * Error handling tests
   */
  errorTests: [
    {
      name: "Throws RangeError for non-Date first argument",
      test: (compareImpl: CompareContract) => {
        expect(() => {
          compareImpl('not a date' as any, new Date());
        }).toThrow(RangeError);
      }
    },
    {
      name: "Throws RangeError for invalid Date object",
      test: (compareImpl: CompareContract) => {
        expect(() => {
          compareImpl(new Date('invalid'), new Date());
        }).toThrow(RangeError);
      }
    },
    {
      name: "Throws RangeError for invalid order parameter",
      test: (compareImpl: CompareContract) => {
        expect(() => {
          compareImpl(new Date(), new Date(), 'INVALID' as any);
        }).toThrow(RangeError);
      }
    }
  ],

  /**
   * Edge case tests
   */
  edgeTests: [
    {
      name: "Compare dates at maximum valid range",
      test: (compareImpl: CompareContract) => {
        const maxDate = new Date(8640000000000000);
        const normalDate = new Date('2024-01-01');

        expect(compareImpl(normalDate, maxDate)).toBe(-1);
        expect(compareImpl(maxDate, normalDate)).toBe(1);
      }
    },
    {
      name: "Compare dates with millisecond precision",
      test: (compareImpl: CompareContract) => {
        const date1 = new Date('2024-01-01T12:00:00.001Z');
        const date2 = new Date('2024-01-01T12:00:00.002Z');

        expect(compareImpl(date1, date2)).toBe(-1);
        expect(compareImpl(date2, date1)).toBe(1);
      }
    }
  ],

  /**
   * Performance tests
   */
  performanceTests: [
    {
      name: "Performance comparable to direct comparison",
      test: (compareImpl: CompareContract) => {
        const dates1 = Array.from({length: 1000}, () => new Date(Math.random() * 1000000000000));
        const dates2 = [...dates1];

        const startDirect = performance.now();
        dates1.sort((a, b) => a.getTime() - b.getTime());
        const directTime = performance.now() - startDirect;

        const startImpl = performance.now();
        dates2.sort(compareImpl);
        const implTime = performance.now() - startImpl;

        // Implementation should be within reasonable factor of direct comparison
        expect(implTime).toBeLessThan(directTime * 10);
      }
    }
  ]
};