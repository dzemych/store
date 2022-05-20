const {Router} = require('express')
const authController = require('../controllers/auth.controller')


const router = Router()

router.post('/login', authController.loginUser)
router.post('/signup', authController.createUser)

router.post('/resetPassword/:token', authController.resetPassword)
router.post('/resetPassword', authController.forgotPassword)

router.patch(
   '/updateUser',
   authController.protectAndSetUserId,
   authController.updateUser
)

module.exports = router