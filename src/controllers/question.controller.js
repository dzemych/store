const handlerFactory = require('../controllers/handlerFactory')
const Question = require('../modelsDB/question.model')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/AppError')
const APIfeatures = require("../utils/APIfeatures");
const mongoose = require('mongoose')


exports.createOneQuestion = handlerFactory.createOne(Question)
exports.getOneQuestion = handlerFactory.getOne(Question)
exports.updateOneQuestion = (req, res, next) => {
   handlerFactory
      .updateOne(Question, '_id', 'id')
      (req, res, next)
}
exports.getMyQuestions = (req, res, next) => {
   handlerFactory.getAll(Question, {user: req.userId})(req, res, next)
}

exports.getAllQuestions = catchAsync(async (req, res, next) => {
   // 1) Create queryObj and query it throw filter obj
   const features = new APIfeatures(Question, {...req.query})

   features
      .filter()
      .populate({
         path: 'user',
         select: 'name'
      })
      .populate({
         path: 'product',
         select: 'price title slug sex mainPhoto'
      })
      .paginate()

   // 2) Get queried data
   const questions = await features.query.lean()

   res.json({
      status: 'success',
      message: `Data successfully received`,
      results: questions.length,
      questions: questions,
   })
})

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

exports.getProductQuestions = catchAsync(async (req, res, next) => {
   const features = new APIfeatures(Question, {product: mongoose.Types.ObjectId(req.params.id)})
   features
      .filter()
      .sort()
      .select()
      .paginate()

   // 3) Get queried data
   const data = await features.query.populate({
      path: 'user',
      select: '_id name'
   }).lean()

   if (!data)
      next(new AppError('No questions found', 404))

   res.json({
      status: 'success',
      message: `Data successfully received`,
      results: data.length,
      data
   })
})