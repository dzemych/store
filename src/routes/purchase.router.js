const {Router} = require('express')
const authController = require('../controllers/auth.controller')
const purchaseController = require('../controllers/purchase.controller')
const checkUpdate = require('../middleware/updateCheck.middleware')


const router = Router()


router.use(authController.protectAndSetUserId)

router
   .route('/')
   .get(
      authController.restrictTo(['admin']),
      purchaseController.getAllPurchases
   )
   .post(
      authController.restrictTo(['user', 'admin']),
      purchaseController.createOnePurchase
   )

// Routes accessible to user and admin

router.use(authController.restrictTo(['admin', 'user']))

router
   .get(
      '/myPurchases',
      purchaseController.getMyPurchases
   )

router
   .route('/:id')
   .get(
      purchaseController.getOnePurchase
   )
   .patch(
      checkUpdate,
      purchaseController.updateOnePurchase
   )
   .delete(
      purchaseController.deleteOnePurchase
   )


module.exports = router