const handlerFactory = require('./handlerFactory')
const User = require('../modelsDB/user.model')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/AppError')


exports.getMe = catchAsync(async (req, res, next) => {
   // 1) Get data from collection
   const user = await User.findById(req.userId)

   // 2) If no data return error
   if (!user) return next(new AppError('No such data found', 404))

   res.json({
      status: 'success',
      message: `User successfully received`,
      user
   })
})

exports.updateMe = catchAsync(async (req, res, next) => {
   // 1) Check if body has no password
   if (req.body.password || req.body.passwordConfirm)
      return next(new AppError('To change password use /api/forgotPassword', 403))

   // 2) Try to find and update data
   const user = await User.findByIdAndUpdate(
      req.userId,
      {...req.body},
      {runValidators: true})

   // 3) If no data with that key return error
   if (!user) return next(new AppError('No such data found', 404))

   res.json({
      status: 'success',
      message: 'User successfully updated',
      user: {...user._doc, ...req.body}
   })
})

exports.createUser = catchAsync(async (req, res, next) => {
   res.status(404).json({
      status: 'fail',
      message: 'To signup please use /api/auth/signup'
   })
})

exports.getAllUsers = handlerFactory.getAll(User)
exports.getOneUser = handlerFactory.getOne(User)
exports.updateOneUser = handlerFactory.updateOne(User)