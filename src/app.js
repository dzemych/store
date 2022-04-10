const express = require('express')
const errorController = require('./controllers/error.controller')
const Router = require('./router')
const app = express()
const rateLimiter = require('express-rate-limit')
const helmet = require('helmet')
const mongoSanitize = require('express-mongo-sanitize')
const xssClean = require('xss-clean')
const cors = require('cors')


// 1) SECURITY middlewares
// * Clean url from malicious code
app.use(helmet())
app.use(mongoSanitize())
app.use(xssClean())

// * Limit requests
app.use(rateLimiter({
   max: 1000,
   windowMs: 60 * 1000,
   message: 'To many requests from this IP'
}))

// * Cors
app.use(cors())

// 2) PARSING middlewares
app.use(express.json())

// 3) ROUTES
app.use('/', Router)

//| Error handler
app.use(errorController)

module.exports = app