import { StyleSheet } from 'react-native';

const styles = themeMode =>
  StyleSheet.create({
    statusBg: themeMode.white,
    barStyle: themeMode.black == '#000' ? 'dark-content' : 'light-content',
  });

export default styles;
