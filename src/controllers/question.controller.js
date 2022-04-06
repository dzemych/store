const handlerFactory = require('../controllers/handlerFactory')
const Question = require('../modelsDB/question.model')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/AppError')


exports.getAllQuestions = handlerFactory.getAll(Question)
exports.createOneQuestion = handlerFactory.createOne(Question)
exports.getOneQuestion = handlerFactory.getOne(Question)
exports.updateOneQuestion = (req, res, next) => {
   handlerFactory
      .updateOne(Question, '_id', 'id', {user: req.userId})
      (req, res, next)
}

exports.getMyQuestions = (req, res, next) => {
   console.log(req.userId)
   handlerFactory.getAll(Question, {user: req.userId})(req, res, next)
}

exports.deleteOneQuestion = catchAsync(async (req, res, next) => {
   // 1) Check if there is such question
   const question = await Question.findOne({
      _id: req.params.id,
      user: req.userId
   })

   if (!question)
      return next(new AppError('No data found with that id which would belong to you', 404))

   // 2) Delete document
   await question.remove()

   // 3) Update relative collections
   await Question
      .updateColls(question._id, question.user, question.product, 'remove')

   res.status(204).send()
})