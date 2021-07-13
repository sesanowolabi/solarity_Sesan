import React, { Component } from 'react';
import { Link, Redirect } from "react-router-dom";


import {Helmet} from "react-helmet";

import BasicBlocks from './../content-blocks/basic-blocks/BasicBlocks';
import Hero from './../content-blocks/hero/Hero';
import FullPageLoader from './../loaders/FullPageLoader';

import ApolloClient, { gql } from 'apollo-boost';
import { Query } from 'react-apollo';

//graphql query parts
import basicBlocksQuery from '../querys/BasicBlocks.js';
import heroQuery from '../querys/HeroQuery.js';
import metaQuery from '../querys/MetaQuery.js';


class Company extends Component {
  constructor(props) {
      super(props);
      this.state = {
        data: '',
        loading: true
      }
  };

  // componentDidUpdate(prevProps, prevState) {
  //     const { pathname } = this.props.slug;
  //     const { pathname: prevPathname } = prevProps.slug;

  //     //console.log(prevProps.slug)
  //     //console.log(this.props.slug)


  //     if (this.props.slug && this.props.slug !== prevProps.slug) {
  //       axios.get(`${process.env.REACT_APP_BASE_URL}`+ '/company.json').then(res => {
  //         if(res) {
  //          this.setState({data: res.data.data, hero: res.data.data[0].hero, basicBlocks: res.data.data[0].basicBlocks, loading: false});
  //          //console.log(res.data.data)
  //         }
  //       })
  //       .catch(error => {
  //         //console.log(error);
  //       });
  //     }
  // }

  // componentDidMount(){
  //   const CATEGORIES = gql`
  //       {
  //         entries(section:[companyPage]){
  //             id
  //             title
  //             uri
  //             ... on CompanyPage{
  //                 pagesConnection{
  //                     entries{
  //                         ...on CompanyAbout{
  //                           title
  //                           id
  //                           uri
  //                           pageIcon{
  //                             id
  //                             url
  //                             filename
  //                           }
  //                         }
  //                     }
  //                 }
  //             }
  //         }
  //     }
  //   `;

  //   // Get the preview token from the URL
// let m = document.location.href.match(/\btoken=([^&]+)/);
// let token = m ? m[1] : '';
// Then forward that on whenever you are sending a CraftQL API request
// let url = `graph-api?token=${token}`; const client = new ApolloClient({
  //     uri: `${process.env.REACT_APP_BASE_URL}/graph-api`,
  //     request: operation => {
  //       operation.setContext({
  //         headers: {
  //           Authorization: `bearer ${process.env.REACT_APP_GRAPH_TOKEN}`,
  //         },
  //       });
  //     },
  //   });

  //   client
  //     .query({
  //       query: CATEGORIES,
  //     })
  //     .then(response => {
  //       //console.log(response.data.entries);
  //       //console.log(response.data.entries[0].pagesConnection.entries)
  //       this.setState({
  //         entries: response.data.entries[0].pagesConnection.entries,
  //         cardsTotal: response.data.entries[0].pagesConnection.entries.length,
  //         loading: false
  //       });
  //     });
  // }

  componentDidMount(){
    const CATEGORIES = gql`
        {
          entries(section:[companyPage]){
              id
              title
              uri
              ... on CompanyPage{
                  pagesConnection{
                      entries{
                          ...on CompanyAbout{
                            title
                            id
                            uri
                            pageIcon{
                              id
                              url
                              filename
                              title
                            }
                          }
                          ...on CareersPage{
                            title
                            id
                            uri
                            pageIcon{
                              id
                              url
                              filename
                              title
                            }
                          }
                          ...on Careers{
                            title
                            id
                            uri
                            pageIcon{
                              id
                              url
                              filename
                              title
                            }
                          }
                          ...on BlogPage{
                            title
                            id
                            uri
                            pageIcon{
                              id
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
        query: CATEGORIES,
      })
      .then(response => {
        //console.log(response.data.entries);
        //console.log(response.data.entries[0].pagesConnection.entries)
        this.setState({
          entries: response.data.entries[0].pagesConnection.entries,
          cardsTotal: response.data.entries[0].pagesConnection.entries.length,
          loading: false
        });
      });

    // const headers = {headers: {
    //     'Access-Control-Allow-Origin': '*',
    //     'Content-Type': 'application/json; charset=utf-8',
    //   }};

    // var string = window.location.href,
    //   substring = "draftId";

    //   if (string.indexOf(substring) > 0 ) {
    //     //console.log('%c This is a draft! ', 'background: #222; color: #bada55');

    //     var draftId = string.split("draftId=");
    //     //console.log(draftId);



    //     axios.get(`${process.env.REACT_APP_BASE_URL}/basic-draft?draftId=`+draftId[1], headers).then(res => {
    //       if(res) {
    //        this.setState({data: res.data, hero: res.data.hero, basicBlocks: res.data.basicBlocks});
    //        //console.log('logging response');
    //        //console.log(res);
    //       }
    //     })
    //     .catch(error => {
    //       //console.log(error);
    //     });
    //   }
    //   else{

    //     //console.log('%c This is not a draft', 'background: #222; color: blue');
    //     axios.get(`${process.env.REACT_APP_BASE_URL}`+ '/company.json', headers).then(res => {
    //       if(res) {
    //        this.setState({data: res.data.data, hero: res.data.data[0].hero, basicBlocks: res.data.data[0].basicBlocks});
    //        //console.log(res.data.data)
    //       }
    //     })
    //     .catch(error => {
    //       //console.log(error);
    //     });
    //   }
  }




  render() {
  let target = this.state.data;
  let entries = this.state.entries;
  console.log(target);


   const BASIC_PAGE_QUERY = gql`
      {
        entry(section: [companyPage]){
          title
          ...on CompanyPage{
            ${metaQuery.metaQuery}
            ${heroQuery.heroQuery}
            ${basicBlocksQuery.basicBlocksQuery}
          }
      }
    }`;


    return (
        <div className="offsetNav">
          <Query client={this.props.client} query={BASIC_PAGE_QUERY}>
            {({ loading, error, data }) => {
              if (loading) return <FullPageLoader />;
              if (error) return <Redirect to={'/not-found'} />;

              return (
                <div>
                  <Hero data={data.entry.hero} loading={loading} />
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

                  {(this.state.loading === false) ?
                    <div className="container full-width row-centered">
                      <div className={`card-grid pb-6 container cards-${this.state.cardsTotal}`} >
                        {entries.map((d, index) => {
                          return (
                            <div className="card" key={`card-${index}`}>
                              <Link to={`/${d.uri}`}>
                                <div className="icon-wrapper">
                                  <img src={`${process.env.REACT_APP_S3_URL}${d.pageIcon[0].filename}`} alt={d.pageIcon[0].title}/>
                                </div>
                                <h3 className="fontMedium">{d.title}</h3>
                              </Link>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  : <FullPageLoader />}

                  <BasicBlocks data={data.entry.basicBlocks} loading={loading} />
                </div>
              );
            }}
          </Query>
        </div>
    );
  }
}

export default Company;
