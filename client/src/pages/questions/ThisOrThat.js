import React, { useEffect, useState } from 'react'
import NavBar from '../../components/NavBar'
import FotBar from '../../components/FotBar'
import '../../style/questions/thisorthat.css'
import HeadingQuestion from '../../components/HeadingQuestion'
import { findPointsToAnswer } from '../../components/LoadQuestion'

const ThisOrThat = ({ question, setFinalAnswers }) => {
  const { heading, subheading, answers } = question

  const [selectedAnswers, setSelectedAnswers] = useState({})

  const handleAnswerClick = (id, answer) => {
    setSelectedAnswers(prevState => ({
      ...prevState,
      [id]: answer
    }))
  }

  useEffect(() => {
    let finalAnswersResult = {
      da: 0,
      mtd: 0
    }
    console.log(selectedAnswers)
    for (const key in selectedAnswers) {
      const value = selectedAnswers[key]
      let factor = value === 'ja' ? 1 : 0
      console.log(value === 'ja' ? 1 : 0)
      finalAnswersResult['da'] +=
        (parseInt(findPointsToAnswer(answers, key).da) / answers.length) *
        factor
      finalAnswersResult['mtd'] +=
        (parseInt(findPointsToAnswer(answers, key).mtd) / answers.length) *
        factor
    }
    setFinalAnswers(finalAnswersResult)
  }, [selectedAnswers])

  return (
    <div className='question-list'>
      <NavBar questionID={question._id} />
      <div className='main'>
        {question ? (
          <>
            <HeadingQuestion heading={heading} subheading={subheading} />

            <div className='answers-container3'>
              <div className='yesno'>
                <p> Ja | Nein</p>
              </div>
              {answers.map((answer, index) => (
                <div key={answer._id} className='answer-wrapper3'>
                  <p className='answer-text3'>{answer.text}</p>

                  <div className='buttons3'>
                    <div className='button-group'>
                      <button
                        className={`answer-button3 left ${
                          selectedAnswers[answer._id] === 'ja' ? 'selected' : ''
                        }`}
                        onClick={() => handleAnswerClick(answer._id, 'ja')}
                      ></button>
                      <div className='divider'></div>
                      <button
                        className={`answer-button3 right ${
                          selectedAnswers[answer._id] === 'nein'
                            ? 'selected'
                            : ''
                        }`}
                        onClick={() => handleAnswerClick(answer._id, 'nein')}
                      ></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <p>No questions found at question</p>
        )}
      </div>
    </div>
  )
}
export default ThisOrThat
