import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Colors, Fonts, Metrics } from "@/themes";
import { Icon, iconTypes } from "@/components";
import Home from "@/screens/home";
import Login from "@/screens/login";
import SignUp from "@/screens/signup";
const BottomTab = createBottomTabNavigator()
export const NAVIGATION = {
    home: "Home",
    login: "Login",
    signup: "SignUp",
};

export const StackNavigation = [
    {
        component: Home,
        name: NAVIGATION.home,
        options: props => ({
            headerShown: false,
        }),
    },
    {
        component: Login,
        name: NAVIGATION.login,
        options: props => ({
            headerShown: false,
        }),
    },
    {
        component: SignUp,
        name: NAVIGATION.signup,
        options: props => ({
            headerShown: false,
        }),
    },
];

export const BottomTabNavigation = [

];


function BottomTabNavigator() {
    const systemTheme = useColorScheme();
    const colors =
        systemTheme == 'light' ? Colors.light.colors : Colors.dark.colors;
    return (
        <BottomTab.Navigator
            backBehavior="initialRoute"
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName = '';


                    return (
                        <Icon
                            iconType={iconTypes.Ionicons}
                            name={iconName}
                            size={size}
                            color={color}
                            isDisabled={true}
                            style={{
                                marginTop: Metrics.smallMargin,
                            }}
                        />
                    );
                },
                unmountOnBlur: true,
                tabBarStyle: {
                    backgroundColor: colors.black,
                    alignContent: 'center',
                    height: 60,
                    elevation: 0,
                    borderTopWidth: 0,
                },
                tabBarActiveTintColor: colors.grey,
                tabBarHideOnKeyboard: true,
                tabBarInactiveTintColor: colors.white,

                tabBarLabelStyle: {
                    padding: 0,
                    marginBottom: Metrics.smallMargin,
                    fontSize: Fonts.size.small,
                    fontFamily: Fonts.type.robotoRegular,
                },
            })}>
            {BottomTabNavigation?.length > 0 &&
                BottomTabNavigation?.map((item, index) => {
                    return (
                        <BottomTab.Screen
                            component={item.component}
                            name={item.name}
                            options={item.options}
                            key={index}
                        />
                    );
                })}
        </BottomTab.Navigator>
    );
}
