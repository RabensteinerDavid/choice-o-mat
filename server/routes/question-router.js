const express = require('express')
const QuestionCtrl = require('../controllers/question-ctrl')
const QuestionCtrlTypes = require('../controllers/question-ctrl-types')
const QuestionCtrlResult = require('../controllers/question-ctrl-result')
const router = express.Router()

const multer = require('multer')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, file.originalname.split('.').pop() === "json" ? "public/lottie" : 'public/images')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + Math.round(Math.random() * 1e9)
    cb(
      null,
      file.originalname.split('_')[0] +
        '_' +
        uniqueSuffix +
        '.' +
        file.originalname.split('.').pop()
    )
  }
})
const upload = multer({ storage: storage })

router.post('/question', upload.any('photo'), (req, res) => {
  QuestionCtrl.createQuestion(
    req,
    res,
    req.files.map(file => file.filename)
  )
})
router.get('/question/maxPage', QuestionCtrl.getMaxPage)
router.put('/question/:id', QuestionCtrl.updateQuestion)
router.delete('/question/:id', QuestionCtrl.deleteQuestion)
router.get('/question/:id', QuestionCtrl.getQuestionById)
router.get('/questions', QuestionCtrl.getQuestion)
router.delete('/question', QuestionCtrl.deleteAllQuestions)
router.patch(
  '/delete-answer-photo/:questionId/:answerId',
  QuestionCtrl.deleteAnswerPhoto
)

router.patch('/question-update/:id', upload.any('photo'), (req, res) => {
  QuestionCtrl.patchQuestion(
    req,
    res,
    req.files.map(file => file.filename)
  )
})

router.get('/question-types', QuestionCtrlTypes.getQuestionTypes)
router.post('/question-types', QuestionCtrlTypes.insertQuestionTypes)
router.delete('/question-types/:id', QuestionCtrlTypes.deleteQuestionTypeById)
router.post('/question-types/:id', QuestionCtrlTypes.insertQuestionType)
router.delete('/question-types', QuestionCtrlTypes.deleteAllQuestionTypes)
router.put('/question-types/:id', QuestionCtrlTypes.updateQuestionTypeById)

router.get('/question-result', QuestionCtrlResult.getResults)
router.post('/question-result', QuestionCtrlResult.insertResults)
router.delete('/question-result/:id', QuestionCtrlResult.deleteResultById)
router.delete('/question-result', QuestionCtrlResult.deleteAllResults)
router.put('/question-result/:id', QuestionCtrlResult.updateResultById)


module.exports = router
