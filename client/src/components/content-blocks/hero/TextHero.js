import React from 'react';


const TextHero = props => {
  const data = props.data;
  let align = 'text-left';
  if (data.headingAlignment === 'textLeft') {
  	align = 'text-left';
  }
  else if(data.headingAlignment ===  'textCenter'){
  	align = 'text-center';
  }


  return (
  	<section className="hero">
	  	<div className="container--md pt-4 clearfix stripe_6">
	    	<h1 className={`fontBold fontSize5 pb-2 mb-0 mt-0 ${align}`}>{data.heading}</h1>
	    	{
	    		(data.description != null)
	    		? <p className={`fontRegular fontSize1 mt-0 ${align}`}>{data.description}</p>
	    		: ''
	    	}
	      	
	    </div>
    </section>
  );
};

export default TextHero;
