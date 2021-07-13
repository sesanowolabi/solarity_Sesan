import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import {Helmet} from "react-helmet";

// apollo
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';

import LandingNav from './../navigation/LandingNav';
import PurchaseForm from './forms/PurchaseForm';
import RefinanceForm from './forms/RefinanceForm';
import ConstructionForm from './forms/ConstructionForm';
import Loader from './../loaders/FullPageLoader';

import RatesCalculator from '../ratesCalculator/RatesCalculator';

class LandingPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeItem: '',
      mobileMenu: '',
      usedCalc: false,
      search: this.props.search,
      clickedScrollRates: false,
    }

    this.usedCalc = this.usedCalc.bind(this);
    this.handleClickScrollRates = this.handleClickScrollRates.bind(this);

  }

  componentDidMount(){
    //console.log('%c ' + this.props.slug, 'background: #fff; color: red');
  }

  usedCalc(){
    this.setState({
      usedCalc: true,
    })
  }

  handleClickScrollRates(){
    this.setState({
      clickedScrollRates: true,
    })
  }



  render() {
    const q = gql`
    {
      entries(section:landingPage, slug:"${this.props.slug}-${this.props.market}"){
        ...on LandingPageLandingPageBasic{
          type{
            handle
          }
          id
          title
          slug
          uri
          market{
            title
            uri
          }
          heading
          image{
            id
            url(transform: landingPageHero)
            height
            width
            filename
          }
          metaTitle
          metaDescription
          metaImage{
            url
          }
          formType
          landingPageContent{
            content
          }
          truemediaTracking{
            content
          }
        }

        ...on LandingPageLandingPageHybrid{
          type{
            handle
          }
          id
          title
          slug
          uri
          market{
            title
            uri
          }
          heading
          image{
            id
            url(transform: landingPageHero)
            height
            width
            filename
          }
          metaTitle
          metaDescription
          metaImage{
            url
          }
          formType
          landingPageContent{
            content
          }
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
      {
        (this.props.slug === 'refinance' && (this.props.market === 'vancouver' || this.props.market === 'yakima' || this.props.market === 'tri-cities') )
        ?
          <Helmet>

            <script>
            {`

              !function(f,b,e,v,n,t,s)



              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?



              n.callMethod.apply(n,arguments):n.queue.push(arguments)};



              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';



              n.queue=[];t=b.createElement(e);t.async=!0;



              t.src=v;s=b.getElementsByTagName(e)[0];



              s.parentNode.insertBefore(t,s)}(window,document,'script',



              'https://connect.facebook.net/en_US/fbevents.js');



              fbq('init', '1063178910439164');



              fbq('track', 'PageView');
            `}
            </script>
            <noscript>
            {`
              <img height="1" width="1" src="https://www.facebook.com/tr?id=1063178910439164&ev=PageView&noscript=1"/>
            `}
            </noscript>

          </Helmet>

        :
          ''
      }


          <div className="landing-page pb-6">

            <Query query={q} >
              {({ loading, error, data }) => {

                if (loading) return <Loader />;
                if (error) return '';


                return (
                  <div>
                    {(data.entries.length > 0) ?

                      <div>


                        <LandingNav
                          data={data.globals}
                          showHours={false}
                          usedCalc={this.state.usedCalc}
                          queryString={this.props.queryString}
                          handleClickScrollRates={this.handleClickScrollRates}
                          clickedScrollRates={this.state.clickedScrollRates}
                        />


                        <div className="landing-page-hero" style={{backgroundImage: `url("${process.env.REACT_APP_S3_URL}${data.entries[0].image[0].filename}")`}}>
                          <div className="grid">
                            <div className="grid7of12">
                              <h1>{data.entries[0].heading}</h1>
                            </div>
                          </div>
                        </div>

                        <div className="grid">
                          <div className="grid1of2 mt-3">
                            <Fragment>

                              <Helmet>
                                <meta name="title" content={data.entries[0].metaTitle} />
                                <meta name="description" content={data.entries[0].metaDescription} />
                                <meta name="image" content={`${process.env.REACT_APP_S3_URL}` + data.entries[0].metaImage.url} />
                                <meta property="og:title" content={data.entries[0].metaTitle} />
                                <meta property="og:description" content={data.entries[0].metaDescription} />
                                <meta property="og:image" content={`${process.env.REACT_APP_S3_URL}` + data.entries[0].metaImage.url} />
                                <script type='text/javascript'>
                                {`
                                  //console.log('preventing default script..');
                                  $('.landing-link-track').on('click', function(event){
                                    event.preventDefault();
                                    //console.log('test default prevented');
                                    //console.log('logging click');
                                    var link = $(this).attr('href');
                                    var text = $(this).text();

                                    mixpanel.track(
                                        "Link clicked then followed - LP",
                                        {
                                          "page": "${this.props.slug}",
                                          "link url": link,
                                          "usedCalculator": "${this.state.usedCalc}",
                                          "button text": text,
                                        }
                                    );
                                    window.location = link;


                                  });




                                `}
                                </script>



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
                              <div className="fontSize0" dangerouslySetInnerHTML={{__html: data.entries[0].landingPageContent.content}}></div>

                            </Fragment>
                            {//(data.entries[0].type.handle === 'landingPageHybrid') ? <LandingPageHybrid slug={`${this.props.slug}-${this.props.market}`} /> : ""
                            }
                          </div>

                          <div className="grid1of2">
                          {(data.entries[0].formType === 'refinance') ? <RefinanceForm queryString={this.props.queryString} usedCalc={this.state.usedCalc} clickedScrollRates={this.state.clickedScrollRates} successTag={data.entries[0].truemediaTracking.content}/> : ""}
                          {(data.entries[0].formType === 'purchase') ? <PurchaseForm queryString={this.props.queryString} usedCalc={this.state.usedCalc} clickedScrollRates={this.state.clickedScrollRates} successTag={data.entries[0].truemediaTracking.content}/> : ""}
                          {(data.entries[0].formType === 'construction') ? <ConstructionForm queryString={this.props.queryString} usedCalc={this.state.usedCalc} clickedScrollRates={this.state.clickedScrollRates} successTag={data.entries[0].truemediaTracking.content}/> : ""}


                            <div className="inner_3 land-phone">
                              <div>
                                <Helmet>
                                  <script type='text/javascript'>
                                  {`
                                    //console.log('preventing default script..');
                                    $('.landing-nav-phone').on('click', function(event){
                                      event.preventDefault();
                                      //console.log('test default prevented');
                                      //console.log('logging click');
                                      var link = $(this).attr('href');
                                      var text = $(this).text();

                                      mixpanel.track(
                                          "Landing page contact phone clicked - LP",
                                          {
                                            "link url": link,
                                            "button text": text,
                                            "usedCalculator": "${this.state.usedCalc}",
                                          }
                                      );
                                      window.location = link;


                                    });

                                  `}
                                  </script>
                                </Helmet>
                              </div>
                              <a className="colorBrandSecondary fontSize2 fontMedium pb-1 landing-nav-phone" href={"tel:"+data.globals.landingPageNav.outboundLink}>{data.globals.landingPageNav.outboundLink}</a>
                              <div className="pb-1" dangerouslySetInnerHTML={{__html: data.globals.landingPageNav.description.content}}></div>
                            </div>
                          </div>
                        </div>

                      </div>
                    : <Redirect to={'/notFound'}/>}
                  </div>
                );
              }}

            </Query>
          </div>

          <div id="calc" className="full-width rates-gray-background stripe_8">
            <RatesCalculator
              market={this.props.market}

              slug={this.props.slug}
              usedCalc={this.usedCalc}
              queryString={this.props.queryString}
              clickedScrollRates={this.state.clickedScrollRates}
            />

          </div>
          <img src='https://rdcdn.com/rt?aid=17546&e=1&img=1' height='1' width='1' alt="Pixel"/>
        </div>

    );
  }
}


export default LandingPage;
