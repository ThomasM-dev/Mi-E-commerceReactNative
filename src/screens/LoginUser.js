import React, { useState, useEffect } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../globals/colors';
import TogglePasswordButton from '../components/TogglePasswordButton';
import { useLoginMutation } from '../services/AuthApi';
import loginValidation from '../validation/loginValidation';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/slices/userSlice';

const LoginUser = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errors, setErrors] = useState({});
  const [triggerLogin] = useLoginMutation();
  const dispatch = useDispatch();

  const onSubmit = async () => {
    setErrors({});
    try {
      await loginValidation.validate({ email, password });
      const response = await triggerLogin({ email, password });
      const user = {
        email: response.data.email,
        idToken: response.data.idToken,
        localId: response.data.localId,
      };
      dispatch(setUser(user));
    } catch (error) {
      if (error.path) {
        switch (error.path) {
          case 'email':
            setErrors({ email: error.message });
            break;
          case 'password':
            setErrors({ password: error.message });
        }
      } else if (error.response) {
        console.log(error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inciar Sesion</Text>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Correo Electrónico:</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={(t) => setEmail(t)}
          placeholder="Ingrese su correo electrónico"
          keyboardType="email-address"
        />
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Contraseña:</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            value={password}
            onChangeText={(t) => setPassword(t)}
            placeholder="Ingrese su contraseña"
            secureTextEntry={!passwordVisible}
            maxLength={12}
          />
          <TogglePasswordButton
            icon={passwordVisible ? 'eye' : 'eye-slash'}
            onPress={() => setPasswordVisible(!passwordVisible)}
          />
        </View>
        {errors.password && (
          <Text style={styles.errorText}>{errors.password}</Text>
        )}
      </View>

      {errors.api && <Text style={styles.errorText}>{errors.api}</Text>}

      <Pressable style={styles.registerButton} onPress={onSubmit}>
        <Text style={styles.registerButtonText}>Iniciar Sesion</Text>
      </Pressable>
      <View style={styles.containerButtonSigNup}>
        <Text style={styles.textSigNup}>¿No tienes cuenta?</Text>
        <Pressable onPress={() => navigation.navigate('SigNupUser')}>
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
  errorText: {
    color: colors.red,
    fontSize: 12,
    marginTop: 5,
  },
});

export default LoginUser;
