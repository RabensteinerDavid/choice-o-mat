import React, { useEffect, useState } from 'react'
import { deleteAllQuestions, getQuestionTypes, insertQuestion } from '../api'
import '../style/questionadd.css'
import InputField from '../components/InputField'
import { prefilledQuestions } from './questions/PrefillQuestion'
import { getMaxPageValue } from '../components/LoadQuestion'
import ImageUploader from '../components/questions_images/ImageUploader'
import DropDownField from '../components/DropDown'

const QuestionAdd = () => {
  const [questionType, setQuestionType] = useState('')
  const [heading, setHeading] = useState('')
  const [subHeading, setSubHeading] = useState('')
  const [answerCount, setAnswerCount] = useState(0)
  const [answers, setAnswers] = useState([])
  const [photos, setPhoto] = useState([])
  const [aspectratio, setAspectRatio] = useState([])

  useEffect(() => {
    checkQuestionType()
  }, [questionType])

  const handleChangeInputQuestionType = type => {
    setQuestionType(type)
  }

  const handlePhotosAdd = selectedPhotos => {
    setPhoto(prevPhotos => [...prevPhotos, ...selectedPhotos])
  }

  const checkQuestionType = async () => {
    const response = await getQuestionTypes()
    response.data.types.forEach(type => {
      Object.entries(type.formats).forEach(([key, value]) => {
        if (questionType === key) {
          const [v1, v2] = value.split('/').map(Number)
          const aspectRatio = v1 / v2
          setAspectRatio(aspectRatio)
        }
      })
    })
  }

  const handleChangeInputHeading = event => {
    setHeading(event.target.value)
  }

  const handleChangeInputSubHeading = event => {
    setSubHeading(event.target.value)
  }

  const handleSetNumberAnswers = event => {
    let count = parseInt(event.target.value.replace(/[^0-9]/g, ''))
    if (isNaN(count) || count <= 0) {
      count = 0
    }
    setAnswerCount(count)
    setAnswers(Array(count).fill({ text: '', points: { DA: '', MTD: '' } }))
  }

  const handleChangeAnswer = (index, key, value) => {
    const updatedAnswers = answers.map((answer, i) => {
      if (i === index) {
        return { ...answer, [key]: value }
      }
      return answer
    })
    setAnswers(updatedAnswers)
  }

  const handleIncludeQuestion = async () => {
    if (
      !questionType ||
      !heading ||
      !subHeading ||
      !answers.length ||
      answerCount === 0
    ) {
      alert('Please fill in all fields and add an Answer')
      return
    }

    const hasEmptyAnswer = answers.some(
      answer => !answer.text || !answer.points.DA || !answer.points.MTD
    )
    if (hasEmptyAnswer) {
      alert('Please provide text and points for all answers')
      return
    }

    const answerArray = answers.map(ans => ({
      text: ans.text,
      points: {
        da: ans.points.DA,
        mtd: ans.points.MTD
      }
    }))

    const maxPage = await getMaxPageValue()
    const payload = {
      heading: heading,
      subheading: subHeading,
      type: questionType,
      page: maxPage + 1,
      answers: answerArray
    }

    const data = new FormData()
    photos.forEach(photo => {
      data.append('photos', photo)
    })

    data.append('heading', heading)
    data.append('subheading', subHeading)
    data.append('type', questionType)
    data.append('page', maxPage + 1)
    data.append('answers', JSON.stringify(answerArray))

    try {
      await insertQuestion(data)
      alert('Question inserted successfully on the last page')
      setQuestionType('')
      setHeading('')
      setSubHeading('')
      setAnswers([])
      setPhoto([])
      setAnswerCount(0)
    } catch (error) {
      console.error('Error inserting question:', error)
      alert('Failed to insert question. Please check console for details.')
    }
  }

  const prefillQuestion = async () => {
    try {
      for (const question of prefilledQuestions) {
        const data = new FormData()
        data.append('heading', question.heading)
        data.append('subheading', question.subheading)
        data.append('type', question.type)
        data.append('page', question.page)
        data.append('answers', JSON.stringify(question.answers))
        await insertQuestion(data)
      }
      alert('Questions inserted successfully')
    } catch (error) {
      console.error('Error inserting questions:', error)
      alert('Failed to insert questions. Please check console for details.')
    }
  }

  const deleteQuestions = async () => {
    try {
      await deleteAllQuestions()
      alert('All Questions deleted successfully')
    } catch (error) {
      console.error('Error inserting questions:', error)
      alert('Failed to insert questions. Please check console for details.')
    }
  }

  const handlePhotosDelete = index => {
    // questions.answers[index].photo = 'no photo'
  }

  const answerInputs = answers.map((answer, index) => (
    <div key={index}>
      <InputField
        label={`Answer ${index + 1}`}
        value={answer.text}
        onChange={event =>
          handleChangeAnswer(index, 'text', event.target.value)
        }
      />
      <InputField
        label={`DA Points ${index + 1}`}
        value={answer.points.DA}
        onChange={event =>
          handleChangeAnswer(index, 'points', {
            ...answer.points,
            DA: event.target.value.replace(/\D/g, '')
          })
        }
      />
      <InputField
        label={`MTD Points ${index + 1}`}
        value={answer.points.MTD}
        onChange={event =>
          handleChangeAnswer(index, 'points', {
            ...answer.points,
            MTD: event.target.value.replace(/\D/g, '')
          })
        }
      />

      <ImageUploader
        answerNumber={index}
        photoAdd={handlePhotosAdd}
        aspectratio={aspectratio}
        photoDelete={handlePhotosDelete}
        defaultPhotoProp={answer.photo != 'no photo' ? answer.photo : null}
        answerId={answer._id}
      />
    </div>
  ))

  return (
    <>
      <h1 className='title'>Create Question</h1>
      <DropDownField
        label='Question Type'
        value={questionType}
        onChange={handleChangeInputQuestionType}
        defaultValue='Selection'
        initial={false}
      />
      <InputField
        label='Heading'
        value={heading}
        onChange={handleChangeInputHeading}
      />
      <InputField
        label='Sub Heading'
        value={subHeading}
        onChange={handleChangeInputSubHeading}
      />
      <InputField
        label='Number of Answers'
        value={answerCount}
        onChange={handleSetNumberAnswers}
      />
      {answerInputs}
      <div className='question-buttons'>
        <button className='add-button' onClick={handleIncludeQuestion}>
          Add Question
        </button>
        <button className='prefill-button' onClick={prefillQuestion}>
          Add Prefilled Questions
        </button>
        <button className='delete-button' onClick={deleteQuestions}>
          Delete All Questions
        </button>
      </div>
    </>
  )
}

export default QuestionAdd
