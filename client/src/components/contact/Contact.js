import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

import {Helmet} from "react-helmet";

class Contact extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loc : true,
      atm: false,
      passToLocation: "",
      redirect: false,
      clickedChat: false,
    }

    this.clickedChat = this.clickedChat.bind(this);

  }

  componentDidUpdate(nextProps, nextState){

  }


clickedChat(){
  if (this.state.clickedChat === false) {
    this.setState({clickedChat:true});
  }
}

  changeLoc(){
    if (this.state.loc) {
      this.setState({
        loc: false
      });
    }
    else{
      this.setState({
        loc: true
      });
    }
  }

  changeAtm(){
    if (this.state.atm) {
      this.setState({
        atm: false
      });
    }
    else{
      this.setState({
        atm: true
      });
    }

  }

  updateInputValue(evt) {
    this.setState({
      passToLocation: evt.target.value
    });
  }

  testButton(){
    this.setState({
      redirect: true,
    });
  }


  componentDidMount(){


  }



  render() {


    if (this.state.redirect === true) {
      return ( <Redirect to={{pathname: "/locations", state: {searching: this.state.passToLocation}}} /> );
    }


    return (
      <div className="container offsetNav">
        {
          (this.state.clickedChat === true)
          ?
            <Helmet>
                <script>
                {`
                  $( '.chat-trigger' ).on( 'click', function() {
                    var le_engagement_id = 234392514;
                    var le_engagement_info = lpTag.taglets.rendererStub.getEngagementState( 234392514 );
                    var le_engagement_clicked = lpTag.taglets.rendererStub.click( le_engagement_id );
                  } );
                `}
              </script>
              <script>
                {`
                  var loadScriptAsync = function(uri){
                    return new Promise((resolve, reject) => {
                      var tag = document.createElement('script');
                      tag.src = uri;
                      tag.async = true;
                      tag.onload = () => {
                        resolve();
                      };
                    var firstScriptTag = document.getElementsByTagName('script')[0];
                    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
                  });
                  }
                  var scriptLoaded = loadScriptAsync('chat-script.js');

                  scriptLoaded.then(function(){
                    console.log('loaded chat script');
                  });
                `}
              </script>
            </Helmet>
          :
            ''
        }

        <div className="stripe_9">
          <h1 className="ml-2">Contact Us</h1>
          <div className="card-grid contact">
            <div className="card">
              <div className="inner_4">
                <h2 className="fontSize2 mt-0 mb-0 pb-2">Call us at</h2>

                <a href={"tel:" + this.props.phone} className="colorBrandSecondary fontSize4 fontMedium block pb-0 phone-number">{this.props.phone}</a>
                {/* <div className="pb-3 link chat-trigger" onClick={this.clickedChat}>or chat with a representative</div> */}


                <h3 className="colorGrey3">Available during these hours - </h3>

                {
                  this.props.data.map((d, i) => {
                    return(
                      <div key={'day' + i} className="block pb-1 fontSize0 clearfix">
                        <div className="grid1of2">
                          <div>{d.dayName}</div>
                        </div>
                        <div className="grid1of2">
                          <div>{d.dayStartTime} - {d.dayEndTime}</div>
                        </div>
                      </div>

                    );
                  })

                }

              </div>
            </div>

            <div className="card">
              <div className="inner_4">
                <h2 className="fontSize2 mt-0 mb-0 pb-2">Schedule a Meeting</h2>
                <div className="block pb-2">
                  <p className="inline colorGrey4">Already working with a Staff Member? Find them in our</p>
                  <Link to="staff-directory" className="link inline">Staff Directory</Link>
                </div>
                <div className="pb-2">
                  <label className="radio mb-1" htmlFor="radio1">
                    <input className="radio--input" type="radio" id="radio1" name="radio" defaultChecked={true} aria-checked={true} aria-label="meet with a home loan expert"/>
                    <div className="radio--icon"></div>
                    <div className="radio--label fontRegular">Meet with a Home Loan Expert</div>
                  </label>


                </div>
                <div className="pb-3 clearfix">
                  <Link to="/schedule/loan-officer" datass="some data coming in..." className="block pull-left button button-primary">Next</Link>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="inner_4">
                <h2 className="fontSize2 mt-0 mb-0 pb-2">Locations</h2>
                <div className="grid1of2 inline-block noGutter">
                  <div className="checkbox mb-1" onClick={() => this.changeLoc()}>
                    <input className="checkbox--input" id="loc" type="checkbox"  aria-label="show locations"aria-checked={true} name="locations-check" checked={(this.state.loc) ? true : false} onChange={()=> console.log('logging change')} />
                    <div className="checkbox--icon"></div>
                    <div className="checkbox-label">Locations</div>
                  </div>
                </div>
                <div className="grid1of2 inline-block noGutter pull-right">
{/*
                  <div className="checkbox mb-2" onClick={() => this.changeAtm()}>
                    <input className="checkbox--input" id="atm" type="checkbox" aria-label="show atms" role="show atms" name="atms-check" checked={(this.state.atm) ? true : false} onChange={()=> console.log('logging change')} />
                    <div className="checkbox--icon"></div>
                    <div className="checkbox-label">ATMs</div>
                  </div>
*/}
                </div>

                <div className="pb-2 clearfix">
                  <input id="passToLocation" placeholder="Search by City and State, or Zip Code" aria-label="search by city and state or zip code" onChange={evt => this.updateInputValue(evt)} />
                </div>

                <Link to={`/locations?searching=${this.state.passToLocation}&locationsShow=${this.state.loc}&atmsShow=${this.state.atm}`} className=" block pull-right button button-primary mb-3">
                  Find
                </Link>

                {/*<span className="link" onClick={()=>this.testButton()}>find</span>*/}


                <Link to={'/locations'} className="pl-2 link pull-left ß">
                  View locations near me
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Contact;
