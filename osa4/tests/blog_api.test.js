const assert = require('node:assert')
const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const {initialBlogs, newTestBlog} = require("./fixtures/blogFixtures");
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(initialBlogs)
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})
test('all blogs are returned', async () => {
    const blogsAtEnd = await helper.blogsInDB()
    assert.strictEqual(blogsAtEnd.length, initialBlogs.length)
})
test('note should have key named id', async () => {
    const blogsAtEnd = await helper.blogsInDB()
    const firstBlog = blogsAtEnd[0]
    assert.ok(firstBlog.id)
})
test('should add a blog', async () => {
    await api
        .post('/api/blogs')
        .send(newTestBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDB()
    const authors = blogsAtEnd.map(blog => blog.author)

    assert.strictEqual(blogsAtEnd.length, initialBlogs.length + 1)
    assert(authors.includes(newTestBlog.author))
    })
test('if likes not given should give blog zero  likes', async () => {
    const testBlogWithoutLikes = {...newTestBlog}
    delete testBlogWithoutLikes['likes']
    const response = await api
         .post('/api/blogs')
         .send(testBlogWithoutLikes)
         .expect(201)
         .expect('Content-Type', /application\/json/)

    const savedBlog = response.body
    assert.strictEqual(savedBlog.likes, 0)
})
test('blog without an URL is not added ', async () => {
    const testBlogWithoutURL = {...newTestBlog}
    delete testBlogWithoutURL['url']
    await api
        .post('/api/blogs')
        .send(testBlogWithoutURL)
        .expect(400)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDB()
    assert.strictEqual(blogsAtEnd.length, initialBlogs.length)

})
test('blog without a title is not added', async () => {
    const testBlogWithoutTitle = {...newTestBlog}
    delete testBlogWithoutTitle['title']
    await api
        .post('/api/blogs')
        .send(testBlogWithoutTitle)
        .expect(400)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDB()
    assert.strictEqual(blogsAtEnd.length, initialBlogs.length)

})

after(async () => {
    await mongoose.connection.close()
})