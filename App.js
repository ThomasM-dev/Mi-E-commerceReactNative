import { StyleSheet, View } from 'react-native';
import Navigation from './src/navigation/Navigation';
import Store from './src/store/Store';
import { Provider } from 'react-redux';
import { init } from './src/config/dbSqlLite';
import { useEffect } from 'react';

export default function App() {
  useEffect(() => {
    init()
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.error('Error al inicializar la base de datos:', error);
      });
  }, []);

  return (
    <Provider store={Store}>
      <View style={styles.container}>
        <Navigation />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
