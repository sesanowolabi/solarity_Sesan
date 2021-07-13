import React from 'react';
import VideoPlayer from './VideoPlayer';

const TwoVideoPlayer = props => {
  const data = props.data;
  const playerData = [
      {
        'videoCoverPhoto':data.video1CoverPhoto,
        'playerType':{
          'value': data.video1PlayerType.value
        },
        'videoLink':data.video1Link 
      },
      {
        'videoCoverPhoto':data.video2CoverPhoto,
        'playerType':{
          'value': data.video2PlayerType.value
        },
        'videoLink':data.video2Link 
      }
    ];

  return (
    <div className="clearfix">
      {playerData.map((d, index) => {
        return (
          <div key={index}>
            <VideoPlayer data={d} playerSize="half-width" />
            
          </div>
        );
      })} 
    </div>
  );
};

export default TwoVideoPlayer;
