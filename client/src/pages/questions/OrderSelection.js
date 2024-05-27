import React, { useState } from 'react'
import NavBar from '../../components/NavBar'
import FotBar from '../../components/FotBar'
import '../../style/questions/orderselection.css'
import HeadingQuestion from '../../components/HeadingQuestion'

const OrderSelection = ({ question, pageNumber, maxPage }) => {
  const { heading, subheading, answers } = question
  const [order, setOrder] = useState(answers)
  const [pressed, setPressed] = useState([])

  const handleOrder = (index, id) => {
    let newPressed = [...pressed]

    if (newPressed.includes(id)) {
      newPressed = newPressed.filter(pressedId => pressedId !== id)
    } else {
      newPressed.push(id)
    }
    setPressed(newPressed)

    const remainingItems = order.filter(item => !newPressed.includes(item._id))

    const newOrder = [
      ...newPressed.map(pressedId =>
        order.find(item => item._id === pressedId)
      ),
      ...remainingItems
    ]
    setOrder(newOrder)
  }

  return (
    <div className='question-list'>
      <NavBar />
      <div className='main'>
        {question ? (
          <React.Fragment>
            <HeadingQuestion heading={heading} subheading={subheading} />
            <div className='order-selection-wrapper'>
              {order.map((answer, index) => (
                <div
                  onClick={() => {
                    handleOrder(index, answer._id)
                  }}
                  id={answer._id}
                  key={answer._id}
                  className={`order-selection-item ${
                    pressed.includes(answer._id) ? `pressed_${index}` : ''
                  }`}
                >
                  <p>{answer.text}</p>
                </div>
              ))}
            </div>
          </React.Fragment>
        ) : (
          <p>No questions found at question </p>
        )}
      </div>
      <FotBar
        prevQuestion={pageNumber === 1 ? 1 : pageNumber - 1}
        nextQuestion={pageNumber === maxPage ? maxPage : pageNumber + 1}
      />
    </div>
  )
}

export default OrderSelection
