import React from 'react';
import DirectionalLink from './../elements/DirectionalLink';

const SingleImage = props => {
  const data = props.data;

  console.log(data)
  return (
    <section className="full-width stripe_9 ">
      <div className="container--md distribute distribute-center two-col-flex clearfix">
        <div className="col mb-4 ">
          <div className="full-width clearfix pb-2">
            <span className="fontSize0 fontMedium uppercase pb-2 block">{data.label}</span>
            <h3 className="fontSize4 mb-1 mt-0 pb-1 fontBold">{data.heading}</h3>
            <p className="fontSize0 ">{data.description}</p>
          </div>

          {(data.linksToOffsite || data.linksToOnsite.length > 0)
            ? <DirectionalLink data={data} />
            : ''
          }
        </div>
        <div className="col ">
          <img className="borderradius--large" src={data.image[0].transform_url} alt={data.image[0].title} />
        </div>
      </div>
    </section>
  );
};

SingleImage.defaultProps = {
  label: '',
  linksTo: '',
  linkText: '',
};

export default SingleImage;
