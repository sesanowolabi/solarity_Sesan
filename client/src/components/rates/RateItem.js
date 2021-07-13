import React from 'react';


const RateItem = props => {
  const data = props.data;
  console.log(data);
  return (
    <div id={data.title} role="region" aria-labelledby={data.title} key={props.index} className="rate-items">
      <h2 className="fontSize4 fontMedium colorBrandSecondary">{data.title}</h2>
      

      {(data.rateTableTitles) 
        ? <div className="rate-row-headers row clearfix">
            <div className="rate-row-head rate-head-1 fontMedium">{data.rateTableTitles[0].col1}</div>
            <div className="rate-row-head rate-head-2 fontMedium">{data.rateTableTitles[0].col2}</div>
            <div className="rate-row-head rate-head-3 fontMedium">{data.rateTableTitles[0].col3}</div>
          </div> 
        : 'nope'}

      {data.rates.map((d, i) => {
        return (
          <div key={i} className="rate-row-data row clearfix"> 
            <div className="rate-row-item rate-item-1">{d.col1}</div>
            <div className="rate-row-item rate-item-2">{d.col2}</div>
            <div className="rate-row-item rate-item-3">{d.col3}</div>
          </div>
        );
      })} 


      {
        (data.ratesAdditionalDetails !== null)
        ?
          (data.ratesAdditionalDetails.length > 0)
          ?
            (data.ratesAdditionalDetails[0].title !== null && data.ratesAdditionalDetails[0].title !== '')
            ?
              <div className="pt-6 pb-2 rate-row-head">
                <div className="fontMedium">Additional Details</div>
              </div>
            :
              ''
          : 
            ''
        : 
          ''
      }

      {
        (data.ratesAdditionalDetails !== null)
        ?
          (data.ratesAdditionalDetails.length > 0)
          ?
            (data.ratesAdditionalDetails[0].title !== null && data.ratesAdditionalDetails[0].title !== '')
            ?
              data.ratesAdditionalDetails.map((d,i) => {
                return(
                  <div className="rate-row-data row clearfix">
                    <div className="rate-row-item rate-add-1">{d.title}</div>
                    <div className="rate-row-item rate-add-1">{d.detail}</div>
                  </div>
                );
              })
            :
              ''
          : 
            ''
        : 
          ''
      }

      {
        (data.additionalInfo) ?
        <p className="rate-additional-info richText" dangerouslySetInnerHTML={{__html: data.additionalInfo.content}}></p>

        : <p className="rate-additional-info"></p>

      }


    </div>
  );
};

RateItem.defaultProps = {
  data: [{
    'ratesAdditionalDetails': [{
      'label': ''
    }]
  }]
};

export default RateItem;
