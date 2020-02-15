import React from 'react'
// import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'

export default () => {
  // const { width, height } = useWindowSize()

  const sectionWidth = document.getElementById('timer-section').offsetWidth;
  const sectionHeight = document.getElementById('timer-section').offsetHeight;

  return (
    <Confetti
      opacity={0.1}
      width={sectionWidth}
      height={sectionHeight}
      gravity={0.01}
    />
  )
}
