const {ObjectId, Schema, model} = require('mongoose')


const questionSchema = new Schema({
   user: {
      type: ObjectId,
      ref: 'User',
      required: true,
   },
   product: {
      type: ObjectId,
      ref: 'Product',
      required: true,
   },
   text: {
      type: String,
      required: true,
      minlength: 4,
      maxlength: 300
   },
   createdAt: {
      type: Date,
      default: Date.now
   }
})

questionSchema.pre(/^find/, async function(next) {
   this.populate({
      path: 'user',
      select: 'name photo'
   })

   next()
})

module.exports = model('Question', questionSchema)