import { Pressable, StyleSheet, View } from 'react-native';
import { colors } from '../globals/colors';

const ButtonsSearch = ({ children, onPress, iconStyle }) => {
  return (
    <View style={style.container}>
      <Pressable style={style.buttons} onPress={onPress}>
        {children}
      </Pressable>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  buttons: {
    backgroundColor: colors.red,
    padding: 10,
  },
});
export default ButtonsSearch;
