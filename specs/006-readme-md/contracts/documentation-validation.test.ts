/**
 * Contract Tests for README.md Documentation
 * These tests define the expected structure and content requirements
 */

import { describe, it, expect } from 'vitest';

describe('README.md Documentation Contract', () => {

  describe('New Function Documentation Requirements', () => {
    const newFunctions = ['compare', 'now', 'setTime', 'getTime', 'setMilliseconds', 'isBetween'];
    const newConstants = ['MIN_DATE', 'MAX_DATE'];

    newFunctions.forEach(funcName => {
      it(`should document ${funcName} function`, () => {
        const readme = getREADMEContent();
        expect(readme).toContain(funcName);
        expect(readme).toMatch(new RegExp(`import.*${funcName}.*from 'chronia'`));
      });

      it(`should include usage example for ${funcName}`, () => {
        const readme = getREADMEContent();
        const functionSection = extractFunctionSection(readme, funcName);
        expect(functionSection).toMatch(/```(typescript|javascript)/);
        expect(functionSection).toContain(funcName + '(');
      });
    });

    newConstants.forEach(constName => {
      it(`should document ${constName} constant`, () => {
        const readme = getREADMEContent();
        expect(readme).toContain(constName);
        expect(readme).toMatch(new RegExp(`import.*${constName}.*from 'chronia'`));
      });

      it(`should include usage example for ${constName}`, () => {
        const readme = getREADMEContent();
        const constantSection = extractFunctionSection(readme, constName);
        expect(constantSection).toMatch(/```(typescript|javascript)/);
        expect(constantSection).toContain(constName);
      });
    });
  });

  describe('Section Structure Requirements', () => {
    it('should have Date Comparison section with compare function', () => {
      const readme = getREADMEContent();
      expect(readme).toMatch(/###.*Date Comparison/);
      const section = extractSection(readme, 'Date Comparison');
      expect(section).toContain('compare');
    });

    it('should have Constants section with MIN_DATE and MAX_DATE', () => {
      const readme = getREADMEContent();
      expect(readme).toMatch(/##.*Constants/);
      const section = extractSection(readme, 'Constants');
      expect(section).toContain('MIN_DATE');
      expect(section).toContain('MAX_DATE');
    });

    it('should update Bundle Size section with current metrics', () => {
      const readme = getREADMEContent();
      const section = extractSection(readme, 'Bundle Size');
      expect(section).toContain('21 KB'); // Current actual size
      expect(section).not.toContain('17.5 KB'); // Old incorrect size
    });
  });

  describe('Example Code Validation', () => {
    it('should have valid TypeScript import statements', () => {
      const readme = getREADMEContent();
      const imports = extractCodeBlocks(readme, 'typescript')
        .filter(code => code.includes('import'))
        .map(code => code.match(/import.*from 'chronia'/g))
        .flat()
        .filter(Boolean);

      imports.forEach(importStmt => {
        expect(importStmt).toMatch(/import \{.*\} from 'chronia'/);
      });
    });

    it('should demonstrate Date | number parameter flexibility', () => {
      const readme = getREADMEContent();
      const examples = extractCodeBlocks(readme, 'typescript');
      const hasTimestampExample = examples.some(code =>
        (code.includes('Date.now()') || code.includes('getTime(') || code.includes('timestamp')) &&
        (code.includes('new Date(') || code.includes('Date') || code.includes('number'))
      );
      expect(hasTimestampExample).toBe(true);
    });
  });

  describe('Quick Start Section', () => {
    it('should include now() in quick start examples', () => {
      const readme = getREADMEContent();
      const quickStart = extractSection(readme, 'Quick Start');
      expect(quickStart).toContain('now()');
    });

    it('should include compare in quick start examples', () => {
      const readme = getREADMEContent();
      const quickStart = extractSection(readme, 'Quick Start');
      expect(quickStart).toContain('compare');
    });
  });

  describe('TypeScript Support Section', () => {
    it('should show updated type imports including new types', () => {
      const readme = getREADMEContent();
      const tsSection = extractSection(readme, 'TypeScript Support');
      expect(tsSection).toContain('BetweenOption');
    });
  });

  describe('API Completeness', () => {
    it('should document all 72 exported functions', () => {
      const readme = getREADMEContent();
      const exportedFunctions = getExportedFunctions();

      exportedFunctions.forEach(funcName => {
        expect(readme).toContain(funcName);
      });
    });

    it('should have consistent format for all function documentation', () => {
      const readme = getREADMEContent();
      const functionDocs = extractAllFunctionDocs(readme);

      functionDocs.forEach(doc => {
        expect(doc).toMatch(/```(typescript|javascript)/); // Has code example
        expect(doc).toMatch(/\(.*\)/); // Has function signature
      });
    });
  });
});

// Helper functions implementation
function getREADMEContent(): string {
  const fs = require('fs');
  const path = require('path');
  return fs.readFileSync(path.join(__dirname, '../../../README.md'), 'utf-8');
}

function extractFunctionSection(content: string, funcName: string): string {
  // Look for any mention of the function with surrounding context
  if (!content.includes(funcName)) {
    return '';
  }

  // Find all code blocks that contain the function
  const codeBlockRegex = /```[\s\S]*?```/g;
  const codeBlocks = [];
  let match;
  while ((match = codeBlockRegex.exec(content)) !== null) {
    if (match[0].includes(funcName)) {
      codeBlocks.push(match[0]);
    }
  }

  return codeBlocks.join('\n');
}

function extractSection(content: string, sectionTitle: string): string {
  // Try ## level first, then ### level
  const patterns = [
    new RegExp(`###\\s*${sectionTitle}[\\s\\S]*?(?=###|##|$)`, 'i'),
    new RegExp(`##\\s*${sectionTitle}[\\s\\S]*?(?=##|$)`, 'i')
  ];

  for (const pattern of patterns) {
    const match = content.match(pattern);
    if (match) {
      return match[0];
    }
  }

  return '';
}

function extractCodeBlocks(content: string, language: string): string[] {
  const regex = new RegExp(`\`\`\`${language}?\n([\s\S]*?)\n\`\`\``, 'g');
  const blocks = [];
  let match;
  while ((match = regex.exec(content)) !== null) {
    blocks.push(match[1]);
  }
  return blocks;
}

function getExportedFunctions(): string[] {
  const fs = require('fs');
  const path = require('path');
  const indexContent = fs.readFileSync(path.join(__dirname, '../../../src/index.ts'), 'utf-8');
  const exportMatches = indexContent.match(/export \{[^}]+\}/g) || [];
  const functions = [];
  for (const match of exportMatches) {
    const funcNames = match.replace(/export \{|\}/g, '').split(',').map(f => f.trim());
    functions.push(...funcNames);
  }
  return functions.filter(f => f && !f.includes(' as '));
}

function extractAllFunctionDocs(content: string): string[] {
  const regex = /###[^#]*[\s\S]*?(?=###|##|$)/g;
  const docs = [];
  let match;
  while ((match = regex.exec(content)) !== null) {
    docs.push(match[0]);
  }
  return docs;
}