const handlerFactory = require('./handlerFactory')
const User = require('../modelsDB/user.model')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/AppError')
const bcrypt = require('bcryptjs')
const validator = require('validator')


exports.createUser = catchAsync(async (req, res) => {
   res.status(404).json({
      status: 'fail',
      message: 'To signup please use /api/auth/signup'
   })
})

exports.updateEmail = catchAsync(async (req, res, next) => {
   if (!req.body.password || !req.body.email)
      return next(new AppError('Enter correct body with email and password', 400))

   if (!validator.isEmail(req.body.email))
      return next(new AppError('Enter correct email', 400))

   const user = await User.findById(req.params.id).select('+password')
   if (!user) return next(new AppError('Invalid user id', 404))

   const isRight = await bcrypt.compare(req.body.password, user.password)
   if (!isRight) return next(new AppError('Invalid password', 401))

   user.email = req.body.email
   await user.save({validateBeforeSave: false})

   res.json({
      status: 'success',
      message: 'User email was successfully updated',
      user
   })
})

exports.getAllUsers = handlerFactory.getAll(User)
exports.getOneUser = handlerFactory.getOne(User)

exports.updateOneUser = catchAsync(async (req, res, next) => {
   const user = await User.findById(req.params.id)

   // Id no user return error
   if (!user) return next(new AppError('No such user found', 404))

   // Update user without missing fields
   Object.keys(req.body).forEach(key => {
      const type = typeof req.body[key]

      if (type === 'object') {
         const oldValue = {...user[key]}._doc
         user[key] = {...oldValue, ...req.body[key]}
      } else {
         user[key] = req.body[key]
      }
   })

   await user.save({validateBeforeSave: false})

   res.json({
      status: 'success',
      message: 'Data successfully updated',
      user
   })
})