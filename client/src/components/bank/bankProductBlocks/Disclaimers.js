import React from 'react';


const Disclaimers = props => {
  const data = props.data;
  //console.log(data)
  return (  
    <div className="richText fontSize0 disclaimers pb-4 " dangerouslySetInnerHTML={{__html: data.disclaimers}}></div>
  );
};

export default Disclaimers;


