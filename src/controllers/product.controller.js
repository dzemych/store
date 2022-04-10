const Product = require('../modelsDB/product.model')
const handlerFactory = require('../controllers/handlerFactory')
const APIfeatures = require('../utils/APIfeatures')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/AppError')
const multer = require('multer')
const path = require('path')
const fs = require('fs')


const multerStorage = multer.diskStorage({
   destination: async (req, file, cb) => {
      // 1) Create directory
      const dir = path.resolve
      ('public/img/', 'product', req.params.slug)

      // 2) If newly created product creat new directory
      if (!fs.existsSync(dir)){
         fs.mkdirSync(dir);
      }

      return cb(null, dir)
   },
   filename: (req, file, cb) => {
      const ext = file.mimetype.split('/')[1]
      const name = `product-${req.params.slug}-${Date.now()}.${ext}`

      cb(null, name)
   }
})

const multerFilter = async (req, file, cb) => {
   console.log(req)
   //! Check if req has slug
   if (!req.params.slug)
      return cb(new AppError('Provide product slug', 409))

   //! Check if there is such product
   const product = await Product.findOne({slug: req.params.slug}).lean()

   if (!product) return cb(new AppError('No product with such id'))
}

const upload = multer({
   storage: multerStorage
})

const getPhotoPath = (slug, fileName) => {
   return path.resolve('public/img/product', slug, fileName)
}

// exports.getAllProducts = handlerFactory.getAll(Product)
// exports.getOneProduct = handlerFactory.getOne(Product, 'slug', 'slug')
exports.getTopProducts = handlerFactory.getAll(Product, {sort: '-sold,price'})
exports.createOneProduct = handlerFactory.createOne(Product)
exports.updateOneProduct = handlerFactory.updateOne(Product, 'slug', 'slug')

exports.validateProduct = catchAsync(async (req, res, next) => {
   req.product = new Product(req.body)
   next()
})

exports.uploadProductPhotos = catchAsync(async (req, res, next) => {
   if (!req.files)
      return next(new AppError('Please provide at least two photos', 409))

   // 1) Get file names
   const photos = req.files.map(photo => photo.filename)

   // 2) Update product
   const product = await Product.findOneAndUpdate(
      {slug: req.params.slug},
      {photos, mainPhoto: photos[0]},
      {new: true}
   )

   res.json({
      status: "success",
      message: `Photos was successfully added to the product: ${req.params.slug}`,
      product
   })
})

// exports.getOnePhoto = catchAsync(async (req, res, next) => {
//    const file = readFile(path.resolve(
//       'public/img/product',
//       req.params.slug,
//       req.params.fileName
//    ))
//    console.log(req.body)
//
//    const filePaths = req.body.photos.map(photo => {
//       return path.resolve(
//          'public/img/product',
//          req.params.slug,
//          photo
//       )
//    })
//    // res.redirect(filePaths[0])
//    res.status(200).json(filePaths)
// })

exports.getAllProducts = catchAsync(async (req, res, next) => {
   // 1) Create queryObj and query it throw filter obj
   const features = new APIfeatures(Product, {...req.body})

   features
      .filter()
      .sort()
      .select()
      .paginate()

   // 2) Get queried data
   const data = await features.query.lean()

   const resObj = data.map(product => {
      return {
         ...product,
         mainPhoto: getPhotoPath(req.params.slug, product.mainPhoto)
      }
   })

   res.json({
      status: 'success',
      message: `Data successfully received`,
      results: resObj.length,
      resObj
   })
})

exports.getOneProduct = catchAsync(async (req, res, next) => {
   const product = await Product.findOne({slug: req.params.slug}).lean()

   if (!product)
      return next(new AppError('No product with such slug'))

   const photoPaths = product.photos.map(photo =>
      getPhotoPath(req.params.slug, photo)
   )

   product.mainPhoto = getPhotoPath(req.params.slug, product.mainPhoto)
   product.photos = photoPaths

   res.json({
      status: 'success',
      message: 'Product has successfully received',
      product
   })
})

exports.updatePhoto = catchAsync(async (req, res, next) => {
   // 1) Check if product exists
   // 2)
})

exports.parsePhotos = upload.array('photos', 12)