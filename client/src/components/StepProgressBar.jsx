import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import '../style/stepprogressbar.css'
import { getMaxPageValue } from './LoadQuestion'
import { Player } from '@lottiefiles/react-lottie-player'
import Eyes from './Eyes'
import useWindowDimensions from './useWindowSize'

const StepProgressBar = ({ prevQuestion, nextQuestion, saveAnswers }) => {
  const navigate = useNavigate()
  const [maxPageSide, setMaxPageSide] = useState(0)
  const { id: page_id } = useParams()
  const maxPageSideRef = useRef(0)
  const { height, width } = useWindowDimensions()

  useEffect(() => {
    const fetchMaxPageSide = async () => {
      const maxPageValue = await getMaxPageValue()
      setMaxPageSide(maxPageValue)
      maxPageSideRef.current = maxPageValue
    }

    fetchMaxPageSide()
  }, [])

  const handleNavigation = questionId => {
    saveAnswers()
    navigate(`/questions/${questionId}`)
  }

  const handleNavigationButton = questionId => {
    saveAnswers()
    navigate(`/questions/${questionId}`)
  }

  const isValidQuestionId = questionId => {
    return questionId > 0 && questionId <= maxPageSideRef.current + 1
  }

  return (
    <div className='bottom-header'>
      {isValidQuestionId(prevQuestion) && (
        <span
          className='nav-link'
          onClick={() => handleNavigation(prevQuestion)}
        >
          {'<'}
        </span>
      )}
      <div className='anim-border'></div>

      {width > 1005 ? (
        <div className='navigation-position'>
          {page_id == 1 && (
            <div>
              <Eyes />
              <Player
                src='/lottie/navbar-fox.json'
                className='fox-nav'
                loop
                autoplay
                style={{
                  height: '100px',
                  width: '100px',
                  marginTop: '-100px',
                  marginLeft: '-30px'
                }}
              />
            </div>
          )}
          <div
            className={`navigatio-item ${
              page_id == 1 ? 'current' : ''
            } visited`}
            onClick={() => handleNavigationButton(1)}
          >
            1
          </div>
          {maxPageSide > 1 &&
            Array.from({ length: maxPageSide - 1 }).map((_, index) => (
              <React.Fragment key={index + 1}>
                <div
                  className={`navigatio-item-bridge${
                    index + 1 < page_id ? ' visited' : ''
                  }`}
                ></div>
                {page_id == index + 2 && (
                  <div>
                    <Eyes />
                    <Player
                      src='/lottie/navbar-fox.json'
                      className='fox-nav'
                      loop
                      autoplay
                      style={{
                        height: '100px',
                        width: '100px',
                        marginTop: '-100px',
                        marginLeft: '-30px'
                      }}
                    />
                  </div>
                )}
                <div
                  className={`navigatio-item ${
                    page_id == index + 2 ? 'current' : ''
                  } ${index + 1 < page_id ? 'visited' : ''}`}
                  onClick={() => handleNavigationButton(index + 2)}
                >
                  {index + 2}
                </div>
              </React.Fragment>
            ))}
        </div>
      ) : (
        <div className='navigation-position'>
          <p className='nav-link bottom'>
            {page_id} / {maxPageSide}
          </p>
        </div>
      )}
      {isValidQuestionId(nextQuestion) && page_id != maxPageSide && (
        <span
          className='nav-link'
          onClick={() => handleNavigation(nextQuestion)}
        >
          {'>'}
        </span>
      )}
      {page_id == maxPageSide && (
        <div className='cross-wrapper'>
          <div className='circle-progress-bar'>
            <div className='checkMark-progress-bar'></div>
          </div>
        </div>
      )}
    </div>
  )
}

export default StepProgressBar
