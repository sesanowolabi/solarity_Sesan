import React, { Component } from 'react';
import {
  Redirect,
} from 'react-router-dom';

import OffsiteSpeedBump from '../modal/OffsiteSpeedBump';

// apollo
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';


import mixpanel from 'mixpanel-browser';



class OffsiteLink extends Component {

  constructor(props) {
  	super(props);
  	this.state = {
  		modalIsOpen: false,
      whitelist: ['solaritycu.org', 'app.loanspq.com', 'cx.getcloudcherry.com', 'react-staging.solaritycu.org'],

  	}

  	this.openModal = this.openModal.bind(this);
  	this.closeModal = this.closeModal.bind(this);
    this.trackLink = this.trackLink.bind(this);
  }
  
  openModal(){
  	//console.log('open modal clicked');
  	this.setState({
  		modalIsOpen: true,
  	})
  }

  closeModal(){
  	this.setState({
  		modalIsOpen: false,
  	});
  }

 trackLink(buttonName, outboundLink){
    mixpanel.init('d96d9f1409ced72777048f912ef7591e');
    mixpanel.track('CTA Link', {
      buttonText: buttonName,
      buttonLink: outboundLink,
    });
  }
  
  render() {

    const OFFSITE_QUERY = gql`
    {
      globals{
        offsiteSpeedbumpWhitelist{
          offsiteSpeedbumpWhitelist{
            ...on OffsiteSpeedbumpWhitelistSpeedbumpItem{
              urlString
            }
          }
        }
      }
    }
    `;


    

    return (
      <Query client={this.props.client} query={OFFSITE_QUERY}>
        {({ loading, error, data }) => {

          if (loading) return '';
          if (error) return <Redirect to={'/not-found'}/>;

          var component = <div><OffsiteSpeedBump modalIsOpen={this.state.modalIsOpen} closeModal={this.closeModal} offsiteLink={this.props.link} buttonText={this.props.buttonText} ></OffsiteSpeedBump><button className={(this.props.button !== true) ? " directionalLink" : "button button-primary fontSize1"} onClick={()=>this.openModal()}>{this.props.buttonText}  {(this.props.button !== true) ? <span className="feather icon-arrow-right"></span> : ''}  </button></div>;
          console.log('logging data in offsite link');
          console.log(data);
          var list = data.globals.offsiteSpeedbumpWhitelist.offsiteSpeedbumpWhitelist;

          //check if link has been whitelisted
          if(list.length > 0){

            for(let i = 0; i < list.length; i ++){
              if (this.props.link.indexOf(list[i].urlString) > -1) {
                //link has been whitelisted, allow it.
                console.log('link is whitelisted');

                component =  <a className={(this.props.button !== true) ? " directionalLink" : "button button-primary fontSize0"} href={this.props.link} onClick={() => this.trackLink(this.props.link, this.props.buttonText)}>{this.props.buttonText} {/*<span className="feather icon-arrow-right"></span>*/}</a>;

              }
            }
          }

          return (
            <React.Fragment>
             {component}
            </React.Fragment>
          );
        }}
      </Query>
      
    	
    );
  }
}


export default OffsiteLink;
