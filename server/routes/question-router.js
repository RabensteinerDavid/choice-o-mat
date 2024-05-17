const express = require('express')
const QuestionCtrl = require('../controllers/question-ctrl')
const QuestionCtrlTypes = require('../controllers/question-ctrl-types')
const router = express.Router()

const multer = require('multer')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images')
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

module.exports = router
