const {ObjectId, Schema, model} = require('mongoose')
const validator = require('validator')
const bcryptjs = require('bcryptjs')


const userSchema = new Schema({
   name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 15
   },
   email: {
      type: String,
      required: true,
      validate: [validator.isEmail, 'Invalid email address'],
      unique: [true, 'User with such email already exists']
   },
   password: {
      type: String,
      required: true,
      minlength: 8,
      maxlength: 25,
      select: false
   },
   passwordConfirm: {
      type: String,
      required: true,
      minlength: 8,
      maxlength: 25,
      validate: {
         validator: function(val) {
            return this.password === val
         },
         message: 'Password and passwordConfirm are not the same'
      }
   },
   passwordChanged: Date,
   createdAt: {
      type: Date,
      default: Date.now
   },
   purchases: {
      type: [ObjectId],
      ref: 'Purchase',
      default: []
   },
   active: {
      type: Boolean,
      default: true,
      select: false
   }
})

// Hash password
userSchema.pre('save', async function(next) {
   // If pwd didn't modified or newly created
   if (!this.isModified('password')) return next()

   this.password = await bcryptjs.hash(this.password, 12)

   if (!this.isNew) {
      this.passwordChanged = Date.now() - 1000
   }

   this.passwordConfirm = undefined
   next()
})

// Sort deleted accounts
userSchema.pre(/^find/, async function(next) {
   this.find({active: { $ne: false } })

   next()
})

module.exports = model('User', userSchema)