import React from 'react'
import '../style/questions/questionHeading.css'

const HeadingQuestion = ({ heading, subheading }) => {

  return (
    <div className='heading-question'>
      <h1 className="question-header">{heading}</h1>
      <h2 className="question-subheader">{subheading}</h2>
    </div>
  )
}

export default HeadingQuestion
