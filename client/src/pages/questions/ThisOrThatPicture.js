import React, { useEffect, useState } from 'react'
import NavBar from '../../components/NavBar'
import FotBar from '../../components/FotBar'
import '../../style/questions/thisorthatpicture.css'
import HeadingQuestion from '../../components/HeadingQuestion'
import ThisOrThatPictureImage from '../../components/questions_images/ThisOrThatPictureImage'
import useWindowDimensions from '../../components/useWindowSize'
import { findPointsToAnswer } from '../../components/LoadQuestion'

const ThisOrThatPicture = ({ question, setFinalAnswers }) => {
  const { height, width } = useWindowDimensions()
  const [focusedButtons, setFocusedButtons] = useState([]) // State für den fokussierten Button

  const { heading, subheading, answers } = question

  const toggleFocus = id => {
    const clickedRowIndex = Math.floor(
      answers.findIndex(answer => answer._id === id) / 2
    ) // Index der Zeile, zu der die geklickte Antwort gehört
    const selectedAnswersInRow = focusedButtons.filter(
      buttonId =>
        Math.floor(answers.findIndex(answer => answer._id === buttonId) / 2) ===
        clickedRowIndex
    ) // Ausgewählte Antworten in derselben Zeile wie die geklickte Antwort

    if (selectedAnswersInRow.length === 1) {
      // Wenn bereits eine Antwort in der Zeile ausgewählt ist, entferne sie
      setFocusedButtons(prevState =>
        prevState.filter(buttonId => buttonId !== selectedAnswersInRow[0])
      )
    }

    // Füge die geklickte Antwort hinzu
    setFocusedButtons(prevState => [
      ...prevState.filter(
        buttonId =>
          Math.floor(
            answers.findIndex(answer => answer._id === buttonId) / 2
          ) !== clickedRowIndex
      ),
      id
    ])
  }

  useEffect(() => {
    let finalAnswersResult = {
      da: 0,
      mtd: 0
    }
    console.log(focusedButtons)
    for (const key in focusedButtons) {
      const value = focusedButtons[key]
      finalAnswersResult['da'] +=
        parseInt(findPointsToAnswer(answers, value).da) / 6
      finalAnswersResult['mtd'] +=
        parseInt(findPointsToAnswer(answers, value).mtd) / 6
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
            <div className='answer-grid-thisorthatpicture'>
              {answers.map((answer, index) => (
                <React.Fragment key={answer._id}>
                  <div
                    className={`answer-element thisorthat ${
                      focusedButtons.includes(answer._id) ? 'focused' : ''
                    }`}
                    onClick={() => toggleFocus(answer._id)}
                  >
                    <div className='ThisOrThatPictureImage'>
                      <ThisOrThatPictureImage photo={answer.photo} />
                    </div>
                    <p>{answer.text}</p>
                    <div className='hidden_points'>
                      <p>Points DA: {answer.points.da}</p>
                      <p>Points MTD: {answer.points.mtd}</p>
                    </div>
                  </div>
                  {index % 2 === 0 && index < answers.length - 1 && (
                    <div className='oder-text'>oder</div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </React.Fragment>
        ) : (
          <p>No questions found at question</p>
        )}
      </div>
    </div>
  )
}

export default ThisOrThatPicture
