import {StyleSheet} from 'react-native';
import {Fonts, Metrics} from '@/themes';

const styles = themeMode =>
  StyleSheet.create({
    labelStyle: {
      fontSize: Fonts.size.small,
      color: themeMode.black,
      fontFamily: Fonts.type.robotoRegular,
      textAlign: 'left',
      alignItems: 'center',
      height: 'auto',
      alignContent: 'center',
    },
    inputStyle: {
      color: themeMode.black,
      fontSize: Fonts.size.small,
      textDecorationLine: 'none',
      textDecorationColor: themeMode.transparent,
      fontFamily: Fonts.type.robotoRegular,
      justifyContent: 'flex-start',
      alignContent: 'center',
      alignItems: 'center',
      height: Metrics.HEIGHT * 0.05,
      paddingVertical: 0,
      flex: 1,
    },
    containerStyle: {
      borderRadius: Metrics.borderRadius,
      borderColor: themeMode.black,
      paddingHorizontal: 0,
      padding: 0,
      width: '100%',
      height: 'auto',
    },
    errorStyle: {
      color: themeMode.red,
      marginTop: Metrics.smallMargin,
      height: 'auto',
    },
    viewStyle: {
      paddingLeft: Metrics.baseMargin,
      paddingRight: Metrics.baseMargin,
      justifyContent: 'flex-start',
      height: 'auto',
    },

    hintText: themeMode.grey,
    blackColor: themeMode.black,

    topLabelStyle: {
      fontSize: Fonts.size.medium,
      color: themeMode.black,
      fontFamily: Fonts.type.robotoBold,
      textAlign: 'left',
      alignItems: 'center',
      height: 'auto',
      alignContent: 'center',
    },
    sectionStyle: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: themeMode.black,
      borderRadius: Metrics.borderRadius,
    },
  });

export default styles;
