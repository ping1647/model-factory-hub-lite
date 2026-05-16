const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 60 * 1000,
  expect: {
    timeout: 10 * 1000
  },
  fullyParallel: true,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['list'],
    ['html', { open: 'never', outputFolder: 'playwright-report' }]
  ],
  use: {
    baseURL: process.env.BASE_URL || 'https://ping1647.github.io/model-factory-hub-lite/',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },
  projects: [
    {
      name: 'chromium-desktop',
      use: { ...devices['Desktop Chrome'] }
    },
    {
      name: 'mobile-safari-size',
      use: {
        ...devices['iPhone 14'],
        viewport: { width: 390, height: 844 }
      }
    },
    {
      name: 'ipad-size',
      use: {
        ...devices['iPad Pro 11'],
        viewport: { width: 834, height: 1194 }
      }
    }
  ]
});
