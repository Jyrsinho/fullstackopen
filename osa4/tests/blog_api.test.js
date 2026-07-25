const assert = require('node:assert')
const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const {initialBlogs, invalidId} = require("./fixtures/blogFixtures");
const userFixtures = require('./fixtures/userFixtures');
const helper = require('./test_helper')
const api = supertest(app)

describe('when there is initially some blogs and one user saved', () => {
    beforeEach(async () => {
        await helper.initializeDBWithOneUserAndBlogs()
    })
    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })
    test('all blogs are returned', async () => {
        const response = await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const allBlogs = response.body
        assert.strictEqual(allBlogs.length, initialBlogs.length)
    })
    test('blog should have key named id', async () => {
        const blogsAtEnd = await helper.blogsInDB()
        const firstBlog = blogsAtEnd[0]
        assert.ok(firstBlog.id)
    })
    test('blog should have all fields of user who added the blog', async () => {
        const response = await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const allBlogs = response.body
        const allUsers = allBlogs.map(blog => blog.user)

        for (const user of allUsers) {
            assert.ok(user)
            assert.ok('username' in user)
            assert.ok('name' in user)
            assert.ok('id' in user)
        }
    })
    describe('addition of a new blog', () => {
        test('succeeds with proper authorization token', async () => {
            const blogsAtStart = await helper.blogsInDB()
            const testBlogWithUser = await helper.getTestsBlogWithUserReference()
            const authToken = await helper.getTestUsersLoginToken()

            const response = await api
                .post('/api/blogs')
                .set('Authorization', `Bearer ${authToken}`)
                .send(testBlogWithUser)
                .expect(201)
                .expect('Content-Type', /application\/json/)

            const user = response.body.user
            const blogsAtEnd = await helper.blogsInDB()
            assert.ok(user)
            assert.strictEqual(blogsAtEnd.length, blogsAtStart.length + 1)

        })
        test('if likes not given should give blog zero  likes', async () => {
            const testBlogWithoutLikes = await helper.getTestsBlogWithUserReference()
            delete testBlogWithoutLikes['likes']
            const authToken = await helper.getTestUsersLoginToken()
            const response = await api
                .post('/api/blogs')
                .set('Authorization', `Bearer ${authToken}`)
                .send(testBlogWithoutLikes)
                .expect(201)
                .expect('Content-Type', /application\/json/)

            const savedBlog = response.body
            assert.strictEqual(savedBlog.likes, 0)
        })
        test('blog without an URL is not added ', async () => {
            const testBlogWithoutURL = await helper.getTestsBlogWithUserReference()
            delete testBlogWithoutURL['url']
            const authToken = await helper.getTestUsersLoginToken()
            const response = await api
                .post('/api/blogs')
                .set('Authorization', `Bearer ${authToken}`)
                .send(testBlogWithoutURL)
                .expect(400)
                .expect('Content-Type', /application\/json/)

            const error = response.body.error
            const blogsAtEnd = await helper.blogsInDB()
            assert(error.includes('URL is required'))
            assert.strictEqual(blogsAtEnd.length, initialBlogs.length)

        })
        test('blog without a title is not added', async () => {
            const testBlogWithoutTitle = await helper.getTestsBlogWithUserReference()
            delete testBlogWithoutTitle['title']
            const authToken = await helper.getTestUsersLoginToken()
            const response = await api
                .post('/api/blogs')
                .set('Authorization', `Bearer ${authToken}`)
                .send(testBlogWithoutTitle)
                .expect(400)
                .expect('Content-Type', /application\/json/)
            const error = response.body.error

            const blogsAtEnd = await helper.blogsInDB()
            assert(error.includes('Title is required'))
            assert.strictEqual(blogsAtEnd.length, initialBlogs.length)

        })
    })
    describe('deletion of a blog', () => {
        test.only('creator can delete a blog with valid id', async () => {
            const blogsAtStart = await helper.blogsInDB()
            const blogToDelete = blogsAtStart[0]
            const token = await helper.getTestUsersLoginToken()
            const response = await api
                .delete(`/api/blogs/${blogToDelete.id}`)
                .set('Authorization', `Bearer ${token}`)
                .send()
                .expect(204)

            assert.strictEqual(response.status, 204)

            const blogsAtEnd = await helper.blogsInDB()
            const ids = blogsAtEnd.map(blog => blog.id)

            assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1)
            assert.ok(!ids.includes(blogToDelete.id))
        })
        test.only('not creator cant delete a blog with valid id', async () => {
            const blogsAtStart = await helper.blogsInDB()
            const blogToDelete = blogsAtStart[0]
        })
        test('cant delete a blog with invalid id', async () => {
            await api.delete(`/api/blogs/${invalidId}`).expect(400)
        })
    })
    describe('updating a blog', () => {
        test('succeeds with 200 if id is valid', async () => {
            const blogsAtStart = await helper.blogsInDB()
            const blogToUpdate = blogsAtStart[0]
            const updatedBlog = {
                ...blogToUpdate,
                author: 'Johnny Programmer'
            }

            await api
                .put(`/api/blogs/${blogToUpdate.id}`)
                .send(updatedBlog)
                .expect(200)

            const blogsAtEnd = await helper.blogsInDB()
            const authors = blogsAtEnd.map(blog => blog.author)

            assert.strictEqual(blogsAtEnd.length, blogsAtStart.length)
            assert(authors.includes(updatedBlog.author))
        })
        test('fails with 400 if id is invalid', async () => {
            const blogsAtStart = await helper.blogsInDB()
            const blogToUpdate = blogsAtStart[0]
            const updatedBlog = {
                ...blogToUpdate,
                author: 'Johnny Programmer'
            }

            await api
                .put(`/api/blogs/${invalidId}`)
                .send(updatedBlog)
                .expect(400)
        })
    })
    })
after(async () => {
    await mongoose.connection.close()

})