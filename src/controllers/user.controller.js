const handlerFactory = require('./handlerFactory')
const User = require('../modelsDB/user.model')


exports.updateUser = handlerFactory.updateOne(User)
exports.getOneUser = handlerFactory.getOne(User)