import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { colors } from './src/globals/colors';
import Navigation from './src/navigation/Navigation';
import Store from './src/store/Store';
import { Provider } from 'react-redux';
import ProfileUser from './src/screens/ProfileUser';
import LocationSelector from './src/components/LocationSelector';

export default function App() {
  return (
    <Provider store={Store} >
    <View style={styles.container}>
    <Navigation/>
      </View>
      </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

