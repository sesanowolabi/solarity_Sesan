import React from 'react';


const Paragraph = props => {
  const data = props.data;
  
  return (
	<div className="richText fontSize0 pb-4 " dangerouslySetInnerHTML={{__html: data.paragraph}}></div>
  );
};

export default Paragraph;