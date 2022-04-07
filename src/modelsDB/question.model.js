const {ObjectId, Schema, model} = require('mongoose')
const User = require('./user.model')
const Product = require('./product.model')
const AppError = require('../utils/AppError')


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
   },
   updatedAt: {
      type: Date,
      default: 0
   }
})

questionSchema.index({product: 1})

questionSchema.statics.updateColls = async function (id, userId, productId, type) {
   const user = await User.findById(userId)
   const product = await Product.findById(productId)

   // 1) Update user and product
   if (type === 'save') {
      const productQuestions = await this.find({product: productId}).count()

      user.questions.push(id)
      product.questions.push(id)

      product.numQuestions = productQuestions
   }
   if (type === 'remove'){
      const productQuestions = await this.find({product: productId}).count()

      const productIds = [...product.questions]
      const userIds = [...user.questions]

      product.questions = productIds.filter(val => val.toString() !== id.toString())
      user.questions = userIds.filter(val => val.toString() !== id.toString())

      product.numQuestions = productQuestions
   }

   // 2) Save user and product collection updates
   await product.save({validateBeforeSave: false})
   await user.save({validateBeforeSave: false})
}

// Populate question before find
// questionSchema.pre(/^find/, async function(next) {
//    this.populate({
//       path: 'user',
//       select: 'name photo'
//    })
//
//    next()
// })

// Update relative collections
questionSchema.pre('save', async function(next) {
   if (this.isNew) {
      await this.constructor.updateColls(
         this._id,
         this.user,
         this.product,
         'save'
      )
   }

   next()
})

// Check if such product and user exists
questionSchema.pre('save', async function(next) {
   const user = await User.exists({_id: this.user})
   const product = await Product.exists({_id: this.product})

   if (!user || !product)
      return next(new AppError('User are product ids are deprecated or invalid'))
})

questionSchema.pre(/^update/, async function(next) {
   this.updatedAt = Date.now() - 1000
   next()
})

module.exports = model('Question', questionSchema)