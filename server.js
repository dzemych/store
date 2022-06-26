const dotenv = require('dotenv')
const https = require('https')
const mongoose = require('mongoose')
const path = require('path')
const fs = require('fs')
const app = require('./src/app')


const options = {
   cert: fs.readFileSync(path.resolve('sslcert/fullchain.pem')),
   key: fs.readFileSync(path.resolve('sslcert/privkey.pem'))
}

dotenv.config({ path:  path.join(__dirname, 'config.env')})

const dbUrl = process.env.DB_LOCAL
const dbPassword = process.env.DB_PASSWORD
const port = process.env.PORT
const DB = dbUrl.replace('<password>', dbPassword)

const start = async () => {
   try {
      await mongoose.connect(DB)
      console.log("DB connection successful")

      const httpsServer = https.createServer(options, app).listen(443)
      // const server = app.listen(port)
      console.log(`App is running on port: 443`)
   } catch (e) {
      console.log(e)
      process.exit(1)
   }
}

start()