import React, { Component } from 'react';
import axios from 'axios';


import FormSubmitModal from './FormSubmitModal';

//import Mixpanel from '../../Mixpanel';

import mixpanel from 'mixpanel-browser';



class BusinessForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      FirstName:  '',
      LastName: '',
      Email: '',
      Phone: '',
      Business: '',
      InterestedIn: '',
      HowDidYouHear: '',
      modalIsOpen: false,
      formSubmitted: false,

      input1: false,
      input2: false,
      input3: false,
      input4: false,
      input5: false,
      input6: false,
      input7: false,

      startedForm: false,
    }

    this.handleChangeFirstName = this.handleChangeFirstName.bind(this);
    this.handleChangeLastName = this.handleChangeLastName.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePhone = this.handleChangePhone.bind(this);
    this.handleChangeBusiness = this.handleChangeBusiness.bind(this);
    this.handleChangeInterestedIn = this.handleChangeInterestedIn.bind(this);
    this.handleChangeHowDidYouHear = this.handleChangeHowDidYouHear.bind(this);


    this.validation = this.validation.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
    this.validatePhone = this.validatePhone.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);

    this.addPartialLead = this.addPartialLead.bind(this);
  }

  componentDidMount(){
    mixpanel.init('d96d9f1409ced72777048f912ef7591e');
  }


  handleChangeFirstName(event) {
    this.setState({FirstName: event.target.value, input1: false});
  }

  handleChangeLastName(event) {
    this.setState({LastName: event.target.value, input2: false});
  }

  handleChangeEmail(event) {
    this.setState({Email: event.target.value, input3: false});
  }

  handleChangePhone(event) {
    let t = event.target.value;
    //console.log(t.length);

    let c = /^\d+$/;
    let validNumber = c.test(event.target.value);



    //we are deleting characters, delete two if it is a hyphen
    if (t.length < this.state.Phone.length) {

      if (this.state.Phone.slice(-1) === '-') {
        console.log('remove two characters since we are deleting a hyphen');
        var theStringMinusOne = t.substring(0, t.length-1);
        this.setState({
          Phone: theStringMinusOne,
        });
        return true;
      }

      //console.log('we are deleting, ignore...');
      this.setState({
        Phone: t,
      })
      return true;
    }


    if (t.slice(-1) === '-') {
      //console.log('do not let them enter a hyphen  manually');
      return false;
    }



    //console.log('logging number of hyphens');
    let hyphens = (t.match(/-/g) || []).length;
    //console.log(hyphens);

    //if length is 3, we add the first hyphen
    if (t.length === 3) {

        this.setState({Phone: event.target.value + '-', input4: false});
        return true;

    }

    //if length is 7 we add the secnod hyphen manually
    if (t.length === 7) {

        this.setState({Phone: event.target.value + '-', input4: false});
        return true;

    }


    if (validNumber || event.target.value === '' || (hyphens === 1 && 4 < t.length < 8) || (hyphens === 2 && t.length > 8) ) {
      //console.log('in final if catch...');
      this.setState({Phone: event.target.value, input4: false});
    }
    else{
      return false;
    }
  }


  handleChangeBusiness(event) {
    this.setState({Business: event.target.value, input5: false});
  }

  handleChangeInterestedIn(event) {
    let val = this.InterestedSelect;
    let data = val.options[val.selectedIndex].value;
    this.setState({
      InterestedIn: data,
      input6: false
    });
  }


  handleChangeHowDidYouHear(event) {
    this.setState({HowDidYouHear: event.target.value, input7: false});
  }



  validation(){
    let email = this.validateEmail();
    let phone = this.validatePhone();

    let success = true;

    if (this.state.FirstName === '') {
      this.setState({
        input1: true,
      });
      success = false;
    }
    if (this.state.LastName === '') {
      this.setState({
        input2: true,
      });
      success = false;
    }
    if (email === false) {
      this.setState({
        input3: true,
      });
      success = false;
    }
    if (phone === false) {
      this.setState({
        input4: true,
      });
      success = false;
    }
    if (this.state.Business === '') {
      this.setState({
        input5: true
      });
      success = false;
    }
    if (this.state.InterestedIn === '' || this.state.InterestedIn === 'none') {
      this.setState({
        input6: true,
      });
      success = false;
    }
    if (this.state.HowDidYouHear === '') {
      this.setState({
        input7: true
      });
      success = false;
    }
      return success;
  }

  validateEmail(){
    // eslint-disable-next-line
    const re = /^(([^<>()\[\]\\.,;:\s@“]+(\.[^<>()\[\]\\.,;:\s@“]+)*)|(“.+“))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const validEmail = re.test(String(this.state.Email).toLowerCase());

    if (this.state.Email === "") {
      //console.log('email is empty');
      return false;
    }
    else if(validEmail === false){
      //console.log('email did not pass validation');
      return false;
    }
    else{
      //console.log('email is good');
      return true;
    }
  }

  validatePhone(){
    let p = /^\d{3}-\d{3}-\d{4}$/;
    let validPhone = p.test(this.state.Phone);

    if (this.state.Phone === "") {
      //console.log('phone is empty');
      return false;
    }
    else if(validPhone === false){
      //console.log('phone did not pass validation');
      return false;
    }
    else{
      //console.log('phone is good');
      return true;
    }

  }


  addPartialLead(){
    let d = new Date();
    let y = d.getFullYear();
    let m = d.getMonth();
    let day = d.getDate();

    let month = (m < 10) ? ('0' + m) : m;
    let fullDay = (day < 10) ? ('0' + day) : day;
    let dateString = '' +  month + '/' + fullDay + '/' + y;

    const formData = {
       "FirstName": this.state.FirstName,
       "LastName": this.state.LastName,
       "Email": this.state.Email,
       "Phone": this.state.Phone,
       "Business": this.state.Business,
       "InterestedIn": this.state.InterestedIn,
       "HowDidYouHear": this.state.HowDidYouHear,
       "LeadSource":"Web BQLF",
       "utm_content": this.props.queryString,
       "mqlfSubmissionDate": dateString,
     };

     const createHeaders = {headers: {

      'Content-Type': 'application/json',
      'client_id' : 'e0a4f1584a854662b138520c797d4866',
      'client_secret' : 'D4E0F8Db49DE4b6ebe00DC24698360DF',
    }};

    axios.post('https://mqlf-webleads-api.us-w2.cloudhub.io/mortgage/mqlflead/marketo/live/v2/addPartialLead', formData, createHeaders).then(res => {
      if(res) {
       //console.log(res);
       //console.log('a partial lead has been submitted');


      }
    })
    .catch(error => {
      //console.log(error);
    });

  }

  handleSubmit(event){
    event.preventDefault();
    //console.log('in the submit function...');

    let validate = this.validation();

    if (validate === true) {

      this.setState({
        formSubmitted: true,
      });

      let d = new Date();
      let y = d.getFullYear();
      let m = d.getMonth();
      let day = d.getDate();

      let month = (m < 10) ? ('0' + m) : m;
      let fullDay = (day < 10) ? ('0' + day) : day;
      let dateString = '' +  month + '/' + fullDay + '/' + y;

      const formData = {
         "FirstName": this.state.FirstName,
         "LastName": this.state.LastName,
         "Email": this.state.Email,
         "Phone": this.state.Phone,
         "Business": this.state.Business,
         "InterestedIn": this.state.InterestedIn,
         "HowDidYouHear": this.state.HowDidYouHear,
         "LeadSource":"Web BQLF",
         "utm_content": this.props.queryString,
         "mqlfSubmissionDate": dateString,

       };

       const createHeaders = {headers: {

        'Content-Type': 'application/json',
        'client_id' : 'e0a4f1584a854662b138520c797d4866',
        'client_secret' : 'D4E0F8Db49DE4b6ebe00DC24698360DF',
      }};


      axios.post('https://mqlf-webleads-api.us-w2.cloudhub.io/mortgage/mqlflead/marketo/live/v2/addNewLead', formData, createHeaders).then(res => {
        if(res) {
         this.setState({
          modalIsOpen: true,
          formSubmitted: true,
         })


          mixpanel.init('d96d9f1409ced72777048f912ef7591e');
          mixpanel.track('BQLF - business', {
            firstName: this.state.FirstName,
            lastName: this.state.LastName,
            email: this.state.Email,
            phone: this.state.Phone,
          });

        }
      })
      .catch(error => {
        //console.log(error);

        this.setState({
          modalIsOpen: false,
          formSubmitted: false,
         })
      });



      const ourHeaders = {headers: {

        'Content-Type': 'application/json',
      }};


      axios.post('https://solarityapi.herokuapp.com/api/mqlf/create', formData, ourHeaders).then(res => {
        if(res) {
         //console.log(res);
         //console.log('a form has been submitted to our endpoint...');


        }
      })
      .catch(error => {
        //console.log(error);


      });




    }
    else{
      //console.log('validation did not pass');
    }
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


  render() {
    return (
  		<div >
      <FormSubmitModal modalIsOpen={this.state.modalIsOpen} closeModal={this.closeModal} successTag={this.props.successTag}/>

        {/*<form id="purchaseForm" onSubmit={this.handleSubmit}>*/}
          <div className={"col-6 inline-block " + ((this.state.input1) ? "input-group invalid" : "input-group")}>
            <div className="d-mr-1">
              <label>First Name</label>
              <input onBlur={this.addPartialLead} aria-label="first name" onChange={this.handleChangeFirstName}/>
              <div className={(this.state.input1) ? "error-message mt-1 mb-1 is-visible" : "error-message mt-1 is-hidden" }>
                First Name is required.
              </div>
            </div>
          </div>

          <div className={"col-6 inline-block " + ((this.state.input2) ? "input-group invalid" : "input-group")}>
              <label>Last Name</label>
              <input onBlur={this.addPartialLead} aria-label="last name" onChange={this.handleChangeLastName}/>
              <div className={(this.state.input2) ? "error-message mt-1 mb-1 is-visible" : "error-message mt-1 is-hidden" }>
                Last Name is required.
              </div>
          </div>

          <div className={"col-6 inline-block " + ((this.state.input3) ? "input-group invalid" : "input-group")}>
            <div className="d-mr-1">
              <label>Email</label>
              <input onBlur={this.addPartialLead} aria-label="email" onChange={this.handleChangeEmail}/>
              <div className={(this.state.input3) ? "error-message mt-1 mb-1 is-visible" : "error-message mt-1 is-hidden" }>
                A valid Email is required.
              </div>
            </div>
          </div>

          <div className={"col-6 inline-block " + ((this.state.input4) ? "input-group invalid" : "input-group")}>
            <label>Phone</label>
            <input onBlur={this.addPartialLead} type="text" aria-label="phone" maxLength="12" onChange={this.handleChangePhone} value={this.state.Phone}/>
            <div className={(this.state.input4) ? "error-message mt-1 mb-1 is-visible" : "error-message mt-1 is-hidden" }>
              10 digit Phone number is required.
            </div>
          </div>

          <div className={"col-6 inline-block " + ((this.state.input5) ? "input-group invalid" : "input-group")}>
            <div className="d-mr-1">
              <label>Business Name</label>
              <input onBlur={this.addPartialLead} type="text" aria-label="phone" maxLength="12" onChange={this.handleChangeBusiness} value={this.state.Business}/>
              <div className={(this.state.input5) ? "error-message mt-1 mb-1 is-visible" : "error-message mt-1 is-hidden" }>
                A Business name is required.
              </div>
            </div>
          </div>



          <div className={"col-6 inline-block " + ((this.state.input6) ? "input-group invalid" : "input-group")}>
            <label>Interested in</label>
            <select onBlur={this.addPartialLead} className="select mb-1" aria-label="contact method" ref={(InterestedSelect) => { this.InterestedSelect = InterestedSelect; }} onChange={() => this.handleChangeInterestedIn()}>
              <option value='none'>Choose</option>
              <option value='1-4 family residential investment units'>1-4 family residential investment units</option>
              <option value='5+ family residential investment units'>5+ family residential investment units</option>
            </select>
            <div className={(this.state.input6) ? "error-message mt-1 mb-1 is-visible" : "error-message mt-1 is-hidden" }>
              Selection is required.
            </div>
          </div>


          <div className={"col-6 inline-block " + ((this.state.input7) ? "input-group invalid" : "input-group")}>
            <div className="d-mr-1">
              <label>How did you hear about us</label>
              <input onBlur={this.addPartialLead} type="text" aria-label="phone" maxLength="12" onChange={this.handleChangeHowDidYouHear} value={this.state.HowDidYouHear}/>
              <div className={(this.state.input7) ? "error-message mt-1 mb-1 is-visible" : "error-message mt-1 is-hidden" }>
                Field is required.
              </div>
            </div>
          </div>




          {
            (this.state.formSubmitted) ?
            <button className="button button-primary full-width fontSize1 disabled" aria-label="submit" type="submit" disabled={true}>Successfully submitted</button>
            : <button className="button button-primary full-width fontSize1" aria-label="submit" type="submit" onClick={this.handleSubmit}>Submit</button>


          }
          <div className="full-width inline-block ">
            <p className="secure-disclaimer"> * This form is secure. </p>
          </div>
        {/*</form>*/}

      </div>
    );
  }
}


export default BusinessForm;
