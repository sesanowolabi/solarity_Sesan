import React, { Component } from 'react';


class RatesTable extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }


  }


  componentDidMount(){


  }


  render() {
    return (
      <div className="full-width">
        {(this.props.data.length > 0)
          ?
          <div className="center rates-table">


             {this.props.data.map((list, index) => {
               return (
                 <div className="rates-table-row mb-1 mt-1" key={index}>
                   <div className="rates-row-item1 pb-2 pt-2 font-size2">
                    <span className={`rates-color-${index} fontSize0 colorGrey4 rate-term pb-1 pt-1 pl-2 pr-2 mr-1 mt-1 mb-1 ml-2`}>{list.title}</span> {list.type.charAt(0).toUpperCase() + list.type.slice(1)}
                   </div>

                   <div className="rates-row-item pt-2 text-center colorGrey5 fontBold fontSize2">
                    <div className="mb-0 pb-0 colorGrey5">{list.quoteInfo.rate.toFixed(3)} %</div>
                    <div className="colorGrey4 mb-1 fontRegular fontSize0">Rate</div>
                   </div>
                   <div className="rates-row-item pt-2 text-center colorGrey5 fontBold fontSize2">
                    <div className="mb-0 pb-0 colorGrey5">{list.quoteInfo.apr.toFixed(3)} %</div>
                    <div className="colorGrey4 mb-1 fontRegular fontSize0">APR</div>
                    </div>
                   <div className="rates-row-item pt-2 text-center colorGrey5 fontBold fontSize2 mr-4">
                    <div className="mb-0 pb-0 colorGrey5">$ {(list.quoteInfo.closingCost.toLocaleString())}</div>
                    <div className="colorGrey4 mb-1 fontRegular fontSize0">Closing Cost</div>
                    </div>
                   <div className="rates-row-item pt-2 text-center colorGrey5 fontBold fontSize2 mr-4">
                    <div className="mb-0 pb-0 colorGrey5">$ {(list.quoteInfo.totalPayment.toLocaleString())}</div>
                    <div className="colorGrey4 mb-1 fontRegular fontSize0">Monthly Payment</div>
                    </div>


                 </div>
               )
             })}


           </div>
           :
          <div className="full-width grey1 borderradius--large text-center">
            <h3 className="colorGrey4 fontSize2 pt-4 pb-4">Based on the information you provided, we may be able to offer a product specific to your needs. Contact our lending team at <a className="link" href="tel:877.853.3297">877.853.3297</a> for a rate estimate.</h3>
          </div>
         }


      </div>
    );
  }
}



export default RatesTable;
