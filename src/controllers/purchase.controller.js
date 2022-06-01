const handlerFactory = require('./handlerFactory')
const Purchase = require('../modelsDB/purchase.model')
const catchAsync = require('../utils/catchAsync')


exports.getAllPurchases = handlerFactory.getAll(Purchase)
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
exports.getOnePurchase = handlerFactory.getOne(Purchase)
exports.updateOnePurchase = handlerFactory.updateOne(Purchase)

exports.getMyPurchases = (req, res, next) => {
   handlerFactory.getAll(Purchase, {user: req.userId})(req, res, next)
}

exports.deleteOnePurchase = handlerFactory.deleteOneFeature(Purchase, 'updateUser', 'user')