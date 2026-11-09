import { defineConfig } from "tsdown";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    "i18n/index": "src/i18n/index.ts",
  },
  format: ["esm", "cjs"],
  dts: true,
  sourcemap: false,
  clean: true,
  minify: true,
  treeshake: true,
  outDir: "dist",
  target: "es2020",
  // Keep the published file names (.js for ESM under "type": "module", .cjs for CJS)
  fixedExtension: false,
});
