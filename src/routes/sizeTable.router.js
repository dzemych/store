const {Router} = require('express')
const authController = require('../controllers/auth.controller')
const sizeTableController = require('../controllers/sizeTable.controller')


const router = Router()


router
   .route('/')
   .get(sizeTableController.getSizeTables)
   .post(
      authController.protectAndSetUserId,
      authController.restrictTo(['admin']),
      sizeTableController.createSizeTable
   )

router.patch(
   '/:id',
      authController.protectAndSetUserId,
      authController.restrictTo(['admin']),
      sizeTableController.updateSizeTable
   )


module.exports = router