/**
 * Contract Tests for Import Statement Validation
 * These tests ensure all import examples in README.md are accurate
 */

import { describe, it, expect } from 'vitest';

describe('Import Statement Validation Contract', () => {

  describe('Import Statement Accuracy', () => {
    it('should only import functions that actually exist', () => {
      const readme = getREADMEContent();
      const importStatements = extractImportStatements(readme);
      const actualExports = getActualExports();

      importStatements.forEach(importStmt => {
        const importedItems = extractImportedItems(importStmt);

        importedItems.forEach(item => {
          expect(actualExports).toContain(item);
        });
      });
    });

    it('should use consistent import syntax', () => {
      const readme = getREADMEContent();
      const importStatements = extractImportStatements(readme);

      importStatements.forEach(importStmt => {
        // Should use proper destructuring syntax
        expect(importStmt).toMatch(/import\s*\{[^}]+\}\s*from\s*['"]chronia['"]/);

        // Should use consistent quotes (prefer single quotes in examples)
        expect(importStmt).toMatch(/from\s*['"]chronia['"]/);

        // Should not have trailing commas in simple imports
        if (!importStmt.includes('\n')) {
          expect(importStmt).not.toMatch(/,\s*\}\s*from/);
        }
      });
    });

    it('should include all new functions in at least one import example', () => {
      const readme = getREADMEContent();
      const importStatements = extractImportStatements(readme);
      const allImportedItems = importStatements
        .flatMap(extractImportedItems)
        .filter((item, index, array) => array.indexOf(item) === index); // unique

      const newFunctions = ['compare', 'now', 'setTime', 'getTime', 'setMilliseconds', 'isBetween'];
      const newConstants = ['MIN_DATE', 'MAX_DATE'];
      const newTypes = ['BetweenOption'];

      [...newFunctions, ...newConstants].forEach(item => {
        expect(allImportedItems).toContain(item);
      });

      // Types might be in separate import or type import
      const hasTypeImports = importStatements.some(stmt =>
        stmt.includes('BetweenOption') || stmt.includes('type {')
      );
      expect(hasTypeImports).toBe(true);
    });
  });

  describe('Import Organization', () => {
    it('should group imports logically', () => {
      const readme = getREADMEContent();
      const importStatements = extractImportStatements(readme);

      // Look for well-organized imports (not mixing too many different types)
      importStatements.forEach(importStmt => {
        const items = extractImportedItems(importStmt);

        // If importing many items, should be organized
        if (items.length > 8) {
          // Should have some logical grouping (comments or line breaks)
          const hasGrouping = importStmt.includes('\n') || importStmt.includes('//');
          expect(hasGrouping).toBe(true);
        }
      });
    });

    it('should not import unnecessary items in examples', () => {
      const readme = getREADMEContent();
      const codeBlocks = extractAllCodeBlocks(readme);

      codeBlocks.forEach(block => {
        if (block.includes('import')) {
          const importStmt = block.split('\n').find(line => line.includes('import'));
          if (importStmt) {
            const importedItems = extractImportedItems(importStmt);
            const usedItems = importedItems.filter(item =>
              block.includes(`${item}(`) ||
              block.includes(`${item};`) ||
              block.includes(`${item} `) ||
              block.includes(`.${item}`)
            );

            // At least 50% of imported items should be used in the example
            const usageRatio = usedItems.length / importedItems.length;
            expect(usageRatio).toBeGreaterThanOrEqual(0.5);
          }
        }
      });
    });
  });

  describe('TypeScript Import Support', () => {
    it('should show proper type imports when needed', () => {
      const readme = getREADMEContent();

      // Should have examples of type-only imports for interfaces/types
      const hasTypeOnlyImport = readme.includes('import type') ||
                               readme.includes('type {') ||
                               readme.includes('BetweenOption');

      expect(hasTypeOnlyImport).toBe(true);
    });

    it('should demonstrate both runtime and type imports', () => {
      const readme = getREADMEContent();
      const importStatements = extractImportStatements(readme);

      const hasRuntimeImports = importStatements.some(stmt =>
        !stmt.includes('import type') && extractImportedItems(stmt).length > 0
      );

      const hasTypeImports = importStatements.some(stmt =>
        stmt.includes('BetweenOption') || stmt.includes('Locale')
      );

      expect(hasRuntimeImports).toBe(true);
      expect(hasTypeImports).toBe(true);
    });
  });
});

// Helper functions
function getREADMEContent(): string {
  const fs = require('fs');
  const path = require('path');
  return fs.readFileSync(path.join(__dirname, '../../../README.md'), 'utf-8');
}

function extractImportStatements(content: string): string[] {
  const importRegex = /import\s*(?:type\s*)?\{[^}]+\}\s*from\s*['"]chronia['"]/g;
  const matches = [];
  let match;

  while ((match = importRegex.exec(content)) !== null) {
    matches.push(match[0]);
  }

  return matches;
}

function extractImportedItems(importStatement: string): string[] {
  const match = importStatement.match(/\{([^}]+)\}/);
  if (!match) return [];

  return match[1]
    .split(',')
    .map(item => item.trim())
    .filter(item => item.length > 0)
    .map(item => item.replace(/\s+as\s+\w+/g, '')) // Remove aliases
    .filter(item => !item.startsWith('type ')); // Remove type-only imports
}

function getActualExports(): string[] {
  const fs = require('fs');
  const path = require('path');
  const indexPath = path.join(__dirname, '../../../src/index.ts');
  const content = fs.readFileSync(indexPath, 'utf-8');

  const exportMatches = content.match(/export\s*\{[^}]+\}/g) || [];
  const directExports = content.match(/export\s+(?:const|function|class|interface|type)\s+(\w+)/g) || [];

  const exports = [];

  // Extract from export { ... } statements
  exportMatches.forEach(match => {
    const items = match.match(/\{([^}]+)\}/)?.[1]
      .split(',')
      .map(item => item.trim().split(/\s+as\s+/)[0]) || [];
    exports.push(...items);
  });

  // Extract direct exports
  directExports.forEach(match => {
    const name = match.match(/export\s+(?:const|function|class|interface|type)\s+(\w+)/)?.[1];
    if (name) exports.push(name);
  });

  return exports.filter(exp => exp && exp.length > 0);
}

function extractAllCodeBlocks(content: string): string[] {
  const regex = /```(?:\w+)?\n([\s\S]*?)\n```/g;
  const blocks = [];
  let match;

  while ((match = regex.exec(content)) !== null) {
    blocks.push(match[1]);
  }

  return blocks;
}