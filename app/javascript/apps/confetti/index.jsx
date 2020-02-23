import React from 'react'
// import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'

export default () => {
  // const { width, height } = useWindowSize()

  const sectionWidth = document.getElementById('timer-section').offsetWidth;
  const sectionHeight = document.getElementById('timer-section').offsetHeight;

  return (
    <Confetti
      opacity={0.08}
      width={sectionWidth}
      height={sectionHeight}
      gravity={0.01}
      colors={['#eabeb0', '#68d391', '#b76e79']}
    />
  )
}
