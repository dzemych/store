const {ObjectId, Schema, model} = require('mongoose')
const Product = require('./product.model')


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
   productsAmount: Number,
   status: {
      type: String,
      required: true,
      enum: ['success', 'canceled', 'heading', 'delivered', 'payment']
   },
   discount: {
      type: Number,
      default: 0
   }
})

// Get total price and amount of products
purchaseSchema.pre('save', async function(next) {
   // Embed price field and await it all
   const items = await Promise.all(this.products.map(async el => {
      const product = await Product.findById(el.id).select('price')

      return {price: product.price, amount: el.amount}
   }))

   // Calc totals
   const totals = items.reduce((acc, el) => {
      acc.price = acc.price + el.price * el.amount
      acc.amount = acc.amount + el.amount

      return acc
   }, {price: 0, amount: 0})

   this.totalPrice = totals.price
   this.productsAmount = totals.amount

   next()
})


module.exports = model('Purchase', purchaseSchema)