import React from 'react';
import {Helmet} from "react-helmet";


const LPTestimonialsW20 = props => {
  const data = props.data;
  return (
    <div className={`full-width testimonials-row background-` + data.testimonialBackgroundColor} >
      <div className="grid testimonialGrid clearfix">
        {data.testimonials.map((d, index) => {
          return (
            <div className="grid1of3" key={`lp-testimonial-` + index}>
              <div className="testimonial-container">
                <div className="testimonial-image">
                  <img src={d.lpTestimonialImage[0].url} />
                </div>
                <p className="testimonial-text">&quot;{d.lpTestimonialText}&quot;</p>
                <p className="testimonial-author">- {d.lpTestimonialAuthor}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LPTestimonialsW20;
