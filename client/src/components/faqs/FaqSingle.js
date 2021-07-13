import React, { Component } from 'react';

import { Link, Redirect } from 'react-router-dom';

import {Helmet} from "react-helmet";

import metaQuery from '../querys/MetaQuery.js';

import FullPageLoader from '../loaders/FullPageLoader';

// apollo

import ApolloClient, { gql } from 'apollo-boost';

class FaqSingle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
      heading: '',
      description: '',
      loading: true,
      found: true,
      related: [],
    }
  }

  componentDidUpdate(prevProps, prevState) {

      if(this.props.slug && this.props.slug !== prevProps.slug){
        const faq = gql`
          {
            entry(slug:"${this.props.slug}"){
              ...on Faqs{
                id
                title
                heading
                description{
                  content
                }
                relatedContent{
                  uri
                  title
                }
              }
            }
          }
        `;

        // Get the preview token from the URL
        let m = document.location.href.match(/\btoken=([^&]+)/);
        let token = m ? m[1] : '';
        // Then forward that on whenever you are sending a CraftQL API request
        let url = `graph-api?token=${token}`;
        const client = new ApolloClient({
          uri: `${process.env.REACT_APP_BASE_URL}${url}`,
          request: operation => {
            operation.setContext({
              headers: {
                Authorization: `bearer ${process.env.REACT_APP_GRAPH_TOKEN}`,
              },
            });
          },
        });

        client
          .query({
            query: faq,
          })
          .then(response => {
            if(response.data.entry === null){
              this.setState({
                found: false,
              });
            } else {
              this.setState({
                heading: response.data.entry.heading,
                description: response.data.entry.description != null ? response.data.entry.description.content : '',
                related: response.data.entry.relatedContent,
                loading: false,
              });
            }
          });
      }
  }

  componentDidMount(){

    if(this.props.slug){
      const faq = gql`
        {
          entry(section:faqs, slug:"${this.props.slug}"){
            title
            ...on Faqs{
              ${metaQuery.metaQuery}
              id
              title
              heading
              description{
                content
              }
              relatedContent{
                uri
                title
              }
            }
          }
        }
      `;

      // Get the preview token from the URL
      let m = document.location.href.match(/\btoken=([^&]+)/);
      let token = m ? m[1] : '';

      // Then forward that on whenever you are sending a CraftQL API request
      let url = `graph-api?token=${token}`;

      const client = new ApolloClient({
        uri: `${process.env.REACT_APP_BASE_URL}${url}`,
        request: operation => {
          operation.setContext({
            headers: {
              Authorization: `bearer ${process.env.REACT_APP_GRAPH_TOKEN}`,
            },
          });
        },
      });

      client
        .query({
          query: faq,
        })
        .then(response => {
          if(response.data.entry === null){
            this.setState({
              found: false,
            });
          } else {
            this.setState({
              metaInfo: {title:response.data.entry.metaTitle, description:response.data.entry.metaDescription, image:response.data.entry.metaImage, url:response.data.entry.url},
              heading: response.data.entry.heading,
              description: response.data.entry.description != null ? response.data.entry.description.content : '',
              related: response.data.entry.relatedContent,
              loading: false,
            });
          }
        });
    }


  }



  render() {
    let heading = this.state.heading;
    let description = this.state.description;
    let cats = this.props.cats;

    if (!this.state.found) {
      return (<Redirect to={'/not-found'} />);
    }

    return (
      <div>
        {
          (this.state.loading === false)
          ?
            <React.Fragment>
              <Helmet>
                <script type='text/javascript'>
                {`
                  //console.log('%c testing log in script tag', 'background: #222; color: #bada55');
                  //console.log('%c testing another log...', 'background: #222; color: #bada55');

                  function regClick(){
                    //console.log('register a click');
                    $('.manual-modal-click').remove();
                  }

                  $('.offsite-link-inline').on('click', function(event){
                    event.preventDefault();
                    //console.log('default prevented');
                    //console.log('logging click');
                    //console.log($(this).attr('href'));
                    var link = $(this).attr('href');

                    $('body').append('<div class="manual-modal-click" style="position: fixed; top: 0px; left: 0px; right: 0px; bottom: 0px; background-color: rgba(255, 255, 255, 0.75);"><div class="" aria-label="Offsite Speedbump modal" style="position: absolute; top: 50%; left: 50%; right: auto; bottom: auto; border: 1px solid rgb(204, 204, 204); background: rgb(255, 255, 255); overflow: auto; border-radius: 4px; outline: none; padding: 20px; margin-right: -50%; transform: translate(-50%, -50%);"><div class="this-will-be-outer-modal-holder speedbump-modal-outer align-center text-center"><div class="fontSize1 fontMedium">External Link Disclaimer</div><div class="pb-2 fontSize0">Solarity Credit Union has no control over information at any site hyperlinked to or from this Site. Solarity Credit Union makes no representation concerning and is not responsible for the quality, content, nature, or reliability of any hyperlinked site and is providing this hyperlink to you only as a convenience. The inclusion of any hyperlink does not imply any endorsement, investigation, verification or monitoring by Solarity Credit Union of any information in any hyperlinked site. In no event shall Solarity Credit Union be responsible for your use of a hyperlinked site. Solarity’s privacy policy does not apply to linked websites.</div><button onClick="regClick()" class="button ml-2">Go Back</button><a href="' + $(this).attr('href') + '" class="button button-primary ml-2">Continue</a></div></div></div>');

                  });

                `}
                </script>
              </Helmet>
              {
               (this.state.metaInfo.image.length > 0)
               ?
                 <Helmet>
                   <title>{this.state.metaInfo.title}</title>
                   <meta name="description" content={this.state.metaInfo.description}/>
                   <meta property="og:title" content={this.state.metaInfo.title} />
                   <meta property="og:type" content="website" />
                   <meta property="og:url" content={this.state.metaInfo.url} />
                   <meta property="og:image" content={this.state.metaInfo.image[0].url} />
                   <link rel="canonical" href={this.state.metaInfo.url} />

                 </Helmet>
               :
                 <Helmet>
                   <title>{this.state.metaInfo.title}</title>
                   <meta name="description" content={this.state.metaInfo.description}/>
                   <meta property="og:title" content={this.state.metaInfo.title} />
                   <meta property="og:type" content="website" />
                   <meta property="og:url" content={this.state.metaInfo.url} />
                   <link rel="canonical" href={this.state.metaInfo.url} />
                 </Helmet>

              }
              <div className="offsetNav container--md">
                <div className="faq-single-inner">
                  <div className="faq-single-column1">
                    <ul className="faq-category-nav">
                      {Object.keys(cats || {}).map((d, index) => {
                        return(
                          <li key={'cat'+index} className="faq-category-item">
                            <Link className="fontSize0 link-hover colorBrandSecondary mb-1" to={`/${cats[index].uri}`} >{cats[index].title}</Link>
                          </li>
                        );
                      })}


                    </ul>
                  </div>
                  <div className="faq-single-column2">
                    <h1 className="faq-single-title fontSize4">{heading}</h1>
                    <div className="fontSize0" dangerouslySetInnerHTML={{__html: description}}></div>
                    {/*<div className="related-entries">
                      Related entries will go here...
                    </div>*/}
                  </div>
                  {/*<div className="faq-single-column3">
                    <p>
                      Questions?
                    </p>
                    <p>
                      Phone number, call center hours, live chat link.
                    </p>
                  </div>*/}

                </div>

              </div>


                {
                  (this.state.related.length > 0)
                  ?
                    <div className="flex grey2 related-articles">

                        {(this.state.related.length !== 0) ?
                          <div className="grid pt-6 pb-6 text-center">
                          <p className="text-left fontSize4 fontBold colorBrandSecondary mb-0 mt-0">Related Articles</p>
                          <div className="flex flex-wrap">
                          {this.state.related.map((item, index) => {
                            return(
                              <Link to={`/${item.uri}`} key={index} className="grid1of3 pb-2 rel-article-card bg-white borderradius--large">

                                <p className="pt-1 pb-1 pr-1 pl-1 fontSize2">{item.title}</p>
                              </Link>
                            )
                          })}
                        </div>
                      </div>
                      : ''
                        }

                    </div>

                  : ""
                }
            </React.Fragment>

          :
            <FullPageLoader />


        }



      </div>
    );
  }
}



export default FaqSingle;
