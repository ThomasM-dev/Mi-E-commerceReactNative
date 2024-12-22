import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Constants from 'expo-constants'
import Home from './src/screens/Home';
import { colors } from './src/globals/colors';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" backgroundColor={colors.black} />
      <Home/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight
  },
});

