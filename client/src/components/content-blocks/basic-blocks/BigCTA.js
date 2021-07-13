import React from 'react';
import CTAbutton from './../elements/CTAbutton';

const BigCTA = props => {
  const data = props.data;
  return (
    <div className="full-width stripe_9 clearfix">
      <div className="pb-6 text-center inner_2 ">
        <h2 className="fontSize4 mb-1 mt-0 pb-1 fontBold">{data.heading}</h2>
        <p className="align-center pb-4 fontSize0">{data.description}</p>
        {/*<Link className="button button-primary mb-4" to={`/${data.linksTo}`}>{data.buttonText}</Link>*/}

        {(data.linksToOffsite || data.linksToOnsite)
          ? <CTAbutton data={data} />
          : ''
        }

        <div className="row-centered block pt-4">
          <div className="col-centered">

            <a className="pb-1 link-hover colorBrandSecondary inline-block" href={'tel:' + data.phoneNumber} target="_blank" rel="noopener">
              <div className="distribute distribute-center flex">
                <span className="feather fontSize3 icon-phone-call pr-1 inline-block"></span>
                <div>{data.phoneNumber}</div>
              </div>
            </a>

            
          </div>
        </div>


      </div>
    </div>
  );
};

export default BigCTA;
