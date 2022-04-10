const handlerFactory = require('./handlerFactory')
const Contact = require('../modelsDB/contact.model')


exports.createContact = handlerFactory.createOne(Contact)
exports.getAllContacts = handlerFactory.getAll(Contact)
exports.getOneContact = handlerFactory.getOne(Contact)
exports.updateOneContact = handlerFactory.updateOne(Contact)