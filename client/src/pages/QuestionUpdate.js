import React, { useState, useEffect } from 'react'
import { getAllQuestion, updateQuestionById } from '../api'
import '../style/questionupdate.css'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { Link } from 'react-router-dom'

function QuestionUpdate () {
  const [questions, setQuestions] = useState([])
  const [order, setOrder] = useState(questions)
  const [info, showInfo] = useState(false)

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
  }, [])

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
                                <Link
                                  className='update-link'
                                  to={`/question-update/${question._id}`}
                                >
                                  Update
                                </Link>
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
            </li>
          )}
        </Droppable>
      </DragDropContext>

      {info ? (
        <div className='info-text'>
          To save order changes, you have to apply with a click on
          Update-Reorder-Button.
        </div>
      ) : null}
    </div>
  )
}

export default QuestionUpdate