const {Router} = require('express')
const userController = require('../controllers/user.controller')


const router = Router()

router.get('/:id', userController.getOneUser)
router.patch('/:id', userController.updateUser)

module.exports = router