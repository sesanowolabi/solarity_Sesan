import React from 'react';

const FullWidthImage = props => {
  const data = props.data;
  //console.log(data)
  return (
    <img className="align-center" src={`${process.env.REACT_APP_S3_URL}` + data.image[0].filename} alt={data.image[0].title} />
  );
};

export default FullWidthImage;
