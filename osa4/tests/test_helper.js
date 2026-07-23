const Blog = require('../models/blog')
const User = require('../models/user')
const { newTestBlog } = require('./fixtures/blogFixtures')

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
    newTestBlog
    const user = await getAUser()
    return {
        ...newTestBlog,
        user: user.id
    }
}

module.exports = {
    blogsInDB, usersInDB, getAUser, getTestsBlogWithUserReference
}