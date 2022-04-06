const handlerFactory = require('./handlerFactory')
const User = require('../modelsDB/user.model')
const catchAsync = require('../utils/catchAsync')


exports.createUser = catchAsync(async (req, res) => {
   res.status(404).json({
      status: 'fail',
      message: 'To signup please use /api/auth/signup'
   })
})

exports.getAllUsers = handlerFactory.getAll(User)
exports.getOneUser = handlerFactory.getOne(User)
exports.updateOneUser = handlerFactory.updateOne(User)