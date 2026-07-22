const assert = require('node:assert')
const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const {initialBlogs, newTestBlog} = require("./fixtures/blogFixtures");
const helper = require('./test_helper')

const api = supertest(app)

describe('when there is initially some blogs saved', () => {
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
    describe('addition of a new blog', async () => {
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

        })})
    describe('deletion of a blog', async () => {
        test('succeeds with 204 if id is valid', async () => {
            const blogsAtStart = await helper.blogsInDB()
            const blogToDelete = blogsAtStart[0]

            await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

            const blogsAtEnd = await helper.blogsInDB()
            const ids = blogsAtEnd.map(blog => blog.id)

            assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1)
            assert(!ids.includes(blogToDelete.id))
        })
        test('fails with 404 if id is invalid', async () => {
            const invalidId = '"5x422xx61x54x676234x17xx",'
            await api.delete(`/api/blogs/${invalidId}`).expect(404)
        })
    })
    describe('updating a blog', async () => {
        test.only('succeeds with 200 if id is valid', async () => {
            const blogsAtStart = await helper.blogsInDB()
            const blogToUpdate = blogsAtStart[0]
            const updatedBlog = {
                ...blogToUpdate,
                author: 'Johnny Programmer'
            }
            console.log('Blog to Update:')
            console.log(blogToUpdate)
            console.log('UpdatedBlog: ---')
            console.log(updatedBlog)

            await api
                .put(`/api/blogs/${blogToUpdate.id}`)
                .send(updatedBlog)
                .expect(200)

            const blogsAtEnd = await helper.blogsInDB()
            const authors = blogsAtEnd.map(blog => blog.author)

            assert.strictEqual(blogsAtEnd.length, blogsAtStart.length)
            assert(authors.includes(updatedBlog.author))
        })
    })
    after(async () => {
            await mongoose.connection.close()
    })
})