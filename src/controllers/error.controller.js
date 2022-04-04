const sendDevErr = (err, req, res) => {
   res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      stack: err.stack
   })
}

const sendProdErr = (err, req, res) => {
   res.status(err.statusCode).json({
      status: err.status,
      message: err.message
   })
}

const errorController = async (err, req, res, next) => {
   const environment = process.env.NODE_ENV

   err.statusCode = err.statusCode || 500;
   err.status = err.status || 'error';

   if (environment === 'development') sendDevErr(err, req, res)
   if (environment === 'production') {
      sendProdErr(err, req, res)
   }
}


module.exports = errorController