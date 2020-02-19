import React from 'react';
import Swiper from 'react-id-swiper';

function Gallery() {

  const params = {
    // pagination: {
    //   el: '.swiper-pagination.customized-swiper-pagination',
    // }, // Add your class name for pagination container
    // navigation: {
    //   nextEl: '.swiper-button-next.customized-swiper-button-next', // Add your class name for next button
    //   prevEl: '.swiper-button-prev.customized-swiper-button-prev' // Add your class name for prev button
    // },
    containerClass: 'polaroid-images', // Replace swiper-container with customized-swiper-container
    slidesPerView: 5,
    loop: true,
    autoplay: {
      delay: 3000
    }
      // loop
      // autoplay={{
      //   delay: 5000
      // }}
      // loopAdditionalSlides={5}
      // className="polaroid-images"
  }

  return (
    <Swiper {...params}>
      <a href="" title="Cave">
        <img height="200" src="https://placekitten.com/200/200" alt="Cave" title="Cave" />
      </a>
      <a href="" title="Island">
        <img height="200" src="https://placekitten.com/200/200" alt="Island" title="Island" />
      </a>
      <a href="" title="Islands Forest">
        <img height="200" src="https://placekitten.com/200/200" alt="Islands Forest" title="Islands Forest" />
      </a>
      <a href="" title="Decking">
        <img height="200" src="https://placekitten.com/200/200" alt="Decking" title="Decking" />
      </a>
      <a href="" title="Lake">
        <img height="200" src="https://placekitten.com/200/200" alt="Lake" title="Lake" />
      </a>
      <a href="" title="Mountains">
        <img height="200" src="https://placekitten.com/200/200" alt="Mountains" title="Mountains" />
      </a>
      <a href="" title="Forest">
        <img height="200" src="https://placekitten.com/200/200" alt="Forest" title="Forest" />
      </a>
      <a href="" title="Coast Valley">
        <img height="200" src="https://placekitten.com/200/200" alt="Coast Valley" title="Coast Valley" />
      </a>
    </Swiper>
  )
};

export default Gallery;
