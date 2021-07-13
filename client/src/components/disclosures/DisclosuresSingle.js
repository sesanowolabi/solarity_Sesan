import React, { Component } from 'react';
import { Redirect } from "react-router-dom";

import { gql } from 'apollo-boost';

import { Query } from 'react-apollo';

import {Helmet} from "react-helmet";

import BasicBlocks from '../content-blocks/basic-blocks/BasicBlocks';
import Hero from '../content-blocks/hero/Hero';

//graphql query parts
import basicBlocksQuery from '../querys/BasicBlocks.js';
import heroQuery from '../querys/HeroQuery.js';
import metaQuery from '../querys/MetaQuery.js';

import FullPageLoader from '../loaders/FullPageLoader';



class DisclosuresSingle extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	data: '',
	    	loading: true,
	    	found: true,
	    }
	};

	componentDidUpdate(prevProps, prevState) {
	    // const { pathname } = this.props.slug;
	    // const { pathname: prevPathname } = prevProps.slug;

	    // // //console.log(prevProps.slug)
	    // // //console.log(this.props.slug)


	    // if (this.props.slug && this.props.slug !== prevProps.slug) {
	    // 	axios.get(`${process.env.REACT_APP_BASE_URL}/disclosures/`+this.props.slug+'.json').then(res => {
		   //    if(res) {
		   //     this.setState({
		   //     		data: res.data.data,
		   //     		hero: res.data.data[0].hero,
		   //     		basicBlocks: res.data.data[0].basicBlocks,
		   //     		loading: false
		   //     	});
		   //     //console.log(res.data.data)
		   //    }
		   //  })
		   //  .catch(error => {
		   //    //console.log(error);
		   //  });
	    // }
	}

	componentWillMount(){
		// const headers = {headers: {
	 //      'Access-Control-Allow-Origin': '*',
	 //      'Content-Type': 'application/json; charset=utf-8',
	 //    }};

		// var string = window.location.href,
	 //    substring = "draftId";

	 //    if (string.indexOf(substring) > 0 ) {
	 //      //console.log('%c This is a draft! ', 'background: #222; color: #bada55');

	 //      var draftId = string.split("draftId=");
	 //      //console.log(draftId);



	 //      axios.get(`${process.env.REACT_APP_BASE_URL}/basic-draft?draftId=`+draftId[1], headers).then(res => {
		//       if(res) {
		//       	console.log(res);
		//        // this.setState({
		//        // 		data: res.data.data,
		//        // 		hero: res.data.data[0].hero,
		//        // 		basicBlocks: res.data.data[0].basicBlocks,
		//        // 		loading: false
		//        // 	});
	 //      		if(!res.data[0]){
		//             // this.setState({
		//             //   found: false,
		//             // });
	 //      			console.log('nope')
		//           } else {
		//            	// set state
		//            	console.log('yup')
		//           }

		//       }
		//     })
		//     .catch(error => {
		//       //console.log(error);
		//     });
	 //    }
	 //    else{

	 //      //console.log('%c This is not a draft', 'background: #222; color: blue');
	 //      axios.get(`${process.env.REACT_APP_BASE_URL}/disclosures/`+this.props.slug+'.json', headers).then(res => {
		//       if(res) {
	 //       		this.setState({
		//        		data: res.data.data,
		//        		hero: res.data.data[0].hero,
		//        		basicBlocks: res.data.data[0].basicBlocks,
		//        		loading: false
	 //       		});
		//       }
		//     })
		//     .catch(error => {
		//       	this.setState({
  //             		found: false,
  //           	});
		//     });
	 //    }
	}


  render() {


	let disclosures = gql`{
		entry(section: [disclosures], slug: "${this.props.slug}"){
			title
		    ...on Disclosures{
		    	downloads{
		        	filename
		        	title
		     	}
		    	${heroQuery.heroQuery}

	        	${basicBlocksQuery.basicBlocksQuery}

	        	${metaQuery.metaQuery}
			}
		}
	}`;



    return (
    	<Query client={this.props.client} query={disclosures}>
          {({ loading, error, data }) => {
            console.log(data.entries);
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
              		<div>
		              	{
		              		(data.entry.downloads.length > 0) ?
		              			data.entry.downloads.map((d, index) => {

				                  return (
				                  	<div key={`download-${index}`} className="text-center pb-6">
				                    <a key={index} className="button" target="_blank" href={`${process.env.REACT_APP_S3_URL_DOWNLOADS}` + d.filename} download>Download {d.title}</a>
				                    </div>
				                  );
				                })

		              		: ""
		              	}
              		</div>
              		<BasicBlocks data={data.entry.basicBlocks} loading={loading} />
              	</div>
            );
          }}
        </Query>
    );
  }
}


export default DisclosuresSingle;
