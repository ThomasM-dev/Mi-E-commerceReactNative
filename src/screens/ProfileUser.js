import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ProfileUser = ({ route }) => {
  const { email, name } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileSection}>
        <View style={styles.imgProfile} />
        <Text style={styles.welcomeText}>Bienvenido, {name}!</Text>
        <Text style={styles.sectionTitle}>Datos Personales:</Text>
        <Text style={styles.emailText}>Correo: {email}</Text>
      </View>

      <View style={styles.addressSection}>
        <Text style={styles.sectionTitle}>Dirección de Entrega</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  profileSection: {
    alignItems: "center",
    marginBottom: 40,
  },
  imgProfile: {
    backgroundColor: "#d9d9d9",
    height: 150,
    width: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#555",
    marginTop: 20,
  },
  emailText: {
    fontSize: 16,
    color: "#555",
    marginTop: 10,
  },
  addressSection: {
    backgroundColor: "#f5f5f5",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
});

export default ProfileUser;
