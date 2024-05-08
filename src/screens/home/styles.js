import {Metrics} from '@/themes';
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
      borderBottomColor: 'grey',
      justifyContent: 'center',
      padding: Metrics.WIDTH * 0.02,
    },
    trackView: {
      width: Metrics.HEIGHT * 0.08,
      height: Metrics.HEIGHT * 0.08,
      borderRadius: 10,
      backgroundColor: themeMode.white,
      borderWidth: 2,
      borderColor: themeMode.borderGrey,
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
  });

export default styles;
