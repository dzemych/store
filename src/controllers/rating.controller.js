const Rating = require('../modelsDB/rating.model')
const handlerFactory = require('./handlerFactory')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/AppError')
const mongoose = require('mongoose')
const APIfeatures = require("../utils/APIfeatures");


exports.getAllRatings = handlerFactory.getAll(Rating)
exports.createRating = handlerFactory.createOne(Rating)

exports.getMyRatings = (req, res, next) => {
   handlerFactory.getAll(Rating, {user: req.userId})(req, res, next)
}

exports.updateRating = (req, res, next) => {
   handlerFactory
      .updateOne(Rating, '_id', 'id', {user: req.userId})
      (req, res, next)
}

exports.getProductRatingStats = catchAsync(async (req, res, next) => {
   const data = await Rating.aggregate([
      {
         $match: { product: mongoose.Types.ObjectId(req.params.id) }
      },
      {
         $group: { _id: '$rating', num: {$sum: 1} }
      }
   ])

   if (!data)
      next(new AppError('No ratings found', 404))

   const ratings = data.reduce((acc, el) => {
      acc[el._id] = el.num
      return acc
   }, {})

   res.json({
      status: 'success',
      ratings
   })
})

exports.getProductRatings = catchAsync(async (req, res, next) => {
   const features = new APIfeatures(Rating, {product: mongoose.Types.ObjectId(req.params.id)})
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
      next(new AppError('No reviews found', 404))

   res.json({
      status: 'success',
      message: `Data successfully received`,
      results: data.length,
      data
   })
})

exports.deleteRating = handlerFactory.deleteOneFeature(Rating, 'calcAvg', 'product')