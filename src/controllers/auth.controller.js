const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/AppError')
const Mail = require('../utils/email')
const User = require('../modelsDB/user.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const util = require('util')
const crypto = require('crypto')


const createJwtToken = (id, exp = process.env.JWT_EXPIRES_IN) => {
   return jwt.sign({id}, process.env.JWT_SECRET, {
      expiresIn: exp
   })
}

exports.createUser = catchAsync(async (req, res, next) => {
   const user = new User(req.body)
   await user.save()

   const token = createJwtToken(user._id)

   res.status(201).json({
      status: 'success',
      message: 'User successfully created',
      id: user._id, token, name: user.name
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

exports.forgotPassword = catchAsync(async (req, res, next) => {
   // 1) Check if client sent email
   if (!req.body.email) return next(new AppError('Provide email address in request body'))

   // 2) Check if there is user with such email
   const user = await User.findOne({email: req.body.email})
   if (!user) return next(new AppError("No user with such email", 404))


   // 3) Create reset token and save it
   const token = user.createResetToken()
   await user.save({validateBeforeSave: false})

   // 4) Try to send it to email via nodemailer
   try {
      // Create link
      const resetUrl = `${req.protocol}://${req.get('host')}/api/auth/resetPassword/${token}`

      // Send email
      const newEmail = new Mail(user, resetUrl)
      await newEmail.send(
         'Reset token',
         'If u wanna reset your password click this link: <url>'
      )

      res.json({
         status: 'success',
         message: 'Link to reset password was send on email'
      })
   } catch (e) {
      // If error drop token and exp fields in db
      user.resetToken = undefined;
      user.resetExpires = undefined;

      await user.save({ validateBeforeSave: false });

      return next(new AppError('Something went wrong during sending email', 500))
   }
})

exports.resetPassword = catchAsync(async (req, res, next) => {
   // 1) Check if there is right body
   const {password, passwordConfirm} = req.body
   if (!password || !passwordConfirm)
      return next(new AppError('Provide both password and passwordConfirm', 400))

   // 2) Generate hashed token
   const token = req.params.token
   const hashedToken = crypto
      .createHash('sha224')
      .update(token)
      .digest('hex')


   const user = await User.findOne({
      resetToken: hashedToken,
      resetExpires: { $gte: Date.now() }
   })

   // 3) If no user with that token and exp date return error
   if (!user) return next(new AppError('Token is invalid or has expired'))

   // 4) Update user
   user.password = password
   user.passwordConfirm = passwordConfirm

   user.resetToken = undefined
   user.resetExpires = undefined

   await user.save()

   res.json({
      status: 'success',
      message: 'Password was successfully updated',
      user
   })
})

exports.updatePassword = catchAsync(async (req, res, next) => {
   const {oldPassword, password, passwordConfirm} = req.body

   // 1) Check if clint provide all necessary data
   if (!password || !passwordConfirm || !oldPassword)
      return next(new AppError('Please provide password and passwordConfirm and oldPassword', 400))

   const user = await User.findById(req.userId).select('+password')

   // 2) Check if password is correct
   const isRight = await bcrypt.compare(oldPassword, user.password)
   if (!isRight) return next(new AppError('Invalid password', 401))

   // 3) Change user
   user.password = password
   user.passwordConfirm = passwordConfirm

   await user.save()

   res.json({
      status: 'success',
      message: "User password updated",
      user
   })
})

exports.protectAndSetUserId = catchAsync(async (req, res, next) => {
   const secret = process.env.JWT_SECRET

   // 1) Check if client send a token
   if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer'))
      return next(new AppError('Please login', 401))

   const token = req.headers.authorization.split(' ')[1]

   // 2) Check if token is correct
   const jwtData = await util.promisify(jwt.verify)(token, secret)
   const {id, iat} = jwtData

   // 3) Check existence of user
   const user = await User.findById(id).select('+passwordChanged +role')
   if (!user) return next(new AppError('No user with such id', 404))

   // 4) Check dates
   if (user.passwordChanged > iat * 1000)
      return next(new AppError('Password has been changed, login again', 401))

   req.userId = id
   req.userRole = user.role

   next()
})

exports.restrictTo = (roles) => catchAsync(async (req, res, next) => {
   // Check if user has access to that
   if (!roles.includes(req.userRole))
      return next(new AppError('You have no permission do this action', 403))

   next()
})