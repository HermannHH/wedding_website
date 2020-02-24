import React from 'react';
import Swiper from 'react-id-swiper';

function Gallery({ data }) {
  const params = {

    containerClass: 'polaroid-images', // Replace swiper-container with customized-swiper-container
    slidesPerView: 5,
    loop: true,
    // fadeEffect: {
    //   crossFade: true
    // },
    autoplay: {
      delay: 3000
    }
  }

  return (
    <Swiper {...params}>
      {data.map( (item, index) => (
        <div key={index} className="polaroid-image-item">
          <div style={{
            backgroundImage: `url(${item})`,
            width: '100%',
            height: '100%',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover'
          }}/>
          {/* <img src={item} /> */}
        </div>
      ))}
    </Swiper>
  )
};

export default Gallery;
