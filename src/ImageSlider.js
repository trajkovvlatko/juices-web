import React from 'react';
import {Slide} from 'react-slideshow-image';

import './styles/ImageSlider.css';

export default function ImageSlider(props) {
  const properties = {
    duration: 5000,
    transitionDuration: 200,
    infinite: true,
    arrows: true,
  };

  return (
    <Slide {...properties}>
      {props.images.map((img, i) => (
        <div className="each-slide" key={`slide-image-${i}`}>
          <div style={{backgroundImage: `url(${img.medium.url})`}} />
        </div>
      ))}
    </Slide>
  );
}
