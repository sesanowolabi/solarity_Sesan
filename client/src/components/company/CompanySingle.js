import React, { Component } from 'react';
import { Redirect } from "react-router-dom";

import mixpanel from 'mixpanel-browser';

import {Helmet} from "react-helmet";

import BasicBlocks from './../content-blocks/basic-blocks/BasicBlocks';
import Hero from './../content-blocks/hero/Hero';
import TeamMember from './../content-blocks/elements/TeamMember';

import FullPageLoader from './../loaders/FullPageLoader';

// apollo
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';

//graphql query parts
import basicBlocksQuery from '../querys/BasicBlocks.js';
import heroQuery from '../querys/HeroQuery.js';
import metaQuery from '../querys/MetaQuery.js';


class CompanySingle extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	data: '',
	    	loading: true,
	    	found: true,
	    }
	    this.downloadReport = this.downloadReport.bind(this);
	};

	downloadReport(data){
		mixpanel.init('d96d9f1409ced72777048f912ef7591e');
		mixpanel.track('Download Report', {
			reportTitle: data,
		});
	}

	// componentDidUpdate(prevProps, prevState) {
	//     const { pathname } = this.props.slug;
	//     const { pathname: prevPathname } = prevProps.slug;

	//     //console.log(prevProps.slug)
	//     //console.log(this.props.slug)


	//     if (this.props.slug && this.props.slug !== prevProps.slug) {
	//     	axios.get(`${process.env.REACT_APP_BASE_URL}/company/`+this.props.slug+'.json').then(res => {
	// 	      if(res) {
	// 	       this.setState({

	// 	       		data: res.data.data,
	// 	       		hero: res.data.data[0].hero,
	// 	       		teamMembers: res.data.data[0].teamMembers,
	// 	       		basicBlocks: res.data.data[0].basicBlocks,

	// 	       		loading: false
	// 	       	});
	// 	       //console.log(res.data.data)
	// 	      }
	// 	    })
	// 	    .catch(error => {
	// 	      //console.log(error);
	// 	      	this.setState({
 //              		found: false,
 //            	});
	// 	    });
	//     }
	// }

	// componentWillMount(){
	// 	const headers = {headers: {
	//       'Access-Control-Allow-Origin': '*',
	//       'Content-Type': 'application/json; charset=utf-8',
	//     }};

	// 	var string = window.location.href,
	//     substring = "draftId";

	//     if (string.indexOf(substring) > 0 ) {
	//       //console.log('%c This is a draft! ', 'background: #222; color: #bada55');

	//       var draftId = string.split("draftId=");
	//       //console.log(draftId);



	//       axios.get(`${process.env.REACT_APP_BASE_URL}/basic-draft?draftId=`+draftId[1], headers).then(res => {
	// 	      if(res) {
	// 	       this.setState({

	// 	       		data: res.data.data,
	// 	       		hero: res.data.data[0].hero,
	// 	       		teamMembers: res.data.data[0].teamMembers,
	// 	       		basicBlocks: res.data.data[0].basicBlocks,

	// 	       		loading: false
	// 	       	});
	// 	       //console.log('logging response');
	// 	       //console.log(res);
	// 	      }
	// 	    })
	// 	    .catch(error => {
	// 	      //console.log(error);
	// 	      	this.setState({
 //              		found: false,
 //            	});
	// 	    });
	//     }
	//     else{

	//       //console.log('%c This is not a draft', 'background: #222; color: blue');
	//       axios.get(`${process.env.REACT_APP_BASE_URL}/company/`+this.props.slug+'.json', headers).then(res => {
	// 	      if(res) {
	// 	       this.setState({
	// 	       		data: res.data.data,
	// 	       		hero: res.data.data[0].hero,
	// 	       		teamMembers: res.data.data[0].teamMembers,
	// 	       		basicBlocks: res.data.data[0].basicBlocks,
	// 	       		loading: false
	// 	       	});
	// 	       //console.log(res.data.data)
	// 	      }
	// 	    })
	// 	    .catch(error => {
	// 	      //console.log(error);
	// 	      	this.setState({
 //              		found: false,
 //            	});
	// 	    });
	//     }
	// }


  render() {
	// let data = this.state.data;


    const BASIC_PAGE_QUERY = gql`
      {
         entry(slug:"${this.props.slug}"){
         	title
	        ...on CompanyAbout{
	          	${heroQuery.heroQuery}
            	${metaQuery.metaQuery}
	          	${basicBlocksQuery.basicBlocksQuery}


	          teamMembers{
		        ...on TeamMembersTeamMembers{
		          teamMemberName
		          teamMemberTitle
		          image{
		            url
		            filename
		            height
		            width
		            title

		          }
		        }
		      }


	        }
      }
    }`;



    const ANNUAL_REPORTS_QUERY = gql`
    {

		  entry(section:[company], slug:"${this.props.slug}"){
				title
		    ...on CompanyAbout{
		      annualReportsMatrix{
		        ...on AnnualReportsMatrixAnnualReport{
		          heading
		          copy
		          image{
		            url
		            height
		            width
		            filename
		            title
		          }
		          download{
		            title
		            filename
		            url
		          }
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
	            if (data.entry.hero == null) return <Redirect to={'/not-found'} />;

	            console.log('look here');
	            console.log(data);

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

	                {(data.entry.teamMembers.length > 0) ?
		                <div className="container row-centered pb-8 clearfix">
		                  {data.entry.teamMembers.map((d, index) => {
		                    return (
		                      <TeamMember key={`team-member-${index}`} data={d}/>
		                    );
		                    })}
		                </div>
		            : ''}

	                <BasicBlocks data={data.entry.basicBlocks} loading={false} />

	                <Query client={this.props.client} query={ANNUAL_REPORTS_QUERY}>
	                	{({ loading, error, data }) => {

	                		console.log(data);

	            			if (loading) return '';
	            			if (error) return <Redirect to={'/not-found'} />;

	            			if (data.entry.annualReportsMatrix.length < 1) return '';


	            			return(
	            				<div>
	            				{
	            					data.entry.annualReportsMatrix.map((item, index) => {
	            						return(
	            						<section key={`report-${index}`} className="full-width stripe_9 ">
									      <div className="container--md distribute distribute-center two-col-flex clearfix">
									        <div className="col mb-4 ">
									          <div className="full-width clearfix pb-2">

									            <h3 className="fontSize4 mb-1 mt-0 pb-1 fontBold">{item.heading}</h3>
									            <p className="fontSize0 ">{item.copy}</p>
									          </div>


									          <a className="directionalLink" target="_blank" onClick={() => this.downloadReport(item.heading)} href={item.download[0].url}>Download The Report</a>

									        </div>
									        <div className="col ">
									          <img className="" src={item.image[0].url} alt={item.image[0].title} />
									        </div>
									      </div>
									    </section>
									    );
	            					})
	            				}
	            				</div>

	            			);
	          		}}
	                </Query>


	              </div>
	            );
	          }}
	        </Query>

    );
  }
}


export default CompanySingle;
