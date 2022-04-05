const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/AppError')
const APIfeatures = require('../utils/APIfeatures')


exports.getOne = (collection, keyInDb = '_id', keyInParams = 'id') =>
   catchAsync(async (req, res, next) => {
      // 1) Get data from collection
      const data = await collection.findOne({[keyInDb]: req.params[keyInParams]})

      // 2) If no data return error
      if (!data) return next(new AppError('No such data found', 404))

      res.json({
         status: 'success',
         message: `Data successfully received`,
         data
      })
   })

exports.getAll = (collection, filterObj = {}) =>
   catchAsync(async (req, res, next) => {
      // 1) Create custom filter obj
      const filter = {
         ...req.query,
         ...filterObj
      }

      // 2) Create queryObj and query it throw filter obj
      const features = new APIfeatures(collection, filter)
      features
         .filter()
         .sort()
         .select()
         .paginate()

      // 3) Get queried data
      const data = await features.query

      res.json({
         status: 'success',
         message: `Data successfully received`,
         results: data.length,
         data
      })
   })

exports.createOne = (collection) =>
   catchAsync(async (req, res, next) => {
      console.log(req.userId)
      // 1) Create new instance of db collection
      const data = new collection({...req.body, user: req.userId})
      await data.save()

      res.status(201).json({
         status: 'success',
         message: 'Data has successfully created',
         data
      })
   })

exports.updateOne = (collection, keyInDb = '_id', keyInParams = 'id') =>
   catchAsync(async (req, res, next) => {
      const data = await collection.findOneAndUpdate(
         {[keyInDb]: req.params[keyInParams]},
         {...req.body},
         {runValidators: true})

      // If no data with that key return error
      if (!data) return next(new AppError('No such data found', 404))

      res.json({
         status: 'success',
         message: 'Data successfully updated',
         data: {...data._doc, ...req.body}
      })
   })