const {Router} = require('express')
const catchAsync = require('../utils/catchAsync')
const AppError = require("../utils/AppError")
const fs = require('fs')
const path = require('path')


const router = Router()

router.get('/:type/:product/:photo', catchAsync(async (req, res, next) => {
   const photoPath = path.resolve(
      'public/img', req.params.type, req.params.product, req.params.photo
   )

   if (!fs.existsSync(photoPath))
      next(new AppError('No such file or directory', 404))

   res.sendFile(photoPath)
}))


module.exports = router