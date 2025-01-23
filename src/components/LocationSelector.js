import { StyleSheet, Text, Pressable, ScrollView, View } from 'react-native';
import * as Location from 'expo-location';
import { useState, useEffect } from 'react';
import { api_geocode_key } from '../data/ApiPost';
import CustomInput from './CustomInput';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LocationSelector = () => {
  const [position, setPosition] = useState({ lat: '', long: '' });
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [height, setHeight] = useState('');
  const [street, setStreet] = useState('');
  const [loadingLocation, setLoadingLocation] = useState(false);
  const userId = useSelector((state) => state.user.localId);

  useEffect(() => {
    const fetchStoredAddress = async () => {
      const address = await AsyncStorage.getItem(`userAddress_${userId}`);
      if (address) {
        const parsedAddress = JSON.parse(address);
        setCity(parsedAddress.cit || "");
        setCountry(parsedAddress.country || "");
        setPostalCode(parsedAddress.postalCode || "");
        setStreet(parsedAddress.street || "");
        setHeight(parsedAddress.height || "");
      }
    };
    fetchStoredAddress();
  }, [userId]);

  const handleSaveAddress = async () => {
    const address = { city, country, postalCode, street, height };
    try {
      await AsyncStorage.setItem(`userAddress_${userId}`, JSON.stringify(address));
    } catch (error) {
      console.error('Error al guardar la dirección en AsyncStorage', error);
    }
  };

  const handleGetLocation = async () => {
    setLoadingLocation(true);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permiso denegado',
          'No se concedió permiso para acceder a la ubicación.'
        );
        setLoadingLocation(false);
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      setPosition({ lat: latitude, long: longitude });

      const response = await fetch(
        `https://us1.locationiq.com/v1/reverse?key=${api_geocode_key}&lat=${position.lat}&lon=${position.long}format=json&`
      );
      const data = await response.json();
      if (data.results.length > 0) {
        const addressComponents = data.results[0].address_components;
        setCity(addressComponents.find((comp) => comp.types.includes('locality'))?.long_name || '');
        setCountry(addressComponents.find((comp) => comp.types.includes('country'))?.long_name || '');
        setPostalCode(addressComponents.find((comp) => comp.types.includes('postal_code'))?.long_name || '');
        setStreet(addressComponents.find((comp) => comp.types.includes('route'))?.long_name || '');
        setHeight(addressComponents.find((comp) => comp.types.includes('street_number'))?.long_name || '');
      }
    } catch (error) {
      console.error('Error al obtener la ubicación', error);
    } finally {
      setLoadingLocation(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputContainer}>
        <CustomInput label="Ciudad" value={city} onChangeText={setCity} />
        <CustomInput label="País" value={country} onChangeText={setCountry} />
        <CustomInput
          label="Código Postal"
          value={postalCode}
          onChangeText={setPostalCode}
        />
        <CustomInput label="Calle" value={street} onChangeText={setStreet} />
        <CustomInput label="Altura" value={height} onChangeText={setHeight} />
      </View>
      <Pressable onPress={handleGetLocation} style={styles.locationButton}>
        <Text style={styles.locationButtonText}>
          {loadingLocation ? 'Obteniendo ubicación...' : 'Obtener Ubicación'}
        </Text>
      </Pressable>
      <Pressable onPress={handleSaveAddress} style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Guardar Dirección</Text>
      </Pressable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  locationButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  locationButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LocationSelector;
