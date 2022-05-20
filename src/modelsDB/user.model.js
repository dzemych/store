const {ObjectId, Schema, model} = require('mongoose')
const validator = require('validator')
const bcryptjs = require('bcryptjs')
const crypto = require('crypto')
const AppError = require("../utils/AppError");


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
      select: false,
   },
   passwordConfirm: {
      type: String,
      minlength: 8
   },
   passwordChanged: {
      type: Date,
      select: false
   },
   resetToken: String,
   resetExpires: Date,
   createdAt: {
      type: Date,
      default: Date.now,
      select: false
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
      default: 'user',
      select: false
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
      if (this.passwordConfirm !== this.password)
         next(new AppError('Password and password confirm are not the same', 400))

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