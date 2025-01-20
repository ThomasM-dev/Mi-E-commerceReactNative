import { StyleSheet, View } from 'react-native';
import { colors } from '../globals/colors';
import Categories from '../components/Categories';

export default function Home() {
  return (
    <View style={styles.container}>
      <Categories />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
});
