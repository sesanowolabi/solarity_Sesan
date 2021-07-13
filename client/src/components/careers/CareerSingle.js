import React, { Component } from 'react';
import { Redirect } from "react-router-dom";


import {Helmet} from "react-helmet";

import BasicBlocks from './../content-blocks/basic-blocks/BasicBlocks';
import Hero from './../content-blocks/hero/Hero';
import JobListings from './jobs/JobListings';

import FullPageLoader from './../loaders/FullPageLoader';

// apollo
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';

//graphql query parts
import basicBlocksQuery from '../querys/BasicBlocks.js';
import heroQuery from '../querys/HeroQuery.js';
import metaQuery from '../querys/MetaQuery.js';


class careerSingle extends Component {
  constructor(props) {
      super(props);
      this.state = {
        data: '',
        loading: true,
        found: true,
      }
  };

  componentDidUpdate(prevProps, prevState) {

  }

  componentWillMount(){


  }


  render() {


  const BASIC_PAGE_QUERY = gql`
      {
         entry(slug:"${this.props.slug}"){
          title
          ...on Careers{
            ${heroQuery.heroQuery}
            ${metaQuery.metaQuery}
            ${basicBlocksQuery.basicBlocksQuery}

            jobListings{
              ...on JobListingsJobListings{
                jobTitle
                linksTo
                locations
              }
            }



          }
      }
    }`;

    return (
      
        <Query client={this.props.client} query={BASIC_PAGE_QUERY}>
            {({ loading, error, data }) => {
              if (loading) return <FullPageLoader />;
              if (error) return <Redirect to={'/not-found'} />;
              if (data.entry === null) return <Redirect to={'/not-found'} />;

              return (
                <div className="offsetNav">
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

                  {
                    (data.entry.jobListings.length > 0)
                    ? <JobListings data={data.entry.jobListings} loading={false} />
                    : ''
                  }

                  <BasicBlocks data={data.entry.basicBlocks} loading={loading} />
                </div>
              );
            }}
          </Query>
        
    );
  }
}


export default careerSingle;
