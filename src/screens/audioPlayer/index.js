import {Component} from 'react';
import {View, Text, Image, Button} from 'react-native';
import {Colors, Fonts, Images, Metrics} from '@/themes';
import styles from './styles';
import {
  HeaderComponent,
  Icon,
  Statusbar,
  TextComponent,
  iconTypes,
} from '@/components';
import TrackPlayer, {
  useActiveTrack,
  useProgress,
} from 'react-native-track-player';
import Slider from '@react-native-community/slider';
import {
  addTracks,
  secondsToHHMMSS,
  setupPlayer,
} from '@/services/trackPlayerServices';

class AudioPlayerClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPlayerReady: false,
      progress: 0,
      activeTrack: null,
      currentTrack: props.route.params.currentTrack,
    };
  }

  componentDidMount() {
    this.addHeader();
    this.handleSetup();
    this.trackProgressListener = TrackPlayer.addEventListener(
      'track-progress',
      this.onTrackProgress,
    );

    this.statusChangeListener = TrackPlayer.addEventListener(
      'remote-playback-status-changed',
      this.onPlaybackStatusChanged,
    );
  }

  componentDidUpdate(prevProps, prevState) {}
  componentWillUnmount() {
    TrackPlayer.removeEventListener(
      'track-progress',
      this.trackProgressListener,
    );
    TrackPlayer.removeEventListener(
      'remote-playback-status-changed',
      this.statusChangeListener,
    );
  }

  addHeader() {
    return this.props.navigation.setOptions({
      header: () => {
        return (
          <HeaderComponent
            headerStyle={this.props.styles.headerStyle}
            containerStyle={this.props.styles.headerContainerStyle}
            headerLeftChildren={
              <Icon
                iconType={iconTypes.AntDesign}
                name={'left'}
                size={25}
                color={'white'}
              />
            }
            headerMiddleViewStyle={{
              width: Metrics.WIDTH * 0.8,
            }}
            headerMiddleChildren={
              <TextComponent
                text={'Playing Song'}
                textStyle={{
                  color: 'white',
                  fontSize: Fonts.size.normal,
                  marginHorizontal: 10,
                  textAlign: 'center',
                }}
              />
            }
            headerRightChildren={
              <Icon
                iconType={iconTypes.MaterialCommunityIcons}
                name={'dots-vertical'}
                size={20}
                color={'white'}
              />
            }
          />
        );
      },
    });
  }

  async handleSetup() {
    let isSetup = await setupPlayer();

    const queue = await TrackPlayer.getQueue();
    if (isSetup && queue.length <= 0) {
      //   await addTracks();
      await TrackPlayer.add([this.state.currentTrack]);
      await TrackPlayer.setRepeatMode(RepeatMode.Queue);
    }

    console.log(isSetup, 'setupp');
    this.setState({isPlayerReady: isSetup});
  }

  onTrackProgress(event) {
    const {position, duration} = event;
    console.log(position, 'progresss');
    this.setState({progress: position, duration});
  }

  onPlaybackStatusChanged = event => {
    console.log(event, 'trackk');
    this.setState({activeTrack: event.activeTrack});
  };

  render() {
    const {progress, activeTrack, currentTrack} = this.state;
    return (
      <View style={this.props.styles.viewContainer}>
        <Statusbar />
        <View
          style={{
            margin: Metrics.WIDTH * 0.04,
            // backgroundColor: 'red',
            flex: 1,
          }}>
          <View
            style={{
              width: Metrics.WIDTH * 0.9,
              height: Metrics.HEIGHT * 0.5,
              borderWidth: 1,
              justifyContent: 'center',
              alignSelf: 'center',
              borderRadius: 10,
              borderColor: 'red',
            }}>
            <Image
              source={Images.track}
              style={{
                width: Metrics.HEIGHT * 0.3,
                height: Metrics.HEIGHT * 0.3,
                alignSelf: 'center',
              }}
            />
          </View>
          {console.log(
            secondsToHHMMSS(Math.floor(progress.position)),
            'durr',
            secondsToHHMMSS(Math.floor(currentTrack.duration_ms)),
          )}
          <Text style={{color: 'red'}}>
            {secondsToHHMMSS(Math.floor(progress.position || 0))}
          </Text>
          <Slider
            style={{width: '70%', height: 40}}
            minimumValue={0}
            maximumValue={300}
            minimumTrackTintColor="#52527a"
            maximumTrackTintColor="#52527a"
            thumbTintColor="#52527a"
            value={progress.position}
          />
          <Text style={{color: 'red'}}>{currentTrack?.duration_ms}</Text>
          <Button
            title="Play"
            color="#777"
            onPress={() => TrackPlayer.play()}
            style={{margin: 15}}
          />
          <Button
            title="pause"
            color="#777"
            onPress={() => TrackPlayer.pause()}
            style={{margin: 15}}
          />
          {/* <Button title="skip" color="#777" onPress={() => TrackPlayer.skip()} style={{padding:15}}/> */}
          <Button
            title="next"
            color="#777"
            onPress={() => TrackPlayer.skipToNext()}
            style={{margin: 15}}
          />
          <Button
            title="previous"
            color="#777"
            onPress={() => TrackPlayer.skipToPrevious()}
            style={{margin: 15}}
          />
        </View>
      </View>
    );
  }
}

const AudioPlayer = props => {
  const style = Colors.useThemedStyles(styles);
  return <AudioPlayerClass {...props} styles={style} />;
};
export default AudioPlayer;
