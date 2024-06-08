const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestionResultSchema = new Schema(
  {
    range: { type: String, required: true },
    textMtd: { type: String, required: true },  
    textDa: { type: String, required: true },  
  },
  { timestamps: true }
);

module.exports = mongoose.model('question-result', QuestionResultSchema);
