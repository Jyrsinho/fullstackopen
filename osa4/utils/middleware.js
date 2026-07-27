const logger = require('./logger')
const jwt = require('jsonwebtoken')

const requestLogger = (request, response, next) => {
    logger.info('Method:', request.method)
    logger.info('Path:  ', request.path)
    logger.info('Body:  ', request.body)
    logger.info('---')
    next()
}

const tokenExtractor = (req, res, next) => {
    const authorization = req.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
        req.token = authorization.replace('Bearer ', '')
    }
    next()
}

const userExtractor = (request, response, next) => {
    const token = request.token
    if (token) {
        const decodedToken = jwt.verify(request.token, process.env.SECRET)
        if (!decodedToken.id) {
            return response.status(401).json({ error: 'Token invalid' })
        }
        request.user = decodedToken.id
    }
    next()
}

const unknownEndpoint = (request, response) => {
    console.log('Unknown endpoint :', request.url)
    response.status(404).json({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }
    if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }
    if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
        return response
            .status(400)
            .json({ error: 'username must be unique' })
    }

    next(error)
}

module.exports = {
    requestLogger, unknownEndpoint, errorHandler, tokenExtractor, userExtractor
}