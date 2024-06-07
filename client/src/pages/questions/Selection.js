import React, { useEffect, useState } from 'react'
import NavBar from '../../components/NavBar'
import FotBar from '../../components/FotBar'
import '../../style/questions/selection.css'
import HeadingQuestion from '../../components/HeadingQuestion'
import SelectionImage from '../../components/questions_images/SelectionImage'
import useWindowDimensions from '../../components/useWindowSize'
import { findPointsToAnswer } from '../../components/LoadQuestion'

const Selection = ({ question, setFinalAnswers }) => {
  const { heading, subheading, answers } = question

  const [focusedButtons, setFocusedButtons] = useState([]) // State für die fokussierten Buttons

  const toggleFocus = id => {
    setFocusedButtons(
      prevState =>
        prevState.includes(id)
          ? prevState.filter(buttonId => buttonId !== id) // Entferne den Fokus, wenn der Button bereits fokussiert ist
          : [...prevState, id] // Füge den Fokus hinzu, wenn der Button nicht fokussiert ist
    )
  }

  useEffect(() => {
    let finalAnswersResult = {
      da: 0,
      mtd: 0
    }
    for (const key in focusedButtons) {
      const value = focusedButtons[key]
      finalAnswersResult['da'] +=
        parseInt(findPointsToAnswer(answers, value).da) / answers.length
      finalAnswersResult['mtd'] +=
        parseInt(findPointsToAnswer(answers, value).mtd) / answers.length
    }
    setFinalAnswers(finalAnswersResult)
  }, [focusedButtons])

  return (
    <div className='question-list'>
      <NavBar questionID={question._id} />
      <div className='main'>
        {question ? (
          <React.Fragment>
            <HeadingQuestion heading={heading} subheading={subheading} />
            <div className='answer-grid'>
              {answers.map(answer => (
                <button
                  key={answer._id}
                  className={`answer-element-selection ${
                    focusedButtons.includes(answer._id) ? 'focused' : ''
                  }`}
                  onClick={() => toggleFocus(answer._id)}
                >
                  {answer.text}
                  {focusedButtons.includes(answer._id) && (
                    <div className='circle'>
                      <div className='checkMark'></div>
                    </div> //selected-icon für check mark im grünen Kreis, wenn ein Button gedrückt ist
                  )}
                </button>
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

export default Selection
