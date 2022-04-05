const {Router} = require('express')
const userController = require('../controllers/user.controller')
const authController = require('../controllers/auth.controller')


const router = Router()

router
   .route('/')
   .get(authController.protectAndSetUserId, userController.getAllUsers)
   .post(userController.createUser)

router.get(
   '/me',
   authController.protectAndSetUserId,
   userController.getMe
)

router.patch(
   '/updateMe',
   authController.protectAndSetUserId,
   userController.updateMe
)

router
   .route('/:id')
   .get(authController.protectAndSetUserId, userController.getOneUser)
   .patch(authController.protectAndSetUserId, userController.updateOneUser)

module.exports = router