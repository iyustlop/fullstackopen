const { test, describe, expect, beforeEach } = require('@playwright/test')

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

      await page.getByTestId('username').fill('mluukkai')
      await page.getByTestId('password').fill('salainen')
      await page.getByRole('button', { name: 'login' }).click()
      await expect(page.getByText('mluukkai logged-in')).toBeVisible()
    })

    test('login fails with wrong password', async ({ page }) => {
      await page.getByRole('button', { name: 'log in' }).click()

      await page.locator('.username').fill('mluukkai')
      await page.locator('.password').fill('wrong')
      await page.getByRole('button', { name: 'login' }).click()

      await expect(page.getByText('wrong user and password')).toBeVisible()
    })
  })

  describe('when logged in', () => {
    beforeEach(async ({ page }) => {
      const textboxes = await page.getByRole('textbox').all()
      await textboxes[0].fill('mluukkai')
      await textboxes[1].fill('salainen')
      await page.getByRole('button', { name: 'login' }).click()
      await expect(page.getByText('mluukkai logged-in')).toBeVisible()
    })

    test('a new note can be created', async ({ page }) => {
      await page.getByRole('button', { name: 'Create new blog' }).click()
      await page.getByRole('textbox').fill('a note created by playwright')
      await page.getByRole('button', { name: 'save' }).click()
      await expect(page.getByText('a note created by playwright')).toBeVisible()
    })
  })  
})