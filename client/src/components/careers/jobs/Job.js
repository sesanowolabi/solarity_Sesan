
import React, { Component } from 'react';

import mixpanel from 'mixpanel-browser';

class JobListings extends Component {
  	constructor(props) {
		super(props);
		this.state = {

		}
	  this.jobClick = this.jobClick.bind(this);
	}
  	
  	jobClick(data){
		mixpanel.init('d96d9f1409ced72777048f912ef7591e');
		mixpanel.track('Job Listing Clicked', {
			jobTitle: data.jobTitle,
		});
		console.log(data)
	}
  

  render(){
  	const data = this.props.data;

  	return (
	    <a href={data.linksTo} target="_blank" className="card text-center inner_3" onClick={() => this.jobClick(data)}>
	      <h2 className="fontSize2 fontMedium pb-2 colorBrandSecondary">{data.jobTitle}</h2>
	      <p className="fontSize0 fontRegular mb-0 colorGrey5">{data.locations}</p>
	    </a>
  	);
  }
  
};

export default JobListings;
