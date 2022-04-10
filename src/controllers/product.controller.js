const Product = require('../modelsDB/product.model')
const handlerFactory = require('../controllers/handlerFactory')
const APIfeatures = require('../utils/APIfeatures')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/AppError')
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const fsPromises = require('fs/promises')


const multerStorage = multer.diskStorage({
   destination: async (req, file, cb) => {
      // 1) Create directory
      const dir = path.resolve
      ('public/img/', 'product', req.params.slug)

      // 2) If newly created product creat new directory
      if (!fs.existsSync(dir)){
         await fsPromises.mkdir(dir);
      }

      cb(null, dir)
   },
   filename: (req, file, cb) => {
      const ext = file.mimetype.split('/')[1]
      // const name = `product-${req.params.slug}-${Date.now()}.${ext}`
      const name = file.originalname

      cb(null, name)
   }
})

const multerFilter = async (req, file, cb) => {
   //! Check if req has slug
   if (!req.params.slug)
      cb(new AppError('Provide product slug', 409), false)

   const product = await Product.findOne({slug: req.params.slug}).lean()

   //! Check if there is such product
   if (!product)
      cb(new AppError('No product with such id', 404), false)

   cb(null, true)
}

const upload = multer({
   storage: multerStorage,
   fileFilter: multerFilter
})

const getPhotoPath = (slug, fileName) => {
   return path.resolve('public/img/product', slug, fileName)
}

exports.getTopProducts = handlerFactory.getAll(Product, {sort: '-sold,price'})
exports.createOneProduct = handlerFactory.createOne(Product)

exports.updateOneProduct = catchAsync(async (req, res, next) => {
   // 1) Find required product
   const product = await Product.findOne({slug: req.params.slug})

   //! If no product with that key return error
   if (!product) return next(new AppError('No such data found', 404))

   // 2) Clear deleted photos and update it
   if (req.body.photos) {
      const deletePhotos = async () => {
         for (i in product.photos) {
            const fileName = product.photos[i]

            //! If body to update does not include current photo - delete it
            if (!req.body.photos.includes(fileName)) {
               const fullPath = getPhotoPath(req.params.slug, fileName)
               const isPhoto = await fsPromises.unlink(fullPath)
            }
         }
      }

      await deletePhotos()

      product.photos = req.body.photos
      product.mainPhoto = req.body.photos[0]
   }

   // 3) Update product for not vanishing old fields
   Object.keys(req.body).forEach(key => {
      const data = req.body[key]

      if (data instanceof Object && !(data instanceof Array)) {
         const oldValue = {...product[key]}._doc
         product[key] = {...oldValue, ...data[key]}
      }
      else {
         product[key] = data
      }
   })
   console.log(product)
   await product.save()

   res.json({
      status: 'success',
      message: 'Data successfully updated',
      product
   })
})

exports.getAllProducts = catchAsync(async (req, res, next) => {
   // 1) Create queryObj and query it throw filter obj
   const features = new APIfeatures(Product, {...req.body})

   features
      .filter()
      .sort()
      .select('-photos -questions -numQuestions -ratings')
      .paginate()

   // 2) Get queried data
   const data = await features.query.lean()

   const resObj = data.map(product => {
      return {
         ...product,
         mainPhoto: getPhotoPath(product.slug, product.mainPhoto)
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
      return next(new AppError('No product with such slug', 404))

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

exports.uploadPhotos = upload.array('photos', 12)