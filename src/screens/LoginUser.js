import { StyleSheet, Text, TextInput, View } from "react-native";
import { colors } from "../globals/colors";
import { useState } from "react";
import TogglePasswordButton from "../components/TogglePasswordButton";

const LoginUser = () => {
    const [userCorreo, setUserCorreo] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Registrarse</Text>
            <View style={styles.containerUser}>
                <Text style={styles.textLogin}>Correo Electrónico: </Text>
                <TextInput
                    value={userCorreo}
                    style={styles.textInput}
                    onChangeText={setUserCorreo}
                    placeholder="Ingrese su Correo Electrónico"
                />
            </View>
            <View style={styles.containerUser}>
                <Text style={styles.textLogin}>Contraseña: </Text>
                <View style={styles.containerInputPassword}>
                    <TextInput
                        style={styles.textInputWithIcon}
                        maxLength={9}
                        value={userPassword}
                        onChangeText={setUserPassword}
                        placeholder="Ingrese su Contraseña"
                        secureTextEntry={!passwordVisible}
                    />
                    <TogglePasswordButton
                        icon={passwordVisible ? "eye" : "eye-slash"}
                        onPress={() => setPasswordVisible(!passwordVisible)}
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        justifyContent: "center",
        alignItems: "center"
    },
    title: {
        fontSize: 30,
        marginBottom: 50
    },
    containerUser: {
        margin: 30,
        height: 80,
        width: 250
    },
    textLogin: {
        fontSize: 18,
        textAlign: "left",
        marginBottom: 5
    },
    containerInputPassword: {
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: colors.black
    },
    textInput: {
        borderBottomColor: colors.black,
        borderBottomWidth: 1,
        paddingVertical: 8,
        paddingHorizontal: 10,
        fontSize: 16
    },
    textInputWithIcon: {
        flex: 1,
        paddingVertical: 8,
        paddingHorizontal: 10,
        fontSize: 16
    }
});

export default LoginUser;
