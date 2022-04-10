const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/AppError')


module.exports = catchAsync(async (req, res, next) => {
   if (!req.body || Object.keys(req.body).length < 1)
      return next(new AppError('No body to update', 400))

   if (req.body.password || req.body.passwordConfirm)
      return next(new AppError(
         'To change password use /api/auth/updatePassword or forgotPassword',
         401
      ))

   if (req.body.email)
      return next(new AppError('To change email use /api/user/updateEmail/me', 401))

   // if (req.body.photos || req.body.mainPhoto)
   //    return next(new AppError('To update photo please use proper router', 403))

   next()
})