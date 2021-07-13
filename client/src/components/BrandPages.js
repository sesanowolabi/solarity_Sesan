import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
//import {Helmet} from "react-helmet";
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';
//loaders
import FullPageLoader from './loaders/FullPageLoader';

import BasicBlocks from './content-blocks/basic-blocks/BasicBlocks';
import Hero from './content-blocks/hero/Hero';
//graphql query parts
import basicBlocksQuery from './querys/BasicBlocks.js';
import heroQuery from './querys/HeroQuery.js';
//import metaQuery from './querys/MetaQuery.js';



class BrandPages extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	data: '',
	    	loading: true,
	    	found: true,
	    }
	};


  render() {


  	var BASIC_PAGE_QUERY = gql`
    {
      entry(slug:"${this.props.slug}"){

        ...on Brand{

          title

          ${heroQuery.heroQuery}

          ${basicBlocksQuery.basicBlocksQuery}

        }
      }
    }
    `;



	if (!this.state.found) {
      return (<Redirect to={'/not-found'} />);
    }

    return (

        <Query client={this.props.client} query={BASIC_PAGE_QUERY}>
          {({ loading, error, data }) => {

            if (loading) return <FullPageLoader />;
            if (error) return <Redirect to={'/not-found'} />;
            if (data.entry  === null) return <Redirect to={'/not-found'} />;
            console.log('logging some data to compare...');
            console.log(data);
            // console.log(this.state.hero);
            // console.log(this.state.basicBlocks);

            return (
	            <div className="offsetNav">

  		        	<Hero data={data.entry.hero} loading={loading} />
  		        	<BasicBlocks data={data.entry.basicBlocks} loading={loading} />
  		        </div>
            );
          }}
        </Query>

    );
  }
}


export default BrandPages;
