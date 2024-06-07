const QuestionTypes = require('../models/question-model-types')

const getQuestionTypes = async (req, res) => {
  try {
    const types = await QuestionTypes.find({})
    return res.status(200).json({ success: true, types: types })
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message })
  }
}

const insertQuestionTypes = async (req, res) => {
  const body = req.body

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide an array of question types'
    })
  }

  const newQuestionTypes = await QuestionTypes.create({ questionTypes: body })

  try {
    const response = {
      success: true,
      types: [
        {
          _id: newQuestionTypes._id,
          questionTypes: newQuestionTypes.questionTypes
        }
      ]
    }
    return res.status(201).json(response)
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error.message || 'Question types not created!'
    })
  }
}

const deleteAllQuestionTypes = async (req, res) => {
  try {
    await QuestionTypes.deleteMany({})
    return res
      .status(200)
      .json({ success: true, message: 'All question types deleted' })
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message })
  }
}

const patchQuestionTypes = async (req, res) => {
  const body = req.body
  console.log(body)
  try {
    const newQuestionTypes = await QuestionTypes.findOne({ _id: req.params.id })

    if (!newQuestionTypes) {
      return res
        .status(404)
        .json({ success: false, message: 'Question type not found' })
    }

    newQuestionTypes.questionTypes = body

    console.log(newQuestionTypes)
    await newQuestionTypes.save()
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error.message || 'Failed to fetch question types'
    })
  }
}

const insertQuestionType = async (req, res) => {
  const body = req.body

  console.log(req.params.id)

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

const deleteQuestionType = async (req, res) => {
  try {
    const id = req.params.id.split('-')[0]
    const index = req.params.id.split('-')[1]
    console.log(id)
    console.log(index)

    const updatedQuestionTypes = await QuestionTypes.findOne({ _id: id })

    if (!updatedQuestionTypes) {
      return res
        .status(404)
        .json({ success: false, message: 'Question type not found' })
    }

    updatedQuestionTypes.questionTypes.splice(index, 1)

    await updatedQuestionTypes.save()

    return res
      .status(200)
      .json({ success: true, message: 'Question type deleted' })
  } catch (error) {
    return res
      .status(400)
      .json({
        success: false,
        error: error.message || 'Failed to delete question type'
      })
  }
}

module.exports = {
  getQuestionTypes,
  insertQuestionTypes,
  deleteAllQuestionTypes,
  patchQuestionTypes,
  insertQuestionType,
  deleteQuestionType
}
