import React, { useEffect, useState } from 'react'
import NavBar from '../../components/NavBar'
import FotBar from '../../components/FotBar'
import HeadingQuestion from '../../components/HeadingQuestion'
import '../../style/questions/dragndrop.css'
import DragnDropItem from '../../components/DragnDropItem'
import useWindowDimensions from '../../components/useWindowSize'

const DragnDrop = ({ question, pageNumber, maxPage }) => {
  const { heading, subheading, answers } = question
  const { height, width } = useWindowDimensions()
  const [defaultTargetAnswer, setDefaultTargetAnswer] = useState({})
  const [finalAnswers, setFinalAnswers] = useState({})

  useEffect(() => {
    const items = document.querySelectorAll('.inner-circle .item')
    const newCoordinates = {}

    items.forEach((item, index) => {
      const rect = item.getBoundingClientRect()
      newCoordinates[index] = rect
    })

    setDefaultTargetAnswer(newCoordinates)
  }, [width, height, finalAnswers])

  function addAnswer (targetIndex, answer) {
    setFinalAnswers(prev => ({
      ...prev,
      [targetIndex]: answer
    }))
  }

  const removeAnswer = answerId => {
    setFinalAnswers(prev => {
      const newAnswers = { ...prev }
      for (const key in newAnswers) {
        if (newAnswers[key] === answerId) {
          delete newAnswers[key]
        }
      }
      return newAnswers
    })
  }

  return (
    <div className='question-list'>
      {console.log(finalAnswers)}
      <NavBar />
      <div className='main dragndrop'>
        {question ? (
          <React.Fragment>
            <HeadingQuestion heading={heading} subheading={subheading} />
            <div className='middle-circle'>
              <div className='inner-circle'>
                <div className='answer-wrapper'>
                  {width > 1405 &&
                    answers.map(answer => (
                      <DragnDropItem
                        key={answer._id}
                        answer={answer}
                        targetPosition={defaultTargetAnswer}
                        addAnswer={addAnswer}
                        removeAnswer={removeAnswer}
                        finalAnswers={finalAnswers}
                      />
                    ))}
                </div>
                <div className='inner-circle-row'>
                  {[0, 1, 2, 3].map(index => (
                    <div className='item' key={index}>
                      Drop here{' '}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {width < 1405 && (
              <div className='answer-wrapper-bottom'>
                {answers.map(answer => (
                  <DragnDropItem
                    key={answer._id}
                    answer={answer}
                    targetPosition={defaultTargetAnswer}
                    addAnswer={addAnswer}
                    removeAnswer={removeAnswer}
                    finalAnswers={finalAnswers}
                  />
                ))}
              </div>
            )}
          </React.Fragment>
        ) : (
          <p>No questions found at question</p>
        )}
      </div>
      <FotBar
        prevQuestion={pageNumber === 1 ? 1 : pageNumber - 1}
        nextQuestion={pageNumber === maxPage ? maxPage : pageNumber + 1}
      />
    </div>
  )
}

export default DragnDrop
