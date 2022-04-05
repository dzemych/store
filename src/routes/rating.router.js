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
      ratingController.createRating
   )

router.get(
   '/myRatings',
   authController.protectAndSetUserId,
   ratingController.getMyRatings
)

router
   .route('/:id')
   .patch(
      authController.protectAndSetUserId,
      checkUpdate,
      ratingController.updateRating
   )
   .delete(
      authController.protectAndSetUserId,
      ratingController.deleteRating
   )

module.exports = router