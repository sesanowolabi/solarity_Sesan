import React from 'react';

import { Link } from 'react-router-dom';

import OffsiteLink from '../../helpers/OffsiteLink';

const DirectionalLink = props => {
  const data = props.data;
  console.log('logging in directional link');
  console.log(props);
  return (
    <div>
	   	{(data.linksToOnsite.length > 0) 
	   		? <Link className="directionalLink" to={`/${data.linksToOnsite[0].uri}`}>{data.buttonText} <span className="feather icon-arrow-right"></span></Link>
	   		: ''
	   	}

	   	{(data.linksToOffsite !== '' && data.linksToOnsite.length < 1) 
	   		? <OffsiteLink link={data.linksToOffsite} buttonText={data.buttonText} button={false}></OffsiteLink>
	   		: ''
	   	}
	</div>
  );
};  


export default DirectionalLink;
