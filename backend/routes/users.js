const express = require('express')
const router = express.Router()

import usersController from '../controllers/usersController.js'

router.get('/', usersController.getSigninformation)

module.exports = router