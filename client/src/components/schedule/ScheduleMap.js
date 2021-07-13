import React from 'react';

import { compose, withProps} from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";


import MapStyles from "../locations/MapStyles.json";


import ScheduleTimeLoader from './ScheduleTimeLoader';



const ScheduleMap = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyBda644jS6Qf3_Vz_3det2hyCgvx8BRp9U&v=3.36&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    // containerElement: <div style={{ height: `calc(100vh - 100px)` }} />,
    containerElement: <div style={{ height: '100%' }} />,
    // mapElement: <div style={{ height: `calc(100vh - 100px)` }} />,
    mapElement: <div style={{ height: `100%` }} />,
    mapStyles: MapStyles,
    fullscreenControl:false


  }),
  withScriptjs,
  withGoogleMap

)((props) =>


<GoogleMap
    defaultZoom={14}
    defaultCenter={props.mapCenter}
    center={props.mapCenter}
    defaultOptions={{ styles: MapStyles, fullscreenControl: false, disableDefaultUI: true }}
    onClick={props.onMapClick}
>

  <Marker
    position={props.mapCenter}
    name="you are here"
    cursor='/img/icon-location.png'
    icon='/img/icon-location.png'
    animation={2}
  />
  <div>




      <div className={"schedule-map-list " + ((props.meetingPicker) ? 'show' : 'force-hide')}>
      <div className="back-button" onClick={() => props.onMeetingBack()}>
        <span className="feather colorBrandSecondary icon-arrow-left inline-block pr-2"></span>
        <span className="fontMedium colorBrandSecondary">Back</span>
      </div>
        <div className="schedule-heading fontMedium fontSize2 pb-2 pl-2 pt-2">
          How would you like to meet?
        </div>
        <div className="inner_1 text-left">
          <div className="schedule-link pb-2 pt-2 pl-2 pr-2">
            <div className="fontMedium fontSize1" onClick={() => props.changeMeetingType('Phone Call')}>Phone Call</div>
          </div>

        </div>

      </div>




      <div className={"schedule-map-list " + ((props.durationPicker) ? 'show' : 'force-hide')}>
      <div className="back-button" onClick={() => props.onDurationBack()}>
        <span className="feather colorBrandSecondary icon-arrow-left inline-block pr-2"></span>
        <span className="fontMedium colorBrandSecondary">Back</span>
      </div>
        <div className="schedule-heading fontMedium fontSize2 pt-3 pb-2 pl-2">
          How long of a meeting would you like to book?
        </div>
        <div className="inner_1 text-left">


          {
            (props.data.meetingTypes.length > 0)
            ?
              (props.data.meetingTypes.map((list, index) =>  {
                return(
                    <div key={`meetingType-${index}`} className="schedule-link pb-2 pt-2 pl-2 pr-2">
                      <div className="fontMedium fontSize1" onClick={() => props.changeMeetingDuration(`${list.meetingDurationValue}`)}>{list.meetingDurationFormatted}</div>
                    </div>
                );
              }))
            :
              ""
          }



        </div>



      </div>






      <div className={"timepicker " + ((props.showInfoWindow) ? 'show' : 'force-hide')}>
        <div className="back-button" onClick={() => props.onInfoClose()}>
          <span className="feather colorBrandSecondary icon-arrow-left inline-block pr-2"></span>
          <span className="fontMedium colorBrandSecondary">Back</span>
        </div>
        <div className="inner_1 text-left">
          <div className="block fontSize1 fontMedium">Select a date and time for your meeting with  {(props.selectedEmployee.staffName) ? props.selectedEmployee.staffName : ''}</div>
        </div>
        <div className="timeslots text-center">
          {(props.nextSevenDays) ?
            (props.nextSevenDays.map((li, d) => {
              return(
                <div key={'timeslots'+d} className={(li.dayOfWeek === 0 || li.dayOfWeek === 6) ? "timeslot disabled" : "timeslot"} onClick={() => props.handleDayClick(d)}>
                  <div className="timeslot--day_container inline-block text-center ">
                    <div className="timeslot--day">
                      <div htmlFor="timeslotRadio-0">
                        <span className="timeslot--day_name">{props.daysOfWeek[li.dayOfWeek]}</span>
                        <span className={"timeslot--day_date " + ((props.activeDay === d && li.dayOfWeek !== 0 && li.dayOfWeek !== 6) ? 'active' : '')}>{li.day}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
          ))
          : ""}
        </div>
        <div className="hours stripe-sml active pt-1 pb-1" >
          {(props.timesAvailable[0]) ?
            (props.timesAvailable.map((list, index) => {
              return(
                <div onClick={() => props.handleTimeClick(index)} key={'time' + index} className="hours--slot mb-1 ">
                  <span className="hours--slot_container">
                    <span>{(list.hour > 12) ? list.hour -  12 : list.hour}</span> : <span>{(list.minute === 0) ? "00" : list.minute} {(list.hour > 12) ? "PM" : "AM"}</span>
                  </span>
                </div>
              );
            }))
          : <ScheduleTimeLoader />}
        </div>
      </div>

    <div className={"schedule-map-list " + ((props.showStaffWindow) ? 'show' : 'force-hide')}>
      <div className="schedule-heading fontMedium fontSize2 pt-3 pb-2 pl-2">Who would you like to meet with?</div>
      <div className="schedule-employee-list  ">
      {(props.data.available) ?
        (props.data.available.map((l,i) => {
          return(
            <div key={'employee-' + i} className="employee-list-item stripe_2 clearfix" onClick={() => props.handleEmployeeClick(i)}>
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
</GoogleMap>
);


export default ScheduleMap;
