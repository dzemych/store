const {Router} = require('express')
const userController = require('../controllers/user.controller')
const authController = require('../controllers/auth.controller')
const checkUpdate = require('../middleware/updateCheck.middleware')
const setMyId = require('../middleware/setMyId.middleware')


const router = Router()

router
   .route('/')
   .get(
      authController.protectAndSetUserId,
      authController.restrictTo(['admin']),
      userController.getAllUsers
   )
   .post(userController.createUser)

router.get(
   '/me',
   authController.protectAndSetUserId,
   setMyId,
   userController.getOneUser
)

router.patch(
   '/updateMe',
   authController.protectAndSetUserId,
   checkUpdate,
   setMyId,
   userController.updateOneUser
)

router.patch(
   '/updateEmail/me',
   authController.protectAndSetUserId,
   setMyId,
   userController.updateEmail
)

router.patch(
   '/updateEmail/:id',
   authController.protectAndSetUserId,
   authController.restrictTo(['admin']),
   userController.updateEmail
)

router
   .route('/:id')
   .get(
      authController.protectAndSetUserId,
      authController.restrictTo(['admin']),
      userController.getOneUser
   )
   .patch(
      authController.protectAndSetUserId,
      authController.restrictTo(['admin']),
      checkUpdate,
      userController.updateOneUser
   )


module.exports = router