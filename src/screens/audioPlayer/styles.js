import {Metrics} from '@/themes';
import {StyleSheet} from 'react-native';

const styles = themeMode =>
  StyleSheet.create({
    viewContainer: {
      flex: 1,
      backgroundColor: themeMode.white,
    },
    headerStyle: {
      backgroundColor: themeMode.white,
    },
    headerContainerStyle: {
      borderBottomWidth: 1,
      borderBottomColor: 'grey',
      justifyContent: 'center',
      padding: Metrics.WIDTH * 0.02,
    },
    blackColor: themeMode.black,
    playBtn: {
      height: Metrics.HEIGHT * 0.06,
      width: Metrics.HEIGHT * 0.06,
      borderRadius: Metrics.HEIGHT * 0.03,
      backgroundColor: themeMode.black,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default styles;
