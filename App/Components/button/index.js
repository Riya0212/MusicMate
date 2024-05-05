import { TouchableOpacity, View } from 'react-native';
import styles from './styles';
import { Icon, TextComponent } from '@/Components';
import { Colors } from '@/Themes';


const ButtonComponent = ({
  btnTitle,
  btnTitleStyle,
  btnIconName,
  btnIconSize,
  btnIconColor,
  btnOnPress,
  btnStyle,
  iconType,
  viewStyle,
  isDisabled,
}) => {
  const style = Colors.useThemedStyles(styles);
  return (
    <TouchableOpacity
      style={[style.btnStyle, btnStyle]}
      onPress={btnOnPress}
      disabled={isDisabled}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignContent: 'center',
          paddingHorizontal: 0,
        }}>
        {btnIconName != undefined && (
          <Icon
            iconType={iconType}
            name={btnIconName}
            size={btnIconSize}
            color={btnIconColor}
            viewStyle={viewStyle}
            isDisabled={true}
          />
        )}
        <TextComponent text={btnTitle} textStyle={btnTitleStyle} />
      </View>
    </TouchableOpacity>
  );
};

export { ButtonComponent };
