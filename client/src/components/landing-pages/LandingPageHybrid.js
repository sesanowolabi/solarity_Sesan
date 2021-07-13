import React, { Component } from 'react';
import axios from 'axios';

import BasicBlocks from '../content-blocks/basic-blocks/BasicBlocks';




class LandingPageHybrid extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	data: '',
	    	loading: true
	    }
	};

	componentDidUpdate(prevProps, prevState) {

	    if (this.props.slug && this.props.slug !== prevProps.slug) {
	    	axios.get(`${process.env.REACT_APP_BASE_URL}/hybrid/`+this.props.slug+'.json').then(res => {
		      if(res) {
		       this.setState({data: res.data.data, basicBlocks: res.data.data[0].basicBlocks, loading: false});
		       //console.log(res.data.data)
		      } 
		    })
		    .catch(error => {
		      //console.log(error);
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
		      //console.log(error);
		    });
	    }
	    else{
	      
	      //console.log('%c This is not a draft', 'background: #222; color: blue');
	      axios.get(`${process.env.REACT_APP_BASE_URL}/hybrid/`+this.props.slug+'.json', headers).then(res => {
		      if(res) {

		       this.setState({
		       		data: res.data.data,  
		       		basicBlocks: res.data.data[0].basicBlocks, 
		       		loading: false
		       	});
		       //console.log(res.data.data)

		      } 
		    })
		    .catch(error => {
		      //console.log(error);
		    });
	    }

	}


  render() {

    return (
        	<BasicBlocks data={this.state.basicBlocks} loading={this.state.loading} />
    );
  }
}


export default LandingPageHybrid;
