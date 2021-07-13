import React from 'react';

import Job from './Job';

const JobListings = props => {

  return (
    <section className="full-width pb-8">
      {(props.loading === false) ?
        <div className="card-grid jobs">
          {props.data.map((d, index) => {
            return (
               <Job key={`job-${index}`} data={d}/>
            );
          })}
        </div>
      : ''}
    </section>
  );
};

export default JobListings;
