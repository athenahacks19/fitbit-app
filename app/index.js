/*
  Modules
*/
import { HeartRateSensor } from 'heart-rate';
const SECOND = 1000;

/*
  Setup
*/
const hrm = new HeartRateSensor();
hrm.start();

/*
  Main
*/
function main() {
  console.log('heart rate:', hrm.heartRate);
}

// Initialize the app. Will run the main function every second.
main();
setInterval(main, 1 * SECOND);
