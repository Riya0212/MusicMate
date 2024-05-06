import { View } from 'react-native';
import styles from './styles';
import { Colors } from '@/themes';

const FooterComponent = ({ footerStyle, children }) => {
  const style = Colors.useThemedStyles(styles);
  return (
    <View style={[style.bottomStyle]}>
      <View style={[style.footerStyle, footerStyle]}>{children}</View>
    </View>
  );
};

export { FooterComponent };
