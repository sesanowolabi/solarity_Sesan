import React, { Component } from 'react';
import { Redirect } from "react-router-dom";


import {Helmet} from "react-helmet";


import BasicBlocks from '../content-blocks/basic-blocks/BasicBlocks';
import Hero from '../content-blocks/hero/Hero';
import FullPageLoader from './../loaders/FullPageLoader';

// apollo
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';

//graphql query parts
import basicBlocksQuery from '../querys/BasicBlocks.js';
import heroQuery from '../querys/HeroQuery.js';
import metaQuery from '../querys/MetaQuery.js';


class Disclosures extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	data: '',
	    	loading: true
	    }
	};

	componentDidUpdate(prevProps, prevState) {

	}

	// componentWillMount(){
 //    const headers = {headers: {
 //        'Access-Control-Allow-Origin': '*',
 //        'Content-Type': 'application/json; charset=utf-8',
 //      }};

 //    var string = window.location.href,
 //      substring = "draftId";
 //      if (string.indexOf(substring) > 0 ) {
 //        //console.log('%c This is a draft! ', 'background: #222; color: #bada55');
 //        var draftId = string.split("draftId=");
 //        //console.log(draftId);
 //        axios.get(`${process.env.REACT_APP_BASE_URL}/basic-draft?draftId=`+draftId[1], headers).then(res => {
 //          if(res) {
 //           this.setState({
 //              data: res.data.data,
 //              hero: res.data.data[0].hero,
 //              cards: res.data.data[0].cards,
 //              basicBlocks: res.data.data[0].basicBlocks,
 //              loading: false
 //            });
 //           //console.log('logging response');
 //           //console.log(res);
 //          }
 //        })
 //        .catch(error => {
 //          //console.log(error);
 //        });
 //      }
 //      else{

 //        //console.log('%c This is not a draft', 'background: #222; color: blue');
 //        axios.get(`${process.env.REACT_APP_BASE_URL}`+ '/disclosures.json', headers).then(res => {
 //          if(res) {
 //           this.setState({
 //              data: res.data.data,
 //              hero: res.data.data[0].hero,
 //              cards: res.data.data[0].cards,
 //              basicBlocks: res.data.data[0].basicBlocks,
 //              loading: false
 //            });
 //           //console.log(res.data.data)
 //          }
 //        })
 //        .catch(error => {
 //          //console.log(error);
 //        });
 //      }
 //  }


  render() {

  	let pages = this.props.data;

    const BASIC_PAGE_QUERY = gql`
      {
        entry(section: [disclosuresPage]){
          title
          ...on DisclosuresPage{
            ${heroQuery.heroQuery}

            ${basicBlocksQuery.basicBlocksQuery}

            ${metaQuery.metaQuery}

          }
      }
    }`;

    return (
        <Query client={this.props.client} query={BASIC_PAGE_QUERY}>
          {({ loading, error, data }) => {
            if (loading) return <FullPageLoader />;
            if (error) return <Redirect to={'/not-found'} />;

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

                <div className="container--md clearfix">
                    <div className="card-grid disclosures pb-4">
                      {
                        pages.map((d,i) => {
                          return(
                            <a key={`pages-${i}`} className="card text-center fontSize2 fontMedium inner_4" href={d.uri}>{d.title}</a>
                          );
                        })
                      }
                    </div>
                </div>

                <BasicBlocks data={data.entry.basicBlocks} loading={loading} />
              </div>
            );
          }}
        </Query>
    );
  }
}


export default Disclosures;
