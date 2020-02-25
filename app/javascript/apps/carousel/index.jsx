import React from 'react';

import AwesomeSlider from 'react-awesome-slider';
import withAutoplay from 'react-awesome-slider/dist/autoplay';


const AutoplaySlider = withAutoplay(AwesomeSlider);

function Carousel() {

  let images = [
    'https://placekitten.com/1200/800',
    'https://placekitten.com/1100/800',
    'https://placekitten.com/1200/900'
];

const startupScreen = (
  <div>
    <img src="https://placekitten.com/900/900" />
  </div>
);

  return(
      <div className="w-screen h-screen border border-red-500">
        <AwesomeSlider
          startupScreen={startupScreen}
        >
          <div data-src="https://placekitten.com/1200/800" />
          <div data-src="https://placekitten.com/1100/800" />
          <div data-src="https://placekitten.com/1000/800" />
        </AwesomeSlider>
      </div>
  );
};

export default Carousel;
