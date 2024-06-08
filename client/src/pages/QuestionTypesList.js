import React, { useState, useEffect } from 'react'
import '../style/questionupdate.css'
import '../style/questiontypeslist.css'
import { Link } from 'react-router-dom'
import {
  deleteAllQuestionTypes,
  getQuestionTypes,
  insertQuestionType,
  insertQuestionTypes,
  deleteQuestionTypeById,
  updateQuestionTypeById
} from '../api'
import { prefilledQuestionTypes } from './questions/PrefillQuestionType'
import NavBar from '../components/NavBar'
import InputField from '../components/InputField'

function QuestionTypesList () {
  const [questionTypes, setQuestionsTypes] = useState([])
  const [questionTypeInput, setQuestionInput] = useState('')
  const [editIndex, setEditIndex] = useState(null)
  const [editValue, setEditValue] = useState('')

  useEffect(() => {
    const fetchDataQuestionTypes = async () => {
      try {
        const response = await getQuestionTypes()
        setQuestionsTypes(response.data.data)
      } catch (error) {
        console.error('Error fetching questions:', error)
      }
    }
    fetchDataQuestionTypes()
  }, [questionTypes])

  const prefillQuestionType = async () => {
    try {
      if (questionTypes.length === 0) {
        for (const result of prefilledQuestionTypes) {
          await insertQuestionTypes(result)
        }
      } else {
        alert(
          'Prefilled Question types are already inserted successfully. Delete all question types to insert again'
        )
      }
    } catch (error) {
      console.error('Error inserting question types:', error)
      alert(
        'Failed to insert question types. Please check console for details.'
      )
    }
  }

  const deleteQuestionsTypes = async () => {
    try {
      await deleteAllQuestionTypes()
    } catch (error) {
      console.error('Error deleting questions:', error)
      alert('Failed to delete questions. Please check console for details.')
    }
  }

  const deleteFunction = async id => {
    try {
      await deleteQuestionTypeById(id)
    } catch (error) {
      console.error('Error deleting question type:', error)
      alert('Failed to delete question type. Please check console for details.')
    }
  }

  const editFunction = async id => {
    try {
      if (editValue === '' || editValue === null) {
        alert(
          'Question type cannot be empty. Please enter a new question type.'
        )
        return
      }

      for (let questionTypeitem of questionTypes) {
        if (questionTypeitem.questiontype === editValue) {
          alert('Question type already exists. Please enter a new question type.')
          setQuestionInput('')
          return
        }
      }

      const questionType = {
        questiontype: editValue
      }
      await updateQuestionTypeById(id, questionType)
      setEditIndex('')
      setEditValue('')
    } catch (error) {
      console.error('Error editing question type:', error)
      alert('Failed to edit question type. Please check console for details.')
    }
  }

  const handleChangeHeadingType = event => {
    setQuestionInput(event.target.value)
  }

  const addFunction = async () => {
    if (!questionTypeInput) {
      alert('Please enter a question type')
      return
    }
    for (let questionTypeitem of questionTypes) {
      if (questionTypeitem.questiontype === questionTypeInput) {
        alert('Question type already exists. Please enter a new question type.')
        setQuestionInput('')
        return
      }
    }
    try {
      const questionType = {
        questiontype: questionTypeInput
      }
      await insertQuestionType(questionType)
      setQuestionInput('')
    } catch (error) {
      console.error('Error adding question type:', error)
      alert('Failed to add question type. Please check console for details.')
    }
  }

  return (
    <div className='question-list update'>
      <NavBar />
      <div className='wrapper'>
        <div className='question-heading-toggle'>
          <h1 className='title'>Question Types</h1>
          <div className='toggle-list space'>
            <a href='/question-result' className='toggle-list'>
              Questionresult
            </a>
            <a href='/question' className='toggle-list'>
              Question
            </a>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Types</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {questionTypes
              ? questionTypes.map((questionType, index) => (
                  <tr key={questionType._id}>
                    <td className='questiontype-list'>
                      {editIndex === index ? (
                        <InputField
                          value={editValue}
                          onChange={e => setEditValue(e.target.value)}
                          placeholder={questionType.questiontype}
                        />
                      ) : (
                        questionType.questiontype
                      )}
                    </td>
                    <td className='questiontype-list'>
                      {editIndex === index ? (
                        <Link
                          className='update-link questiontype'
                          onClick={() => editFunction(questionType._id)}
                        >
                          Save
                        </Link>
                      ) : (
                        <Link
                          className='update-link questiontype'
                          onClick={() => setEditIndex(index)}
                        >
                          Edit
                        </Link>
                      )}
                      <Link
                        className='delete-button questiontype'
                        onClick={() => deleteFunction(questionType._id)}
                      >
                        Delete
                      </Link>
                    </td>
                  </tr>
                ))
              : null}
          </tbody>
        </table>
        <h1 className='title'>Create Question Type</h1>
        <InputField
          label='New Question Type'
          value={questionTypeInput}
          onChange={handleChangeHeadingType}
        />
        <div className='question-buttons'>
          <button className='add-button space' onClick={addFunction}>
            Add Questions Types
          </button>
          <button className='prefill-button' onClick={prefillQuestionType}>
            Add Prefilled Questions Types
          </button>
          <button
            className='delete-button questiontype space'
            onClick={deleteQuestionsTypes}
          >
            Delete All Questions
          </button>
        </div>
      </div>
    </div>
  )
}

export default QuestionTypesList
