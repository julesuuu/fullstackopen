const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')
const helper = require('../utils/test_helper')

describe('when there is initially one in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const initialUser = new User({ username: 'root', passwordHash: 'secret' })
    await initialUser.save()
  })

  test('creation fails with proper status code and message password is too short', async () => {
    const newUser = {
      username: 'jules',
      name: 'Julius',
      password: '12'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(result.body.error, 'password must be atleast 3 characters long')
  })

  test('creation fails if username is too short', async () => {
    const newUser = {
      username: 'root',
      name: 'duplicate',
      password: 'password123'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    assert(result.body.error.includes('unique'))
  })

  test('creation fails is user is invalid', async () => {
    const usersAtStart = await helper.usersInDb()

    const invalidUser = {
      username: 'ro',
      name: 'jules',
      password: 'ro'
    }

    await api
      .post('/api/users')
      .send(invalidUser)
      .expect(400)

    const usersAtEnd = await helper.usersInDb()

    assert.strictEqual(usersAtStart.length, usersAtEnd.length)
  })
})

after(async () => {
  await mongoose.connection.close()
})