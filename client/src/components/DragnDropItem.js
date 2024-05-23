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
  finalAnswers
}) => {
  const { height, width } = useWindowDimensions()
  const [answerCoordinates, setAnswerCoodinates] = useState({})
  const [controlledPosition, setControlledPosition] = useState({
    x: defaultX,
    y: defaultY
  })

  useEffect(() => {
    const item = document.getElementById(`${answer._id}`)
    const rect = item.getBoundingClientRect()
    setAnswerCoodinates(rect)
  }, [width, height])

  const handleStop = (e, data) => {
    let withinTarget = false
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
        answerRect.bottom > targetRect.top &&
        !finalAnswers[key]
      ) {
        addAnswer(key, answer._id)
        setControlledPosition({
          x: rect.left - answerCoordinates.left + defaultX,
          y: rect.top - answerCoordinates.top + defaultY
        })
        withinTarget = true
        break
      }
    }

    if (!withinTarget) {
      removeAnswer(answer._id)
      setControlledPosition({ x: defaultX, y: defaultY })
    }
  }

  return (
    <div>
      <Draggable position={controlledPosition} onStop={handleStop}>
        <div className='dragndrop-answers' id={answer._id}>
          {answer.text}
        </div>
      </Draggable>
    </div>
  )
}

export default DragnDropItem
