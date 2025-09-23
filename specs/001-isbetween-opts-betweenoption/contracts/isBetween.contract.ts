/**
 * Contract specification for isBetween function with BetweenOption
 * This file defines the expected behavior and types for the enhanced isBetween function
 */

import type { Interval } from '../../../src/types';

// Type Contracts
export type BoundsType = "()" | "[]" | "[)" | "(]";

export type BetweenOption = {
  bounds?: BoundsType;
};

// Function Contract
export interface IsBetweenContract {
  /**
   * Check if a date falls between two boundary dates with configurable inclusion.
   *
   * @param date - The date to check (Date object or timestamp)
   * @param interval - Interval object with start and end boundaries
   * @param opts - Optional configuration for boundary inclusion
   * @returns True if date is between the boundaries according to the bounds configuration
   */
  (date: Date | number, interval: Interval, opts?: BetweenOption): boolean;
}

// Behavioral Contracts
export const BehaviorContracts = {
  /**
   * Default behavior when no options provided
   */
  defaultBehavior: {
    bounds: "()" as BoundsType,
    description: "Both boundaries excluded (backward compatible)"
  },

  /**
   * Boundary comparison rules for each bounds type
   */
  comparisonRules: {
    "()": {
      start: "date > start",
      end: "date < end",
      description: "Open interval - both boundaries excluded"
    },
    "[]": {
      start: "date >= start",
      end: "date <= end",
      description: "Closed interval - both boundaries included"
    },
    "[)": {
      start: "date >= start",
      end: "date < end",
      description: "Left-closed, right-open - start included, end excluded"
    },
    "(]": {
      start: "date > start",
      end: "date <= end",
      description: "Left-open, right-closed - start excluded, end included"
    }
  },

  /**
   * Error handling contracts
   */
  errorHandling: {
    invalidDate: {
      input: "Invalid Date or NaN timestamp",
      expectedReturn: false
    },
    invalidInterval: {
      input: "Non-object or null interval",
      expectedReturn: false
    },
    invalidBounds: {
      input: "Invalid bounds value",
      expectedBehavior: "Treat as '()' (default)"
    },
    invertedBoundaries: {
      input: "start > end",
      expectedReturn: false
    }
  },

  /**
   * Null boundary handling
   */
  nullBoundaries: {
    nullStart: {
      behavior: "Use MIN_DATE as effective start",
      boundsApply: true
    },
    nullEnd: {
      behavior: "Use MAX_DATE as effective end",
      boundsApply: true
    }
  }
};

// Test Contract Scenarios
export const TestScenarios = {
  /**
   * Backward compatibility tests
   */
  backwardCompatibility: [
    {
      name: "No options parameter",
      date: "2024-06-15",
      interval: { start: "2024-06-10", end: "2024-06-20" },
      opts: undefined,
      expected: true
    },
    {
      name: "Boundary exclusion without options",
      date: "2024-06-10",
      interval: { start: "2024-06-10", end: "2024-06-20" },
      opts: undefined,
      expected: false
    }
  ],

  /**
   * Bounds option tests
   */
  boundsTests: {
    "()": [
      {
        name: "Exclude both boundaries",
        date: "2024-06-15",
        interval: { start: "2024-06-10", end: "2024-06-20" },
        expected: true
      },
      {
        name: "Start boundary excluded",
        date: "2024-06-10",
        interval: { start: "2024-06-10", end: "2024-06-20" },
        expected: false
      },
      {
        name: "End boundary excluded",
        date: "2024-06-20",
        interval: { start: "2024-06-10", end: "2024-06-20" },
        expected: false
      }
    ],
    "[]": [
      {
        name: "Include both boundaries",
        date: "2024-06-15",
        interval: { start: "2024-06-10", end: "2024-06-20" },
        expected: true
      },
      {
        name: "Start boundary included",
        date: "2024-06-10",
        interval: { start: "2024-06-10", end: "2024-06-20" },
        expected: true
      },
      {
        name: "End boundary included",
        date: "2024-06-20",
        interval: { start: "2024-06-10", end: "2024-06-20" },
        expected: true
      }
    ],
    "[)": [
      {
        name: "Include start, exclude end",
        date: "2024-06-15",
        interval: { start: "2024-06-10", end: "2024-06-20" },
        expected: true
      },
      {
        name: "Start boundary included",
        date: "2024-06-10",
        interval: { start: "2024-06-10", end: "2024-06-20" },
        expected: true
      },
      {
        name: "End boundary excluded",
        date: "2024-06-20",
        interval: { start: "2024-06-10", end: "2024-06-20" },
        expected: false
      }
    ],
    "(]": [
      {
        name: "Exclude start, include end",
        date: "2024-06-15",
        interval: { start: "2024-06-10", end: "2024-06-20" },
        expected: true
      },
      {
        name: "Start boundary excluded",
        date: "2024-06-10",
        interval: { start: "2024-06-10", end: "2024-06-20" },
        expected: false
      },
      {
        name: "End boundary included",
        date: "2024-06-20",
        interval: { start: "2024-06-10", end: "2024-06-20" },
        expected: true
      }
    ]
  },

  /**
   * Edge case tests
   */
  edgeCases: [
    {
      name: "Same start and end with inclusive bounds",
      date: "2024-06-15",
      interval: { start: "2024-06-15", end: "2024-06-15" },
      opts: { bounds: "[]" },
      expected: true
    },
    {
      name: "Same start and end with exclusive bounds",
      date: "2024-06-15",
      interval: { start: "2024-06-15", end: "2024-06-15" },
      opts: { bounds: "()" },
      expected: false
    },
    {
      name: "Null start boundary",
      date: "2024-06-15",
      interval: { start: null, end: "2024-06-20" },
      opts: { bounds: "[]" },
      expected: true
    },
    {
      name: "Null end boundary",
      date: "2024-06-15",
      interval: { start: "2024-06-10", end: null },
      opts: { bounds: "[]" },
      expected: true
    }
  ]
};