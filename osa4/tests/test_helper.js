const Blog = require('../models/blog')
const User = require('../models/user')
const { newTestBlog, initialBlogs } = require('./fixtures/blogFixtures')
const { initialUsers, newTestUser } = require('./fixtures/userFixtures')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const initializeDB = async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})

    const users = await User.insertMany(initialUsers)
    await api
        .post('/api/users')
        .send(newTestUser)
        .expect(201)
    const user = users[0]

    const blogsWithUsers = initialBlogs.map((blog) => {
        return {
            ...blog,
            user: user.id
        }
    })
    const blogs = await Blog.insertMany(blogsWithUsers)
    user.blogs = blogs.map((blog) => {
        return blog.id
    })
    await user.save()

}

const blogsInDB = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDB = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

const getAUser = async () => {
    const users = await usersInDB()
    return users[0]
}

const getTestsBlogWithUserReference = async () => {
    const user = await getAUser()
    return {
        ...newTestBlog,
        user: user.id
    }
}

const getUsersPassword = (userID) => {
    const user = initialUsers.find((user) => user.id === userID)
    return user.password
}

const getLoginToken = async () => {
    const login = {
        username: newTestUser.username,
        password: newTestUser.password
    }
    const loginresponse = await api
        .post('/api/login')
        .send(login)
        .expect(200)

    return loginresponse.body.token
}

module.exports = {
    blogsInDB, usersInDB, getAUser, getTestsBlogWithUserReference, initializeDB, getUsersPassword, getLoginToken
}