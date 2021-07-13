import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import isEmpty from 'lodash/isEmpty';

import PropTypes from 'prop-types';



class NotificationBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      show: '',
      notificationText: '',
      linkText: '',
      linkURL: '',
    }


    this.closeNotification = this.closeNotification.bind(this);
  }


  componentDidMount() {
    //console.log('we are in the notification bar component');
    // console.log(this.props.notifications);
    // console.log(this.props);
  }


  closeNotification(index) {

    this.props.dismiss(index);

  }





  render() {
    let notificationText = this.state.notificationText;
    let showInitial = false;
    let linkUrl = this.state.linkURL;
    let linkText = this.state.linkText;
    let displayLink = false;
    let notificationIndex = 0;


    if (this.props.notifications.length > 0) {
      //console.log('we have notifications');
      for (let i = 0; i < this.props.notifications.length; i++) {
        //console.log(`notification number ${i}`)
        if (this.props.notifications[i].pagesToDisplayOn.length > 0) {
          //console.log('we have pages to display on');
          for (let x = 0; x < this.props.notifications[i].pagesToDisplayOn.length; x++) {
            if (('/' + this.props.notifications[i].pagesToDisplayOn[x].uri) === this.props.location.pathname && this.props.dismissed[i] !== true) {
              //console.log('we need to display on this page');
              notificationText = this.props.notifications[i].description;
              linkUrl = this.props.notifications[i].linkURL;
              linkText = this.props.notifications[i].linkText;
              showInitial = true;
              notificationIndex = i;
              if (!isEmpty(linkUrl) && !isEmpty(linkText)) {
                displayLink = true;
              } else { displayLink = false ;}

            }
            if (this.props.notifications[i].pagesToDisplayOn[x].uri === '__home__' && this.props.location.pathname === '/') {
              notificationText = this.props.notifications[i].description;
              linkUrl = this.props.notifications[i].linkURL;
              linkText = this.props.notifications[i].linkText;
              showInitial = true;
              notificationIndex = i;
              if (!isEmpty(linkUrl) && !isEmpty(linkText)) {
                displayLink = true;
              } else { displayLink = false ;}
            }
          }
        }
        else if (this.props.notifications[i].pagesToDisplayOn.length === 0 && this.props.dismissed[i] !== true) {
          //console.log('we need to display this on all pages...');
          notificationText = this.props.notifications[i].description;
          linkUrl = this.props.notifications[i].linkURL;
          linkText = this.props.notifications[i].linkText;
          showInitial = true;
          notificationIndex = i;
          if (!isEmpty(linkUrl) && !isEmpty(linkText)) {
            displayLink = true;
          } else { displayLink = false ;}
        }

      }
    }




    return (
      <div>
        {
          (this.props.notifications.length > 0 && showInitial && this.props.dismissed[notificationIndex] === false)
            ?
            <div className={`notificationBar brandSecondary mb-2 ${this.state.show}`}>
              <div className="white">
                {notificationText}
                { (!displayLink) ? <span className="is-hidden"></span> : <a href={linkUrl} target="blank" className={`white directionalLink`}> {linkText} <span className="feather icon-arrow-right"></span></a>} 

                </div>
              <div className="white pr-1 pl-1" >
                <button className="brandSecondary" onClick={() => this.closeNotification(notificationIndex)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
              </div>
            </div>

            :
            <div className="is-hidden"></div>

        }
      </div>



    );
  }


  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  }

}





export default withRouter(NotificationBar);
