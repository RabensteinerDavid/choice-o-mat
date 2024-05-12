import React, { useEffect, useState } from 'react'
import NavBar from '../../components/NavBar'
import FotBar from '../../components/FotBar'
import '../../style/questions/ThisOrThat.css'
import HeadingQuestion from '../../components/HeadingQuestion'
import { loadQuestionType } from '../../components/LoadQuestion'

const Selection = ({ questions, version, pageNumber }) => {

  const question = loadQuestionType(questions,version)

  console.log(loadQuestionType)
  return (
    <div className='question-list'>
      <NavBar />
      <div className='main'>
        {question ? (
          <React.Fragment>
            <HeadingQuestion
              heading={question.heading}
              subheading={question.subheading}
            />
            <p>{question.type}</p>
            <div>
              {question.answers.map(answer => (
                <p key={answer._id}>{answer.text} </p>
              ))}
            </div>
          </React.Fragment>
        ) : (
          <p>No questions found at question </p>
        )}
      </div>
      <FotBar
        prevQuestion={pageNumber == 1 ? 1 : pageNumber - 1}
        nextQuestion={pageNumber == 10 ? 10 : pageNumber + 1}
      />
    </div>
  )
}

export default Selection
