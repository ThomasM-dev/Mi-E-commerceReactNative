import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView, View, Pressable, Text, StyleSheet } from 'react-native';
import CustomInput from './CustomInput';
import * as Location from 'expo-location';
import { api_geocode_key } from '../data/ApiPost';
import { showMessage } from 'react-native-flash-message';

const locationSelector = () => {
  const [position, setPosition] = useState({ lat: '', long: '' });
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [height, setHeight] = useState('');
  const [street, setStreet] = useState('');
  const [addressLoaded, setAddressLoaded] = useState(false);
  const localId = useSelector((state) => state.user.localId);

  useEffect(() => {
    const getAddressFromStorage = async () => {
      try {
        const address = await AsyncStorage.getItem(`userAddress_${localId}`);        
        if (address) {
          const parsedAddress = JSON.parse(address);
          setCity(parsedAddress.city);
          setCountry(parsedAddress.country);
          setPostalCode(parsedAddress.postalCode);
          setStreet(parsedAddress.street);
          setHeight(parsedAddress.height);
          setAddressLoaded(true); 
        }
      } catch (error) {
        setAddressLoaded(false)
        console.error('Error al obtener la dirección desde AsyncStorage:', error);
      }
    };
    getAddressFromStorage();
  }, [localId]); 


  useEffect(() => {
    if (addressLoaded) return; 

    const getLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') return;

        const newLocation = await Location.getCurrentPositionAsync();
        setPosition({
          lat: newLocation.coords.latitude,
          long: newLocation.coords.longitude,
        });
      } catch (error) {
        console.error('Error al obtener la ubicación:', error);
      }
    };

    getLocation();
  }, [addressLoaded]); 

  useEffect(() => {
    if (!addressLoaded) {
      if (position.lat) {
        const getGeocodeData = async () => {
          const urlReverseGeocoding = `https://us1.locationiq.com/v1/reverse?key=${api_geocode_key}&lat=${position.lat}&lon=${position.long}&format=json&`;
          try {
            const response = await fetch(urlReverseGeocoding);
            const data = await response.json();                      
            setCity(data.address.city || '');
            setCountry(data.address.country || '');
            setHeight(data.address.house_number || '');
            setPostalCode(data.address.zipCode || '');
            setStreet(data.address.road || '');
          } catch (error) {
            console.error('Error al obtener datos geográficos:', error);
          }
        };
        getGeocodeData();
      }
    }
  }, [position]); 

  const handleSaveAddress = async () => {
    const address = { city, country, postalCode, street, height };
    if (!city || !country || !postalCode || !street || !height) {
      showMessage({
        message: 'Completa los datos faltantes',
        type: 'warning',
      });
      return;
    }
    try {
      await AsyncStorage.setItem(`userAddress_${localId}`, JSON.stringify(address));
      showMessage({
        message: 'Dirección Guardada',
        type: 'success',
      });
    } catch (error) {
      console.error('Error al guardar la dirección en AsyncStorage', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputContainer}>
        <CustomInput
          label="País"
          value={country}
          onChangeText={setCountry}
          placeholder="Ingresa el país"
        />
        <CustomInput
          label="Provincia"
          value={city}
          onChangeText={setCity}
          placeholder="Ingresa la ciudad"
        />
        <CustomInput
          label="Código Postal"
          value={postalCode}
          onChangeText={setPostalCode}
          placeholder="Ingresa el código postal"
        />
        <CustomInput
          label="Calle"
          value={street}
          onChangeText={setStreet}
          placeholder="Ingresa la calle"
        />
        <CustomInput
          label="Altura"
          value={height}
          onChangeText={setHeight}
          placeholder="Ingresa la altura"
        />
      </View>
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

export default locationSelector;
