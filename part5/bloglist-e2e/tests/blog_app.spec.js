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

    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Juha Kankkunen',
        username: 'jkankkunen',
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
      await page.getByRole('button', { name: 'log in' }).click()
      await page.getByTestId('username').fill(USERNAME)
      await page.getByTestId('password').fill(PASSWORD)
      await page.getByRole('button', { name: 'login' }).click()
      await expect(page.getByText(USER_LOGED_IN)).toBeVisible()
    })

    describe('acctions with blogs',() => {
      beforeEach(async ({ page}) =>{
        await page.getByRole('button', { name: 'Create new blog' }).click()
        await page.getByTestId('title').fill('a blog created by playwright')
        await page.getByTestId('author').fill('a blog author created by playwright')
        await page.getByTestId('url').fill('a blog url created by playwright')
        await page.getByRole('button', { name: 'create' }).click()
      })

      test('a new blog can be created', async ({ page }) => {
        await expect(page.getByText('A new blog a blog created by playwright')).toBeVisible()
      })

      test('a Blog can be liked', async ({page}) => {
        await page.getByRole('button', { name: 'view' }).click()
        await page.getByRole('button', { name: 'like' }).click()
        await expect(page.getByText('likes:1')).toBeVisible()
      })

      test('a blog can be removed by the user', async ({page})=>{
        await page.getByRole('button', { name: 'Cancel' }).click()  
        await page.getByText('view').click()
        page.on('dialog', async (dialog) => {
          console.log(dialog.message())
          await dialog.accept()
        });
        await page.getByText('remove').click()
        await new Promise(r => setTimeout(r, 5000));
        await expect(page.getByText('a blog created by playwright')).not.toBeVisible()
      })

      test('another user try to remove', async ({page}) => {
        await page.getByRole('button', { name: 'logout' }).click()

        await page.getByTestId('username').fill('jkankkunen')
        await page.getByTestId('password').fill(PASSWORD)
        await page.getByRole('button', { name: 'login' }).click()
        await expect(page.getByText('Juha Kankkunen logged in')).toBeVisible()
        await page.getByText('view').click()
        page.on('dialog', async (dialog) => {
          console.log(dialog.message())
          await dialog.accept()
        });
        await page.getByText('remove').click()
        await new Promise(r => setTimeout(r, 5000));
        page.on('dialog', async (dialog) => {
          console.log(dialog.message())
          await dialog.accept()
        });
        await expect(page.getByText('a blog created by playwright')).toBeVisible()
      })

      test('blogs sorted by like', async ({page}) => {
        await page.getByRole('button', { name: 'view' }).click()
        await page.getByRole('button', { name: 'like' }).click()
        await page.getByRole('button', { name: 'Cancel' }).click() 
        
        await page.getByRole('button', { name: 'Create new blog' }).click()
        await page.getByTestId('title').clear()
        await page.getByTestId('author').clear()
        await page.getByTestId('url').clear()
        await page.getByTestId('title').fill('another blog created by playwright')
        await page.getByTestId('author').fill('another blog author created by playwright')
        await page.getByTestId('url').fill('another blog url created by playwright')
        await page.getByRole('button', { name: 'create' }).click()

        await new Promise(r => setTimeout(r, 5000));

        await page.getByRole('button', { name: 'view' }).click()
        const likes = await page.getByRole('button', { name: 'like' }).all()
        await likes[1].click()
        await likes[1].click()

        await new Promise(r => setTimeout(r, 5000));

        const blogs = await page.locator('.blog').all()
        blogs[0].getByText('another blog created by playwright')
      })
    })
  })  
})