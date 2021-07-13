import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import {Helmet} from "react-helmet";

// apollo
import { gql } from 'apollo-boost';

import { Query } from 'react-apollo';



import LandingNavRates from './../navigation/LandingNavRates';
import PurchaseForm from './forms/PurchaseForm';
import RefinanceForm from './forms/RefinanceForm';
import ConstructionForm from './forms/ConstructionForm';
import Loader from './../loaders/FullPageLoader';

import RatesCalculator from '../ratesCalculator/RatesCalculator';



class LandingPageRates extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeItem: '',
      mobileMenu: '',
      usedCalc: false,
      search: this.props.search,
      clickedScrollForm: false,
    }

    this.usedCalc = this.usedCalc.bind(this);
    this.handleClickScrollForm = this.handleClickScrollForm.bind(this);

  }

  componentDidMount(){
    //console.log('%c ' + this.props.slug, 'background: #fff; color: red');

  }

  usedCalc(){
    this.setState({
      usedCalc: true,
    })
  }

  handleClickScrollForm(){
    this.setState({
      clickedScrollForm: true,
    })
  }



  render() {
    const q = gql`
    {
      entries(section:landingPage, slug:"${this.props.market}-rates"){
        ...on LandingPageLandingPageRates{
          type{
            handle
          }
          id
          title
          slug
          uri
          heading
          description{
            content
          }
          image{
            id
            url(transform: landingPageHero)
            height
            width
            filename
          }
          truemediaTracking{
            content
          }
          formType
          ctaHeading
          ctaDescription
        }
      }
      globals{
        landingPageNav{
          outboundLink
          description {
            content
          }
        }
      }
    }

    `;

    const Fragment = React.Fragment;

    return (
    	<div className="offsetNav">

          <div className="pb-6">

            <Query query={q} >
              {({ loading, error, data }) => {

                if (loading) return <Loader />;
                if (error) return '';


                return (
                  <div>
                    {(data.entries.length > 0) ?

                      <div>
                        


                        <div className="landing-page-hero" style={{backgroundImage: `url("${process.env.REACT_APP_S3_URL}${data.entries[0].image[0].filename}")`}}>
                          <div className="grid">
                            <div className="grid7of12 stripe_12 mb-6 ">
                              <h1 className="rates-override mb-0">{data.entries[0].heading}</h1>
                              <div className="fontSize0 white block" style={{zIndex: 1}} dangerouslySetInnerHTML={{__html: data.entries[0].description.content}}></div>
                            </div>
                          </div>
                        </div>



                            <Fragment>
                              <Helmet>
                                <meta name="title" content={data.entries[0].title} />
                                <script type="text/javascript">
                                {`
                                    ttd_dom_ready( function() {
                                        if (typeof TTDUniversalPixelApi === 'function') {
                                            var universalPixelApi = new TTDUniversalPixelApi();
                                            universalPixelApi.init("s7216pn", ["nogetv4"], "https://insight.adsrvr.org/track/up");
                                        }
                                    });
                                `}
                                </script>
                              </Helmet>


                            </Fragment>




                          <div className="full-width rates-gray-background stripe_8">
                            <RatesCalculator
                              market={this.props.market}
                              slug={data.entries[0].formType}
                              usedCalc={this.usedCalc}
                              queryString={this.props.queryString}
                              clickedScrollForm={this.state.clickedScrollForm}
                            />
                          </div>
                          {console.log(this.props.market)}
                          <div id="get-started-form" className="container--sm stripe_8">
                            <h2 className="fontSize4 inner_2 ">{data.entries[0].ctaHeading}</h2>
                            <p className="fontRegular fontSize0 pb-4 inner_2 ">{data.entries[0].ctaDescription}</p>

                              {(data.entries[0].formType === 'refinance') ? <RefinanceForm queryString={this.props.queryString} usedCalc={this.state.usedCalc} clickedScrollForm={this.state.clickedScrollForm} successTag={data.entries[0].truemediaTracking.content}/> : ""}
                              {(data.entries[0].formType === 'purchase') ? <PurchaseForm queryString={this.props.queryString} usedCalc={this.state.usedCalc} clickedScrollForm={this.state.clickedScrollForm} successTag={data.entries[0].truemediaTracking.content}/> : ""}
                              {(data.entries[0].formType === 'construction') ? <ConstructionForm queryString={this.props.queryString} usedCalc={this.state.usedCalc} clickedScrollForm={this.state.clickedScrollForm} successTag={data.entries[0].truemediaTracking.content}/> : ""}

                          </div>
                      </div>
                    : <Redirect to={'/notFound'}/>}
                  </div>
                );
              }}

            </Query>
          </div>

          <img src='https://rdcdn.com/rt?aid=17546&e=1&img=1' height='1' width='1' alt="Pixel"/>
        </div>

    );
  }
}


export default LandingPageRates;
