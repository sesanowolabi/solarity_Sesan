import React from 'react';


const Image = props => {
  const data = props.data;
  console.log(data);

  return (
  	<img className="pb-4" src={`${process.env.REACT_APP_S3_URL}`+ data.image} alt={data.imageTitle}/>
  );
};

export default Image;

