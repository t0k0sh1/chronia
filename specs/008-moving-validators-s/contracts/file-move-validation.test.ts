import { describe, it, expect, beforeAll } from "vitest";
import { existsSync, statSync } from "fs";
import { resolve } from "path";

/**
 * Contract Test: Validator test file move validation
 *
 * This test verifies that the validator test file has been successfully
 * moved from src/_lib/ to tests/_lib/ with correct import paths and
 * maintained functionality.
 *
 * IMPORTANT: This test MUST FAIL before implementation and PASS after.
 */
describe("Validator test file move contract", () => {
  const sourceFilePath = resolve(process.cwd(), "src/_lib/validators.test.ts");
  const targetFilePath = resolve(process.cwd(), "tests/_lib/validators.test.ts");
  const sourceValidatorPath = resolve(process.cwd(), "src/_lib/validators.ts");

  beforeAll(async () => {
    // Ensure the source validator file exists (this should always be true)
    expect(existsSync(sourceValidatorPath)).toBe(true);
  });

  it("should have moved test file from source to target location", () => {
    // After implementation, source test file should not exist
    expect(existsSync(sourceFilePath)).toBe(false);

    // Target test file should exist
    expect(existsSync(targetFilePath)).toBe(true);
  });

  it("should have correct import statements in moved test file", async () => {
    // This test validates the import path has been updated correctly
    expect(existsSync(targetFilePath)).toBe(true);

    const fs = await import("fs/promises");
    const content = await fs.readFile(targetFilePath, "utf-8");

    // Should import from correct relative path
    expect(content).toContain('from "../../src/_lib/validators"');

    // Should not contain old import path
    expect(content).not.toContain('from "./validators"');
  });

  it("should maintain all test cases in moved file", async () => {
    // Verify the moved test file contains all expected test cases
    expect(existsSync(targetFilePath)).toBe(true);

    const fs = await import("fs/promises");
    const content = await fs.readFile(targetFilePath, "utf-8");

    // Check for main describe blocks
    expect(content).toContain('describe("validators"');
    expect(content).toContain('describe("isValidDate"');
    expect(content).toContain('describe("isValidNumber"');
    expect(content).toContain('describe("isValidDateOrNumber"');

    // Verify file size is reasonable (should be similar to original ~281 lines)
    const lines = content.split('\n').length;
    expect(lines).toBeGreaterThan(250);
    expect(lines).toBeLessThan(300);
  });

  it("should have target directory following established pattern", () => {
    const testLibDir = resolve(process.cwd(), "tests/_lib");

    // Directory should exist
    expect(existsSync(testLibDir)).toBe(true);

    // Should be a directory
    expect(statSync(testLibDir).isDirectory()).toBe(true);

    // Should contain the moved test file
    expect(existsSync(targetFilePath)).toBe(true);
  });

  it("should maintain test file naming convention", () => {
    // Test file should follow .test.ts naming pattern
    expect(targetFilePath).toMatch(/validators\.test\.ts$/);

    // File should exist at expected location
    expect(existsSync(targetFilePath)).toBe(true);
  });

  it("should allow test imports to resolve correctly", async () => {
    // This test verifies that the import path actually resolves
    expect(existsSync(targetFilePath)).toBe(true);

    try {
      // Attempt to import the validators from the new test file location
      const validatorsPath = "../../src/_lib/validators";
      const resolved = resolve(process.cwd(), "tests/_lib", validatorsPath);
      expect(existsSync(resolved + ".ts")).toBe(true);
    } catch (error) {
      throw new Error(`Import path resolution failed: ${error}`);
    }
  });
});