import React from 'react';

const LPBenefits = props => {
    const data = props.data;
    return (

        <div className={`full-width benefits-row background-` + data.backgroundColor_FieldData.selected.value}>
        <div className="container--lg inner_1 clearfix">

          <div className="grid">
          <h2>{data.headerText}</h2>
          <h4>{data.subheaderText}</h4>
          <div className="icon-flex">
            {data.benefit.map((d, index) => {
              return (
                <div className="icon-container" key={`benefit-icon-` + index}>
                  <img src={process.env.REACT_APP_S3_URL + d.benefitAsset[0].filename} />
                  <p><strong>{d.title}</strong></p>
                  <p>{d.benefitContent}</p>
                </div>
              );
            })}
          </div>
          </div>
          
        </div>
      </div>  
    );
};

export default LPBenefits;