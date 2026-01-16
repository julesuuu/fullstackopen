const assert = require('node:assert')
const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('../utils/test_helper')
const Blog = require('../models/blog')
const blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

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
  assert(titles.includes('HTML is easy'))
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: "Hello, World",
    author: "Jules",
    url: "http://example.com",
    likes: 69
  }
  await api
    .post('/api/blogs/')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  
  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

  const titles = blogsAtEnd.map(n => n.title)
  console.log('🚀 ~ :54 ~ titles:', titles)

  assert(titles.includes('Hello, World'))
})

test('blog without title is not added', async () => {
  const newBlog = {
    author: "Jules",
    url: "http://example.com",
    likes: 69
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
  
  const blogsAtEnd = await helper.blogsInDb()
  console.log('🚀 ~ :71 ~ blogsAtEnd:', blogsAtEnd)
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
})

test('a specific blog can be viewed', async () => {
  const blogAtStart = await helper.blogsInDb()
  const blogToView = await blogAtStart[0]

  const resultBlog = await api
    .get(`/api/blogs/${blogToView.id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)
  
  assert.deepStrictEqual(resultBlog.body, blogToView)
  console.log('🚀 ~ :82 ~ blogToView:', blogToView)
})

test('a blog can be deleted', async () => {
  const blogAtStart = await helper.blogsInDb()
  const blogToDelete = blogAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)
  
  const blogsAtEnd = await helper.blogsInDb()

  const ids = blogsAtEnd.map(n => n.id)
  console.log('🚀 ~ :99 ~ ids:', ids)
  assert(!ids.includes(blogToDelete.id))

  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length -1)
  console.log('🚀 ~ :99 ~ blogsAtEnd:', blogsAtEnd)
})

test('blogs have id property instead of _id', async () => {
  const response = await api.get('/api/blogs')

  const blogToCheck = response.body[0]
  console.log('🚀 ~ :110 ~ blogToCheck:', blogToCheck)

  assert(blogToCheck.id)

  assert.strictEqual(blogToCheck._id, undefined)
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

after(async () => {
  await mongoose.connection.close()
})