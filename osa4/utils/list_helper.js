const _ = require('lodash')
const {hasToStringMethod} = require("fast-check");
const {reduce} = require("lodash/collection");

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

/*
Funktio selvittää kirjoittajan, jonka blogeilla on eniten tykkäyksiä.
Funktion paluuarvo kertoo myös suosikkibloggaajan likejen yhteenlasketun määrän:
 */
const mostLikes = (blogs) => {
    if (blogs.length === 0) return null

    const groupedByAuthor = _.groupBy(blogs, 'author')

    const authorLikesSummed = Object.entries(groupedByAuthor).map(([author, authorBlogArray]) => {
        return {
            author,
            likes: _.sumBy(authorBlogArray, 'likes')
        }
    })
    
    const mostLiked = _.maxBy(authorLikesSummed, (author) =>author.likes )

    return {
        author: mostLiked.author,
        likes: mostLiked.likes,
    }
}

module.exports = { totalLikes, favoriteBlog, mostBlogs, mostLikes }