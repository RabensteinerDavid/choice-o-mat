import React, { useState, useEffect } from 'react'
import { getAllQuestion, updateQuestionById, deleteQuestionById } from '../api'
import '../style/questionupdate.css'
import InputField from '../components/InputField'

function QuestionUpdate ({ onToggleQuestionAdd }) {
  const [questions, setQuestions] = useState([])
  const [edit, setEdit] = useState(false)

  const [id, setID] = useState('')
  const [editId, setEditID] = useState('')
  const [questionType, setQuestionType] = useState('')
  const [heading, setHeading] = useState('')
  const [subHeading, setSubHeading] = useState('')
  const [rating, setRating] = useState('')
  const [context, setContext] = useState('')

  const handleUpdate = async questionItem => {
    const payload = {
      id: id || questionItem.id,
      questiontype: questionType || questionItem.questiontype,
      heading: heading || questionItem.heading,
      subheading: subHeading || questionItem.subheading,
      rating: rating || questionItem.rating,
      context: context || questionItem.context
    }

    await updateQuestionById(editId, payload)
      .then(res => {
        setEditID('')
        setContext('')
        setRating('')
        setSubHeading('')
        setHeading('')
        setQuestionType('')
        setID('')
        setEdit(false)
        onToggleQuestionAdd()
      })
      .catch(err => {
        alert(
          'Failed to update question. Please check console for details.',
          err
        )
      })
  }

  const deleteQuestion = async id => {
    await deleteQuestionById(id).then(res => {
      window.alert(`Movie deleted successfully`, res)
      setEdit(false)
      onToggleQuestionAdd()
      return
    })
  }

  const functionUpdate = id => {
    setEditID(id)
    setEdit(true)
    onToggleQuestionAdd()
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllQuestion()
        setQuestions(response.data.data)
      } catch (error) {
        console.error('Error fetching questions:', error)
      }
    }
    fetchData()
  }, [questions])

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

  return (
    <div className='question-list'>
      <ul>
        {!edit ? (
          <div>
            <h1 className='title'>Questions</h1>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Question Type</th>
                  <th>Heading</th>
                  <th>Sub Heading</th>
                  <th>Rating</th>
                  <th>Context</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {questions
                  .sort((a, b) => a.id - b.id)
                  .map(question => (
                    <tr key={question._id}>
                      <td>{question.id}</td>
                      <td>{question.questiontype}</td>
                      <td>{question.heading}</td>
                      <td>{question.subheading}</td>
                      <td>{question.rating}</td>
                      <td>{question.context}</td>
                      <td>
                        <button
                          className='update-button'
                          onClick={() => functionUpdate(question._id)}
                        >
                          Update
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        ) : (
          questions.map(question => (
            <div key={question._id}>
              {question._id === editId && (
                <div>
                  <h1 className='title-question'>Update Questions</h1>

                  <InputField
                    label='Id'
                    value={id}
                    onChange={handleChangeInputId}
                    placeholder={question.id}
                  />
                  <InputField
                    label='Question Type'
                    value={questionType}
                    onChange={handleChangeInputQuestionType}
                    placeholder={question.questiontype}
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
                    label='Rating'
                    value={rating}
                    onChange={handleChangeInputRating}
                    placeholder={question.rating}
                  />
                  <InputField
                    label='Context'
                    value={context}
                    onChange={handleChangeInputContext}
                    placeholder={question.context}
                  />

                  <div className='button-container'>
                    <button
                      className='update-button'
                      onClick={() => handleUpdate(question)}
                    >
                      Update
                    </button>
                    <button
                      className='delete-button'
                      onClick={() => deleteQuestion(question._id)}
                    >
                      Delete
                    </button>
                    <button
                      className='cancel-button'
                      onClick={() => {
                        onToggleQuestionAdd()
                        setEdit(false)
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </ul>
    </div>
  )
}
export default QuestionUpdate
