import React, { Component } from 'react';




import Accordion from './accordion/Accordion';
import SingleImage from './SingleImage';
import SingleImageChecklist from './SingleImageChecklist';
import TwoImage from './TwoImage';
import Testimonial from './Testimonial';
import Process from './Process';
import NumberedListWithChecklist from './NumberedListWithChecklist';
import ThreeIcons from './ThreeIcons';
import ThreeImage from './ThreeImage';
import TwoVideoPlayer from './TwoVideoPlayer';
import VideoPlayer from './VideoPlayer';
import BigCTA from './BigCTA';
import CTA from './CTA';
import RatesTable from './RatesTable';
import FullWidthImage from './FullWidthImage';
import TextBlock from './TextBlock';
import FormBlock from './FormBlock';
import Calculator from './Calculator';

class BasicBlocks extends Component {

	getBlockType = (data) => {
	    switch (data.type) {
	      	case 'BasicBlocksAccordion':
	        	return <Accordion data={data}/>;
	      	case 'BasicBlocksSingleImage':
	        	return <SingleImage data={data}/>;
	      	case 'BasicBlocksSingleImageChecklist':
	        	return <SingleImageChecklist data={data}/>;
	        case 'BasicBlocksTwoImage':
	        	return <TwoImage data={data}/>;
	         case 'BasicBlocksTestimonial':
	        	return <Testimonial data={data}/>;
	        case 'BasicBlocksProcess':
	        	return <Process data={data} />;
	        case 'BasicBlocksNumberedListWithChecklist':
	        	return <NumberedListWithChecklist data={data}/>;
	        case 'BasicBlocksThreeIcon':
	        	return <ThreeIcons data={data} />;
					case 'BasicBlocksThreeImage':
	        	return <ThreeImage data={data} />;
	        case 'BasicBlocksTwoVideoPlayer':
	        	return <TwoVideoPlayer data={data}/>;
	        case 'BasicBlocksVideoPlayer':
	        	return <VideoPlayer props={data} data={data}/>;
	        case 'BasicBlocksBigCta':
	        	return <BigCTA data={data}/>;
	        case 'BasicBlocksCta':
	        	return <CTA data={data}/>;
	        case 'BasicBlocksRatesTable':
	        	return <RatesTable data={data}/>;
	        case 'BasicBlocksFullWidthImage':
	        	return <FullWidthImage data={data}/>;
	        case 'BasicBlocksTextBlock':
	        	return <TextBlock data={data}/>;
	        case 'BasicBlocksForm':
	        	return <FormBlock data={data} />;
	        case 'BasicBlocksCalculator':
	        	return <Calculator data={data} />;
	        default:
	        	return "";
	    }
	}

  render() {
  	// //console.log(this.props)
	let data = this.props.data;
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


export default BasicBlocks;
