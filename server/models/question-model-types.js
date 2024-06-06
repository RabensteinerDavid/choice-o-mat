const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestionTypesSchema = new Schema(
  {
    questionTypes: {
      type: [String], 
      required: true, 
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('question-types', QuestionTypesSchema);
