import React, { useEffect, useState } from 'react'
import { Link, useHistory, useNavigate, useParams } from 'react-router-dom'
import '../style/links.css'
import { getMaxPageValue } from './LoadQuestion'
import useWindowDimensions from './useWindowSize'

const Arrows = ({ prevQuestion, nextQuestion, saveAnswers }) => {
  const navigation = useNavigate()
  const [maxPageSide, setMaxPageSide] = useState(0)
  const { id: page_id } = useParams()

  useEffect(() => {
    const fetchMaxPageSide = async () => {
      const maxPageValue = await getMaxPageValue()
      setMaxPageSide(maxPageValue)
    }

    fetchMaxPageSide()
  }, [])

  const handleNavigation = questionId => {
    saveAnswers()
    setTimeout(() => {
      navigation(`/questions/${questionId}`)
    }, 0)
  }

  const isValidQuestionId = questionId => {
    return questionId > 0 && questionId < maxPageSide
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

      <div className='navigation-position'>
        <div className='navigatio-item visited'>1</div>
        {maxPageSide &&
          Array.from({ length: maxPageSide - 1 }).map((_, index) => (
            <React.Fragment key={index}>
              <div
                className={`navigatio-item-bridge${
                  index < page_id ? ' visited' : ''
                }`}
              ></div>

              <div
                className={`navigatio-item${index < page_id ? ' visited' : ''}`}
              >
                {index + 2}
              </div>
            </React.Fragment>
          ))}
      </div>
      {isValidQuestionId(nextQuestion) && (
        <span
          className='nav-link'
          onClick={() => handleNavigation(nextQuestion)}
        >
          {'>'}
        </span>
      )}
    </div>
  )
}

export default Arrows
