import {Component} from 'react';
import {View, Text, Image, TouchableOpacity, FlatList} from 'react-native';
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

class HomeClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trackData: [
        {
          artists: [
            {
              name: 'Carly Rae Jepsen',
              type: 'artist',
            },
          ],
          id: '0tGPJ0bkWOUmH7MEOR77qc',
          images: [
            {
              url: 'https://i.scdn.co/image/ab67616d0000b2737359994525d219f64872d3b1',
              width: 640,
              height: 640,
            },
            {
              url: 'https://i.scdn.co/image/ab67616d00001e027359994525d219f64872d3b1',
              width: 300,
              height: 300,
            },
            {
              url: 'https://i.scdn.co/image/ab67616d000048517359994525d219f64872d3b1',
              width: 64,
              height: 64,
            },
          ],
          name: 'Tum Se',
          duration_ms: 207959,
          url: require('@/assets/songs/Tum_Se.mp3'),
        },
        {
          artists: [
            {
              name: 'Carly Rae Jepsen',
              type: 'artist',
            },
          ],
          id: '0tGPJ0bkWOUmH7MEOR77qc',
          images: [
            {
              url: 'https://i.scdn.co/image/ab67616d0000b2737359994525d219f64872d3b1',
              width: 640,
              height: 640,
            },
            {
              url: 'https://i.scdn.co/image/ab67616d00001e027359994525d219f64872d3b1',
              width: 300,
              height: 300,
            },
            {
              url: 'https://i.scdn.co/image/ab67616d000048517359994525d219f64872d3b1',
              width: 64,
              height: 64,
            },
          ],
          name: 'Maiyya Mainu',
          duration_ms: 20795,
          url: require('@/assets/songs/Maiyya_Mainu.mp3'),
        },
        {
          artists: [
            {
              name: 'Carly Rae Jepsen',
              type: 'artist',
            },
          ],
          id: '0tGPJ0bkWOUmH7MEOR77qc',
          images: [
            {
              url: 'https://i.scdn.co/image/ab67616d0000b2737359994525d219f64872d3b1',
              width: 640,
              height: 640,
            },
            {
              url: 'https://i.scdn.co/image/ab67616d00001e027359994525d219f64872d3b1',
              width: 300,
              height: 300,
            },
            {
              url: 'https://i.scdn.co/image/ab67616d000048517359994525d219f64872d3b1',
              width: 64,
              height: 64,
            },
          ],
          name: 'Thodi Der',
          duration_ms: 207959,
          url: require('@/assets/songs/Thodi_Der.mp3'),
        },
      ],
    };
  }

  componentDidMount() {
    this.addHeader();
  }
  componentDidUpdate(prevProps, prevState) {}

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
                color={'white'}
              />
            }
            headerMiddleChildren={
              <TextComponent
                text={'Home'}
                textStyle={{
                  color: 'white',
                  fontSize: Fonts.size.normal,
                  marginHorizontal: 10,
                }}
              />
            }
          />
        );
      },
    });
  }

  renderMusicData(item) {
    console.log(item, 'ii', item.images[0].url);
    return (
      <TouchableOpacity
        style={this.props.styles.mainView}
        onPress={() => this.props.navigation.navigate(NAVIGATION.audioPlayer,{
            currentTrack: item
        })}>
        <View style={this.props.styles.trackView}>
          <Image
            source={{
                uri: item.images[1].url
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
              color: 'white',
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
    const {trackData} = this.state;
    return (
      <View style={this.props.styles.viewContainer}>
        <Statusbar />
        <FlatList
          data={trackData}
          key={(item,index) => item+index}
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
      </View>
    );
  }
}

const Home = props => {
  const style = Colors.useThemedStyles(styles);
  return <HomeClass {...props} styles={style} />;
};
export default Home;
