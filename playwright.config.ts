import { defineConfig, devices } from "@playwright/test"

export default defineConfig({
  testDir: "tests/e2e",
  use: {
    baseURL: "http://localhost:3000",
    channel: "chrome",
    reducedMotion: "reduce",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"], channel: "chrome" } }],
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: true,
    timeout: 120_000,
  },
})
