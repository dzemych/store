const {Router} = require('express')
const ratingController = require('../controllers/rating.controller')
const authController = require('../controllers/auth.controller')
const checkUpdate = require('../middleware/updateCheck.middleware')


const router = Router()

// 1) Check if login
router.use(authController.protectAndSetUserId)

// 2) User routes
router.use(authController.restrictTo(['admin', 'user']),)

router
   .route('/')
   .get(ratingController.getAllRatings)
   .post(ratingController.createRating)

router.get(
   '/myRatings',
   ratingController.getMyRatings
)

// 3) Admin routes
router.use(authController.restrictTo(['admin']),)

router
   .route('/:id')
   .patch(
      checkUpdate,
      ratingController.updateRating
   )
   .delete(ratingController.deleteRating)

module.exports = router