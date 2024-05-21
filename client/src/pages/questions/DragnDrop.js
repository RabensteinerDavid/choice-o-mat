import React, { useEffect } from 'react'
import Draggable from 'react-draggable'
import NavBar from '../../components/NavBar'
import FotBar from '../../components/FotBar'
import HeadingQuestion from '../../components/HeadingQuestion'
import '../../style/questions/dragndrop.css'
import DragnDropItem from '../../components/DragnDropItem'
import useWindowDimensions from '../../components/useWindowSize'
import dragndropBg from '../../images/dragndrop-bg.png'; 

const DragnDrop = ({ question, pageNumber, maxPage }) => {
  const { heading, subheading, answers } = question
  const { height, width, coordinates } = useWindowDimensions()

  const defaultCoordinates = {}

  answers.forEach((answer, index) => {
    defaultCoordinates[answer._id] = coordinates[index]
  })

  return (
    <div className='question-list'>
      <NavBar />
      <div className='main'>
        {question ? (
          <React.Fragment>
            <HeadingQuestion heading={heading} subheading={subheading} />

            <div className='middle-circle' style={{ backgroundImage: `url(${dragndropBg})` }}>
            </div>
              <div>
              {answers.map(answer => (
                <DragnDropItem
                  key={answer._id}
                  answer={answer}
                  defaultX={defaultCoordinates[answer._id].x}
                  defaultY={defaultCoordinates[answer._id].y}
                  targetXFrom={10}
                  targetXTo={100}
                  targetYFrom={10}
                  targetYTo={100}
                />
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

export default DragnDrop
