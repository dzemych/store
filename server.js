const dotenv = require('dotenv')
const mongoose = require('mongoose')
const path = require('path')
const app = require('./src/app')


dotenv.config({ path:  path.join(__dirname, 'config.env')})

const dbUrl = process.env.DB_LOCAL
const dbPassword = process.env.DB_PASSWORD
const port = process.env.PORT
const DB = dbUrl.replace('<password>', dbPassword)

const start = async () => {
   try {
      await mongoose.connect(DB)
      console.log("DB connection successful")

      const server = app.listen(port)
      console.log(`App is running on port: ${port}`)
   } catch (e) {
      console.log(e)
      process.exit(1)
   }
}

start()