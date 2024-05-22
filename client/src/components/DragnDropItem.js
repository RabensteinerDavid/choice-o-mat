import React, { useEffect, useState } from 'react'
import Draggable from 'react-draggable'
import useWindowDimensions from './useWindowSize'

const DragnDropItem = ({
  answer,
  defaultX = 0,
  defaultY = 0,
  targetPosition,
  addAnswer,
  removeAnswer,
  freeAnswers
}) => {
  const { height, width, coordinates } = useWindowDimensions()
  const [answerCoordinates, setAnswerCoodinates] = useState({})
  const [controlledPosition, setControlledPosition] = useState({
    x: defaultX,
    y: defaultY
  })

  let withinTarget = false

  const adjustPosition = (dx, dy) => {
    setControlledPosition(prevPosition => ({
      x: prevPosition.x + dx,
      y: prevPosition.y + dy
    }))
  }

  useEffect(() => {
    const item = document.getElementById(`${answer._id}`)
    const rect = item.getBoundingClientRect()
    setAnswerCoodinates(rect)
  }, [width, height])

  const handleStop = (e, data) => {
    for (const key in targetPosition) {
      const rect = targetPosition[key]

      if (
        answerCoordinates.left + data.x >= rect.left &&
        answerCoordinates.left + data.x <= rect.left + rect.width &&
        answerCoordinates.top + data.y >= rect.top &&
        answerCoordinates.top + data.y <= rect.top + rect.height
      ) {
        addAnswer(answer._id)
        setControlledPosition({
          x: rect.left - answerCoordinates.left + defaultX,
          y: rect.top - answerCoordinates.top + defaultY
        })
        withinTarget = true
        break
      }
    }

    if (!withinTarget) {
      withinTarget = false
      removeAnswer(answer._id)
      setControlledPosition({ x: defaultX, y: defaultY })
    }
  }

  const handleDoubleClick = () => {
    const freeTargetIndex = freeAnswers
    const target = targetPosition[freeTargetIndex]
    if (target) {
      setControlledPosition({
        x: target.left - answerCoordinates.left,
        y: target.top - answerCoordinates.top
      })
    }
  }

  //todo: remove answer from target after draganddrop
  const handleClick = () => {
    console.log('here')
    if (withinTarget) {
      setControlledPosition({
        x: defaultX,
        y: defaultY
      })
      removeAnswer(answer._id)
    }
  }

  const handleDrag = (e, ui) => {
    adjustPosition(ui.deltaX, ui.deltaY)
  }

  return (
    <div>
      <Draggable
        position={controlledPosition}
        onStop={handleStop}
        onDrag={handleDrag}
      >
        <div
          className='dragndrop-answers'
          // onDoubleClick={handleDoubleClick}
          id={answer._id}
        >
          {answer.text}
        </div>
      </Draggable>
    </div>
  )
}

export default DragnDropItem
