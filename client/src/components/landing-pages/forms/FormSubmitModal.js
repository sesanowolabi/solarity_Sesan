import React, { Component } from 'react';
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


class FormSubmitModal extends Component {

constructor(props) {
	super(props);
	this.state = {
		

	}
}

afterOpenModal(){

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
            <div style={{display:'none'}} dangerouslySetInnerHTML={{__html: this.props.successTag}}></div>
	          <div className="fontSize1 fontMedium">Thank you, your inquiry has been received.</div>
	          <div className="pb-2 fontSize0"></div>
            <div className="button ml-2" onClick={this.props.closeModal}>Close</div>
            <img src='https://rdcdn.com/ct?aid=17546&e=1' height='1' width='1' alt="pixel" />
          </div>
        </Modal>
    	
	    
    );
  }
}


export default FormSubmitModal;
