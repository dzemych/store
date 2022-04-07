const AppError = require('../utils/AppError')

module.exports = async (collection, id, next) => {
   const data = await collection.findById(id)
   const name = await collection.collection.collectionName.slice(0, -1)

   if (!data) return next(new AppError(`${name} with that id does not exists`))

   return data ? 1 : 0
}