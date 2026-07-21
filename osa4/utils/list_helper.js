const _ = require('lodash')
const {hasToStringMethod} = require("fast-check");

const totalLikes = (blogs) => {
    const countLikes = (prev, current) => {
        return current.likes + prev
    }
    return blogs.reduce(countLikes, 0)
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) return null
    const cb = (acc, current) => {
        return (acc.likes >= current.likes)
            ? acc
            : current
    }
    return blogs.reduce(cb)
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) return null

    const histogram = _.countBy(blogs, 'author')

    const bloggers = Object.entries(histogram).map(([author, blogCount]) => ({
        author,
        blogs: blogCount
    }))

    const mostProlificBlogger = bloggers.reduce((mostProlific, current) => {
        return (mostProlific.blogs >= current.blogs)
            ? mostProlific
            : current
    })

    return {
        author : mostProlificBlogger.author,
        blogs: mostProlificBlogger.blogs
    }
}

module.exports = { totalLikes, favoriteBlog, mostBlogs}