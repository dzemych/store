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
   totalPrice: {
      type: Number,
      min: 0
   },
   totalAmount: {
      type: Number,
      min: 0
   },
   status: {
      type: String,
      required: true,
      enum:
         [
            'success',
            'canceled',
            'heading',
            'delivered',
            'payment',
            'processing',
            'return',
            'warranty'
         ],
      default: 'processing'
   },
   discount: {
      type: Number,
      default: 0,
      min: 0
   }
})

// Add purchases to user | method
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

// 1) Get total price and amount of products and check product availability
purchaseSchema.pre('save', async function(next) {
   if (this.isNew) {
      const user = await User.exists({user: this.user})

      // 1) Embed price field and await it
      const products = await Promise.all(this.products.map(async el => {
         const product = await Product.findById(el.id).select('price numSizes').lean()

         // If no product return undefined
         if (!product) return undefined

         // Check if it is enough amount
         if (product.numSizes[el.size] < el.amount)
            return next(new AppError('This sizes amount is not available'))

         return {price: product.price, amount: el.amount}
      }))

      // 2) Check if such product and user exists
      if (products.includes(undefined) || !user)
         return next(new AppError('User or product id is deprecated or invalid'))

      // 3) Calc totals
      const totals = products.reduce((acc, el) => {
         acc.price = acc.price + el.price * el.amount
         acc.amount = acc.amount + el.amount

         return acc
      }, {price: 0, amount: 0})

      // 4) Save it all
      this.totalPrice = totals.price
      this.totalAmount = totals.amount
   }

   next()
})

// 2) Update product sizes on create
purchaseSchema.pre('save', async function(next) {
   if (this.isNew) {
      await Product.updateSizes(this.products, 'minus')
   }
   next()
})

// 3) Add purchases to user
purchaseSchema.pre('save', async function(next) {
   // Do it only on new creation
   if (this.isNew) {
      await this.constructor.updateUser(this._id, this.user, 'save')
   }

   next()
})

// 4) Update products sold or numSizes on update status
purchaseSchema.post('save', async function(doc) {
   // If success update sold property on product
   if (doc.status === 'success') {
      await Product.updateSold(doc.products, 'plus')
   }

   // If cancel or return update sizes property
   if (doc.status === 'canceled' || doc.status === 'return') {
      await Product.updateSizes(doc.products, 'plus')
   }

   // If return under warranty update sizes and sold
   if (doc.status === 'warranty') {
      await Product.updateSizes(doc.products, 'plus')
      await Product.updateSold(doc.products, 'minus')
   }
})

module.exports = model('Checkout', purchaseSchema)