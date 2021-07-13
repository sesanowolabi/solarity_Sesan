import React from 'react';
import PropTypes from 'prop-types';
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker, Polyline } from "react-google-maps";
import MapStyles from "./MapStyles.json";
import Loader from './Loader.js';



const Map = compose(
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

<div>
  <div className={"location-filter-container " + ((props.showLocationModal) ? 'hide' : 'show') }>
    <div className="filter-top">
      <div className="filter-icons">
        <span className="filters" onClick={() => props.onFilterToggle()}>{(props.showFilters) ? 'Hide' : 'Show'} <span className="filters-link ">Filters & Search</span></span>
      </div>
      <div className={(props.showFilters ? 'show-filterss' : 'hide-filterss')}>
        <div className="flex block check-wrapper mt-4 ">

    

          <div className="checkbox mb-1" onClick={() => props.onLocationFilterClick()}>
            <input className="checkbox--input" id="input1" aria-label="show locations" type="checkbox" name="locations-check" checked={(props.showLocations ? true : false)} onChange={()=> console.log('logging change')} />
            <div className="checkbox--icon"></div>
            <div className="checkbox-label">Locations</div>
          </div>

          <div className="checkbox mb-1" onClick={() => props.onAtmFilterClick()}>
            <input className="checkbox--input" id="input2" type="checkbox" aria-label="show atms" name="atms-check" checked={(props.showMarkers ? true : false)} onChange={()=> console.log('logging change')} />
            <div className="checkbox--icon"></div>
            <div className="checkbox-label">ATMs</div>
          </div>

        </div>
        

        <div className="map-page-holder mt-6">
          <label>Enter your city or zip code</label>
          <input className="mb-1" placeholder={'Enter zip code or city'} value={props.inputText} aria-label="search by city or zip code" onChange={props.handleTextChange} />
          <button className="button button-primary mt-2" onClick={props.search}>Search</button>
        </div>
      </div>
    </div>

    <div className="filter-bottom">
      <h1>{(props.showLocations && props.showMarkers) ? 'Locations' : (props.showLocations) ? 'Locations' : (props.showMarkers) ? 'ATMs' : ''} near {props.near}</h1>
      {
        (props.locations && props.showLocations) ?
        (props.locations.map((p, i) => {
          //let place = p.title.replace(/ /g, "%20");
          //let placeAddress = p.atmLocation.address.street.replace(/ /g, "%20") + "%20" + p.atmLocation.address.city.replace(/ /g, "%20") + "%20" + p.atmLocation.address.state ;

          return(
            <div key={"atm-filter" + i} className="atm-filter-item pt-1 pb-1 clearfix" onClick={() => props.onLocationClick(i)}>
              <h3 className="fontMedium fontSize2 mt-0 mb-0">{p.title}</h3>
              <div className="item-address pull-left">
                <p className="colorGrey4 mb-0 mt-0">{p.address[0].streetAddress},</p>
                <p className="colorGrey4 mb-0 mt-0">{p.address[0].city}, {p.address[0].state}</p>
              </div>
              <div className="item-directions pull-right">
                <a className="text-right block pb-1 directions-link" target="_blank" href={"https://www.google.com/maps/search/?api=1&query=Solarity%20Credit%20Union%20" + p.address[0].streetAddress + ' ' + p.address[0].city + ' ' +p.address[0].state + "&travelmode=driving"}>Get Directions</a>
                <p className="text-right block mb-0 mt-0">{p.hoursOfOperation[0].lobbyHours}</p>
              </div>
            </div>
            );
          }
        ))
        : ""
      }

      {
        (props.showLocations && props.showMarkers) ?
          <h1>ATMs</h1>
        : ""
      }

      {
        (props.points && props.showMarkers) ?
        (props.points.map((p, i) => {
          let place = p.atmLocation.name.replace(/ /g, "%20");
          let placeAddress = p.atmLocation.address.street.replace(/ /g, "%20") + "%20" + p.atmLocation.address.city.replace(/ /g, "%20") + "%20" + p.atmLocation.address.state ;

          return(
          <div key={"atm-filter" + i} className="atm-filter-item pt-1 pb-1 clearfix" onClick={() => props.onMarkerClick(i)}>
            <h3 className="fontMedium fontSize2 mt-0 mb-0">{p.atmLocation.name}</h3>
            <div className="item-address pull-left">
              <p className="colorGrey4 mb-0 mt-0">{p.atmLocation.address.street},</p>
              <p className="colorGrey4 mb-0 mt-0">{p.atmLocation.address.city} {p.atmLocation.address.state}</p>
            </div>
            <div className="item-directions pull-right">
              <a className="text-right block pb-1 directions-link" target="_blank" href={"https://www.google.com/maps/search/?api=1&query=" + place + "%20" + placeAddress + "&travelmode=driving"}>Get Directions</a>
              {/*<a target="_blank" href={"http://maps.apple.com/?daddr=" + place + "%20" + placeAddress}>Directions, Apple Maps</a>*/}
            </div>
          </div>
          );
        }
      ))
      : ""
      }
    </div>
  </div>
  <GoogleMap
      defaultZoom={14}
      defaultCenter={{ lat: 46.602119, lng: -120.516974 }}
      center={{lat: props.mapCenter.lat, lng: props.mapCenter.lng }}
      defaultOptions={{ styles: MapStyles, fullscreenControl: false, scrollWheel: false, disableDefaultUI: false }}
      onClick={props.onMapClick}
      computeDistanceBetween={props.coordinates}
    >
    {(props.loading && !props.showLocations) ?
      <Loader />
      :
      ""
    }






      {(props.loading !== true && props.locations[props.modalIndex]) ?


        <div className={(props.showLocationModal) ? 'location-filter-modal show pt-2' : 'location-filter-modal hide'}>
          <span className="go-back pt-2 " onClick={() => props.onModalBack()}>x</span>
          <div className="location-filter-modal_content pt-1 pb-1 ">
            <div><h2>{props.locations[props.modalIndex].address[0].streetAddress}, {props.locations[props.modalIndex].address[0].city}, {props.locations[props.modalIndex].address[0].state}</h2></div>
            <div className="block pl-0 pr-0">
              <span className="grid1of2 text-left"><a href={'tel:'+props.locations[props.modalIndex].phoneNumber}><span className="link">{props.locations[props.modalIndex].phoneNumber}</span></a></span>
              <span className="grid1of2 text-right"><a target="_blank" href={"https://www.google.com/maps/search/?api=1&query=Solarity%20Credit%20Union%20" + props.locations[props.modalIndex].address[0].streetAddress.replace(/ /g, "%20") + ' ' + props.locations[props.modalIndex].address[0].city.replace(/ /g, "%20") + ' ' +props.locations[props.modalIndex].address[0].state.replace(/ /g, "%20") + "&travelmode=driving"}><span className="link ml-2 ">Get Directions</span></a></span>
            </div>
            <div className="block pl-0 pr-0">
              <div className="grid1of2 pl-0 pr-2">
                <h4 className="location-info-heading">Lobby Hours</h4>
                {
                  (props.locations[props.modalIndex].hoursOfOperation) ?

                    (props.locations[props.modalIndex].hoursOfOperation.map((p, i) => {
                      return(
                        <div className="pl-0 pr-0 pb-1 clearfix" key={"hours"+i}>
                          <div className="grid1of2 text-left pl-0 pr-0" >{p.day}</div>
                          <div className="grid1of2 text-right pl-0 pr-0" >{p.lobbyHours}</div>
                        </div>
                      );
                    }))
                  : ""
                }
              </div>
              <div className="grid1of2 pl-0 pr-2">
                <h4 className="location-info-heading">Features</h4>
                <ul className="checklist feature-checklist">
                {
                  (props.locations[props.modalIndex].features) ?
                    (props.locations[props.modalIndex].features.map((p,i) => {
                      return(
                        <li key={"features"+i}>
                          <div className="checklist--item_content">{p.description}</div>
                          <div className="checklist--item_icon"></div>
                        </li>
                      );
                    }))
                  : ""
                }
                </ul>
              </div>
            </div>
            <div className="block pl-0 pr-0">
              <div className="grid1of2 pl-0 pr-2">
                <h4 className="location-info-heading">Drive-up Hours</h4>
                {
                  (props.locations[props.modalIndex].hoursOfOperation) ?

                    (props.locations[props.modalIndex].hoursOfOperation.map((p, i) => {
                      return(
                        <div className=" pl-0 pr-2 pb-1 clearfix" key={"hours-driveup"+i}>
                          <div className="grid1of2 text-left pl-0 pr-0" >{p.day}</div>
                          <div className="grid1of2 text-right pl-0 pr-0" >{p.driveUpHours}</div>
                        </div>
                      );
                    }))
                  : ""
                }
              </div>
              <div className="grid1of2">
                <h4 className="location-info-heading">Credit Union Holidays</h4>
                <div>

                  {(props.holidays.map((p, i) => {
                      return(
                        <div key={`holidays-${i}`} className="pb-1">
                          <div className="block">{p.description}</div>
                          <div className="colorGrey4">{p.date}</div>
                        </div>
                      );
                    }))}
                </div>
              </div>
            </div>
          </div>
        </div>
        : ""
      }


      {(props.points[0] && !props.loading) ?


        <div className={(props.showAtmModal) ? 'location-filter-modal show pt-2' : 'location-filter-modal hide'}>
          <div className="location-filter-modal_content">
            <span className="link" onClick={() => props.onModalBack()}>&larr; Go Back</span>

            <div>
              <h2>{props.points[props.atmIndex].atmLocation.name}</h2>
              <h2>{props.points[props.atmIndex].atmLocation.address.street}, {props.points[props.atmIndex].atmLocation.address.city}, {props.points[props.atmIndex].atmLocation.address.state}</h2>
            </div>
            <div className="grid pl-0 pr-0">

            </div>
              <p><a target="_blank" className="directionalLink" href={"https://www.google.com/maps/search/?api=1&query=" + props.points[props.atmIndex].atmLocation.name.replace(/ /g, "%20") + "%20" + props.points[props.atmIndex].atmLocation.address.street.replace(/ /g, "%20") + "%20" + props.points[props.atmIndex].atmLocation.address.city.replace(/ /g, "%20") + "%20" + props.points[props.atmIndex].atmLocation.address.state + "&travelmode=driving"}>Get Directions with Google Maps</a></p>
              <p><a target="_blank" className="directionalLink" href={"http://maps.apple.com/?daddr=" + props.points[props.atmIndex].atmLocation.name.replace(/ /g, "%20") + "%20" + props.points[props.atmIndex].atmLocation.address.street.replace(/ /g, "%20") + "%20" + props.points[props.atmIndex].atmLocation.address.city.replace(/ /g, "%20") + "%20" + props.points[props.atmIndex].atmLocation.address.state}>Directions, Apple Maps</a></p>
            <div className="grid pl-0 pr-0">
            </div>
          </div>

        </div>


        : ""

      }






    <Polyline
      path={props.coordinates}
      getPath={props.coordinates}
      geodesic={true}
      onClick={props.onLineClick}
      options={{ strokeColor: '#000', strokeOpacity: 0.9, strokeWeight: 6, icons: [{ icon: '', offset: '0', repeat: '20px' }],}}
    />


    {
      (props.showMarkers && props.points && !props.loading) ?
      (props.points.map((point, index) =>
        <Marker
          position={{ lat: point.atmLocation.coordinates.latitude, lng: point.atmLocation.coordinates.longitude }}
          name={point.atmLocation.name}
          cursor='/img/atm-location.png'
          icon='/img/atm-location.png'
          onClick={() => props.onMarkerClick(index)}
          key={index}
          animation={(props.currentMarker[index] === 1) ? 1 : 0}


        />
      ))
      : ""
    }

    {
      (props.showLocations && props.locations && !props.loading) ?
      (props.locations.map((p, i) =>
        <Marker
          position={{ lat: parseFloat(props.locations[i].latitude), lng: parseFloat(props.locations[i].longitude) }}
          cursor='/img/icon-location.png'
          icon='/img/icon-location.png'
          title="marker"
          name={'marker' + i}
          onClick={() => props.onLocationClick(i)}
          key={'marker'+i}
          animation={2}

        />
      ))
      : ""
    }
  </GoogleMap>
</div>
);

Map.propTypes = {
  points: PropTypes.array
}

Map.defaultProps = {
  points: []
}



export default Map;
