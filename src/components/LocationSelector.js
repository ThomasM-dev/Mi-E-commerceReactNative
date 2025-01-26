import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView, View, Pressable, Text, StyleSheet } from 'react-native';
import CustomInput from './CustomInput';
import * as Location from 'expo-location';
import { api_geocode_key } from '../data/ApiPost';


const locationSelector = () => {
  const [position, setPosition] = useState({ lat: '', long: '' });
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [height, setHeight] = useState('');
  const [street, setStreet] = useState('');
  const localId = useSelector((state) => state.user.localId);

  useEffect(() => {
    const AddressStorage = async () => {
      const address = await AsyncStorage.getItem(`userAddress_${userId}`);
      if (address) {
        const parsedAddress = JSON.parse(address);
        setCity(parsedAddress.city || '');
        setCountry(parsedAddress.country || '');
        setPostalCode(parsedAddress.postalCode || '');
        setStreet(parsedAddress.street || '');
        setHeight(parsedAddress.height || '');
      }
    };
    AddressStorage();
  }, [localId]);

  useEffect(()=>{
    (async () => {
     try {
         const {status} = await Location.requestForegroundPermissionsAsync()
         if(status != "granted") return
         const newLocation = await Location.getCurrentPositionAsync()
         setPosition({
             lat:newLocation.coords.latitude,
             long:newLocation.coords.longitude
         })         
     } catch (error) {
         console.log(error)
     }
    })()

 },[])
  
 useEffect(()=>{
  (
      async () => {
          if(position.lat){
              const urlReverseGeocoding = `https://us1.locationiq.com/v1/reverse?key=${api_geocode_key}&lat=${position.lat}&lon=${position.long}&format=json&`
              try {
                  const response = await fetch(urlReverseGeocoding)                                    
                  const data = await response.json() 
                  console.log(data);
                                                     
              } catch (error) {
                  console.log(error)
              }
          }
      }
  )()
},[position])

  
  const handleSaveAddress = async () => {
    const address = { city, country, postalCode, street, height };
    try {
      await AsyncStorage.setItem(
        `userAddress_${userId}`,
        JSON.stringify(address)
      );
    } catch (error) {
      console.error('Error al guardar la dirección en AsyncStorage', error);
    }
  };

  return(
    <ScrollView style={styles.container}>
      <View style={styles.inputContainer}>
        <CustomInput
          label="Ciudad"
          value={city}
          onChangeText={setCity}
          placeholder="Ingresa la ciudad"
        />
        <CustomInput
          label="País"
          value={country}
          onChangeText={setCountry}
          placeholder="Ingresa el país"
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
