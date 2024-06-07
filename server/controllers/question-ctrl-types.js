const QuestionTypes = require('../models/question-model-types')

const getQuestionTypes = async (req, res) => {
  try {
    const types = await QuestionTypes.find({})
      .then(data => {
        return res.status(200).json({ success: true, data: data })
      })
      .catch(err => {
        return res.status(404).json({ success: false, error: err })
      })
    if (!types || types.length === 0) {
      return res
        .status(404)
        .json({ success: false, error: `Questiontypes not found` })
    }
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message })
  }
}

const insertQuestionTypes = async (req, res) => {
  const body = req.body

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide an array of Questiontype'
    })
  }

  const newQuestionTypes = new QuestionTypes({
    questiontype: body.questiontype
  })

  newQuestionTypes
    .save()
    .then(() => {
      return res.status(201).json({
        success: true,
        id: newQuestionTypes._id,
        message: 'Questiontype created!'
      })
    })
    .catch(error => {
      return res.status(400).json({
        error,
        message: 'Questiontype not created!'
      })
    })
}

const deleteAllQuestionTypes = async (req, res) => {
  try {
    await QuestionTypes.deleteMany({})
    return res
      .status(200)
      .json({ success: true, message: 'All Questiontype deleted' })
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message })
  }
}

const updateQuestionTypeById = async (req, res) => {
  const body = req.body

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a body to update'
    })
  }

  try {
    const questiontype = await QuestionTypes.findOne({ _id: req.params.id })
    if (!questiontype) {
      return res.status(404).json({
        message: 'Questiontype not found!'
      })
    }
    questiontype.questiontype = body.questiontype
    await questiontype.save()
    return res.status(200).json({
      success: true,
      id: questiontype._id,
      message: 'Questiontype updated!'
    })
  } catch (error) {
    return res.status(404).json({
      error,
      message: 'Question not updated!'
    })
  }
}

const insertQuestionType = async (req, res) => {
  const body = req.body

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a question type'
    })
  }

  try {
    const newQuestionType = await QuestionTypes.findOneAndUpdate(
      { _id: req.params.id },
      { $addToSet: { questionTypes: body } },
      { new: true }
    )

    if (!newQuestionType) {
      return res.status(404).json({
        success: false,
        message: 'Question type not found'
      })
    }

    return res.status(201).json({
      success: true,
      message: 'Question type added successfully',
      types: [
        {
          _id: newQuestionType._id,
          questionTypes: newQuestionType.questionTypes
        }
      ]
    })
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error.message || 'Failed to add question type'
    })
  }
}

const deleteQuestionTypeById = async (req, res) => {
  try {
    const questionType = await QuestionTypes.findOneAndDelete({
      _id: req.params.id
    })
    if (!questionType) {
      return res.status(404).json({ success: false, error: `Questiontype not found` })
    }
    return res.status(200).json({ success: true, data: questionType })
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message })
  }
}

module.exports = {
  getQuestionTypes,
  insertQuestionTypes,
  deleteAllQuestionTypes,
  insertQuestionType,
  deleteQuestionTypeById,
  updateQuestionTypeById
}
