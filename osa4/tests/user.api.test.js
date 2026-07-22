const assert = require('node:assert')
const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require("mongoose");
const User = require("../models/user");
const helper = require("./test_helper");
const {initialUsers} = require("./fixtures/userFixtures")

describe('when there is one user saved', () => {
    beforeEach( async () => {
        await User.deleteMany({})
        await User.insertMany(initialUsers)
    })
    test('should return all users', async () => {
        const users = await helper.usersInDB()
        assert.strictEqual(users.length, initialUsers.length)
    })
    after( async () => {
        await mongoose.connection.close()
    })
})