const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/AppError')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../modelsDB/user.model')


const createJwtToken = id => {
   return jwt.sign({id}, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN
   })
}

exports.createUser = catchAsync(async (req, res, next) => {
   const user = new User(req.body)
   await user.save()

   const token = createJwtToken(user._id)

   res.status(201).json({
      status: 'success',
      message: 'User successfully created',
      id: user._id, token
   })
})

exports.loginUser = catchAsync(async (req, res, next) => {
   // 1) Check if email if email and password exists
   const {email, password} = req.body
   if (!email || !password) return next(new AppError('Please provide email and password.', 400))

   // 2) Check if user exists
   const user = await User.findOne({email: req.body.email}).select('+password +_id')
   if (!user) return next(new AppError('No user found with that email', 404))

   // 3) Check if password is correct
   console.log(password, user.password)
   const isRight = await bcrypt.compare(password, user.password)
   if (!isRight) return next(new AppError('Invalid password', 400))

   // 4) Create jwt token
   const token = createJwtToken(user._id)

   res.json({
      status: 'success',
      message: 'Logged in',
      id: user._id, token
   })
})

exports.protectAndSetUserId = catchAsync(async (req, res, next) => {
   // 1) Check if client send a token
   if (!req.headers.authorization) return next(new AppError('Please login', 401))
   const token = req.headers.authorization.split(' ')[1]


})