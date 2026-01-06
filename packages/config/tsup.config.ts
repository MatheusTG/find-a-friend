import { defineConfig } from "tsup";

export default defineConfig({
  dts: true,
  clean: true,
  format: ["cjs", "esm"],
  treeshake: "recommended",
  entry: ["base/*.{js,mjs,cjs,ts,mts,cts}"],
  onSuccess: "pnpm exec shx mkdir -p dist && pnpm exec shx cp base/tsconfig.base.json dist/",
  external: ["eslint", "jiti"],
});
