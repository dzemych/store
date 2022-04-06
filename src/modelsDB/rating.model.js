const {ObjectId, Schema, model} = require('mongoose')
const Product = require('../modelsDB/product.model')
const User = require('../modelsDB/user.model')
const AppError = require('../utils/AppError')


const ratingSchema = new Schema({
   product: {
      type: ObjectId,
      required: true,
      ref: 'Product'
   },
   user: {
      type: ObjectId,
      required: true,
      ref: 'User'
   },
   rating: {
      type: Number,
      required: true,
      min: [1, 'Rating cannot be lower than 1'],
      max: [6, 'Rating cannot be higher than 6']
   },
   text: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 200
   },
   createdAt: {
      type: Date,
      default: Date.now
   }
})

ratingSchema.index({product: 1, user: 1}, {unique: true})
ratingSchema.index({product: 1})

ratingSchema.statics.calcAvg = async function(id, productId, type) {
   const product = await Product.findById(productId)

   if (await this.count() > 0) {
      // Calculate new product stats
      const stats = await this.aggregate([
         {
            $match: {product: productId}
         },
         {
            $group: {
               _id: "$product",
               avg: {$avg: "$rating"},
               amount: {$sum: 1}
            }
         }
      ])

      // Update product
      product.avgRating = stats[0].avg
      product.numRating = stats[0].amount

      if (type === 'save'){
         product.ratings.push(id)
      }
      if (type === 'remove'){
         const ids = [...product.ratings]

         product.ratings = ids.filter(val => val.toString() !== id.toString())
      }
   } else {
      product.avgRating = 0
      product.numRating = 0
      product.ratings = []
   }

   await product.save()
}

// ratingSchema.pre(/^find/, async function(next) {
//    this.populate({
//       path: 'user',
//       select: 'name photo'
//    })
//
//    next()
// })

// Update relative collections
ratingSchema.post('save', async function() {
   await this.constructor.calcAvg(this._id, this.product, 'save')
})

// Check if such product and user exists
ratingSchema.pre('save', async function(next) {
   const user = await User.exists({ _id: this.user })
   const product = await Product.exists({ _id: this.product })

   if (!user || !product)
      return next(new AppError('User are product ids are deprecated or invalid'))

   next()
})

module.exports = model('Rating', ratingSchema)