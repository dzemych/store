const handlerFactory = require('./handlerFactory')
const SizeTable = require('../modelsDB/sizeTable.module')


exports.createSizeTable = handlerFactory.createOne(SizeTable)
exports.getSizeTables = handlerFactory.getAll(SizeTable)
exports.updateSizeTable = handlerFactory.updateOne(SizeTable)