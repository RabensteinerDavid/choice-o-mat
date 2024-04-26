import React, { useState } from 'react'
import { insertQuestion } from '../api'
import '../style/questionadd.css'
import QuestionUpdate from './QuestionUpdate'
import NavBar from '../components/NavBar'
import InputField from '../components/InputField'

const QuestionAdd = () => {
  const [id, setID] = useState('')
  const [questionType, setQuestionType] = useState('')
  const [heading, setHeading] = useState('')
  const [subHeading, setSubHeading] = useState('')
  const [rating, setRating] = useState('')
  const [context, setContext] = useState('')

  const handleChangeInputId = event => {
    var id = event.target.value
    id = id.replace(/[^0-9]/g, '')
    setID(id)
  }
  const handleChangeInputQuestionType = event => {
    setQuestionType(event.target.value)
  }

  const handleChangeInputHeading = event => {
    setHeading(event.target.value)
  }

  const handleChangeInputSubHeading = event => {
    setSubHeading(event.target.value)
  }
  const handleChangeInputRating = event => {
    let inputValue = event.target.value
    inputValue = inputValue.replace(/[^0-9,]/g, '')
    setRating(inputValue)
  }

  const handleChangeInputContext = event => {
    setContext(event.target.value)
  }

  const handleIncludeQuestion = async () => {
    if (!questionType || !heading || !subHeading || !rating || !context) {
      alert('Please fill in all fields')
      return
    }

    const idParse = parseInt(id)
    if (isNaN(idParse)) {
      alert('Please enter a valid number for the ID')
      return
    }

    const ratingArray = rating.split(',').map(value => parseFloat(value.trim()))
    if (ratingArray.some(isNaN)) {
      alert(
        'Invalid rating format. Please provide a comma-separated list of numbers.'
      )
      return
    }
    const contextArray = context.split(',').map(value => value.trim())
    if (contextArray.length === 0) {
      alert('Please provide at least one context.')
      return
    }

    const payload = {
      id: idParse,
      questiontype: questionType,
      heading,
      subheading: subHeading,
      rating: ratingArray,
      context: contextArray
    }

    try {
      await insertQuestion(payload)
      alert('Question inserted successfully')
      setID('')
      setQuestionType('')
      setHeading('')
      setSubHeading('')
      setRating('')
      setContext('')
    } catch (error) {
      console.log(payload)
      console.error('Error inserting question:', error)
      alert('Failed to insert question. Please check console for details.')
    }
  }

  return (
    <>
      <h1 className='title'>Create Question</h1>
      <InputField label='Id' value={id} onChange={handleChangeInputId} />
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
        label='Rating'
        value={rating}
        onChange={handleChangeInputRating}
      />
      <InputField
        label='Context'
        value={context}
        onChange={handleChangeInputContext}
      />
      <button className='add-button' onClick={handleIncludeQuestion}>
        Add Question
      </button>
    </>
  )
}

export default QuestionAdd
