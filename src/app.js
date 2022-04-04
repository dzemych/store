const express = require('express')
const productRouter = require('./routes/product.router')
const userRouter = require('./routes/user.router')
const authRouter = require('./routes/auth.router')
const AppError = require('./utils/AppError')
const errorController = require('./controllers/error.controller')


const app = express()

// HEADER middlewares

// BODY middlewares
app.use(express.json())

// ROUTES
app.use('/api/items', productRouter)
app.use('/api/user', userRouter)
app.use('/api/auth', authRouter)

app.use('*', (req, res, next) => {
   next(new AppError('This route is not yet defined', 404))
})

// Error handler
app.use(errorController)

module.exports = app