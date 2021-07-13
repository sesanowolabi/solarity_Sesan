import React from 'react';


const Heading = props => {
  const data = props.data;
  
  return (
  	<h2 className="fontSize3 fontMedium">{data.heading}</h2>
  );
};

export default Heading;