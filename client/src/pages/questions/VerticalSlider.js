import React, { useEffect, useState, useRef } from 'react'
import NavBar from '../../components/NavBar'
import FotBar from '../../components/FotBar'
import '../../style/questions/verticalslider.css'
import HeadingQuestion from '../../components/HeadingQuestion'
import VerticalSliderItem from '../../components/VerticalSliderItem'
import HorizontalSliderItem from '../../components/HorizontalSliderItem'
import useWindowDimensions from '../../components/useWindowSize'
import {
  loadAnswersFromLocalStorage,
  saveAnswersLocalStorage
} from '../../components/LoadQuestion'

const VerticalSlider = ({ question, pageNumber, maxPage }) => {
  const { heading, subheading, answers } = question
  const { height, width } = useWindowDimensions()
  const [horizontal, setHorizontal] = useState(true)
  const [finalAnswers, setFinalAnswers] = useState({})

  useEffect(() => {
    if (width < height) {
      setHorizontal(false)
    } else {
      setHorizontal(true)
    }
  }, [width, height])

  function addAnswer (targetIndex, answer) {
    setFinalAnswers(prev => ({
      ...prev,
      [targetIndex]: answer
    }))
  }

  const saveAnswers = () => {
    saveAnswersLocalStorage(question._id, JSON.stringify(finalAnswers))
  }

  return (
    <div className='question-list'>
      <NavBar />
      <div className='main verticalslider'>
        {question ? (
          <>
            <HeadingQuestion heading={heading} subheading={subheading} />
            {horizontal ? (
              <div className='vertical-slider-wrapper'>
                <div className='vertical-slider-agenda'>
                  <div className='vertical-slider-agenda-item'>
                    <h2 className='arrow-container'>Sehr gut</h2>
                    <span className='up-arrow'></span>
                  </div>
                  <div className='vertical-slider-agenda-item'>
                    <span className='down-arrow'></span>
                    <h2 className='arrow-container'>Schlecht</h2>
                  </div>
                </div>
                <div className='vertical-slider-item-wrapper'>
                  {answers.map((answer, index) => (
                    <div key={answer._id} className='vertical-slider-item'>
                      <VerticalSliderItem
                        key={answer._id}
                        answer={answer}
                        addAnswer={addAnswer}
                        index={index}
                        defaultY={loadAnswersFromLocalStorage(
                          question._id,
                          index
                        )}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className='vertical-slider-wrapper-horizontal'>
                <div className='vertical-slider-agenda-horizontal'>
                  <div className='vertical-slider-agenda-item-horizontal'>
                    <h2 className='arrow-container-horizontal'>
                      Sehr gut <span className='left-arrow'></span>
                    </h2>
                  </div>
                  <div className='vertical-slider-agenda-item-horizontal right'>
                    <h2 className='arrow-container-horizontal'>
                      <span className='right-arrow'></span> Schlecht
                    </h2>
                  </div>
                </div>
                {answers.map((answer, index) => (
                  <div
                    key={answer._id}
                    className='vertical-slider-item-horizontal'
                  >
                    <HorizontalSliderItem
                      key={answer._id}
                      answer={answer}
                      addAnswer={addAnswer}
                      index={index}
                      defaultX={loadAnswersFromLocalStorage(
                        question._id,
                        index
                      )}
                    />
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          <p>No questions found</p>
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

export default VerticalSlider
