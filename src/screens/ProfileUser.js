import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileImgDefault from "../../assets/profileImg.webp";
import * as ImagePicker from "expo-image-picker";
import { useDispatch, useSelector } from "react-redux";
import { changeImage } from "../store/slices/profileSlice";

const ProfileUser = () => {
  const dispatch = useDispatch()
  const imageProfile = useSelector((state) => state.profile.image);  
  
  const handleChangeImageCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync(); 
    if (status === "granted") {
      const data = await ImagePicker.launchCameraAsync({
        base64: true,
        quality: 1,
      });
      if (!data.canceled && data.assets) {
        const base64Image = `data:image/jpeg;base64,${data.assets[0].base64}`;
        dispatch(changeImage(base64Image))        
      }
    } else {
      console.log("Permiso denegado para usar la cámara");
    }
  };
  
  const handleChangeImageGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status === "granted") {
      const data = await ImagePicker.launchImageLibraryAsync({
        base64: true,
        quality: 1, 
      });
      if (!data.canceled && data.assets) {
        const base64Image = `data:image/jpeg;base64,${data.assets[0].base64}`;
        dispatch(changeImage(base64Image))  
      }
    } else {
      console.log("Permiso denegado para acceder a la galería");
    }
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileSection}>
        <Image source={imageProfile? imageProfile: ProfileImgDefault } style={styles.imgProfile} />
        <View style={styles.buttonsImageProfile}>
          <Pressable style={styles.pressable} onPress={handleChangeImageCamera}>
            <Text style={styles.pressableText}>Usar cámara</Text>
          </Pressable>
          <Pressable style={styles.pressable} onPress={handleChangeImageGallery}>
            <Text style={styles.pressableText}>Desde galería</Text>
          </Pressable>
        </View>
        <Text style={styles.welcomeText}>Bienvenido, Usuario!</Text>
        <Text style={styles.sectionTitle}>Datos Personales:</Text>
        <Text style={styles.emailText}>Correo: </Text>
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
    textAlign: "center",
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
    textAlign: "center",
  },
  addressSection: {
    backgroundColor: "#f5f5f5",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  pressable: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  pressableText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
  },
  buttonsImageProfile: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: 10,
    borderRadius: 10,
    marginTop: 15,
  },
});

export default ProfileUser;
