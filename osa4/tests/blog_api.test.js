const assert = require('node:assert')
const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const {initialBlogs} = require("../fixtures/blogFixtures");

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})
test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, 1)
})
test('note should have key named id', async () => {
    const response = await api.get('/api/blogs/')
    const blogs = response.body
    const firstBlog = blogs[0]
    assert.ok(firstBlog.id)
})
test('should add a blog', async () => {
    const newBlog = {
        author: 'Joku Kova Koodari',
        title: 'Koodaaminen on kuin saunominen - hikistä',
        url: 'omatkotisivut.com',
        likes: 0
    }
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const authors = response.body.map(r => r.author)

    assert.strictEqual(response.body.length, 2)
    assert(authors.includes(newBlog.author))
    })
test('if likes not given should give blog zero  likes', async () => {
    const newBlog = {
        author: 'Joku Kova Koodari',
        title: 'Koodaaminen on kuin saunominen - hikistä',
        url: 'omatkotisivut.com',
    }
     const response = await api
         .post('/api/blogs')
         .send(newBlog)
         .expect(201)
         .expect('Content-Type', /application\/json/)

    const savedBlog = response.body
    assert.strictEqual(savedBlog.likes, 0)

})

after(async () => {
    await mongoose.connection.close()
})