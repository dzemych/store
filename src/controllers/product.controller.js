const Product = require('../modelsDB/product.model')
const handlerFactory = require('../controllers/handlerFactory')
const APIfeatures = require('../utils/APIfeatures')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/AppError')
const multer = require('multer')
const sharp = require('sharp')
const path = require('path')
const fs = require('fs')
const fsPromises = require('fs/promises')


const multerStorage = multer.diskStorage({
   destination: async (req, file, cb) => {
      // 1) Create directory
      const dir = path.resolve
      ('public/img', 'product', req.params.slug)

      // 2) If newly created product creat new directory
      if (!fs.existsSync(dir)) {
         fs.mkdirSync(dir)
      }
      cb(null, dir)
   },
   filename: (req, file, cb) => {
      const ext = file.mimetype.split('/')[1]
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
      cb(new AppError('No product with such slug', 404), false)

   cb(null, true)
}

const upload = multer({
   storage: multerStorage,
   fileFilter: multerFilter
})

const getFullPath = (slug, fileName) =>
   path.resolve('public/img/product', slug, fileName)

exports.getTopProducts = handlerFactory.getAll(Product, {sort: '-sold,price'})
exports.createOneProduct = handlerFactory.createOne(Product)

exports.sharpMainImg = catchAsync(async (req, res, next) => {
   const ext = req.files[0].mimetype.split('/')[1]
   const mainName = `${req.params.slug}-main.${ext}`

   let quality = 100
   if (req.files[0].size > 5500) {
      quality = Math.floor(8000 / req.files[0].size * 100)
   }

   if (ext === 'webp') {

      await sharp(req.files[0].path)
         .toFormat('webp')
         .webp({quality})
         .toFile(`public/img/product/${req.params.slug}/${req.params.slug}-main.webp`)

   } else if (ext === 'png') {

      await sharp(req.files[0].path)
         .toFormat('png')
         .png({quality})
         .toFile(`public/img/product/${req.params.slug}/${req.params.slug}-main.png`)

   } else {

      await sharp(req.files[0].path)
         .toFormat('jpeg')
         .jpeg({quality})
         .toFile(`public/img/product/${req.params.slug}/${req.params.slug}-main.jpeg`)

   }

   const product = await Product.findOneAndUpdate(
      {slug: req.params.slug},
      {mainPhoto: mainName},
      {new: true}
   )

   res.json({
      ok: true,
      message: 'Photos have been successfully uploaded to db',
      status: 'success',
      product
   })
})

exports.updateOneProduct = catchAsync(async (req, res, next) => {
   const slug = req.params.slug

   // 1) Find required product
   const product = await Product.findOne({slug})

   //! If no product with that key return error
   if (!product) return next(new AppError('No such data found', 404))

   // 2) Clear deleted photos and update it
   if (req.body.photos) {
      const deletePhotos = async () => {
         for (i in product.photos) {
            const fileName = product.photos[i]

            //! If body to update does not include current photo - delete it
            if (!req.body.photos.includes(fileName)) {
               const fullPath = getFullPath(slug, fileName)
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
         product[key] = {...oldValue, ...data}
      }
      else {
         product[key] = data
      }
   })

   await product.save()

   res.json({
      status: 'success',
      message: 'Data successfully updated',
      product
   })
})

exports.getAllProducts = catchAsync(async (req, res, next) => {
   // 1) Create queryObj and query it throw filter obj
   if (!req.query.status)
      req.query.status = 'active'

   const features = new APIfeatures(Product, {...req.query})

   features
      .filter()
      .sort()
      .select('-photos -questions -ratings')
      .paginate()

   // 2) Get queried data
   const data = await features.query.lean()

   const resObj = data.map(product => {
      if (product.slug && product.mainPhoto)
         return {
            ...product,
            mainPhoto: product.mainPhoto
         }

      return product
   })

   res.json({
      status: 'success',
      message: `Data successfully received`,
      results: resObj.length,
      products: resObj,
   })
})

exports.getProductsFromArr = catchAsync(async (req, res, next) => {
   const arr = req.body.products

   const filter = req.query ? req.query : {status: {eq: 'active'}}

   if (!arr)
      return next(new AppError('Please provide products array', 400))

   const features = new APIfeatures(Product, {
      filter,
      _id: {in: arr},
   })

   features.filter()

   const data = await features.query.lean()

   res.json({
      status: 'success',
      products: data
   })
})

exports.getOneProduct = catchAsync(async (req, res, next) => {
   const slug = req.params.slug

   const product = await Product.findOne({slug}).lean()

   if (!product)
      return next(new AppError('No product with such slug', 404))

   res.json({
      status: 'success',
      message: 'Product has successfully received',
      product
   })
})

exports.uploadPhotos = upload.array('photos', 12)

exports.getAllCategories = catchAsync(async (req, res, next) => {
   const data = await Product.aggregate([
      {
         $match: {status: 'active'}
      },
      {
         $group: {
            _id: "$sex",
            categories: { $addToSet: '$category' },
         }
      }
   ])

   if (!data) return next(new AppError('No categories', 404))

   const categories = data.reduce((acc, el) => {
      el.categories.sort((a, b) => a.length - b.length)
      acc[el._id] = el.categories

      return acc
   }, {})

   res.json({
      status: 'success',
      categories
   })
})