import React, { Component } from 'react';
import axios from 'axios';

import {Helmet} from "react-helmet";

import FormSubmitModal from './FormSubmitModal';

import mixpanel from 'mixpanel-browser';

class ConstructionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      FirstName:  '',
      LastName: '',
      Email: '',
      Phone: '',
      City: '',
      methodofContact: '',
      loanQuizLand: '',
      loanQuizCreditScore: '',
      loanQuizDownPayment: '',
      modalIsOpen: false,
      formSubmitted: false,

      input1: false,
      input2: false,
      input3: false,
      input4: false,
      input5: false,
      input6: false,
      input7: false,
      input8: false,
      input9: false,

      pixelConversion: false,

    }

    this.handleChangeFirstName = this.handleChangeFirstName.bind(this);
    this.handleChangeLastName = this.handleChangeLastName.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePhone = this.handleChangePhone.bind(this);
    this.handleChangeCity = this.handleChangeCity.bind(this);
    this.handleChangeContact = this.handleChangeContact.bind(this);
    this.handleChangeLand = this.handleChangeLand.bind(this);
    this.handleChangeCreditScore = this.handleChangeCreditScore.bind(this);
    this.handleChangeDownPayment = this.handleChangeDownPayment.bind(this);

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
    console.log(t.length);

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

      console.log('we are deleting, ignore...');
      this.setState({
        Phone: t,
      })
      return true;
    }


    if (t.slice(-1) === '-') {
      console.log('do not let them enter a hyphen  manually');
      return false;
    }



    console.log('logging number of hyphens');
    let hyphens = (t.match(/-/g) || []).length;
    console.log(hyphens);

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


    if (validNumber || event.target.value === '' || hyphens === 1 || hyphens === 2) {
      this.setState({Phone: event.target.value, input4: false});
    }
    else{
      return false;
    }
  }

  handleChangeCity(event) {
    this.setState({City: event.target.value, input5: false});
  }

  handleChangeContact(event) {

    let val = this.contactSelect;
    let data = val.options[val.selectedIndex].value;
    this.setState({
      methodofContact: data,
      input6: false
    });

  }

  handleChangeLand(event) {
    this.setState({loanQuizLand: event.target.value});
  }

  handleChangeCreditScore(event) {
    //this.setState({loanQuizCreditScore: event.target.value});
    let val = this.creditSelect;
    let data = val.options[val.selectedIndex].value;
    this.setState({
      loanQuizCreditScore: data,
    });
  }

  handleChangeDownPayment(event) {
    this.setState({loanQuizDownPayment: event.target.value});
  }


  validation(){
    let email = this.validateEmail();
    let phone = this.validatePhone();

    let success= true;

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
    if (this.state.city === '') {
      this.setState({
        input5: true,
      });
      success = false;
    }
    if (this.state.methodofContact === '' || this.state.methodofContact === 'none') {
      this.setState({
        input6: true,
      });
      success = false;
    }

    if (this.state.loanQuizLand === '') {
      this.setState({
        input7: true,
      });
      success = false;
    }

    if (this.state.loanQuizCreditScore === '' || this.state.loanQuizCreditScore === 'none') {
      this.setState({
        input8: true,
      });
      success = false;
    }

    if (this.state.loanQuizDownPayment === '') {
      this.setState({
        input9: true,
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
         "loanQuizHomeType":"Construction",
         "FirstName": this.state.FirstName,
         "LastName": this.state.LastName,
         "Email": this.state.Email,
         "Phone": this.state.Phone,
         "City": this.state.City,
         "methodofContact": this.state.methodofContact,
         "loanQuizTargetPrice": "",
         "loanQuizPurchasePeriod":"",
         "loanQuizHomeUsage": this.state.loanQuizHomeUsage,
         "loanQuizAnnualIncome":"",
         "loanQuizDownPayment": "",
         "loanQuizCreditScore": "",
         "loanQuizCurrentLoanBalance":"",
         "loanQuizSecondMortgage":"",
         "loanQuizMonthlyDebt":"",
         "loanQuizCurrentLoanDate":"",
         "loanQuizCurrentHomeValue":"",
         "loanQuizAdditionalCash": this.state.loanQuizAdditionalCash,
         "loanQuizBuilder":"",
         "loanQuizLand": "purchase land = " + this.state.loanQuizLand,
         "LeadSource":"Web Landing Page MQLF",
         "utm_content": this.props.queryString,
         "mqlfSubmissionDate": dateString,
         "mQLFFormCompletionStep":"",
         "mQLFReferrer":""
       };

       const createHeaders = {headers: {

        'Content-Type': 'application/json',
        'client_id' : 'e0a4f1584a854662b138520c797d4866',
        'client_secret' : 'D4E0F8Db49DE4b6ebe00DC24698360DF',
      }};

      axios.post('https://mqlf-webleads-api.us-w2.cloudhub.io/mortgage/mqlflead/marketo/live/v2/addPartialLead', formData, createHeaders).then(res => {
        if(res) {
         //console.log(res);
         console.log('a partial lead has been sent');


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


      let d = new Date();
      let y = d.getFullYear();
      let m = d.getMonth();
      let day = d.getDate();

      let month = (m < 10) ? ('0' + m) : m;
      let fullDay = (day < 10) ? ('0' + day) : day;
      let dateString = '' +  month + '/' + fullDay + '/' + y;

      const formData = {
         "loanQuizHomeType":"Construction",
         "FirstName": this.state.FirstName,
         "LastName": this.state.LastName,
         "Email": this.state.Email,
         "Phone": this.state.Phone,
         "City": this.state.City,
         "methodofContact": this.state.methodofContact,
         "loanQuizTargetPrice": "",
         "loanQuizPurchasePeriod":"",
         "loanQuizHomeUsage": this.state.loanQuizHomeUsage,
         "loanQuizAnnualIncome":"",
         "loanQuizDownPayment": "",
         "loanQuizCreditScore": "",
         "loanQuizCurrentLoanBalance":"",
         "loanQuizSecondMortgage":"",
         "loanQuizMonthlyDebt":"",
         "loanQuizCurrentLoanDate":"",
         "loanQuizCurrentHomeValue":"",
         "loanQuizAdditionalCash": this.state.loanQuizAdditionalCash,
         "loanQuizBuilder":"",
         "loanQuizLand": "purchase land = " + this.state.loanQuizLand,
         "LeadSource":"Web Landing Page MQLF",
         "utm_content": this.props.queryString,
         "mqlfSubmissionDate": dateString,
         "mQLFFormCompletionStep":"",
         "mQLFReferrer":""
       };

       const createHeaders = {headers: {

        'Content-Type': 'application/json',
        'client_id' : 'e0a4f1584a854662b138520c797d4866',
        'client_secret' : 'D4E0F8Db49DE4b6ebe00DC24698360DF',
      }};


      mixpanel.track('Construction Form - LP', {
        form: 'Construction Form - LP',
        QueryString : formData['utm_content'],
        usedCalculator: this.props.usedCalc,
        clickedScrollRates: this.props.clickedScrollRates,
        clickedScrollForm: this.props.clickedScrollForm,
      });

      this.setState({

          formSubmitted: true,
         })

      axios.post('https://mqlf-webleads-api.us-w2.cloudhub.io/mortgage/mqlflead/marketo/live/v2/addNewLead', formData, createHeaders).then(res => {
        if(res) {
         //console.log(res);
         //console.log('a form has been submitted to mqlf...');
         this.setState({
          modalIsOpen: true,
          formSubmitted: true,
          pixelConversion: true,
         })

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
      {
        (this.state.pixelConversion && this.props.submitPixel !== null)
        ?
          <Helmet>
            <script type='text/javascript'>
            {`
              ${this.props.submitPixel}

            `}
            </script>
          </Helmet>
        :
          ''
      }
      <FormSubmitModal modalIsOpen={this.state.modalIsOpen} closeModal={this.closeModal} successTag={this.props.successTag}/>

        <form id="constructionForm" className="grey1 inner_3">

          <div className={(this.state.input1) ? "input-group invalid" : "input-group"}>
            <label>First Name</label>
            <input onBlur={this.addPartialLead} onChange={this.handleChangeFirstName} aria-label="first name"/>
            <div className={(this.state.input1) ? "error-message mt-1 is-visible" : "error-message mt-1 is-hidden" }>
              First Name is required.
            </div>
          </div>

          <div className={(this.state.input2) ? "input-group invalid" : "input-group"}>
            <label>Last Name</label>
            <input onBlur={this.addPartialLead} onChange={this.handleChangeLastName} aria-label="last name"/>
            <div className={(this.state.input2) ? "error-message mt-1 is-visible" : "error-message mt-1 is-hidden" }>
              Last Name is required.
            </div>
          </div>

          <div className={(this.state.input3) ? "input-group invalid" : "input-group"}>
            <label>Email</label>
            <input onBlur={this.addPartialLead} onChange={this.handleChangeEmail} aria-label="email"/>
            <div className={(this.state.input3) ? "error-message mt-1 is-visible" : "error-message mt-1 is-hidden" }>
              A valid Email is required.
            </div>
          </div>

          <div className={(this.state.input4) ? "input-group invalid" : "input-group"}>
            <label>Phone</label>
            <input onBlur={this.addPartialLead} type="text" maxLength="12" aria-label="phone" onChange={this.handleChangePhone} value={this.state.Phone}/>
            <div className={(this.state.input4) ? "error-message mt-1 is-visible" : "error-message mt-1 is-hidden" }>
              10 digit Phone number is required.
            </div>
          </div>

          <div className={(this.state.input5) ? "input-group invalid" : "input-group"}>
            <label>City</label>
            <input onBlur={this.addPartialLead} aria-label="city" onChange={this.handleChangeCity}/>
            <div className={(this.state.input5) ? "error-message mt-1 is-visible" : "error-message mt-1 is-hidden" }>
              City is required.
            </div>
          </div>

          <div className={(this.state.input6) ? "input-group invalid" : "input-group"}>
            <label>Method of Contact</label>
            <select onBlur={this.addPartialLead} className="select mb-1" aria-label="contact method" ref={(contactSelect) => { this.contactSelect = contactSelect; }} onChange={() => this.handleChangeContact()}>
              <option value='none'>Choose</option>
              <option value='phone'>Phone</option>
              <option value='email'>Email</option>
              <option value='text'>Text</option>
            </select>
            <div className={(this.state.input6) ? "error-message mt-1 is-visible" : "error-message mt-1 is-hidden" }>
              Selection is a required.
            </div>
          </div>


          <div className={(this.state.input7) ? "input-group invalid" : "input-group"}>
            <label>Have you purchased the land?</label>
            <input onBlur={this.addPartialLead} aria-label="have you purchased land" onChange={this.handleChangeLand}/>
            <div className={(this.state.input7) ? "error-message mt-1 is-visible" : "error-message mt-1 is-hidden" }>
              Can't be left blank.
            </div>
          </div>

          <div className={(this.state.input8) ? "input-group invalid" : "input-group"}>
            <label>What is your credit score?</label>
            <select onBlur={this.addPartialLead} className="select mb-1" aria-label="credit score" ref={(creditSelect) => { this.creditSelect = creditSelect; }} onChange={() => this.handleChangeCreditScore()}>
              <option value="none">Select an option</option>
              <option value="720 or Above">720 or Above</option>
              <option value="680 to 719">680 to 719</option>
              <option value="640 to 679">640 to 679</option>
              <option value="580 to 639">580 to 639</option>
              <option value="579 or less">579 or less</option>
              <option value="I don't know">I don't know</option>
            </select>
            <div className={(this.state.input8) ? "error-message mt-1 mb-1 is-visible" : "error-message mt-1 mb-1 is-hidden" }>
              Selection is required.
            </div>
          </div>

          <div className={(this.state.input9) ? "input-group invalid mb-1" : "input-group mb-1"}>
            <label>How much do you have for a down payment?</label>
            <input onBlur={this.addPartialLead} type="number" max="999999999" aria-label="down payment amount" onChange={this.handleChangeDownPayment}/>
            <div className={(this.state.input9) ? "error-message mt-1 mb-2 is-visible" : "error-message mt-1 mb-2 is-hidden" }>
              Can't be left blank.
            </div>
          </div>
          {
            (this.state.formSubmitted) ?
            <button className="button button-primary full-width fontSize1 disabled" aria-label="submit" type="submit" disabled={true}>Successfully submitted</button>
            : <button className="button button-primary full-width fontSize1" aria-label="submit" type="submit">Submit</button>


          }
        </form>
        </div>
    );
  }
}


export default ConstructionForm;
