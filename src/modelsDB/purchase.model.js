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
   deliveryType: {
      type: String,
      enum: ['delivery', 'pickup', 'courier'],
      required: true
   },
   deliveryAddress: {
      city: String,
      address: String
   },
   user: {
      name: {
         type: String,
         required: true
      },
      surname: {
         type: String,
         required: true,
      },
      email: {
         type: String,
         required: true
      },
      tel: {
         type: Number,
         required: true
      },
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
            'return'
         ],
      default: 'processing'
   },
   discount: {
      type: Number,
      default: 0,
      min: 0
   }
})

// 1) Get total price and amount of products and check product availability
purchaseSchema.pre('save', async function(next) {
   if (this.isNew) {
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

      // 2) Check if such product exists
      if (products.includes(undefined))
         return next(new AppError('Product id is deprecated or invalid'))

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

// 3) Update products sold or numSizes on update status
purchaseSchema.post('save', async function(doc) {
   // If success update sold property on product
   if (doc.status === 'success') {
      await Product.updateSold(doc.products, 'plus')
   }

   // If cancel or return update sizes property
   if (doc.status === 'canceled' || doc.status === 'return') {
      await Product.updateSizes(doc.products, 'plus')
   }
})

module.exports = model('Purchase', purchaseSchema)