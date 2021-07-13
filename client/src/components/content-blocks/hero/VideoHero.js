import React from 'react';


const VideoHero = props => {
  const data = props.data;
  return (
    <span>
    VIDEO HERO
      {data.heading}
      {data.description}
      {data.backgroundImage}
      {data.backgroundVideo}
      {data.videoLink}
    </span>
  );
};

export default VideoHero;