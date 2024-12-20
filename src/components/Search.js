import { useState } from "react"
import { TextInput, View, Text, StyleSheet } from "react-native"
import ButtonsSearch from "./ButtonsSearch"
import { colors } from "../globals/colors"
import FontAwesome from '@expo/vector-icons/FontAwesome';

const Search = () => {
    const [input, setInput] = useState ("")

    const handleButtonSearh = () => {

    }
    const handleButtonRemove = () => {
        
    }
    return (
        <View style={styles.container}>
            <TextInput
            style={styles.input}
            placeholder="Buscar"
            value={input}
            onChangeText={setInput}
            />
        <ButtonsSearch onPress={handleButtonSearh}>
            <FontAwesome name="search" size={24} color="white" />
        </ButtonsSearch>
        <ButtonsSearch onPress={handleButtonRemove}>
        <FontAwesome name="remove" size={24} color="white" />
        </ButtonsSearch>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        color: colors.orange,
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-around"
    },
    input:{
        color: colors.gray,
        width: "80%", 
        height: 40, 
        borderColor: colors.red,
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 20,
        fontSize: 20
    },
})
export default Search