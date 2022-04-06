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

// 1) Get total price and amount of products and check product availability
purchaseSchema.pre('save', async function(next) {
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

   next()
})

// 1) Update user collection (minus sizes)
purchaseSchema.pre('save', async function(next) {
   // 1) Get purchases products ids
   const productsIds = this.products.reduce((acc, el) => {
      const is = acc.find(val => val.toString() === el.id.toString())
      if (is) {} else {
         acc.push(el.id.toString())
      }
      return acc
   }, [])

      // Get products
   const products = await Product.find({_id: {$in: productsIds}}).lean()

   // 2) Update Products
   const updateProduct = async () => {
      for (const i in productsIds) {
         // 1) Get id values and amount values
         const productId = productsIds[i]
         const productObjValues = this.products.filter(val => val.id.toString() === productId.toString())

         // 2) If same products
         let curSizes = productObjValues.length > 1 ?
            products.find(val => val._id.toString() === productObjValues[i].id.toString()).numSizes
            : products.find(val => val._id.toString() === productObjValues[0].id.toString()).numSizes

            // Create new sizes
         let newSizes = {...curSizes}

         const reCalcAndSave = async () => {
            for (const n in productObjValues) {
               const currentObj = productObjValues[n]

               // Update sizes
               const newVal = newSizes[currentObj.size] - currentObj.amount
               newSizes =  {
                  ...newSizes,
                  [currentObj.size]: newVal
               }

               // 3) Update current product
               const response = await Product.findByIdAndUpdate(
                  productId, {numSizes: newSizes}
               )
            }
         }

         await reCalcAndSave()
      }
   }

   await updateProduct()

   next()
})

// 2) Update relative collections
purchaseSchema.post('save', async function() {
   await this.constructor.updateUser(this._id, this.user, 'save')
})

// 3) On status = success update product
purchaseSchema.post(/update/i, async function(doc) {
   console.log(doc)
   if (this._update['$set'].status === 'canceled') {
      console.log('hiiiiii')
   }
})

module.exports = model('Purchase', purchaseSchema)