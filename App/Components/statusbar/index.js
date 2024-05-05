import { StatusBar } from 'react-native';
import { Colors } from '@/Themes';
import styles from './styles';
import { useIsFocused } from '@react-navigation/native';

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
