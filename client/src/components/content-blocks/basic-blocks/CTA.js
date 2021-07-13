import React from 'react';
import CTAbutton from './../elements/CTAbutton';

const CTA = props => {
  const data = props.data;
  return (

    <section className="full-width stripe_9 pb-4 " style={{backgroundImage: `url('${process.env.REACT_APP_S3_URL}${data.backgroundImage[0].filename}')`}}>
    	<div className="container--md align-center pb-6 pt-6 clearfix">
	    	<div className="grid7of12 offset1of12">
	    		<div className="full-width clearfix pb-2">
			      <h3 className="fontSize4 mb-1 mt-0 pb-1 white fontBold">{data.heading}</h3>
			      <p className="fontSize0 white">{data.description}</p>
			   	</div>


  			   	{(data.linksToOffsite || data.linksToOnsite)
  			   		? <CTAbutton data={data} />
  			   		: ''
  			   	}

  		    
  		</div>
		</div>
    </section>
  );
};


export default CTA;
