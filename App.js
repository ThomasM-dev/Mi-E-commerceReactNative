import { StyleSheet, View } from 'react-native';
import Navigation from './src/navigation/Navigation';
import Store from './src/store/Store';
import { Provider } from 'react-redux';
import FlashMessage from 'react-native-flash-message';

export default function App() {
  return (
    <Provider store={Store}>
      <View style={styles.container}>
        <Navigation />
        <FlashMessage position="top" style={{ marginTop: 20 }} />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
