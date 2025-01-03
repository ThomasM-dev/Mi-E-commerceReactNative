import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { colors } from './src/globals/colors';
import Navigation from './src/navigation/Navigation';
import ProfileUser from './src/screens/ProfileUser';
export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" backgroundColor={colors.black} />
       <Navigation/> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

