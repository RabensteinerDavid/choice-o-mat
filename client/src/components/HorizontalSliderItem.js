import React, { useEffect, useState } from 'react'
import Draggable from 'react-draggable'
import useWindowDimensions from './useWindowSize'

const HorizontalSliderItem = ({ answer, defaultX, addAnswer, index }) => {
  const { height, width } = useWindowDimensions()
  const [widthSlider, setWidthSlider] = useState(0)
  const [widthAnswer, setWidthAnswer] = useState(0)
  const [controlledPosition, setControlledPosition] = useState({
    x: 0,
    y: 0
  })
  const nodeRef = React.useRef(null)

  const handleDrag = (e, data) => {
    const newX = data.x
    const sliderWidth = widthSlider - widthAnswer
    const middleX = sliderWidth / 2
    const newPercentage = ((newX + middleX) / sliderWidth) * 100
    setControlledPosition({ x: newX, y: 0 })
    addAnswer(answer._id, Math.max(0, Math.min(100, newPercentage)))
  }

  useEffect(() => {
    const slider = document.querySelector('.vertical-slider-item-horizontal')
    const answerItem = document.querySelector('.vertical-slider-answers')
    if (slider && answer) {
      const sliderRect = slider.getBoundingClientRect()
      const answerRect = answerItem.getBoundingClientRect()
      setWidthSlider(sliderRect.width)
      setWidthAnswer(answerRect.width)
      addAnswer(answer._id, 50)
    }
  }, [width, height])

  return (
    <div>
      <div className='background-line-horizontal' />
      <Draggable
        nodeRef={nodeRef}
        position={controlledPosition}
        onDrag={handleDrag}
        bounds={{
          top: 0,
          left: -widthSlider / 2 + widthAnswer / 2,
          right: widthSlider / 2 - widthAnswer / 2,
          bottom: 0
        }}
      >
        <div
          ref={nodeRef}
          className='vertical-slider-answers horizontal'
          id={answer._id}
        >
          <p className='text-container-horizontal'>{answer.text}</p>
        </div>
      </Draggable>
    </div>
  )
}

export default HorizontalSliderItem
