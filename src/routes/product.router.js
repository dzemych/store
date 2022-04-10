const {Router} = require('express')
const productController = require('../controllers/product.controller')
const authController = require('../controllers/auth.controller')
const checkUpdate = require('../middleware/updateCheck.middleware')


const router = Router()

router.get('/topProducts', productController.getTopProducts)

router
   .route('/')
   .get(productController.getAllProducts)
   .post(
      authController.protectAndSetUserId,
      authController.restrictTo(['admin']),
      productController.createOneProduct
   )

// router.get(
//    '/:slug/getPhoto/:fileName',
//    productController.getOnePhoto
// )

router.patch(
   '/:slug/updatePhotosOrder',
   checkUpdate,
   authController.protectAndSetUserId,
   authController.restrictTo('admin'),
   productController.parsePhotos,
   productController.updatePhoto
)

// .router.patch(
//    '/:slug/addNewPhoto'
// )

router.post(
   '/:slug/uploadPhotos',
   authController.protectAndSetUserId,
   authController.restrictTo('admin'),
   productController.parsePhotos,
   productController.uploadProductPhotos
)

router
   .route('/:slug')
   .get(productController.getOneProduct)
   .patch(
      checkUpdate,
      authController.protectAndSetUserId,
      authController.restrictTo(['admin']),
      productController.updateOneProduct
   )


module.exports = router