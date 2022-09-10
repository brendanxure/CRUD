const mongoose = require('mongoose')

const xureSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name: {
        type: String,
        required: "Name is required"
    },
    post: {
        type: String,
        required: [true, 'Post is required']
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('bxureSchema', xureSchema)