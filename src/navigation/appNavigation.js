import React from 'react';
import { useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Colors } from '@/themes';
import { NAVIGATION, StackNavigation } from '@/constants/navigation';

const Stack = createStackNavigator();

function AppNavigation() {
    const systemTheme = useColorScheme();

    return (
        <NavigationContainer
            theme={systemTheme == 'light' ? Colors.light : Colors.dark}
            independent={true}>
            <Stack.Navigator
                initialRouteName={NAVIGATION.home}>
                {StackNavigation?.length > 0 &&
                    StackNavigation?.map((item, index) => {
                        return (
                            <Stack.Screen
                                component={item.component}
                                name={item.name}
                                options={item.options}
                                key={index}
                            />
                        );
                    })}
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default AppNavigation;
