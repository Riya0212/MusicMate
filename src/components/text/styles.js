import { StyleSheet } from 'react-native';
import { Fonts } from '@/themes';

const styles = themeMode =>
  StyleSheet.create({
    textStyle: {
      color: themeMode.black,
      fontFamily: Fonts.type.robotoRegular,
      fontSize: Fonts.size.regular,
    },
  });

export default styles;
