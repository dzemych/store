const {Router} = require('express')
const authController = require('../controllers/auth.controller')
const contactController = require('../controllers/contact.controller')


const router = Router()

router
   .route('/')
   .get(contactController.getAllContacts)
   .post(
      authController.protectAndSetUserId,
      authController.restrictTo(['admin']),
      contactController.createContact
   )

router
   .route('/:id')
   .get(contactController.getOneContact)
   .patch(
      authController.protectAndSetUserId,
      authController.restrictTo(['admin']),
      contactController.updateOneContact
   )

module.exports = router