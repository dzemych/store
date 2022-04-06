const {Router} = require('express')
const authController = require('../controllers/auth.controller')
const purchaseController = require('../controllers/purchase.controller')
const checkUpdate = require('../middleware/updateCheck.middleware')


const router = Router()


router
   .route('/')
   .get(
      authController.protectAndSetUserId,
      authController.restrictTo(['admin']),
      purchaseController.getAllPurchases
   )
   .post(
      authController.protectAndSetUserId,
      authController.restrictTo(['user', 'admin']),
      purchaseController.createOnePurchase
   )

router
   .get(
      '/myPurchases',
      authController.protectAndSetUserId,
      authController.restrictTo(['admin', 'user']),
      purchaseController.getMyPurchases
   )

router
   .route('/:id')
   .get(
      authController.protectAndSetUserId,
      authController.restrictTo(['admin', 'user']),
      purchaseController.getOnePurchase
   )
   .patch(
      authController.protectAndSetUserId,
      authController.restrictTo(['admin', 'user']),
      checkUpdate,
      purchaseController.updateOnePurchase
   )
   .delete(
      authController.protectAndSetUserId,
      authController.restrictTo(['admin', 'admin']),
      purchaseController.deleteOnePurchase
   )


module.exports = router