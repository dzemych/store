const Rating = require('../modelsDB/rating.model')
const handlerFactory = require('./handlerFactory')


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

exports.deleteRating = handlerFactory.deleteOneFeature(Rating, 'calcAvg', 'product')