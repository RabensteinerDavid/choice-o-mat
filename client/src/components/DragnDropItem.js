import React, { useEffect, useState } from 'react'
import Draggable from 'react-draggable'
import useWindowDimensions from './useWindowSize'

const DragnDropItem = ({
  answer,
  defaultX = 0,
  defaultY = 0,
  addAnswer,
  removeAnswer,
  finalAnswers
}) => {
  const { height, width } = useWindowDimensions()
  const [answerCoordinates, setAnswerCoordinates] = useState({})
  const [isUsed, setIsUsed] = useState(false)
  const [targetKey, setTargetKey] = useState(null)
  const [targetPosition, setTargetPosition] = useState({})
  const [controlledPosition, setControlledPosition] = useState({
    x: defaultX,
    y: defaultY
  })
  const nodeRef = React.useRef(null)

  useEffect(() => {
    const items = document.querySelectorAll('.inner-circle-row .item')
    const newCoordinates = {}

    items.forEach((item, index) => {
      const rect = item.getBoundingClientRect()
      newCoordinates[index] = rect
    })

    setTargetPosition(newCoordinates)
  }, [width, height])

  useEffect(() => {
    const item = document.getElementById(`${answer._id}`)
    if (item) {
      const rect = item.getBoundingClientRect()
      setAnswerCoordinates(rect)
    }
  }, [width, height, answer._id])

  useEffect(() => {
    if (isUsed && targetKey !== null) {
      const rect = targetPosition[targetKey]
      if (rect) {
        const newX = rect.left - answerCoordinates.left + controlledPosition.x
        const newY = rect.top - answerCoordinates.top + controlledPosition.y
        setControlledPosition({ x: newX, y: newY })
      }
    }
  }, [targetPosition, answerCoordinates])

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
        if (isUsed) {
          removeAnswer(answer._id)
          setIsUsed(false)
        }
        setIsUsed(true)
        setTargetKey(key)
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
      setIsUsed(false)
      setTargetKey(null)
      setControlledPosition({ x: defaultX, y: defaultY })
    }
  }

  return (
    <div>
      <Draggable
        nodeRef={nodeRef}
        position={controlledPosition}
        onStop={handleStop}
      >
        <div ref={nodeRef} className='dragndrop-answers' id={answer._id}>
          {answer.text}
        </div>
      </Draggable>
    </div>
  )
}

export default DragnDropItem
