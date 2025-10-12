import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    exclude: ["./docs/**", "./specs/**", "./node_modules/**"],
    coverage: {
      provider: "v8",
      reporter: ["text", "lcov", "html", "json"],
      exclude: [
        "**/specs/**",
        "**/docs/**",
        "**/dist/**",
        "**/tests/**",
        "**/node_modules/**",
        "**/vitest.config.ts",
        "**/eslint.config.js",
        "**/tsup.config.ts",
        "**/src/types.ts",
        "**/src/i18n/**",
      ],
    },
  },
});
