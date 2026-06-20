import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    setupFiles: ["./tests/setup-tests.js"],
    include: ["tests/**/*.test.js"],
  },
});