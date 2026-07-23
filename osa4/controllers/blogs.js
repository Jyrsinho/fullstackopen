const blogsRouter= require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
    response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
    const body = request.body
    console.log('body', body)
    const user = await User.findById(body.user)
    console.log('does this ever happen')
    console.log('User', user)
    if (!user) {
        return response.status(400).json({ error: 'userid missing or not valid ' })
    }

    const blog = new Blog({
        author: body.author,
        title: body.title,
        url: body.url,
        likes: body.likes ?? 0,
        user: user._id,
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
    if (!blog) {
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