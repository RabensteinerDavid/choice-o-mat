const mongoose = require('mongoose')
const Schema = mongoose.Schema

const QuestionTypes = new Schema(
  {
    questionTypes: [
      {
        type: String
      }
    ]
  },
  { timestamps: true }
)

module.exports = mongoose.model('question-types', QuestionTypes)
