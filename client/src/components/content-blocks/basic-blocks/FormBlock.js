import React, { Component } from 'react';

import BQLF from './forms/BQLF';
import MQLF from './forms/MQLF';
import VisaUpdater from './forms/VisaUpdater';

class FormBlock extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    }

	  }

	getBlockType = (data) => {
		console.log('form block...');
		console.log(data);
	    switch (data.formType) {
	        case 'mqlfPurchase':
	        	return <MQLF formType="purchse"/>;
	        case 'mqlfRefinance':
	        	return <MQLF formType="refinance"/>;
	        case 'mqlfConstruction':
	        	return <MQLF formType="build"/>;
	        case 'bqlfBusiness':
	        	return <BQLF formType="business"/>;
	        case 'visaUpdater':
	        	return <VisaUpdater />;
	        default:
	        	return "hello";
	    }
	}

  render() {
  	


    return (
        <div className="full-width rates-gray-background stripe_8">
			{this.getBlockType(this.props.data)}
		</div>
    );
  }
}


export default FormBlock;


