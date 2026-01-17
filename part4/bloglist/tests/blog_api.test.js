const assert = require('node:assert')
const bcrypt = require('bcrypt')
const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('../utils/test_helper')
const Blog = require('../models/blog')
const User = require('../models/user')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  await Blog.insertMany(helper.initialBlogs)

  const passwordHash = await bcrypt.hash('sekret', 10)
  const user = new User({ username: 'root', passwordHash })

  await user.save()
})

test('creation succeeds with a fresh username', async () => {
  const usersAtStart = await helper.usersInDb()
  
  const newUser = {
    username: 'Jules',
    name: 'Julius Ramos',
    password: 'julsdpogi'
  }

  await api 
    .post('/api/users')
    .send(newUser)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  
  const usersAtEnd = await helper.usersInDb()
  assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

  const usernames = usersAtEnd.map(u => u.username)
  assert(usernames.includes(newUser.username))
})

describe('when there is initially some blogs saved', () => {
  
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, helper.initialBlogs.length)
  })

  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')
    const titles = response.body.map(e => e.title)
    console.log('🚀 ~ :33 ~ titles:', titles)
    assert(titles.includes('HTML is easy'))
  })

  test('blogs have id property instead of _id', async () => {
    const response = await api.get('/api/blogs')
    const blogToCheck = response.body[0]
    console.log('🚀 ~ :40 ~ blogToCheck:', blogToCheck)
    assert.ok(blogToCheck.id)
    assert.strictEqual(blogToCheck._id, undefined)
  })
})

describe('viewing a specific blog', () => {
  test('succeeds with a valid id', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToView = blogsAtStart[0]
    console.log('🚀 ~ :50 ~ blogToView:', blogToView)

    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    
    assert.deepStrictEqual(resultBlog.body, blogToView)
  })
})

describe('addition of a new blog', () => {
  test('succeeds with valid data', async () => {
    const newBlog = {
      title: "Hello, World",
      author: "Jules",
      url: "http://example.com",
      likes: 69
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    
    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(n => n.title)
    console.log('🚀 ~ :80 ~ titles:', titles)
    assert(titles.includes('Hello, World'))
  })

  test('fails with status code 400 if data invalid', async () => {
    const blogWithoutTitle = { author: 'Jules', url: 'http://test.com' }
    
    await api
      .post('/api/blogs')
      .send(blogWithoutTitle)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    console.log('🚀 ~ :93 ~ blogsAtEnd:', blogsAtEnd)
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
  })

  test('if the likes property is missing it will default to 0', async () => {
    const newBlog = { 
      title: 'Testing default likes',
      author: 'Jules',
      url: 'http://example.com'
    }

    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
    
    assert.strictEqual(response.body.likes, 0)
  })
})

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]
    console.log('🚀 ~ :117 ~ blogToDelete:', blogToDelete)

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)
    
    const blogsAtEnd = await helper.blogsInDb()
    console.log('🚀 ~ :124 ~ blogsAtEnd:', blogsAtEnd)
    const ids = blogsAtEnd.map(n => n.id)
    console.log('🚀 ~ :125 ~ ids:', ids)
    
    assert(!ids.includes(blogToDelete.id))
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)
  })
})

describe('updating a blog', () => {
  test('succeeds with status code 200 if data is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    const updatedBlogData = { 
      ...blogToUpdate, 
      likes: blogToUpdate.likes + 1 
    }

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlogData)
      .expect(200)

    const blogsAtEnd = await helper.blogsInDb()
    console.log('🚀 ~ :149 ~ blogsAtEnd:', blogsAtEnd)
    const updatedBlog = blogsAtEnd.find(b => b.id === blogToUpdate.id)
    console.log('🚀 ~ :150 ~ updatedBlog:', updatedBlog)

    assert.strictEqual(updatedBlog.likes, blogToUpdate.likes + 1)
  })
})

after(async () => {
  await mongoose.connection.close()
})