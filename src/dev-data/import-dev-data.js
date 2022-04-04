const fs = require('fs');
const path = require('path')
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('../modelsDB/product.model')
const Question = require('../modelsDB/question.model')
const Rating = require('../modelsDB/rating.model')
const User = require('../modelsDB/user.model')
const Purchase = require('../modelsDB/purchase.model')


dotenv.config({ path: path.join(__dirname, '../../config.env') })

const dbUrl = process.env.DB_LOCAL
const dbPassword = process.env.DB_PASSWORD
const DB = dbUrl.replace('<password>', dbPassword)

mongoose.connect(DB).then(() =>{
   console.log('DB connection successful')
}).catch(e => console.log(e))


/// IMPORT files
const products = JSON.parse(fs.readFileSync(
   path.join(__dirname, '../dev-data/products.json'),
   'utf-8'
))

const users = JSON.parse(fs.readFileSync(
   path.join(__dirname, '../dev-data/users.json'),
   'utf-8'
))

const purchases = JSON.parse(fs.readFileSync(
   path.join(__dirname, '../dev-data/purchases.json'),
   'utf-8'
))


const importData = async () => {
   try {
      // await Product.create(products)
      await User.create(users)
      // await Purchase.create(purchases)

      console.log('Data successfully loaded')
   } catch (e) {
      console.log(e)
   }
   process.exit(1)
}

const deleteData = async () => {
   try {
      // await Product.deleteMany()
      await User.deleteMany()
      // await Purchase.deleteMany()

      console.log('Data successfully loaded')
   } catch (e) {
      console.log(e)
   }
   process.exit(1)
}

// run code
if (process.argv[2] === '--import') importData()
if (process.argv[2] === '--delete') deleteData()