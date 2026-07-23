const assert = require('node:assert')
const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require("mongoose");
const User = require("../models/user");
const helper = require("./test_helper");
const {initialUsers, newTestUser} = require("./fixtures/userFixtures")
const supertest = require("supertest");
const app = require("../app")


const api = supertest(app)
describe("Login API", () => {
    describe("When there s a user in database", () => {
        beforeEach(async () => {
            await User.deleteMany({})
            const usersBefore = await helper.usersInDB()
            await api
                .post("/api/users")
                .send(newTestUser)
                .expect(201)
            const usersAfter = await helper.usersInDB()
            assert.strictEqual(usersBefore.length, 0)
            assert.strictEqual(usersAfter.length, 1)

        })
        test("Should succeed when given correct username and password", async () => {
            const login = {
                username: newTestUser.username,
                password: newTestUser.password
            }
            const response = await api
                .post('/api/login')
                .send(login)
                .expect(200)

            const token = response.body.token
            assert.strictEqual(response.body.username, newTestUser.username)
            assert(token)
        })
        test('should fail when given nonexistent username', async () => {
            const login = {
                username: 'incorrect username',
                password: newTestUser.password
            }
            const response = await api
            .post('/api/login')
            .send(login)
            .expect(401)

            const error = response.body.error
            assert.strictEqual(error, 'invalid password or username')
        })
        test('should fail when given wrong password', async () => {
            const login = {
                username: newTestUser.username,
                password: 'salasana123'
            }
            const response = await api
            .post('/api/login')
            .send(login)
            .expect(401)

            const error = response.body.error
            assert.strictEqual(error, 'invalid password or username')
        })
    })
        after(async () => {
            await mongoose.connection.close()
        })
})