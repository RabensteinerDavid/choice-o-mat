const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestionResultSchema = new Schema(
  {
    range: { type: String, required: true },
    text: { type: String, required: true },  
  },
  { timestamps: true }
);

module.exports = mongoose.model('question-result', QuestionResultSchema);
