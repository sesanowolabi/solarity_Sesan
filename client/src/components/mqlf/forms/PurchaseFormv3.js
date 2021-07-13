import React, { Component } from 'react';
import axios from 'axios';



import FormSubmitModal from './FormSubmitModal';
import {Helmet} from "react-helmet";
//import Mixpanel from '../../Mixpanel';

import mixpanel from 'mixpanel-browser';



class PurchaseForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      FirstName:  '',
      LastName: '',
      Email: '',
      Phone: '',
      Comments: '',
      City: '',
      methodofContact: '',
      loanQuizTargetPrice: '',
      loanQuizDownPayment: '',
      loanQuizCreditScore:  '',
      modalIsOpen: false,
      formSubmitted: false,
      loanType: '',
      timeframe: '',

      input1: false,
      input2: false,
      input3: false,
      input4: false,
      input5: false,
      input6: false,
      input7: false,
      input8: false,

      startedForm: false,
      pixelConversion: false,
    }

    this.handleChangeFirstName = this.handleChangeFirstName.bind(this);
    this.handleChangeLastName = this.handleChangeLastName.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePhone = this.handleChangePhone.bind(this);
   // this.handleChangeComments = this.handleChangeComments.bind(this);
   // this.handleChangeCreditScore = this.handleChangeCreditScore.bind(this);
   // this.handleChangeLoanType = this.handleChangeLoanType.bind(this);
   // this.handleChangeLoanTime = this.handleChangeLoanTime.bind(this);

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

  componentDidUpdate(prevProps, prevState){
    if (this.props.focusFirstFormField !== prevProps.focusFirstFormField && prevProps.focusFirstFormField !== true) {
      this.firstInput.focus();
      this.props.resetFocus();
    }
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

  handleChangeComments(event) {
    this.setState({Comments: event.target.value, input5: false});
  }

  /*handleChangeCreditScore(event) {
    //this.setState({loanQuizCreditScore: event.target.value});
    let val = this.creditSelect;
    let data = val.options[val.selectedIndex].value;
    this.setState({
      loanQuizCreditScore: data,
      input6: false
    });
  }*/

  /*handleChangeLoanType(event) {
    //this.setState({loanQuizCreditScore: event.target.value});
    let val = this.typeSelect;
    let data = val.options[val.selectedIndex].value;
    this.setState({
      loanType: data,
      input7: false
    });
  }*/

   /* handleChangeLoanTime(event) {
    //this.setState({loanQuizCreditScore: event.target.value});
    let val = this.timeframeSelect;
    let data = val.options[val.selectedIndex].value;
    this.setState({
      timeframe: data,
      input8: false
    });
  }*/


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
      console.log('in final if catch...');
      this.setState({Phone: event.target.value, input4: false});
    }
    else{
      return false;
    }
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

    m = m + 1;
    let month = (m < 10) ? ('0' + m) : m;
    let fullDay = (day < 10) ? ('0' + day) : day;
    let dateString = '' +  month + '/' + fullDay + '/' + y;

    const formData = {
       "loanQuizHomeType": "",
       "FirstName": this.state.FirstName,
       "LastName": this.state.LastName,
       "Email": this.state.Email,
       "Phone": this.state.Phone,
       "City": '',
       "Comments": "",
       "methodofContact": '',
       "loanQuizTargetPrice": '',
       "loanQuizPurchasePeriod":"",
       "loanQuizHomeUsage":"",
       "loanQuizAnnualIncome":"",
       "loanQuizDownPayment": '',
       "loanQuizCreditScore": "",
       "loanQuizCurrentLoanBalance":"",
       "loanQuizSecondMortgage":"",
       "loanQuizMonthlyDebt":"",
       "loanQuizCurrentLoanDate":"",
       "loanQuizCurrentHomeValue":"",
       "loanQuizAdditionalCash":"",
       "loanQuizBuilder":"",
       "loanQuizLand":"",
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
       console.log(res);
       console.log('a partial lead has been submitted');


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
       "loanQuizHomeType": "",
       "FirstName": this.state.FirstName,
       "LastName": this.state.LastName,
       "Email": this.state.Email,
       "Phone": this.state.Phone,
       "City": '',
       "Comments": "",
       "methodofContact": '',
       "loanQuizTargetPrice": '',
       "loanQuizPurchasePeriod":"",
       "loanQuizHomeUsage":"",
       "loanQuizAnnualIncome":"",
       "loanQuizDownPayment": '',
       "loanQuizCreditScore": "",
       "loanQuizCurrentLoanBalance":"",
       "loanQuizSecondMortgage":"",
       "loanQuizMonthlyDebt":"",
       "loanQuizCurrentLoanDate":"",
       "loanQuizCurrentHomeValue":"",
       "loanQuizAdditionalCash":"",
       "loanQuizBuilder":"",
       "loanQuizLand":"",
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


      mixpanel.track('Purchase Form - LP', {
        form: 'Purchase Form - LP',
        formData: formData,
        QueryString : formData['utm_content'],
        usedCalculator: this.props.usedCalc,
        clickedScrollRates: this.props.clickedScrollRates,
        clickedScrollForm: this.props.clickedScrollForm,
      });



      axios.post('https://mqlf-webleads-api.us-w2.cloudhub.io/mortgage/mqlflead/marketo/live/v2/addNewLead', formData, createHeaders).then(res => {
        if(res) {
         //console.log(res);
         console.log('a form has been submitted to mqlf...');



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

        <form id="purchaseForm" className="grey1 inner_3 " onSubmit={this.handleSubmit}>
          {
            (this.state.formSubmitted) ?

            <div className="form-confirm text-center ">
              <h1 className="colorBrandPrimary"> Thank You! </h1>
              <h3> We'll be in touch shortly!</h3>
            </div>
            :
            <div>

                <div className="grid pl-0 pr-0 ">

                  <div className="grid1of2">
                    <div className={(this.state.input1) ? "input-group invalid" : "input-group"}>
                      <label>First Name</label>
                      <input onBlur={this.addPartialLead} ref={firstInput => this.firstInput = firstInput} aria-label="first name" onChange={this.handleChangeFirstName} value={this.state.FirstName}/>
                      <div className={(this.state.input1) ? "error-message is-visible" : "error-message is-hidden" }>
                        First Name is required.
                      </div>
                    </div>

                    <div className={(this.state.input3) ? "input-group invalid" : "input-group"}>
                      <label>Email</label>
                      <input onBlur={this.addPartialLead} aria-label="email" onChange={this.handleChangeEmail}/>
                      <div className={(this.state.input3) ? "error-message is-visible" : "error-message is-hidden" }>
                        A valid Email is required.
                      </div>
                    </div>




                  </div>

                  <div className="grid1of2">

                    <div className={(this.state.input2) ? "input-group invalid" : "input-group"}>
                      <label>Last Name</label>
                      <input onBlur={this.addPartialLead} aria-label="last name" onChange={this.handleChangeLastName}/>
                      <div className={(this.state.input2) ? "error-message is-visible" : "error-message is-hidden" }>
                        Last Name is required.
                      </div>
                    </div>

                    <div className={(this.state.input4) ? "input-group invalid" : "input-group"}>
                      <label>Phone</label>
                      <input onBlur={this.addPartialLead} type="text" maxLength="12" aria-label="textbox" onChange={this.handleChangePhone} value={this.state.Phone}/>
                      <div className={(this.state.input4) ? "error-message mt-1 is-visible" : "error-message mt-1 is-hidden" }>
                        10 digit Phone number is required.
                      </div>
                    </div>
                  </div>
              </div>



              {/* <div className={(this.state.input7) ? "input-group invalid " : "input-group "}>
                <label>What type of loan are you interested in?</label>
                <select onBlur={this.addPartialLead} className="select" aria-label="loan type" ref={(typeSelect) => { this.typeSelect = typeSelect; }} onChange={() => this.handleChangeLoanType()}>
                  <option value="none">Select an option</option>
                  <option value="Purchase">Purchase</option>
                  <option value="Refinance">Refinance</option>
                </select>
                <div className={(this.state.input7) ? "error-message mt-1 mb-2 is-visible" : "error-message mt-1 mb-2 is-hidden" }>
                  Selection required.
                </div>
              </div> */}


              {/* <div className={(this.state.input8) ? "input-group invalid " : "input-group "}>
                <label>What is your timeframe for this loan?</label>
                <select onBlur={this.addPartialLead} className="select" aria-label="loan timeframe" ref={(timeframeSelect) => { this.timeframeSelect = timeframeSelect; }} onChange={() => this.handleChangeLoanTime()}>
                  <option value="none">Select an option</option>
                  <option value="0-2 months">0-2 months</option>
                  <option value="3-6 months">3-6 months</option>
                  <option value="6-12 months">6-12 months</option>
                  <option value="12+ months">12+ months</option>
                </select>
                <div className={(this.state.input8) ? "error-message mt-1 mb-2 is-visible" : "error-message mt-1 mb-2 is-hidden" }>
                  Selection required.
                </div>
              </div> */}


              {/* <div className={(this.state.input6) ? "input-group invalid" : "input-group"}>
                <label>Do you know your credit score?</label>
                <select onBlur={this.addPartialLead} className="select" aria-label="credit score" ref={(creditSelect) => { this.creditSelect = creditSelect; }} onChange={() => this.handleChangeCreditScore()}>
                  <option value="none">Select an option</option>
                  <option value="720 or above">720 or above</option>
                  <option value="680 to 719">680 to 719</option>
                  <option value="640 to 679">640 to 679</option>
                  <option value="580 to 639">580 to 639</option>
                  <option value="579 or less">579 or less</option>
                  <option value="I don't know">I don't know</option>
                </select>
                <div className={(this.state.input9) ? "error-message mt-1 mb-2 is-visible" : "error-message mt-1 mb-2 is-hidden" }>
                  Selection required.
                </div>
              </div> */}


              {/* <div className={(this.state.input5) ? "input-group invalid" : "input-group"}>
                <label>Comments about my home loan</label>
                <input onBlur={this.addPartialLead} className="comments" type="text" maxLength="120" aria-label="textbox" onChange={this.handleChangeComments} value={this.state.Comments}/>
              </div> */}

              <button className="button button-primary mt-1 full-width fontSize1" aria-label="submit" type="submit">Get Started</button>

              <div className="full-width inline-block ">
                <div className="secure-disclaimer pt-2"> * This form is secure. </div>
              </div>

            </div>
          }
        </form>

      </div>
    );
  }
}


export default PurchaseForm;
