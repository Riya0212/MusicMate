import React from 'react';
import { View } from 'react-native';
import styles from './styles';
import { Colors } from '@/Themes';

const HeaderComponent = ({
  headerMiddleChildren,
  headerLeftChildren,
  hasSingleRightIcon,
  headerRightChildren,
  headerStyle,
  headerMiddleViewStyle,
  headerLeftViewStyle,
  headerRightViewStyle,
  containerStyle,
}) => {
  const style = Colors.useThemedStyles(styles);

  return (
    <View style={[style.container, containerStyle]}>
      <View style={[style.headerStyle, headerStyle]}>
        {/* header left child view */}
        {headerLeftChildren && (
          <View style={[style.basicLeftStyle, headerLeftViewStyle]}>
            {headerLeftChildren}
          </View>
        )}

        {/* header middle child view */}
        {headerMiddleChildren && (
          <View style={[style.basicMiddleStyle, headerMiddleViewStyle]}>
            {headerMiddleChildren}
          </View>
        )}

        {/* header right child view */}
        {headerRightChildren && (
          <View
            style={[
              hasSingleRightIcon
                ? style.basicSingleRightStyle
                : style.basicRightStyle,
              headerRightViewStyle,
            ]}>
            {headerRightChildren}
          </View>
        )}
      </View>
    </View>
  );
};

export { HeaderComponent };
