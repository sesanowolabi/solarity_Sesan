import React from 'react';


const Rates = props => {
  console.log(props.data.ratesPage[0].rates)
  return (
    <div key={props.index} className="container--sm pt-8 pb-8 rate-items">
    	{console.log(props.data.ratesPage[0])}
    	<div className="rate-row-headers row clearfix">  
	        <div className="rate-row-head rate-head-1 fontSize1 fontMedium">{props.data.ratesPage[0].rateTableTitles[0].table1stColumnTitle}</div>
	        <div className="rate-row-head rate-head-2 fontSize1 fontMedium">{props.data.ratesPage[0].rateTableTitles[0].table2ndColumnTitle}</div>
	        <div className="rate-row-head rate-head-3 fontSize1 fontMedium">{props.data.ratesPage[0].rateTableTitles[0].table3rdColumnTitle}</div>
	    </div> 
	    
	    {props.data.ratesPage[0].rates.map((d, i) => {
	        return (
	          	<div key={i} className="rate-row-data row clearfix"> 
			        <div className="rate-row-item rate-item-1 fontSize0">{d.table1stColumnValue}</div>
		            <div className="rate-row-item rate-item-2 fontSize0">{d.table2ndColumnValue}</div>
		            <div className="rate-row-item rate-item-3 fontSize0">{d.table3rdColumnValue}</div>
	          	</div>
	        );
	    })} 
    </div>
  );
};


export default Rates;   