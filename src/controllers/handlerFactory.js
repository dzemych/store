const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/AppError')
const APIfeatures = require('../utils/APIfeatures')


exports.getOne = (collection) =>
   catchAsync(async (req, res, next) => {
      let filterObj = {}

      if (req.params.id) filterObj._id = req.params.id
      if (req.params.slug) filterObj.slug = req.params.slug

      const data = await collection.findOne(filterObj)

      if (!data) return next(new AppError('No such data found', 404))

      res.json({
         status: 'success',
         message: `Data successfully received`,
         data
      })
   })

exports.getAll = (collection, filterObj = {}) =>
   catchAsync(async (req, res, next) => {

      const filter = {
         ...req.query,
         ...filterObj
      }

      const features = new APIfeatures(collection, filter)
      features
         .filter()
         .sort()
         .select()
         .paginate()

      const data = await features.query

      res.json({
         status: 'success',
         message: `${collection.name} successfully received`,
         results: data.length,
         data
      })
   })

exports.createOne = (collection) =>
   catchAsync(async (req, res, next) => {
      const data = new collection({...req.body})
      await data.save()

      res.status(201).json({
         status: 'success',
         message: 'Data has successfully created',
         data
      })
   })

exports.updateOne = (collection) =>
   catchAsync(async (req, res, next) => {
      let filterObj = {}

      if (req.params.id) filterObj._id = req.params.id
      if (req.params.slug) filterObj.slug = req.params.slug

      const data = await collection.findOneAndUpdate(filterObj, {...req.body}, {
         runValidators: true
      })

      if (!data) return next(new AppError('No such data found', 404))

      res.json({
         status: 'success',
         message: 'Data successfully updated',
         data: {...data._doc, ...req.body}
      })
   })