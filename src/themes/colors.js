import { DefaultTheme, DarkTheme } from '@react-navigation/native';
import { useColorScheme } from 'react-native';

const light = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: '#1F0808',
        black: '#000000',
        white: '#ffffff',
        grey: '#808080',
        red: '#FF0000'

    },
    isDark: false,
};

const dark = {
    ...DarkTheme,
    colors: {
        ...DarkTheme.colors,
        background: '#1F0808',
        black: '#ffffff',
        white: '#000000',
        grey: '#808080',
        red: '#FF0000'

    },
    isDark: true,
};

const useThemedStyles = styles => {
    const systemTheme = useColorScheme();
    if (systemTheme == 'dark') {
        return styles(dark.colors);
    } else {
        return styles(light.colors);
    }
};

export default { light, dark, useThemedStyles };
