import React from 'react';

const LPRateBoxRow = props => {
    const data = props.data;

    return (

        <div className="full-width rate-box-row" style={{backgroundImage: `url("${process.env.REACT_APP_S3_URL}${data.backgroundImage[0].filename}")`}}>
            <div className="grid clearfix">
                <div className="grid1of2">
                    <h2> {data.heading} </h2>
                    <div dangerouslySetInnerHTML={{__html: data.richText.content}} />
                    <p className="rbrTextStack">
                        <a className="button button-dark rbrButton" href="#form">{data.buttonText}</a>
                        <span style={{padding:'0 4px'}} className="rbrHide"> or </span>
                        <strong>Call {data.phoneNumber}</strong>
                    </p>
                </div>
                
                
                <div className="grid1of2">
                    <div className="rateBox background-grey">
                        <h3><strong>{data.rateHeading}</strong></h3>
                        <hr />
                        <p>{data.aboveRateText}</p>
                        <p className="rbrRate">{data.rate}</p>
                        <p className="rbrRate">{data.aprRate}</p>
                        <p className="lightweight rateDisclaim">{data.rateText}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LPRateBoxRow;