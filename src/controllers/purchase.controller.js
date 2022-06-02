const handlerFactory = require('./handlerFactory')
const Purchase = require('../modelsDB/purchase.model')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/AppError')
const APIFeatures = require('../utils/APIfeatures')


exports.getAllPurchases = handlerFactory.getAll(Purchase)
exports.getOnePurchase = handlerFactory.getOne(Purchase)
exports.updateOnePurchase = handlerFactory.updateOne(Purchase)
exports.getPurchasesFromArr = catchAsync(async (req, res, next) => {
   const ids = req.body.purchases

   if (!ids)
      return next(new AppError('No ids found', 400))

   const features = new APIFeatures(Purchase, {
      _id: {in: ids}
   })

   features.filter()

   const data = await features.query.lean()

   res.json({
      status: 'success',
      data
   })
})

exports.createOnePurchase = catchAsync(async (req, res, next) => {
   // 1) Create new instance of db collection
   const data = await Purchase.create({...req.body})

   console.log(data)

   res.status(201).json({
      status: 'success',
      message: 'Data has successfully created',
      data
   })
})

exports.getMyPurchases = (req, res, next) => {
   handlerFactory.getAll(Purchase, {user: req.userId})(req, res, next)
}

exports.deleteOnePurchase = handlerFactory.deleteOneFeature(Purchase, 'updateUser', 'user')