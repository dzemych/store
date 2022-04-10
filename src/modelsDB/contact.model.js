const {Schema, model} = require('mongoose')
const validator = require('validator')


const contactSchema = new Schema({
   name: {
      type: String,
      required: true
   },
   phoneNumber: {
      type: String,
      required: true,
      validate: {
         validator: (val => validator.isMobileNumber(val, 'uk-UA')),
         message: 'Invalid phone number'
      }
   },
   email: {
      type: String,
      validate: [validator.isEmail, 'Invalid email']
   },
   instagram: String,
   telegram: {
      type: String,
      validate: {
         validator: val => {
            val.startsWith('@')
         },
         message: 'Telegram nick name must starts with @'
      }
   },
   photo: String
})


module.exports = model('Contact', contactSchema)