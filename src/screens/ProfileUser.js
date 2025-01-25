import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import LocationSelector from '../components/LocationSelector';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { deleteSession } from '../config/dbSqlLite';
import { clearUser } from '../store/slices/userSlice';

const ProfileUser = () => {
  const dispatch = useDispatch();
  const emailUser = useSelector((state) => state.user.email);
  const localId = useSelector((state) => state.user.localId);
  const [imgProfile, setImgProfile] = useState(
    'https://i.pinimg.com/originals/3b/2e/3d/3b2e3d35f10b6adb795f1aa1bd472c4c.jpg'
  );
  const [save, setSave] = useState(false);

  useEffect(() => {
    const getImgProfile = async () => {
      const profileUser = await AsyncStorage.getItem(`imageUser_${emailUser}`);
      if (profileUser) {
        setImgProfile(profileUser); // Update the local state with stored image
      }
    };
    getImgProfile();
  }, [localId, emailUser]);

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
        setImgProfile(base64Image); // Update the local state
      } else {
        console.warn('Selección de imagen cancelada o datos inválidos.');
      }
    } catch (error) {
      console.error('Error al seleccionar la imagen:', error);
    }
  };

  const handleSaveDateUser = async () => {
    await AsyncStorage.setItem(`imageUser_${emailUser}`, imgProfile);
    setSave(true);
    setTimeout(() => setSave(false), 1500);
  };

  const handleLogout = async () => {
    dispatch(clearUser());
    await deleteSession();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileSection}>
        <Image source={{ uri: imgProfile }} style={styles.imgProfile} />
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
      <Pressable onPress={handleSaveDateUser} style={styles.pressable}>
        <Text style={styles.pressableText}>
          {' '}
          {save ? 'Guardado' : 'Guardar Cambios'}
        </Text>
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
