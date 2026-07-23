const jwt = require('jsonwebtoken')
const loginRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

loginRouter.post('/', async (req, res) => {
    const { username, password } = req.body
    const user = await User.findOne({ username })
    const passWordCorrect = user === null
        ? false
        : await bcrypt.compare(password, user.passwordHash)

    if (!user || !passWordCorrect) {
        console.log('user', user)
        console.log('passwordcorrect - ', passWordCorrect)
        return res.status(401).send({ error: 'invalid password or username' })
    }

    const userForToken = {
        username: user.username,
        id: user._id,
    }

    const token = jwt.sign(userForToken, process.env.SECRET)

    res.status(200).send({
        token,
        username: user.username,
        name:user.name
    })

})

module.exports = loginRouter