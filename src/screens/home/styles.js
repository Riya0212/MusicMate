import {Fonts, Metrics} from '@/themes';
import {StyleSheet} from 'react-native';

const styles = themeMode =>
  StyleSheet.create({
    viewContainer: {
      backgroundColor: themeMode.white,
      flex: 1,
    },
    headerStyle: {
      backgroundColor: themeMode.white,
    },
    headerContainerStyle: {
      borderBottomWidth: 1,
      borderBottomColor: themeMode.borderGrey,
      justifyContent: 'center',
      padding: Metrics.WIDTH * 0.02,
    },
    headerMiddleText:{
      color: themeMode.black,
      fontSize: Fonts.size.normal,
      marginHorizontal: 10,
    },
    trackView: {
      width: Metrics.HEIGHT * 0.08,
      height: Metrics.HEIGHT * 0.08,
      backgroundColor: themeMode.white,
      justifyContent: 'center',
    },
    mainView: {
      backgroundColor: themeMode.white,
      padding: 10,
      flexDirection: 'row',
      borderWidth:1,
      borderColor: themeMode.borderGrey,
      borderRadius:10
    },
    blackColor: themeMode.black,
  });

export default styles;
