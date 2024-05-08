import { Metrics } from '@/themes';
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
  });

export default styles;
