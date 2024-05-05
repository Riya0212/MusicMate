import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import FontAwesome6Pro from 'react-native-vector-icons/FontAwesome6Pro';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import Zocial from 'react-native-vector-icons/Zocial';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { TouchableOpacity } from 'react-native';

export const iconTypes = {
  AntDesign: 'AntDesign',
  Ionicons: 'Ionicons',
  MaterialCommunityIcons: 'MaterialCommunityIcons',
  Entypo: 'Entypo',
  EvilIcons: 'EvilIcons',
  Feather: 'Feather',
  FontAwesome: 'FontAwesome',
  FontAwesome5: 'FontAwesome5',
  FontAwesome5Pro: 'FontAwesome5Pro',
  FontAwesome6: 'FontAwesome6',
  FontAwesome6Pro: 'FontAwesome6Pro',
  Fontisto: 'Fontisto',
  Foundation: 'Foundation',
  MaterialIcons: 'MaterialIcons',
  Octicons: 'Octicons',
  Zocial: 'Zocial',
  SimpleLineIcons: 'SimpleLineIcons',
};

const getIconType = (iconType, props) => {
  switch (iconType) {
    case iconTypes.AntDesign:
      return <AntDesign {...props} />;
    case iconTypes.Entypo:
      return <Entypo {...props} />;
    case iconTypes.Ionicons:
      return <Ionicons {...props} />;
    case iconTypes.MaterialCommunityIcons:
      return <MaterialCommunityIcons {...props} />;
    case iconTypes.EvilIcons:
      return <EvilIcons {...props} />;
    case iconTypes.Feather:
      return <Feather {...props} />;
    case iconTypes.FontAwesome:
      return <FontAwesome {...props} />;
    case iconTypes.FontAwesome5:
      return <FontAwesome5 {...props} />;
    case iconTypes.FontAwesome5Pro:
      return <FontAwesome5Pro {...props} />;
    case iconTypes.FontAwesome6:
      return <FontAwesome6 {...props} />;
    case iconTypes.FontAwesome6Pro:
      return <FontAwesome6Pro {...props} />;
    case iconTypes.Fontisto:
      return <Fontisto {...props} />;
    case iconTypes.Foundation:
      return <Foundation />;
    case iconTypes.MaterialIcons:
      return <MaterialIcons {...props} />;
    case iconTypes.Octicons:
      return <Octicons {...props} />;
    case iconTypes.SimpleLineIcons:
      return <SimpleLineIcons {...props} />;
    case iconTypes.Zocial:
      return <Zocial {...props} />;
    default:
      return null;
  }
};

const Icon = ({ iconType, onPress, isDisabled, viewStyle, ...props }) => {
  const IconComponent = getIconType(iconType, props);


  return (
    <TouchableOpacity onPress={onPress} disabled={isDisabled} style={viewStyle}>
      {IconComponent}
    </TouchableOpacity>
  );
};

export { Icon };
