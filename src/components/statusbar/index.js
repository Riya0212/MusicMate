import { StatusBar } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { Colors } from '@/themes';
import styles from './styles';

const Statusbar = ({ backgroundColor, statusbarStyle }) => {
  const style = Colors.useThemedStyles(styles);
  const isFocused = useIsFocused();
  return isFocused ? (
    <StatusBar
      translucent={false}
      backgroundColor={backgroundColor ?? style.statusBg}
      barStyle={statusbarStyle ?? style.barStyle}
    />
  ) : null;
};

export { Statusbar };
