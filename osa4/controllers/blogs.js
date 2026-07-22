const blogsRouter= require('express').Router()
const Blog = require('../models/blog')
const logger = require('../utils/logger')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
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

blogsRouter.delete('/:id', async (request, response) => {
    const id = request.params.id
    await Blog.findByIdAndDelete(id)
    response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
    const body = request.body

    const blog = await Blog.findById(request.params.id)
    console.log('BLOG:')
    console.log(blog)
    if (!blog) {
        console.log('NO BLOG - LETS RETURN ---!!!')
        return response.status(404).end()
    }

    blog.title = body.title
    blog.likes = body.likes
    blog.author = body.author
    blog.url = body.url
    const updatedBlog = await blog.save()
    response.status(200).json(updatedBlog)
})

module.exports = blogsRouter