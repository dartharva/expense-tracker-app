import { defineConfig } from "vite";

export default defineConfig({
  base: process.env.GITHUB_PAGES === "true" ? "/expense-tracker-app/" : "/",
  server: {
    host: "0.0.0.0",
    port: 5173,
  },
});