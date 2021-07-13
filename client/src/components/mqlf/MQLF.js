import React, { Component } from 'react';


// apollo

import PurchaseForm from './forms/PurchaseForm';
import RefinanceForm from './forms/RefinanceForm';
import ConstructionForm from './forms/ConstructionForm';
import PurchaseFormv3 from './forms/PurchaseFormv3';
//import PurchaseFormv2 from './forms/PurchaseFormv2';

class MQLF extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeItem: '',
      formType: 'purchasev3'
      //formType: 'purchasev2'
    }

  }

  handleChangeContact(event) {
    let val = this.contactSelect;
    let data = val.options[val.selectedIndex].value;
    this.setState({
      formType: data,
    });

    //console.log(data)
  }


  render() {
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



            {/*(this.state.formType === 'purchasev2') ? <PurchaseFormv2 queryString={this.props.queryString} /> : ""*/}
            {(this.state.formType === 'purchasev3') ? <PurchaseFormv3 queryString={this.props.queryString}/> : ""}
          </div>
        </div>
      </div>
    );
  }
}


export default MQLF;
