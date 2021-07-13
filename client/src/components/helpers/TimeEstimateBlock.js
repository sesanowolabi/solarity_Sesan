import React, { Component } from 'react';



class TimeEstimateBlock extends Component {


	constructor(props) {
	    super(props);
	    this.state = {
	      seconds: 0,

	    }

	    this.addTime = this.addTime.bind(this);
	    this.calculateTime = this.calculateTime.bind(this);
	    //this.rerunCalculation = this.rerunCalculation.bind(this);

	}

	// componentDidUpdate(prevProps, prevState){
	// 	if (prevProps !== this.props) {
	// 		this.rerunCalculation();
	// 	}
	// }

	// rerunCalculation(){
	// 	for(let x = 0; x < this.props.data.length; x++){
	// 		this.addTime(this.props.data[x]);
	// 	}
	// }

	componentDidMount(){
		var time = this.state.seconds;
		for(let x = 0; x < this.props.data.length; x++){
			time = time + this.addTime(this.props.data[x]);
		}

		time = Math.round(time);

		time = Math.floor(time / 60);

		time = time + 1;

		this.setState({
			seconds: time,
		})
	}

	calculateTime(text){
		// console.log('in clac time...');
		// console.log(text);
		let words = text.trim().split(' ').length;
		let wpm = words/225;
		let seconds = wpm * 60;

		return seconds;
	}

	addTime(data){
		// console.log('in add time...');
		// console.log(data);
	   switch (data.type) {
	      	case 'BasicBlocksAccordion':
	        	return 10;
	      	case 'BasicBlocksSingleImage':
	        	return 10;
	      	case 'BasicBlocksSingleImageChecklist':
	        	return 10;
	        case 'BasicBlocksTwoImage':
	        	return 10;
	         case 'BasicBlocksTestimonial':
	        	return 10;
	        case 'BasicBlocksProcess':
	        	return 10;
	        case 'BasicBlocksNumberedListWithChecklist':
	        	return 10;
	        case 'BasicBlocksThreeIcon':
	        	return 10;
	        case 'BasicBlocksThreeImage':
	        	return 10;
	        case 'BasicBlocksTwoVideoPlayer':
	        	return 10;
	        case 'BasicBlocksVideoPlayer':
	        	return 10;
	        case 'BasicBlocksBigCta':
	        	return 10;
	        case 'BasicBlocksCta':
	        	return 10;
	        case 'BasicBlocksRatesTable':
	        	return 10;
	        case 'BasicBlocksFullWidthImage':
	        	return 10;
	        case 'BasicBlocksTextBlock':
	        	return this.calculateTime(data.desc.content);
	        case 'BasicBlocksForm':
	        	return 10;
	        case 'BasicBlocksCalculator':
	        	return 10;
	        default:
	        	return 10;
	    }
	}

  render() {
  	// //console.log(this.props)
	//let data = this.props.data;
	//console.log(this.props.data);


    return (
        <p className="colorGrey4 bold time-to-read ">
				<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-clock mr-1 "><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
				Read time: <span className="colorGrey4 mt-2 ">less than {this.state.seconds} minutes</span>
        </p>
    );
  }
}


export default TimeEstimateBlock;
