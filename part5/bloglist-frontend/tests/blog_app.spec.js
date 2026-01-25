const { test, describe, expect, beforeEach } = require('@playwright/test')
const { loginWith } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Jules',
        username: 'julesu',
        password: 'pogi'
      }
    })

    await page.goto('http://localhost:5173')
  })
  test('Login form is shown', async ({ page }) => {
    const locator = page.getByText('log in to application')
    await expect(locator).toBeVisible()
    
    await expect(page.getByLabel('username')).toBeVisible()
    await expect(page.getByLabel('password')).toBeVisible()
  })

  test('user can login', async ({ page }) => {
    await loginWith(page, 'julesu', 'pogi')
    await expect(page.getByText('Jules logged in')).toBeVisible()
  })

  describe('Login', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'julesu', 'pogi')
      await page.getByRole('button', { name: 'login' }).click()
    })

    test('succeeds with correct credentials', async ({ page }) => {

    })
  })

  describe('when logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'julesu', 'pogi')
      await page.getByRole('button', { name: 'login' }).click()
    })

    test('a new blog can be created', async ({ page }) => {
      await page.getByRole('button', { name: 'create new blog' }).click()

      await page.getByLabel('title').fill('a blog created by playwright')
      await page.getByLabel('author').fill('Jules')
      await page.getByLabel('url').fill('example.com')
      await page.getByRole('button', { name: 'create' }).click()

      await expect(page.getByText('a new blog a blog created by playwright by jules added')).toBeVisible()
      await expect(page.locator('.blogNotif').getByText('a blog created by playwright')).toBeVisible()
    })
  })
})