import { StyleSheet, TextInput, View, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../globals/colors';
import { useNavigation } from '@react-navigation/native';

const SigNupUser = () => {
    const navigation = useNavigation ()
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.textTitle}>Registrarse</Text>
      <View style={styles.containerEmail}>
        <Text style={styles.label}>Email:</Text>
        <TextInput style={styles.input} value="email" />
      </View>

      <View style={styles.containerPassword}>
        <Text style={styles.label}>Contraseña:</Text>
        <TextInput style={styles.input} value="password" secureTextEntry />
      </View>

      <View style={styles.containerConfirmPassword}>
        <Text style={styles.label}>Confirmar contraseña:</Text>
        <TextInput
          style={styles.input}
          value="confirmPassword"
          secureTextEntry
        />
      </View>
      <Pressable style={styles.buttonSignup}>
        <Text style={styles.buttonTextSignup}>Registrarse</Text>
      </Pressable>
      <View style={styles.containerButtonLogin}>
        <Text style={styles.textLogin}>¿Ya tienes cuenta?</Text>
        <Pressable onPress={() => navigation.navigate("LoginUser")}>
          <Text style={styles.buttonTextLogin}>Iniciar Sesion</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8f9fa',
  },
  textTitle: {
    fontSize: 30,
    marginBottom: 20,
  },
  containerEmail: {
    width: '80%',
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
  containerPassword: {
    width: '80%',
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
  containerConfirmPassword: {
    width: '80%',
    padding: 10,
    borderRadius: 8,
  },
  label: {
    fontSize: 16,
    color: '#000',
    marginBottom: 5,
  },
  input: {
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    fontSize: 14,
  },
  buttonSignup: {
    marginVertical: 30,
    backgroundColor: colors.red,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonTextSignup: {
    fontSize: 16,
    color: colors.white,
    fontWeight: 'bold',
  },
  containerButtonLogin: {
    flexDirection: 'row',
  },
  textLogin: {
    marginRight: 20,
  },
  buttonTextLogin: {
    color: colors.blue,
  },
});

export default SigNupUser;
