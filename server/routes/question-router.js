const express = require('express')

const QuestionCtrl = require('../controllers/question-ctrl')

const router = express.Router()

router.post('/question', QuestionCtrl.createQuestion)
router.get('/question/maxPage', QuestionCtrl.getMaxPage)
router.put('/question/:id', QuestionCtrl.updateQuestion)
router.delete('/question/:id', QuestionCtrl.deleteQuestion)
router.get('/question/:id', QuestionCtrl.getQuestionById)
router.get('/questions', QuestionCtrl.getQuestion)
router.delete('/question', QuestionCtrl.deleteAllQuestions)
router.patch('/question-update/:id', QuestionCtrl.patchQuestion)

module.exports = router