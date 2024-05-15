import { useEffect, useState } from 'react'
import { loadQuestionsID } from '../components/LoadQuestion'
import InputField from '../components/InputField'
import {
  deleteQuestionById,
  getAllQuestion,
  patchQuestion,
  updateQuestionById
} from '../api'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const QuestionUpdateFunction = () => {
  let navigate = useNavigate()

  const { id } = useParams()
  const [question, setQuestions] = useState([])
  const [questionType, setQuestionType] = useState('')
  const [heading, setHeading] = useState('')
  const [subHeading, setSubHeading] = useState('')
  const [editedAnswers, setEditedAnswers] = useState([])
  const [answerCount, setAnswerCount] = useState(0)
  const [newAnswers, setNewAnswers] = useState([])
  const [photos, setPhoto] = useState([])

  const answersLength = question.answers ? question.answers.length : 0

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await loadQuestionsID(id)
        if (response.length > 0) {
          setQuestions(response[0])
          setAnswerCount(response[0].answers.length)
          const extendedAnswers = [...response[0].answers]
          while (extendedAnswers.length < response[0].answers.length) {
            extendedAnswers.push({ points: { DA: 0, MTD: 0 }, text: '' })
          }
          setNewAnswers(extendedAnswers)
        }
      } catch (error) {
        console.error('Error fetching questions:', error)
      }
    }
    fetchData()
  }, [id])

  const handlerPhoto = event => {
    const files = event.target.files
    const fileArray = Array.from(files)
    setPhoto(prevPhotos => [...prevPhotos, ...fileArray])
  }

  const handleChangeInputQuestionType = event => {
    setQuestionType(event.target.value)
  }

  const deleteQuestion = async () => {
    try {
      await deleteQuestionById(id)
      window.alert('Question deleted successfully')
      handleUpdateReorder()
      navigate('/question')
    } catch (error) {
      console.error('Failed to delete question:', error)
      alert('Failed to delete question. Please check console for details.')
    }
  }

  const handleUpdateReorder = async () => {
    try {
      const response = await getAllQuestion()
      const allQuestion = response.data.data

      for (let index = 0; index < allQuestion.length; index++) {
        const questionData = allQuestion[index]
        const payload = {
          type: questionData.type,
          heading: questionData.heading,
          subheading: questionData.subheading,
          page: 1 + index,
          answers: questionData.answers
        }
        await updateQuestionById(questionData._id, payload)
      }
    } catch (error) {
      console.error('Failed to update reorder:', error)
      alert('Failed to update reorder. Please check console for details.')
    }
  }

  const hasEmptyValues = obj => {
    if (obj == null) return false

    if (typeof obj === 'object') {
      for (let key in obj) {
        if (!obj.hasOwnProperty(key)) continue

        const value = obj[key]
        if (typeof value === 'string' && value.trim() === '') return true
        if (typeof value === 'object' && hasEmptyValues(value)) return true
      }
    }

    return false
  }

  const handleUpdate = async (questionItem, newPage = questionItem.page) => {
    const payload = {
      _id: questionItem._id,
      type: questionType || questionItem.type,
      heading: heading || questionItem.heading,
      subheading: subHeading || questionItem.subheading,
      page: newPage,
      answers: editedAnswers.length === 0 ? questionItem.answers : editedAnswers
    }

    if (hasEmptyValues(payload.answers)) {
      alert('Please fill all answer fields')
      return false
    }

    if (answerCount === 0) {
      alert('Please add an answer')
      return false
    }

    console.log(id)
    console.log(JSON.stringify(payload))

    try {
      await patchQuestion(id, payload)
      setSubHeading('')
      setHeading('')
      setQuestionType('')
      navigate('/question')
    } catch (error) {
      console.error('Failed to update question:', error)
      alert('Failed to update question. Please check console for details.')
    }
  }

  const handleSetNumberAnswers = event => {
    let count = parseInt(event.target.value.replace(/[^0-9]/g, ''))
    if (isNaN(count) || count <= 0) {
      count = 0
    }
    if (count > 40) {
      count = 40
    }
    setAnswerCount(count)

    const extendedAnswers = [...question.answers]
    if (count < extendedAnswers.length) {
      extendedAnswers.splice(count, extendedAnswers.length - count)
    } else {
      while (extendedAnswers.length < count) {
        extendedAnswers.push({ points: { da: '', mtd: '' }, text: '' })
      }
    }
    setNewAnswers(extendedAnswers)
    setEditedAnswers(extendedAnswers)
  }

  const handleChangeInputHeading = event => {
    setHeading(event.target.value)
  }

  const handleChangeInputSubHeading = event => {
    setSubHeading(event.target.value)
  }

  const handleChangeInputAnswerText = (event, index) => {
    const value = event
    setEditedAnswers(prevAnswers => {
      const updatedAnswers = [...prevAnswers]
      const extendedAnswers = [...question.answers]

      const mergedAnswers = [
        ...updatedAnswers,
        ...extendedAnswers.filter(
          extendedAnswer =>
            !updatedAnswers.some(
              updatedAnswer =>
                updatedAnswer._id &&
                extendedAnswer._id &&
                updatedAnswer._id === extendedAnswer._id
            )
        )
      ]

      if (!mergedAnswers[index]) {
        mergedAnswers[index] = { ...question.answers[index] }
      }
      mergedAnswers[index].text = value

      return mergedAnswers
    })
  }

  const handleChangeInputPoints = (value, index, pointType) => {
    let parsedValue = parseInt(value.replace(/\D/g, ''), 10)
    console.log(parsedValue)
    parsedValue = Math.min(100, Math.max(0, parsedValue || 0))

    const updatedAnswers = [...editedAnswers]
    const extendedAnswers = [...question.answers]

    const mergedAnswers = [
      ...updatedAnswers,
      ...extendedAnswers.filter(
        extendedAnswer =>
          !updatedAnswers.some(
            updatedAnswer => updatedAnswer._id === extendedAnswer._id
          )
      )
    ]

    if (!mergedAnswers[index]) {
      mergedAnswers[index] = { ...question.answers[index] }
    }

    mergedAnswers[index].points = {
      ...mergedAnswers[index].points,
      [pointType]: parsedValue
    }

    setEditedAnswers(mergedAnswers)
  }

  return (
    <div className='wrapper'>
      <h1 className='title-question'>Update Questions</h1>

      <InputField
        label='Question Type'
        value={questionType}
        onChange={handleChangeInputQuestionType}
        placeholder={question.type}
      />
      <InputField
        label='Heading'
        value={heading}
        onChange={handleChangeInputHeading}
        placeholder={question.heading}
      />
      <InputField
        label='Sub Heading'
        value={subHeading}
        onChange={handleChangeInputSubHeading}
        placeholder={question.subheading}
      />

      <InputField
        label='Number of Answers'
        value={answerCount}
        onChange={event => handleSetNumberAnswers(event)}
        placeholder={answersLength}
      />
      {newAnswers.map((answer, index) => (
        <div key={index}>
          <InputField
            label={`Answer ${index + 1}`}
            value={editedAnswers.text}
            onChange={event =>
              handleChangeInputAnswerText(event.target.value, index)
            }
            placeholder={answer.text}
          />
          <InputField
            label={`DA Points ${index + 1}`}
            value={editedAnswers[index]?.points?.da}
            onChange={event =>
              handleChangeInputPoints(event.target.value, index, 'da')
            }
            placeholder={answer.points.da}
          />
          <InputField
            label={`MTD Points ${index + 1}`}
            value={editedAnswers[index]?.points?.mtd}
            onChange={event =>
              handleChangeInputPoints(event.target.value, index, 'mtd')
            }
            placeholder={answer.points.mtd}
          />

          {answer.photo && (
            <img
              src={`http://localhost:3001/images/${answer.photo}`}
              width={600}
              alt='answer'
            />
          )}

          <input type='file' name='photo' onChange={handlerPhoto} />
        </div>
      ))}

      <div className='button-container'>
        <button
          className='update-button big'
          onClick={() => handleUpdate(question)}
        >
          Update
        </button>
        <button
          className='delete-button big'
          onClick={() => deleteQuestion(question._id)}
        >
          Delete
        </button>
        <button
          className='cancel-button big'
          onClick={() => navigate('/question')}
        >
          Close
        </button>
      </div>
    </div>
  )
}

export default QuestionUpdateFunction
