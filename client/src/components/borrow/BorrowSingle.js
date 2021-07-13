import React, { Component } from 'react';
import { Redirect } from "react-router-dom";


import {Helmet} from "react-helmet";

import BasicBlocks from './../content-blocks/basic-blocks/BasicBlocks';
import Hero from './../content-blocks/hero/Hero';
import FullPageLoader from './../loaders/FullPageLoader';

// apollo
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';

//graphql query parts
import basicBlocksQuery from '../querys/BasicBlocks.js';
import heroQuery from '../querys/HeroQuery.js';
import metaQuery from '../querys/MetaQuery.js';


class BorrowSingle extends Component {
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

	if (!this.state.found) {
		return (<Redirect to={'/not-found'} />);
	}

	const BASIC_PAGE_QUERY = gql`
    {
      entry(slug:"${this.props.slug}"){
        title
        ...on Borrow{
          ${heroQuery.heroQuery}
          ${metaQuery.metaQuery}
          ${basicBlocksQuery.basicBlocksQuery}

        }
      }
    }
    `;

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
                <BasicBlocks data={data.entry.basicBlocks} loading={loading} />
              </div>
            );
          }}
        </Query>
    );
  }
}


export default BorrowSingle;
