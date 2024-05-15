/**
 * @format
 */

import {AppRegistry} from 'react-native';

import {name as appName} from './app.json';
import App from '@/App';
import TrackPlayer from 'react-native-track-player';
import { events } from '@/services/trackPlayerServices';

AppRegistry.registerComponent(appName, () => App);
TrackPlayer.registerPlaybackService(() => require('@/services/trackPlayerServices'));
