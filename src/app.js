const express = require('express')
const productRouter = require('./routes/product.router')
const userRouter = require('./routes/user.router')
const authRouter = require('./routes/auth.router')
const ratingRouter = require('./routes/rating.router')
const purchaseRouter = require('./routes/purchase.router')
const questionRouter = require('./routes/question.router')
const AppError = require('./utils/AppError')
const errorController = require('./controllers/error.controller')


const app = express()

// HEADER middlewares

// BODY middlewares
app.use(express.json())

// ROUTES
app.use('/api/product', productRouter)
app.use('/api/user', userRouter)
app.use('/api/auth', authRouter)
app.use('/api/rating', ratingRouter)
app.use('/api/purchase', purchaseRouter)
app.use('/api/question', questionRouter)

app.use('*', (req, res, next) => {
   next(new AppError('This route is not yet defined', 404))
})

// Error handler
app.use(errorController)

module.exports = app