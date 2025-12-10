import tseslint from "typescript-eslint";

export default tseslint.config({
  files: ["src/**/*.ts"],
  languageOptions: {
    parser: tseslint.parser,
  },
  plugins: {
    "@typescript-eslint": tseslint.plugin,
  },
  rules: {
    semi: ["error", "always"],
    quotes: ["error", "double"],
  },
  ignores: ["dist/", "node_modules/", "tests/", "specs/", "coverage/"],
});
