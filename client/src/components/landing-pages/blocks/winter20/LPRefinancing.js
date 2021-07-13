import React from 'react';

const LPRefinancing = props => {
  const data = props.data;
  return(
    <section className="full-width">
      <div className="container--lg inner_1 clearfix">
        <h2> {data.heading} </h2>
        <h3> {data.subheading} </h3>
        <div dangerouslySetInnerHTML={{__html: data.richText.content}} />
        <img src={data.backgroundImage.url}/>
        
        <div className="lprefincnancingform">
          <h3>{data.formHeading}</h3>
          <h4>{data.formSubheading}</h4>
        </div>
      </div>
    </section>
  );  
};

export default LPRefinancing;