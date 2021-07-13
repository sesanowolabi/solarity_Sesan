import React from 'react';


const Testimonial = props => {
  const data = props.data;
  //console.log(data)
  return (
    <div className="container--sm inner_1 ">
    	<p className="fontSize1 quote">{data.quote}</p>
      	<p className="fontSize0 fontMedium">- {data.memberName}</p>
    </div>
  );
};

export default Testimonial;
