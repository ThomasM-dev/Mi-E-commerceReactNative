import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { colors } from './src/globals/colors';
import Navigation from './src/navigation/Navigation';
import Store from './src/store/Store';
import { Provider } from 'react-redux';
import SigNupUser from './src/screens/SigNupUser';

export default function App() {
  return (
    <Provider store={Store} >
    <View style={styles.container}>
      <StatusBar style="light" backgroundColor={colors.black} />
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

