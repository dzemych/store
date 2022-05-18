const {ObjectId, Schema, model} = require('mongoose')
const validator = require('validator')
const bcryptjs = require('bcryptjs')
const crypto = require('crypto')


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
      select: false,
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
   passwordChanged: {
      type: Date,
      select: false
   },
   resetToken: String,
   resetExpires: Date,
   createdAt: {
      type: Date,
      default: Date.now
   },
   purchases: {
      type: [ObjectId],
      ref: 'Purchase',
      default: []
   },
   questions: {
      type: [ObjectId],
      ref: 'Question',
      default: []
   },
   active: {
      type: Boolean,
      default: true,
      select: false
   },
   wishList: {
     type: [ObjectId],
     ref: 'Product',
     default: []
   },
   basket: {
     type: [ObjectId],
     ref: 'Product',
     default: []
   },
   role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user'
   }
})

//// Method for creating reset token
userSchema.methods.createResetToken = function() {
   const resetToken = crypto.randomBytes(32).toString('hex');

   this.resetToken = crypto
      .createHash('sha224')
      .update(resetToken)
      .digest('hex')

   this.resetExpires = Date.now() + 60 * 60 * 1000

   return resetToken
}

//// Modify pwd and pwdChanged
userSchema.pre('save', async function(next) {
   if (this.isModified('password') || this.isNew) {
      this.passwordChanged = Date.now() - 1000
      this.password = await bcryptjs.hash(this.password, 12)

      this.passwordConfirm = undefined
   }
   next()
})

//// Sort deleted accounts
userSchema.pre(/^find/, async function(next) {
   this.find({active: { $ne: false } })

   next()
})


module.exports = model('User', userSchema)