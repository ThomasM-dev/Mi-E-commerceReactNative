import { useState } from "react"
import { TextInput, View, Text, StyleSheet } from "react-native"
import ButtonsSearch from "./ButtonsSearch"
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { colors } from "../globals/colors";

const Search = ({onChangeKeyword}) => {
    const [input, setInput] = useState("")
    const [error, setError] = useState ("")

    const regex = /^[a-zA-Z0-9 ]+$/

    const handleButtonSearh = () => {
        if (!regex.test(input)) { 
            return setError("Caracter no permitido");
        }
        setError("")
        onChangeKeyword(input)
    }
    const handleButtonRemove = () => {
        setInput("")
        onChangeKeyword("")
        setError("")
    }
    
    return (
        <View style={styles.container}>
            <View style={styles.containerInput}>
                <TextInput
                    style={styles.input}
                placeholder="Buscar"
            placeholderTextColor={colors.gray}
            value={input}
            onChangeText={(text) => setInput(text)}
                />
                <Text style={styles.errorInput}>{ error? error: ""}</Text>
            </View>
        <ButtonsSearch onPress={handleButtonSearh}>
            <FontAwesome name="search" size={20} color="white" />
        </ButtonsSearch>
        <ButtonsSearch onPress={handleButtonRemove}>
        <FontAwesome name="remove" size={20} color="white" />
        </ButtonsSearch>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        color: colors.black,
        flexDirection: "row",
        justifyContent: "space-around",
        paddingTop: 20,
        marginLeft: 10,
    },
    containerInput: {
        flex: 1,
    },
    input: {
        color: colors.white,
        height: 40, 
        borderColor: colors.red,
        borderWidth: 1,
        borderRadius: 10,
        fontSize: 20
    },
    errorInput: {
        color: colors.white,
        marginBottom: 10,
        marginTop: 10,
        fontWeight: "bold"
    }
})
export default Search