import { StyleSheet } from 'react-native';
import { Metrics } from '@/themes';

const styles = themeMode =>
  StyleSheet.create({
    container: {
      width: '100%',
      alignSelf: 'center',
      backgroundColor: themeMode.white,
    },
    headerStyle: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      padding: Metrics.smallMargin,
      alignItems: 'center',
      backgroundColor: themeMode.white,
    },
    basicLeftStyle: {
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
    },
    basicMiddleStyle: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    basicRightStyle: {
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    basicSingleRightStyle: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

export default styles;
