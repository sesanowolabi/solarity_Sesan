import axios from 'axios';

const MONEYPASS_API_BASE = 'https://locatorapi.moneypass.com/Service.svc';
const MONEYPASS_API_KEY = '2iqr8FkSmQhLCPo';
const GOOGLE_MAPS_API_BASE = 'https://maps.googleapis.com/maps/api';
const GOOGLE_MAPS_API_KEY = 'AIzaSyBQweEENd7w5FugcTrhbvIy2AesBgD7e2o';

export function getCoordsFromAddress(loc, callback) {
  let url = GOOGLE_MAPS_API_BASE + '/geocode/json?address=' + loc + '&sensor=false&key='+GOOGLE_MAPS_API_KEY;
  //const HEADERS = { headers: { 'Access-Control-Allow-Headers': '*', 'Access-Control-Allow-Origin': '*' }}

  axios.get(url)
    .then((response) => {
      //console.log(response);
      callback(null, response.data.results[0].geometry.location)
    }).catch((e) => callback(e))
}
//"You have exceeded your daily request quota for this API. We recommend registering for a key at the Google Developers Console: https://console.developers.google.com/apis/credentials?project=_"
export function getATMs(lat, lng, radius, count, callback) {
  // //console.log('%c woot woot in the api atms func.', 'background: #000; color: #bada55');
  let url = MONEYPASS_API_BASE + '/locations/atm?format=json&';
  url += 'spatialFilter=nearby(' + lat + ',' + lng + ',' + radius + ')';
  url += '&count=' + count;
  url += '&key=' + MONEYPASS_API_KEY;
  // const HEADERS = { headers: {
  //   'Access-Control-Allow-Headers': '*',
  //   'Access-Control-Request-Method': 'GET',
  //   'Access-Control-Allow-Origin': '*',
  //   'Access-Control-Allow-Credentials': 'include',
  //   'Content-Type': 'text/plain'
  // }}
  axios.get(url).then(response => callback(null, response.data.results))
    .catch(e => callback(e))
}
