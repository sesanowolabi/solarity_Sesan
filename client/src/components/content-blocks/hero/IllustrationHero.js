import React from 'react';
import CTAbutton from './../elements/CTAbutton';

const IllustrationHero = props => {
  const data = props.data;
  return (
  	<section className={"hero illustration " + data.backgroundColor}>
	  <div className="hero--grid">
      <div className="two-col-flex full-width no-pad-m pb-4 ">
  	    <div className="hero--callout col flex distribute distribute-center ">
  	    	<h1 className="fontBold fontSize5 pb-2 mb-0 mt-0">{data.heading}</h1>
  	      	<p className="fontRegular fontSize1 pb-2 mt-0">{data.description}</p>

  	      	{(data.linksToOffsite || data.linksToOnsite)
  		   		? <CTAbutton data={data} />
  		   		: ''
  			}

  	    </div>
  	    <img className="col" src={data.backgroundImage[0].url} alt={data.imageTitle}/>
  	  </div>
    </div>
	</section>
  );
};

export default IllustrationHero;
