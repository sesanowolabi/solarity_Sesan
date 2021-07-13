import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import {Helmet} from "react-helmet";
// apollo
import ApolloClient, { gql } from 'apollo-boost';

import FullPageLoader from '../loaders/FullPageLoader';


//graphql query parts
// import basicBlocksQuery from '../querys/BasicBlocks.js';
// import heroQuery from '../querys/HeroQuery.js';
import metaQuery from '../querys/MetaQuery.js';

class Bank extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
      entries:[],
      metaInfo:{},
      loading: true
    }
  }

  componentDidUpdate(nextProps, nextState){
    if (nextState.entries.length > 1) {
      //console.log('we are updating the state of...');
      //console.log(nextState);
    }
  }

  componentDidMount(){
    const CATEGORIES = gql`
        {
          entries(section:[bankPage]){
              id
              title
              uri

              ... on BankPage{
                  ${metaQuery.metaQuery}
                  pagesConnection{
                      entries{
                          ...on Bank{
                              id
                              title
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

        this.setState({
          title: response.data.entries[0].title,
          metaInfo: {title:response.data.entries[0].metaTitle, description:response.data.entries[0].metaDescription, image:response.data.entries[0].metaImage, url:response.data.entries[0].url},
          entries: response.data.entries[0].pagesConnection.entries,
          cardsTotal: response.data.entries[0].pagesConnection.entries.length,
          loading: false
        });
      });
  }


  render() {
    let data = this.state.entries;
    //console.log(data);

    return (
      <div className="offsetNav clearfix">

        <div className="stripe_6 grey1 clearfix">
          <h1 className="fontSize5 text-center mb">Bank</h1>

          {(this.state.loading === false) ?
            <div className="container full-width row-centered">
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
              <div className={`card-grid container cards-${this.state.cardsTotal}`} >
                {data.map((d, index) => {
                  return (
                    <div className="card" key={`card-${index}`}>
                      <Link to={`/${d.uri}`}>
                        <img src={`${process.env.REACT_APP_S3_URL}${d.pageIcon[0].filename}`} alt={d.pageIcon[0].title}/>
                        <h3 className="fontMedium">{d.title}</h3>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
        : <FullPageLoader />}
        </div>
      </div>
    );
  }
}

export default Bank;
