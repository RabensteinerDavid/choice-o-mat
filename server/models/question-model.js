const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Questions = new Schema(
  {
    heading: { type: String, required: true },
    subheading: { type: String, required: true },
    type: { type: String, required: true },
    page: { type: Number, required: true },
    answers: [
      {
        text: { type: String, required: true },
        photo: { type: String, required: false },
        points: {
          da: { type: Number, default: 0 },
          mtd: { type: Number, default: 0 }
        }
      }
    ]
  },
  { timestamps: true }
)

module.exports = mongoose.model('questions', Questions)