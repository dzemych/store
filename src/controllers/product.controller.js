const Product = require('../modelsDB/product.model')
const handlerFactory = require('../controllers/handlerFactory')


exports.getTopProducts = handlerFactory.getAll(Product, {sort: '-sold,price'})
exports.getAllProducts = handlerFactory.getAll(Product)
exports.getOneProduct = handlerFactory.getOne(Product, 'slug', 'slug')
exports.createOneProduct = handlerFactory.createOne(Product)
exports.updateOneProduct = handlerFactory.updateOne(Product, 'slug', 'slug')