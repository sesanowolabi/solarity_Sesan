import React, { Component } from 'react';
import { Redirect } from "react-router-dom";


import {Helmet} from "react-helmet";

import BasicBlocks from './../content-blocks/basic-blocks/BasicBlocks';
import Hero from './../content-blocks/hero/Hero';

import FullPageLoader from './../loaders/FullPageLoader';

import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';

//graphql query parts
import basicBlocksQuery from '../querys/BasicBlocks.js';
import heroQuery from '../querys/HeroQuery.js';
import metaQuery from '../querys/MetaQuery.js';

class Careers extends Component {
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

  componentWillMount(){

  }


  render() {

  const BASIC_PAGE_QUERY = gql`
      {
        entry(section: [careersPage]){
          title
          ...on CareersPage{
            ${heroQuery.heroQuery}

            ${basicBlocksQuery.basicBlocksQuery}

            ${metaQuery.metaQuery}

          }
      }
    }`;

  //console.log(data)

    return (
        <div className="offsetNav">
          <Query client={this.props.client} query={BASIC_PAGE_QUERY}>
            {({ loading, error, data }) => {
              if (loading) return <FullPageLoader />;
              if (error) return <Redirect to={'/not-found'} />;

              return (
                <div>
                  <Helmet><title>{data.entry.metaTitle}</title></Helmet>
                  {
                    (data.entry.metaImage.length > 0)
                    ?
                      <Helmet>
                        <meta name="description" content={data.entry.metaDescription}/>
                        <meta property="og:title" content={data.entry.metaTitle} />
                        <meta property="og:type" content="website" />
                        <meta property="og:url" content={data.entry.url} />
                        <meta property="og:image" content={data.entry.metaImage[0].url} />
                        <link rel="canonical" href={data.entry.url} />
                      </Helmet>
                    :
                      <Helmet>
                        <meta name="description" content={data.entry.metaDescription}/>
                        <meta property="og:title" content={data.entry.metaTitle} />
                        <meta property="og:type" content="website" />
                        <meta property="og:url" content={data.entry.url} />
                        <link rel="canonical" href={data.entry.url} />
                      </Helmet>

                  }
                  <Hero data={data.entry.hero} loading={loading} />
                  <BasicBlocks data={data.entry.basicBlocks} loading={loading} />
                </div>
              );
            }}
          </Query>
        </div>
    );
  }
}

export default Careers;
