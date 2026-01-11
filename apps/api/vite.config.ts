import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@": new URL("src", import.meta.url).pathname,
    },
  },
  test: {
    dir: "src",
    projects: [
      {
        extends: true,
        test: {
          name: "unit",
          dir: "src/modules",
          include: ["**/tests/**/*.{test,spec}.{ts,tsx}"],
        },
      },
    ],
  },
});
