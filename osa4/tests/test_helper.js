const Blog = require('../models/blog')
const User = require('../models/user')
const { newTestBlog, initialBlogs } = require('./fixtures/blogFixtures')
const userFixtures = require('./fixtures/userFixtures')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const initializeDBWithOneUserAndBlogs = async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})

    const userResponse = await api
        .post('/api/users')
        .send(userFixtures.blogCreatorUser)
        .expect(201)

    const userId = userResponse.body.id
    const loginToken = await getTestUsersLoginToken()

    for (const blog of initialBlogs) {
        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${loginToken}`)
            .send({
                ...blog,
                user: userId
            })
            .expect(201)
    }
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
    blogsInDB, usersInDB, getAUser, getTestsBlogWithUserReference, initializeDBWithOneUserAndBlogs ,  getTestUsersLoginToken
}