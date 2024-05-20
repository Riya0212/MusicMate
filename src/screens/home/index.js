import {Component} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
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
import {NAVIGATION} from '@/constants/navigation';
import TrackPlayer, {RepeatMode} from 'react-native-track-player';
import {addTrack, setupPlayer} from '@/services/musicController';
import {tr} from 'date-fns/locale';

class HomeClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trackData: [],
      isPlayerReady: false,
      isLoading: true,
    };
  }

  componentDidMount() {
    this.addHeader();
    this.handleSetup();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.styles.blackColor != this.props.styles.blackColor) {
      this.addHeader();
    }
    if (prevState.isPlayerReady != this.state.isPlayerReady) {
      this.loadPlaylist();
    }
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
                iconType={iconTypes.FontAwesome}
                name={'home'}
                size={25}
                color={this.props.styles.blackColor}
              />
            }
            headerMiddleChildren={
              <TextComponent
                text={'Home'}
                textStyle={this.props.styles.headerMiddleText}
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
      await addTrack();
    }

    console.log(isSetup, 'setupp');
    this.setState({isPlayerReady: isSetup, isLoading: false});
  }

  async loadPlaylist() {
    const queue = await TrackPlayer.getQueue();

    if (queue.length != 0) {
      this.setState({trackData: queue});
    }
    console.log(queue, 'queu', queue.length);
  }

  renderMusicData(item, index) {
    return (
      <TouchableOpacity
        style={this.props.styles.mainView}
        onPress={async() =>
         await TrackPlayer.skip(parseInt(item.id)).then(() => {
            this.props.navigation.navigate(NAVIGATION.audioPlayer, {
              currentTrack: item,
            })
          })
          
        }>
        <View style={this.props.styles.trackView}>
          <Image
            source={{
              uri: item.images[1].url,
            }}
            style={{
              width: Metrics.HEIGHT * 0.06,
              height: Metrics.HEIGHT * 0.06,
              alignSelf: 'center',
            }}
          />
        </View>
        <View
          style={{
            flexDirection: 'column',
            marginHorizontal: 10,
            justifyContent: 'center',
          }}>
          <TextComponent
            text={item.name}
            textStyle={{
              color: this.props.styles.blackColor,
              fontSize: Fonts.size.normal,
              fontFamily: Fonts.type.satoshiBold,
            }}
          />
          <TextComponent
            text={item.artists[0].name}
            textStyle={{
              color: 'grey',
              fontSize: Fonts.size.small,
              marginVertical: 3,
            }}
          />
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    const {trackData, isLoading} = this.state;
    return (
      <View style={this.props.styles.viewContainer}>
        <Statusbar />

        {isLoading == true ? (
          <View style={{
            flex:1,
            justifyContent:'center'
          }}>  
            <ActivityIndicator size={'large'} color={'red'} />
          </View>
        ) :
        <FlatList
          data={trackData}
          key={'Tracks'}
          contentContainerStyle={{
            marginHorizontal: Metrics.WIDTH * 0.04,
            marginTop: Metrics.WIDTH * 0.04,
            flex: 1,
          }}
          ItemSeparatorComponent={() => (
            <View
              style={{
                padding: Metrics.WIDTH * 0.02,
              }}
            />
          )}
          renderItem={({item, index}) => {
            return this.renderMusicData(item);
          }}
        />
  }
      </View>
    );
  }
}

const Home = props => {
  const style = Colors.useThemedStyles(styles);
  return <HomeClass {...props} styles={style} />;
};
export default Home;
