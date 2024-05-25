import React from 'react'
import '../style/questions/questionHeading.css'

const HeadingQuestion = ({ heading, subheading }) => {
  return (
    <div className='heading-question'>
      <h1 className='question-header'>{heading}</h1>
      <p className='question-subheader'>{subheading}</p>
    </div>
  )
}

export default HeadingQuestion
