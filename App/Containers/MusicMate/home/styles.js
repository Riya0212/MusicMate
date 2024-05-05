import { StyleSheet } from "react-native";

const styles = themeMode => StyleSheet.create({
    viewContainer: {
        backgroundColor: themeMode.white,
        flex:1
    }
});

export default styles;