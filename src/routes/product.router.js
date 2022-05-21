const {Router} = require('express')
const productController = require('../controllers/product.controller')
const authController = require('../controllers/auth.controller')
const checkUpdate = require('../middleware/updateCheck.middleware')


const router = Router()

router.get('/topProducts', productController.getTopProducts)
router.post('/getProducts', productController.getProductsFromArr)

router
   .route('/')
   .get(productController.getAllProducts)
   .post(
      authController.protectAndSetUserId,
      authController.restrictTo(['admin']),
      productController.createOneProduct
   )

router.get('/allCategories', productController.getAllCategories)

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