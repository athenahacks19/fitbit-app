/*
  Modules
*/
import { peerSocket } from 'messaging';
import { HeartRateSensor } from 'heart-rate';
import { geolocation } from 'geolocation';
import { Accelerometer } from 'accelerometer';
const SECOND = 1000;

/*
  Setup
*/
const hrm = new HeartRateSensor();
hrm.start();
const heartAlert = 100;

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
  if (heartRate >= heartAlert) {
    send('alert');
  }
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

/*
  Accelerometer
*/
let previousReading = {};
let shake = 0;
const shakeLimit = 250;
const bound = 4;
if (Accelerometer) {
  const accelerometer = new Accelerometer({ frequency: 250 });
  accelerometer.addEventListener("reading", () => {
    let shakeX, shakeY, shakeZ;
    if (previousReading.x !== null) {
      shakeX = Math.abs(previousReading.x - accelerometer.x) > bound;
      shakeY = Math.abs(previousReading.y - accelerometer.y) > bound;
      shakeZ = Math.abs(previousReading.z - accelerometer.z) > bound;
      if (shakeX || shakeY || shakeZ) {
        shake += 1;
      }
    }
    previousReading = {
      x: accelerometer.x,
      y: accelerometer.y,
      z: accelerometer.z
    };
    if (shake === shakeLimit) {
      shake = 0;
      send('alert');
    }
  });
  accelerometer.start();
}
