import { Pressable } from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

const TogglePasswordButton = ({ onPress, icon }) => {
  return (
    <Pressable onPress={onPress}>
      <FontAwesome5 name={icon} size={24} color="black" />
    </Pressable>
  );
};

export default TogglePasswordButton;
