const express = require('express')
const route= express.Router()
const {getxure, postxure, putxure, delxure} = require('../Controller/Controller')
const {protect} = require('../Middleware/authMiddleware')

route.route('/').get(protect, getxure).post(protect, postxure)
// route.get(('/'), getxure)

// route.post(('/'), postxure)

route.put(('/:id'), protect, putxure)

route.delete(('/:id'),protect, delxure)

module.exports = route