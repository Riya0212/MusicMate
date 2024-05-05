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
  base: 'Avenir-Book',
  bold: 'Avenir-Black',
  emphasis: 'HelveticaNeue-Italic',
  sfuiDisplayBold: 'SFUIDisplay-Bold',
  sfuiDisplaySemibold: 'SFUIDisplay-Semibold',
  sfuiDisplayRegular: 'SFUIDisplay-Regular',
  sfuiDisplayLight: 'SFUIDisplay-Light',
  sfuiDisplayMedium: 'SFUIDisplay-Medium',
  helveticaNeueLight: 'HelveticaNeue-Light',
  helveticaNeueBold: 'HelveticaNeue-Bold',
  helveticaNeueRegular: 'HelveticaNeue-Regular',
  helveticaRegular: 'Helvetica',
  helveticaBold: 'Helvetica-Bold',
  robotoBlack: 'Roboto-Black',
  robotoBlackItalic: 'Roboto-BlackItalic',
  robotoBold: 'Roboto-Bold',
  robotoBoldItalic: 'Roboto-BoldItalic',
  robotoLight: 'Roboto-Light',
  robotoLightItalic: 'Roboto-LightItalic',
  robotoItalic: 'Roboto-Italic',
  robotoMedium: 'Roboto-Medium',
  robotoMediumItalic: 'Roboto-MediumItalic',
  robotoRegular: 'Roboto-Regular',
  robotoThin: 'Roboto-Thin',
  robotoThinItalic: 'Roboto-ThinItalic',
  LatoBold: 'Lato-Bold',
  LatoRegular: 'Lato-Regular',
  RalewayBold: 'Raleway-Bold',
  SFProTextBold: 'SFProText-Bold',
  SFProTextMedium: 'SFProText-Medium',
  SFProTextRegular: 'SFProText-Regular',
  SFProTextSemibold: 'SFProText-Semibold',
  zuumeBlackItalic: 'Zuume Black Italic',
  zuumeBlack: 'Zuume Black',
  zuumeBoldItalic: 'Zuume Bold Italic',
  zuumeBold: 'Zuume Bold',
  zuumeExtraBoldItalic: 'Zuume ExtraBold Italic',
  zuumeExtraBold: 'Zuume ExtraBold',
  zuumeExtraLightItalic: 'Zuume ExtraLight Italic',
  zuumeExtraLight: 'Zuume ExtraLight',
  zuumeItalic: 'Zuume Italic',
  zuumeLightItalic: 'Zuume Light Italic',
  zuumeLight: 'Zuume Light',
  zuumeMediumItalic: 'Zuume Medium Italic',
  zuumeMedium: 'Zuume Medium',
  zuumeRegular: 'Zuume Regular',
  zuumeSemiBoldItalic: 'Zuume SemiBold Italic',
  zuumeSemiBold: 'Zuume SemiBold'
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
