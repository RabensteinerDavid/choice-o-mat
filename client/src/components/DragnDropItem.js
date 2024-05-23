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
  freeAnswersCount
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

      const answerRect = {
        left: answerCoordinates.left + data.x,
        right: answerCoordinates.left + data.x + answerCoordinates.width,
        top: answerCoordinates.top + data.y,
        bottom: answerCoordinates.top + data.y + answerCoordinates.height
      }

      const targetRect = {
        left: rect.left,
        right: rect.left + rect.width,
        top: rect.top,
        bottom: rect.top + rect.height
      }

      if (
        answerRect.left < targetRect.right &&
        answerRect.right > targetRect.left &&
        answerRect.top < targetRect.bottom &&
        answerRect.bottom > targetRect.top
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
    const freeTargetIndex = freeAnswersCount
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
