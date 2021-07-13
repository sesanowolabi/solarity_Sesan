import React from 'react';

import { Link } from 'react-router-dom';
import OffsiteLink from '../../helpers/OffsiteLink';

const TwoImage = props => {
  const data = props.data;
  console.log(props);

  return (

    <section className="full-width stripe_9 ">
      <div className="container--md two-col-flex clearfix">
        <div className="pb-4 col ">
          <div className="full-width clearfix pb-2 ">
            <img className="mb-4 full-width borderradius--large" src={data.image1[0].transform_url} alt={data.image1[0].title}/>
            <h3 className="fontSize3 mb-1 mt-0 pb-1 fontBold">{data.heading1}</h3>
            <div className="fontSize0 pb-2" dangerouslySetInnerHTML={{__html: data.description1.content}}></div>
            {
              (data.linkText1 != null && data.linksToOnsite1.length > 0)
              ? <Link className="directionalLink" to={`/${data.linksToOnsite1[0].uri}`}>{data.linkText1} <span className="feather icon-arrow-right"></span></Link>
              : ''
            }
            {
              (data.linkText1 != null && data.linksToOnsite1.length < 1 && data.linksToOffsite1 != null)
              ? <OffsiteLink 
                  link={data.linksToOffsite1} 
                  buttonText={data.linkText1} 
                  button={false}  
                  >
                </OffsiteLink>
              : ''
            }
          </div>
        </div>

        <div className="pb-4 col ">
          <div className="full-width clearfix pb-2 ">
            <img className="mb-4 full-width borderradius--large" src={data.image2[0].transform_url} alt={data.image2[0].title}/>
            <h3 className="fontSize3 mb-1 mt-0 pb-1 fontBold">{data.heading2}</h3>
            <div className="fontSize0 pb-2" dangerouslySetInnerHTML={{__html: data.description2.content}}></div>
            {
              (data.linkText2 != null && data.linksToOnsite2.length > 0)
              ? <Link className="directionalLink" to={`/${data.linksToOnsite2[0].uri}`}>{data.linkText2} <span className="feather icon-arrow-right"></span></Link>
              : ''
            }
            {
              (data.linkText2 != null && data.linksToOnsite2.length < 2 && data.linksToOffsite2 != null)
              ? 

                <OffsiteLink 
                  link={data.linksToOffsite2} 
                  buttonText={data.linkText2}
                  button={false}  
                  >
                </OffsiteLink>
              
              : ''
            }

          </div>
        </div>
      </div>
    </section>
  );
};

export default TwoImage;
