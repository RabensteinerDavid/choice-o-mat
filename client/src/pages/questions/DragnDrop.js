import React, { useEffect, useState } from 'react'
import NavBar from '../../components/NavBar'
import FotBar from '../../components/FotBar'
import HeadingQuestion from '../../components/HeadingQuestion'
import '../../style/questions/dragndrop.css'
import DragnDropItem from '../../components/DragnDropItem'
import useWindowDimensions from '../../components/useWindowSize'
import { findPointsToAnswer } from '../../components/LoadQuestion'

const DragnDrop = ({ question, setFinalAnswers }) => {
  const { heading, subheading, answers } = question
  const [finalAnswers, setFinalAnswersResult] = useState({})
  const { height, width } = useWindowDimensions()

  function addAnswer (targetIndex, answer) {
    setFinalAnswersResult(prev => ({
      ...prev,
      [targetIndex]: answer
    }))
  }

  const removeAnswer = answerId => {
    setFinalAnswersResult(prev => {
      const newAnswers = { ...prev }
      for (const key in newAnswers) {
        if (newAnswers[key] === answerId) {
          delete newAnswers[key]
        }
      }
      return newAnswers
    })
  }

  useEffect(() => {
    let finalAnswersResult = {
      da: 0,
      mtd: 0
    }
    for (const key in finalAnswers) {
      const value = finalAnswers[key]
      finalAnswersResult['da'] += parseInt(
        findPointsToAnswer(answers, value).da
      ) / 4
      finalAnswersResult['mtd'] += parseInt(
        findPointsToAnswer(answers, value).mtd
      )/ 4
    }
    setFinalAnswers(finalAnswersResult)
  }, [finalAnswers])

  return (
    <div className='question-list'>
      <NavBar questionID={question._id}/>
      <div className='main dragndrop'>
        {question ? (
          <React.Fragment>
            <HeadingQuestion heading={heading} subheading={subheading} />
            {width > height ? (
              <div className='answer-wrapper-main'>
                <div className='answer-wrapper-main-top'>
                  {answers
                    .slice(0, Math.ceil(answers.length / 2))
                    .map(answer => (
                      <DragnDropItem
                        key={answer._id}
                        answer={answer}
                        addAnswer={addAnswer}
                        removeAnswer={removeAnswer}
                        finalAnswers={finalAnswers}
                      />
                    ))}
                </div>

                <div className='middle-circle-wrapper'>
                  <div className='middle-circle'>
                    <div className='inner-circle'>
                      <div className='inner-circle-row'>
                        {[0, 1, 2, 3].map(index => (
                          <div className='item' key={index}>
                            Drop here
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className='answer-wrapper-main-bottom'>
                  {answers.slice(Math.ceil(answers.length / 2)).map(answer => (
                    <DragnDropItem
                      key={answer._id}
                      answer={answer}
                      addAnswer={addAnswer}
                      removeAnswer={removeAnswer}
                      finalAnswers={finalAnswers}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <>
                <div className='middle-circle-wrapper'>
                  <div className='middle-circle'>
                    <div className='inner-circle'>
                      <div className='inner-circle-row'>
                        {[0, 1, 2, 3].map(index => (
                          <div className='item' key={index}>
                            Drop here
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className='answer-wrapper-bottom'>
                  {answers.map(answer => (
                    <DragnDropItem
                      key={answer._id}
                      answer={answer}
                      addAnswer={addAnswer}
                      removeAnswer={removeAnswer}
                      finalAnswers={finalAnswers}
                    />
                  ))}
                </div>
              </>
            )}
          </React.Fragment>
        ) : (
          <p>No questions found at question</p>
        )}
      </div>
    </div>
  )
}

export default DragnDrop
