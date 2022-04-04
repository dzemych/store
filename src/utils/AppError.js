class AppError extends Error {
   constructor(message, statusCode = 500, statusText = null) {
      super(message)

      this.statusCode = statusCode
      this.isOperational = true
      this.status = `${statusCode}`.startsWith('4') ? 'fail': 'error'

      Error.captureStackTrace(this)
   }
}

module.exports = AppError