import React, { Component } from 'react';

import BasicHero from './BasicHero';
import IllustrationHero from './IllustrationHero';
import BlogHero from './BlogHero';
import TextHero from './TextHero';
import VideoHero from './VideoHero';

class Hero extends Component {

	getBlockType = (data) => {
	    switch (data.type) {
	      	case 'HeroBasicHero':
	        	return <BasicHero data={data} url={this.props.url}/>;
	       	case 'HeroIllustrationHero':
	        	return <IllustrationHero data={data} url={this.props.url}/>;
	       	case 'HeroVideoHero':
	        	return <VideoHero data={data}/>;
	       	case 'HeroTextHero':
	        	return <TextHero data={data}/>;
	        case 'HeroBlogHero':
	        	return <BlogHero data={data} slug={this.props.slug}/>;
	        default:
	        	return 'Hero Type is Undefined'
	    }
	}  

  render() {
	const data = this.props.data;
	console.log(data)
    return (
        <div>
	        {(this.props.loading === false) ?
        		<div>
		        	{data.map((d, index) => {
		        		return (
			          	<div key={index}>
								{this.getBlockType(d)}
							</div>
						);
		            })}
		        </div>
	            : ''}
	    </div>
    );
  }
}


export default Hero;
