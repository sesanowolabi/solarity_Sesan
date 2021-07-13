import React from 'react';

const LPRateBoxRowAlt = props => {
    const data = props.data;

    return (

        <div className="full-width rate-box-row rbralt" style={{backgroundImage: `url("${process.env.REACT_APP_S3_URL}${data.backgroundImage[0].filename}")`}}>
            <div className="grid clearfix">
                <h2>{data.heading}</h2>
                <div className="row-text" dangerouslySetInnerHTML={{__html: data.richText.content}} />
                
                <div className="rateBox background-grey">

                    <div className="rbraltcolumn">
                        <h2 dangerouslySetInnerHTML={{__html: data.rateHeading}}></h2>
                        <p>{data.rateSubtext}</p>
                        
                        <div>
                            <p className="rbrRate">{data.mainRate}</p>
                            <p className="rbrRate">{data.mainApr}</p>
                        </div>
                    </div>
                    <hr />
                    <div className="rbraltcolumn rbraltcenter">
                        <div className="rbraltrow">
                            <h2>{data.rate2Header}</h2>
                            <h3>{data.rate2Text}</h3>
                        </div>
                        <hr className="rbralthr" />
                        <div className="rbraltrow">
                            <h2>{data.rate3Header}</h2>
                            <h3>{data.rate3Text}</h3>
                        </div>
                    </div>
                </div>

                <p className="rbraltcall">
                    <a className="button button-orange rbrButton" href="https://homeloans.solaritycu.org/">Apply Online</a>
                    <br className="rbrButtonDivider"/>
                    <a className="button button-dark rbrButton" href="#form">{data.buttonText}</a>
                    <br className="rbraltcallspacer" />
                    <span style={{padding:'0 4px'}} className="rbrHide"> or </span>
                    <a className="phoneLink" href={'tel:' + data.phoneNumber}><strong>Call us at {data.phoneNumber}</strong></a>
                </p>
            </div>
        </div>

    );
};

export default LPRateBoxRowAlt;