import React, { Component } from 'react';

import AdditionalDetails from './AdditionalDetails';
import Disclaimers from './Disclaimers';
import Heading from './Heading';
import Image from './Image';
import Paragraph from './Paragraph';
import RatesPageAdditionalDetails from './RatesPageAdditionalDetails';
import Table from './Table';


class BankProductBlocks extends Component {
	
	getBlockType = (data) => {
	    switch (data.type) {
	      	case 'heading':
	        	return <Heading data={data} />;
	       	case 'paragraph':
	        	return <Paragraph data={data} />;
	       	case 'image':
	        	return <Image data={data} />;
	        case 'disclaimers': 
	        	return <Disclaimers data={data} />;
	        case 'additionalDetails': 
	        	return <AdditionalDetails data={data} />;
	        case 'table': 
	        	return <Table data={data} />;
	        case 'ratesPageAdditionalDetails': 
	        	return <RatesPageAdditionalDetails data={data} />;
	        default: 
	        	return 'type is undefinedd'
	    }

	}

  render() {
	const data = this.props.data;

	//console.log(data)
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


export default BankProductBlocks;
