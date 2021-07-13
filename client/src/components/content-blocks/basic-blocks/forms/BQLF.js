import React, { Component } from 'react';

import PurchaseForm from './forms/PurchaseForm';
import RefinanceForm from './forms/RefinanceForm';
import ConstructionForm from './forms/ConstructionForm';
import BusinessForm from './forms/BusinessForm';

class BQLF extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeItem: '',
    }

  }


  render() {

    let formType;
    if (this.props.formType !== null) {
      formType = this.props.formType;
    }
    else{
      formType = 'business';
    }

    return (
    	


        <div className="container--sm stripe_4">
           <div className="grey1 inner_3" >
            {(formType === 'refinance') ? <RefinanceForm queryString={this.props.queryString}/> : ""}
            {(formType === 'purchase') ? <PurchaseForm queryString={this.props.queryString}/> : ""}
            {(formType === 'build') ? <ConstructionForm queryString={this.props.queryString}/> : ""}
            {(formType === 'business') ? <BusinessForm queryString={this.props.queryString}/> : ""}
          </div>
        </div>
      
    );
  }
}


export default BQLF;
