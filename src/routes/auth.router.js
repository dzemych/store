const {Router} = require('express')
const authController = require('../controllers/auth.controller')


const router = Router()

router.post('/login', authController.loginUser)
router.post('/signup', authController.createUser)

module.exports = router