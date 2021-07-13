import React from 'react';

const Fragment = React.Fragment;


const Process = props => {
  const data = props.data;
  console.log(data.processSteps)
  return (
    <section className="process js-process grey1">
      <div className="process__container">
        {data.processSteps.map((step, index) => {
          return (
            <div className="process__block js-block" key={index}>
              <div className="process__img process__img--picture js-img">
                <img src={`${process.env.REACT_APP_S3_URL}`+step.icon[0].filename} alt={step.heading}/>
              </div>

              <div className="process__content js-content">
                <h2>{step.heading}</h2>
                <Fragment>
                  <p className="fontSize0" dangerouslySetInnerHTML={{__html: step.description.content}}></p>
                </Fragment>
                
              </div> 
            </div>
          );
        })} 
      </div>
    </section>
  );
};

export default Process;
