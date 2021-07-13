import React from 'react';


const Rates = props => {
  
  return (
    <div key={props.index} className="rate-items">
    

    {(props.loading == false) ? 
        <div>
          <h3 className="fontSize3 fontMedium mt-0">{props.product[0].heading} Rates</h3>
          {(props.rates.rateTableTitles) 

            ? <div className="clearfix">
                {props.rates.rates.map((d, i) => {
                  return (
                    <div key={i} className="mb-6 clearfix"> 
                      <div className="mb-3">
                        <div className="block fontSize2 fontBold">{d.col1}</div>
                        <div className="block fontSize0 colorGrey4">{props.rates.rateTableTitles[0].col1}</div>
                      </div>
                      <div className="mb-3">
                        <div className="block fontSize2 fontBold">{d.col2}</div>
                        <div className="block fontSize0 colorGrey4">{props.rates.rateTableTitles[0].col2}</div>
                      </div>
                      <div className="mb-3">
                        <div className="block fontSize2 fontBold">{d.col3}</div>
                        <div className="block fontSize0 colorGrey4">{props.rates.rateTableTitles[0].col3}</div>
                      </div>
                    </div>
                  );
                })} 

              </div> 
            : ''}
        </div>
       : ''}
    </div>
  );
};


export default Rates;

