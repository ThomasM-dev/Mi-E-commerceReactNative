import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { colors } from '../globals/colors';

const Spinner = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.red} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.black,
  },
});

export default Spinner;
