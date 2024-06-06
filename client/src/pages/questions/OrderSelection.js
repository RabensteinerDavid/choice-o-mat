import React, { useEffect, useState } from 'react'
import NavBar from '../../components/NavBar'
import FotBar from '../../components/FotBar'
import '../../style/questions/orderselection.css'
import HeadingQuestion from '../../components/HeadingQuestion'
import { findPointsToAnswer } from '../../components/LoadQuestion'

const OrderSelection = ({ question, setFinalAnswers }) => {
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

  useEffect(() => {
    let finalAnswersResult = {
      da: 0,
      mtd: 0
    };
  
    const totalDa = pressed.reduce((total, id) => {
      return total + parseInt(findPointsToAnswer(answers, id).da);
    }, 0);
  
    const totalMtd = pressed.reduce((total, id) => {
      return total + parseInt(findPointsToAnswer(answers, id).mtd);
    }, 0);
  
    pressed.forEach(id => {
      const points = findPointsToAnswer(answers, id);
      const percentDa = isNaN(parseInt(points.da) / totalDa) ? 0 : parseInt(points.da) / totalDa;
      const percentMtd = isNaN(parseInt(points.mtd) / totalMtd) ? 0 : parseInt(points.mtd) / totalMtd;
      finalAnswersResult['da'] += percentDa * 100;
      finalAnswersResult['mtd'] += percentMtd * 100;
    });
  
    setFinalAnswers(finalAnswersResult);
  }, [pressed]);

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
    </div>
  )
}

export default OrderSelection
