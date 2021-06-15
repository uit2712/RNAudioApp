/**
 * @format
 */

import App from './App';
import {AppRegistry} from 'react-native';
import MusicControl from 'react-native-music-control';
import {name as appName} from './app.json';
MusicControl.enableControl('play', true);
MusicControl.enableControl('pause', true);
MusicControl.enableControl('stop', true);
MusicControl.enableControl('nextTrack', true);
MusicControl.enableControl('previousTrack', false);
MusicControl.enableControl('seek', true) // Android only

AppRegistry.registerComponent(appName, () => App);
