const {Router} = require('express')
const productController = require('../controllers/product.controller')


const router = Router()

router.get('/topProducts', productController.getTopProducts)

router
   .route('/')
   .get(productController.getAllProducts)
   .post(productController.createOneProduct)

router
   .route('/:slug')
   .get(productController.getOneProduct)
   .patch(productController.updateOneProduct)


module.exports = router