import {View, Text, StyleSheet} from "react-native"
import { colors } from "../globals/colors";

const Header = ({title}) =>  {
    return (
        <View style={styles.container}>
        <Text style={styles.Text}>{title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.black,
    },
    Text: {
        fontSize: 40,
        textTransform: "uppercase",
        textAlign: "center",
        color: colors.red,
        fontWeight: "bold"
    }
})

export default Header;