import { Text } from 'react-native';
import styles from './styles';
import { Colors } from '@/themes';

const TextComponent = ({ text, textStyle, numberOfLines }) => {
  const style = Colors.useThemedStyles(styles);
  return (
    <Text numberOfLines={numberOfLines} style={[style.textStyle, textStyle]}>
      {text}
    </Text>
  );
};

export { TextComponent };
