import React from 'react';

import { Link } from 'react-router-dom';

import mixpanel from 'mixpanel-browser';

const trackClick = cardTitle => {
	//console.log(cardTitle)
	mixpanel.init('d96d9f1409ced72777048f912ef7591e');
	mixpanel.track('Card Clicked', {
		cardTitle: cardTitle
	});
};


const Cards = props => {
  const data = props.data;

	

  return (
    <div className="card" onClick={event => trackClick(data.cardTitle)}>

	   	{(data.linksToOnsite.length > 0 )
	   		?
		   		<Link to={`/${data.linksToOnsite[0].uri}`}>
		          	<div className="icon-wrapper">
						<img src={`${process.env.REACT_APP_S3_URL}` + data.icon[0].filename} alt={data.icon[0].title}/>
		          	</div>
		          	<h2 className="fontMedium" aria-level="2">{data.cardTitle}</h2>
		   		</Link>
	   		: ''
	   	}

	   	{(data.linksToOffsite != null && data.linksToOnsite.length < 1)
	   		?
		   		<a href={data.linksToOffsite} target="_blank">
					<div className="icon-wrapper">
		            	<img src={`${process.env.REACT_APP_S3_URL}` + data.icon[0].filename} alt={data.icon[0].title}/>
		          	</div>
		          	<h2 className="fontMedium" aria-level="2">{data.cardTitle}</h2>
		   		</a>
	   		: ''
	   	}
	</div>
  );
};


export default Cards;
