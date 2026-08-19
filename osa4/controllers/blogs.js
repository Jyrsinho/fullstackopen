const blogsRouter= require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')


blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    console.log('blogsrouter', blogs)
    response.status(200).json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
    const id = request.params.id
    const blog = await Blog.findById(id)
    response.status(200).json(blog)
})

blogsRouter.post('/', async (request, response) => {
    console.log('blogsRouter')
    const body = request.body
    console.log('body', body)
    const userID = request.user
    console.log('userID', userID)
    const user = await User.findById(userID)
    if (!user) {
        return response.status(401).json({ message: 'userid missing or not valid ' })
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
    const userID = request.user

    const idToDelete = await Blog.findById(id)
    if (idToDelete.user.toString() === userID.toString()) {
        await Blog.findByIdAndDelete(id)
        response.status(204).end()
    } else {
        response.status(401).end()
    }
})

blogsRouter.put('/:id', async (request, response) => {
    const body = request.body

    const blog = await Blog.findById(request.params.id).populate('user', { username: 1, name: 1 })
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