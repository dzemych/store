const {ObjectId, Schema, model} = require('mongoose')


const ratingSchema = new Schema({
   product: {
      type: Object,
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
      min: 1,
      max: 6
   },
   description: {
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

ratingSchema.pre(/^find/, async function(next) {
   this.populate({
      path: 'user',
      select: 'name photo'
   })

   next()
})

module.exports = model('Rating', ratingSchema)