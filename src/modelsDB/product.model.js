const {ObjectId, Schema, model} = require('mongoose')
const slugify = require('slugify')


const productSchema = new Schema({
   title: {
      type: String,
      required: true,
      unique: true,
      minlength: 5,
      maxlength: 25
   },
   slug: {
      type: String,
      default: function() {
         return slugify(this.title, { lower: true })
      }
   },
   status: {
     type: String,
     enum: ['active', 'nosizes', 'unavailable'],
     default: 'active'
   },
   price: {
      type: Number,
      required: true,
      max: 20000
   },
   category: {
      type: String,
      required: true,
   },
   description: String,
   numSizes: {
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
      // validate: {
      //    validator: function(value) {
      //       const sizes = {...value}._doc
      //
      //       return Object.keys(sizes).reduce((acc, key) => {
      //          acc = acc + value[key]
      //          return acc
      //       }, 0)
      //    },
      //    message: 'Enter at least one size'
      // },
      required: true
   },
   material: {
      type: String,
      required: true
   },
   photos: {
      type: [String],
      validate: {
         validator: function(value) {
            return value.length >= 2
         },
         message: "Product must have at least one available size"
      }
   },
   mainPhoto: {
      type: String,
      required: true,
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
      default: 0
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
      default: 0
   },
   discount: {
      type: Number,
      default: 0
   },
   sold: {
      type: Number,
      default: 0
   }
})

// Check if there still are available sizes
productSchema.pre('save', async function(next) {
   const sum = Object.keys(this.numSizes._doc).reduce((acc, el) => {
      acc += this.numSizes[el]
      return acc
   }, 0)

   if (sum < 1) {
      this.status = 'nosizes'
   }

   next()
})


module.exports = model('Product', productSchema)