const usersRouter= require('express').Router()
const User = require('../models/user')
const logger = require('../utils/logger')

usersRouter.get('/', async (req, res) => {
    const users = await User.find({})
    response.json(users)

})

module.exports = usersRouter
