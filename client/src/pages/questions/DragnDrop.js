import React from 'react'
import Draggable from 'react-draggable'
import NavBar from '../../components/NavBar'
import FotBar from '../../components/FotBar'
import HeadingQuestion from '../../components/HeadingQuestion'
import '../../style/questions/dragndrop.css'
import DragnDropItem from '../../components/DragnDropItem'
import useWindowDimensions from '../../components/useWindowSize'

const DragnDrop = ({ question, pageNumber, maxPage }) => {
  const { heading, subheading, answers } = question
  const { height, width } = useWindowDimensions()

  const defaultCoordinates = {}
  const coordinates = [
    { x: width / 4, y: 0 },
    { x: width / 4.5, y: 50 },
    { x: width / 5.5, y: 100 },
    { x: width / 4, y: 150 },
    { x: (2 * width) / 4, y: -120 },
    { x: (2 * width) / 3.5, y: -70 },
    { x: (2 * width) / 3, y: -20 },
    { x: (2 * width) / 4, y: 30 }
  ]

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
            <div>
              width: {width} ~ height: {height}
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
