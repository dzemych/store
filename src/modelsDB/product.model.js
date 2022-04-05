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
   sizes: {
      type: [{
         _id: {
            type: String,
            default: undefined
         },
         size: {
            type: String,
            required: true,
            enum: {
               values: ['xs', 's', 'm', 'l', 'xl', 'xxl'],
               message: `Current size cannot be`
            },
         },
         amount: {
            type: Number,
            required: true
         }
      }],
      required: true,
      validate: {
         validator: function(value) {
            return value.length > 0
         },
         message: "Product must have at least one available size"
      }
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


module.exports = model('Product', productSchema)