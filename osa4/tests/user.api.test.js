const assert = require('node:assert')
const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require("mongoose");
const helper = require("./test_helper");
const userFixtures = require("./fixtures/userFixtures")
const supertest = require("supertest");
const app = require("../app")
const {testUserToAdd} = require("./fixtures/userFixtures");
const Blog = require("../models/blog");
const User = require("../models/user");

const api = supertest(app)
describe('when there is one user saved', () => {
    beforeEach(async () => {
        await User.deleteMany({})
        await Blog.deleteMany({})
        const userInDB = userFixtures.blogCreatorUser
        await helper.addUserToDB(userInDB)

    })
    describe('adding users', () => {
        test('should add a user when given valid user', async () => {
            const usersBefore = await helper.usersInDB()

            await api
                .post('/api/users')
                .send(userFixtures.testUserToAdd)
                .expect(201)
                .expect('Content-Type', /application\/json/)

            const usersAfter = await helper.usersInDB()
            const usernames = usersAfter.map(user => user.username)
            assert(usernames.includes(testUserToAdd.username))
            assert.strictEqual(usersAfter.length, usersBefore.length + 1)
        })
        test('should not add user without a username', async () => {
            const usersBefore = await helper.usersInDB()
            const userToAdd = {...userFixtures.testUserToAdd}
            delete userToAdd.username
            await api
                .post('/api/users')
                .send(userToAdd)
                .expect(400);
            const usersAfter = await helper.usersInDB()

            assert.strictEqual(usersAfter.length, usersBefore.length)
        })
        test('should not add a user with existing username', async () => {
            const usersBefore = await helper.usersInDB()
            const existingUser = usersBefore[0]
            const userToAdd = {
                ...userFixtures.testUserToAdd,
                username: existingUser.username
            }
            const response = await api
                .post('/api/users')
                .send(userToAdd)
                .expect(400)

            assert(response.body.error.includes('username must be unique'))
            const usersAfter = await helper.usersInDB()
            assert.strictEqual(usersAfter.length, usersBefore.length)
        })
        test('should not add a user with username less than 3 characters', async () => {
            const usersBefore = await helper.usersInDB()
            const userToAdd = {
                ...userFixtures.testUserToAdd,
                username: 'ab'
            }

            const response = await api
                .post('/api/users')
                .send(userToAdd)
                .expect(400)

            const usersAfter = await helper.usersInDB()
            const error = response.body.error
            assert(error.includes('Username must be at least 3 characters'))
            assert.strictEqual(usersAfter.length, usersBefore.length)
        })
        test('should not add user without a password', async () => {
            const usersBefore = await helper.usersInDB()
            const userToAdd = {...userFixtures.testUserToAdd}
            delete userToAdd.password

            const response = await api
                .post('/api/users')
                .send(userToAdd)
                .expect(400)

            const error = response.body.error
            const usersAfter = await helper.usersInDB()
            assert(error.includes('Password is required'))
            assert.strictEqual(usersAfter.length, usersBefore.length)
        })
        test('should not add a user when password less than 3 characters', async () => {
            const usersBefore = await helper.usersInDB()
            const userToAdd = {
                ...userFixtures.testUserToAdd,
                password: 'ab'
            }

            const response = await api
                .post('/api/users')
                .send(userToAdd)
                .expect(400)

            const usersAfter = await helper.usersInDB()
            const error = response.body.error
            assert(error.includes('Password must be at least 3 characters'))
            assert.strictEqual(usersAfter.length, usersBefore.length)
        })
    })
})
after( async () => {
    await mongoose.connection.close()

})