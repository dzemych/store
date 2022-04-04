const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/AppError')
const Product = require('../modelsDB/product.model')
const APIfeatures = require('../utils/APIfeatures')
const handlerFactory = require('../controllers/handlerFactory')


exports.getTopProducts = handlerFactory.getAll(Product, {sort: '-sold,price'})
exports.getAllProducts = handlerFactory.getAll(Product)
exports.getOneProduct = handlerFactory.getOne(Product)
exports.createOneProduct = handlerFactory.createOne(Product)
exports.updateOneProduct = handlerFactory.updateOne(Product)