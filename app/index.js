/*
  Modules
*/
import { peerSocket } from 'messaging';
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
function send(command, data) {
  if (peerSocket.readyState === peerSocket.OPEN) {
    peerSocket.send([command, data]);
  }
}

function getHeartRate() {
  const heartRate = hrm.heartRate ? hrm.heartRate : 0;
  send('hr', heartRate);
}

function getLocation() {
  geolocation.getCurrentPosition(function (position) {
    const { latitude, longitude } = position.coords;
    send('loc', { lat: latitude, lon: longitude });
  });
}

// Get heart rate every second.
getHeartRate();
setInterval(getHeartRate, 1 * SECOND);

// Get location every 15 seconds.
getLocation();
setInterval(getLocation, 15 * SECOND);
