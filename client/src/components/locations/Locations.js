import React, { Component } from 'react';
import queryString from 'query-string';

import axios from 'axios';

// apollo
import ApolloClient, { gql } from 'apollo-boost';
import * as MP_API from './api.js';
import Modal from 'react-modal';
import Map from "./Map";
// import Nav from "../../ui-elements/Nav"


//import axios from 'axios';


Modal.setAppElement('#root');


class Locations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLocation: 0,
      currentDay: 0,
      locationLat: 46.602119,
      locationLng: -120.516974,
      userLat: 46.602119,
      userLng: -120.516974,
      inputText: '',
      atmCount: 50,
      atmRadius: 100,
      points: [],
      Locations: [],
      mapCenter: { lat: 46.602119, lng: -120.516974 },
      hasLocation: false,
      showMarkers: true,
      showLocations: true,
      showFilters: true,
      showLocationModal: false,
      showAtmModal: false,
      modalIndex: 0,
      modalAtmIndex: 0,
      atmDescription: "",
      atmName: "",
      currentMarker:[],
      near:"Yakima",
      modalIsOpen: false,
      cameFromSearch: false,
      loading: true,
    }
  }

  componentDidUpdate(prevProps, prevState){

    if (this.props.specific && this.props.specific !== prevProps.specific) {
      //console.log('we have updated the component and altered the specific prop ->' + this.props.specific);
      this.handleLocationRoute();
    }

    if (!this.props.specific && prevProps.specific) {
      //console.log('%c going from specific to non specific', 'background: #fff; color: red');
      this.getLocation();
    }

    if (this.props.specific && !prevProps.specific) {
      //console.log('%c going from non specific to specific', 'background: #fff; color: red');
      this.handleLocationRoute();
    }


  }

  componentDidMount() {
    ////console.log(this.props.location.state.searching);


    // axios.get('https://locatorapi.moneypass.com/Service.svc/locations/atm?format=json&spatialFilter=nearby(41.944366455078125%2C-87.65599822998047%2C50)&start=0&count=50&key=2iqr8FkSmQhLCPo').then(res => {
    //   if(res) {
    //    console.log(res);
    //    console.log('got results from moneypass...');
    //   }
    // })
    // .catch(error => {
    //   console.log('an error occured....');
    //   console.log(error);
    // });


    this.getLocation();
    //console.log('this is a placeholer so it pushes yarn to uncache');

    const LOCATIONS = gql`
      {
        entries(section:[locations]){
          ...on Locations{
            title
            slug
            address{
              streetAddress
              city
              state
              zip
            }
            directionsLink
            longitude
            latitude
            hoursOfOperation{
              ...on HoursOfOperationHoursOfOperation{
                day
                lobbyHours
                driveUpHours
              }
            }
            phoneNumber
            features{
              description
            }
          }
        }
        globals{
          creditUnionHolidays {
            creditUnionHolidays {
              ...on CreditUnionHolidaysHolidays {
                description
                date  @date(as:"F j, Y")
              }
            }
          }
        }
      }
    `;

      // Get the preview token from the URL
      let m = document.location.href.match(/\btoken=([^&]+)/);
      let token = m ? m[1] : '';
      
      // Then forward that on whenever you are sending a CraftQL API request
      let url = `graph-api?token=${token}`;

      const client = new ApolloClient({
          uri: `${process.env.REACT_APP_BASE_URL}${url}`,
          request: operation => {
            operation.setContext({
              headers: {
                Authorization: `bearer ${process.env.REACT_APP_GRAPH_TOKEN}`,
              },
            });
          },
        });

        client
          .query({
            query: LOCATIONS,
          })
          .then(response => {
            //console.log(response.data.entries);

            this.setState({
              Locations: response.data.entries,
              holidays: response.data.globals.creditUnionHolidays.creditUnionHolidays
            });
            console.log('calc disteance from did mount...');
            this.sortDistanceToMe();
            this.calcDistance();

            if (this.props.specific) {
              //console.log('we have a specific location we are looking for -> ' + this.props.specific);

              this.handleLocationRoute();

            }

          });





    if (this.props.searchParam !== '') {
      //console.log('%c Lets all agree that there is a query string to parse...', 'background: #222; color: #bada55');
      //console.log(this.props.searchParam);
      let paramString = this.props.searchParam.replace(/%20/g, " ");
      let qs = queryString.parse(paramString);
      //console.log(qs);
      this.setState({
        showLocations: (qs.locationsShow === 'true') ? true : false,
        showMarkers: (qs.atmsShow === 'true') ? true : false,
        inputText: qs.searching,
      });
      this.search();
    }


    
    var string = window.location.href,
    substring = "?searching";

    if (string.indexOf(substring) > 0 ) {
      //console.log('%c This has been routed from contact', 'background: #222; color: #bada55');

      var split = string.split("?");
      var search = split[1].split("&");
      // //console.log(search);

      var searchStringArray = search[0].split("=");
      var locArray = search[1].split("=");
      var atmArray = search[2].split("=");


      this.setState({
        inputText: searchStringArray[1].replace(/%20/g, " "),
        showLocations: (locArray[1] === 'true') ? true : false,
        showMarkers: (atmArray[1] === 'true') ? true : false,
      });

    }

    



  }


  componentWillMount(){

    if (this.props.searchParam !== '') {
      //console.log('%c Lets all agree that there is a query string to parse...', 'background: #222; color: #bada55');
      //console.log(this.props.searchParam);
      let paramString = this.props.searchParam.replace(/%20/g, " ");
      let qs = queryString.parse(paramString);
      //console.log(qs);
      this.setState({
        showLocations: (qs.locationsShow === 'true') ? true : false,
        showMarkers: (qs.atmsShow === 'true') ? true : false,
        inputText: qs.searching,
        loading: false,
      });
    }





  }

  calcDistance(){
    console.log('in calc distance, lets see what we got');
    console.log(this.state.Locations);
    if (this.state.Locations) {
      let showLocations = false;
      //let showMarkers = false;
      //let modalIndex = 0;
      for (var i = 0; i < this.state.Locations.length; i++) {
        if (this.distance(this.state.Locations[i].latitude, this.state.Locations[i].longitude, this.state.userLat, this.state.userLng, "M") < 25) {
          //console.log('location within 25 miles!');
          showLocations = true;
          //modalIndex = i;
        }
      }
      showLocations = true;

      if (this.state.cameFromSearch === true) {
        this.setState({
          modalIsOpen:  false,
        });
      }
      else{
        this.setState({
          showLocations: showLocations,
          // showMarkers: (showLocations) ? false : true,
          // modalIsOpen:  (showLocations) ? false : true,
          // showMarkers: false,
          // modalIsOpen:  false,
          loading: false,
          modalIndex: i,
        });
      }


      this.sortDistanceToMe();


    }
  }

  distance(lat1, lon1, lat2, lon2, unit) {
    var radlat1 = Math.PI * lat1/180
    var radlat2 = Math.PI * lat2/180
    var theta = lon1-lon2
    var radtheta = Math.PI * theta/180
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist)
    dist = dist * 180/Math.PI
    dist = dist * 60 * 1.1515
    if (unit === "K") { dist = dist * 1.609344 }
    if (unit === "N") { dist = dist * 0.8684 }
    return dist
  }



  getLocation() {
    // //console.log('%c ', 'background: #000; color: #bada55');
    // //console.log('%c Lets get the location...', 'background: #000; color: #bada55');
    if(navigator.geolocation) {
      // //console.log('%c Navigator??', 'background: #000; color: #bada55');
      // //console.log(navigator);

      let options = {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0
      };
      navigator.geolocation.getCurrentPosition((position) => {
        //console.log('%c position', 'background: #000; color: #bada55');
        //console.log(position);

        if (this.props.searchParam !== '') {
          //this.search();
        }
        else if (this.props.specific) {
          this.setState({
            hasLocation: true,
            near: "you",
            loading: false,
          });
          this.handleLocationRoute();

        }
        else{
          this.setState({
            hasLocation: true,
            userLat: position.coords.latitude,
            userLng: position.coords.longitude,
            locationLat: position.coords.latitude,
            locationLng: position.coords.longitude,
            mapCenter: { lat: position.coords.latitude, lng: position.coords.longitude - .002 },
            near: "you",

          });
          this.getATMs();
          this.calcDistance();
        }


      }, (err) => {
        //console.log(err);
        //console.log('we couldnt get location...');
        this.setState({
          hasLocation: false,
          userLat: 46.602119,
          userLng: -120.516974,
          locationLat: 46.602119,
          locationLng: -120.516974,
          mapCenter: { lat: 46.602119, lng: -120.516974 - .002 },
          near: "Yakima",
          loading: false,
        });
        this.getATMs();
        this.calcDistance();
        this.sortDistanceToMe();

      }, options);
    } else {
      // location not supported by browser or somethin
      // //console.log('%c nope, no geolocation get current position', 'background: #000; color: #bada55');
      //console.log('we aint got no location...');
      this.setState({ hasLocation: false});
      this.getATMs();
      this.calcDistance();

    }
  }

  handleLocationRoute(){

    if (this.state.Locations) {
      for(let i = 0; i < this.state.Locations.length; i++ ){
        //console.log(this.state.Locations[i]);
        if (this.state.Locations[i].slug === this.props.specific) {
          //console.log('this is the one we  are looking for!');
          //console.log(i);

          this.setState({
            showLocations: true,
            showMarkers: false,
            hasLocation: true,
            userLat: parseFloat(this.state.Locations[i].latitude),
            userLng: parseFloat(this.state.Locations[i].longitude),
            locationLat: parseFloat(this.state.Locations[i].latitude),
            locationLng: parseFloat(this.state.Locations[i].longitude),
          });
          this.handleLocationClick(i);

        }
      }
      this.getATMs();
    }
  }

  // on marker click returns index of marker
  handleMarkerClick = (index) => {
    // //console.log(index);
    let temp = [];
    for (var i = 0; i <= this.state.points.length - 1; i++) {
      if (i === index) {
        temp[i] = 1;
      }
      else{
        temp[i] = 0;
      }

    }
    //console.log('marker');
    this.setState({
      mapCenter:{lat: this.state.points[index].atmLocation.coordinates.latitude, lng: (this.state.points[index].atmLocation.coordinates.longitude - .002)},
      currentMarker: temp,
      showAtmModal: true,
      modalAtmIndex: index,
    });

  }


  openModal = () => {
    this.setState({modalIsOpen: true});
  }



  closeModal = () => {
    this.setState({modalIsOpen: false});
  }

  modalLocation = () => {
    //console.log('modal location click');
    this.setState({
      modalIsOpen: false,
      showLocations: true,
      showMarkers: false,
      loading: false,
    });
  }

  modalAtm = () => {
    //console.log('modal atm click');
    this.setState({
      modalIsOpen: false,
      showLocations: false,
      showMarkers: true,
      loading: false,
    });

  }

  modalBoth = () => {
    //console.log('modal both click');
    this.setState({
      modalIsOpen: false,
      showLocations: true,
      showMarkers: true,
      loading: false,
    });

  }

  handleLocationClick = (index) => {
    //console.log('location');
    // //console.log(locations);
    this.setState({
      showLocationModal: true,
      modalIndex: index,
      mapCenter: {lat: parseFloat(this.state.Locations[index].latitude), lng: (parseFloat(this.state.Locations[index].longitude) - .002)}
    })
  }

  handleModalBack = () => {
    this.setState({
      showLocationModal: false,
      showAtmModal: false,
      modalIndex: 0,
      modalAtmIndex: 0,
    });
  }

  handleTextChange = (e) => {
    this.setState({ inputText: e.target.value });
  }

  handleLocationFilter = () => {
    //console.log('filter loc click');
    if (this.state.showLocations) {
      this.setState({
        showLocations: false
      });
    }
    else{
      this.setState({
        showLocations: true
      });
    }
  }

  handleAtmsFilter = () => {
    //console.log('filter atm click');
    //console.log(this.state.points);
    if (this.state.showMarkers) {
      this.setState({
        showMarkers: false
      });
    }
    else{
      this.setState({
        showMarkers: true
      });
    }
  }

  handleFilterToggle = () => {

    //console.log('filter clicked');
    if (this.state.showFilters) {
      this.setState({
        showFilters: false
      });
    }
    else{
      this.setState({
        showFilters: true
      });
    }
  }

  search = () => {
    MP_API.getCoordsFromAddress(this.state.inputText, (e, coordinates) => {
      if(e) {
        // handle error
        //console.log(e)
      } else {
        // successfully got coordinates from city or zip
        //console.log('search has been called and found, lets set it up...');
        this.setState({
          locationLat: coordinates.lat,
          locationLng: coordinates.lng,
          userLat: coordinates.lat,
          userLng: coordinates.lng,
          mapCenter: { lat: coordinates.lat, lng: coordinates.lng },
          near: this.state.inputText,
          cameFromSearch: true,
          modalAtmIndex: 0,
          modalIndex: 0,

        },
         () => {
          this.getATMs();
          this.calcDistance();
        })
      }
    })
  }

  getATMs = () => {
    console.log('%c get atms...', 'background: #000; color: #bada55');
    MP_API.getATMs(this.state.locationLat, this.state.locationLng, this.state.atmRadius, this.state.atmCount, (e, points) => {
      if(e) {
        // handle error
        //console.log(e)
      } else {
        //console.log('%c loggin points', 'background: #000; color: #bada55');
        //console.log(points);
        this.handleData(points);
      }
    })
  }

  handleData = (results) => {
    // maybe parse some of the data, not sure if we want all the data on it
    this.setState({ points: results, mapCenter: { lat: this.state.locationLat, lng: this.state.locationLng -.002 } }, () => {
      if(this.state.hasLocation) {
        this.sortDistanceToMe();
      }
    });
  }

  sortDistanceToMe() {
    //let userLoc = { lat: this.state.userLat, lng: this.state.userLng };

    // calculate the distance to user by converting their lat/lng to miles
    let tempPoints = this.state.points
    if (tempPoints) {
      for(let i = 0; i < tempPoints.length; i++) {
        tempPoints[i].distanceToMe = this.distance(this.state.userLat, this.state.userLng, tempPoints[i].atmLocation.coordinates.latitude, tempPoints[i].atmLocation.coordinates.longitude, 'M');
      }
      this.setState({points:tempPoints});
      this.state.points.sort((a, b) => a.distanceToMe - b.distanceToMe);
    }

    let tempLocations = this.state.Locations
    if (tempLocations) {
      for(let ii = 0; ii < tempLocations.length; ii++){
        tempLocations[ii].distanceToMe = this.distance(this.state.userLat, this.state.userLng, tempLocations[ii].latitude, tempLocations[ii].longitude, 'M');
      }
      this.setState({Locations:tempLocations});
      this.state.Locations.sort((aa, bb) => aa.distanceToMe - bb.distanceToMe);
    }


    // this.setState({
    //   points: this.state.points,
    //   Locations: this.state.Locations,

    // });

  }

  render() {

    //console.log('******* Render has been called... ******');



    return (
      <div className="outer-holder">

      {/*
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Filter select"

        >
          <div className="locations-modal text-center this-will-be-outer-modal-holder ">
            <div className="inner_1">
              <div className="fontSize2 fontMedium pb-2">Would you like to see locations, ATMs, or both?</div>
              <button className="block pl-1 pr-1 pb-2 pt-2 borderradius--small align-center mb-1 fontSize2" onClick={this.modalLocation}>Show me Locations</button>
              <button className="block pl-1 pr-1 pb-2 pt-2 borderradius--small align-center mb-1 fontSize2" onClick={this.modalAtm}>Show me ATMs</button>
              <button className="block pl-1 pr-1 pb-2 pt-2 borderradius--small align-center mb-1 fontSize2" onClick={this.modalBoth}>Show me Both</button>
            </div>
          </div>
        </Modal>

      */}

        <div className="block map-holder " >


                <Map
                  onMarkerClick={this.handleMarkerClick}
                  onLocationClick={this.handleLocationClick}
                  onLocationFilterClick={this.handleLocationFilter}
                  onAtmFilterClick={this.handleAtmsFilter}
                  onModalBack={this.handleModalBack}
                  onFilterToggle={this.handleFilterToggle}
                  onMapClick={!this.state.editingCourse ? this.handleAddLine : this.handleNewPoiLocation}
                  locationLat={this.state.locationLat}
                  locationLng={this.state.locationLng}
                  index={this.state.currentLocation}
                  points={this.state.points}
                  locations={this.state.Locations}
                  mapCenter={this.state.mapCenter}
                  showMarkers={this.state.showMarkers}
                  showLocations={this.state.showLocations}
                  showFilters={this.state.showFilters}
                  showLocationModal={this.state.showLocationModal}
                  showAtmModal={this.state.showAtmModal}
                  modalIndex={this.state.modalIndex}
                  atmIndex={this.state.modalAtmIndex}
                  atmDescription={this.state.atmDescription}
                  atmName={this.state.atmName}
                  userLocation={{lat:this.state.userLat, lng: this.state.userLng}}
                  currentMarker={this.state.currentMarker}
                  near={this.state.near}
                  loading={this.state.loading}
                  inputText={this.state.inputText}
                  handleTextChange={this.handleTextChange}
                  search={this.search}
                  holidays={this.state.holidays}
                >

                </Map>



        </div>




      </div>
    );
  }
}

export default Locations;
