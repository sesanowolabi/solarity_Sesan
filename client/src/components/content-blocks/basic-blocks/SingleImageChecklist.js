import React from 'react';
import DirectionalLink from './../elements/DirectionalLink';

const SingleImageChecklist = props => {
  const data = props.data;
  //console.log(data)
  return (
    <section className="full-width stripe_9 ">
      <div className="container--md distribute two-col-flex distribute-center clearfix">
        <div className="col ">
          <div className="full-width clearfix pb-2">
            <img className="borderradius--large" src={data.image[0].transform_url} alt={data.image[0].title} />
          </div>
        </div>
        <div className="col ">
          <div className="pl-4 clearfix">
            {(data.label) ?
              <span className="fontSize0 fontMedium uppercase pb-2 block">{data.label}</span>
              :''
            }
            <h3 className="fontSize4 mb-1 mt-0 pb-1 fontBold">{data.heading}</h3>
            <ul className="checklist">
              {data.checklist.map((block, index) => {
                return (
                  <li className="checklist--item clearfix" key={index}>
                    <div className="checklist--item_icon"></div>
                    <div className="checklist--item_content">{block.listItemText}</div>
                  </li>
                );
              })}
            </ul>

            {/* <Link className="button button-primary" to={`/${data.linksTo}`}>{data.buttonText}</Link>*/}

            {(data.linksToOffsite != null || data.linksToOnsite.length > 0)
              ? <DirectionalLink data={data} />
              : ''
            }
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingleImageChecklist;
