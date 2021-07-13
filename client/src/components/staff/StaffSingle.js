import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import mixpanel from 'mixpanel-browser';

class StaffSingle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      department:[],
      location:[],
      visible: false,
      trackedApply: false,
      loading: true
    }

    this.trachApplyLink = this.trachApplyLink.bind(this);
    this.trackAppointmentClick = this.trackAppointmentClick.bind(this);
  }

  componentDidUpdate(prevProps, prevState){
    if (prevProps.info.department !== this.props.info.department) {
      this.setState({
        department:this.props.info.department,
      });
    }
    if (prevProps.info.staffLocationsConnection.entries !== this.props.info.staffLocationsConnection.entries) {
      this.setState({
        location:this.props.info.staffLocationsConnection.entries,
      });
    }

    if (this.props.deptFilter !== prevProps.deptFilter || this.props.locFilter !== prevProps.locFilter || this.props.nameFilter !== prevProps.nameFilter) {
      var deptFilter = this.props.deptFilter;
      var locFilter = this.props.locFilter;
      var nameFilter = this.props.nameFilter;
      var department = this.state.department;
      var location = this.state.location;
      var departmentList = [];
      var locationList = [];


      let show = false;
      let showDep = false;

      for (var i = 0; i <= department.length - 1; i++) {
        //do things here for department list
        // //console.log(department[i].title);
        departmentList[i] = department[i].title;

        if (deptFilter !== 'none' && deptFilter === department[i].title) {
          //console.log('we should be showing department...');
          showDep = true;
        }

      }

      let showLoc = false;

      for (i = 0; i <= location.length - 1; i++) {
        //do things here for location list
        // //console.log(location[i].title);
        locationList[i] = location[i].title;

        if (locFilter !== 'none' && locFilter === location[i].title) {
          //console.log('we should be showing location...');
          showLoc = true;
        }
      }

      let showName = false;

      var string = this.props.info.staffMemberName.toLowerCase(),
      substring = nameFilter.toLowerCase();

      //console.log('strings...');
      //console.log(string);
      //console.log(substring);

      if (string.indexOf(substring) !== -1 && substring !== '') {
        //console.log('we should be showing name...');
        showName = true;
      }

      if (nameFilter === '') {
        showName = true;
      }

      if (locFilter === 'none' && deptFilter === 'none' && nameFilter === '') {
        show = true;
      }

      if (
          (showDep === true && locFilter === 'none' && nameFilter === '') ||
          (showLoc === true && deptFilter === 'none' && nameFilter === '') ||
          (showName === true && locFilter === 'none' && deptFilter === 'none') ||

          (showDep === true && showLoc === true && nameFilter === '') ||
          (showDep === true && locFilter === 'none' && showName === true) ||

          (showLoc === true && showDep === true && nameFilter === '') ||
          (showLoc === true && deptFilter === 'none' && showName === true) ||

          (showName === true && showLoc === true && deptFilter === 'none') ||
          (showName === true && locFilter === 'none' && showDep === true) ||

          (showDep === true && showLoc === true && showName === true && deptFilter !== 'none' && locFilter !== 'none' && nameFilter !== '')
          )
      {
        show = true;
      }

      this.setState({
        visible: show,
      });
    }

  }

  componentDidMount(){
    //console.log('logging props info...');
    //console.log(this.props);
    // //console.log(this.props.info.department[0].title);
    // //console.log(this.props.info.staffLocationsConnection.entries[0]);
    this.setState({
      department:this.props.info.department,
      location:this.props.info.staffLocationsConnection.entries,
    });

    var deptFilter = this.props.deptFilter;
    var locFilter = this.props.locFilter;
    var nameFilter = this.props.nameFilter;
    var department = this.state.department;
    var location = this.state.location;
    var departmentList = [];
    var locationList = [];


    let show = false;
    let showLoc = false;

    for (var i = 0; i <= department.length - 1; i++) {
      //do things here for department list
      // //console.log(department[i].title);
      departmentList[i] = department[i].title;

      if (deptFilter !== 'none' && deptFilter === department[i].title) {
        showLoc = true;
      }

    }

    let showDep = false;

    for (i = 0; i <= location.length - 1; i++) {
      //do things here for location list
      // //console.log(location[i].title);
      locationList[i] = location[i].title;

      if (locFilter !== 'none' && locFilter === location[i].title) {
        showDep = true;
      }
    }

    let showName = false;

    var string = this.props.info.staffMemberName.toLowerCase(),
      substring = nameFilter.toLowerCase();

    if (string.indexOf(substring) !== -1 && nameFilter !== '') {
      showName = true;
    }

    if (nameFilter === '') {
      showName = true;
    }

    if (locFilter === 'none' && deptFilter === 'none' && nameFilter === '') {
      show = true;
    }

    if (
        (showDep === true && locFilter === 'none' && nameFilter === '') ||
        (showLoc === true && deptFilter === 'none' && nameFilter === '') ||
        (showName === true && locFilter === 'none' && deptFilter === 'none') ||

        (showDep === true && showLoc === true && nameFilter === '') ||
        (showDep === true && locFilter === 'none' && showName === true) ||

        (showLoc === true && showDep === true && nameFilter === '') ||
        (showLoc === true && deptFilter === 'none' && showName === true) ||

        (showName === true && showLoc === true && deptFilter === 'none') ||
        (showName === true && locFilter === 'none' && showDep === true) ||

        (showDep === true && showLoc === true && showName === true && deptFilter !== 'none' && locFilter !== 'none' && nameFilter !== '')
        )
    {
      show = true;
    }

    this.setState({
      visible: show,
    });
  }

  trachApplyLink(){

    if(this.state.trackedApply === false) {

    mixpanel.init('d96d9f1409ced72777048f912ef7591e');
    mixpanel.track('Apply Online - Staff Directory', {
      mloName: this.props.info.staffMemberName,
    });


      this.setState({trackedApply: true});
    } else {
      this.setState({trackedApply: false});
    }
  }

  trackAppointmentClick(){
    mixpanel.init('d96d9f1409ced72777048f912ef7591e');
    mixpanel.track('Schedule Appointment - Staff Directory', {
      mloName: this.props.info.staffMemberName,
    });
  }

  render() {
    var info = this.props.info;

    var name = info.staffMemberName;
    var position = info.jobTitle;
    var email = info.email;
    var phone = info.phoneNumber;
    var purchase = false;
    // var refinance = false;
    // var construction = false;
    if (info.applyLinks.length  >  0) {
      purchase = info.applyLinks[0].purchase;
      // refinance = info.applyLinks[0].refinance;
      // construction = info.applyLinks[0].construction;
    }
    else{
      purchase = false;
    }


    var imageAlt = info.image[0].title;
    var schedule = info.scheduleAppointmentLink;
    //var department = this.state.department;
    //var location = this.state.location;
    var departmentList = [];
    var locationList = [];

    var showLO= false;

    if (info.showLoPage) {
      showLO = true;
    }

    // for(var i = 0; i < department.length; i++){
    //   if (department[i].title === 'Mortgage Team') {
    //     showLO = true;
    //   }
    // }

    return (
      <div className={(this.state.visible === true) ? "flex-3 show" : "felx-3 hide"}>
        {(this.state.visible === true ) ?
          <div className='staff-list-item' department={departmentList} location={locationList}>


            {
              (showLO)
              ?
                <div className="width-80">
                  <Link to={`/lo/${info.slug}`}>
                    <img className="staff-image-small" alt={imageAlt} src={info.image[0].url} />
                  </Link>
                </div>

              :
                <div className="width-80">
                  <img className="staff-image-small" alt={imageAlt} src={info.image[0].url} />
                </div>

            }
            <div className="staff-info">

              {
                (showLO)
                ?
                  <Link to={`/lo/${info.slug}`}>
                    <span className="staff-name fontMedium colorBrandSecondary pb-1">{name}</span>
                  </Link>
                :
                  <span className="staff-name fontMedium colorBrandSecondary pb-1">{name}</span>
              }


              <div className="staff-position text-uppercase fontSize0 pb-1">{position}</div>
              <div className="staff-email colorGrey5"><a href={'mailto:'+email+'?subject=Non-secure message to Solarity&body=This e-mail is not a secure method of communication. Please do not include any personal or sensitive information in this communication.'}>{email}</a></div>
              <div className="staff-phone colorGrey5"><a href={'tel:'+phone}>{phone}</a></div>


              {(purchase) ?
                  <a href={purchase} target="_blank" aria-label={`apply for a loan with ${name}`} className="directionalLink mb-1" onClick={this.trachApplyLink}>Apply Online <span className="feather icon-arrow-right"></span></a>
              : ''}


              {(schedule) ? <div className="staff-schedule"><a className="directionalLink" aria-label={`schedule an appointment with ${name}`} target="_blank" onClick={this.trackAppointmentClick} href={`schedule/${schedule}`}>Schedule an Appointment <span className="feather icon-arrow-right"></span></a></div> : ''}




            </div>
          </div>
        :
          ""
        }
      </div>


    );

  }
}

export default StaffSingle;
