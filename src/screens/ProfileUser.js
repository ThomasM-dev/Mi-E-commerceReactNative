import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  Alert,
} from 'react-native';
import ProfileImgDefault from '../../assets/profileImg.webp';
import * as ImagePicker from 'expo-image-picker';
import { useSelector, useDispatch } from 'react-redux';
import LocationSelector from '../components/LocationSelector';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { deleteSession } from '../config/dbSqlLite';
import { clearUser } from '../store/slices/userSlice';

const ProfileUser = () => {
  const dispatch = useDispatch();
  const emailUser = useSelector((state) => state.user.email);
  const userId = useSelector((state) => state.user.localId);
  const addressUser = useSelector((state) => state.addressUser.address);
  const [imgProfile, setIMgProfile] = useState(ProfileImgDefault);

  useEffect(() => {
    const fetchProfileDataUser = async () => {
      try {
        const image = await AsyncStorage.getItem(`userImage_${userId}`);
        setIMgProfile(image || ProfileImgDefault);
      } catch (error) {
        console.error('Error al cargar la imagen de perfil', error);
        setIMgProfile(ProfileImgDefault);
      }
    };

    fetchProfileDataUser();
  }, [userId]);

  const permissionCamera = async (permissionType) => {
    const { status } =
      permissionType === 'camera'
        ? await ImagePicker.requestCameraPermissionsAsync()
        : await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert(
        'Permiso denegado',
        'No se concedió permiso para acceder a la cámara o galería.'
      );
      return false;
    }
    return true;
  };

  const handleChangeImage = async (sourceType) => {
    const hasPermission = await permissionCamera(sourceType);
    if (!hasPermission) return;

    const result =
      sourceType === 'camera'
        ? await ImagePicker.launchCameraAsync({ base64: true })
        : await ImagePicker.launchImageLibraryAsync({ base64: true });

    if (!result.canceled && result.assets?.[0]?.base64) {
      const base64Image = `data:image/jpeg;base64,${result.assets[0].base64}`;
      setIMgProfile(base64Image);
    } else {
      Alert.alert('Error', 'No se seleccionó una imagen válida.');
    }
  };

  const saveProfileData = async () => {
    try {
      await AsyncStorage.setItem(
        `userImage_${userId}`,
        JSON.stringify(imgProfile)
      );
      await AsyncStorage.setItem(
        `userAddress_${userId}`,
        JSON.stringify(addressUser)
      );
      Alert.alert('Éxito', 'Los datos se han guardado correctamente.');
    } catch (error) {
      console.error('Error al guardar datos en AsyncStorage', error);
      Alert.alert('Error', 'Hubo un problema al guardar los datos.');
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem(`userImage_${userId}`);
      await AsyncStorage.removeItem(`userAddress_${userId}`);
      await deleteSession();
      dispatch(clearUser());
    } catch (error) {
      console.error('Error al cerrar sesión', error);
    }
  };


  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileSection}>
        <Image source={ProfileImgDefault} style={styles.imgProfile} />
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
