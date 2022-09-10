const express = require('express')
const dotenv = require('dotenv').config()
const port = process.env.PORT
const DBConnect = require('../Config/Db')

const app = express()

DBConnect()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use(('/xure'), require('../Route/Route'))
app.use(('/user'), require('../Route/Userroute'))

app.listen(port, ()=> console.log(`Server is running on port ${port}`))