import React, { Component } from 'react';
import axios from 'axios';
import mixpanel from 'mixpanel-browser';
import {
  Redirect
} from 'react-router-dom';
import ScheduleMap from './ScheduleMap';
import Modal from 'react-modal';
import ScheduleTimeLoader from './ScheduleTimeLoader';


Modal.setAppElement('#root');


class ScheduleAppointment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
      mapCenter: { lat: 46.602119, lng: -120.516974 },
      selectedEmployee: {},
      selectedEmployeeIndex:0,

      startTime: "",
      endTime: "",
      timesAvailable: [],
      daysOfWeek: ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'],
      activeTime: 0,
      activeDay: 0,
      showConfirmationModal: false,
      inputName: "",
      inputEmail: "",
      inputPhone: "",
      scheduleConfirm: false,
      hideMap: false,

      scheduleNoMap: true,


      showInfoWindow: false,
      meetingDuration: '30M',
      meetingDurationFormatted: '30 Minutes',
      durationPicker: false,
      showStaffWindow: true,

      meetingPicker: false,
      meetingType: 'In Person',


      errorName: false,
      errorEmail: false,
      errorPhone: false,
    }

    this.handleAppointmentSubmit = this.handleAppointmentSubmit.bind(this);
    this.changeMeetingDuration = this.changeMeetingDuration.bind(this);
    this.onDurationBack = this.onDurationBack.bind(this);

    this.onMeetingBack = this.onMeetingBack.bind(this);
    this.changeMeetingType = this.changeMeetingType.bind(this);

  }

  changeMeetingDuration(amount){



    let activeDay = 0;
    if (this.state.nextSevenDays[0].dayOfWeek === 0) {
      activeDay = 1;
    }
    else if(this.state.nextSevenDays[0].dayOfWeek  === 6){
      activeDay = 2;
    }
    else{
      activeDay = 0;
    }

    let dur;
    if (amount === '15M') {
      dur = '15 Minutes';
    }
    else if(amount === '30M'){
      dur = '30 Minutes';
    }
    else{
      dur = '1 Hour';
    }

    let startString = "" + this.state.nextSevenDays[activeDay].year + "-" + this.state.nextSevenDays[activeDay].month + "-" + this.state.nextSevenDays[activeDay].day + "T08:00:00";
    let endString = "" + this.state.nextSevenDays[activeDay].year + "-" + this.state.nextSevenDays[activeDay].month + "-" + this.state.nextSevenDays[activeDay].day + "T17:00:00";



    this.setState({
      meetingDurationFormatted: dur,
      meetingDuration: amount,
      durationPicker: false,
      showInfoWindow: true,
      activeDay: activeDay,
    });




    let headers = {headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json; charset=utf-8',
      'Prefer' : 'outlook.timezone="America/Los_Angeles"',
      'client_id' : 'e0a4f1584a854662b138520c797d4866',
      'client_secret' : 'D4E0F8Db49DE4b6ebe00DC24698360DF',
    }};

    let body = {
       "attendees": [
         {
           "type": "required",
           "emailAddress": {
             "name": this.state.selectedEmployee.staffName,
             "address": this.state.selectedEmployee.staffEmail
           }
         }
       ],
       "locationConstraint": {
         "isRequired": "false",
         "suggestLocation": "false",
         "locations": [
           {
             "resolveAvailability": "false",
             "displayName": "Phone"
           }
         ]
       },
       "timeConstraint": {
         "activityDomain":"unrestricted",
         "timeslots": [
           {
             "start": {
               "dateTime": startString,
               "timeZone": "Pacific Standard Time"
             },
             "end": {
               "dateTime": endString,
               "timeZone": "Pacific Standard Time"
             }
           }
         ]
       },
       "meetingDuration": `PT${amount}`,
       "isOrganizerOptional": true,
       "returnSuggestionReasons": true,
       "minimumAttendeePercentage": 100.00,
        "maxCandidates":"100"
      };


                  //console.log(body);

    axios.post('https://office-365-meeting-scheduler-api.us-w2.cloudhub.io/api/solaritycu/meetingscheduler/findmeetingtimes', body, headers).then(res => {
      if(res) {

       //console.log('logging response');
       //console.log(res.data.meetingTimeSuggestions);
       let times  = []
       for(var x = 0; x < res.data.meetingTimeSuggestions.length; x++){

        let d = new Date(res.data.meetingTimeSuggestions[x].meetingTimeSlot.start.dateTime);
        let y = d.getFullYear();
        let m = d.getMonth();
        let day = d.getDate();
        let dayOfWeek = d.getDay();
        let h = d.getHours();
        let min = d.getMinutes();
        let s = d.getSeconds();


        if(m === 0){
          m = 1;
        }
        else{
          m = m + 1;
        }



        times[x] = {
          year: y,
          month: m,
          day: day,
          hour: h,
          minute: min,
          second: s,
          dayOfWeek: dayOfWeek,

        };
       }

       // var temp = this.state.timesAvailable;
       // temp.push(times);

       //console.log(times);
       //console.log(temp);


       this.setState({
        timesAvailable: times,
        meetingTimeSuggestions: res.data.meetingTimeSuggestions,
       });
      }
    })
    .catch(error => {
      //console.log(error);
    });
  }

  changeMeetingType(type){
    let noMap = true;
    if (type === 'In Person') {
      noMap = false;
    }
    this.setState({
      meetingType: type,
      meetingPicker: false,
      durationPicker: true,
      scheduleNoMap: noMap,
    });
  }

  onInfoClose = () => {
    this.setState({
      showInfoWindow: false,
      durationPicker: true,
    });
  }

  onDurationBack(){
    this.setState({
      durationPicker: false,
      meetingPicker: true,
    })
  }

  onMeetingBack(){
    this.setState({
      meetingPicker: false,
      showStaffWindow: true,
    })

  }

  componentDidUpdate(prevProps, prevState){

    if (prevProps.person !== this.props.person) {

      for(let i = 0; i < this.props.data.available.length; i++){
        if (this.props.data.available[i].slug === this.props.person) {
          this.handleEmployeeClick(i);
        }
      }

    }



  }

  componentDidMount() {

    this.setCurrentDate();
    //console.log('in did mount for schedule appt logging props');
    //console.log(this.props);


    for(let i = 0; i < this.props.data.available.length; i++){
      if (this.props.data.available[i].slug === this.props.person) {
        this.handleEmployeeClick(i);
      }
    }

  }


  getNextStartTime(){

    let d = new Date();
    let y = d.getFullYear();
    let m = d.getMonth();
    let day = d.getDate();

    let h = d.getHours();



    //console.log(d);
    //console.log(y);
    //console.log(m);
    //console.log(day);
    //console.log(h);
    //console.log(min);
    //console.log(s);


    let nextHour = h + 1;

      var newDate = new Date(d.setTime( d.getTime() + 1 * 86400000 ));

      y = newDate.getFullYear();
      m = newDate.getMonth();
      day = newDate.getDate();
      h = 8;


      nextHour = h;



    let nextMonth = m;

    if(m === 0){
        nextMonth = 1;
      }
      else{
        nextMonth = m + 1;
      }

    let dateString = "";

    if(nextHour < 10){
      dateString = "" + y + "-" + nextMonth + "-" + day + "T0"+ nextHour + ":00:00";
    }
    else{
      dateString = "" + y + "-" + nextMonth + "-" + day + "T" + nextHour + ":00:00";
    }



    //console.log('new date string we made is...');
    //console.log(dateString);

    return dateString;
  }

  getNextEndtime(){
    let d = new Date();
    let y = d.getFullYear();
    let m = d.getMonth();
    let day = d.getDate();




    //console.log(d);
    //console.log(y);
    //console.log(m);
    //console.log(day);
    //console.log(h);
    //console.log(min);
    //console.log(s);




      var newDate = new Date(d.setTime( d.getTime() + 1 * 86400000 ));

      y = newDate.getFullYear();
      m = newDate.getMonth();
      day = newDate.getDate();







    let nextMonth = m + 1;


    let dateString = "" + y + "-" + nextMonth + "-" + day + "T17:00:00";
    //console.log('new date string we made is...');
    //console.log(dateString);

    return dateString;
  }

  setCurrentDate(){
    let start = this.getNextStartTime();
    let end = this.getNextEndtime();
    this.getNextSevenDays();

    this.setState({
      startTime: start,
      endTime: end,
    })

    //console.log("start time is...");
    //console.log(start);
    //console.log("end time is...");
    //console.log(end);
  }

  getNextSevenDays(){

    let d = new Date();
    let y = d.getFullYear();
    let m = d.getMonth();
    let day = d.getDate();

    let dayOfWeek = d.getDay();




    let dayCount = [];
    let newDate = new Date();


      newDate = new Date(d.setTime( d.getTime() + 1 * 86400000 ));

      y = newDate.getFullYear();
      m = newDate.getMonth();
      day = newDate.getDate();
      dayOfWeek = newDate.getDay();


    if(m === 0){
      m = 1;
    }
    else{
      m = m + 1;
    }

    dayCount[0] = {day:day, month:m, year:y, dayOfWeek:dayOfWeek};



    for(let count = 1; count < 7; count++){

      let startDate = new Date(newDate.setTime( newDate.getTime() + 1 * 86400000 ));

      //console.log(startDate);


      let y = startDate.getFullYear();
      let m = startDate.getMonth();
      let day = startDate.getDate();
      let dayOfWeek = newDate.getDay();

      if(m === 0){
        m = 1;
      }
      else{
        m = m + 1;
      }

      dayCount[count] = {day:day, month:m, year:y, dayOfWeek: dayOfWeek};
    }


    this.setState({
      nextSevenDays: dayCount,
    });



  }


  componentWillMount(){

  }


  handleEmployeeClick = (index) => {


    //console.log('click on employee: ' + index);
    this.setState({
      selectedEmployee: this.state.data.available[index],
      meetingPicker: true,
      showStaffWindow: false,
      selectedEmployeeIndex: index,
      mapCenter: {lat: parseFloat(this.state.data.available[index].locationConnection.entries[0].latitude), lng: parseFloat(this.state.data.available[index].locationConnection.entries[0].longitude)}
    });


    let headers = {headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json; charset=utf-8',
      'Prefer' : 'outlook.timezone="America/Los_Angeles"',
      'client_id' : 'e0a4f1584a854662b138520c797d4866',
      'client_secret' : 'D4E0F8Db49DE4b6ebe00DC24698360DF',
    }};

    let body = {
                   "attendees": [
                     {
                       "type": "required",
                       "emailAddress": {
                         "name": this.state.data.available[index].staffName,
                         "address": this.state.data.available[index].staffEmail
                       }
                     }
                   ],
                   "locationConstraint": {
                     "isRequired": "false",
                     "suggestLocation": "false",
                     "locations": [
                       {
                         "resolveAvailability": "false",
                         "displayName": "Phone"
                       }
                     ]
                   },
                   "timeConstraint": {
                     "activityDomain":"unrestricted",
                     "timeslots": [
                       {
                         "start": {
                           "dateTime": this.state.startTime,
                           "timeZone": "Pacific Standard Time"
                         },
                         "end": {
                           "dateTime": this.state.endTime,
                           "timeZone": "Pacific Standard Time"
                         }
                       }
                     ]
                   },
                   "meetingDuration": "PT30M",
                   "isOrganizerOptional": true,
                   "returnSuggestionReasons": true,
                   "minimumAttendeePercentage": 100.00,
                    "maxCandidates":"100"
                  };


                  //console.log(body);

    axios.post('https://office-365-meeting-scheduler-api.us-w2.cloudhub.io/api/solaritycu/meetingscheduler/findmeetingtimes', body, headers).then(res => {
      if(res) {

       //console.log('logging response');
       //console.log(res.data.meetingTimeSuggestions);
       let times  = []
       for(var x = 0; x < res.data.meetingTimeSuggestions.length; x++){

        let d = new Date(res.data.meetingTimeSuggestions[x].meetingTimeSlot.start.dateTime);
        let y = d.getFullYear();
        let m = d.getMonth();
        let day = d.getDate();
        let dayOfWeek = d.getDay();
        let h = d.getHours();
        let min = d.getMinutes();
        let s = d.getSeconds();


        if(m === 0){
          m = 1;
        }
        else{
          m = m + 1;
        }



        times[x] = {
          year: y,
          month: m,
          day: day,
          hour: h,
          minute: min,
          second: s,
          dayOfWeek: dayOfWeek,

        };
       }

       // var temp = this.state.timesAvailable;
       // temp.push(times);

       //console.log(times);
       //console.log(temp);


       this.setState({
        timesAvailable: times,
       });
      }
    })
    .catch(error => {
      //console.log(error);
    });

  }


  getFutureDay(dayIndex){


    let startString = "" + this.state.nextSevenDays[dayIndex].year + "-" + this.state.nextSevenDays[dayIndex].month + "-" + this.state.nextSevenDays[dayIndex].day + "T08:00:00";
    let endString = "" + this.state.nextSevenDays[dayIndex].year + "-" + this.state.nextSevenDays[dayIndex].month + "-" + this.state.nextSevenDays[dayIndex].day + "T17:00:00";

    //console.log('searching between...');
    //console.log(startString);
    //console.log(endString);

    let headers = {headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json; charset=utf-8',
      'Prefer' : 'outlook.timezone="America/Los_Angeles"',
      'client_id' : 'e0a4f1584a854662b138520c797d4866',
      'client_secret' : 'D4E0F8Db49DE4b6ebe00DC24698360DF',
    }};

    let body = {
       "attendees": [
         {
           "type": "required",
           "emailAddress": {
             "name": this.state.selectedEmployee.staffName,
             "address": this.state.selectedEmployee.staffEmail
           }
         }
       ],
       "locationConstraint": {
         "isRequired": "false",
         "suggestLocation": "false",
         "locations": [
           {
             "resolveAvailability": "false",
             "displayName": "Phone"
           }
         ]
       },
       "timeConstraint": {
         "activityDomain":"unrestricted",
         "timeslots": [
           {
             "start": {
               "dateTime": startString,
               "timeZone": "Pacific Standard Time"
             },
             "end": {
               "dateTime": endString,
               "timeZone": "Pacific Standard Time"
             }
           }
         ]
       },
       "meetingDuration": `PT${this.state.meetingDuration}`,
       "isOrganizerOptional": true,
       "returnSuggestionReasons": true,
       "minimumAttendeePercentage": 100.00,
        "maxCandidates":"100"
      };

    //console.log(body);

    axios.post('https://office-365-meeting-scheduler-api.us-w2.cloudhub.io/api/solaritycu/meetingscheduler/findmeetingtimes', body, headers).then(res => {
      if(res) {

       //console.log('logging response');
       //console.log(res.data.meetingTimeSuggestions);
       let times  = []
       for(var x = 0; x < res.data.meetingTimeSuggestions.length; x++){

        let d = new Date(res.data.meetingTimeSuggestions[x].meetingTimeSlot.start.dateTime);
        let y = d.getFullYear();
        let m = d.getMonth();
        let day = d.getDate();
        let dayOfWeek = d.getDay();
        let h = d.getHours();
        let min = d.getMinutes();
        let s = d.getSeconds();

        if(m === 0){
          m = 1;
        }
        else{
          m = m + 1;
        }



        times[x] = {
          year: y,
          month: m,
          day: day,
          hour: h,
          minute: min,
          second: s,
          dayOfWeek: dayOfWeek,

        };
       }

       var temp = this.state.timesAvailable;
       temp.push(times);

       //console.log(times);
       //console.log(temp);


       this.setState({
        timesAvailable: times,
        meetingTimeSuggestions: res.data.meetingTimeSuggestions,
       });
      }
    })
    .catch(error => {
      //console.log(error);
    });
  }


  handleAppointmentSubmit = () =>{
    //console.log('handle submit was clicked, lets try to submit this!');
      //let index = this.state.activeDay;
      //let index2 = index + 1;


      //console.log(this.state.timesAvailable);
      //console.log(`index1 -> ${index} \nindex2 -> ${index2}`);

      //console.log('lets try something....');
      //console.log(this.state.meetingTimeSuggestions);
      //console.log(this.state.activeTime);
      //console.log(this.state.meetingTimeSuggestions[this.state.activeTime]);
      //console.log(this.state.meetingTimeSuggestions[this.state.activeTime].meetingTimeSlot.start.dateTime);
      //console.log(this.state.meetingTimeSuggestions[this.state.activeTime].meetingTimeSlot.end.dateTime);

      let startString = this.state.meetingTimeSuggestions[this.state.activeTime].meetingTimeSlot.start.dateTime;
      let endString = this.state.meetingTimeSuggestions[this.state.activeTime].meetingTimeSlot.end.dateTime;


    // let startString = "" + this.state.timesAvailable[index].year + "-" + this.state.timesAvailable[index].month + "-" + this.state.timesAvailable[index].day + "T";
    // if (this.state.timesAvailable[index].hour < 10) {
    //   startString = startString + "0" + this.state.timesAvailable[index].hour;
    // }
    // else{
    //   startString = startString + this.state.timesAvailable[index].hour;
    // }
    // startString = startString + ":";


    // if (this.state.timesAvailable[index].minute < 10) {
    //   startString = startString + "0" + this.state.timesAvailable[index].minute;
    // }
    // else{
    //   startString = startString + this.state.timesAvailable[index].minute;
    // }
    // startString = startString + ":00";


    // let endString = "" + this.state.timesAvailable[index2].year + "-" + this.state.timesAvailable[index2].month + "-" + this.state.timesAvailable[index2].day + "T";
    // if (this.state.timesAvailable[index2].hour < 10) {
    //   endString = endString + "0" + this.state.timesAvailable[index2].hour;
    // }
    // else{
    //   endString = endString + this.state.timesAvailable[index2].hour;
    // }
    // endString = endString + ":";


    // if (this.state.timesAvailable[index2].minute < 10) {
    //   endString = endString + "0" + this.state.timesAvailable[index2].minute;
    // }
    // else{
    //   endString = endString + this.state.timesAvailable[index2].minute;
    // }
    // endString = endString + ":00";





    //console.log('ok lets see what the date strings are for our create event...');
    //console.log(startString);
    //console.log(endString);

    let meetingAddress = `${this.state.selectedEmployee.locationConnection.entries[0].address[0].streetAddress} ${this.state.selectedEmployee.locationConnection.entries[0].address[0].city}, ${this.state.selectedEmployee.locationConnection.entries[0].address[0].state} - ${this.state.selectedEmployee.staffName}'s office`
    
    if (this.state.meetingType === 'Phone Call') {
      meetingAddress = 'Phone Call';
    }



    this.setState({
      hideMap: true,
    })





    let createHeaders = {headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json; charset=utf-8',
      'Prefer' : 'outlook.timezone="America/Los_Angeles"',
      'client_id' : 'e0a4f1584a854662b138520c797d4866',
      'client_secret' : 'D4E0F8Db49DE4b6ebe00DC24698360DF',
    }};

    let createBody = {
                    "subject": "You have been scheduled for a meeting",
                    "body": {
                      "contentType": "HTML",
                      "content": `A meeting has been scheduled via ${this.state.meetingType} between ${this.state.selectedEmployee.staffName} and ${this.state.inputName}.\n\nThe Member/Client can be contacted by email at ${this.state.inputEmail} or by phone at ${this.state.inputPhone}`
                    },
                    "start": {
                        "dateTime": startString,
                        "timeZone": "Pacific Standard Time"
                    },
                    "end": {
                        "dateTime": endString,
                        "timeZone": "Pacific Standard Time"
                    },
                    "location":{
                        "displayName": meetingAddress
                    },
                    "attendees": [
                      {
                        "emailAddress": {
                          "address": this.state.selectedEmployee.staffEmail,
                          "name": this.state.selectedEmployee.staffName
                        },
                        "type": "required"
                      },
                      {
                        "emailAddress": {
                          "address": this.state.inputEmail,
                          "name": this.state.inputName
                        },
                        "type": "required"
                      },
                    ]
                  };





    axios.post('https://office-365-meeting-scheduler-api.us-w2.cloudhub.io/api/solaritycu/meetingscheduler/createevent', createBody, createHeaders).then(res => {
      if(res) {
       //console.log(res);
       //console.log('we did it!');

       // this.setState({
       //  scheduleConfirm: true,
       // })
      mixpanel.init('d96d9f1409ced72777048f912ef7591e');
      mixpanel.track('Appointment Scheduled', {
        mloName: this.state.selectedEmployee.staffName,
        borrowerEmail: this.state.inputEmail,
        borrowerName: this.state.inputName,
        appointmentStartTime: startString,
        appointmentEndTime: endString
      });

      }

    })
    .catch(error => {
      //console.log(error);
    });

  }

  handleTimeClick = (index) =>{
    this.openModal();
    this.setState({activeTime: index, showInfoWindow: false});

  }


  handleDayClick  = (index) => {

    this.getFutureDay(index);
    //console.log('day was clicked: ' + index);
    this.setState({activeDay: index});
  }



  openModal = () => {
    this.setState({showConfirmationModal: true});
  }



  closeModal = () => {
    this.setState({showConfirmationModal: false, showInfoWindow: true});
  }

  updateInputName(evt) {
    this.setState({
      inputName: evt.target.value,
      errorName: false,
    });
  }

  updateInputEmail(evt) {
    this.setState({
      inputEmail: evt.target.value,
      errorEmail: false,
    });
  }

  updateInputPhone(evt) {
    this.setState({
      inputPhone: evt.target.value,
      errorPhone: false,
    });
  }

  validateConfirmation = () => {

    let name = this.validateName();
    let email = this.validateEmail();
    let phone = this.validatePhone();

    if(name && email && phone){
      //passed all validation send in name, email, phone
      this.handleAppointmentSubmit();
      //this.setState({showConfirmationModal:false});
    }
    else{
      //did not pass all validation
      //console.log('did not pass validation');
    }

  }

  validateEmail = () => {

    // eslint-disable-next-line
    let re = /^(([^<>()\[\]\\.,;:\s@“]+(\.[^<>()\[\]\\.,;:\s@“]+)*)|(“.+“))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   let validEmail = re.test(String(this.state.inputEmail).toLowerCase());




    if (this.state.inputEmail === "") {
      //console.log('email is empty');
      this.setState({errorEmail:true});
      return false;
    }
    else if(validEmail === false){
      //console.log('email did not pass validation');
      this.setState({errorEmail:true});
      return false;
    }
    else{
      //console.log('email is good');
      return true;
    }

  }

  validateName =() => {
    if (this.state.inputName === "") {
      //console.log('name is empty');
      this.setState({errorName:true});
      return false;
    }
    else{
      //console.log('name is good');
      return true;
    }

  }

  validatePhone =() =>{
    let p = /^\d{3}-?\d{3}-?\d{4}$/;

    let validPhone = p.test(this.state.inputPhone);

    if (this.state.inputPhone === "") {
      //console.log('phone is empty');
      this.setState({errorPhone:true});
      return false;
    }
    else if(validPhone === false){
      //console.log('phone did not pass validation');
      this.setState({errorPhone:true});
      return false;
    }
    else{
      //console.log('phone is good');
      return true;
    }

  }






  render() {
    return (
      <div>
      {(this.state.hideMap === false)?
      <div>



        <div className={"confirmation bg-white" + ((this.state.showConfirmationModal === false) ? ' hide' : ' show')}>

          {(this.state.timesAvailable[this.state.activeTime])?
              <div className="container--sm inner_4 borderradius--large mt-6 clearfix">
                <div className="back-button" onClick={this.closeModal}>
                  <span className="feather colorBrandSecondary icon-arrow-left inline-block pr-2"></span>
                  <span className="fontMedium colorBrandSecondary">Back</span>
                </div>
                <div className="grid1of2 clearfix">
                  <h3 className="fontSize2 fontMedium">Meeting Details</h3>
                  <div className="block pb-2">

                    <span className="feather icon-clock fontSize1 inline-block pr-2"></span>

                    <div className="inline-block">
                      <span>{(this.state.timesAvailable[this.state.activeTime].hour > 12) ? (this.state.timesAvailable[this.state.activeTime].hour) - 12 : this.state.timesAvailable[this.state.activeTime].hour } : {(this.state.timesAvailable[this.state.activeTime].minute > 9) ? this.state.timesAvailable[this.state.activeTime].minute : "0" + this.state.timesAvailable[this.state.activeTime].minute} {(this.state.timesAvailable[this.state.activeTime].hour > 12) ? "PM" : "AM"}</span>
                       <span> - {this.state.timesAvailable[this.state.activeTime].month}/{this.state.timesAvailable[this.state.activeTime].day}</span>
                    </div>
                  </div>
                  <div className="block pb-2">

                    <span className="feather icon-user fontSize1 inline-block pr-2"></span>

                    <div className="inline-block">
                      {this.state.selectedEmployee.staffName}
                    </div>
                  </div>
                  <div className="block pb-2">

                    <span className="feather icon-clock fontSize1 inline-block pr-2"></span>
                    <div className="inline-block">
                      {this.state.meetingDurationFormatted}
                    </div>
                  </div>
                  <div className="block pb-2">
                    <span className="feather icon-user fontSize1 inline-block pr-2"></span>
                    <div className="inline-block">
                      {this.state.meetingType}
                    </div>
                  </div>
                  <div className="block pb-2">
                    <span className="feather icon-map-pin fontSize1 pull-left pr-2"></span>

                    <div className="inline-block">
                      <div className="pb-1">
                      {
                        (this.state.meetingType === 'Phone Call')
                        ?
                          ''
                        :
                          `${this.state.selectedEmployee.locationConnection.entries[0].title}`

                        
                      }
                      </div>
                      <div className="block">
                      {
                        (this.state.meetingType === 'Phone Call')
                        ?
                          'Phone Call'
                        :
                          `${this.state.selectedEmployee.locationConnection.entries[0].address[0].streetAddress}
                          ${this.state.selectedEmployee.locationConnection.entries[0].address[0].city},
                          ${this.state.selectedEmployee.locationConnection.entries[0].address[0].state}`

                      }
                        
                      </div>
                    </div>

                  </div>
                </div>
                <div className="grid1of2 clearfix">
                  <h3 className="fontSize2 fontMedium">Enter Details</h3>
                  <label>Your Name:</label>
                  {
                    (this.state.errorName)
                    ? <span className="error red-error">Name can not be left blank</span>
                    : ''
                  }
                  <input className="mb-1" onChange={evt => this.updateInputName(evt)} id="name-input" aria-label="your name"/>

                  <label>Your Email:</label>
                  {
                    (this.state.errorEmail)
                    ? <span className="error red-error">Must enter valid email</span>
                    : ''
                  }
                  <input className="mb-1" onChange={evt => this.updateInputEmail(evt)} id="email-input" aria-label="email"/>

                  <label>Your Phone:</label>
                  {
                    (this.state.errorPhone)
                    ? <span className="error red-error">Must enter valid phone</span>
                    : ''
                  }
                  <input className="mb-2" onChange={evt => this.updateInputPhone(evt)} id="phone-input" aria-label="phone"/>

                  <button className="button button-primary fontSize1" onClick={() => this.validateConfirmation()}>Schedule Appointment</button>
                </div>
              </div>
              :""
            }
        </div>





          {
            (this.state.scheduleNoMap)

            ?
              <div className={"offsetNav schedule-no-map " + ((this.state.showConfirmationModal) ? 'force-hide' : '')}>

                <div className={"schedule-map-list " + ((this.state.meetingPicker) ? 'show' : 'force-hide')}>
                <div className="back-button" onClick={() => this.onMeetingBack()}>
                  <span className="feather colorBrandSecondary icon-arrow-left inline-block pr-2"></span>
                  <span className="fontMedium colorBrandSecondary">Back</span>
                </div>
                  <div className="schedule-heading fontMedium fontSize2 pt-3 pb-2 pl-2">
                    How would you like to meet?
                  </div>
                  <div className="inner_1 text-left">
                    <div className="appt-link pb-2 pt-2 pl-2 pr-2">
                      <div className="fontMedium fontSize1" onClick={() => this.changeMeetingType('Phone Call')}>Phone Call</div>
                    </div>

                  </div>

                </div>




                <div className={"schedule-map-list " + ((this.state.durationPicker) ? 'show' : 'hide')}>
                <div className="back-button" onClick={() => this.onDurationBack()}>
                  <span className="feather colorBrandSecondary icon-arrow-left inline-block pr-2"></span>
                  <span className="fontMedium colorBrandSecondary">Back</span>
                </div>
                  <div className="schedule-heading fontMedium fontSize2 pt-3 pb-2 pl-2">
                    How long of a meeting would you like to book?
                  </div>
                  <div className="text-left">

                    {
                      (this.state.data.meetingTypes.length > 0)
                      ?
                        (this.state.data.meetingTypes.map((list, index) =>  {
                          return(
                              <div key={`type-${index}`} className="appt-link pb-2 pt-2 pl-2 pr-2">
                                <div className="fontMedium fontSize1 " onClick={() => this.changeMeetingDuration(`${list.meetingDurationValue}`)}>{list.meetingDurationFormatted}</div>
                              </div>
                          );
                        }))
                      :
                        ""
                    }




                  </div>

                </div>






                <div className={"timepicker borderradius--large bg-white--large " + ((this.state.showInfoWindow) ? 'show' : 'hide')}>
                <div className="back-button" onClick={() => this.onInfoClose()}>
                  <span className="feather colorBrandSecondary icon-arrow-left inline-block pr-2"></span>
                  <span className="fontMedium colorBrandSecondary">Back</span>
                </div>
                  <div className="inner_3 text-left">
                    <div className="block fontSize1 fontMedium">Select a date and time for your meeting with  {(this.state.selectedEmployee.staffName) ? this.state.selectedEmployee.staffName : ''}</div>
                  </div>
                  <div className="timeslots text-center">
                    {(this.state.nextSevenDays) ?
                      (this.state.nextSevenDays.map((li, d) => {
                        return(
                          <div key={'timeslots'+d} className={(li.dayOfWeek === 0 || li.dayOfWeek === 6) ? "timeslot disabled" : "timeslot"} onClick={() => this.handleDayClick(d)}>
                            <div className="timeslot--day_container inline-block text-center ">
                              <div className="timeslot--day">
                                <label htmlFor="timeslotRadio-0">
                                  <span className="timeslot--day_name">{this.state.daysOfWeek[li.dayOfWeek]}</span>
                                  <span className={"timeslot--day_date " + ((this.state.activeDay === d && li.dayOfWeek !== 0 && li.dayOfWeek !== 6) ? 'active' : '')}>{li.day}</span>
                                </label>
                              </div>
                            </div>
                          </div>
                        );
                      }
                    ))
                    : ""}
                  </div>
                  <div className="hours stripe-sml active pt-1 pb-1" >
                    {(this.state.timesAvailable[0]) ?
                      (this.state.timesAvailable.map((list, index) => {
                        return(
                          <div onClick={() => this.handleTimeClick(index)} key={'time' + index} className="hours--slot mb-1 ">
                            <span className="hours--slot_container">
                              <span>{(list.hour > 12) ? list.hour -  12 : list.hour}</span> : <span>{(list.minute === 0) ? "00" : list.minute} {(list.hour > 11) ? "PM" : "AM"}</span>
                            </span>
                          </div>
                        );
                      }))
                    : <ScheduleTimeLoader />}
                  </div>
                </div>

              <div className={"schedule-map-list schedule-employee-picker " + ((this.state.showStaffWindow) ? 'show' : 'hide')}>
                <div className="schedule-heading fontMedium fontSize2 pt-3 pb-2 pl-2">Who would you like to meet with?</div>
                <div className="schedule-employee-list">
                {(this.state.data.available) ?
                  (this.state.data.available.map((l,i) => {
                    return(
                      <div key={'employee-' + i} className="employee-list-item stripe_2 clearfix" onClick={() => this.handleEmployeeClick(i)}>
                        <div className="employee-image">
                          <img src={`${process.env.REACT_APP_S3_URL}` + l.staffImage[0].filename} alt={l.staffName} />
                        </div>
                        <div className="employee">
                          <div>
                            <span className="fontSize1 fontMedium">{l.staffName} </span>
                            <span className="fontSize0 colorGrey4 pl-1">{l.staffTitle}</span>
                          </div>
                          <div className="block pb-2 colorGrey4">{l.locationConnection.entries[0].address[0].streetAddress}, {l.locationConnection.entries[0].address[0].city}, {l.locationConnection.entries[0].address[0].state}</div>
                          <div className="location-distance colorBrandSecondary"></div>
                        </div>
                      </div>
                    );
                  }))
                  : ""
                }
                </div>
              </div>
            </div>



            :
              <div className={"block appointment-details map-holder " + ((this.state.showConfirmationModal === true ) ? 'hide' : '')}>
                <ScheduleMap
                data={this.state.data}
                mapCenter={this.state.mapCenter}

                selectedEmployee={this.state.selectedEmployee}
                timesAvailable={this.state.timesAvailable}
                daysOfWeek={this.state.daysOfWeek}
                nextSevenDays={this.state.nextSevenDays}
                handleDayClick={this.handleDayClick}
                handleTimeClick={this.handleTimeClick}
                activeTime={this.state.activeTime}
                activeDay={this.state.activeDay}

                handleEmployeeClick={this.handleEmployeeClick}
                onInfoClose={this.onInfoClose}
                onDurationBack={this.onDurationBack}

                showInfoWindow={this.state.showInfoWindow}
                showStaffWindow={this.state.showStaffWindow}
                durationPicker={this.state.durationPicker}
                meetingDuration={this.state.meetingDuration}
                changeMeetingDuration={this.changeMeetingDuration}

                meetingType={this.state.meetingType}
                meetingPicker={this.state.meetingPicker}
                onMeetingBack={this.onMeetingBack}
                changeMeetingType={this.changeMeetingType}
              >
              </ScheduleMap>
            </div>
          }











      </div>

      : <Redirect to="/schedule-confirmation" />
        }
        </div>
    );
  }
}

export default ScheduleAppointment;
