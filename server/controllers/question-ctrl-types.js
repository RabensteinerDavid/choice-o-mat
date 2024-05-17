const QuestionTypes = require('../models/question-model-types')

getQuestionTypes = async (req, res) => {
  try {
    const types = await QuestionTypes.find({})
    return res.status(200).json({ success: true, types: types })
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message })
  }
}

module.exports = {
  getQuestionTypes
}
