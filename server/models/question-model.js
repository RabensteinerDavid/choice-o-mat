const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Questions = new Schema(
    {
        id: { type: Number, required: true },
        questiontype: { type: String, required: true },
        heading: { type: String, required: true },
        subheading: { type: String, required: true },
        rating: { type: Array, required: true },
        context: { type: Array, required: true },
    },
    { timestamps: true },
)

module.exports = mongoose.model('questions', Questions)