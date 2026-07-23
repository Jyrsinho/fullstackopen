const Blog = require('../models/blog')
const User = require('../models/user')
const { newTestBlog, initialBlogs } = require('./fixtures/blogFixtures')
const { initialUsers } = require('./fixtures/userFixtures')

const initializeDB = async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})

    const users = await User.insertMany(initialUsers)
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

module.exports = {
    blogsInDB, usersInDB, getAUser, getTestsBlogWithUserReference, initializeDB
}