import { I18nManager, Text, TextInput, View } from 'react-native';
import { TextComponent } from '@/components';
import { Colors } from '@/themes';
import styles from './styles';

const TextInputIconComponent = ({
  value,
  nextRef,
  placeholder,
  secureTextEntry,
  onChangeText,
  keyboardType,
  labelText,
  labelStyle,
  inputMode,
  returnKeyType,
  onSubmitEditing,
  onEndEditing,
  inputStyle,
  editable,
  maxLength,
  textContentType,
  keyboardAppearance,
  isMultiline,
  numberOfLines,
  error,
  errorStyle,
  param,
  onBlur,
  onFocus,
  containerStyle,
  sectionStyle,
  hasLeftIcon,
  hasRightIcon,
  iconRightChildren,
  iconChildren,
  placeholderTextColor,
  autoFocus,
  cursorColor
}) => {
  const style = Colors.useThemedStyles(styles);
  return (
    <View style={[style.containerStyle, containerStyle]}>
      {labelText != '' && (
        <TextComponent
          text={labelText}
          textStyle={[style.labelStyle, labelStyle]}
        />
      )}
      <View style={[style.sectionStyle, sectionStyle]}>
        {iconChildren != undefined && hasLeftIcon == true && iconChildren}
        <TextInput
          value={value}
          ref={nextRef}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          inputMode={inputMode}
          placeholderTextColor={
            placeholderTextColor ? placeholderTextColor : style.hintText
          }
          returnKeyType={returnKeyType}
          onSubmitEditing={onSubmitEditing}
          onEndEditing={onEndEditing}
          style={[style.inputStyle, inputStyle]}
          clearButtonMode="while-editing"
          editable={editable}
          onBlur={onBlur}
          onFocus={onFocus}
          maxLength={maxLength}
          textAlign={I18nManager.isRTL ? 'right' : 'left'}
          cursorColor={cursorColor ?? style.blackColor}
          textContentType={textContentType}
          keyboardAppearance={keyboardAppearance}
          multiline={isMultiline}
          numberOfLines={numberOfLines}
          underlineColorAndroid={'transparent'}
          autoFocus={autoFocus}
        />
        {iconRightChildren != undefined && hasRightIcon == true && iconRightChildren}
      </View>
      {error != null && error[param] != undefined && (
        <Text style={[style.errorStyle, errorStyle]}>{error[param]}</Text>
      )}
    </View>
  );
};

export { TextInputIconComponent };
