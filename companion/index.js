/*
  Modules
*/
import { me } from 'companion';
import { peerSocket } from 'messaging';
import { settingsStorage } from 'settings';
import { config } from '../config';

// Wake up Companion every 5 minute.
me.wakeInterval = 300000;

// Get user ID.
const storage = JSON.parse(settingsStorage.getItem('id'));
let userId = storage ? storage.name : '';

/*
  Settings
*/
settingsStorage.onchange = event => {
  if (event.key === 'id') {
    userId = JSON.parse(event.newValue).name;
  }
}

/*
  Messaging
*/
peerSocket.onmessage = event => {
  if (!userId) return;
  const [ command, data ] = event.data;
  let url;
  if (command === 'hr') {
    url = `${config.server}/bpm?userId=${userId}&bpm=${data}`;
    console.log(`Sending heart rate: ${data}`);
  }
  if (command === 'loc') {
    url = `${config.server}/location?userId=${userId}&lat=${data.lat}&lon=${data.lon}`;
    console.log(`Sending location: ${data.lat} ${data.lon}`);
  }
  fetch(url, {
    method: 'POST',
    mode: 'cors',
    credentials: 'omit'
  })
  .catch(err => console.error(err));
}
