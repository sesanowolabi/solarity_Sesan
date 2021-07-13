import React, { Component } from 'react';
import axios from 'axios';

import RatesTable from './RatesTable';
import RatesTableLoader from './RatesTableLoader';

import {bellinghamDefault} from './defaults/bellingham';
import {olympiaDefault} from './defaults/olympia';
import {tricitiesDefault} from './defaults/tricities';
import {vancouverDefault} from './defaults/vancouver';
import {yakimaDefault} from './defaults/yakima';

import mixpanel from 'mixpanel-browser';

class RatesCalculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasData: false,
      loading: 'not-loading',
      usedCalculator: false,
      rateData: [],
      county: "yakima",
      stateAbbrev: "WA",
      stateName: "Washington",
      zipCode: "98902",
      firstTimeHomeBuyer: true,
      creditScore: 720,
      propertyType: "SingleFamily",
      propertyUsage: "PrimaryResidence",
      baseLoanAmount: 190000.0,
      downPayment: 10000,
      downPaymentFormatted: "$ 10,000",
      purchasePrice: 200000.0,
      purchasePriceFormatted: "$ 200,000",

      market: 'yakima',
      slug: 'home-loans',
    }

    this.handleChangeZipCode = this.handleChangeZipCode.bind(this);
    this.handleChangeDownPayment = this.handleChangeDownPayment.bind(this);
    this.handleChangePurchasePrice = this.handleChangePurchasePrice.bind(this);
    this.handleChangeCreditScore = this.handleChangeCreditScore.bind(this);
    this.sendIt = this.sendIt.bind(this);


    this.initialLoad = this.initialLoad.bind(this);

    this.callBackendAPI = this.callBackendAPI.bind(this);


    this.newDataEndpoint = this.newDataEndpoint.bind(this);

    this.assignZipCode = this.assignZipCode.bind(this);

    this.assignDownPayment = this.assignDownPayment.bind(this);

    this.assignPurchasePrice = this.assignPurchasePrice.bind(this);
  }


  callBackendAPI = async () => {
    let market = this.props.market;
    let slug = (this.props.slug === 'refinance') ? 'refinance' : 'purchase';
    const response = await fetch(`/api/rates-calculator/get-${market}-${slug}`);
    const body = await response.json();
    // console.log('logging response from api rates calc bellingham');
    // console.log(response);
    // console.log(body);

    if (response.status !== 200) {
      //console.log(body.message);
      throw Error(body.message)
    }
    return body;
  };


  componentDidMount(){
    mixpanel.init('d96d9f1409ced72777048f912ef7591e');

    this.initialLoad();

    this.setState({
      market: this.props.market,
      slug: this.props.slug,
    })

    if (this.props.market === 'bellingham') {
      this.assignZipCode(bellinghamDefault.zipCode);
      this.assignDownPayment(bellinghamDefault.downPayment);
      this.assignPurchasePrice(bellinghamDefault.purchasePrice);
      this.setState({
        baseLoanAmount: bellinghamDefault.baseLoanAmount
      })

    }
    else if(this.props.market === 'olympia'){
      this.assignZipCode(olympiaDefault.zipCode);
      this.assignDownPayment(olympiaDefault.downPayment);
      this.assignPurchasePrice(olympiaDefault.purchasePrice);
      this.setState({
        baseLoanAmount: olympiaDefault.baseLoanAmount
      })
    }
    else if(this.props.market === 'tri-cities'){
      this.assignZipCode(tricitiesDefault.zipCode);
      this.assignDownPayment(tricitiesDefault.downPayment);
      this.assignPurchasePrice(tricitiesDefault.purchasePrice);
      this.setState({
        baseLoanAmount: tricitiesDefault.baseLoanAmount
      })
    }
    else if(this.props.market === 'vancouver'){
      this.assignZipCode(vancouverDefault.zipCode);
      this.assignDownPayment(vancouverDefault.downPayment);
      this.assignPurchasePrice(vancouverDefault.purchasePrice);
      this.setState({
        baseLoanAmount: vancouverDefault.baseLoanAmount
      })
    }
    else{
      this.assignZipCode(yakimaDefault.zipCode);
      this.assignDownPayment(yakimaDefault.downPayment);
      this.assignPurchasePrice(yakimaDefault.purchasePrice);
      this.setState({
        baseLoanAmount: yakimaDefault.baseLoanAmount
      })
    }



  }

  componentDidUpdate(prevProps, prevState){
    if (prevProps.market !== this.props.market || prevProps.slug !== this.props.slug) {
      this.setState({
        market: this.props.market,
        slug: this.props.slug,
      })
      this.initialLoad();
      if (this.props.market === 'bellingham') {
        this.assignZipCode(bellinghamDefault.zipCode);
        this.assignDownPayment(bellinghamDefault.downPayment);
        this.assignPurchasePrice(bellinghamDefault.purchasePrice);

      }
      else if(this.props.market === 'olympia'){
        this.assignZipCode(olympiaDefault.zipCode);
        this.assignDownPayment(olympiaDefault.downPayment);
        this.assignPurchasePrice(olympiaDefault.purchasePrice);
      }
      else if(this.props.market === 'tri-cities'){
        this.assignZipCode(tricitiesDefault.zipCode);
        this.assignDownPayment(tricitiesDefault.downPayment);
        this.assignPurchasePrice(tricitiesDefault.purchasePrice);
      }
      else if(this.props.market === 'vancouver'){
        this.assignZipCode(vancouverDefault.zipCode);
        this.assignDownPayment(vancouverDefault.downPayment);
        this.assignPurchasePrice(vancouverDefault.purchasePrice);
      }
      else{
        this.assignZipCode(yakimaDefault.zipCode);
        this.assignDownPayment(yakimaDefault.downPayment);
        this.assignPurchasePrice(yakimaDefault.purchasePrice);
      }
    }

  }

  initialLoad(){


    this.callBackendAPI()
      .then(res => this.newDataEndpoint(res[0].data.productGroups))
      .catch(err => console.log(`an error has occured.... ${err}`));




  }


  newDataEndpoint(data){
    console.log('new data endpoint');
    console.log(data);

    let temp = this.state.rateData;

    for(let i=0; i < data.length; i++){

    //let string = data[i].productName;
    // let fannie = string.indexOf('Fannie Mae');
    //console.log(`we  we  have a fannie mae entry??? -> ${fannie}`);

    let productReturn = {};


      //we have a fannie mae entry, lets process it and add it  to the data array
      let name = data[i].productName;

      let catchAll = false;

      if (name.indexOf('30 Yr') > -1) {
        productReturn['title'] = '30 year';
        productReturn['type']  = 'fixed';

      }
      else if (name.indexOf('20 Yr') > -1) {
        productReturn['title'] = '20 year';
        productReturn['type']  = 'fixed';

      }
      else if (name.indexOf('15 Yr') > -1) {
        productReturn['title'] = '15 year';
        productReturn['type']  = 'fixed';

      }
      else if (name.indexOf('10 Yr') > -1) {
        productReturn['title'] = '10 year';
        productReturn['type']  = 'fixed';

      }
      else if (name.indexOf('5/1') > -1) {
        productReturn['title'] = '5/1';
        productReturn['type']  = 'adjustable';

      }
      else if (name.indexOf('7/1') > -1) {
        productReturn['title'] = '7/1';
        productReturn['type']  = 'adjustable';

      }
      else if (name.indexOf('10/1') > -1) {
        productReturn['title'] = '10/1';
        productReturn['type']  = 'adjustable';

      }
      else if (name.indexOf('5-yr') > -1) {
        productReturn['title'] = '30 year';
        productReturn['type']  = 'fixed';
        catchAll = true;
      }
      else{
        productReturn['title'] = '';
        productReturn['type']  = 'adjustable';
        catchAll = true;
      }


      // let lowestRateIndex = 0;
      // let lowestAprIndex =  0;
      // let lowestRate = 999999;
      // let lowestApr = 999999;
      // let lowestChosen = 0;

      // for(let x=0; x < product.quotes.length; x++){

      //   if (product.quotes[x].rate < lowestRate) {
      //     lowestRate = product.quotes[x].rate;
      //     lowestApr = product.quotes[x].apr;
      //     lowestRateIndex  = x;
      //     lowestAprIndex = x;
      //     lowestChosen = x;
      //   }


      //   else if(product.quotes[x].rate === lowestRate){
      //     if (product.quotes[x].apr < lowestApr) {
      //       lowestRate = product.quotes[x].rate;
      //       lowestApr = product.quotes[x].apr;
      //       lowestRateIndex  = x;
      //       lowestAprIndex = x;
      //       lowestChosen = x;
      //     }
      //   }


      // }

      productReturn['quoteInfo'] = data[i];



      if (!catchAll) {
        temp.push(productReturn);
      }

    }

      this.setState({
        rateData: temp,
        hasData: true,
        loading: 'not-loading'
      });




  }



  sendIt(event){

    this.props.usedCalc();




    this.setState({
      hasData: false,
      rateData: [],
      loading: '',
      usedCalculator: true,
    });
    event.preventDefault();
    //console.log(this.state);
    //console.log("it sent");

    let purchase = parseFloat(this.state.purchasePrice);
    purchase = purchase.toFixed(1);

    let baseLoan = parseFloat(this.state.baseLoanAmount);
    baseLoan  = baseLoan.toFixed(1);


    let data = {
      "borrowerInformation": {
        "assetDocumentation": "Verified",
        "debtToIncomeRatio": 15.0,
        "pledgedAssets": false,
        "citizenship": "USCitizen",
        "employmentDocumentation": "Verified",
        "fico": parseInt(this.state.creditScore, 10),
        "firstName": "test",
        "lastName": "test1",
        "vaFirstTimeUse": true,
        "firstTimeHomeBuyer": this.state.firstTimeHomeBuyer,
        "incomeDocumentation": "Verified",
        "monthlyIncome": 0.0,
        "monthsReserves": 24,
        "selfEmployed": true,
        "waiveEscrows": false,
        "mortgageLatesX30": 0,
        "mortgageLatesX60": 0,
        "mortgageLatesX90": 0,
        "mortgageLatesX120": 0,
        "mortgageLatesRolling": 0,
        "bankruptcy": "Never",
        "foreclosure": "Never",
        "bankStatementsForIncome": "NotApplicable",
        "state": this.state.stateName
      },
      "loanInformation": {
        "loanPurpose": (this.state.slug === 'refinance') ? "RefiRateTermLimitedCO" : "Purchase",
        "lienType": "First",
        "amortizationTypes": [
          "Fixed",
          "ARM"
        ],
        "armFixedTerms": [
          "FiveYear",
          "SevenYear",
          "TenYear"
        ],
        "automatedUnderwritingSystem": "NotSpecified",
        "borrowerPaidMI": "Yes",
        "buydown": "None",
        "cashOutAmount": 0.0,
        "desiredLockPeriod": 0,
        "desiredPrice": 0.0,
        "desiredRate": 0.0,
        "feesIn": "No",
        "expandedApprovalLevel": "NotApplicable",
        "fhaCaseAssigned": "2017-02-06T06:00:00+00:00",
        "fhaCaseEndorsement": "2017-02-06T06:00:00+00:00",
        "interestOnly": false,
        "baseLoanAmount": baseLoan,
        "secondLienAmount": 0.0,
        "helocDrawnAmount": 0.0,
        "helocLineAmount": 0.0,
        "loanTerms": [
          "TenYear",
          "FifteenYear",
          "TwentyYear",
          "ThirtyYear",
        ],
        "loanType": "Conforming",
        "prepaymentPenalty": "None",
        "exemptFromVAFundingFee": false,
        "includeLOCompensationInPricing": "YesLenderPaid",
        "currentServicer": "ACH Trust",
        "calculateTotalLoanAmount": true
      },
      "propertyInformation": {
        "appraisedValue": purchase,
        "occupancy": this.state.propertyUsage,
        "propertyStreetAddress": "string",
        "county": this.state.county,
        "state": this.state.stateAbbrev,
        "zipCode": this.state.zipCode,
        // "propertyType": "SingleFamily",
        // "propertyType": "Condo",
        "propertyType": this.state.propertyType,
        "corporateRelocation": false,
        "salesPrice": purchase,
        "numberOfStories": 1,
        "numberOfUnits": "OneUnit",
        "construction": false
      },
      "representativeFICO": parseInt(this.state.creditScore, 10),
      "loanLevelDebtToIncomeRatio": 18.0,
      "customerInternalId": "OBSearch"
    }



    let headers = {
      "api-version": 3,
     "businessChannelId": 102528,
     "originatorId": 1052983,
     "Content-Type": "application/json",
     "client_id":"e0a4f1584a854662b138520c797d4866",
     "client_secret":"D4E0F8Db49DE4b6ebe00DC24698360DF",
    };

    //console.log('logging data ****************');
    //console.log(data);

    //post using the new endpoint, one value for each item
    axios.post('https://optimal-blue-pricing-info-system-api.us-w2.cloudhub.io/api/system/optimalblue/pricinginfo/v1/productgroupsearch', data, {headers: headers}).then(res2 => {
      if(res2) {
        //console.log('res from new endpoint');
        //console.log(res2);
        this.setState({
          //hasData: true,
          // need to check for specific products and push them onto data if they match
          //data: res.data
        });

        const formData = {
         "utm_content": this.props.queryString,
        };

        mixpanel.track('Rates Calculator Scenario', {
          creditScore: parseInt(this.state.creditScore, 10),
          purchasePrice: purchase,
          downPayment: this.state.downPayment,
          zipCode: this.state.zipCode,
          firstTimeHomeBuyer: this.state.firstTimeHomeBuyer,
          data: res2.data.productGroups,
          QueryString : formData['utm_content'],
          clickedScrollRates: this.props.clickedScrollRates,
          clickedScrollForm: this.props.clickedScrollForm,
        });
        this.newDataEndpoint(res2.data.productGroups);
      }
    })
    .catch((error) => {




      //console.log(error);
      //console.log(error.response);
      //console.log(error.response.data[0].message);
      this.setState({
        hasData: true,
        rateData: error.response.data[0].message,
        loading: 'not-loading',
      })

    });
  }


  assignZipCode(zipCode) {
    console.log(zipCode);
    const GOOGLE_MAPS_API_BASE = 'https://maps.googleapis.com/maps/api';
    const GOOGLE_MAPS_API_KEY = 'AIzaSyBQweEENd7w5FugcTrhbvIy2AesBgD7e2o';
    let url = GOOGLE_MAPS_API_BASE + '/geocode/json?address=' + zipCode + '&sensor=false&key='+GOOGLE_MAPS_API_KEY;
    //let reverseUrl = 'https://maps.googleapis.com/maps/api/geocode/json?latlng='+ lat +','+ lng +'&key='  + GOOGLE_MAPS_API_KEY;
    //const HEADERS = { headers: { 'Access-Control-Allow-Headers': '*', 'Access-Control-Allow-Origin': '*' }}


    let zip = zipCode.toString();
    this.setState({zipCode: zip});


    axios.post(url).then(res => {
      if(res) {
        console.log(res);
        console.log(res.data.results[0]);
        //let address = res.data.results[0].address_components;
        // console.log(address);
        let lat = res.data.results[0].geometry.location.lat;
        let lng = res.data.results[0].geometry.location.lng;

        // console.log(lat + ' : ' + lng);

        let reverseUrl = 'https://maps.googleapis.com/maps/api/geocode/json?latlng='+ lat +','+ lng +'&key='  + GOOGLE_MAPS_API_KEY;

        axios.post(reverseUrl).then(ress => {
          if (ress) {

            //console.log('reverse lookup...');
            //console.log(ress);

            for(let x = 0; x < ress.data.results.length -1; x++){
              // console.log('iterating x');
              for(let y = 0; y < ress.data.results[x].address_components.length -1; y++){
                // console.log('iterating y');
                for(let z = 0; z < ress.data.results[x].address_components[y].types.length -1; z++){
                  // console.log('iterating z');


                  if (ress.data.results[x].address_components[y].types[z] === 'locality') {
                    // console.log('we have found the county!!!!!!!!!!!');
                    // console.log(ress.data.results[x].address_components[y].short_name);
                    // console.log(ress.data.results[x].address_components[y].long_name);
                    let splitCity = ress.data.results[x].address_components[y].short_name;
                    this.setState({
                      city: splitCity,
                    });

                  }


                  if (ress.data.results[x].address_components[y].types[z] === 'administrative_area_level_2') {
                    // console.log('we have found the county!!!!!!!!!!!');
                    // console.log(ress.data.results[x].address_components[y].short_name);
                    // console.log(ress.data.results[x].address_components[y].long_name);
                    let splitCounty = ress.data.results[x].address_components[y].short_name.split(" ");
                    this.setState({
                      county: splitCounty[0],
                    });

                  }
                  if (ress.data.results[x].address_components[y].types[z]  === 'administrative_area_level_1') {
                    // console.log('lets see  what we  got......');
                    // console.log(ress.data.results[x].address_components[y].short_name);
                    // console.log(ress.data.results[x].address_components[y].long_name);
                    this.setState({
                      stateName: ress.data.results[x].address_components[y].long_name,
                      stateAbbrev: ress.data.results[x].address_components[y].short_name,
                    })
                  }
                }
              }
            }
          }
        })
        .catch(error => {
          //console.log(error);
        });
      }
    })
    .catch(error => {
      //console.log(error);
    });

    //console.log('blurrrred');
    //console.log(this.state);
  }



  handleChangeZipCode(event) {




    const GOOGLE_MAPS_API_BASE = 'https://maps.googleapis.com/maps/api';
    const GOOGLE_MAPS_API_KEY = 'AIzaSyBQweEENd7w5FugcTrhbvIy2AesBgD7e2o';
    let url = GOOGLE_MAPS_API_BASE + '/geocode/json?address=' + event.target.value + '&sensor=false&key='+GOOGLE_MAPS_API_KEY;
    //let reverseUrl = 'https://maps.googleapis.com/maps/api/geocode/json?latlng='+ lat +','+ lng +'&key='  + GOOGLE_MAPS_API_KEY;
    //const HEADERS = { headers: { 'Access-Control-Allow-Headers': '*', 'Access-Control-Allow-Origin': '*' }}

    let zip = event.target.value.toString();
    this.setState({zipCode: zip});



    if(zip.length === 5){



    axios.post(url).then(res => {
      if(res) {
        console.log(res.data.results[0]);
        //let address = res.data.results[0].address_components;
        // console.log(address);
        let lat = res.data.results[0].geometry.location.lat;
        let lng = res.data.results[0].geometry.location.lng;

        // console.log(lat + ' : ' + lng);

        let reverseUrl = 'https://maps.googleapis.com/maps/api/geocode/json?latlng='+ lat +','+ lng +'&key='  + GOOGLE_MAPS_API_KEY;

        axios.post(reverseUrl).then(ress => {
          if (ress) {

            console.log('reverse lookup...');
            console.log(ress);

            for(let x = 0; x < ress.data.results.length -1; x++){
              // console.log('iterating x');
              for(let y = 0; y < ress.data.results[x].address_components.length -1; y++){
                // console.log('iterating y');
                for(let z = 0; z < ress.data.results[x].address_components[y].types.length -1; z++){
                  // console.log('iterating z');


                  if (ress.data.results[x].address_components[y].types[z] === 'locality') {
                    console.log('we have found the city!!!!!!!!!!!');
                    console.log(ress.data.results[x].address_components[y].short_name);
                    console.log(ress.data.results[x].address_components[y].long_name);
                    let splitCity = ress.data.results[x].address_components[y].short_name;
                    this.setState({
                      city: splitCity,
                    });

                  }


                  if (ress.data.results[x].address_components[y].types[z] === 'administrative_area_level_2') {
                    // console.log('we have found the county!!!!!!!!!!!');
                    // console.log(ress.data.results[x].address_components[y].short_name);
                    // console.log(ress.data.results[x].address_components[y].long_name);
                    let splitCounty = ress.data.results[x].address_components[y].short_name.split(" ");
                    this.setState({
                      county: splitCounty[0],
                    });

                  }
                  if (ress.data.results[x].address_components[y].types[z]  === 'administrative_area_level_1') {
                    // console.log('lets see  what we  got......');
                    // console.log(ress.data.results[x].address_components[y].short_name);
                    // console.log(ress.data.results[x].address_components[y].long_name);
                    this.setState({
                      stateName: ress.data.results[x].address_components[y].long_name,
                      stateAbbrev: ress.data.results[x].address_components[y].short_name,
                    })
                  }
                }
              }
            }
          }
        })
        .catch(error => {
          //console.log(error);
        });
      }
    })
    .catch(error => {
      //console.log(error);
    });



  }

    //console.log('blurrrred');
    //console.log(this.state);
  }

  handleChangeFirstTimeHomebuyer(event) {
    let val = this.firstTimeHomebuyerSelect;
    let data = val.options[val.selectedIndex].value;
    if(data === "true"){
      this.setState({
        firstTimeHomeBuyer: true
      });
    } else {
      this.setState({
        firstTimeHomeBuyer: false
      });
    }
  }

  handleChangePropertyType(event) {
    let val = this.propertyTypeSelect;
    let propertyType = val.options[val.selectedIndex].value;
    this.setState({
      propertyType: propertyType
    });
  }

  handleChangePropertyUsage(event) {
    let val = this.propertyUsageSelect;
    let propertyUsage = val.options[val.selectedIndex].value;
    this.setState({
      propertyUsage: propertyUsage
    });
  }



  assignDownPayment(dp) {



    let p = dp;

    //console.log(`lets validate that money! ${text}`);
    let strippedInt = p;

    strippedInt = strippedInt.replace(',', '');
    strippedInt = strippedInt.replace(' ', '');
    strippedInt = strippedInt.replace('$', '');
    strippedInt = strippedInt.replace('-', '');
    strippedInt = strippedInt.replace('(', '');
    strippedInt = strippedInt.replace(')', '');
    strippedInt = strippedInt.replace('*', '');
    strippedInt = strippedInt.replace('+', '');
    strippedInt = strippedInt.replace('#', '');

    let downPayment = strippedInt;

    //console.log(`strippedInt is -> ${strippedInt}`);


    if(strippedInt === ''){
      this.setState({downPaymentFormatted: ''})
      return true;
    }

    let baseLoanAmount = this.state.purchasePrice - downPayment;
    this.setState({baseLoanAmount: baseLoanAmount, downPayment: parseInt(downPayment, 10)})

    let dig = /^[0-9,]+$/;
    let validDigit = dig.test(strippedInt);

    if (!validDigit) {
      return false;
    }

    var res = strippedInt;
    var resInt = parseInt(res, 10);
    var output = resInt.toLocaleString();
    let c = /(\d{0,3},)?(\d{3},)?\d{0,3}/;
    let validNumber = c.test(output);

    //console.log(`output is -> ${output}`);

    // var res = p.replace(/,/g, "");
    // var resInt = parseInt(res);
    // var output = resInt.toLocaleString();
    // let c = /(\d{0,3},)?(\d{3},)?\d{0,3}/;
    // let validNumber = c.test(output);

    if (validNumber || p === '') {

      this.setState({
        downPaymentFormatted: `$ ${output}`

      });
      return true;
    }
    return false;



  }


  handleChangeDownPayment(event) {



    let p = event.target.value;

    //console.log(`lets validate that money! ${text}`);
    let strippedInt = p;

    strippedInt = strippedInt.replace(',', '');
    strippedInt = strippedInt.replace(' ', '');
    strippedInt = strippedInt.replace('$', '');
    strippedInt = strippedInt.replace('-', '');
    strippedInt = strippedInt.replace('(', '');
    strippedInt = strippedInt.replace(')', '');
    strippedInt = strippedInt.replace('*', '');
    strippedInt = strippedInt.replace('+', '');
    strippedInt = strippedInt.replace('#', '');

    let downPayment = strippedInt;

    //console.log(`strippedInt is -> ${strippedInt}`);


    if(strippedInt === ''){
      this.setState({downPaymentFormatted: ''})
      return true;
    }

    let baseLoanAmount = this.state.purchasePrice - downPayment;
    this.setState({baseLoanAmount: baseLoanAmount, downPayment: parseInt(downPayment, 10)})

    let dig = /^[0-9,]+$/;
    let validDigit = dig.test(strippedInt);

    if (!validDigit) {
      return false;
    }

    var res = strippedInt;
    var resInt = parseInt(res, 10);
    var output = resInt.toLocaleString();
    let c = /(\d{0,3},)?(\d{3},)?\d{0,3}/;
    let validNumber = c.test(output);

    //console.log(`output is -> ${output}`);

    // var res = p.replace(/,/g, "");
    // var resInt = parseInt(res);
    // var output = resInt.toLocaleString();
    // let c = /(\d{0,3},)?(\d{3},)?\d{0,3}/;
    // let validNumber = c.test(output);

    if (validNumber || p === '') {

      this.setState({
        downPaymentFormatted: `$ ${output}`

      });
      return true;
    }
    return false;



  }

  assignPurchasePrice(pp) {


    let p = pp;

    //console.log(`lets validate that money! ${text}`);
    let strippedInt = p;

    strippedInt = strippedInt.replace(',', '');
    strippedInt = strippedInt.replace(' ', '');
    strippedInt = strippedInt.replace('$', '');
    strippedInt = strippedInt.replace('-', '');
    strippedInt = strippedInt.replace('(', '');
    strippedInt = strippedInt.replace(')', '');
    strippedInt = strippedInt.replace('*', '');
    strippedInt = strippedInt.replace('+', '');
    strippedInt = strippedInt.replace('#', '');

    let purchasePrice = strippedInt;

    //console.log(`strippedInt is -> ${strippedInt}`);


    if(strippedInt === ''){
      this.setState({purchasePriceFormatted: ''})
      return true;
    }

    let baseLoanAmount = purchasePrice - this.state.downPayment;
    this.setState({purchasePrice: parseInt(purchasePrice, 10), baseLoanAmount: baseLoanAmount});

    let dig = /^[0-9,]+$/;
    let validDigit = dig.test(strippedInt);

    if (!validDigit) {
      return false;
    }

    var res = strippedInt;
    var resInt = parseInt(res, 10);
    var output = resInt.toLocaleString();
    let c = /(\d{0,3},)?(\d{3},)?\d{0,3}/;
    let validNumber = c.test(output);

    //console.log(`output is -> ${output}`);

    // var res = p.replace(/,/g, "");
    // var resInt = parseInt(res);
    // var output = resInt.toLocaleString();
    // let c = /(\d{0,3},)?(\d{3},)?\d{0,3}/;
    // let validNumber = c.test(output);

    if (validNumber || p === '') {



      this.setState({
        purchasePriceFormatted: `$ ${output}`

      });

      return true;
    }
    return false;


  }


  handleChangePurchasePrice(event) {


    let p = event.target.value;

    //console.log(`lets validate that money! ${text}`);
    let strippedInt = p;

    strippedInt = strippedInt.replace(',', '');
    strippedInt = strippedInt.replace(' ', '');
    strippedInt = strippedInt.replace('$', '');
    strippedInt = strippedInt.replace('-', '');
    strippedInt = strippedInt.replace('(', '');
    strippedInt = strippedInt.replace(')', '');
    strippedInt = strippedInt.replace('*', '');
    strippedInt = strippedInt.replace('+', '');
    strippedInt = strippedInt.replace('#', '');

    let purchasePrice = strippedInt;

    //console.log(`strippedInt is -> ${strippedInt}`);


    if(strippedInt === ''){
      this.setState({purchasePriceFormatted: ''})
      return true;
    }

    let baseLoanAmount = purchasePrice - this.state.downPayment;
    this.setState({purchasePrice: parseInt(purchasePrice, 10), baseLoanAmount: baseLoanAmount});

    let dig = /^[0-9,]+$/;
    let validDigit = dig.test(strippedInt);

    if (!validDigit) {
      return false;
    }

    var res = strippedInt;
    var resInt = parseInt(res, 10);
    var output = resInt.toLocaleString();
    let c = /(\d{0,3},)?(\d{3},)?\d{0,3}/;
    let validNumber = c.test(output);

    //console.log(`output is -> ${output}`);

    // var res = p.replace(/,/g, "");
    // var resInt = parseInt(res);
    // var output = resInt.toLocaleString();
    // let c = /(\d{0,3},)?(\d{3},)?\d{0,3}/;
    // let validNumber = c.test(output);

    if (validNumber || p === '') {



      this.setState({
        purchasePriceFormatted: `$ ${output}`

      });

      return true;
    }
    return false;


  }

  handleChangeCreditScore(event) {
    let val = this.creditSelect;
    let creditScore = val.options[val.selectedIndex].value;
    let parsed = parseInt(creditScore, 10);
    this.setState({creditScore: parsed});
  }

  numberWithCommas(x) {
    let number = x.toFixed(0);
    let formattedNumber = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    //console.log(number);
    return formattedNumber;
  }

  render() {
    return (
      <div className="grid">

      <div>
      {
        (this.state.city)
        ? <p className="fontSize3 fontBold">Today's rates for a home in {this.state.city}, {this.state.stateAbbrev}</p>
        : <p className="fontSize3 fontBold">Today's rates for a home in WA</p>
      }
      </div>
      <div className="rates-form-holder">
        <form className="clearfix rates-flex" onSubmit={this.sendIt}>



          <div className="rates-input-flex-item">
          <div className="input-group">
            <label className="fontSize0 black fontRegular">Property Type</label>
            <select className="select select-rate mb-1 fontSize1 colorGrey5 fontRegular" aria-label="select property type" ref={(propertyTypeSelect) => { this.propertyTypeSelect = propertyTypeSelect; }} onChange={() => this.handleChangePropertyType()}>
              <option value='SingleFamily'>Single Family</option>
              <option value='Condo'>Condo</option>
              <option value='ManufacturedDoubleWide'>Manufactured Double Wide</option>
              <option value='Modular'>Modular</option>
              <option value='ManufacturedSingleWide'>Manufactured Single Wide</option>
              <option value='Townhouse'>Townhouse</option>
            </select>
          </div>
          </div>



          {
            (this.state.slug !== 'refinance')
            ?
              <div className="rates-input-flex-item">
                <div className="input-group">
                  <label className="fontSize0 black fontRegular">First Time Homebuyer</label>
                  <select className="select select-rate mb-1 fontSize1 colorGrey5 fontRegular" aria-label="select first time home buyer" ref={(firstTimeHomebuyerSelect) => { this.firstTimeHomebuyerSelect = firstTimeHomebuyerSelect; }} onChange={() => this.handleChangeFirstTimeHomebuyer()}>
                    <option value='No'>No</option>
                    <option value='Yes'>Yes</option>
                  </select>
                </div>
              </div>

            : ""

          }




          <div className="rates-input-flex-item">
            <div className="input-group">
              <label className="fontSize0 black fontRegular">Credit Score</label>
              <select className="select select-rate mb-1 fontSize1 colorGrey5 fontRegular" aria-label="select your credit score" ref={(creditSelect) => { this.creditSelect = creditSelect; }} onChange={() => this.handleChangeCreditScore()}>
                <option value="740">740 or Above</option>
                <option value="720">700 to 739</option>
                <option value="680">660 to 699</option>
                <option value="640">620 to 659</option>
                <option value="600">580 to 619</option>
                <option value="560">579 or less</option>
                <option value="550">I don't know</option>
              </select>
            </div>
          </div>


          <div className="rates-input-flex-item">
            <div className="input-group">
              <label className="fontSize0 black fontRegular">Property Usage</label>
              <select className="select select-rate mb-1 fontSize1 colorGrey5 fontRegular" aria-label="select your property usage" ref={(propertyUsageSelect) => { this.propertyUsageSelect = propertyUsageSelect; }} onChange={() => this.handleChangePropertyUsage()}>
                <option value='PrimaryResidence'>Primary Residence</option>
                <option value='SecondHome'>Second Home</option>
              </select>
            </div>
          </div>


          <div className="rates-input-flex-item">
            <div className="input-group">
              <label className="fontSize0 black fontRegular">Zip Code</label>
              <input className="fontSize1 black fontRegular" maxLength={5} value={this.state.zipCode} aria-label="select your zipcode" onChange={this.handleChangeZipCode}/>
            </div>
          </div>



          {
            (this.state.slug !== 'refinance')

            ?
              <div className="rates-input-flex-item">
                <div className="input-group">
                  <label className="fontSize0 black fontRegular">Estimated Down Payment</label>
                  <input className="fontSize1 black fontRegular" onChange={this.handleChangeDownPayment} aria-label="select your down payment" value={this.state.downPaymentFormatted}/>
                </div>
              </div>

            : ""
          }


          <div className="rates-input-flex-item">
            <div className="input-group">
              <label className="fontSize0 black fontRegular">Estimated Property Value</label>
              <input className="fontSize1 black fontRegular" onChange={this.handleChangePurchasePrice} aria-label="select property value" value={this.state.purchasePriceFormatted}/>
            </div>
          </div>

          <div className="full-width rates-submit-holder mr-2 mt-2">
            <div>
              <button className={"button button-primary block fontSize0 "+ this.state.loading} type="submit">
                 <span className="button-text">Update</span>
                 <div className="loader">
                   <svg id="load" x="0px" y="0px" viewBox="0 0 150 150" fill="#fff">
                     <circle id="loader-inner" cx="75" cy="75" r="60" stroke="#fff"/>
                   </svg>
                 </div>
               </button>
            </div>
          </div>
        </form>
      </div>





        <div>

          {

            (this.state.slug === 'refinance')
            ? <p className="fontSize0 fontRegular mt-4 colorGrey5">If you refinance a {this.state.purchasePriceFormatted} home in {this.state.city}, {this.state.stateAbbrev}</p>
            : <p className="fontSize0 fontRegular mt-4 colorGrey5">If you purchase a {this.state.purchasePriceFormatted} home in {this.state.city}, {this.state.stateAbbrev} with {this.state.downPaymentFormatted} down.</p>

          }

          {
            (this.state.hasData)
            ? <RatesTable data={this.state.rateData} />

            : <RatesTableLoader rows={6}/>
          }

          <div className="pt-8 pl-2 pr-2 colorGrey4 fontSize0 pb-6 ">
          Disclaimer: Information and interactive calculators are made available to you as self-help tools for your independent use and are not intended to provide investment advice. We cannot and do not guarantee their applicability or accuracy in regards to your individual circumstances. All examples are hypothetical and are for illustrative purposes. We encourage you to seek personalized advice from qualified professionals regarding all personal finance issues.
          </div>

        </div>
      </div>
    );
  }
}



export default RatesCalculator;
