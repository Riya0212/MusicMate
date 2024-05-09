import { StyleSheet } from "react-native";

const styles = themeMode => StyleSheet.create({
    viewContainer: {
        backgroundColor: themeMode.white,
        flex:1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default styles;