import React from 'react'
import { Link, useHistory, useNavigate } from 'react-router-dom'
import '../style/links.css'
import { getMaxPageValue } from './LoadQuestion'

const Arrows = ({ prevQuestion, nextQuestion, saveAnswers }) => {
  const navigation = useNavigate()

  const handleNavigation = questionId => {
    saveAnswers()
    setTimeout(() => {
      navigation(`/questions/${questionId}`)
    }, 0)
  }

  const isValidQuestionId = async questionId => {
    const maxPageValue = await getMaxPageValue()
    return questionId > 0 && questionId < maxPageValue
  }

  return (
    <React.Fragment>
      <div className='bottom-header'>
        {isValidQuestionId(prevQuestion) && (
          <span
            className='nav-link'
            onClick={() => handleNavigation(prevQuestion)}
          >
            {'<'}
          </span>
        )}
        {isValidQuestionId(nextQuestion) && (
          <span
            className='nav-link'
            onClick={() => handleNavigation(nextQuestion)}
          >
            {'>'}
          </span>
        )}
      </div>
    </React.Fragment>
  )
}

export default Arrows
