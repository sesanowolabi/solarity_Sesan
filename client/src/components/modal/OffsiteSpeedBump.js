import React, { Component } from 'react';

import mixpanel from 'mixpanel-browser';

import Modal from 'react-modal';


const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    
  }
};

Modal.setAppElement('#root');


class OffsiteSpeedBump extends Component {

  constructor(props) {
  	super(props);
  	this.state = {
  		
  	}
    this.trackLink = this.trackLink.bind(this);
  }

  afterOpenModal(){

  }
  
  trackLink(buttonName, linkPath){
    mixpanel.init('d96d9f1409ced72777048f912ef7591e');
    mixpanel.track('CTA Link', {
      buttonText: buttonName,
      buttonLink: linkPath,
    });
  }
  
  render() {
  	
  	
    return (

    	<Modal
          isOpen={this.props.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.props.closeModal}
          style={customStyles}
          contentLabel="Offsite Speedbump modal"

        >
          <div className="this-will-be-outer-modal-holder speedbump-modal-outer align-center text-center">
	          <div className="fontSize1 fontMedium">External Link Disclaimer</div>
	          <div className="pb-2 fontSize0">Solarity Credit Union has no control over information at any site hyperlinked to or from this Site. Solarity Credit Union makes no representation concerning and is not responsible for the quality, content, nature, or reliability of any hyperlinked site and is providing this hyperlink to you only as a convenience. The inclusion of any hyperlink does not imply any endorsement, investigation, verification or monitoring by Solarity Credit Union of any information in any hyperlinked site. In no event shall Solarity Credit Union be responsible for your use of a hyperlinked site. Solarity’s privacy policy does not apply to linked websites.</div>
            <div className="button ml-2" onClick={this.props.closeModal}>Go Back</div>
	          <a href={this.props.offsiteLink} className="button button-primary ml-2" onClick={() => this.trackLink(this.props.offsiteLink, 'Continue - Offsite Speed Bump')}>Continue</a>
          </div>
        </Modal>
    	
	    
    );
  }
}


export default OffsiteSpeedBump;
