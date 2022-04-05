const {ObjectId, Schema, model} = require('mongoose')
const Product = require('../modelsDB/product.model')


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
      minlength: 8,
      maxlength: 200
   },
   createdAt: {
      type: Date,
      default: Date.now
   }
})

ratingSchema.index({product: 1, user: 1}, {unique: true})

ratingSchema.statics.calcAvg = async function(productId) {
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
   return {avg: stats[0].avg, amount: stats[0].amount}
}

ratingSchema.pre(/^find/, async function(next) {
   this.populate({
      path: 'user',
      select: 'name photo'
   })

   next()
})

ratingSchema.post('save', async function() {
   const {avg, amount} = await this.constructor.calcAvg(this.product)

   const product = await Product.findById(this.product)

   product.avgRating = avg
   product.numRating = amount
   product.ratings.push(this._id)

   await product.save()
})

ratingSchema.post('deleteOne', async function() {
   console.log('hi')
})

module.exports = model('Rating', ratingSchema)