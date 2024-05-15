import React, { useState } from 'react'
import { deleteAllQuestions, insertQuestion } from '../api'
import '../style/questionadd.css'
import InputField from '../components/InputField'
import { prefilledQuestions } from './questions/PrefillQuestion'
import { getMaxPageValue } from '../components/LoadQuestion'

const QuestionAdd = () => {
  const [questionType, setQuestionType] = useState('')
  const [heading, setHeading] = useState('')
  const [subHeading, setSubHeading] = useState('')
  const [answerCount, setAnswerCount] = useState(0)
  const [answers, setAnswers] = useState([])

  const handleChangeInputQuestionType = event => {
    setQuestionType(event.target.value)
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

    try {
      await insertQuestion(payload)
      alert('Question inserted successfully on the last page')
      setQuestionType('')
      setHeading('')
      setSubHeading('')
      setAnswers([])
      setAnswerCount(0)
    } catch (error) {
      console.log(payload)
      console.error('Error inserting question:', error)
      alert('Failed to insert question. Please check console for details.')
    }
  }

  const prefillQuestion = async () => {
    try {
      for (const question of prefilledQuestions) {
        await insertQuestion(question)
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
    </div>
  ))

  return (
    <>
      <h1 className='title'>Create Question</h1>
      <InputField
        label='Question Type'
        value={questionType}
        onChange={handleChangeInputQuestionType}
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
