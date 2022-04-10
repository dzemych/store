const {Router} = require('express')
const AppError = require('./utils/AppError')
const productRouter = require('./routes/product.router')
const userRouter = require('./routes/user.router')
const authRouter = require('./routes/auth.router')
const ratingRouter = require('./routes/rating.router')
const purchaseRouter = require('./routes/purchase.router')
const questionRouter = require('./routes/question.router')
const contactRouter = require('./routes/contact.router')


const router = Router()

router.use('/api/product', productRouter)
router.use('/api/user', userRouter)
router.use('/api/auth', authRouter)
router.use('/api/rating', ratingRouter)
router.use('/api/purchase', purchaseRouter)
router.use('/api/question', questionRouter)
router.use('/api/contact', contactRouter)

router.use('*', (req, res, next) => {
   next(new AppError('This route is not yet defined', 404))
})

module.exports = router