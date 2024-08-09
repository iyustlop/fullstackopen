const { test, describe, expect, beforeEach } = require('@playwright/test')

describe('Blog list App', () => {

  beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173')
  })

  test('front page can be opened', async ({ page }) => {
    const locator = await page.getByText('username')
    await expect(locator).toBeVisible()
    await expect(page.getByText('username')).toBeVisible()
  })

  test('login into the blog list app', async ({ page }) => {
    await expect(page.getByText('username')).toBeVisible()
    await page.getByTestId('username').fill('iyustlop')
    await page.getByTestId('password').fill('On3p1us3t')
    await page.getByRole('button', { name: 'login' }).click()
    await expect(page.getByText('iyustlop logged-in')).toBeVisible()
  })
})