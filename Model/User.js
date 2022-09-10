const mongoose = require('mongoose')

const user = mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please input email']
    },
    name: {
        type: String,
        required: [true, 'Please input name']
    },
    password: {
        type: String,
        required: [true, 'Please input password']
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('User', user)