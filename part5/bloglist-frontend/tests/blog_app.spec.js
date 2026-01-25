const { test, describe ,expect ,beforeEach } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173')
  })
  test('Login form is shown', async ({ page }) => {
    const locator = page.getByText('log in to application')
    await expect(locator).toBeVisible()
    
    await expect(page.getByLabel('username')).toBeVisible()
    await expect(page.getByLabel('password')).toBeVisible()
  })

  test('user can login', async ({ page }) => {
    await page.getByRole('textbox').first().fill('root')
    await page.getByRole('textbox').last().fill('sekret')
    await page.getByRole('button', { name: 'login' }).click()

    await expect(page.getByText('Superuser logged in')).toBeVisible()
  })

  describe('when logged in', () => {
    beforeEach(async ({ page }) => {
      await page.getByLabel('username').fill('root')
      await page.getByLabel('password').fill('sekret')
      await page.getByRole('button', { name: 'login' }).click()
    })

    test('a new blog can be created', async ({ page }) => {
      await page.getByRole('button', { name: 'create new blog' }).click()

      await page.getByLabel('title').fill('a blog created by playwright')
      await page.getByLabel('author').fill('Superuser')
      await page.getByLabel('url').fill('example.com')
      await page.getByRole('button', { name: 'create' }).click()

      await expect(page.getByText('a blog created by playwright').first()).toBeVisible()
    })
  })
})