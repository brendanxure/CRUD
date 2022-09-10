const express = require('express')
const router = express.Router()
const {Register, Login, Getuser} = require('../Controller/Usercontroller')
const {protect} = require('../Middleware/authMiddleware')

router.post(('/register'), Register)
router.post(('/login'), Login)
router.get(('/getuser'), protect, Getuser)

module.exports = router