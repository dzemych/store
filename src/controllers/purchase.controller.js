const handlerFactory = require('./handlerFactory')
const Purchase = require('../modelsDB/purchase.model')


exports.getAllPurchases = handlerFactory.getAll(Purchase)
exports.createOnePurchase = handlerFactory.createOne(Purchase)
exports.getOnePurchase = handlerFactory.getOne(Purchase)
exports.updateOnePurchase = handlerFactory.updateOne(Purchase)

exports.getMyPurchases = (req, res, next) => {
   handlerFactory.getAll(Purchase, {user: req.userId})(req, res, next)
}

exports.deleteOnePurchase = handlerFactory.deleteOneFeature(Purchase, 'updateUser', 'user')