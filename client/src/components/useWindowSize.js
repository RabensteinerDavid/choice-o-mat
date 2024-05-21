import { useState, useEffect } from 'react'

function getWindowDimensions () {
  const { innerWidth: width, innerHeight: height } = window

  const coordinates = [
    { x: width / 8, y: height / 15 },
    { x: width / 10.5, y: height / 10 },
    { x: width / 15.5, y: height / 6.5 },
    { x: width / 10.5, y: height / 5 },
    { x: (3 * width) / 3.8, y: -(height / 5) },
    { x: (3 * width) / 3.6, y: -(height / 6.5) },
    { x: (3 * width) / 3.7, y: -(height / 10) },
    { x: (3 * width) / 3.8, y: -(height / 15) }
  ]

  return {
    width,
    height,
    coordinates
  }
}

export default function useWindowDimensions () {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  )

  useEffect(() => {
    function handleResize () {
      setWindowDimensions(getWindowDimensions())
    }

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowDimensions
}
