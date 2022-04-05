module.exports = (req, res, next) => {
   req.params.id = req.userId
   next()
}