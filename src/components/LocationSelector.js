import { StyleSheet, View, Text, Pressable } from 'react-native';
import * as Location from 'expo-location';
import { useState } from 'react';

const LocationSelector = () => {
  const [position, setPosition] = useState({long: "", lat: ""})

  const handleLocation = async () => { 
    let {status} = await Location.requestForegroundPermissionsAsync()
    if (status === 'granted') {
      let location = await Location.getCurrentPositionAsync({})
      console.log(location)
      setPosition({
        lat: location.coords.latitude,
        long: location.coords.longitude
      })
    } else {
      console.log('Permiso denegado');
    }
  };

  return (
    <View style={styles.addressSection}>
      <Pressable onPress={handleLocation} style={styles.buttonAddress}>
        <Text style={styles.buttonText}>Usar mi ubicación</Text>
      </Pressable>
      <Text style={styles.sectionTitle}>Dirección de Entrega</Text>
      <Pressable style={styles.buttonAddress}> 
      <Text style={styles.buttonText}>Guardar</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  addressSection: {
    backgroundColor: '#f5f5f5',
    width: '90%',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  buttonAddress: {
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
