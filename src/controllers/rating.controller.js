const Rating = require('../modelsDB/rating.model')
const handlerFactory = require('./handlerFactory')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/AppError')


exports.getAllRatings = handlerFactory.getAll(Rating)
exports.createRating = handlerFactory.createOne(Rating)

exports.getMyRatings = (req, res, next) => {
   handlerFactory.getAll(Rating, {user: req.userId})(req, res, next)
}

exports.updateRating = catchAsync(async (req, res, next) => {
   const rating = await Rating.findOneAndUpdate(
      {_id: req.params.id, user: req.userId},
      {...req.body},
      {runValidators: true}
      )

   if (!rating)
      return next(new AppError('No rating found with that id which would belong to you', 404))

   res.json({
      status: 'success',
      message: 'Data successfully updated',
      rating: {...rating._doc, ...req.body}
   })
})

exports.deleteRating = catchAsync(async (req, res, next) => {
   const isDelete = await Rating.deleteOne({
      _id: req.params.id,
      user: req.userId
   })

   console.log(isDelete.deletedCount)
   if (!isDelete || isDelete.deletedCount < 1)
      return next(new AppError('No rating found with that id which would belong to you', 404))

   res.status(204).send()
})