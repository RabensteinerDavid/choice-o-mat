import React, { useEffect, useState } from 'react'
import NavBar from '../../components/NavBar'
import FotBar from '../../components/FotBar'
import HeadingQuestion from '../../components/HeadingQuestion'
import '../../style/questions/dragndrop.css'
import DragnDropItem from '../../components/DragnDropItem'
import useWindowDimensions from '../../components/useWindowSize'
import { saveAnswersLocalStorage } from '../../components/LoadQuestion'

const DragnDrop = ({ question, pageNumber, maxPage }) => {
  const { heading, subheading, answers } = question
  const [finalAnswers, setFinalAnswers] = useState({})
  const { width } = useWindowDimensions()

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

  const saveAnswers = () => {
    console.log(finalAnswers)
    saveAnswersLocalStorage(question._id, JSON.stringify(finalAnswers))
  }

  return (
    <div className='question-list'>
      <NavBar />
      <div className='main dragndrop'>
        {question ? (
          <React.Fragment>
            <HeadingQuestion heading={heading} subheading={subheading} />
            {width > 1405 ? (
              <div className='answer-wrapper-main'>
                <div className='answer-wrapper-main-top' >
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
      <FotBar
        prevQuestion={pageNumber === 1 ? 1 : pageNumber - 1}
        nextQuestion={pageNumber === maxPage ? maxPage : pageNumber + 1}
        saveAnswers={saveAnswers}
      />
    </div>
  )
}

export default DragnDrop
