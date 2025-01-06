import React, { useState } from 'react';
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../globals/colors';
import TogglePasswordButton from '../components/TogglePasswordButton';

const LoginUser = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [name, setName] = useState('');

  const handleRegister = () => {
    if (!email || !password || !name) {
      Alert.alert('Error', 'Todos los campos son obligatorios.');
      return;
    }

    if (email.length < 6 || password.length < 9) {
      Alert.alert(
        'Error',
        'El correo debe tener al menos 6 caracteres y la contraseña 9 caracteres.'
      );
      return;
    }

    navigation.navigate('ProfileUser', { email, name });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inciar Sesion</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Correo Electrónico:</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Ingrese su correo electrónico"
          keyboardType="email-address"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Contraseña:</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            value={password}
            onChangeText={setPassword}
            placeholder="Ingrese su contraseña"
            secureTextEntry={!passwordVisible}
            maxLength={12}
          />
          <TogglePasswordButton
            icon={passwordVisible ? 'eye' : 'eye-slash'}
            onPress={() => setPasswordVisible(!passwordVisible)}
          />
        </View>
      </View>

      <Pressable style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.registerButtonText}>Iniciar Sesion</Text>
      </Pressable>
      <View style={styles.containerButtonSigNup}>
        <Text style={styles.textSigNup}>¿No tienes cuenta?</Text>
        <Pressable onPress={ () => navigation.navigate("SigNupUser")}>
          <Text style={styles.buttonTextSigNup}>Registrarse</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 30,
    color: colors.black,
  },
  inputGroup: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: colors.black,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.black,
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    backgroundColor: colors.white,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.black,
    borderRadius: 8,
    paddingRight: 10,
  },
  passwordInput: {
    flex: 1,
    padding: 10,
    fontSize: 16,
  },
  registerButton: {
    backgroundColor: colors.red,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 20,
  },
  registerButtonText: {
    fontSize: 16,
    color: colors.white,
    fontWeight: 'bold',
  },
  containerButtonSigNup: {
    flexDirection: 'row',
  },
  textSigNup: {
    marginRight: 20,
  },
  buttonTextSigNup: {
    color: colors.blue,
  },
});

export default LoginUser;
