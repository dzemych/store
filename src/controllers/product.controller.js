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


// const multerStorage = multer.diskStorage({
//    destination: async (req, file, cb) => {
//       // 1) Create directory
//       const dir = path.resolve
//       ('public/img', 'product', req.params.slug)
//
//       // 2) If newly created product creat new directory
//       if (!fs.existsSync(dir)) {
//          fs.mkdirSync(dir)
//       }
//       cb(null, dir)
//    },
//    filename: (req, file, cb) => {
//       const ext = file.mimetype.split('/')[1]
//       const name = file.originalname
//
//       cb(null, name)
//    }
// })

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
   storage: multer.memoryStorage(),
   fileFilter: multerFilter
})

const getFullPath = (slug, fileName) =>
   path.resolve('public/img/product', slug, fileName)

exports.getTopProducts = handlerFactory.getAll(Product, {sort: '-sold,price'})
exports.createOneProduct = handlerFactory.createOne(Product)

exports.uploadPhotos = upload.array('photos', 12)

exports.sharpMainImg = catchAsync(async (req, res, next) => {
   let mainName = ''

   //0 If new product create directory
   const dir = path.resolve
   ('public/img', 'product', req.params.slug)

   if (!fs.existsSync(dir))
      fs.mkdirSync(dir)

   // 1) Resize photos if there are some
   if (req.files.length > 0) {
      mainName = `${req.params.slug}-main.jpeg`

      // Resize all photos to 1500px width
      const writeFiles = async () => {
         for (i in req.files) {
            const name = req.files[i].originalname.split('.')[0]

            await sharp(req.files[i].buffer)
               .resize({width: 1500})
               .withMetadata()
               .toFormat('jpeg')
               .jpeg({quality: 80})
               .toFile(`public/img/product/${req.params.slug}/${name}.jpeg`)
         }
      }
      await writeFiles()

      // Resize first photo to 200px width
      await sharp(req.files[0].buffer)
         .resize({width: 200})
         .toFormat('jpeg')
         .jpeg({quality: 80})
         .toFile(`public/img/product/${req.params.slug}/${req.params.slug}-main.jpeg`)
   }

   // 2) Update product with resized photos
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

   //* Change all photos ext to jpeg (because they all later will be resized to jpeg)
   req.body.photos = req.body.photos.map(name => (
      name.split('.')[0] + '.jpeg'
   ))

   // 2) Clear deleted photos and update it
   if (req.body.photos) {
      const deletePhotos = async () => {

         // Go throw all photos in folder
         await fs.readdir(`public/img/product/${slug}`, async (err, files) => {
            // Check all files in dir
            for (i in files) {
               const fileName = files[i]

               //! If body to update does not include current photo - delete it
               if (!req.body.photos.includes(fileName)) {
                  const fullPath = getFullPath(slug, fileName)
                  await fsPromises.unlink(fullPath)
               }
            }
         })
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