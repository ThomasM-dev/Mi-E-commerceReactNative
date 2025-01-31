import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../globals/colors';
import TogglePasswordButton from '../components/TogglePasswordButton';
import { useSigNupMutation } from '../services/AuthApi';
import { sigNupValidation } from '../validation/sigNupValidation';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/slices/userSlice';
import { deleteSession, insertSession } from '../config/dbSqlLite';

const SigNupUser = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPassVisible, setConfirmPassVisible] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [triggerSigNup] = useSigNupMutation();
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    setErrors({});
    try {
      setLoading(true);
      await sigNupValidation.validate({ email, password, confirmPassword });
      const response = await triggerSigNup({ email, password });
      const user = {
        email: response.data.email,
        idToken: response.data.idToken,
        localId: response.data.localId,
      };
      dispatch(setUser(user));
      await deleteSession();
      await insertSession(user.localId, user.email, user.idToken);
    } catch (error) {
      switch (error.path) {
        case 'email':
          setErrors({ email: error.message });
          break;
        case 'password':
          setErrors({ password: error.message });
          break;
        case 'confirmPassword':
          setErrors({ confirmPassword: error.message });
          break;
        default:
          setErrors({ general: 'Ocurrió un error inesperado' });
          break;
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrarse</Text>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Correo Electrónico:</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
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
        {errors.password && (
          <Text style={styles.errorText}>{errors.password}</Text>
        )}
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}> Confirmar Contraseña:</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Confirmar Contraseña"
            secureTextEntry={!confirmPassVisible}
            maxLength={12}
          />
          <TogglePasswordButton
            icon={confirmPassVisible ? 'eye' : 'eye-slash'}
            onPress={() => setConfirmPassVisible(!confirmPassVisible)}
          />
        </View>
        {errors.confirmPassword && (
          <Text style={styles.errorText}>{errors.confirmPassword}</Text>
        )}
      </View>
      <Pressable
        style={[
          styles.registerButton,
          loading && styles.registerButtonDisabled,
        ]}
        onPress={loading ? null : onSubmit}
        disabled={loading}
      >
        <Text style={styles.registerButtonText}>
          {loading ? 'Cargando...' : 'Registrarse'}
        </Text>
      </Pressable>

      <View style={styles.containerButtonSigNup}>
        <Text style={styles.textSigNup}>¿No tienes cuenta?</Text>
        <Pressable onPress={() => navigation.navigate('LoginUser')}>
          <Text style={styles.buttonTextSigNup}>Iniciar Sesion</Text>
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
    fontSize: 14,
    marginTop: 4,
  },
  registerButton: {
    backgroundColor: colors.red,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  registerButtonDisabled: {
    backgroundColor: '#a0a0a0',
    opacity: 0.6,
  },
  registerButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SigNupUser;
