import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginUser from '../screens/LoginUser';
import SigNupUser from '../screens/SigNupUser';

const AuthStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="LoginUser" component={LoginUser} />
      <Stack.Screen name="SigNupUser" component={SigNupUser} />
    </Stack.Navigator>
  );
};
export default AuthStack;
