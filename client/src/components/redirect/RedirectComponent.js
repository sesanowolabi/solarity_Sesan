import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import FullPageLoader from '../loaders/FullPageLoader';

import mixpanel from 'mixpanel-browser';

class RedirectComponent extends Component {

constructor(props) {
	super(props);
	this.state = {
		

	}

	
}

componentDidMount(){
  mixpanel.init('d96d9f1409ced72777048f912ef7591e');
}

  
  render() {

    let reds = this.props.redirects;

    if (reds.length === 0 && this.props.loading === false) {
      //console.log('no redirects, we should redirect to the 404 page...')
      mixpanel.track('404', {
        pathname: this.props.location.pathname,
        buildId: `${process.env.REACT_APP_BUILD_ID}`,
      });
      return <Redirect to={'/not-found'}/>;
    }

    else if(reds.length > 0 && this.props.loading === false){
      for(let i = 0; i < reds.length; i++){
        //console.log('outputting what we might want to redirect...');
        //console.log(reds[i].urlToRedirect);
        if (reds[i].urlToRedirect === this.props.location.pathname) {
          //console.log(`we need to redirect ${reds[i].urlToRedirect} to ${reds[i].directTo}`)
          return <Redirect to={`${reds[i].directTo}`}/>;
        }
      }
      //console.log('found nothing... dont redirect, and load not found...')
      mixpanel.track('404', {
        pathname: this.props.location.pathname,
        buildId: `${process.env.REACT_APP_BUILD_ID}`,
      });
      return <Redirect to={'/not-found'}/>;
    }


    return(

      <React.Fragment>
        <FullPageLoader />
      </React.Fragment>

    );
  }
}


export default RedirectComponent;
