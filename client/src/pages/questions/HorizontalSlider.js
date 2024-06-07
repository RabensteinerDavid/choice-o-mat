import React, { useEffect, useState } from 'react'
import NavBar from '../../components/NavBar'
import FotBar from '../../components/FotBar'
import '../../style/questions/horizontalslider.css'
import HeadingQuestion from '../../components/HeadingQuestion'
import { findPointsToAnswer } from '../../components/LoadQuestion'

const HorizontalSlider = ({ question, setFinalAnswers }) => {
  const { heading, subheading, answers } = question

  const initialSliderValues = question.answers.reduce((acc, answer) => {
    acc[answer._id] = 50
    return acc
  }, {})

  const [sliderValues, setSliderValues] = useState(initialSliderValues)

  const handleSliderChange = (event, id) => {
    const newValues = { ...sliderValues }
    newValues[id] = parseInt(event.target.value)
    setSliderValues(newValues)

    const sliders = document.querySelectorAll('.slider')
    let index = 0
    for (const key in sliderValues) {
      const value = sliderValues[key]
      sliders[index].style.setProperty('--slider-width', `${value}%`)
      index++
    }
  }

  useEffect(() => {
    let finalAnswersResult = {
      da: 0,
      mtd: 0
    }
    for (const key in sliderValues) {
      const value = sliderValues[key]
      finalAnswersResult['da'] +=
        (parseInt(findPointsToAnswer(answers, key).da) * value * 0.01) /
        answers.length
      finalAnswersResult['mtd'] +=
        (parseInt(findPointsToAnswer(answers, key).mtd) * value * 0.01) /
        answers.length
    }
    setFinalAnswers(finalAnswersResult)
  }, [sliderValues])

  return (
    <div className='question-list'>
      <NavBar questionID={question._id} />
      <div className='main'>
        {question ? (
          <React.Fragment>
            <HeadingQuestion heading={heading} subheading={subheading} />
            <div className='horitontal-slider-wrapper'>
              {answers.map((answer, index) => (
                <div key={answer._id} className='horitontal-slider-item'>
                  <p className='horitontal-slider-answer'>{answer.text}</p>
                  <div className='horitontal-slider-value'>
                    <input
                      type='range'
                      min='0'
                      max='100'
                      value={sliderValues[index]}
                      onChange={e => handleSliderChange(e, answer._id)}
                      className='slider'
                    />
                    <div className='horitontal-slider-value-textwrapper'>
                      <p className='horitontal-slider-value-text'>nicht gut</p>

                      <p className='horitontal-slider-value-text'>sehr gut</p>
                    </div>
                  </div>
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

export default HorizontalSlider
//<p className= 'horitontal-slider-value-text'>{sliderValues[index]}%</p>
