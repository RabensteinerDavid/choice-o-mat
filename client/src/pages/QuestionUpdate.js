import React, { useState, useEffect } from 'react'
import { getAllQuestion, updateQuestionById, deleteQuestionById } from '../api'
import '../style/questionupdate.css'
import InputField from '../components/InputField'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'

function QuestionUpdate ({ onToggleQuestionAdd }) {
  const [questions, setQuestions] = useState([])
  const [order, setOrder] = useState(questions)
  const [edit, setEdit] = useState(false)
  const [editId, setEditID] = useState('')

  const [questionType, setQuestionType] = useState('')
  const [heading, setHeading] = useState('')
  const [subHeading, setSubHeading] = useState('')

  const [info, showInfo] = useState(false)

  const [editedAnswers, setEditedAnswers] = useState([])

  const handleUpdate = async (questionItem, newPage = questionItem.page) => {
    const payload = {
      type: questionType || questionItem.type,
      heading: heading || questionItem.heading,
      subheading: subHeading || questionItem.subheading,
      page: newPage,
      answers: editedAnswers.length > 0 ? editedAnswers : questionItem.answers
    }

    try {
      await updateQuestionById(editId, payload)
      setEditID('')
      setSubHeading('')
      setHeading('')
      setQuestionType('')
      setEdit(false)
      onToggleQuestionAdd()
    } catch (error) {
      console.error('Failed to update question:', error)
      alert('Failed to update question. Please check console for details.')
    }
  }

  const deleteQuestion = async id => {
    try {
      await deleteQuestionById(id)
      window.alert('Question deleted successfully')
      setEdit(false)
      onToggleQuestionAdd()
    } catch (error) {
      console.error('Failed to delete question:', error)
      alert('Failed to delete question. Please check console for details.')
    }
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
        setOrder(response.data.data)
      } catch (error) {
        console.error('Error fetching questions:', error)
      }
    }
    fetchData()
  }, [edit])

  const handleChangeInputQuestionType = event => {
    setQuestionType(event.target.value)
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
      updatedAnswers[index] = { ...updatedAnswers[index], text: value }
      return updatedAnswers
    })
  }

  const handleChangeInputPoints = (value, question, index, pointType) => {
    const updatedAnswers = [...editedAnswers]
    if (!updatedAnswers[index]) {
      updatedAnswers[index] = { ...question.answers[index] }
    }
    updatedAnswers[index].points = {
      ...updatedAnswers[index].points,
      [pointType]: parseInt(value.replace(/[^0-9]/g, ''), 10) || 0
    }
    setEditedAnswers(updatedAnswers)
  }

  const handleUpdateReorder = async () => {
    try {
      console.log(order)
      for (let index = 0; index < order.length; index++) {
        const question = order[index]
        const payload = {
          type: question.type,
          heading: question.heading,
          subheading: question.subheading,
          page: 1 + index,
          answers: question.answers
        }
        await updateQuestionById(question._id, payload)
      }

      window.alert('Reordering updated successfully')
    } catch (error) {
      console.error('Failed to update reorder:', error)
      alert('Failed to update reorder. Please check console for details.')
    }
  }

  function handleOnDragEnd (result) {
    if (!result.destination) return

    const items = Array.from(order)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    const updatedItems = items.map((question, index) => ({
      ...question,
      page: index + 1
    }))

    showInfo(true)
    setOrder(updatedItems)
  }

  return (
    <div className='question-list'>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId='droppable'>
          {provided => (
            <li {...provided.droppableProps} ref={provided.innerRef}>
              {!edit ? (
                <div>
                  <h1 className='title'>Questions</h1>
                  <table>
                    <thead>
                      <tr>
                        <th>Page</th>
                        <th>Type</th>
                        <th>Heading</th>
                        <th>Sub Heading</th>
                        <th colSpan={4}>Answers</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order
                        .sort((a, b) => a.page - b.page)
                        .map((question, index) => (
                          <Draggable
                            key={question._id}
                            draggableId={question._id}
                            index={index}
                          >
                            {provided => (
                              <tr
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                ref={provided.innerRef}
                              >
                                <td>{question.page}</td>
                                <td>{question.type}</td>
                                <td>{question.heading}</td>
                                <td>{question.subheading}</td>

                                <td colSpan='4'>
                                  {question.answers
                                    .map(
                                      answer =>
                                        `${answer.text} ( DA: ${answer.points.da}, MTD: ${answer.points.mtd})`
                                    )
                                    .join(', ')}
                                </td>
                                <td>
                                  <button
                                    className='update-button'
                                    onClick={() => functionUpdate(question._id)}
                                  >
                                    Update
                                  </button>
                                </td>
                              </tr>
                            )}
                          </Draggable>
                        ))}
                    </tbody>
                  </table>
                  {provided.placeholder}
                  <button
                    className='update-button reorder'
                    onClick={() => {
                      handleUpdateReorder()
                    }}
                  >
                    Update Reorder
                  </button>
                </div>
              ) : null}
            </li>
          )}
        </Droppable>
      </DragDropContext>

      {info ? (
        <div className='info-text'>
          To save order changes, you have to apply with a click on Update-Reorder-Button.
        </div>
      ) : null}

      {edit
        ? questions.map(question => (
            <div key={question._id}>
              {question._id === editId && (
                <div>
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
                  {question.answers.map((answer, index) => (
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
                        value={editedAnswers[index]?.points?.da || ''}
                        onChange={event =>
                          handleChangeInputPoints(
                            event.target.value,
                            question,
                            index,
                            'da'
                          )
                        }
                        placeholder={answer.points.da}
                      />
                      <InputField
                        label={`MTD Points ${index + 1}`}
                        value={editedAnswers[index]?.points?.mtd || ''}
                        onChange={event =>
                          handleChangeInputPoints(
                            event.target.value,
                            question,
                            index,
                            'mtd'
                          )
                        }
                        placeholder={answer.points.mtd}
                      />
                    </div>
                  ))}

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
        : null}
    </div>
  )
}

export default QuestionUpdate
