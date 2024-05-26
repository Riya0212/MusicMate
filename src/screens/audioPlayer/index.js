import {Component, useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  Button,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
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
  Event,
  isPlaying,
  useActiveTrack,
  useProgress,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import Slider from '@react-native-community/slider';
import {
  addTracks,
  millisecondsToHHMMSS,
  setupPlayer,
} from '@/services/trackPlayerServices';
import {getActiveTrack} from 'react-native-track-player/lib/src/trackPlayer';

class AudioPlayerClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPlayerReady: false,
      progress: props.progress,
      activeTrack: props.track,
      currentPosition: 0,
      isPlaying: false,
      isLoading: true,
      trackDuration: 0,
    };
  }

  componentDidMount() {
    this.addHeader();
    this.handlePlaybackTrackChanged();

    // this.progressListener = TrackPlayer.addProgressListener(this.updateTrackProgress);
  }

  async handleTrack() {
    const track = await getActiveTrack();
    console.log('active', track);
  }

  // updateTrackProgress(data) {
  //   this.setState({ currentPosition: data.position });
  // }

  async handlePlaybackTrackChanged(event) {
    let index = await TrackPlayer.getActiveTrack();
    const duration = await TrackPlayer.getProgress();

    if (index != -1) {
      this.setState({activeTrack: index, isLoading: false}, () =>
        this.handleOnPlay(),
      );
    }
    console.log(index, 'innn');
    //  await TrackPlayer.play()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.progress != this.props.progress) {
      this.setState({progress: this.props.progress});
    }
  }
  componentWillUnmount() {
    console.log('unmounttt');
    // TrackPlayer.remove();
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
                onPress={() => this.props.navigation.goBack()}
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

  async handleOnSliderChange(pos) {
    console.log('in slider',pos);
    await TrackPlayer.seekTo(pos);
    // TrackPlayer.seekTo(parseInt(pos));
    // TrackPlayer.play().then(() => {
    //   this.setState({isPlaying: true});
    // });
  }
  render() {
    const {progress, activeTrack, currentTrack, isPlaying, isLoading} =
      this.state;

    console.log(
      activeTrack,
      'activveee',
      millisecondsToHHMMSS(activeTrack?.duration_ms / 1000),
    );
    return (
      <View style={this.props.styles.viewContainer}>
        <Statusbar />
        {isLoading == false ? (
          <View
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
              text={
                activeTrack?.artists != undefined
                  ? activeTrack.artists[0]?.name
                  : ''
              }
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
                minimumTrackTintColor="black"
                maximumTrackTintColor="grey"
                thumbTintColor="black"
                value={progress.position}
                onValueChange={async val => {
                  // await TrackPlayer.seekTo(val)
                  // TrackPlayer.pause();
                  // this.setState({isPlaying: false});

                }}
                onSlidingComplete={(val) => this.handleOnSliderChange(val)}
              />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginHorizontal: 10,
                }}>
                <TextComponent
                  text={millisecondsToHHMMSS(
                    Math.floor(progress.position || 0),
                  )}
                />
                <TextComponent
                  text={millisecondsToHHMMSS(
                    Math.floor(progress?.duration || 0)
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
          </View>
        ) : (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
            }}>
            <ActivityIndicator size={'large'} color={'red'} />
          </View>
        )}
      </View>
    );
  }
}

const AudioPlayer =  (props) => {
  const [currentTrack, setCurrentTrack] = useState(0);
  const style = Colors.useThemedStyles(styles);
  const progress = useProgress();
  useEffect(() => {
  getActiveTrack()
  })
  const getActiveTrack  = async() => {
  setCurrentTrack(await TrackPlayer.getActiveTrackIndex())
  }
  // const track=  await getActiveTrack();

  // useTrackPlayerEvents([Event.PlaybackActiveTrackChanged], async (event) => {
  //   if(event.state == State.nextTrack) {
  //     let index = await TrackPlayer.getCurrentTrack();
  //     console.log(index,'index');
  //     setCurrentTrack(index);
  //   }
  // });
  console.log(currentTrack, 'tackrr');
  return (
    <AudioPlayerClass
      {...props}
      styles={style}
      track={currentTrack}
      progress={progress}
    />
  );
};
export default AudioPlayer;
