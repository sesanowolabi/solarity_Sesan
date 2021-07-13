import React from 'react';



const AdditionalDetails = props => {

  return (
  	<div>
    	{props.data.additionalDetails.map((d, i) => {
            return (
              <div key={i} className="additionalDetails full-width pb-2 row clearfix"> 
                <div className="grid5of12 fontSize1 fontMedium">{d.col1}</div>
                <div className="grid7of12 fontSize0">{d.col2}</div>
              </div>
            );
          })} 
	 </div>
  );
};

export default AdditionalDetails;

