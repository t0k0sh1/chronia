import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    "i18n/index": "src/i18n/index.ts",
    "tz/index": "src/tz/index.ts",
  },
  format: ["esm", "cjs"],
  dts: true,
  sourcemap: false,
  clean: true,
  minify: true,
  treeshake: true,
  outDir: "dist",
  target: "es2020",
});
