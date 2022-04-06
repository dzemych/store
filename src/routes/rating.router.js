const {Router} = require('express')
const ratingController = require('../controllers/rating.controller')
const authController = require('../controllers/auth.controller')
const checkUpdate = require('../middleware/updateCheck.middleware')


const router = Router()

router
   .route('/')
   .get(ratingController.getAllRatings)
   .post(
      authController.protectAndSetUserId,
      authController.restrictTo(['admin', 'user']),
      ratingController.createRating
   )

router.get(
   '/myRatings',
   authController.protectAndSetUserId,
   authController.restrictTo(['admin', 'user']),
   ratingController.getMyRatings
)

router
   .route('/:id')
   .patch(
      authController.protectAndSetUserId,
      authController.restrictTo(['admin']),
      checkUpdate,
      ratingController.updateRating
   )
   .delete(
      authController.protectAndSetUserId,
      authController.restrictTo(['admin']),
      ratingController.deleteRating
   )

module.exports = router