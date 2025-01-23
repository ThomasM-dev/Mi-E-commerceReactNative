import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import ProfileImgDefault from '../../assets/profileImg.webp';
import * as ImagePicker from 'expo-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import { changeImage } from '../store/slices/profileSlice';
import LocationSelector from '../components/LocationSelector';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';

const ProfileUser = () => {
  const dispatch = useDispatch();
  const imageProfile = useSelector((state) => state.profile.image);
  const emailUser = useSelector((state) => state.user.email);

  useEffect(() => {
    const imageUser = async () => {
      const image = await AsyncStorage.getItem(`userImage_${emailUser}`);
      if (image) {
        dispatch(changeImage(image));
      } else {
        dispatch(changeImage(ProfileImgDefault))
      }
    }
    imageUser()
  }, [imageProfile, emailUser])
  
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
        dispatch(changeImage(base64Image));
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
        dispatch(changeImage(base64Image));
      } else {
        console.warn('Selección de imagen cancelada o datos inválidos.');
      }
    } catch (error) {
      console.error('Error al seleccionar la imagen:', error);
    }
  };

  const handleSaveDateUser = () => {
    AsyncStorage.setItem(`userImage_${emailUser}`, imageProfile);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileSection}>
        <Image
          source={imageProfile ? { uri: imageProfile } : ProfileImgDefault}
          style={styles.imgProfile}
        />
        <View style={styles.buttonsImageProfile}>
          <Pressable style={styles.pressable} onPress={handleChangeImageCamera}>
            <Text style={styles.pressableText}>Usar cámara</Text>
          </Pressable>
          <Pressable
            style={styles.pressable}
            onPress={handleChangeImageGallery}
          >
            <Text style={styles.pressableText}>Desde galería</Text>
          </Pressable>
        </View>
        <Text style={styles.textProfile}>Bienvenido, Usuario!</Text>
        <Text style={styles.emailText}>Correo: {emailUser || 'Usuari@'}</Text>
      </View>
      <LocationSelector />
      <Pressable onPress={handleSaveDateUser} style={styles.pressable}>
        <Text style={styles.pressableText}>Guardar Cambios</Text>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  imgProfile: {
    height: 170,
    width: 170,
    borderRadius: 75,
    marginBottom: 20,
  },
  textProfile: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  emailText: {
    fontSize: 16,
    color: '#555',
    marginTop: 10,
    textAlign: 'center',
  },
  pressable: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  pressableText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  buttonsImageProfile: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: 10,
    borderRadius: 10,
    marginVertical: 20,
  },
});

export default ProfileUser;
