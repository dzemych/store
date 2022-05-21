const {Router} = require('express')
const userController = require('../controllers/user.controller')
const authController = require('../controllers/auth.controller')
const checkUpdate = require('../middleware/updateCheck.middleware')
const setMyId = require('../middleware/setMyId.middleware')


const router = Router()

router.use(authController.protectAndSetUserId)

router.patch('/changeWishList', userController.fetchWishList)
router.patch('/changeBasket', userController.fetchBasket)

router.get(
   '/me',
   setMyId,
   userController.getOneUser
)

router.patch(
   '/updateMe',
   checkUpdate,
   setMyId,
   userController.updateOneUser
)

router.patch(
   '/updateEmail/me',
   setMyId,
   userController.updateEmail
)

router.use(authController.restrictTo(['admin']),)

router
   .get(
      '/',
      userController.getAllUsers
   )

router.patch(
   '/updateEmail/:id',
   userController.updateEmail
)

router
   .route('/:id')
   .get(
      userController.getOneUser
   )
   .patch(
      checkUpdate,
      userController.updateOneUser
   )


module.exports = router