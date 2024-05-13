import React from 'react'
import { Link } from 'react-router-dom'
import '../style/links.css'
import { getMaxPageValue } from './LoadQuestion'

const Arrows = ({ prevQuestion, nextQuestion }) => (
  <React.Fragment>
    <div className='bottom-header'>
      {isValidQuestionId(prevQuestion) && (
        <Link to={`/questions/${prevQuestion}`} className='nav-link'>
          {'<'}
        </Link>
      )}
      {isValidQuestionId(nextQuestion) && (
        <Link to={`/questions/${nextQuestion}`} className='nav-link'>
          {'>'}
        </Link>
      )}
    </div>
  </React.Fragment>
)

const isValidQuestionId = async questionId => {
  const maxPageValue = await getMaxPageValue()
  return questionId > 0 && questionId < maxPageValue
}

export default Arrows
