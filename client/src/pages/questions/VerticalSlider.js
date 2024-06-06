import React, { useEffect, useState, useRef } from 'react'
import NavBar from '../../components/NavBar'
import FotBar from '../../components/FotBar'
import '../../style/questions/verticalslider.css'
import HeadingQuestion from '../../components/HeadingQuestion'
import VerticalSliderItem from '../../components/VerticalSliderItem'
import HorizontalSliderItem from '../../components/HorizontalSliderItem'
import useWindowDimensions from '../../components/useWindowSize'
import { findPointsToAnswer } from '../../components/LoadQuestion'

const VerticalSlider = ({ question, pageNumber, maxPage, setFinalAnswers }) => {
  const { heading, subheading, answers } = question
  const { height, width } = useWindowDimensions()
  const [horizontal, setHorizontal] = useState(true)
  const [finalAnswers, setFinalAnswersResult] = useState({})

  useEffect(() => {
    if (width < height) {
      setHorizontal(false)
    } else {
      setHorizontal(true)
    }
  }, [width, height])

  function addAnswer (id, answer) {
    setFinalAnswersResult(prev => ({
      ...prev,
      [id]: answer
    }))
  }

  useEffect(() => {
    let finalAnswersResult = {
      da: 0,
      mtd: 0
    }

    for (const key in finalAnswers) {
      finalAnswersResult['da'] +=
        (parseInt(finalAnswers[key]) *0.01 *
          parseInt(findPointsToAnswer(answers, key).da)) /
        answers.length
      finalAnswersResult['mtd'] +=
        (parseInt(finalAnswers[key]) *0.01*
          parseInt(findPointsToAnswer(answers, key).mtd)) /
        answers.length
    }
    setFinalAnswers(finalAnswersResult)
  }, [finalAnswers])

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
    </div>
  )
}

export default VerticalSlider
