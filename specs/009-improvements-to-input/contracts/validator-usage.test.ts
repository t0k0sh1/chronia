import { describe, it, expect } from "vitest";

/**
 * Contract Test: Internal Validator Usage
 *
 * This test verifies that target functions correctly import and use
 * the internal validator functions from src/_lib/validators.ts
 *
 * IMPORTANT: This test MUST FAIL before implementation and PASS after.
 */
describe("Internal validator usage contract", () => {
  it("should import isValidDate in comparison functions", async () => {
    // Verify that comparison functions import isValidDate
    try {
      const fs = await import("fs/promises");
      const path = await import("path");

      const compareFile = await fs.readFile(
        path.join(process.cwd(), "src/compare/index.ts"),
        "utf-8"
      );

      // Should import isValidDate from validators
      expect(compareFile).toMatch(/import.*isValidDate.*from.*validators/);

      // Should use isValidDate in the implementation
      expect(compareFile).toMatch(/isValidDate\s*\(/);

    } catch (error) {
      throw new Error(`Compare function import validation failed: ${error}`);
    }
  });

  it("should import isValidDateOrNumber in boolean functions", async () => {
    // Verify that boolean functions import appropriate validators
    try {
      const fs = await import("fs/promises");
      const path = await import("path");

      const functionPaths = [
        "src/isAfter/index.ts",
        "src/isBefore/index.ts",
        "src/isEqual/index.ts",
        "src/isAfterOrEqual/index.ts",
        "src/isBeforeOrEqual/index.ts"
      ];

      for (const functionPath of functionPaths) {
        const fileContent = await fs.readFile(
          path.join(process.cwd(), functionPath),
          "utf-8"
        );

        // Should import from validators (isValidDateOrNumber or isValidDate)
        expect(fileContent).toMatch(/import.*(?:isValidDateOrNumber|isValidDate).*from.*validators/);

        // Should use validator function in implementation
        expect(fileContent).toMatch(/(?:isValidDateOrNumber|isValidDate)\s*\(/);
      }

    } catch (error) {
      throw new Error(`Boolean function import validation failed: ${error}`);
    }
  });

  it("should import isValidDateOrNumber in calculation functions", async () => {
    // Verify that calculation functions import appropriate validators
    try {
      const fs = await import("fs/promises");
      const path = await import("path");

      const functionPaths = [
        "src/diffDays/index.ts",
        "src/diffMinutes/index.ts",
        "src/diffSeconds/index.ts",
        "src/diffHours/index.ts",
        "src/diffMilliseconds/index.ts",
        "src/diffMonths/index.ts",
        "src/diffYears/index.ts"
      ];

      for (const functionPath of functionPaths) {
        const fileContent = await fs.readFile(
          path.join(process.cwd(), functionPath),
          "utf-8"
        );

        // Should import from validators
        expect(fileContent).toMatch(/import.*(?:isValidDateOrNumber|isValidDate).*from.*validators/);

        // Should use validator function in implementation
        expect(fileContent).toMatch(/(?:isValidDateOrNumber|isValidDate)\s*\(/);
      }

    } catch (error) {
      throw new Error(`Calculation function import validation failed: ${error}`);
    }
  });

  it("should import isValidDateOrNumber in range functions", async () => {
    // Verify that range functions import appropriate validators
    try {
      const fs = await import("fs/promises");
      const path = await import("path");

      const clampFile = await fs.readFile(
        path.join(process.cwd(), "src/clamp/index.ts"),
        "utf-8"
      );

      // Should import from validators
      expect(clampFile).toMatch(/import.*(?:isValidDateOrNumber|isValidDate).*from.*validators/);

      // Should use validator function in implementation
      expect(clampFile).toMatch(/(?:isValidDateOrNumber|isValidDate)\s*\(/);

    } catch (error) {
      throw new Error(`Clamp function import validation failed: ${error}`);
    }
  });

  it("should replace manual isNaN checks with validator calls", async () => {
    // Verify that manual validation is replaced with internal validators
    try {
      const fs = await import("fs/promises");
      const path = await import("path");

      const functionPaths = [
        "src/isAfter/index.ts",
        "src/isBefore/index.ts",
        "src/diffDays/index.ts",
        "src/diffMinutes/index.ts"
      ];

      for (const functionPath of functionPaths) {
        const fileContent = await fs.readFile(
          path.join(process.cwd(), functionPath),
          "utf-8"
        );

        // Should NOT contain manual isNaN validation patterns
        expect(fileContent).not.toMatch(/isNaN\s*\(\s*\w+\.getTime\s*\(\s*\)\s*\)/);

        // Should contain validator function calls instead
        expect(fileContent).toMatch(/(?:isValidDate|isValidDateOrNumber)\s*\(/);
      }

    } catch (error) {
      throw new Error(`Manual validation replacement failed: ${error}`);
    }
  });

  it("should maintain same function signatures", async () => {
    // Verify that function signatures remain unchanged
    try {
      const { isAfter } = await import("../../../src/isAfter");
      const { diffDays } = await import("../../../src/diffDays");
      const { clamp } = await import("../../../src/clamp");
      const { compare } = await import("../../../src/compare");

      // Function signatures should remain the same
      expect(typeof isAfter).toBe("function");
      expect(isAfter.length).toBe(3); // Two required parameters plus optional options

      expect(typeof diffDays).toBe("function");
      expect(diffDays.length).toBe(2); // Two required parameters

      expect(typeof clamp).toBe("function");
      expect(clamp.length).toBe(3); // Three required parameters

      expect(typeof compare).toBe("function");
      expect(compare.length).toBe(2); // Two required parameters (order is optional)

    } catch (error) {
      throw new Error(`Function signature validation failed: ${error}`);
    }
  });

  it("should have consistent validator import paths", async () => {
    // Verify all imports use consistent paths to validators
    try {
      const fs = await import("fs/promises");
      const path = await import("path");
      const glob = await import("glob");

      // Get all target function files
      const functionFiles = await glob.glob("src/{clamp,compare,is*,diff*}/index.ts", {
        cwd: process.cwd()
      });

      const expectedImportPattern = /from\s+['"](\.\.\/)*_lib\/validators['"]/;

      for (const filePath of functionFiles) {
        const fileContent = await fs.readFile(
          path.join(process.cwd(), filePath),
          "utf-8"
        );

        // If the file imports validators, it should use consistent path
        if (fileContent.includes("isValidDate") || fileContent.includes("isValidNumber")) {
          expect(fileContent).toMatch(expectedImportPattern);
        }
      }

    } catch (error) {
      throw new Error(`Import path consistency validation failed: ${error}`);
    }
  });

  it("should not introduce new dependencies", async () => {
    // Verify no new external dependencies are introduced
    try {
      const fs = await import("fs/promises");
      const path = await import("path");

      const packageJsonContent = await fs.readFile(
        path.join(process.cwd(), "package.json"),
        "utf-8"
      );

      const packageJson = JSON.parse(packageJsonContent);

      // Should not have introduced new validation libraries
      const dependencies = Object.keys(packageJson.dependencies || {});
      const devDependencies = Object.keys(packageJson.devDependencies || {});

      const validationLibraries = ["joi", "yup", "zod", "ajv", "validator"];

      for (const lib of validationLibraries) {
        expect(dependencies).not.toContain(lib);
        expect(devDependencies).not.toContain(lib);
      }

    } catch (error) {
      throw new Error(`Dependency validation failed: ${error}`);
    }
  });
});