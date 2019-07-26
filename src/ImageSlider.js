import React from 'react';
import {Slide} from 'react-slideshow-image';

import './styles/ImageSlider.css';

export default function ImageSlider(props) {
  const slideImages = props.images.map(img => img.medium.url);

  const properties = {
    duration: 5000,
    transitionDuration: 200,
    infinite: true,
    arrows: true,
  };

  return (
    <Slide {...properties}>
      {slideImages.map(img => (
        <div className="each-slide">
          <div style={{backgroundImage: `url(${img})`}} />
        </div>
      ))}
    </Slide>
  );
}
