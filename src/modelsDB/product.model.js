const {ObjectId, Schema, model} = require('mongoose')
const slugify = require('slugify')


const productSchema = new Schema({
   title: {
      type: String,
      required: true,
      unique: true,
      minlength: 5
   },
   slug: {
      type: String,
      default: function() {
         return slugify(this.title, { lower: true })
      },
      select: true
   },
   status: {
     type: String,
     enum: ['nosizes', 'active', 'unavailable'],
     default: 'active',
     required: true
   },
   price: {
      type: Number,
      required: true,
      min: 0,
      max: 20000
   },
   sex: {
      type: String,
      enum: ['мужчины', 'женщины', 'мальчики', 'девочки'],
      required: true
   },
   category: {
      type: String,
      required: true,
   },
   description: String,
   numSizes:{
      type: {
         _id: {type: String, default: undefined},
         xs: {
            type: Number,
            default: 0,
            min: 0
         },
         s: {
            type: Number,
            default: 0,
            min: 0
         },
         m: {
            type: Number,
            default: 0,
            min: 0
         },
         l: {
            type: Number,
            default: 0,
            min: 0
         },
         xl: {
            type: Number,
            default: 0,
            min: 0
         },
         xxl: {
            type: Number,
            default: 0,
            min: 0
         },
      },
      required: true
   },
   photos: [String],
   mainPhoto: {
      type: String,
      select: true
   },
   createdAt: {
      type: Date,
      default: Date.now
   },
   questions: {
      type: [ObjectId],
      ref: "Comment",
      default: []
   },
   numQuestions: {
      type: Number,
      default: 0,
      min: 0
   },
   ratings: {
      type: [ObjectId],
      ref: "Rating",
      default: []
   },
   avgRating: {
      type: Number,
      default: 0,
      min: [0, 'Rating cannot be lower than 0'],
      max: [6, 'Rating cannot be higher than 6']
   },
   numRating: {
      type: Number,
      default: 0,
      min: 0
   },
   discount: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
   },
   sold: {
      type: Number,
      default: 0,
      min: 0
   },
   features: Object
})

// Update numSizes property | method
productSchema.statics.updateSizes = async function(purchasesArr, action) {
   const loopPurchasesArr = async () => {
      for (i in purchasesArr) {
         const {id, amount, size} = purchasesArr[i]

         const product = await this
            .findById(id)
            .select('numSizes')

         // Update sizes without vanishing it all
         const oldSizes = {...product.numSizes}._doc

         product.numSizes = {
            ...oldSizes,
            [size]: action === 'minus' ?
               oldSizes[size] - [amount] * 1 : oldSizes[size] + [amount] * 1
         }

         await product.save()
      }
   }

   await loopPurchasesArr()
}

// Update sold property | method
productSchema.statics.updateSold = async function(purchasesArr, action) {
   const loopPurchasesArr = async () => {
      for (i in purchasesArr) {
         const {id, amount} = purchasesArr[i]

         const product = await this
            .findById(id)
            .select('sold')

         // Update sold property
         product.sold = action === 'minus' ?
            product.sold - amount : product.sold + amount

         await product.save()
      }
   }

   await loopPurchasesArr()
}

// Check if there still are available sizes
productSchema.pre('save', async function(next) {

   // If sizes was updated
   if (this.status !== 'unavailable') {
      if (this.numSizes) {
         const sum = Object.keys({...this.numSizes}._doc).reduce((acc, el) => {
            acc += this.numSizes[el]
            return acc
         }, 0)

         if (sum < 1) {
            this.status = 'nosizes'
         } else {
            this.status = 'active'
         }

      }
   }

   next()
})

// productSchema.pre(/^find/, function(next) {
//    this.find({ status: { $eq: 'active' } })
//    next()
// })


module.exports = model('Product', productSchema)