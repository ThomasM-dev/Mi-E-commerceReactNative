import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { colors } from './src/globals/colors';
import StackNavigator from './src/components/StackNavigator'
import TabsNavigator from './src/components/TabsNavigator';
export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" backgroundColor={colors.black} />
      <StackNavigator/>
      <TabsNavigator/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

