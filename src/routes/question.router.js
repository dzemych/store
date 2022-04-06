const {Router} = require('express')
const authController = require('../controllers/auth.controller')
const questionController = require('../controllers/question.controller')
const checkUpdate = require('../middleware/updateCheck.middleware')


const router = Router()

router
   .route('/')
   .get(questionController.getAllQuestions)
   .post(
      authController.protectAndSetUserId,
      authController.restrictTo(['admin', 'user']),
      questionController.createOneQuestion
   )

router.get(
   '/myQuestions',
   authController.protectAndSetUserId,
   authController.restrictTo(['admin', 'user']),
   questionController.getMyQuestions
)

router
   .route('/:id')
   .get(questionController.getOneQuestion)
   .patch(
      authController.protectAndSetUserId,
      checkUpdate,
      questionController.updateOneQuestion
   )
   .delete(
      authController.protectAndSetUserId,
      authController.restrictTo(['admin']),
      questionController.deleteOneQuestion
   )


module.exports = router