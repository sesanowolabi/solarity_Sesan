import React from 'react';
import PointOfInterest from './PointOfInterest';

const PoiList = props => { 
  const results = props.data;
  let points;

  if (results.length) {
    points = results.map(data => 
        <PointOfInterest 
              name={data.name} 
              description={data.description} 
              lat={data.lat}
              lng={data.lng} />);    
  }

  return(
    <ul>
      {points}
    </ul>
  );
}

export default PoiList;
