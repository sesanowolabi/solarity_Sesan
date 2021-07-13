import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import axios from 'axios';

import {Helmet} from "react-helmet";
import mixpanel from 'mixpanel-browser';

// apollo

import { gql } from 'apollo-boost';

import { Query } from 'react-apollo';

import BasicBlocks from './../content-blocks/basic-blocks/BasicBlocks';
import Hero from './../content-blocks/hero/Hero';
import RelatedArticles from './RelatedArticles';
import StarRating from './StarRating';

import FullPageLoader from './../loaders/FullPageLoader';

//graphql query parts
import basicBlocksQuery from '../querys/BasicBlocks.js';
import heroQuery from '../querys/HeroQuery.js';
import metaQuery from '../querys/MetaQuery.js';


class BlogSingle extends Component {
  constructor(props) {
      super(props);
      this.state = {
        data: '',
        loading: true,
        found: true,
        title: ''
      }
      this.shareFacebook = this.shareFacebook.bind(this);
      this.shareTwitter = this.shareTwitter.bind(this);
      this.shareLinkedin = this.shareLinkedin.bind(this);
      this.mailToLink = this.mailToLink.bind(this);
  };

  componentDidUpdate(prevProps, prevState) {


      if (this.props.slug && this.props.slug !== prevProps.slug) {
        axios.get(`${process.env.REACT_APP_BASE_URL}/blog/`+this.props.slug+'.json').then(res => {
          if(res) {
           this.setState({data: res.data.data, hero: res.data.data[0].hero, basicBlocks: res.data.data[0].basicBlocks, loading: false});
           console.log(res.data.data)
          }
        })
        .catch(error => {
          this.setState({
            found: false,
          });
        });
      }
  }

  componentWillMount(){

    const headers = {headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json; charset=utf-8',
      }};

    var string = window.location.href,
      substring = "draftId";

      if (string.indexOf(substring) > 0 ) {
        //console.log('%c This is a draft! ', 'background: #222; color: #bada55');

        var draftId = string.split("draftId=");
        //console.log(draftId);

        axios.get(`${process.env.REACT_APP_BASE_URL}/basic-draft?draftId=`+draftId[1], headers).then(res => {
          if(res) {
           this.setState({data: res.data, hero: res.data.hero, basicBlocks: res.data.basicBlocks, loading: false});
           //console.log('logging response');
           //console.log(res);
          }
        })
        .catch(error => {
          this.setState({
            found: false,
          });
        });
      }
      else{

        //console.log('%c This is not a draft', 'background: #222; color: blue');
        axios.get(`${process.env.REACT_APP_BASE_URL}/blog/`+this.props.slug+'.json', headers).then(res => {
          if(res) {
           this.setState({data: res.data.data, hero: res.data.data[0].hero, basicBlocks: res.data.data[0].basicBlocks, loading: false});
           //console.log(res.data.data)
          }
        })
        .catch(error => {
          this.setState({
            found: false,
          });
        });
      }

  }

  shareFacebook(){
    window.open('https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(window.location.href),'facebookShare','width=626,height=436');
    mixpanel.init('d96d9f1409ced72777048f912ef7591e');
    mixpanel.track('Shared Blog Post', {
      socialChannel : 'facebook',
    });
  }

  shareTwitter(title){
    window.open('https://twitter.com/share?text='+ title +'?&amp;url='+encodeURIComponent(window.location.href)+'&amp;via=solaritycu','twitterShare','width=626,height=436');
    mixpanel.init('d96d9f1409ced72777048f912ef7591e');
    mixpanel.track('Shared Blog Post', {
      socialChannel : 'twitter',
    });
    console.log("sharing")
  }

  shareLinkedin(){
    window.open('https://www.linkedin.com/cws/share?url='+encodeURIComponent(window.location.href),'linkedinShare','width=626,height=436');
    mixpanel.init('d96d9f1409ced72777048f912ef7591e');
    mixpanel.track('Shared Blog Post', {
      socialChannel : 'linkedin',
    });
  }

  mailToLink(title){
    window.open("mailto:?subject=" + title + "&body=Check out this site " + window.location.href);
    mixpanel.init('d96d9f1409ced72777048f912ef7591e');
    mixpanel.track('Shared Blog Post', {
      socialChannel : 'sent link with email',
    });
    console.log("sharing")
  }


  render() {



  const RELATED_QUERY = gql`
    {
      re:entries(slug:"${this.props.slug}"){

        ...on Articles{

          rbpc:relatedBlogPostsConnection{
            entries{
              ...on Articles{
                title
                uri
                hero{
                  ...on HeroBlogHero{
                    heading
                    description
                    image{
                      height
                      width
                      url
                      filename
                      title
                    }
                  }
                }
              }
            }
          }

        }
      }
    }
    `;

    const BASIC_PAGE_QUERY = gql`
      {
         entry(slug:"${this.props.slug}", section:[articles]){
          title
          ...on Articles{
            ${metaQuery.metaQuery}
            ${heroQuery.heroQuery}
            ${basicBlocksQuery.basicBlocksQuery}


          }
        }
      }`;



    return (

        <React.Fragment>


          <Query client={this.props.client} query={BASIC_PAGE_QUERY}>
            {({ loading, error, data }) => {
              if (loading) return <FullPageLoader />;
              if (error) return <Redirect to={'/not-found'} />;
              if (data.entry === null) return <Redirect to={'/not-found'} />;


              return (
                <div className="offsetNav">
                  {
                    (data.entry.metaImage.length > 0)
                    ?
                      <Helmet>
                        <title>{data.entry.metaTitle}</title>
                        <meta name="description" content={data.entry.metaDescription}/>
                        <meta property="og:title" content={data.entry.metaTitle} />
                        <meta property="og:type" content="website" />
                        <meta property="og:url" content={data.entry.url} />
                        <meta property="og:image" content={data.entry.metaImage[0].url} />
                        <link rel="canonical" href={data.entry.url} />
                      </Helmet>
                    :
                      <Helmet>
                      <title>{data.entry.metaTitle}</title>
                        <meta name="description" content={data.entry.metaDescription}/>
                        <meta property="og:title" content={data.entry.metaTitle} />
                        <meta property="og:type" content="website" />
                        <meta property="og:url" content={data.entry.url} />
                        <link rel="canonical" href={data.entry.url} />
                      </Helmet>

                  }
                  <Hero data={data.entry.hero} loading={loading} />
                  <BasicBlocks data={data.entry.basicBlocks} loading={loading} />

                  <StarRating />
                  <div className="align-center block-center mb-8">
                    <a href="/articles" className=" button button-primary fontSize0 "> Read More Articles </a>
                  </div>
                  <h3 className="fontSize2 fontMedium full-width text-center">Share this post</h3>
                  <ul className="share-links text-center mb-6">
                    <li onClick={this.shareFacebook}>
                      <span className="facebook">
                        <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"  x="0px" y="0px"
                           width="24px" height="24px" viewBox="0 0 512 512" fill="#ffffff" enableBackground="new 0 0 512 512" >

                          <path d="M398.14,50.5H117.98c-36.408,0-68.48,26.452-68.48,62.86v280.16c0,36.408,32.072,68.98,68.48,68.98h173.466
                            c-0.325-54,0.077-114.134-0.185-166.387c-11.064-0.112-22.138-0.684-33.202-0.854c0.041-18.467,0.017-37.317,0.024-55.781
                            c11.057-0.137,22.121-0.163,33.178-0.268c0.338-17.957-0.338-36.025,0.354-53.966c1.103-14.205,6.519-28.563,17.14-38.377
                            c12.859-12.239,31.142-16.397,48.387-16.912c18.233-0.163,36.468-0.076,54.71-0.068c0.072,19.24,0.072,38.482-0.008,57.722
                            c-11.789-0.02-23.585,0.023-35.374-0.025c-7.468-0.467-15.145,5.198-16.504,12.609c-0.177,12.875-0.064,25.757-0.057,38.628
                            c17.285,0.073,34.577-0.02,51.862,0.044c-1.264,18.629-3.581,37.168-6.285,55.637c-15.272,0.137-30.554,1.514-45.818,1.602
                            c-0.129,52.236,0.04,112.395-0.093,166.395h38.564c36.408,0,63.36-32.572,63.36-68.98V113.36C461.5,76.952,434.548,50.5,398.14,50.5
                            z"/>
                        </svg>
                      </span>
                    </li>
                    <li onClick={() => this.shareTwitter(data.entry.metaTitle)}>
                      <span className="twitter">
                        <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50 50" fill="#fff" version="1.1" width="24px" height="24px">
                          <g id="surface1">
                            <path d="M 50.0625 10.4375 C 48.214844 11.257813 46.234375 11.808594 44.152344 12.058594 C 46.277344 10.785156 47.910156 8.769531 48.675781 6.371094 C 46.691406 7.546875 44.484375 8.402344 42.144531 8.863281 C 40.269531 6.863281 37.597656 5.617188 34.640625 5.617188 C 28.960938 5.617188 24.355469 10.21875 24.355469 15.898438 C 24.355469 16.703125 24.449219 17.488281 24.625 18.242188 C 16.078125 17.8125 8.503906 13.71875 3.429688 7.496094 C 2.542969 9.019531 2.039063 10.785156 2.039063 12.667969 C 2.039063 16.234375 3.851563 19.382813 6.613281 21.230469 C 4.925781 21.175781 3.339844 20.710938 1.953125 19.941406 C 1.953125 19.984375 1.953125 20.027344 1.953125 20.070313 C 1.953125 25.054688 5.5 29.207031 10.199219 30.15625 C 9.339844 30.390625 8.429688 30.515625 7.492188 30.515625 C 6.828125 30.515625 6.183594 30.453125 5.554688 30.328125 C 6.867188 34.410156 10.664063 37.390625 15.160156 37.472656 C 11.644531 40.230469 7.210938 41.871094 2.390625 41.871094 C 1.558594 41.871094 0.742188 41.824219 -0.0585938 41.726563 C 4.488281 44.648438 9.894531 46.347656 15.703125 46.347656 C 34.617188 46.347656 44.960938 30.679688 44.960938 17.09375 C 44.960938 16.648438 44.949219 16.199219 44.933594 15.761719 C 46.941406 14.3125 48.683594 12.5 50.0625 10.4375 Z "/>
                          </g>
                        </svg>
                      </span>
                    </li>
                    <li onClick={this.shareLinkedin}>
                      <span className="linkedin">
                        <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" fill="#fff" version="1.1" width="24px" height="24px">
                          <g>
                            <path d="M2.67,1.211c0.682,0,1.216,0.215,1.604,0.643S4.87,2.822,4.898,3.469
                              c0,0.639-0.218,1.178-0.657,1.616C3.802,5.522,3.202,5.741,2.443,5.741H2.416c-0.741,0-1.328-0.219-1.765-0.656
                              C0.219,4.647,0,4.108,0,3.469c0-0.657,0.238-1.197,0.718-1.622C1.198,1.423,1.85,1.211,2.67,1.211z M0.287,7.535H4.97v13.156H0.287
                              V7.535z M21.903,13.148v7.543h-4.682v-7.036c0-0.895-0.184-1.612-0.55-2.158c-0.364-0.541-0.973-0.812-1.833-0.812
                              c-0.655,0-1.181,0.166-1.573,0.5c-0.393,0.332-0.678,0.699-0.85,1.102c-0.056,0.146-0.091,0.307-0.11,0.486
                              c-0.018,0.176-0.026,0.367-0.026,0.568v7.351H7.568c0.02-2.226,0.031-4.268,0.031-6.12v-2.339v-2.125
                              c0-0.647-0.007-1.199-0.018-1.657C7.575,7.997,7.568,7.69,7.568,7.535h4.711v1.863l-0.026,0.054h0.026V9.398
                              c0.146-0.229,0.333-0.468,0.561-0.719c0.231-0.25,0.507-0.484,0.843-0.7c0.333-0.214,0.734-0.39,1.204-0.533
                              c0.473-0.141,1.011-0.211,1.624-0.211c0.762,0,1.474,0.116,2.138,0.349c0.662,0.233,1.231,0.598,1.715,1.096
                              c0.481,0.495,0.858,1.111,1.132,1.847C21.769,11.261,21.903,12.135,21.903,13.148z"/>
                          </g>
                        </svg>
                      </span>
                    </li>
                    <li onClick={() => this.mailToLink(data.entry.metaTitle)}>
                      <span className="email">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-mail"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                      </span>
                    </li>
                  </ul>

                </div>
              );
            }}
          </Query>


{/*


          <Query client={this.props.client} query={RELATED_QUERY}>
            {({ loading, error, data }) => {
              if (loading) return '';
              if (error) return '';
              if (data.re.length < 1) return '';
              if (data.re[0].rbpc === undefined) return '';
              return (
                <RelatedArticles
                  data={data.re[0].rbpc.entries}
                  loading={false}
                  slug={this.props.slug}
                />
              );
            }}
          </Query>


*/}
        </React.Fragment>

    );
  }
}


export default BlogSingle;
