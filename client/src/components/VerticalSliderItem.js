import React, { useEffect, useState } from 'react'
import Draggable from 'react-draggable'
import useWindowDimensions from './useWindowSize'

const VerticalSliderItem = ({ answer, defaultX = 0, defaultY = 0 }) => {
  const { height, width } = useWindowDimensions()
  const [heightSlider, setHeightSlider] = useState(0)
  const [heightAnswer, setHeightAnswer] = useState(0)
  const [controlledPosition, setControlledPosition] = useState({
    x: defaultX,
    y: defaultY
  })
  const nodeRef = React.useRef(null)

  const handleDrag = (e, data) => {
    setControlledPosition({ x: 0, y: data.y })
  }

  useEffect(() => {
    const slider = document.querySelector('.vertical-slider-item')
    const answer = document.querySelector('.vertical-slider-answers')
    if (slider && answer) {
      const sliderRect = slider.getBoundingClientRect()
      const answerRect = answer.getBoundingClientRect()
      setHeightSlider(sliderRect.height)
      setHeightAnswer(answerRect.height)
    }
  }, [width, height])

  return (
    <div>
      <div className='background-line' />
      <Draggable
        nodeRef={nodeRef}
        position={controlledPosition}
        onDrag={handleDrag}
        axis='y'
        bounds={{
          top: -heightSlider / 2 + heightAnswer / 2,
          left: 0,
          right: 0,
          bottom: heightSlider / 2 - heightAnswer / 2
        }}
      >
        <div ref={nodeRef} className='vertical-slider-answers' id={answer._id}>
          <p className='text-container'>{answer.text}</p>
        </div>
      </Draggable>
    </div>
  )
}

export default VerticalSliderItem
