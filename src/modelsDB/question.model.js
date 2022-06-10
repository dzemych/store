const {ObjectId, Schema, model} = require('mongoose')
const User = require('./user.model')
const Product = require('./product.model')
const existenceCheck = require('./existenceCheck')


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
      minlength: 2,
      maxlength: 700
   },
   createdAt: {
      type: Date,
      default: Date.now
   },
   updatedAt: {
      type: Date,
      default: 0
   },
   answer: {
      type: Object,
      default: null
   }
})

questionSchema.index({product: 1})

// Update user and product collections | method
questionSchema.statics.updateColls = async function (id, userId, productId, type) {
   const user = await User.findById(userId)
   const product = await Product.findById(productId)

   // 1) Update user and product
   if (type === 'save') {
      user.questions.push(id)
      product.questions.push(id)

      product.numQuestions += 1
   }
   if (type === 'remove'){
      const productIds = [...product.questions]
      const userIds = [...user.questions]

      product.questions = productIds.filter(val => val.toString() !== id.toString())
      user.questions = userIds.filter(val => val.toString() !== id.toString())

      product.numQuestions -= 1
   }

   // 2) Save user and product collection updates
   await product.save({validateBeforeSave: false})
   await user.save({validateBeforeSave: false})
}

// Check if such product and user exists
questionSchema.pre('save', async function(next) {
   await existenceCheck(User, this.user, next)
   await existenceCheck(Product, this.product, next)
   next()
})

// Update user and product collections
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

// Set updated property updatedAt
questionSchema.pre([/^update/, 'save'], async function(next) {
   this.updatedAt = Date.now() - 1000
   next()
})

module.exports = model('Question', questionSchema)