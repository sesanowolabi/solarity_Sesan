import React from 'react';


const RatesPageAdditionalDetails = props => {
  return (
    <div key={props.index} className="rate-items pb-4">
      {(props.data.page != null) 
        ? <div>
            {props.data.page.map((d, i) => {
              return (
                <div key={i} className="rate-row-data row clearfix"> 
                  <div className="rate-row-item rate-item-1 fontMedium">{d.col1}</div>
                  <div className="rate-row-item rate-item-2">{d.col2}</div>
                </div>
              );
            })}
          </div> 
        : ''}   
    </div>
  );
};


export default RatesPageAdditionalDetails;

