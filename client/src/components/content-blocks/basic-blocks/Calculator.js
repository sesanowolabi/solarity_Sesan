import React, { Component } from 'react';



import RatesCalculator from '../../ratesCalculator/RatesCalculator';

class Calculator extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    }

	    this.usedCalc = this.usedCalc.bind(this);
	  }

	usedCalc(){
    	//this is where any trackinig will be done for use of the rates calc that is put on this page
	}


	getBlockType = (data) => {
	    switch (data.calculatorType) {
	        case 'mortgageRatesPurchase':
	        	return <RatesCalculator
			                market={'purchase'}
			                slug={'lo'}
			                usedCalc={this.usedCalc}
			                queryString={''}/>;
	        case 'mortgageRatesRefinance':
	        	return <RatesCalculator
			                market={'refinance'}
			                slug={'lo'}
			                usedCalc={this.usedCalc}
			                queryString={''}/>;
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


export default Calculator;
