import React from 'react';

const LPCTA = props => {
  const data = props.data;
  
  return(
    <section className={`full-width cta-row background-` + data.rowBackgroundColor}>
      <div className="grid clearfix">
        <p><strong>{data.ctaTextBold}</strong> {data.ctaTextRegular} <a className="button" href={data.ctaLink}>{data.ctaButtonText}</a></p>
      </div>
    </section>
  );  
};

export default LPCTA;