import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  Alert,
  ScrollView,
} from 'react-native';
import ProfileImgDefault from '../../assets/profileImg.webp';
import * as ImagePicker from 'expo-image-picker';
import { useSelector } from 'react-redux';
import LocationSelector from '../components/LocationSelector';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { deleteSession } from '../config/dbSqlLite';

const ProfileUser = () => {
  const emailUser = useSelector((state) => state.user.email);
  const addressUser = useSelector((state) => state.addressUser.address);
  const [imgProfile, setIMgProfile] = useState(null);

  useEffect(() => {
    const fetchProfileDataUser = async () => {
      const image = await AsyncStorage.getItem('userImage');
      setIMgProfile(image || ProfileImgDefault);
    };
    fetchProfileDataUser();
  }, []);

  const permissionCamera = async (permissionType) => {
    const { status } =
      permissionType === 'camera'
        ? await ImagePicker.requestCameraPermissionsAsync()
        : await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert(
        'Permiso denegado',
        `No se pudo acceder a la ${permissionType}.`
      );
      return false;
    }
    return true;
  };

  const handleChangeImage = async (sourceType) => {
    const permissionGranted = await permissionCamera(sourceType);
    if (!permissionGranted) return;
    let data;
    if (sourceType === 'camera') {
      data = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [9, 16],
        base64: true,
        quality: 1,
      });
    } else {
      data = await ImagePicker.launchImageLibraryAsync({
        base64: true,
        allowsEditing: true,
        quality: 1,
        aspect: [9, 16],
      });
    }

    if (!data.canceled && data.assets?.[0]?.base64) {
      const base64Image = `data:image/jpeg;base64,${data.assets[0].base64}`;
      setIMgProfile(base64Image);
    } else {
      Alert.alert('Error', 'No se seleccionó una imagen válida.');
    }
  };

  const saveProfileData = async () => {
    try {
      await AsyncStorage.setItem('userImage', imgProfile);
      await AsyncStorage.setItem('userAddress', JSON.stringify(addressUser));
      Alert.alert('Éxito', 'Los datos se han guardadoc correctamente.');
    } catch (error) {
      console.error('Error al guardar datos en AsyncStorage', error);
      Alert.alert('Error', 'Hubo un problema al guardar los datos.');
    }
  };

  const handleLogout = async () => {
    const result = await deleteSession();
    if (result.success) {
      Alert.alert('Sesión cerrada', 'Has cerrado sesión correctamente.');
    } else {
      Alert.alert('Error', 'Hubo un problema al cerrar sesión.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileSection}>
        <Image source={{ uri: imgProfile }} style={styles.imgProfile} />
        <View style={styles.buttonsImageProfile}>
          <Pressable
            style={[styles.pressable, styles.cameraButton]}
            onPress={() => handleChangeImage('camera')}
          >
            <Text style={styles.pressableText}>Usar cámara</Text>
          </Pressable>
          <Pressable
            style={[styles.pressable, styles.galleryButton]}
            onPress={() => handleChangeImage('gallery')}
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
