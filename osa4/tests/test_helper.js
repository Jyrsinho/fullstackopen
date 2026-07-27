const Blog = require('../models/blog')
const User = require('../models/user')
const { newTestBlog } = require('./fixtures/blogFixtures')
const supertest = require('supertest')
const app = require('../app')
const bcrypt = require('bcrypt')
const api = supertest(app)



const addUserToDB = async (user) => {
    user.passwordHash = await bcrypt.hash(user.password, 1)
    console.log(user)
    return await User.insertOne(user)
}

const addBlog = async (user, blog) => {
    const blogToAdd = {
        ...blog,
        user: user.id,
    }
    await Blog.insertOne(blogToAdd)
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


const getTestUsersLoginToken = async (user) => {
    const login = {
        username: user.username,
        password: user.password
    }
    const loginresponse = await api
        .post('/api/login')
        .send(login)
        .expect(200)

    return loginresponse.body.token
}

module.exports = {
    blogsInDB, usersInDB, getAUser, getTestsBlogWithUserReference, addUserToDB, addBlog,  getTestUsersLoginToken
}