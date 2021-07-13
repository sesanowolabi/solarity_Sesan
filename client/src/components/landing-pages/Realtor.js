import React, { Component } from 'react';

import {Helmet} from "react-helmet";

// apollo
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';

import LandingNav from './../navigation/LandingNav';

class Realtor extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }

  }


  render() {
    const q = gql`
        {
      entries(section:landingPage, slug:"realtor-${this.props.slug}"){
        ...on LandingPageRealtor{
          id
          title
          heading
          description{
            content
          }
          image {
            filename
          }
          realtor2Or3Toggle
          realtorRich1{
            content
          }
          realtorRich2{
            content
          }
          metaTitle
          metaDescription
          metaImage{
            url
          }
          realtorBlocks{
            heading
            description {
              content
            }
            linkText
            linksTo
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

          <div className="landing-page pb-6">

            <Query query={q} >
              {({ loading, error, data }) => {
                //console.log(data);
                if (loading) return '';
                if (error) return '';


                return (
                  <div>
                    {(data.entries) ?

                      <div>
                        <LandingNav isRealtor={true} data={data.globals} showHours={true}/>

                        <Helmet>
                          <meta name="title" content={data.entries[0].metaTitle} />
                          <meta name="description" content={data.entries[0].metaDescription} />
                          <meta name="image" content={`${process.env.REACT_APP_S3_URL}` + data.entries[0].metaImage.url} />
                          <meta property="og:title" content={data.entries[0].metaTitle} />
                          <meta property="og:description" content={data.entries[0].metaDescription} />
                          <meta property="og:image" content={`${process.env.REACT_APP_S3_URL}` + data.entries[0].metaImage.url} />
                          <script type='text/javascript'>
                          {`
                            console.log('preventing default script..');
                            $('.mix-button-1').on('click', function(event){
                              event.preventDefault();
                              console.log('test default prevented');
                              console.log('logging click');
                              var link = $(this).attr('href');
                              var text = $(this).text();

                              mixpanel.track(
                                  "Link clicked then followed - LP",
                                  {
                                    "page": "${this.props.slug}",
                                    "link url": link,
                                    "button text": text,
                                  }
                              );
                              window.location = link;


                            });

                          `}
                          </script>
                        </Helmet>


                        <div className="landing-page-hero" style={{backgroundImage: `url("${process.env.REACT_APP_S3_URL}${data.entries[0].image[0].filename}")`}}>
                          {
                            (data.entries[0].realtor2Or3Toggle)
                            ?
                              <div className="grid full-width landing-top-offset pb-4">
                                <div className="grid1of1">

                                  <Fragment>
                                    <div className="fontSize0 richText white z-helper" dangerouslySetInnerHTML={{__html: data.entries[0].description.content}}></div>
                                  </Fragment>


                                </div>
                                <div className="grid1of2">
                                  <Fragment>
                                    <div className="fontSize0 richText white z-helper" dangerouslySetInnerHTML={{__html: data.entries[0].realtorRich1.content}}></div>
                                  </Fragment>
                                </div>

                                <div className="grid1of2">
                                  <Fragment>
                                    <div className="fontSize0 richText white z-helper" dangerouslySetInnerHTML={{__html: data.entries[0].realtorRich2.content}}></div>
                                  </Fragment>
                                </div>
                              </div>

                            :

                              <div className="grid full-width landing-top-offset">
                                <div className="grid1of2">

                                  <Fragment>
                                    <div className="fontSize0 richText white z-helper" dangerouslySetInnerHTML={{__html: data.entries[0].description.content}}></div>
                                  </Fragment>


                                </div>
                                <div className="grid1of2">
                                  <Fragment>
                                    <div className="fontSize0 richText white z-helper" dangerouslySetInnerHTML={{__html: data.entries[0].realtorRich1.content}}></div>
                                  </Fragment>
                                </div>
                              </div>
                          }

                        </div>

                        <div className="container--md stripe_3 clearfix pb-6">


                          <Helmet>
                            <script type='text/javascript'>
                            {`

                              function updateViewportDimensions() {
                                var w=window,d=document,e=d.documentElement,g=d.getElementsByTagName('body')[0],x=w.innerWidth||e.clientWidth||g.clientWidth,y=w.innerHeight||e.clientHeight||g.clientHeight;
                                return { width:x,height:y };
                              }
                              // setting the viewport width
                              var viewport = updateViewportDimensions();



                              var waitForFinalEvent = (function () {
                                var timers = {};
                                return function (callback, ms, uniqueId) {
                                  if (!uniqueId) { uniqueId = "Don't call this twice without a uniqueId"; }
                                  if (timers[uniqueId]) { clearTimeout (timers[uniqueId]); }
                                  timers[uniqueId] = setTimeout(callback, ms);
                                };
                              })();

                              // how long to wait before deciding the resize has stopped, in ms. Around 50-100 should work ok.
                              var timeToWaitForLast = 100;

                              $(window).resize(function () {

                                  // if we're on the home page, we wait the set amount (in function above) then fire the function
                                  waitForFinalEvent( function() {

                                // update the viewport, in case the window size has changed
                                viewport = updateViewportDimensions();

                                // change the selector and the max width
                                thereCanBeOnlyOneHeight('.match-h2-height',0);
                                  thereCanBeOnlyOneHeight('.match-desc-height',0);



                                  }, timeToWaitForLast, "resize-id");
                              });

                              // onload
                              $(function(){
                                // change the selector and the max width
                                thereCanBeOnlyOneHeight('.match-h2-height',0);
                                  thereCanBeOnlyOneHeight('.match-desc-height',0);

                              });

                              function thereCanBeOnlyOneHeight(these,max){
                                  var the_one = 0;
                              //    console.log(max);
                                  $(these).each(function(){
                                     $(this).css('height', 'auto');
                                      if(viewport.width > max){
                                          the_one = $(this).height() > the_one ? $(this).height() : the_one;
                                      }
                                  });
                                  if(viewport.width > max){
                                      $(these).each(function(){
                                          $(this).height(the_one + 20);
                                      });
                                  }
                              }

                            `}


                            </script>
                          </Helmet>

                          <div className="grid1of2 clearfix pb-4">
                            <div className="inner_2 clearfix">
                              <h2 className="match-h2-height">{data.entries[0].realtorBlocks[0].heading}</h2>
                              <Fragment>
                                <div className="fontSize0 richText match-desc-height" dangerouslySetInnerHTML={{__html: data.entries[0].realtorBlocks[0].description.content}}></div>
                              </Fragment>
                              <a className="button button-primary mix-button-1" href={data.entries[0].realtorBlocks[0].linksTo}>{data.entries[0].realtorBlocks[0].linkText}</a>
                            </div>
                          </div>

                          <div className="grid1of2 clearfix pb-4">
                            <div className="inner_2 clearfix">
                              <h2 className="match-h2-height">{data.entries[0].realtorBlocks[1].heading}</h2>
                              <Fragment>
                                <div className="fontSize0 richText match-desc-height" dangerouslySetInnerHTML={{__html: data.entries[0].realtorBlocks[1].description.content}}></div>
                              </Fragment>
                              <a className="button button-primary mix-button-1" href={data.entries[0].realtorBlocks[1].linksTo}>{data.entries[0].realtorBlocks[1].linkText}</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    :''}
                  </div>
                );
              }}

            </Query>
          </div>
        </div>

    );
  }
}


export default Realtor;
