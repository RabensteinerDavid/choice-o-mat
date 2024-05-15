const Question = require('../models/question-model')
const mongoose = require('mongoose')

createQuestion = (req, res) => {
  const body = req.body

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a question'
    })
  }

  const question = new Question(body)

  if (!question) {
    return res.status(400).json({ success: false, error: err })
  }

  question
    .save()
    .then(() => {
      return res.status(201).json({
        success: true,
        id: question._id,
        message: 'Question created!'
      })
    })
    .catch(error => {
      return res.status(400).json({
        error,
        message: 'Question not created!'
      })
    })
}

updateQuestion = async (req, res) => {
  const body = req.body

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a body to update'
    })
  }

  try {
    const quest = await Question.findOne({ _id: req.params.id })
    if (!quest) {
      return res.status(404).json({
        message: 'Question not found!'
      })
    }

    quest.type = body.type
    quest.heading = body.heading
    quest.subheading = body.subheading
    quest.page = body.page

    if (body.answers && body.answers.length > 0) {
      body.answers.forEach((updatedAnswer, index) => {
        if (quest.answers[index]) {
          quest.answers[index].text = updatedAnswer.text
          quest.answers[index].points = updatedAnswer.points
        }
      })
    }

    await quest.save()
    return res.status(200).json({
      success: true,
      id: quest._id,
      message: 'Question updated!'
    })
  } catch (error) {
    return res.status(404).json({
      error,
      message: 'Question not updated!'
    })
  }
}

patchQuestion = async (req, res) => {
  const body = req.body

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a valid question ID and answers array to update'
    })
  }

  try {
    const quest = await Question.findOne({ _id: req.params.id })

    if (!quest) {
      return res.status(404).json({
        message: 'Question not found!'
      })
    }

    quest.type = body.type
    quest.heading = body.heading
    quest.subheading = body.subheading
    quest.page = body.page

    quest.answers = quest.answers.filter(ans => {
      return body.answers.some(
        updatedAnswer => updatedAnswer._id.toString() === ans._id.toString()
      )
    })

    let newAnswers
    try {
      newAnswers = body.answers.filter(updatedAnswer => {
        return quest.answers.every(ans => !ans._id.equals(updatedAnswer._id))
      })

      for (const updatedAnswer of body.answers) {
        if (updatedAnswer && updatedAnswer._id) {
          const index = quest.answers.findIndex(ans => {
            return (
              ans._id && ans._id.toString() === updatedAnswer._id.toString()
            )
          })

          if (index !== -1) {
            quest.answers[index].points = updatedAnswer.points
            quest.answers[index].text = updatedAnswer.text
          }
        }
      }

      for (const newAnswer of newAnswers) {
        quest.answers.push({
          points: newAnswer.points,
          text: newAnswer.text,
          _id: new mongoose.Types.ObjectId()
        })
      }

      await quest.save()
    } catch (error) {
      console.error('Error filtering new answers:', error)
      return res.status(500).json({
        success: false,
        error: 'Error filtering new answers: ' + error.message
      })
    }

    return res.status(200).json({
      success: true,
      id: quest._id,
      message: 'Question answers updated!'
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message
    })
  }
}

deleteQuestion = async (req, res) => {
  try {
    const quest = await Question.findOneAndDelete({ _id: req.params.id })
    if (!quest) {
      return res
        .status(404)
        .json({ success: false, error: `Question not found` })
    }
    return res.status(200).json({ success: true, data: quest })
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message })
  }
}

getQuestionById = async (req, res) => {
  await Question.findOne({ _id: req.params.id }, (err, quest) => {
    if (err) {
      return res.status(400).json({ success: false, error: err })
    }

    if (!quest) {
      return res
        .status(404)
        .json({ success: false, error: `Question not found` })
    }
    return res.status(200).json({ success: true, data: quest })
  }).catch(err => console.log(err))
}

getQuestion = async (req, res) => {
  try {
    const quest = await Question.find({})
      .then(data => {
        return res.status(200).json({ success: true, data: data })
      })
      .catch(err => {
        return res.status(404).json({ success: false, error: err })
      })
    if (!quest || quest.length === 0) {
      return res
        .status(404)
        .json({ success: false, error: `Question not found` })
    }
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message })
  }
}

deleteAllQuestions = async (req, res) => {
  try {
    const deletedQuestions = await Question.deleteMany({})
    if (deletedQuestions.deletedCount === 0) {
      return res
        .status(404)
        .json({ success: false, error: `No questions found to delete` })
    }
    return res
      .status(200)
      .json({ success: true, message: `Successfully deleted all questions` })
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message })
  }
}

getMaxPage = async (req, res) => {
  try {
    const maxPage = await Question.aggregate([
      { $group: { _id: null, maxPage: { $max: '$page' } } }
    ])

    if (!maxPage || maxPage.length === 0) {
      return res
        .status(404)
        .json({ success: false, error: `No questions found` })
    }

    return res.status(200).json({ success: true, maxPage: maxPage[0].maxPage })
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message })
  }
}

module.exports = {
  createQuestion,
  updateQuestion,
  getMaxPage,
  deleteQuestion,
  getQuestion,
  getQuestionById,
  deleteAllQuestions,
  patchQuestion
}
