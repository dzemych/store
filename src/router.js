const {Router} = require('express')
const AppError = require('./utils/AppError')
const productRouter = require('./routes/product.router')
const userRouter = require('./routes/user.router')
const authRouter = require('./routes/auth.router')
const ratingRouter = require('./routes/rating.router')
const purchaseRouter = require('./routes/purchase.router')
const questionRouter = require('./routes/question.router')
const contactRouter = require('./routes/contact.router')
const imgRouter = require('./routes/img.router')


const router = Router()

router.use('/product', productRouter)
router.use('/user', userRouter)
router.use('/auth', authRouter)
router.use('/rating', ratingRouter)
router.use('/purchase', purchaseRouter)
router.use('/question', questionRouter)
router.use('/contact', contactRouter)
router.use('/img', imgRouter)

router.use('*', (req, res, next) => {
   next(new AppError('This route is not yet defined', 404))
})

module.exports = router