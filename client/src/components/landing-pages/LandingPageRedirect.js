import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import LandingLoader from './LandingLoader';

// apollo



class LandingPageRedirect extends Component {
  constructor(props) {
    super(props);

    this.state = {
      route: 'none',
      landingType: this.props.landingType,
      location: {"ll":[46.6021,-120.5059]},
      found: false,
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
    if (unit==="K") { dist = dist * 1.609344 }
    if (unit==="N") { dist = dist * 0.8684 }
    return dist
  }


  getLocation() {
    // console.log('%c ', 'background: #000; color: #bada55');
    // console.log('%c Lets get the location...', 'background: #000; color: #bada55');
    if(navigator.geolocation) {
      // console.log('%c Navigator??', 'background: #000; color: #bada55');
      // console.log(navigator);

      let options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      };
      let g = navigator.geolocation.getCurrentPosition((position) => {
        console.log('%c position', 'background: #000; color: #bada55');
        console.log(position);

        this.setState({
          location: {"ll" : [position.coords.latitude, position.coords.longitude]},
          found: true
        });
        this.calcDistances(position.coords.latitude, position.coords.longitude);


      }, (err) => {
        console.log('we aint got no location...');
        this.setState({

            found: true
          });
        this.calcDistances(0, 0);


      }, options);
    } else {
      // location not supported by browser or somethin
      // console.log('%c nope, no geolocation get current position', 'background: #000; color: #bada55');
      console.log('we aint got no location...');
      this.setState({

          found: true
        });
      this.calcDistances(0, 0);


    }
  }


  componentDidUpdate(prevProps, prevState){
    if (this.state.location !== prevState.location || this.state.found !== prevState.found) {
      this.getLocation();
    }
  }


  componentDidMount(){
    //const sampleip = {"range":[1136197632,1136198655],"country":"US","region":"NA","eu":"0","timezone":"America/Los_Angeles","city":"Spokane","ll":[47.697,-117.198],"metro":881,"area":20};
    this.getLocation();

    const sampleip = this.state.location;
    // console.log(sampleip);

  }

  calcDistances(findLat, findLng){
    //vancouver
    const vanLatLng = {"Latitude": 45.6387281, "Longitude": -122.6614861};
    let distanceVan = this.distance(findLat, findLng, vanLatLng.Latitude, vanLatLng.Longitude, 'M');
    console.log(distanceVan);


    //tri cities
    const triLatLng = {"Latitude": 46.2226348, "Longitude": -119.1830691};
    let distanceTri = this.distance(findLat, findLng, triLatLng.Latitude, triLatLng.Longitude, 'M');
    console.log(distanceTri);


    //bellingham
    const bellLatLng = {"Latitude" : 48.769768, "Longitude" : -122.485886};
    let distanceBell = this.distance(findLat, findLng, bellLatLng.Latitude, bellLatLng.Longitude, 'M');
    console.log(distanceBell);


    //olympia
    const olympiaLatLng = {"Latitude" : 47.0379, "Longitude" : -122.9007};
    let distanceOlympia = this.distance(findLat, findLng, olympiaLatLng.Latitude, olympiaLatLng.Longitude, 'M');
    console.log(distanceOlympia);


    //Yakima
    const yakimaLatLng = {"Latitude" : 46.6021, "Longitude" : -120.5059};
    let distanceYakima = this.distance(findLat, findLng, yakimaLatLng.Latitude, yakimaLatLng.Longitude, 'M');
    console.log(distanceYakima);


    //sample for spokane
    // const spokaneLatLng = {"Latitude" : 47.6588, "Longitude" : -117.4260};
    // let distanceSpokane = this.distance(findLat, findLng, spokaneLatLng.Latitude, spokaneLatLng.Longitude, 'M');
    // console.log(distanceSpokane);

    if (distanceVan < 30){
      this.setState({
        route: 'vancouver'
      });
    }
    else if (distanceTri < 30){
      this.setState({
        route: 'tri-cities'
      });
    }
    else if (distanceBell < 30){
      this.setState({
        route: 'bellingham'
      });
    }
    else if (distanceOlympia < 30){
      this.setState({
        route: 'olympia'
      });
    }
    else if (distanceYakima < 30){
      this.setState({
        route: 'yakima'
      });
    }
    // else if (distanceSpokane < 30){
    //   this.setState({
    //     route: '-spokane'
    //   });
    // }
    else{
      this.setState({
        route: 'pnw'
      });
    }
  }




  render() {

    return (
      <div>
        {(this.state.route !== 'none' && this.state.found) ? <Redirect to={'/lp/'+ this.state.route + '/' + this.state.landingType} /> : <LandingLoader />}
      </div>
    );
  }
}


export default LandingPageRedirect;
