import React, { Component } from 'react';


//instant search
import SiteSearch from './SiteSearch';


class SiteSearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
      
      loading: true
    }
  }  

  componentDidUpdate(nextProps, nextState){
    
  }

  componentDidMount(){
    

  }

  
  
  render() {  
    return (
      <div className="main-content offsetNav">
        <div className="container content">
          <div className="" >
            <h1 className="fontBold">What can we help you with?</h1>
            <SiteSearch/>
          </div>
        </div>
      </div>
    );
  }
}

export default SiteSearchPage;
