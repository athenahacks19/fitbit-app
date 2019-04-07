/*
  Modules
*/
import { HeartRateSensor } from 'heart-rate';
import { geolocation } from 'geolocation';
const SECOND = 1000;

/*
  Setup
*/
const hrm = new HeartRateSensor();
hrm.start();

/*
  Main
*/
function getHeartRate() {
  console.log('heart rate:', hrm.heartRate);
}

function getLocation() {
  geolocation.getCurrentPosition(function (position) {
    console.log('position:', position.coords.latitude, position.coords.longitude)
  });
}

// Get heart rate every second.
getHeartRate();
setInterval(getHeartRate, 1 * SECOND);

// Get location every 15 seconds.
getLocation();
setInterval(getLocation, 15 * SECOND);
