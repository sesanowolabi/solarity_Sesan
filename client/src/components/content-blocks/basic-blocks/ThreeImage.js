import React from 'react';

import { Link } from 'react-router-dom';

const ThreeImage = props => {
  const data = props.data;
  console.log(data);

  return (
    <section className="full-width stripe_9 " >
      <div className="container--md three-col-flex clearfix three-image-block">
        <div className="col mb-4 pr-2 ">

          <img className="borderradius--small" src={`${process.env.REACT_APP_S3_URL}` + data.icon1[0].filename} alt={data.icon1[0].title}/>
          <h4 className="fontSize2 fontMedium mb-0 pb-1">{data.heading1}</h4>

          <p>{data.description1I}</p>

          {(data.link1Text != null && data.linksToOnsite1.length > 0)
            ? <Link className="directionalLink" to={`/${data.linksToOnsite1[0].uri}`}>{data.link1Text} <span className="feather icon-arrow-right"></span></Link>
            : ''
          }
          {(data.link1Text != null && data.linksToOnsite1.length < 1 && data.linksToOffsite1 != null)
            ? <a className="directionalLink" href={`${data.linksToOffsite1}`}>{data.link1Text} <span className="feather icon-arrow-right"></span></a>
            : ''
          }
        </div>

        <div className="col mb-4 pl-2 pr-2 ">

          <img className="borderradius--small" src={`${process.env.REACT_APP_S3_URL}` + data.icon2[0].filename} alt={data.icon2[0].title}/>
          <h4 className="fontSize2 fontMedium mb-0 pb-1">{data.heading2}</h4>

          <p>{data.description2I}</p>

          {(data.link2Text != null && data.linksToOnsite2.length > 0)
            ? <Link className="directionalLink" to={`/${data.linksToOnsite2[0].uri}`}>{data.link2Text} <span className="feather icon-arrow-right"></span></Link>
            : ''
          }
          {(data.link2Text != null && data.linksToOnsite2.length < 2 && data.linksToOffsite2 != null)
            ? <a className="directionalLink" href={`${data.linksToOffsite2}`}>{data.link2Text} <span className="feather icon-arrow-right"></span></a>
            : ''
          }
        </div>

        <div className="col mb-4 pl-2 ">

          <img className="borderradius--small" src={`${process.env.REACT_APP_S3_URL}` + data.icon3[0].filename} alt={data.icon3[0].title}/>
          <h4 className="fontSize2 fontMedium mb-0 pb-1">{data.heading3}</h4>
          <p>{data.description3I}</p>

          {(data.link3Text != null && data.linksToOnsite3.length > 0)
            ? <Link className="directionalLink" to={`/${data.linksToOnsite3[0].uri}`}>{data.link3Text} <span className="feather icon-arrow-right"></span></Link>
            : ''
          }
          {(data.link3Text != null && data.linksToOnsite3.length < 3 && data.linksToOffsite3 != null)
            ? <a className="directionalLink" href={`${data.linksToOffsite3}`}>{data.link3Text} <span className="feather icon-arrow-right"></span></a>
            : ''
          }
        </div>
      </div>

    </section>
  );
};

export default ThreeImage;
