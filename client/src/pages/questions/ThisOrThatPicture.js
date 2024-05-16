import React from 'react'
import NavBar from '../../components/NavBar'
import FotBar from '../../components/FotBar'
import '../../style/questions/thisorthatpicture.css'
import HeadingQuestion from '../../components/HeadingQuestion'
import ThisOrThatPictureImage from '../../components/questions_images/ThisOrThatPictureImage'

const ThisOrThatPicture = ({ question, pageNumber, maxPage }) => {
  
  const { heading, subheading, answers } = question

  return (
    <div className='question-list'>
      <NavBar />
      <div className='main'>
        {question ? (
          <React.Fragment>
            <HeadingQuestion heading={heading} subheading={subheading} />
            <div>
              {answers.map(answer => (
                <div key={answer._id}>
                  <p>{answer.text}</p>
                  <p>Points DA: {answer.points.da}</p>
                  <p>Points MTD: {answer.points.mtd}</p>
                  <ThisOrThatPictureImage photo={answer.photo} />
                </div>
              ))}
            </div>
          </React.Fragment>
        ) : (
          <p>No questions found at question </p>
        )}
      </div>
      <FotBar
        prevQuestion={pageNumber === 1 ? 1 : pageNumber - 1}
        nextQuestion={pageNumber === maxPage ? maxPage : pageNumber + 1}
      />
    </div>
  )
}

export default ThisOrThatPicture
