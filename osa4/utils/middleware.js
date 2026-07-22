const logger = require('./logger')

const requestLogger = (request, response, next) => {
    logger.info('Method:', request.method)
    logger.info('Path:  ', request.path)
    logger.info('Body:  ', request.body)
    logger.info('---')
    next()
}

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
    if (error.name === 'ValidationError') {
        return response.status(400).send({ error: 'invalid blog' })
    }
    logger.error(error.message)
    response.status(404).send({ error: 'unknown error' })

    next(error)
}

module.exports = {
    requestLogger, unknownEndpoint, errorHandler
}