import React from 'react';

const LPHeader = props => {
  const data = props.data;
  return(
    <div>
      <div className="full-width clearfix header-row">
        <div className="grid1of2">
        <img src={process.env.REACT_APP_S3_URL + data.heroImage[0].filename} />
        </div>
        <div className="lp-header-parent">
          <div className="grid1of2 lp-header-content">
            <h1>{data.titleText}</h1>
            <div dangerouslySetInnerHTML={{__html: data.blockContent.content}}/>

            {/* <p className="rbrTextStack">
              <a className="button button-primary fontSize1 lp-button rbrButton" href="#form">{data.applyCTA}</a>
              <span style={{padding:'0 4px'}} className="rbrHide"> or </span>
              <a className="phoneLink" href={'tel:' + data.phoneNumber}><strong>Call {data.phoneNumber}</strong></a>
            </p> */}

            <div className="contact-row">
              <p className="rbraltcall">
                <a className="button button-orange rbrButton" href="https://homeloans.solaritycu.org/">Apply Online</a>
                <a className="button button-dark rbrButton" href="#form">{data.buttonText}</a>
              </p>
            </div>

          </div>
        </div>
      </div>

      <div className="background-orange call-row">
        <h2>{data.callText} <a className="phoneLink" href={'tel:' + data.phoneNumberLinkable}><strong>{data.phoneNumber}</strong></a></h2>
      </div>
    </div>
  );
};

export default LPHeader;