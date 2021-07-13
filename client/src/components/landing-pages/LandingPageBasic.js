import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import {Helmet} from "react-helmet";
import {isEmpty} from "lodash/isEmpty";

// apollo
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';

import LandingNav from './../navigation/LandingNav';
import PurchaseForm from './forms/PurchaseForm';
import RefinanceForm from './forms/RefinanceForm';
import ConstructionForm from './forms/ConstructionForm';
import PurchaseFormv2 from './forms/PurchaseFormv2';
import Loader from './../loaders/FullPageLoader';

import RatesCalculator from '../ratesCalculator/RatesCalculator';


import HeadlineOverTwoCol from './blocks/HeadlineOverTwoCol';
import LPCards from './blocks/LPCards';
import LPTestimonials from './blocks/LPTestimonials';

// Winter 2020 components
import LPHeader from './blocks/winter20/LPHeader';
import LPReasons from './blocks/winter20/LPReasons';
import LPRateBoxRow from './blocks/winter20/LPRateBoxRow';
import LPRateBoxRowAlt from './blocks/winter20/LPRateBoxRowAlt';
import LPBenefits from './blocks/winter20/LPBenefits';
import LPTestimonialsW20 from './blocks/winter20/LPTestimonialsW20';
import LPCTA from './blocks/winter20/LPCTA';
// import LPRefinancing from './blocks/winter20/LPRefinancing';



class LandingPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeItem: '',
      mobileMenu: '',
      usedCalc: false,
      search: this.props.search,
      clickedScrollRates: false,
      focusFirstFormField: false,
    }

    this.usedCalc = this.usedCalc.bind(this);
    this.handleClickScrollRates = this.handleClickScrollRates.bind(this);
    this.scrollToTop = this.scrollToTop.bind(this);
    this.resetFocus = this.resetFocus.bind(this);

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

  scrollToTop(){
    window.scrollTo(0,0);
    this.setState({focusFirstFormField: true});
  }

  resetFocus(){
    this.setState({focusFirstFormField: false});
  }


  render() {
    
      const q = gql`
      {
        entries(section:landingPage, slug:"${this.props.slug}"){

          ...on LandingPageLandingPageBasic{
            __typename
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
            formType_FieldData{
              selected{
                value
              }
            }
            landingPageContent{
              content
            }
            truemediaTracking{
              content
            }

            facebookPixelPageview
            facebookPixelConversion
          }


          ...on LandingPageLandingPageV2{
            __typename
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
            lpv2HeroRichText{
              content
            }
            heading
            image{
              id
              url(transform: landingPageHero)
              height
              width
              filename
            }
            landingPageMatrix{
              ...on LandingPageMatrixRichText{
                text{
                  content
                }
              }
              ...on LandingPageMatrixHeadlineOverTwoColumns{
                headline
                subHeadline
                richText{
                  content
                }
                testimonialText
                testimonialImage{
                  url
                  title
                  height
                  width
                }
                testimonialAuthor
              }
              ...on LandingPageMatrixCards{
                heading
                buttonText
                buttonLink{
                  uri
                }
                cards{
                  ...on LandingPageCards{
                    cardIcon{
                      title
                      filename
                      title
                      height
                      width
                    }
                    cardText
                  }
                }
              }
              ...on LandingPageMatrixTestimonials{
                testimonials{
                  ...on LandingPageTestimonials{
                    lpTestimonialImage{
                      url
                      title
                      height
                      width
                    }
                    lpTestimonialText
                    lpTestimonialAuthor
                  }
                }
              }
            }

            truemediaTracking{
              content
            }

            facebookPixelPageview
            facebookPixelConversion
            metaTitle
            metaDescription
            metaImage{
              url
            }
          }

          ...on LandingPageLandingPageHybrid{
            __typename
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
          
          ...on LandingPageLPWinter20{
            __typename
            type{
              handle
            }
            id
            title
            slug
            uri
            heading
            landingPageMatrixWinter2020 {
              ...on LandingPageMatrixWinter2020Header {
                __typename
                titleText
                blockContent{
                  content
                }
                applyCTA
                phoneNumber
                phoneNumberLinkable
                heroImage {
                  url
                  id
                  filename
                }
                buttonText
                callText
              }
              ...on LandingPageMatrixWinter2020Reasons {
                __typename
                reasonsTitle
                backgroundColor_FieldData {
                  selected {value}
                }
                reasons {
                  ...on LandingPageReasons {
                    title
                    reasonAsset {
                      filename
                    }
                  }
                }
                rowOrder
              }
              ...on LandingPageMatrixWinter2020RateBoxRow {
                heading
                richText {
                  content
                }
                buttonText
                phoneNumber
                rateHeading
                aboveRateText
                rate
                aprRate
                rateText
                backgroundImage {
                  filename
                }
                rowOrder
              }
              ...on LandingPageMatrixWinter2020RateBoxRowAlt {
                heading
                richText {
                  content
                }
                rateHeading
                rateSubtext
                mainRate
                mainApr
                rate2Header
                rate2Text
                rate3Header
                rate3Text
                buttonText
                phoneNumber
                backgroundImage {
                  filename
                }
              }
              ...on LandingPageMatrixWinter2020Benefits {
                headerText
                subheaderText
                benefit {
                  ...on LandingPageBenefits {
                    title
                    benefitTitle
                    benefitContent
                    benefitAsset {
                      filename
                    }
                  }
                }
                backgroundColor_FieldData {
                  selected {
                    value
                  }
                }
                rowOrder
              }
              ...on LandingPageMatrixWinter2020Testimonials{
                testimonials{
                  ...on LandingPageTestimonials{
                    lpTestimonialImage{
                      filename
                      url
                    }
                    lpTestimonialText
                    lpTestimonialAuthor
                  }
                }
                testimonialBackgroundColor
              }
              ...on LandingPageMatrixWinter2020FormContent {
                heading
                subheading
                richText {
                  content
                }
                backgroundImage {
                  filename
                }
                formHeading
                formSubheading
                formBackgroundColor
                rowOrder
              }
              ...on LandingPageMatrixWinter2020Disclosures {
                disclosuresText {
                  content
                }
              }
              ...on LandingPageMatrixWinter2020LandingCTA {
                ctaTextBold
                ctaTextRegular
                ctaButtonText
                ctaLink
                rowBackgroundColor
                rowOrder
              }
  
            }

            metaTitle
            metaDescription
            metaImage{
              url
            }
            trackingScripts
            trackingScriptsHead
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
        <Fragment>

              <Query query={q} >
                {({ loading, error, data }) => {
                  
                  if (loading) return <Loader />;
                  if (error) return <Redirect to={'/notFound'}/>;
                  if (data.entries.length === 0) return <Redirect to={'/notFound'}/>;



                  console.log(data);
                  //the following return statement is used if the landing page type is v2
                  if (data.entries[0].__typename === 'LandingPageLandingPageV2') {
                    return (

                      <div className="landing-page ">
                      {(data.entries.length > 0) ?

                        <div className="lp-v2">
                          <div className="hero-v2" style={{backgroundImage: `url("${process.env.REACT_APP_S3_URL}${data.entries[0].image[0].filename}")`}}>
                            <div className="lp-v2-bg"></div>
                            <div className="grid">
                              <div className="full-width text-center">
                                <img className="logo-v2" src="/img/logo.svg" alt="Solarity Credit Union"/>
                                <h3 className="colorBrandSecondary fontSize3">{data.entries[0].heading}</h3>
                              </div>
                            </div>
                            <div className="grid">
                              <div className="mt-3 ">
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


                                    {
                                      (data.entries[0].facebookPixelPageview !== null)
                                      ?
                                        <script>
                                          {`
                                            ${data.entries[0].facebookPixelPageview}

                                          `}
                                        </script>
                                      :
                                        ''

                                    }



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

                              </div>
                              <div className="grid1of2">
                                <div className="pr-2 pl-2" dangerouslySetInnerHTML={{__html: data.entries[0].lpv2HeroRichText.content}}></div>
                              </div>
                              <div className="grid1of2">
                                <PurchaseFormv2 queryString={this.props.queryString} usedCalc={this.state.usedCalc} resetFocus={this.resetFocus} focusFirstFormField={this.state.focusFirstFormField} clickedScrollRates={this.state.clickedScrollRates} submitPixel={data.entries[0].facebookPixelConversion} successTag={(data.entries[0].truemediaTracking !== null) ? data.entries[0].truemediaTracking.content : ""}/>


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
                                    <h3 className="pb-0 mb-0 colorBrandSecondary fontSize1">Speak with a Home Loan Guide</h3>
                                    <a className="colorBrandSecondary fontSize3 fontMedium pb-1 pt-0 mt-0 landing-nav-phone" href={"tel:"+data.globals.landingPageNav.outboundLink}>{data.globals.landingPageNav.outboundLink}</a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          {data.entries[0].landingPageMatrix.map((item, ind)=>{
                            console.log(item);
                            if (item.__typename === 'LandingPageMatrixRichText') {
                              return(
                                <div key={`landingpagematrix-${ind}`} className="fontSize0 container--sm inner_1 clearfix " dangerouslySetInnerHTML={{__html: item.text.content}}></div>
                              );
                            }
                            else if (item.__typename === 'LandingPageMatrixHeadlineOverTwoColumns') {
                              return(
                                <HeadlineOverTwoCol key={`landingpagematrix-${ind}`} data={item}/>
                              );
                            }
                            else if (item.__typename === 'LandingPageMatrixCards') {
                              return(
                                <LPCards key={`landingpagematrix-${ind}`} data={item} scrollToTop={this.scrollToTop}/>
                              );
                            }
                            else if (item.__typename === 'LandingPageMatrixTestimonials') {
                              return(
                                <LPTestimonials key={`landingpagematrix-${ind}`} data={item}/>
                              );
                            }
                            else{
                              return('');
                            }
                          })}

                        </div>
                      : <Redirect to={'/notFound'}/>}
                    </div>

                    );
                  } else if(data.entries[0].__typename === 'LandingPageLPWinter20') {
                    return (

                      <div className="landing-page">
                      {(data.entries.length > 0) ?

                        <div className="lp-winter20">
                          {
                            (data.entries[0].trackingScripts !== null)
                            ?
                              <div dangerouslySetInnerHTML={{__html: data.entries[0].trackingScripts}} />
                            :
                              ''
                          }

                          <div className="hero-v2">
                            <div>
                              <div className="full-width text-center w20-header">
                                <a href="/">
                                  <img className="logo-v2" src="/img/logo.svg" alt="Solarity Credit Union"/>
                                </a>
                                <h3 className="colorBrandSecondary fontSize3 w20-headerText">{data.entries[0].heading}</h3>
                              </div>
                              <div>
                                <Fragment>

                                  <Helmet>
                                    <meta name="title" content={data.entries[0].metaTitle} />
                                    <meta name="description" content={data.entries[0].metaDescription} />
                                    <meta name="image" content={`${process.env.REACT_APP_S3_URL}` + data.entries[0].metaImage.url} />
                                    <meta property="og:title" content={data.entries[0].metaTitle} />
                                    <meta property="og:description" content={data.entries[0].metaDescription} />
                                    <meta property="og:image" content={`${process.env.REACT_APP_S3_URL}` + data.entries[0].metaImage.url} />
                                  
                                    {
                                      (data.entries[0].trackingScriptsHead !== null)
                                      ?
                                      <script type="text/javascript" 
                                      src={`${data.entries[0].trackingScriptsHead}`}
                                      async="async">
                                      </script>
                                      :
                                        ''
                                    }

                                  </Helmet>

                                </Fragment>
                              </div>
                            </div>
                          </div>

                          {/* Content */}

                          {data.entries[0].landingPageMatrixWinter2020.map((item, ind)=>{

                            if (item.__typename === 'LandingPageMatrixWinter2020Header') {
                              return(
                                <LPHeader key={`landingpagematrix-${ind}`} data={item} />
                              );
                            } else if (item.__typename === 'LandingPageMatrixWinter2020Reasons') {
                              return(
                                <LPReasons key={`landingpagematrix-${ind}`} data={item} />
                              );
                            } else if (item.__typename === 'LandingPageMatrixWinter2020RateBoxRow') {
                              return(
                                <LPRateBoxRow key={`landingpagematrix-${ind}`} data={item} />
                              );
                            } else if (item.__typename === 'LandingPageMatrixWinter2020RateBoxRowAlt') {
                              return(
                                <LPRateBoxRowAlt key={`landingpagematrix-${ind}`} data={item} />
                              );
                            } else if (item.__typename === 'LandingPageMatrixWinter2020Benefits') {
                              return(
                                <LPBenefits key={`landingpagematrix-${ind}`} data={item} />
                              );
                            } else if (item.__typename === 'LandingPageMatrixWinter2020Testimonials') {
                              return(
                                <LPTestimonialsW20 key={`landingpagematrix-${ind}`} data={item} />
                              );
                            } else if (item.__typename === 'LandingPageMatrixWinter2020FormContent') {
                              return(
                                <div className="full-width form-row" style={{backgroundImage: `url("${process.env.REACT_APP_S3_URL}${item.backgroundImage[0].filename}")`}} key={`landingpagematrix-${ind}`}>
                                  <div className="grid clearfix">
                                    <div className="grid1of2">
                                      <h2 className="text-blue">{item.heading}</h2>
                                      <h3><strong>{item.subheading}</strong></h3>
                                      <div dangerouslySetInnerHTML={{__html: item.richText.content}} />
                                    </div>

                                    <div className="grid1of2 formBox">
                                      <a name="form" />
                                      <div className={`form-container background-` + item.formBackgroundColor}>
                                        <h3><strong>{item.formHeading}</strong></h3>
                                        <p>{item.formSubheading}</p>
                                        <PurchaseFormv2 queryString={this.props.queryString} usedCalc={this.state.usedCalc} resetFocus={this.resetFocus} focusFirstFormField={this.state.focusFirstFormField} clickedScrollRates={this.state.clickedScrollRates} submitPixel={data.entries[0].facebookPixelConversion}/>
                                      </div>
                                    </div>

                                  </div>
                                </div>
                              );
                            } else if (item.__typename === 'LandingPageMatrixWinter2020Disclosures') {
                              return(
                                <div className="grid disclosures-row" key={`landingpagematrix-${ind}`}>
                                  <div className="container--lg inner_1 clearfix">
                                    <div dangerouslySetInnerHTML={{__html: item.disclosuresText.content}} />
                                  </div>
                                </div>
                              );
                            } else if (item.__typename === 'LandingPageMatrixWinter2020LandingCTA') {
                              return(
                                <LPCTA key={`landingpagematrix-${ind}`} data={item} />
                              );
                            } else {
                              return (
                                <p>&nbsp;</p>
                              );
                            }
                            
                          })}



                        </div>
                      : <Redirect to={'/notFound'}/>}
                    </div>

                    );
                  }

                  //the below is only used if the landing page type is not v2
                  return (
                    <div className="offsetNav">

                      <div className="landing-page pb-6">
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


                                  {
                                    (data.entries[0].facebookPixelPageview !== null)
                                    ?
                                      <script>
                                        {`
                                          ${data.entries[0].facebookPixelPageview}

                                        `}
                                      </script>
                                    :
                                      ''

                                  }



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
                            <PurchaseFormv2 queryString={this.props.queryString} usedCalc={this.state.usedCalc} resetFocus={this.resetFocus} focusFirstFormField={this.state.focusFirstFormField} clickedScrollRates={this.state.clickedScrollRates} submitPixel={data.entries[0].facebookPixelConversion} successTag={(data.entries[0].truemediaTracking !== null) ? data.entries[0].truemediaTracking.content : ""}/>

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
                                  <a className="colorBrandSecondary fontSize2 fontMedium pb-1 landing-nav-phone" href={"tel:"+data.globals.landingPageNav.outboundLink}>{data.globals.landingPageNav.outboundLink}</a>
                                </div>
                                <div className="pb-1" dangerouslySetInnerHTML={{__html: data.globals.landingPageNav.description.content}}></div>
                              </div>
                            </div>
                          </div>

                        </div>
                      : <Redirect to={'/notFound'}/>}
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
                    </div>

                  );
                }}

              </Query>

            <img src='https://rdcdn.com/rt?aid=17546&e=1&img=1' height='1' width='1' alt="Pixel"/>
          </Fragment>

      );
  }
}


export default LandingPage;
