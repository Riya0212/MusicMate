import {Dimensions} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
const {width, height} = Dimensions.get('window');

//Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

const scale = size => (width / guidelineBaseWidth) * size;
const verticalScale = size => (height / guidelineBaseHeight) * size;
const moderateScale = (size, factor = 0.5) =>
  size + (scale(size) - size) * factor;

const type = {
  satoshiBlackItalic: 'Satoshi-BlackItalic',
  satoshiBlack: 'Satoshi-Black',
  satoshiBoldItalic: 'Satoshi-BoldItalic',
  satoshiBold: 'Satoshi-Bold',
  satoshiItalic: 'Satoshi-Italic',
  satoshiLightItalic: 'Satoshi-LightItalic',
  satoshiLight: 'Satoshi-Light',
  satoshiMediumItalic: 'Satoshi-MediumItalic',
  satoshiMedium: 'Satoshi-Medium',
  satoshiRegular: 'Satoshi-Regular',
  satoshiVariableItalic: 'Satoshi-VariableItalic',
  satoshiVariable: 'Satoshi-Variable'
};

const size = {
  xxxlarge: RFValue(90),
  xxlarge: RFValue(40),
  xmlarge: RFValue(35),
  xlarge: RFValue(30),
  content: RFValue(21),
  large: RFValue(25),
  medium: RFValue(18),
  normal: RFValue(16),
  small: RFValue(14),
  msmall: RFValue(13),
  xsmall: RFValue(12),
  xmsmall: RFValue(11),
  xxsmall: RFValue(10)
};

const style = {
  h1: {
    fontFamily: type.base,
    fontSize: size.h1,
  },
  h2: {
    fontWeight: 'bold',
    fontSize: size.h2,
  },
  h3: {
    fontFamily: type.emphasis,
    fontSize: size.h3,
  },
  h4: {
    fontFamily: type.base,
    fontSize: size.h4,
  },
  h5: {
    fontFamily: type.base,
    fontSize: size.h5,
  },
  h6: {
    fontFamily: type.emphasis,
    fontSize: size.h6,
  },
  normal: {
    fontFamily: type.base,
    fontSize: size.regular,
  },
  description: {
    fontFamily: type.base,
    fontSize: size.medium,
  },
};

export default {
  type,
  size,
  style,
  scale,
  verticalScale,
  moderateScale,
};
