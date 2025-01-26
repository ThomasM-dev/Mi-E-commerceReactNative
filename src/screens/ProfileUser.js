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
import { showMessage } from 'react-native-flash-message';

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
      const profileUser = await AsyncStorage.getItem(`imageUser_${localId}`);
      if (profileUser) setImgProfile(profileUser); 
    };
    if (localId) getImgProfile();
  }, [localId]);

  const handleChangeImage = async (source) => {
    try {
      let permissionStatus;
      if (source === 'camera') {
        permissionStatus = await ImagePicker.requestCameraPermissionsAsync();
      } else if (source === 'gallery') {
        permissionStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      }

      if (permissionStatus.status !== 'granted') {
        showMessage({
          message: 'Habilita los permisos desde ajustes',
          description: source === 'camera' ? 'Sin permiso de uso de cámara' : 'Sin permiso para acceder a la galería',
          type: 'warning',
          icon: 'warning',
        });
        return;
      }

      const data = source === 'camera'
        ? await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [9, 16],
            base64: true,
            quality: 1,
          })
        : await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            base64: true,
            quality: 1,
            aspect: [9, 16],
          });

      if (!data.canceled && data.assets?.[0]?.base64) {
        const base64Image = `data:image/jpeg;base64,${data.assets[0].base64}`;
        setImgProfile(base64Image);
      } else {
        showMessage({
          message: 'Cancelado',
          description: 'Selección de imagen cancelada o datos inválidos',
          type: 'warning',
          icon: 'warning',
        });
      }
    } catch (error) {
      showMessage({
        message: 'Error',
        description: 'Tuvimos un error al capturar la imagen. Reintenta nuevamente',
        type: 'warning',
        icon: 'warning',
      });
    }
  };

  const handleSaveDateUser = async () => {
    await AsyncStorage.setItem(`imageUser_${localId}`, imgProfile);
    setSave(true);
    setTimeout(() => setSave(false), 1500);
    showMessage({
      message: 'Guardado correctamente',
      description: 'Datos guardados correctamente',
      type: 'success',
      icon: 'success',
    });
  };

  const handleLogout = async () => {
    showMessage({
      message: 'Cierre de sesión',
      description: 'Cierre de sesión correctamente',
      type: 'success',
      icon: 'success',
    });
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
      <LocationSelector />
      <Pressable onPress={handleSaveDateUser} style={styles.pressable}>
        <Text style={styles.pressableText}>
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
});

export default ProfileUser;
