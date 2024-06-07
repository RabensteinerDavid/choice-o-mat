const QuestionResult = require('../models/question-model-result')

const insertResults = async (req, res) => {
  const body = req.body

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide the right result'
    })
  }

  const result = new QuestionResult({
    range: body.range,
    text: body.text
  })

  result
    .save()
    .then(() => {
      return res.status(201).json({
        success: true,
        id: result._id,
        message: 'Result created!'
      })
    })
    .catch(error => {
      return res.status(400).json({
        error,
        message: 'Result not created!'
      })
    })
}

const getResults = async (req, res) => {
  try {
    const result = await QuestionResult.find({})
      .then(data => {
        return res.status(200).json({ success: true, data: data })
      })
      .catch(err => {
        return res.status(404).json({ success: false, error: err })
      })
    if (!result || result.length === 0) {
      return res.status(404).json({ success: false, error: `Result not found` })
    }
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message })
  }
}

const deleteResultById = async (req, res) => {
  try {
    const result = await QuestionResult.findOneAndDelete({ _id: req.params.id })
    if (!result) {
      return res.status(404).json({ success: false, error: `Result not found` })
    }
    return res.status(200).json({ success: true, data: result })
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message })
  }
}

const deleteAllResults = async (req, res) => {
  try {
    const result = await QuestionResult.deleteMany({})
    if (result.deletedCount === 0) {
      return res
        .status(404)
        .json({ success: false, error: `No result found to delete` })
    }
    return res
      .status(200)
      .json({ success: true, message: `Successfully deleted all results` })
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message })
  }
}

const updateResultById = async (req, res) => {
  const body = req.body

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a body to update'
    })
  }

  try {
    const result = await QuestionResult.findOne({ _id: req.params.id })
    if (!result) {
      return res.status(404).json({
        message: 'Result not found!'
      })
    }

    result.range = body.range
    result.text = body.text

    await result.save()
    return res.status(200).json({
      success: true,
      id: result._id,
      message: 'Result updated!'
    })
  } catch (error) {
    return res.status(404).json({
      error,
      message: 'Result not updated!'
    })
  }
}

module.exports = {
  insertResults,
  getResults,
  deleteResultById,
  deleteAllResults,
  updateResultById
}
