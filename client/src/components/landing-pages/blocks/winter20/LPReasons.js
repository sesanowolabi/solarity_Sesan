import React from 'react';
import { Helmet } from 'react-helmet';

const LPReasons = props => {
    const data = props.data;
    
    return(

      <div className={`full-width reasons-row background-` + data.backgroundColor_FieldData.selected.value}>
        <div className="container--lg inner_1 clearfix">

          <div className="grid">
            <h2>{data.reasonsTitle}</h2>
            <div className="icon-flex">
              {data.reasons.map((d, index) => {
                return (
                  <div className="icon-container" key={`reason-icon-` + index}>

                    {/* Icon */}
                    <div className="icon-circleBackground">
                      <img src={process.env.REACT_APP_S3_URL + d.reasonAsset[0].filename} />
                    </div>

                    {/* Reason text */}
                    <p>{d.title}</p>
                  </div>
                );
              })}
            </div>
          </div>
          
        </div>
      </div>
    );
};

export default LPReasons;