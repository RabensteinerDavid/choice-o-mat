import React from 'react'
import '../style/questions/questionHeading.css'

const HeadingQuestion = ({ heading, subheading }) => {

  return (
    <div className='heading-question'>
      <h1>{heading}</h1>
      <h2>{subheading}</h2>
    </div>
  )
}

export default HeadingQuestion
