import React from 'react';
import VisibilitySensor from "react-visibility-sensor";

const ImageLoaderComponent = props => {
  const data = props.data;
  return (
    <VisibilitySensor>
      {({isVisible}) =>
        <img className={props.imageClasses} src={isVisible ? {props.imageSource} : '../dummyImage.png'} alt={isVisible ? {props.imageAlt} : "dummy image alt"} />
      }
    </VisibilitySensor>
  );
};
export default ImageLoaderComponent;
