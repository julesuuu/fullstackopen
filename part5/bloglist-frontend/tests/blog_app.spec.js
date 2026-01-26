const { test, describe, expect, beforeEach } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

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
    })

    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'julesu', 'pogi')

      await expect(page.getByRole('button', { name: 'login' })).not.toBeVisible()
      await expect(page.getByText('Jules logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'julesu', 'wrongpassword')

      //await expect(page.getByText('wrong username or password')).toBeVisible()

      const errorDiv = page.locator('.blogNotif')
      await expect(errorDiv).toContainText('wrong username or password')
    })
  })

  describe('when logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'julesu', 'pogi')
    })

    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, {
        title: 'a blog created by playwright',
        author: 'Jules',
        url: 'http://test.com'
      })

      const createdDiv = page.locator('.blogNotif')
      await expect(createdDiv).toContainText('a new blog a blog created by playwright by Jules is added')
    })
  })
})