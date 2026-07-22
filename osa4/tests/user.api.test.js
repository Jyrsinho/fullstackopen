const assert = require('node:assert')
const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require("mongoose");
const User = require("../models/user");
const helper = require("./test_helper");
const {initialUsers, newTestUser} = require("./fixtures/userFixtures")
const supertest = require("supertest");
const app = require("../app")
const {error} = require("../utils/logger");

const api = supertest(app)
describe('when there is one user saved', () => {
    beforeEach( async () => {
        await User.deleteMany({})
        await User.insertMany(initialUsers)
    })
    test('should return all users', async () => {
        const response = await api
            .get('/api/users')
            .expect(200)
            .expect('Content-Type', /application\/json/)
        const allUsers = response.body

        assert.strictEqual(allUsers.length, initialUsers.length)
    })
    describe('adding users', () => {
        test('should add a user when given valid user', async () => {
            const usersBefore = await helper.usersInDB()

            await api
                .post('/api/users')
                .send(newTestUser)
                .expect(201)
                .expect('Content-Type', /application\/json/)

            const usersAfter = await helper.usersInDB()
            const usernames = usersAfter.map(user => user.username)
            assert(usernames.includes(newTestUser.username))
            assert.strictEqual(usersAfter.length, usersBefore.length + 1 )
        })
        test('should not add user without a username', async () => {
            const usersBefore = await helper.usersInDB()
            const userToAdd = {...newTestUser}
            delete userToAdd.username

            await api
            .post('/api/users')
            .send(userToAdd)
            .expect(400)

            const usersAfter = await helper.usersInDB()

            assert.strictEqual(usersAfter.length, usersBefore.length )
        })
        test('should not add a user with existing username', async () => {
            const usersBefore = await helper.usersInDB()
            const existingUser = usersBefore[0]
            const userToAdd = {
                ...newTestUser,
                username: existingUser.username
            }
            const response = await api
                .post('/api/users')
                .send(userToAdd)
                .expect(400)

            assert.strictEqual(response.body.error, 'username must be unique')

            const usersAfter = await helper.usersInDB()
            assert.strictEqual(usersAfter.length, usersBefore.length )
        })
        test('should not add user without a password', async () => {
            const usersBefore = await helper.usersInDB()
            const userToAdd = {...newTestUser}
            delete userToAdd.password

            const response = await api
            .post('/api/users')
            .send(userToAdd)
            .expect(400)

            const usersAfter = await helper.usersInDB()
            assert.strictEqual(usersAfter.length, usersBefore.length )
        })
    })
    after( async () => {
        await mongoose.connection.close()
    })

})