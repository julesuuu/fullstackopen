const { test, describe, expect, beforeEach } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')
const { default: login } = require('../src/services/login')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'Jules',
        username: 'julesu',
        password: 'pogi'
      }
    })

    await request.post('/api/users', {
      data: {
        name: 'Superuser',
        username: 'root',
        password: 'sekret'
      }
    })

    await page.goto('/')
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
      await expect(createdDiv).toContainText(/a new blog.*playwright.*Jules/i)
    })

    test('a blog can be liked', async ({ page }) => {
      await createBlog(page, {
        title: 'liking this blog',
        author: 'Jules',
        url: 'http://like.com'
      })
      
      await page.getByRole('button', { name: 'view' }).click()
      await page.getByRole('button', { name: 'like' }).click()

      await expect(page.getByText(/likes 1/)).toBeVisible()
    })
  })

  describe('deletion and permission', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'julesu', 'pogi')
    })

    test('a blog can be deleted', async ({ page }) => {
      await createBlog(page, {
        title: 'deleting this blog',
        author: 'Jules',
        url: 'http://delete.com'
      })

      await page.getByRole('button', { name: 'view' }).click()
      await expect(page.getByRole('button', { name: 'remove' })).toBeVisible()

      page.on('dialog', async dialog => {
        await dialog.accept()
      })

      await page.getByRole('button', { name: 'remove' }).click()
      
      const deletedDiv = page.locator('.blogNotif')
      await expect(deletedDiv).toContainText(/Deleted deleting this blog/i)
    })
    
    test('remove button can only be seen by who created it', async ({ page }) => {
      await createBlog(page, {
        title: 'remove button seen',
        author: 'Jules',
        url: 'http://remove.com'
      })

      await page.getByRole('button', { name: 'view' }).click()
      await expect(page.getByRole('button', { name: 'remove' })).toBeVisible()
      
      await page.getByRole('button', { name: 'logout' }).click()
      await expect(page.getByText('Log in to application')).toBeVisible()

      await loginWith(page, 'root', 'sekret')
      await expect(page.getByText('Superuser logged in')).toBeVisible()

      await page.getByRole('button', { name: 'view' }).click()
      await expect(page.getByRole('button', {name: 'remove'})).not.toBeVisible()
    })
  })
})