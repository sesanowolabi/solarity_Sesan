import React, { Component } from 'react';


// apollo

import PurchaseForm from './forms/PurchaseForm';
import RefinanceForm from './forms/RefinanceForm';
import ConstructionForm from './forms/ConstructionForm';

class MQLF extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeItem: '',
      formType: 'purchase'
    }

  }

  render() {
    let formType;
    if (this.props.formType !== null) {
      formType = this.props.formType;
    }
    else{
      formType = 'purchase';
    }
    return (
    	<div className="offsetNav">
        {/*  Im looking to _loantype___ a home in _city__ .
        I plan to spend _200,000_ and have __40000_ saved for a down payment
        My credit score is _640_
        My name is _f name__ __last name__
        And you can contact me at _phone___
        Or email me at _email_.   */}

        <div className="container--sm stripe_4">
           <div className="grey1 inner_3" >

            {(formType === 'refinance') ? <RefinanceForm queryString={this.props.queryString}/> : ""}
            {(formType === 'purchase') ? <PurchaseForm queryString={this.props.queryString}/> : ""}
            {(formType === 'build') ? <ConstructionForm queryString={this.props.queryString}/> : ""}
          </div>
        </div>
      </div>
    );
  }
}


export default MQLF;
