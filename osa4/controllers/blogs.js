const blogsRouter= require('express').Router()
const Blog = require('../models/blog')
const logger = require('../utils/logger')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
    logger.info('new blog posted')
    const body = request.body
    const blog = new Blog({
        author: body.author,
        title: body.title,
        url: body.url,
        likes: body.likes ?? 0
    })
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
})

module.exports = blogsRouter