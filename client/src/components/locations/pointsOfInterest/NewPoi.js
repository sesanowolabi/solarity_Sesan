import React from 'react';

const PointOfInterest = props => (
  <li>
  	<p>{props.name}</p>
  	<p>{props.lat}</p>
  	<p>{props.lng}</p>
  </li>
);

export default PointOfInterest; 