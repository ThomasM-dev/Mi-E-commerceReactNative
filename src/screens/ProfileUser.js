import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  Alert,
} from 'react-native';
import ProfileImgDefault from '../../assets/profileUserDefault.jpg';
import * as ImagePicker from 'expo-image-picker';
import { useSelector, useDispatch } from 'react-redux';
import LocationSelector from '../components/LocationSelector';
import { SafeAreaView } from 'react-native-safe-area-context';

const ProfileUser = () => {
  const dispatch = useDispatch();
  const emailUser = useSelector((state) => state.user.email);
  const addressUser = useSelector((state) => state.addressUser.address);

  const handleChangeImageCamera = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        console.warn('Permiso denegado para usar la cámara.');
        return;
      }
      const data = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [9, 16],
        base64: true,
        quality: 1,
      });
      if (!data.canceled && data.assets?.length > 0 && data.assets[0].base64) {
        const base64Image = `data:image/jpeg;base64,${data.assets[0].base64}`;
        setImgProfile(base64Image);
      } else {
        console.warn('Captura de imagen cancelada o datos inválidos.');
      }
    } catch (error) {
      console.error('Error al capturar la imagen:', error);
    }
  };

  const handleChangeImageGallery = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        console.warn('Permiso denegado para acceder a la galería.');
        return;
      }
      const data = await ImagePicker.launchImageLibraryAsync({
        base64: true,
        allowsEditing: true,
        quality: 1,
        aspect: [9, 16],
      });
      if (!data.canceled && data.assets?.[0]?.base64) {
        const base64Image = `data:image/jpeg;base64,${data.assets[0].base64}`;
        setImgProfile(base64Image);
      } else {
        console.warn('Selección de imagen cancelada o datos inválidos.');
      }
    } catch (error) {
      console.error('Error al seleccionar la imagen:', error);
    }
  };

  const handleSaveDateUser = () => {
    console.log('datos del usuario', addressUser, emailUser, imageProfile);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileSection}>
        <Image source={imgProfile} style={styles.imgProfile} />
        <View style={styles.buttonsImageProfile}>
          <Pressable
            style={[styles.pressable, styles.cameraButton]}
            onPress={handleChangeImageCamera}
          >
            <Text style={styles.pressableText}>Usar cámara</Text>
          </Pressable>
          <Pressable
            style={[styles.pressable, styles.galleryButton]}
            onPress={handleChangeImageGallery}
          >
            <Text style={styles.pressableText}>Desde galería</Text>
          </Pressable>
        </View>
        <Text style={styles.textProfile}>Bienvenido, Usuari@!</Text>
        <Text style={styles.emailText}>
          Correo: {emailUser || 'No disponible'}
        </Text>
      </View>
      <View style={styles.locationSelectorContainer}>
        <LocationSelector />
      </View>
      <Pressable onPress={saveProfileData} style={styles.pressable}>
        <Text style={styles.pressableText}>Guardar Cambios</Text>
      </Pressable>
      <Pressable
        onPress={handleLogout}
        style={[styles.pressable, styles.logoutButton]}
      >
        <Text style={styles.pressableText}>Cerrar Sesión</Text>
      </Pressable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    paddingHorizontal: 20,
    marginVertical: 50,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 40,
    backgroundColor: '#fff',
    padding: 25,
    borderRadius: 12,
  },
  imgProfile: {
    height: 180,
    width: 180,
    borderRadius: 90,
    marginBottom: 20,
    borderWidth: 3,
    borderColor: '#007bff',
  },
  textProfile: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
    textAlign: 'center',
  },
  emailText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginTop: 5,
  },
  pressable: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginHorizontal: 10,
    marginTop: 20,
    elevation: 5,
  },
  pressableText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  buttonsImageProfile: {
    flexDirection: 'row',
    width: '100%',
    padding: 12,
    justifyContent: 'center',
    borderRadius: 10,
    marginVertical: 15,
  },
  cameraButton: {
    backgroundColor: '#28a745',
  },
  galleryButton: {
    backgroundColor: '#ffc107',
  },
  logoutButton: {
    backgroundColor: '#dc3545',
    marginTop: 20,
  },

  locationSelectorContainer: {
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#fff',
    paddingVertical: 20,
    marginBottom: 30,
    borderRadius: 12,
  },
});

export default ProfileUser;
