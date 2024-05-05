import { StyleSheet } from 'react-native';

const styles = themeMode =>
  StyleSheet.create({
    btnStyle: {
      height: 'auto',
      color: themeMode.black,
      borderColor: themeMode.white,
      justifyContent: 'center',
      borderRadius: 10,
      paddingHorizontal: 0,
      width: '100%',
      backgroundColor: themeMode.grey,
    },
  });
export default styles;
