/**
 * Contract Tests for New Function Examples
 * These tests validate that all new functions have proper examples in README.md
 */

import { describe, it, expect } from 'vitest';

describe('New Function Examples Contract', () => {
  const newFunctions = ['compare', 'now', 'setTime', 'getTime', 'setMilliseconds', 'isBetween'];
  const constants = ['MIN_DATE', 'MAX_DATE'];

  describe('Function Examples Validation', () => {
    newFunctions.forEach(funcName => {
      it(`should have working example for ${funcName} function`, () => {
        const readme = getREADMEContent();
        const examples = extractFunctionExamples(readme, funcName);

        expect(examples.length).toBeGreaterThan(0);

        examples.forEach(example => {
          expect(example).toContain(`${funcName}(`);
          expect(example).toMatch(/import.*from ['"]chronia['"]/);
          validateExampleSyntax(example);
        });
      });
    });

    constants.forEach(constName => {
      it(`should have working example for ${constName} constant`, () => {
        const readme = getREADMEContent();
        const examples = extractConstantExamples(readme, constName);

        expect(examples.length).toBeGreaterThan(0);

        examples.forEach(example => {
          expect(example).toContain(constName);
          expect(example).toMatch(/import.*from ['"]chronia['"]/);
          validateExampleSyntax(example);
        });
      });
    });
  });

  describe('Example Code Quality', () => {
    it('should have examples that demonstrate Date | number flexibility', () => {
      const readme = getREADMEContent();
      const examples = extractAllCodeExamples(readme);

      const hasDateFlexibility = examples.some(example =>
        (example.includes('Date.now()') || example.includes('getTime(')) &&
        (example.includes('new Date(') || example.includes('timestamp'))
      );

      expect(hasDateFlexibility).toBe(true);
    });

    it('should have examples showing comparison functionality', () => {
      const readme = getREADMEContent();
      const examples = extractAllCodeExamples(readme);

      const hasComparisonExample = examples.some(example =>
        example.includes('.sort(compare)') ||
        example.includes('compare(')
      );

      expect(hasComparisonExample).toBe(true);
    });

    it('should have examples showing current time usage', () => {
      const readme = getREADMEContent();
      const examples = extractAllCodeExamples(readme);

      const hasCurrentTimeExample = examples.some(example =>
        example.includes('now()') &&
        !example.includes('// Example')
      );

      expect(hasCurrentTimeExample).toBe(true);
    });
  });

  describe('Integration Examples', () => {
    it('should show new functions working with existing functions', () => {
      const readme = getREADMEContent();
      const examples = extractAllCodeExamples(readme);

      const hasIntegrationExample = examples.some(example => {
        const newFunctionUsed = newFunctions.some(func => example.includes(`${func}(`));
        const existingFunctionUsed = ['format', 'addDays', 'isAfter', 'min', 'max'].some(func =>
          example.includes(`${func}(`)
        );
        return newFunctionUsed && existingFunctionUsed;
      });

      expect(hasIntegrationExample).toBe(true);
    });
  });
});

// Helper functions (will fail initially as README is not updated yet)
function getREADMEContent(): string {
  const fs = require('fs');
  const path = require('path');
  return fs.readFileSync(path.join(__dirname, '../../../README.md'), 'utf-8');
}

function extractFunctionExamples(content: string, funcName: string): string[] {
  const functionSection = extractFunctionSection(content, funcName);
  return extractCodeBlocks(functionSection, 'typescript').concat(
    extractCodeBlocks(functionSection, 'javascript')
  );
}

function extractConstantExamples(content: string, constName: string): string[] {
  const constantsSection = extractSection(content, 'Constants');
  return extractCodeBlocks(constantsSection, 'typescript').concat(
    extractCodeBlocks(constantsSection, 'javascript')
  );
}

function extractFunctionSection(content: string, funcName: string): string {
  const regex = new RegExp(`###.*${funcName}[\\s\\S]*?(?=###|##|$)`, 'i');
  const match = content.match(regex);
  return match ? match[0] : '';
}

function extractSection(content: string, sectionTitle: string): string {
  const regex = new RegExp(`##.*${sectionTitle}[\\s\\S]*?(?=##|$)`, 'i');
  const match = content.match(regex);
  return match ? match[0] : '';
}

function extractCodeBlocks(content: string, language: string): string[] {
  const regex = new RegExp(`\`\`\`${language}?\\n([\\s\\S]*?)\\n\`\`\``, 'g');
  const blocks = [];
  let match;
  while ((match = regex.exec(content)) !== null) {
    blocks.push(match[1]);
  }
  return blocks;
}

function extractAllCodeExamples(content: string): string[] {
  return extractCodeBlocks(content, 'typescript').concat(
    extractCodeBlocks(content, 'javascript'),
    extractCodeBlocks(content, '')
  );
}

function validateExampleSyntax(code: string): void {
  // Basic syntax validation
  expect(code).not.toContain('undefined');
  expect(code).not.toContain('null');

  // Should have proper imports
  if (code.includes('import')) {
    expect(code).toMatch(/import\s*\{[^}]+\}\s*from\s*['"]chronia['"]/);
  }

  // Should not have syntax errors
  expect(code).not.toMatch(/\s{$/); // No hanging braces
  expect(code).not.toMatch(/^\s*}/); // No starting with closing brace
}