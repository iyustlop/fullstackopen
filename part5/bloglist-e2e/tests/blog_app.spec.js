const { test, describe, expect, beforeEach } = require('@playwright/test')

const USER_LOGED_IN = 'Matti Luukkainen logged in'
const USERNAME = 'mluukkai'
const PASSWORD = 'salainen'

describe('Blog list App', () => {

  beforeEach(async ({ page, request }) => {
    await request.post('http:localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen'
      }
    })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    const locator = await page.getByText('log in')
    await expect(locator).toBeVisible()
    await expect(page.getByText('log in')).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.getByRole('button', { name: 'log in' }).click()

      await page.getByTestId('username').fill(USERNAME)
      await page.getByTestId('password').fill(PASSWORD)
      await page.getByRole('button', { name: 'login' }).click()
      await expect(page.getByText(USER_LOGED_IN)).toBeVisible()
    })

    test('login fails with wrong password', async ({ page }) => {
      await page.getByRole('button', { name: 'log in' }).click()

      await page.getByTestId('username').fill(USERNAME)
      await page.getByTestId('password').fill('wrong')
      await page.getByRole('button', { name: 'login' }).click()

      const errorDiv = await page.locator('.error')
      await expect(errorDiv).toContainText('Wrong user and password')
      await expect(errorDiv).toHaveCSS('border-style', 'solid')
      await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')
      await expect(page.getByText(USER_LOGED_IN)).not.toBeVisible()

    })
  })

  describe('when logged in', () => {
    beforeEach(async ({ page }) => {
      await new Promise(r => setTimeout(r, 5000));
      await page.getByRole('button', { name: 'log in' }).click()
      await page.getByTestId('username').fill(USERNAME)
      await page.getByTestId('password').fill(PASSWORD)
      await page.getByRole('button', { name: 'login' }).click()
      await expect(page.getByText(USER_LOGED_IN)).toBeVisible()
    })

    test('a new blog can be created', async ({ page }) => {
      await page.getByRole('button', { name: 'Create new blog' }).click()
      await page.getByTestId('title').fill('a blog created by playwright')
      await page.getByTestId('author').fill('a blog author created by playwright')
      await page.getByTestId('url').fill('a blog url created by playwright')
      await page.getByRole('button', { name: 'create' }).click()
      await expect(page.getByText('A new blog a blog created by playwright')).toBeVisible()
    })
  })  
})