import React from 'react';

const Table = props => {

  return (
  	<div className="pt-2 pb-2">
        <div className="full-width pb-2 clearfix">
            <div className="grid1of3 fontMedium">{props.data.tableHeadings[0].col1}</div>
            <div className="grid1of3 fontMedium">{props.data.tableHeadings[0].col2}</div>
            <div className="grid1of3 fontMedium">{props.data.tableHeadings[0].col3}</div>
        </div> 
        
        {props.data.tableValues.map((d, i) => {
            return (
              <div key={i} className="full-width pb-2 clearfix"> 
                <div className="grid1of3">{d.col1}</div>
                <div className="grid1of3">{d.col2}</div>
                <div className="grid1of3">{d.col3}</div>
              </div>
            );
          })} 
  	</div>
  );
};

export default Table;