import React, { useEffect, useState } from 'react'
import Draggable from 'react-draggable'
import NavBar from '../../components/NavBar'
import FotBar from '../../components/FotBar'
import HeadingQuestion from '../../components/HeadingQuestion'
import '../../style/questions/dragndrop.css'
import DragnDropItem from '../../components/DragnDropItem'
import useWindowDimensions from '../../components/useWindowSize'
import dragndropBg from '../../images/dragndrop-bg.png'

const DragnDrop = ({ question, pageNumber, maxPage }) => {
  const { heading, subheading, answers } = question
  const { height, width } = useWindowDimensions()
  const [defaultTargetAnswer, setDefaultTargetAnswer] = useState({})
  const [finalAnswers, setFinalAnswers] = useState([])
  const freeAnswersCount = finalAnswers.length

  useEffect(() => {
    const items = document.querySelectorAll('.inner-circle .item')
    const newCoordinates = {}

    items.forEach((item, index) => {
      const rect = item.getBoundingClientRect()
      newCoordinates[index] = rect
    })

    console.log(finalAnswers)

    setDefaultTargetAnswer(newCoordinates)
  }, [width, height, finalAnswers])

  function addAnswer (answer) {
    setFinalAnswers([...finalAnswers, answer])
  }

  const removeAnswer = id => {
    const newAnswers = finalAnswers.filter(finalAnswer => finalAnswer !== id)
    setFinalAnswers(newAnswers)
  }

  return (
    <div className='question-list'>
      <NavBar />
      <div className='main'>
        {question ? (
          <React.Fragment>
            <HeadingQuestion heading={heading} subheading={subheading} />
            <div className='middle-circle'>
              <div className='inner-circle'>
                <div className='inner-circle-row'>
                  <div className='item'>Drop here </div>
                  <div className='item'>Drop here </div>
                  <div className='item'>Drop here </div>
                  <div className='item'>Drop here </div>
                </div>
              </div>
            </div>
            <div className='answer-wrapper'>
              {answers.map(answer => (
                <DragnDropItem
                  key={answer._id}
                  answer={answer}
                  targetPosition={defaultTargetAnswer}
                  addAnswer={addAnswer}
                  removeAnswer={removeAnswer}
                  freeAnswers={freeAnswersCount}
                />
              ))}
            </div>
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
