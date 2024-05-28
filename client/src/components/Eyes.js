import React, { useEffect, useRef } from 'react'
import '../style/links.css'
const Eyes = () => {
  const eyeContainerRef = useRef(null)
  const leftPupilRef = useRef(null)
  const rightPupilRef = useRef(null)

  useEffect(() => {
    const eyeContainer = eyeContainerRef.current
    const leftPupil = leftPupilRef.current
    const rightPupil = rightPupilRef.current

    const handleMouseMove = e => {
      const { clientX: mouseX, clientY: mouseY } = e
      const { left, top, width, height } = eyeContainer.getBoundingClientRect()

      const eyeX = left + width / 2
      const eyeY = top + height / 2

      const deltaX = mouseX - eyeX
      const deltaY = mouseY - eyeY
      const angle = Math.atan2(deltaY, deltaX)
      const radius = Math.min(width, height) * 0.14

      const pupilPositionX = Math.cos(angle) * radius
      const pupilPositionY = Math.sin(angle) * radius

      leftPupil.style.transform = `translate(${pupilPositionX}px, ${pupilPositionY}px)`
      rightPupil.style.transform = `translate(${pupilPositionX}px, ${pupilPositionY}px)`
    }

    document.addEventListener('mousemove', handleMouseMove)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <div className='eyes-container' ref={eyeContainerRef}>
      <div className='eye left-eye'>
        <div className='pupil' ref={leftPupilRef}></div>
      </div>
      <div className='eye right-eye'>
        <div className='pupil' ref={rightPupilRef}></div>
      </div>
    </div>
  )
}

export default Eyes
