const nodemailer = require('nodemailer')


class Mail {
   constructor(user, url) {
      this.to = user.email
      this.from = process.env.EMAIL
      this.url = url
   }

   createTransporter() {
      const mode = process.env.NODE_ENV

      if (mode === 'development') {

      }

      return nodemailer.createTransport({
         host: "smtp.mailtrap.io",
         port: 2525,
         auth: {
            user: "435764c9047c3f",
            pass: "57d29c0beccdde"
         }
      })
   }

   async send(subject, template) {
      const code = template.replace('<url>', this.url)

      const mailOptions = {
         from: this.from,
         to: this.to,
         subject,
         text: code
      }

      await this.createTransporter().sendMail(mailOptions)
   }
}


module.exports = Mail