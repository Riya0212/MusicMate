import { Component } from "react";
import { View, Text } from "react-native";
import { Colors } from "@/themes";
import styles from "./styles";

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
                <Text>Home</Text>
            </View>
        )
    }
}

const Home = (props) => {
    const style = Colors.useThemedStyles(styles)
    return (<HomeClass {...props} styles={style} />)
}
export default Home;