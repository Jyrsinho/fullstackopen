const assert = require('node:assert')
const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require("mongoose");
const helper = require("./test_helper");
const userFixtures = require("./fixtures/userFixtures")
const supertest = require("supertest");
const app = require("../app")


const api = supertest(app)
describe("Login API", () => {
    describe("When there is a user in database", () => {
        beforeEach(async () => {
            await helper.initializeDBWithOneUserAndBlogs()
        })
        test("Should succeed when given correct username and password", async () => {
            const login = {
                username: userFixtures.blogCreatorUser.username,
                password: userFixtures.blogCreatorUser.password
            }
            const response = await api
                .post('/api/login')
                .send(login)
                .expect(200)

            const token = response.body.token
            assert.strictEqual(response.body.username, userFixtures.blogCreatorUser.username)
            assert(token)
        })
        test('should fail when given nonexistent username', async () => {
            const login = {
                username: 'incorrect username',
                password: userFixtures.blogCreatorUser.password
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
                username: userFixtures.blogCreatorUser.username,
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