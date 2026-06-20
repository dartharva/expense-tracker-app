import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "tests/integration",
  timeout: 30000,
  use: {
    ...devices["Pixel 7"],
    baseURL: "http://127.0.0.1:4173",
  },
  webServer: {
    command: "npm run preview -- --host 127.0.0.1 --port 4173",
    port: 4173,
    reuseExistingServer: true,
  },
});