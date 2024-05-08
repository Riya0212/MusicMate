import { Component, useEffect } from "react";
import { View, Alert, BackHandler } from "react-native";
import { Colors } from "@/themes";
import styles from "./styles";
import { ButtonComponent } from "@/components";
import { UserController } from "@/controllers";
import { NAVIGATION } from "@/constants/navigation";

class HomeClass extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount() { }
    componentDidUpdate(prevProps, prevState) { }
    render() {
        return (
            <View style={this.props.styles.viewContainer}>
                <ButtonComponent 
                btnTitle={'Logout'}
                btnOnPress={() => {
                    UserController.logoutUser().then(() => {
                        this.props.navigation.navigate(NAVIGATION.login)
                    })
                }}
                btnStyle={{padding: 15}}
                />
            </View>
        )
    }
}

const Home = (props) => {
    const style = Colors.useThemedStyles(styles)

    useEffect(() => {
        const backAction = () => {
          Alert.alert(
            'Quit App?',
            'Are you sure you want to exit App?',
            [
                {text: 'Yes', onPress: () => BackHandler.exitApp()},
                {text: 'No', onPress: () => true}
            ],
            {cancelable: true}
          )
          return true;
        };
    
        const backHandler = BackHandler.addEventListener(
          'hardwareBackPress',
          backAction,
        );
    
        return () => backHandler.remove();
      }, []);

    return (<HomeClass {...props} styles={style} />)
}
export default Home;