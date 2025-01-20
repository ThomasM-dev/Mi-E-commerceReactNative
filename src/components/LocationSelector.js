import { StyleSheet, Text, Pressable, ScrollView } from 'react-native';
import * as Location from 'expo-location';
import { useState, useEffect } from 'react';
import { api_geocode_key } from '../data/ApiPost';
import CustomInput from './CustomInput';
import { useDispatch } from 'react-redux';
import { setAddress } from '../store/slices/addressSlice';

const LocationSelector = () => {
  const [position, setPosition] = useState({ lat: '', long: '' });
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [height, setHeight] = useState('');
  const [street, setStreet] = useState('');
  const [loadingLocation, setLoadingLocation] = useState(false);
  const dispatch = useDispatch();

  const handleLocation = async () => {
    setLoadingLocation(true);
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status === 'granted') {
      let location = await Location.getCurrentPositionAsync({});
      setPosition({
        lat: location.coords.latitude,
        long: location.coords.longitude,
      });
    } else {
      console.log('Permiso denegado');
    }
    setLoadingLocation(false);
  };

  useEffect(() => {
    if (position.lat && position.long) {
      const addressUser = `https://us1.locationiq.com/v1/reverse?key=${api_geocode_key}&lat=${position.lat}&lon=${position.long}&format=json&`;
      (async () => {
        try {
          const response = await fetch(addressUser);
          const data = await response.json();
          setCity(data.address.city || '');
          setCountry(data.address.country || '');
          setPostalCode(data.address.postcode || '');
          setStreet(data.address.road || '');
          setHeight(data.address.house_number || '');
        } catch (error) {
          console.error('Error al obtener la dirección:', error);
        }
      })();
    }
  }, [position]);

  const handleSaveAddress = () => {
    const address = {
      city,
      country,
      postalCode,
      street,
      height,
    };
    dispatch(setAddress(address));
  };
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Dirección de Entrega</Text>
      <CustomInput placeholder="Ciudad" value={city} onChangeText={setCity} />
      <CustomInput
        placeholder="País"
        value={country}
        onChangeText={setCountry}
      />
      <CustomInput
        placeholder="Código Postal"
        value={postalCode}
        onChangeText={setPostalCode}
      />
      <CustomInput
        placeholder="Altura"
        value={height}
        onChangeText={setHeight}
      />
      <CustomInput
        placeholder="Calle"
        value={street}
        onChangeText={setStreet}
      />

      <Pressable onPress={handleLocation} style={styles.button}>
        <Text style={styles.buttonText}>
          {loadingLocation ? 'Cargando ubicación...' : 'Usar mi ubicación'}
        </Text>
      </Pressable>
      <Pressable style={styles.button} onPress={handleSaveAddress}>
        <Text style={styles.buttonText}>Guardar ubicación</Text>
      </Pressable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    width: '90%',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default LocationSelector;
