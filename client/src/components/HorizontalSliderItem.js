import React, { useEffect, useState } from 'react'
import Draggable from 'react-draggable'
import useWindowDimensions from './useWindowSize'

const HorizontalSliderItem = ({ answer, defaultX = 0, defaultY = 0 }) => {
  const { height, width } = useWindowDimensions()
  const [widthSlider, setWidthSlider] = useState(0)
  const [widthAnswer, setWidthAnswer] = useState(0)
  const [controlledPosition, setControlledPosition] = useState({
    x: defaultX,
    y: defaultY
  })
  const nodeRef = React.useRef(null)

  const handleDrag = (e, data) => {
    setControlledPosition({ x: data.x, y: data.y })
  }

  useEffect(() => {
    const slider = document.querySelector('.vertical-slider-item-horizontal')
    const answer = document.querySelector('.vertical-slider-answers')
    if (slider && answer) {
      const sliderRect = slider.getBoundingClientRect()
      const answerRect = answer.getBoundingClientRect()
      setWidthSlider(sliderRect.width)
      setWidthAnswer(answerRect.width)
    }
  }, [width, height])

  return (
    <div>
      <div className='background-line-horizontal' />
      <Draggable
        nodeRef={nodeRef}
        position={controlledPosition}
        onDrag={handleDrag}
        axis='y'
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
