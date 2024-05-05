import { StyleSheet } from 'react-native';
import { Metrics } from '@/themes';

const styles = themeMode =>
  StyleSheet.create({
    footerStyle: {
      backgroundColor: themeMode.white,
      flexDirection: 'column',
      justifyContent: 'center',
      padding: Metrics.baseMargin,
      alignItems: 'center',
      width: '100%',
    },

    bottomStyle: {
      width: '100%',
      bottom: 0,
      position: 'absolute',
      justifyContent: 'flex-end',
      flex: 1,
    },
  });

export default styles;
