import FontAwesome from '@expo/vector-icons/FontAwesome';
import { View } from 'react-native';
const TabBarIcon = ({ name, focused }) => {
  return (
    <View>
      <FontAwesome name={name} size={24} color={focused ? 'red' : 'white'} />
    </View>
  );
};

export default TabBarIcon;
