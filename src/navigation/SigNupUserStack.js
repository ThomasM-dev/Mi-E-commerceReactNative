import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SigNupUser from '../screens/SigNupUser';

const SigNupUserStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="SigNup" component={SigNupUser} />
    </Stack.Navigator>
  );
};

export default SigNupUserStack;
