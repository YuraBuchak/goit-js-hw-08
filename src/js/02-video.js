import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const STORAGE_KEY_TIME = 'videoplayer-current-time';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

player.on(
  'timeupdate',
  throttle(function (event) {
    localStorage.setItem(STORAGE_KEY_TIME, event.seconds);
    console.log(localStorage.getItem(STORAGE_KEY_TIME));
  }, 1000)
);

player.setCurrentTime(localStorage.getItem(STORAGE_KEY_TIME));
