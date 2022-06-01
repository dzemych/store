const {Router} = require('express')
const authController = require('../controllers/auth.controller')
const purchaseController = require('../controllers/purchase.controller')
const checkUpdate = require('../middleware/updateCheck.middleware')


const router = Router()


router
   .route('')
   .get(
      authController.protectAndSetUserId,
      authController.restrictTo(['admin']),
      purchaseController.getAllPurchases
   )
   .post(
      purchaseController.createOnePurchase
   )

router
   .get(
      '/myPurchases',
      authController.protectAndSetUserId,
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