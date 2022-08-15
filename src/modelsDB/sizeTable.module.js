const {Schema, model} = require('mongoose')


const table = {
   xs: {
      type: String,
      require: true
   },
   s: {
      type: String,
      require: true
   },
   m: {
      type: String,
      require: true
   },
   l: {
      type: String,
      require: true
   },
   xl: {
      type: String,
      require: true
   },
   xxl: {
      type: String,
      require: true
   }
}

const sizeTableSchema = new Schema({
   sex: {
      type: String,
      require: true,
      enum: ['man', 'woman', 'boy', 'girl']
   },
   chest: table,
   waist: table,
   hip: table
})


module.exports = model('SizeTable', sizeTableSchema)