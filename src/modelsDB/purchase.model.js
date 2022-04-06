const {ObjectId, Schema, model} = require('mongoose')
const Product = require('./product.model')
const User = require('./user.model')
const AppError = require('../utils/AppError')


const purchaseSchema = new Schema({
   products: {
      type: [{
         _id: {
            type: String,
            default: undefined
         },
         id: {
            type: ObjectId,
            required: true
         },
         amount: {
            type: Number,
            required: true
         },
         size: {
            type: String,
            required: true,
            enum: ['xs', 's', 'm', 'l', 'xl', 'xxl'],
         }
      }],
      ref: 'Product',
      required: true
   },
   user: {
      type: ObjectId,
      ref: 'User',
      required: true
   },
   createdAt: {
      type: Date,
      default: Date.now
   },
   totalPrice: Number,
   totalAmount: Number,
   status: {
      type: String,
      required: true,
      enum: ['success', 'canceled', 'heading', 'delivered', 'payment', 'processing'],
      default: 'processing'
   },
   discount: {
      type: Number,
      default: 0
   }
})

// Update user collection method
purchaseSchema.statics.updateUser = async function(id, userId, type) {
   const user = await User.findById(userId)

   // Add new purchase to user
   if (type === 'save') {
      user.purchases.push(id)
   } else {
      const ids = [...user.purchases]

      user.purchases = ids.filter(value => value.toString() !== id.toString())
   }

   // Save user
   await user.save({validateBeforeSave: false})
}


// Get total price and amount of products
purchaseSchema.pre('save', async function(next) {
   const user = await User.exists({user: this.user})

   // Embed price field and await it all
   const products = await Promise.all(this.products.map(async el => {
      const product = await Product.findById(el.id).select('price sizes').lean()

      // Check if it is enough amount
      if (product.sizes)

      // If no product return undefined
      if (!product) return undefined

      return {price: product.price, amount: el.amount}
   }))

   // Check if such product and user exists
   if (products.includes(undefined) || !user)
      return next(new AppError('User or product id is deprecated or invalid'))

   // Calc totals
   const totals = products.reduce((acc, el) => {
      acc.price = acc.price + el.price * el.amount
      acc.amount = acc.amount + el.amount

      return acc
   }, {price: 0, amount: 0})

   // Save it all
   this.totalPrice = totals.price
   this.totalAmount = totals.amount

   next()
})

// Update relative collections
purchaseSchema.post('save', async function() {
   await this.constructor.updateUser(this._id, this.user, 'save')
})

module.exports = model('Purchase', purchaseSchema)