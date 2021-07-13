import React from 'react';
import CTAbutton from './../elements/CTAbutton';

const BasicHero = props => {
  const data = props.data;
  console.log(data)

  return (

  <section className="hero align-center">
    <div className="two-col-flex full-width no-pad-m ">
  		<div className="hero--grid col flex distribute distribute-center ">
  		    <div className="hero--callout align-center ">
  		    	<h1 className="fontBold fontSize5 pb-2 mb-0 mt-0">{data.heading}</h1>
  		      	<p className="fontRegular fontSize1 pb-2 mt-0">{data.description}</p>
  		      	{(data.buttonText != null)
  			   		  ? <CTAbutton data={data} />
  			   		  : ''
  				    }
  		    </div>
  		</div>
      
  		<div className="hero--image col" style={{backgroundImage: `url("${process.env.REACT_APP_S3_URL}${data.backgroundImage[0].filename}")`}}>
  		</div>
    </div>
	</section>
  );
};

export default BasicHero;
