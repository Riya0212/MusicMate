import {Component} from 'react';
import {View, Text, Image, Button, TouchableOpacity} from 'react-native';
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
  isPlaying,
  useActiveTrack,
  useProgress,
} from 'react-native-track-player';
import Slider from '@react-native-community/slider';
import {
  addTracks,
  millisecondsToHHMMSS,
  setupPlayer,
} from '@/services/trackPlayerServices';

class AudioPlayerClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPlayerReady: false,
      progress: props.progress,
      activeTrack: props.track,
      currentTrack: props.track,
      isPlaying: false,
    };
  }

  componentDidMount() {
    this.addHeader();
    this.handleSetup();
    console.log('in mount');

    console.log(this.state.currentTrack, this.props.route.params.currentTrack,'curret');
    
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.progress != this.props.progress) {
      this.setState({progress: this.props.progress});
    }
  }
  componentWillUnmount() {
    console.log('unmounttt');
    TrackPlayer.remove();

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
    console.log('in setup');

    let isSetup = await setupPlayer();

    const queue = await TrackPlayer.getQueue();
    console.log(queue, 'quew', isSetup);
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

  handleOnPlay() {
    this.setState({isPlaying: true}, () => TrackPlayer.play());
  }

  handleOnPause() {
    this.setState({isPlaying: false}, () => TrackPlayer.pause());
  }

  handleOnSliderChange(pos) {
    TrackPlayer.seekTo(pos);
    TrackPlayer.play().then(() => {
      this.setState({isPlaying: true});
    });
  }
  render() {
    const {progress, activeTrack, currentTrack, isPlaying} = this.state;

    return (
      <View style={this.props.styles.viewContainer}>
        <Statusbar />
        {/* <View
          style={{
            margin: Metrics.WIDTH * 0.04,
            justifyContent: 'center',
            flex: 1,
          }}>
          <View
            style={{
              width: Metrics.WIDTH * 0.8,
              height: Metrics.HEIGHT * 0.4,
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
          <TextComponent
            text={activeTrack?.name}
            textStyle={{
              fontSize: Fonts.size.medium,
              textAlign: 'center',
              marginTop: 10,
            }}
          />
          <TextComponent
            text={activeTrack?.artists[0].name}
            textStyle={{
              color: 'grey',
              textAlign: 'center',
              fontSize: Fonts.size.normal,
            }}
          />

          <View
            style={{
              marginTop: Metrics.HEIGHT * 0.05,
            }}>
            <Slider
              style={{
                height: 20,
                alignItems: 'center',
              }}
              minimumValue={0}
              maximumValue={300}
              minimumTrackTintColor="white"
              maximumTrackTintColor="grey"
              thumbTintColor="white"
              value={progress.position}
              onValueChange={(val) => {
                TrackPlayer.pause()
                this.setState({isPlaying: false})
              }}
              onSlidingComplete={() => this.handleOnSliderChange()}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginHorizontal: 10,
              }}>
              <TextComponent
                text={millisecondsToHHMMSS(Math.floor(progress.position || 0))}
              />
              <TextComponent
                text={millisecondsToHHMMSS(
                  Math.floor(currentTrack.duration_ms / 100),
                )}
              />
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
              margin: Metrics.baseMargin,
              marginTop: Metrics.doubleBaseMargin,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '33%',
              }}>
              <Icon
                iconType={iconTypes.Ionicons}
                name={'heart-outline'}
                size={25}
                color={this.props.styles.blackColor}
              />
              <Icon
                iconType={iconTypes.FontAwesome6}
                name={'backward-step'}
                size={25}
                color={this.props.styles.blackColor}
                onPress={() => TrackPlayer.skipToPrevious()}
                viewStyle={{
                  width: '25%',
                }}
              />
            </View>
            <View
              style={{
                width: '34%',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                style={this.props.styles.playBtn}
                onPress={() => {
                  isPlaying == true
                    ? this.handleOnPause()
                    : this.handleOnPlay();
                }}>
                <Icon
                  iconType={iconTypes.FontAwesome}
                  name={isPlaying == true ? 'pause' : 'play'}
                  size={20}
                  color={Colors.light.colors.black}
                  isDisabled={true}
                  viewStyle={{
                    justifyContent: 'center',
                  }}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '33%',
              }}>
              <Icon
                iconType={iconTypes.FontAwesome6}
                name={'forward-step'}
                size={25}
                color={this.props.styles.blackColor}
                onPress={() => TrackPlayer.skipToNext()}
              />
              <Icon
                iconType={iconTypes.Feather}
                name={'minus-circle'}
                size={25}
                color={this.props.styles.blackColor}
                onPress={() => TrackPlayer.stop()}
              />
            </View>
          </View>
        </View> */}
      </View>
    );
  }
}

const AudioPlayer = props => {
  const style = Colors.useThemedStyles(styles);
  const progress = useProgress();
  const track = useActiveTrack();
  return (
    <AudioPlayerClass
      {...props}
      styles={style}
      track={track}
      progress={progress}
    />
  );
};
export default AudioPlayer;
